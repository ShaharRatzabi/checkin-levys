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
                <span>Checkinota25@gmail.com</span>
                <span>Checkinota24@gmail.com</span>
              </div>
            </div>

            <div className="contact-row">
              <i className="fas fa-phone" aria-hidden="true"></i>
              <div className="contact-text">
                <strong>טלפון:</strong>
                <span>050-651-4500</span>
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
        {/* עמודה 1: אודות */}
        <div className="footer-column about-column">
          <p>
            Check In היא סוכנות נסיעות המתמחה בדילים שווים לחו"ל, תוך מתן שירות
            ומענה אישי לכל לקוח. אנחנו כאן כדי לבנות לכם חוויה, לא רק חופשה.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} כל הזכויות שמורות ל-Check In</p>
        <div className="footer-bottom-links">
          <a href="/privacy-policy">מדיניות פרטיות</a>
          <a href="/accessibility">הצהרת נגישות</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
