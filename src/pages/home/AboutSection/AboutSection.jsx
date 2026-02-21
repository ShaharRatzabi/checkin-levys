import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./AboutSection.css";

import Dialog from "../../../components/Dialog.jsx"; // תוודא שהנתיב נכון
import LiranImg from "../../../assets/images/Liran-Roi.png";
import LiranPopupImg from "../../../assets/images/Liran.png";
import RoiPopupImg from "../../../assets/images/roi.png";

function AboutSection() {
  const [activePerson, setActivePerson] = useState(null); // null | "liran" | "roi"

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="about-section">
      <div className="about-orbs-background">
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
          <img src={LiranImg} alt="liran and roie image" data-aos="fade-up" />

          {/* כפתור מידע ללירן */}
          <button
            className="info-btn info-btn-liran"
            onClick={() => setActivePerson("liran")}
            title="מידע על לירן"
          ></button>

          {/* כפתור מידע לרועי */}
          <button
            className="info-btn info-btn-roi"
            onClick={() => setActivePerson("roi")}
            title="מידע על רועי"
          ></button>

          {/* הכפתור הראשי */}
          <a href="/about" className="primary-btn" data-aos="fade-up">
            עוד על Check-In ולהאזנה לקטע המלא שלנו ברדיו
          </a>
        </div>

        {/* דיאלוג ללירן */}
        <Dialog
          isOpen={activePerson === "liran"}
          onClose={() => setActivePerson(null)}
          title="לירן לוי"
          imageUrl={LiranPopupImg}
        >
          <p>
            מטייל ותיק עם ניסיון עשיר בעשרות יעדים ברחבי אירופה ודרום אמריקה.
            מומחה בטיולי נופש, תרבות, כדורגל, קזינו ונופים עוצרי נשימה. כאן לא
            רק כדי לתכנן לכם טיולים אלא גם כדי להגשים לכם חלומות!
          </p>
        </Dialog>

        {/* דיאלוג לרועי */}
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
            והתמכרות ייחודית.
          </p>
        </Dialog>

        <div className="about-section__video">
          <iframe
            src="https://www.youtube.com/embed/Ra-5BWqqulc?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&playsinline=1&loop=1&playlist=Ra-5BWqqulc"
            title="Check-In video"
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
