import React, { useState } from "react";
import { BookUser, Globe, Plane } from "lucide-react";
import VisaListItem from "./VisaListItem";
import VisaDetailView from "./VisaDetailView";
import Dialog from "../../components/Dialog";

import LondonImage from "../../assets/images/visas-london.jpg";
import ThailandImage from "../../assets/images/visas-thailand.jpg";
import SriLankaImage from "../../assets/images/visas-srilanka.jpg";
import ZanzibarImage from "../../assets/images/visas-zanzibar.jpg";
import AzerbaijanImage from "../../assets/images/visas-azerbaijan.jpg";
import SingaporeImage from "../../assets/images/visas-singapore.jpg";
import PhilippinesImage from "../../assets/images/visas-philippines.jpg";
import VisasHeaderImage from "../../assets/images/visas-header-image.jpg";

const VISA_DATA = [
  {
    id: 1,
    country: "בריטניה",
    flag: "https://flagcdn.com/w40/gb.png",
    title: "טופס ETA",
    subtitle: "אישור כניסה אלקטרוני",
    image: LondonImage,
    cost: "16 פאונד לאדם",
    validity: "שנתיים או עד תום תוקף הדרכון",
    processingTime: "3 ימים מינימום",
    requirements: [
      "כל בעל דרכון ישראלי או אירופאי מחויב למלאו",
      "כל גיל חייב באישור ETA",
      "יש למלא טופס זה גם בעצירות קונקשן",
      "יש להוריד את אפליקציית UK ETA למילוי הטופס",
    ],
    links: [
      { name: "הורדה לאייפון (iOS)", url: "https://did.li/UKETAappstore" },
      { name: "הורדה לאנדרואיד", url: "https://did.li/UKETAandroid" },
    ],
  },
  {
    id: 2,
    country: "תאילנד",
    flag: "https://flagcdn.com/w40/th.png",
    title: "טופס TDAC",
    subtitle: "הצהרת כניסה לתאילנד",
    image: ThailandImage,
    cost: "חינמי",
    validity: "חודשיים",
    processingTime: "מינימום 3 ימים לפני ההגעה",
    requirements: [
      "כל אזרח בעל אזרחות לא תאילנדית מחויב למלאו",
      "הטופס הינו טופס חינמי לחלוטין",
      "יש למלא את הטופס גם עבור עצירות קונקשן",
      "לטופס אין תוקף, יש למלא לפני כל כניסה למדינה",
    ],
    links: [
      {
        name: "מילוי טופס TDAC אונליין",
        url: "https://did.li/ThailandArrival",
      },
    ],
  },
  {
    id: 31,
    country: "ארה״ב",
    flag: "https://flagcdn.com/w40/us.png",
    title: "Visa",
    subtitle: "אישורי כניסה לארה״ב",
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop",
    cost: "185 דולר",
    validity: "10 שנים",
    processingTime: "כמה שבועות עד חודשים",
    requirements: [
      "ניתן להוציא עם כל סוג דרכון",
      "תקפה ל10 שנים",
      "ניתן להשתמש בה גם אם מחליפים דרכון",
      "עולה 185 דולר",
      "אישור מתקבל תוך כמה שבועות עד חודשים",
      "במידה ומטרות הטיול הנן לימודים או עבודה נדרשת ויזה מהסוג המתאים",
      "מאפשרת שהייה של עד 180 עם אפשרות להארכה",
    ],
    links: [{ name: "מילוי טופס מקוון DC160", url: "https://did.li/VisaUSA" }],
  },
  {
    id: 32,
    country: "ארה״ב",
    flag: "https://flagcdn.com/w40/us.png",
    title: "טופס ESTA",
    subtitle: "אישורי כניסה לארה״ב",
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop",
    cost: "21 דולר",
    validity: "שנתיים",
    processingTime: "1–3 ימים",
    requirements: [
      "מחייבת דרכון ביומטרי",
      "תקפה לשנתיים בלבד",
      "במידה ומוציאים דרכון חדש יש למלא טופס זה מחדש",
      "עולה 21 דולר",
      "אישור מתקבל תוך 1-3 ימים",
      "מתאימה ל3 סוגי נסיעות - טיול, קונקשיין ועסקים",
      "מאפשרת שהייה של עד 90 יום רצופים, ללא אפשרות להארכה",
    ],
    links: [{ name: "מילוי טופס ESTA", url: "https://did.li/ESTAUSA" }],
  },
  {
    id: 4,
    country: "זנזיבר (טנזניה)",
    flag: "https://flagcdn.com/w40/tz.png",
    title: "Visa וביטוח פנימי",
    subtitle: "אשרת כניסה וביטוח בריאות",
    image: ZanzibarImage,
    cost: "כ-50 דולר לאדם",
    validity: "3 חודשים",
    processingTime: "מיידי (אונליין/בשדה)",
    requirements: [
      "כל הנכנסים לזנזיבר (טנזניה) נדרשים לויזה",
      "חובה לרכוש ביטוח בריאות פנימי",
      "ניתן לשלם באתר הרשמי או במזומן בשדה התעופה",
      "לאחר התשלום אונליין יתקבל מייל ממשלתי הקובע האם כניסתכם למדינה מאושרת או לא",
      "בתום התהליך יתקבל מסמך המאשר את כניסתכם, יש לשמור אותו",
      "מחיר הביטוח אינו כלול בויזה, הוא משתנה בהתאם לכמות השהייה, והמצב הבריאותי של כל אדם",
    ],
    links: [
      { name: "הנפקת ויזה אונליין", url: "https://did.li/VisaZanzibar" },
      {
        name: "רכישת ביטוח בריאות פנימי",
        url: "https://did.li/ZanzibarInsurance",
      },
    ],
  },
  {
    id: 5,
    country: "סרי לנקה",
    flag: "https://flagcdn.com/w40/lk.png",
    title: "טופס כניסה למדינה",
    subtitle: "אישור כניסה אלקטרוני חינמי",
    image: SriLankaImage,
    cost: "חינמי",
    validity: "שהייה של 30 ימים",
    processingTime: "מיידי",
    requirements: [
      "החל מיולי 2025 ישראלים פטורים מויזה",
      "חובה למלא טופס כניסה חינמי באתר רשות ההגירה",
      "ניתן להשתמש באישור עד 3 חודשים מרגע קבלתו",
    ],
    links: [{ name: "מילוי טופס כניסה", url: "https://did.li/VisaSrilanka" }],
  },
  {
    id: 6,
    country: "אזרבייג׳ן",
    flag: "https://flagcdn.com/w40/az.png",
    title: "הנפקת ויזה (E-VISA)",
    subtitle: "ויזה אלקטרונית",
    image: AzerbaijanImage,
    cost: "30$ (רגילה) | 93$ (דחופה)",
    validity: "עד 15 ימים, כניסה אחת",
    processingTime: "עד 3 ימי עסקים",
    requirements: [
      "כל אדם מחויב בויזה בכניסה למדינה",
      "ניתן להנפיק באתר EVIZA או בשדה התעופה",
      "מומלץ להנפיק את הויזה לפחות 3 ימים לפני ההגעה",
      "יש לשמור את אישור הויזה (מודפס או דיגיטלי)",
    ],
    links: [
      { name: "הנפקת ויזה אלקטרונית", url: "https://did.li/VisaAzerbaijan" },
    ],
  },
  {
    id: 7,
    country: "סינגפור",
    flag: "https://flagcdn.com/w40/sg.png",
    title: "טופס SGAC",
    subtitle: "הצהרת כניסה לסינגפור",
    image: SingaporeImage,
    cost: "חינמי",
    validity: "שהייה של עד 30 יום",
    processingTime: "מינימום 3 ימים לפני ההגעה",
    requirements: [
      "כל אדם שאינו מקומי הנכנס לסינגפור מחויב למלא טופס זה",
      "הטופס הינו חינמי לחלוטין",
      "חובה למלא אותו מינימום 3 ימים לפני ההגעה",
      "בטופס יש למלא פרטים אישיים, מיקום לינה, תאריכים והצהרת בריאות",
      "אישור דיגיטלי מתקבל במייל ויש להציגו בהגעה",
    ],
    links: [
      {
        name: "מילוי טופס SGAC אונליין",
        url: "https://did.li/SingaporeArrivalCard",
      },
    ],
  },
  {
    id: 8,
    country: "פיליפינים",
    flag: "https://flagcdn.com/w40/ph.png",
    title: "טופס e-Travel",
    subtitle: "טופס כניסה אלקטרוני",
    image: PhilippinesImage,
    cost: "חינמי",
    validity: "שהייה של עד 59 יום",
    processingTime: "מינימום 72 שעות (3 ימים) לפני ההגעה",
    requirements: [
      "כל אדם הנכנס למדינה מחויב למלא טופס זה",
      "כל נוסע חייב טופס נפרד וקוד אישי משלו",
      "יש למלא את הטופס 72 שעות (3 ימים) לפני ההגעה למדינה",
      "הטופס הינו חינמי לחלוטין",
    ],
    links: [
      {
        name: "מילוי טופס e-Travel אונליין",
        url: "https://etravel.gov.ph/",
      },
    ],
  },
];

