import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Users,
  Heart,
  Award,
  Radio,
  Clapperboard,
  UsersRound,
  ChevronLeft,
  ChevronRight,
  Film,
} from "lucide-react";
import logoImg from "../../assets/images/logo.png";
import backgroundImage from "../../assets/images/background-about.png";

/*
  ═══════════════════════════════════════════════════
  📌 כדי להחליף סרטונים:
  
  1. Shorts — החלף את ה-VIDEO_ID ב-SHORTS_VIDEOS:
     כתובת YouTube Short: https://youtube.com/shorts/ABC123
     → תשים רק את ה-ID: "ABC123"
  
  2. סרטונים קצרים — החלף את ה-VIDEO_ID ב-EXTRA_VIDEOS:
     כתובת YouTube: https://www.youtube.com/watch?v=XYZ789
     → תשים רק את ה-ID: "XYZ789"

  3. סרטון רדיו — החלף את ה-VIDEO_ID ב-RADIO_VIDEO:
     כתובת YouTube: https://www.youtube.com/watch?v=XYZ789
     → תשים רק את ה-ID: "XYZ789"
  ═══════════════════════════════════════════════════
*/

const SHORTS_VIDEOS = [
  { id: "4p_oA-xNzAc", title: "הצטרפו לצוות שלנו" },
  { id: "iT40MbjMQQs", title: "הדיל הבא שלכם רק דרכנו" },
  { id: "e1QcBJ14Lbc", title: "הצטרפו לקבוצת הווצאפ" },
  { id: "XBXpZZllBPQ", title: "הצטרפו לקבוצת הווצאפ" },
  { id: "_I4wxm0aDnA", title: "הצטרפו לקבוצת הווצאפ" },
];

const EXTRA_VIDEOS = [
  { id: "TqspSOd-bK0", title: "למה לסגור אצלנו" },
  { id: "EqcLKCOE0bg", title: "Check-In כאן בשבילכם" },
];

const RADIO_VIDEO = {
  id: "YCakIeX9ZMI",
  title: "Check-In בשידור רדיו",
};

