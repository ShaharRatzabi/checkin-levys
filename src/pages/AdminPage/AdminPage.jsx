import React, { useState, useEffect, useRef } from "react";

import "./AdminPage.css";

// ייבוא השירותים שהגדרנו בקובץ firebase.js
import { db, storage } from "../../firebase";

// ייבוא פונקציות ספציפיות מפיירבייס
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// --- שינוי: הוספת שדות 'luggage' ו-'notes' למצב ההתחלתי ---
const initialFormState = {
  title: "",
  priceFrom: "",
  country: "",
  mainImage: "",
  days: "",
  datesRange: "",
  luggage: "", // <-- שדה חדש לכבודה
  notes: "", // <-- שדה חדש להערות
  flight: { airline: "", departure: "", return: "" },
  hotel: { name: "", stars: "", room: "", meals: "" },
};

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
  const fileInputRef = useRef(null);

  const dealsCollectionRef = collection(db, "deals");

  const fetchReviews = async () => {
    setReviewsLoading(true);
    try {
      const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));

      const snapshot = await getDocs(q);

      const fetchedReviews = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setReviews(fetchedReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
    fetchReviews();
  }, []);

  const handleApproveReview = async (id) => {
    try {
      await updateDoc(doc(db, "reviews", id), {
        approved: true,
      });
      fetchReviews(); // רענון
    } catch (error) {
      console.error("Error approving review:", error);
    }
  };

  const fetchDeals = async () => {
    setLoading(true);
    try {
      const dealsQuery = query(
        dealsCollectionRef,
        orderBy("createdAt", "desc"),
      );
      const data = await getDocs(dealsQuery);
      const fetchedDeals = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDeals(fetchedDeals);
    } catch (error) {
      console.error("Error fetching deals:", error);
    }
    setLoading(false);
  };

  const handleShowReview = async (id) => {
    try {
      await updateDoc(doc(db, "reviews", id), {
        approved: true,
      });
      fetchReviews();
    } catch (error) {
      console.error("Error showing review:", error);
    }
  };

  const handleHideReview = async (id) => {
    try {
      await updateDoc(doc(db, "reviews", id), {
        approved: false,
      });
      fetchReviews();
    } catch (error) {
      console.error("Error hiding review:", error);
    }
  };

  const handleOpenModal = (deal = null) => {
    if (deal) {
      setEditingDeal(deal);
      // הטענת כל הנתונים מהדיל הקיים, כולל החדשים
      setFormData({
        ...initialFormState,
        ...deal,
        flight: deal.flight || initialFormState.flight,
        hotel: deal.hotel || initialFormState.hotel,
      });
      setPreviewImage(deal.mainImage);
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
  };

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

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0])
      handleFileSelect(e.dataTransfer.files[0]);
  };
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0])
      handleFileSelect(e.target.files[0]);
  };
  const handleFileSelect = (file) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSaveDeal = async (e) => {
    e.preventDefault();
    setLoading(true);
    let dealData = { ...formData };

    if (imageFile) {
      const imageRef = ref(
        storage,
        `deals_images/${imageFile.name + Date.now()}`,
      );
      try {
        await uploadBytes(imageRef, imageFile);
        dealData.mainImage = await getDownloadURL(imageRef);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image.");
        setLoading(false);
        return;
      }
    }

    try {
      if (editingDeal) {
        const dealDoc = doc(db, "deals", editingDeal.id);
        await updateDoc(dealDoc, dealData);
      } else {
        dealData.createdAt = new Date();
        await addDoc(dealsCollectionRef, dealData);
      }
      fetchDeals();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving deal:", error);
    }
    setLoading(false);
  };

  const handleDeleteDeal = async (id) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק את הדיל?")) {
      try {
        const dealDoc = doc(db, "deals", id);
        await deleteDoc(dealDoc);
        fetchDeals();
      } catch (error) {
        console.error("Error deleting deal:", error);
      }
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>ניהול דילים</h1>
        <button className="add-deal-btn" onClick={() => handleOpenModal()}>
          + הוסף דיל חדש
        </button>
      </header>

      {loading ? (
        <div className="loading-indicator">טוען...</div>
      ) : (
        <div className="deals-table-container">
          <table>
            <thead>
              <tr>
                <th>שם החבילה</th>
                <th>מדינה</th>
                <th>מחיר</th>
                <th>ימים</th>
                <th>פעולות</th>
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
                      onClick={() => handleOpenModal(deal)}
                    >
                      ערוך
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDeleteDeal(deal.id)}
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

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editingDeal ? "עריכת דיל" : "הוספת דיל חדש"}</h2>
            <form onSubmit={handleSaveDeal} className="deal-form">
              <input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="שם החבילה"
                required
              />
              <input
                name="priceFrom"
                type="number"
                value={formData.priceFrom}
                onChange={handleInputChange}
                placeholder="מחיר החל מ-"
                required
              />
              <input
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="מדינה (לדוגמה: יוון)"
                required
              />
              <input
                name="days"
                type="number"
                value={formData.days}
                onChange={handleInputChange}
                placeholder="מספר ימים"
              />
              <input
                name="datesRange"
                value={formData.datesRange}
                onChange={handleInputChange}
                placeholder="טווח תאריכים"
              />

              {/* --- הוספה: שדות חדשים לטופס --- */}
              <input
                name="luggage"
                value={formData.luggage}
                onChange={handleInputChange}
                placeholder="מידע על כבודה (לדוגמה: כולל טרולי ומזוודה)"
              />
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="הערות נוספות (אופציונלי)"
                rows="3"
              ></textarea>

              <div
                className="upload-area"
                onClick={() => fileInputRef.current.click()}
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
                />
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="תצוגה מקדימה"
                    className="image-preview"
                  />
                ) : (
                  <div className="upload-placeholder">
                    <span>גרור לכאן תמונה או לחץ לבחירה</span>
                    <small>מומלץ תמונה ביחס 16:9</small>
                  </div>
                )}
              </div>

              <fieldset>
                <legend>פרטי טיסה</legend>
                <input
                  name="airline"
                  value={formData.flight.airline}
                  onChange={(e) => handleNestedInputChange("flight", e)}
                  placeholder="חברת תעופה"
                />
                <input
                  name="departure"
                  value={formData.flight.departure}
                  onChange={(e) => handleNestedInputChange("flight", e)}
                  placeholder="שעת המראה"
                />
                <input
                  name="return"
                  value={formData.flight.return}
                  onChange={(e) => handleNestedInputChange("flight", e)}
                  placeholder="שעת חזרה"
                />
              </fieldset>

              <fieldset>
                <legend>פרטי מלון</legend>
                <input
                  name="name"
                  value={formData.hotel.name}
                  onChange={(e) => handleNestedInputChange("hotel", e)}
                  placeholder="שם המלון"
                />
                <input
                  name="stars"
                  type="number"
                  min="1"
                  max="5"
                  value={formData.hotel.stars}
                  onChange={(e) => handleNestedInputChange("hotel", e)}
                  placeholder="דירוג (כוכבים)"
                />
                <input
                  name="room"
                  value={formData.hotel.room}
                  onChange={(e) => handleNestedInputChange("hotel", e)}
                  placeholder="סוג חדר"
                />
                <input
                  name="meals"
                  value={formData.hotel.meals}
                  onChange={(e) => handleNestedInputChange("hotel", e)}
                  placeholder="בסיס אירוח"
                />
              </fieldset>

              <div className="modal-actions">
                <button type="button" onClick={handleCloseModal}>
                  ביטול
                </button>
                <button type="submit" disabled={loading}>
                  {loading ? "שומר..." : "שמור"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <h1>ניהול ביקורות</h1>

      {reviewsLoading ? (
        <p>טוען ביקורות...</p>
      ) : reviews.length === 0 ? (
        <p>אין ביקורות</p>
      ) : (
        <div className="deals-table-container">
          <table>
            <thead>
              <tr>
                <th>שם</th>
                <th>יעד</th>
                <th>דירוג</th>
                <th>סוגר שוב?</th>
                <th>סטטוס</th>
                <th>פעולות</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id}>
                  <td>{review.reviewer_name}</td>
                  <td>{review.destination}</td>
                  <td>{review.rating} ⭐</td>
                  <td>{review.will_book_again === "yes" ? "כן" : "לא"}</td>
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
                    {review.approved ? (
                      <button
                        className="action-btn delete"
                        onClick={() => handleHideReview(review.id)}
                      >
                        הסתר
                      </button>
                    ) : (
                      <button
                        className="action-btn edit"
                        onClick={() => handleShowReview(review.id)}
                      >
                        הצג באתר
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
