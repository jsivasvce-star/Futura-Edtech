import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Move, Compass, RotateCcw, HelpCircle, ArrowLeft, ArrowRight } from 'lucide-react';

// -------------------------------------------------------------------
// 1. Exact Waypoint Node Coordinate System for Isometric City Grid Track Map (1024 x 682)
// -------------------------------------------------------------------
export const WAYPOINT_NODES = [
  // ── ROW 0: TOP RAILWAY TRACK (Y ≈ 64 - 67) ──
  { id: 'node_0_0', name: 'Start: City Hall Junction 🚉', shortName: 'Start', icon: '🚉', x: 73, y: 67, neighbors: ['node_0_1', 'node_1_0'] },
  { id: 'node_0_1', name: 'Hospital North Track 🏥', shortName: 'Hospital', icon: '🏥', x: 305, y: 66, neighbors: ['node_0_0', 'node_0_2', 'node_1_1'] },
  { id: 'node_0_2', name: 'Solar Farm Hub ☀️', shortName: 'Solar', icon: '☀️', x: 543, y: 65, neighbors: ['node_0_1', 'node_0_3', 'node_1_2'] },
  { id: 'node_0_3', name: 'Grand Central Depot 🚂', shortName: 'Depot', icon: '🚂', x: 743, y: 64, neighbors: ['node_0_2', 'node_0_4', 'node_1_3'] },
  { id: 'node_0_4', name: 'North-East Coastline 🌊', shortName: 'NE Coast', icon: '🌊', x: 954, y: 65, neighbors: ['node_0_3', 'node_1_4'] },

  // ── ROW 1: SECOND HORIZONTAL TRACK (Y ≈ 196 - 200) ──
  { id: 'node_1_0', name: 'Power Plant West Track ⚡', shortName: 'Power Sta', icon: '⚡', x: 61, y: 200, neighbors: ['node_0_0', 'node_2_0', 'node_1_1'] },
  { id: 'node_1_1', name: 'Arena Stadium Junction 🏟️', shortName: 'Stadium', icon: '🏟️', x: 303, y: 197, neighbors: ['node_1_0', 'node_0_1', 'node_1_2', 'node_2_1'] },
  { id: 'node_1_2', name: 'Financial Towers Hub 🏢', shortName: 'Towers', icon: '🏢', x: 541, y: 198, neighbors: ['node_1_1', 'node_0_2', 'node_1_3', 'node_2_2'] },
  { id: 'node_1_3', name: 'Cargo Harbor Track 🚢', shortName: 'Harbor', icon: '🚢', x: 748, y: 196, neighbors: ['node_1_2', 'node_0_3', 'node_1_4', 'node_2_3'] },
  { id: 'node_1_4', name: 'Ocean Bay Track 🌊', shortName: 'Ocean Bay', icon: '🌊', x: 963, y: 197, neighbors: ['node_0_4', 'node_1_3', 'node_2_4'] },

  // ── ROW 2: CENTRAL HORIZONTAL TRACK (Y ≈ 349 - 350) ──
  { id: 'node_2_0', name: 'Fire & Rescue Station 🚒', shortName: 'Fire Sta', icon: '🚒', x: 52, y: 350, neighbors: ['node_1_0', 'node_3_0', 'node_2_1'] },
  { id: 'node_2_1', name: 'Tech Campus Junction 🏫', shortName: 'Campus', icon: '🏫', x: 298, y: 349, neighbors: ['node_2_0', 'node_1_1', 'node_2_2', 'node_3_1'] },
  { id: 'node_2_2', name: 'Metro Construction Hub 🏗️', shortName: 'Metro Hub', icon: '🏗️', x: 545, y: 349, neighbors: ['node_2_1', 'node_1_2', 'node_2_3', 'node_3_2'] },
  { id: 'node_2_3', name: 'Logistics Warehouse Track 📦', shortName: 'Logistics', icon: '📦', x: 754, y: 349, neighbors: ['node_2_2', 'node_1_3', 'node_2_4', 'node_3_3'] },
  { id: 'node_2_4', name: 'East Perimeter Track 🚧', shortName: 'East Gate', icon: '🚧', x: 973, y: 349, neighbors: ['node_1_4', 'node_2_3', 'node_3_4'] },

  // ── ROW 3: FOURTH HORIZONTAL TRACK (Y ≈ 491 - 493) ──
  { id: 'node_3_0', name: 'Suburban Residential Track 🏡', shortName: 'Suburbs', icon: '🏡', x: 40, y: 493, neighbors: ['node_2_0', 'node_4_0', 'node_3_1'] },
  { id: 'node_3_1', name: 'Bio-Sphere Dome Gardens 🌿', shortName: 'Bio-Domes', icon: '🌿', x: 293, y: 493, neighbors: ['node_3_0', 'node_2_1', 'node_3_2', 'node_4_1'] },
  { id: 'node_3_2', name: 'Airport Gateway Track ✈️', shortName: 'Airport', icon: '✈️', x: 542, y: 493, neighbors: ['node_3_1', 'node_2_2', 'node_3_3', 'node_4_2'] },
  { id: 'node_3_3', name: 'Memorial Parkside Track ⛲', shortName: 'Parkside', icon: '⛲', x: 761, y: 493, neighbors: ['node_3_2', 'node_2_3', 'node_3_4', 'node_4_3'] },
  { id: 'node_3_4', name: 'South-East Forest Track 🌲', shortName: 'SE Forest', icon: '🌲', x: 980, y: 491, neighbors: ['node_2_4', 'node_3_3', 'node_4_4'] },

  // ── ROW 4: BOTTOM HORIZONTAL TRACK (Y ≈ 641 - 642) ──
  { id: 'node_4_0', name: 'South-West Metro Depot 🏁', shortName: 'SW Depot', icon: '🏁', x: 28, y: 641, neighbors: ['node_3_0', 'node_4_1'] },
  { id: 'node_4_1', name: 'Botanical Garden South 🌷', shortName: 'Garden S', icon: '🌷', x: 288, y: 641, neighbors: ['node_4_0', 'node_3_1', 'node_4_2'] },
  { id: 'node_4_2', name: 'Runway South Track 🛫', shortName: 'Runway S', icon: '🛫', x: 541, y: 642, neighbors: ['node_4_1', 'node_3_2', 'node_4_3'] },
  { id: 'node_4_3', name: 'Grand Promenade Track 🏛️', shortName: 'Promenade', icon: '🏛️', x: 761, y: 642, neighbors: ['node_4_2', 'node_3_3', 'node_4_4'] },
  { id: 'node_4_4', name: 'Target: Destination Beacon 🎯', shortName: 'Goal 🎯', icon: '🎯', x: 988, y: 642, neighbors: ['node_3_4', 'node_4_3'] }
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
// 3. SVG High-Definition 3-Car Maglev Magnetic Train Sprite (Front Cab ➔ Middle Car ➔ Rear Cab)
// -------------------------------------------------------------------
// 3. Futuristic 3-Car Maglev Train Sprite (Rendered with Top-Down Aerodynamic Streamlining)
// -------------------------------------------------------------------
const MagneticTrainSprite = ({ x, y, rotation, isMoving, now }) => {
  const deg = (rotation * 180 / Math.PI);
  const pulse = 1 + 0.18 * Math.sin(now * 0.015);
  const glowPulse = 0.75 + 0.25 * Math.sin(now * 0.012);

  return (
    <g transform={`translate(${x}, ${y})`}>
      <g transform={`rotate(${deg})`}>
        {/* 1. Ground Ambient Levitation Shadow */}
        <ellipse
          cx="0"
          cy="0"
          rx="64"
          ry="12"
          fill="rgba(15, 23, 42, 0.6)"
          style={{ filter: 'blur(3.5px)' }}
        />

        {/* 2. Futuristic Vivid Electric Cyan / Blue Maglev Levitation Underglow Field */}
        <ellipse
          cx="0"
          cy="0"
          rx={isMoving ? 70 : 62}
          ry={isMoving ? 13 : 11}
          fill="rgba(0, 240, 255, 0.45)"
          style={{ filter: 'blur(4.5px)' }}
        />

        {/* 3. Glowing Levitation Skid Strips (Left & Right Rails) */}
        <line x1="-58" y1="-9.5" x2="58" y2="-9.5" stroke="#00F0FF" strokeWidth="2.8" opacity={glowPulse} style={{ filter: 'drop-shadow(0 0 6px #00F0FF)' }} />
        <line x1="-58" y1="9.5" x2="58" y2="9.5" stroke="#00F0FF" strokeWidth="2.8" opacity={glowPulse} style={{ filter: 'drop-shadow(0 0 6px #00F0FF)' }} />

        {/* 4. Projected Forward Xenon / Cyan Headlight Beams */}
        <polygon
          points="58,-5 125,-22 125,22 58,5"
          fill="url(#maglevHeadlightGrad)"
          opacity={isMoving ? 0.92 : 0.6}
          pointerEvents="none"
        />

        {/* 5. High-Definition 3-Car Maglev Train Asset (Bright Pure White with Enhanced Contrast & Glow) */}
        <image
          href="/FunWithMagnets/maglev_train_3car.png"
          x="-61"
          y="-9.25"
          width="122"
          height="18.5"
          preserveAspectRatio="none"
          style={{ filter: 'brightness(1.35) contrast(1.18) drop-shadow(0 3px 8px rgba(0,0,0,0.5))' }}
        />

        {/* 6. Front Nose Magnetic Induction Receiver Sensor */}
        <circle cx="60.5" cy="0" r={3.2 * pulse} fill="#00F0FF" stroke="#FFFFFF" strokeWidth="1.2" style={{ filter: 'drop-shadow(0 0 7px #00F0FF)' }} />
        <circle cx="60.5" cy="0" r="1.5" fill="#FFFFFF" />
      </g>
    </g>
  );
};

// -------------------------------------------------------------------
// 4. Interactive Waypoint Node Sprite (Clean, Sleek, Tower-Free #3B82F6 Vivid Blue)
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
  const pulse = Math.sin(now * 0.008);
  const ringR = 10 + pulse * 2.5;

  return (
    <g 
      transform={`translate(${x}, ${y})`}
      onClick={onClick}
      style={{ cursor: isConnected ? 'pointer' : 'default' }}
    >
      {/* 1. Subtle Radial Halo / Aura for Connected / Target / Start Nodes */}
      {(isConnected || isTarget || isStart || isCurrent) && (
        <circle
          cx="0"
          cy="0"
          r={isTarget ? ringR + 3 : (isConnected ? ringR : 8.5)}
          fill={isTarget ? "rgba(245, 158, 11, 0.22)" : "rgba(59, 130, 246, 0.25)"}
          stroke={isTarget ? "#F59E0B" : "#3B82F6"}
          strokeWidth="1.4"
          strokeDasharray={isConnected ? "3 3" : "none"}
          style={{ filter: 'drop-shadow(0 0 5px rgba(59, 130, 246, 0.6))' }}
        />
      )}

      {/* 2. Outer Node Ring - Clean vivid blue (#3B82F6) */}
      <circle
        cx="0"
        cy="0"
        r={isTarget ? 6.5 : (isStart ? 6 : (isConnected ? 5.5 : (isCurrent ? 5 : 4)))}
        fill={isTarget ? "#F59E0B" : (isStart ? "#10B981" : "#3B82F6")}
        stroke="#FFFFFF"
        strokeWidth="1.5"
        style={{ filter: 'drop-shadow(0 1px 4px rgba(0, 0, 0, 0.35))' }}
      />

      {/* 3. Sleek Center Core Dot */}
      <circle
        cx="0"
        cy="0"
        r={isTarget ? 2.8 : (isStart ? 2.4 : (isConnected ? 2.2 : 1.5))}
        fill="#FFFFFF"
        opacity={0.95}
      />

      {/* 4. Sleek Start Badge */}
      {isStart && (
        <g transform="translate(0, -15)" pointerEvents="none">
          <rect x="-20" y="-6.5" width="40" height="13" rx="6.5" fill="#064E3B" stroke="#34D399" strokeWidth="1.2" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }} />
          <text x="0" y="2.8" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="900" fontFamily="system-ui, sans-serif">
            START 🚩
          </text>
        </g>
      )}

      {/* 5. Sleek Destination Badge */}
      {isTarget && (
        <g transform="translate(0, -17)" pointerEvents="none">
          <rect x="-24" y="-6.5" width="48" height="13" rx="6.5" fill="#173B5F" stroke="#FACC15" strokeWidth="1.2" style={{ filter: 'drop-shadow(0 2px 5px rgba(245,158,11,0.45))' }} />
          <text x="0" y="2.8" textAnchor="middle" fill="#EAF2F6" fontSize="7" fontWeight="900" fontFamily="system-ui, sans-serif">
            GOAL 🎯
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

  // Train's front magnetic receiver tip (3-car Maglev nose tip offset is ~60.5px)
  const x2 = trainX + Math.cos(trainRotation) * 60.5;
  const y2 = trainY + Math.sin(trainRotation) * 60.5;

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
        viewBox="0 0 1024 682"
        preserveAspectRatio="none"
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

          {/* Maglev Futuristic Train Hull Gradient */}
          <linearGradient id="maglevBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="25%" stopColor="#1E293B" />
            <stop offset="50%" stopColor="#F8FAFC" />
            <stop offset="75%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          {/* Electric Cyan Xenon Headlight Beam */}
          <linearGradient id="maglevHeadlightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0, 240, 255, 0.85)" />
            <stop offset="40%" stopColor="rgba(56, 189, 248, 0.45)" />
            <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
          </linearGradient>

          {/* Lightning Gradients */}
          <radialGradient id="yellowLightningGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EAF2F6" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#FACC15" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#214A70" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Exact High Quality 3D Isometric Railway Transit Grid Map */}
        <image
          href="/FunWithMagnets/city_grid_track_map.jpg"
          x="0"
          y="0"
          width="1024"
          height="682"
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
