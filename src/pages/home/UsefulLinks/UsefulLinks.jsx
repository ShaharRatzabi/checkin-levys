import React from "react";
import { Landmark, ShieldCheck, CreditCard, Wifi } from "lucide-react";

const LINKS_DATA = [
  {
    href: "https://tic.dubai.co.il/?sld=660",
    Icon: Landmark,
    title: "אטרקציות בדובאי",
    desc: "שירות לקוחות בעברית • שת״פ רשמי איתנו",
  },
  {
    href: "https://bit.ly/3VCTp0E",
    Icon: ShieldCheck,
    title: "Trip Guarantee",
    desc: "הגנה מלאה על ההזמנה שלכם",
  },
  {
    href: "https://link.passportcard.co.il/1042089_dlMCtRPT0=",
    Icon: CreditCard,
    title: "PassportCard",
    desc: "ביטוח נסיעות דיגיטלי ומהיר",
  },
  {
    href: "https://did.li/SIM-checkin10",
    Icon: Wifi,
    title: "eSIM לחו״ל",
    desc: "הכי זול והכי קל | קוד: Checkin10",
    highlight: true,
  },
];

export default function UsefulLinks() {
  return (
    <section dir="rtl" aria-label="שירותים משלימים לטיול">
      <style>{`
        /* =====================
           CSS VARIABLES — מתואם לעיצוב האתר
        ===================== */
        .useful-links-section {
          --brand-orange: #e76d2c;
          --brand-orange-light: #fb923c;
          --brand-orange-subtle: rgba(231, 109, 44, 0.08);
          --brand-orange-border: rgba(231, 109, 44, 0.2);
          --text-dark: #1a1a1a;
          --text-muted: #555;
          --glass-bg: rgba(255, 255, 255, 0.25);
          --glass-bg-hover: rgba(255, 255, 255, 0.5);
          --glass-border: rgba(255, 255, 255, 0.3);
          --glass-border-hover: rgba(231, 109, 44, 0.35);

          position: relative;
          width: 100%;
          padding: 80px 20px;
          min-height: 500px;
          overflow: hidden;
          background-image: linear-gradient(to bottom right, #feedd9 70%, #e0956c 100%);
          font-family: "Assistant", sans-serif;
          font-weight: bold;
        }

        /* =====================
           FLOATING BG — זהה לעמוד FAQ
        ===================== */
        .useful-links-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .useful-links-orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(70px);
        }

        @media (prefers-reduced-motion: no-preference) {
          .useful-links-orb {
            animation: ulFloat 6s ease-in-out infinite;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .useful-links-orb,
          .ul-glass-card,
          .ul-card-shine {
            animation: none !important;
            transition: none !important;
          }
          .ul-glass-card:hover {
            transform: none;
          }
        }

        .useful-links-orb:nth-child(1) {
          width: 16rem; height: 16rem;
          top: -5%; right: 8%;
          background-image: linear-gradient(to right, rgba(251, 146, 60, 0.18), rgba(239, 68, 68, 0.12));
        }
        .useful-links-orb:nth-child(2) {
          width: 20rem; height: 20rem;
          bottom: -5%; left: 5%;
          background-image: linear-gradient(to right, rgba(252, 211, 77, 0.15), rgba(244, 114, 182, 0.1));
          animation-delay: -2s;
        }
        .useful-links-orb:nth-child(3) {
          width: 12rem; height: 12rem;
          top: 40%; left: 30%;
          background-image: linear-gradient(to right, rgba(251, 191, 36, 0.12), rgba(251, 146, 60, 0.1));
          animation-delay: -4s;
        }

        @keyframes ulFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-18px) rotate(1deg); }
          66% { transform: translateY(-8px) rotate(-1deg); }
        }

        /* =====================
           CONTENT
        ===================== */
        .useful-links-content {
          position: relative;
          z-index: 10;
          max-width: 960px;
          margin: 0 auto;
        }

        /* =====================
           HEADER
        ===================== */
        .useful-links-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .ul-badge {
          display: inline-block;
          background: var(--brand-orange-subtle);
          color: var(--brand-orange);
          padding: 8px 22px;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 800;
          border: 1px solid var(--brand-orange-border);
          letter-spacing: 0.3px;
        }

        .ul-section-title {
          font-size: 2.25rem;
          font-weight: 700;
          margin-top: 20px;
          background-image: linear-gradient(135deg, #c96027 0%, #bd5924 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* =====================
           CARDS GRID
        ===================== */
        .ul-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        @media (max-width: 680px) {
          .ul-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        /* =====================
           GLASS CARD
        ===================== */
        .ul-glass-card {
          position: relative;
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 22px 20px;
          text-decoration: none;
          border-radius: 24px;
          overflow: hidden;

          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);

          transition: transform 0.4s cubic-bezier(0.2, 1, 0.3, 1),
                      background 0.4s ease,
                      border-color 0.4s ease,
                      box-shadow 0.4s ease;
        }

        .ul-glass-card:hover {
          transform: translateY(-6px);
          background: var(--glass-bg-hover);
          border-color: var(--glass-border-hover);
          box-shadow: 0 20px 40px -10px rgba(231, 109, 44, 0.18);
        }

        /*
         * ✅ focus-visible — נגישות מקלדת (IS 5568 / WCAG 2.4.7)
         */
        .ul-glass-card:focus-visible {
          outline: 3px solid var(--brand-orange);
          outline-offset: 3px;
        }

        /* Highlighted card — eSIM */
        .ul-glass-card.ul-highlighted {
          border-color: var(--brand-orange-border);
          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.35),
            rgba(231, 109, 44, 0.06)
          );
        }

        .ul-glass-card.ul-highlighted:hover {
          border-color: var(--brand-orange);
          box-shadow: 0 20px 40px -10px rgba(231, 109, 44, 0.25);
        }

        /* Shine Effect */
        .ul-card-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            to right,
            transparent,
            rgba(255, 255, 255, 0.25),
            transparent
          );
          transform: skewX(-25deg);
          transition: 0.7s ease;
          pointer-events: none;
        }

        .ul-glass-card:hover .ul-card-shine {
          left: 150%;
        }

        /* =====================
           ICON — Lucide React
        ===================== */
        .ul-icon-wrapper {
          position: relative;
          width: 64px;
          height: 64px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.02);
          color: var(--brand-orange);
        }

        .ul-highlighted .ul-icon-wrapper {
          background: linear-gradient(135deg, #e76d2c, #c55a24);
          border: none;
          box-shadow: 0 6px 20px rgba(231, 109, 44, 0.3);
          color: white;
        }

        /* =====================
           TEXT
        ===================== */
        .ul-card-text h3 {
          margin: 0 0 4px 0;
          font-size: 18px;
          color: var(--text-dark);
          font-weight: 700;
        }

        .ul-card-text p {
          margin: 0;
          font-size: 14px;
          color: var(--text-muted);
          line-height: 1.5;
        }

        /* =====================
           ARROW
        ===================== */
        .ul-arrow {
          margin-right: auto;
          opacity: 0;
          transform: translateX(8px);
          transition: opacity 0.3s ease, transform 0.3s ease;
          color: var(--brand-orange);
          font-size: 18px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .ul-glass-card:hover .ul-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* ✅ הצגת חץ גם ב-focus לנגישות מקלדת */
        .ul-glass-card:focus-visible .ul-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .ul-arrow {
            opacity: 0.6;
            transform: none;
            transition: none;
          }
          .ul-card-shine {
            display: none;
          }
        }
      `}</style>

      <div className="useful-links-section">
        {/* ✅ רקע דקורטיבי — מוסתר מקוראי מסך */}
        <div className="useful-links-bg" aria-hidden="true">
          <div className="useful-links-orb"></div>
          <div className="useful-links-orb"></div>
          <div className="useful-links-orb"></div>
        </div>

        <div className="useful-links-content">
          <div className="useful-links-header">
            <span className="ul-badge">שירותים משלימים</span>
            <h2 className="ul-section-title">כל מה שצריך לטיול המושלם</h2>
          </div>

          <div className="ul-grid" role="list">
            {LINKS_DATA.map((link, index) => (
              <div key={index} role="listitem">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`ul-glass-card ${link.highlight ? "ul-highlighted" : ""}`}
                  aria-label={`${link.title} — ${link.desc} (נפתח בלשונית חדשה)`}
                >
                  {/* ✅ אייקון דקורטיבי — מוסתר מקוראי מסך */}
                  <div className="ul-icon-wrapper" aria-hidden="true">
                    <link.Icon size={26} strokeWidth={1.8} />
                  </div>

                  <div className="ul-card-text">
                    <h3>{link.title}</h3>
                    <p>{link.desc}</p>
                  </div>

                  <span className="ul-arrow" aria-hidden="true">
                    ←
                  </span>
                  <div className="ul-card-shine" aria-hidden="true"></div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
