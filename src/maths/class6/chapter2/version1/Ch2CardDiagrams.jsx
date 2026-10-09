import React from 'react';

/**
 * Ultra-HD Precision Mathematical Diagrams for Chapter 2 Flow Cards
 * Pure SVG Vector rendering for 100% crystal-clear, pixel-free visual quality at any screen resolution.
 */

export function DiagramPoint() {
  return (
    <svg viewBox="0 0 200 110" className="ch2-card-svg-diagram" aria-hidden="true">
      <defs>
        <pattern id="grid_point" width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M 14 0 L 0 0 0 14" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
        </pattern>
        <radialGradient id="grad_point" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="50%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </radialGradient>
        <filter id="shadow_point" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="rgba(0,0,0,0.5)" />
        </filter>
      </defs>
      <rect x="8" y="8" width="184" height="94" rx="10" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.24)" strokeWidth="1.2" />
      <rect x="8" y="8" width="184" height="94" rx="10" fill="url(#grid_point)" />
      {/* Point A */}
      <g transform="translate(85, 60)">
        <circle cx="0" cy="0" r="9.5" fill="url(#grad_point)" filter="url(#shadow_point)" />
        <circle cx="-2.5" cy="-2.5" r="3" fill="#FFFFFF" opacity="0.85" />
        <text x="0" y="-17" textAnchor="middle" fontWeight="900" fontSize="22" fill="#FFFFFF" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.7))">A</text>
      </g>
      {/* Drafting Pen */}
      <g transform="translate(145, 22) rotate(-40)" filter="url(#shadow_point)">
        <rect x="-8" y="0" width="16" height="75" rx="3" fill="#1D4ED8" stroke="#1E40AF" strokeWidth="1.2" />
        <rect x="-5" y="8" width="10" height="60" rx="2" fill="#3B82F6" opacity="0.7" />
        <rect x="-8" y="65" width="16" height="7" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" />
        <path d="M -8 72 L 8 72 L 2.5 95 L -2.5 95 Z" fill="#94A3B8" />
        <path d="M -2.5 95 L 2.5 95 L 1 103 L -1 103 Z" fill="#475569" />
        <circle cx="0" cy="103.5" r="1.5" fill="#0F172A" />
      </g>
    </svg>
  );
}

export function DiagramLineSegment() {
  return (
    <svg viewBox="0 0 200 110" className="ch2-card-svg-diagram" aria-hidden="true">
      <defs>
        <pattern id="grid_lineseg" width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M 14 0 L 0 0 0 14" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
        </pattern>
        <radialGradient id="sphere_red" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FCA5A5" />
          <stop offset="45%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#991B1B" />
        </radialGradient>
        <filter id="shadow_lineseg" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="rgba(0,0,0,0.5)" />
        </filter>
      </defs>
      <rect x="8" y="8" width="184" height="94" rx="10" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />
      <rect x="8" y="8" width="184" height="94" rx="10" fill="url(#grid_lineseg)" />
      <g transform="translate(18, 52)" filter="url(#shadow_lineseg)">
        <line x1="25" y1="0" x2="135" y2="0" stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" />
        <line x1="25" y1="0" x2="135" y2="0" stroke="#FFFFFF" strokeWidth="1.8" opacity="0.6" strokeLinecap="round" />
        {/* Endpoint A */}
        <circle cx="25" cy="0" r="10" fill="url(#sphere_red)" />
        <circle cx="22" cy="-3" r="3" fill="#FFFFFF" opacity="0.85" />
        <text x="25" y="27" textAnchor="middle" fontWeight="900" fontSize="18" fill="#FFFFFF" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.7))">A</text>
        {/* Endpoint B */}
        <circle cx="135" cy="0" r="10" fill="url(#sphere_red)" />
        <circle cx="132" cy="-3" r="3" fill="#FFFFFF" opacity="0.85" />
        <text x="135" y="27" textAnchor="middle" fontWeight="900" fontSize="18" fill="#FFFFFF" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.7))">B</text>
      </g>
    </svg>
  );
}

