import React from "react";
import { FileText } from "lucide-react";

const SECTIONS = [
  {
    title: "1. מבוא והסכמה לתנאים",
    content: [
      'אתר האינטרנט https://www.checkin-levy.com (להלן: "האתר") מופעל על ידי IN-CHECK, בבעלות לירן לוי (להלן: "החברה").',
      "גלישה באתר, שימוש בשירותים, שליחת פרטים או יצירת קשר עם החברה מהווים הסכמה מלאה, מודעת ובלתי חוזרת לתנאי תקנון זה ולמדיניות הפרטיות של החברה.",
      "אם אינך מסכים לתנאים — עליך להימנע מכל שימוש באתר ובשירותים.",
      "החברה רשאית לעדכן תקנון זה בכל עת וללא הודעה מוקדמת. המשך שימוש באתר לאחר עדכון מהווה הסכמה לתקנון המעודכן.",
    ],
  },
  {
    title: "2. הגדרות",
    items: [
      '"משתמש" – כל אדם הגולש באתר או משתמש בשירותים.',
      '"לקוח" – משתמש הפונה לקבלת שירותים מהחברה.',
      '"שירותים" – כל שירות, מידע, ייעוץ, תוכן או מוצר המוצעים באתר.',
      '"תוכן משתמש" – מידע, תמונות, ביקורות או נתונים שמוסר המשתמש.',
    ],
  },
  {
    title: "3. כשירות לשימוש",
    content: [
      "השימוש באתר מותר לבני 18 ומעלה בלבד.",
      "המשתמש מצהיר כי הוא בעל כשירות משפטית להתקשר בהסכם זה.",
    ],
    items: ["שימוש של קטין ללא הסכמת הורה מהווה הפרת התקנון."],
  },
  {
    title: "4. מטרת האתר",
    content: [
      "האתר נועד לספק מידע, שירותים וכלים הקשורים לניהול חופשות, תיירות, ביקורות ותוכן רלוונטי.",
      "התוכן באתר ניתן למטרות מידע בלבד.",
    ],
  },
  {
    title: "5. יצירת קשר ושירותים",
    content: ["המשתמש רשאי ליצור קשר עם החברה באמצעות:"],
    items: ["טפסים באתר", 'דוא"ל', "WhatsApp", "פרסום ביקורות או תוכן באתר"],
    footer: "החברה אינה מתחייבת לספק שירות לכל פונה.",
  },
  {
    title: "6. אחריות המשתמש למידע שמסר",
    content: ["המשתמש אחראי לכל מידע שהוא מוסר לחברה.", "המשתמש מתחייב:"],
    items: [
      "למסור מידע נכון ומדויק",
      "לא להעלות תוכן פוגעני או בלתי חוקי",
      "לא להפר זכויות צדדים שלישיים",
    ],
  },
  {
    title: "7. תוכן משתמש וביקורות",
    content: [
      "בעת פרסום ביקורות, תמונות או מידע באתר, המשתמש מעניק לחברה רישיון בלתי מוגבל להשתמש בתוכן לצרכי האתר והשיווק.",
      "החברה רשאית:",
    ],
    items: ["לערוך תוכן", "להסיר תוכן", "לפרסם תוכן בפלטפורמות אחרות"],
  },
  {
    title: "8. שימוש אסור באתר",
    content: ["חל איסור לבצע באתר:"],
    items: [
      "חדירה למערכות",
      "ניסיון פריצה",
      "הפצת קוד זדוני",
      "כריית מידע",
      "העתקת תכנים ללא אישור",
      "שימוש מסחרי ללא הרשאה",
    ],
    footer: "החברה רשאית לחסום משתמשים מפרים.",
  },
  {
    title: "9. קניין רוחני",
    content: [
      "כל זכויות הקניין הרוחני באתר שייכות לחברה.",
      "אין להעתיק, להפיץ או לשכפל תוכן ללא אישור בכתב.",
    ],
  },
  {
    title: "10. זמינות האתר",
    content: [
      "החברה אינה מתחייבת לזמינות רציפה של האתר.",
      "האתר עשוי להיות מושבת לצורכי תחזוקה או שדרוג.",
    ],
  },
  {
    title: "11. הגבלת אחריות",
    content: [
      "השימוש באתר נעשה באחריות המשתמש בלבד.",
      "החברה לא תהיה אחראית לנזקים מכל סוג, לרבות:",
    ],
    items: [
      "נזק עקיף",
      "אובדן נתונים",
      "אובדן הכנסות",
      "תקלות טכנולוגיות",
      "שיבושים במערכות צד שלישי",
    ],
    footer:
      "האחריות הכוללת של החברה, ככל שתיקבע, לא תעלה על סכום השירות ששולם בפועל.",
  },
  {
    title: "12. הסתמכות על מידע",
    content: [
      "התוכן באתר אינו מהווה התחייבות, ייעוץ מקצועי או הבטחה לתוצאה כלשהי.",
      "המשתמש אחראי לכל החלטה המבוססת על מידע באתר.",
    ],
  },
  {
    title: "13. פרטיות ועיבוד מידע",
    content: ["החברה אוספת מידע כגון:"],
    items: [
      "שם",
      "טלפון",
      'דוא"ל',
      "כתובת",
      "פרטי חופשות ותיירות",
      "תמונות",
      "כתובת IP ונתוני שימוש",
    ],
    footer:
      "המידע משמש ל: יצירת קשר, מתן שירות, שיפור האתר, שיווק ופרסום וניתוח נתונים.",
  },
  {
    title: "14. שיווק ישיר",
    content: [
      "החברה רשאית לשלוח הצעות ודיוורים בכפוף לחוק התקשורת.",
      "ניתן לבטל את ההרשמה בכל עת באמצעות:",
    ],
    items: ['שליחת הודעת "הסרה"', 'פנייה בדוא"ל', "הודעת WhatsApp"],
  },
  {
    title: "15. קוקיז וטכנולוגיות מעקב",
    content: ["האתר משתמש בקוקיז וב-localStorage לצרכי:"],
    items: ["אבטחה", "מדידה", "שיפור חוויית משתמש", "ניתוח פעילות"],
    footer: "חסימת קוקיז עלולה לפגוע בתפקוד האתר.",
  },
  {
    title: "16. צדדים שלישיים",
    content: ["החברה עושה שימוש בשירותים חיצוניים, לרבות:"],
    items: ["Google Firebase", "WhatsApp", "תשתיות ענן"],
    footer: "החברה אינה אחראית למדיניות פרטיות של צדדים אלה.",
  },
  {
    title: "17. העברת מידע מחוץ לישראל",
    content: [
      "מידע עשוי להישמר או להיות מעובד מחוץ לישראל באמצעות ספקים בינלאומיים.",
      "השימוש באתר מהווה הסכמה לכך.",
    ],
  },
  {
    title: "18. אבטחת מידע",
    content: ["החברה מיישמת אמצעי אבטחה סבירים כגון:"],
    items: ["HTTPS", "אימות דו-שלבי", "ניהול הרשאות", "גיבויים תקופתיים"],
    footer: "עם זאת, אין מערכת המאובטחת לחלוטין.",
  },
  {
    title: "19. כוח עליון",
    content: ["החברה לא תישא באחריות לאירועים שאינם בשליטתה כגון:"],
    items: ["תקלות אינטרנט", "מלחמה", "אסונות טבע", "שביתות"],
  },
  {
    title: "20. שיפוי",
    content: [
      "המשתמש מתחייב לשפות את החברה בגין כל נזק, תביעה או הוצאה הנובעים משימוש בלתי חוקי באתר.",
    ],
  },
  {
    title: "21. הגבלת תקופת תביעה",
    content: ["כל תביעה נגד החברה תוגש בתוך 12 חודשים ממועד היווצרות העילה."],
  },
  {
    title: "22. ויתור על תובענות ייצוגיות",
    content: ["המשתמש מוותר על זכותו להשתתף בתביעה ייצוגית נגד החברה."],
  },
  {
    title: "23. הפרדה בין סעיפים",
    content: ["אם סעיף בתקנון יימצא בלתי אכיף, יתר הסעיפים יישארו בתוקף."],
  },
  {
    title: "24. סמכות שיפוט",
    content: [
      "הדין החל הוא דיני מדינת ישראל בלבד.",
      "סמכות השיפוט הבלעדית נתונה לבתי המשפט המוסמכים בישראל.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div style={{ direction: "rtl" }}>
      <style>{`
        .terms-page {
          min-height: 100vh;
          background-image: linear-gradient(to bottom right, #fff7ed 70%, #e76d2c 100%);
          position: relative;
          overflow: hidden;
          padding-bottom: 8rem;
        }

        .terms-floating-bg {
          position: fixed;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .terms-blob {
          position: absolute;
          border-radius: 9999px;
          filter: blur(70px);
        }

        @media (prefers-reduced-motion: no-preference) {
          .terms-blob { animation: termsFloat 6s ease-in-out infinite; }
        }

        .terms-blob:nth-child(1) {
          width: 18rem; height: 18rem;
          top: 5rem; right: 5rem;
          background: linear-gradient(to right, rgba(251,146,60,0.15), rgba(239,68,68,0.15));
        }
        .terms-blob:nth-child(2) {
          width: 22rem; height: 22rem;
          bottom: 8rem; left: 5rem;
          background: linear-gradient(to right, rgba(252,211,77,0.15), rgba(244,114,182,0.15));
          animation-delay: -2s;
        }

        @keyframes termsFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .terms-hero {
          padding: 4rem 1rem 2rem;
          text-align: center;
        }

        .terms-hero-inner {
          background: linear-gradient(145deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1));
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255,255,255,0.4);
          border-radius: 32px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          max-width: 56rem;
          margin: 0 auto;
          padding: 3rem;
        }

        .terms-icon-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .terms-icon-bg {
          background: linear-gradient(135deg, #e76d2c, #ff9a5c);
          border-radius: 20px;
          padding: 1rem;
          box-shadow: 0 8px 25px rgba(231,109,44,0.3);
        }

        .terms-icon-bg svg {
          width: 3rem;
          height: 3rem;
          color: white;
        }

        .terms-title {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #e76d2c, #ad663a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .terms-subtitle {
          font-size: 1.1rem;
          color: #374151;
          line-height: 1.7;
          max-width: 40rem;
          margin: 0 auto;
        }

        .terms-content {
          max-width: 56rem;
          margin: 2rem auto;
          padding: 0 1rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .terms-card {
          background: rgba(255,255,255,0.35);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.4);
          border-radius: 24px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
          padding: 2rem 2.5rem;
        }

        .terms-card h2 {
          font-size: 1.3rem;
          font-weight: 700;
          color: #e76d2c;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid rgba(231,109,44,0.2);
        }

        .terms-card p {
          color: #374151;
          line-height: 1.8;
          margin-bottom: 0.75rem;
          font-size: 1rem;
        }

        .terms-card p:last-child { margin-bottom: 0; }

        .terms-card ul {
          list-style: none;
          padding: 0;
          margin: 0.5rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .terms-card ul li {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          color: #374151;
          line-height: 1.6;
          font-size: 1rem;
        }

        .terms-card ul li::before {
          content: "•";
          color: #e76d2c;
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 0.1rem;
        }

        /* כרטיס יצירת קשר */
        .terms-contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-top: 1rem;
        }

        @media (max-width: 600px) {
          .terms-contact-grid { grid-template-columns: 1fr; }
          .terms-title { font-size: 2rem; }
          .terms-card { padding: 1.5rem; }
          .terms-hero-inner { padding: 2rem 1.5rem; }
        }

        .terms-contact-item {
          background: rgba(255,255,255,0.4);
          border-radius: 14px;
          padding: 1rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .terms-contact-label {
          font-size: 0.8rem;
          color: #888;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .terms-contact-value a {
          color: #e76d2c;
          font-weight: 600;
          text-decoration: none;
          font-size: 1rem;
        }

        .terms-contact-value a:hover { text-decoration: underline; }

        .terms-contact-value a:focus-visible {
          outline: 3px solid #e76d2c;
          outline-offset: 2px;
          border-radius: 4px;
        }

        .terms-updated {
          text-align: center;
          color: #888;
          font-size: 0.9rem;
          margin-top: 1rem;
        }
      `}</style>

      <div className="terms-floating-bg" aria-hidden="true">
        <div className="terms-blob"></div>
        <div className="terms-blob"></div>
      </div>

      <div className="terms-page">
        <header className="terms-hero">
          <div className="terms-hero-inner">
            <div className="terms-icon-wrap" aria-hidden="true">
              <div className="terms-icon-bg">
                <FileText />
              </div>
            </div>
            <h1 className="terms-title">תקנון ותנאי שימוש</h1>
            <p className="terms-subtitle">
              תקנון שימוש באתר, תנאי שירות והגבלת אחריות — IN-CHECK, בבעלות לירן
              לוי. קריאת התקנון מומלצת לפני השימוש באתר.
            </p>
          </div>
        </header>

        <main className="terms-content" id="main-content">
          {SECTIONS.map((section, i) => (
            <article className="terms-card" key={i}>
              <h2>{section.title}</h2>
              {section.content?.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
              {section.items && (
                <ul>
                  {section.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              )}
              {section.footer && (
                <p style={{ marginTop: "0.75rem" }}>{section.footer}</p>
              )}
            </article>
          ))}

          {/* סעיף 25 — יצירת קשר */}
          <article className="terms-card">
            <h2>25. יצירת קשר</h2>
            <p>לירן לוי - CHECK-IN </p>
            <div className="terms-contact-grid">
              <div className="terms-contact-item">
                <span className="terms-contact-label">אימייל</span>
                <span className="terms-contact-value">
                  <a href="mailto:Checkinota24@gmail.com">
                    Checkinota24@gmail.com
                  </a>
                </span>
              </div>
              <div className="terms-contact-item">
                <span className="terms-contact-label">טלפון</span>
                <span className="terms-contact-value">
                  <a href="tel:+97250257559">050-257-5591</a>
                </span>
              </div>
            </div>
          </article>

          <p className="terms-updated">
            תאריך עדכון אחרון: <time dateTime="2026-03-02">2 במרץ 2026</time>
          </p>
        </main>
      </div>
    </div>
  );
}
