import React, { useState, useEffect, useMemo, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { motion } from 'framer-motion';
import { CheckCircle, RotateCcw, ArrowRight, Play, BookOpen, HelpCircle, Leaf, Sparkles, Compass, Maximize2, Minimize2 } from 'lucide-react';
import * as THREE from 'three';

// ---------------------------------------------------------
// 1. Procedural 3D Polished Chrome Steel Sewing Needle Model (Image 1 Style)
// ---------------------------------------------------------
function SteelSewingNeedle3D() {
  return (
    <group position={[0, 0.24, 0]} scale={[0.88, 0.88, 0.88]}>
      {/* 1. Main Stainless Steel Silver Needle Shaft */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.13, 0.13, 9.4, 32]} />
        <meshStandardMaterial
          color="#E2E8F0"
          metalness={0.98}
          roughness={0.12}
          envMapIntensity={2.0}
        />
      </mesh>

      {/* Top Specular Sheen Strip along needle length */}
      <mesh position={[0, 0.125, 0.04]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.015, 0.015, 9.2, 16]} />
        <meshBasicMaterial color="#FFFFFF" opacity={0.85} transparent />
      </mesh>

      {/* 2. Sharp Tapered Needle Point (Right End / Finish) */}
      <mesh position={[5.2, 0, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
        <coneGeometry args={[0.13, 1.05, 32]} />
        <meshStandardMaterial
          color="#E2E8F0"
          metalness={0.98}
          roughness={0.12}
          envMapIntensity={2.0}
        />
      </mesh>

      {/* 3. Needle Eyelet Collar / Transition Neck (Left End / Start) */}
      <mesh position={[-4.7, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.16, 0.13, 0.45, 32]} />
        <meshStandardMaterial
          color="#D4D4D8"
          metalness={0.98}
          roughness={0.14}
        />
      </mesh>

      {/* 4. Elongated Hollow Loop Eyelet with Inner Slot */}
      <group position={[-5.32, 0, 0]} scale={[1.55, 1.0, 1.0]}>
        {/* Outer Loop Torus Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <torusGeometry args={[0.26, 0.058, 20, 36]} />
          <meshStandardMaterial
            color="#E2E8F0"
            metalness={0.98}
            roughness={0.12}
          />
        </mesh>
        {/* Inner Through-Hole Depth */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.20, 0.20, 0.08, 24]} />
          <meshBasicMaterial color="#FFFFFF" opacity={0.15} transparent />
        </mesh>
      </group>
    </group>
  );
}

