import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import FlightCard from "../FlightCard/FlightCard";
import DealCard from "../DealCard/DealCard.jsx";
import "./FlightCardsShowcase.css";

// ייבוא שירותי Firebase
import { db } from "../../../firebase"; // ודא שהנתיב נכון
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

const FlightCardsShowcase = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeal, setSelectedDeal] = useState(null);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const dealsCollectionRef = collection(db, "deals");
        // Query to get the last 6 deals added
        const dealsQuery = query(
          dealsCollectionRef,
          orderBy("createdAt", "desc"),
          limit(6),
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
    if (selectedDeal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedDeal]);

  const handleCardClick = (deal) => {
    setSelectedDeal(deal);
  };

  const closeCard = () => {
    setSelectedDeal(null);
  };

  if (loading) {
    return <div>טוען הצעות מיוחדות...</div>;
  }

  return (
    <div className="showcase-container">
      <div className="showcase-content">
        <div className="showcase-header">
          <h1 className="showcase-title"> יעדי חלומות</h1>
          <p className="showcase-description">
            גלה הצעות מדהימות ליעדים החביבים עליך. הזמן עכשיו וחסוך בהרפתקה הבאה
            שלך!
          </p>
        </div>

        <Swiper
          modules={[Autoplay]}
          loop={deals.length > 2} // Loop only if there are enough slides
          speed={5000}
          autoplay={{ delay: 4000, disableOnInteraction: true }}
          slidesPerView="auto"
          spaceBetween={30}
          centeredSlides={false}
          allowTouchMove={true}
          grabCursor={true}
        >
          {deals.map((deal) => (
            <SwiperSlide key={deal.id}>
              <div
                onClick={() => handleCardClick(deal)}
                style={{ cursor: "pointer" }}
              >
                <FlightCard
                  destination={deal.title}
                  imageUrl={deal.mainImage}
                  priceFrom={deal.priceFrom}
                  period={deal.datesRange}
                  departureTime={deal.flight?.departure} // יציאה
                  arrivalTime={deal.flight?.return}
                  // You can add other props like discount if they exist in your deal object
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {selectedDeal && <DealCard deal={selectedDeal} onClose={closeCard} />}
    </div>
  );
};

export default FlightCardsShowcase;
