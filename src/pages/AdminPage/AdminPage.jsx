import React, { useState, useEffect, useRef, useCallback } from "react";
import "./AdminPage.css";

import { db, storage } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// ─── שדות חובה לדילים ──────────────────────────────────────────────────────
const REQUIRED_FIELDS = {
  title: "שם החבילה",
  priceFrom: "מחיר",
  country: "מדינה",
  days: "מספר ימים",
  datesRange: "טווח תאריכים",
  luggage: "מידע על כבודה",
  "flight.airline": "חברת תעופה",
  "flight.departure": "שעת המראה",
  "flight.return": "שעת חזרה",
  "hotel.name": "שם המלון",
  "hotel.stars": "דירוג מלון",
  "hotel.room": "סוג חדר",
  "hotel.meals": "בסיס אירוח",
  mainImage: "תמונה",
};

const initialFormState = {
  title: "",
  priceFrom: "",
  country: "",
  mainImage: "",
  days: "",
  datesRange: "",
  luggage: "",
  notes: "",
  flight: { airline: "", departure: "", return: "" },
  hotel: { name: "", stars: "", room: "", meals: "" },
};

function getFieldValue(formData, key) {
  const parts = key.split(".");
  if (parts.length === 1) return formData[key];
  return formData[parts[0]]?.[parts[1]] ?? "";
}

