"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
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

const FlowPlane = ({ index }) => {
  // ✅ כיבוד prefers-reduced-motion
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className="flow-arrow"
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: shouldReduce ? 0 : index * 0.15 + 0.3 }}
      aria-hidden="true" // ✅ דקורטיבי בלבד
    >
      <motion.div
        animate={shouldReduce ? {} : { y: [0, 14, 0] }}
        transition={{
          repeat: shouldReduce ? 0 : Infinity,
          duration: 1.8,
          ease: "easeInOut",
        }}
      >
        <Plane
          size={26}
          color="#e76d2c"
          style={{ transform: "rotate(135deg)", display: "block" }}
          aria-hidden="true"
        />
      </motion.div>
    </motion.div>
  );
};

const StepCard = ({ step, index }) => {
  const Icon = step.icon;
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className="step-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: shouldReduce ? 0 : index * 0.15,
        duration: shouldReduce ? 0 : 0.6,
      }}
      whileHover={shouldReduce ? {} : { y: -6, scale: 1.02 }}
    >
      {/* ✅ כל תיבת האייקון דקורטיבית — המידע נמצא ב-h3 */}
      <div className="icon-box" aria-hidden="true">
        <motion.div
          initial={{ scale: 0.9 }}
          whileInView={{ scale: shouldReduce ? 1 : 1.05 }}
          transition={{ duration: shouldReduce ? 0 : 0.4 }}
          viewport={{ once: true }}
        >
          <Icon size={34} color="white" aria-hidden="true" />
        </motion.div>
        {/* ✅ מספר שלב מוסתר — h3 מספק את ההקשר */}
        <span className="step-number" aria-hidden="true">
          {step.number}
        </span>
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
    <section className="process-wrapper" dir="rtl" aria-label="תהליך הלקוח">
      <div className="process-bubble">
        <motion.div
          className="process-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* ✅ badge דקורטיבי — h2 מספק את המידע */}
          <span className="badge" aria-hidden="true">
            איך זה עובד?
          </span>
          <h2>תהליך הלקוח שלנו</h2>
          <p>מהפנייה הראשונה ועד החזרה עם חיוך</p>
        </motion.div>

        {/* ✅ ol במקום div — רשימת שלבים סמנטית */}
        <ol className="steps" aria-label="שלבי התהליך">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <li>
                <StepCard step={step} index={index} />
              </li>
              {index < steps.length - 1 && <FlowPlane index={index} />}
            </React.Fragment>
          ))}
        </ol>
      </div>
    </section>
  );
}
