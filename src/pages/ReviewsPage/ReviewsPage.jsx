import React, { useEffect, useState } from "react";
import "./ReviewsPage.css";
import ReviewForm from "./ReviewForm";
import ReviewDisplay from "./ReviewDisplay";
import RepeatDealChart from "./RepeatDealChart";
import logoImg from "../../assets/images/logo.png";

import { db } from "../../firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(
          collection(db, "reviews"),
          where("approved", "==", true),
          orderBy("createdAt", "desc"),
        );
        const snapshot = await getDocs(q);
        const fetchedReviews = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          created_date: doc.data().createdAt
            ? doc.data().createdAt.toDate().toISOString()
            : null,
          // ✅ flight_date מועבר כפי שהוא (string YYYY-MM-DD)
          flight_date: doc.data().flight_date || null,
        }));
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="reviews-page">
      <div className="reviews-background" aria-hidden="true">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <main className="reviews-content">
        <div className="form-chart-container">
          <header className="page-header">
            <img src={logoImg} alt="לוגו Check-In" />
          </header>

          <ReviewForm />
          <RepeatDealChart reviews={reviews} />
        </div>

        {loading ? (
          <p role="status" aria-live="polite" style={{ textAlign: "center" }}>
            טוען ביקורות...
          </p>
        ) : (
          <ReviewDisplay reviews={reviews} />
        )}
      </main>
    </div>
  );
}
