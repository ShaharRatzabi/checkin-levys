import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Share } from "lucide-react";
import Sidebar from "../Sidebar/Sidebar";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import LogoImg from "../../assets/images/logo.png";
import LogoText from "../../assets/images/logo-title.png";

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const hamburgerRef = useRef(null);

  const handleShare = async () => {
    const shareData = {
      title: "Check-In ✈️",
      text: "מצאתי אתר דילים שווים לטיסות וחופשות 🔥",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {}
    } else {
      await navigator.clipboard.writeText(shareData.url);
      // ✅ Toast נגיש במקום alert()
      setShareToast(true);
      setTimeout(() => setShareToast(false), 3000);
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
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1),
            0 0 15px rgba(255, 255, 255, 0.3),
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

        .hamburger-mobile { display: block; }

        /* ✅ ul במקום nav מקונן */
        .nav-links {
          display: none;
          list-style: none;
          margin: 0;
          padding: 0;
          align-items: center;
          gap: 0.5rem;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo-image-text { width: 100%; }

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

        .share-text { display: none; }

        @media (max-width: 1024px) {
          .logo-image-text {
            margin-top: 1.1rem;
            max-height: 260px;
            min-height: 220px;
          }
          .logo-icon { display: none; }
        }

        @media (min-width: 1024px) {
          .hamburger-mobile { display: none; }
          .logo-image-text { display: none; }
          .share-text { display: inline; }
          .nav-links {
            display: flex;
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
        }

        /* ✅ prefers-reduced-motion */
        @media (prefers-reduced-motion: no-preference) {
          .nav-link { transition: all 0.2s ease; }
          .share-button { transition: all 0.3s ease; }
        }

        .nav-link:hover { transform: scale(1.2); cursor: pointer; }
        .nav-link.active { color: var(--accent-dark); transform: scale(1.2); }

        .share-button {
          background-color: #000;
          color: #fff;
          border: none;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
        }

        .share-button:hover {
          transform: scale(1.05);
          background-color: #fff;
          color: #000;
        }

        .share-icon { width: 1rem; height: 1rem; }

        .nav-link:focus-visible,
        .share-button:focus-visible,
        .logo-container:focus-visible {
          outline: 3px solid #000;
          outline-offset: 4px;
          border-radius: 8px;
        }

        /* ✅ Toast שיתוף */
        .share-toast {
          background: #1f2937;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.95rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
          white-space: nowrap;
          font-family: "Assistant", sans-serif;
        }

        @media (prefers-reduced-motion: reduce) {
          .nav-link:hover,
          .share-button:hover { transform: none; }
        }
      `}</style>

      {/* ✅ aria-live toast — מכריז לקוראי מסך אוטומטית */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "fixed",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
        }}
      >
        {shareToast && <div className="share-toast">הקישור הועתק ללוח 📋</div>}
      </div>

      <header>
        {/* ✅ nav אחד בלבד — הוסרה ה-nav הפנימית המקוננת */}
        <nav className="header" aria-label="ניווט ראשי">
          <div className="header-container">
            <div className="hamburger-mobile">
              <HamburgerMenu
                ref={hamburgerRef}
                onClick={() => setIsSidebarOpen(true)}
                isOpen={isSidebarOpen}
                controlsId="mobile-navigation"
              />
            </div>

            <Link
              to="/"
              className="logo-container"
              aria-label="עמוד הבית – Check In"
            >
              <div className="logo-icon" aria-hidden="true">
                <img src={LogoImg} alt="" />
              </div>
              <div className="logoText-icon" aria-hidden="true">
                <img src={LogoText} alt="" className="logo-image-text" />
              </div>
              <span className="logo-text">Check In</span>
            </Link>

            {/* ✅ ul/li במקום nav מקונן — סמנטיקה נכונה לרשימת ניווט */}
            <ul className="nav-links" role="list">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="nav-link">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="header-actions">
              <button
                className="share-button"
                onClick={handleShare}
                aria-label="שיתוף האתר"
              >
                <Share className="share-icon" aria-hidden="true" />
                <span className="share-text">שיתוף</span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      <Sidebar
        id="mobile-navigation"
        isOpen={isSidebarOpen}
        onClose={() => {
          setIsSidebarOpen(false);
          // ✅ החזרת פוקוס להמבורגר בסגירה
          setTimeout(() => hamburgerRef.current?.focus(), 50);
        }}
        navigationItems={navigationItems}
      />
    </>
  );
}

export default Header;
