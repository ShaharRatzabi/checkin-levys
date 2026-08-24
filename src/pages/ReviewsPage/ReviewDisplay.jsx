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
import ResizedImage from "../../components/ResizedImage";
import { resolveResizedUrl } from "../../lib/firebaseImage";

const MAX_IMAGES = 3;

function ReviewCard({ review, openModal, formatFlightDate }) {
  const [expanded, setExpanded] = useState(false);
  const [textClamped, setTextClamped] = useState(false);
  const textRef = useRef(null);

  const hasMoreImages = (review.image_urls?.length ?? 0) > MAX_IMAGES;
  const visibleImages = expanded
    ? review.image_urls
    : review.image_urls?.slice(0, MAX_IMAGES);
  const needsToggle = textClamped || hasMoreImages;

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    if (el.scrollHeight > el.clientHeight + 2) {
      setTextClamped(true);
    }
  }, []);

  return (
    <article className="review-card">
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
          <p
            ref={textRef}
            className={expanded ? "" : "review-text-clamped"}
          >
            {review.review_text}
          </p>
        </div>

        {visibleImages?.length > 0 && (
          <div className="review-images" role="list">
            {visibleImages.map((url, index) => (
              <div key={index} className="review-image" role="listitem">
                <button
                  className="image-button"
                  onClick={(e) =>
                    openModal(review.image_urls, index, e.currentTarget)
                  }
                  aria-label={`פתח תמונה ${index + 1} מתוך ${review.image_urls.length} בתצוגה מלאה`}
                >
                  <ResizedImage
                    originalUrl={url}
                    size={400}
                    alt="תצוגה מקדימה מהחופשה"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              </div>
            ))}
            {!expanded && hasMoreImages && (
              <div
                className="review-image-more"
                aria-hidden="true"
                onClick={() => setExpanded(true)}
              >
                +{review.image_urls.length - MAX_IMAGES}
              </div>
            )}
          </div>
        )}

        {needsToggle && (
          <button
            className="review-read-more-btn"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
          >
            {expanded ? "קרא פחות ▲" : "קרא עוד ▼"}
          </button>
        )}
      </div>

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
              {new Date(review.created_date).toLocaleDateString("he-IL")}
            </time>
          </span>
        </div>
      </div>
    </article>
  );
}

export default function ReviewDisplay({ reviews }) {
  const [modalData, setModalData] = useState(null);

  const modalRef = useRef(null);
  const triggerRef = useRef(null);
  const contentRef = useRef(null);
  const preloadRef = useRef(null);

  const preloadAndShow = (images, index, onReady) => {
    if (preloadRef.current) {
      preloadRef.current.onload = null;
      preloadRef.current.onerror = null;
    }
    const img = new Image();
    preloadRef.current = img;
    resolveResizedUrl(images[index], 1600).then((resolvedSrc) => {
      if (preloadRef.current !== img) return;
      img.onload = () => onReady(resolvedSrc);
      img.onerror = () => onReady(resolvedSrc);
      img.src = resolvedSrc;
    });
  };

  const openModal = (imageUrls, index, buttonEl) => {
    triggerRef.current = buttonEl;
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
    setModalData((prev) => (prev ? { ...prev, loadedSrc: null } : null));
    setTimeout(() => {
      setModalData(null);
      triggerRef.current?.focus();
    }, 400);
  };

  const navigateModal = (e, direction) => {
    e.stopPropagation();
    if (!modalData) return;
    const nextIndex =
      (modalData.currentIndex + direction + modalData.images.length) %
      modalData.images.length;
    const nextOriginal = modalData.images[nextIndex];
    setModalData((prev) =>
      prev ? { ...prev, currentIndex: nextIndex } : prev,
    );
    resolveResizedUrl(nextOriginal, 1600).then((src) => {
      setModalData((prev) => {
        if (!prev || prev.currentIndex !== nextIndex) return prev;
        return { ...prev, loadedSrc: src };
      });
    });
  };

  useEffect(() => {
    if (modalData && modalRef.current) {
      const closeBtn = modalRef.current.querySelector(".modal-nav-btn.close");
      closeBtn?.focus();
    }
  }, [!!modalData]);

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
              <button
                className="modal-nav-btn close"
                onClick={closeModal}
                aria-label="סגור וחזור לעמוד"
              >
                <X size={20} />
              </button>

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
                    decoding="async"
                  />
                )}
              </div>

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
            <ReviewCard
              key={review.id}
              review={review}
              openModal={openModal}
              formatFlightDate={formatFlightDate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
