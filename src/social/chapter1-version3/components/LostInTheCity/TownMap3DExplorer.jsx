import React, { useState, useRef, useEffect } from 'react';
import townMapStraightFig from './assets/town_map_straight_3d.jpg';

import person3d from './assets/person_3d.png';

/* ═══════════════════════════════════════════════════════════════════════
   3D TOWN MAP EXPLORER  —  Realistic Person Walker & Traffic
   
   Features:
   - Photorealistic 3D Person Walker responding to Direction Controls.
   - Auto-moving Sedan & Taxi cruising in straight directions within lanes.
   - Strict Road-Locked Grid: moves ONLY on visible asphalt road corridors.
   - Zero overlap onto buildings or static structures.
   ═══════════════════════════════════════════════════════════════════════ */

const VIEW_W = 1376;
const VIEW_H = 768;

/* ── 1. PLACES CONFIG (BUILDING ENTRANCES & ROAD CORRIDORS) ─── */
const PLACES = [
  // ── BUILDING ENTRANCE DESTINATIONS (SPURS FROM ROADS) ──
  { id: 'RS', x: 180, y: 215, name: 'Railway Station', full: 'Central Junction Railway Station', icon: '🚂', type: 'station', start: true, blurb: 'Main entrance concourse of Railway Station.' },
  { id: 'AP', x: 835, y: 215, name: 'Apartments', full: 'Apartments', icon: '🏢', type: 'apartment', blurb: 'Main residential lobby entrance of Apartments.' },
  { id: 'PG', x: 1115, y: 215, name: 'Public Garden', full: 'Public Garden', icon: '🌳', type: 'garden', blurb: 'Public Garden entrance gate.' },
  { id: 'HO', x: 230, y: 460, name: 'Hospital', full: 'Hospital', icon: '🏥', type: 'hospital', blurb: 'Main emergency entrance & ambulance portico.' },
  { id: 'NP', x: 690, y: 460, name: 'Nagar Panchayat', full: 'Nagar Panchayat Office', icon: '🏛️', type: 'civic', blurb: 'Grand portico steps and entrance columns of Nagar Panchayat.' },
  { id: 'BK', x: 1115, y: 460, name: 'Bank', full: 'Bank', icon: '🏦', type: 'bank', goal: true, blurb: 'Main glass entrance lobby of the Bank.' },
  { id: 'SC', x: 230, y: 680, name: 'School', full: 'School', icon: '🏫', type: 'school', blurb: 'School main entrance doors by the playground courtyard.' },
  { id: 'MK', x: 690, y: 625, name: 'Market', full: 'Market', icon: '🛍️', type: 'market', blurb: 'Central bazaar square entrance among market stalls.' },
  { id: 'MU', x: 1115, y: 680, name: 'Museum', full: 'Museum', icon: '🏛️', type: 'museum', blurb: 'Main steps and entrance to Museum.' },

  // ── ROW 0: TOP 3 DEAD-END ROADS (Y = 60) ──
  { id: 'LA', x: 355, y: 60, name: 'Lake', full: 'Scenic Lake', icon: '🏞️', type: 'lake', blurb: 'A beautiful scenic lake.' },
  { id: 'D_N2', x: 690, y: 60, name: 'North Dead End 2', full: 'Central North Road Dead End', icon: '🚧', type: 'deadend', blurb: 'Dead end road with no exit.' },
  { id: 'D_N3', x: 1005, y: 60, name: 'North Dead End 3', full: 'East North Road Dead End', icon: '🚧', type: 'deadend', blurb: 'Dead end road with no exit.' },

  // ── ROW 1: NORTHERN AVENUE ROAD NODES (Y = 245) ──
  { id: 'J_NW', x: 50, y: 245, name: 'West End Junction', full: 'Northern Ave & West Lane', icon: '🚦', type: 'junction', blurb: 'Intersection on Northern Ave.' },
  { id: 'W_N_RS', x: 180, y: 245, name: 'Station Waypoint', full: 'Northern Ave in front of Railway Station', icon: '🚦', type: 'junction', blurb: 'Road in front of Railway Station.' },
  { id: 'W_N_1', x: 355, y: 245, name: 'West Pond Junction', full: 'Northern Ave & West North Road', icon: '🚦', type: 'junction', blurb: 'Road corridor intersection.' },
  { id: 'J_NH', x: 475, y: 245, name: 'Hospital Way North', full: 'Northern Ave & Hospital Way', icon: '🚦', type: 'junction', blurb: 'Intersection by Botanical Pond.' },
  { id: 'W_N_2', x: 690, y: 245, name: 'Town Hall North Junc', full: 'Northern Ave & Central North Road', icon: '🚦', type: 'junction', blurb: 'Road corridor intersection.' },
  { id: 'W_N_AP', x: 835, y: 245, name: 'Apartments Waypoint', full: 'Northern Ave in front of Apartments', icon: '🚦', type: 'junction', blurb: 'Road in front of Apartments.' },
  { id: 'J_NB', x: 905, y: 245, name: 'Bank Road North', full: 'Northern Ave & Bank Road', icon: '🚦', type: 'junction', blurb: 'Intersection on Northern Ave.' },
  { id: 'W_N_3', x: 1005, y: 245, name: 'Garden West Junction', full: 'Northern Ave & East North Road', icon: '🚦', type: 'junction', blurb: 'Road corridor intersection.' },
  { id: 'W_N_PG', x: 1115, y: 245, name: 'Garden Waypoint', full: 'Northern Ave in front of Public Garden', icon: '🚦', type: 'junction', blurb: 'Road in front of Public Garden.' },
  { id: 'J_NE', x: 1325, y: 245, name: 'East End Junction', full: 'Northern Ave & East Lane', icon: '🚦', type: 'junction', blurb: 'Eastern corner intersection.' },

  // ── ROW 2: CENTRAL BOULEVARD ROAD NODES (Y = 505) ──
  { id: 'J_CW', x: 50, y: 505, name: 'West Central Junction', full: 'Central Blvd & West Lane', icon: '🚦', type: 'junction', blurb: 'Intersection on Central Blvd.' },
  { id: 'W_C_HO', x: 230, y: 505, name: 'Hospital Waypoint', full: 'Central Blvd in front of Hospital', icon: '🚦', type: 'junction', blurb: 'Road in front of Hospital.' },
  { id: 'J_CH', x: 475, y: 505, name: 'Hospital Central Junc', full: 'Central Blvd & Hospital Way', icon: '🚦', type: 'junction', blurb: 'Intersection between Hospital & Town Hall.' },
  { id: 'W_C_NP', x: 690, y: 505, name: 'Civic Plaza Waypoint', full: 'Central Blvd in front of Town Hall Plaza', icon: '🚦', type: 'junction', blurb: 'Civic Plaza on Central Blvd.' },
  { id: 'J_CB', x: 905, y: 505, name: 'Bank Road Central', full: 'Central Blvd & Bank Road', icon: '🚦', type: 'junction', blurb: 'Intersection between Town Hall & Apex Bank.' },
  { id: 'W_C_BK', x: 1115, y: 505, name: 'Bank Waypoint', full: 'Central Blvd in front of Apex Bank', icon: '🚦', type: 'junction', blurb: 'Road in front of Apex Bank.' },
  { id: 'J_CE', x: 1325, y: 505, name: 'East Central Junction', full: 'Central Blvd & East Lane', icon: '🚦', type: 'junction', blurb: 'Intersection on Central Blvd.' },

  // ── ROW 3: SOUTHERN ROAD ROAD NODES (Y = 750) ──
  { id: 'J_SW', x: 50, y: 750, name: 'West South Junction', full: 'Southern Road & West Lane', icon: '🚦', type: 'junction', blurb: 'Intersection on Southern Road.' },
  { id: 'W_S_SC', x: 230, y: 750, name: 'School Waypoint', full: 'Southern Road in front of School', icon: '🚦', type: 'junction', blurb: 'Road in front of School.' },
  { id: 'J_SH', x: 475, y: 750, name: 'Hospital South Junc', full: 'Southern Road & Hospital Way', icon: '🚦', type: 'junction', blurb: 'Intersection between School & Market.' },
  { id: 'W_S_MK', x: 690, y: 750, name: 'Market Waypoint', full: 'Southern Road in front of Market', icon: '🚦', type: 'junction', blurb: 'Road in front of Market.' },
  { id: 'J_SB', x: 905, y: 750, name: 'Bank South Junction', full: 'Southern Road & Bank Road', icon: '🚦', type: 'junction', blurb: 'Intersection between Market & Museum.' },
  { id: 'W_S_MU', x: 1115, y: 750, name: 'Museum Waypoint', full: 'Southern Road in front of Museum', icon: '🚦', type: 'junction', blurb: 'Road in front of Museum.' },
  { id: 'J_SE', x: 1325, y: 750, name: 'East South Junction', full: 'Southern Road & East Lane', icon: '🚦', type: 'junction', blurb: 'Southeast corner intersection.' }
];

const BY_ID = {};
PLACES.forEach(p => { BY_ID[p.id] = p; });

const nodeXY = (id) => ({ x: BY_ID[id].x, y: BY_ID[id].y });

/* ── 2. ADJACENCY & ROAD PATHS (STRICTLY ON ASPHALT ROAD INTERSECTIONS) ── */
const ADJ = {
  // ── BUILDING ENTRANCES (DEAD-END SPURS LEADING DIRECTLY TO DOORS/STEPS) ──
  RS: { S: 'W_N_RS' },
  AP: { S: 'W_N_AP' },
  PG: { S: 'W_N_PG' },
  HO: { S: 'W_C_HO' },
  NP: { S: 'W_C_NP' },
  BK: { S: 'W_C_BK' },
  SC: { S: 'W_S_SC' },
  MK: { N: 'W_C_NP', S: 'W_S_MK' },
  MU: { S: 'W_S_MU' },

  // ── ROW 0: TOP 3 DEAD-END ROADS (Y = 60) ──
  LA: { S: 'W_N_1' },
  D_N2: { S: 'W_N_2' },
  D_N3: { S: 'W_N_3' },

  // ── ROW 1: NORTHERN AVENUE (Y = 245) ──
  J_NW: { E: 'W_N_RS', S: 'J_CW' },
  W_N_RS: { W: 'J_NW', E: 'W_N_1', N: 'RS' },
  W_N_1: { W: 'W_N_RS', E: 'J_NH', N: 'LA' },
  J_NH: { W: 'W_N_1', E: 'W_N_2', S: 'J_CH' },
  W_N_2: { W: 'J_NH', E: 'W_N_AP', N: 'D_N2' },
  W_N_AP: { W: 'W_N_2', E: 'J_NB', N: 'AP' },
  J_NB: { W: 'W_N_AP', E: 'W_N_3', S: 'J_CB' },
  W_N_3: { W: 'J_NB', E: 'W_N_PG', N: 'D_N3' },
  W_N_PG: { W: 'W_N_3', E: 'J_NE', N: 'PG' },
  J_NE: { W: 'W_N_PG', S: 'J_CE' },

  // ── ROW 2: CENTRAL BOULEVARD (Y = 505) ──
  J_CW: { N: 'J_NW', E: 'W_C_HO', S: 'J_SW' },
  W_C_HO: { W: 'J_CW', E: 'J_CH', N: 'HO' },
  J_CH: { W: 'W_C_HO', E: 'W_C_NP', N: 'J_NH', S: 'J_SH' },
  W_C_NP: { W: 'J_CH', E: 'J_CB', N: 'NP', S: 'MK' },
  J_CB: { W: 'W_C_NP', E: 'W_C_BK', N: 'J_NB', S: 'J_SB' },
  W_C_BK: { W: 'J_CB', E: 'J_CE', N: 'BK' },
  J_CE: { W: 'W_C_BK', N: 'J_NE', S: 'J_SE' },

  // ── ROW 3: SOUTHERN ROAD (Y = 750) ──
  J_SW: { N: 'J_CW', E: 'W_S_SC' },
  W_S_SC: { W: 'J_SW', E: 'J_SH', N: 'SC' },
  J_SH: { W: 'W_S_SC', E: 'W_S_MK', N: 'J_CH' },
  W_S_MK: { W: 'J_SH', E: 'J_SB', N: 'MK' },
  J_SB: { W: 'W_S_MK', E: 'W_S_MU', N: 'J_CB' },
  W_S_MU: { W: 'J_SB', E: 'J_SE', N: 'MU' },
  J_SE: { W: 'W_S_MU', N: 'J_CE' }
};

