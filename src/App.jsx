import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

// Import Firebase services
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

// Import your components and pages
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
import "./App.css";

// --- List of authorized user emails ---
const authorizedUsers = [
  "shaharatzabi@gmail.com", // <-- Replace with your authorized email
  // You can add more emails here
];

// Inner component to access router hooks like useNavigate and useLocation
function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  // Effect to listen for authentication state changes from Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // Check if the logged-in user is in the authorized list
      if (currentUser && authorizedUsers.includes(currentUser.email)) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
      setLoading(false);
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Effect to handle automatic navigation after authorization is confirmed
  useEffect(() => {
    // If the user is authorized AND is currently on the login page, navigate them to the admin page
    if (isAuthorized && location.pathname === "/login") {
      navigate("/admin");
    }
  }, [isAuthorized, navigate, location]);

  // Show a loading indicator while Firebase checks the initial auth state
  if (loading) {
    return <div>טוען...</div>;
  }

  return (
    <>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/visas" element={<VisasPage />} />
        {/* <Route path="/whatsapp-form" element={<ContactFormPage />} /> */}
        {/* Login Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Admin Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute isAuthorized={isAuthorized}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
      <FloatingBubble />
    </>
  );
}

// Main App component now wraps everything in the Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
