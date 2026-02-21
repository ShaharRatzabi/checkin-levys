import React, { useEffect, useState } from "react";
import "./ReviewsPage.css";
import ReviewForm from "./ReviewForm";
import ReviewDisplay from "./ReviewDisplay";
import RepeatDealChart from "./RepeatDealChart";
import logoImg from "../../assets/images/logo.png";

// Firebase
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
          where("approved", "==", true), // 🔑 רק מאושרות
          orderBy("createdAt", "desc"),
        );

        const snapshot = await getDocs(q);

        const fetchedReviews = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          created_date: doc.data().createdAt
            ? doc.data().createdAt.toDate().toISOString()
            : null,
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
      {/* רקע */}
      <div className="reviews-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="reviews-content">
        <div className="form-chart-container">
          <div className="page-header">
            <img src={logoImg} alt="logo image" />
          </div>

          {/* 📝 טופס ביקורת – שומר ישירות ל-Firebase */}
          <ReviewForm />

          {/* 📊 גרף – מקבל דאטה אמיתי */}
          <RepeatDealChart reviews={reviews} />
        </div>

        {/* ⭐ תצוגת ביקורות */}
        {loading ? (
          <p style={{ textAlign: "center" }}>טוען ביקורות...</p>
        ) : (
          <ReviewDisplay reviews={reviews} />
        )}
      </div>
    </div>
  );
}
