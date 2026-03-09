import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Calendar,
  Plane,
  Hotel,
  Star,
  Clock,
  CheckCircle,
  Info,
  Luggage,
  ZoomIn,
  Users,
  Gift,
} from "lucide-react";
import "./DealCard.css";

/* =========================
   🖼️ LIGHTBOX COMPONENT
========================= */

const Lightbox = ({ src, alt, onClose }) => {
  const closeBtnRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    previousFocusRef.current = document.activeElement;
    closeBtnRef.current?.focus();

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        e.preventDefault();
        closeBtnRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      previousFocusRef.current?.focus();
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div
      className="dealcard-lightbox-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="תצוגת תמונה מלאה"
    >
      <button
        ref={closeBtnRef}
        className="dealcard-lightbox-close"
        onClick={onClose}
        aria-label="סגירת תצוגת תמונה"
      >
        <X size={24} color="#ffffff" aria-hidden="true" />
      </button>
      <img
        src={src}
        alt={alt}
        className="dealcard-lightbox-image"
        onClick={(e) => e.stopPropagation()}
      />
    </div>,
    document.body,
  );
};

/* =========================
   🃏 DEALCARD COMPONENT
========================= */

const DealCard = ({ deal, onClose }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!deal) return;
    previousFocusRef.current = document.activeElement;
    closeButtonRef.current?.focus();
    return () => {
      previousFocusRef.current?.focus();
    };
  }, [deal]);

  useEffect(() => {
    if (!deal) return;

    const handleKeyDown = (e) => {
      if (lightboxOpen) return;

      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const focusableElements = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex="0"]',
      );
      if (!focusableElements?.length) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [deal, onClose, lightboxOpen]);

  useEffect(() => {
    if (!deal) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [deal]);

  const openLightbox = useCallback(() => setLightboxOpen(true), []);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  if (!deal) return null;

  const Section = ({ icon, title, children }) => (
    <div className="deal-section">
      <div className="deal-section-header">
        <span aria-hidden="true">{icon}</span>
        <h3 className="deal-section-title">{title}</h3>
      </div>
      {children}
    </div>
  );

  const InfoBox = ({ children, columns = 2 }) => (
    <div
      className="deal-info-box"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {children}
    </div>
  );

  // בדיקה אם יש נתוני מלון
  const hasHotelData =
    deal.hotel?.name ||
    deal.hotel?.stars ||
    deal.hotel?.room ||
    deal.hotel?.meals;

  const handleWhatsAppClick = () => {
    const message = `
היי 👋
אני מעוניין בדיל הבא:

 יעד: ${deal.title}
 מחיר: החל מ-${deal.priceFrom}₪ לאדם
 תאריכים: ${deal.datesRange}${hasHotelData ? `\n מלון: ${deal.hotel?.name || "-"}` : ""}

אשמח לפרטים נוספים 🙏
    `;
    const whatsappUrl = `https://wa.me/972506514500?text=${encodeURIComponent(message.trim())}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const publishedDate = deal.createdAt ? deal.createdAt.toDate() : null;
  const formattedDate = publishedDate
    ? publishedDate.toLocaleDateString("he-IL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "-";

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const imageAlt = `תמונה של יעד הטיסה: ${deal.title}`;

  /* ✅ Portal - מרנדר ישירות ל-body, מעל כל stacking context כולל ההדר */
  return createPortal(
    <>
      <div className="dealcard-overlay" onClick={handleOverlayClick}>
        <div
          ref={dialogRef}
          className={`dealcard-container ${isMobile ? "mobile" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dealcard-dialog-title"
          lang="he"
          dir="rtl"
        >
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="dealcard-close-button"
            aria-label="סגירת פרטי העסקה"
          >
            <X size={20} color="#ffffff" aria-hidden="true" />
          </button>

          <div className="dealcard-image-wrapper">
            <button
              className="dealcard-image-button"
              onClick={openLightbox}
              aria-label="הגדלת תמונה לתצוגה מלאה"
            >
              <img
                src={deal.mainImage}
                alt={imageAlt}
                className="dealcard-image"
              />
              <span className="dealcard-image-zoom-hint" aria-hidden="true">
                <ZoomIn size={16} />
                תצוגה מלאה
              </span>
            </button>
          </div>

          <div className="dealcard-content">
            <h2 className="dealcard-title" id="dealcard-dialog-title">
              {deal.title}
            </h2>

            {deal.composition && (
              <div className="dealcard-composition">
                <Users size={16} aria-hidden="true" />
                <span>{deal.composition}</span>
              </div>
            )}

            <div className="dealcard-published">
              <Calendar size={16} aria-hidden="true" />
              <span>
                פורסם ב-
                <time dateTime={publishedDate?.toISOString()}>
                  {formattedDate}
                </time>
              </span>
            </div>

            <div className="dealcard-price">
              <div className="price-value">החל מ- {deal.priceFrom}₪ לאדם</div>
            </div>

            <Section
              icon={<Calendar size={22} color="#1d3557" />}
              title="תאריכים"
            >
              <InfoBox>
                <div>
                  <div className="info-label">תאריכים</div>
                  <div className="info-value">{deal.datesRange}</div>
                </div>
                <div style={{ textAlign: "left" }}>
                  <div className="info-label">ימים</div>
                  <div className="info-value">{deal.days}</div>
                </div>
              </InfoBox>
            </Section>

            <Section
              icon={<Plane size={22} color="#1d3557" />}
              title={`פרטי טיסה (${deal.flight?.airline})`}
            >
              <InfoBox>
                <div>
                  <div className="info-label icon-label">
                    <Clock size={14} aria-hidden="true" /> הלוך
                  </div>
                  <div className="info-value">{deal.flight?.departure}</div>
                </div>
                <div style={{ textAlign: "left" }}>
                  <div className="info-label">חזור</div>
                  <div className="info-value">{deal.flight?.return}</div>
                </div>
              </InfoBox>
            </Section>

            {deal.luggage && (
              <Section
                icon={<Luggage size={22} color="#1d3557" />}
                title="כבודה"
              >
                <div className="deal-included-box">
                  <CheckCircle size={18} aria-hidden="true" />
                  <span className="deal-included-text">{deal.luggage}</span>
                </div>
              </Section>
            )}

            {hasHotelData && (
              <Section
                icon={<Hotel size={22} color="#1d3557" />}
                title={`מלון${deal.hotel?.name ? ` ${deal.hotel.name}` : ""}`}
              >
                {deal.hotel?.stars > 0 && (
                  <div
                    className="deal-stars"
                    aria-label={`דירוג: ${deal.hotel.stars} כוכבים מתוך 5`}
                    role="img"
                  >
                    {Array.from({ length: deal.hotel.stars }).map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        fill="#fca311"
                        color="#fca311"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                )}
                <InfoBox>
                  {deal.hotel?.meals && (
                    <div>
                      <div className="info-label">ארוחות</div>
                      <div className="info-value">{deal.hotel.meals}</div>
                    </div>
                  )}
                  {deal.hotel?.room && (
                    <div style={{ textAlign: "left" }}>
                      <div className="info-label">חדר</div>
                      <div className="info-value">{deal.hotel.room}</div>
                    </div>
                  )}
                </InfoBox>
              </Section>
            )}

            {deal.extraAttraction && (
              <Section
                icon={<Gift size={22} color="#1d3557" />}
                title="תוספת מיוחדת"
              >
                <div className="deal-included-box deal-extra-attraction-box">
                  <CheckCircle size={18} aria-hidden="true" />
                  <span className="deal-included-text">
                    {deal.extraAttraction}
                  </span>
                </div>
              </Section>
            )}

            <Section
              icon={<Info size={22} color="#1d3557" />}
              title="הערות נוספות"
            >
              <p className="deal-notes-text">{deal.notes}</p>
              <p>
                המחיר הינו לאדם, כפוף לזמינות, ועשוי להשתנות בהתאם למועדי הטיסה.
                המחיר אינו כולל תוספות מיוחדות.
              </p>
              <p>הפרטים שתמסור ישמשו ליצירת קשר בלבד ולא יועברו לצד שלישי.</p>
              <p>ט.ל.ח</p>
            </Section>

            <div className="dealcard-cta">
              <button
                className="dealcard-submit-button"
                onClick={handleWhatsAppClick}
                aria-label={`פנייה בוואטסאפ לפרטים על הדיל ל${deal.title}`}
              >
                לפרטים נוספים
              </button>
            </div>
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox src={deal.mainImage} alt={imageAlt} onClose={closeLightbox} />
      )}
    </>,
    document.body,
  );
};

export default DealCard;
