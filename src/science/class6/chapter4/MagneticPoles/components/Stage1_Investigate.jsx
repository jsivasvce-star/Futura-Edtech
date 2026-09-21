import React, { useState, useEffect, useRef, useMemo, useCallback, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, XCircle, Hand, RotateCcw, ArrowRight, BookOpen, Play, Pause } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, ContactShadows, Environment, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { createCustomMagnetTextures } from './magnetTextureGenerator';
import MagneticPolesVideoPlayer from './MagneticPolesVideoPlayer';
import '../MagneticPoles.css';

// ---------------------------------------------------------


// ---------------------------------------------------------
// ---------------------------------------------------------
// Rotatable & Tiltable System for Magnet + Iron Filings
// Centered at exact geometric pivot (y=2.4) so magnet and filings never move out of place
// ---------------------------------------------------------
function RotatableMagnetGroup({ children, rotationRef }) {
  const groupRef = useRef();
  const currentRotation = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const dt = Math.min(delta, 0.1);
    const targetY = rotationRef ? rotationRef.current.y : 0;
    const targetX = rotationRef ? rotationRef.current.x : 0;

    currentRotation.current.y = THREE.MathUtils.lerp(currentRotation.current.y, targetY, dt * 10);
    currentRotation.current.x = THREE.MathUtils.lerp(currentRotation.current.x, targetX, dt * 10);

    groupRef.current.rotation.y = currentRotation.current.y;
    groupRef.current.rotation.x = currentRotation.current.x;
  });

  return (
    // Anchored at y=2.4 (exact geometric midpoint between Magnet3D at y=4.2 and Filings at y=0.04-2.2)
    <group position={[0, 2.4, 0]}>
      <group ref={groupRef}>
        {/* Child offset aligns the combined center of mass right at the pivot */}
        <group position={[0, -2.4, 0]}>
          {children}
        </group>
      </group>
    </group>
  );
}

// ---------------------------------------------------------
// 1. True Rectangular 3D Bar Magnet (Proportionate: 12.0 x 1.3 x 1.9)
// ---------------------------------------------------------
// Realistic 3D Bar Magnet with Panoramic Texture Mapping
// ---------------------------------------------------------

