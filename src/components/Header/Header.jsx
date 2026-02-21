import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Share } from "lucide-react";
import Sidebar from "../Sidebar/Sidebar";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import LogoImg from "../../assets/images/logo.png";
import LogoText from "../../assets/images/logo-title.png";

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleShare = async () => {
    const shareData = {
      title: "Check-In ✈️",
      text: "מצאתי אתר דילים שווים לטיסות וחופשות 🔥",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Share cancelled", err);
      }
    } else {
      // fallback – העתקת קישור
      await navigator.clipboard.writeText(shareData.url);
      alert("הקישור הועתק ללוח 📋");
    }
  };

  const navigationItems = [
    { name: "בית", href: "/" },
    { name: "אודות", href: "/about" },
    { name: "ביקורות", href: "/reviews" },
    { name: "דילים", href: "/deals" },
    { name: "ויזות", href: "/visas" },
    { name: "שאלות ותשובות", href: "/faq" },
  ];

  return (
    <>
      <style>{`
        .header {
          position: fixed;
          top: 1rem;
          left: 1rem;
          right: 1rem;
          z-index: 50;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1), 0 0 15px rgba(255, 255, 255, 0.3),
            0 0 30px rgba(255, 255, 255, 0.2);
          height: 4.5rem;
        }

        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .hamburger-mobile {
          display: block;
        }
        
        .nav-links {
          display: none;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo-image-text {
            width: 100%;
        }

        .logo-icon {
          width: 4rem;
          height: 4rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 1.5rem;
        }
        
        

        .logo-text {
          display: none;
          font-weight: 800;
          color: var(--primary-text);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .share-text {
          display: none;
        }

        @media (max-width: 768px) {
        .logo-image-text {
            margin-top: 1.1rem;
            max-height: 260px;
          }

          .logo-icon {
            display: none;
          }
        }

        @media (min-width: 768px) {
          .hamburger-mobile {
            display: none;
          }

         .logo-image-text {
            display: none;
          }

          .share-text {
            display: inline;
          }

          .nav-links {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .logo-text {
            display: inline;
            font-size: 1.75rem;
          }
        }

        .nav-link {
          color: var(--secondary-text);
          font-weight: 600;
          font-size: 1.1rem;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 0.75rem;
          transition: all 0.2s ease;
        }

      .nav-link:hover {
        transform: scale(1.2);
        cursor: pointer;
      }

        .nav-link.active {
          color: var(--accent-dark);
          transform: scale(1.2);
        }

        .admin-link {
          background-color: #e9ecef;
          color: #495057;
        }

        .admin-link:hover {
          color: #000;
        }

        .share-button {
          background-color: #000; /* שחור ברירת מחדל */
          color: #fff;
          border: none;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
        }

        .share-button:hover {
          transform: scale(1.05);
          background-color: #fff; /* לבן בהובר */
          color: #000; /* טקסט שחור בהובר */
        }

        .share-icon {
          width: 1rem;
          height: 1rem;
        }
      `}</style>

      <nav className="header">
        <div className="header-container">
          <div className="hamburger-mobile">
            <HamburgerMenu onClick={() => setIsSidebarOpen(true)} />
          </div>

          <Link to="/" className="logo-container">
            <div className="logo-icon">
              <img src={LogoImg} alt="Check-In logo" className="logo-image" />
            </div>
            <div className="logoText-icon">
              <img
                src={LogoText}
                alt="Check-In logo Text"
                className="logo-image-text"
              />
            </div>
            <span className="logo-text">Check In</span>
          </Link>

          <div className="nav-links">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link ${
                  item.name === "ניהול" ? "admin-link" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="header-actions">
            <button className="share-button" onClick={handleShare}>
              <Share className="share-icon" />
            </button>
          </div>
        </div>
      </nav>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        navigationItems={navigationItems}
      />
    </>
  );
}

export default Header;
