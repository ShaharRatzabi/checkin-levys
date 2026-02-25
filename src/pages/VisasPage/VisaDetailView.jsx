import React from "react";
import {
  ExternalLink,
  Clock,
  AlertCircle,
  CheckCircle,
  Coins,
} from "lucide-react";

const VisaDetailView = ({ visa }) => {
  return (
    <>
      <style>{`
        .visa-detail-view {
          padding: 1rem;
        }
        .visa-detail-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.25rem;
        }
        .visa-detail-subtitle {
          font-size: 1rem;
          color: #6b7280;
          margin-bottom: 2rem;
        }
        .visa-row-details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .visa-row-detail-item {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 12px;
          padding: 1rem;
          text-align: center;
        }
        .visa-row-detail-icon {
          width: 1.75rem;
          height: 1.75rem;
          color: #ea580c;
          margin: 0 auto 0.5rem;
        }
        .visa-row-detail-label {
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 0.25rem;
        }
        .visa-row-detail-value {
          font-size: 1rem;
          font-weight: 600;
          color: #1f2937;
        }
        .visa-row-requirements-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 1rem;
        }
        .visa-row-requirements-list {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5rem 0;
        }
        .visa-row-requirement {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          font-size: 0.9rem;
          color: #374151;
        }
        .visa-row-requirement-icon {
          width: 1rem;
          height: 1rem;
          color: #f59e0b;
          flex-shrink: 0;
          margin-top: 0.2rem;
        }
        .visa-row-links {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .visa-row-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: linear-gradient(135deg, #ff7b54, #ea580c);
          color: white;
          text-decoration: none;
          border-radius: 12px;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        .visa-row-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 123, 84, 0.4);
        }
        .visa-row-link:focus-visible {
          outline: 3px solid #ea580c;
          outline-offset: 3px;
        }
        @media (prefers-reduced-motion: reduce) {
          .visa-row-link { transition: none; }
          .visa-row-link:hover { transform: none; }
        }
      `}</style>

      <div className="visa-detail-view">
        <h2 className="visa-detail-title">{visa.title}</h2>
        <p className="visa-detail-subtitle">{visa.subtitle}</p>

        {/* ✅ גריד פרטים עם aria-label */}
        <dl className="visa-row-details-grid" aria-label="פרטי הויזה">
          <div className="visa-row-detail-item">
            <Coins className="visa-row-detail-icon" aria-hidden="true" />
            <dt className="visa-row-detail-label">עלות</dt>
            <dd className="visa-row-detail-value">{visa.cost}</dd>
          </div>
          <div className="visa-row-detail-item">
            <CheckCircle className="visa-row-detail-icon" aria-hidden="true" />
            <dt className="visa-row-detail-label">תוקף</dt>
            <dd className="visa-row-detail-value">{visa.validity}</dd>
          </div>
          <div className="visa-row-detail-item">
            <Clock className="visa-row-detail-icon" aria-hidden="true" />
            <dt className="visa-row-detail-label">זמן עיבוד</dt>
            <dd className="visa-row-detail-value">{visa.processingTime}</dd>
          </div>
        </dl>

        <h3 className="visa-row-requirements-title">דרישות חשובות</h3>
        <ul className="visa-row-requirements-list" aria-label="דרישות לכניסה">
          {visa.requirements.map((req, i) => (
            <li key={i} className="visa-row-requirement">
              <AlertCircle
                className="visa-row-requirement-icon"
                aria-hidden="true"
              />
              <span>{req}</span>
            </li>
          ))}
        </ul>

        <div className="visa-row-links">
          {visa.links.map((link, i) => (
            <a
              href={link.url}
              key={i}
              target="_blank"
              rel="noopener noreferrer"
              className="visa-row-link"
              // ✅ הודעה לקורא מסך שנפתח בלשונית חדשה
              aria-label={`${link.name} (נפתח בלשונית חדשה)`}
            >
              <ExternalLink size={16} aria-hidden="true" />
              <span>{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default VisaDetailView;
