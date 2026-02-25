import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/a11y";
import FlightCard from "../FlightCard/FlightCard";
import DealCard from "../DealCard/DealCard.jsx";
import "./FlightCardsShowcase.css";

import { db } from "../../../firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

const FlightCardsShowcase = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeal, setSelectedDeal] = useState(null);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const dealsCollectionRef = collection(db, "deals");
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
    document.body.style.overflow = selectedDeal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedDeal]);

  const handleCardClick = (deal) => setSelectedDeal(deal);
  const closeCard = () => setSelectedDeal(null);

  // ✅ מצב טעינה נגיש
  if (loading) {
    return (
      <div role="status" aria-live="polite" aria-label="טוען הצעות מיוחדות">
        טוען הצעות מיוחדות...
      </div>
    );
  }

  return (
    // ✅ section במקום div + aria-label
    <section className="showcase-container" aria-label="יעדי חלומות">
      <div className="showcase-content">
        <div className="showcase-header">
          {/* ✅ h2 במקום h1 */}
          <h2 className="showcase-title">יעדי חלומות</h2>
          <p className="showcase-description">
            גלה הצעות מדהימות ליעדים החביבים עליך. הזמן עכשיו וחסוך בהרפתקה הבאה
            שלך!
          </p>
        </div>

        {/* ✅ A11y + Keyboard modules לנגישות מקלדת */}
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
              {/* ✅ button במקום div — נגיש למקלדת */}
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
