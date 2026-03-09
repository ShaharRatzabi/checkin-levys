import React from "react";
import { Shield } from "lucide-react";

const SECTIONS = [
  {
    title: "1. מבוא והיקף",
    content: [
      "מדיניות פרטיות זו מתארת כיצד Check-In, בבעלות לירן לוי, אוספת, משתמשת, שומרת, משתפת ומגנה על מידע אישי של מבקרי האתר https://www.checkin-levys.com ושל פונים אלינו באמצעי תקשורת אחרים.",
      'המדיניות נערכה בהתאם לחוק הגנת הפרטיות, התשמ"א-1981 ולתקנותיו (לרבות תיקון 13), לחוק התקשורת (בזק ושידורים), התשמ"ב-1982, סעיף 30א (דבר פרסומת), וכן - ככל שחל - לתקנות הגנת המידע של האיחוד האירופי (GDPR).',
      'המדיניות חלה על שימוש באתר, שליחת טפסים ותגובות, פניות בדוא"ל וב-WhatsApp, ועל שירותים אחרים שניתנים על-ידינו. השימוש באתר ובשירותים מהווה הסכמה למדיניות זו; אם אינך מסכים/ה לאמור, אנא הימנע/י משימוש.',
    ],
  },
  {
    title: "2. פרטי העסק ובקר המידע",
    content: [
      "הבקר על המידע הוא Check-In, בבעלות לירן לוי.",
      "דומיין ראשי: https://www.checkin-levys.com",
    ],
    contact: [
      {
        label: 'דוא"ל',
        value: "Checkinota24@gmail.com",
        href: "mailto:Checkinota24@gmail.com",
      },
      { label: "טלפון", value: "050-257-5591", href: "tel:+972502575591" },
    ],
    footer: "פניות ייענו בתוך פרק זמן סביר ובהתאם לדין החל.",
  },
  {
    title: "3. קהל יעד וקטינים",
    content: [
      "השירותים מיועדים לקהל כללי בגיל 18 ומעלה. איננו אוספים ביודעין מידע אישי מקטינים מתחת לגיל 18 ללא הסכמת הורה או אפוטרופוס כדין.",
      "אם נודע לנו כי נאסף מידע על קטין בניגוד לאמור, נפעל למחיקתו בהקדם האפשרי עם היוודע הדבר לנו או על פי בקשה.",
    ],
  },
  {
    title: "4. סוגי מידע שנאספים",
    content: ["נאספים ומעובדים, בין היתר, הנתונים הבאים:"],
    items: [
      'פרטי זיהוי ותקשורת כגון שם מלא, כתובת, טלפון ודוא"ל',
      "פרטי חופשות ותיירות לרבות תאריכי טיסה, תמונות מחופשה, ביקורות וחוות דעת",
      "העדפות רלוונטיות, לרבות פרטי/העדפות רכבים לחופשות רצויות",
      "תוכן פניות ומסמכים שתבחר/י לשתף עמנו",
      "נתוני שימוש ותיעוד טכני מהאתר והדפדפן (כגון כתובת IP, מועד גישה, מזהי עוגיות, מאפייני מכשיר/דפדפן ודפי ביקור)",
    ],
  },
  {
    title: "5. מקורות ואמצעי איסוף",
    content: [
      'המידע מתקבל ממך ישירות דרך טפסים באתר המפותח בטכנולוגיית React, דרך פניות בדוא"ל ודרך WhatsApp, וכן מתוך ביקורות/תגובות שתבחר/י לפרסם באתר.',
      "בנוסף נאספים אוטומטית נתוני שימוש באמצעות קוקיז, localStorage וטכנולוגיות אינטרנט דומות.",
      "במקרים מסוימים נוכל לקבל מידע משלים מצדדים שלישיים על בסיס הסכמתך או לפי הדין.",
    ],
  },
  {
    title: "6. מטרות עיבוד ועילות חוקיות",
    content: ["אנו מעבדים מידע לצורך:"],
    items: [
      "יצירת קשר עם לקוחות ומתעניינים ומתן שירותי תמיכה",
      "טיפול ומיקוד בבקשות לקוחות והצעות מותאמות",
      "ניהול תוכן שנוצר על-ידי משתמשים (לרבות ביקורות) והצגתו",
      "תפעול, אבטחה ושיפור האתר והשירותים",
      "עמידה בחובות משפטיות ושמירה על זכויות, דרישות ותביעות",
    ],
    footer:
      "עילות העיבוד כוללות: ביצוע חוזה, אינטרס לגיטימי, הסכמה מפורשת וחובה חוקית - לפי העניין.",
  },
  {
    title: "7. שיווק ישיר",
    content: [
      "נוכל לשלוח אליך דברי פרסומת, הצעות ודיוורים רלוונטיים בערוצים שונים, בכפוף לדין החל ובכלל זה לסעיף 30א לחוק התקשורת.",
      "מקום שנדרש - נבקש הסכמה מפורשת ונשמור תיעוד הסכמה. בכל הודעה נציין מיהו השולח ונאפשר הסרה קלה ומהירה.",
    ],
    items: [
      "שליחת מייל לכתובת Checkinota24@gmail.com",
      'הודעת WhatsApp עם המילה "הסרה" למספר 050-257-5591',
    ],
  },
  {
    title: "8. קוקיז וטכנולוגיות דומות",
    content: [
      "אנו משתמשים בקוקיז, ב-web beacons, ובאחסון מקומי בדפדפן (כגון localStorage) לצורך תפקוד האתר, אבטחה, מדידה ושיפור חוויית המשתמש.",
      "ניתן לנהל או לחסום קוקיז דרך הגדרות הדפדפן; חסימת קוקיז חיוניות עלולה לפגוע בתפקוד האתר.",
      "שימושך באתר מהווה הסכמה לשימוש כאמור בהתאם להעדפותיך.",
    ],
  },
  {
    title: "9. מסירת מידע לצדדים שלישיים",
    content: ["אנו משתפים מידע עם נותני שירות הפועלים מטעמנו:"],
    items: [
      "תשתיות האתר, אינטגרציית WhatsApp, ו-Google Firebase - מחויבים חוזית לסודיות",
      "כאשר הדבר נדרש לפי דין, מכוח צו או בקשת רשות מוסמכת",
      "לשם מימוש זכויות, מניעת הונאה ואכיפת תנאים",
      "מידע מצרפי וסטטיסטי שאינו מזהה אישית",
    ],
  },
  {
    title: "10. העברות מידע מחוץ לישראל",
    content: [
      "חלק מן העיבודים והאחסון עשויים להתבצע מחוץ לישראל באמצעות ספקי שירות גלובליים.",
      "בעת העברה בינלאומית נוודא קיומם של מנגנוני הגנה נאותים בהתאם לדין החל, כגון התחייבויות חוזיות סטנדרטיות (SCCs) לפי ה-GDPR ואמצעי אבטחה מתאימים.",
      "השימוש בשירותים ונכונותך לספק מידע כוללים הסכמה להעברה כאמור ככל שנדרש לפי הדין.",
    ],
  },
  {
    title: "11. שמירה ומחיקה",
    content: [
      "נשמור מידע אישי רק כל עוד הוא נדרש למטרות שלשמן נאסף ולעמידה בחובות משפטיות.",
      "לאחר מכן נפעל למחיקה מאובטחת או לאנונימיזציה של המידע, למעט עותקי גיבוי ושיאי תיעוד הנדרשים מטעמי ציות, ראיות ואבטחה.",
      "ניתן להגיש בקשות למחיקה באמצעות פרטי הקשר לעיל, ואנו נטפל בהן בכפוף לחריגים הקבועים בדין.",
    ],
  },
  {
    title: "12. זכויות נושאי מידע",
    content: ["בכפוף לדין החל, עומדות לך הזכויות הבאות:"],
    items: [
      "לבקש לעיין במידע אישי אודותיך",
      "לעדכן ולתקן אי-דיוקים",
      "לבקש את מחיקתו או להגביל את עיבודו",
      "להתנגד לשיווק ישיר בכל עת",
      "למשוך הסכמה שניתנה - מבלי לגרוע מלגיטימיות העיבוד שקדמה למשיכה",
    ],
    footer:
      'בישראל ניתן להגיש תלונה לרשות להגנת הפרטיות. לצורך מימוש זכויות, פנה/י אלינו בדוא"ל או ב-WhatsApp.',
  },
  {
    title: "13. אבטחת מידע ואירועי אבטחה",
    content: ["אנו מיישמים אמצעי הגנה סבירים ומקובלים, לרבות:"],
    items: [
      "HTTPS בכל העברת נתונים",
      "אימות דו-שלבי לגישות ניהוליות",
      "גיבויים תקופתיים",
      "ניהול הרשאות בשיטת Least Privilege",
      "רישום ובקרה על גישות",
    ],
    footer:
      "על אף מאמצינו, אין מערכת מאובטחת לחלוטין. במקרה של אירוע אבטחה משמעותי נפעל בהתאם לדין, לרבות הודעות לרשויות המוסמכות.",
  },
  {
    title: "14. שימוש בבינה מלאכותית (AI)",
    content: [
      "ייתכן שניעזר בכלי AI לצורך שיפור תהליכים תפעוליים, סיווג או סיכום פניות ותמיכה בתוכן שיווקי.",
      "לא נקבל החלטות המבוססות אך ורק על עיבוד אוטומטי היוצרות תוצאות משפטיות ללא מעורבות אנושית.",
      "תמונות ותכנים שתבחר/י להעלות ייעשה בהם שימוש לצורך מתן השירות בלבד ולא ישמשו לאימון מודלים ללא הסכמה מפורשת.",
    ],
  },
  {
    title: "15. בקר מול מעבד",
    content: [
      'לגבי מידע של לקוחות, מתעניינים ומבקרי האתר, Check-In פועלת כ"בקר מידע" ומחליטה על מטרות ואמצעי העיבוד.',
      'ספקי השירות שלנו (לרבות תשתיות אתר, אינטגרציות תקשורת ואחסון בענן) פועלים כ"מעבדים" מטעמה ועל בסיס הסכמים מתאימים.',
    ],
  },
  {
    title: "16. עדכונים למדיניות",
    content: [
      "אנו רשאים לעדכן מדיניות זו מעת לעת כדי לשקף שינויים משפטיים, תפעוליים או טכנולוגיים.",
      "נפרסם את הגרסה המעודכנת באתר ונציין את תאריך העדכון האחרון. שינוי מהותי יובלט באופן סביר.",
      "המשך שימושך בשירותים לאחר עדכון מהווה הסכמה למדיניות המעודכנת.",
    ],
  },
  {
    title: "17. נספח - רשימת מערכות וספקי שירות",
    items: [
      "אתר React (Check-In) - טפסי יצירת קשר, הצגת תוכן ותפעול האתר",
      "WhatsApp - קבלת פניות ומתן שירות ללקוחות ומתעניינים",
      "Google Firebase - אחסון נתונים, בסיס נתונים ותשתיות ענן לאתר",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div style={{ direction: "rtl" }}>
      <style>{`
        .privacy-page {
          min-height: 100vh;
          background-image: linear-gradient(to bottom right, #fff7ed 70%, #e76d2c 100%);
          position: relative;
          overflow: hidden;
          padding-bottom: 8rem;
        }

        .privacy-floating-bg {
          position: fixed;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .privacy-blob {
          position: absolute;
          border-radius: 9999px;
          filter: blur(70px);
        }

        @media (prefers-reduced-motion: no-preference) {
          .privacy-blob { animation: privacyFloat 6s ease-in-out infinite; }
        }

        .privacy-blob:nth-child(1) {
          width: 18rem; height: 18rem;
          top: 5rem; right: 5rem;
          background: linear-gradient(to right, rgba(251,146,60,0.15), rgba(239,68,68,0.15));
        }
        .privacy-blob:nth-child(2) {
          width: 22rem; height: 22rem;
          bottom: 8rem; left: 5rem;
          background: linear-gradient(to right, rgba(252,211,77,0.15), rgba(244,114,182,0.15));
          animation-delay: -2s;
        }

        @keyframes privacyFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .privacy-hero {
          padding: 4rem 1rem 2rem;
          text-align: center;
        }

        .privacy-hero-inner {
          background: linear-gradient(145deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1));
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255,255,255,0.4);
          border-radius: 32px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          max-width: 56rem;
          margin: 0 auto;
          padding: 3rem;
        }

        .privacy-icon-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .privacy-icon-bg {
          background: linear-gradient(135deg, #e76d2c, #ff9a5c);
          border-radius: 20px;
          padding: 1rem;
          box-shadow: 0 8px 25px rgba(231,109,44,0.3);
        }

        .privacy-icon-bg svg {
          width: 3rem;
          height: 3rem;
          color: white;
        }

        .privacy-title {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #e76d2c, #ad663a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .privacy-subtitle {
          font-size: 1.1rem;
          color: #374151;
          line-height: 1.7;
          max-width: 40rem;
          margin: 0 auto;
        }

        .privacy-content {
          max-width: 56rem;
          margin: 2rem auto;
          padding: 0 1rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .privacy-card {
          background: rgba(255,255,255,0.35);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.4);
          border-radius: 24px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
          padding: 2rem 2.5rem;
        }

        .privacy-card h2 {
          font-size: 1.3rem;
          font-weight: 700;
          color: #e76d2c;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid rgba(231,109,44,0.2);
        }

        .privacy-card p {
          color: #374151;
          line-height: 1.8;
          margin-bottom: 0.75rem;
          font-size: 1rem;
        }

        .privacy-card p:last-child { margin-bottom: 0; }

        .privacy-card ul {
          list-style: none;
          padding: 0;
          margin: 0.5rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .privacy-card ul li {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          color: #374151;
          line-height: 1.6;
          font-size: 1rem;
        }

        .privacy-card ul li::before {
          content: "•";
          color: #e76d2c;
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 0.15rem;
        }

        /* גריד יצירת קשר */
        .privacy-contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin: 1rem 0 0.75rem;
        }

        .privacy-contact-item {
          background: rgba(255,255,255,0.4);
          border-radius: 14px;
          padding: 1rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .privacy-contact-label {
          font-size: 0.8rem;
          color: #888;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .privacy-contact-value a {
          color: #e76d2c;
          font-weight: 600;
          text-decoration: none;
          font-size: 1rem;
        }

        .privacy-contact-value a:hover { text-decoration: underline; }

        .privacy-contact-value a:focus-visible {
          outline: 3px solid #e76d2c;
          outline-offset: 2px;
          border-radius: 4px;
        }

        .privacy-updated {
          text-align: center;
          color: #888;
          font-size: 0.9rem;
          margin-top: 1rem;
        }

        @media (max-width: 600px) {
          .privacy-title { font-size: 2rem; }
          .privacy-card { padding: 1.5rem; }
          .privacy-hero-inner { padding: 2rem 1.5rem; }
          .privacy-contact-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="privacy-floating-bg" aria-hidden="true">
        <div className="privacy-blob"></div>
        <div className="privacy-blob"></div>
      </div>

      <div className="privacy-page">
        <header className="privacy-hero">
          <div className="privacy-hero-inner">
            <div className="privacy-icon-wrap" aria-hidden="true">
              <div className="privacy-icon-bg">
                <Shield />
              </div>
            </div>
            <h1 className="privacy-title">מדיניות פרטיות</h1>
            <p className="privacy-subtitle">
              Check-In מחויבת להגנה על פרטיותך. מדיניות זו מסבירה כיצד אנו
              אוספים, משתמשים ומגנים על המידע האישי שלך.
            </p>
          </div>
        </header>

        <main className="privacy-content" id="main-content">
          {SECTIONS.map((section, i) => (
            <article className="privacy-card" key={i}>
              <h2>{section.title}</h2>

              {section.content?.map((p, j) => (
                <p key={j}>{p}</p>
              ))}

              {/* גריד קשר מיוחד לסעיף 2 */}
              {section.contact && (
                <div className="privacy-contact-grid">
                  {section.contact.map((item, j) => (
                    <div className="privacy-contact-item" key={j}>
                      <span className="privacy-contact-label">
                        {item.label}
                      </span>
                      <span className="privacy-contact-value">
                        <a href={item.href}>{item.value}</a>
                      </span>
                    </div>
                  ))}
                </div>
              )}

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

          <p className="privacy-updated">
            תאריך עדכון אחרון: <time dateTime="2026-03-02">2 במרץ 2026</time>
          </p>
        </main>
      </div>
    </div>
  );
}