// ---------------------------------------------------------
// 2. 3D Bar Magnet with Realistic Eye-to-Point Stroking Arc
// ---------------------------------------------------------
function BarMagnet3D({ strokeProgress, isAutoStroking }) {
  const magnetRef = useRef();

  useFrame(() => {
    if (!magnetRef.current) return;
    if (isAutoStroking) {
      const t = strokeProgress % 1;
      if (t < 0.72) {
        // Smooth linear stroke along the needle: Start (Eye, Left, -4.8) -> Finish (Point, Right, +4.8)
        const p = t / 0.72;
        magnetRef.current.position.x = -4.8 + p * 9.6;
        magnetRef.current.position.y = 1.25;
        magnetRef.current.rotation.z = -0.22;
      } else {
        // Lifting and smoothly arching back from Finish (+4.8) to Start (-4.8)
        const p = (t - 0.72) / 0.28;
        magnetRef.current.position.x = 4.8 - p * 9.6;
        magnetRef.current.position.y = 1.25 + Math.sin(p * Math.PI) * 3.0;
        magnetRef.current.rotation.z = 0.18;
      }
    } else {
      magnetRef.current.position.set(-4.8, 1.25, 0);
      magnetRef.current.rotation.z = -0.22;
    }
  });

  return (
    <group ref={magnetRef} position={[-4.8, 1.25, 0]} scale={[0.42, 0.42, 0.42]}>
      {/* North Red Half (Touching the needle) */}
      <mesh position={[-2.6, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.2, 1.4, 1.8]} />
        <meshStandardMaterial color="#DC2626" roughness={0.35} metalness={0.3} />
      </mesh>
      <Text
        position={[-3.6, 0.72, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={1.1}
        color="#FFFFFF"
        fontWeight="bold"
      >
        N
      </Text>

      {/* South Blue Half */}
      <mesh position={[2.6, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.2, 1.4, 1.8]} />
        <meshStandardMaterial color="#1D4ED8" roughness={0.35} metalness={0.3} />
      </mesh>
      <Text
        position={[3.6, 0.72, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={1.1}
        color="#FFFFFF"
        fontWeight="bold"
      >
        S
      </Text>

      {/* Center Divider Line */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.08, 1.42, 1.82]} />
        <meshStandardMaterial color="#0F172A" roughness={0.7} />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------
// 3. Realistic Inward-Shifted Iron Filings Accumulation (Image Reference Style)
// ---------------------------------------------------------
function NeedleFilings3D({ isTesting, isAttracted }) {
  const count = 1800;
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const data = [];

    for (let i = 0; i < count; i++) {
      let targetX, targetY, targetZ;
      let targetRotX = 0, targetRotY = 0, targetRotZ = 0;
      const clusterRoll = Math.random();

      // Dispersed resting position on the white paper sheet before testing
      const randRestX = (Math.random() - 0.5) * 11.5;
      const randRestZ = (Math.random() - 0.5) * 5.0;

      if (clusterRoll < 0.46) {
        // 1. Shifted Inward along shaft from Eyelet loop (around x = -3.5 to -4.2, matching image)
        const u = Math.random();
        const baseAngle = Math.random() * Math.PI * 2;
        const spreadX = -3.85 + (Math.random() - 0.5) * 0.75;
        const radialDist = 0.14 + Math.pow(u, 1.6) * 0.55;
        
        targetX = spreadX;
        targetY = 0.24 + Math.sin(baseAngle) * radialDist;
        targetZ = Math.cos(baseAngle) * radialDist * 0.95;

        // Bristling spike orientation outwards from needle surface
        targetRotZ = (Math.random() - 0.5) * 0.9;
        targetRotX = baseAngle + (Math.random() - 0.5) * 0.4;
        targetRotY = (Math.random() - 0.5) * 0.5;
      } else if (clusterRoll < 0.92) {
        // 2. Shifted Inward along shaft before the sharp tip taper (around x = 3.6 to 4.3, matching image)
        const u = Math.random();
        const baseAngle = Math.random() * Math.PI * 2;
        const spreadX = 3.95 + (Math.random() - 0.5) * 0.75;
        const radialDist = 0.13 + Math.pow(u, 1.6) * 0.52;

        targetX = spreadX;
        targetY = 0.24 + Math.sin(baseAngle) * radialDist;
        targetZ = Math.cos(baseAngle) * radialDist * 0.95;

        // Bristling spike orientation outwards from needle surface
        targetRotZ = (Math.random() - 0.5) * 0.9;
        targetRotX = baseAngle + (Math.random() - 0.5) * 0.4;
        targetRotY = (Math.random() - 0.5) * 0.5;
      } else {
        // 3. A few tiny subtle stray speckles along the middle shaft
        targetX = (Math.random() - 0.5) * 6.5;
        targetY = 0.24 + (Math.random() > 0.6 ? 0.14 : -0.22);
        targetZ = (Math.random() - 0.5) * 0.6;
        targetRotX = Math.random() * Math.PI;
      }

      data.push({
        restX: randRestX,
        restY: 0.02,
        restZ: randRestZ,
        x: randRestX,
        y: 0.02,
        z: randRestZ,
        targetX,
        targetY,
        targetZ,
        targetRotX,
        targetRotY,
        targetRotZ,
        scale: 0.55 + Math.random() * 0.45,
        visible: false
      });
    }
    return data;
  }, [count]);

  const geometry = useMemo(() => new THREE.CylinderGeometry(0.022, 0.022, 0.14, 4), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1E293B',
        roughness: 0.75,
        metalness: 0.92,
      }),
    []
  );

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const dt = Math.min(delta, 0.1);

    particles.forEach((p, i) => {
      if (!isTesting) {
        p.visible = false;
        p.x = p.restX;
        p.y = p.restY;
        p.z = p.restZ;
      } else {
        p.visible = true;

        if (isAttracted) {
          // Smooth accumulation to needle poles
          p.x = THREE.MathUtils.lerp(p.x, p.targetX, dt * 7.5);
          p.y = THREE.MathUtils.lerp(p.y, p.targetY, dt * 7.5);
          p.z = THREE.MathUtils.lerp(p.z, p.targetZ, dt * 7.5);
        }
      }

      if (p.visible) {
        dummy.position.set(p.x, p.y, p.z);
        dummy.rotation.set(p.targetRotX, p.targetRotY, p.targetRotZ);
        dummy.scale.set(p.scale, p.scale, p.scale);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      } else {
        dummy.position.set(0, -500, 0);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
      castShadow
      receiveShadow
      frustumCulled={false}
    />
  );
}

// ---------------------------------------------------------
// 4. Main Stage 1 Component
// ---------------------------------------------------------
export default function Stage1_Magnetize({ onComplete }) {
  const [strokeCount, setStrokeCount] = useState(0);
  const [isTesting, setIsTesting] = useState(false);
  const [isAttracted, setIsAttracted] = useState(false);
  const [isAutoStroking, setIsAutoStroking] = useState(false);
  const [strokeAnimProgress, setStrokeAnimProgress] = useState(0);
  const [prediction, setPrediction] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const maxStrokes = 30;
  const isMagnetized = strokeCount >= maxStrokes;

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  // Smooth, noticeably slower stroking loop: ~2200ms per stroke cycle (+5 strokes per cycle)
  useEffect(() => {
    let animFrame;
    let startTime;
    const strokeCycleDuration = 2200; // ms per single realistic stroke cycle

    if (isAutoStroking && strokeCount < maxStrokes) {
      const animateStroke = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(1, elapsed / strokeCycleDuration);

        setStrokeAnimProgress(progress);

        if (elapsed >= strokeCycleDuration) {
          setStrokeCount((prev) => {
            const next = Math.min(maxStrokes, prev + 5);
            if (next >= maxStrokes) {
              setIsAutoStroking(false);
              setStrokeAnimProgress(0);
            }
            return next;
          });
          startTime = timestamp;
        }

        if (isAutoStroking && strokeCount < maxStrokes) {
          animFrame = requestAnimationFrame(animateStroke);
        }
      };

      animFrame = requestAnimationFrame(animateStroke);
    }

    return () => cancelAnimationFrame(animFrame);
  }, [isAutoStroking, strokeCount]);

  const handleStartStrokes = () => {
    if (isAutoStroking || strokeCount >= maxStrokes) return;
    setIsAutoStroking(true);
  };

  // Immediate attraction effect without any popup/alert modal
  const handleTestAndProceed = () => {
    if (!prediction) return;

    if (strokeCount < maxStrokes) {
      setStrokeCount(maxStrokes);
    }

    setIsTesting(true);
    setIsAttracted(true);
  };

  const handleReset = () => {
    setStrokeCount(0);
    setIsTesting(false);
    setIsAttracted(false);
    setIsAutoStroking(false);
    setStrokeAnimProgress(0);
    setPrediction(null);
  };

  return (
    <div
      style={{
        padding: '0.5rem',
        display: 'flex',
        gap: '1.25rem',
        height: '100%',
        minHeight: 0,
        overflow: 'hidden',
        boxSizing: 'border-box',
        position: 'relative'
      }}
    >
      {/* Left Side: 3D Interactive Lab Area on HD Wooden Tray */}
      <div
        style={{
          flex: '0 0 calc(64% - 0.65rem)',
          maxWidth: 'calc(64% - 0.65rem)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minHeight: 0,
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '100%',
            flex: 1,
            minHeight: '380px',
            borderRadius: '24px',
            border: '1.5px solid rgba(255, 255, 255, 0.8)',
            overflow: 'hidden',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.12)',
            backgroundImage: `url('/MagneticCompass/magnetize_tray_bg.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Top Left Badge: "1. Magnetize the needle" mirroring Image 1 */}
          <div style={{
            position: 'absolute',
            top: '18px',
            left: '20px',
            zIndex: 30,
            background: '#FFFFFF',
            border: '1.5px solid #FDE68A',
            borderRadius: '24px',
            padding: '0.45rem 1.15rem',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.55rem',
            pointerEvents: 'none'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.9rem',
              fontWeight: 900
            }}>
              1.
            </div>
            <span style={{ fontSize: '1.15rem', color: '#1E1B4B', fontWeight: 900 }}>
              Magnetize the needle
            </span>
          </div>

          {/* Top Right Fullscreen Button mirroring Image 1 */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            style={{
              position: 'absolute',
              top: '18px',
              right: '20px',
              zIndex: 30,
              background: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              borderRadius: '20px',
              padding: '6px 14px',
              fontSize: '0.85rem',
              fontWeight: 800,
              color: '#0F172A',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
            }}
          >
            {isFullscreen ? <Minimize2 size={16} color="#0F172A" /> : <Maximize2 size={16} color="#0F172A" />}
            <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>

          {/* Bottom Floating Banner Card mirroring Image 1: "Stroke -> Lift -> Return | Lift the magnet away before going back" */}
          <div style={{
            position: 'absolute',
            bottom: '18px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 30,
            width: '92%',
            maxWidth: '680px',
            background: '#FFFDF7',
            border: '2px solid #FDE68A',
            borderRadius: '24px',
            padding: '0.75rem 1.4rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.1rem',
            pointerEvents: 'none'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '2.5px solid #0F172A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}>
              <Compass size={28} color="#0F172A" strokeWidth={2.5} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
              <div style={{
                fontSize: '1.4rem',
                fontWeight: 900,
                color: '#0F172A',
                lineHeight: 1.25,
                letterSpacing: '-0.01em'
              }}>
                Stroke → Lift → Return
              </div>
              <div style={{
                fontSize: '1.15rem',
                fontWeight: 600,
                color: '#475569',
                lineHeight: 1.25
              }}>
                Lift the magnet away before going back.
              </div>
            </div>
          </div>

          {/* 3D WebGL Canvas Layer */}
          <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 10 }}>
            <Canvas
              shadows
              camera={{ position: [0, 8.5, 14], fov: 38 }}
              style={{ width: '100%', height: '100%' }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={1.25} color="#FFFFFF" />
                <directionalLight
                  position={[6, 16, 10]}
                  intensity={2.4}
                  color="#FFFBEB"
                  castShadow
                  shadow-mapSize-width={1024}
                  shadow-mapSize-height={1024}
                />
                <pointLight position={[-6, 6, -4]} intensity={0.6} color="#BAE6FD" />
                <directionalLight position={[-6, 8, -6]} intensity={1.0} color="#E0F2FE" />

                <group position={[0, -1.8, 0]} scale={[0.74, 0.74, 0.74]}>
                  {/* Procedural 3D Steel Sewing Needle */}
                  <SteelSewingNeedle3D isMagnetized={isMagnetized} />

                  {/* 3D Bar Magnet stroking smoothly along the needle */}
                  {!isMagnetized && (
                    <BarMagnet3D
                      strokeProgress={strokeAnimProgress}
                      isAutoStroking={isAutoStroking}
                    />
                  )}

                  {/* Iron Filings attraction effect */}
                  <NeedleFilings3D
                    isTesting={isTesting}
                    isAttracted={isAttracted}
                  />
                </group>
              </Suspense>
            </Canvas>
          </div>
        </div>
      </div>

      {/* Right Side: Step Instructions & Interaction Column */}
      <div className="stage-right-column" style={{ flex: '0 0 calc(36% - 0.65rem)', maxWidth: 'calc(36% - 0.65rem)', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {/* Container 1: Try the experiment */}
        <div 
          className="stage-container-1"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1.5px solid #E2E8F0',
            borderRadius: '24px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
            padding: '1.25rem 1.55rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: '0.85rem',
            boxSizing: 'border-box'
          }}
        >
          {/* Header Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <BookOpen size={32} color="#173B5F" strokeWidth={2.5} />
              <h3 style={{ margin: 0, fontSize: '2.25rem', color: '#1E1B4B', fontWeight: 900, letterSpacing: '-0.02em' }}>
                Try the experiment
              </h3>
            </div>
          </div>

          {/* Numbered Steps 1 to 4 with Enlarged Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { num: '1', text: 'Place the steel needle on the paper.' },
              { num: '2', text: 'Stroke from the eye to the point.' },
              { num: '3', text: 'Lift the magnet. Return to the start.' },
              { num: '4', text: 'Repeat 30 times with the same pole.' }
            ].map((step) => (
              <div key={step.num} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '1.4rem',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(217, 119, 6, 0.35)'
                }}>
                  {step.num}
                </div>
                <span style={{
                  fontSize: '1.55rem',
                  color: '#173B5F',
                  fontWeight: 700,
                  lineHeight: 1.3
                }}>
                  {step.text}
                </span>
              </div>
            ))}
          </div>

          {/* Tip / Leaf Callout Green Box with Enlarged Text */}
          <div style={{
            background: '#F0FDF4',
            border: '1.5px solid #BBF7D0',
            borderRadius: '16px',
            padding: '0.75rem 1.15rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem'
          }}>
            <div style={{
              background: '#DCFCE7',
              padding: '0.45rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#16A34A',
              flexShrink: 0
            }}>
              <Leaf size={24} color="#16A34A" />
            </div>
            <span style={{ fontSize: '1.45rem', fontWeight: 900, color: '#14532D', lineHeight: 1.25 }}>
              One direction. Same pole. Every time.
            </span>
          </div>

          {/* Strokes Counter & Progress Bar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '1.35rem',
              fontWeight: 900,
              color: '#1E1B4B'
            }}>
              <span>Strokes: {strokeCount} / {maxStrokes}</span>
              <span>{Math.round((strokeCount / maxStrokes) * 100)}%</span>
            </div>
            <div style={{
              width: '100%',
              height: '10px',
              background: '#E2E8F0',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <motion.div
                animate={{ width: `${(strokeCount / maxStrokes) * 100}%` }}
                transition={{ duration: 0.25 }}
                style={{
                  height: '100%',
                  background: isMagnetized
                    ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                    : 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  borderRadius: '8px'
                }}
              />
            </div>
          </div>

          {/* Action Controls Row */}
          <div style={{ width: '100%', display: 'flex', gap: '0.75rem', marginTop: '0.1rem' }}>
            <button
              onClick={handleStartStrokes}
              disabled={isAutoStroking || isMagnetized}
              className={!isAutoStroking && !isMagnetized ? 'gold-glow-btn' : ''}
              style={{
                flex: 1.35,
                padding: '0.85rem 1.25rem',
                fontSize: '1.35rem',
                fontWeight: 900,
                borderRadius: '16px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.6rem',
                background: isMagnetized ? '#DCFCE7' : isAutoStroking ? '#F1F5F9' : undefined,
                color: isMagnetized ? '#15803D' : isAutoStroking ? '#94A3B8' : '#FFFFFF',
                border: isMagnetized ? '1.5px solid #86EFAC' : isAutoStroking ? '1.5px solid #E2E8F0' : undefined,
                cursor: isAutoStroking || isMagnetized ? 'default' : 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {isMagnetized ? (
                <><CheckCircle size={22} color="#15803D" /> 30 Strokes Complete</>
              ) : (
                <><Play size={22} color={!isAutoStroking ? '#FFFFFF' : '#94A3B8'} /> {isAutoStroking ? `Stroking (${strokeCount}/${maxStrokes})...` : 'Start 30 Strokes'}</>
              )}
            </button>

            <button
              onClick={handleReset}
              style={{
                flex: 0.75,
                padding: '0.85rem 1.1rem',
                fontSize: '1.25rem',
                fontWeight: 900,
                borderRadius: '16px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#FFFBEB',
                color: '#92400E',
                border: '1.5px solid #FDE68A',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(217, 119, 6, 0.12)',
                transition: 'all 0.2s ease'
              }}
            >
              <RotateCcw size={20} color="#92400E" /> Reset
            </button>
          </div>
        </div>

        {/* Container 2: Predict and Test */}
        <div 
          className="stage-container-2"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1.5px solid #E2E8F0',
            borderRadius: '24px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
            padding: '1.15rem 1.45rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: '0.75rem',
            boxSizing: 'border-box'
          }}
        >
          {/* Header Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <HelpCircle size={28} color="#173B5F" strokeWidth={2.5} />
            <h3 style={{ margin: 0, fontSize: '1.95rem', color: '#1E1B4B', fontWeight: 900, letterSpacing: '-0.02em' }}>
              Predict before testing
            </h3>
          </div>

          {/* Question Text */}
          <div style={{
            fontSize: '1.35rem',
            fontWeight: 900,
            color: '#1E1B4B',
            lineHeight: 1.3,
            letterSpacing: '-0.01em'
          }}>
            After stroking, will the needle attract iron filings?
          </div>

          {/* Radio Options: Yes / No */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {[
              { id: 'yes', label: 'Yes' },
              { id: 'no', label: 'No' }
            ].map((option) => {
              const isSelected = prediction === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => setPrediction(option.id)}
                  style={{
                    flex: 1,
                    padding: '0.85rem 1.25rem',
                    borderRadius: '16px',
                    fontSize: '1.5rem',
                    fontWeight: 900,
                    cursor: 'pointer',
                    background: isSelected ? '#F0FDF4' : '#FFFFFF',
                    color: isSelected ? '#15803D' : '#1E1B4B',
                    border: isSelected ? '2px solid #16A34A' : '1.5px solid #CBD5E1',
                    boxShadow: isSelected ? '0 4px 12px rgba(22, 163, 74, 0.15)' : '0 2px 6px rgba(0, 0, 0, 0.03)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: isSelected ? '7px solid #16A34A' : '2px solid #94A3B8',
                    background: '#FFFFFF',
                    boxSizing: 'border-box',
                    flexShrink: 0,
                    transition: 'all 0.2s ease'
                  }} />
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>

          {/* Inline Observation Feedback once tested */}
          {isTesting && (
            <div style={{
              background: '#F0FDF4',
              border: '1.5px solid #86EFAC',
              borderRadius: '16px',
              padding: '0.85rem 1.15rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <CheckCircle size={26} color="#16A34A" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '1.25rem', color: '#14532D', fontWeight: 800, lineHeight: 1.3 }}>
                Filings cling to both poles! The needle has become a magnet.
              </div>
            </div>
          )}

          {/* Action Button: Next: Test the Needle or Continue to Step 2 */}
          {!isTesting ? (
            <button
              onClick={handleTestAndProceed}
              disabled={!prediction}
              className={prediction ? 'gold-glow-btn' : ''}
              style={{
                width: '100%',
                padding: '0.9rem 1.6rem',
                fontSize: '1.35rem',
                fontWeight: 900,
                borderRadius: '16px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.6rem',
                background: prediction ? undefined : '#E2E8F0',
                color: prediction ? '#FFFFFF' : '#94A3B8',
                border: prediction ? undefined : '1.5px solid #CBD5E1',
                cursor: prediction ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease'
              }}
            >
              Next: Test the Needle <ArrowRight size={22} color={prediction ? '#FFFFFF' : '#94A3B8'} />
            </button>
          ) : (
            <button
              onClick={() => {
                if (onComplete) onComplete();
              }}
              className="gold-glow-btn"
              style={{
                width: '100%',
                padding: '0.9rem 1.6rem',
                fontSize: '1.35rem',
                fontWeight: 900,
                borderRadius: '16px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.6rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Proceed to Make a Compass <ArrowRight size={22} color="#FFFFFF" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}