import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
        {/* ניווט מהיר */}
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

        {/* יצירת קשר */}
        <div className="footer-column contact-column">
          <h2>יצירת קשר</h2>
          <p>
            מוזמנים ליצור איתנו קשר בכל שאלה. הצוות שלנו זמין כדי למצוא לכם את
            החופשה המושלמת.
          </p>

          <div className="contact-details">
            <div className="contact-row">
              <i className="fas fa-envelope" aria-hidden="true"></i>
              <div className="contact-text">
                <strong>אימייל:</strong>
                {/* ✅ קישורי mailto לנגישות */}
                <a href="mailto:Checkinota25@gmail.com">
                  Checkinota25@gmail.com
                </a>
                <a href="mailto:Checkinota24@gmail.com">
                  Checkinota24@gmail.com
                </a>
              </div>
            </div>

            <div className="contact-row">
              <i className="fas fa-phone" aria-hidden="true"></i>
              <div className="contact-text">
                <strong>טלפון:</strong>
                {/* ✅ קישור tel לנגישות */}
                <a href="tel:0506514500">050-651-4500</a>
              </div>
            </div>

            <div className="contact-row">
              <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
              <div className="contact-text">
                <strong>כתובת:</strong>
                <span>שער האריות 2, חולון</span>
              </div>
            </div>
          </div>
        </div>

        {/* אודות */}
        <div className="footer-column about-column">
          {/* ✅ נוספה כותרת לעמודה */}
          <h2>אודותינו</h2>
          <p>
            Check In היא סוכנות נסיעות המתמחה בדילים שווים לחו"ל, תוך מתן שירות
            ומענה אישי לכל לקוח. אנחנו כאן כדי לבנות לכם חוויה, לא רק חופשה.
          </p>
        </div>
      </div>

      {/* ✅ חלק תחתון עם כל הקישורים המשפטיים */}
      <div className="footer-bottom">
        <p>© {currentYear} כל הזכויות שמורות ל-Check In</p>
        <nav className="footer-bottom-links" aria-label="קישורים משפטיים">
          <Link to="/accessibility">הצהרת נגישות</Link>
          <Link to="/privacy-policy">מדיניות פרטיות</Link>
          <Link to="/terms">תקנון שימוש</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
