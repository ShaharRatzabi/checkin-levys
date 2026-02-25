import React from "react";

const HamburgerMenu = React.forwardRef(
  ({ onClick, isOpen = false, controlsId }, ref) => {
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
            height: 40px;
            width: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          /* ✅ prefers-reduced-motion */
          @media (prefers-reduced-motion: no-preference) {
            .hamburger-button {
              transition: all 0.3s ease;
            }
            .hamburger-line {
              transition: all 0.2s ease;
            }
          }

          .hamburger-button:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
          }

          .hamburger-button:focus-visible {
            outline: 3px solid #000;
            outline-offset: 4px;
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
          }

          .hamburger-button:hover .hamburger-line {
            background-color: #ea580c;
          }

          @media (prefers-reduced-motion: reduce) {
            .hamburger-button:hover { transform: none; }
          }
        `}</style>

        <button
          ref={ref}
          type="button"
          onClick={onClick}
          className="hamburger-button"
          /* ✅ aria-label דינמי — משתנה לפי מצב הסיידבר */
          aria-label={isOpen ? "סגירת תפריט ניווט" : "פתיחת תפריט ניווט"}
          aria-expanded={isOpen}
          aria-controls={controlsId}
        >
          <div className="hamburger-lines" aria-hidden="true">
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </div>
        </button>
      </>
    );
  },
);

HamburgerMenu.displayName = "HamburgerMenu";

export default HamburgerMenu;
