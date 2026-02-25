import React, { useState, useEffect, useRef } from "react";
import { X, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import WhatsappForm from "./WhatsappForm/WhatsappForm";
import InterestForm from "./InterestForm/InterestForm";
import WhatsappFormImg from "./../assets/images/whatsapp-form.png";
import JoiningFormImg from "./../assets/images/joining-form.png";
import LogoImg from "./../assets/images/logo.png";

const FloatingBubble = () => {
  const [activeForm, setActiveForm] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const showBubbleRef = useRef(null); // כפתור פתיחת הבועה
  const hideBubbleRef = useRef(null); // כפתור סגירת הבועה
  const dialogRef = useRef(null); // הדיאלוג עצמו
  const triggerRef = useRef(null); // הכפתור שפתח את הדיאלוג

  const closeDialog = () => {
    setActiveForm(null);
    // החזרת פוקוס לכפתור שפתח את הדיאלוג
    setTimeout(() => triggerRef.current?.focus(), 50);
  };

  const openForm = (formName, buttonRef) => {
    triggerRef.current = buttonRef;
    setActiveForm(formName);
  };

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      if (prev) {
        // נפתח — פוקוס יעבור לכפתור הסגירה
        setTimeout(() => hideBubbleRef.current?.focus(), 50);
      } else {
        // נסגר — פוקוס יחזור לכפתור הפתיחה
        setTimeout(() => showBubbleRef.current?.focus(), 50);
      }
      return !prev;
    });
  };

  /* נעילת גלילה כשדיאלוג פתוח */
  useEffect(() => {
    document.body.style.overflow = activeForm ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeForm]);

  /* ESC לסגירת דיאלוג */
  useEffect(() => {
    if (!activeForm) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeDialog();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeForm]);

  /* פוקוס ל-dialog + focus trap */
  useEffect(() => {
    if (!activeForm || !dialogRef.current) return;

    const focusableElements = dialogRef.current.querySelectorAll(
      'a[href], button:not([disabled]), input, textarea, select, [tabindex="0"]',
    );

    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

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

    dialogRef.current.addEventListener("keydown", handleTab);
    return () => dialogRef.current?.removeEventListener("keydown", handleTab);
  }, [activeForm]);

  return (
    <>
      <style>{`
        .floating-bubble-wrapper {
          position: fixed;
          bottom: 20px;
          left: 20px;
          z-index: 20;
          direction: rtl;
        }

        .light-bubble-container {
          width: 280px;
          background: #ffffff;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          border-radius: 24px;
          border: 2px solid rgba(200, 200, 200, 0.8);
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.2rem;
          padding: 3rem 1.5rem 2rem 1.5rem;
          overflow: hidden;
        }

        .light-bubble-container::before {
          content: "";
          position: absolute;
          inset: 0;
          background: url(${LogoImg}) center/100% no-repeat;
          opacity: 0.5;
          z-index: 0;
        }

        .bubble-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
          width: 100%;
          position: relative;
          z-index: 1;
        }

        .light-bubble-button {
          color: #333;
          background: rgba(255, 255, 255, 0.8);
          border: 2px solid rgba(200, 200, 200, 0.9);
          backdrop-filter: blur(6px);
          border-radius: 14px;
          padding: 0.9rem 1.2rem;
          width: 100%;
          height: 60px;
          font-size: 0.9rem;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .light-bubble-button:hover {
          transform: scale(1.05);
          background: rgba(255, 255, 255, 1);
          border-color: var(--accent);
        }

        .light-bubble-button img {
          width: 60px;
          height: 60px;
          object-fit: contain;
        }

        .hide-bubble-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(255, 255, 255, 0.7);
          border: 2px solid rgba(200, 200, 200, 0.9);
          color: #333;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 2;
        }

        .hide-bubble-btn:hover {
          background: white;
          transform: scale(1.15);
          border-color: var(--accent);
          color: var(--accent);
        }

        .show-bubble-btn {
          width: 70px;
          height: 70px;
          background: var(--accent);
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 8px 30px rgba(255, 123, 84, 0.6);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          color: white;
          padding: 0;
        }

        .show-bubble-btn:hover {
          transform: scale(1.15);
          box-shadow: 0 12px 35px rgba(255, 123, 84, 0.7);
        }

        .phone-icon-wrapper {
          width: 42px;
          height: 42px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dialog-overlay {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(5px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000;
        }

        .dialog {
          background: #ffffff;
          max-height: 90vh;
          overflow-y: auto;
          padding: 0;
          border-radius: 20px;
          max-width: 650px;
          width: 90%;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          position: relative;
          text-align: right;
          direction: rtl;
        }

        .dialog-close {
          position: sticky;
          top: 15px;
          left: 15px;
          float: left;
          width: 32px;
          height: 32px;
          background: #f3f4f6;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #6b7280;
          transition: all 0.3s ease;
          z-index: 10;
          margin: 15px 0 -47px 15px;
        }

        .dialog-close:hover {
          background: var(--accent);
          color: white;
        }

        .floating-bubble-wrapper button:focus-visible,
        .dialog button:focus-visible {
          outline: 3px solid #000;
          outline-offset: 4px;
        }
      `}</style>

      <div className="floating-bubble-wrapper">
        {isCollapsed ? (
          <button
            ref={showBubbleRef}
            className="show-bubble-btn"
            onClick={toggleCollapse}
            aria-label="פתח תפריט צור קשר"
            aria-expanded={false}
          >
            <div className="phone-icon-wrapper" aria-hidden="true">
              <Phone size={28} color="#333" />
            </div>
          </button>
        ) : (
          <div
            className="light-bubble-container"
            role="region"
            aria-label="צור קשר"
          >
            <button
              ref={hideBubbleRef}
              className="hide-bubble-btn"
              onClick={toggleCollapse}
              aria-label="סגור תפריט צור קשר"
              aria-expanded={true}
            >
              <X size={16} aria-hidden="true" />
            </button>

            <div className="bubble-content">
              <button
                className="light-bubble-button"
                onClick={(e) => openForm("whatsapp", e.currentTarget)}
                aria-haspopup="dialog"
              >
                <img src={WhatsappFormImg} alt="" aria-hidden="true" />
                <span>לחופשה בהתאמה אישית</span>
              </button>

              <button
                className="light-bubble-button"
                onClick={(e) => openForm("join", e.currentTarget)}
                aria-haspopup="dialog"
              >
                <img src={JoiningFormImg} alt="" aria-hidden="true" />
                <span>הצטרפו לצוות שלנו</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* דיאלוג WhatsApp */}
      {activeForm === "whatsapp" && (
        <div
          className="dialog-overlay"
          onClick={closeDialog}
          aria-hidden="true"
        >
          <div
            ref={dialogRef}
            className="dialog"
            role="dialog"
            aria-modal="true"
            aria-label="טופס חופשה בהתאמה אישית"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="dialog-close"
              onClick={closeDialog}
              aria-label="סגירת טופס"
            >
              <X size={16} aria-hidden="true" />
            </button>
            <WhatsappForm onClose={closeDialog} />
          </div>
        </div>
      )}

      {/* דיאלוג הצטרפות */}
      {activeForm === "join" && (
        <div
          className="dialog-overlay"
          onClick={closeDialog}
          aria-hidden="true"
        >
          <div
            ref={dialogRef}
            className="dialog"
            role="dialog"
            aria-modal="true"
            aria-label="טופס הצטרפות לצוות"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="dialog-close"
              onClick={closeDialog}
              aria-label="סגירת טופס"
            >
              <X size={16} aria-hidden="true" />
            </button>
            <InterestForm onClose={closeDialog} />
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingBubble;
