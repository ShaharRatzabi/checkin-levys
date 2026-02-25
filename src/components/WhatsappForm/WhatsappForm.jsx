import React, { useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import "./WhatsappForm.css";

const WhatsappForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    passengerComposition: "",
    childrenDetails: "",
    luggageType: "",
    roomComposition: "",
    accommodationType: "",
    dateFlexibility: "",
    preferredDateRange: "",
    desiredDestination: "",
    additionalDestination: "",
    estimatedBudget: "",
    additionalNotes: "",
    privacyPolicyAccepted: false,
  });

  const [showAdditionalDestination, setShowAdditionalDestination] =
    useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const phoneNumber = "972506514500";

    const message = `
✈️ *פנייה חדשה – תכנון חופשה*

👤 *שם מלא:* ${formData.fullName}
📞 *טלפון:* ${formData.phoneNumber}

👨‍👩‍👧 *הרכב נוסעים:* ${formData.passengerComposition}
👶 *ילדים:* ${formData.childrenDetails || "אין"}

🧳 *כבודה:* ${formData.luggageType}
🏨 *הרכב חדרים:* ${formData.roomComposition}
🍽️ *סוג אירוח:* ${formData.accommodationType}

📅 *טווח תאריכים:* ${formData.preferredDateRange}
🔄 *גמישות:* ${formData.dateFlexibility}

📍 *יעד רצוי:* ${formData.desiredDestination}
📍 *יעד נוסף:* ${formData.additionalDestination || "אין"}

💰 *תקציב משוער:* ${formData.estimatedBudget}

📝 *הערות:* ${formData.additionalNotes || "אין"}

תודה 🙏
    `.trim();

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setIsSubmitting(false);
      onClose();
    }, 500);
  };

  return (
    <div className="whatsapp-modal">
      <h2 className="whatsapp-form-title">תכנון חופשה בהתאמה אישית</h2>
      <p className="whatsapp-form-subtitle">
        מלאו את הפרטים ונחזור אליכם עם הצעה מותאמת
      </p>

      {statusMessage && (
        <div className="status-modal-overlay" aria-hidden="true">
          <div className="status-modal" role="alert" aria-live="assertive">
            <p>{statusMessage}</p>
            <button
              className="status-modal-close"
              onClick={() => setStatusMessage("")}
              aria-label="סגירת הודעה"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <p className="required-note">
        <span aria-hidden="true">*</span> שדות חובה
      </p>

      {/* ✅ noValidate כי אנחנו מטפלים ב-validation בעצמנו */}
      <form onSubmit={handleSubmit} noValidate>
        {/* ✅ כל label מקושר ל-input עם htmlFor + id */}
        <label htmlFor="fullName">
          שם מלא{" "}
          <span aria-hidden="true" className="required-star">
            *
          </span>
        </label>
        <input
          id="fullName"
          type="text"
          className="whatsapp-input"
          value={formData.fullName}
          onChange={(e) => handleInputChange("fullName", e.target.value)}
          required
          aria-required="true"
          autoComplete="name"
        />

        <label htmlFor="phoneNumber">
          טלפון{" "}
          <span aria-hidden="true" className="required-star">
            *
          </span>
        </label>
        <input
          id="phoneNumber"
          type="tel"
          className="whatsapp-input"
          value={formData.phoneNumber}
          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
          required
          aria-required="true"
          autoComplete="tel"
          dir="ltr"
        />

        <label htmlFor="passengerComposition">
          הרכב הנוסעים{" "}
          <span aria-hidden="true" className="required-star">
            *
          </span>
        </label>
        <select
          id="passengerComposition"
          className="whatsapp-select"
          value={formData.passengerComposition}
          onChange={(e) =>
            handleInputChange("passengerComposition", e.target.value)
          }
          required
          aria-required="true"
        >
          <option value="">בחר</option>
          <option value="זוג">זוג</option>
          <option value="משפחה עם ילדים">משפחה עם ילדים</option>
          <option value="קבוצת חברים">קבוצת חברים</option>
          <option value="אחר">אחר</option>
        </select>

        <label htmlFor="childrenDetails">ילדים – כמות וגילאים</label>
        <textarea
          id="childrenDetails"
          rows="2"
          className="whatsapp-textarea"
          value={formData.childrenDetails}
          onChange={(e) => handleInputChange("childrenDetails", e.target.value)}
        />

        <label htmlFor="luggageType">
          כבודה{" "}
          <span aria-hidden="true" className="required-star">
            *
          </span>
        </label>
        <select
          id="luggageType"
          className="whatsapp-select"
          value={formData.luggageType}
          onChange={(e) => handleInputChange("luggageType", e.target.value)}
          required
          aria-required="true"
        >
          <option value="">בחר</option>
          <option value="תיק גב בלבד">תיק גב בלבד</option>
          <option value="טרולי">טרולי</option>
          <option value="מזוודה">מזוודה</option>
          <option value="גם וגם">גם וגם</option>
        </select>

        <label htmlFor="roomComposition">
          הרכב חדרים{" "}
          <span aria-hidden="true" className="required-star">
            *
          </span>
        </label>
        <textarea
          id="roomComposition"
          rows="2"
          className="whatsapp-textarea"
          value={formData.roomComposition}
          onChange={(e) => handleInputChange("roomComposition", e.target.value)}
          required
          aria-required="true"
        />

        <label htmlFor="accommodationType">
          סוג אירוח{" "}
          <span aria-hidden="true" className="required-star">
            *
          </span>
        </label>
        <select
          id="accommodationType"
          className="whatsapp-select"
          value={formData.accommodationType}
          onChange={(e) =>
            handleInputChange("accommodationType", e.target.value)
          }
          required
          aria-required="true"
        >
          <option value="">בחר</option>
          <option value="לינה בלבד">לינה בלבד</option>
          <option value="לינה וארוחת בוקר">לינה וארוחת בוקר</option>
          <option value="חצי פנסיון">חצי פנסיון</option>
          <option value="הכול כלול">הכול כלול</option>
        </select>

        <label htmlFor="preferredDateRange">
          טווח תאריכים{" "}
          <span aria-hidden="true" className="required-star">
            *
          </span>
        </label>
        <input
          id="preferredDateRange"
          type="text"
          className="whatsapp-input"
          value={formData.preferredDateRange}
          onChange={(e) =>
            handleInputChange("preferredDateRange", e.target.value)
          }
          required
          aria-required="true"
          placeholder="לדוגמה: ינואר 2025"
        />

        <label htmlFor="dateFlexibility">
          גמישות{" "}
          <span aria-hidden="true" className="required-star">
            *
          </span>
        </label>
        <select
          id="dateFlexibility"
          className="whatsapp-select"
          value={formData.dateFlexibility}
          onChange={(e) => handleInputChange("dateFlexibility", e.target.value)}
          required
          aria-required="true"
        >
          <option value="">בחר</option>
          <option value="תאריכים מדויקים">תאריכים מדויקים</option>
          <option value="גמיש ביום">גמיש ביום</option>
          <option value="גמיש בשבוע">גמיש בשבוע</option>
        </select>

        <label htmlFor="desiredDestination">
          יעד רצוי{" "}
          <span aria-hidden="true" className="required-star">
            *
          </span>
        </label>
        <input
          id="desiredDestination"
          type="text"
          className="whatsapp-input"
          value={formData.desiredDestination}
          onChange={(e) =>
            handleInputChange("desiredDestination", e.target.value)
          }
          required
          aria-required="true"
        />

        {/* ✅ כפתור toggle עם aria-expanded */}
        <button
          type="button"
          className="whatsapp-input whatsapp-toggle-button"
          onClick={() =>
            setShowAdditionalDestination(!showAdditionalDestination)
          }
          aria-expanded={showAdditionalDestination}
          aria-controls="additionalDestination"
        >
          {showAdditionalDestination ? "הסתר יעד נוסף" : "הוסף יעד נוסף"}
        </button>

        {showAdditionalDestination && (
          <>
            <label htmlFor="additionalDestination">יעד נוסף</label>
            <input
              id="additionalDestination"
              type="text"
              className="whatsapp-input"
              value={formData.additionalDestination}
              onChange={(e) =>
                handleInputChange("additionalDestination", e.target.value)
              }
            />
          </>
        )}

        <label htmlFor="estimatedBudget">
          תקציב{" "}
          <span aria-hidden="true" className="required-star">
            *
          </span>
        </label>
        <select
          id="estimatedBudget"
          className="whatsapp-select"
          value={formData.estimatedBudget}
          onChange={(e) => handleInputChange("estimatedBudget", e.target.value)}
          required
          aria-required="true"
        >
          <option value="">בחר</option>
          <option value="עד 5,000 ₪">עד 5,000 ₪</option>
          <option value="5,000–10,000 ₪">5,000–10,000 ₪</option>
          <option value="10,000–20,000 ₪">10,000–20,000 ₪</option>
          <option value="מעל 20,000 ₪">מעל 20,000 ₪</option>
          <option value="גמיש">גמיש</option>
        </select>

        <label htmlFor="additionalNotes">הערות</label>
        <textarea
          id="additionalNotes"
          rows="4"
          className="whatsapp-textarea"
          value={formData.additionalNotes}
          onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
        />

        {/* ✅ checkbox מקושר ל-label + קישור למדיניות פרטיות */}
        <div className="whatsapp-checkbox-group">
          <input
            id="privacyPolicyAccepted"
            type="checkbox"
            checked={formData.privacyPolicyAccepted}
            onChange={(e) =>
              handleInputChange("privacyPolicyAccepted", e.target.checked)
            }
            required
            aria-required="true"
          />
          <label htmlFor="privacyPolicyAccepted">
            קראתי ואני מאשר את{" "}
            <Link
              to="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              מדיניות הפרטיות
            </Link>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !formData.privacyPolicyAccepted}
          className="whatsapp-submit-button"
          aria-busy={isSubmitting}
        >
          {isSubmitting ? "פותח WhatsApp..." : "שלח ב-WhatsApp"}
        </button>
      </form>
    </div>
  );
};

export default WhatsappForm;