export function DiagramLine() {
  return (
    <svg viewBox="0 0 200 110" className="ch2-card-svg-diagram" aria-hidden="true">
      <defs>
        <radialGradient id="sphere_pt3" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#E0E7FF" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#312E81" />
        </radialGradient>
        <filter id="shadow_line" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="rgba(0,0,0,0.5)" />
        </filter>
      </defs>
      <g transform="translate(10, 52)" filter="url(#shadow_line)">
        <line x1="22" y1="0" x2="158" y2="0" stroke="#38BDF8" strokeWidth="5.5" strokeLinecap="round" />
        <line x1="22" y1="0" x2="158" y2="0" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
        {/* Double-sided arrowheads */}
        <path d="M 32 -10 L 12 0 L 32 10 Z" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1.2" />
        <path d="M 148 -10 L 168 0 L 148 10 Z" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1.2" />
        {/* Points A and B */}
        <circle cx="62" cy="0" r="8" fill="url(#sphere_pt3)" stroke="#FFFFFF" strokeWidth="1.2" />
        <text x="62" y="27" textAnchor="middle" fontWeight="900" fontSize="18" fill="#FFFFFF" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.7))">A</text>
        <circle cx="118" cy="0" r="8" fill="url(#sphere_pt3)" stroke="#FFFFFF" strokeWidth="1.2" />
        <text x="118" y="27" textAnchor="middle" fontWeight="900" fontSize="18" fill="#FFFFFF" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.7))">B</text>
      </g>
    </svg>
  );
}

export function DiagramRay() {
  return (
    <svg viewBox="0 0 200 110" className="ch2-card-svg-diagram" aria-hidden="true">
      <defs>
        <radialGradient id="sphere_amber" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#78350F" />
        </radialGradient>
        <filter id="shadow_ray" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="rgba(0,0,0,0.5)" />
        </filter>
      </defs>
      <g transform="translate(15, 52)" filter="url(#shadow_ray)">
        <line x1="25" y1="0" x2="150" y2="0" stroke="#FDE047" strokeWidth="5.5" strokeLinecap="round" />
        <line x1="25" y1="0" x2="150" y2="0" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        <path d="M 140 -10 L 160 0 L 140 10 Z" fill="#FDE047" stroke="#FFFFFF" strokeWidth="1.2" />
        {/* Origin A */}
        <circle cx="25" cy="0" r="10" fill="url(#sphere_amber)" />
        <circle cx="22" cy="-3" r="3" fill="#FFFFFF" opacity="0.85" />
        <text x="25" y="27" textAnchor="middle" fontWeight="900" fontSize="18" fill="#FFFFFF" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.7))">A</text>
        {/* Intermediate Point B */}
        <circle cx="95" cy="0" r="7.5" fill="url(#sphere_amber)" stroke="#FFFFFF" strokeWidth="1" />
        <text x="95" y="27" textAnchor="middle" fontWeight="900" fontSize="18" fill="#FFFFFF" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.7))">B</text>
      </g>
    </svg>
  );
}

export function DiagramAngle() {
  return (
    <svg viewBox="0 0 200 110" className="ch2-card-svg-diagram" aria-hidden="true">
      <defs>
        <radialGradient id="sphere_pink" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FCE7F3" />
          <stop offset="50%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#831843" />
        </radialGradient>
        <filter id="shadow_angle" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="rgba(0,0,0,0.5)" />
        </filter>
      </defs>
      <g transform="translate(100, 78)" opacity="0.32">
        <path d="M -75 0 A 75 75 0 0 1 75 0 Z" fill="rgba(255,255,255,0.18)" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="-70" y1="0" x2="70" y2="0" stroke="#FFFFFF" strokeWidth="1.2" />
        <line x1="0" y1="-70" x2="0" y2="-60" stroke="#FFFFFF" strokeWidth="1.2" />
        <line x1="50" y1="-50" x2="43" y2="-43" stroke="#FFFFFF" strokeWidth="1.2" />
      </g>
      <g transform="translate(35, 78)" filter="url(#shadow_angle)">
        <line x1="0" y1="0" x2="135" y2="0" stroke="#F43F5E" strokeWidth="5" strokeLinecap="round" />
        <path d="M 125 -6 L 138 0 L 125 6 Z" fill="#F43F5E" />
        <line x1="0" y1="0" x2="105" y2="-58" stroke="#F43F5E" strokeWidth="5" strokeLinecap="round" />
        <path d="M 94 -61 L 110 -61 L 102 -48 Z" fill="#F43F5E" />
        <path d="M 45 0 A 45 45 0 0 0 38 -24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />
        <circle cx="0" cy="0" r="9" fill="url(#sphere_pink)" />
        <circle cx="-2" cy="-2" r="2.5" fill="#FFFFFF" />
        <text x="62" y="-12" fontWeight="900" fontSize="18" fill="#FFFFFF" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.7))">θ₁</text>
      </g>
    </svg>
  );
}

