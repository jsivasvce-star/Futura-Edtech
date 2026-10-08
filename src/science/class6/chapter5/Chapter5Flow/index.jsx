/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import flowBg from '../../../../assets/ch5_flow_bg.png';
import './Chapter5Flow.css';

// 10 Curated Learning Modules for Chapter 5: Measurement of Length and Motion
const MODULES_DATA = [
  {
    num: "01",
    id: "sci6-ch5-intro",
    title: "DEEPA'S MUDDLE",
    image: "/ch5_cards/img_1.jpg",
  },
  {
    num: "02",
    id: "sci6-ch5-activity-5-1",
    title: "HANDSPAN & BALISHT",
    image: "/ch5_cards/img_2.jpg",
  },
  {
    num: "03",
    id: "sci6-ch5-activity-5-2",
    title: "STANDARD UNITS (SI)",
    image: "/ch5_cards/img_3.jpg",
  },
  {
    num: "04",
    id: "sci6-ch5-activity-5-3",
    title: "CORRECT MEASUREMENT",
    image: "/ch5_cards/img_4.jpg",
  },
  {
    num: "05",
    id: "sci6-ch5-activity-5-4",
    title: "LENGTH OF A CURVE",
    image: "/ch5_cards/img_5.jpg",
  },
  {
    num: "06",
    id: "sci6-ch5-activity-5-5",
    title: "DESCRIBING POSITION",
    image: "/ch5_cards/img_6.jpg",
  },
  {
    num: "07",
    id: "linear_motion",
    title: "LINEAR MOTION",
    image: "/ch5_cards/img_7.jpg",
  },
  {
    num: "08",
    id: "circular_motion",
    title: "CIRCULAR MOTION",
    image: "/ch5_cards/img_8.jpg",
  },
  {
    num: "09",
    id: "sci6-ch5-section-5-8",
    title: "PERIODIC & ROLLERCOASTER",
    image: "/ch5_cards/img_9.jpg",
  },
  {
    num: "10",
    id: "chapter_5_quiz",
    title: "TEST KNOWLEDGE",
    image: "/ch5_cards/img_10.jpg",
  }
];

export default function Chapter5Flow({ onBackToDashboard, onLaunchActivity }) {
  // Split into Top Row (01–05) and Bottom Row (06–10)
  const topRowModules = MODULES_DATA.slice(0, 5);
  const bottomRowModules = MODULES_DATA.slice(5, 10);

  const renderModuleCard = (mod, index) => (
    <motion.div
      key={mod.id}
      className="ch5-module-grid-card"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay: 0.06 + index * 0.03, ease: [0.25, 1, 0.5, 1] }}
      whileHover={{ y: -4, scale: 1.025 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onLaunchActivity && onLaunchActivity(mod.id)}
      title={`Launch ${mod.title}`}
    >
      {/* Top Header Bar: Left Pill Badge + Styled Title */}
      <div className="ch5-module-card-header-bar">
        <span className="ch5-module-index-pill">{mod.num}</span>
        <div className="ch5-module-title-plate">
          <h3 className="ch5-module-card-title">{mod.title}</h3>
        </div>
      </div>

      {/* Photographic Thumbnail occupying body */}
      <div className="ch5-module-card-img-frame">
        <img 
          src={mod.image} 
          alt={mod.title} 
          className="ch5-module-card-img"
        />
        <div className="ch5-module-card-img-vignette" />
      </div>
    </motion.div>
  );

  return (
    <div className="ch5-flow-viewport">
      {/* Precision Map Stage */}
      <div className="ch5-flow-stage">
        {/* Full backdrop */}
        <img
          src={flowBg}
          alt="Measurement of Length and Motion Blueprint Stage"
          className="ch5-flow-backdrop-img"
        />
        <div className="ch5-flow-vignette-overlay" />

        {/* Top-Center Plaque */}
        <header className="ch5-flow-top-header">
          <motion.div 
            className="ch5-map-title-plaque"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="ch5-plaque-pin left" />
            <div className="ch5-plaque-inner">
              <span className="ch5-plaque-tag">GRADE 6 • SCIENCE • CHAPTER 5</span>
              <h1 className="ch5-plaque-heading">MEASUREMENT OF LENGTH AND MOTION • LAB CHART</h1>
            </div>
            <div className="ch5-plaque-pin right" />
          </motion.div>
        </header>

        {/* 2x5 Grid Layout */}
        <div className="ch5-map-grid-container">
          {/* Top Row: Modules 01 to 05 */}
          <div className="ch5-map-grid-row">
            {topRowModules.map((mod, i) => renderModuleCard(mod, i))}
          </div>

          {/* Bottom Row: Modules 06 to 10 */}
          <div className="ch5-map-grid-row">
            {bottomRowModules.map((mod, i) => renderModuleCard(mod, i + 5))}
          </div>
        </div>

        {/* Bottom Navigation Bar */}
        <footer className="ch5-flow-bottom-nav">
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="ch5-flow-nav-btn back-btn"
            onClick={onBackToDashboard}
            title="Return to Chapter Cover"
          >
            <ArrowLeft size={18} />
            <span>BACK</span>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="ch5-flow-nav-btn next-btn"
            onClick={() => onLaunchActivity && onLaunchActivity(MODULES_DATA[0].id)}
            title="Start Journey: Module 01 Deepa's Muddle"
          >
            <span>NEXT</span>
            <ArrowRight size={18} />
          </motion.button>
        </footer>
      </div>
    </div>
  );
}
