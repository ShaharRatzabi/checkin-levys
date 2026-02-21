import React from "react";

const HamburgerMenu = ({ onClick }) => {
  return (
    <>
      <style>{`
        .hamburger-button {
          padding: 12px;
          border-radius: 16px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.2),
            rgba(255, 255, 255, 0.05)
          );
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .hamburger-button:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
        }

        .hamburger-lines {
          width: 28px;
          height: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .hamburger-line {
          display: block;
          height: 2px;
          background-color: #374151;
          border-radius: 9999px;
          transition: all 0.2s ease;
        }

        .hamburger-button:hover .hamburger-line {
          background-color: #ea580c;
        }
      `}</style>
      <button onClick={onClick} className="hamburger-button">
        <div className="hamburger-lines">
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </div>
      </button>
    </>
  );
};

export default HamburgerMenu;
