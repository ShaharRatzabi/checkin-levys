import React from "react";
import { Accessibility } from "lucide-react";

export default function AccessibilityPage() {
  return (
    <div style={{ direction: "rtl" }}>
      <style>{`
        .access-page {
          min-height: 100vh;
          background-image: linear-gradient(to bottom right, #fff7ed 70%, #e76d2c 100%);
          position: relative;
          overflow: hidden;
          padding-bottom: 8rem;
        }

        .access-floating-bg {
          position: fixed;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .access-blob {
          position: absolute;
          border-radius: 9999px;
          filter: blur(70px);
        }

        @media (prefers-reduced-motion: no-preference) {
          .access-blob { animation: accessFloat 6s ease-in-out infinite; }
        }

        .access-blob:nth-child(1) {
          width: 18rem; height: 18rem;
          top: 5rem; right: 5rem;
          background: linear-gradient(to right, rgba(251,146,60,0.15), rgba(239,68,68,0.15));
        }
        .access-blob:nth-child(2) {
          width: 22rem; height: 22rem;
          bottom: 8rem; left: 5rem;
          background: linear-gradient(to right, rgba(252,211,77,0.15), rgba(244,114,182,0.15));
          animation-delay: -2s;
        }

        @keyframes accessFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        /* כותרת עמוד */
        .access-hero {
          padding: 4rem 1rem 2rem;
          text-align: center;
        }

        .access-hero-inner {
          background: linear-gradient(145deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1));
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255,255,255,0.4);
          border-radius: 32px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          max-width: 56rem;
          margin: 0 auto;
          padding: 3rem;
        }

        .access-icon-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .access-icon-bg {
          background: linear-gradient(135deg, #e76d2c, #ff9a5c);
          border-radius: 20px;
          padding: 1rem;
          box-shadow: 0 8px 25px rgba(231,109,44,0.3);
        }

        .access-icon-bg svg {
          width: 3rem;
          height: 3rem;
          color: white;
        }

        .access-title {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #e76d2c, #ad663a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .access-subtitle {
          font-size: 1.1rem;
          color: #374151;
          line-height: 1.7;
          max-width: 40rem;
          margin: 0 auto;
        }

        /* תוכן */
        .access-content {
          max-width: 56rem;
          margin: 2rem auto;
          padding: 0 1rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .access-card {
          background: rgba(255,255,255,0.35);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.4);
          border-radius: 24px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
          padding: 2rem 2.5rem;
        }

        .access-card h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #e76d2c;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid rgba(231,109,44,0.2);
        }

        .access-card p {
          color: #374151;
          line-height: 1.8;
          margin-bottom: 0.75rem;
          font-size: 1rem;
        }

        .access-card p:last-child { margin-bottom: 0; }

        .access-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .access-card ul li {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          color: #374151;
          line-height: 1.6;
          font-size: 1rem;
        }

        .access-card ul li::before {
          content: "✓";
          color: #e76d2c;
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 0.1rem;
        }

        .access-card ul.caveats li::before {
          content: "⚠";
          color: #d97706;
        }

        /* פרטי קשר */
        .access-contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-top: 1rem;
        }

        @media (max-width: 600px) {
          .access-contact-grid { grid-template-columns: 1fr; }
          .access-title { font-size: 2rem; }
          .access-card { padding: 1.5rem; }
        }

        .access-contact-item {
          background: rgba(255,255,255,0.4);
          border-radius: 14px;
          padding: 1rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .access-contact-label {
          font-size: 0.8rem;
          color: #888;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .access-contact-value a {
          color: #e76d2c;
          font-weight: 600;
          text-decoration: none;
          font-size: 1rem;
        }

        .access-contact-value a:hover { text-decoration: underline; }

        .access-contact-value a:focus-visible {
          outline: 3px solid #e76d2c;
          outline-offset: 2px;
          border-radius: 4px;
        }

        /* תאריך עדכון */
        .access-updated {
          text-align: center;
          color: #888;
          font-size: 0.9rem;
          margin-top: 1rem;
        }
      `}</style>

      {/* רקע דקורטיבי */}
      <div className="access-floating-bg" aria-hidden="true">
        <div className="access-blob"></div>
        <div className="access-blob"></div>
      </div>

      <div className="access-page">
        {/* כותרת */}
        <header className="access-hero">
          <div className="access-hero-inner">
            <div className="access-icon-wrap" aria-hidden="true">
              <div className="access-icon-bg">
                <Accessibility />
              </div>
            </div>
            <h1 className="access-title">הצהרת נגישות</h1>
            <p className="access-subtitle">
              Check-In מאמינה שכל אדם זכאי לחוויית גלישה נוחה ונגישה. אנו
              משקיעים מאמצים רבים להנגיש את האתר לכלל המשתמשים, לרבות אנשים עם
              מוגבלות.
            </p>
          </div>
        </header>

        <main className="access-content" id="main-content">
          {/* מחויבות לנגישות */}
          <article className="access-card">
            <h2>מחויבות לנגישות</h2>
            <p>
              אתר זה הונגש בהתאם לסעיף 35 לתקנות שוויון זכויות לאנשים עם מוגבלות
              (התאמות נגישות לשירות), התשע"ג-2013, ובהתאם לתקן הישראלי לנגישות
              תכנים באינטרנט ת"י 5568.
            </p>
            <p>
              רמת הנגישות של האתר:{" "}
              <strong>תאימות חלקית להנחיות WCAG 2.1 ברמה AA</strong>.
            </p>
            <p>
              אנו ממשיכים לשפר את הנגישות ולבצע בדיקות שוטפות כדי להבטיח חוויית
              שימוש נוחה לכלל המשתמשים — כולל אנשים עם לקויות ראייה, שמיעה,
              מוטוריקה ועיבוד קוגניטיבי.
            </p>
          </article>

          {/* פעולות שננקטו */}
          <article className="access-card">
            <h2>פעולות שננקטו להנגשת האתר</h2>
            <ul>
              <li>
                כל הדפים בנויים עם מבנה סמנטי תקני (HTML5) עם כותרות היררכיות
                ברורות
              </li>
              <li>
                ניווט מלא באמצעות מקלדת בלבד — Tab, Shift+Tab, Enter, Space
                ו-ESC
              </li>
              <li>כפתור "דלג לתוכן הראשי" בראש כל עמוד</li>
              <li>ניהול פוקוס במודאלים — focus trap ומניעת ניווט לרקע</li>
              <li>תיאור טקסטואלי חלופי (alt) לתמונות משמעותיות</li>
              <li>תמיכה בקוראי מסך באמצעות תכונות ARIA מלאות</li>
              <li>הכרזת שינוי עמוד לקוראי מסך במעבר בין דפים</li>
              <li>הודעות שגיאה ואישור נגישות — ללא שימוש ב-alert() המובנה</li>
              <li>ציון שדות חובה ויזואלית ופרוגרמטית (aria-required)</li>
              <li>התאמה לעדפות הפחתת תנועה (prefers-reduced-motion)</li>
              <li>סמן פוקוס ויזואלי ברור על כל האלמנטים האינטראקטיביים</li>
              <li>האתר תומך בהגדלת טקסט עד 200% ללא אובדן תוכן</li>
              <li>האתר רספונסיבי ומותאם למכשירים ניידים, טאבלטים ומחשבים</li>
              <li>קישורים חיצוניים מצוינים ככאלה לקוראי מסך</li>
            </ul>
          </article>

          {/* סייגים */}
          <article className="access-card">
            <h2>סייגים לנגישות</h2>
            <p>למרות מאמצינו, קיימים מספר תחומים שטרם הונגשו במלואם:</p>
            <ul className="caveats">
              <li>
                קישורים לאתרים חיצוניים (כגון אתרי ויזות וטפסים ממשלתיים) אינם
                בשליטתנו ועשויים שלא להיות נגישים
              </li>
              <li>
                תכנים הכוללים מפות או ממשקי צד שלישי עשויים להיות נגישים חלקית
                בלבד
              </li>
              <li>
                חלק מהתמונות הדקורטיביות מוסתרות מקוראי מסך — אם חסר מידע, נשמח
                לדעת
              </li>
            </ul>
          </article>

          {/* יצירת קשר */}
          <article className="access-card">
            <h2>פניות בנושא נגישות</h2>
            <p>
              נתקלתם בבעיית נגישות באתר? יש לכם הצעה לשיפור? נשמח לשמוע — נטפל
              בכל פנייה בהקדם האפשרי.
            </p>
            <p>כדי לעזור לנו לטפל בבעיה ביעילות, כדאי לציין:</p>
            <ul>
              <li>תיאור הבעיה והפעולה שניסיתם לבצע</li>
              <li>קישור לדף בו נתקלתם בבעיה</li>
              <li>סוג הדפדפן ומערכת ההפעלה</li>
              <li>טכנולוגיה מסייעת בה אתם משתמשים (אם רלוונטי)</li>
            </ul>

            <div className="access-contact-grid">
              <div className="access-contact-item">
                <span className="access-contact-label">אימייל</span>
                <span className="access-contact-value">
                  <a href="mailto:Checkinota25@gmail.com">
                    Checkinota25@gmail.com
                  </a>
                </span>
              </div>
              <div className="access-contact-item">
                <span className="access-contact-label">טלפון</span>
                <span className="access-contact-value">
                  <a href="tel:0506514500">050-651-4500</a>
                </span>
              </div>
            </div>
          </article>

          <p className="access-updated">
            הצהרת נגישות זו עודכנה לאחרונה בתאריך:{" "}
            {new Date().toLocaleDateString("he-IL")}
          </p>
        </main>
      </div>
    </div>
  );
}
