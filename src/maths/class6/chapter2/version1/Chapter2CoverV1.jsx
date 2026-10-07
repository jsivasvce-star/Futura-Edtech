import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './cover.css';

/**
 * Class 6 Mathematics · Chapter 2: LINES AND ANGLES (Version 1)
 * "LINES AND ANGLES ARE EVERYWHERE"
 * Pure Vector / SVG / CSS Animated Cover Engine (100% Silent, Crisp Vector Graphics)
 */
export default function Chapter2CoverV1({ onBackToDashboard, onStartExploring }) {
  const [currentScene, setCurrentScene] = useState(0); // 0 to 7
  const [doorAngle, setDoorAngle] = useState(15);
  const [clockAngle, setClockAngle] = useState(60);
  const animFrameRef = useRef(null);

  // Auto-advance scenes every 4 seconds for a cinematic journey
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentScene(prev => (prev + 1) % 8);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  // Continuous micro-animations for dynamic objects
  useEffect(() => {
    let start = performance.now();
    const animate = (time) => {
      const elapsed = (time - start) / 1000;
      
      // Door opening oscillation between 20deg and 105deg
      const dAngle = 25 + Math.sin(elapsed * 1.5) * 45 + 40;
      setDoorAngle(dAngle);

      // Clock hands smooth rotation
      const cAngle = ((elapsed * 25) % 150) + 30;
      setClockAngle(cAngle);

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  return (
    <div className="ch2-cover-page-root" id="chapter2-cover-v1">
      <div className="ch2-stage-viewport">
        {/* Subtle geometric blueprint grid */}
        <div className="ch2-blueprint-grid" />

        {/* Top-Left Back Button */}
        <button 
          className="ch2-top-back-btn" 
          onClick={onBackToDashboard}
          title="Back to Mathematics Department"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        {/* Prominent Header / Title Composition */}
        <div className="ch2-title-composition">
          <span className="ch2-label-chapter">CHAPTER 2</span>
          <h1 className="ch2-label-main-title">LINES AND ANGLES</h1>
          <p className="ch2-label-subtitle">Explore the Geometry Around You</p>
        </div>

        {/* SVG Vector Animation Stage */}
        <div className="ch2-animation-layer">
          <svg 
            className="ch2-svg-canvas"
            viewBox="0 0 1000 562.5" 
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Gradients */}
              <linearGradient id="ch2GlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.5" />
              </linearGradient>

              <linearGradient id="ch2FrameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="100%" stopColor="#1E293B" />
              </linearGradient>

              <linearGradient id="ch2DoorWood" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D97706" />
                <stop offset="50%" stopColor="#B45309" />
                <stop offset="100%" stopColor="#92400E" />
              </linearGradient>

              <linearGradient id="ch2AsphaltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>

              <linearGradient id="ch2WaterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.9" />
              </linearGradient>

              <linearGradient id="ch2ProtractorGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.95)" />
                <stop offset="50%" stopColor="rgba(224, 242, 254, 0.85)" />
                <stop offset="100%" stopColor="rgba(186, 230, 253, 0.7)" />
              </linearGradient>

              {/* Marker Arrow */}
              <marker id="ch2Arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#0284C7" />
              </marker>
            </defs>

            {/* ══════════════════════════════════════════════════════════════
                SCENE 0: WINDOW FRAME (RIGHT ANGLE)
                ══════════════════════════════════════════════════════════════ */}
            <g className={`ch2-scene-group ${currentScene === 0 ? 'scene-active' : 'scene-inactive'}`}>
              {/* Window Wall Opening & Outer Shadow */}
              <rect x="360" y="140" width="280" height="270" rx="14" fill="#E2E8F0" />
              <rect x="370" y="150" width="260" height="250" rx="10" fill="#FFFFFF" />

              {/* Window Frame */}
              <rect x="380" y="160" width="240" height="230" rx="6" fill="url(#ch2FrameGrad)" />
              
              {/* Glass Panes */}
              <rect x="390" y="170" width="105" height="100" fill="url(#ch2GlassGrad)" />
              <rect x="505" y="170" width="105" height="100" fill="url(#ch2GlassGrad)" />
              <rect x="390" y="280" width="105" height="100" fill="url(#ch2GlassGrad)" />
              <rect x="505" y="280" width="105" height="100" fill="url(#ch2GlassGrad)" />

              {/* Glass Reflection Stripes */}
              <path d="M 400 170 L 460 170 L 410 270 L 390 270 Z" fill="#FFFFFF" opacity="0.35" />
              <path d="M 515 170 L 575 170 L 525 270 L 505 270 Z" fill="#FFFFFF" opacity="0.35" />

              {/* Window Sill */}
              <rect x="350" y="388" width="300" height="18" rx="4" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.5" />

              {/* Mathematical Blue Highlight: Right Angle on Mullion & Transom */}
              <line x1="390" y1="275" x2="610" y2="275" stroke="#0284C7" strokeWidth="4.5" className="ch2-glow-stroke" />
              <line x1="500" y1="170" x2="500" y2="380" stroke="#0284C7" strokeWidth="4.5" className="ch2-glow-stroke" />

              {/* Right Angle Symbol at intersection (500, 275) */}
              <rect x="500" y="250" width="25" height="25" fill="rgba(2, 132, 199, 0.15)" stroke="#0284C7" strokeWidth="2.5" />
              <circle cx="500" cy="275" r="5" fill="#0284C7" className="ch2-cyan-pulse" />
            </g>

            {/* ══════════════════════════════════════════════════════════════
                SCENE 1: DOOR OPENING (DYNAMIC ANGLE)
                ══════════════════════════════════════════════════════════════ */}
            <g className={`ch2-scene-group ${currentScene === 1 ? 'scene-active' : 'scene-inactive'}`}>
              {/* Perspective Floor */}
              <polygon points="280,450 720,450 670,390 330,390" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1.5" />
              
              {/* Door Frame Outer */}
              <rect x="360" y="145" width="280" height="260" rx="8" fill="#475569" />
              <rect x="380" y="160" width="240" height="245" fill="#F8FAFC" />

              {/* Floor Threshold Line (Baseline) */}
              <line x1="380" y1="405" x2="620" y2="405" stroke="#0284C7" strokeWidth="4" className="ch2-glow-stroke" />

              {/* Swiveling Door Slab */}
              {(() => {
                const rad = (doorAngle * Math.PI) / 180;
                const doorWidth = 210;
                const endX = 380 + Math.cos(rad) * doorWidth * 0.9;
                const endY = 405 - Math.sin(rad) * 45;
                const topX = endX;
                const topY = endY - 230;

                return (
                  <g>
                    {/* Traced Arc on Floor */}
                    <path
                      d={`M 590,405 A 210 65 0 0 0 ${endX} ${endY}`}
                      fill="none"
                      stroke="#0284C7"
                      strokeWidth="2.5"
                      strokeDasharray="6,4"
                      opacity="0.8"
                    />

                    {/* Door Slab Polygon */}
                    <polygon
                      points={`380,165 380,405 ${endX},${endY} ${topX},${topY}`}
                      fill="url(#ch2DoorWood)"
                      stroke="#78350F"
                      strokeWidth="2"
                    />

                    {/* Door Handle */}
                    <circle cx={endX - 18} cy={topY + 120} r="4" fill="#FDE68A" stroke="#B45309" strokeWidth="1.5" />

                    {/* Highlighted Ray Along Bottom of Door */}
                    <line x1="380" y1="405" x2={endX} y2={endY} stroke="#0284C7" strokeWidth="4.5" className="ch2-glow-stroke" />

                    {/* Angle Arc at Hinge (380, 405) */}
                    <path
                      d={`M 440,405 A 60 20 0 0 0 ${380 + Math.cos(rad) * 60} ${405 - Math.sin(rad) * 15}`}
                      fill="rgba(2, 132, 199, 0.25)"
                      stroke="#0284C7"
                      strokeWidth="2.5"
                    />

                    {/* Vertex Dot at Hinge */}
                    <circle cx="380" cy="405" r="5" fill="#0284C7" className="ch2-cyan-pulse" />
                  </g>
                );
              })()}
            </g>

            {/* ══════════════════════════════════════════════════════════════
                SCENE 2: CLOCK HANDS (TIME & ANGLE)
                ══════════════════════════════════════════════════════════════ */}
            <g className={`ch2-scene-group ${currentScene === 2 ? 'scene-active' : 'scene-inactive'}`}>
              {/* Clock Outer Rim & Shadow */}
              <circle cx="500" cy="275" r="140" fill="#FFFFFF" stroke="#0F172A" strokeWidth="8" filter="drop-shadow(0 12px 24px rgba(0,0,0,0.08))" />
              <circle cx="500" cy="275" r="132" fill="#F8FAFC" />

              {/* Hour Indices (12 ticks) */}
              {[...Array(12)].map((_, i) => {
                const rot = i * 30;
                return (
                  <line
                    key={i}
                    x1="500"
                    y1="150"
                    x2="500"
                    y2={i % 3 === 0 ? "165" : "158"}
                    stroke="#334155"
                    strokeWidth={i % 3 === 0 ? "4" : "2"}
                    transform={`rotate(${rot} 500 275)`}
                  />
                );
              })}

              {/* Angle Sector (Wedge) Between Hands */}
              {(() => {
                const r = 85;
                const baseRad = -90 * (Math.PI / 180); // 12 o'clock
                const handRad = (clockAngle - 90) * (Math.PI / 180);
                const x1 = 500 + Math.cos(baseRad) * r;
                const y1 = 275 + Math.sin(baseRad) * r;
                const x2 = 500 + Math.cos(handRad) * r;
                const y2 = 275 + Math.sin(handRad) * r;

                return (
                  <path
                    d={`M 500 275 L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`}
                    fill="rgba(2, 132, 199, 0.18)"
                    stroke="#0284C7"
                    strokeWidth="2"
                    strokeDasharray="4,3"
                  />
                );
              })()}

              {/* Reference Hand (12 o'clock - Fixed Ray) */}
              <line x1="500" y1="275" x2="500" y2="160" stroke="#0284C7" strokeWidth="5" className="ch2-glow-stroke" markerEnd="url(#ch2Arrow)" />

              {/* Moving Hand (Sweeping Ray) */}
              {(() => {
                const handRad = (clockAngle - 90) * (Math.PI / 180);
                const hx = 500 + Math.cos(handRad) * 110;
                const hy = 275 + Math.sin(handRad) * 110;
                return (
                  <line x1="500" y1="275" x2={hx} y2={hy} stroke="#0284C7" strokeWidth="4.5" className="ch2-glow-stroke" markerEnd="url(#ch2Arrow)" />
                );
              })()}

              {/* Center Pin / Vertex */}
              <circle cx="500" cy="275" r="7" fill="#0284C7" className="ch2-cyan-pulse" />
              <circle cx="500" cy="275" r="3" fill="#FFFFFF" />
            </g>

            {/* ══════════════════════════════════════════════════════════════
                SCENE 3: ROAD INTERSECTION (CROSSROADS & ANGLES)
                ══════════════════════════════════════════════════════════════ */}
            <g className={`ch2-scene-group ${currentScene === 3 ? 'scene-active' : 'scene-inactive'}`}>
              {/* Surrounding Landscape / Ground */}
              <rect x="250" y="140" width="500" height="280" rx="12" fill="#E2E8F0" />
              
              {/* Horizontal Road */}
              <rect x="250" y="235" width="500" height="90" fill="url(#ch2AsphaltGrad)" />
              {/* Vertical / Diagonal Crossing Road */}
              <polygon points="450,140 550,140 550,420 450,420" fill="url(#ch2AsphaltGrad)" />

              {/* Road White Dashed Dividing Lines */}
              <line x1="250" y1="280" x2="440" y2="280" stroke="#F8FAFC" strokeWidth="3" strokeDasharray="14,10" />
              <line x1="560" y1="280" x2="750" y2="280" stroke="#F8FAFC" strokeWidth="3" strokeDasharray="14,10" />
              <line x1="500" y1="140" x2="500" y2="225" stroke="#F8FAFC" strokeWidth="3" strokeDasharray="14,10" />
              <line x1="500" y1="335" x2="500" y2="420" stroke="#F8FAFC" strokeWidth="3" strokeDasharray="14,10" />

              {/* Pedestrian Zebra Crossings */}
              {[240, 252, 264, 276, 288, 300, 312].map((y, idx) => (
                <rect key={`cw-left-${idx}`} x="430" y={y} width="16" height="6" fill="#F8FAFC" rx="1" />
              ))}
              {[240, 252, 264, 276, 288, 300, 312].map((y, idx) => (
                <rect key={`cw-right-${idx}`} x="554" y={y} width="16" height="6" fill="#F8FAFC" rx="1" />
              ))}

              {/* Mathematical Intersecting Lines (Curbs & Center Axis) */}
              <line x1="260" y1="280" x2="740" y2="280" stroke="#0284C7" strokeWidth="4" className="ch2-glow-stroke" />
              <line x1="500" y1="150" x2="500" y2="410" stroke="#0284C7" strokeWidth="4" className="ch2-glow-stroke" />

              {/* Opposite / Vertical Angles Highlight Arcs */}
              <path d="M 500,245 A 35 35 0 0 1 535,280" fill="none" stroke="#0EA5E9" strokeWidth="3" />
              <path d="M 500,315 A 35 35 0 0 1 465,280" fill="none" stroke="#0EA5E9" strokeWidth="3" />
              <circle cx="500" cy="280" r="6" fill="#0284C7" className="ch2-cyan-pulse" />
            </g>

            {/* ══════════════════════════════════════════════════════════════
                SCENE 4: BRIDGE STRUCTURE (TRUSS TRIANGLES & ANGLES)
                ══════════════════════════════════════════════════════════════ */}
            <g className={`ch2-scene-group ${currentScene === 4 ? 'scene-active' : 'scene-inactive'}`}>
              {/* Sky Backdrop & Water */}
              <rect x="250" y="140" width="500" height="280" rx="10" fill="#F0F9FF" />
              <rect x="250" y="340" width="500" height="80" rx="0" fill="url(#ch2WaterGrad)" />

              {/* Bridge Piers */}
              <rect x="300" y="320" width="30" height="90" fill="#64748B" rx="3" />
              <rect x="670" y="320" width="30" height="90" fill="#64748B" rx="3" />

              {/* Roadway Deck */}
              <rect x="260" y="320" width="480" height="14" fill="#334155" rx="2" />

              {/* Warren Truss Framework (Triangles) */}
              <g stroke="#0284C7" strokeWidth="3.5" className="ch2-glow-stroke">
                {/* Top Chord */}
                <line x1="330" y1="210" x2="670" y2="210" strokeWidth="4.5" />
                {/* Diagonal Members */}
                <line x1="280" y1="320" x2="330" y2="210" />
                <line x1="330" y1="210" x2="415" y2="320" />
                <line x1="415" y1="320" x2="500" y2="210" />
                <line x1="500" y1="210" x2="585" y2="320" />
                <line x1="585" y1="320" x2="670" y2="210" />
                <line x1="670" y1="210" x2="720" y2="320" />
                {/* Vertical Struts */}
                <line x1="415" y1="210" x2="415" y2="320" strokeWidth="2" strokeDasharray="3,3" />
                <line x1="500" y1="210" x2="500" y2="320" strokeWidth="2" />
                <line x1="585" y1="210" x2="585" y2="320" strokeWidth="2" strokeDasharray="3,3" />
              </g>

              {/* Highlight Structural Triangle & Angles */}
              <polygon points="415,320 500,210 585,320" fill="rgba(2, 132, 199, 0.12)" stroke="#0284C7" strokeWidth="3" />
              <path d="M 445,320 A 30 30 0 0 1 430,295" fill="none" stroke="#0EA5E9" strokeWidth="2.5" />
              <path d="M 480,235 A 30 30 0 0 1 520,235" fill="none" stroke="#0EA5E9" strokeWidth="2.5" />

              {/* Truss Joint Vertices */}
              {[
                [330, 210], [500, 210], [670, 210],
                [280, 320], [415, 320], [585, 320], [720, 320]
              ].map(([x, y], idx) => (
                <circle key={idx} cx={x} cy={y} r="5" fill="#0284C7" className="ch2-cyan-pulse" />
              ))}
            </g>

            {/* ══════════════════════════════════════════════════════════════
                SCENE 5: BICYCLE FRAME (LINE SEGMENTS & VERTICES)
                ══════════════════════════════════════════════════════════════ */}
            <g className={`ch2-scene-group ${currentScene === 5 ? 'scene-active' : 'scene-inactive'}`}>
              {/* Wheels with Spokes */}
              {/* Rear Wheel (360, 320) */}
              <circle cx="360" cy="320" r="65" fill="none" stroke="#475569" strokeWidth="6" />
              <circle cx="360" cy="320" r="60" fill="none" stroke="#94A3B8" strokeWidth="2" />
              <circle cx="360" cy="320" r="8" fill="#1E293B" />
              {[...Array(8)].map((_, i) => (
                <line key={i} x1="360" y1="320" x2={360 + Math.cos(i * Math.PI / 4) * 60} y2={320 + Math.sin(i * Math.PI / 4) * 60} stroke="#CBD5E1" strokeWidth="1" />
              ))}

              {/* Front Wheel (640, 320) */}
              <circle cx="640" cy="320" r="65" fill="none" stroke="#475569" strokeWidth="6" />
              <circle cx="640" cy="320" r="60" fill="none" stroke="#94A3B8" strokeWidth="2" />
              <circle cx="640" cy="320" r="8" fill="#1E293B" />
              {[...Array(8)].map((_, i) => (
                <line key={i} x1="640" y1="320" x2={640 + Math.cos(i * Math.PI / 4) * 60} y2={320 + Math.sin(i * Math.PI / 4) * 60} stroke="#CBD5E1" strokeWidth="1" />
              ))}

              {/* Crankset & Chain */}
              <circle cx="465" cy="320" r="18" fill="none" stroke="#64748B" strokeWidth="3" />

              {/* Diamond Bike Frame - Mathematical Line Segments */}
              <g stroke="#0284C7" strokeWidth="5" className="ch2-glow-stroke">
                {/* Chainstay: Rear Hub (360,320) to Bottom Bracket (465,320) */}
                <line x1="360" y1="320" x2="465" y2="320" />
                {/* Seatstay: Rear Hub (360,320) to Seat Lug (450,220) */}
                <line x1="360" y1="320" x2="450" y2="220" />
                {/* Seat Tube: Bottom Bracket (465,320) to Seat Lug (450,220) */}
                <line x1="465" y1="320" x2="450" y2="220" />
                {/* Down Tube: Bottom Bracket (465,320) to Head Tube (585,210) */}
                <line x1="465" y1="320" x2="585" y2="210" />
                {/* Top Tube: Seat Lug (450,220) to Head Tube (585,210) */}
                <line x1="450" y1="220" x2="585" y2="210" />
                {/* Fork: Head Tube (585,210) to Front Hub (640,320) */}
                <line x1="585" y1="210" x2="640" y2="320" />
              </g>

              {/* Saddle & Handlebar */}
              <path d="M 430 205 Q 450 200 470 208" stroke="#1E293B" strokeWidth="8" strokeLinecap="round" fill="none" />
              <path d="M 585 210 L 580 180 Q 580 170 600 175" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" fill="none" />

              {/* Frame Angle Arcs */}
              <path d="M 458,290 A 30 30 0 0 0 485,302" fill="none" stroke="#0EA5E9" strokeWidth="2.5" />
              <path d="M 470,222 A 25 25 0 0 1 460,245" fill="none" stroke="#0EA5E9" strokeWidth="2.5" />

              {/* Glowing Frame Vertices */}
              {[
                [360, 320], [465, 320], [450, 220], [585, 210], [640, 320]
              ].map(([x, y], idx) => (
                <circle key={idx} cx={x} cy={y} r="6" fill="#0284C7" className="ch2-cyan-pulse" />
              ))}
            </g>

            {/* ══════════════════════════════════════════════════════════════
                SCENE 6: GEOMETRIC PROGRESSION (POINT → SEGMENT → RAY → ANGLE)
                ══════════════════════════════════════════════════════════════ */}
            <g className={`ch2-scene-group ${currentScene === 6 ? 'scene-active' : 'scene-inactive'}`}>
              {/* Stage Card Grid Background */}
              <rect x="180" y="160" width="640" height="240" rx="16" fill="rgba(255, 255, 255, 0.85)" stroke="#BAE6FD" strokeWidth="2" filter="drop-shadow(0 10px 25px rgba(2, 132, 199, 0.08))" />

              {/* 1. POINT */}
              <g transform="translate(240, 275)">
                <circle cx="0" cy="0" r="18" fill="rgba(2, 132, 199, 0.15)" />
                <circle cx="0" cy="0" r="7" fill="#0284C7" className="ch2-cyan-pulse" />
                <text x="0" y="45" textAnchor="middle" fill="#0F172A" fontSize="13" fontWeight="800" letterSpacing="1">POINT</text>
              </g>

              {/* Transition Arrow 1 */}
              <path d="M 285 275 L 325 275" stroke="#94A3B8" strokeWidth="2" markerEnd="url(#ch2Arrow)" />

              {/* 2. LINE SEGMENT */}
              <g transform="translate(390, 275)">
                <line x1="-35" y1="0" x2="35" y2="0" stroke="#0284C7" strokeWidth="4.5" className="ch2-glow-stroke" />
                <circle cx="-35" cy="0" r="5" fill="#0284C7" />
                <circle cx="35" cy="0" r="5" fill="#0284C7" />
                <text x="0" y="45" textAnchor="middle" fill="#0F172A" fontSize="13" fontWeight="800" letterSpacing="1">LINE SEGMENT</text>
              </g>

              {/* Transition Arrow 2 */}
              <path d="M 445 275 L 485 275" stroke="#94A3B8" strokeWidth="2" markerEnd="url(#ch2Arrow)" />

              {/* 3. RAY */}
              <g transform="translate(550, 275)">
                <line x1="-30" y1="0" x2="45" y2="0" stroke="#0284C7" strokeWidth="4.5" className="ch2-glow-stroke" markerEnd="url(#ch2Arrow)" />
                <circle cx="-30" cy="0" r="5.5" fill="#0284C7" />
                <text x="0" y="45" textAnchor="middle" fill="#0F172A" fontSize="13" fontWeight="800" letterSpacing="1">RAY</text>
              </g>

              {/* Transition Arrow 3 */}
              <path d="M 615 275 L 655 275" stroke="#94A3B8" strokeWidth="2" markerEnd="url(#ch2Arrow)" />

              {/* 4. ANGLE */}
              <g transform="translate(730, 275)">
                {/* Base Ray */}
                <line x1="-25" y1="0" x2="45" y2="0" stroke="#0284C7" strokeWidth="4" className="ch2-glow-stroke" markerEnd="url(#ch2Arrow)" />
                {/* Inclined Ray */}
                <line x1="-25" y1="0" x2="35" y2="-40" stroke="#0284C7" strokeWidth="4" className="ch2-glow-stroke" markerEnd="url(#ch2Arrow)" />
                {/* Angle Arc */}
                <path d="M 5,0 A 30 30 0 0 0 1,-20" fill="rgba(2, 132, 199, 0.2)" stroke="#0EA5E9" strokeWidth="2.5" />
                <circle cx="-25" cy="0" r="5.5" fill="#0284C7" className="ch2-cyan-pulse" />
                <text x="0" y="45" textAnchor="middle" fill="#0F172A" fontSize="13" fontWeight="800" letterSpacing="1">ANGLE</text>
              </g>
            </g>

            {/* ══════════════════════════════════════════════════════════════
                SCENE 7: TRANSPARENT PROTRACTOR MEASURING ANGLE
                ══════════════════════════════════════════════════════════════ */}
            <g className={`ch2-scene-group ${currentScene === 7 ? 'scene-active' : 'scene-inactive'}`}>
              {/* Origin Vertex (500, 360) */}
              {/* Baseline Ray (0 deg) */}
              <line x1="500" y1="360" x2="720" y2="360" stroke="#0284C7" strokeWidth="4.5" className="ch2-glow-stroke" markerEnd="url(#ch2Arrow)" />
              {/* Arm Ray at 60 deg */}
              {(() => {
                const rad = (-60 * Math.PI) / 180;
                const ax = 500 + Math.cos(rad) * 230;
                const ay = 360 + Math.sin(rad) * 230;
                return (
                  <g>
                    <line x1="500" y1="360" x2={ax} y2={ay} stroke="#0284C7" strokeWidth="4.5" className="ch2-glow-stroke" markerEnd="url(#ch2Arrow)" />
                    {/* Angle Highlight Sector */}
                    <path
                      d={`M 500 360 L 590 360 A 90 90 0 0 0 ${500 + Math.cos(rad) * 90} ${360 + Math.sin(rad) * 90} Z`}
                      fill="rgba(2, 132, 199, 0.2)"
                      stroke="#0EA5E9"
                      strokeWidth="2.5"
                    />
                  </g>
                );
              })()}

              {/* Transparent Acrylic Protractor Body */}
              <path
                d="M 320,360 A 180 180 0 0 1 680,360 Z"
                fill="url(#ch2ProtractorGrad)"
                stroke="rgba(2, 132, 199, 0.6)"
                strokeWidth="2.5"
                filter="drop-shadow(0 16px 32px rgba(2, 132, 199, 0.15))"
              />
              {/* Inner Cutout */}
              <path
                d="M 420,360 A 80 80 0 0 1 580,360 Z"
                fill="#FAF7F2"
                stroke="rgba(2, 132, 199, 0.4)"
                strokeWidth="1.5"
              />

              {/* Protractor Radial Degree Ticks */}
              {[...Array(19)].map((_, i) => {
                const deg = i * 10;
                const r1 = 180;
                const r2 = deg % 30 === 0 ? 160 : deg % 10 === 0 ? 168 : 172;
                const rad = ((180 - deg) * Math.PI) / 180;
                const x1 = 500 + Math.cos(rad) * r1;
                const y1 = 360 - Math.sin(rad) * r1;
                const x2 = 500 + Math.cos(rad) * r2;
                const y2 = 360 - Math.sin(rad) * r2;

                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={deg === 60 ? "#0284C7" : "#475569"}
                    strokeWidth={deg === 60 ? "3.5" : deg % 30 === 0 ? "2" : "1"}
                  />
                );
              })}

              {/* Key Degree Labels along Arc (0, 30, 60, 90, 120, 150, 180) */}
              {[0, 30, 60, 90, 120, 150, 180].map((deg) => {
                const rad = ((180 - deg) * Math.PI) / 180;
                const tx = 500 + Math.cos(rad) * 148;
                const ty = 360 - Math.sin(rad) * 148;
                const isTarget = deg === 60;
                return (
                  <text
                    key={deg}
                    x={tx}
                    y={ty + 4}
                    textAnchor="middle"
                    fill={isTarget ? "#0284C7" : "#64748B"}
                    fontSize={isTarget ? "13" : "10"}
                    fontWeight={isTarget ? "900" : "600"}
                  >
                    {deg}°
                  </text>
                );
              })}

              {/* Center Origin Crosshair */}
              <line x1="485" y1="360" x2="515" y2="360" stroke="#0284C7" strokeWidth="2" />
              <line x1="500" y1="345" x2="500" y2="360" stroke="#0284C7" strokeWidth="2" />
              <circle cx="500" cy="360" r="5" fill="#0284C7" className="ch2-cyan-pulse" />
            </g>
          </svg>
        </div>

        {/* Real HTML/CSS START EXPLORING Button */}
        <div className="ch2-btn-wrapper">
          <button 
            className="ch2-start-exploring-btn"
            onClick={onStartExploring}
            id="chapter2-v1-start-exploring-btn"
          >
            <span>START EXPLORING</span>
            <ArrowRight size={20} className="ch2-btn-arrow" />
          </button>
        </div>

        {/* Minimal Scene Dot Stepper (Allows clicking to test each scene) */}
        <div className="ch2-scene-progress-bar">
          {[0, 1, 2, 3, 4, 5, 6, 7].map(idx => (
            <div 
              key={idx}
              className={`ch2-scene-dot ${currentScene === idx ? 'active' : ''}`}
              onClick={() => setCurrentScene(idx)}
              title={`Scene ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
