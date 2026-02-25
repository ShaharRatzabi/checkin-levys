import React from "react";
import {
  ChevronLeft,
  DollarSign,
  CheckCircle,
  PoundSterling,
} from "lucide-react";

const VisaListItem = ({ visa, onDiscoverMore }) => {
  const getCostIcon = () => {
    if (!visa?.cost)
      return <DollarSign size={16} className="icon" aria-hidden="true" />;

    if (visa.country === "בריטניה") {
      return <PoundSterling size={16} className="icon" aria-hidden="true" />;
    }

    if (visa.cost.includes("חינם") || visa.cost.includes("חינמי")) {
      return (
        <span
          aria-hidden="true"
          style={{
            position: "relative",
            width: 18,
            height: 18,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DollarSign size={16} className="icon" />
          <span
            style={{
              position: "absolute",
              width: "20px",
              height: "2px",
              backgroundColor: "#dc2626",
              transform: "rotate(-45deg)",
              borderRadius: "2px",
            }}
          />
        </span>
      );
    }

    return <DollarSign size={16} className="icon" aria-hidden="true" />;
  };

  return (
    <>
      <style>{`
        .visa-list-item {
          background-color: #ffffff71;
          border-radius: 1.25rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          cursor: pointer;
          border: 1px solid #eee;
          display: flex;
          overflow: hidden;
          min-height: 220px;
          width: 100%;
          text-align: inherit;
          font-family: inherit;
          transition: all 0.3s ease;
        }

        .visa-list-item:hover,
        .visa-list-item:focus-visible {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          border-color: #ea580c;
        }

        .visa-list-item:focus-visible {
          outline: 3px solid #ea580c;
          outline-offset: 3px;
        }

        @media (prefers-reduced-motion: reduce) {
          .visa-list-item {
            transition: none;
          }
          .visa-list-item:hover,
          .visa-list-item:focus-visible {
            transform: none;
          }
        }

        .visa-item-image {
          width: 45%;
          object-fit: cover;
          background: #f9fafb;
        }

        .visa-item-content {
          flex: 1;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .visa-item-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .visa-item-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1f2937;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0;
        }

        .visa-item-flag {
          width: 28px;
          height: 20px;
          border-radius: 3px;
          object-fit: cover;
          border: 1px solid #ddd;
        }

        .visa-item-subtitle {
          font-size: 0.95rem;
          color: #6b7280;
          margin: 0 0 1rem 0;
        }

        .visa-item-details {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1rem;
          border-top: 1px solid #f3f4f6;
          padding-top: 0.75rem;
        }

        .visa-detail-point {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #4b5563;
        }

        .visa-detail-point .icon {
          color: #f97316;
        }

        .visa-item-discover {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #ea580c;
          font-weight: 600;
          font-size: 0.9rem;
          margin-top: auto;
        }

        .visa-list-item:hover .visa-item-discover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .visa-item-details { display: none; }
          .visa-item-image { object-fit: cover; width: 55%; order: -1; }
          .visa-item-content { padding: 1.25rem; }
          .visa-item-title { font-size: 1.1rem; }
          .visa-item-subtitle { font-size: 0.9rem; }
        }
      `}</style>

      {/* ✅ button במקום div לחיץ */}
      <button
        className="visa-list-item"
        onClick={onDiscoverMore}
        aria-label={`פתח פרטים על ${visa.country}: ${visa.title}`}
        aria-haspopup="dialog"
      >
        <div className="visa-item-content">
          <div>
            <div className="visa-item-header">
              {/* ✅ h3 במקום h5 */}
              <h3 className="visa-item-title">
                {visa.country}: {visa.title}
              </h3>
              {/* ✅ דגל דקורטיבי — המדינה כבר מוזכרת בכותרת */}
              <img
                src={visa.flag}
                alt=""
                aria-hidden="true"
                className="visa-item-flag"
              />
            </div>

            <p className="visa-item-subtitle">{visa.subtitle}</p>

            <div className="visa-item-details" aria-hidden="true">
              <div className="visa-detail-point">
                {getCostIcon()}
                <span>{visa.cost.split("|")[0].trim()}</span>
              </div>
              <div className="visa-detail-point">
                <CheckCircle size={16} className="icon" aria-hidden="true" />
                <span>{visa.validity.split("|")[0].trim()}</span>
              </div>
            </div>
          </div>

          <div className="visa-item-discover" aria-hidden="true">
            <span>פרטים נוספים</span>
            <ChevronLeft size={20} />
          </div>
        </div>

        <img
          src={visa.image}
          alt=""
          aria-hidden="true"
          className="visa-item-image"
        />
      </button>
    </>
  );
};

export default VisaListItem;
