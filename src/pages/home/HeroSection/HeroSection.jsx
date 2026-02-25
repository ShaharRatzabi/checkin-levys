import "./HeroSection.css";
import heroNarrow from "../../../assets/images/hero-background-narrow.png";
import LinksSection from "../LinksSection/LinksSection.jsx";

export default function HeroSection() {
  return (
    <section className="hero" aria-label="כותרת ראשית">
      {/* Right side: title */}
      <div className="hero-title narrow-title">
        <h1>כשאתה מטייל בעולם</h1>
        {/* ✅ שונה מ-h2 ל-p — זה ציטוט ולא כותרת היררכית */}
        <p className="hero-subtitle">אתה לא מבזבז כסף- אתה קונה חוויות</p>
      </div>

      {/* Left side: image + links */}
      <div className="hero-media">
        {/* ✅ תמונה דקורטיבית — alt ריק נכון */}
        <img src={heroNarrow} alt="" className="hero-img narrow" />
        <LinksSection />
      </div>
    </section>
  );
}
