import React from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, onClose, navigationItems }) => {
  const isInternalLink = (href) => href.startsWith("#");

  return (
    <>
      <style>{`
        .sidebar-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.4);
          z-index: 40;
        }

        .sidebar {
          position: fixed;
          top: 0;
          right: -100%;
          height: 100%;
          width: 280px;
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-left: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: -4px 0 16px rgba(0, 0, 0, 0.1);
          z-index: 70;
          transition: right 0.3s ease;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .sidebar-open {
          right: 0;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .sidebar-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .sidebar-logo {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #ff7b54, #fe782f);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          color: white;
          font-weight: bold;
          font-size: 18px;
        }

        .sidebar-title-text {
          font-size: 18px;
          font-weight: 700;
          color: #1f2937;
        }

        .sidebar-close {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          padding: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .sidebar-close:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.05);
        }

        .close-icon {
          width: 16px;
          height: 16px;
          color: #1f2937;
        }

        .sidebar-nav {
          padding: 24px 0;
          flex-grow: 1;
        }

        .sidebar-nav-item {
          display: block;
          padding: 12px 24px;
          color: #1f2937;
          text-decoration: none;
          font-size: 16px;
          font-weight: 500;
          transition: all 0.2s ease;
          border-right: 3px solid transparent;
          animation: slideIn 0.3s ease forwards;
          opacity: 0;
          transform: translateX(20px);
          border-radius: 20px;
        }

        @keyframes slideIn {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .sidebar-nav-item:hover {
          background: rgba(255, 255, 255, 0.5);
          border-right-color: #fe782f;
        }

        .sidebar-nav-text {
          display: block;
        }

        .sidebar-footer {
          padding: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .sidebar-admin-link {
          background-color: #e9ecef;
          color: #495057;
          font-weight: 600;
        }
        
        .sidebar-admin-link:hover {
          background-color: #dee2e6;
          border-right-color: #495057;
        }

        .sidebar-signup-button {
          width: 100%;
          background: linear-gradient(90deg, #f97316, #fe782f);
          color: white;
          padding: 12px 16px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s ease;
        }

        .sidebar-signup-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }

        .sidebar-signup-icon {
          width: 18px;
          height: 18px;
        }
      `}</style>

      {/* Backdrop */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-title">
            <div className="sidebar-logo">C</div>
            <span className="sidebar-title-text">Check In</span>
          </div>
          <button onClick={onClose} className="sidebar-close">
            <X className="close-icon" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="sidebar-nav">
          {navigationItems.map((item, index) =>
            isInternalLink(item.href) ? (
              <a
                key={item.name}
                href={item.href}
                onClick={onClose}
                className="sidebar-nav-item"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="sidebar-nav-text">{item.name}</span>
              </a>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={`sidebar-nav-item ${
                  item.name === "ניהול" ? "sidebar-admin-link" : ""
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="sidebar-nav-text">{item.name}</span>
              </Link>
            )
          )}
        </div>

        {/* Call to Action */}
        <div className="sidebar-footer">
          <button className="sidebar-signup-button">
            <span>התחילו לתכנן טיול</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
