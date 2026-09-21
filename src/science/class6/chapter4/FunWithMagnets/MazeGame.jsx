import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Move, Compass, RotateCcw, HelpCircle, ArrowLeft, ArrowRight } from 'lucide-react';

// -------------------------------------------------------------------
// 1. Exact Waypoint Node Coordinate System for 3D Railway Grid Map
// -------------------------------------------------------------------
export const WAYPOINT_NODES = [
  // ── ROW 0: TOP RAILWAY TRACK (Y = 31) ──
  { id: 'node_0_0', name: 'Start: Top-Left Junction 🚉', shortName: 'Start', icon: '🚉', x: 34, y: 31, neighbors: ['node_0_1', 'node_1_0'] },
  { id: 'node_0_1', name: 'Hospital North Track 🏥', shortName: 'Hosp N', icon: '🏥', x: 274, y: 31, neighbors: ['node_0_0', 'node_0_2', 'node_1_1'] },
  { id: 'node_0_2', name: 'Solar Junction ☀️', shortName: 'Solar N', icon: '☀️', x: 512, y: 31, neighbors: ['node_0_1', 'node_0_3', 'node_1_2'] },
  { id: 'node_0_3', name: 'Depot North Track 🚂', shortName: 'Depot N', icon: '🚂', x: 750, y: 31, neighbors: ['node_0_2', 'node_0_4', 'node_1_3'] },
  { id: 'node_0_4', name: 'North-East Corner 🌐', shortName: 'NE Term', icon: '🌐', x: 990, y: 31, neighbors: ['node_0_3', 'node_1_4'] },

  // ── ROW 1: SECOND HORIZONTAL TRACK (Y = 272) ──
  { id: 'node_1_0', name: 'Power Plant West Track ⚡', shortName: 'Power W', icon: '⚡', x: 34, y: 272, neighbors: ['node_0_0', 'node_2_0', 'node_1_1'] },
  { id: 'node_1_1', name: 'Stadium Junction 🏟️', shortName: 'Stadium', icon: '🏟️', x: 274, y: 272, neighbors: ['node_1_0', 'node_0_1', 'node_1_2', 'node_2_1'] },
  { id: 'node_1_2', name: 'Financial Towers Hub 🏢', shortName: 'Towers', icon: '🏢', x: 512, y: 272, neighbors: ['node_1_1', 'node_0_2', 'node_1_3', 'node_2_2'] },
  { id: 'node_1_3', name: 'Harbor Bay Track 🚢', shortName: 'Harbor', icon: '🚢', x: 750, y: 272, neighbors: ['node_1_2', 'node_0_3', 'node_1_4', 'node_2_3'] },
  { id: 'node_1_4', name: 'East Coast Track 🌊', shortName: 'East Coast', icon: '🌊', x: 990, y: 272, neighbors: ['node_0_4', 'node_1_3', 'node_2_4'] },

  // ── ROW 2: CENTRAL HORIZONTAL TRACK (Y = 512) ──
  { id: 'node_2_0', name: 'Fire Station Track 🚒', shortName: 'Fire Sta', icon: '🚒', x: 34, y: 512, neighbors: ['node_1_0', 'node_3_0', 'node_2_1'] },
  { id: 'node_2_1', name: 'Academy Junction 🏫', shortName: 'Academy', icon: '🏫', x: 274, y: 512, neighbors: ['node_2_0', 'node_1_1', 'node_2_2', 'node_3_1'] },
  { id: 'node_2_2', name: 'Power Grid Central ⚡', shortName: 'Grid Core', icon: '⚡', x: 512, y: 512, neighbors: ['node_2_1', 'node_1_2', 'node_2_3', 'node_3_2'] },
  { id: 'node_2_3', name: 'Logistics Warehouse Track 📦', shortName: 'Logistics', icon: '📦', x: 750, y: 512, neighbors: ['node_2_2', 'node_1_3', 'node_2_4', 'node_3_3'] },
  { id: 'node_2_4', name: 'East Perimeter Track 🚧', shortName: 'East Gate', icon: '🚧', x: 990, y: 512, neighbors: ['node_1_4', 'node_2_3', 'node_3_4'] },

  // ── ROW 3: FOURTH HORIZONTAL TRACK (Y = 751) ──
  { id: 'node_3_0', name: 'Suburban West Track 🏡', shortName: 'Suburban', icon: '🏡', x: 34, y: 751, neighbors: ['node_2_0', 'node_4_0', 'node_3_1'] },
  { id: 'node_3_1', name: 'Bio-Sphere Dome Junction 🌿', shortName: 'Bio-Sphere', icon: '🌿', x: 274, y: 751, neighbors: ['node_3_0', 'node_2_1', 'node_3_2', 'node_4_1'] },
  { id: 'node_3_2', name: 'Airport Gateway Track ✈️', shortName: 'Airport', icon: '✈️', x: 512, y: 751, neighbors: ['node_3_1', 'node_2_2', 'node_3_3', 'node_4_2'] },
  { id: 'node_3_3', name: 'Memorial Parkside Track ⛲', shortName: 'Parkside', icon: '⛲', x: 750, y: 751, neighbors: ['node_3_2', 'node_2_3', 'node_3_4', 'node_4_3'] },
  { id: 'node_3_4', name: 'South-East Perimeter 🌲', shortName: 'SE Perim', icon: '🌲', x: 990, y: 751, neighbors: ['node_2_4', 'node_3_3', 'node_4_4'] },

  // ── ROW 4: BOTTOM HORIZONTAL TRACK (Y = 990) ──
  { id: 'node_4_0', name: 'South-West Outer Corner 🏁', shortName: 'SW Corner', icon: '🏁', x: 34, y: 990, neighbors: ['node_3_0', 'node_4_1'] },
  { id: 'node_4_1', name: 'Garden South Track 🌷', shortName: 'Garden S', icon: '🌷', x: 274, y: 990, neighbors: ['node_4_0', 'node_3_1', 'node_4_2'] },
  { id: 'node_4_2', name: 'Runway South Track 🛫', shortName: 'Runway S', icon: '🛫', x: 512, y: 990, neighbors: ['node_4_1', 'node_3_2', 'node_4_3'] },
  { id: 'node_4_3', name: 'Grand Promenade Track 🏛️', shortName: 'Promenade', icon: '🏛️', x: 750, y: 990, neighbors: ['node_4_2', 'node_3_3', 'node_4_4'] },
  { id: 'node_4_4', name: 'Target: Bottom-Right Corner 🎯', shortName: 'Goal 🎯', icon: '🎯', x: 990, y: 990, neighbors: ['node_3_4', 'node_4_3'] }
];