export function DiagramComparingAngles() {
  return (
    <svg viewBox="0 0 200 110" className="ch2-card-svg-diagram" aria-hidden="true">
      <g transform="translate(20, 80)">
        <line x1="0" y1="0" x2="70" y2="0" stroke="#38BDF8" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M 64 -5 L 74 0 L 64 5 Z" fill="#38BDF8" />
        <line x1="0" y1="0" x2="58" y2="-36" stroke="#38BDF8" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M 49 -38 L 62 -39 L 57 -28 Z" fill="#38BDF8" />
        <path d="M 26 0 A 26 26 0 0 0 22 -14" fill="none" stroke="#FFFFFF" strokeWidth="2" />
        <circle cx="0" cy="0" r="6" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1.5" />
        <text x="36" y="-8" fontWeight="900" fontSize="16" fill="#FFFFFF">θ₁</text>
      </g>
      <g transform="translate(110, 80)">
        <line x1="0" y1="0" x2="70" y2="0" stroke="#4ADE80" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M 64 -5 L 74 0 L 64 5 Z" fill="#4ADE80" />
        <line x1="0" y1="0" x2="42" y2="-58" stroke="#4ADE80" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M 34 -56 L 44 -62 L 43 -50 Z" fill="#4ADE80" />
        <path d="M 26 0 A 26 26 0 0 0 15 -21" fill="none" stroke="#FFFFFF" strokeWidth="2" />
        <circle cx="0" cy="0" r="6" fill="#4ADE80" stroke="#FFFFFF" strokeWidth="1.5" />
        <text x="32" y="-14" fontWeight="900" fontSize="16" fill="#FFFFFF">θ₂</text>
      </g>
    </svg>
  );
}

export function DiagramRotatingArms() {
  return (
    <svg viewBox="0 0 200 110" className="ch2-card-svg-diagram" aria-hidden="true">
      <defs>
        <radialGradient id="dial_grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#BAE6FD" />
          <stop offset="60%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </radialGradient>
        <radialGradient id="metal_pivot" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#475569" />
        </radialGradient>
      </defs>
      <g transform="translate(115, 68)">
        <circle cx="0" cy="0" r="50" fill="url(#dial_grad)" opacity="0.3" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="0" y1="-50" x2="0" y2="-43" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="50" y1="0" x2="43" y2="0" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="-50" y1="0" x2="-43" y2="0" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="35" y1="-35" x2="30" y2="-30" stroke="#FFFFFF" strokeWidth="1.2" />
        {/* Base Arm */}
        <rect x="0" y="-5" width="60" height="10" rx="5" fill="#1E40AF" stroke="#60A5FA" strokeWidth="1.5" />
        {/* Rotating Arm */}
        <g transform="rotate(-48)">
          <rect x="0" y="-5.5" width="64" height="11" rx="5.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="54" cy="0" r="2.5" fill="#93C5FD" />
        </g>
        {/* Rotation motion arc */}
        <path d="M 32 -6 A 32 32 0 0 0 23 -22" fill="none" stroke="#FDE047" strokeWidth="2" strokeDasharray="2.5,2.5" />
        <path d="M 23 -26 L 25 -20 L 19 -23 Z" fill="#FDE047" />
        {/* Pivot */}
        <circle cx="0" cy="0" r="10" fill="url(#metal_pivot)" stroke="#1E293B" strokeWidth="1" />
        <circle cx="0" cy="0" r="3.5" fill="#0F172A" />
      </g>
    </svg>
  );
}

