import { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./AboutSection.css";
import { Link } from "react-router-dom";

import Dialog from "../../../components/Dialog.jsx";
import LiranImg from "../../../assets/images/Liran-Roi.png";
import LiranPopupImg from "../../../assets/images/Liran.png";
import RoiPopupImg from "../../../assets/images/Roi.png";

function AboutSection() {
  const [activePerson, setActivePerson] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const iframeRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000, disable: "reduced-motion" });

    // ✅ אם המשתמש ביקש הפחתת תנועה — לא מריצים אוטומטית
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) setIsPlaying(false);
  }, []);

  // ✅ שליטה בנגינה דרך YouTube postMessage API
  const handleVideoToggle = () => {
    if (!iframeRef.current) return;
    const command = isPlaying ? "pauseVideo" : "playVideo";
    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({ event: "command", func: command }),
      "https://www.youtube.com",
    );
    setIsPlaying(!isPlaying);
  };

  // ✅ src עם enablejsapi=1 לשליטה + controls=1 לנגישות
  const videoSrc = `https://www.youtube.com/embed/Ra-5BWqqulc?autoplay=${isPlaying ? 1 : 0}&mute=1&controls=1&modestbranding=1&rel=0&playsinline=1&loop=1&playlist=Ra-5BWqqulc&enablejsapi=1`;

  return (
    <section className="about-section" aria-label="אודות Check-In">
      {/* ✅ כדורי רקע דקורטיביים */}
      <div className="about-orbs-background" aria-hidden="true">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
      </div>

      <h2>
        נעים מאוד אנחנו <br />
        CHECK-IN
      </h2>

      <div className="about-section-content">
        <div className="about-section__image">
          <img
            src={LiranImg}
            alt="לירן ורועי לוי, מייסדי Check-In"
            data-aos="fade-up"
          />

          <div
            className="person-card person-card-liran"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <h3 className="person-name">לירן לוי</h3>
            <p className="person-role">יועץ תיירות מוסמך</p>
            <p className="person-quote">"הסיפוק שלי זה הכיף ונחת שלכם"</p>
            <button
              className="info-btn info-btn-liran"
              onClick={() => setActivePerson("liran")}
              aria-label="מידע נוסף על לירן"
              aria-haspopup="dialog"
            />
          </div>

          <div
            className="person-card person-card-roi"
            data-aos="fade-up"
            data-aos-delay="250"
          >
            <h3 className="person-name">רועי לוי</h3>
            <p className="person-role">יועץ תיירות מוסמך</p>
            <p className="person-quote">"התשוקה שלי - החוויה הבאה שלכם"</p>
            <button
              className="info-btn info-btn-roi"
              onClick={() => setActivePerson("roi")}
              aria-label="מידע נוסף על רועי"
              aria-haspopup="dialog"
            />
          </div>

          <Link
            to="/about"
            className="primary-btn"
            data-aos="fade-up"
            data-aos-delay="350"
          >
            עוד על Check-In ולהאזנה לקטע המלא שלנו ברדיו
          </Link>
        </div>

        <Dialog
          isOpen={activePerson === "liran"}
          onClose={() => setActivePerson(null)}
          title="לירן לוי"
          imageUrl={LiranPopupImg}
        >
          <p>
            מטייל ותיק עם ניסיון עשיר בעשרות יעדים ברחבי אירופה ודרום אמריקה.
            מומחה בטיולי נופש, תרבות, כדורגל, קזינו ונופים עוצרי נשימה. כאן לא
            רק כדי לתכנן לכם טיולים אלא גם כדי להגשים לכם חלומות!
          </p>
        </Dialog>

        <Dialog
          isOpen={activePerson === "roi"}
          onClose={() => setActivePerson(null)}
          title="רועי לוי"
          imageUrl={RoiPopupImg}
        >
          <p>
            מטייל עם חזון ורעב בלתי נגמר, עם רזומה מרשים בעשרות יעדים ברחבי
            העולם, בייחוד אירופה והמזרח הרחוק. מביא שילוב של היכרות מעמיקה
            מהשטח, מקצועיות ושירות ללא פשרות. מאמין כי גילוי העולם הוא אהבה
            והתמכרות ייחודית.
          </p>
        </Dialog>

        {/*
          ✅ video-wrapper עם כפתור עצירה נגיש
          ✅ הוסר ::after שחסם את כפתורי YouTube
          ✅ controls=1 — משתמש יכול לשלוט
          ✅ enablejsapi=1 — שליטה דרך postMessage
        */}
        <div className="about-section__video">
          <div className="video-wrapper">
            <iframe
              ref={iframeRef}
              src={videoSrc}
              title="קטע רדיו של Check-In — סוכנות הנסיעות שלנו"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
            {/* ✅ כפתור עצירה נגיש — חובה לפי WCAG */}
            <button
              className="video-pause-btn"
              onClick={handleVideoToggle}
              aria-label={isPlaying ? "השהיית הסרטון" : "הפעלת הסרטון"}
            >
              {isPlaying ? "⏸ השהה" : "▶ הפעל"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
