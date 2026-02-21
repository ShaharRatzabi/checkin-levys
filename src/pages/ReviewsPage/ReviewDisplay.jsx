import React, { useState } from "react";
import { Star, MapPin, Calendar, X } from "lucide-react";
import "./ReviewDisplay.css";

export default function ReviewDisplay({ reviews }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const closeModal = () => setSelectedImage(null);

  return (
    <div className="reviews-container">
      {selectedImage && (
        <div className="image-modal" onClick={closeModal}>
          <div
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-button" onClick={closeModal}>
              <X />
            </button>
            <img src={selectedImage} alt="Full view" />
          </div>
        </div>
      )}

      <div className="reviews-header">
        <h2>תקשיבו ללקוחות שלנו</h2>
      </div>

      <div className="reviews-grid">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <div className="reviewer-info">
                <div className="reviewer-avatar">
                  {review.reviewer_name.charAt(0).toUpperCase()}
                </div>
                <div className="reviewer-details">
                  <h4>{review.reviewer_name}</h4>
                  <div className="review-meta">
                    <MapPin className="meta-icon" />
                    <span>{review.destination}</span>
                  </div>
                </div>
              </div>
              <div className="review-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`rating-star ${
                      review.rating >= star ? "filled" : ""
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="review-content">
              <p>{review.review_text}</p>
            </div>

            {review.image_urls?.length > 0 && (
              <div className="review-images">
                {review.image_urls.map((url, index) => (
                  <div key={index} className="review-image">
                    <img
                      src={url}
                      alt={`Review ${index + 1}`}
                      onClick={() => setSelectedImage(url)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="review-footer">
              <div className="review-date">
                <Calendar className="meta-icon" />
                <span>
                  {new Date(review.created_date).toLocaleDateString("en-GB")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
