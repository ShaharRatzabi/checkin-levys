import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";
import "./LinksSection.css";

function LinksSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <nav
      className={`navigation-links ${visible ? "appear" : ""}`}
      aria-label="רשתות חברתיות"
    >
      <a
        href="https://www.facebook.com/CHECKIN.OTA/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="עמוד הפייסבוק שלנו (נפתח בלשונית חדשה)"
      >
        <FaFacebook aria-hidden="true" />
      </a>
      <a
        href="https://www.instagram.com/CHECK_IN_levys/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="עמוד האינסטגרם שלנו (נפתח בלשונית חדשה)"
      >
        <FaInstagram aria-hidden="true" />
      </a>
      <a
        href="https://api.whatsapp.com/send?phone=972506514500"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="צור קשר בוואטסאפ (נפתח בלשונית חדשה)"
      >
        <FaWhatsapp aria-hidden="true" />
      </a>
      <a
        href="https://www.tiktok.com/@checkin2024"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="עמוד הטיקטוק שלנו (נפתח בלשונית חדשה)"
      >
        <FaTiktok aria-hidden="true" />
      </a>
    </nav>
  );
}

export default LinksSection;
