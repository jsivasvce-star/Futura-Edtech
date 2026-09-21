import React, { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, ContactShadows, OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCw, CheckCircle, XCircle, RotateCcw, ArrowRight, Compass, BookOpen, Maximize2, Minimize2 } from 'lucide-react';
import * as THREE from 'three';

// -------------------------------------------------------------------
// 1. Realistic 3D Suspended Bar Magnet with Smooth Physics Swing
// -------------------------------------------------------------------
function SuspendedMagnet3D({ targetRotation, isSpinning }) {
  const magnetGroupRef = useRef();
  const currentAngle = useRef(0.25);
  const velocity = useRef(0);

  const magnetTexture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load('/SuspendedMagnet/bar_magnet_isolated.png');
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 16;
    return tex;
  }, []);

  useFrame((state, delta) => {
    if (!magnetGroupRef.current) return;
    const dt = Math.min(delta, 0.1);

    if (isSpinning) {
      currentAngle.current = THREE.MathUtils.lerp(currentAngle.current, targetRotation, dt * 2.8);
      magnetGroupRef.current.rotation.y = currentAngle.current;
    } else {
      // Natural harmonic settling oscillation towards North-South (0 rad)
      const springK = 7.0;
      const damping = 0.86;
      const force = -springK * currentAngle.current;
      velocity.current = (velocity.current + force * dt) * Math.pow(damping, dt * 60);
      currentAngle.current += velocity.current * dt;
      magnetGroupRef.current.rotation.y = currentAngle.current;
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      {/* Braided Hanging Suspension Thread - Connects directly to the wrapped center coil */}
      <mesh position={[0, 4.0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 5.4, 16]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#FFFFFF"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {/* Antiqued Steel Hook Ring Sitting at String / Coil Joint */}
      <mesh position={[0, 1.4, 0]}>
        <torusGeometry args={[0.18, 0.038, 16, 32]} />
        <meshStandardMaterial
          color="#E2E8F0"
          emissive="#173B5F"
          emissiveIntensity={0.35}
          roughness={0.2}
          metalness={0.85}
        />
      </mesh>

      {/* Rotating 3D Magnet Assembly */}
      <group ref={magnetGroupRef}>
        {/* Dedicated Cinematic Local Lighting for Metallic Luster */}
        <pointLight position={[-3.5, 0.5, 3.5]} intensity={5.0} color="#FF6B6B" distance={18} />
        <pointLight position={[3.5, 0.5, 3.5]} intensity={5.0} color="#60A5FA" distance={18} />
        <pointLight position={[0, 3.0, 4.0]} intensity={4.5} color="#FFFFFF" distance={20} />
        <pointLight position={[0, -2.5, 3.0]} intensity={2.8} color="#F3F7F9" distance={16} />
        <pointLight position={[-3.5, 0.5, -3.5]} intensity={4.0} color="#FF4444" distance={16} />
        <pointLight position={[3.5, 0.5, -3.5]} intensity={4.0} color="#3B82F6" distance={16} />

        {/* Inner Solid Metallic Bevel Core */}
        {/* North Half Solid Metallic Core */}
        <mesh position={[-3.1, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[6.1, 2.55, 0.9]} />
          <meshStandardMaterial
            color="#A81822"
            emissive="#DC2626"
            emissiveIntensity={0.25}
            roughness={0.22}
            metalness={0.65}
          />
        </mesh>

        {/* South Half Solid Metallic Core */}
        <mesh position={[3.1, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[6.1, 2.55, 0.9]} />
          <meshStandardMaterial
            color="#144272"
            emissive="#2563EB"
            emissiveIntensity={0.25}
            roughness={0.22}
            metalness={0.65}
          />
        </mesh>

        {/* Center Wrapped String Binding 3D Collar */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.55, 2.65, 0.96]} />
          <meshStandardMaterial
            color="#F8FAFC"
            emissive="#FFFFFF"
            emissiveIntensity={0.35}
            roughness={0.25}
            metalness={0.15}
          />
        </mesh>

        {/* High-Resolution Front Face (Cropped Metallic Magnet with N/S and Center Binding) */}
        <mesh position={[0, 0, 0.46]} castShadow receiveShadow>
          <planeGeometry args={[12.6, 2.67]} />
          <meshStandardMaterial
            map={magnetTexture}
            emissiveMap={magnetTexture}
            emissive="#FFFFFF"
            emissiveIntensity={0.32}
            transparent={true}
            alphaTest={0.05}
            roughness={0.16}
            metalness={0.5}
          />
        </mesh>

        {/* High-Resolution Back Face */}
        <mesh position={[0, 0, -0.46]} rotation={[0, Math.PI, 0]} scale={[-1, 1, 1]} castShadow receiveShadow>
          <planeGeometry args={[12.6, 2.67]} />
          <meshStandardMaterial
            map={magnetTexture}
            emissiveMap={magnetTexture}
            emissive="#FFFFFF"
            emissiveIntensity={0.32}
            transparent={true}
            alphaTest={0.05}
            roughness={0.16}
            metalness={0.5}
          />
        </mesh>

        {/* Subtle Ambient Pole Shimmer Auras */}
        <mesh position={[-3.1, 0, 0]}>
          <boxGeometry args={[6.25, 2.65, 1.05]} />
          <meshBasicMaterial
            color="#EF4444"
            transparent={true}
            opacity={0.08}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        <mesh position={[3.1, 0, 0]}>
          <boxGeometry args={[6.25, 2.65, 1.05]} />
          <meshBasicMaterial
            color="#3B82F6"
            transparent={true}
            opacity={0.08}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
}

// -------------------------------------------------------------------
// 2. Main Stage 1 Component
// -------------------------------------------------------------------
export default function Stage1_Experiment({ onComplete }) {
  const [spinCount, setSpinCount] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [targetRotation, setTargetRotation] = useState(0.25);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    // Spin 3+ rotations, then settle to 0 (North-South)
    const extraSpins = (Math.floor(Math.random() * 2) + 3) * Math.PI * 2;
    setTargetRotation(targetRotation + extraSpins);

    setTimeout(() => {
      setIsSpinning(false);
      setTargetRotation(0);
      setSpinCount(prev => prev + 1);
    }, 2800);
  };

  const handleQuizAnswer = (answer) => {
    setQuizAnswer(answer);
    if (answer === 'yes') {
      setShowFeedbackModal(true);
    }
  };

  const handleReset = () => {
    setSpinCount(0);
    setIsSpinning(false);
    setTargetRotation(0.25);
    setQuizAnswer(null);
    setShowFeedbackModal(false);
  };

  // Enable next button once question is answered without waiting for experiment to complete
  const isCompleted = quizAnswer !== null;

  return (
    <div style={{
      padding: '0.5rem',
      display: 'flex',
      gap: '1.25rem',
      height: '100%',
      minHeight: 0,
      overflow: 'hidden',
      boxSizing: 'border-box',
      position: 'relative'
    }}>
      {/* Centered Feedback Pop-up Modal */}
      <AnimatePresence>
        {showFeedbackModal && (
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(8px)',
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
                borderRadius: '28px',
                padding: '2.5rem 2.8rem',
                maxWidth: '560px',
                width: '100%',
                boxShadow: '0 24px 60px rgba(6, 78, 59, 0.35)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '1.4rem',
                position: 'relative'
              }}
            >
              <div style={{
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(16, 185, 129, 0.25)'
              }}>
                <CheckCircle size={44} color="#059669" />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: 900, color: '#064E3B' }}>
                  Observation Verified!
                </h3>
                <p style={{ margin: 0, color: '#334155', fontSize: '1.35rem', lineHeight: 1.6, fontWeight: 700 }}>
                  🎉 Correct! A freely suspended magnet always comes to rest pointing in the North-South direction.
                </p>
              </div>

              <button
                onClick={() => setShowFeedbackModal(false)}
                style={{
                  width: '100%',
                  marginTop: '0.5rem',
                  padding: '1.1rem 2rem',
                  fontSize: '1.35rem',
                  fontWeight: 900,
                  borderRadius: '18px',
                  background: 'linear-gradient(135deg, #214A70 0%, #173B5F 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 14px rgba(23, 59, 95, 0.35)'
                }}
              >
                OK
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Left Side: 3D Interactive Lab Setup */}
      <div style={{
        flex: '1.8',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        height: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Activity Canvas Scene Area */}
        <div style={{
          position: 'relative',
          width: '100%',
          flex: 1,
          minHeight: '380px',
          borderRadius: '24px',
          border: '1.5px solid rgba(255, 255, 255, 0.8)',
          overflow: 'hidden',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.12)',
          backgroundImage: `url('/SuspendedMagnet/let_us_experiment_bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          {/* Top Left Floating Badge Overlay */}
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '20px',
            zIndex: 30,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            pointerEvents: 'none'
          }}>
            <div style={{
              background: '#FFFFFF',
              border: '1.5px solid #BAE6FD',
              borderRadius: '20px',
              padding: '0.45rem 1.1rem',
              fontSize: '0.95rem',
              fontWeight: 900,
              color: '#0284C7',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Compass size={18} color="#0284C7" /> HEADING: NORTH-SOUTH
            </div>
          </div>

          {/* In-Canvas Floating Annotation Badge 1: Thin Thread */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '37%',
            transform: 'translate(-50%, -50%)',
            zIndex: 25,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{
              background: '#FFFFFF',
              border: '1.5px solid #BAE6FD',
              borderRadius: '20px',
              padding: '0.4rem 1rem',
              color: '#0284C7',
              fontSize: '0.95rem',
              fontWeight: 900,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '7px'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0284C7', boxShadow: '0 0 8px rgba(2, 132, 199, 0.6)' }} />
              Thin thread
            </div>
            <div style={{
              width: '28px',
              height: '2px',
              background: 'linear-gradient(90deg, #0284C7, rgba(2, 132, 199, 0.2))'
            }} />
          </div>

          {/* In-Canvas Floating Annotation Badge 2: Free to Turn (Shifted noticeably higher up) */}
          <div style={{
            position: 'absolute',
            top: '32%',
            right: '28%',
            zIndex: 25,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{
              width: '28px',
              height: '2px',
              background: 'linear-gradient(90deg, rgba(2, 132, 199, 0.2), #0284C7)'
            }} />
            <div style={{
              background: '#FFFFFF',
              border: '1.5px solid #BAE6FD',
              borderRadius: '20px',
              padding: '0.4rem 1rem',
              color: '#0284C7',
              fontSize: '0.95rem',
              fontWeight: 900,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '7px'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0284C7', boxShadow: '0 0 8px rgba(2, 132, 199, 0.6)' }} />
              Free to turn
            </div>
          </div>

          {/* In-Canvas Floating Annotation Badge 3: Bottom Telemetry Pill (2-Line Balanced Layout) */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 25,
            pointerEvents: 'none',
            background: '#FFFFFF',
            border: '1.5px solid #BAE6FD',
            borderRadius: '24px',
            padding: '0.65rem 1.8rem',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.9rem',
            maxWidth: '92%',
            width: 'max-content'
          }}>
            <div style={{
              background: '#E0F2FE',
              padding: '0.45rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0284C7',
              flexShrink: 0
            }}>
              <Compass size={24} color="#0284C7" />
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              lineHeight: 1.35
            }}>
              <span style={{
                color: '#0369A1',
                fontSize: '1.25rem',
                fontWeight: 900,
                letterSpacing: '-0.01em'
              }}>
                It settles approximately north-south.
              </span>
              <span style={{
                color: '#0284C7',
                fontSize: '1.18rem',
                fontWeight: 700,
                letterSpacing: '-0.01em'
              }}>
                Earth's magnetic field guides its direction.
              </span>
            </div>
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            style={{
              position: 'absolute',
              top: '16px',
              right: '20px',
              zIndex: 30,
              background: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              borderRadius: '20px',
              padding: '6px 14px',
              fontSize: '0.75rem',
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
            {isFullscreen ? <Minimize2 size={15} color="#0F172A" /> : <Maximize2 size={15} color="#0F172A" />}
            <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>

          {/* 3D WebGL Canvas - Touch/Click Interactions Disabled on Magnet */}
          <Canvas
            shadows
            gl={{ 
              alpha: true, 
              antialias: true, 
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.32
            }}
            camera={{ position: [0, 2.0, 19.5], fov: 45 }}
            style={{ 
              width: '100%', 
              height: '100%', 
              pointerEvents: 'none', 
              touchAction: 'none', 
              userSelect: 'none' 
            }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={1.15} color="#FFFFFF" />
              <directionalLight
                position={[8, 18, 12]}
                intensity={2.6}
                color="#F3F7F9"
                castShadow
                shadow-mapSize={[1024, 1024]}
                shadow-bias={-0.0001}
              />
              <directionalLight position={[-8, 8, -8]} intensity={1.3} color="#E0F2FE" />
              <directionalLight position={[0, -6, 8]} intensity={0.9} color="#EAF2F6" />

              {/* Realistic 3D Suspended Bar Magnet (Static to Touch/Click) */}
              <SuspendedMagnet3D targetRotation={targetRotation} isSpinning={isSpinning} />

              {/* Drop Shadow beneath Magnet on Table */}
              <ContactShadows position={[0, -4.6, 0]} opacity={0.55} scale={16} blur={2.4} far={8} color="#000000" />
            </Suspense>
          </Canvas>
        </div>
      </div>

      {/* Right Side: Interactive Controls & Observation Panel */}
      <div className="stage-right-column">
        {/* Container 1: Steps of Instructions & Action Controls */}
        <div 
          className="stage-container-1"
          style={{
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(10px)',
            border: '1.5px solid #E2E8F0',
            borderRadius: '24px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
            padding: '1.5rem 1.7rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: '1.25rem',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <BookOpen size={32} color="#173B5F" />
                <h3 style={{ margin: 0, fontSize: '2.4rem', color: '#1E1B4B', fontWeight: 900, letterSpacing: '-0.02em' }}>
                  Stage 1: Experiment
                </h3>
              </div>
              <span style={{
                background: quizAnswer === 'yes' ? '#DCFCE7' : 'rgba(23, 59, 95, 0.1)',
                color: quizAnswer === 'yes' ? '#15803D' : '#173B5F',
                fontWeight: 900,
                fontSize: '1.2rem',
                padding: '0.45rem 1.1rem',
                borderRadius: '16px',
                border: quizAnswer === 'yes' ? '1.5px solid #86EFAC' : '1.5px solid #CBD5E1'
              }}>
                Step {spinCount >= 1 ? (quizAnswer === 'yes' ? 3 : 2) : 1} of 3
              </span>
            </div>

            {/* Substantially Scaled Up Instructions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
              {[
                {
                  id: 'step1',
                  bold: 'Click "Rotate Magnet"',
                  desc: 'to spin the suspended bar magnet.'
                },
                {
                  id: 'step2',
                  bold: 'Watch the magnet settle',
                  desc: 'smoothly along the North-South direction.'
                },
                {
                  id: 'step3',
                  bold: 'Answer Quick Check',
                  desc: 'below to verify your observation.'
                }
              ].map((s) => (
                <div
                  key={s.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.95rem',
                    padding: '0.1rem 0'
                  }}
                >
                  <span style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: '#173B5F',
                    marginTop: '0.75rem',
                    flexShrink: 0
                  }} />
                  <p style={{
                    margin: 0,
                    fontSize: '1.7rem',
                    color: '#173B5F',
                    fontWeight: 600,
                    lineHeight: 1.5
                  }}>
                    <strong style={{ fontWeight: 900, color: '#0F172A' }}>{s.bold} </strong>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Controls Row */}
          <div style={{ width: '100%', display: 'flex', gap: '0.95rem', marginTop: '0.4rem' }}>
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className={!isSpinning ? 'gold-glow-btn' : ''}
              style={{
                flex: 1.4,
                padding: '1.25rem 1.6rem',
                fontSize: '1.55rem',
                fontWeight: 900,
                borderRadius: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.75rem',
                background: isSpinning ? '#CBD5E1' : undefined,
                color: isSpinning ? '#64748B' : '#FFFFFF',
                border: isSpinning ? 'none' : undefined,
                cursor: isSpinning ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <RotateCw size={26} className={isSpinning ? 'spin-anim' : ''} /> {isSpinning ? 'Spinning...' : 'Rotate Magnet'}
            </button>

            <button
              onClick={handleReset}
              style={{
                flex: 0.8,
                padding: '1.25rem 1.4rem',
                fontSize: '1.45rem',
                fontWeight: 900,
                borderRadius: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.6rem',
                background: '#FFFFFF',
                color: '#173B5F',
                border: '1.5px solid #CBD5E1',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(23, 59, 95, 0.08)',
                transition: 'all 0.2s ease'
              }}
            >
              <RotateCcw size={24} color="#173B5F" /> Restart
            </button>
          </div>
        </div>

        {/* Container 2: Quick Check Observation Card */}
        <div 
          className="stage-container-2"
          style={{
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(10px)',
            border: quizAnswer === 'yes' ? '2.5px solid #86EFAC' : '1.5px solid #E2E8F0',
            borderRadius: '24px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
            padding: '1.5rem 1.7rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '1.25rem',
            boxSizing: 'border-box'
          }}
        >
          <div style={{
            fontSize: '1.75rem',
            fontWeight: 900,
            color: '#1E1B4B',
            lineHeight: 1.42,
            letterSpacing: '-0.015em'
          }}>
            Quick Check: Does a freely suspended magnet always settle in the North-South direction?
          </div>

          <div style={{ display: 'flex', gap: '0.95rem' }}>
            <button
              onClick={() => handleQuizAnswer('yes')}
              style={{
                flex: 1,
                padding: '1.25rem 1.6rem',
                borderRadius: '20px',
                fontSize: '1.5rem',
                fontWeight: 900,
                cursor: 'pointer',
                background: quizAnswer === 'yes' ? '#DCFCE7' : '#FFFFFF',
                color: quizAnswer === 'yes' ? '#065F46' : '#1E1B4B',
                border: quizAnswer === 'yes' ? '2.5px solid #16A34A' : '1.5px solid #CBD5E1',
                boxShadow: quizAnswer === 'yes' ? '0 4px 16px rgba(5, 150, 105, 0.25)' : '0 2px 8px rgba(0, 0, 0, 0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                transition: 'all 0.2s ease'
              }}
            >
              <CheckCircle size={26} color={quizAnswer === 'yes' ? '#16A34A' : '#173B5F'} /> Yes, Always!
            </button>
            <button
              onClick={() => handleQuizAnswer('no')}
              style={{
                flex: 1,
                padding: '1.25rem 1.6rem',
                borderRadius: '20px',
                fontSize: '1.5rem',
                fontWeight: 900,
                cursor: 'pointer',
                background: quizAnswer === 'no' ? '#FEE2E2' : '#FFFFFF',
                color: quizAnswer === 'no' ? '#991B1B' : '#64748B',
                border: quizAnswer === 'no' ? '2.5px solid #DC2626' : '1.5px solid #CBD5E1',
                boxShadow: quizAnswer === 'no' ? '0 4px 16px rgba(220, 38, 38, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                transition: 'all 0.2s ease'
              }}
            >
              <XCircle size={26} color={quizAnswer === 'no' ? '#DC2626' : '#94A3B8'} /> No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}