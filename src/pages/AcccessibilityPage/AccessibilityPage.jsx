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
              Check-In שואפת לאפשר לכל אדם חוויית גלישה נוחה באתר. אנו פועלים
              לשפר את נגישות האתר באופן שוטף, כחלק מהמחויבות שלנו לשירות שוויוני
              וכולל.
            </p>
          </div>
        </header>

        <main className="access-content" id="main-content">
          {/* מחויבות */}
          <article className="access-card">
            <h2>רקע ומחויבות</h2>
            <p>
              אתר זה עבר התאמות נגישות ברוח סעיף 35 לתקנות שוויון זכויות לאנשים
              עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013, ובהתייחסות לתקן
              הישראלי ת"י 5568 המבוסס על הנחיות WCAG 2.1 ברמה AA.
            </p>
            <p>
              האתר תוכנן ופותח תוך התאמה ככל הניתן להנחיות הנגישות של{" "}
              <strong>WCAG 2.1 ברמה AA</strong>, ואנו ממשיכים לבצע בדיקות
              ושיפורים שוטפים לצורך שמירה על חוויית שימוש נגישה עבור כלל
              המשתמשים.
            </p>
            <p>
              הנגשת האתר היא תהליך מתמשך, ואנו ממשיכים לפעול לשיפור ולהרחבת
              התאמות הנגישות בהתאם לצורך ולמשוב מהמשתמשים.
            </p>
          </article>

          {/* מבנה סמנטי וניווט */}
          <article className="access-card">
            <h2>מבנה האתר וניווט</h2>
            <p>
              האתר בנוי כך שמבנה העמודים יהיה ברור ומובן ככל הניתן, הן למשתמשים
              רגילים והן למשתמשים בטכנולוגיות מסייעות.
            </p>
            <ul>
              <li>
                העמודים בנויים עם תגיות HTML5 סמנטיות כגון header, main, nav,
                section ו-footer, כדי לסייע לקוראי מסך לזהות את חלקי הדף
              </li>
              <li>
                מבנה כותרות היררכי (h1 עד h3) — כל עמוד כולל כותרת ראשית אחת
                ותתי-כותרות מסודרות
              </li>
              <li>
                רשימות ותפריטים מסומנים עם role מתאים (list, listitem,
                navigation) כדי שקוראי מסך יוכלו לזהות אותם
              </li>
              <li>
                כפתור "דלג לתוכן הראשי" מופיע בראש כל עמוד, ומאפשר לדלג על
                התפריט ישירות לתוכן
              </li>
            </ul>
          </article>

          {/* ניווט מקלדת */}
          <article className="access-card">
            <h2>ניווט מקלדת</h2>
            <p>
              האתר תוכנן כך שניתן יהיה לתפעל את כל הרכיבים האינטראקטיביים
              באמצעות מקלדת בלבד, ללא צורך בעכבר.
            </p>
            <ul>
              <li>
                ניווט באמצעות Tab ו-Shift+Tab בין כלל הרכיבים האינטראקטיביים —
                קישורים, כפתורים, שדות טופס ומודאלים
              </li>
              <li>
                סמן פוקוס ויזואלי ברור (מסגרת כתומה) מופיע על כל אלמנט שמקבל
                פוקוס, כך שקל לדעת היכן נמצאים
              </li>
              <li>
                מודאלים וחלונות קופצים כוללים "מלכודת פוקוס" — כלומר, הפוקוס
                נשאר בתוך החלון ולא בורח לרקע, וסגירה אפשרית באמצעות מקש ESC
              </li>
              <li>
                אזורים ניתנים לגלילה (כגון קרוסלת הסרטונים) נגישים גם במקלדת
              </li>
            </ul>
          </article>

          {/* קוראי מסך */}
          <article className="access-card">
            <h2>תמיכה בקוראי מסך</h2>
            <p>
              השתמשנו בתכונות ARIA לצורך תקשורת ברורה יותר עם קוראי מסך. ריכזנו
              כאן את עיקר הפעולות:
            </p>
            <ul>
              <li>
                תמונות משמעותיות כוללות תיאור טקסטואלי חלופי (alt). תמונות
                דקורטיביות בלבד מסומנות כ-aria-hidden כך שקוראי מסך מדלגים עליהן
              </li>
              <li>
                אייקונים דקורטיביים (כגון חצים, סמלים) מוסתרים מקוראי מסך
                באמצעות aria-hidden, כך שלא מפריעים לקריאה
              </li>
              <li>
                קישורים שנפתחים בלשונית חדשה כוללים ציון מתאים ב-aria-label כדי
                שהמשתמש ידע על כך מראש
              </li>
              <li>
                הודעות סטטוס (כמו אישור שליחה או שגיאה) מוכרזות אוטומטית דרך
                aria-live, ללא צורך ברענון או אינטראקציה נוספת
              </li>
              <li>
                שדות טופס מקושרים ל-label בצורה פרוגרמטית, ושדות חובה מסומנים עם
                aria-required
              </li>
              <li>
                מעבר בין עמודים באתר מוכרז לקוראי מסך כדי שהמשתמש יידע שהתוכן
                השתנה
              </li>
            </ul>
          </article>

          {/* אנימציות ותנועה */}
          <article className="access-card">
            <h2>אנימציות ותנועה</h2>
            <p>
              האתר כולל אנימציות דקורטיביות ואפקטים ויזואליים. ננקטו צעדים כדי
              שאלו לא יפגעו בחוויית השימוש:
            </p>
            <ul>
              <li>
                כל האנימציות מכבדות את הגדרת "הפחתת תנועה"
                (prefers-reduced-motion) במערכת ההפעלה — משתמשים שהגדירו זאת
                יראו את האתר ללא אנימציות
              </li>
              <li>
                אנימציות הרקע הדקורטיביות (עיגולים צפים, אלמנטים מרחפים) פועלות
                במהירות נמוכה ובלי הבהוב, בהתאם להנחיות למניעת התקפים
              </li>
              <li>
                סרטון דקורטיבי (בעמוד הדילים) כולל כפתור להשהיה/הפעלה, ואינו
                מנגן אוטומטית כאשר המשתמש מעדיף הפחתת תנועה
              </li>
            </ul>
          </article>

          {/* ניגודיות וקריאות */}
          <article className="access-card">
            <h2>ניגודיות וקריאות</h2>
            <p>
              פעלנו לשמור על ניגודיות צבעים מספקת ברחבי האתר לצורך קריאות טובה:
            </p>
            <ul>
              <li>
                צבעי הטקסט והרקע נבחרו כך שיעמדו ביחס ניגודיות של 4.5:1 לפחות
                לטקסט רגיל, ו-3:1 לטקסט גדול, בהתאם להנחיות WCAG AA
              </li>
              <li>
                כפתורים ותגיות פעילים עברו בדיקת ניגודיות ותוקנו לצבעים כהים
                יותר כדי לעמוד בדרישות
              </li>
              <li>
                כרטיסי תוכן עם טקסט על רקע תמונה כוללים שכבת הכהיה שמבטיחה
                קריאות גם על תמונות בהירות
              </li>
              <li>
                האתר תומך בהגדלת טקסט עד 200% מהגודל המקורי מבלי שתוכן ייחתך או
                יאבד
              </li>
            </ul>
          </article>

          {/* רספונסיביות */}
          <article className="access-card">
            <h2>התאמה למכשירים</h2>
            <p>
              האתר רספונסיבי ומותאם לשימוש במכשירים שונים — מחשבים, טאבלטים
              וטלפונים ניידים. הממשק מתאים את עצמו לגודל המסך כדי לשמור על
              חוויית שימוש נוחה.
            </p>
          </article>

          {/* סייגים */}
          <article className="access-card">
            <h2>סייגים ומגבלות ידועות</h2>
            <p>
              למרות המאמצים, ייתכן שישנם מקומות באתר שטרם הונגשו במלואם. אלה
              המגבלות העיקריות שאנו מודעים להן:
            </p>
            <ul className="caveats">
              <li>
                קישורים לאתרים חיצוניים (כגון אתרי ויזות, טפסים ממשלתיים
                ופלטפורמות הזמנה) אינם בשליטתנו, ורמת הנגישות שלהם משתנה
              </li>
              <li>
                סרטוני YouTube המוטמעים באתר כוללים רכיבי ממשק פנימיים של
                YouTube שאינם בשליטתנו ועשויים שלא לעמוד בכל דרישות הנגישות
              </li>
              <li>
                ממשקי צד שלישי כגון מפות ווידג'טים חיצוניים עשויים להיות נגישים
                חלקית בלבד
              </li>
              <li>
                ייתכנו דפים או רכיבים שטרם נבדקו — אנו מבצעים בדיקות שוטפות
                ומשתפרים בהתאם
              </li>
            </ul>
          </article>

          {/* יצירת קשר */}
          <article className="access-card">
            <h2>פניות בנושא נגישות</h2>
            <p>
              נתקלתם בקושי בשימוש באתר? יש לכם הצעה לשיפור? אנחנו כאן. כל פנייה
              נבדקת ומטופלת.
            </p>
            <p>כדי שנוכל לטפל בפנייה ביעילות, כדאי לציין:</p>
            <ul>
              <li>תיאור קצר של הבעיה והפעולה שניסיתם לבצע</li>
              <li>קישור לדף הרלוונטי</li>
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
            <time dateTime={new Date().toISOString().split("T")[0]}>
              {new Date().toLocaleDateString("he-IL")}
            </time>
          </p>
        </main>
      </div>
    </div>
  );
}
