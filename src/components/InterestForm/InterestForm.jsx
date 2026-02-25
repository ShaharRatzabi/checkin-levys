import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./InterestForm.css";

export default function InterestForm({ onClose }) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    age: "",
    tourismExperience: "",
    teamSalesExperience: "",
    mainOrSideJob: "",
    passion: "",
    privacyPolicyAccepted: false,
  });

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
📩 *פנייה חדשה – הצטרפות לצוות*

👤 *שם מלא:* ${formData.fullName}
📞 *טלפון:* ${formData.phone}
📧 *מייל:* ${formData.email}
🏙️ *עיר מגורים:* ${formData.city}
🎂 *גיל:* ${formData.age}

✈️ *ניסיון בתיירות:*
${formData.tourismExperience || "אין"}

💼 *ניהול צוותים / מכירות:*
${formData.teamSalesExperience || "אין"}

🧑‍💻 *סוג עבודה:*
${formData.mainOrSideJob}

🔥 *תשוקה לעולם התיירות:*
${formData.passion}

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
    <div className="interest-modal">
      {/* ✅ הוסרו interest-overlay וכפתור סגירה כפול — הדיאלוג החיצוני מטפל בזה */}

      {/* ✅ h2 במקום h1 — נכון היררכית */}
      <h2 className="interest-title">הצטרפות לצוות שלנו ✈️</h2>
      <p className="interest-subtitle">בוא להכיר את עולם התיירות מבפנים</p>

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

      {/* ✅ noValidate — validation מטופל ב-JS */}
      <form onSubmit={handleSubmit} noValidate>
        <FormInput
          id="fullName"
          label="שם מלא"
          value={formData.fullName}
          onChange={(v) => handleInputChange("fullName", v)}
          required
          autoComplete="name"
        />
        <FormInput
          id="phone"
          label="טלפון"
          type="tel"
          value={formData.phone}
          onChange={(v) => handleInputChange("phone", v)}
          required
          autoComplete="tel"
          dir="ltr"
        />
        <FormInput
          id="email"
          label="מייל"
          type="email"
          value={formData.email}
          onChange={(v) => handleInputChange("email", v)}
          required
          autoComplete="email"
        />
        <FormInput
          id="city"
          label="עיר מגורים"
          value={formData.city}
          onChange={(v) => handleInputChange("city", v)}
          required
          autoComplete="address-level2"
        />
        <FormInput
          id="age"
          label="גיל"
          type="number"
          value={formData.age}
          onChange={(v) => handleInputChange("age", v)}
          required
          min="18"
          max="120"
        />
        <FormTextarea
          id="tourismExperience"
          label="ניסיון בתיירות"
          value={formData.tourismExperience}
          onChange={(v) => handleInputChange("tourismExperience", v)}
        />
        <FormTextarea
          id="teamSalesExperience"
          label="ניהול צוותים / מכירות?"
          value={formData.teamSalesExperience}
          onChange={(v) => handleInputChange("teamSalesExperience", v)}
        />
        <FormInput
          id="mainOrSideJob"
          label="עבודה עיקרית או השלמת הכנסה?"
          value={formData.mainOrSideJob}
          onChange={(v) => handleInputChange("mainOrSideJob", v)}
          required
        />
        <FormTextarea
          id="passion"
          label="תשוקה לעולם התיירות"
          value={formData.passion}
          onChange={(v) => handleInputChange("passion", v)}
          required
        />

        {/* ✅ checkbox מקושר ל-label + Link אמיתי */}
        <div className="interest-checkbox-group">
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
            אני מאשר למסור את פרטיי בהתאם ל
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
          className="interest-submit-button"
          aria-busy={isSubmitting}
        >
          {isSubmitting ? "פותח WhatsApp..." : "שלח ב-WhatsApp"}
        </button>
      </form>
    </div>
  );
}

/* ✅ קומפוננטות עזר — כל label מקושר ל-input עם htmlFor + id + aria-required */
const FormInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  required,
  ...rest
}) => (
  <div className="interest-form-group">
    <label htmlFor={id}>
      {label}
      {required && (
        <span aria-hidden="true" className="required-star">
          {" "}
          *
        </span>
      )}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      aria-required={required ? "true" : undefined}
      className="interest-input"
      {...rest}
    />
  </div>
);

const FormTextarea = ({ id, label, value, onChange, required }) => (
  <div className="interest-form-group">
    <label htmlFor={id}>
      {label}
      {required && (
        <span aria-hidden="true" className="required-star">
          {" "}
          *
        </span>
      )}
    </label>
    <textarea
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows="4"
      required={required}
      aria-required={required ? "true" : undefined}
      className="interest-textarea"
    />
  </div>
);
