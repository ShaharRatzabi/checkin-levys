import React, { useState } from "react";
import { HelpCircle, Phone, Clock, Shield } from "lucide-react";
import FAQItem from "../../components/FAQItem.jsx";

const FAQ_DATA = [
  {
    id: 1,
    question: "למה כדאי להזמין דרככם ולא ישירות באינטרנט?",
    answer:
      "אנחנו דואגים לכל הפרטים הקטנים, מוודאים שתקבלו את המחיר המשתלם ביותר ומלווים אתכם אישית מרגע ההזמנה ועד החזרה לארץ – שירות שאין לאתרי אינטרנט.",
  },
  {
    id: 2,
    question: "מה קורה אם יש בעיה או שינוי בטיסה?",
    answer:
      "אנחנו כאן בשבילכם 24/7, מטפלים בכל שינוי או בעיה מול חברות התעופה ודואגים לפתרון מהיר, כך שתוכלו לטוס בראש שקט.",
  },
  {
    id: 3,
    question: "איך אפשר לדעת שהמחירים אצלכם באמת משתלמים?",
    answer:
      "יש לנו גישה ישירה למערכות ספקים עולמיות ויכולת להשוות בזמן אמת, ולכן אנחנו מציעים מחירים תחרותיים עם ערך מוסף של ליווי ושירות אישי.",
  },
  {
    id: 4,
    question: "האם אתם מציעים ביטוח נסיעות? מענה אינטרנטי?",
    answer:
      "כן. אנחנו עובדים עם חברות ביטוח מובילות ומספקים ללקוחותינו ביטוחים מותאמים אישית – כולל כיסוי רפואי, כבודה, ספורט אתגרי ועוד. לגבי אינטרנט, כל לקוח שסוגר דרכנו חופשה מקבל קישור לחבילת Esim עם קוד קופון להנחה ועזרה בהתקנה שלו.",
  },
  {
    id: 5,
    question: "מה הנישות המרכזיות שלכם בעולם התיירות?",
    answer:
      "אנחנו מתמחים בנישות מבוקשות: חופשות משפחתיות, חבילות ספורט וכדורגל, חופשות קזינו, טיולי טבע ותרבות, חופשות זוגיות ורומנטיות ועוד. תאילנד ודובאי הם היעדים שאנחנו מתמקדים בהם חזק.",
  },
  {
    id: 6,
    question:
      "אנחנו מטיילים לבד / עם ילדים / בקבוצה – האם תבנו לנו מסלול מותאם אישית?",
    answer:
      "בהחלט. כל טיול נבנה באופן אישי לפי הרצונות והצרכים שלכם – החל מהטיסות והמלונות ועד למסלולי טיול ייחודיים.",
  },
  {
    id: 7,
    question: "מה היתרון של סוכנות נסיעות מוסמכת לעומת חיפוש עצמאי?",
    answer:
      "מעבר לידע ולניסיון שלנו, יש לנו גב מקצועי, קשרים עם ספקים ושירות אישי בכל שלב – יתרונות שלא קיימים בחיפוש עצמאי.",
  },
  {
    id: 8,
    question: "מהן אפשרויות התשלום?",
    answer:
      "ניתן לשלם בכרטיס אשראי, כולל תשלומים ללא ריבית ועד 4 כרטיסי אשראי שונים, ניתן לשלם גם בהעברה בנקאית.",
  },
  {
    id: 9,
    question: "מה אנחנו מקבלים לאחר הזמנת הדיל?",
    answer:
      "אתם מקבלים אישורי הזמנה על הטיסות ועל המלון, מידע שימושי ליעד, מענה לכל השאלות שיהיו לכם, המלצות וטיפים מותאמים אישית וזמינות מלאה.",
  },
  {
    id: 10,
    question: "אם משהו ישתבש בזמן הטיול – האם יש לכם מענה או שירות חירום?",
    answer:
      "בוודאי. אנחנו זמינים עבורכם גם במהלך הטיול עם שירות חירום ותמיכה בכל שעה – כדי שתדעו שיש לכם על מי לסמוך בכל מצב.",
  },
];

