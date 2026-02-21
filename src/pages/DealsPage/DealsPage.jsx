import React, { useState, useEffect } from "react";
import FlightCard from "../home/FlightCard/FlightCard.jsx";
import DealCard from "../home/DealCard/DealCard.jsx";
import { db } from "../../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Search, X } from "lucide-react"; // הוספנו אייקונים
import planeVideo from "../../assets/videos/overlay.mp4";

const CountrySection = ({ country, deals, onDealClick }) => {
  return (
    <section className="country-section">
      <div className="country-header-container">
        <div className="country-line"></div>
        <div className="country-header">
          <h2 className="country-title">{country}</h2>
          <span className="deals-tag">{deals.length} דילים חמים</span>
        </div>
      </div>
      <div className="deals-grid">
        {deals.map((deal) => (
          <FlightCard
            key={deal.id}
            destination={deal.title}
            imageUrl={deal.mainImage}
            priceFrom={deal.priceFrom}
            airportCode={deal.airportCode || "TLV"}
            departureTime={deal.departureTime || "08:00"}
            arrivalTime={deal.arrivalTime || "12:00"}
            flightClass={deal.flightClass || "מחלקת תיירים"}
            onClick={() => onDealClick(deal)}
          />
        ))}
      </div>
    </section>
  );
};