function getRoadPoints(a, b) {
  const ax = BY_ID[a].x, ay = BY_ID[a].y;
  const bx = BY_ID[b].x, by = BY_ID[b].y;
  return [[ax, ay], [bx, by]];
}

const DIR_WORD = { N: 'North', S: 'South', E: 'East', W: 'West' };

/* ── 3. STREET NAME PLATES ─────────────────────────────────────────── */
const STREETS = [
  { id: 's1', name: 'NORTHERN AVE', x: 260, y: 245, angle: 0 },
  { id: 's2', name: 'NORTHERN AVE', x: 690, y: 245, angle: 0 },
  { id: 's3', name: 'NORTHERN AVE', x: 1115, y: 245, angle: 0 },
  { id: 's4', name: 'CENTRAL BLVD', x: 260, y: 505, angle: 0 },
  { id: 's5', name: 'CENTRAL BLVD', x: 690, y: 505, angle: 0 },
  { id: 's6', name: 'CENTRAL BLVD', x: 1115, y: 505, angle: 0 },
  { id: 's7', name: 'SOUTHERN ROAD', x: 260, y: 750, angle: 0 },
  { id: 's8', name: 'SOUTHERN ROAD', x: 690, y: 750, angle: 0 },
  { id: 's9', name: 'SOUTHERN ROAD', x: 1115, y: 750, angle: 0 },
  { id: 's10', name: 'WEST LANE', x: 50, y: 375, angle: -90 },
  { id: 's11', name: 'HOSPITAL WAY', x: 475, y: 375, angle: -90 },
  { id: 's12', name: 'BANK ROAD', x: 905, y: 630, angle: -90 },
  { id: 's13', name: 'EAST LANE', x: 1325, y: 375, angle: -90 },
];

/* ── 4. UNIQUE BUILDING LANDMARK BADGES (PERFECT POSITION & HIGHLIGHTED) ── */
const BUILDING_BADGES = [
  { id: 'b_rs', placeId: 'RS', name: 'Railway Station', icon: '🚂', x: 180, y: 110, color: '#F59E0B', label: 'RAILWAY STATION' },
  { id: 'b_pond', placeId: 'LA', name: 'Lake', icon: '🏞️', x: 375, y: 70, color: '#10B981', label: 'LAKE' },
  { id: 'b_ap', placeId: 'AP', name: 'Apartments', icon: '🏢', x: 835, y: 40, color: '#38BDF8', label: 'APARTMENTS' },
  { id: 'b_garden', placeId: 'PG', name: 'Public Garden', icon: '🌳', x: 1115, y: 75, color: '#10B981', label: 'PUBLIC GARDEN' },
  { id: 'b_ho', placeId: 'HO', name: 'Hospital', icon: '🏥', x: 230, y: 350, color: '#EF4444', label: 'HOSPITAL' },
  { id: 'b_th', placeId: 'NP', name: 'Nagar Panchayat', icon: '🏛️', x: 690, y: 360, color: '#F59E0B', label: 'NAGAR PANCHAYAT' },
  { id: 'b_bk', placeId: 'BK', name: 'Bank', icon: '🏦', x: 1115, y: 360, color: '#06B6D4', label: 'BANK' },
  { id: 'b_sc', placeId: 'SC', name: 'School', icon: '🏫', x: 230, y: 625, color: '#818CF8', label: 'SCHOOL' },
  { id: 'b_mk', placeId: 'MK', name: 'Market', icon: '🛍️', x: 690, y: 635, color: '#F59E0B', label: 'MARKET' },
  { id: 'b_mu', placeId: 'MU', name: 'Museum', icon: '🏛️', x: 1115, y: 630, color: '#A78BFA', label: 'MUSEUM' }
];

function streetBetween(aId, bId) {
  const a = BY_ID[aId], b = BY_ID[bId];
  if (!a || !b) return 'TOWN CORRIDOR';

  if (a.type === 'deadend' || b.type === 'deadend') {
    return 'North Road (Dead End)';
  }

  if (a.type !== 'junction' || b.type !== 'junction') {
    const bldg = a.type !== 'junction' ? a : b;
    return `${bldg.name} Entrance Path`;
  }

  if (a.y === b.y) {
    if (a.y === 245) return 'NORTHERN AVE';
    if (a.y === 505) return 'CENTRAL BLVD';
    if (a.y === 750) return 'SOUTHERN ROAD';
  }
  if (a.x === b.x) {
    if (a.x === 50) return 'WEST LANE';
    if (a.x === 475) return 'HOSPITAL WAY';
    if (a.x === 905) return 'BANK ROAD';
    if (a.x === 1325) return 'EAST LANE';
  }
  return 'TOWN CORRIDOR';
}

