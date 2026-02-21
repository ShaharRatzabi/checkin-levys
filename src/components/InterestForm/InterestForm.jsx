import React, { useState } from "react";
import { X } from "lucide-react";
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
    <div className="interest-overlay" onClick={onClose}>
      <div className="interest-modal" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="interest-close-button">
          <X size={20} color="rgba(71, 13, 13, 0.6)" />
        </button>

        <h1 className="interest-title">הצטרפות לצוות שלנו ✈️</h1>
        <p className="interest-subtitle">בוא להכיר את עולם התיירות מבפנים</p>

        <form onSubmit={handleSubmit}>
          <Input
            label="שם מלא *"
            value={formData.fullName}
            onChange={(v) => handleInputChange("fullName", v)}
            required
          />
          <Input
            label="טלפון *"
            value={formData.phone}
            onChange={(v) => handleInputChange("phone", v)}
            required
          />
          <Input
            label="מייל *"
            type="email"
            value={formData.email}
            onChange={(v) => handleInputChange("email", v)}
            required
          />
          <Input
            label="עיר מגורים *"
            value={formData.city}
            onChange={(v) => handleInputChange("city", v)}
            required
          />
          <Input
            label="גיל *"
            type="number"
            value={formData.age}
            onChange={(v) => handleInputChange("age", v)}
            required
          />

          <Textarea
            label="ניסיון בתיירות"
            value={formData.tourismExperience}
            onChange={(v) => handleInputChange("tourismExperience", v)}
          />
          <Textarea
            label="ניהול צוותים / מכירות?"
            value={formData.teamSalesExperience}
            onChange={(v) => handleInputChange("teamSalesExperience", v)}
          />

          <Input
            label="עבודה עיקרית או השלמת הכנסה? *"
            value={formData.mainOrSideJob}
            onChange={(v) => handleInputChange("mainOrSideJob", v)}
            required
          />

          <Textarea
            label="תשוקה לעולם התיירות *"
            value={formData.passion}
            onChange={(v) => handleInputChange("passion", v)}
            required
          />

          <div className="interest-checkbox-group">
            <input
              type="checkbox"
              checked={formData.privacyPolicyAccepted}
              onChange={(e) =>
                handleInputChange("privacyPolicyAccepted", e.target.checked)
              }
              required
            />
            <label>
              אני מאשר למסור את פרטיי בהתאם ל
              <a href="/privacy-policy" target="_blank" rel="noreferrer">
                מדיניות הפרטיות
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !formData.privacyPolicyAccepted}
            className="interest-submit-button"
          >
            {isSubmitting ? "פותח WhatsApp..." : "שלח ב-WhatsApp"}
          </button>
        </form>
      </div>
    </div>
  );
}

const Input = ({ label, type = "text", value, onChange, required }) => (
  <div className="interest-form-group">
    <label style={{ fontWeight: 600, marginBottom: 8 }}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="interest-input"
    />
  </div>
);

const Textarea = ({ label, value, onChange, required }) => (
  <div className="interest-form-group">
    <label style={{ fontWeight: 600, marginBottom: 8 }}>{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows="4"
      required={required}
      className="interest-textarea"
    />
  </div>
);
