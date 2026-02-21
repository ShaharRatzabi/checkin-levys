import React, { useState, useEffect } from "react";
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

  const closeDialog = () => setActiveForm(null);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  useEffect(() => {
    document.body.style.overflow = activeForm ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
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
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
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

        /* הלוגו ברקע */
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

        /* כפתור עגול כשסגור */
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

        /* עיגול לבן בפנים לאייקון */
        .phone-icon-wrapper {
          width: 42px;
          height: 42px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Dialog */
        .dialog-overlay {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          background: rgba(0, 0, 0, 0.5); backdrop-filter: blur(5px);
          display: flex; justify-content: center; align-items: center;
          z-index: 2000;
        }
        .dialog {
          background: white; max-height: 90vh; overflow-y: auto; padding: 24px;
          border-radius: 20px; max-width: 650px; width: 90%;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3); position: relative;
          text-align: right; direction: rtl;
        }
        .dialog-close {
          position: absolute; top: 15px; left: 15px; width: 32px; height: 32px;
          background: #f3f4f6; border: none; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; cursor: pointer;
          color: #6b7280; transition: all 0.3s ease;
        }
        .dialog-close:hover { background: var(--accent); color: white; }

        /* במסכים קטנים נסגר אוטומטית */
    
      `}</style>

      <div className="floating-bubble-wrapper">
        {isCollapsed ? (
          <button
            className="show-bubble-btn"
            onClick={toggleCollapse}
            aria-label="הצג צ'אט"
          >
            <div className="phone-icon-wrapper">
              <Phone size={28} color="#333" />
            </div>
          </button>
        ) : (
          <div className="light-bubble-container">
            <button
              className="hide-bubble-btn"
              onClick={toggleCollapse}
              aria-label="הסתר צ'אט"
            >
              <X size={16} />
            </button>
            <div className="bubble-content">
              <button
                className="light-bubble-button"
                onClick={() => setActiveForm("whatsapp")}
              >
                <img src={WhatsappFormImg} alt="WhatsApp form" />
                <span> לחופשה בהתאמה אישית</span>
              </button>

              <button
                className="light-bubble-button"
                onClick={() => setActiveForm("join")}
              >
                <img src={JoiningFormImg} alt="Join form" />
                <span>הצטרפו לצוות שלנו</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {activeForm === "whatsapp" && (
        <div className="dialog-overlay" onClick={closeDialog}>
          <div className="dialog" onClick={(e) => e.stopPropagation()}>
            <button className="dialog-close" onClick={closeDialog}>
              <X size={16} />
            </button>
            <WhatsappForm onClose={closeDialog} />
          </div>
        </div>
      )}

      {activeForm === "join" && (
        <div className="dialog-overlay" onClick={closeDialog}>
          <div className="dialog" onClick={(e) => e.stopPropagation()}>
            <button className="dialog-close" onClick={closeDialog}>
              <X size={16} />
            </button>
            <InterestForm onClose={closeDialog} />
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingBubble;