export const NODES_MAP = Object.fromEntries(WAYPOINT_NODES.map(n => [n.id, n]));

// -------------------------------------------------------------------
// 2. BFS Pathfinding strictly along connected railway track network
// -------------------------------------------------------------------
function findShortestPath(startId, targetId) {
  if (startId === targetId) return [startId];
  const queue = [[startId]];
  const visited = new Set([startId]);

  while (queue.length > 0) {
    const path = queue.shift();
    const currentId = path[path.length - 1];
    const node = NODES_MAP[currentId];
    if (!node) continue;

    for (const neighborId of node.neighbors) {
      if (neighborId === targetId) {
        return [...path, neighborId];
      }
      if (!visited.has(neighborId)) {
        visited.add(neighborId);
        queue.push([...path, neighborId]);
      }
    }
  }
  return null;
}

// Single Mission from Top-Left Corner (node_0_0) to Bottom-Right Corner (node_4_4)
export const MISSIONS = [
  {
    id: 1,
    title: "Magnetic Train Expedition: Top-Left to Bottom-Right",
    desc: "Guide the magnetic transit train along the 3D railway tracks using the handheld guiding magnet to reach the destination beacon at Bottom-Right Corner 🎯!",
    start: 'node_0_0',
    target: 'node_4_4'
  }
];

export const BUILDING_NAMEPLATES = [];

// Helper: Direction mapping for D-Pad
export function getAvailableDirections(nodeId) {
  const node = NODES_MAP[nodeId];
  if (!node) return {};
  const dirs = {};
  node.neighbors.forEach(nId => {
    const neighbor = NODES_MAP[nId];
    if (!neighbor) return;
    const dx = neighbor.x - node.x;
    const dy = neighbor.y - node.y;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) dirs['E'] = nId;
      else dirs['W'] = nId;
    } else {
      if (dy > 0) dirs['S'] = nId;
      else dirs['N'] = nId;
    }
  });
  return dirs;
}

// Global audio context singleton for immediate low-latency, high-volume sound playback
let sharedAudioCtx = null;
function getAudioContext() {
  if (!sharedAudioCtx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) sharedAudioCtx = new AudioCtx();
  }
  if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume();
  }
  return sharedAudioCtx;
}

// -------------------------------------------------------------------
// Train & Electrical Audio Functions (Silenced per requirement)
// -------------------------------------------------------------------
export function playElectricLightningSound() {}
export const playRealisticTrainSound = () => {};
export const playElectricZapSound = () => {};