export function DiagramSpecialAngles() {
  return (
    <svg viewBox="0 0 200 110" className="ch2-card-svg-diagram" aria-hidden="true">
      {/* Acute */}
      <g transform="translate(18, 80)">
        <line x1="0" y1="0" x2="42" y2="0" stroke="#22D3EE" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="0" y1="0" x2="34" y2="-28" stroke="#22D3EE" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M 15 0 A 15 15 0 0 0 12 -10" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="4" fill="#22D3EE" />
      </g>
      {/* Right Angle 90 with square corner */}
      <g transform="translate(85, 80)">
        <line x1="0" y1="0" x2="44" y2="0" stroke="#C084FC" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="0" y1="0" x2="0" y2="-44" stroke="#C084FC" strokeWidth="4.5" strokeLinecap="round" />
        <rect x="0" y="-15" width="15" height="15" fill="rgba(255,255,255,0.25)" stroke="#FFFFFF" strokeWidth="1.8" />
        <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" />
      </g>
      {/* Obtuse */}
      <g transform="translate(155, 80)">
        <line x1="0" y1="0" x2="38" y2="0" stroke="#FBBF24" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="0" y1="0" x2="-26" y2="-28" stroke="#FBBF24" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M 15 0 A 15 15 0 0 0 -10 -10" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="4" fill="#FBBF24" />
      </g>
    </svg>
  );
}

export function DiagramMeasuringAngles() {
  return (
    <svg viewBox="0 0 200 110" className="ch2-card-svg-diagram" aria-hidden="true">
      <g transform="translate(100, 85)">
        <path d="M -80 0 A 80 80 0 0 1 80 0 Z" fill="rgba(255,255,255,0.38)" stroke="#FFFFFF" strokeWidth="2" />
        <path d="M -40 0 A 40 40 0 0 1 40 0 Z" fill="rgba(15,23,42,0.18)" stroke="#FFFFFF" strokeWidth="1.2" />
        <line x1="-80" y1="0" x2="80" y2="0" stroke="#FFFFFF" strokeWidth="1.8" />
        <circle cx="0" cy="0" r="3.5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="0" y1="-80" x2="0" y2="-70" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="56" y1="-56" x2="49" y2="-49" stroke="#FFFFFF" strokeWidth="1.2" />
        <line x1="-56" y1="-56" x2="-49" y2="-49" stroke="#FFFFFF" strokeWidth="1.2" />
        <text x="0" y="-58" fontWeight="900" fontSize="12" fill="#FFFFFF" textAnchor="middle">90°</text>
        <text x="44" y="-30" fontWeight="800" fontSize="10" fill="#FFFFFF" textAnchor="middle">45°</text>
        <text x="-44" y="-30" fontWeight="800" fontSize="10" fill="#FFFFFF" textAnchor="middle">135°</text>
      </g>
      <g transform="translate(145, 92) rotate(-20)">
        <rect x="0" y="-4" width="65" height="8" rx="1.5" fill="#FACC15" stroke="#EAB308" strokeWidth="1" />
        <path d="M 0 -4 L -15 0 L 0 4 Z" fill="#FDE68A" />
        <path d="M -10 -2 L -15 0 L -10 2 Z" fill="#1E293B" />
        <rect x="60" y="-4" width="7" height="8" rx="1.5" fill="#F472B6" />
      </g>
    </svg>
  );
}

export function DiagramDrawingAngles() {
  return (
    <svg viewBox="0 0 200 110" className="ch2-card-svg-diagram" aria-hidden="true">
      <defs>
        <pattern id="grid_draw" width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M 12 0 L 0 0 0 12" fill="none" stroke="rgba(56,189,248,0.22)" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect x="8" y="8" width="184" height="94" rx="10" fill="rgba(14,165,233,0.12)" stroke="rgba(56,189,248,0.25)" strokeWidth="1.2" />
      <rect x="8" y="8" width="184" height="94" rx="10" fill="url(#grid_draw)" />
      <path d="M 115 25 L 185 85 L 115 85 Z" fill="rgba(56,189,248,0.18)" stroke="#38BDF8" strokeWidth="1.5" />
      <path d="M 85 80 A 45 45 0 0 0 125 50" fill="none" stroke="#FDE047" strokeWidth="2" strokeDasharray="3,3" />
      <g transform="translate(100, 20)">
        <circle cx="0" cy="0" r="8" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
        <rect x="-2.5" y="-12" width="5" height="8" rx="2" fill="#0284C7" />
        <g transform="rotate(18)">
          <rect x="-3" y="0" width="6" height="58" rx="1.5" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
          <path d="M -2 58 L 2 58 L 0 70 Z" fill="#64748B" />
        </g>
        <g transform="rotate(-26)">
          <rect x="-3" y="0" width="6" height="52" rx="1.5" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
          <rect x="-3.5" y="38" width="7" height="20" rx="1" fill="#0284C7" />
          <path d="M -2 58 L 2 58 L 0 68 Z" fill="#0F172A" />
        </g>
      </g>
    </svg>
  );
}

