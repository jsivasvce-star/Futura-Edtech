/* eslint-disable react/prop-types */
import React from 'react';

/**
 * AntiqueCaravel - 16th Century Sailing Caravel (Galleon)
 * Authentically styled for Renaissance cartography with clinker-planked hull,
 * tall wooden masts, billowing canvas sails, Santiago cross emblem, and dynamic wake.
 */
export default function AntiqueCaravel({
  x = 0,
  y = 0,
  angle = 0,
  isSailing = false,
  isAnchored = false,
}) {
  return (
    <g 
      className="antique-caravel-group"
      transform={`translate(${x}, ${y}) rotate(${angle})`}
      style={{ pointerEvents: 'none' }}
    >
      <defs>
        {/* Deep rich hull wood gradients */}
        <linearGradient id="caravelHullDark" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#2A1404" />
          <stop offset="40%" stopColor="#4A2308" />
          <stop offset="80%" stopColor="#78350F" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>

        <linearGradient id="caravelHullUpper" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B45309" />
          <stop offset="50%" stopColor="#78350F" />
          <stop offset="100%" stopColor="#451A03" />
        </linearGradient>

        <linearGradient id="caravelDeckGold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>

        {/* Billowing canvas parchment sail gradients */}
        <radialGradient id="caravelSailShade" cx="45%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#FFFDF7" />
          <stop offset="45%" stopColor="#F5ECE0" />
          <stop offset="85%" stopColor="#E2D2B8" />
          <stop offset="100%" stopColor="#BCA282" />
        </radialGradient>

        <radialGradient id="caravelSailHighlight" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor="#F8F2E6" />
          <stop offset="100%" stopColor="#DBC4A1" />
        </radialGradient>

        {/* Soft parchment ocean drop shadow filter */}
        <filter id="shipOceanShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="5" stdDeviation="4" floodColor="#1a0c03" floodOpacity="0.65" />
        </filter>
      </defs>

      {/* Atmospheric Nautical Wake Waves behind the rudder */}
      {isSailing && (
        <g className="caravel-wake-trails" opacity="0.85">
          {/* Port & Starboard foaming wake trails */}
          <path
            d="M -18 3 C -28 7, -42 14, -58 20"
            fill="none"
            stroke="rgba(255, 252, 240, 0.75)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="4 3"
            className="wake-ripple-left"
          />
          <path
            d="M -18 -3 C -28 -7, -42 -14, -58 -20"
            fill="none"
            stroke="rgba(255, 252, 240, 0.75)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="4 3"
            className="wake-ripple-right"
          />
          {/* Center gold churned water trail */}
          <path
            d="M -16 0 C -26 0, -38 0, -48 0"
            fill="none"
            stroke="rgba(245, 158, 11, 0.45)"
            strokeWidth="1.6"
            strokeDasharray="3 4"
            className="wake-ripple-center"
          />
        </g>
      )}

      {/* Dropped Iron Anchor when Anchored at Landmark */}
      {isAnchored && (
        <g className="caravel-anchor-drop" transform="translate(18, 6) rotate(18)">
          {/* Hemp anchor line */}
          <line x1="0" y1="0" x2="6" y2="15" stroke="#78350F" strokeWidth="1" strokeDasharray="1.5 1.5" />
          {/* Cast Iron Anchor */}
          <g transform="translate(6, 15) scale(0.65)">
            <circle cx="0" cy="0" r="2.5" fill="none" stroke="#2A1705" strokeWidth="1.2" />
            <line x1="0" y1="2" x2="0" y2="12" stroke="#2A1705" strokeWidth="1.6" />
            <line x1="-4" y1="4.5" x2="4" y2="4.5" stroke="#2A1705" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M -6 10 C -4 14, 4 14, 6 10" fill="none" stroke="#2A1705" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M -7 9 L -5 10.5 L -4 8.5 Z" fill="#2A1705" />
            <path d="M 7 9 L 5 10.5 L 4 8.5 Z" fill="#2A1705" />
          </g>
        </g>
      )}

      {/* Main Ship Assembly with Buoyant Pitch & Roll */}
      <g 
        className={`caravel-hull-assembly ${isSailing ? 'is-sailing-rock' : 'is-anchored-bob'}`}
        filter="url(#shipOceanShadow)"
      >
        {/* Keel and Hull Lower Underbody */}
        <path
          d="M -19 4 
             C -20 12, -10 16, 2 16 
             C 16 16, 27 12, 31 3 
             C 21 6, -6 6, -19 4 Z"
          fill="url(#caravelHullDark)"
          stroke="#1F1002"
          strokeWidth="1.2"
        />

        {/* Clinker Wooden Hull Planks (decorative horizontal lines) */}
        <path d="M -17 7 C -4 9, 14 9, 27 5" fill="none" stroke="#1F1002" strokeWidth="0.8" opacity="0.6" />
        <path d="M -15 10 C -2 12, 12 12, 23 8" fill="none" stroke="#1F1002" strokeWidth="0.8" opacity="0.6" />

        {/* Sterncastle (Multi-tiered raised aft castle) */}
        <path
          d="M -21 -2 L -21 -10 L -12 -10 L -12 -2 Z"
          fill="#5B2506"
          stroke="#2A1705"
          strokeWidth="1"
        />
        {/* Stern Gallery Moldings */}
        <line x1="-21" y1="-5.5" x2="-12" y2="-5.5" stroke="#F59E0B" strokeWidth="0.8" />
        {/* Glowing Amber Stern Cabin Lantern Windows */}
        <rect x="-19.5" y="-9" width="2.2" height="3" rx="0.5" fill="#FDE68A" stroke="#451A03" strokeWidth="0.4" />
        <rect x="-16" y="-9" width="2.2" height="3" rx="0.5" fill="#FDE68A" stroke="#451A03" strokeWidth="0.4" />

        {/* Forecastle (Raised triangular bow deck) */}
        <path
          d="M 19 -2 L 25 -7 L 29 -2 Z"
          fill="#5B2506"
          stroke="#2A1705"
          strokeWidth="1"
        />

        {/* Main Deck Sheer & Bulwark Rail */}
        <path
          d="M -21 -2 
             C -10 2, 12 2, 29 -2 
             L 28 3 
             C 12 6, -10 6, -20 3 Z"
          fill="url(#caravelHullUpper)"
          stroke="#3A1C06"
          strokeWidth="1"
        />

        {/* Gilded Waist Rail Accent Line */}
        <path
          d="M -20 0 C -8 3.2, 14 3.2, 28 0"
          fill="none"
          stroke="url(#caravelDeckGold)"
          strokeWidth="1.1"
          strokeLinecap="round"
        />

        {/* Bowsprit Spar with Golden Dragon / Lion Figurehead */}
        <line x1="26" y1="-3" x2="42" y2="-10" stroke="#3A1C06" strokeWidth="2" strokeLinecap="round" />
        <circle cx="41.5" cy="-9.8" r="1.6" fill="#F59E0B" stroke="#78350F" strokeWidth="0.6" />
        {/* Spritsail billowing beneath bowsprit */}
        <path
          d="M 29 -3 C 34 -1, 38 -3, 38 -8 L 33 -6 Z"
          fill="url(#caravelSailShade)"
          stroke="#5C3B1E"
          strokeWidth="0.6"
        />

        {/* 3 Tall Wooden Masts */}
        {/* Mizzenmast (Aft) */}
        <line x1="-9" y1="-2" x2="-9" y2="-21" stroke="#2B1405" strokeWidth="1.6" strokeLinecap="round" />
        {/* Mainmast (Center - Tallest) */}
        <line x1="5" y1="-2" x2="5" y2="-32" stroke="#2B1405" strokeWidth="2.2" strokeLinecap="round" />
        {/* Foremast (Forward) */}
        <line x1="18" y1="-2" x2="18" y2="-25" stroke="#2B1405" strokeWidth="1.8" strokeLinecap="round" />

        {/* Fine Cordage & Standing Rigging Shrouds */}
        <line x1="5" y1="-26" x2="-8" y2="1" stroke="#451A03" strokeWidth="0.6" opacity="0.65" />
        <line x1="5" y1="-26" x2="17" y2="1" stroke="#451A03" strokeWidth="0.6" opacity="0.65" />
        <line x1="18" y1="-20" x2="28" y2="1" stroke="#451A03" strokeWidth="0.6" opacity="0.65" />
        <line x1="-9" y1="-17" x2="-19" y2="-1" stroke="#451A03" strokeWidth="0.6" opacity="0.65" />

        {/* --- Billowing Canvas Sails --- */}

        {/* Mizzen Lateen Sail (Triangular triangular sail) */}
        <path
          d="M -9 -20 L -18 -6 C -13 -8, -5 -8, 0 -6 Z"
          fill="url(#caravelSailShade)"
          stroke="#6B4423"
          strokeWidth="0.8"
        />

        {/* Main Course Sail (Lower Mainsail - Large & Billowing) */}
        <line x1="-5" y1="-9" x2="15" y2="-9" stroke="#3A1C06" strokeWidth="1.4" strokeLinecap="round" />
        <path
          d="M -4 -9 
             C -3 0, 13 0, 14 -9 
             C 10 -7, 0 -7, -4 -9 Z"
          fill="url(#caravelSailHighlight)"
          stroke="#6B4423"
          strokeWidth="0.9"
        />

        {/* Main Topsail (Upper Mainsail) */}
        <line x1="-2" y1="-20" x2="12" y2="-20" stroke="#3A1C06" strokeWidth="1.2" strokeLinecap="round" />
        <path
          d="M -1 -20 
             C 0 -12, 10 -12, 11 -20 
             C 8 -18, 1 -18, -1 -20 Z"
          fill="url(#caravelSailShade)"
          stroke="#6B4423"
          strokeWidth="0.8"
        />

        {/* Santiago Navigational Cross Emblem on Topsail */}
        <g transform="translate(5, -16) scale(0.7)">
          <path
            d="M -3 -1 L -1 -1 L -1 -3 L 1 -3 L 1 -1 L 3 -1 L 3 1 L 1 1 L 1 3 L -1 3 L -1 1 L -3 1 Z"
            fill="#B91C1C"
            opacity="0.9"
          />
        </g>

        {/* Foresail (Foremast Course Sail) */}
        <line x1="11" y1="-9" x2="25" y2="-9" stroke="#3A1C06" strokeWidth="1.2" strokeLinecap="round" />
        <path
          d="M 12 -9 
             C 13 -1, 23 -1, 24 -9 
             C 21 -7, 15 -7, 12 -9 Z"
          fill="url(#caravelSailHighlight)"
          stroke="#6B4423"
          strokeWidth="0.8"
        />

        {/* Crow's Nest Lookout Platform on Mainmast */}
        <path d="M 2.5 -24 L 7.5 -24 L 7 -21.5 L 3 -21.5 Z" fill="#4A2308" stroke="#2A1705" strokeWidth="0.6" />

        {/* Fluttering Crimson & Gold Masthead Swallowtail Pennants */}
        <path
          d="M 5 -32 Q 12 -33, 18 -31 L 15 -29 L 20 -27 Q 12 -30, 5 -30.5 Z"
          fill="#DC2626"
          stroke="#991B1B"
          strokeWidth="0.5"
          className="caravel-pennant-flutter"
        />
        <path
          d="M 18 -25 Q 23 -26, 28 -24 L 25 -22.5 L 29 -21 Q 23 -23.5, 18 -24 Z"
          fill="#F59E0B"
          stroke="#B45309"
          strokeWidth="0.5"
          className="caravel-pennant-flutter"
        />
      </g>
    </g>
  );
}