// -------------------------------------------------------------------
// 3. SVG Realistic Magnetic Train Sprite (1 Engine + 1 Compartment)
// -------------------------------------------------------------------
const MagneticTrainSprite = ({ x, y, rotation, isMoving, now }) => {
  const deg = (rotation * 180 / Math.PI);
  const pulse = 1 + 0.15 * Math.sin(now * 0.012);

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Scaled slightly larger (~22% increase) for enhanced visibility and detail */}
      <g transform={`rotate(${deg}) scale(1.22)`}>
        {/* 1. Ground Footprint Ambient Shadow */}
        <ellipse
          cx="-10"
          cy="0"
          rx="46"
          ry="10"
          fill="rgba(28, 25, 23, 0.65)"
          style={{ filter: 'blur(2.5px)' }}
        />

        {/* 2. Warm Amber Maglev Levitation Track Induction Field (blending with environment) */}
        <ellipse
          cx="-10"
          cy="0"
          rx={isMoving ? 44 : 40}
          ry={isMoving ? 9 : 7.5}
          fill="rgba(245, 158, 11, 0.32)"
          style={{ filter: 'blur(3px)' }}
        />

        {/* 3. Projected Warm Golden Headlight Cones on Track Rails */}
        <polygon
          points="20,-4 75,-16 75,16 20,4"
          fill="url(#headlightBeamGrad)"
          opacity={isMoving ? 0.88 : 0.55}
          pointerEvents="none"
        />

        {/* 4. TRAIN COMPARTMENT (Observation Coach - Warm Architectural Bronze & Slate) */}
        <g transform="translate(-22, 0)">
          {/* Undercarriage Maglev Bogie Skids */}
          <rect x="-17" y="-7.5" width="34" height="15" rx="3.5" fill="#1C1917" stroke="#44403C" strokeWidth="0.8" />
          
          {/* Coach Main Body (Aerodynamic Streamlined Shell) */}
          <rect x="-16" y="-6.5" width="32" height="13" rx="4" fill="url(#trainCoachGrad)" stroke="#292524" strokeWidth="0.8" />

          {/* Emerald / Gold Livery Racing Stripe */}
          <line x1="-15" y1="-0.5" x2="15" y2="-0.5" stroke="#059669" strokeWidth="2.2" />
          <line x1="-15" y1="1.4" x2="15" y2="1.4" stroke="#214A70" strokeWidth="0.8" />

          {/* Roof Aero Air Intake / Solar Ribs */}
          <rect x="-12" y="-5.5" width="24" height="2" rx="1" fill="#57534E" />

          {/* Panoramic Passenger Windows (Champagne-Tinted Architectural Glass) */}
          <rect x="-13" y="-5" width="5" height="3" rx="0.8" fill="#FEF3C7" stroke="#B45309" strokeWidth="0.6" />
          <rect x="-6" y="-5" width="5" height="3" rx="0.8" fill="#FEF3C7" stroke="#B45309" strokeWidth="0.6" />
          <rect x="1" y="-5" width="5" height="3" rx="0.8" fill="#FEF3C7" stroke="#B45309" strokeWidth="0.6" />
          <rect x="8" y="-5" width="5" height="3" rx="0.8" fill="#FEF3C7" stroke="#B45309" strokeWidth="0.6" />

          {/* Rear Red Marker Tail Lights */}
          <circle cx="-15.5" cy="-4" r="1.2" fill="#EF4444" style={{ filter: 'drop-shadow(0 0 3px #EF4444)' }} />
          <circle cx="-15.5" cy="4" r="1.2" fill="#EF4444" style={{ filter: 'drop-shadow(0 0 3px #EF4444)' }} />
        </g>

        {/* 5. INTER-CAR ACCORDION GANGWAY COUPLER (Between Compartment & Engine) */}
        <g transform="translate(-5, 0)">
          <rect x="-3" y="-5" width="6" height="10" rx="1.5" fill="#292524" stroke="#1C1917" strokeWidth="0.8" />
          <line x1="-1" y1="-5" x2="-1" y2="5" stroke="#44403C" strokeWidth="0.8" />
          <line x1="1" y1="-5" x2="1" y2="5" stroke="#44403C" strokeWidth="0.8" />
        </g>

        {/* 6. TRAIN ENGINE (Leading Aerodynamic Locomotive - Warm Bronze & Deep Carbon) */}
        <g transform="translate(14, 0)">
          {/* Undercarriage Maglev Bogie Skids */}
          <rect x="-14" y="-7.5" width="28" height="15" rx="3.5" fill="#1C1917" stroke="#44403C" strokeWidth="0.8" />

          {/* Engine Main Body with Aerodynamic Bullet Nose */}
          <path
            d="M -14 -6.5
               L 5 -6.5
               Q 15 -6.5 18 0
               Q 15 6.5 5 6.5
               L -14 6.5
               Z"
            fill="url(#trainEngineGrad)"
            stroke="#292524"
            strokeWidth="0.9"
          />

          {/* Warm Amber Aero Livery Swoosh */}
          <path
            d="M -13 -0.5
               L 5 -0.5
               Q 12 -0.5 15 0
               Q 12 0.5 5 0.5
               L -13 0.5
               Z"
            fill="#059669"
            stroke="#214A70"
            strokeWidth="0.6"
          />

          {/* Driver Cockpit Windshield (Curved Warm Smoked Glass) */}
          <path
            d="M 2 -4.8
               L 8 -4.8
               Q 13 -4.8 14 0
               Q 13 4.8 8 4.8
               L 2 4.8
               Q 4 0 2 -4.8 Z"
            fill="#1C1917"
            stroke="#D97706"
            strokeWidth="0.8"
          />
          <path
            d="M 4 -3.5
               L 8 -3.5
               Q 11.5 -3.5 12 0
               Q 11.5 3.5 8 3.5
               L 4 3.5 Z"
            fill="#FDE68A"
            opacity="0.85"
          />

          {/* Engine Side Cabin Windows */}
          <rect x="-10" y="-5.5" width="4.5" height="2.5" rx="0.6" fill="#FEF3C7" stroke="#B45309" strokeWidth="0.5" />
          <rect x="-4" y="-5.5" width="4.5" height="2.5" rx="0.6" fill="#FEF3C7" stroke="#B45309" strokeWidth="0.5" />

          {/* Roof Aero Air Intake / Pantograph Dome */}
          <rect x="-10" y="-2" width="12" height="4" rx="1.5" fill="#334155" />
          <circle cx="-4" cy="0" r="1.5" fill="#214A70" />

          {/* Dual Xenon Headlights */}
          <circle cx="16.5" cy="-2.5" r="1.5" fill="#FFFFFF" stroke="#EAF2F6" strokeWidth="0.8" style={{ filter: 'drop-shadow(0 0 4px #FFFFFF)' }} />
          <circle cx="16.5" cy="2.5" r="1.5" fill="#FFFFFF" stroke="#EAF2F6" strokeWidth="0.8" style={{ filter: 'drop-shadow(0 0 4px #FFFFFF)' }} />

          {/* Front Magnetic Levitation Receiver Sensor (Nose Tip) */}
          <circle cx="19" cy="0" r={3 * pulse} fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1" style={{ filter: 'drop-shadow(0 0 6px #F59E0B)' }} />
          <circle cx="19" cy="0" r="1.3" fill="#FFFFFF" />
        </g>
      </g>
    </g>
  );
};