const FOCUSABLE = [
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

// ─── מודאל אישור נגיש ──────────────────────────────────────────────────────
function ConfirmModal({ message, onConfirm, onCancel }) {
  const modalRef = useRef(null);
  const cancelRef = useRef(null);

  useEffect(() => {
    cancelRef.current?.focus();
    document.body.style.overflow = "hidden";

    const handleKey = (e) => {
      if (e.key === "Escape") {
        onCancel();
        return;
      }
      if (e.key !== "Tab" || !modalRef.current) return;
      const focusable = Array.from(
        modalRef.current.querySelectorAll(FOCUSABLE),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onCancel]);

  return (
    <div
      className="confirm-modal-overlay"
      role="presentation"
      onClick={onCancel}
    >
      <div
        ref={modalRef}
        className="confirm-modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-desc"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="confirm-title">אישור פעולה</h3>
        <p id="confirm-desc">{message}</p>
        <div className="confirm-modal-actions">
          <button
            ref={cancelRef}
            className="confirm-cancel-btn"
            onClick={onCancel}
          >
            ביטול
          </button>
          <button className="confirm-delete-btn" onClick={onConfirm}>
            מחק
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── הודעת שגיאה נגישה ──────────────────────────────────────────────────────
function StatusToast({ message, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="status-toast-overlay" role="presentation" onClick={onClose}>
      <div
        className="status-toast"
        role="alertdialog"
        aria-modal="true"
        aria-label="הודעת שגיאה"
        onClick={(e) => e.stopPropagation()}
      >
        <p>{message}</p>
        <button ref={closeRef} className="status-toast-close" onClick={onClose}>
          סגור
        </button>
      </div>
    </div>
  );
}

// ─── מודאל עריכת ביקורת ─────────────────────────────────────────────────────
function ReviewEditModal({ review, onSave, onCancel, storageRef }) {
  const modalRef = useRef(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    reviewer_name: review.reviewer_name || "",
    destination: review.destination || "",
    review_text: review.review_text || "",
    rating: review.rating || 0,
    will_book_again: review.will_book_again || "",
    flight_date: review.flight_date || "",
  });

  // תמונות קיימות (URLs מ-Firebase)
  const [existingImages, setExistingImages] = useState(review.image_urls || []);
  // תמונות חדשות (קבצים מקומיים)
  const [newImages, setNewImages] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    modalRef.current?.focus();
    document.body.style.overflow = "hidden";

    const handleKey = (e) => {
      if (e.key === "Escape") {
        onCancel();
        return;
      }
      if (e.key !== "Tab" || !modalRef.current) return;
      const focusable = Array.from(
        modalRef.current.querySelectorAll(FOCUSABLE),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onCancel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingClick = (rating) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFileAdd = (e) => {
    const files = Array.from(e.target.files).filter((f) =>
      f.type.startsWith("image/"),
    );
    const mapped = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }));
    setNewImages((prev) => [...prev, ...mapped]);
    e.target.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // העלאת תמונות חדשות
      const uploadedUrls = [];
      for (const img of newImages) {
        const imgRef = ref(storage, `reviews/${Date.now()}-${img.name}`);
        await uploadBytes(imgRef, img.file);
        const url = await getDownloadURL(imgRef);
        uploadedUrls.push(url);
      }

      const allImageUrls = [...existingImages, ...uploadedUrls];

      await onSave(review.id, {
        ...formData,
        image_urls: allImageUrls,
      });
    } catch (err) {
      console.error("Error saving review:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" role="presentation" onClick={onCancel}>
      <div
        ref={modalRef}
        className="modal-content review-edit-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-edit-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="review-edit-title">עריכת ביקורת</h2>

        <form onSubmit={handleSubmit} className="deal-form" noValidate>
          <div className="form-field">
            <label htmlFor="re-reviewer_name">שם מלא</label>
            <input
              id="re-reviewer_name"
              name="reviewer_name"
              value={formData.reviewer_name}
              onChange={handleChange}
              placeholder="שם הלקוח"
            />
          </div>

          <div className="form-field">
            <label htmlFor="re-destination">יעד</label>
            <input
              id="re-destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="יעד"
            />
          </div>

          <div className="form-field">
            <label htmlFor="re-flight_date">תאריך טיסה</label>
            <input
              id="re-flight_date"
              name="flight_date"
              type="date"
              value={formData.flight_date}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label id="re-rating-label">דירוג</label>
            <div
              className="review-edit-stars"
              role="group"
              aria-labelledby="re-rating-label"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => handleRatingClick(star)}
                  className={`review-edit-star ${formData.rating >= star ? "active" : ""}`}
                  aria-label={`דרג ${star} כוכבים`}
                  aria-pressed={formData.rating >= star}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="re-review_text">חוות דעת</label>
            <textarea
              id="re-review_text"
              name="review_text"
              value={formData.review_text}
              onChange={handleChange}
              placeholder="חוות דעת"
              rows="4"
            />
          </div>

          <div className="form-field">
            <label htmlFor="re-will_book_again">יסגור שוב?</label>
            <select
              id="re-will_book_again"
              name="will_book_again"
              value={formData.will_book_again}
              onChange={handleChange}
            >
              <option value="">בחר</option>
              <option value="yes">כן</option>
              <option value="no">לא</option>
            </select>
          </div>

          {/* ════ ניהול תמונות ════ */}
          <fieldset className="review-images-fieldset">
            <legend>תמונות</legend>

            {/* תמונות קיימות */}
            {existingImages.length > 0 && (
              <div className="review-edit-images-grid">
                {existingImages.map((url, index) => (
                  <div
                    key={`existing-${index}`}
                    className="review-edit-image-item"
                  >
                    <img src={url} alt={`תמונה ${index + 1}`} />
                    <button
                      type="button"
                      className="review-edit-image-remove"
                      onClick={() => removeExistingImage(index)}
                      aria-label={`הסר תמונה ${index + 1}`}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* תמונות חדשות */}
            {newImages.length > 0 && (
              <div
                className="review-edit-images-grid"
                style={{ marginTop: "0.75rem" }}
              >
                {newImages.map((img, index) => (
                  <div
                    key={`new-${index}`}
                    className="review-edit-image-item new-image"
                  >
                    <img src={img.preview} alt={`תמונה חדשה: ${img.name}`} />
                    <button
                      type="button"
                      className="review-edit-image-remove"
                      onClick={() => removeNewImage(index)}
                      aria-label={`הסר תמונה חדשה ${img.name}`}
                    >
                      ✕
                    </button>
                    <span className="new-image-badge">חדש</span>
                  </div>
                ))}
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileAdd}
              accept="image/*"
              multiple
              style={{ display: "none" }}
              aria-hidden="true"
            />
            <button
              type="button"
              className="review-add-images-btn"
              onClick={() => fileInputRef.current?.click()}
            >
              + הוסף תמונות
            </button>
          </fieldset>

          <div className="modal-actions">
            <button type="button" onClick={onCancel}>
              ביטול
            </button>
            <button type="submit" disabled={saving} aria-busy={saving}>
              {saving ? "שומר..." : "שמור"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function AdminPage() {
  const [deals, setDeals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState(null);
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // ולידציה
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // מודאל אישור
  const [confirmState, setConfirmState] = useState(null);
  // הודעת שגיאה
  const [toastMessage, setToastMessage] = useState(null);

  // ✅ מודאל עריכת ביקורת
  const [editingReview, setEditingReview] = useState(null);

  const fileInputRef = useRef(null);
  const openingButtonRef = useRef(null);
  const modalRef = useRef(null);
  const mainContentRef = useRef(null);

  const dealsCollectionRef = collection(db, "deals");

  // ─── ולידציה ──────────────────────────────────────────────────────────────
  const validate = useCallback((data, hasImage) => {
    const errors = {};
    Object.entries(REQUIRED_FIELDS).forEach(([key, label]) => {
      if (key === "mainImage") {
        if (!hasImage && !data.mainImage)
          errors.mainImage = `${label} היא שדה חובה`;
        return;
      }
      const value = getFieldValue(data, key);
      if (value === "" || value === null || value === undefined) {
        errors[key] = `${label} הוא שדה חובה`;
      }
    });
    return errors;
  }, []);

  useEffect(() => {
    if (submitted) setFieldErrors(validate(formData, !!imageFile));
  }, [formData, imageFile, submitted, validate]);

  // ─── Focus Trap ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isModalOpen) return;
    const trapFocus = (e) => {
      if (e.key !== "Tab" || !modalRef.current) return;
      const focusable = Array.from(
        modalRef.current.querySelectorAll(FOCUSABLE),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", trapFocus);
    return () => document.removeEventListener("keydown", trapFocus);
  }, [isModalOpen]);

  useEffect(() => {
    const onEscape = (e) => {
      if (e.key === "Escape" && isModalOpen) handleCloseModal();
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen && modalRef.current) modalRef.current.focus();
  }, [isModalOpen]);

  useEffect(() => {
    const el = mainContentRef.current;
    if (!el) return;
    if (isModalOpen || editingReview) {
      el.setAttribute("inert", "");
      el.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "hidden";
    } else {
      el.removeAttribute("inert");
      el.removeAttribute("aria-hidden");
      document.body.style.overflow = "";
    }
  }, [isModalOpen, editingReview]);

  // ─── Fetch ───────────────────────────────────────────────────────────────
  const fetchDeals = async () => {
    setLoading(true);
    try {
      const q = query(dealsCollectionRef, orderBy("createdAt", "desc"));
      const data = await getDocs(q);
      setDeals(data.docs.map((d) => ({ ...d.data(), id: d.id })));
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const fetchReviews = async () => {
    setReviewsLoading(true);
    try {
      const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
      const s = await getDocs(q);
      setReviews(s.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error(err);
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
    fetchReviews();
  }, []);

  // ─── Reviews ─────────────────────────────────────────────────────────────
  const handleShowReview = async (id) => {
    try {
      await updateDoc(doc(db, "reviews", id), { approved: true });
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  const handleHideReview = async (id) => {
    try {
      await updateDoc(doc(db, "reviews", id), { approved: false });
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteReview = (id, name) => {
    setConfirmState({
      message: `האם אתה בטוח שברצונך למחוק לצמיתות את הביקורת של ${name}? פעולה זו אינה ניתנת לביטול.`,
      onConfirm: async () => {
        setConfirmState(null);
        try {
          await deleteDoc(doc(db, "reviews", id));
          fetchReviews();
        } catch (err) {
          console.error(err);
        }
      },
    });
  };

  // ✅ שמירת עריכת ביקורת
  const handleSaveReview = async (reviewId, updatedData) => {
    try {
      await updateDoc(doc(db, "reviews", reviewId), updatedData);
      setEditingReview(null);
      fetchReviews();
    } catch (err) {
      console.error(err);
      setToastMessage("שגיאה בשמירת הביקורת");
    }
  };

  // ─── Deal Modal ──────────────────────────────────────────────────────────
  const handleOpenModal = (deal = null, triggerEl = null) => {
    openingButtonRef.current = triggerEl;
    setSubmitted(false);
    setFieldErrors({});
    setImageFile(null);
    if (deal) {
      setEditingDeal(deal);
      setFormData({
        ...initialFormState,
        ...deal,
        flight: deal.flight || initialFormState.flight,
        hotel: deal.hotel || initialFormState.hotel,
      });
      setPreviewImage(deal.mainImage || null);
    } else {
      setEditingDeal(null);
      setFormData(initialFormState);
      setPreviewImage(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDeal(null);
    setImageFile(null);
    setPreviewImage(null);
    setSubmitted(false);
    setFieldErrors({});
    setTimeout(() => {
      if (openingButtonRef.current) openingButtonRef.current.focus();
    }, 0);
  };

  // ─── Input handlers ──────────────────────────────────────────────────────
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleNestedInputChange = (category, e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [name]: type === "number" ? Number(value) : value,
      },
    }));
  };

  // ─── Image upload ────────────────────────────────────────────────────────
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files?.[0]) handleFileSelect(e.dataTransfer.files[0]);
  };
  const handleFileChange = (e) => {
    if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
  };
  const handleFileSelect = (file) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  };

  // ─── Submit Deal ─────────────────────────────────────────────────────────
  const handleSaveDeal = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errors = validate(formData, !!imageFile);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      const firstKey = Object.keys(errors)[0];
      const el = modalRef.current?.querySelector(`[data-field="${firstKey}"]`);
      el?.focus();
      return;
    }

    setLoading(true);
    let dealData = { ...formData };

    if (imageFile) {
      const imgRef = ref(
        storage,
        `deals_images/${imageFile.name + Date.now()}`,
      );
      try {
        await uploadBytes(imgRef, imageFile);
        dealData.mainImage = await getDownloadURL(imgRef);
      } catch (err) {
        console.error(err);
        setToastMessage("שגיאה בהעלאת התמונה. אנא נסה שנית.");
        setLoading(false);
        return;
      }
    }

    try {
      if (editingDeal) {
        await updateDoc(doc(db, "deals", editingDeal.id), dealData);
      } else {
        dealData.createdAt = new Date();
        await addDoc(dealsCollectionRef, dealData);
      }
      fetchDeals();
      handleCloseModal();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleDeleteDeal = (id, title) => {
    setConfirmState({
      message: `האם אתה בטוח שברצונך למחוק את הדיל "${title}"?`,
      onConfirm: async () => {
        setConfirmState(null);
        try {
          await deleteDoc(doc(db, "deals", id));
          fetchDeals();
        } catch (err) {
          console.error(err);
        }
      },
    });
  };

  // ─── עזר: props נגישים לשדה ──────────────────────────────────────────────
  const fp = (id, key) => ({
    id,
    "data-field": key,
    "aria-required": "true",
    "aria-invalid": submitted && !!fieldErrors[key] ? "true" : "false",
    "aria-describedby":
      submitted && fieldErrors[key] ? `${id}-error` : undefined,
    className: submitted && fieldErrors[key] ? "input-invalid" : "",
  });

  const nfp = (id, cat, name) => fp(id, `${cat}.${name}`);

  // ─── Helper: format flight date ──────────────────────────────────────────
  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    try {
      return new Date(dateStr).toLocaleDateString("he-IL");
    } catch {
      return dateStr;
    }
  };

  // ─── JSX ─────────────────────────────────────────────────────────────────
  return (
    <div className="admin-container">
      {confirmState && (
        <ConfirmModal
          message={confirmState.message}
          onConfirm={confirmState.onConfirm}
          onCancel={() => setConfirmState(null)}
        />
      )}

      {toastMessage && (
        <StatusToast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}

      {/* ✅ מודאל עריכת ביקורת */}
      {editingReview && (
        <ReviewEditModal
          review={editingReview}
          onSave={handleSaveReview}
          onCancel={() => setEditingReview(null)}
        />
      )}

      {/* ══ תוכן ראשי ══ */}
      <div ref={mainContentRef}>
        <header className="admin-header">
          <h1>ניהול דילים</h1>
          <button
            className="add-deal-btn"
            onClick={(e) => handleOpenModal(null, e.currentTarget)}
          >
            + הוסף דיל חדש
          </button>
        </header>

        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {loading && "טוען נתונים..."}
        </div>

        {loading ? (
          <div className="loading-indicator" role="status">
            טוען...
          </div>
        ) : (
          <div className="deals-table-container">
            <table>
              <caption className="sr-only">רשימת הדילים הפעילים</caption>
              <thead>
                <tr>
                  <th scope="col">שם החבילה</th>
                  <th scope="col">מדינה</th>
                  <th scope="col">מחיר</th>
                  <th scope="col">ימים</th>
                  <th scope="col">פעולות</th>
                </tr>
              </thead>
              <tbody>
                {deals.map((deal) => (
                  <tr key={deal.id}>
                    <td>{deal.title}</td>
                    <td>{deal.country}</td>
                    <td>₪{deal.priceFrom}</td>
                    <td>{deal.days}</td>
                    <td className="actions-cell">
                      <button
                        className="action-btn edit"
                        onClick={(e) => handleOpenModal(deal, e.currentTarget)}
                        aria-label={`ערוך דיל: ${deal.title}`}
                      >
                        ערוך
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDeleteDeal(deal.id, deal.title)}
                        aria-label={`מחק דיל: ${deal.title}`}
                      >
                        מחק
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <h2>ניהול ביקורות</h2>

        {reviewsLoading ? (
          <p role="status">טוען ביקורות...</p>
        ) : reviews.length === 0 ? (
          <p>אין ביקורות להצגה</p>
        ) : (
          <div className="deals-table-container">
            <table>
              <caption className="sr-only">רשימת ביקורות לקוחות</caption>
              <thead>
                <tr>
                  <th scope="col">שם</th>
                  <th scope="col">יעד</th>
                  <th scope="col">דירוג</th>
                  <th scope="col">תאריך טיסה</th>
                  <th scope="col">תמונות</th>
                  <th scope="col">סטטוס</th>
                  <th scope="col">פעולות</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr key={review.id}>
                    <td>{review.reviewer_name}</td>
                    <td>{review.destination}</td>
                    <td aria-label={`דירוג: ${review.rating} כוכבים`}>
                      {review.rating} ⭐
                    </td>
                    <td>{formatDate(review.flight_date)}</td>
                    <td>{review.image_urls?.length || 0} תמונות</td>
                    <td>
                      {review.approved ? (
                        <span style={{ color: "green", fontWeight: "bold" }}>
                          מוצג באתר
                        </span>
                      ) : (
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          מוסתר
                        </span>
                      )}
                    </td>
                    <td className="actions-cell">
                      {/* ✅ כפתור עריכת ביקורת */}
                      <button
                        className="action-btn edit"
                        onClick={() => setEditingReview(review)}
                        aria-label={`ערוך ביקורת של ${review.reviewer_name}`}
                      >
                        ערוך
                      </button>
                      {review.approved ? (
                        <button
                          className="action-btn delete"
                          onClick={() => handleHideReview(review.id)}
                          aria-label={`הסתר ביקורת של ${review.reviewer_name}`}
                        >
                          הסתר
                        </button>
                      ) : (
                        <button
                          className="action-btn edit"
                          onClick={() => handleShowReview(review.id)}
                          aria-label={`הצג באתר ביקורת של ${review.reviewer_name}`}
                        >
                          הצג באתר
                        </button>
                      )}
                      <button
                        className="action-btn delete"
                        onClick={() =>
                          handleDeleteReview(review.id, review.reviewer_name)
                        }
                        aria-label={`מחק לצמיתות ביקורת של ${review.reviewer_name}`}
                      >
                        מחק
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ════════════════════════ מודאל עריכה/הוספת דיל ════════════════════ */}
      {isModalOpen && (
        <div
          className="modal-overlay"
          role="presentation"
          onClick={handleCloseModal}
        >
          <div
            className="modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            ref={modalRef}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="modal-title">
              {editingDeal ? "עריכת דיל" : "הוספת דיל חדש"}
            </h2>

            {submitted && Object.keys(fieldErrors).length > 0 && (
              <div className="error-summary" role="alert" aria-live="assertive">
                <strong>יש למלא את כל שדות החובה הבאים:</strong>
                <ul>
                  {Object.values(fieldErrors).map((msg, i) => (
                    <li key={i}>{msg}</li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleSaveDeal} className="deal-form" noValidate>
              <div className="form-field">
                <label htmlFor="title">
                  שם החבילה{" "}
                  <span className="req" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  {...fp("title", "title")}
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="שם החבילה"
                />
                {submitted && fieldErrors.title && (
                  <span
                    id="title-error"
                    className="field-error-msg"
                    role="alert"
                  >
                    {fieldErrors.title}
                  </span>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="priceFrom">
                  מחיר החל מ-{" "}
                  <span className="req" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  {...fp("priceFrom", "priceFrom")}
                  name="priceFrom"
                  type="number"
                  min="0"
                  value={formData.priceFrom}
                  onChange={handleInputChange}
                  placeholder="מחיר החל מ-"
                />
                {submitted && fieldErrors.priceFrom && (
                  <span
                    id="priceFrom-error"
                    className="field-error-msg"
                    role="alert"
                  >
                    {fieldErrors.priceFrom}
                  </span>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="country">
                  מדינה{" "}
                  <span className="req" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  {...fp("country", "country")}
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="מדינה (לדוגמה: יוון)"
                />
                {submitted && fieldErrors.country && (
                  <span
                    id="country-error"
                    className="field-error-msg"
                    role="alert"
                  >
                    {fieldErrors.country}
                  </span>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="days">
                  מספר ימים{" "}
                  <span className="req" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  {...fp("days", "days")}
                  name="days"
                  type="number"
                  min="1"
                  value={formData.days}
                  onChange={handleInputChange}
                  placeholder="מספר ימים"
                />
                {submitted && fieldErrors.days && (
                  <span
                    id="days-error"
                    className="field-error-msg"
                    role="alert"
                  >
                    {fieldErrors.days}
                  </span>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="datesRange">
                  טווח תאריכים{" "}
                  <span className="req" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  {...fp("datesRange", "datesRange")}
                  name="datesRange"
                  value={formData.datesRange}
                  onChange={handleInputChange}
                  placeholder="טווח תאריכים"
                />
                {submitted && fieldErrors.datesRange && (
                  <span
                    id="datesRange-error"
                    className="field-error-msg"
                    role="alert"
                  >
                    {fieldErrors.datesRange}
                  </span>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="luggage">
                  מידע על כבודה{" "}
                  <span className="req" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  {...fp("luggage", "luggage")}
                  name="luggage"
                  value={formData.luggage}
                  onChange={handleInputChange}
                  placeholder="מידע על כבודה (לדוגמה: כולל טרולי ומזוודה)"
                />
                {submitted && fieldErrors.luggage && (
                  <span
                    id="luggage-error"
                    className="field-error-msg"
                    role="alert"
                  >
                    {fieldErrors.luggage}
                  </span>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="notes">
                  הערות נוספות <span className="optional">(אופציונלי)</span>
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="הערות נוספות"
                  rows="3"
                />
              </div>

              <div className="form-field">
                <label id="upload-label">
                  תמונה{" "}
                  <span className="req" aria-hidden="true">
                    *
                  </span>
                </label>
                <div
                  className={`upload-area${submitted && fieldErrors.mainImage ? " upload-invalid" : ""}`}
                  role="button"
                  tabIndex={0}
                  data-field="mainImage"
                  aria-labelledby="upload-label"
                  aria-describedby={
                    submitted && fieldErrors.mainImage
                      ? "mainImage-error"
                      : undefined
                  }
                  aria-invalid={
                    submitted && !!fieldErrors.mainImage ? "true" : "false"
                  }
                  onClick={() => fileInputRef.current.click()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      fileInputRef.current.click();
                    }
                  }}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    style={{ display: "none" }}
                    aria-hidden="true"
                    tabIndex={-1}
                  />
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="תצוגה מקדימה של התמונה שנבחרה"
                      className="image-preview"
                    />
                  ) : (
                    <div className="upload-placeholder" aria-hidden="true">
                      <span>גרור לכאן תמונה או לחץ לבחירה</span>
                      <small>מומלץ תמונה ביחס 16:9</small>
                    </div>
                  )}
                </div>
                {submitted && fieldErrors.mainImage && (
                  <span
                    id="mainImage-error"
                    className="field-error-msg"
                    role="alert"
                  >
                    {fieldErrors.mainImage}
                  </span>
                )}
              </div>

              <fieldset>
                <legend>
                  פרטי טיסה{" "}
                  <span className="req" aria-hidden="true">
                    *
                  </span>
                </legend>
                <div className="form-field">
                  <label htmlFor="airline">חברת תעופה</label>
                  <input
                    {...nfp("airline", "flight", "airline")}
                    name="airline"
                    value={formData.flight.airline}
                    onChange={(e) => handleNestedInputChange("flight", e)}
                    placeholder="חברת תעופה"
                  />
                  {submitted && fieldErrors["flight.airline"] && (
                    <span
                      id="airline-error"
                      className="field-error-msg"
                      role="alert"
                    >
                      {fieldErrors["flight.airline"]}
                    </span>
                  )}
                </div>
                <div className="form-field">
                  <label htmlFor="departure">שעת המראה</label>
                  <input
                    {...nfp("departure", "flight", "departure")}
                    name="departure"
                    value={formData.flight.departure}
                    onChange={(e) => handleNestedInputChange("flight", e)}
                    placeholder="שעת המראה"
                  />
                  {submitted && fieldErrors["flight.departure"] && (
                    <span
                      id="departure-error"
                      className="field-error-msg"
                      role="alert"
                    >
                      {fieldErrors["flight.departure"]}
                    </span>
                  )}
                </div>
                <div className="form-field">
                  <label htmlFor="flightReturn">שעת חזרה</label>
                  <input
                    {...nfp("flightReturn", "flight", "return")}
                    name="return"
                    value={formData.flight.return}
                    onChange={(e) => handleNestedInputChange("flight", e)}
                    placeholder="שעת חזרה"
                  />
                  {submitted && fieldErrors["flight.return"] && (
                    <span
                      id="flightReturn-error"
                      className="field-error-msg"
                      role="alert"
                    >
                      {fieldErrors["flight.return"]}
                    </span>
                  )}
                </div>
              </fieldset>

              <fieldset>
                <legend>
                  פרטי מלון{" "}
                  <span className="req" aria-hidden="true">
                    *
                  </span>
                </legend>
                <div className="form-field">
                  <label htmlFor="hotelName">שם המלון</label>
                  <input
                    {...nfp("hotelName", "hotel", "name")}
                    name="name"
                    value={formData.hotel.name}
                    onChange={(e) => handleNestedInputChange("hotel", e)}
                    placeholder="שם המלון"
                  />
                  {submitted && fieldErrors["hotel.name"] && (
                    <span
                      id="hotelName-error"
                      className="field-error-msg"
                      role="alert"
                    >
                      {fieldErrors["hotel.name"]}
                    </span>
                  )}
                </div>
                <div className="form-field">
                  <label htmlFor="hotelStars">דירוג (כוכבים)</label>
                  <input
                    {...nfp("hotelStars", "hotel", "stars")}
                    name="stars"
                    type="number"
                    min="1"
                    max="5"
                    value={formData.hotel.stars}
                    onChange={(e) => handleNestedInputChange("hotel", e)}
                    placeholder="דירוג (כוכבים)"
                  />
                  {submitted && fieldErrors["hotel.stars"] && (
                    <span
                      id="hotelStars-error"
                      className="field-error-msg"
                      role="alert"
                    >
                      {fieldErrors["hotel.stars"]}
                    </span>
                  )}
                </div>
                <div className="form-field">
                  <label htmlFor="hotelRoom">סוג חדר</label>
                  <input
                    {...nfp("hotelRoom", "hotel", "room")}
                    name="room"
                    value={formData.hotel.room}
                    onChange={(e) => handleNestedInputChange("hotel", e)}
                    placeholder="סוג חדר"
                  />
                  {submitted && fieldErrors["hotel.room"] && (
                    <span
                      id="hotelRoom-error"
                      className="field-error-msg"
                      role="alert"
                    >
                      {fieldErrors["hotel.room"]}
                    </span>
                  )}
                </div>
                <div className="form-field">
                  <label htmlFor="hotelMeals">בסיס אירוח</label>
                  <input
                    {...nfp("hotelMeals", "hotel", "meals")}
                    name="meals"
                    value={formData.hotel.meals}
                    onChange={(e) => handleNestedInputChange("hotel", e)}
                    placeholder="בסיס אירוח"
                  />
                  {submitted && fieldErrors["hotel.meals"] && (
                    <span
                      id="hotelMeals-error"
                      className="field-error-msg"
                      role="alert"
                    >
                      {fieldErrors["hotel.meals"]}
                    </span>
                  )}
                </div>
              </fieldset>

              <p className="required-note">
                <span className="req" aria-hidden="true">
                  *
                </span>{" "}
                שדות חובה
              </p>

              <div className="modal-actions">
                <button type="button" onClick={handleCloseModal}>
                  ביטול
                </button>
                <button type="submit" disabled={loading} aria-busy={loading}>
                  {loading ? "שומר..." : "שמור"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