export default function AboutPage() {
  const swiperRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateScrollState = useCallback(() => {
    const el = swiperRef.current;
    if (!el) return;

    const scrollLeft = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;

    setCanScrollRight(scrollLeft < -2);
    setCanScrollLeft(Math.abs(scrollLeft) < maxScroll - 2);

    /* Progress bar: 0 = start, 1 = end */
    const progress = maxScroll > 0 ? Math.abs(scrollLeft) / maxScroll : 0;
    setScrollProgress(Math.min(Math.max(progress, 0), 1));
  }, []);

  useEffect(() => {
    const el = swiperRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scroll = (direction) => {
    const el = swiperRef.current;
    if (!el) return;
    const slides = el.querySelectorAll(".swiper-slide");
    if (!slides.length) return;
    const slideWidth = slides[0].offsetWidth + 16;
    /* RTL: positive direction means scroll left (more negative scrollLeft) */
    el.scrollBy({
      left: -direction * slideWidth * 2,
      behavior: "smooth",
    });
  };

  return (
    <div style={{ direction: "rtl" }}>
      <style>{`
        /* ═══════════════════════════════
           Page Base
        ═══════════════════════════════ */
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
          margin-top: 3rem;
        }

        .main-content {
          max-width: 56rem;
          margin: 0 auto;
          padding: 0 1rem 4rem 1rem;
        }

        .about-img {
          display: block;
          margin: 0 auto;
        }

        /* ═══════════════════════════════
           Floating BG
        ═══════════════════════════════ */
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
        }

        @media (prefers-reduced-motion: no-preference) {
          .floating-element {
            animation: float 6s ease-in-out infinite;
          }
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

        @media (prefers-reduced-motion: reduce) {
          .floating-element { animation: none !important; }
          .glass-card { transition: none !important; }
          .short-card,
          .radio-card,
          .extra-video-card { transition: none !important; }
          .short-card:hover,
          .radio-card:hover,
          .extra-video-card:hover { transform: none; }
          .swiper-track { scroll-behavior: auto; }
        }

        /* ═══════════════════════════════
           Glass Cards
        ═══════════════════════════════ */
        .gradient-text {
          background-image: linear-gradient(135deg, #e76d2c 0%, #e76d2c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glass-card {
          display: flex;
          flex-direction: column;
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
          flex-direction: column;
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

        .page-header {
          text-align: center;
          padding: 4rem 1rem;
        }

        .page-footer {
          text-align: center;
          padding: 4rem 1rem;
        }

        .cta-card {
          max-width: 48rem;
          margin: 0 auto;
          padding: 2rem;
        }

        .cta-title {
          font-weight: bold;
          font-size: 2rem;
        }

        .background-img { opacity: 0.75; }

        .about-hero-subtitle {
          font-size: 1.5rem;
          color: #1f2937;
          font-weight: 600;
          max-width: 48rem;
          margin: 0 auto;
          line-height: 1.625;
        }

        .content-section { padding: 3rem 0; }

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

        /* ═══════════════════════════════
           Expertise
        ═══════════════════════════════ */
        .expertise-grid {
          display: grid;
          gap: 2rem;
          align-items: center;
        }

        @media (min-width: 768px) {
          .expertise-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .hero-glass { flex-direction: row; }
          .background-img { width: 900px; align-self: center; }
        }

        .expertise-items-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.5rem;
          text-align: center;
        }

        .expertise-item { padding: 1.5rem; }

        .expertise-item h3 {
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
        .text-pink-500 { color: #ec4899; }
        .text-blue-500 { color: #3b82f6; }

        .promise-tagline {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-top: 2rem;
        }

        /* ═══════════════════════════════
           Video Section Header
        ═══════════════════════════════ */
        .video-section-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .video-section-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 14px rgba(231, 109, 44, 0.25);
        }

        .video-section-icon--orange {
          background: linear-gradient(135deg, #ec8d68 0%, #d4703f 100%);
          color: white;
        }

        .video-section-icon--dark {
          background: linear-gradient(135deg, #374151 0%, #1f2937 100%);
          color: white;
        }

        .video-section-icon--warm {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: white;
        }

        /* ═══════════════════════════════
           🎠 Shorts Swiper (Instagram-style)
        ═══════════════════════════════ */
        .swiper-container {
          position: relative;
        }

        .swiper-track {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          padding: 8px 4px 16px 4px;
          min-height: 360px;

          /* Hide scrollbar */
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .swiper-track::-webkit-scrollbar {
          display: none;
        }

        .swiper-track:focus-visible {
          outline: 3px solid #e76d2c;
          outline-offset: 3px;
          border-radius: 12px;
        }

        .swiper-slide {
          flex: 0 0 190px;
          height: 340px;
          scroll-snap-align: start;
        }

        @media (min-width: 769px) {
          .swiper-slide {
            flex: 0 0 190px;
            height: 340px;
          }
        }

        @media (max-width: 768px) {
          .swiper-slide {
            flex: 0 0 160px;
            height: 285px;
          }
        }

        @media (max-width: 480px) {
          .swiper-slide {
            flex: 0 0 150px;
            height: 268px;
          }
        }

        .short-card {
          border-radius: 20px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          width: 100%;
          height: 100%;
        }

        .short-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.14);
        }

        .short-card:focus-within {
          outline: 3px solid #e76d2c;
          outline-offset: 2px;
        }

        .short-iframe-wrapper {
          width: 100%;
          height: 100%;
          background: #000;
          overflow: hidden;
        }

        .short-iframe-wrapper iframe {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }

        /* Swiper Navigation Buttons */
        .swiper-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 20;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
          color: #e76d2c;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .swiper-nav:hover {
          background: white;
          transform: translateY(-50%) scale(1.08);
        }

        .swiper-nav:focus-visible {
          outline: 3px solid #e76d2c;
          outline-offset: 3px;
        }

        .swiper-nav:disabled {
          opacity: 0;
          pointer-events: none;
        }

        .swiper-nav--right {
          right: -16px;
        }

        .swiper-nav--left {
          left: -16px;
        }

        @media (max-width: 768px) {
          .swiper-nav--right { right: -6px; }
          .swiper-nav--left { left: -6px; }
        }

        /* Progress Bar */
        .swiper-progress-track {
          width: 120px;
          height: 4px;
          background: rgba(231, 109, 44, 0.15);
          border-radius: 4px;
          margin: 20px auto 0 auto;
          overflow: hidden;
        }

        .swiper-progress-fill {
          height: 100%;
          background: linear-gradient(to right, #fb923c, #e76d2c);
          border-radius: 4px;
          transition: width 0.15s ease-out;
          min-width: 20%;
        }

        @media (prefers-reduced-motion: reduce) {
          .swiper-nav {
            transition: none;
          }
          .swiper-nav:hover {
            transform: translateY(-50%);
          }
          .swiper-progress-fill {
            transition: none;
          }
        }

        /* ═══════════════════════════════
           📹 Extra Videos Grid (2 videos)
        ═══════════════════════════════ */
        .extra-videos-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }

        @media (max-width: 600px) {
          .extra-videos-grid {
            grid-template-columns: 1fr;
          }
        }

        .extra-video-card {
          border-radius: 24px;
          overflow: hidden;
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .extra-video-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }

        .extra-video-card:focus-within {
          outline: 3px solid #e76d2c;
          outline-offset: 2px;
        }

        .extra-iframe-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #000;
        }

        .extra-iframe-wrapper iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
        }

        .extra-video-caption {
          padding: 1rem 1.25rem;
          font-weight: 700;
          font-size: 1rem;
          color: #1f2937;
        }

        /* ═══════════════════════════════
           📺 Radio Video (wide)
        ═══════════════════════════════ */
        .radio-section {
          margin-top: 1.5rem;
        }

        .radio-card {
          border-radius: 24px;
          overflow: hidden;
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .radio-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }

        .radio-card:focus-within {
          outline: 3px solid #e76d2c;
          outline-offset: 2px;
        }

        .radio-iframe-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #000;
        }

        .radio-iframe-wrapper iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
        }

        .radio-caption {
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .radio-caption-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(231, 109, 44, 0.12);
          color: #d4703f;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .radio-caption-text {
          display: flex;
          flex-direction: column;
        }

        .radio-caption-title {
          font-weight: 700;
          font-size: 1.05rem;
          color: #1f2937;
        }

        .radio-caption-sub {
          font-size: 0.85rem;
          color: #9ca3af;
          font-weight: 500;
        }
      `}</style>

      <div className="page-container">
        {/* ✅ אלמנטי רקע דקורטיביים */}
        <div className="floating-bg-container" aria-hidden="true">
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
        </div>

        <div className="content-wrapper">
          <header className="page-header">
            <div className="hero-glass">
              <div className="hero-glass__flexbox">
                <img src={logoImg} alt="לוגו Check-In" className="about-img" />
                <p className="about-hero-subtitle">
                  חברת תיירות מקצועית, חדשנית ודינמית. בונים חוויות, לא רק
                  חופשות.
                </p>
              </div>
            </div>
          </header>

          <main className="main-content">
            {/* ═══ החזון שלנו ═══ */}
            <section className="content-section" aria-label="החזון שלנו">
              <div className="glass-card card-padding">
                <h2 className="section-title gradient-text">החזון שלנו</h2>
                <p className="section-text">
                  הוקמנו בשנת 2024 מתוך חזון ברור – להוביל את תחום הנסיעות לחו"ל
                  בישראל ולספק חוויית תיירות ברמה הגבוהה ביותר, בהתאמה אישית לכל
                  לקוח ולכל יעד. המטרה שלנו היא לשנות את כל מה שחשבתם על תכנון
                  חופשות: להפוך את התהליך לפשוט, מדויק ובטוח, להציע שירות אנושי
                  בגובה העיניים אך מקצועי ברמה הגבוהה ביותר, ולהיות תמיד צעד אחד
                  קדימה.
                </p>
                <img
                  src={backgroundImage}
                  alt=""
                  aria-hidden="true"
                  className="background-img"
                />
              </div>
            </section>

            {/* ═══ צפו בנו בפעולה — Shorts Swiper ═══ */}
            <section className="content-section" aria-label="צפו בנו בפעולה">
              <div className="video-section-header">
                <div
                  className="video-section-icon video-section-icon--orange"
                  aria-hidden="true"
                >
                  <Clapperboard size={22} />
                </div>
                <h2
                  className="section-title gradient-text"
                  style={{ marginBottom: 0 }}
                >
                  צפו בנו בפעולה
                </h2>
              </div>

              {/*
               * ✅ סוויפר נגיש (IS 5568 / WCAG):
               * - role="region" + aria-roledescription="carousel" (קרוסלה)
               * - aria-label על הקרוסלה
               * - כפתורי ניווט עם aria-label מתאר
               * - role="group" + aria-roledescription="slide" על כל שקופית
               * - aria-label עם מספר שקופית
               * - prefers-reduced-motion מבטל אנימציות
               * - focus-visible על כפתורים
               */}
              <div
                className="swiper-container"
                role="region"
                aria-label="קרוסלת סרטונים קצרים"
              >
                {/* ✅ כפתור ניווט ימינה (הקודם ב-RTL) */}
                <button
                  className="swiper-nav swiper-nav--right"
                  onClick={() => scroll(-1)}
                  disabled={!canScrollRight}
                  aria-label="הסרטון הקודם"
                >
                  <ChevronRight size={24} />
                </button>

                <div
                  className="swiper-track"
                  ref={swiperRef}
                  tabIndex={0}
                  role="list"
                  aria-label="רשימת סרטונים קצרים"
                >
                  {SHORTS_VIDEOS.map((short, index) => (
                    <div
                      key={short.id}
                      className="swiper-slide"
                      role="listitem"
                    >
                      <div className="short-card">
                        <div className="short-iframe-wrapper">
                          <iframe
                            src={`https://www.youtube.com/embed/${short.id}?modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=0&playsinline=1`}
                            title={short.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ✅ כפתור ניווט שמאלה (הבא ב-RTL) */}
                <button
                  className="swiper-nav swiper-nav--left"
                  onClick={() => scroll(1)}
                  disabled={!canScrollLeft}
                  aria-label="הסרטון הבא"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* ✅ פס התקדמות — מציג מיקום גלילה */}
                <div
                  className="swiper-progress-track"
                  role="progressbar"
                  aria-label="מיקום גלילה בסרטונים"
                  aria-valuenow={Math.round(scrollProgress * 100)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="swiper-progress-fill"
                    style={{ width: `${20 + scrollProgress * 80}%` }}
                  />
                </div>
              </div>
            </section>

            {/* ═══ סרטונים נוספים ═══ */}
            <section className="content-section" aria-label="סרטונים נוספים">
              <div className="video-section-header">
                <div
                  className="video-section-icon video-section-icon--warm"
                  aria-hidden="true"
                >
                  <Film size={22} />
                </div>
                <h2
                  className="section-title gradient-text"
                  style={{ marginBottom: 0 }}
                >
                  עוד קצת עלינו
                </h2>
              </div>

              <div
                className="extra-videos-grid"
                role="list"
                aria-label="סרטונים נוספים"
              >
                {EXTRA_VIDEOS.map((video) => (
                  <div
                    key={video.id}
                    className="extra-video-card"
                    role="listitem"
                  >
                    <div className="extra-iframe-wrapper">
                      <iframe
                        src={`https://www.youtube.com/embed/${video.id}?controls=1&modestbranding=1&rel=0&playsinline=1`}
                        title={video.title}
                        allow="encrypted-media; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                    <div className="extra-video-caption">{video.title}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* ═══ שידור רדיו ═══ */}
            <section
              className="content-section radio-section"
              aria-label="שידור רדיו"
            >
              <div className="video-section-header">
                <div
                  className="video-section-icon video-section-icon--dark"
                  aria-hidden="true"
                >
                  <Radio size={22} />
                </div>
                <h2
                  className="section-title gradient-text"
                  style={{ marginBottom: 0 }}
                >
                  Check-In בשידור חי
                </h2>
              </div>

              <div className="radio-card">
                <div className="radio-iframe-wrapper">
                  <iframe
                    src={`https://www.youtube.com/embed/${RADIO_VIDEO.id}?controls=1&modestbranding=1&rel=0&playsinline=1`}
                    title={RADIO_VIDEO.title}
                    allow="encrypted-media; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <div className="radio-caption">
                  <div className="radio-caption-icon" aria-hidden="true">
                    <Radio size={18} />
                  </div>
                  <div className="radio-caption-text">
                    <span className="radio-caption-title">
                      הראיון שלנו ברדיו
                    </span>
                    <span className="radio-caption-sub">
                      בעלי Check-In מספרים על החזון והחוויה
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* ═══ המומחיות שלנו ═══ */}
            <section className="content-section" aria-label="המומחיות שלנו">
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

                <ul
                  className="expertise-items-grid"
                  aria-label="תחומי התמחות"
                  style={{ listStyle: "none", padding: 0, margin: 0 }}
                >
                  <li className="glass-card expertise-item">
                    <Users
                      className="expertise-icon text-orange-500"
                      aria-hidden="true"
                    />
                    <h3>משפחות</h3>
                  </li>
                  <li className="glass-card expertise-item">
                    <Award
                      className="expertise-icon text-red-500"
                      aria-hidden="true"
                    />
                    <h3>חבילות ספורט</h3>
                  </li>
                  <li className="glass-card expertise-item">
                    <UsersRound
                      className="expertise-icon text-blue-500"
                      aria-hidden="true"
                    />
                    <h3>חברים</h3>
                  </li>
                  <li className="glass-card expertise-item">
                    <Heart
                      className="expertise-icon text-pink-500"
                      aria-hidden="true"
                    />
                    <h3>חופשות רומנטיות</h3>
                  </li>
                </ul>
              </div>
            </section>
          </main>

          <footer className="page-footer">
            <section aria-label="ההבטחה שלנו">
              <div className="glass-card cta-card">
                <h2 className="cta-title gradient-text">ההבטחה שלנו</h2>
                <p className="section-text">
                  אנו מאמינים שתיירות איכותית נבנית על אמון, זמינות, שקיפות ויחס
                  אנושי. השירות שלנו ממשיך לאורך כל הדרך: לפני, במהלך ואחרי
                  החופשה. עם ניסיון עצום וגישה ישירה למחירים העדכניים ביותר,
                  Check In מבטיחה לכם שקט נפשי, ביטחון מלא ומקצועיות אמיתית.
                </p>
                <p className="promise-tagline">
                  Check In. בונים חוויות, יוצרים זיכרונות.
                </p>
              </div>
            </section>
          </footer>
        </div>
      </div>
    </div>
  );
}
