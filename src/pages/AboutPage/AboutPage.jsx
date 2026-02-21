import React from "react";
import { Users, Heart, Award, PlayCircle } from "lucide-react";
import logoImg from "../../assets/images/logo.png";
import backgroundImage from "../../assets/images/background-about.png";

export default function AboutPage() {
  return (
    <div style={{ direction: "rtl" }}>
      <style>{`
        /* Shared styles from FAQ page are assumed to be available if they are in a global scope or imported,
           but for full encapsulation, we repeat necessary styles or assume they are loaded globally.
           Here, we'll redefine the necessary styles to ensure this component is self-contained. */

        /* General Page Styling */
        .page-container {
          min-height: 100vh;
          background-image: linear-gradient(
  to bottom right,
  #fff7ed 70%,
  #e76d2c 100%
);

          position: relative;
          overflow: hidden;
        }
        
        .content-wrapper {
          position: relative;
          z-index: 10;
          margin-top:3rem;
        }
        
        .main-content {
          max-width: 56rem; /* 900px */
          margin: 0 auto;
          padding: 0 1rem 4rem 1rem;
        }
          .about-img {
            display: block;
            margin: 0 auto; 
        }
        
        /* Floating Background Elements */
        .floating-bg-container {
          position: fixed;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .floating-element {
          position: absolute;
          border-radius: 9999px;
          filter: blur(70px);
          animation: float 6s ease-in-out infinite;
        }
        .floating-element:nth-child(1) {
          width: 18rem; height: 18rem;
          top: 5rem; right: 5rem;
          background-image: linear-gradient(to right, rgba(251, 146, 60, 0.15), rgba(239, 68, 68, 0.15));
        }
        .floating-element:nth-child(2) {
          width: 24rem; height: 24rem;
          bottom: 8rem; left: 5rem;
          background-image: linear-gradient(to right, rgba(252, 211, 77, 0.15), rgba(244, 114, 182, 0.15));
          animation-delay: -2s;
        }
        .floating-element:nth-child(3) {
          width: 14rem; height: 14rem;
          top: 33%; left: 33%;
          background-image: linear-gradient(to right, rgba(251, 191, 36, 0.15), rgba(251, 146, 60, 0.15));
          animation-delay: -4s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(1deg); }
          66% { transform: translateY(-10px) rotate(-1deg); }
        }
        
        /* Text and Colors */
        .gradient-text {
          background-image: linear-gradient(135deg, #e76d2c 0%, #e76d2c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        /* Cards */
        .glass-card {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 24px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        .glass-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }
        .hero-glass {
        display: flex;
        flex-direction:column;
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 32px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          max-width: 56rem;
          margin: 0 auto;
          padding: 3rem;
        }


        
        /* Header */
        .page-header {
          text-align: center;
          padding: 4rem 1rem;
        }
        
        /* Footer */
        .page-footer {
          text-align: center;
          padding: 4rem 1rem;
        }
        .cta-card {
          max-width: 48rem;
          margin: 0 auto;
          padding: 2rem;
        }
          .cta-title{
          font-weight: bold;
          font-size: 2rem;
      }
          .background-img {
            opacity: 0.75;
          }
        /* About Page Specific */
        .about-hero-title {
          font-size: 5rem;
          font-weight: 900;
          letter-spacing: -0.025em;
          margin-bottom: 1rem;
        }
        .about-hero-subtitle {
          font-size: 1.5rem;
          color: #1f2937;
          font-weight: 600;
          max-width: 48rem;
          margin: 0 auto;
          line-height: 1.625;
        }
        
        .content-section {
          padding: 3rem 0;
        }
        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 2rem;
          text-align: center;
        }
        .section-text {
          font-size: 1.125rem;
          color: #374151;
          line-height: 2;
        }
        
        .card-padding { padding: 2.5rem; }
        .card-padding-sm { padding: 1rem; }
        
        /* Video */
        .video-placeholder {
          aspect-ratio: 16 / 9;
          cursor: pointer;
          border-radius: 1rem;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .video-bg {
          position: absolute;
          inset: 0;
          background-image: url('https://images.unsplash.com/photo-1527632946763-a54b3c061739?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
          background-size: cover;
          background-position: center;
          transition: transform 0.5s ease;
        }
        .video-placeholder:hover .video-bg {
          transform: scale(1.1);
        }
        .video-overlay {
          position: absolute;
          inset: 0;
          background-color: rgba(0,0,0,0.3);
        }
        .video-play-icon {
          position: relative;
          z-index: 10;
          width: 6rem;
          height: 6rem;
          color: rgba(255,255,255,0.7);
          transition: color 0.3s ease;
        }
        .video-placeholder:hover .video-play-icon {
          color: white;
        }
        
        /* Expertise Grid */
        .expertise-grid {
          display: grid;
          gap: 2rem;
          align-items: center;
        }
        @media (min-width: 768px) {
          .expertise-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }

         .hero-glass {
            flex-direction: row;
          }
          .background-img {
            width:900px;
            align-self: center;

          }
        }
        
        .expertise-items-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.5rem;
          text-align: center;
        }
        .expertise-item {
          padding: 1.5rem;
        }
        .expertise-item h4 {
          font-weight: 700;
          font-size: 1.125rem;
          color: #1f2937;
        }
        .expertise-icon {
          width: 3rem;
          height: 3rem;
          margin: 0 auto 0.75rem auto;
        }
        .text-orange-500 { color: #f97316; }
        .text-red-500 { color: #ef4444; }
        .text-amber-500 { color: #f59e0b; }
        .text-pink-500 { color: #ec4899; }
        
        /* Promise */
        .promise-tagline {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-top: 2rem;
        }


      `}</style>
      <div className="page-container">
        <div className="floating-bg-container">
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
        </div>

        <div className="content-wrapper">
          <header className="page-header">
            <div className="hero-glass">
              <div className="hero-glass__flexbox">
                <img src={logoImg} alt="logo-title" className="about-img" />
                <p className="about-hero-subtitle">
                  חברת תיירות מקצועית, חדשנית ודינמית. בונים חוויות, לא רק
                  חופשות.
                </p>
              </div>
            </div>
          </header>

          <main className="main-content">
            <section className="content-section">
              <div className="glass-card card-padding">
                <h2 className="section-title gradient-text">החזון שלנו</h2>
                <p className="section-text">
                  הוקמנו בשנת 2024 מתוך חזון ברור – להוביל את תחום הנסיעות לחו”ל
                  בישראל ולספק חוויית תיירות ברמה הגבוהה ביותר, בהתאמה אישית לכל
                  לקוח ולכל יעד. המטרה שלנו היא לשנות את כל מה שחשבתם על תכנון
                  חופשות: להפוך את התהליך לפשוט, מדויק ובטוח, להציע שירות אנושי
                  בגובה העיניים אך מקצועי ברמה הגבוהה ביותר, ולהיות תמיד צעד אחד
                  קדימה.
                </p>

                <img
                  src={backgroundImage}
                  alt="background-title"
                  className="background-img"
                />
              </div>
            </section>

            <section className="content-section">
              <h2 className="section-title gradient-text">צפו בנו בפעולה</h2>
              <div className="glass-card card-padding-sm">
                <div className="video-placeholder">
                  <div className="video-bg"></div>
                  <div className="video-overlay"></div>
                  <PlayCircle className="video-play-icon" />
                </div>
              </div>
            </section>

            <section className="content-section">
              <div className="expertise-grid">
                <div className="glass-card card-padding">
                  <h2 className="section-title gradient-text">המומחיות שלנו</h2>
                  <p className="section-text">
                    עם רקע רחב ועשרות אלפי שעות ניסיון, אנו פועלים בגישה
                    הוליסטית שמתייחסת לכל חופשה כפרויקט שלם – מהחיפוש הראשון ועד
                    לנחיתה חזרה. אנו מתמחים בתכנון חופשות מותאמות אישית לכל סוגי
                    המטיילים: משפחות, זוגות, אנשי עסקים, חובבי ספורט, קזינו,
                    ותרמילאים, תוך מתן מעטפת מלאה של שירות, ליווי ופתרונות
                    ייחודיים.
                  </p>
                </div>
                <div className="expertise-items-grid">
                  <div className="glass-card expertise-item">
                    <Users className="expertise-icon text-orange-500" />
                    <h4>משפחות</h4>
                  </div>
                  <div className="glass-card expertise-item">
                    <Award className="expertise-icon text-red-500" />
                    <h4>חבילות ספורט</h4>
                  </div>
                  <div className="glass-card expertise-item">
                    <Heart className="expertise-icon text-amber-500" />
                    <h4>זוגות</h4>
                  </div>
                  <div className="glass-card expertise-item">
                    <Heart className="expertise-icon text-pink-500" />
                    <h4>חופשות רומנטיות</h4>
                  </div>
                </div>
              </div>
            </section>
          </main>

          <footer className="page-footer">
            <div className="glass-card cta-card">
              <h2 className="cta-title gradient-text">ההבטחה שלנו</h2>
              <p className="section-text">
                אנו מאמינים שתיירות איכותית נבנית על אמון, זמינות, שקיפות ויחס
                אנושי. השירות שלנו ממשיך לאורך כל הדרך: לפני, במהלך ואחרי
                החופשה. עם ניסיון עצום וגישה ישירה למחירים העדכניים ביותר, Check
                In מבטיחה לכם שקט נפשי, ביטחון מלא ומקצועיות אמיתית.
              </p>
              <p className="promise-tagline">
                Check In. בונים חוויות, יוצרים זיכרונות.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
