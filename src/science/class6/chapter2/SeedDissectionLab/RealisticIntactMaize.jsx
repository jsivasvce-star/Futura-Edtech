import React from 'react';

/**
 * RealisticIntactMaize
 * Pure SVG/Canvas volumetric render of an intact golden maize kernel (*Zea mays*):
 * - Rounded glossy crown (endosperm)
 * - Tapering caryopsis flanks and tip cap
 * - Creamy shield-shaped embryo indentation (scutellum)
 * - Zero white background box, zero text over image!
 */
export default function RealisticIntactMaize({ width = 160, height = 180, scale = 1 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 160 180"
      fill="none"
      style={{
        transform: `scale(${scale})`,
        transition: 'transform 0.3s ease',
        filter: 'drop-shadow(0 12px 24px rgba(10, 59, 36, 0.3))'
      }}
    >
      <defs>
        {/* Golden translucent endosperm gradient */}
        <linearGradient id="maizeBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="25%" stopColor="#FBBF24" />
          <stop offset="65%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        {/* Shield-shaped Scutellum Embryo Gradient */}
        <linearGradient id="embryoShieldGrad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="40%" stopColor="#FEF3C7" />
          <stop offset="85%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#EAB308" />
        </linearGradient>

        {/* Specular gloss */}
        <linearGradient id="maizeGloss" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* Shadow filter */}
        <filter id="softGrainShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#062E1D" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Main Seed Body Silhouette (Wedge-shaped caryopsis) */}
      <path
        d="M32 36 C54 18, 106 18, 128 36 C144 68, 136 122, 94 154 L66 154 C24 122, 16 68, 32 36 Z"
        fill="url(#maizeBodyGrad)"
        stroke="#B45309"
        strokeWidth="3.5"
        strokeLinejoin="round"
        filter="url(#softGrainShadow)"
      />

      {/* Inner translucent flinty depth */}
      <path
        d="M38 42 C58 26, 102 26, 122 42 C134 72, 128 116, 90 144 L70 144 C32 116, 26 72, 38 42 Z"
        fill="none"
        stroke="rgba(255, 255, 255, 0.45)"
        strokeWidth="2"
      />

      {/* Glossy Crown Highlight */}
      <path
        d="M42 34 C60 22, 100 22, 118 34 C98 28, 62 28, 42 34 Z"
        fill="url(#maizeGloss)"
      />

      {/* EMBRYO INDENTATION (The shield-shaped scutellum containing baby plant) */}
      <path
        d="M62 66 C70 54, 90 54, 98 66 C108 88, 102 120, 80 134 C58 120, 52 88, 62 66 Z"
        fill="url(#embryoShieldGrad)"
        stroke="#CA8A04"
        strokeWidth="2.2"
      />

      {/* Embryo Axis Ridge (Plumule & Radicle vertical line) */}
      <path
        d="M80 62 L80 126"
        stroke="#A16207"
        strokeWidth="2.8"
        strokeLinecap="round"
      />

      {/* Rudimentary Plumule Tip at Top of Axis */}
      <ellipse cx="80" cy="68" rx="4.5" ry="7" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />

      {/* Tip Cap Attachment at Base */}
      <path
        d="M66 153 L94 153 L88 162 L72 162 Z"
        fill="#78350F"
        stroke="#451A03"
        strokeWidth="1.5"
      />

      {/* Specular curved reflection streak */}
      <path
        d="M40 52 C32 80, 36 108, 48 124"
        stroke="rgba(255, 255, 255, 0.55)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
