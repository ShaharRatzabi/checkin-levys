// ToggleButtonGroup.jsx
import { CheckCircle, XCircle } from "lucide-react";
import "./ToggleButtonGroup.css";

export default function ToggleButtonGroup({ value, onChange }) {
  return (
    <div className="toggle-button-group">
      <button
        className={`toggle-btn ${value === "yes" ? "active-yes" : ""}`}
        onClick={() => onChange("yes")}
        type="button"
      >
        <span>כן</span>
        <CheckCircle className="icon" />
      </button>
      <button
        className={`toggle-btn ${value === "no" ? "active-no" : ""}`}
        onClick={() => onChange("no")}
        type="button"
      >
        <XCircle className="icon" />
        <span>לא</span>
      </button>
    </div>
  );
}
