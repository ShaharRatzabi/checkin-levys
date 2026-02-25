import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, onClose, navigationItems }) => {
  const sidebarRef = useRef(null);

  const isInternalLink = (href) => href.startsWith("#");

  // ✅ ESC לסגירה
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // ✅ Focus trap + פוקוס אוטומטי על כפתור הסגירה בפתיחה
  useEffect(() => {
    if (!isOpen || !sidebarRef.current) return;

    // ✅ setTimeout מחכה ל-visibility:visible לפני query + פוקוס
    //    בלי זה הפוקוס נכשל כי האלמנט עדיין hidden
    setTimeout(() => {
      if (!sidebarRef.current) return;
      const focusableElements = sidebarRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex="0"]',
      );
      if (focusableElements.length) focusableElements[0].focus();
    }, 50);

    const focusableElements = sidebarRef.current.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex="0"]',
    );
    if (!focusableElements.length) return;

    const handleTab = (e) => {
      if (e.key !== "Tab") return;
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const el = sidebarRef.current;
    el.addEventListener("keydown", handleTab);
    return () => el.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  // ✅ נעילת גלילת body
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ✅ הערה: פוקוס החזרה מטופל ב-Header.jsx דרך hamburgerRef — אין צורך לטפל כאן

  return (
    <>
      <style>{`
        .sidebar-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.4);
          z-index: 40;
        }

        .sidebar {
          position: fixed;
          top: 0;
          right: -100%;
          height: 100%;
          width: 280px;
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-left: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: -4px 0 16px rgba(0, 0, 0, 0.1);
          z-index: 70;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          /* ✅ visibility: hidden מוציא את כל הילדים מרצף ה-Tab כשסגור */
          visibility: hidden;
        }

        .sidebar-open {
          right: 0;
          visibility: visible;
        }

        @media (prefers-reduced-motion: no-preference) {
          .sidebar { transition: right 0.3s ease; }
          .sidebar-close { transition: all 0.2s ease; }
          .sidebar-nav-item {
            animation: slideIn 0.3s ease forwards;
            opacity: 0;
            transform: translateX(20px);
          }
        }



        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .sidebar-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .sidebar-logo {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #ff7b54, #fe782f);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          color: white;
          font-weight: bold;
          font-size: 18px;
        }

        .sidebar-title-text {
          font-size: 18px;
          font-weight: 700;
          color: #1f2937;
        }

        .sidebar-close {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          padding: 8px;
          cursor: pointer;
        }

        @media (prefers-reduced-motion: no-preference) {
          .sidebar-close:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: scale(1.05);
          }
        }

        /* ✅ hover ללא transform כשמשתמש ביקש הפחתת תנועה */
        @media (prefers-reduced-motion: reduce) {
          .sidebar-close:hover {
            background: rgba(255, 255, 255, 0.3);
          }
        }

        .close-icon {
          width: 16px;
          height: 16px;
          color: #1f2937;
        }

        .sidebar-nav { padding: 24px 0; flex-grow: 1; }

        .sidebar-nav-item {
          display: block;
          padding: 12px 24px;
          color: #1f2937;
          text-decoration: none;
          font-size: 16px;
          font-weight: 500;
          border-right: 3px solid transparent;
          border-radius: 20px;
        }

        .sidebar-nav-item:hover {
          background: rgba(255, 255, 255, 0.5);
          border-right-color: #fe782f;
        }

        @keyframes slideIn {
          to { opacity: 1; transform: translateX(0); }
        }

        /* ✅ ללא אנימציה */
        @media (prefers-reduced-motion: reduce) {
          .sidebar-nav-item {
            opacity: 1;
            transform: none;
            animation: none;
          }
        }

        .sidebar-footer {
          padding: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }

        .sidebar-signup-button {
          width: 100%;
          background: linear-gradient(90deg, #f97316, #fe782f);
          color: white;
          padding: 12px 16px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: inherit;
        }

        .sidebar a:focus-visible,
        .sidebar button:focus-visible {
          outline: 3px solid #000;
          outline-offset: 4px;
          border-radius: 4px;
        }
      `}</style>

      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/*
        ✅ inert מנוהל רק כאן ב-JSX — הוסר ה-useEffect הכפול
        ✅ aria-hidden כשסגור — מסתיר מקוראי מסך
      */}
      <div
        ref={sidebarRef}
        className={`sidebar ${isOpen ? "sidebar-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="תפריט ניווט"
        aria-hidden={!isOpen}
        {...(!isOpen && { inert: "" })}
      >
        <div className="sidebar-header">
          <div className="sidebar-title">
            <div className="sidebar-logo" aria-hidden="true">
              C
            </div>
            <span className="sidebar-title-text">Check In</span>
          </div>
          <button
            onClick={onClose}
            className="sidebar-close"
            aria-label="סגירת תפריט"
          >
            <X className="close-icon" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="קישורי ניווט מובייל">
          <div className="sidebar-nav">
            {navigationItems.map((item, index) =>
              isInternalLink(item.href) ? (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className="sidebar-nav-item"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className="sidebar-nav-item"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.name}
                </Link>
              ),
            )}
          </div>
        </nav>

        <div className="sidebar-footer">
          <button
            className="sidebar-signup-button"
            onClick={() => {
              window.open(
                "https://wa.me/972506514500",
                "_blank",
                "noopener,noreferrer",
              );
              onClose();
            }}
            aria-label="פתח שיחת וואטסאפ לתכנון טיול (נפתח בלשונית חדשה)"
          >
            התחילו לתכנן טיול
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