function Magnet3D() {
  const textures = useMemo(() => createCustomMagnetTextures(), []);

  useEffect(() => {
    return () => {
      Object.values(textures).forEach((tex) => tex?.dispose());
    };
  }, [textures]);

  return (
    <group position={[0, 4.2, 0]} scale={[1.35, 2.2, 1.35]}>
      {/* 1. North Pole Core Half (Left, X: -6 to 0) - Bold Red */}
      <mesh position={[-3.0, 0, 0]} castShadow receiveShadow={false}>
        <boxGeometry args={[6.0, 1.3, 1.9]} />
        <meshStandardMaterial 
          color="#DC2626" 
          roughness={0.4} 
          metalness={0.1} 
        />
      </mesh>

      {/* 2. South Pole Core Half (Right, X: 0 to +6) - Deep Ocean Blue */}
      <mesh position={[3.0, 0, 0]} castShadow receiveShadow={false}>
        <boxGeometry args={[6.0, 1.3, 1.9]} />
        <meshStandardMaterial 
          color="#2563EB" 
          roughness={0.4} 
          metalness={0.1} 
        />
      </mesh>

      {/* 4. Front Face: Custom High-Res Texture Overlay */}
      <mesh position={[0, 0, 0.955]} castShadow receiveShadow={false}>
        <planeGeometry args={[12.0, 1.3]} />
        <meshStandardMaterial
          map={textures.front}
          roughness={0.35}
          metalness={0.1}
        />
      </mesh>

      {/* 5. Top Face: Custom High-Res Texture Overlay (Primary Reading Surface) */}
      <mesh position={[0, 0.655, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow={false}>
        <planeGeometry args={[12.0, 1.9]} />
        <meshStandardMaterial
          map={textures.top}
          roughness={0.35}
          metalness={0.1}
        />
      </mesh>

      {/* 6. Back Face: Custom High-Res Texture Overlay (Mirrored for 3D rotation continuity) */}
      <mesh position={[0, 0, -0.955]} rotation={[0, Math.PI, 0]} castShadow receiveShadow={false}>
        <planeGeometry args={[12.0, 1.3]} />
        <meshStandardMaterial
          map={textures.back}
          roughness={0.35}
          metalness={0.1}
        />
      </mesh>

      {/* 7. North End-Cap (Left Face, X = -6.0): Red Section with Serif N */}
      <mesh position={[-6.005, 0, 0]} rotation={[0, -Math.PI / 2, 0]} castShadow receiveShadow={false}>
        <planeGeometry args={[1.9, 1.3]} />
        <meshStandardMaterial
          map={textures.northCap}
          roughness={0.35}
          metalness={0.1}
        />
      </mesh>

      {/* 8. South End-Cap (Right Face, X = +6.0): Blue Section with Serif S */}
      <mesh position={[6.005, 0, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow={false}>
        <planeGeometry args={[1.9, 1.3]} />
        <meshStandardMaterial
          map={textures.southCap}
          roughness={0.35}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------
// Classroom Blackboard Centered Lab Placement
// ---------------------------------------------------------
function AnimatedLabGroup({ children, onArrival }) {
  const groupRef = useRef();
  const arrivedRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!arrivedRef.current) {
        arrivedRef.current = true;
        if (onArrival) onArrival();
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [onArrival]);

  const FIXED_SCALE = 0.36;

  return (
    <group ref={groupRef} position={[0.1, 5.2, 0]} scale={[FIXED_SCALE, FIXED_SCALE, FIXED_SCALE]}>
      {children}
    </group>
  );
}

// ---------------------------------------------------------
// 2. High-Contrast 3D Iron Filings System with 3D Lifting
// ---------------------------------------------------------

function FilingsSystem({ step, isSprinkling, isVibrating, cycleKey, isPaused }) {
  const count = 15000;
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const lastCycleRef = useRef(-1);

  // Magnet pole centers matching the scaled floating bar magnet (16.2 x 2.86 x 2.57)
  const poles = useMemo(() => ({ nX: -6.48, nZ: 0.0, sX: 6.48, sZ: 0.0, span: 5.4 }), []);
  const poleY = 4.2;

  const particles = useMemo(() => {
    const data = [];
    const numLines = 85;

    for (let i = 0; i < count; i++) {
      // Confined strictly to paper bounds (Paper is 26 x 16)
      const randX = (Math.random() - 0.5) * 23;
      const randZ = (Math.random() - 0.5) * 13.5;
      const randomEuler = new THREE.Euler(Math.PI / 2, (Math.random() - 0.5) * Math.PI, 0);
      const initialQ = new THREE.Quaternion().setFromEuler(randomEuler);

      let targetX, targetZ, targetMountainY;
      const clusterRoll = Math.random();

      if (clusterRoll < 0.44) {
        // Balanced 3D mountain formation under North and South poles (aerated & lighter density)
        const isNorth = Math.random() < 0.5;
        const pX = isNorth ? poles.nX : poles.sX;
        const pZ = isNorth ? poles.nZ : poles.sZ;
        const angle = Math.random() * Math.PI * 2;
        // Natural conical spread (radius ~3.6)
        const r = Math.pow(Math.random(), 0.75) * 3.6;

        targetX = pX + Math.cos(angle) * r;
        targetZ = pZ + Math.sin(angle) * (r * 0.85);

        // Volumetric mountain height: peak reaches ~2.2 under pole, tapering smoothly
        const surfacePeakY = 2.2;
        const profile = Math.exp(-Math.pow(r / 1.9, 2.0));
        const moundMaxY = 0.04 + surfacePeakY * profile;
        // Volumetric spread allowing light to pass between filings
        const volRatio = Math.pow(Math.random(), 0.6);
        targetMountainY = 0.04 + volRatio * (moundMaxY - 0.04) + (Math.random() - 0.5) * 0.06;
      } else {
        // Natural magnetic stream loops around larger magnet
        const lineIdx = Math.floor(Math.random() * numLines);
        const t = Math.random();
        const loopR = 2.1 + (lineIdx / numLines) * 8.5;
        const theta = (t - 0.5) * Math.PI * 0.95;

        const side = Math.random() > 0.5 ? 1 : -1;
        targetX = Math.sin(theta) * (loopR + Math.sin(t * Math.PI) * 2.1);
        targetZ = side * Math.cos(theta) * loopR * 0.78 + (Math.random() - 0.5) * 0.25;
        targetMountainY = 0.04;
      }

      // Constrain tightly to stay neatly on top of the paper
      targetX = Math.max(-11.8, Math.min(11.8, targetX));
      targetZ = Math.max(-6.8, Math.min(6.8, targetZ));

      data.push({
        originX: randX,
        originZ: randZ,
        targetX,
        targetZ,
        targetMountainY,
        scale: 0.55 + Math.random() * 0.35,
        x: randX,
        y: 8 + Math.random() * 4.5,
        z: randZ,
        floatY: 0.04,
        initialQ,
        q: new THREE.Quaternion().copy(initialQ),
        targetQ: new THREE.Quaternion(),
        visible: false,
        delay: Math.random() * 0.75,
      });
    }
    return data;
  }, [count, poles]);

  // Cylinder needle matching coarse metallic filings
  const geometry = useMemo(() => new THREE.CylinderGeometry(0.034, 0.034, 0.18, 4), []);

  // Deep matte charcoal-black material matching real iron shavings, bold and dark in front & top views
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0A0C10',
        roughness: 0.92,
        metalness: 0.05,
        envMapIntensity: 0.1,
      }),
    []
  );

  useFrame((state, delta) => {
    if (!meshRef.current || isPaused) return;
    const dt = Math.min(delta, 0.1);

    if (lastCycleRef.current !== cycleKey) {
      lastCycleRef.current = cycleKey;
      particles.forEach((p) => {
        p.visible = false;
        p.x = p.originX;
        p.z = p.originZ;
        p.y = 8 + Math.random() * 4.5;
        p.q.copy(p.initialQ);
        p.delay = Math.random() * 0.75;
      });
    }

    particles.forEach((p, i) => {
      // Step 1: Sprinkling down - suspended floating in 3D air onto the paper
      if (isSprinkling) {
        p.delay -= dt;
        if (p.delay <= 0) {
          p.visible = true;
          if (p.y > 0.04) {
            p.y -= dt * 18;
          } else {
            p.y = 0.04;
          }
          p.x = p.originX;
          p.z = p.originZ;
          p.q.copy(p.initialQ);
        }
      }

      // Step 2: Scattered flat across paper
      if (step === 'scattered') {
        p.visible = true;
        p.y = 0.04;
        p.x = p.originX;
        p.z = p.originZ;
        p.q.copy(p.initialQ);
      }

      // Step 3: Tapped / Observing / Complete - form 3D mountains under magnet poles
      if (step === 'tapped' || step === 'complete') {
        p.visible = true;
        p.x = THREE.MathUtils.lerp(p.x, p.targetX, dt * 5.2);
        p.z = THREE.MathUtils.lerp(p.z, p.targetZ, dt * 5.2);
        p.y = THREE.MathUtils.lerp(p.y, p.targetMountainY, dt * 5.2);

        const dxN = p.x - poles.nX;
        const dyN = p.y - poleY;
        const dzN = p.z - poles.nZ;
        const distN = Math.max(0.35, Math.hypot(dxN, dyN, dzN));

        const dxS = p.x - poles.sX;
        const dyS = p.y - poleY;
        const dzS = p.z - poles.sZ;
        const distS = Math.max(0.35, Math.hypot(dxS, dyS, dzS));

        // Dipole field vector components
        const Bx = dxN / Math.pow(distN, 3) - dxS / Math.pow(distS, 3);
        const By = dyN / Math.pow(distN, 3) - dyS / Math.pow(distS, 3);
        const Bz = dzN / Math.pow(distN, 3) - dzS / Math.pow(distS, 3);
        const Bmag = Math.hypot(Bx, By, Bz);

        if (Bmag > 0.0001) {
          const dir = new THREE.Vector3(Bx / Bmag, By / Bmag, Bz / Bmag);
          p.targetQ.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
          p.q.slerp(p.targetQ, dt * 7.5);
        }
      }

      if (p.visible) {
        dummy.position.set(p.x, p.y, p.z);
        dummy.quaternion.copy(p.q);
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
// ---------------------------------------------------------
// 3. Main Container
// ---------------------------------------------------------
export default function Stage1_Investigate({ onComplete, onGoToQuiz }) {
  const [step, setStep] = useState('waiting');
  const [cycleKey, setCycleKey] = useState(0);
  const [tapCount, setTapCount] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [isSprinkling, setIsSprinkling] = useState(false);
  const [isVibrating, setIsVibrating] = useState(false);
  const hasArrivedRef = useRef(false);

  const handleVideoPhaseChange = useCallback((phase, progress) => {
    // Video demonstration is visual; do not modify right-side contents or colors
  }, []);

  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  isPausedRef.current = isPaused;

  const handleTogglePause = () => {
    setIsPaused((prev) => !prev);
    isPausedRef.current = !isPausedRef.current;
  };

  const handleReset = () => {
    setIsPaused(false);
    isPausedRef.current = false;
    setTapCount(0);
    setQuizAnswer(null);
    setShowFeedbackModal(false);
    setStep('scattering');
  };

  const handleProceed = () => {
    if (onGoToQuiz) {
      onGoToQuiz();
    } else if (onComplete) {
      onComplete();
    }
  };

  return (
    <div style={{
      padding: '0.5rem',
      display: 'flex',
      gap: '1.25rem',
      height: '100%',
      minHeight: 0,
      overflow: 'hidden',
      boxSizing: 'border-box',
      position: 'relative',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      textRendering: 'optimizeLegibility'
    }}>
      
      {/* Centered Feedback Pop-up Modal */}
      <AnimatePresence>
        {showFeedbackModal && (
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                background: '#FFFFFF',
                border: '2px solid #6EE7B7',
                borderRadius: '24px',
                padding: '2rem 2.2rem',
                maxWidth: '480px',
                width: '100%',
                boxShadow: '0 20px 50px rgba(6, 78, 59, 0.35)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '1.25rem',
                position: 'relative'
              }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #EAF2F6 0%, #E2E8F0 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(217, 119, 6, 0.25)'
              }}>
                <CheckCircle size={36} color="#173B5F" />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 900, color: '#064E3B' }}>
                  Observation Verified!
                </h3>
                <p style={{ margin: 0, color: '#065F46', fontSize: '1.02rem', lineHeight: 1.6, fontWeight: 700 }}>
                  🎉 Correct! Magnetic attraction is strongest at the ends, known as the Magnetic Poles
                </p>
              </div>

              <button
                onClick={() => setShowFeedbackModal(false)}
                style={{
                  width: '100%',
                  marginTop: '0.5rem',
                  padding: '0.85rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: 900,
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #214A70 0%, #173B5F 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 4px 14px rgba(217, 119, 6, 0.35)'
                }}
              >
                OK
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Dedicated Viewer Container (3D Science Demo Video) */}
      <div style={{ flex: '1.6', display: 'flex', flexDirection: 'column', minWidth: 0, height: '100%', boxSizing: 'border-box' }}>
        {/* Display Container: Video Player */}
        <div style={{ position: 'relative', width: '100%', flex: 1, minHeight: '380px', overflow: 'hidden', borderRadius: '24px' }}>
          <MagneticPolesVideoPlayer
            videoSrc="/MagneticPoles/Barmagnet.mp4"
            fallbackSrc="/assets/Barmagnet.mp4"
            externalIsPaused={isPaused}
            onExternalTogglePause={handleTogglePause}
            onExternalReset={handleReset}
            onPhaseChange={handleVideoPhaseChange}
            currentStep={step}
            autoPlay={true}
            loop={false}
          />
        </div>
      </div>

      {/* Right Column: Fullscreen non-scrolling, Halfscreen scrolling */}
      <div 
        className="stage-right-column custom-scrollbar"
        style={{ 
          flex: '1.35', 
          height: '100%',
          maxHeight: '100%',
          minHeight: 0,
          boxSizing: 'border-box',
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.15rem', 
          minWidth: 0, 
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
        }}
      >
        {/* CONTAINER 1: Steps of Instructions with Doubled Font Size, Bold and Sharp */}
        <div 
          className="stage-container-1"
          style={{
            background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)', 
            border: '1.5px solid #E2E8F0', 
            borderRadius: '24px', 
            padding: '1.4rem 1.6rem', 
            boxShadow: '0 8px 30px rgba(217, 119, 6, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            flex: 1,
            overflowY: 'auto'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1.5px solid rgba(217, 119, 6, 0.25)', paddingBottom: '0.6rem', marginBottom: '0.75rem' }}>
              <h4 style={{ margin: 0, fontSize: '19.5px', color: '#173B5F', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span>📋</span> Steps of Instructions
              </h4>
            </div>

            {/* Bullet Points - Doubled Font Size (34px), Bold, Sharp, and Clearly Legible */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                'Spread iron filings evenly across the paper surface around the magnet.',
                'Gently tap the sheet to allow iron filings to align along magnetic field lines.',
                'Observe where filings cluster most densely near the two ends of the magnet.'
              ].map((instruction, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '1rem',
                    padding: '0.2rem 0'
                  }}
                >
                  <span
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: '#173B5F',
                      display: 'inline-block',
                      flexShrink: 0,
                      transform: 'translateY(-3px)',
                      boxShadow: '0 2px 6px rgba(217, 119, 6, 0.4)'
                    }}
                  />
                  <p style={{ margin: 0, fontSize: '17.5px', lineHeight: 1.5, color: '#173B5F', fontWeight: 600 }}>
                    {instruction}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons: Pause / Resume & Reset */}
          <div style={{ width: '100%', display: 'flex', gap: '0.85rem', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '2px solid rgba(217, 119, 6, 0.25)' }}>
            <button
              onClick={handleTogglePause}
              className="gold-glow-btn"
              style={{ 
                flex: 2, 
                padding: '0.85rem 1.25rem', 
                fontSize: '18px', 
                fontWeight: 900, 
                borderRadius: '16px', 
                color: '#FFFFFF', 
                border: 'none', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '10px',
                boxShadow: '0 4px 14px rgba(217, 119, 6, 0.35)',
                transition: 'all 0.2s ease'
              }}
            >
              {!isPaused ? (
                <>
                  <Pause size={22} fill="#FFFFFF" color="#FFFFFF" /> Pause Investigation
                </>
              ) : (
                <>
                  <Play size={22} fill="#FFFFFF" color="#FFFFFF" /> Resume Investigation
                </>
              )}
            </button>
            
            <button
              onClick={handleReset}
              style={{ 
                flex: 1, 
                padding: '0.85rem 1rem', 
                fontSize: '18px', 
                fontWeight: 900, 
                borderRadius: '16px', 
                background: '#FFFFFF', 
                color: '#173B5F', 
                border: '1.5px solid #E2E8F0', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'all 0.2s ease'
              }}
            >
              <RotateCcw size={19} /> Reset
            </button>
          </div>
        </div>

        {/* CONTAINER 2: Observation Question */}
        <div 
          className="stage-container-2"
          style={{ 
            background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)', 
            border: '1.5px solid #E2E8F0', 
            borderRadius: '24px', 
            padding: '1.25rem 1.45rem', 
            boxShadow: '0 6px 24px rgba(217, 119, 6, 0.08)',
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            boxSizing: 'border-box'
          }}
        >
          <div>
            <h4 style={{ color: '#173B5F', margin: 0, fontSize: '19.5px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.55rem', paddingBottom: '0.55rem', borderBottom: '1.5px solid rgba(217, 119, 6, 0.25)' }}>
              <AlertCircle size={22} color="#173B5F" /> Observation Question
            </h4>
            <p style={{ margin: '0.75rem 0', color: '#173B5F', fontSize: '17.5px', lineHeight: 1.5, fontWeight: 700 }}>
              Do the iron filings stick uniformly all over the magnet, or do they stick more at specific places?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.65rem' }}>
              <button
                onClick={() => handleQuizAnswer('uniformly')}
                style={{ 
                  padding: '0.85rem 1.15rem', 
                  textAlign: 'left', 
                  fontSize: '17px', 
                  fontWeight: 700, 
                  borderRadius: '14px', 
                  cursor: 'pointer', 
                  background: quizAnswer === 'uniformly' ? '#FEE2E2' : '#FFFFFF', 
                  borderColor: quizAnswer === 'uniformly' ? '#EF4444' : '#E2E8F0', 
                  borderWidth: '1.5px', 
                  borderStyle: 'solid', 
                  color: quizAnswer === 'uniformly' ? '#991B1B' : '#173B5F', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>A) Filings stick uniformly all over</span>
                {quizAnswer === 'uniformly' && <XCircle size={20} color="#EF4444" />}
              </button>

              <button
                onClick={() => handleQuizAnswer('ends')}
                style={{ 
                  padding: '0.85rem 1.15rem', 
                  textAlign: 'left', 
                  fontSize: '17px', 
                  fontWeight: 700, 
                  borderRadius: '14px', 
                  cursor: 'pointer', 
                  background: (quizAnswer === 'ends' || step === 'complete') ? '#DCFCE7' : '#FFFFFF', 
                  borderColor: (quizAnswer === 'ends' || step === 'complete') ? '#10B981' : '#E2E8F0', 
                  borderWidth: '1.5px', 
                  borderStyle: 'solid', 
                  color: (quizAnswer === 'ends' || step === 'complete') ? '#064E3B' : '#173B5F', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>B) Most filings cluster at the two ends (Poles)</span>
                {(quizAnswer === 'ends' || step === 'complete') && <CheckCircle size={20} color="#10B981" />}
              </button>
            </div>
          </div>

          {/* Always-visible Proceed Button */}
          {(() => {
            const isReadyToProceed = quizAnswer === 'ends';
            return (
              <div style={{ paddingTop: '0.75rem', marginTop: 'auto' }}>
                <button
                  onClick={onComplete}
                  disabled={!isReadyToProceed}
                  className={isReadyToProceed ? 'gold-glow-btn' : ''}
                  style={{ 
                    width: '100%', 
                    padding: '0.85rem 1.25rem', 
                    fontSize: '17.5px', 
                    fontWeight: 900, 
                    borderRadius: '14px', 
                    background: isReadyToProceed 
                      ? undefined 
                      : '#F1F5F9', 
                    color: isReadyToProceed 
                      ? '#FFFFFF' 
                      : '#94A3B8', 
                    border: isReadyToProceed 
                      ? 'none' 
                      : '1.5px solid #CBD5E1', 
                    cursor: isReadyToProceed 
                      ? 'pointer' 
                      : 'not-allowed', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '0.6rem',
                    transition: 'all 0.25s ease'
                  }}
                >
                  Proceed to Stage 2 <ArrowRight size={18} color={isReadyToProceed ? '#FFFFFF' : '#94A3B8'} />
                </button>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}