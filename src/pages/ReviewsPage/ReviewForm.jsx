import React, { useState } from "react";
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
  });

  const [uploadedImages, setUploadedImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);

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
    console.log("subbbbbbbb");
    e.preventDefault();

    const { reviewer_name, destination, review_text, rating, will_book_again } =
      formData;

    if (
      !reviewer_name ||
      !destination ||
      !review_text ||
      !rating ||
      !will_book_again
    ) {
      alert("אנא מלא את כל השדות");
      return;
    }

    try {
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
        image_urls: uploadedImageUrls,
        createdAt: serverTimestamp(),
        approved: false,
      });

      alert("תודה! הביקורת נשלחה לאישור 🙏");

      setFormData({
        reviewer_name: "",
        destination: "",
        review_text: "",
        rating: 0,
        will_book_again: "",
      });
      setUploadedImages([]);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("אירעה שגיאה בשליחת הביקורת");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="review-form" dir="rtl">
      <div className="form-header">
        <h2>שתפו אותנו בחוויה שלכם</h2>
        <p>נשמח לשמוע חוות דעת על השירות שקיבלתם מאיתנו</p>
      </div>

      <div className="form-grid">
        <div className="input-group">
          <label>שם מלא</label>
          <input
            name="reviewer_name"
            type="text"
            value={formData.reviewer_name}
            onChange={handleInputChange}
            placeholder="הקלידו את שמכם"
            required
          />
        </div>

        <div className="input-group">
          <label>יעד</label>
          <input
            name="destination"
            type="text"
            value={formData.destination}
            onChange={handleInputChange}
            placeholder="לאן טסתם?"
            required
          />
        </div>
      </div>

      <div className="input-group">
        <label>דירוג</label>
        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => handleRatingClick(star)}
              className={`star ${formData.rating >= star ? "active" : ""}`}
            >
              <Star className="star-icon" />
            </button>
          ))}
        </div>
      </div>

      <div className="input-group">
        <label>חוות דעת</label>
        <textarea
          name="review_text"
          value={formData.review_text}
          onChange={handleInputChange}
          placeholder="איך הייתה החוויה שלכם?"
          required
        />
      </div>

      <div className="input-group">
        <label>האם תסגרו דרכנו שוב?</label>
        <ToggleButtonGroup
          value={formData.will_book_again}
          onChange={(val) =>
            setFormData((prev) => ({ ...prev, will_book_again: val }))
          }
        />
      </div>

      <div className="input-group">
        <label>העלאת תמונות מהחופשה שלכם</label>
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
          />
          <label htmlFor="image-upload" className="upload-label">
            <Upload className="upload-icon" />
            <span>לחצו להעלאה או גררו תמונות</span>
            <small>קבצי PNG, JPG, GIF עד 10MB</small>
          </label>
        </div>

        {uploadedImages.length > 0 && (
          <div className="uploaded-images">
            {uploadedImages.map((image, index) => (
              <div key={index} className="uploaded-image">
                <img src={image.url} alt={image.name} />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="remove-image"
                >
                  <X />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button type="submit" className="submit-button">
        שליחה
      </button>
    </form>
  );
}