// -------------------------------------------------------------------
// 4. Interactive Waypoint Node Sprite
// -------------------------------------------------------------------
const WaypointNodeSprite = ({ 
  x, 
  y, 
  isConnected, 
  isStart, 
  isTarget, 
  isCurrent, 
  isActiveMovingTarget,
  now, 
  onClick 
}) => {
  return (
    <g 
      transform={`translate(${x}, ${y})`}
      onClick={onClick}
      style={{ cursor: isConnected ? 'pointer' : 'default' }}
    >
      {/* 1. Ground Footprint Shadow */}
      <ellipse
        cx="0"
        cy="2"
        rx={isSpecial ? 9 : 7}
        ry={isSpecial ? 3.8 : 3}
        fill="rgba(15, 23, 42, 0.45)"
        style={{ filter: 'blur(0.8px)' }}
      />

      {/* 2. Metallic Base Anchor Plate */}
      <rect
        x={isSpecial ? "-5.5" : "-4.5"}
        y="-1"
        width={isSpecial ? "11" : "9"}
        height={isSpecial ? "2.8" : "2.5"}
        rx="1"
        fill="#334155"
        stroke="#1E293B"
        strokeWidth="0.5"
      />
      <circle cx="-2.5" cy="0.2" r="0.5" fill="#94A3B8" />
      <circle cx="2.5" cy="0.2" r="0.5" fill="#94A3B8" />

      {/* 3. Small Isometric Steel Pole / Pylon Mast */}
      <g>
        {/* Tapered Mast Column */}
        <polygon
          points="-2,-1 2,-1 1,-19 -1,-19"
          fill="url(#poleSteelGrad)"
          stroke="#1E293B"
          strokeWidth="0.5"
        />

        {/* Chiseled Center Highlight Ridge */}
        <line x1="0" y1="-1" x2="0" y2="-19" stroke="rgba(255,255,255,0.35)" strokeWidth="0.4" />

        {/* Dual Ceramic Insulator Crossarms */}
        <line x1="-5" y1="-13" x2="5" y2="-13" stroke="#475569" strokeWidth="1.1" strokeLinecap="round" />
        <circle cx="-4.2" cy="-13" r="1.1" fill="#173B5F" stroke="#173B5F" strokeWidth="0.3" />
        <circle cx="4.2" cy="-13" r="1.1" fill="#173B5F" stroke="#173B5F" strokeWidth="0.3" />

        {/* Tesla Induction Ring Torus */}
        <ellipse
          cx="0"
          cy="0"
          r={16 + 2.5 * Math.sin(now * 0.009)}
          fill="rgba(56, 189, 248, 0.22)"
          stroke="#38BDF8"
          strokeWidth="2.2"
          strokeDasharray="4 3"
          style={{ filter: 'drop-shadow(0 0 6px #38BDF8)' }}
        />
      )}

      {/* 2. Target Pulsing Aura on Destination Junction */}
      {isTarget && (
        <circle
          cx="0"
          cy="0"
          r={20 + 3 * Math.sin(now * 0.007)}
          fill="rgba(245, 158, 11, 0.28)"
          stroke="#F59E0B"
          strokeWidth="2.8"
          style={{ filter: 'drop-shadow(0 0 10px #F59E0B)' }}
        />
      )}

      {/* 3. Center Node Core aligned exactly on the orange junction box */}
      <circle
        cx="0"
        cy="0"
        r={isTarget ? 10 : (isStart ? 9 : (isConnected ? 8 : (isCurrent ? 7 : 5)))}
        fill={isTarget ? "#F59E0B" : (isStart ? "#10B981" : (isConnected ? "#0284C7" : (isCurrent ? "#22C55E" : "rgba(245, 158, 11, 0.75)")))}
        stroke="#FFFFFF"
        strokeWidth="2"
        style={{ filter: (isConnected || isTarget || isStart) ? 'drop-shadow(0 0 5px rgba(255,255,255,0.85))' : 'none' }}
      />

          {/* Luminous Yellow Light Bulb Core */}
          <circle
            cx="0"
            cy="-21"
            r={isSpecial ? 4.2 : 3.2}
            fill="url(#yellowLightBulbGrad)"
            stroke={isSpecial ? "#FFFFFF" : "#214A70"}
            strokeWidth={isSpecial ? "0.9" : "0.6"}
            style={{ filter: isSpecial ? 'drop-shadow(0 0 6px #FACC15)' : 'drop-shadow(0 0 4px #FACC15)' }}
          />

          {/* White-Hot Filament Glint */}
          <circle cx="0" cy="-21" r={isSpecial ? 1.8 : 1.3} fill="#FFFFFF" />
          <circle cx="-0.8" cy="-21.8" r={isSpecial ? 0.9 : 0.6} fill="#FFFFFF" opacity="0.9" />

          {/* Continuous Pulsing Wave Ring for Start / Destination */}
          {isSpecial && (
            <circle
              cx="0"
              cy="-21"
              r={6 + ((now * 0.012) % 7)}
              fill="none"
              stroke="#EAF2F6"
              strokeWidth="0.8"
              opacity={1 - ((now * 0.012) % 7) / 7}
            />
          )}
        </g>
      )}

      {/* 5. Start Milestone Beacon */}
      {isStart && (
        <g transform="translate(0, -28)" pointerEvents="none">
          <rect x="-30" y="-9" width="60" height="18" rx="9" fill="#064E3B" stroke="#34D399" strokeWidth="1.6" style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.5))' }} />
          <text x="0" y="3.5" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="900" fontFamily="system-ui, sans-serif">
            START 🚩
          </text>
        </g>
      )}

      {isTarget && (
        <g transform="translate(0, -32)" pointerEvents="none">
          <rect x="-35" y="-6.5" width="70" height="13" rx="6.5" fill="#173B5F" stroke="#FACC15" strokeWidth="1.2" style={{ filter: 'drop-shadow(0 2px 5px rgba(245,158,11,0.5))' }} />
          <text x="0" y="3" textAnchor="middle" fill="#EAF2F6" fontSize="6.8" fontWeight="900" fontFamily="system-ui, sans-serif">
            DESTINATION 🎯
          </text>
        </g>
      )}
    </g>
  );
};

