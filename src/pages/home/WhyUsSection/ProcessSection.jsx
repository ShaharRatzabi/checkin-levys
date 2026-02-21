"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  FileText,
  Map,
  Plane,
  Headphones,
  Heart,
} from "lucide-react";
import "./ProcessSection.css";

const steps = [
  {
    number: 1,
    title: "פתיחת פנייה",
    description: "יוצרים קשר דרך האתר או אחת הפלטפורמות שלנו.",
    icon: MessageCircle,
  },
  {
    number: 2,
    title: "הצעת מחיר",
    description:
      "הצעה מותאמת אישית הכוללת טיסות, מלונות ואפשרויות נוספות – לפי הצרכים והתקציב שלכם.",
    icon: FileText,
  },
  {
    number: 3,
    title: "תכנון הטיול",
    description:
      "שדרוגים, שינויים ותיאום ציפיות עד לשביעות רצון מלאה, כולל טיפים מניסיון אישי.",
    icon: Map,
  },
  {
    number: 4,
    title: "צ'ק אין + מפה דיגיטלית",
    description:
      "יום לפני החופשה תקבלו כרטיסי טיסה ומפת Google Maps עם כל המקומות החשובים.",
    icon: Plane,
  },
  {
    number: 5,
    title: "ליווי צמוד",
    description: "איתכם בכל שלב – זמינות 24/7 לכל צורך או שאלה בזמן אמת.",
    icon: Headphones,
  },
  {
    number: 6,
    title: "חוזרים עם חיוך",
    description: "החופשה נגמרה – אבל כבר מתכננים את היעד הבא.",
    icon: Heart,
  },
];

const FlowPlane = ({ index }) => (
  <motion.div
    className="flow-arrow"
    initial={{ opacity: 0, y: -10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.15 + 0.3 }}
  >
    <motion.div
      animate={{ y: [0, 14, 0] }}
      transition={{
        repeat: Infinity,
        duration: 1.8,
        ease: "easeInOut",
      }}
    >
      <Plane
        size={26}
        color="#e76d2c"
        style={{
          transform: "rotate(135deg)", // 👈 זה היישור האמיתי
          display: "block",
        }}
      />
    </motion.div>
  </motion.div>
);

const StepCard = ({ step, index }) => {
  const Icon = step.icon;

  return (
    <motion.div
      className="step-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      whileHover={{ y: -6, scale: 1.02 }}
    >
      <div className="icon-box">
        <motion.div
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <Icon size={34} color="white" />
        </motion.div>

        <span className="step-number">{step.number}</span>
      </div>

      <div className="step-content">
        <h3>{step.title}</h3>
        <p>{step.description}</p>
      </div>
    </motion.div>
  );
};

export default function ProcessSection() {
  return (
    <section className="process-wrapper" dir="rtl">
      <div className="process-bubble">
        <motion.div
          className="process-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="badge">איך זה עובד?</span>
          <h2>תהליך הלקוח שלנו</h2>
          <p>מהפנייה הראשונה ועד החזרה עם חיוך</p>
        </motion.div>

        <div className="steps">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <StepCard step={step} index={index} />
              {index < steps.length - 1 && <FlowPlane index={index} />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
