import "./WhyUsSection.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import ProcessPage from "./ProcessSection";
import LiranAndRoieImage from "../../../assets/images/roie-liran-travel.png";

export default function WhyUsSection() {
  useEffect(() => {
    // ✅ AOS מכבד prefers-reduced-motion
    AOS.init({ duration: 1000, disable: "reduced-motion" });
  }, []);

  return (
    <section className="why-us" aria-label="למה לבחור Check-In">
      <div className="main-container">
        <div className="why-us-container" data-aos="fade-up">
          <h2 className="why-us-title">
            למה לבחור <br />
            <span className="checkin-text">CHECK-IN</span>
          </h2>
          <div className="why-us-cards">
            <div className="why-us-card">
              <h3>זמינות מלאה ללקוח</h3>
              <p>זמינות גם במהלך החופשה לכל שאלה, בעיה או מקרה חירום</p>
            </div>
            <div className="why-us-card">
              <h3>ניהול מלא של ההזמנה</h3>
              <p>
                צ'ק-אין לטיסות, בקשות מיוחדות למלון, בדיקה שאתם רשומים – למניעת
                תקלות
              </p>
            </div>
            <div className="why-us-card">
              <h3>המלצות מהשטח</h3>
              <p>
                מבוססות על ניסיון אמיתי מכל סגנונות הטיולים: נופים, תרבויות,
                כדורגל, קזינו ועוד
              </p>
            </div>
            <div className="why-us-card">
              <h3>מעטפת שלמה לכל צורך</h3>
              <p>
                הזמנת נהגים, הכוונה לאטרקציות, כרטיסים למשחקים, הצעות נישואים,
                ביטוחים, מענה אינטרנטי, סיורים, טיולי יום ועוד.
              </p>
            </div>
          </div>
        </div>

        {/* ✅ alt תיאורי בעברית */}
        <img src={LiranAndRoieImage} alt="לירן ורועי בטיול" />
      </div>

      <ProcessPage />
    </section>
  );
}
