import React, { useState, useEffect, useRef } from "react";

const STORAGE_KEY = "cookie_consent";

/* ─── הגדרות קטגוריות עוגיות ─────────────────────────────────────────── */
const CATEGORIES = [
  {
    id: "necessary",
    label: "הכרחיות",
    description: "עוגיות אלו נחוצות להפעלת האתר ואינן ניתנות לכיבוי.",
    locked: true,
  },
  {
    id: "analytics",
    label: "אנליטיקס",
    description:
      "עוזרות לנו להבין כיצד המבקרים מתנהלים באתר (Google Analytics).",
    locked: false,
  },
  {
    id: "marketing",
    label: "שיווק",
    description: "משמשות להצגת תוכן ומודעות רלוונטיות עבורך.",
    locked: false,
  },
];

/* ─── ברירת מחדל לפני בחירה ─────────────────────────────────────────── */
const DEFAULT_PREFS = { necessary: true, analytics: false, marketing: false };

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);
  const bannerRef = useRef(null);
  const settingsRef = useRef(null);

  /* הצג רק אם אין שמירה */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      // קצת השהייה כדי שהאתר ייטען קודם
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  /* נעל פוקוס לבאנר כשהוא מוצג */
  useEffect(() => {
    if (visible) {
      const el = showSettings ? settingsRef.current : bannerRef.current;
      el?.focus();
    }
  }, [visible, showSettings]);

  const save = (accepted) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accepted));
    setVisible(false);
  };

  const acceptAll = () =>
    save({ necessary: true, analytics: true, marketing: true });

  const rejectAll = () => save(DEFAULT_PREFS);

  const saveCustom = () => save(prefs);

  const toggle = (id) => setPrefs((p) => ({ ...p, [id]: !p[id] }));

  if (!visible) return null;

  return (
    <>
      {/* ═══ Overlay dim ═══ */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
          zIndex: 9998,
          backdropFilter: "blur(2px)",
        }}
        aria-hidden="true"
      />

      {/* ═══ Banner / Settings Panel ═══ */}
      {!showSettings ? (
        /* ── באנר ראשי ── */
        <div
          ref={bannerRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-title"
          dir="rtl"
          style={{
            position: "fixed",
            bottom: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(760px, calc(100vw - 32px))",
            background: "#1a1f2e",
            color: "#f0f0f0",
            borderRadius: "18px",
            padding: "24px 28px",
            zIndex: 9999,
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            fontFamily: "'Assistant', sans-serif",
            outline: "none",
          }}
        >
          {/* שורה עליונה */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "12px",
            }}
          >
            <span style={{ fontSize: "1.4rem" }}>🍪</span>
            <h2
              id="cookie-title"
              style={{
                margin: 0,
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "#fff",
              }}
            >
              האתר משתמש בעוגיות
            </h2>
          </div>

          <p
            style={{
              margin: "0 0 20px",
              fontSize: "0.9rem",
              lineHeight: 1.65,
              color: "#c8cdd8",
            }}
          >
            אנו משתמשים בעוגיות כדי לשפר את חוויית הגלישה שלך, להתאים תוכן
            ופרסומות, ולנתח את התנועה באתר. בהתאם לתיקון 13 לחוק הגנת הפרטיות,
            באפשרותך לבחור אילו עוגיות לאשר.{" "}
            <a
              href="/privacy-policy"
              style={{ color: "#7eb8f7", textDecoration: "underline" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              מדיניות הפרטיות
            </a>
          </p>

          {/* כפתורים */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              justifyContent: "flex-end",
            }}
          >
            <button onClick={() => setShowSettings(true)} style={btnOutline}>
              ⚙ הגדרות
            </button>
            <button onClick={rejectAll} style={btnSecondary}>
              דחה הכל
            </button>
            <button onClick={acceptAll} style={btnPrimary}>
              אישור הכל
            </button>
          </div>
        </div>
      ) : (
        /* ── פאנל הגדרות ── */
        <div
          ref={settingsRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-settings-title"
          dir="rtl"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "min(540px, calc(100vw - 32px))",
            maxHeight: "90vh",
            overflowY: "auto",
            background: "#1a1f2e",
            color: "#f0f0f0",
            borderRadius: "20px",
            padding: "28px 30px",
            zIndex: 9999,
            boxShadow: "0 24px 70px rgba(0,0,0,0.55)",
            fontFamily: "'Assistant', sans-serif",
            outline: "none",
          }}
        >
          <h2
            id="cookie-settings-title"
            style={{
              margin: "0 0 6px",
              fontSize: "1.15rem",
              fontWeight: 800,
              color: "#fff",
            }}
          >
            הגדרות עוגיות
          </h2>
          <p
            style={{
              margin: "0 0 22px",
              fontSize: "0.87rem",
              color: "#9aa3b5",
            }}
          >
            בחר אילו קטגוריות עוגיות ברצונך לאפשר.
          </p>

          {/* קטגוריות */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              marginBottom: "26px",
            }}
          >
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "12px",
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "16px",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      marginBottom: "4px",
                    }}
                  >
                    {cat.label}
                    {cat.locked && (
                      <span
                        style={{
                          marginRight: "8px",
                          fontSize: "0.75rem",
                          color: "#7eb8f7",
                        }}
                      >
                        (תמיד פעיל)
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: "0.82rem",
                      color: "#9aa3b5",
                      lineHeight: 1.5,
                    }}
                  >
                    {cat.description}
                  </div>
                </div>

                {/* Toggle switch */}
                <button
                  role="switch"
                  aria-checked={cat.locked ? true : prefs[cat.id]}
                  aria-label={`${cat.locked ? "תמיד פעיל" : prefs[cat.id] ? "כבה" : "הפעל"} ${cat.label}`}
                  disabled={cat.locked}
                  onClick={() => !cat.locked && toggle(cat.id)}
                  style={{
                    flexShrink: 0,
                    width: "46px",
                    height: "26px",
                    borderRadius: "13px",
                    border: "none",
                    cursor: cat.locked ? "default" : "pointer",
                    background:
                      cat.locked || prefs[cat.id] ? "#4361ee" : "#3a3f52",
                    position: "relative",
                    transition: "background 0.2s",
                    outline: "none",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: "3px",
                      right: cat.locked || prefs[cat.id] ? "3px" : "auto",
                      left: cat.locked || prefs[cat.id] ? "auto" : "3px",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: "#fff",
                      transition: "left 0.2s, right 0.2s",
                    }}
                  />
                </button>
              </div>
            ))}
          </div>

          {/* כפתורי שמירה */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "flex-end",
              flexWrap: "wrap",
            }}
          >
            <button onClick={() => setShowSettings(false)} style={btnOutline}>
              חזרה
            </button>
            <button onClick={acceptAll} style={btnSecondary}>
              אשר הכל
            </button>
            <button onClick={saveCustom} style={btnPrimary}>
              שמור העדפות
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── סגנונות כפתורים ─────────────────────────────────────────────────── */
const base = {
  padding: "10px 22px",
  borderRadius: "50px",
  fontFamily: "'Assistant', sans-serif",
  fontWeight: 700,
  fontSize: "0.9rem",
  cursor: "pointer",
  border: "none",
  transition: "opacity 0.2s, transform 0.15s",
};

const btnPrimary = {
  ...base,
  background: "linear-gradient(135deg, #4361ee, #3a0ca3)",
  color: "#fff",
  boxShadow: "0 4px 16px rgba(67,97,238,0.4)",
};

const btnSecondary = {
  ...base,
  background: "rgba(255,255,255,0.1)",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.15)",
};

const btnOutline = {
  ...base,
  background: "transparent",
  color: "#9aa3b5",
  border: "1px solid rgba(255,255,255,0.15)",
};
