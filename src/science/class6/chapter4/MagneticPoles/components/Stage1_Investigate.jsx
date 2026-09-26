import React, { useState, useEffect, useRef, useMemo, useCallback, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, XCircle, Hand, RotateCcw, ArrowRight, BookOpen, Play, Pause, Sparkles, FlaskConical, Info, HelpCircle } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, ContactShadows, Environment, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { createCustomMagnetTextures } from './magnetTextureGenerator';
import MagneticPolesVideoPlayer from './MagneticPolesVideoPlayer';
import '../MagneticPoles.css';

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
    <group position={[0, 2.4, 0]}>
      <group ref={groupRef}>
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
  const videoPlayerRef = useRef(null);

  const handleVideoPhaseChange = useCallback((phase, progress) => {
    // Video demonstration is visual; do not modify right-side contents or colors
  }, []);

  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  isPausedRef.current = isPaused;

  const handleTogglePause = () => {
    setIsPaused((prev) => {
      const next = !prev;
      if (next) {
        videoPlayerRef.current?.pause();
      } else {
        videoPlayerRef.current?.resume();
      }
      return next;
    });
    isPausedRef.current = !isPausedRef.current;
  };

  const handleSprinkle = () => {
    setIsPaused(false);
    isPausedRef.current = false;
    setIsSprinkling(true);
    setTimeout(() => setIsSprinkling(false), 800);
    // Start video playback from 0.2 seconds
    if (videoPlayerRef.current?.seekAndPlay) {
      videoPlayerRef.current.seekAndPlay(0.2);
    } else if (videoPlayerRef.current?.playFromTime) {
      videoPlayerRef.current.playFromTime(0.2);
    }
  };

  const handleTapGently = () => {
    setIsPaused(false);
    isPausedRef.current = false;
    setTapCount((prev) => prev + 1);
    setIsVibrating(true);
    setTimeout(() => setIsVibrating(false), 500);
    // Start video playback from 0.4 seconds
    if (videoPlayerRef.current?.seekAndPlay) {
      videoPlayerRef.current.seekAndPlay(0.4);
    } else if (videoPlayerRef.current?.playFromTime) {
      videoPlayerRef.current.playFromTime(0.4);
    }
  };

  const handleReset = () => {
    setIsPaused(false);
    isPausedRef.current = false;
    setTapCount(0);
    setQuizAnswer(null);
    setWarningPrompt(null);
    setShowFeedbackModal(false);
    setStep('scattering');
    // Reset and start video playback from the very beginning
    if (videoPlayerRef.current?.reset) {
      videoPlayerRef.current.reset();
    }
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
      padding: '0.5rem 1rem',
      display: 'flex',
      gap: '1.25rem',
      height: '100%',
      minHeight: 0,
      overflow: 'hidden',
      boxSizing: 'border-box',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'transparent',
      fontFamily: "'Outfit', 'Inter', system-ui, -apple-system, sans-serif"
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
                <h3 style={{ margin: 0, fontSize: '1.65rem', fontWeight: 900, color: '#064E3B' }}>
                  Observation Verified!
                </h3>
                <p style={{ margin: 0, color: '#065F46', fontSize: '1.25rem', lineHeight: 1.5, fontWeight: 700 }}>
                  🎉 Correct! Magnetic attraction is strongest at the ends, known as the Magnetic Poles.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowFeedbackModal(false);
                  if (onComplete) onComplete();
                }}
                className="gold-glow-btn"
                style={{
                  width: '100%',
                  marginTop: '0.5rem',
                  padding: '0.85rem 1.5rem',
                  fontSize: '1.25rem',
                  fontWeight: 900,
                  borderRadius: '16px',
                  cursor: 'pointer'
                }}
              >
                Continue
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Dedicated Viewer Container (3D Science Demo / Video Player) - 65% Width */}
      <div style={{ 
        flex: '0 0 65%', 
        maxWidth: '65%', 
        display: 'flex', 
        flexDirection: 'column', 
        minWidth: 0, 
        height: '100%', 
        boxSizing: 'border-box' 
      }}>
        {/* Display Container: Video Player / 3D Canvas */}
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
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.12)' 
          }}
        >
          <MagneticPolesVideoPlayer
            ref={videoPlayerRef}
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

      {/* Right Column: 35% Grid Proportion */}
      <div 
        className="stage-right-column"
        style={{ 
          flex: '0 0 calc(36% - 0.65rem)', 
          maxWidth: 'calc(36% - 0.65rem)' 
        }}
      >
        {/* CONTAINER 1: Try the experiment */}
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
              <h3 style={{ margin: 0, fontSize: '2.15rem', color: '#1E1B4B', fontWeight: 900, letterSpacing: '-0.02em' }}>
                Try the experiment
              </h3>
            </div>
          </div>

          {/* Numbered Steps with 2x Scaled Text and Warm Gold Step Badges */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { num: '1', text: 'Sprinkle iron filings around the magnet.' },
              { num: '2', text: 'Gently tap the sheet of paper.' },
              { num: '3', text: 'Compare the ends with the middle.' }
            ].map((s) => (
              <div key={s.num} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div className="gold-step-badge">{s.num}</div>
                <span style={{ fontSize: '1.55rem', color: '#173B5F', fontWeight: 700, lineHeight: 1.35 }}>
                  {s.text}
                </span>
              </div>
            ))}
          </div>

          {/* Observation Tip Box */}
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
              <Sparkles size={26} color="#16A34A" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
              <span style={{ fontSize: '1.35rem', fontWeight: 900, color: '#14532D', lineHeight: 1.25 }}>
                Look closely at the pattern.
              </span>
              <span style={{ fontSize: '1.18rem', fontWeight: 600, color: '#15803D', lineHeight: 1.25 }}>
                Where do most filings collect?
              </span>
            </div>
          </div>

          {/* Action Controls Row */}
          <div style={{ width: '100%', display: 'flex', gap: '0.85rem', marginTop: '0.1rem' }}>
            <button
              type="button"
              onClick={handleTogglePause}
              className={!isPaused ? 'gold-glow-btn' : ''}
              style={{ 
                flex: 1.2, 
                padding: '0.95rem 1.3rem', 
                fontSize: '1.45rem', 
                fontWeight: 900, 
                borderRadius: '18px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.65rem',
                cursor: 'pointer',
                background: isPaused ? '#F3F7F9' : undefined,
                color: isPaused ? '#173B5F' : '#FFFFFF',
                border: isPaused ? '1.5px solid #E2E8F0' : undefined
              }}
            >
              {!isPaused ? <Pause size={24} /> : <Play size={24} fill="currentColor" />}
              {!isPaused ? 'Pause' : 'Resume'}
            </button>
            
            <button
              type="button"
              onClick={handleReset}
              style={{ 
                flex: 0.8, 
                padding: '0.95rem 1.1rem', 
                fontSize: '1.35rem', 
                fontWeight: 900, 
                borderRadius: '18px', 
                background: '#FFFBEB', 
                color: '#92400E', 
                border: '1.5px solid #FDE68A', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.55rem',
                boxShadow: '0 2px 8px rgba(217, 119, 6, 0.12)',
                transition: 'all 0.2s ease'
              }}
            >
              <RotateCcw size={22} color="#92400E" /> Reset
            </button>
          </div>
        </div>

        {/* CONTAINER 2: Check your observation */}
        <div 
          className="stage-container-2"
          style={{ 
            background: 'rgba(255, 255, 255, 0.95)', 
            backdropFilter: 'blur(10px)',
            border: quizAnswer === 'ends' ? '2px solid #86EFAC' : quizAnswer === 'middle' ? '2px solid #FECACA' : '1.5px solid #E2E8F0', 
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <HelpCircle size={32} color="#173B5F" strokeWidth={2.5} />
            <h3 style={{ margin: 0, fontSize: '2.15rem', color: '#1E1B4B', fontWeight: 900, letterSpacing: '-0.02em' }}>
              Check your observation
            </h3>
          </div>
          
          <p style={{ margin: 0, color: '#173B5F', fontSize: '1.45rem', lineHeight: 1.35, fontWeight: 700 }}>
            Where is the magnetic pull strongest?
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <button
              type="button"
              onClick={() => handleQuizAnswer('ends')}
              aria-pressed={quizAnswer === 'ends'}
              style={{ 
                padding: '0.95rem 1.35rem', 
                textAlign: 'left', 
                fontSize: '1.35rem', 
                fontWeight: 800, 
                lineHeight: 1.25,
                borderRadius: '16px', 
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
              {quizAnswer === 'ends' && <CheckCircle size={24} color="#10B981" />}
            </button>

            <button
              type="button"
              onClick={() => handleQuizAnswer('middle')}
              aria-pressed={quizAnswer === 'middle'}
              style={{ 
                padding: '0.95rem 1.35rem', 
                textAlign: 'left', 
                fontSize: '1.35rem', 
                fontWeight: 800, 
                lineHeight: 1.25,
                borderRadius: '16px', 
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
              {quizAnswer === 'middle' && <XCircle size={24} color="#EF4444" />}
            </button>
          </div>

          {/* Feedback section */}
          {quizAnswer === 'middle' && (
            <div style={{
              padding: '0.75rem 1.15rem',
              borderRadius: '14px',
              background: '#FEF2F2',
              border: '1.5px solid #F87171',
              color: '#991B1B',
              fontSize: '1.15rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem'
            }}>
              <XCircle size={20} color="#DC2626" style={{ flexShrink: 0 }} />
              <span>Incorrect. Very few filings cling to the middle. Look closely at the ends and try again!</span>
            </div>
          )}

          {quizAnswer === 'ends' && (
            <div style={{
              padding: '0.75rem 1.15rem',
              borderRadius: '14px',
              background: '#ECFDF5',
              border: '1.5px solid #6EE7B7',
              borderLeft: '5px solid #10B981',
              color: '#065F46',
              fontSize: '1.2rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem'
            }}>
              <CheckCircle size={22} color="#10B981" style={{ flexShrink: 0 }} />
              <span>🎉 Correct! The magnetic pull is strongest at the two ends (poles).</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}