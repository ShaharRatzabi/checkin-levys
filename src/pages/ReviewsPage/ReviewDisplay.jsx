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
  Loader2,
} from "lucide-react";
import "./ReviewDisplay.css";

export default function ReviewDisplay({ reviews }) {
  // modalData = { images, currentIndex, loadedSrc }
  // loadedSrc=null → overlay פתוח, spinner מופיע, תמונה טוענת ברקע
  // loadedSrc=url  → תמונה מוכנה, מציגים אותה
  const [modalData, setModalData] = useState(null);

  const modalRef = useRef(null);
  const triggerRef = useRef(null);
  const contentRef = useRef(null);
  const preloadRef = useRef(null); // Image() object של הטעינה הנוכחית

  // ✅ טעינה ב-Image() ברקע — מציגים overlay+spinner מיד, תמונה רק אחרי load
  const preloadAndShow = (images, index, onReady) => {
    // ביטול טעינה קודמת
    if (preloadRef.current) {
      preloadRef.current.onload = null;
      preloadRef.current.onerror = null;
    }
    const img = new Image();
    preloadRef.current = img;
    img.onload = () => onReady(images[index]);
    img.onerror = () => onReady(images[index]); // גם בשגיאה — מציגים
    img.src = images[index];
  };

  const openModal = (imageUrls, index, buttonEl) => {
    triggerRef.current = buttonEl;
    // פותחים overlay עם spinner, ללא תמונה עדיין
    setModalData({ images: imageUrls, currentIndex: index, loadedSrc: null });
    preloadAndShow(imageUrls, index, (src) => {
      setModalData((prev) => (prev ? { ...prev, loadedSrc: src } : prev));
    });
  };

  const closeModal = () => {
    if (preloadRef.current) {
      preloadRef.current.onload = null;
      preloadRef.current.onerror = null;
    }
    // ✅ מציגים spinner בסגירה — מסירים את loadedSrc, ממתינים רגע ואז סוגרים
    setModalData((prev) => (prev ? { ...prev, loadedSrc: null } : null));
    setTimeout(() => {
      setModalData(null);
      triggerRef.current?.focus();
    }, 400);
  };

  const navigateModal = (e, direction) => {
    e.stopPropagation();
    // ✅ דפדוף מיידי — ללא spinner, מחליפים תמונה ישירות
    setModalData((prev) => {
      if (!prev) return prev;
      const nextIndex =
        (prev.currentIndex + direction + prev.images.length) %
        prev.images.length;
      return {
        ...prev,
        currentIndex: nextIndex,
        loadedSrc: prev.images[nextIndex],
      };
    });
  };

  // ✅ פוקוס על כפתור הסגירה בפתיחת המודאל
  useEffect(() => {
    if (modalData && modalRef.current) {
      const closeBtn = modalRef.current.querySelector(".modal-nav-btn.close");
      closeBtn?.focus();
    }
  }, [!!modalData]);

  // נעילת סקרול ו-inert כשהמודאל פתוח
  useEffect(() => {
    const headerEl = document.querySelector("header");
    const bubbleEl = document.querySelector(".floating-bubble-wrapper");
    const isModalOpen = !!modalData;

    document.body.style.overflow = isModalOpen ? "hidden" : "";
    if (contentRef.current) contentRef.current.inert = isModalOpen;
    if (headerEl) headerEl.inert = isModalOpen;
    if (bubbleEl) bubbleEl.inert = isModalOpen;

    return () => {
      document.body.style.overflow = "";
    };
  }, [modalData]);

  // טיפול במקלדת (Escape, חצים, Tab Trap)
  useEffect(() => {
    if (!modalData || !modalRef.current) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") navigateModal(e, 1);
      if (e.key === "ArrowLeft") navigateModal(e, -1);

      if (e.key === "Tab") {
        const focusable = modalRef.current.querySelectorAll("button");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [modalData]);

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
      {/* תצוגת מודאל באמצעות Portal */}
      {modalData &&
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
              aria-label="גלריית תמונות מהחופשה"
              aria-live="polite"
            >
              {/* ✅ כפתור סגירה — קבוע, תמיד גלוי */}
              <button
                className="modal-nav-btn close"
                onClick={closeModal}
                aria-label="סגור וחזור לעמוד"
              >
                <X size={20} />
              </button>

              {/* ✅ חצי ניווט — קבועים, לא זזים עם התמונה */}
              {modalData.images.length > 1 && (
                <>
                  <button
                    className="modal-nav-btn prev"
                    onClick={(e) => navigateModal(e, -1)}
                    aria-label={`תמונה קודמת (${((modalData.currentIndex - 1 + modalData.images.length) % modalData.images.length) + 1} מתוך ${modalData.images.length})`}
                  >
                    <ChevronRight size={28} />
                  </button>
                  <button
                    className="modal-nav-btn next"
                    onClick={(e) => navigateModal(e, 1)}
                    aria-label={`תמונה הבאה (${(modalData.currentIndex % modalData.images.length) + 2 > modalData.images.length ? 1 : modalData.currentIndex + 2} מתוך ${modalData.images.length})`}
                  >
                    <ChevronLeft size={28} />
                  </button>
                </>
              )}

              {/* ✅ wrapper: spinner כשעדיין טוען, תמונה אחרי load */}
              <div className="modal-image-wrapper">
                {!modalData.loadedSrc && (
                  <Loader2
                    className="modal-loader"
                    size={48}
                    aria-label="טוען תמונה"
                  />
                )}
                {modalData.loadedSrc && (
                  <img
                    key={modalData.loadedSrc}
                    src={modalData.loadedSrc}
                    alt={`תמונה ${modalData.currentIndex + 1} מתוך ${modalData.images.length} מהחופשה`}
                  />
                )}
              </div>

              {/* ✅ מונה נגיש — aria-hidden כי המידע קיים ב-aria-label של כפתורי הניווט */}
              <div className="modal-counter" aria-hidden="true">
                {modalData.currentIndex + 1} / {modalData.images.length}
              </div>
            </div>
          </div>,
          document.body,
        )}

      <div ref={contentRef}>
        <div className="reviews-header">
          <h2>תקשיבו ללקוחות שלנו</h2>
        </div>

        <div className="reviews-grid">
          {reviews.map((review) => (
            <article key={review.id} className="review-card">
              {/* ✅ review-main-body נמתח, הפוטר נדחף לתחתית */}
              <div className="review-main-body">
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
                    aria-label={`דירוג ${review.rating} מתוך 5`}
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
                  <div className="review-images" role="list">
                    {review.image_urls.map((url, index) => (
                      <div key={index} className="review-image" role="listitem">
                        <button
                          className="image-button"
                          onClick={(e) =>
                            openModal(review.image_urls, index, e.currentTarget)
                          }
                          aria-label={`פתח תמונה ${index + 1} מתוך ${review.image_urls.length} בתצוגה מלאה`}
                        >
                          <img
                            src={url}
                            alt="תצוגה מקדימה מהחופשה"
                            loading="lazy"
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ✅ פוטר — תמיד צמוד לתחתית הכרטיס */}
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
