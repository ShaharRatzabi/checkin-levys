import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./AboutSection.css";
import { Link } from "react-router-dom";
import { Radio } from "lucide-react";

import Dialog from "../../../components/Dialog.jsx";
import LiranImg from "../../../assets/images/Liran-Roi.png";
import LiranPopupImg from "../../../assets/images/Liran.png";
import RoiPopupImg from "../../../assets/images/Roi.png";

const RADIO_VIDEO = {
  id: "YCakIeX9ZMI",
  title: "Check-In בשידור רדיו",
};

function AboutSection() {
  const [activePerson, setActivePerson] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, disable: "reduced-motion" });
  }, []);

  const videoSrc = `https://www.youtube.com/embed/${RADIO_VIDEO.id}?controls=1&modestbranding=1&rel=0&playsinline=1`;

  return (
    <section className="about-section" aria-label="אודות Check-In">
      {/* כדורי רקע דקורטיביים */}
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
            <p className="person-quote">"הסיפוק שלי זה הכיף והנחת שלכם"</p>
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

        {/* סרטון רדיו — בסגנון עמוד האודות */}
        <div className="about-section__video" data-aos="fade-up">
          <div className="radio-card">
            <div className="radio-iframe-wrapper">
              <iframe
                src={videoSrc}
                title={RADIO_VIDEO.title}
                allow="encrypted-media; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="radio-caption">
              <div className="radio-caption-icon" aria-hidden="true">
                <Radio size={18} />
              </div>
              <div className="radio-caption-text">
                <span className="radio-caption-title">הראיון שלנו ברדיו</span>
                <span className="radio-caption-sub">
                  בעלי Check-In מספרים על החזון והחוויה
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
