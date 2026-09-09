/* eslint-disable react/prop-types */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Compass, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import './Chapter4Flow.css';

// 10 Curated Nautical Expedition Waypoints anchored to hand-drawn landmarks
const WAYPOINTS_DATA = [
  {
    num: "01",
    id: "intro_magnets",
    title: "INTRODUCTION",
    sub: "Reshma's storm & compass discovery",
    x: 21,
    y: 23,
    image: "/ch4_cards/img_1.jpg",
    landmark: "Departure Harbor • Sailing Galleon",
    desc: "Discover how ancient mariners navigated treacherous ocean storms with lodestone needles."
  },
  {
    num: "02",
    id: "activity_4_1",
    title: "MAGNETIC ITEMS",
    sub: "Predict & test magnetic pull",
    x: 37,
    y: 23,
    image: "/ch4_cards/img_2.jpg",
    landmark: "Sandy Beach • Iron Nails & Relics",
    desc: "Separate iron nails, coins, and metallic artifacts from inert sands and stones."
  },
  {
    num: "03",
    id: "magnetic_poles",
    title: "POLES OF MAGNET",
    sub: "Iron filings & terminal pole pairs",
    x: 55,
    y: 23,
    image: "/ch4_cards/img_3.jpg",
    landmark: "Coastal Cliffhead • Engraved Bar Magnet",
    desc: "Observe how iron filings concentrate with dense attraction at the terminal North and South poles."
  },
  {
    num: "04",
    id: "suspended_magnet",
    title: "FINDING DIRECTIONS",
    sub: "Hanging magnet aligns N-S",
    x: 40,
    y: 47,
    image: "/ch4_cards/img_4.jpg",
    landmark: "Central Islet • Suspended Needle Stand",
    desc: "Witness how a freely suspended magnet rotates and reliably settles along Earth's magnetic meridian."
  },
  {
    num: "05",
    id: "magnetic_compass",
    title: "MAKE A COMPASS",
    sub: "Float magnetized needle in water",
    x: 30,
    y: 73,
    image: "/ch4_cards/img_5.jpg",
    landmark: "Ocean Lagoon • Floating Cork Disc",
    desc: "Magnetize an ordinary steel needle with linear strokes and float it on a lightweight cork disc."
  },
  {
    num: "06",
    id: "magnet_interaction",
    title: "ATTRACTION & REPULSION",
    sub: "Unlike poles attract, like repel",
    x: 70,
    y: 19,
    image: "/ch4_cards/img_6.jpg",
    landmark: "Northern Peaks • Opposing Pole Fields",
    desc: "Investigate magnetic forces: identical poles forcefully repel while opposite poles snap together."
  },
  {
    num: "07",
    id: "activity_4_6",
    title: "COMPASS & MAGNET",
    sub: "Deflect needle with magnetic flux",
    x: 58,
    y: 61,
    image: "/ch4_cards/img_7.jpg",
    landmark: "High Plateau • Brass Mariner Compass",
    desc: "Place an external bar magnet near an antique mariner's compass to deflect its directional needle."
  },
  {
    num: "08",
    id: "activity_4_7",
    title: "THROUGH MATERIALS",
    sub: "Magnetic force through barriers",
    x: 71,
    y: 59,
    image: "/ch4_cards/img_8.jpg",
    landmark: "Testing Grounds • Wood & Glass Slabs",
    desc: "Verify whether magnetic attraction penetrates barrier obstacles like wooden planks and glass sheets."
  },
  {
    num: "09",
    id: "sci6-ch4-sec45-fun-with-magnets",
    title: "FUN WITH MAGNETS",
    sub: "Magnetic carts & runaway tracks",
    x: 80,
    y: 42,
    image: "/ch4_cards/img_9.jpg",
    landmark: "Expedition Trail • Magnetic Carts",
    desc: "Propel and steer miniature wheeled vehicles across obstacle paths using magnetic repelling forces."
  },
  {
    num: "10",
    id: "chapter_4_quiz",
    title: "TEST KNOWLEDGE",
    sub: "20 Questions on Magnetism",
    x: 89,
    y: 72,
    image: "/ch4_cards/img_10.jpg",
    landmark: "Citadel of Terra Incognita",
    desc: "Enter the grand Renaissance observatory citadel for the comprehensive chapter evaluation."
  }
];

