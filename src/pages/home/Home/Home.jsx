import { useEffect, useState } from "react";
import "./Home.css";
import HeroSection from "../HeroSection/HeroSection.jsx";
import AboutSection from "../AboutSection/AboutSection.jsx";
import WhyUsSection from "../WhyUsSection/WhyUsSection.jsx";
import UsefulLinks from "../UsefulLinks/UsefulLinks";
import FlightCardsShowcase from "../FlightCardsShowcase/FlightCardsShowcase.jsx";

function Home() {
  const [scrollFactor, setScrollFactor] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = 600; // כמה גלילה משפיעה
      const scrolled = Math.min(window.scrollY / maxScroll, 1);
      setScrollFactor(1 - scrolled * 0.6); // נחלש עד 40%
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="home-container">
      {/* BACKGROUND ORBS */}
      <div
        className="background-orbs"
        style={{
          opacity: scrollFactor,
          filter: `blur(${60 + (1 - scrollFactor) * 20}px)`,
        }}
      >
        <span className="orb orange big" style={{ top: "10%", left: "5%" }} />
        <span
          className="orb orange medium"
          style={{ top: "35%", right: "10%" }}
        />
        <span
          className="orb orange small"
          style={{ top: "65%", left: "20%" }}
        />
        <span className="orb orange big" style={{ top: "80%", right: "15%" }} />
      </div>

      {/* PAGE CONTENT */}
      <HeroSection />
      <AboutSection />
      <WhyUsSection />
      {/* <UsefulLinks /> */}
      <FlightCardsShowcase />
    </div>
  );
}

export default Home;