// -------------------------------------------------------------------
// 5. Realistic Two-Phase Magnetic Field Energy Tether (Reaches & Pulls)
// -------------------------------------------------------------------
const ElectricLightningTether = ({ 
  poleX, 
  poleY, 
  trainX, 
  trainY, 
  trainRotation, 
  isDest, 
  reachT = 1, 
  isPulling = false, 
  now 
}) => {
  // Start directly from center of target junction node (where magnetic field emerges)
  const x1 = poleX;
  const y1 = poleY;

  // Train's front magnetic receiver tip (train scaled by 1.22, nose tip offset is ~40.2px)
  const x2 = trainX + Math.cos(trainRotation) * 40.2;
  const y2 = trainY + Math.sin(trainRotation) * 40.2;

  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.hypot(dx, dy);

  if (dist < 4) return null;

  const ux = dx / dist;
  const uy = dy / dist;
  const nx = -uy;
  const ny = ux;

  // In Phase 1 (reach): energy emerges from target node and reaches out towards the train
  // In Phase 2 (pull): full connection is established, pulling the train toward the node
  const currentDist = isPulling ? dist : Math.max(10, dist * reachT);

  const tipX = x1 + ux * currentDist;
  const tipY = y1 + uy * currentDist;

  // Generate 8-segment procedural crackling lightning path
  const numSegs = 8;
  const mainPoints = [`${x1.toFixed(1)},${y1.toFixed(1)}`];
  const forkPoints1 = [];

  for (let i = 1; i < numSegs; i++) {
    const t = i / numSegs;
    const noise = Math.sin(now * 0.05 + i * 3.7) * 0.55 + Math.sin(now * 0.11 + i * 7.1) * 0.45;
    const envelope = Math.sin(t * Math.PI);
    const maxDisplace = Math.min(7, currentDist * 0.08) * envelope;
    const offset = noise * maxDisplace;

    const px = x1 + ux * (currentDist * t) + nx * offset;
    const py = y1 + uy * (currentDist * t) + ny * offset;
    mainPoints.push(`${px.toFixed(1)},${py.toFixed(1)}`);

    if (i === 3 || i === 4) {
      const forkOffset = offset + (Math.sin(now * 0.08 + i) * 6 + 4);
      forkPoints1.push(`${(x1 + ux * (currentDist * t) + nx * forkOffset).toFixed(1)},${(y1 + uy * (currentDist * t) + ny * forkOffset).toFixed(1)}`);
    }
  }
  mainPoints.push(`${tipX.toFixed(1)},${tipY.toFixed(1)}`);

  const mainPath = `M ${mainPoints.join(' L ')}`;

  // Magnetic flux particles:
  // Phase 1 (reach): flux particles shoot forward from target node (0) outward to reach the train
  // Phase 2 (pull): flux particles flow rapidly from train towards target node to demonstrate attractive magnetic pull
  const particles = [];
  const numParticles = 7;
  for (let i = 0; i < numParticles; i++) {
    let pT;
    if (!isPulling) {
      // Flowing outward from node (0) to reach tip
      pT = ((now * 0.0022 + i / numParticles) % 1) * reachT;
    } else {
      // Flowing from train towards node to demonstrate magnetic pull
      pT = 1 - ((now * 0.002 + i / numParticles) % 1);
    }
    const pNoise = Math.sin(now * 0.03 + i * 2.1) * 3 * Math.sin(pT * Math.PI);
    const px = x1 + ux * (dist * pT) + nx * pNoise;
    const py = y1 + uy * (dist * pT) + ny * pNoise;
    const pr = 1.8 + Math.sin(pT * Math.PI) * 1.8;
    const opacity = Math.sin(pT * Math.PI);
    particles.push({ px, py, pr, opacity, key: i });
  }

  return (
    <g pointerEvents="none">
      {/* Expanding Concentric Magnetic Field Waves Emerging from Target Node */}
      {[0, 1, 2].map(waveIdx => {
        const waveT = ((now * 0.0035 + waveIdx * 0.33) % 1);
        const waveR = 12 + waveT * 38;
        const waveOpacity = (1 - waveT) * 0.75;
        return (
          <circle
            key={`wave-${waveIdx}`}
            cx={x1}
            cy={y1}
            r={waveR}
            fill="none"
            stroke="#F59E0B"
            strokeWidth="2.2"
            opacity={waveOpacity}
            style={{ filter: 'drop-shadow(0 0 4px #F59E0B)' }}
          />
        );
      })}

      {/* 1. Luminous Soft Amber Atmospheric Glow Tube */}
      <path
        d={mainPath}
        fill="none"
        stroke="#214A70"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.38"
        style={{ filter: 'blur(2.5px)' }}
      />

      {/* 2. Secondary Energetic Yellow Lightning Core Arc */}
      <path
        d={mainPath}
        fill="none"
        stroke="#FACC15"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: 'drop-shadow(0 0 4px #FACC15)' }}
      />

      {/* 3. Micro Forked Branch Bolts */}
      {forkPoints1.length > 0 && (
        <path
          d={`M ${mainPoints[2]} L ${forkPoints1.join(' L ')}`}
          fill="none"
          stroke="#EAF2F6"
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.75"
        />
      )}

      {/* 4. White-Hot Plasma Filament Line */}
      <path
        d={mainPath}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.95"
      />

      {/* 5. Streaming Magnetic Flow Particles */}
      {particles.map(p => (
        <circle
          key={p.key}
          cx={p.px}
          cy={p.py}
          r={p.pr}
          fill="#FFFFFF"
          stroke="#EAF2F6"
          strokeWidth="0.6"
          opacity={p.opacity}
          style={{ filter: 'drop-shadow(0 0 3px #FACC15)' }}
        />
      ))}

      {/* 6. Active Reaching Tip Spearhead (in Phase 1) or Train Nose Receiver Ionization (in Phase 2) */}
      {!isPulling ? (
        <g>
          <circle
            cx={tipX}
            cy={tipY}
            r={6 + Math.sin(now * 0.04) * 2}
            fill="rgba(250, 204, 21, 0.55)"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            style={{ filter: 'drop-shadow(0 0 8px #FACC15)' }}
          />
          <circle cx={tipX} cy={tipY} r="2.5" fill="#FFFFFF" />
        </g>
      ) : (
        <g>
          <circle
            cx={x2}
            cy={y2}
            r={5 + Math.sin(now * 0.035) * 2}
            fill="rgba(250, 204, 21, 0.5)"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            style={{ filter: 'drop-shadow(0 0 6px #FACC15)' }}
          />
          <circle cx={x2} cy={y2} r="2" fill="#FFFFFF" />
        </g>
      )}

      {/* 7. Target Node Emitter Core Burst */}
      <circle
        cx={x1}
        cy={y1}
        r={5 + Math.sin(now * 0.03) * 1.5}
        fill="rgba(254, 240, 138, 0.8)"
        stroke="#FFFFFF"
        strokeWidth="1"
        style={{ filter: 'drop-shadow(0 0 4px #214A70)' }}
      />
    </g>
  );
};

