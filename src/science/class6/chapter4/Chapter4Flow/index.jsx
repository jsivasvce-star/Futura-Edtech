/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './Chapter4Flow.css';

// 10 Curated Learning Modules for Chapter 4
const MODULES_DATA = [
  {
    num: "01",
    id: "intro_magnets",
    title: "INTRODUCTION",
    image: "/ch4_cards/img_1.jpg",
  },
  {
    num: "02",
    id: "activity_4_1",
    title: "MAGNETIC ITEMS",
    image: "/ch4_cards/img_2.jpg",
  },
  {
    num: "03",
    id: "magnetic_poles",
    title: "POLES OF MAGNET",
    image: "/ch4_cards/img_3.jpg",
  },
  {
    num: "04",
    id: "suspended_magnet",
    title: "FINDING DIRECTIONS",
    image: "/ch4_cards/img_4.jpg",
  },
  {
    num: "05",
    id: "magnetic_compass",
    title: "MAKE A COMPASS",
    image: "/ch4_cards/img_5.jpg",
  },
  {
    num: "06",
    id: "magnet_interaction",
    title: "ATTRACTION & REPULSION",
    image: "/ch4_cards/img_6.jpg",
  },
  {
    num: "07",
    id: "activity_4_6",
    title: "COMPASS & MAGNET",
    image: "/ch4_cards/img_7.jpg",
  },
  {
    num: "08",
    id: "activity_4_7",
    title: "THROUGH MATERIALS",
    image: "/ch4_cards/img_8.jpg",
  },
  {
    num: "09",
    id: "sci6-ch4-sec45-fun-with-magnets",
    title: "FUN WITH MAGNETS",
    image: "/ch4_cards/img_9.jpg",
  },
  {
    num: "10",
    id: "chapter_4_quiz",
    title: "TEST KNOWLEDGE",
    image: "/ch4_cards/img_10.jpg",
  }
];

export default function Chapter4Flow({ onBackToDashboard, onLaunchActivity }) {
  // Split into Top Row (01–05) and Bottom Row (06–10)
  const topRowModules = MODULES_DATA.slice(0, 5);
  const bottomRowModules = MODULES_DATA.slice(5, 10);

  const renderModuleCard = (mod, index) => (
    <motion.div
      key={mod.id}
      className="module-grid-card"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay: 0.06 + index * 0.03, ease: [0.25, 1, 0.5, 1] }}
      whileHover={{ y: -4, scale: 1.025 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onLaunchActivity && onLaunchActivity(mod.id)}
      title={`Launch ${mod.title}`}
    >
      {/* Top Header Bar: Left Pill Badge + Right Primary Title on single line */}
      <div className="module-card-header-bar">
        <span className="module-index-pill">{mod.num}</span>
        <h3 className="module-card-title" title={mod.title}>{mod.title}</h3>
      </div>

      {/* Photographic Thumbnail occupying lower body in calibrated aspect ratio */}
      <div className="module-card-img-frame">
        <img 
          src={mod.image} 
          alt={mod.title} 
          className="module-card-img"
        />
        <div className="module-card-img-vignette" />
      </div>

      {/* Enter Button with matching amber-orange gradient */}
      <button 
        className="module-enter-btn"
        onClick={(e) => {
          e.stopPropagation();
          if (onLaunchActivity) onLaunchActivity(mod.id);
        }}
        title={`Enter ${mod.title}`}
      >
        <span>ENTER</span>
        <ArrowRight size={14} className="module-enter-icon" />
      </button>
    </motion.div>
  );

  return (
    <div className="nautical-map-viewport">
      {/* 1376:768 Precision Map Stage matching custom illustration aspect ratio */}
      <div className="nautical-map-stage">
        
        {/* Full-bleed Custom Illustrated Clean Antique Nautical Expedition Map Backdrop */}
        <img 
          src="/assets/nautical_expedition_map_clean.jpg" 
          alt="16th Century Clean Antique Nautical Expedition Map" 
          className="map-backdrop-img"
        />

        {/* Ambient Burnt-Edge Vignette Overlay */}
        <div className="map-vignette-overlay" />

        {/* Top-Center Brass Nameplate Plaque */}
        <header className="flow-top-header">
          <motion.div 
            className="map-title-plaque"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="plaque-pin left" />
            <div className="plaque-inner">
              <span className="plaque-tag">GRADE 6 • SCIENCE • CHAPTER 4</span>
              <h1 className="plaque-heading">EXPLORING MAGNETS • EXPEDITION CHART</h1>
            </div>
            <div className="plaque-pin right" />
          </motion.div>
        </header>

        {/* Calibrated 2x5 Two-Row Grid Layout */}
        <div className="map-grid-container">
          {/* Top Row: Modules 01 to 05 */}
          <div className="map-grid-row top-row">
            {topRowModules.map((mod, i) => renderModuleCard(mod, i))}
          </div>

          {/* Bottom Row: Modules 06 to 10 */}
          <div className="map-grid-row bottom-row">
            {bottomRowModules.map((mod, i) => renderModuleCard(mod, i + 5))}
          </div>
        </div>

        {/* Bottom Navigation Bar: <- BACK on bottom-left, NEXT -> on bottom-right */}
        <footer className="flow-bottom-nav">
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="flow-nav-btn back-btn"
            onClick={onBackToDashboard}
            title="Return to Chapter Cover"
          >
            <ArrowLeft size={18} className="flow-nav-icon" />
            <span>BACK</span>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="flow-nav-btn next-btn"
            onClick={() => onLaunchActivity && onLaunchActivity(MODULES_DATA[0].id)}
            title="Start Journey: Module 01 Introduction"
          >
            <span>NEXT</span>
            <ArrowRight size={18} className="flow-nav-icon" />
          </motion.button>
        </footer>

      </div>
    </div>
  );
}
