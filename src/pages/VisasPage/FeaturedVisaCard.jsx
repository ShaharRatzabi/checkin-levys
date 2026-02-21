import React from "react";
import { MapPin, Calendar, Tag } from "lucide-react";

const FeaturedVisaCard = ({ visa, onDiscoverMore }) => {
  return (
    <>
      <style>{`
        .featured-visa-card {
          background-color: white;
          border-radius: 1.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: all 0.3s ease;
        }
        .featured-visa-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }
        .featured-image-container {
          height: 300px;
          overflow: hidden;
        }
        .featured-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .featured-content {
          padding: 2rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .featured-meta {
          display: flex;
          gap: 1.5rem;
          color: #6b7280;
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }
        .featured-meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .featured-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }
        .featured-subtitle {
          font-size: 1.1rem;
          color: #4b5563;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }
        .discover-more-btn {
          margin-top: auto;
          background-image: linear-gradient(to right, #fb923c, #f87171);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 0.75rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(251, 146, 60, 0.3);
        }
        .discover-more-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 7px 20px rgba(251, 146, 60, 0.4);
        }
      `}</style>
      <div className="featured-visa-card">
        <div className="featured-image-container">
          <img src={visa.image} alt={visa.country} />
        </div>
        <div className="featured-content">
          <div className="featured-meta">
            <span className="featured-meta-item">
              <MapPin size={16} /> {visa.country}
            </span>
            <span className="featured-meta-item">
              <Calendar size={16} /> {visa.validity}
            </span>
            <span className="featured-meta-item">
              <Tag size={16} /> {visa.cost.split("|")[0].trim()}
            </span>
          </div>
          <h3 className="featured-title">{visa.title}</h3>
          <p className="featured-subtitle">{visa.subtitle}</p>
          <button onClick={onDiscoverMore} className="discover-more-btn">
            גלה עוד
          </button>
        </div>
      </div>
    </>
  );
};

export default FeaturedVisaCard;
