import React, { useState } from "react";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const LoginPage = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setError(null);
    setIsLoading(true);
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Google login failed:", err);
      setError("ההתחברות נכשלה. אנא נסה שנית.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .login-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          font-family: "Assistant", sans-serif;
          direction: rtl;
          background-image: linear-gradient(to bottom right, #fff7ed 70%, #e76d2c 100%);
        }

        .login-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }

        .login-error {
          color: #c0392b;
          font-weight: 600;
          margin-bottom: 12px;
          border: 1px solid #c0392b;
          border-radius: 8px;
          padding: 10px 16px;
          background: #fdecea;
        }

        .google-login-btn {
          padding: 12px 24px;
          font-size: 1.1rem;
          cursor: pointer;
          border-radius: 50px;
          border: 1px solid #ccc;
          background: white;
          color: #333;
          font-weight: 600;
          font-family: "Assistant", sans-serif;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 16px;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }

        .google-login-btn:hover:not(:disabled) {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transform: translateY(-1px);
        }

        /* ✅ focus-visible נגיש */
        .google-login-btn:focus-visible {
          outline: 3px solid #4a00e0;
          outline-offset: 3px;
        }

        .google-login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (prefers-reduced-motion: reduce) {
          .google-login-btn { transition: none; }
          .google-login-btn:hover { transform: none; }
        }
      `}</style>

      <main className="login-page">
        {/* ✅ aria-live לשגיאות */}
        <div aria-live="polite" aria-atomic="true">
          {error && (
            <p role="alert" className="login-error">
              {error}
            </p>
          )}
        </div>

        <h1 className="login-title">כניסה למערכת הניהול</h1>

        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          aria-disabled={isLoading}
          aria-busy={isLoading}
          className="google-login-btn"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt=""
            aria-hidden="true"
            width="20"
            height="20"
          />
          {isLoading ? "מתחבר..." : "התחבר עם חשבון גוגל"}
        </button>
      </main>
    </>
  );
};

export default LoginPage;
