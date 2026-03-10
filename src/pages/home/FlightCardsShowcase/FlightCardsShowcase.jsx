import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y, Keyboard } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/a11y";
import FlightCard from "../FlightCard/FlightCard";
import DealCard from "../DealCard/DealCard.jsx";
import "./FlightCardsShowcase.css";

import { db } from "../../../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const FlightCardsShowcase = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const dealsCollectionRef = collection(db, "deals");
        const dealsQuery = query(
          dealsCollectionRef,
          orderBy("createdAt", "desc"),
        );
        const querySnapshot = await getDocs(dealsQuery);
        const fetchedDeals = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setDeals(fetchedDeals);
      } catch (error) {
        console.error("Error fetching showcase deals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedDeal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedDeal]);

  const handleCardClick = (deal) => setSelectedDeal(deal);
  const closeCard = () => setSelectedDeal(null);

  if (loading) {
    return (
      <div role="status" aria-live="polite" aria-label="טוען הצעות מיוחדות">
        טוען הצעות מיוחדות...
      </div>
    );
  }

  return (
    <section className="showcase-container" aria-label="יעדי חלומות">
      <div className="showcase-content">
        <div className="showcase-header">
          <h2 className="showcase-title">יעדי החלומות שלכם</h2>
          <p className="showcase-description">
            גלה הצעות מדהימות ליעדים החביבים עליך. הזמן עכשיו וחסוך בהרפתקה הבאה
            שלך!
          </p>

          {/* כפתור מעבר לעמוד דילים */}
          <button
            onClick={() => navigate("/deals")}
            aria-label="עבור לעמוד כל הדילים"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              marginTop: "14px",
              padding: "10px 28px",
              borderRadius: "50px",
              border: "none",
              background: "linear-gradient(135deg, #E8692A, #c9521a)",
              color: "#fff",
              fontFamily: "Assistant, sans-serif",
              fontSize: "0.95rem",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 18px rgba(232,105,42,0.45)",
              transition:
                "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.04)";
              e.currentTarget.style.boxShadow =
                "0 8px 28px rgba(232,105,42,0.6)";
              e.currentTarget.style.background =
                "linear-gradient(135deg, #f0773a, #d95e20)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow =
                "0 4px 18px rgba(232,105,42,0.45)";
              e.currentTarget.style.background =
                "linear-gradient(135deg, #E8692A, #c9521a)";
            }}
          >
            לכל הדילים ←
          </button>
        </div>

        <Swiper
          modules={[Autoplay, A11y, Keyboard]}
          loop={false}
          speed={500}
          autoplay={{ delay: 4000, disableOnInteraction: true }}
          slidesPerView="auto"
          spaceBetween={30}
          centeredSlides={false}
          allowTouchMove={true}
          grabCursor={true}
          watchSlidesProgress={true}
          keyboard={{ enabled: true, onlyInViewport: false }}
          a11y={{
            prevSlideMessage: "שקופית קודמת",
            nextSlideMessage: "שקופית הבאה",
          }}
        >
          {deals.map((deal) => (
            <SwiperSlide key={deal.id}>
              <button
                className="deal-card-trigger"
                onClick={() => handleCardClick(deal)}
                aria-label={`פתח פרטים על ${deal.title}`}
                aria-haspopup="dialog"
              >
                <FlightCard
                  destination={deal.title}
                  imageUrl={deal.mainImage}
                  priceFrom={deal.priceFrom}
                  period={deal.datesRange}
                  departureTime={deal.flight?.departure}
                  arrivalTime={deal.flight?.return}
                />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {selectedDeal && <DealCard deal={selectedDeal} onClose={closeCard} />}
    </section>
  );
};

export default FlightCardsShowcase;
