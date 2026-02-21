import React, { useState } from "react";
import { X } from "lucide-react";
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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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
📍 *יעד נוסף:* ${
      formData.additionalDestination ? formData.additionalDestination : "אין"
    }

💰 *תקציב משוער:* ${formData.estimatedBudget}

📝 *הערות:* ${formData.additionalNotes || "אין"}

תודה 🙏
`.trim();

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setIsSubmitting(false);
      onClose();
    }, 500);
  };

  return (
    <div className="whatsapp-overlay" onClick={onClose}>
      <div className="whatsapp-modal" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="whatsapp-close-button">
          <X />
        </button>

        <h1 className="whatsapp-form-title">צ'אט WhatsApp - תכנון חופשה</h1>
        <p className="whatsapp-form-subtitle">
          מלאו את הפרטים ונחזור אליכם עם הצעה מותאמת
        </p>

        <form onSubmit={handleSubmit}>
          <label>שם מלא *</label>
          <input
            type="text"
            className="whatsapp-input"
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            required
          />

          <label>טלפון *</label>
          <input
            type="tel"
            className="whatsapp-input"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            required
          />

          <label>הרכב הנוסעים *</label>
          <select
            className="whatsapp-select"
            value={formData.passengerComposition}
            onChange={(e) =>
              handleInputChange("passengerComposition", e.target.value)
            }
            required
          >
            <option value="">בחר</option>
            <option value="זוג">זוג</option>
            <option value="משפחה עם ילדים">משפחה עם ילדים</option>
            <option value="קבוצת חברים">קבוצת חברים</option>
            <option value="אחר">אחר</option>
          </select>

          <label>ילדים – כמות וגילאים</label>
          <textarea
            rows="2"
            className="whatsapp-textarea"
            value={formData.childrenDetails}
            onChange={(e) =>
              handleInputChange("childrenDetails", e.target.value)
            }
          />

          <label>כבודה *</label>
          <select
            className="whatsapp-select"
            value={formData.luggageType}
            onChange={(e) => handleInputChange("luggageType", e.target.value)}
            required
          >
            <option value="">בחר</option>
            <option value="תיק גב בלבד">תיק גב בלבד</option>
            <option value="טרולי">טרולי</option>
            <option value="מזוודה">מזוודה</option>
            <option value="גם וגם">גם וגם</option>
          </select>

          <label>הרכב חדרים *</label>
          <textarea
            rows="2"
            className="whatsapp-textarea"
            value={formData.roomComposition}
            onChange={(e) =>
              handleInputChange("roomComposition", e.target.value)
            }
            required
          />

          <label>סוג אירוח *</label>
          <select
            className="whatsapp-select"
            value={formData.accommodationType}
            onChange={(e) =>
              handleInputChange("accommodationType", e.target.value)
            }
            required
          >
            <option value="">בחר</option>
            <option value="לינה בלבד">לינה בלבד</option>
            <option value="לינה וארוחת בוקר">לינה וארוחת בוקר</option>
            <option value="חצי פנסיון">חצי פנסיון</option>
            <option value="הכול כלול">הכול כלול</option>
          </select>

          <label>טווח תאריכים *</label>
          <input
            type="text"
            className="whatsapp-input"
            value={formData.preferredDateRange}
            onChange={(e) =>
              handleInputChange("preferredDateRange", e.target.value)
            }
            required
          />

          <label>גמישות *</label>
          <select
            className="whatsapp-select"
            value={formData.dateFlexibility}
            onChange={(e) =>
              handleInputChange("dateFlexibility", e.target.value)
            }
            required
          >
            <option value="">בחר</option>
            <option value="תאריכים מדויקים">תאריכים מדויקים</option>
            <option value="גמיש ביום">גמיש ביום</option>
            <option value="גמיש בשבוע">גמיש בשבוע</option>
          </select>

          <label>יעד רצוי *</label>
          <input
            type="text"
            className="whatsapp-input"
            value={formData.desiredDestination}
            onChange={(e) =>
              handleInputChange("desiredDestination", e.target.value)
            }
            required
          />

          <button
            type="button"
            className="whatsapp-input whatsapp-toggle-button"
            onClick={() =>
              setShowAdditionalDestination(!showAdditionalDestination)
            }
          >
            {showAdditionalDestination ? "הסתר יעד נוסף" : "הוסף יעד נוסף"}
          </button>

          {showAdditionalDestination && (
            <input
              type="text"
              className="whatsapp-input"
              value={formData.additionalDestination}
              onChange={(e) =>
                handleInputChange("additionalDestination", e.target.value)
              }
            />
          )}

          <label>תקציב *</label>
          <select
            className="whatsapp-select"
            value={formData.estimatedBudget}
            onChange={(e) =>
              handleInputChange("estimatedBudget", e.target.value)
            }
            required
          >
            <option value="">בחר</option>
            <option value="עד 5,000 ₪">עד 5,000 ₪</option>
            <option value="5,000–10,000 ₪">5,000–10,000 ₪</option>
            <option value="10,000–20,000 ₪">10,000–20,000 ₪</option>
            <option value="מעל 20,000 ₪">מעל 20,000 ₪</option>
            <option value="גמיש">גמיש</option>
          </select>

          <label>הערות</label>
          <textarea
            rows="4"
            className="whatsapp-textarea"
            value={formData.additionalNotes}
            onChange={(e) =>
              handleInputChange("additionalNotes", e.target.value)
            }
          />

          <div className="whatsapp-checkbox-group">
            <input
              type="checkbox"
              checked={formData.privacyPolicyAccepted}
              onChange={(e) =>
                handleInputChange("privacyPolicyAccepted", e.target.checked)
              }
              required
            />
            <label>אני מאשר מדיניות פרטיות</label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !formData.privacyPolicyAccepted}
            className="whatsapp-submit-button"
          >
            {isSubmitting ? "פותח WhatsApp..." : "שלח ב-WhatsApp"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WhatsappForm;
