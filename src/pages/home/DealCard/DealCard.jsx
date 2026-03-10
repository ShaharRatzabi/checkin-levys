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
   🖼️ LIGHTBOX
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

  return createPortal(
    <div
      className="dealcard-lightbox-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
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
   🃏 DEALCARD
========================= */
const DealCard = ({ deal, onClose }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // ─── הרכב נבחר ─────────────────────────────────────────────────────────
  const compositions =
    deal.compositions && deal.compositions.length > 0
      ? deal.compositions
      : deal.composition
        ? [
            {
              value: deal.composition,
              price: deal.priceFrom || "",
              priceLabel: deal.priceLabel || "לאדם",
            },
          ]
        : [];

  // Ensure all compositions have priceLabel
  const normalizedCompositions = compositions.map((c) => ({
    ...c,
    priceLabel: c.priceLabel || "לאדם",
  }));

  const [selectedComp, setSelectedComp] = useState(
    normalizedCompositions[0] || null,
  );

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

  const hasHotelData =
    deal.hotel?.name ||
    deal.hotel?.stars ||
    deal.hotel?.room ||
    deal.hotel?.meals;

  const handleWhatsAppClick = () => {
    const compLine = selectedComp
      ? `\n הרכב: ${selectedComp.value}${selectedComp.price ? ` — ₪${selectedComp.price} ${selectedComp.priceLabel || "לאדם"}` : ""}`
      : "";
    const message = `
היי 👋
אני מעוניין בדיל הבא:

 יעד: ${deal.title}${compLine}
 תאריכים: ${deal.datesRange}${hasHotelData ? `\n מלון: ${deal.hotel?.name || "-"}` : ""}

אשמח לפרטים נוספים ולסגור דיל 🙏
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

  const imageAlt = `תמונה של יעד הטיסה: ${deal.title}`;

  const currentPrice = selectedComp?.price || deal.priceFrom;
  // ─── תווית מחיר דינמית ───────────────────────────────────────────────────
  const currentPriceLabel = selectedComp?.priceLabel || "לאדם";

  return createPortal(
    <>
      <div
        className="dealcard-overlay"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
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
                <ZoomIn size={16} /> תצוגה מלאה
              </span>
            </button>
          </div>

          <div className="dealcard-content">
            <h2 className="dealcard-title" id="dealcard-dialog-title">
              {deal.title}
            </h2>

            <div className="dealcard-published">
              <Calendar size={16} aria-hidden="true" />
              <span>
                פורסם ב-
                <time dateTime={publishedDate?.toISOString()}>
                  {formattedDate}
                </time>
              </span>
            </div>

            {/* ═══ בורר הרכבים ═══ */}
            {normalizedCompositions.length > 0 && (
              <div className="dealcard-composition-section">
                <div className="dealcard-comp-header">
                  <Users size={16} aria-hidden="true" />
                  <span>בחר הרכב:</span>
                </div>
                <div
                  className="dealcard-comp-tabs"
                  role="group"
                  aria-label="בחירת הרכב"
                >
                  {normalizedCompositions.map((comp) => (
                    <button
                      key={comp.value}
                      type="button"
                      className={`dealcard-comp-tab ${selectedComp?.value === comp.value ? "active" : ""}`}
                      onClick={() => setSelectedComp(comp)}
                      aria-pressed={selectedComp?.value === comp.value}
                    >
                      {comp.value}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ═══ מחיר לפי הרכב — תווית דינמית ═══ */}
            <div className="dealcard-price">
              <div className="price-value">
                החל מ- {currentPrice}₪ {currentPriceLabel}
                {selectedComp && normalizedCompositions.length > 1 && (
                  <span className="price-comp-label">
                    {" "}
                    ({selectedComp.value})
                  </span>
                )}
              </div>
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
                המחיר הינו {currentPriceLabel}, כפוף לזמינות, ועשוי להשתנות
                בהתאם למועדי הטיסה.
              </p>
              <p>הפרטים שתמסור ישמשו ליצירת קשר בלבד ולא יועברו לצד שלישי.</p>
              <p>ט.ל.ח</p>
            </Section>

            <div className="dealcard-cta">
              <button
                className="dealcard-submit-button"
                onClick={handleWhatsAppClick}
                aria-label={`פנייה בוואטסאפ לפרטים נוספים ולסגירת דיל ל${deal.title}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="20"
                  height="20"
                  aria-hidden="true"
                  style={{ flexShrink: 0 }}
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                לפרטים נוספים וסגירת דיל
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