/* ── 4. REALISTIC ARTICULATED 3D HUMAN EXPLORER (NATURAL BIPEDAL WALK) ── */
const Realistic3DPerson = ({ x, y, angle, isWalking }) => {
  const facingLeft = angle === 'W' || angle === 270;
  
  return (
    <g transform={`translate(${x},${y})`} pointerEvents="none">
      {/* 1. Dynamic Dual Foot Shadows */}
      <g opacity="0.85">
        {/* Main Ambient Ground Shadow */}
        <ellipse cx="0" cy="3" rx="20" ry="7" fill="rgba(0,0,0,0.35)" style={{ filter: 'blur(3px)' }} />
        {/* Left Foot Contact Shadow */}
        <ellipse
          cx="-8"
          cy="3"
          rx="9"
          ry="4"
          fill="rgba(0,0,0,0.75)"
          style={{
            filter: 'blur(1px)',
            animation: isWalking ? 'leftFootShadow 0.65s infinite ease-in-out' : 'none'
          }}
        />
        {/* Right Foot Contact Shadow */}
        <ellipse
          cx="8"
          cy="3"
          rx="9"
          ry="4"
          fill="rgba(0,0,0,0.75)"
          style={{
            filter: 'blur(1px)',
            animation: isWalking ? 'rightFootShadow 0.65s infinite ease-in-out' : 'none'
          }}
        />
      </g>

      {/* 2. Asphalt Footstep Dust / Stepping Ripples */}
      {isWalking && (
        <g opacity="0.6">
          <circle cx="-10" cy="3" r="5" fill="#FDE68A" style={{ filter: 'blur(1.5px)', animation: 'stepDustLeft 0.65s infinite ease-out' }} />
          <circle cx="10" cy="3" r="5" fill="#FDE68A" style={{ filter: 'blur(1.5px)', animation: 'stepDustRight 0.65s infinite ease-out' }} />
        </g>
      )}

      {/* 3. GPS Location Beacon / Target Ground Ring */}
      {!isWalking && (
        <circle
          cx="0"
          cy="0"
          r="22"
          fill="none"
          stroke="#F59E0B"
          style={{ animation: 'pulseRing 1.8s infinite cubic-bezier(0.2, 0.8, 0.2, 1)' }}
        />
      )}
      <circle
        cx="0"
        cy="0"
        r="18"
        fill="none"
        stroke="#F59E0B"
        strokeWidth="1.8"
        opacity="0.8"
        strokeDasharray={isWalking ? '4 2' : 'none'}
      />
      <g transform={`rotate(${{ N: 0, E: 90, S: 180, W: 270 }[angle] || 0})`}>
        <polygon
          points="0,-26 5,-18 -5,-18"
          fill="#F59E0B"
          style={{
            filter: 'drop-shadow(0 0 5px #F59E0B)',
            animation: isWalking ? 'dirArrowBob 0.3s infinite ease-in-out' : 'none'
          }}
        />
      </g>

      {/* 4. Articulated Skeletal Animated Human Character */}
      <g
        transform={`translate(0, 2) scale(${facingLeft ? -1.35 : 1.35}, 1.35)`}
        style={{
          transformOrigin: '0 0',
        }}
      >
        <svg
          x="-35"
          y="-85"
          width="70"
          height="90"
          viewBox="-35 -85 70 90"
          overflow="visible"
        >
          <defs>
            {/* 3D Drop Shadow for Realism */}
            <filter id="dropShadow3D" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="1.5" dy="2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.4"/>
            </filter>

            {/* Shiny Spandex Red Gradient */}
            <linearGradient id="suitRed3D" x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#ff4d4d" />
              <stop offset="30%" stopColor="#cc0000" />
              <stop offset="80%" stopColor="#800000" />
              <stop offset="100%" stopColor="#330000" />
            </linearGradient>

            {/* Shiny Spandex Blue Gradient */}
            <linearGradient id="suitBlue3D" x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#4d94ff" />
              <stop offset="30%" stopColor="#0055cc" />
              <stop offset="80%" stopColor="#002266" />
              <stop offset="100%" stopColor="#000033" />
            </linearGradient>

            {/* Glossy Lens Gradient */}
            <linearGradient id="lensGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#F1F5F9" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
          </defs>

          {/* ── BACK ARM ── */}
          <g
            style={{
              transformOrigin: '-5px -52px',
              animation: isWalking ? 'backArmSwing 0.65s infinite ease-in-out' : 'none'
            }}
          >
            {/* Upper Arm Base (Blue) */}
            <rect x="-10" y="-52" width="7" height="15" rx="3.5" fill="url(#suitBlue3D)" />
            
            {/* Shoulder Cap (Red) */}
            <path d="M -10 -48.5 A 3.5 3.5 0 0 1 -6.5 -52 A 3.5 3.5 0 0 1 -3 -48.5 L -3 -45 Q -6.5 -42 -10 -45 Z" fill="url(#suitRed3D)" />

            {/* Lower Arm (Red Gloves) */}
            <g style={{ transformOrigin: '-7px -38px', animation: isWalking ? 'backForearmBend 0.65s infinite ease-in-out' : 'none' }}>
              <rect x="-9.5" y="-38" width="6" height="14" rx="3" fill="url(#suitRed3D)" />
              {/* Hand / Fist */}
              <ellipse cx="-6.5" cy="-22.5" rx="4" ry="4.5" fill="url(#suitRed3D)" />
              {/* Glove Web Lines */}
              <g opacity="0.3">
                <path d="M -6.5 -37 L -6.5 -19" stroke="#000" strokeWidth="0.5" />
                <path d="M -9.5 -33 Q -6.5 -31 -3.5 -33 M -9.5 -28 Q -6.5 -26 -3.5 -28 M -10.5 -22 Q -6.5 -20 -2.5 -22" fill="none" stroke="#000" strokeWidth="0.5" />
              </g>
            </g>
          </g>

          {/* ── BACK / LEFT LEG ── */}
          <g
            style={{
              transformOrigin: '-3px -30px',
              animation: isWalking ? 'leftLegSwing 0.65s infinite ease-in-out' : 'none'
            }}
          >
            {/* Upper Leg (Blue) */}
            <rect x="-6" y="-30" width="7" height="16" rx="3.5" fill="url(#suitBlue3D)" />
            {/* Lower Leg & Boot (Red) */}
            <g style={{ transformOrigin: '-2.5px -15px', animation: isWalking ? 'leftKneeBend 0.65s infinite ease-in-out' : 'none' }}>
              <rect x="-5.5" y="-15" width="6" height="15" rx="3" fill="url(#suitRed3D)" />
              <g transform="translate(-6.5, -2)">
                <path d="M 0 0 L 11 0 Q 14 0 14 -3 L 13 -6 Q 10 -6 8 -4 L 2 -4 Z" fill="url(#suitRed3D)" />
              </g>
              {/* Boot Web Lines */}
              <g opacity="0.3">
                <path d="M -2.5 -14 L -2.5 0" stroke="#000" strokeWidth="0.5" />
                <path d="M -5.5 -10 Q -2.5 -8 0.5 -10 M -5.5 -4 Q -2.5 -2 0.5 -4" fill="none" stroke="#000" strokeWidth="0.5" />
              </g>
            </g>
          </g>

          {/* ── FRONT / RIGHT LEG ── */}
          <g
            style={{
              transformOrigin: '4px -30px',
              animation: isWalking ? 'rightLegSwing 0.65s infinite ease-in-out' : 'none'
            }}
            filter="url(#dropShadow3D)"
          >
            {/* Upper Leg (Blue) */}
            <rect x="1" y="-30" width="7.5" height="16" rx="3.5" fill="url(#suitBlue3D)" />
            {/* Lower Leg & Boot (Red) */}
            <g style={{ transformOrigin: '4.5px -15px', animation: isWalking ? 'rightKneeBend 0.65s infinite ease-in-out' : 'none' }}>
              <rect x="1.5" y="-15" width="6.5" height="15" rx="3" fill="url(#suitRed3D)" />
              <g transform="translate(0.5, -2)">
                <path d="M 0 0 L 11 0 Q 14 0 14 -3 L 13 -6 Q 10 -6 8 -4 L 2 -4 Z" fill="url(#suitRed3D)" />
              </g>
              {/* Boot Web Lines */}
              <g opacity="0.3">
                <path d="M 4.5 -14 L 4.5 0" stroke="#000" strokeWidth="0.5" />
                <path d="M 1.5 -10 Q 4.5 -8 8 -10 M 1.5 -4 Q 4.5 -2 8 -4" fill="none" stroke="#000" strokeWidth="0.5" />
              </g>
            </g>
          </g>

          {/* ── TORSO & HEAD ── */}
          <g
            style={{
              transformOrigin: '0 -30px',
              animation: isWalking
                ? 'torsoBob 0.65s infinite ease-in-out'
                : 'idleBreathing 2.2s infinite ease-in-out'
            }}
          >
            {/* Belt */}
            <rect x="-8" y="-33" width="16" height="6" rx="2" fill="url(#suitRed3D)" />

            {/* Suit Body Red Base */}
            <path
              d="M -9 -33 L -11 -56 Q -11 -60 -6 -61 L 6 -61 Q 11 -60 11 -56 L 9 -33 Z"
              fill="url(#suitRed3D)"
            />

            {/* Custom Torso Web Lines */}
            <g opacity="0.3">
              <path d="M -4 -61 L -3 -33 M 4 -61 L 3 -33" stroke="#000" strokeWidth="0.6" />
              <path d="M -9 -52 Q 0 -47 9 -52 M -9 -44 Q 0 -40 9 -44 M -8 -37 Q 0 -35 8 -37" fill="none" stroke="#000" strokeWidth="0.6" />
            </g>

            {/* Left Blue Panel (Curved V-shape) */}
            <path d="M -9 -33 L -10.5 -46 Q -10.5 -48 -9 -48 Q -6 -40 -3 -33 Z" fill="url(#suitBlue3D)" />
            
            {/* Right Blue Panel (Curved V-shape) */}
            <path d="M 9 -33 L 10.5 -46 Q 10.5 -48 9 -48 Q 6 -40 3 -33 Z" fill="url(#suitBlue3D)" />
            
            {/* Sprawling Spider Logo */}
            <g transform="translate(0, -43) scale(1.4)">
              <circle cx="0" cy="-2" r="1.5" fill="#09090b" />
              <polygon points="0,3 1.5,0 -1.5,0" fill="#09090b" />
              {/* Thick Spider Legs */}
              <path d="M -1 -2 L -4 -5 M -1.5 -1 L -5 -2 M -1.5 0 L -5 2 M -1 1 L -4 4" fill="none" stroke="#09090b" strokeWidth="1" strokeLinecap="round" />
              <path d="M 1 -2 L 4 -5 M 1.5 -1 L 5 -2 M 1.5 0 L 5 2 M 1 1 L 4 4" fill="none" stroke="#09090b" strokeWidth="1" strokeLinecap="round" />
            </g>

            {/* Neck */}
            <rect x="-3" y="-66" width="6" height="6" rx="2" fill="url(#suitRed3D)" />

            {/* 3D Head Spiderman */}
            <g transform="translate(0, -68)" filter="url(#dropShadow3D)">
              {/* Head Base (Oval for realism) */}
              <ellipse cx="0" cy="-5" rx="9" ry="10.5" fill="url(#suitRed3D)" />
              
              {/* Manual Web Lines for Realism */}
              <g opacity="0.3">
                <path d="M 0 -15.5 L 0 5.5" stroke="#000" strokeWidth="0.6" />
                <path d="M -6.5 -13.5 L 6.5 3.5 M 6.5 -13.5 L -6.5 3.5" stroke="#000" strokeWidth="0.6" />
                <path d="M -8.5 -5 Q 0 -2 8.5 -5 M -7 -10 Q 0 -7 7 -10 M -5 0 Q 0 3 5 0" fill="none" stroke="#000" strokeWidth="0.6" />
              </g>

              {/* Head Shadow Overlay */}
              <ellipse cx="0" cy="-5" rx="9" ry="10.5" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="1" />
              
              {/* Iconic Angled Spider-Man Eyes */}
              <g transform="translate(0, -4.5)">
                {/* Right Eye */}
                <path d="M 1.5 -0.5 L 8 -3.5 Q 8 2.5 1.5 3.5 Z" fill="url(#lensGrad)" stroke="#000000" strokeWidth="1.6" strokeLinejoin="round" />
                {/* Left Eye */}
                <path d="M -1.5 -0.5 L -8 -3.5 Q -8 2.5 -1.5 3.5 Z" fill="url(#lensGrad)" stroke="#000000" strokeWidth="1.6" strokeLinejoin="round" />
              </g>
            </g>

            {/* ── FRONT ARM ── */}
            <g
              style={{
                transformOrigin: '7px -52px',
                animation: isWalking ? 'frontArmSwing 0.65s infinite ease-in-out' : 'none'
              }}
              filter="url(#dropShadow3D)"
            >
              {/* Upper Arm Base (Blue) */}
              <rect x="3.5" y="-52" width="7.5" height="15" rx="3.75" fill="url(#suitBlue3D)" />
              
              {/* Shoulder Cap (Red) */}
              <path d="M 3.5 -48.25 A 3.75 3.75 0 0 1 7.25 -52 A 3.75 3.75 0 0 1 11 -48.25 L 11 -45 Q 7.25 -42 3.5 -45 Z" fill="url(#suitRed3D)" />

              {/* Lower Arm (Red Gloves) */}
              <g style={{ transformOrigin: '7px -38px', animation: isWalking ? 'frontForearmBend 0.65s infinite ease-in-out' : 'none' }}>
                <rect x="4" y="-38" width="6.5" height="14" rx="3.2" fill="url(#suitRed3D)" />
                {/* Hand / Fist */}
                <ellipse cx="7.2" cy="-22.5" rx="4.2" ry="4.7" fill="url(#suitRed3D)" />
                {/* Glove Web Lines */}
                <g opacity="0.3">
                  <path d="M 7.2 -37 L 7.2 -19" stroke="#000" strokeWidth="0.5" />
                  <path d="M 4 -33 Q 7.2 -31 10.5 -33 M 4 -28 Q 7.2 -26 10.5 -28 M 3 -22 Q 7.2 -20 11.4 -22" fill="none" stroke="#000" strokeWidth="0.5" />
                </g>
              </g>
            </g>
          </g>
        </svg>
      </g>
    </g>
  );
};



/* ── 6. WRONG DIRECTION & DEAD END POPUPS ──────────────────────────── */
const WrongDirPopup = ({ show, direction }) => {
  if (!show) return null;
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 999,
      background: 'linear-gradient(145deg, #1E293B, #0F172A)',
      border: '2px solid #EF4444',
      borderRadius: '16px',
      padding: '16px 28px',
      boxShadow: '0 16px 40px rgba(0,0,0,0.7), 0 0 25px rgba(239,68,68,0.35)',
      textAlign: 'center',
      minWidth: '260px',
      pointerEvents: 'none'
    }}>
      <div style={{ fontSize: '28px', marginBottom: '4px' }}>⚠️</div>
      <div style={{ fontSize: '15px', fontWeight: 900, color: '#FCA5A5', fontFamily: 'Space Grotesk, sans-serif' }}>
        WRONG DIRECTION!
      </div>
      <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#FDE047', marginTop: '4px' }}>
        No road {direction?.toUpperCase()} — Dead end ahead!
      </div>
      <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px', fontWeight: 600 }}>
        Turn back toward an open road corridor or landmark.
      </div>
    </div>
  );
};

