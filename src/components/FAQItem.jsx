import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQItem({ faq, isOpen, onToggle }) {
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
          transition: background-color 0.3s ease;
        }
        
        .faq-question-button:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
        
        .faq-question-text {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1f2937;
          transition: color 0.3s ease;
        }
        
        .faq-question-button:hover .faq-question-text {
          color: #c2410c; /* orange-700 */
        }
        
        .faq-toggle-icon {
          margin-right: 1rem;
          transition: transform 0.3s ease;
          color: #78716c; /* gray-500 */
        }
        
        .faq-item.open .faq-toggle-icon {
          color: #ea580c; /* orange-600 */
        }
        
        .faq-answer-wrapper {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.5s ease-in-out, opacity 0.5s ease-in-out;
        }
        
        .faq-item.open .faq-answer-wrapper {
          max-height: 24rem;
          opacity: 1;
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
        }
      `}</style>
      <div className={`faq-item ${isOpen ? "open" : ""}`}>
        <button onClick={onToggle} className="faq-question-button">
          <h3 className="faq-question-text">{faq.question}</h3>
          <div className="faq-toggle-icon">
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </div>
        </button>
        <div className="faq-answer-wrapper">
          <div className="faq-answer-content">
            <p>{faq.answer}</p>
          </div>
        </div>
      </div>
    </>
  );
}