export function DiagramTypesOfAngles() {
  return (
    <svg viewBox="0 0 200 110" className="ch2-card-svg-diagram" aria-hidden="true">
      <g transform="translate(115, 60)">
        <path d="M 0 0 L 45 0 A 45 45 0 0 0 0 -45 Z" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1.5" />
        <path d="M 0 0 L 0 -45 A 45 45 0 0 0 -45 0 Z" fill="#EC4899" stroke="#FFFFFF" strokeWidth="1.5" />
        <path d="M 0 0 L -45 0 A 45 45 0 0 0 0 45 Z" fill="#FACC15" stroke="#FFFFFF" strokeWidth="1.5" />
        <path d="M 0 0 L 0 45 A 45 45 0 0 0 45 0 Z" fill="#FB923C" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="9" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="3.5" fill="#0D9488" />
        <text x="0" y="-52" fontWeight="900" fontSize="13" fill="#FFFFFF" textAnchor="middle" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.7))">90°</text>
        <text x="-54" y="4" fontWeight="900" fontSize="13" fill="#FFFFFF" textAnchor="end" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.7))">180°</text>
        <text x="54" y="4" fontWeight="900" fontSize="13" fill="#FFFFFF" textAnchor="start" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.7))">360°</text>
      </g>
    </svg>
  );
}

export function DiagramQuiz() {
  return (
    <svg viewBox="0 0 200 110" className="ch2-card-svg-diagram" aria-hidden="true">
      <defs>
        <radialGradient id="gold_q" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="45%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </radialGradient>
      </defs>
      <g transform="translate(48, 16)">
        <rect x="0" y="0" width="68" height="88" rx="8" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.8" />
        <rect x="22" y="-6" width="24" height="10" rx="3" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.2" />
        <rect x="5" y="8" width="58" height="74" rx="4" fill="#FFFFFF" />
        <g transform="translate(8, 16)">
          <rect x="0" y="0" width="10" height="10" rx="2" fill="#DCFCE7" stroke="#22C55E" strokeWidth="1" />
          <path d="M 2 5 L 4 7 L 8 3" fill="none" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="14" y="3" width="32" height="4" rx="2" fill="#E2E8F0" />
        </g>
        <g transform="translate(8, 30)">
          <rect x="0" y="0" width="10" height="10" rx="2" fill="#DCFCE7" stroke="#22C55E" strokeWidth="1" />
          <path d="M 2 5 L 4 7 L 8 3" fill="none" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="14" y="3" width="28" height="4" rx="2" fill="#E2E8F0" />
        </g>
        <g transform="translate(8, 44)">
          <rect x="0" y="0" width="10" height="10" rx="2" fill="#DCFCE7" stroke="#22C55E" strokeWidth="1" />
          <path d="M 2 5 L 4 7 L 8 3" fill="none" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="14" y="3" width="30" height="4" rx="2" fill="#E2E8F0" />
        </g>
        <g transform="translate(8, 58)">
          <rect x="0" y="0" width="10" height="10" rx="2" fill="#DCFCE7" stroke="#22C55E" strokeWidth="1" />
          <path d="M 2 5 L 4 7 L 8 3" fill="none" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="14" y="3" width="24" height="4" rx="2" fill="#E2E8F0" />
        </g>
      </g>
      <g transform="translate(145, 60)">
        <text x="0" y="20" fontWeight="900" fontSize="62" fill="url(#gold_q)" stroke="#FFFFFF" strokeWidth="2" textAnchor="middle" filter="drop-shadow(0 2px 5px rgba(0,0,0,0.6))">?</text>
      </g>
    </svg>
  );
}

export const DIAGRAM_COMPONENTS = {
  '2.1': DiagramPoint,
  '2.2': DiagramLineSegment,
  '2.3': DiagramLine,
  '2.4': DiagramRay,
  '2.5': DiagramAngle,
  '2.6': DiagramComparingAngles,
  '2.7': DiagramRotatingArms,
  '2.8': DiagramSpecialAngles,
  '2.9': DiagramMeasuringAngles,
  '2.10': DiagramDrawingAngles,
  '2.11': DiagramTypesOfAngles,
  'quiz': DiagramQuiz
};