const EmptyRoadPopup = ({ show }) => {
  if (!show) return null;
  return (
    <div style={{
      position: 'absolute',
      top: '28%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 999,
      background: 'linear-gradient(145deg, #1E293B, #0F172A)',
      border: '2px solid #EF4444',
      borderRadius: '16px',
      padding: '16px 24px',
      boxShadow: '0 16px 40px rgba(0,0,0,0.7), 0 0 25px rgba(239,68,68,0.35)',
      textAlign: 'center',
      minWidth: '280px',
      pointerEvents: 'none'
    }}>
      <div style={{ fontSize: '26px', marginBottom: '4px' }}>⚠️</div>
      <div style={{ fontSize: '15.5px', fontWeight: 900, color: '#FCA5A5', fontFamily: 'Space Grotesk, sans-serif' }}>
        WRONG DIRECTION!
      </div>
      <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#F87171', marginTop: '4px' }}>
        Road Closure / Dead End ahead!
      </div>
      <div style={{ fontSize: '11.5px', color: '#CBD5E1', marginTop: '3px' }}>
        No buildings nearby. Turn back toward a landmark!
      </div>
    </div>
  );
};

/* ── 7. TOWN MAP ACTIVITY QUESTIONS (CLASS 6) ─────────────────────────── */
const TOWN_MAP_QUESTIONS = [
  {
    id: 'q1',
    tag: 'Town Landmarks',
    question: '1. Mark the hospital on the Town Map by clicking on the hospital building:',
    interactiveType: 'map_click',
    targetLandmark: 'Hospital',
    right: 'Correct! You have marked the Hospital on the Town Map (South of Railway Station along West Lane 🏥).',
    wrong: 'Look at the map: The Hospital (🏥) is situated South of the Railway Station along West Lane. Click on the Hospital building!'
  },
  {
    id: 'q2',
    tag: 'Map Colours',
    question: '2. What is the meaning of the blue-coloured areas?',
    options: [
      'Water bodies (such as ponds, lakes, and rivers)',
      'Vegetation, trees and playgrounds',
      'Asphalt roads and railway tracks'
    ],
    answer: 'Water bodies (such as ponds, lakes, and rivers)',
    right: 'Correct! Blue is the standard conventional color universally used on maps to represent water bodies like ponds and lakes.',
    wrong: 'Standard cartography always uses Blue for water bodies like ponds, lakes, and streams.'
  },
  {
    id: 'q3',
    tag: 'Distance & Scale',
    question: '3. Which is farther away from the railway station — the school, the Nagar Panchayat or the public garden?',
    options: [
      'The public garden',
      'The school',
      'The Nagar Panchayat'
    ],
    answer: 'The public garden',
    right: 'Correct! The Public Garden (located in the far North-East corner) is the farthest away across multiple road blocks from the Railway Station.',
    wrong: 'Measuring the road distance shows the Public Garden in the far North-East corner is the farthest from the Railway Station.'
  },
  {
    id: 'q4',
    tag: 'Town Map Navigation',
    question: '4. In which overall direction is the Bank located from the Railway Station on the Town Map?',
    options: [
      'South-East (SE)',
      'North-West (NW)',
      'Due North'
    ],
    answer: 'South-East (SE)',
    right: 'Correct! The Bank is in the lower-right section of the town, which is South-East (SE) from the Railway Station.',
    wrong: 'Look at the cardinal compass: Heading down and right to the Bank is South-East (SE).'
  }
];

