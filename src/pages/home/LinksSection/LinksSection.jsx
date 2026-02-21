import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";
import "./LinksSection.css";

function LinksSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100); // אפשר גם 0 אם רוצים מיד

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`navigation-links ${visible ? "appear" : ""}`}>
      <a
        href="https://www.facebook.com/CHECKIN.OTA/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaFacebook />
      </a>
      <a
        href="https://www.instagram.com/CHECK_IN_levys/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram />
      </a>
      <a
        href="https://api.whatsapp.com/send?phone=972506514500"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp />
      </a>
      <a
        href="https://www.tiktok.com/@checkin2024"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaTiktok />
      </a>
    </div>
  );
}

export default LinksSection;
