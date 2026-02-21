import React from "react";
import "./UsefulLinks.css";

export default function UsefulLinks() {
  const links = [
    {
      href: "https://tic.dubai.co.il/?sld=660",
      icon: "🇦🇪",
      title: "אטרקציות בדובאי",
      desc: "שירות לקוחות בעברית • שת״פ רשמי איתנו",
      num: "1",
    },
    {
      href: "https://bit.ly/3VCTp0E",
      icon: "🛡️",
      title: "Trip Guarantee",
      desc: "הגנה מלאה על ההזמנה שלכם",
      num: "2",
    },
    {
      href: "https://link.passportcard.co.il/1042089_dlMCtRPT0=",
      icon: "💳",
      title: "PassportCard",
      desc: "ביטוח נסיעות דיגיטלי ומהיר",
      num: "3",
    },
    {
      href: "https://did.li/SIM-checkin10",
      icon: "📶",
      title: "eSIM לחו״ל",
      desc: "הכי זול והכי קל | קוד: Checkin10",
      num: "4",
      highlight: true,
    },
  ];

  return (
    <section className="links-section-container" dir="rtl">
      {/* שכבות רקע */}
      <div className="background-decor">
        <div className="grid-layer"></div>
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="noise-layer"></div>
      </div>

      <div className="content-wrapper">
        <div className="section-header">
          <span className="badge-premium">שירותים משלימים</span>
          <h2 className="section-title">כל מה שצריך לטיול המושלם</h2>
        </div>

        <div className="links-grid">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`glass-card ${link.highlight ? "highlighted" : ""}`}
            >
              <div className="card-icon-wrapper">
                <span className="emoji-icon">{link.icon}</span>
              </div>
              <div className="card-text-content">
                <h3>{link.title}</h3>
                <p>{link.desc}</p>
              </div>
              <div className="arrow-indicator">←</div>
              <div className="card-shine"></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