/* ── 8. MAIN TOWN MAP 3D COMPONENT ─────────────────────────────────── */
const TownMap3DExplorer = ({ onComplete, onNext, hideSidebar = false }) => {
  const START = 'RS';
  const GOAL = 'BK';

  const [cur, setCur] = useState(START);
  const [personPos, setPersonPos] = useState(nodeXY(START));
  const [isWalking, setIsWalking] = useState(false);
  const [heading, setHeading] = useState('E');
  const [activeStreet, setActiveStreet] = useState('M.G. ROAD');
  const [trail, setTrail] = useState([nodeXY(START)]);
  const [visited, setVisited] = useState({ [START]: true });
  const [log, setLog] = useState([{ text: `Ready at ${BY_ID[START].name}. Walk to ${BY_ID[GOAL].name}!`, ok: true }]);
  const [won, setWon] = useState(false);
  const [wrongDir, setWrongDir] = useState(null);
  const [emptyWarn, setEmptyWarn] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);

  /* ── TOWN MAP QUIZ STATE ── */
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizPage, setQuizPage] = useState(0);

  /* ── ZOOM, PAN & MAP-ALONE FULLSCREEN STATE ── */
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMapOnlyFullscreen, setIsMapOnlyFullscreen] = useState(false);

  /* ── DRAGGABLE & MINIMIZABLE DIRECTION CONTROLS STATE ── */
  const viewportRef = useRef(null);
  const [visitedSequence, setVisitedSequence] = useState([START]);
  const [dpadPos, setDpadPos] = useState(null);
  const [isDpadDragging, setIsDpadDragging] = useState(false);
  const [dpadDragOffset, setDpadDragOffset] = useState({ x: 0, y: 0 });
  const [isDpadMinimized, setIsDpadMinimized] = useState(false);
  const [isSidebarDpadMinimized, setIsSidebarDpadMinimized] = useState(false);

  const handleZoomIn = () => setZoom(z => Math.min(3.5, +(z + 0.25).toFixed(2)));
  const handleZoomOut = () => {
    setZoom(z => {
      const next = Math.max(0.65, +(z - 0.25).toFixed(2));
      return next;
    });
  };
  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };
  const toggleMapOnlyFullscreen = () => {
    setIsMapOnlyFullscreen(v => !v);
  };

  const startDpadDrag = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const vp = viewportRef.current;
    if (!vp) return;
    const rect = vp.getBoundingClientRect();
    const currentX = dpadPos ? dpadPos.x : (rect.width - 205);
    const currentY = dpadPos ? dpadPos.y : (rect.height - (isDpadMinimized ? 65 : 225));
    setIsDpadDragging(true);
    setDpadDragOffset({
      x: e.clientX - rect.left - currentX,
      y: e.clientY - rect.top - currentY
    });
  };

  const handleMouseMove = (e) => {
    if (isDpadDragging && viewportRef.current) {
      const rect = viewportRef.current.getBoundingClientRect();
      const rawX = e.clientX - rect.left - dpadDragOffset.x;
      const rawY = e.clientY - rect.top - dpadDragOffset.y;
      const dpadW = isDpadMinimized ? 170 : 190;
      const dpadH = isDpadMinimized ? 50 : 230;
      const clampedX = Math.max(10, Math.min(rect.width - dpadW - 10, rawX));
      const clampedY = Math.max(10, Math.min(rect.height - dpadH - 10, rawY));
      setDpadPos({ x: clampedX, y: clampedY });
    }
  };

  const handleMouseUp = () => {
    setIsDpadDragging(false);
  };

  const logRef = useRef(null);
  const rafRef = useRef(null);


  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [log]);

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  /* ── KEYBOARD ARROW CONTROLS (FULLSCREEN & NORMAL) ── */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        walkTo('N');
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        walkTo('S');
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        walkTo('W');
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        walkTo('E');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cur, isWalking, won]);

  const walkTo = (dir) => {
    if (isWalking || won) return;
    const targetId = ADJ[cur] && ADJ[cur][dir];
    if (!targetId) {
      setWrongDir(DIR_WORD[dir] || 'Dead End');
      setTimeout(() => setWrongDir(null), 1400);
      return;
    }

    const target = BY_ID[targetId];
    const street = streetBetween(cur, targetId);
    const points = getRoadPoints(cur, targetId);

    setIsWalking(true);
    setHeading(dir);
    setActiveStreet(street);
    setWrongDir(null);

    // If moving into a dead-end road node, show immediate dead-end popup!
    if (target.type === 'deadend') {
      setTimeout(() => {
        setWrongDir('Dead End Road — No Exit Ahead!');
        setTimeout(() => setWrongDir(null), 2400);
      }, 700);
    }

    const startPos = { ...personPos };
    const endPos = nodeXY(targetId);
    const duration = 1100;
    const startT = performance.now();

    const step = (now) => {
      const elapsed = now - startT;
      const t = Math.min(1, elapsed / duration);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      const cx = points[0][0] + (points[1][0] - points[0][0]) * ease;
      const cy = points[0][1] + (points[1][1] - points[0][1]) * ease;
      setPersonPos({ x: cx, y: cy });

      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setPersonPos(endPos);
        setIsWalking(false);
        setCur(targetId);
        setTrail(tr => [...tr, endPos]);
        setVisited(v => ({ ...v, [targetId]: true }));
        if (target.type !== 'empty') {
          setVisitedSequence(seq => seq.includes(targetId) ? seq : [...seq, targetId]);
        }
        setLog(l => [...l, { text: `Walked ${DIR_WORD[dir]} along ${street} to ${target.name}.`, ok: true }]);

        if (target.type === 'deadend') {
          setEmptyWarn(true);
          setTimeout(() => setEmptyWarn(false), 3000);
          setLog(l => [...l, { text: `⚠️ Wrong Direction! Dead end ahead. No buildings nearby. Turn back toward a landmark!`, ok: false }]);
        }

        if (targetId === GOAL) {
          setWon(true);
          setLog(l => [...l, { text: `🎉 Reached the ${BY_ID[GOAL].name}! Navigation successfully completed.`, ok: true }]);
          const finalVisited = target.type !== 'empty' && !visitedSequence.includes(targetId)
            ? [...visitedSequence, targetId]
            : visitedSequence;
          if (onComplete) onComplete({ steps: trail.length, visitedPlaces: finalVisited });
          setTimeout(() => {
            setShowQuizModal(true);
          }, 600);
        }
      }
    };

    rafRef.current = requestAnimationFrame(step);
  };

  const reset = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setCur(START);
    setPersonPos(nodeXY(START));
    setIsWalking(false);
    setHeading('E');
    setActiveStreet('NORTHERN AVE');
    setTrail([nodeXY(START)]);
    setVisited({ [START]: true });
    setVisitedSequence([START]);
    setWon(false);
    setWrongDir(null);
    setEmptyWarn(false);
    setLog([{ text: `Returned to ${BY_ID[START].name}. Reach the ${BY_ID[GOAL].name}!`, ok: true }]);
  };

  const curPlace = BY_ID[cur];
  const available = {
    N: ADJ[cur]?.N ? BY_ID[ADJ[cur].N] : null,
    S: ADJ[cur]?.S ? BY_ID[ADJ[cur].S] : null,
    E: ADJ[cur]?.E ? BY_ID[ADJ[cur].E] : null,
    W: ADJ[cur]?.W ? BY_ID[ADJ[cur].W] : null,
  };

  const DirBtn = ({ dir, label, arrow, gridArea }) => {
    const nb = available[dir];
    const off = !nb || isWalking || won;
    return (
      <button
        type="button"
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          walkTo(dir);
        }}
        disabled={off}
        title={nb ? `Walk ${DIR_WORD[dir]} to ${nb.name}` : `No road going ${DIR_WORD[dir]}`}
        style={{
          gridArea,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '2px',
          border: off ? '1.5px solid #E2E8F0' : 'none',
          background: off
            ? '#F8FAFC'
            : 'linear-gradient(145deg, #F59E0B 0%, #D97706 100%)',
          color: off ? '#94A3B8' : '#FFFFFF',
          opacity: off ? 0.6 : 1,
          borderRadius: '16px',
          padding: '6px',
          cursor: off ? 'not-allowed' : 'pointer',
          pointerEvents: off ? 'none' : 'auto',
          transition: 'all 0.15s ease',
          boxShadow: off ? 'none' : '0 4px 12px rgba(217,119,6,0.3)',
          width: '100%',
          height: '100%',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}
      >
        <div style={{ fontSize: '20px', lineHeight: 1, marginBottom: '2px' }}>{arrow}</div>
        <div style={{ fontSize: '13px', fontWeight: 900, fontFamily: 'Space Grotesk, sans-serif', lineHeight: 1 }}>{label}</div>
        {nb && (
          <div style={{ fontSize: '9px', fontWeight: 700, opacity: 0.9, width: '100%', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '4px' }}>
            {nb.name}
          </div>
        )}
      </button>
    );
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        position: isMapOnlyFullscreen ? 'fixed' : 'relative',
        inset: isMapOnlyFullscreen ? 0 : 'auto',
        zIndex: isMapOnlyFullscreen ? 99999 : 1,
        width: isMapOnlyFullscreen ? '100vw' : '100%',
        height: isMapOnlyFullscreen ? '100vh' : '100%',
        display: 'flex',
        padding: isMapOnlyFullscreen ? 0 : '14px',
        gap: isMapOnlyFullscreen ? 0 : '14px',
        overflow: 'hidden',
        background: isMapOnlyFullscreen ? '#FFFDF7' : '#F7F1E2',
        fontFamily: '"Space Grotesk", sans-serif',
        boxSizing: 'border-box'
      }}
    >
      <style>{`
        @keyframes hospitalPulse {
          0% { transform: scale(0.96); filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.7)); }
          50% { transform: scale(1.04); filter: drop-shadow(0 0 26px rgba(239, 68, 68, 0.98)); }
          100% { transform: scale(0.96); filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.7)); }
        }

        @keyframes hospitalBeaconRing {
          0% { r: 35px; opacity: 0.9; stroke-width: 3.5px; }
          60% { opacity: 0.45; stroke-width: 2px; }
          100% { r: 92px; opacity: 0; stroke-width: 0.5px; }
        }

        @keyframes hospitalGlowOutline {
          0% { stroke-dashoffset: 0; opacity: 0.85; }
          50% { opacity: 1; filter: drop-shadow(0 0 14px #EF4444); }
          100% { stroke-dashoffset: 32; opacity: 0.85; }
        }

        @keyframes targetPulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.45); }
          50% { transform: scale(1.015); box-shadow: 0 0 18px 2px rgba(239, 68, 68, 0.3); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.45); }
        }

        @keyframes markerBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }

        /* ── NATURAL BIPEDAL WALKING ANIMATION SKELETON ── */

        /* 1. Torso vertical bounce + slight forward tilt */
        @keyframes torsoBob {
          0%   { transform: translateY(0px) rotate(-1deg); }
          25%  { transform: translateY(-5px) rotate(1deg); }
          50%  { transform: translateY(0px) rotate(-1deg); }
          75%  { transform: translateY(-5px) rotate(1deg); }
          100% { transform: translateY(0px) rotate(-1deg); }
        }

        /* 2. Left Leg Hip Rotation */
        @keyframes leftLegSwing {
          0%   { transform: rotate(-30deg); }
          25%  { transform: rotate(-4deg); }
          50%  { transform: rotate(30deg); }
          75%  { transform: rotate(4deg); }
          100% { transform: rotate(-30deg); }
        }

        /* 3. Left Knee Bend */
        @keyframes leftKneeBend {
          0%   { transform: rotate(8deg); }
          25%  { transform: rotate(42deg); }
          50%  { transform: rotate(4deg); }
          75%  { transform: rotate(0deg); }
          100% { transform: rotate(8deg); }
        }

        /* 4. Right Leg Hip Rotation (180deg out of phase) */
        @keyframes rightLegSwing {
          0%   { transform: rotate(30deg); }
          25%  { transform: rotate(4deg); }
          50%  { transform: rotate(-30deg); }
          75%  { transform: rotate(-4deg); }
          100% { transform: rotate(30deg); }
        }

        /* 5. Right Knee Bend */
        @keyframes rightKneeBend {
          0%   { transform: rotate(4deg); }
          25%  { transform: rotate(0deg); }
          50%  { transform: rotate(8deg); }
          75%  { transform: rotate(42deg); }
          100% { transform: rotate(4deg); }
        }

        /* 6. Front Arm Swing */
        @keyframes frontArmSwing {
          0%   { transform: rotate(-28deg); }
          50%  { transform: rotate(28deg); }
          100% { transform: rotate(-28deg); }
        }
        @keyframes frontForearmBend {
          0%   { transform: rotate(-10deg); }
          50%  { transform: rotate(-32deg); }
          100% { transform: rotate(-10deg); }
        }

        /* 7. Back Arm Swing */
        @keyframes backArmSwing {
          0%   { transform: rotate(28deg); }
          50%  { transform: rotate(-28deg); }
          100% { transform: rotate(28deg); }
        }
        @keyframes backForearmBend {
          0%   { transform: rotate(-32deg); }
          50%  { transform: rotate(-10deg); }
          100% { transform: rotate(-32deg); }
        }

        /* 8. Foot Shadow Pulsing with Step Contact */
        @keyframes leftFootShadow {
          0%   { transform: scale(0.65); opacity: 0.35; }
          50%  { transform: scale(1.15); opacity: 0.85; }
          100% { transform: scale(0.65); opacity: 0.35; }
        }
        @keyframes rightFootShadow {
          0%   { transform: scale(1.15); opacity: 0.85; }
          50%  { transform: scale(0.65); opacity: 0.35; }
          100% { transform: scale(1.15); opacity: 0.85; }
        }
        /* 9. Footstep Dust Ripples */
        @keyframes stepDustLeft {
          0%, 45% { r: 2px; opacity: 0; }
          50%     { r: 5px; opacity: 0.8; }
          75%     { r: 14px; opacity: 0; }
          100%    { r: 2px; opacity: 0; }
        }
        @keyframes stepDustRight {
          0%      { r: 5px; opacity: 0.8; }
          25%     { r: 14px; opacity: 0; }
          50%, 95%{ r: 2px; opacity: 0; }
          100%    { r: 5px; opacity: 0.8; }
        }

        /* 10. Idle Breathing */
        @keyframes idleBreathing {
          0%   { transform: translateY(0px) scale(1, 1); }
          50%  { transform: translateY(-2.5px) scale(0.99, 1.015); }
          100% { transform: translateY(0px) scale(1, 1); }
        }

        @keyframes pulseRing {
          0% { r: 18px; opacity: 0.85; stroke-width: 2.5px; }
          100% { r: 40px; opacity: 0; stroke-width: 0.5px; }
        }

        @keyframes dirArrowBob {
          0% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
          100% { transform: translateY(0); }
        }
      `}</style>

      {/* ══════════ BOX 1: 3D MAP VIEWPORT (STANDALONE BOX) ══════════ */}
      <div
        ref={viewportRef}
        style={{
          flex: 1,
          height: '100%',
          position: 'relative',
          minWidth: 0,
          background: '#FFFBEB',
          borderRadius: isMapOnlyFullscreen ? 0 : '18px',
          border: isMapOnlyFullscreen ? 'none' : '2px solid #FDE68A',
          boxShadow: isMapOnlyFullscreen ? 'none' : '0 6px 24px rgba(180, 83, 9, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.6)',
          overflow: 'hidden',
          cursor: 'default'
        }}
      >

        <WrongDirPopup show={!!wrongDir} direction={wrongDir} />
        <EmptyRoadPopup show={emptyWarn} />

        {/* ── TOP RIGHT TOOLBAR (ZOOM CONTROLS & FULLSCREEN TOGGLE) ── */}
        <div style={{
          position: 'absolute',
          top: '14px',
          right: '14px',
          zIndex: 120,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1.5px solid #FDE68A',
          borderRadius: '12px',
          padding: '4px 6px',
          boxShadow: '0 4px 16px rgba(60,40,20,0.08)'
        }}>
          {/* Zoom Out Button */}
          <button
            type="button"
            onClick={handleZoomOut}
            title="Zoom Out (−)"
            style={{
              background: '#FFFBEB',
              border: '1px solid #FCD34D',
              color: '#B45309',
              cursor: 'pointer',
              width: '28px',
              height: '28px',
              borderRadius: '7px',
              fontSize: '15px',
              fontWeight: 900,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s'
            }}
          >
            −
          </button>

          {/* Zoom Level Indicator */}
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#78350F', minWidth: '38px', textAlign: 'center', userSelect: 'none' }}>
            {Math.round(zoom * 100)}%
          </span>

          {/* Zoom In Button */}
          <button
            type="button"
            onClick={handleZoomIn}
            title="Zoom In (+)"
            style={{
              background: '#FFFBEB',
              border: '1px solid #FCD34D',
              color: '#B45309',
              cursor: 'pointer',
              width: '28px',
              height: '28px',
              borderRadius: '7px',
              fontSize: '15px',
              fontWeight: 900,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s'
            }}
          >
            +
          </button>

          {/* Reset View Button */}
          <button
            type="button"
            onClick={handleResetView}
            title="Reset View"
            style={{
              background: '#FFFBEB',
              border: '1px solid #FDE68A',
              color: '#78350F',
              cursor: 'pointer',
              width: '28px',
              height: '28px',
              borderRadius: '7px',
              fontSize: '13px',
              fontWeight: 900,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s'
            }}
          >
            ⟲
          </button>

          <div style={{ width: '1px', height: '18px', background: 'rgba(217,119,6,0.2)', margin: '0 2px' }} />

          {/* Fullscreen Toggle Symbol Button */}
          <button
            type="button"
            onClick={toggleMapOnlyFullscreen}
            title={isMapOnlyFullscreen ? "Exit Fullscreen" : "Fullscreen Map"}
            style={{
              background: isMapOnlyFullscreen ? '#EF4444' : '#F59E0B',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              width: '28px',
              height: '28px',
              borderRadius: '7px',
              fontSize: isMapOnlyFullscreen ? '14px' : '15px',
              fontWeight: 900,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              transition: 'all 0.15s'
            }}
          >
            {isMapOnlyFullscreen ? '✕' : '⛶'}
          </button>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <g
            transform={zoom === 1 ? undefined : `scale(${zoom})`}
            style={{
              transformOrigin: `${VIEW_W / 2}px ${VIEW_H / 2}px`,
              transition: 'transform 0.15s ease-out'
            }}
          >
            <defs>
              <linearGradient id="headlightBeam3D" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* ---------- 1. Map Background Image ---------- */}
            <image
              href={townMapStraightFig}
              x="0"
              y="0"
              width={VIEW_W}
              height={VIEW_H}
              preserveAspectRatio="none"
            />

            {/* ---------- 2. Street Name Badges ---------- */}
            <g id="ce-streets" pointerEvents="none">
              {STREETS.map(s => {
                const hot = activeStreet === s.name;
                const wdt = s.name.length * 6.6 + 18;
                return (
                  <g key={s.id} transform={`translate(${s.x},${s.y}) rotate(${s.angle})`}>
                    <rect
                      x={-wdt / 2}
                      y="-10"
                      width={wdt}
                      height="20"
                      rx="6"
                      fill={hot ? '#F59E0B' : 'rgba(15,23,42,0.85)'}
                      stroke={hot ? '#FFFFFF' : '#64748B'}
                      strokeWidth={hot ? 1.8 : 1}
                      style={{ filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.6))' }}
                    />
                    <text
                      x="0"
                      y="4.5"
                      textAnchor="middle"
                      fontSize="9.5"
                      fontWeight="800"
                      fill={hot ? '#1E293B' : '#E2E8F0'}
                      fontFamily="Space Grotesk, sans-serif"
                      letterSpacing="0.6px"
                    >
                      {s.name}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* ---------- 2.5 Unique Building Landmark Badges (Highlighted Words, No Overlap) ---------- */}
            <g id="ce-buildings" pointerEvents="none">
              {BUILDING_BADGES.map(b => {
                const isCur = curPlace && (curPlace.id === b.placeId || curPlace.name.toLowerCase().includes(b.name.toLowerCase()));
                const wdt = b.label.length * 6.8 + 30;
                return (
                  <g
                    key={b.id}
                    transform={`translate(${b.x}, ${b.y})`}
                    style={{
                      filter: isCur
                        ? `drop-shadow(0 0 12px ${b.color}) drop-shadow(0 4px 10px rgba(0,0,0,0.85))`
                        : 'drop-shadow(0 3px 8px rgba(0,0,0,0.75))',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {/* Outer highlight pill */}
                    <rect
                      x={-wdt / 2}
                      y="-11"
                      width={wdt}
                      height="22"
                      rx="7"
                      fill="rgba(15, 23, 42, 0.92)"
                      stroke={isCur ? '#FFFFFF' : b.color}
                      strokeWidth={isCur ? 2.2 : 1.5}
                    />
                    {/* Icon + Highlighted unique building name */}
                    <text
                      x="0"
                      y="4"
                      textAnchor="middle"
                      fontSize="9.5"
                      fontWeight="900"
                      fill="#FFFFFF"
                      fontFamily="Space Grotesk, system-ui, sans-serif"
                      letterSpacing="0.6px"
                    >
                      <tspan fill={b.color} style={{ fontSize: '11px', marginRight: '4px' }}>{b.icon} </tspan>
                      <tspan fill="#FFFFFF">{b.label}</tspan>
                    </text>
                  </g>
                );
              })}
            </g>

            {/* ---------- 3. Clean Route Trail Ribbon ---------- */}
            {trail.length > 1 && (
              <>
                <polyline
                  points={trail.map(p => `${p.x},${p.y}`).join(' ')}
                  fill="none"
                  stroke="#D97706"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.35"
                />
                <polyline
                  points={trail.map(p => `${p.x},${p.y}`).join(' ')}
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.85"
                />
              </>
            )}

            {/* ---------- 4. Clean Waypoints on Asphalt & Building Entrances ---------- */}
            {PLACES.map(p => {
              const isCur = cur === p.id;
              const isGoal = p.id === GOAL;
              const isSeen = visited[p.id];
              const isJunction = p.type === 'junction';

              if (p.type === 'deadend') {
                return (
                  <g key={p.id} transform={`translate(${p.x},${p.y})`} pointerEvents="none">
                    <circle
                      cx="0"
                      cy="0"
                      r={isCur ? 11 : 6.5}
                      fill={isCur ? '#EF4444' : '#DC2626'}
                      stroke="#FFFFFF"
                      strokeWidth={isCur ? 2.5 : 1.5}
                      opacity={0.9}
                      style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.6))' }}
                    />
                    <circle cx="0" cy="0" r={isCur ? 4 : 2} fill="#FFFFFF" />
                  </g>
                );
              }

              if (isJunction) {
                return (
                  <g key={p.id} transform={`translate(${p.x},${p.y})`} pointerEvents="none">
                    <circle
                      cx="0"
                      cy="0"
                      r={isCur ? 9 : 4.5}
                      fill={isCur ? '#F59E0B' : isSeen ? '#64748B' : '#1E293B'}
                      stroke="#FFFFFF"
                      strokeWidth={2}
                      opacity={isCur ? 1 : 0.6}
                      style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' }}
                    />
                    {isCur && <circle cx="0" cy="0" r="3" fill="#FFFFFF" />}
                  </g>
                );
              }

              return (
                <g key={p.id} transform={`translate(${p.x},${p.y})`} pointerEvents="none">
                  {/* Outer pulse for Goal & Landmark Entrances */}
                  {isGoal && (
                    <circle
                      cx="0"
                      cy="0"
                      r="18"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2"
                      opacity="0.85"
                    />
                  )}
                  <circle
                    cx="0"
                    cy="0"
                    r={isCur ? 14 : isGoal ? 13 : 9}
                    fill={isCur ? '#F59E0B' : isGoal ? '#10B981' : isSeen ? '#475569' : '#0F172A'}
                    stroke="#FFFFFF"
                    strokeWidth={isCur ? 2.5 : 1.8}
                    opacity={isCur || isGoal ? 1 : 0.88}
                    style={{ filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.6))' }}
                  />
                  <circle cx="0" cy="0" r={isCur ? 5 : 3} fill="#FFFFFF" />
                </g>
              );
            })}

            {/* ---------- 5. Interactive Hospital Clickable Hitbox & Mark Highlights ---------- */}
            <g
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation();
                setQuizAnswers(a => ({
                  ...a,
                  q1: true
                }));
              }}
            >
              <rect
                x="115"
                y="370"
                width="230"
                height="180"
                rx="14"
                fill={(!quizAnswers.q1 && showQuizModal && quizPage === 0) ? 'rgba(239, 68, 68, 0.08)' : 'rgba(239, 68, 68, 0.001)'}
                stroke={(!quizAnswers.q1 && showQuizModal && quizPage === 0) ? '#EF4444' : 'transparent'}
                strokeWidth="2"
                strokeDasharray={(!quizAnswers.q1 && showQuizModal && quizPage === 0) ? '6 4' : 'none'}
              >
                <title>Click to Mark Hospital (🏥)</title>
              </rect>
            </g>

            {/* Subtle invitation beacon if Q1 is currently active and hospital is not yet marked */}
            {(!quizAnswers.q1 && showQuizModal && quizPage === 0) && (
              <g transform="translate(230, 460)" pointerEvents="none">
                <circle
                  r="45"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="2"
                  opacity="0.75"
                  style={{ animation: 'hospitalBeaconRing 1.8s infinite linear' }}
                />
                <g transform="translate(0, -82)">
                  <rect
                    x="-75"
                    y="-12"
                    width="150"
                    height="24"
                    rx="7"
                    fill="rgba(15, 23, 42, 0.92)"
                    stroke="#EF4444"
                    strokeWidth="1.5"
                    style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.6))' }}
                  />
                  <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    fill="#FCA5A5"
                    fontSize="10"
                    fontWeight="800"
                    fontFamily="Space Grotesk, sans-serif"
                    letterSpacing="0.4px"
                  >
                    👆 CLICK TO MARK 🏥
                  </text>
                </g>
              </g>
            )}

            {/* Glowing Animated Red/Coral Highlight around Hospital when Marked */}
            {!!quizAnswers.q1 && (
              <g pointerEvents="none">
                {/* Glowing spotlight footprint around hospital building */}
                <rect
                  x="114"
                  y="368"
                  width="232"
                  height="182"
                  rx="14"
                  fill="rgba(239, 68, 68, 0.18)"
                  stroke="#EF4444"
                  strokeWidth="3.5"
                  strokeDasharray="8 5"
                  style={{
                    filter: 'drop-shadow(0 0 14px rgba(239, 68, 68, 0.85))',
                    animation: 'hospitalGlowOutline 1.5s linear infinite'
                  }}
                />

                {/* Corner highlight brackets */}
                <path d="M 114 390 L 114 368 L 136 368" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                <path d="M 324 368 L 346 368 L 346 390" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                <path d="M 114 528 L 114 550 L 136 550" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                <path d="M 324 550 L 346 550 L 346 528" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />

                {/* Expanding radar beacon rings */}
                <g transform="translate(230, 460)">
                  <circle
                    r="55"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="2.5"
                    opacity="0.8"
                    style={{ animation: 'hospitalBeaconRing 2s infinite ease-out' }}
                  />
                  <circle
                    r="75"
                    fill="rgba(239, 68, 68, 0.12)"
                    stroke="#FCA5A5"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    style={{ animation: 'hospitalPulse 2.4s ease-in-out infinite' }}
                  />
                </g>

                {/* 3D Floating Landmark Pin & Badge above Hospital */}
                <g transform="translate(230, 360)" style={{ animation: 'markerBounce 2.5s ease-in-out infinite' }}>
                  {/* Pin downward pointer */}
                  <polygon points="-8,0 8,0 0,14" fill="#DC2626" />

                  {/* Main Badge */}
                  <rect
                    x="-92"
                    y="-34"
                    width="184"
                    height="34"
                    rx="10"
                    fill="#DC2626"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    style={{ filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.65))' }}
                  />
                  <text
                    x="0"
                    y="-13"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="11.5"
                    fontWeight="900"
                    fontFamily="Space Grotesk, sans-serif"
                    letterSpacing="0.6px"
                  >
                    🏥 HOSPITAL MARKED ✓
                  </text>

                  {/* Mini sub-label tag */}
                  <rect
                    x="-74"
                    y="-50"
                    width="148"
                    height="14"
                    rx="4"
                    fill="#1E293B"
                    stroke="#EF4444"
                    strokeWidth="1"
                  />
                  <text
                    x="0"
                    y="-40"
                    textAnchor="middle"
                    fill="#FDE68A"
                    fontSize="7.5"
                    fontWeight="800"
                    fontFamily="Space Grotesk, sans-serif"
                    letterSpacing="0.5px"
                  >
                    WEST LANE (SOUTH OF RS)
                  </text>
                </g>
              </g>
            )}

            {/* ---------- 7. Realistic 3D Person Walker (Player Directions) ---------- */}
            <Realistic3DPerson
              x={personPos.x}
              y={personPos.y}
              angle={heading}
              isWalking={isWalking}
            />
          </g>
        </svg>

        {/* ── DRAGGABLE & MINIMIZABLE FLOATING DIRECTION CONTROLS (FULLSCREEN) ── */}
        {isMapOnlyFullscreen && (
          <div
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              left: dpadPos ? `${dpadPos.x}px` : 'auto',
              top: dpadPos ? `${dpadPos.y}px` : 'auto',
              right: dpadPos ? 'auto' : '20px',
              bottom: dpadPos ? 'auto' : '20px',
              zIndex: 160,
              background: 'rgba(15, 23, 42, 0.95)',
              backdropFilter: 'blur(14px)',
              border: '2px solid rgba(245, 158, 11, 0.45)',
              borderRadius: isDpadMinimized ? '999px' : '20px',
              padding: isDpadMinimized ? '8px 14px' : '10px 14px 12px',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.75), 0 0 20px rgba(217, 119, 6, 0.3)',
              display: 'flex',
              flexDirection: isDpadMinimized ? 'row' : 'column',
              alignItems: 'center',
              gap: isDpadMinimized ? '10px' : '8px',
              userSelect: 'none',
              cursor: isDpadDragging ? 'grabbing' : 'default',
              transition: isDpadDragging ? 'none' : 'box-shadow 0.2s ease, border-radius 0.2s ease'
            }}
          >
            {/* Drag Handle & Header */}
            <div
              onMouseDown={startDpadDrag}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: isDpadMinimized ? 'auto' : '100%',
                gap: '8px',
                cursor: 'grab',
                padding: '2px 0'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ fontSize: '11px', color: '#64748B', cursor: 'grab', letterSpacing: '-1px' }}>⋮⋮</span>
                <span style={{ fontSize: '10px', fontWeight: 900, color: '#F59E0B', letterSpacing: '0.6px' }}>
                  🧭 {isDpadMinimized ? 'CONTROLS' : 'DIRECTION CONTROLS'}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {!isDpadMinimized && (
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); reset(); }}
                    title="Reset Position"
                    style={{
                      background: 'transparent',
                      border: '1px solid #475569',
                      borderRadius: '6px',
                      color: '#94A3B8',
                      fontSize: '9px',
                      fontWeight: 700,
                      padding: '2px 5px',
                      cursor: 'pointer'
                    }}
                  >
                    ↺
                  </button>
                )}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setIsDpadMinimized(v => !v); }}
                  title={isDpadMinimized ? 'Expand Direction Controls' : 'Minimize Direction Controls'}
                  style={{
                    background: '#1E293B',
                    border: '1px solid #475569',
                    borderRadius: '6px',
                    color: '#E2E8F0',
                    fontSize: '10px',
                    fontWeight: 900,
                    padding: '2px 6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {isDpadMinimized ? '➕' : '➖'}
                </button>
              </div>
            </div>

            {/* Expanded D-Pad Content */}
            {!isDpadMinimized && (
              <>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 48px)',
                  gridTemplateRows: 'repeat(3, 44px)',
                  gridTemplateAreas: `
                    ". N ."
                    "W . E"
                    ". S ."
                  `,
                  gap: '6px'
                }}>
                  <DirBtn dir="N" label="N" arrow="▲" gridArea="N" isCompact />
                  <DirBtn dir="W" label="W" arrow="◀" gridArea="W" isCompact />
                  <DirBtn dir="E" label="E" arrow="▶" gridArea="E" isCompact />
                  <DirBtn dir="S" label="S" arrow="▼" gridArea="S" isCompact />
                </div>

                <div style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#F1F5F9',
                  textAlign: 'center',
                  background: 'rgba(30, 41, 59, 0.9)',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  border: '1px solid #334155',
                  maxWidth: '160px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  📍 {curPlace.name}
                </div>
              </>
            )}
          </div>
        )}

        {/* Bottom-Left Compass & Corridor HUD */}
        <div style={{
          position: 'absolute',
          bottom: isMapOnlyFullscreen ? '20px' : '14px',
          left: isMapOnlyFullscreen ? '20px' : '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1.5px solid #FDE68A',
          borderRadius: '14px',
          padding: '8px 16px',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 6px 20px rgba(60, 40, 20, 0.1)',
          zIndex: 110
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="34" height="34" viewBox="-20 -20 40 40">
              <circle r="18" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="1.5" />
              <g transform={`rotate(${{ N: 0, E: 90, S: 180, W: 270 }[heading]})`} style={{ transition: 'transform 0.25s ease' }}>
                <polygon points="0,-14 4,0 0,-1" fill="#EF4444" />
                <polygon points="0,-14 -4,0 0,-1" fill="#F87171" />
                <polygon points="0,14 4,0 0,1" fill="#94A3B8" />
                <polygon points="0,14 -4,0 0,1" fill="#CBD5E1" />
              </g>
            </svg>
            <div>
              <div style={{ fontSize: '9px', fontWeight: 800, color: '#92400E', letterSpacing: '1px' }}>HEADING</div>
              <div style={{ fontSize: '14px', fontWeight: 900, color: '#B45309' }}>{DIR_WORD[heading].toUpperCase()}</div>
            </div>
          </div>

          <div style={{ width: '1px', height: '24px', background: '#FDE68A' }} />

          <div>
            <div style={{ fontSize: '9px', fontWeight: 800, color: '#92400E', letterSpacing: '1px' }}>CORRIDOR</div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#1E293B' }}>{activeStreet}</div>
          </div>
        </div>
      </div>

      {/* ══════════ BOX 2: RIGHT STATION (PARALLEL SIDE-BY-SIDE ALIGNMENT) ══════════ */}
      {showQuizModal ? (
        <div style={{
          width: 'clamp(340px, 26vw, 390px)',
          flexShrink: 0,
          height: '100%',
          background: 'linear-gradient(165deg, #FFFDF8 0%, #FEF3C7 100%)',
          borderRadius: '16px',
          border: '2px solid #FDE68A',
          boxShadow: '0 8px 24px rgba(180, 83, 9, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
          display: isMapOnlyFullscreen ? 'none' : 'flex',
          flexDirection: 'column',
          padding: '10px 12px',
          gap: '6px',
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}>
          {/* Header */}
          <div style={{
            background: '#FFFFFF',
            border: '1.5px solid #FDE68A',
            borderRadius: '10px',
            padding: '6px 10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            boxShadow: '0 2px 8px rgba(60,40,20,0.04)'
          }}>
            <div>
              <div style={{ fontSize: '8.5px', fontWeight: 900, color: '#B45309', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                📝 MAP ACTIVITY QUESTIONS
              </div>
              <div style={{ fontSize: '11.5px', fontWeight: 900, color: '#1E293B', marginTop: '1px' }}>
                Question {quizPage + 1} of {TOWN_MAP_QUESTIONS.length}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowQuizModal(false)}
              title="Return to Direction Controls"
              style={{
                background: '#FEF3C7',
                border: '1px solid #FDE68A',
                borderRadius: '7px',
                padding: '3px 8px',
                fontSize: '9.5px',
                fontWeight: 800,
                color: '#92400E',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              🧭 Walk Mode
            </button>
          </div>

          {/* 4 Step Progress Bar */}
          <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
            {TOWN_MAP_QUESTIONS.map((q, idx) => {
              const isAnswered = !!quizAnswers[q.id];
              const isCurrent = idx === quizPage;
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setQuizPage(idx)}
                  style={{
                    flex: 1,
                    height: '4px',
                    borderRadius: '3px',
                    background: isCurrent
                      ? '#F59E0B'
                      : isAnswered
                      ? '#10B981'
                      : '#E2E8F0',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease'
                  }}
                  title={`Go to Question ${idx + 1}`}
                />
              );
            })}
          </div>

          {/* Active Question Card */}
          {(() => {
            const q = TOWN_MAP_QUESTIONS[quizPage] || TOWN_MAP_QUESTIONS[0];
            const isMapClick = q.interactiveType === 'map_click' || q.id === 'q1';
            const isMarked = !!quizAnswers[q.id];
            const picked = isMapClick ? (isMarked ? 'marked' : null) : (quizAnswers[q.id] || null);
            const isCorrect = isMapClick ? isMarked : (picked === q.answer);
            const optionLabels = ['A', 'B', 'C'];

            return (
              <div style={{
                flex: 1,
                minHeight: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: '#FFFFFF',
                border: `1.5px solid ${isCorrect ? '#10B981' : picked ? '#EF4444' : '#FDE68A'}`,
                borderRadius: '12px',
                padding: '9px 11px',
                gap: '6px',
                boxShadow: '0 2px 10px rgba(60,40,20,0.05)',
                overflow: 'hidden'
              }}>
                {/* Question Header & Category */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{
                        background: '#FEF3C7',
                        color: '#92400E',
                        border: '1px solid #FDE68A',
                        fontSize: '9px',
                        fontWeight: 900,
                        padding: '1px 6px',
                        borderRadius: '5px',
                        letterSpacing: '0.4px'
                      }}>
                        Q{quizPage + 1}
                      </span>
                      <span style={{ fontSize: '9px', fontWeight: 800, color: '#78350F', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {q.tag}
                      </span>
                    </div>
                    {picked && (
                      <span style={{
                        background: isCorrect ? '#ECFDF5' : '#FEF2F2',
                        border: `1px solid ${isCorrect ? '#10B981' : '#EF4444'}`,
                        color: isCorrect ? '#065F46' : '#991B1B',
                        fontSize: '9px',
                        fontWeight: 900,
                        padding: '1px 7px',
                        borderRadius: '999px'
                      }}>
                        {isCorrect ? '✓ Correct' : '✗ Try Again'}
                      </span>
                    )}
                  </div>

                  <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#1E293B', lineHeight: 1.35 }}>
                    {q.question}
                  </div>
                </div>

                {/* Question Content: Interactive Map Action (for Q1) OR 3 Multiple Choice Options */}
                {isMapClick ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {!isMarked ? (
                      <div style={{
                        background: '#FEF2F2',
                        border: '1.5px dashed #EF4444',
                        borderRadius: '9px',
                        padding: '8px 10px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        animation: 'targetPulse 2s infinite ease-in-out'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '7px',
                            background: '#FEE2E2',
                            border: '1.5px solid #EF4444',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px',
                            flexShrink: 0
                          }}>
                            🏥
                          </span>
                          <div>
                            <div style={{ fontSize: '11px', fontWeight: 900, color: '#991B1B' }}>
                              Interactive Map Action
                            </div>
                            <div style={{ fontSize: '9.5px', color: '#78350F', fontWeight: 700 }}>
                              Click the Hospital building directly on the map
                            </div>
                          </div>
                        </div>

                        <div style={{
                          background: '#FFFFFF',
                          borderRadius: '6px',
                          padding: '5px 8px',
                          fontSize: '10px',
                          color: '#3D2E24',
                          fontWeight: 700,
                          lineHeight: 1.3,
                          borderLeft: '3px solid #EF4444',
                          border: '1px solid #FEE2E2'
                        }}>
                          📍 <b>Clue:</b> South of Railway Station along West Lane (look for the building with the Red Cross 🏥 and ambulance).
                        </div>

                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          fontSize: '9.5px',
                          fontWeight: 800,
                          color: '#B91C1C',
                          padding: '4px 6px',
                          borderRadius: '5px',
                          background: '#FEE2E2'
                        }}>
                          <span style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: '#EF4444',
                            display: 'inline-block'
                          }} />
                          Tap / click on the Hospital in the map to answer!
                        </div>
                      </div>
                    ) : (
                      <div style={{
                        background: '#ECFDF5',
                        border: '1.5px solid #10B981',
                        borderRadius: '9px',
                        padding: '8px 10px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        boxShadow: '0 2px 8px rgba(16, 185, 129, 0.15)'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{
                              width: '26px',
                              height: '26px',
                              borderRadius: '7px',
                              background: '#10B981',
                              color: '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '14px',
                              flexShrink: 0
                            }}>
                              🏥
                            </span>
                            <div>
                              <div style={{ fontSize: '11px', fontWeight: 900, color: '#065F46' }}>
                                Hospital Marked on Map!
                              </div>
                              <div style={{ fontSize: '9px', color: '#047857', fontWeight: 700 }}>
                                South of Railway Station along West Lane
                              </div>
                            </div>
                          </div>
                          <span style={{
                            background: '#10B981',
                            color: '#FFFFFF',
                            fontSize: '8.5px',
                            fontWeight: 900,
                            padding: '2px 7px',
                            borderRadius: '999px'
                          }}>
                            ✓ Marked
                          </span>
                        </div>

                        <div style={{
                          fontSize: '9.5px',
                          color: '#065F46',
                          fontWeight: 700,
                          background: '#D1FAE5',
                          padding: '5px 8px',
                          borderRadius: '6px',
                          border: '1px solid #A7F3D0'
                        }}>
                          🎯 <b>Building Highlighted:</b> The hospital is highlighted with an animated beacon and landmark badge on the map.
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    {q.options && q.options.map((opt, oIdx) => {
                      const isOptionPicked = picked === opt;
                      const isOptionCorrect = opt === q.answer;
                      let bg = '#FFFBEB';
                      let border = '#FDE68A';
                      let color = '#78350F';
                      let badgeBg = '#FEF3C7';
                      let badgeColor = '#92400E';

                      if (picked !== null) {
                        if (isOptionCorrect) {
                          bg = '#ECFDF5';
                          border = '#10B981';
                          color = '#065F46';
                          badgeBg = '#10B981';
                          badgeColor = '#FFFFFF';
                        } else if (isOptionPicked) {
                          bg = '#FEF2F2';
                          border = '#EF4444';
                          color = '#991B1B';
                          badgeBg = '#EF4444';
                          badgeColor = '#FFFFFF';
                        }
                      }

                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setQuizAnswers(a => ({ ...a, [q.id]: opt }))}
                          style={{
                            textAlign: 'left',
                            padding: '7px 10px',
                            background: bg,
                            border: `1.5px solid ${border}`,
                            borderRadius: '8px',
                            color: color,
                            fontSize: '11px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                            fontFamily: '"Space Grotesk", sans-serif',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            lineHeight: 1.3
                          }}
                        >
                          <span style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            background: badgeBg,
                            color: badgeColor,
                            fontSize: '9.5px',
                            fontWeight: 900,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            {optionLabels[oIdx]}
                          </span>
                          <span style={{ flex: 1 }}>{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Explanation Card */}
                {picked ? (
                  <div style={{
                    padding: '6px 9px',
                    borderRadius: '7px',
                    background: isCorrect ? '#ECFDF5' : '#FEF2F2',
                    border: `1px solid ${isCorrect ? '#10B981' : '#EF4444'}`,
                    fontSize: '10px',
                    fontWeight: 700,
                    color: isCorrect ? '#065F46' : '#991B1B',
                    lineHeight: 1.35
                  }}>
                    {isCorrect ? `✓ ${q.right}` : `✗ ${q.wrong}`}
                  </div>
                ) : (
                  <div style={{
                    background: '#FFFBEB',
                    border: '1px dashed #FDE68A',
                    borderRadius: '7px',
                    padding: '5px 8px',
                    fontSize: '9.5px',
                    color: '#78350F',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    <span>💡</span>
                    <span>{isMapClick ? 'Click the Hospital building on the map on the left to mark it.' : 'Observe the Town Map on the left to find the correct answer.'}</span>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Footer Controls & Paging */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '6px',
            borderTop: '1px solid #FDE68A',
            paddingTop: '6px',
            flexShrink: 0
          }}>
            <button
              type="button"
              onClick={() => setQuizPage(p => Math.max(0, p - 1))}
              disabled={quizPage === 0}
              style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 800,
                fontSize: '10px',
                background: '#FEF3C7',
                color: '#78350F',
                border: '1px solid #FDE68A',
                borderRadius: '7px',
                padding: '5px 10px',
                cursor: quizPage === 0 ? 'not-allowed' : 'pointer',
                opacity: quizPage === 0 ? 0.35 : 1
              }}
            >
              ◀ Back
            </button>

            <div style={{ display: 'flex', gap: '4px' }}>
              {TOWN_MAP_QUESTIONS.map((_, i) => (
                <span
                  key={i}
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: i === quizPage ? '#F59E0B' : '#E2E8F0',
                    transition: 'all 0.2s ease'
                  }}
                />
              ))}
            </div>

            {quizPage < TOWN_MAP_QUESTIONS.length - 1 ? (
              <button
                type="button"
                onClick={() => setQuizPage(p => p + 1)}
                style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: 800,
                  fontSize: '10px',
                  background: '#F59E0B',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '7px',
                  padding: '5px 12px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)'
                }}
              >
                Next ▶
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (onNext) onNext();
                }}
                style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: 900,
                  fontSize: '10px',
                  background: '#10B981',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '7px',
                  padding: '5px 12px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)'
                }}
              >
                Next Activity ➔
              </button>
            )}
          </div>
        </div>
      ) : (
        <div style={{
          width: 'clamp(340px, 26vw, 390px)',
          flexShrink: 0,
          height: '100%',
          background: 'linear-gradient(165deg, #FFFDF8 0%, #FEF3C7 100%)',
          borderRadius: '16px',
          border: '2px solid #FDE68A',
          boxShadow: '0 8px 24px rgba(180, 83, 9, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
          display: (isMapOnlyFullscreen || hideSidebar) ? 'none' : 'flex',
          flexDirection: 'column',
          padding: '8px 10px',
          gap: '6px',
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}>
          {/* Destination Card */}
          <div style={{
            background: won ? '#ECFDF5' : '#FFFFFF',
            border: `1.5px solid ${won ? '#10B981' : '#FDE68A'}`,
            borderRadius: '10px',
            padding: '6px 10px',
            marginBottom: '6px',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 8px rgba(60, 40, 20, 0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '14px' }}>🎯</span>
              <span style={{ fontSize: '10.5px', fontWeight: 900, color: won ? '#065F46' : '#B45309', letterSpacing: '0.8px' }}>DESTINATION</span>
            </div>
            <span style={{ fontSize: '10.5px', fontWeight: 800, color: won ? '#065F46' : '#92400E', background: won ? '#D1FAE5' : '#FEF3C7', padding: '3px 8px', borderRadius: '6px', border: `1px solid ${won ? '#A7F3D0' : '#FDE68A'}` }}>
              Bank
            </span>
          </div>

          {/* 3. Direction Controls (D-pad) */}
          <div style={{
            background: '#FFFFFF',
            border: '1.5px solid #FDE68A',
            borderRadius: '10px',
            padding: '16px 20px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 2px 8px rgba(60, 40, 20, 0.04)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isSidebarDpadMinimized ? '0' : '16px' }}>
              <span style={{ fontSize: '11px', fontWeight: 900, color: '#92400E', letterSpacing: '0.8px' }}>🧭 DIRECTION CONTROLS</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  type="button"
                  onClick={reset}
                  style={{
                    background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '6px',
                    color: '#92400E', fontSize: '10px', fontWeight: 700, padding: '3px 8px', cursor: 'pointer'
                  }}
                >
                  ↺ Reset
                </button>
                <button
                  type="button"
                  onClick={() => setIsSidebarDpadMinimized(v => !v)}
                  title={isSidebarDpadMinimized ? "Expand Controls" : "Minimize Controls"}
                  style={{
                    background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '6px',
                    color: '#92400E', fontSize: '10px', fontWeight: 700, padding: '3px 8px', cursor: 'pointer'
                  }}
                >
                  {isSidebarDpadMinimized ? '➕' : '➖'}
                </button>
              </div>
            </div>

            {!isSidebarDpadMinimized && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                minHeight: 0
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 85px)',
                  gridTemplateRows: 'repeat(3, 85px)',
                  gridTemplateAreas: `
                    ". N ."
                    "W C E"
                    ". S ."
                  `,
                  gap: '6px',
                }}>
                  <DirBtn dir="N" label="N" arrow="▲" gridArea="N" />
                  <DirBtn dir="W" label="W" arrow="◀" gridArea="W" />
                  <div style={{ 
                    gridArea: 'C', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    background: '#FFFBEB',
                    borderRadius: '50%',
                    border: '2px solid #FDE68A',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
                    margin: '10px'
                  }}>
                    <span style={{ fontSize: '20px', color: '#B45309' }}>🧭</span>
                  </div>
                  <DirBtn dir="E" label="E" arrow="▶" gridArea="E" />
                  <DirBtn dir="S" label="S" arrow="▼" gridArea="S" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── SPIDER-MAN WELCOME POPUP ── */}
      {showWelcomePopup && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999999
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '40px',
            maxWidth: '480px',
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            border: '4px solid #FDE68A'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🕷️</div>
            <h2 style={{ color: '#92400E', fontSize: '28px', fontWeight: 900, marginBottom: '16px', fontFamily: 'Space Grotesk, sans-serif' }}>
              Welcome to the City!
            </h2>
            <p style={{ color: '#475569', fontSize: '18px', fontWeight: 600, lineHeight: 1.5, marginBottom: '32px' }}>
              Help Spider-Man navigate through the town to reach the Bank from the Railway Station. Use the Direction Controls to guide him safely!
            </p>
            <button
              onClick={() => setShowWelcomePopup(false)}
              style={{
                background: '#F59E0B',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
                padding: '16px 48px',
                fontSize: '20px',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)',
                fontFamily: 'Space Grotesk, sans-serif',
                transition: 'transform 0.15s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Let's Go!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TownMap3DExplorer;