// Continuous expedition route coordinates through landmarks with ocean channel sailing path
const ROUTE_WAYPOINTS = [
  { x: 21, y: 23 },
  { x: 37, y: 23 },
  { x: 55, y: 23 },
  { x: 40, y: 47 },
  { x: 30, y: 73 },
  { x: 52, y: 38 }, // Open sea navigation passage around the central rose
  { x: 70, y: 19 },
  { x: 58, y: 61 },
  { x: 71, y: 59 },
  { x: 80, y: 42 },
  { x: 89, y: 72 }
];

// Generate smooth Catmull-Rom to Cubic Bezier curve through all expedition points
function generateSplinePath(points, width = 1376, height = 768) {
  if (!points || points.length < 2) return '';
  const scaled = points.map(p => ({
    x: (p.x / 100) * width,
    y: (p.y / 100) * height
  }));

  let d = `M ${scaled[0].x.toFixed(1)} ${scaled[0].y.toFixed(1)}`;

  for (let i = 0; i < scaled.length - 1; i++) {
    const p0 = scaled[i === 0 ? 0 : i - 1];
    const p1 = scaled[i];
    const p2 = scaled[i + 1];
    const p3 = scaled[i + 2 >= scaled.length ? scaled.length - 1 : i + 2];

    const cp1x = p1.x + (p2.x - p0.x) / 5.2;
    const cp1y = p1.y + (p2.y - p0.y) / 5.2;
    const cp2x = p2.x - (p3.x - p1.x) / 5.2;
    const cp2y = p2.y - (p3.y - p1.y) / 5.2;

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }

  return d;
}

