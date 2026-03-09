import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  Star,
  MapPin,
  Calendar,
  Plane,
  X,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import "./ReviewDisplay.css";

const MAX_PREVIEW_IMAGES = 3;
const MAX_TEXT_LENGTH = 100;

export default function ReviewDisplay({ reviews }) {
  const [galleryState, setGalleryState] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});
  const modalRef = useRef(null);
  const triggerRef = useRef(null);
  const contentRef = useRef(null);

  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openGallery = (images, startIndex, buttonEl) => {
    triggerRef.current = buttonEl;
    setGalleryState({ images, currentIndex: startIndex });
  };

  const closeGallery = () => {
    setGalleryState(null);
    setTimeout(() => triggerRef.current?.focus(), 50);
  };

  const goToImage = (index) => {
    if (!galleryState) return;
    const len = galleryState.images.length;
    const newIndex = ((index % len) + len) % len;
    setGalleryState((prev) => ({ ...prev, currentIndex: newIndex }));
  };

  useEffect(() => {
    const headerEl = document.querySelector("header");
    const bubbleEl = document.querySelector(".floating-bubble-wrapper");

    if (galleryState) {
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
  }, [galleryState]);

  useEffect(() => {
    if (!galleryState || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    first?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeGallery();
        return;
      }
      if (e.key === "ArrowLeft") {
        goToImage(galleryState.currentIndex + 1);
        return;
      }
      if (e.key === "ArrowRight") {
        goToImage(galleryState.currentIndex - 1);
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
  }, [galleryState]);

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
      {galleryState &&
        createPortal(
          <div
            className="image-modal-overlay"
            onClick={closeGallery}
            role="presentation"
          >
            <div
              ref={modalRef}
              className="gallery-modal"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`תצוגת תמונה ${galleryState.currentIndex + 1} מתוך ${galleryState.images.length}`}
              tabIndex={-1}
            >
              <button
                className="gallery-close-btn"
                onClick={closeGallery}
                aria-label="סגירת גלריה"
              >
                <X size={20} aria-hidden="true" />
                <span>סגור</span>
              </button>

              <img
                src={galleryState.images[galleryState.currentIndex]}
                alt={`תמונה ${galleryState.currentIndex + 1} מתוך ${galleryState.images.length}`}
                className="gallery-main-image"
              />

              {galleryState.images.length > 1 && (
                <>
                  <button
                    className="gallery-nav gallery-nav-prev"
                    onClick={() => goToImage(galleryState.currentIndex - 1)}
                    aria-label="תמונה קודמת"
                  >
                    <ChevronRight size={28} aria-hidden="true" />
                  </button>
                  <button
                    className="gallery-nav gallery-nav-next"
                    onClick={() => goToImage(galleryState.currentIndex + 1)}
                    aria-label="תמונה הבאה"
                  >
                    <ChevronLeft size={28} aria-hidden="true" />
                  </button>

                  <div className="gallery-counter" aria-hidden="true">
                    {galleryState.currentIndex + 1} /{" "}
                    {galleryState.images.length}
                  </div>

                  <div
                    className="gallery-dots"
                    role="tablist"
                    aria-label="ניווט תמונות"
                  >
                    {galleryState.images.map((_, i) => (
                      <button
                        key={i}
                        className={`gallery-dot ${i === galleryState.currentIndex ? "active" : ""}`}
                        onClick={() => goToImage(i)}
                        role="tab"
                        aria-selected={i === galleryState.currentIndex}
                        aria-label={`תמונה ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>,
          document.body,
        )}

      <div ref={contentRef}>
        <div className="reviews-header">
          <h2>תקשיבו ללקוחות שלנו</h2>
        </div>

        <div className="reviews-grid">
          {reviews.map((review) => {
            const isLongText =
              (review.review_text || "").length > MAX_TEXT_LENGTH;
            const isExpanded = expandedCards[review.id];
            const displayText =
              isLongText && !isExpanded
                ? review.review_text.slice(0, MAX_TEXT_LENGTH) + "..."
                : review.review_text;

            const images = review.image_urls || [];
            const previewImages = images.slice(0, MAX_PREVIEW_IMAGES);
            const extraCount = images.length - MAX_PREVIEW_IMAGES;

            return (
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
                  <p>{displayText}</p>
                  {isLongText && (
                    <button
                      className="read-more-btn"
                      onClick={() => toggleExpand(review.id)}
                      aria-expanded={isExpanded}
                    >
                      {isExpanded ? "הצג פחות" : "קרא עוד"}
                    </button>
                  )}
                </div>

                {previewImages.length > 0 && (
                  <div className="review-images-preview">
                    {previewImages.map((url, index) => {
                      const isLast =
                        index === previewImages.length - 1 && extraCount > 0;

                      return (
                        <button
                          key={index}
                          className="image-button review-thumbnail-btn"
                          onClick={(e) =>
                            openGallery(images, index, e.currentTarget)
                          }
                          aria-label={
                            isLast
                              ? `פתח גלריה - עוד ${extraCount} תמונות`
                              : `פתח תמונה ${index + 1} בגלריה`
                          }
                          aria-haspopup="dialog"
                        >
                          <img
                            src={url}
                            alt={`תמונה ${index + 1} מחופשת ${review.reviewer_name}`}
                          />
                          {isLast && (
                            <span
                              className="image-count-badge"
                              aria-hidden="true"
                            >
                              +{extraCount}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                <div className="review-footer">
                  {review.flight_date && (
                    <div className="review-footer-item">
                      <Plane className="meta-icon" aria-hidden="true" />
                      <span>
                        טס/ה ב-
                        <time dateTime={review.flight_date}>
                          {formatFlightDate(review.flight_date)}
                        </time>
                      </span>
                    </div>
                  )}

                  <div className="review-footer-item">
                    <Calendar className="meta-icon" aria-hidden="true" />
                    <span>
                      פורסם ב-
                      <time dateTime={review.created_date}>
                        {new Date(review.created_date).toLocaleDateString(
                          "he-IL",
                        )}
                      </time>
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