/* ✅ סימני שאלה קטנים — ברקע העמוד כולו */
const BG_QUESTION_MARKS = [
  {
    id: 1,
    top: "5%",
    right: "4%",
    size: "1.8rem",
    opacity: 0.08,
    delay: "0s",
    duration: "9s",
  },
  {
    id: 2,
    top: "12%",
    left: "6%",
    size: "1.4rem",
    opacity: 0.06,
    delay: "-2s",
    duration: "11s",
  },
  {
    id: 3,
    top: "28%",
    right: "8%",
    size: "2rem",
    opacity: 0.07,
    delay: "-4s",
    duration: "8s",
  },
  {
    id: 4,
    top: "38%",
    left: "3%",
    size: "1.5rem",
    opacity: 0.05,
    delay: "-1s",
    duration: "10s",
  },
  {
    id: 5,
    top: "52%",
    right: "2%",
    size: "1.3rem",
    opacity: 0.07,
    delay: "-3s",
    duration: "9.5s",
  },
  {
    id: 6,
    top: "65%",
    left: "7%",
    size: "1.8rem",
    opacity: 0.06,
    delay: "-5s",
    duration: "8.5s",
  },
  {
    id: 7,
    top: "75%",
    right: "6%",
    size: "1.6rem",
    opacity: 0.08,
    delay: "-6s",
    duration: "10.5s",
  },
  {
    id: 8,
    top: "85%",
    left: "4%",
    size: "1.2rem",
    opacity: 0.05,
    delay: "-1.5s",
    duration: "7.5s",
  },
  {
    id: 9,
    top: "20%",
    left: "15%",
    size: "1.1rem",
    opacity: 0.04,
    delay: "-3.5s",
    duration: "12s",
  },
  {
    id: 10,
    top: "45%",
    right: "12%",
    size: "1.6rem",
    opacity: 0.06,
    delay: "-7s",
    duration: "9s",
  },
  {
    id: 11,
    top: "92%",
    right: "15%",
    size: "1.4rem",
    opacity: 0.05,
    delay: "-2.5s",
    duration: "11s",
  },
  {
    id: 12,
    top: "58%",
    left: "12%",
    size: "1.3rem",
    opacity: 0.07,
    delay: "-4.5s",
    duration: "8s",
  },
];

/* ✅ סימני שאלה גדולים — בתוך דיב הכותרת (hero) */
const HERO_QUESTION_MARKS = [
  {
    id: 1,
    top: "5%",
    right: "4%",
    size: "5rem",
    opacity: 0.12,
    delay: "0s",
    duration: "8s",
    rotate: "-15deg",
  },
  {
    id: 2,
    top: "10%",
    left: "5%",
    size: "4.5rem",
    opacity: 0.09,
    delay: "-2s",
    duration: "10s",
    rotate: "20deg",
  },
  {
    id: 3,
    top: "55%",
    right: "6%",
    size: "5.5rem",
    opacity: 0.1,
    delay: "-4s",
    duration: "9s",
    rotate: "10deg",
  },
  {
    id: 4,
    top: "60%",
    left: "3%",
    size: "4rem",
    opacity: 0.08,
    delay: "-1s",
    duration: "11s",
    rotate: "-25deg",
  },
  {
    id: 5,
    top: "30%",
    right: "2%",
    size: "3.5rem",
    opacity: 0.11,
    delay: "-5s",
    duration: "7.5s",
    rotate: "30deg",
  },
  {
    id: 6,
    top: "75%",
    left: "10%",
    size: "3.8rem",
    opacity: 0.07,
    delay: "-3s",
    duration: "9.5s",
    rotate: "-10deg",
  },
];

