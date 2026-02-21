import React, { useState, useEffect } from "react";
import {
  X,
  Calendar,
  Plane,
  Hotel,
  Star,
  Coffee,
  Clock,
  CheckCircle,
  Info,
  Luggage,
} from "lucide-react";
import "./DealCard.css";

const DealCard = ({ deal, onClose }) => {
  if (!deal) return null;

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // קומפוננטה פנימית לעיצוב מקטעים
  const Section = ({ icon, title, children }) => (
    <div className="deal-section">
      <div className="deal-section-header">
        {icon}
        <h3 className="deal-section-title">{title}</h3>
      </div>
      {children}
    </div>
  );

  // קומפוננטה פנימית לעיצוב תיבות מידע
  const InfoBox = ({ children, columns = 2 }) => (
    <div
      className="deal-info-box"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {children}
    </div>
  );

  const handleWhatsAppClick = () => {
    const message = `
היי 👋
אני מעוניין בדיל הבא:

 יעד: ${deal.title}
 מחיר: החל מ-${deal.priceFrom}₪ לאדם
 תאריכים: ${deal.datesRange}
 מלון: ${deal.hotel?.name || "—"}

אשמח לפרטים נוספים 🙏
  `;

    const encodedMessage = encodeURIComponent(message.trim());

    const whatsappUrl = `https://wa.me/972506514500?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  const publishedDate = deal.createdAt ? deal.createdAt.toDate() : null;

  const formattedDate = publishedDate
    ? publishedDate.toLocaleDateString("he-IL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "—";

  return (
    <div className="dealcard-overlay" onClick={onClose}>
      <div
        className={`dealcard-container ${isMobile ? "mobile" : ""}`}
        onClick={(e) => e.stopPropagation()} // מונע סגירה בלחיצה על הכרטיס
      >
        <button onClick={onClose} className="dealcard-close-button">
          <X size={20} color="rgba(71, 13, 13, 0.6)" />
        </button>

        <div className="dealcard-image-wrapper">
          <img
            src={deal.mainImage}
            alt={deal.title}
            className="dealcard-image"
          />
        </div>

        <div className="dealcard-content">
          <h1 className="dealcard-title">{deal.title}</h1>
          <div className="dealcard-published">
            <Calendar size={16} />
            <span>פורסם ב־{formattedDate}</span>
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
                  <Clock size={14} /> הלוך
                </div>
                <div className="info-value">{deal.flight?.departure}</div>
              </div>
              <div style={{ textAlign: "left" }}>
                <div className="info-label">חזור</div>

                <div className="info-value">{deal.flight?.return}</div>
              </div>
            </InfoBox>
          </Section>

          {/* --- שינוי: הצגת מקטע כבודה (רק אם יש תוכן) --- */}
          {deal.luggage && (
            <Section icon={<Luggage size={22} color="#1d3557" />} title="כבודה">
              <div className="deal-included-box">
                <CheckCircle size={18} />
                <span className="deal-included-text">{deal.luggage}</span>
              </div>
            </Section>
          )}

          <Section
            icon={<Hotel size={22} color="#1d3557" />}
            title={`מלון ${deal.hotel?.name}`}
          >
            <div className="deal-stars">
              {Array.from({ length: deal.hotel?.stars || 0 }).map((_, i) => (
                <Star key={i} size={18} fill="#fca311" color="#fca311" />
              ))}
            </div>
            <InfoBox>
              <div>
                <div className="info-label">ארוחות</div>
                <div className="info-value">{deal.hotel?.meals}</div>
              </div>
              <div style={{ textAlign: "left" }}>
                <div className="info-label">חדר</div>
                <div className="info-value">{deal.hotel?.room}</div>
              </div>
            </InfoBox>
          </Section>

          {/* --- שינוי: הצגת מקטע הערות (רק אם יש תוכן) --- */}
          {
            <Section
              icon={<Info size={22} color="#1d3557" />}
              title="הערות נוספות"
            >
              <p className="deal-notes-text">{deal.notes}</p>
              <p>
                המחיר הינו לאדם, כפוף לזמינות, ועשוי להשתנות בהתאם למועדי הטיסה.
                המחיר אינו כולל תוספות מיוחדות.
              </p>
              <p> ט.ל.ח</p>
            </Section>
          }

          <div className="dealcard-cta">
            <button
              className="dealcard-submit-button"
              onClick={handleWhatsAppClick}
            >
              לפרטים נוספים
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealCard;
