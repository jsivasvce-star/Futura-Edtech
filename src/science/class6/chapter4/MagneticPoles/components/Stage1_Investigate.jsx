import React, { useState, useEffect, useRef, useMemo, useCallback, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, XCircle, Hand, RotateCcw, ArrowRight, BookOpen, Play, Pause, Sparkles, FlaskConical, Info } from 'lucide-react';
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
  const [warningPrompt, setWarningPrompt] = useState(null);
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

  const handleSprinkle = () => {
    setIsPaused(false);
    isPausedRef.current = false;
    setIsSprinkling(true);
    setTimeout(() => setIsSprinkling(false), 800);
  };

  const handleTapGently = () => {
    setIsPaused(false);
    isPausedRef.current = false;
    setTapCount((prev) => prev + 1);
    setIsVibrating(true);
    setTimeout(() => setIsVibrating(false), 500);
  };

  const handleReset = () => {
    setIsPaused(false);
    isPausedRef.current = false;
    setTapCount(0);
    setQuizAnswer(null);
    setWarningPrompt(null);
    setShowFeedbackModal(false);
    setStep('scattering');
  };

  const handleQuizAnswer = (answer) => {
    setQuizAnswer(answer);
    setWarningPrompt(null);
    if (answer === 'ends') {
      setShowFeedbackModal(true);
    }
  };

  const handleProceedClick = () => {
    if (!quizAnswer) {
      setWarningPrompt('Please answer the observation question before proceeding.');
      return;
    }
    if (quizAnswer === 'middle') {
      setWarningPrompt('Incorrect answer. Please select the correct observation to proceed.');
      return;
    }
    setWarningPrompt(null);
    if (onComplete) {
      onComplete();
    } else if (onGoToQuiz) {
      onGoToQuiz();
    }
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
      
      {/* Dedicated Viewer Container (3D Science Demo Video) - 70% Width */}
      <div style={{ 
        flex: '0 0 calc(70% - 0.875rem)', 
        width: 'calc(70% - 0.875rem)', 
        maxWidth: 'calc(70% - 0.875rem)', 
        display: 'flex', 
        flexDirection: 'column', 
        minWidth: 0, 
        height: '100%', 
        boxSizing: 'border-box' 
      }}>
        {/* Display Container: Video Player */}
        <div style={{ position: 'relative', width: '100%', height: '100%', flex: 1, minHeight: 0, overflow: 'hidden', borderRadius: '24px' }}>
          <MagneticPolesVideoPlayer
            videoSrc="/assets/stage1_barmagnet.mp4"
            fallbackSrc="/assets/stage1_barmagnet.mp4"
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

      {/* Right Column: 30% Width */}
      <div 
        className="stage-right-column custom-scrollbar"
        style={{ 
          flex: '0 0 calc(30% - 0.375rem)', 
          width: 'calc(30% - 0.375rem)', 
          maxWidth: 'calc(30% - 0.375rem)', 
          height: '100%',
          maxHeight: '100%',
          minHeight: 0,
          boxSizing: 'border-box',
          display: 'flex', 
          flexDirection: 'column', 
          gap: '0.85rem', 
          minWidth: 0, 
          overflow: 'hidden',
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
        }}
      >
        {/* CONTAINER 1: Try the experiment */}
        <div 
          className="stage-container-1"
          style={{ 
            background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)', 
            border: '1.5px solid #E2E8F0', 
            borderRadius: '24px', 
            padding: '0.9rem 0.85rem', 
            boxShadow: '0 8px 30px rgba(217, 119, 6, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            flex: 1,
            minHeight: 0
          }}
        >
          {/* Top Section: Title & 3 Instructions */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1.5px solid rgba(217, 119, 6, 0.25)', paddingBottom: '0.4rem', marginBottom: '0.55rem' }}>
              <h4 style={{ margin: 0, fontSize: '32px', color: '#173B5F', fontWeight: 800, lineHeight: 1.15, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FlaskConical size={24} color="#173B5F" /> Try to experiment
              </h4>
            </div>

            {/* Numbered Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                'Sprinkle iron filings around the magnet.',
                'Gently tap the paper.',
                'Compare the ends with the middle.'
              ].map((instruction, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.45rem'
                  }}
                >
                  <span
                    style={{
                      width: '22px',
                      height: '22px',
                      minWidth: '22px',
                      borderRadius: '50%',
                      background: '#173B5F',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 800,
                      flexShrink: 0,
                      marginTop: '3px',
                      boxShadow: '0 2px 5px rgba(23, 59, 95, 0.25)'
                    }}
                  >
                    {idx + 1}
                  </span>
                  <p style={{ margin: 0, fontSize: '24px', lineHeight: 1.18, color: '#173B5F', fontWeight: 600, letterSpacing: '-0.022em', wordSpacing: '-0.01em' }}>
                    {instruction}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section: Observation box + Action Buttons with NO unnecessary gap */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginTop: '0.45rem' }}>
            {/* Green observation box */}
            <div
              style={{
                padding: '0.55rem 0.85rem',
                borderRadius: '14px',
                background: '#ECFDF5',
                border: '1.5px solid #6EE7B7',
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.08)'
              }}
            >
              <Sparkles size={18} color="#059669" style={{ flexShrink: 0 }} />
              <p style={{ margin: 0, color: '#065F46', fontSize: '23px', fontWeight: 700, lineHeight: 1.15 }}>
                Look closely: where do most filings collect?
              </p>
            </div>

            {/* Action Buttons: Sprinkle, Tap, Reset on One Single Horizontal Line immediately below observation box */}
            <div style={{ width: '100%', display: 'flex', gap: '0.45rem', flexWrap: 'nowrap' }}>
              <button
                type="button"
                onClick={handleSprinkle}
                className="gold-glow-btn"
                style={{ 
                  flex: 1, 
                  minWidth: 0,
                  padding: '0.55rem 0.35rem', 
                  fontSize: '21px', 
                  fontWeight: 700, 
                  lineHeight: 1.1,
                  borderRadius: '14px', 
                  color: '#FFFFFF', 
                  border: 'none', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '4px',
                  boxShadow: '0 4px 14px rgba(217, 119, 6, 0.35)',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                <Sparkles size={16} fill="#FFFFFF" color="#FFFFFF" /> Sprinkle
              </button>
              
              <button
                type="button"
                onClick={handleTapGently}
                style={{ 
                  flex: 1, 
                  minWidth: 0,
                  padding: '0.55rem 0.35rem', 
                  fontSize: '21px', 
                  fontWeight: 700, 
                  lineHeight: 1.1,
                  borderRadius: '14px', 
                  background: '#FFFFFF', 
                  color: '#173B5F', 
                  border: '1.5px solid #CBD5E1', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '4px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                <Hand size={16} color="#173B5F" /> Tap
              </button>

              <button
                type="button"
                onClick={handleReset}
                style={{ 
                  flex: 1, 
                  minWidth: 0,
                  padding: '0.55rem 0.35rem', 
                  fontSize: '21px', 
                  fontWeight: 700, 
                  lineHeight: 1.1,
                  borderRadius: '14px', 
                  background: '#FFFFFF', 
                  color: '#475569', 
                  border: '1.5px solid #CBD5E1', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '4px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                <RotateCcw size={15} /> Reset
              </button>
            </div>
          </div>
        </div>

        {/* CONTAINER 2: Check your observation */}
        <div 
          className="stage-container-2"
          style={{ 
            background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)', 
            border: '1.5px solid #E2E8F0', 
            borderRadius: '24px', 
            padding: '0.9rem 0.85rem', 
            boxShadow: '0 6px 24px rgba(217, 119, 6, 0.08)',
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            flex: 1,
            minHeight: 0
          }}
        >
          {/* Top Section: Title + Question + Options */}
          <div>
            <h4 style={{ color: '#173B5F', margin: 0, fontSize: '30px', fontWeight: 800, lineHeight: 1.15, display: 'flex', alignItems: 'center', gap: '0.5rem', paddingBottom: '0.4rem', borderBottom: '1.5px solid rgba(217, 119, 6, 0.25)' }}>
              <AlertCircle size={23} color="#173B5F" /> Check your observation
            </h4>
            
            <p style={{ margin: '0.45rem 0 0.4rem 0', color: '#173B5F', fontSize: '23px', lineHeight: 1.15, fontWeight: 700 }}>
              Where is the magnetic pull strongest?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginTop: '0.3rem' }}>
              <button
                type="button"
                onClick={() => handleQuizAnswer('ends')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleQuizAnswer('ends');
                  }
                }}
                aria-pressed={quizAnswer === 'ends'}
                style={{ 
                  padding: '0.55rem 0.85rem', 
                  textAlign: 'left', 
                  fontSize: '22px', 
                  fontWeight: 700, 
                  lineHeight: 1.15,
                  borderRadius: '14px', 
                  cursor: 'pointer', 
                  background: quizAnswer === 'ends' ? '#DCFCE7' : '#FFFFFF', 
                  borderColor: quizAnswer === 'ends' ? '#10B981' : '#CBD5E1', 
                  borderWidth: '1.5px', 
                  borderStyle: 'solid', 
                  color: quizAnswer === 'ends' ? '#064E3B' : '#173B5F', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>At the two ends</span>
                {quizAnswer === 'ends' && <CheckCircle size={18} color="#10B981" />}
              </button>

              <button
                type="button"
                onClick={() => handleQuizAnswer('middle')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleQuizAnswer('middle');
                  }
                }}
                aria-pressed={quizAnswer === 'middle'}
                style={{ 
                  padding: '0.55rem 0.85rem', 
                  textAlign: 'left', 
                  fontSize: '22px', 
                  fontWeight: 700, 
                  lineHeight: 1.15,
                  borderRadius: '14px', 
                  cursor: 'pointer', 
                  background: quizAnswer === 'middle' ? '#FEE2E2' : '#FFFFFF', 
                  borderColor: quizAnswer === 'middle' ? '#EF4444' : '#CBD5E1', 
                  borderWidth: '1.5px', 
                  borderStyle: 'solid', 
                  color: quizAnswer === 'middle' ? '#991B1B' : '#173B5F', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>At the middle</span>
                {quizAnswer === 'middle' && <XCircle size={18} color="#EF4444" />}
              </button>
            </div>
          </div>

          {/* Bottom Section: Evidence text + Feedback + Next button (No empty space below) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginTop: '0.45rem' }}>
            {/* Supporting text */}
            <p style={{ margin: 0, color: '#64748B', fontSize: '19px', lineHeight: 1.2, fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Info size={16} color="#64748B" style={{ flexShrink: 0 }} /> Use the pattern of filings as your evidence.
            </p>

            {/* In-container corrective feedback when 'middle' is selected */}
            <AnimatePresence>
              {quizAnswer === 'middle' && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    padding: '0.45rem 0.75rem',
                    borderRadius: '12px',
                    background: '#FEF2F2',
                    border: '1.5px solid #F87171',
                    color: '#991B1B',
                    fontSize: '14px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    boxShadow: '0 3px 10px rgba(239, 68, 68, 0.1)'
                  }}
                >
                  <XCircle size={16} color="#DC2626" style={{ flexShrink: 0 }} />
                  <span>Incorrect. Very few filings cling to the middle. Look closely at the two ends and try again!</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* In-container positive feedback when 'ends' is selected */}
            <AnimatePresence>
              {quizAnswer === 'ends' && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    padding: '0.45rem 0.75rem',
                    borderRadius: '12px',
                    background: '#ECFDF5',
                    border: '1.5px solid #6EE7B7',
                    color: '#065F46',
                    fontSize: '14px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    boxShadow: '0 3px 10px rgba(16, 185, 129, 0.1)'
                  }}
                >
                  <CheckCircle size={16} color="#10B981" style={{ flexShrink: 0 }} />
                  <span>🎉 Correct! The magnetic pull is strongest at the two ends (poles).</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Warning prompt when attempting to proceed prematurely */}
            <AnimatePresence>
              {warningPrompt && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    padding: '0.45rem 0.75rem',
                    borderRadius: '12px',
                    background: '#FFFBEB',
                    border: '1.5px solid #FCD34D',
                    color: '#92400E',
                    fontSize: '14px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    boxShadow: '0 3px 10px rgba(245, 158, 11, 0.1)'
                  }}
                >
                  <AlertCircle size={16} color="#D97706" style={{ flexShrink: 0 }} />
                  <span>{warningPrompt}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Button: Next: Bar Magnet → placed clearly at the bottom-right area of the panel */}
            {(() => {
              const isReadyToProceed = quizAnswer === 'ends';
              return (
                <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                  <button
                    type="button"
                    onClick={handleProceedClick}
                    className={isReadyToProceed ? 'gold-glow-btn' : ''}
                    style={{ 
                      minWidth: '220px',
                      padding: '0.65rem 1.35rem', 
                      fontSize: '21px', 
                      fontWeight: 700, 
                      lineHeight: 1.1,
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
                      cursor: 'pointer', 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '0.5rem',
                      transition: 'all 0.25s ease',
                      boxShadow: isReadyToProceed ? '0 4px 14px rgba(217, 119, 6, 0.35)' : 'none'
                    }}
                  >
                    Next: Bar Magnet <ArrowRight size={18} color={isReadyToProceed ? '#FFFFFF' : '#94A3B8'} />
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}