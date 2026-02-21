import React, { useState, useEffect } from "react";
import { Tag } from "lucide-react";
import flightPathImage from "../../../assets/images/card-airline.png";

const FlightCard = ({
  destination,
  flightClass,
  priceFrom,
  airportCode,
  imageUrl,
  departureTime,
  arrivalTime,
  onClick,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 680);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sizes = {
    cardWidth: isMobile ? "200px" : "290px",
    cardHeight: isMobile ? "250px" : "394px",
    titleSize: isMobile ? "18px" : "28px",
    textSize: isMobile ? "14px" : "16px",
    pathHeight: isMobile ? "60px" : "120px",
  };

  return (
    <div
      style={{
        width: sizes.cardWidth,
        height: sizes.cardHeight,
        borderRadius: "34px",
        border: "8px solid white",
        boxShadow: "0 0 0 1px #d1d5db, 0 20px 40px -15px rgba(0, 0, 0, 0.2)",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "24px",
          overflow: "hidden",
          position: "relative",
          cursor: "pointer",
          fontFamily: "'Inter', sans-serif",
        }}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* תמונת רקע */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "transform 0.5s ease",
            transform: isHovered ? "scale(1.08)" : "scale(1)",
          }}
        />

        {/* --- שכבת הבלר בפייד --- */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 4,
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            // המסיכה יוצרת את הפייד: למעלה שקיפות מלאה (0%) ובתחתית אטימות מלאה (100%)
            maskImage:
              "linear-gradient(to top, black 0%, rgba(0,0,0,0.8) 40%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, black 0%, rgba(0,0,0,0.8) 40%, transparent 100%)",
          }}
        />

        {/* שכבת הצבע הכהה (כדי שהטקסט יקפוץ) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 4,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
          }}
        />

        {/* תוכן הכרטיס */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: isMobile ? "16px" : "24px",
            color: "#ffffff",
            zIndex: 6,
          }}
        >
          <div style={{ marginBottom: isMobile ? "6px" : "10px" }}>
            <h2
              style={{
                fontSize: sizes.titleSize,
                fontWeight: "bold",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              {destination}
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "4px",
              }}
            >
              <Tag size={isMobile ? 14 : 16} />
              <span style={{ fontSize: sizes.textSize }}>
                החל מ ₪{priceFrom}
              </span>
            </div>
            <p
              style={{
                margin: "4px 0 0",
                opacity: 0.9,
                fontSize: isMobile ? "12px" : "16px",
              }}
            >
              {flightClass}
            </p>
          </div>

          <div
            style={{
              marginBottom: isMobile ? "8px" : "12px",
              fontSize: sizes.textSize,
              opacity: 0.9,
            }}
          >
            <span>{airportCode}</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <span
                style={{ fontSize: isMobile ? "14px" : "18px", opacity: 0.8 }}
              >
                חזור
              </span>
              <div style={{ fontSize: sizes.textSize, fontWeight: "600" }}>
                {arrivalTime}
              </div>
            </div>

            <img
              src={flightPathImage}
              alt="Flight Path"
              style={{
                flexGrow: 1,
                height: sizes.pathHeight,
                objectFit: "contain",
                margin: "0 5px",
                filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.7))",
              }}
            />

            <div style={{ textAlign: "center" }}>
              <span
                style={{ fontSize: isMobile ? "14px" : "18px", opacity: 0.8 }}
              >
                הלוך
              </span>
              <div style={{ fontSize: sizes.textSize, fontWeight: "600" }}>
                {departureTime}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