export default function FaqPage() {
  const [openItems, setOpenItems] = useState(new Set([1]));

  const toggleItem = (id) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleContact = () => {
    window.open("https://wa.me/972506514500", "_blank", "noopener,noreferrer");
  };

  return (
    <div style={{ direction: "rtl" }}>
      <style>{`
        .page-container {
          min-height: 100vh;
          background-image: linear-gradient(to bottom right, #fff7ed 70%, #e76d2c 100%);
          position: relative;
          overflow: hidden;
        }

        .content-wrapper {
          position: relative;
          z-index: 10;
          margin-top: 3rem;
          margin-bottom: 60px;
        }

        .main-content {
          max-width: 56rem;
          margin: 0 auto;
          padding: 0 1rem 4rem 1rem;
        }

        /* ✅ אנימציות צפות — רק אם המשתמש לא ביקש הפחתת תנועה */
        .floating-bg-container {
          position: fixed;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .floating-element {
          position: absolute;
          border-radius: 9999px;
          filter: blur(70px);
        }

        @media (prefers-reduced-motion: no-preference) {
          .floating-element {
            animation: float 6s ease-in-out infinite;
          }
        }

        .floating-element:nth-child(1) {
          width: 18rem; height: 18rem;
          top: 5rem; right: 5rem;
          background-image: linear-gradient(to right, rgba(251, 146, 60, 0.15), rgba(239, 68, 68, 0.15));
        }
        .floating-element:nth-child(2) {
          width: 24rem; height: 24rem;
          bottom: 8rem; left: 5rem;
          background-image: linear-gradient(to right, rgba(252, 211, 77, 0.15), rgba(244, 114, 182, 0.15));
          animation-delay: -2s;
        }
        .floating-element:nth-child(3) {
          width: 14rem; height: 14rem;
          top: 33%; left: 33%;
          background-image: linear-gradient(to right, rgba(251, 191, 36, 0.15), rgba(251, 146, 60, 0.15));
          animation-delay: -4s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(1deg); }
          66% { transform: translateY(-10px) rotate(-1deg); }
        }

        /* ✅ סימני שאלה קטנים ברקע העמוד */
        .bg-qmarks-container {
          position: fixed;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }

        .bg-qmark {
          position: absolute;
          font-weight: 700;
          color: #e76d2c;
          user-select: none;
          line-height: 1;
        }

        /* ✅ סימני שאלה גדולים בכותרת */
        .hero-qmarks-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }

        .hero-qmark {
          position: absolute;
          font-weight: 800;
          color: #e76d2c;
          user-select: none;
          line-height: 1;
        }

        /*
         * ✅ נגישות — תקן ישראלי IS 5568 (מבוסס WCAG 2.1 AA):
         * - קריטריון 2.3.1: אין הבהוב מעל 3 פעמים בשנייה
         * - קריטריון 2.3.3: אנימציה מבוטלת בהעדפת המשתמש
         * האנימציות איטיות (7-12 שניות למחזור), עדינות ולא מהבהבות
         */
        @media (prefers-reduced-motion: no-preference) {
          .bg-qmark {
            animation: bgQmarkFloat ease-in-out infinite;
          }
          .hero-qmark {
            animation: heroQmarkFloat ease-in-out infinite;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .bg-qmark,
          .hero-qmark {
            animation: none !important;
          }
        }

        @keyframes bgQmarkFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-8px) rotate(5deg);
          }
          50% {
            transform: translateY(-4px) rotate(-3deg);
          }
          75% {
            transform: translateY(-10px) rotate(2deg);
          }
        }

        @keyframes heroQmarkFloat {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          30% {
            transform: translateY(-18px) scale(1.04);
          }
          60% {
            transform: translateY(-8px) scale(0.97);
          }
        }

        .gradient-text {
          background-image: linear-gradient(135deg, #e76d2c 0%, #e76d2c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 24px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          flex-direction: column;
        }

        .hero-glass {
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 32px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          max-width: 56rem;
          margin: 0 auto;
          padding: 3rem;
          position: relative;
          overflow: hidden;
        }

        .page-header {
          text-align: center;
          padding: 4rem 1rem;
        }

        .hero-title {
          font-size: 3.75rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 2;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: #374151;
          max-width: 48rem;
          margin: 0 auto;
          line-height: 1.625;
          position: relative;
          z-index: 2;
        }

        .hero-icon-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 2;
        }

        .service-icon {
          background: linear-gradient(135deg, #e76d2c 0%, #e76d2c 100%);
          border-radius: 20px;
          padding: 1rem;
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 25px rgba(255, 123, 84, 0.3);
        }

        .hero-features {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 3rem;
          position: relative;
          z-index: 2;
        }

        .feature-item {
          text-align: center;
        }

        .feature-item p {
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
        }

        .feature-icon-wrapper {
          width: 4rem; height: 4rem;
          background-color: rgba(255, 255, 255, 0.3);
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 0.75rem auto;
          backdrop-filter: blur(5px);
        }

        .icon-feature { width: 2rem; height: 2rem; }
        .icon-large-white { width: 3rem; height: 3rem; color: white; }
        .text-orange-600 { color: #ea580c; }
        .text-amber-600 { color: #d97706; }
        .text-red-500 { color: #ef4444; }

        .page-footer {
          text-align: center;
          padding: 4rem 1rem;
        }

        .cta-card {
          max-width: 48rem;
          margin: 0 auto;
          padding: 3rem;
        }

        .cta-title {
          font-size: 2.25rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .cta-subtitle {
          font-size: 1.125rem;
          color: #374151;
          margin-bottom: 2rem;
        }

        .cta-buttons {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          justify-content: center;
        }

        @media (min-width: 640px) {
          .cta-buttons { flex-direction: row; }
        }

        .button-primary {
          padding: 1rem 2rem;
          border-radius: 1rem;
          font-weight: 600;
          font-size: 1.125rem;
          border: none;
          cursor: pointer;
          background-image: linear-gradient(to right, #fb923c, #e76d2c);
          color: white;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .button-primary:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
        }

        .button-primary:focus-visible {
          outline: 3px solid #e76d2c;
          outline-offset: 3px;
        }

        @media (prefers-reduced-motion: reduce) {
          .button-primary {
            transition: none;
          }
          .button-primary:hover {
            transform: none;
          }
        }
      `}</style>

      <div className="page-container">
        {/* ✅ רקע דקורטיבי — גרדיאנטים */}
        <div className="floating-bg-container" aria-hidden="true">
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
        </div>

        {/* ✅ סימני שאלה קטנים ברקע כל העמוד */}
        <div className="bg-qmarks-container" aria-hidden="true">
          {BG_QUESTION_MARKS.map((qm) => (
            <span
              key={qm.id}
              className="bg-qmark"
              style={{
                top: qm.top,
                right: qm.right || "auto",
                left: qm.left || "auto",
                fontSize: qm.size,
                opacity: qm.opacity,
                animationDuration: qm.duration,
                animationDelay: qm.delay,
              }}
            >
              ?
            </span>
          ))}
        </div>

        <div className="content-wrapper">
          <header className="page-header">
            <div className="hero-glass">
              {/*
               * ✅ סימני שאלה גדולים דקורטיביים בכותרת
               * - aria-hidden="true" — מוסתר מקוראי מסך
               * - pointer-events: none — לא חוסם אינטראקציה
               * - אנימציה מבוטלת ב-prefers-reduced-motion: reduce (IS 5568 / WCAG 2.3.3)
               * - אין הבהוב — עומד בקריטריון WCAG 2.3.1
               */}
              <div className="hero-qmarks-container" aria-hidden="true">
                {HERO_QUESTION_MARKS.map((qm) => (
                  <span
                    key={qm.id}
                    className="hero-qmark"
                    style={{
                      top: qm.top,
                      right: qm.right || "auto",
                      left: qm.left || "auto",
                      fontSize: qm.size,
                      opacity: qm.opacity,
                      animationDuration: qm.duration,
                      animationDelay: qm.delay,
                      transform: `rotate(${qm.rotate})`,
                    }}
                  >
                    ?
                  </span>
                ))}
              </div>

              {/* ✅ אייקון דקורטיבי */}
              <div className="hero-icon-wrapper" aria-hidden="true">
                <div className="service-icon">
                  <HelpCircle className="icon-large-white" />
                </div>
              </div>

              <h1 className="hero-title gradient-text">שאלות ותשובות</h1>
              <p className="hero-subtitle">
                מצאו תשובות לכל השאלות שלכם על שירותי הנסיעות והטיולים שלנו
              </p>

              {/* ✅ features דקורטיביים עם aria-hidden על אייקונים */}
              <div className="hero-features">
                <div className="feature-item">
                  <div className="feature-icon-wrapper">
                    <Clock
                      className="icon-feature text-orange-600"
                      aria-hidden="true"
                    />
                  </div>
                  <p>24/7 תמיכה</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon-wrapper">
                    <Shield
                      className="icon-feature text-amber-600"
                      aria-hidden="true"
                    />
                  </div>
                  <p>ביטוח מלא</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon-wrapper">
                    <Phone
                      className="icon-feature text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                  <p>ליווי אישי</p>
                </div>
              </div>
            </div>
          </header>

          {/* ✅ רשימת שאלות נגישה */}
          <main className="main-content">
            <section aria-label="שאלות נפוצות">
              {FAQ_DATA.map((faq) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openItems.has(faq.id)}
                  onToggle={() => toggleItem(faq.id)}
                />
              ))}
            </section>
          </main>

          <section className="page-footer" aria-label="צור קשר">
            <div className="glass-card cta-card">
              <h2 className="cta-title gradient-text">יש לכם שאלה נוספת?</h2>
              <p className="cta-subtitle">
                הצוות שלנו כאן כדי לעזור לכם בכל שאלה או בקשה מיוחדת
              </p>
              <div className="cta-buttons">
                <button
                  className="button-primary"
                  onClick={handleContact}
                  aria-label="צרו איתנו קשר בוואטסאפ (נפתח בלשונית חדשה)"
                >
                  צרו איתנו קשר
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
