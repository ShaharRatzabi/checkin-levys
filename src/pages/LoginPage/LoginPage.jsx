import React from "react";
import { auth } from "../../firebase"; // Adjust the path if needed
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const LoginPage = () => {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // After successful login, the logic in App.jsx will handle the redirection.
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  // --- Styles ---
  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "Assistant, sans-serif",
  };

  const buttonStyle = {
    padding: "12px 24px",
    fontSize: "1.1rem",
    cursor: "pointer",
    borderRadius: "50px",
    border: "1px solid #ccc",
    background: "white",
    color: "#333",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };
  // --- End of Styles ---

  return (
    <div style={pageStyle}>
      <h1>כניסה למערכת הניהול</h1>
      <button onClick={handleGoogleLogin} style={buttonStyle}>
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google icon"
          width="20"
        />
        התחבר עם חשבון גוגל
      </button>
    </div>
  );
};

export default LoginPage;