// -------------------------------------------------------------------
// 6. MAIN INTERACTIVE MAZE COMPONENT (SVG/DOM LAYERED ARCHITECTURE)
// -------------------------------------------------------------------
export default function MazeGame({ 
  onSolve, 
  isSolved, 
  onVisitedCountChange, 
  onNodeChange,
  hintDir,
  registerReset, 
  registerDirectionMove,
  registerHint
}) {
  const [missionIdx, setMissionIdx] = useState(0);
  const [visitedCount, setVisitedCount] = useState(1);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showMissionPopup, setShowMissionPopup] = useState(false);

  // Train and magnet animation state
  const [now, setNow] = useState(0);
  const [visitedHistory, setVisitedHistory] = useState(['node_0_0']);
  const [traversedSegments, setTraversedSegments] = useState([]);
  const [trainState, setTrainState] = useState({
    x: WAYPOINT_NODES[0].x,
    y: WAYPOINT_NODES[0].y,
    rotation: 0,
    isMoving: false,
    reachT: 0,
    isPulling: false
  });


  const onSolveRef = useRef(onSolve);
  const isSolvedRef = useRef(isSolved);
  const animFrameRef = useRef(null);

  // Navigation state refs
  const currentMission = MISSIONS[missionIdx] || MISSIONS[0];
  const startPoint = NODES_MAP[currentMission.start] || WAYPOINT_NODES[0];
  const targetPoint = NODES_MAP[currentMission.target] || WAYPOINT_NODES[15];

  const currentNodeIdRef = useRef(currentMission.start);
  const pathQueueRef = useRef([]);
  const isMovingRef = useRef(false);
  const moveStartTimeRef = useRef(0);
  const animFromRef = useRef({ x: startPoint.x, y: startPoint.y, angle: 0 });
  const animToRef = useRef({ x: startPoint.x, y: startPoint.y, angle: 0 });
  
  // Smooth Speed: 2000ms per segment for clear reach-out and attractive pull dynamics
  const MOVE_DURATION = 2000;

  useEffect(() => {
    onSolveRef.current = onSolve;
    isSolvedRef.current = isSolved;
  }, [onSolve, isSolved]);

  useEffect(() => {
    if (onVisitedCountChange) onVisitedCountChange(visitedCount, WAYPOINT_NODES.length);
  }, [visitedCount, onVisitedCountChange]);

  // Change guard: only fire onNodeChange when the actual node ID or moving state changes
  const lastNotifiedNodeRef = useRef(null);
  const lastNotifiedMovingRef = useRef(null);

  useEffect(() => {
    const nodeId = currentNodeIdRef.current;
    const moving = isMovingRef.current;
    if (onNodeChange && (nodeId !== lastNotifiedNodeRef.current || moving !== lastNotifiedMovingRef.current)) {
      lastNotifiedNodeRef.current = nodeId;
      lastNotifiedMovingRef.current = moving;
      onNodeChange(nodeId, moving);
    }
  }, [onNodeChange]);

  // Reset Handler
  const handleReset = () => {
    currentNodeIdRef.current = currentMission.start;
    pathQueueRef.current = [];
    isMovingRef.current = false;
    const startNode = NODES_MAP[currentMission.start] || WAYPOINT_NODES[0];
    animFromRef.current = { x: startNode.x, y: startNode.y, angle: 0, id: startNode.id };
    animToRef.current = { x: startNode.x, y: startNode.y, angle: 0, id: startNode.id };
    setVisitedHistory([startNode.id]);
    setTraversedSegments([]);

    setTrainState({
      x: startNode.x,
      y: startNode.y,
      rotation: 0,
      isMoving: false,
      reachT: 0,
      isPulling: false
    });

    if (onNodeChange) onNodeChange(startNode.id, false);
  };

  useEffect(() => {
    if (registerReset) {
      registerReset(handleReset);
    }
  }, [registerReset]);

  // Travel next segment in queue strictly between adjacent nodes on railway track
  const startNextSegment = () => {
    if (pathQueueRef.current.length === 0) {
      isMovingRef.current = false;
      setTrainState(prev => ({ ...prev, isMoving: false, reachT: 0, isPulling: false }));
      if (onNodeChange) onNodeChange(currentNodeIdRef.current, false);
      return;
    }

    const nextId = pathQueueRef.current.shift();
    const nextNode = NODES_MAP[nextId];
    if (!nextNode) {
      isMovingRef.current = false;
      setTrainState(prev => ({ ...prev, isMoving: false, reachT: 0, isPulling: false }));
      if (onNodeChange) onNodeChange(currentNodeIdRef.current, false);
      return;
    }

    const cur = NODES_MAP[currentNodeIdRef.current] || { x: trainState.x, y: trainState.y, id: currentNodeIdRef.current };
    const dx = nextNode.x - cur.x;
    const dy = nextNode.y - cur.y;
    // Exactly aligned with straight orthogonal track (0, PI, PI/2, -PI/2)
    const targetAngle = Math.atan2(dy, dx);

    animFromRef.current = { x: cur.x, y: cur.y, angle: targetAngle, id: cur.id };
    animToRef.current = { x: nextNode.x, y: nextNode.y, angle: targetAngle, id: nextId };
    isMovingRef.current = true;
    moveStartTimeRef.current = performance.now();

    setTrainState({
      x: cur.x,
      y: cur.y,
      rotation: targetAngle,
      isMoving: true,
      reachT: 0,
      isPulling: false
    });

    if (onNodeChange) onNodeChange(currentNodeIdRef.current, true);
  };

  // Move to targeted node strictly via railway tracks
  const navigateToNode = (targetId) => {
    if (isMovingRef.current) return;
    if (targetId === currentNodeIdRef.current) return;

    const cur = NODES_MAP[currentNodeIdRef.current];
    if (!cur) return;

    if (cur.neighbors.includes(targetId)) {
      pathQueueRef.current = [targetId];
      startNextSegment();
    } else {
      const path = findShortestPath(currentNodeIdRef.current, targetId);
      if (path && path.length > 1) {
        pathQueueRef.current = path.slice(1);
        startNextSegment();
      }
    }
  };

  // Move via direction input strictly to direct connected adjacent neighbor
  const moveInDirection = (dir) => {
    if (isMovingRef.current) return;
    const cur = NODES_MAP[currentNodeIdRef.current];
    if (!cur) return;

    let targetDx = 0;
    let targetDy = 0;

    if (dir === 'up' || dir === 'north' || dir === 'N') { targetDx = 0; targetDy = -1; }
    else if (dir === 'down' || dir === 'south' || dir === 'S') { targetDx = 0; targetDy = 1; }
    else if (dir === 'left' || dir === 'west' || dir === 'W') { targetDx = -1; targetDy = 0; }
    else if (dir === 'right' || dir === 'east' || dir === 'E') { targetDx = 1; targetDy = 0; }

    let bestNeighbor = null;
    let bestScore = -Infinity;

    cur.neighbors.forEach((nId) => {
      const neighbor = NODES_MAP[nId];
      if (!neighbor) return;
      const dx = neighbor.x - cur.x;
      const dy = neighbor.y - cur.y;
      const dist = Math.hypot(dx, dy);
      if (dist === 0) return;

      const score = (dx / dist) * targetDx + (dy / dist) * targetDy;
      if (score > bestScore) {
        bestScore = score;
        bestNeighbor = nId;
      }
    });

    if (bestNeighbor && bestScore > 0.5) {
      pathQueueRef.current = [bestNeighbor];
      startNextSegment();
    }
  };

  useEffect(() => {
    if (registerDirectionMove) {
      registerDirectionMove(moveInDirection);
    }
  }, [registerDirectionMove]);

  // Hint calculation
  const getNextHintDirection = () => {
    const shortest = findShortestPath(currentNodeIdRef.current, targetPoint.id);
    if (shortest && shortest.length > 1) {
      const nextId = shortest[1];
      const cur = NODES_MAP[currentNodeIdRef.current];
      const nextNode = NODES_MAP[nextId];
      if (cur && nextNode) {
        const dx = nextNode.x - cur.x;
        const dy = nextNode.y - cur.y;
        if (Math.abs(dx) > Math.abs(dy)) {
          return dx > 0 ? 'E' : 'W';
        } else {
          return dy > 0 ? 'S' : 'N';
        }
      }
    }
    return null;
  };

  useEffect(() => {
    if (registerHint) {
      registerHint(getNextHintDirection);
    }
  }, [registerHint]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showMissionPopup) return;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        moveInDirection('up');
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        moveInDirection('down');
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        moveInDirection('left');
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        moveInDirection('right');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showMissionPopup]);

  // Main 60 FPS continuous animation loop strictly aligned to railway tracks
  useEffect(() => {
    const step = () => {
      const currentTime = performance.now();
      setNow(currentTime);

      if (isMovingRef.current) {
        const elapsed = currentTime - moveStartTimeRef.current;
        const rawT = Math.min(1, elapsed / MOVE_DURATION);

        const dx = animToRef.current.x - animFromRef.current.x;
        const dy = animToRef.current.y - animFromRef.current.y;
        const trackAngle = animToRef.current.angle;

        // Two-Phase Magnetic Movement:
        // Phase 1: First 28% of time — Magnetic field energy emerges from target node and reaches out to the train
        // Phase 2: Remaining 72% — Magnetic tether is locked on and pulls/attracts the train toward that node
        const REACH_FRACTION = 0.28;
        let trainX, trainY;
        let reachT = 1;
        let isPulling = false;

        if (rawT < REACH_FRACTION) {
          reachT = rawT / REACH_FRACTION;
          isPulling = false;
          trainX = animFromRef.current.x;
          trainY = animFromRef.current.y;
        } else {
          const pullT = (rawT - REACH_FRACTION) / (1 - REACH_FRACTION);
          const tSmooth = pullT < 0.5 ? 2 * pullT * pullT : 1 - Math.pow(-2 * pullT + 2, 2) / 2;
          reachT = 1;
          isPulling = true;
          trainX = animFromRef.current.x + dx * tSmooth;
          trainY = animFromRef.current.y + dy * tSmooth;
        }

        setTrainState({
          x: trainX,
          y: trainY,
          rotation: trackAngle,
          isMoving: true,
          reachT,
          isPulling
        });

        if (rawT >= 1) {
          const finalX = animToRef.current.x;
          const finalY = animToRef.current.y;
          const arrivedNodeId = animToRef.current.id;
          const segFromX = animFromRef.current.x;
          const segFromY = animFromRef.current.y;

          currentNodeIdRef.current = arrivedNodeId;

          setTraversedSegments(prev => {
            const alreadyHas = prev.some(s =>
              (Math.hypot(s.x1 - segFromX, s.y1 - segFromY) < 3 && Math.hypot(s.x2 - finalX, s.y2 - finalY) < 3) ||
              (Math.hypot(s.x1 - finalX, s.y1 - finalY) < 3 && Math.hypot(s.x2 - segFromX, s.y2 - segFromY) < 3)
            );
            if (alreadyHas) return prev;
            return [...prev, { x1: segFromX, y1: segFromY, x2: finalX, y2: finalY, id: `${segFromX}_${segFromY}_${finalX}_${finalY}` }];
          });

          setVisitedHistory(prev => (prev.includes(arrivedNodeId) ? prev : [...prev, arrivedNodeId]));

          setTrainState({
            x: finalX,
            y: finalY,
            rotation: trackAngle,
            isMoving: false,
            reachT: 0,
            isPulling: false
          });

          const isDest = (arrivedNodeId === targetPoint.id);

          if (isDest) {
            pathQueueRef.current = [];
            isMovingRef.current = false;
            if (onNodeChange) onNodeChange(arrivedNodeId, false);

            if (!showCelebration) {
              setShowCelebration(true);
              setVisitedCount(prev => Math.min(prev + 1, WAYPOINT_NODES.length));

              if (missionIdx < MISSIONS.length - 1) {
                setTimeout(() => {
                  setMissionIdx(prev => prev + 1);
                  setShowCelebration(false);
                  setShowMissionPopup(true);
                }, 1200);
              } else {
                if (!isSolvedRef.current && onSolveRef.current) {
                  isSolvedRef.current = true;
                  onSolveRef.current();
                }
              }
            }
          } else {
            if (pathQueueRef.current.length > 0) {
              startNextSegment();
            } else {
              isMovingRef.current = false;
              if (onNodeChange) onNodeChange(arrivedNodeId, false);
            }
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [trainState.x, trainState.y, trainState.rotation, missionIdx, showCelebration]);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* 1. Mission Briefing Pop-up */}
      <AnimatePresence>
        {showMissionPopup && (
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 100,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              style={{
                background: '#FFFFFF',
                borderRadius: '24px',
                padding: '2.5rem 2rem',
                maxWidth: '440px',
                textAlign: 'center',
                boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
                border: '3px solid #38BDF8'
              }}
            >
              <div style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                background: '#E0F2FE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
                boxShadow: '0 4px 12px rgba(56, 189, 248, 0.25)'
              }}>
                <Target size={36} color="#0284C7" />
              </div>
              
              <h2 style={{ margin: '0 0 1rem 0', color: '#0369A1', fontSize: '1.6rem', fontWeight: 900 }}>
                {currentMission.title}
              </h2>
              
              <p style={{ margin: '0 0 1.75rem 0', color: '#334155', fontSize: '1.1rem', lineHeight: 1.5, fontWeight: 600 }}>
                {currentMission.desc}
              </p>

              <button
                onClick={() => setShowMissionPopup(false)}
                style={{
                  width: '100%',
                  padding: '1.1rem',
                  borderRadius: '16px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
                  color: '#FFFFFF',
                  fontSize: '1.15rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(2, 132, 199, 0.4)',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Start Mission
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Destination Celebration Banner */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 50,
              background: '#FFFFFF',
              border: '2px solid #16A34A',
              borderRadius: '24px',
              padding: '1.25rem 2rem',
              textAlign: 'center',
              boxShadow: '0 15px 40px rgba(22, 163, 74, 0.25)',
              pointerEvents: 'none'
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>🎉</div>
            <h3 style={{ margin: '0 0 0.2rem 0', color: '#064E3B', fontSize: '1.3rem', fontWeight: 900 }}>
              Destination Reached!
            </h3>
            <p style={{ margin: 0, color: '#334155', fontSize: '0.9rem', fontWeight: 700 }}>
              Great navigation! The magnetic train successfully reached the destination beacon!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Declarative SVG / DOM Layered Simulation Viewport */}
      <svg
        viewBox="0 0 1024 1024"
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          borderRadius: '22px'
        }}
      >
        <defs>
          <linearGradient id="northArmGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="50%" stopColor="#F87171" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>

          <linearGradient id="southArmGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="50%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>

          <linearGradient id="archBridgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#DC2626" />
            <stop offset="48%" stopColor="#475569" />
            <stop offset="52%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>

          <radialGradient id="magnetAuraGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#0EA5E9" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
          </radialGradient>

          {/* Electric Pole Gradients */}
          <linearGradient id="poleSteelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="30%" stopColor="#94A3B8" />
            <stop offset="70%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          <radialGradient id="poleEmitterGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#EAF2F6" />
            <stop offset="70%" stopColor="#214A70" />
            <stop offset="100%" stopColor="#173B5F" />
          </radialGradient>

          {/* Glowing Yellow Light Bulb Gradient */}
          <radialGradient id="yellowLightBulbGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#EAF2F6" />
            <stop offset="75%" stopColor="#FACC15" />
            <stop offset="100%" stopColor="#173B5F" />
          </radialGradient>

          {/* Lightning Gradients */}
          <radialGradient id="yellowLightningGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EAF2F6" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#FACC15" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#214A70" stopOpacity="0" />
          </radialGradient>

          {/* Train Gradients (Warm Architectural Bronze, Sandstone & Carbon Steel) */}
          <linearGradient id="trainEngineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#292524" />
            <stop offset="30%" stopColor="#44403C" />
            <stop offset="70%" stopColor="#78350F" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          <linearGradient id="trainCoachGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1C1917" />
            <stop offset="30%" stopColor="#292524" />
            <stop offset="75%" stopColor="#57534E" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          <linearGradient id="headlightBeamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(254, 240, 138, 0.85)" />
            <stop offset="45%" stopColor="rgba(245, 158, 11, 0.45)" />
            <stop offset="100%" stopColor="rgba(245, 158, 11, 0)" />
          </linearGradient>
        </defs>

        {/* 1. Exact High Quality 3D Isometric Railway Transit Grid Map */}
        <image
          href="/FunWithMagnets/image.png"
          x="0"
          y="0"
          width="1024"
          height="1024"
          preserveAspectRatio="none"
        />

        {/* 2. White Dotted Path Line Strictly Confined to Traversed Railway Tracks */}
        <g pointerEvents="none">
          {/* Completed Track Segments */}
          {traversedSegments.map((seg) => (
            <g key={seg.id}>
              {/* Soft luminous underlay */}
              <line
                x1={seg.x1}
                y1={seg.y1}
                x2={seg.x2}
                y2={seg.y2}
                stroke="rgba(255, 255, 255, 0.35)"
                strokeWidth="6"
                strokeLinecap="round"
                style={{ filter: 'blur(2px)' }}
              />
              {/* Crisp High-Contrast White Dotted Line strictly on tracks */}
              <line
                x1={seg.x1}
                y1={seg.y1}
                x2={seg.x2}
                y2={seg.y2}
                stroke="#FFFFFF"
                strokeWidth="3.2"
                strokeDasharray="4 8"
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.9))' }}
              />
            </g>
          ))}

          {/* Active Currently Traversed Track Segment */}
          {trainState.isMoving && animFromRef.current && (
            <g key="live-active-track-segment">
              <line
                x1={animFromRef.current.x}
                y1={animFromRef.current.y}
                x2={trainState.x}
                y2={trainState.y}
                stroke="rgba(255, 255, 255, 0.35)"
                strokeWidth="6"
                strokeLinecap="round"
                style={{ filter: 'blur(2px)' }}
              />
              <line
                x1={animFromRef.current.x}
                y1={animFromRef.current.y}
                x2={trainState.x}
                y2={trainState.y}
                stroke="#FFFFFF"
                strokeWidth="3.2"
                strokeDasharray="4 8"
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.9))' }}
              />
            </g>
          )}
        </g>

        {/* 3. Interactive Junction Nodes on Railway Map */}
        {WAYPOINT_NODES.map((node) => {
          const isConnected = NODES_MAP[currentNodeIdRef.current]?.neighbors.includes(node.id);
          const isCurrent = currentNodeIdRef.current === node.id;
          const isVisited = visitedHistory.includes(node.id);
          const isStart = node.id === currentMission.start;
          const isTarget = node.id === targetPoint.id;
          const isActiveMovingTarget = trainState.isMoving && animToRef.current && (animToRef.current.x === node.x && animToRef.current.y === node.y);

          return (
            <WaypointNodeSprite
              key={node.id}
              x={node.x}
              y={node.y}
              isConnected={isConnected && !trainState.isMoving}
              isActiveMovingTarget={isActiveMovingTarget}
              isStart={isStart}
              isCurrent={isCurrent}
              isVisited={isVisited}
              isTarget={isTarget}
              now={now}
              onClick={() => isConnected && !trainState.isMoving && navigateToNode(node.id)}
            />
          );
        })}

        {/* 4. Active Yellow Electrifying Lightning Energy Line Pulling the Train */}
        {trainState.isMoving && animToRef.current && (
          <ElectricLightningTether
            poleX={animToRef.current.x}
            poleY={animToRef.current.y}
            trainX={trainState.x}
            trainY={trainState.y}
            trainRotation={trainState.rotation}
            isDest={animToRef.current.x === targetPoint.x && animToRef.current.y === targetPoint.y}
            reachT={trainState.reachT}
            isPulling={trainState.isPulling}
            now={now}
          />
        )}

        {/* 5. Realistic Magnetic Train Sprite (1 Engine + 1 Compartment) */}
        <MagneticTrainSprite
          x={trainState.x}
          y={trainState.y}
          rotation={trainState.rotation}
          isMoving={trainState.isMoving}
          now={now}
        />
      </svg>
    </div>
  );
}
