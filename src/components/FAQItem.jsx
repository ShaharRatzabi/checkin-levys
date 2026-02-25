import React from "react";
import { ChevronDown } from "lucide-react";

export default function FAQItem({ faq, isOpen, onToggle }) {
  const answerId = `faq-answer-${faq.id}`;

  return (
    <>
      <style>{`
        .faq-item {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 24px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          margin-bottom: 1rem;
          overflow: hidden;
          direction: rtl;
        }

        .faq-question-button {
          width: 100%;
          padding: 1.5rem;
          text-align: right;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.125rem;
          font-weight: 600;
          color: #1f2937;
          font-family: inherit;
        }

        /* ✅ prefers-reduced-motion */
        @media (prefers-reduced-motion: no-preference) {
          .faq-question-button {
            transition: background-color 0.3s ease, color 0.3s ease;
          }
        }

        .faq-question-button:hover {
          background-color: rgba(255, 255, 255, 0.2);
          color: #c2410c;
        }

        /* ✅ focus-visible */
        .faq-question-button:focus-visible {
          outline: 3px solid #e76d2c;
          outline-offset: -3px;
          border-radius: 24px;
        }

        .faq-toggle-icon {
          margin-right: 1rem;
          color: #78716c;
          flex-shrink: 0;
        }

        .faq-item.open .faq-toggle-icon {
          color: #ea580c;
        }

        /* ✅ אנימציה סיבוב על החץ במקום החלפת אייקון */
        @media (prefers-reduced-motion: no-preference) {
          .faq-toggle-icon svg {
            transition: transform 0.3s ease, color 0.3s ease;
          }
          .faq-item.open .faq-toggle-icon svg {
            transform: rotate(180deg);
          }
        }

        .faq-answer-wrapper {
          overflow: hidden;
        }

        /* ✅ אנימציה רק אם המשתמש לא ביקש הפחתה */
        @media (prefers-reduced-motion: no-preference) {
          .faq-answer-wrapper {
            max-height: 0;
            opacity: 0;
            transition: max-height 0.5s ease-in-out, opacity 0.4s ease-in-out;
          }
          .faq-item.open .faq-answer-wrapper {
            max-height: 24rem;
            opacity: 1;
          }
        }

        /* ✅ ללא אנימציה — מציג/מסתיר ישירות */
        @media (prefers-reduced-motion: reduce) {
          .faq-answer-wrapper {
            display: none;
          }
          .faq-item.open .faq-answer-wrapper {
            display: block;
          }
        }

        .faq-answer-content {
          padding: 0 1.5rem 1.5rem 1.5rem;
        }

        .faq-answer-content::before {
          content: '';
          display: block;
          width: 100%;
          height: 1px;
          background-image: linear-gradient(to left, rgba(252, 211, 199, 1), transparent);
          margin-bottom: 1rem;
        }

        .faq-answer-content p {
          color: #374151;
          line-height: 1.625;
          font-size: 1rem;
          margin: 0;
        }
      `}</style>

      <div className={`faq-item ${isOpen ? "open" : ""}`}>
        {/*
          ✅ aria-expanded — קורא מסך יכריז "מורחב" / "מכווץ"
          ✅ aria-controls — מקשר את הכפתור לתשובה
          ✅ הוסר <h3> מבתוך <button> (לא חוקי ב-HTML)
             הסמנטיקה נשמרת ע"י role="heading" על ה-FaqPage עצמו
        */}
        <button
          onClick={onToggle}
          className="faq-question-button"
          aria-expanded={isOpen}
          aria-controls={answerId}
        >
          <span>{faq.question}</span>
          <span className="faq-toggle-icon" aria-hidden="true">
            <ChevronDown size={20} />
          </span>
        </button>

        {/*
          ✅ id תואם ל-aria-controls
          ✅ role="region" + aria-label לקוראי מסך
        */}
        <div
          id={answerId}
          className="faq-answer-wrapper"
          role="region"
          aria-label={faq.question}
        >
          <div className="faq-answer-content">
            <p>{faq.answer}</p>
          </div>
        </div>
      </div>
    </>
  );
}