export default function Deals() {
  const [groupedDeals, setGroupedDeals] = useState({});
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]); // רשימה מסוננת
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [searchTerm, setSearchTerm] = useState(""); // טקסט החיפוש
  const [selectedDeal, setSelectedDeal] = useState(null);

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

        const dealsByCountry = fetchedDeals.reduce((acc, deal) => {
          const country = deal.country || "כללי";
          if (!acc[country]) acc[country] = [];
          acc[country].push(deal);
          return acc;
        }, {});

        const countryList = Object.keys(dealsByCountry);
        setGroupedDeals(dealsByCountry);
        setCountries(countryList);
        setFilteredCountries(countryList); // בהתחלה כולם מוצגים
      } catch (error) {
        console.error("Error fetching deals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  // פונקציית הסינון
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredCountries(countries);
    } else {
      setFilteredCountries(
        countries.filter((country) => country.includes(searchTerm)),
      );
    }
  }, [searchTerm, countries]);

  if (loading) return <div className="loader">טוען חוויות חדשות...</div>;

  return (
    <div className="deals-page-wrapper" style={{ direction: "rtl" }}>
      <style>{`
        /* General Config */
        :root {
          --primary-orange: #e76d2c;
          --dark-text: #1a1a1a;
          --glass-bg: rgba(255, 255, 255, 0.7);
        }

        .deals-page-wrapper {
          background-color: #f8f9fa;
          min-height: 100vh;
          font-family: 'Assistant', sans-serif;
        }

        /* Hero Styles */
        .hero-viewport {
          position: relative;
          height: 60vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          color: white;
          text-align: center;
          background-color: #000;
        }

        .hero-video {
          position: absolute;
          top: 50%;
          left: 50%;
          min-width: 100%;
          min-height: 100%;
          width: auto;
          height: auto;
          z-index: 1;
          transform: translate(-50%, -50%);
          object-fit: cover;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6));
          z-index: 2;
        }

        .hero-content {
          position: relative;
          z-index: 3;
          padding: 0 20px;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        .hero-main-title {
          font-size: clamp(2.5rem, 8vw, 4.5rem);
          font-weight: 900;
          margin: 0;
          line-height: 1.1;
          color: white;
        }

        .orange-text {
          color: var(--primary-orange);
        }

        /* --- Search & Filter Section --- */
        .filter-wrapper {
          position: sticky;
          top: 20px;
          z-index: 100;
          margin: -40px auto 40px;
          width: 90%;
          max-width: 800px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }

        /* שדה החיפוש */
        .search-container {
          position: relative;
          width: 100%;
          max-width: 400px;
        }

        .search-input {
          width: 100%;
          padding: 12px 45px 12px 20px;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.8);
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          font-size: 1rem;
          color: var(--dark-text);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          outline: none;
        }

        .search-input:focus {
          box-shadow: 0 8px 32px rgba(255, 107, 53, 0.2);
          border-color: var(--primary-orange);
          transform: scale(1.02);
        }

        .search-icon {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #888;
          pointer-events: none;
        }
        
        .clear-icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: #888;
          cursor: pointer;
          background: #eee;
          border-radius: 50%;
          padding: 2px;
        }

        /* רשימת המדינות (Chips) */
        .filter-scroll-container {
          width: 100%;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          padding: 10px;
          border-radius: 20px;
          display: flex;
          gap: 10px;
          border: 1px solid rgba(255,255,255,0.6);
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          overflow-x: auto;
          white-space: nowrap;
          justify-content: flex-start; /* או center אם רוצים ממורכז */
        }
        
        .filter-scroll-container::-webkit-scrollbar {
            height: 4px;
        }
        .filter-scroll-container::-webkit-scrollbar-thumb {
            background: #ccc; 
            border-radius: 4px;
        }

        .filter-nav-item {
          padding: 8px 20px;
          border-radius: 40px;
          border: 1px solid transparent;
          background: rgba(255,255,255,0.5);
          color: var(--dark-text);
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.95rem;
          flex-shrink: 0;
        }

        .filter-nav-item:hover {
            background: white;
            border-color: #ddd;
        }

        .filter-nav-item.active {
          background: var(--primary-orange);
          color: white;
          box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
        }

        /* Section Styles */
        .container-custom {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 4;
        }

        .country-section {
          margin-bottom: 80px;
        }

        .country-header-container {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 30px;
        }

        .country-line {
          height: 4px;
          width: 50px;
          background: var(--primary-orange);
          border-radius: 2px;
        }

        .country-title {
          font-size: 2.2rem;
          font-weight: 800;
          margin: 0;
          color: #2d3748;
        }

        .deals-tag {
          background: rgba(255, 107, 53, 0.1);
          color: var(--primary-orange);
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 700;
          border: 1px solid rgba(255, 107, 53, 0.2);
        }

        .deals-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
          justify-items: center;
        }

        .loader {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: var(--primary-orange);
          font-weight: 700;
        }

        .no-results {
            text-align: center;
            padding: 50px;
            font-size: 1.2rem;
            color: #666;
        }

        .hero-animation {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
}

.plane-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.35; /* אפשר לשחק בין 0.2–0.5 */
  mix-blend-mode: screen;
}


        @media (max-width: 768px) {
          .hero-viewport { height: 50vh; }
          .hero-main-title { font-size: 2.5rem; }
          .filter-wrapper { width: 95%; top: 10px; }
          .deals-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero-viewport">
        <div className="hero-overlay"></div>
        {/* Plane animation layer */}
        <div className="hero-animation">
          <video autoPlay muted loop playsInline className="plane-video">
            <source src={planeVideo} type="video/mp4" />
          </video>
        </div>

        <div className="hero-content">
          <h1 className="hero-main-title">
            לאן תרצו <span className="orange-text">לטוס</span> היום?
          </h1>
        </div>
      </section>

      {/* Main Content & Search */}
      <div className="container-custom">
        {/* אזור החיפוש והסינון */}
        <div className="filter-wrapper">
          {/* שורת חיפוש */}
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="חפש מדינה..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <X
                className="clear-icon"
                size={16}
                onClick={() => setSearchTerm("")}
              />
            )}
          </div>

          {/* כפתורי מדינות (Chips) שמתעדכנים לפי החיפוש */}
          <div className="filter-scroll-container">
            <button
              className={`filter-nav-item ${
                selectedCountry === "all" ? "active" : ""
              }`}
              onClick={() => setSelectedCountry("all")}
            >
              הכל
            </button>
            {filteredCountries.map((country) => (
              <button
                key={country}
                className={`filter-nav-item ${
                  selectedCountry === country ? "active" : ""
                }`}
                onClick={() => setSelectedCountry(country)}
              >
                {country}
              </button>
            ))}
          </div>
        </div>

        <main className="deals-main">
          {/* אם אין תוצאות בחיפוש */}
          {filteredCountries.length === 0 && (
            <div className="no-results">
              לא מצאנו דילים למדינה "{searchTerm}" 😔
            </div>
          )}

          {selectedCountry === "all"
            ? filteredCountries.map((country) => (
                <CountrySection
                  key={country}
                  country={country}
                  deals={groupedDeals[country]}
                  onDealClick={(deal) => setSelectedDeal(deal)}
                />
              ))
            : groupedDeals[selectedCountry] && (
                <CountrySection
                  country={selectedCountry}
                  deals={groupedDeals[selectedCountry]}
                  onDealClick={(deal) => setSelectedDeal(deal)}
                />
              )}
        </main>
      </div>

      {selectedDeal && (
        <DealCard deal={selectedDeal} onClose={() => setSelectedDeal(null)} />
      )}
    </div>
  );
}
