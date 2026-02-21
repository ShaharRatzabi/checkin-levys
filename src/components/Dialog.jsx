import React from "react";
import { X } from "lucide-react";

const Dialog = ({ isOpen, onClose, title, imageUrl, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <style>{`
        .dialog-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
      
          overflow-y: auto; /* מאפשר גלילה אם הכרטיס גבוה מדי */
        }

        .dialog-container {
          direction: rtl;
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.24));
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 24px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          max-width: 700px;
          width: 100%;
          padding: 2rem;
          position: relative;
          animation: zoomIn 0.3s ease-out;
          height: auto;
          margin: 3rem;
        }
        
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .dialog-close-button {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(0, 0, 0, 0.05);
          border-radius: 9999px;
          width: 2.5rem;
          height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: 1px solid rgba(0, 0, 0, 0.1);
          transition: background-color 0.2s ease, transform 0.2s ease;
        }
        
        .dialog-close-button:hover {
            background-color: rgba(0, 0, 0, 0.1);
            transform: rotate(90deg);
        }

        .dialog-title {
          font-size: 2.25rem;
          font-weight: 700;
          margin: 0 !important;
          background-image: linear-gradient(135deg, #e76d2c 0%, #ff7d41ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

   .dialog-content {
  font-weight: bold;
  font-size: 1.125rem;
  color: #374151;
  line-height: 1.75;
  margin-bottom: 2rem;

  max-height: 70vh;
  overflow-y: auto;
  padding-right: 0.5rem;
}


        .dialog-image-wrapper {
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
          max-height: 90vh;
        }
        
        .dialog-image {
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: center;
        }

        /* למסכים קטנים */
        @media (max-width: 768px) {
          .dialog-overlay {
            align-items: flex-start; /* מיושר למעלה במסכים קטנים */
          }

          .dialog-container {
            padding: 1rem;
            }

          .dialog-title {
            font-size: 1.5rem;
          }

          .dialog-content {
            font-size: 1rem;
          }

          .dialog-image-wrapper {
            aspect-ratio: auto;
            max-height: 40vh;
          }
        }
      `}</style>
      <div className="dialog-overlay" onClick={onClose}>
        <div className="dialog-container" onClick={(e) => e.stopPropagation()}>
          <button onClick={onClose} className="dialog-close-button">
            <X size={24} color="#374151" />
          </button>

          <h2 className="dialog-title">{title}</h2>

          <div className="dialog-content">{children}</div>

          {imageUrl && (
            <div className="dialog-image-wrapper">
              <img
                src={imageUrl}
                alt={title || "Dialog Image"}
                className="dialog-image"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dialog;
