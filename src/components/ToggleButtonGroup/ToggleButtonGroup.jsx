// ToggleButtonGroup.jsx
import { CheckCircle, XCircle } from "lucide-react";
import "./ToggleButtonGroup.css";

export default function ToggleButtonGroup({ value, onChange }) {
  return (
    /*
      ✅ role="group" מקבץ את הכפתורים יחד לקורא מסך
    */
    <div className="toggle-button-group" role="group">
      <button
        className={`toggle-btn ${value === "yes" ? "active-yes" : ""}`}
        onClick={() => onChange("yes")}
        type="button"
        /* ✅ aria-pressed — קורא מסך יכריז "כן, לחוץ" / "כן, לא לחוץ" */
        aria-pressed={value === "yes"}
      >
        {/* ✅ aria-hidden על האייקון — הטקסט "כן" מספיק */}
        <CheckCircle className="icon" aria-hidden="true" />
        <span>כן</span>
        {/* ✅ טקסט נסתר לקוראי מסך במצב נבחר — לא מסתמכים רק על צבע */}
        {value === "yes" && <span className="sr-only">(נבחר)</span>}
      </button>

      <button
        className={`toggle-btn ${value === "no" ? "active-no" : ""}`}
        onClick={() => onChange("no")}
        type="button"
        aria-pressed={value === "no"}
      >
        <XCircle className="icon" aria-hidden="true" />
        <span>לא</span>
        {value === "no" && <span className="sr-only">(נבחר)</span>}
      </button>
    </div>
  );
}
