import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import logoImg from "../../assets/images/logo.png";

const Footer = () => {
  // ✅ הועתק ישירות מה-Header
  const navigationItems = [
    { name: "בית", href: "/" },
    { name: "אודות", href: "/about" },
    { name: "ביקורות", href: "/reviews" },
    { name: "דילים", href: "/deals" },
    { name: "ויזות", href: "/visas" },
    { name: "שאלות ותשובות", href: "/faq" },
  ];

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* עמודה 1: אודות החברה והרשתות החברתיות */}
        <div className="footer-column about-column">
          <img src={logoImg} alt="Check In Logo" className="footer-logo" />
          <p>
            Check In היא סוכנות נסיעות המתמחה בדילים שווים לחו"ל, תוך מתן שירות
            ומענה אישי לכל לקוח. אנחנו כאן כדי לבנות לכם חוויה, לא רק חופשה.
          </p>
          <div className="social-icons">
            <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="TikTok">
              <i className="fab fa-tiktok"></i>
            </a>
            <a href="#" aria-label="Whatsapp">
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>

        {/* עמודת "ניווט מהיר" עם הקישורים מה-Header */}
        <div className="footer-column links-column">
          <h2>ניווט מהיר</h2>
          <ul>
            {navigationItems.map((item) => (
              <li key={item.name}>
                <Link to={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* עמודה 3: יצירת קשר */}
        <div className="footer-column contact-column">
          <h2>יצירת קשר</h2>
          <p>
            מוזמנים ליצור איתנו קשר בכל שאלה. הצוות שלנו זמין כדי למצוא לכם את
            החופשה המושלמת.
          </p>
          <div className="contact-details">
            <p>
              <i className="fas fa-envelope"></i> <strong>אימייל:</strong>{" "}
              info@checkin-deals.com
            </p>
            <p>
              <i className="fas fa-phone"></i> <strong>טלפון:</strong>{" "}
              05X-XXXXXXX
            </p>
            <p>
              <i className="fas fa-map-marker-alt"></i> <strong>כתובת:</strong>{" "}
              רחוב לדוגמה 1, תל אביב
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 כל הזכויות שמורות ל-Check In</p>
        <div className="footer-bottom-links">
          <a href="/privacy-policy">מדיניות פרטיות</a>
          <a href="/accessibility">הצהרת נגישות</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
