import React, { useState, useEffect, useRef } from "react";
import FlightCard from "../home/FlightCard/FlightCard.jsx";
import DealCard from "../home/DealCard/DealCard.jsx";
import { db } from "../../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Search, X } from "lucide-react";
import planeVideo from "../../assets/videos/overlay.mp4";

const CountrySection = ({ country, deals, onDealClick }) => {
  return (
    <section className="country-section" aria-label={`דילים ל${country}`}>
      <div className="country-header-container">
        <div className="country-line" aria-hidden="true"></div>
        <div className="country-header">
          <h2 className="country-title">{country}</h2>
          <span className="deals-tag" aria-label={`${deals.length} דילים חמים`}>
            {deals.length} דילים חמים
          </span>
        </div>
      </div>
      <div className="deals-grid">
        {deals.map((deal) => (
          <button
            key={deal.id}
            className="deal-card-trigger"
            onClick={() => onDealClick(deal)}
            aria-label={`פתח פרטים על ${deal.title}`}
            aria-haspopup="dialog"
          >
            <FlightCard
              destination={deal.title}
              imageUrl={deal.mainImage}
              priceFrom={deal.priceFrom}
              airportCode={deal.airportCode || "TLV"}
              departureTime={deal.departureTime || "08:00"}
              arrivalTime={deal.arrivalTime || "12:00"}
              flightClass={deal.flightClass || "מחלקת תיירים"}
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default function Deals() {
  const [groupedDeals, setGroupedDeals] = useState({});
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    // אם המשתמש מעדיף הפחתת תנועה — לא מנגן אוטומטית
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setVideoPlaying(false);
      if (videoRef.current) videoRef.current.pause();
    }
  }, []);

  const handleVideoToggle = () => {
    if (!videoRef.current) return;
    if (videoPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setVideoPlaying(!videoPlaying);
  };

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
        setFilteredCountries(countryList);
      } catch (error) {
        console.error("Error fetching deals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredCountries(countries);
    } else {
      setFilteredCountries(
        countries.filter((country) => country.includes(searchTerm)),
      );
    }
  }, [searchTerm, countries]);

  if (loading)
    return (
      <div className="loader" role="status" aria-live="polite">
        טוען חוויות חדשות...
      </div>
    );

  return (
    <div className="deals-page-wrapper" style={{ direction: "rtl" }}>
      <style>{`
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

        /* ===== Hero ===== */
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

        .orange-text { color: var(--primary-orange); }

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
          opacity: 0.35;
          mix-blend-mode: screen;
        }

        /* ✅ WCAG 2.2.2 — כפתור השהיית סרטון */
        .hero-video-toggle {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          z-index: 10;
          background: rgba(0, 0, 0, 0.55);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 0.4rem 0.75rem;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          backdrop-filter: blur(4px);
          transition: background 0.2s ease;
        }

        .hero-video-toggle:hover {
          background: rgba(0, 0, 0, 0.75);
        }

        .hero-video-toggle:focus-visible {
          outline: 3px solid white;
          outline-offset: 2px;
        }

        /* ===== WhatsApp Banner ===== */
        .whatsapp-banner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin: -24px auto 30px;
          padding: 14px 28px;
          width: fit-content;
          max-width: 90%;
          background: linear-gradient(135deg, #25d366, #128c7e);
          color: white;
          border-radius: 60px;
          text-decoration: none;
          position: relative;
          z-index: 50;
          box-shadow: 0 8px 25px rgba(37, 211, 102, 0.35);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          cursor: pointer;
        }

        .whatsapp-banner:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(37, 211, 102, 0.45);
        }

        .whatsapp-banner:focus-visible {
          outline: 3px solid #128c7e;
          outline-offset: 3px;
        }

        .whatsapp-icon {
          flex-shrink: 0;
        }

        .whatsapp-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
          text-align: right;
        }

        .whatsapp-title {
          font-weight: 800;
          font-size: 1.05rem;
          line-height: 1.3;
        }

        .whatsapp-subtitle {
          font-size: 0.85rem;
          opacity: 0.9;
          font-weight: 600;
        }

        .whatsapp-pulse {
          position: absolute;
          inset: 0;
          border-radius: 60px;
          border: 2px solid rgba(37, 211, 102, 0.6);
          animation: wa-pulse 2s ease-out infinite;
        }

        @keyframes wa-pulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.08); opacity: 0; }
        }

        /* ===== Filter ===== */
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

        .search-container {
          position: relative;
          width: 100%;
          max-width: 400px;
        }

        .search-input {
          width: 100%;
          padding: 12px 45px 12px 45px;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.8);
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          font-size: 1rem;
          color: var(--dark-text);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        .search-input:focus {
          box-shadow: 0 8px 32px rgba(255, 107, 53, 0.2);
          border-color: var(--primary-orange);
        }

        .search-input:focus-visible {
          outline: 3px solid var(--primary-orange);
          outline-offset: 2px;
        }

        .search-icon {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #888;
          pointer-events: none;
        }

        .clear-button {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          background: #eee;
          border: none;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding: 0;
          color: #888;
        }

        .clear-button:focus-visible {
          outline: 3px solid var(--primary-orange);
          outline-offset: 2px;
        }

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
        }

        .filter-scroll-container::-webkit-scrollbar { height: 4px; }
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

        .filter-nav-item:focus-visible {
          outline: 3px solid var(--primary-orange);
          outline-offset: 3px;
        }

        /* ===== Deal Card Trigger ===== */
        .deal-card-trigger {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          display: block;
          text-align: inherit;
        }

        .deal-card-trigger:focus-visible {
          outline: 3px solid var(--primary-orange);
          outline-offset: 4px;
          border-radius: 34px;
        }

        /* ===== Layout ===== */
        .container-custom {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 4;
        }

        .country-section { margin-bottom: 80px; }

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

        /* ===== Accessibility & Responsive ===== */
        @media (prefers-reduced-motion: reduce) {
          .search-input,
          .filter-nav-item,
          .whatsapp-banner,
          .hero-video-toggle { transition: none; }
          .whatsapp-pulse { animation: none; display: none; }
        }

        @media (max-width: 768px) {
          .hero-viewport { height: 50vh; }
          .hero-main-title { font-size: 2.5rem; }
          .filter-wrapper { width: 95%; top: 10px; }
          .deals-grid { grid-template-columns: 1fr; }
          .whatsapp-banner { padding: 12px 20px; gap: 10px; }
          .whatsapp-title { font-size: 0.95rem; }
          .whatsapp-subtitle { font-size: 0.8rem; }
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero-viewport" aria-label="כותרת עמוד דילים">
        <div className="hero-overlay" aria-hidden="true"></div>
        <div className="hero-animation" aria-hidden="true">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="plane-video"
          >
            <source src={planeVideo} type="video/mp4" />
          </video>
        </div>
        <div className="hero-content">
          <h1 className="hero-main-title">
            לאן תרצו <span className="orange-text">לטוס</span> הפעם?
          </h1>
        </div>

        {/* ✅ WCAG 2.2.2 — כפתור השהיה/הפעלה לסרטון דקורטיבי */}
        <button
          className="hero-video-toggle"
          onClick={handleVideoToggle}
          aria-label={
            videoPlaying ? "השהיית אנימציית הרקע" : "הפעלת אנימציית הרקע"
          }
        >
          {videoPlaying ? "⏸ השהה" : "▶ הפעל"}
        </button>
      </section>

      {/* WhatsApp Banner */}
      <a
        href="https://chat.whatsapp.com/CHUEuNLp6w58lBycJQwqm6"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-banner"
        aria-label="הצטרפו לקבוצת הווצאפ שלנו לדילים לחו״ל"
      >
        <span className="whatsapp-pulse" aria-hidden="true" />
        <svg
          className="whatsapp-icon"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="28"
          height="28"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <div className="whatsapp-text">
          <span className="whatsapp-title">🔥 דילים חמים ישירות לנייד</span>
          <span className="whatsapp-subtitle">הצטרפו לקבוצת הווצאפ שלנו ←</span>
        </div>
      </a>

      <div className="container-custom">
        <div className="filter-wrapper">
          <div className="search-container">
            <Search className="search-icon" size={20} aria-hidden="true" />
            <input
              type="search"
              placeholder="חפש מדינה..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="חיפוש מדינה"
            />
            {searchTerm && (
              <button
                className="clear-button"
                onClick={() => setSearchTerm("")}
                aria-label="נקה חיפוש"
              >
                <X size={14} aria-hidden="true" />
              </button>
            )}
          </div>

          <nav aria-label="סינון לפי מדינה">
            <div className="filter-scroll-container">
              <button
                className={`filter-nav-item ${selectedCountry === "all" ? "active" : ""}`}
                onClick={() => setSelectedCountry("all")}
                aria-pressed={selectedCountry === "all"}
              >
                הכל
              </button>
              {filteredCountries.map((country) => (
                <button
                  key={country}
                  className={`filter-nav-item ${selectedCountry === country ? "active" : ""}`}
                  onClick={() => setSelectedCountry(country)}
                  aria-pressed={selectedCountry === country}
                >
                  {country}
                </button>
              ))}
            </div>
          </nav>
        </div>

        <main className="deals-main">
          {filteredCountries.length === 0 && (
            <div className="no-results" role="status" aria-live="polite">
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
