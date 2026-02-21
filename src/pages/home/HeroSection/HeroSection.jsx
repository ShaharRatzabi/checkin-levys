import "./HeroSection.css";
import heroNarrow from "../../../assets/images/hero-background-narrow.png";
import LinksSection from "../LinksSection/LinksSection.jsx";

export default function HeroSection() {
  return (
    <section className="hero">
      {/* Right side: title */}
      <div className="hero-title narrow-title">
        <h1>כשאתה מטייל בעולם</h1>
        <h2>אתה לא מבזבז כסף- אתה קונה חוויות</h2>
      </div>

      {/* Left side: image + links */}
      <div className="hero-media">
        <img src={heroNarrow} alt="" className="hero-img narrow" />
        <LinksSection />
      </div>
    </section>
  );
}