VISA_DATA.sort((a, b) => a.country.localeCompare(b.country, "he"));

export default function VisasPage() {
  const [selectedVisa, setSelectedVisa] = useState(null);

  const handleOpenDialog = (visa) => setSelectedVisa(visa);
  const handleCloseDialog = () => setSelectedVisa(null);

  return (
    <div style={{ direction: "rtl" }}>
      <style>{`
        .visas-page {
          background-color: #f8f9fa;
          padding: 4rem 2rem;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background-image: linear-gradient(to bottom right, #fff7ed 70%, #e76d2c 100%);
        }

        .visas-grid-layout {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 3rem;
          max-width: 1400px;
          margin: 30px auto;
          align-items: flex-start;
          position: relative;
          z-index: 1;
        }

        .visas-list-header {
          background-color: #ffffff71;
          border-radius: 24px;
          padding: 5rem 4rem;
          margin-bottom: 3rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          align-self: center;
        }

        .header-image {
          position: absolute;
          bottom: -20px;
          right: -30px;
          width: 250px;
          height: auto;
          opacity: 0.7;
          z-index: 1;
          transform: rotate(-15deg);
        }

        /* ✅ prefers-reduced-motion */
        @media (prefers-reduced-motion: no-preference) {
          .header-image {
            animation: floatImage 6s ease-in-out infinite;
          }
          .header-decoration {
            animation: pulse 3s ease-in-out infinite;
          }
          .header-text h2 .highlight::after {
            animation: sparkle 1.5s ease-in-out infinite;
          }
        }

        @keyframes floatImage {
          0%, 100% { transform: translateY(0) rotate(-15deg); }
          50% { transform: translateY(-15px) rotate(-12deg); }
        }

        .header-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          align-items: center;
        }

        .header-icons {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .header-icon {
          width: 48px;
          height: 48px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(1, 1, 1, 0.3);
        }

        .header-icon svg {
          width: 24px;
          height: 24px;
          color: white;
        }

        .header-text h2 {
          font-size: 3.2rem;
          font-weight: 800;
          color: #333;
          margin: 0 0 0.5rem 0;
          line-height: 1.2;
        }

        .header-text h2 .highlight {
          background: linear-gradient(135deg, #ff9100ff 0%, #FFA500 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
        }

        .header-text h2 .highlight::after {
          content: '✨';
          position: absolute;
          top: -8px;
          right: -25px;
          font-size: 1.2rem;
        }

        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.2); }
        }

        .header-subtitle {
          font-size: 1.1rem;
          color: rgba(0, 0, 0, 0.9);
          font-weight: 500;
          line-height: 1.4;
        }

        .header-decoration {
          position: absolute;
          bottom: -20px;
          left: -20px;
          width: 80px;
          height: 80px;
          background: linear-gradient(45deg, #FFD700, #FFA500);
          border-radius: 50%;
          opacity: 0.1;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.2); opacity: 0.2; }
        }

        .visas-list-column {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: sticky;
          top: 100px;
          margin: 2rem;
        }

        .visas-scroll-pane {
          max-height: 80vh;
          overflow-y: auto;
          padding-right: 15px;
          margin-right: -15px;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        @media (max-width: 1024px) {
          .visas-grid-layout { grid-template-columns: 1fr; }
          .visas-list-column { order: 2; position: static; top: auto; }
        }

        @media (max-width: 768px) {
          .visas-page { padding: 2rem 1rem; }
          .header-content { flex-direction: column; text-align: center; }
          .header-icons { flex-direction: row; margin-left: 0; margin-top: 1rem; }
          .header-text h2 { font-size: 2.2rem; }
          .header-image { display: none; }
        }
      `}</style>

      {/* ✅ section סמנטי */}
      <section className="visas-page" aria-label="מידע על ויזות ואישורי כניסה">
        <div className="visas-grid-layout">
          {/* כותרת */}
          <header className="visas-list-header">
            <div className="header-content">
              <div className="header-text">
                <h1>
                  כל המידע על <span className="highlight">ויזות</span> ואישורי
                  כניסה
                </h1>
                <p className="header-subtitle">
                  מדריך מפורט ועדכני לכל המסמכים הנדרשים לנסיעה בטוחה ומוכנה
                </p>
              </div>
              {/* ✅ אייקוני header דקורטיביים */}
              <div className="header-icons" aria-hidden="true">
                <div className="header-icon">
                  <BookUser />
                </div>
                <div className="header-icon">
                  <Globe />
                </div>
                <div className="header-icon">
                  <Plane />
                </div>
              </div>
            </div>
            {/* ✅ תמונה דקורטיבית */}
            <img
              src={VisasHeaderImage}
              alt=""
              aria-hidden="true"
              className="header-image"
            />
            {/* ✅ עיטור דקורטיבי */}
            <div className="header-decoration" aria-hidden="true"></div>
          </header>

          {/* רשימת ויזות */}
          <div className="visas-list-column">
            <div
              className="visas-scroll-pane"
              role="list"
              aria-label="רשימת ויזות ואישורי כניסה"
            >
              {VISA_DATA.map((visa) => (
                <div role="listitem" key={visa.id}>
                  <VisaListItem
                    visa={visa}
                    onDiscoverMore={() => handleOpenDialog(visa)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Dialog
        isOpen={!!selectedVisa}
        onClose={handleCloseDialog}
        title={selectedVisa?.country}
      >
        {selectedVisa && <VisaDetailView visa={selectedVisa} />}
      </Dialog>
    </div>
  );
}
