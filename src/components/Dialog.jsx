import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const Dialog = ({ isOpen, onClose, title, imageUrl, children }) => {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);

  // ✅ כל ה-Hooks לפני כל return — חוק Hooks של React
  useEffect(() => {
    if (!isOpen) return;

    // ✅ שמירת פוקוס קודם + החזרה בסגירה (SI 5568 סעיף 2.4.3)
    previousFocusRef.current = document.activeElement;

    // ✅ נעילת גלילת רקע
    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    const focusableElements = dialogRef.current?.querySelectorAll(
      'a[href], button:not([disabled]), input, textarea, select, [tabindex="0"]',
    );
    if (!focusableElements?.length) return;

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      // ✅ החזרת פוקוס לאלמנט הקודם
      previousFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  /* ✅ Portal — מרנדר ישירות ל-body, מעל כל stacking context כולל ההדר */
  return createPortal(
    <>
      <style>{`
        .dialog-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          z-index: 6000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow-y: auto;
        }

        .dialog-container {
          direction: rtl;
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.24));
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 24px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          max-width: 700px;
          width: 100%;
          padding: 2rem;
          position: relative;
          animation: dialogZoomIn 0.3s ease-out;
          height: auto;
          margin: 3rem;
        }

        @keyframes dialogZoomIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .dialog-container { animation: none; }
          .dialog-close-button { transition: none; }
        }

        .dialog-close-button {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(0, 0, 0, 0.08);
          border-radius: 9999px;
          width: 2.5rem;
          height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: 1px solid rgba(0, 0, 0, 0.1);
          transition: background-color 0.2s ease, transform 0.2s ease;
        }

        .dialog-close-button:hover {
          background-color: rgba(0, 0, 0, 0.15);
          transform: rotate(90deg);
        }

        .dialog-close-button:focus-visible {
          outline: 3px solid #e76d2c;
          outline-offset: 3px;
        }

        .dialog-title {
          font-size: 2.25rem;
          font-weight: 700;
          margin: 0 !important;
          text-align: center;
          background-image: linear-gradient(135deg, #e76d2c 0%, #ff7d41ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .dialog-content {
          font-weight: bold;
          font-size: 1.125rem;
          color: #374151;
          line-height: 1.75;
          margin-bottom: 2rem;
          max-height: 70vh;
          overflow-y: auto;
          padding-right: 0.5rem;
          text-align: center;
        }

        .dialog-image-wrapper {
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
          max-height: 90vh;
        }

        .dialog-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
        }

        @media (max-width: 768px) {
          .dialog-overlay { align-items: flex-start; }
          .dialog-container { padding: 1rem; }
          .dialog-title { font-size: 1.5rem; }
          .dialog-content { font-size: 1rem; }
          .dialog-image-wrapper { aspect-ratio: auto; max-height: 40vh; }
        }
      `}</style>

      <div className="dialog-overlay" onClick={handleOverlayClick}>
        <div
          ref={dialogRef}
          className="dialog-container"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          lang="he"
          dir="rtl"
        >
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="dialog-close-button"
            aria-label="סגירת החלון"
          >
            <X size={24} color="#374151" aria-hidden="true" />
          </button>

          <h2 className="dialog-title" id="dialog-title">
            {title}
          </h2>

          <div className="dialog-content">{children}</div>

          {imageUrl && (
            <div className="dialog-image-wrapper">
              <img
                src={imageUrl}
                alt={`תמונה: ${title}`}
                className="dialog-image"
              />
            </div>
          )}
        </div>
      </div>
    </>,
    document.body,
  );
};

export default Dialog;
