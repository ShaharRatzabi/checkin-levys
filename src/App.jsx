import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./pages/home/Home/Home.jsx";
import DealsPage from "./pages/DealsPage/DealsPage.jsx";
import ReviewsPage from "./pages/ReviewsPage/ReviewsPage.jsx";
import FaqPage from "./pages/FaqPage/FaqPage.jsx";
import AboutPage from "./pages/AboutPage/AboutPage.jsx";
import VisasPage from "./pages/VisasPage/VisasPage.jsx";
import FloatingBubble from "./components/FloatingBubble.jsx";
import AdminPage from "./pages/AdminPage/AdminPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ScrollToTop from "./components/ScrollToTop";
import AccessibilityPage from "./pages/AcccessibilityPage/AccessibilityPage";
import PrivacyPage from "./pages/PrivacyPage/PrivacyPage.jsx";
import TermsPage from "./pages/TermsPage/TermsPage.jsx";

const authorizedUsers = [
  "shaharatzabi@gmail.com",
  "checkinota24@gmail.com",
  "checkinota25@gmail.com",
  // הוסף כאן אדמינים נוספים במידת הצורך
];
const PAGE_NAMES = {
  "/": "עמוד הבית",
  "/deals": "דילים",
  "/reviews": "ביקורות",
  "/faq": "שאלות ותשובות",
  "/about": "אודות",
  "/visas": "ויזות",
  "/login": "התחברות",
  "/admin": "ניהול",
};

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pageAnnouncement, setPageAnnouncement] = useState("");

  /* 🔐 Auth */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      const authorized =
        !!currentUser &&
        authorizedUsers.includes(currentUser.email?.toLowerCase());

      setIsAuthorized(authorized);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /* 🔁 Redirect */
  useEffect(() => {
    if (isAuthorized && location.pathname === "/login") {
      navigate("/admin");
    }
  }, [isAuthorized, navigate, location]);

  /* 🎯 איפוס פוקוס במעבר עמוד */
  useEffect(() => {
    // ✅ הופך body לניתן לפוקוס זמנית — Tab הבא יתחיל מה-skip link
    document.body.setAttribute("tabindex", "-1");
    document.body.focus();
    document.body.removeAttribute("tabindex");

    // ✅ הכרזה לקורא מסך
    const name = PAGE_NAMES[location.pathname] || "עמוד";
    setPageAnnouncement("");
    const timer = setTimeout(() => {
      setPageAnnouncement(`עברת לעמוד ${name}`);
    }, 50);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  /* 🚫 inert – חסימת פוקוס לרקע כשסיידבר פתוח */
  useEffect(() => {
    const background = document.getElementById("app-background");
    if (!background) return;

    const focusableSelector = "a, button, input, textarea, select, [tabindex]";

    if (isSidebarOpen) {
      background.setAttribute("inert", "");
      background.setAttribute("aria-hidden", "true");
      background.querySelectorAll(focusableSelector).forEach((el) => {
        el.setAttribute(
          "data-prev-tabindex",
          el.getAttribute("tabindex") ?? "",
        );
        el.setAttribute("tabindex", "-1");
      });
    } else {
      background.removeAttribute("inert");
      background.removeAttribute("aria-hidden");
      background.querySelectorAll("[data-prev-tabindex]").forEach((el) => {
        const prev = el.getAttribute("data-prev-tabindex");
        if (prev === "") {
          el.removeAttribute("tabindex");
        } else {
          el.setAttribute("tabindex", prev);
        }
        el.removeAttribute("data-prev-tabindex");
      });
    }

    return () => {
      background.removeAttribute("inert");
      background.removeAttribute("aria-hidden");
    };
  }, [isSidebarOpen]);

  if (loading) {
    return (
      <div role="status" aria-live="polite" aria-label="האתר בטעינה">
        טוען…
      </div>
    );
  }

  return (
    <>
      {/* ✅ הכרזה לקורא מסך — בלתי נראית */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          overflow: "hidden",
          clip: "rect(1px,1px,1px,1px)",
          whiteSpace: "nowrap",
        }}
      >
        {pageAnnouncement}
      </div>

      {/* ✅ skip link — Tab ראשון מציג אותו */}
      <a href="#main-content" className="skip-link">
        דלג לתוכן הראשי
      </a>

      <ScrollToTop />
      <Header onSidebarToggle={setIsSidebarOpen} />

      <main id="main-content" tabIndex="-1" role="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/visas" element={<VisasPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/terms" element={<TermsPage />} />

          <Route path="/accessibility" element={<AccessibilityPage />} />
          <Route path="/privacy-policy" element={<PrivacyPage />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute isAuthorized={isAuthorized}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
      <FloatingBubble />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