export default function Chapter4Flow({ onBackToDashboard, onLaunchActivity }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const activeWaypoint = WAYPOINTS_DATA.find(w => w.id === (hoveredId || selectedId)) || null;
  const curvedPathString = generateSplinePath(ROUTE_WAYPOINTS, 1376, 768);

  return (
    <div className="nautical-map-viewport">
      {/* 1376:768 Precision Map Stage matching custom illustration aspect ratio */}
      <div className="nautical-map-stage">
        
        {/* Full-bleed Custom Illustrated Nautical Expedition Map Backdrop */}
        <img 
          src="/assets/nautical_expedition_map.jpg" 
          alt="16th Century Antique Nautical Expedition Map" 
          className="map-backdrop-img"
        />

        {/* Ambient Burnt-Edge Vignette Overlay */}
        <div className="map-vignette-overlay" />

        {/* Top Antique Navigation Bar */}
        <header className="map-header-bar">
          {/* Back to Cover Navigation Button */}
          <button 
            onClick={onBackToDashboard}
            className="map-back-btn"
            title="Return to Chapter Cover"
          >
            <ArrowLeft size={16} />
            <span>COVER PAGE</span>
          </button>

          {/* Central Hand-Engraved Plaque */}
          <div className="map-title-plaque">
            <div className="plaque-pin left" />
            <div className="plaque-inner">
              <span className="plaque-tag">GRADE 6 • SCIENCE • CHAPTER 4</span>
              <h1 className="plaque-heading">EXPLORING MAGNETS • EXPEDITION CHART</h1>
            </div>
            <div className="plaque-pin right" />
          </div>

          {/* Expedition Waypoint Counter Pill */}
          <div className="map-counter-pill">
            <Compass size={17} className="counter-icon" />
            <span>10 WAYPOINTS CHARTED</span>
          </div>
        </header>

        {/* Dynamic SVG Expedition Voyage Trail */}
        <svg 
          className="map-expedition-svg" 
          viewBox="0 0 1376 768" 
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="trailDropGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1.5" stdDeviation="2.5" floodColor="#2a1204" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* Underlying Ambient Shadow Track */}
          <path 
            d={curvedPathString} 
            fill="none" 
            stroke="rgba(35, 16, 4, 0.4)" 
            strokeWidth="4.5" 
            strokeLinecap="round" 
          />

          {/* Faint Gold Glow Underlay */}
          <path 
            d={curvedPathString} 
            fill="none" 
            stroke="rgba(245, 158, 11, 0.32)" 
            strokeWidth="3.4" 
            strokeDasharray="6 4" 
            strokeLinecap="round" 
            className="trail-ambient-glow"
          />

          {/* Primary Deep Burnt Umber Dashed Route with Hand-Charted Nautical Aesthetic */}
          <path 
            d={curvedPathString} 
            fill="none" 
            stroke="#4A1E05" 
            strokeWidth="2.2" 
            strokeDasharray="6 4" 
            strokeLinecap="round" 
            className="trail-dashed-route"
            filter="url(#trailDropGlow)"
          />

          {/* Navigational Chart Milestones / Contact Pips */}
          {WAYPOINTS_DATA.map((wp) => (
            <g key={wp.id}>
              <circle 
                cx={(wp.x / 100) * 1376} 
                cy={(wp.y / 100) * 768} 
                r="4.5" 
                fill="#451A03" 
                opacity="0.5" 
              />
              <circle 
                cx={(wp.x / 100) * 1376} 
                cy={(wp.y / 100) * 768} 
                r="2.5" 
                fill="#F59E0B" 
                stroke="#451A03" 
                strokeWidth="1" 
              />
            </g>
          ))}
        </svg>

        {/* 10 Interactive Classic Teardrop Location Pins */}
        <div className="map-waypoints-layer">
          {WAYPOINTS_DATA.map((wp) => {
            const isHovered = hoveredId === wp.id;
            const isSelected = selectedId === wp.id;
            const isOpen = isHovered || isSelected;

            // Smart popover orientation so cards never bleed off-screen
            const isBottomHalf = wp.y > 48;
            const isRightSide = wp.x > 68;
            const isLeftSide = wp.x < 30;

            let popoverPosClass = isBottomHalf ? 'pos-above' : 'pos-below';
            if (isRightSide) popoverPosClass += ' align-right';
            else if (isLeftSide) popoverPosClass += ' align-left';

            return (
              <div
                key={wp.id}
                className={`waypoint-pin-wrapper ${isOpen ? 'is-active' : ''}`}
                style={{ left: `${wp.x}%`, top: `${wp.y}%` }}
                onMouseEnter={() => setHoveredId(wp.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedId(selectedId === wp.id ? null : wp.id)}
              >
                {/* Ground Contact Shadow beneath Pin Tip */}
                <div className="pin-contact-shadow" />

                {/* Classic Teardrop Location Pin Marker */}
                <motion.div 
                  className="teardrop-pin-container"
                  whileHover={{ y: -4 }}
                  whileTap={{ y: 0, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                >
                  <svg 
                    width="34" 
                    height="46" 
                    viewBox="0 0 34 46" 
                    className="teardrop-pin-svg"
                  >
                    <defs>
                      {/* Rich Antique Gold / Burnished Brass Gradient */}
                      <linearGradient id={`pinGrad_${wp.id}`} x1="15%" y1="0%" x2="85%" y2="100%">
                        <stop offset="0%" stopColor="#FFF2A3" />
                        <stop offset="25%" stopColor="#F59E0B" />
                        <stop offset="65%" stopColor="#D97706" />
                        <stop offset="100%" stopColor="#78350F" />
                      </linearGradient>

                      {/* Center Cutout Hole Dark Shadow */}
                      <radialGradient id={`holeGrad_${wp.id}`} cx="45%" cy="40%" r="55%">
                        <stop offset="0%" stopColor="#2A1705" />
                        <stop offset="85%" stopColor="#150901" />
                        <stop offset="100%" stopColor="#0B0501" />
                      </radialGradient>
                    </defs>

                    {/* Classic Teardrop Pin Body pointing directly downward at (17, 46) */}
                    <path
                      d="M 17 46 C 11.5 38 1.5 27 1.5 17 A 15.5 15.5 0 1 1 32.5 17 C 32.5 27 22.5 38 17 46 Z"
                      fill={`url(#pinGrad_${wp.id})`}
                      stroke="#451A03"
                      strokeWidth="1.2"
                    />

                    {/* Specular Highlight Arc on Top-Left Rim */}
                    <path
                      d="M 5 15 A 13 13 0 0 1 25 6"
                      fill="none"
                      stroke="#FFFBEB"
                      strokeWidth="1.2"
                      opacity="0.85"
                    />

                    {/* Center Circular Cutout Hole */}
                    <circle
                      cx="17"
                      cy="17"
                      r="9.5"
                      fill={`url(#holeGrad_${wp.id})`}
                      stroke="#F59E0B"
                      strokeWidth="1.1"
                    />

                    {/* Module Sequence Number (01–10) in Center Hole */}
                    <text
                      x="17"
                      y="21"
                      textAnchor="middle"
                      fill="#FFF2A3"
                      fontSize="10.5"
                      fontWeight="900"
                      fontFamily="'Cinzel', 'Outfit', Georgia, serif"
                      letterSpacing="-0.02em"
                      style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
                    >
                      {wp.num}
                    </text>
                  </svg>
                </motion.div>

                {/* Weathered Parchment Title Tag */}
                <div className="pin-title-tag">
                  <span className="pin-title-text">{wp.title}</span>
                </div>

                {/* Interactive Inspection Popover */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      className={`waypoint-popover-card ${popoverPosClass}`}
                      initial={{ opacity: 0, scale: 0.88, y: isBottomHalf ? 8 : -8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.92, y: isBottomHalf ? 6 : -6 }}
                      transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Corner Rivets */}
                      <div className="card-rivet tl" />
                      <div className="card-rivet tr" />
                      <div className="card-rivet bl" />
                      <div className="card-rivet br" />

                      {/* Header Badge */}
                      <div className="popover-meta-row">
                        <div className="popover-badge">
                          <Sparkles size={11} className="badge-sparkle" />
                          <span>MODULE {wp.num}</span>
                        </div>
                        <span className="popover-landmark-name">{wp.landmark}</span>
                      </div>

                      {/* Photographic Thumbnail */}
                      <div className="popover-img-frame">
                        <img 
                          src={wp.image} 
                          alt={wp.title} 
                          className="popover-img"
                        />
                        <div className="popover-img-vignette" />
                      </div>

                      {/* Headline & Description */}
                      <div className="popover-body">
                        <h3 className="popover-title">{wp.title}</h3>
                        <p className="popover-subtitle">{wp.sub}</p>
                        <p className="popover-desc">{wp.desc}</p>
                      </div>

                      {/* Primary Launch Action Button */}
                      <button 
                        className="popover-action-btn"
                        onClick={() => onLaunchActivity(wp.id)}
                      >
                        <span>ENTER LAB</span>
                        <ArrowRight size={16} />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Status & Quick Launch Bar */}
        <footer className="map-bottom-footer">
          <div className="footer-status-pill">
            <div className="status-live-dot" />
            <span className="status-label">
              {activeWaypoint 
                ? `INSPECTING: MODULE ${activeWaypoint.num} • ${activeWaypoint.title}`
                : "HOVER OR CLICK ANY LOCATION PIN TO INSPECT LAB DETAILS"
              }
            </span>
          </div>

          {/* Quick Direct Launch for First Uncompleted / Selected Activity */}
          <button 
            className="footer-start-btn"
            onClick={() => onLaunchActivity(activeWaypoint ? activeWaypoint.id : 'intro_magnets')}
          >
            <span>{activeWaypoint ? `ENTER ${activeWaypoint.title}` : "START EXPEDITION (01 INTRODUCTION)"}</span>
            <ExternalLink size={16} />
          </button>
        </footer>

      </div>
    </div>
  );
}
