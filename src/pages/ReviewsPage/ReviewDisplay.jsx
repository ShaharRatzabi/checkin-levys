import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Star, MapPin, Calendar, Plane, X } from "lucide-react";
import "./ReviewDisplay.css";

export default function ReviewDisplay({ reviews }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const modalRef = useRef(null);
  const triggerRef = useRef(null);
  const contentRef = useRef(null);

  const openModal = (url, buttonEl) => {
    triggerRef.current = buttonEl;
    setSelectedImage(url);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setTimeout(() => triggerRef.current?.focus(), 50);
  };

  // ✅ נעילת סקרול + inert על כל מה שמאחורי המודאל
  useEffect(() => {
    const headerEl = document.querySelector("header");
    const bubbleEl = document.querySelector(".floating-bubble-wrapper");

    if (selectedImage) {
      document.body.style.overflow = "hidden";
      if (contentRef.current) contentRef.current.inert = true;
      if (headerEl) headerEl.inert = true;
      if (bubbleEl) bubbleEl.inert = true;
    } else {
      document.body.style.overflow = "";
      if (contentRef.current) contentRef.current.inert = false;
      if (headerEl) headerEl.inert = false;
      if (bubbleEl) bubbleEl.inert = false;
    }

    return () => {
      document.body.style.overflow = "";
      if (contentRef.current) contentRef.current.inert = false;
      if (headerEl) headerEl.inert = false;
      if (bubbleEl) bubbleEl.inert = false;
    };
  }, [selectedImage]);

  // ✅ מלכודת פוקוס + סגירה ב-Escape
  useEffect(() => {
    if (!selectedImage || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    first?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
        return;
      }
      if (e.key !== "Tab") return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  const formatFlightDate = (dateStr) => {
    if (!dateStr) return null;
    try {
      return new Date(dateStr).toLocaleDateString("he-IL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="reviews-container">
      {/*
        ✅ Portal — מרנדר את המודאל ישירות ב-document.body
        כדי שה-z-index שלו לא יהיה כלוא בתוך stacking context
        של .reviews-content (z-index: 1)
      */}
      {selectedImage &&
        createPortal(
          <div
            className="image-modal-overlay"
            onClick={closeModal}
            role="presentation"
          >
            <div
              ref={modalRef}
              className="image-modal-content"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="תצוגת תמונה מלאה"
              tabIndex={-1}
            >
              <button
                className="close-button"
                onClick={closeModal}
                aria-label="סגירת תמונה"
              >
                <X aria-hidden="true" />
              </button>
              <img src={selectedImage} alt="תמונה בתצוגה מלאה" />
            </div>
          </div>,
          document.body,
        )}

      {/* ✅ כל התוכן עטוף ב-ref שנהפך ל-inert כשמודאל פתוח */}
      <div ref={contentRef}>
        <div className="reviews-header">
          <h2>תקשיבו ללקוחות שלנו</h2>
        </div>

        <div className="reviews-grid">
          {reviews.map((review) => (
            <article key={review.id} className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar" aria-hidden="true">
                    {review.reviewer_name.charAt(0).toUpperCase()}
                  </div>
                  <div className="reviewer-details">
                    <h3>{review.reviewer_name}</h3>
                    <div className="review-meta">
                      <MapPin className="meta-icon" aria-hidden="true" />
                      <span>{review.destination}</span>
                    </div>
                  </div>
                </div>

                <div
                  className="review-rating"
                  role="img"
                  aria-label={`דירוג ${review.rating} מתוך 5 כוכבים`}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`rating-star ${review.rating >= star ? "filled" : ""}`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>

              <div className="review-content">
                <p>{review.review_text}</p>
              </div>

              {review.image_urls?.length > 0 && (
                <div
                  className="review-images"
                  role="list"
                  aria-label="תמונות מהחופשה"
                >
                  {review.image_urls.map((url, index) => (
                    <div key={index} className="review-image" role="listitem">
                      <button
                        className="image-button"
                        onClick={(e) => openModal(url, e.currentTarget)}
                        aria-label={`פתח תמונה ${index + 1} בתצוגה מלאה`}
                        aria-haspopup="dialog"
                      >
                        <img
                          src={url}
                          alt={`תמונה ${index + 1} מחופשת ${review.reviewer_name} ב${review.destination}`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="review-footer">
                {review.flight_date && (
                  <div className="review-footer-item">
                    <Plane className="meta-icon" aria-hidden="true" />
                    <span>
                      טס/ה ב־
                      <time dateTime={review.flight_date}>
                        {formatFlightDate(review.flight_date)}
                      </time>
                    </span>
                  </div>
                )}

                <div className="review-footer-item">
                  <Calendar className="meta-icon" aria-hidden="true" />
                  <span>
                    פורסם ב־
                    <time dateTime={review.created_date}>
                      {new Date(review.created_date).toLocaleDateString(
                        "he-IL",
                      )}
                    </time>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
