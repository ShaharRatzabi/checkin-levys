import React, { useState, useRef } from "react";
import { Star, Upload, X } from "lucide-react";
import ToggleButtonGroup from "../../components/ToggleButtonGroup/ToggleButtonGroup";
import { db, storage } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./ReviewForm.css";

export default function ReviewForm() {
  const [formData, setFormData] = useState({
    reviewer_name: "",
    destination: "",
    review_text: "",
    rating: 0,
    will_book_again: "",
    flight_date: "",
  });

  const [uploadedImages, setUploadedImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingClick = (rating) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleImageUpload = (files) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const imageUrls = imageFiles.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
      file,
    }));
    setUploadedImages((prev) => [...prev, ...imageUrls]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleImageUpload(Array.from(e.dataTransfer.files));
  };

  const handleFileInput = (e) => {
    handleImageUpload(Array.from(e.target.files));
  };

  const removeImage = (index) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      reviewer_name,
      destination,
      review_text,
      rating,
      will_book_again,
      flight_date,
    } = formData;

    if (
      !reviewer_name ||
      !destination ||
      !review_text ||
      !rating ||
      !will_book_again ||
      !flight_date
    ) {
      setStatusMessage("אנא מלא את כל השדות");
      return;
    }

    try {
      setIsSubmitting(true);
      const uploadedImageUrls = [];
      for (const image of uploadedImages) {
        const response = await fetch(image.url);
        const blob = await response.blob();
        const imageRef = ref(storage, `reviews/${Date.now()}-${image.name}`);
        await uploadBytes(imageRef, blob);
        const downloadUrl = await getDownloadURL(imageRef);
        uploadedImageUrls.push(downloadUrl);
      }

      await addDoc(collection(db, "reviews"), {
        reviewer_name,
        destination,
        review_text,
        rating,
        will_book_again,
        flight_date,
        image_urls: uploadedImageUrls,
        createdAt: serverTimestamp(),
        approved: true,
      });

      setStatusMessage("תודה רבה! הביקורת שלכם פורסמה באתר 🙏");
      setFormData({
        reviewer_name: "",
        destination: "",
        review_text: "",
        rating: 0,
        will_book_again: "",
        flight_date: "",
      });
      setUploadedImages([]);
      // ✅ רענון הדף אחרי 2.5 שניות כדי שהמשתמש יספיק לראות את ההודעה
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    } catch (error) {
      console.error("Error submitting review:", error);
      setStatusMessage("אירעה שגיאה בשליחת הביקורת");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="review-form" dir="rtl" noValidate>
      <div className="form-header">
        <h2>שתפו אותנו בחוויה שלכם</h2>
        <p>נשמח לשמוע חוות דעת על השירות שקיבלתם מאיתנו</p>
      </div>

      <p className="required-note">
        <span aria-hidden="true">*</span> שדות חובה
      </p>

      {statusMessage && (
        <div className="status-modal-overlay" aria-hidden="true">
          <div className="status-modal" role="alert" aria-live="assertive">
            <p>{statusMessage}</p>
            <button
              className="status-modal-close"
              onClick={() => setStatusMessage("")}
              aria-label="סגירת הודעה"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="form-grid">
        <div className="input-group">
          <label htmlFor="reviewer_name">
            שם מלא{" "}
            <span aria-hidden="true" className="required-star">
              *
            </span>
          </label>
          <input
            id="reviewer_name"
            name="reviewer_name"
            type="text"
            value={formData.reviewer_name}
            onChange={handleInputChange}
            placeholder="הקלידו את שמכם"
            required
            aria-required="true"
            autoComplete="name"
          />
        </div>

        <div className="input-group">
          <label htmlFor="destination">
            יעד{" "}
            <span aria-hidden="true" className="required-star">
              *
            </span>
          </label>
          <input
            id="destination"
            name="destination"
            type="text"
            value={formData.destination}
            onChange={handleInputChange}
            placeholder="לאן טסתם?"
            required
            aria-required="true"
          />
        </div>
      </div>

      {/* ✅ שדה תאריך טיסה חדש */}
      <div className="input-group">
        <label htmlFor="flight_date">
          תאריך טיסה{" "}
          <span aria-hidden="true" className="required-star">
            *
          </span>
        </label>
        <input
          id="flight_date"
          name="flight_date"
          type="date"
          value={formData.flight_date}
          onChange={handleInputChange}
          required
          aria-required="true"
        />
      </div>

      <div className="input-group">
        <label id="rating-label">
          דירוג{" "}
          <span aria-hidden="true" className="required-star">
            *
          </span>
        </label>
        <div
          className="rating-stars"
          role="group"
          aria-labelledby="rating-label"
          aria-label={`דירוג נוכחי: ${formData.rating} מתוך 5 כוכבים`}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => handleRatingClick(star)}
              className={`star ${formData.rating >= star ? "active" : ""}`}
              aria-label={`דרג ${star} כוכבים`}
              aria-pressed={formData.rating >= star}
            >
              <Star className="star-icon" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="review_text">
          חוות דעת{" "}
          <span aria-hidden="true" className="required-star">
            *
          </span>
        </label>
        <textarea
          id="review_text"
          name="review_text"
          value={formData.review_text}
          onChange={handleInputChange}
          placeholder="איך הייתה החוויה שלכם?"
          required
          aria-required="true"
        />
      </div>

      <div className="input-group">
        <label id="will-book-label">
          האם תסגרו דרכנו שוב?{" "}
          <span aria-hidden="true" className="required-star">
            *
          </span>
        </label>
        <ToggleButtonGroup
          value={formData.will_book_again}
          onChange={(val) =>
            setFormData((prev) => ({ ...prev, will_book_again: val }))
          }
          aria-labelledby="will-book-label"
        />
      </div>

      <div className="input-group">
        <label htmlFor="image-upload">העלאת תמונות מהחופשה שלכם</label>
        <div
          className={`upload-zone ${dragActive ? "drag-active" : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            style={{ display: "none" }}
            id="image-upload"
            aria-label="העלאת תמונות מהחופשה"
          />
          <label htmlFor="image-upload" className="upload-label">
            <Upload className="upload-icon" aria-hidden="true" />
            <span>לחצו להעלאה או גררו תמונות</span>
            <small>קבצי PNG, JPG, GIF עד 10MB</small>
          </label>
        </div>

        {uploadedImages.length > 0 && (
          <div
            className="uploaded-images"
            role="list"
            aria-label="תמונות שהועלו"
          >
            {uploadedImages.map((image, index) => (
              <div key={index} className="uploaded-image" role="listitem">
                <img src={image.url} alt={`תמונה שהועלתה: ${image.name}`} />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="remove-image"
                  aria-label={`הסר תמונה ${image.name}`}
                >
                  <X aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="submit-button"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? "שולח..." : "שליחה"}
      </button>
    </form>
  );
}
