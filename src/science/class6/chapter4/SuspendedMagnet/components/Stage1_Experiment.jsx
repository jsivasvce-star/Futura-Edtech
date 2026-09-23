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

  const { frontTexture, topTexture, redEndTexture, blueEndTexture } = useMemo(() => {
    const loader = new THREE.TextureLoader();

    // 1. Front and Back Faces Texture (featuring "NORTH" and "SOUTH" labels)
    const front = loader.load('/SuspendedMagnet/bar_magnet_front.png');
    front.colorSpace = THREE.SRGBColorSpace;
    front.anisotropy = 8;

    // 2. Top Face Texture (featuring the magnetic field line pattern)
    const top = loader.load('/SuspendedMagnet/bar_magnet_top.png');
    top.colorSpace = THREE.SRGBColorSpace;
    top.anisotropy = 8;

    // 3. North End Cap (cropped solid red section from the first image)
    const redCap = loader.load('/SuspendedMagnet/bar_magnet_front.png', (tex) => {
      try {
        const img = tex.image;
        if (!img) return;
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');
        // Sample from the solid red North half
        ctx.drawImage(img, 80, 25, 120, 65, 0, 0, 128, 128);
        redCap.image = canvas;
        redCap.needsUpdate = true;
      } catch (e) {
        console.error('Error cropping red end cap:', e);
      }
    });
    redCap.colorSpace = THREE.SRGBColorSpace;

    // 4. South End Cap (cropped solid blue section from the first image)
    const blueCap = loader.load('/SuspendedMagnet/bar_magnet_front.png', (tex) => {
      try {
        const img = tex.image;
        if (!img) return;
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');
        // Sample from the solid blue South half
        ctx.drawImage(img, 820, 25, 120, 65, 0, 0, 128, 128);
        blueCap.image = canvas;
        blueCap.needsUpdate = true;
      } catch (e) {
        console.error('Error cropping blue end cap:', e);
      }
    });
    blueCap.colorSpace = THREE.SRGBColorSpace;

    return { frontTexture: front, topTexture: top, redEndTexture: redCap, blueEndTexture: blueCap };
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
    <group position={[0, 0.1, 0]}>
      {/* Braided Hanging Suspension Thread */}
      <mesh position={[0, 3.2, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 5.8, 12]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.45} roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Antiqued Brass Suspension Hook Ring */}
      <mesh position={[0, 0.95, 0]}>
        <torusGeometry args={[0.2, 0.045, 16, 32]} />
        <meshStandardMaterial color="#E2E8F0" emissive="#173B5F" emissiveIntensity={0.35} roughness={0.18} metalness={0.9} />
      </mesh>

      {/* Rotating 3D Magnet Assembly */}
      <group ref={magnetGroupRef}>
        {/* Dedicated Cinematic Local Lighting with Enhanced Shimmer */}
        <pointLight position={[-3.1, 0.5, 3.2]} intensity={5.2} color="#FF6B6B" distance={18} />
        <pointLight position={[3.1, 0.5, 3.2]} intensity={5.2} color="#60A5FA" distance={18} />
        <pointLight position={[0, 2.5, 3.5]} intensity={4.5} color="#FFFFFF" distance={20} />
        <pointLight position={[0, -2.0, 2.8]} intensity={2.8} color="#F3F7F9" distance={16} />
        <pointLight position={[-3.1, 0.5, -3.2]} intensity={4.0} color="#FF4444" distance={16} />
        <pointLight position={[3.1, 0.5, -3.2]} intensity={4.0} color="#3B82F6" distance={16} />

        {/* North Half Core - High-Saturation Crimson Red with Emissive Luster */}
        <mesh position={[-3.1, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[6.2, 1.35, 1.9]} />
          <meshStandardMaterial
            color="#DC2626"
            emissive="#EF4444"
            emissiveIntensity={0.36}
            roughness={0.18}
            metalness={0.35}
          />
        </mesh>

        {/* South Half Core - High-Saturation Cobalt Blue with Emissive Luster */}
        <mesh position={[3.1, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[6.2, 1.35, 1.9]} />
          <meshStandardMaterial
            color="#2563EB"
            emissive="#3B82F6"
            emissiveIntensity={0.36}
            roughness={0.18}
            metalness={0.35}
          />
        </mesh>

        {/* Dark Dividing Seam */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.06, 1.36, 1.91]} />
          <meshStandardMaterial color="#0F172A" roughness={0.7} />
        </mesh>

        {/* Front Face: First Image (NORTH and SOUTH labels) with Emissive Brilliance and Metallic Sheen */}
        <mesh position={[0, 0, 0.958]} castShadow receiveShadow>
          <planeGeometry args={[12.4, 1.35]} />
          <meshStandardMaterial
            map={frontTexture}
            emissiveMap={frontTexture}
            emissive="#FFFFFF"
            emissiveIntensity={0.32}
            roughness={0.15}
            metalness={0.42}
          />
        </mesh>

        {/* Back Face: First Image with Emissive Brilliance and Metallic Sheen */}
        <mesh position={[0, 0, -0.958]} rotation={[0, Math.PI, 0]} scale={[-1, 1, 1]} castShadow receiveShadow>
          <planeGeometry args={[12.4, 1.35]} />
          <meshStandardMaterial
            map={frontTexture}
            emissiveMap={frontTexture}
            emissive="#FFFFFF"
            emissiveIntensity={0.32}
            roughness={0.15}
            metalness={0.42}
          />
        </mesh>

        {/* Top Face: Second Image (Magnetic Field Lines) with Vibrant Emissive Glow */}
        <mesh position={[0, 0.68, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
          <planeGeometry args={[12.4, 1.9]} />
          <meshStandardMaterial
            map={topTexture}
            emissiveMap={topTexture}
            emissive="#FFFFFF"
            emissiveIntensity={0.35}
            roughness={0.16}
            metalness={0.42}
          />
        </mesh>

        {/* Bottom Face: Clean Base Finish with Matching Glow */}
        <mesh position={[0, -0.68, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
          <planeGeometry args={[12.4, 1.9]} />
          <meshStandardMaterial
            map={topTexture}
            emissiveMap={topTexture}
            emissive="#FFFFFF"
            emissiveIntensity={0.25}
            roughness={0.18}
            metalness={0.4}
          />
        </mesh>

        {/* North End Cap: Cropped Solid Red Section with Vibrant Emissive Glow */}
        <mesh position={[-6.205, 0, 0]} rotation={[0, -Math.PI / 2, 0]} castShadow receiveShadow>
          <planeGeometry args={[1.9, 1.35]} />
          <meshStandardMaterial
            map={redEndTexture}
            color="#DC2626"
            emissive="#EF4444"
            emissiveIntensity={0.38}
            roughness={0.18}
            metalness={0.35}
          />
        </mesh>

        {/* South End Cap: Cropped Solid Blue Section with Vibrant Emissive Glow */}
        <mesh position={[6.205, 0, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
          <planeGeometry args={[1.9, 1.35]} />
          <meshStandardMaterial
            map={blueEndTexture}
            color="#2563EB"
            emissive="#3B82F6"
            emissiveIntensity={0.38}
            roughness={0.18}
            metalness={0.35}
          />
        </mesh>

        {/* Subtle Cinematic Pole Aura Sheen */}
        <mesh position={[-3.1, 0, 0]}>
          <boxGeometry args={[6.28, 1.42, 1.98]} />
          <meshBasicMaterial
            color="#EF4444"
            transparent={true}
            opacity={0.09}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        <mesh position={[3.1, 0, 0]}>
          <boxGeometry args={[6.28, 1.42, 1.98]} />
          <meshBasicMaterial
            color="#3B82F6"
            transparent={true}
            opacity={0.09}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Polished Gold Center Clamp Collar with Mirror Shimmer */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.45, 1.38, 1.94]} />
          <meshStandardMaterial
            color="#214A70"
            emissive="#173B5F"
            emissiveIntensity={0.45}
            roughness={0.08}
            metalness={0.96}
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
                background: 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(16, 185, 129, 0.25)'
              }}>
                <CheckCircle size={36} color="#059669" />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 900, color: '#064E3B' }}>
                  Observation Verified!
                </h3>
                <p style={{ margin: 0, color: '#334155', fontSize: '1.02rem', lineHeight: 1.6, fontWeight: 700 }}>
                  🎉 Correct! A freely suspended magnet always comes to rest pointing in the North-South direction.
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
          border: '1.5px solid #A7F3D0',
          overflow: 'hidden',
          boxShadow: '0 12px 30px rgba(6, 78, 59, 0.12)',
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
            gap: '0.5rem'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #173B5F 0%, #0A1C2E 100%)',
              border: '1.5px solid #173B5F',
              borderRadius: '20px',
              padding: '0.4rem 0.9rem',
              fontSize: '0.82rem',
              fontWeight: 900,
              color: '#FFFFFF',
              boxShadow: '0 4px 14px rgba(69, 26, 3, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem'
            }}>
              <Compass size={16} color="#214A70" /> HEADING: NORTH-SOUTH
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
            background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)',
            border: '1.5px solid #E2E8F0',
            borderRadius: '24px',
            boxShadow: '0 8px 24px rgba(217, 119, 6, 0.08)',
            padding: '1.25rem 1.45rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '0.85rem',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <BookOpen size={24} color="#173B5F" />
                <h3 style={{ margin: 0, fontSize: '19.5px', color: '#1E1B4B', fontWeight: 900, letterSpacing: '-0.01em' }}>
                  Stage 1: Experiment
                </h3>
              </div>
              <span style={{
                background: quizAnswer === 'yes' ? '#DCFCE7' : 'rgba(217, 119, 6, 0.12)',
                color: quizAnswer === 'yes' ? '#15803D' : '#173B5F',
                fontWeight: 900,
                fontSize: '0.88rem',
                padding: '0.3rem 0.8rem',
                borderRadius: '12px',
                border: quizAnswer === 'yes' ? '1.5px solid #86EFAC' : '1.5px solid #E2E8F0'
              }}>
                Step {spinCount >= 1 ? (quizAnswer === 'yes' ? 3 : 2) : 1} of 3
              </span>
            </div>

            {/* Steps of Instructions - Dot Bullets, Single-Line Brown Text */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                {
                  id: 'step1',
                  desc: 'Click "Rotate Magnet" to spin the freely suspended 3D bar magnet.'
                },
                {
                  id: 'step2',
                  desc: 'Watch the magnet oscillate and settle pointing in the North-South direction.'
                },
                {
                  id: 'step3',
                  desc: 'Answer the Quick Check question below to confirm your observation.'
                }
              ].map((s, idx) => (
                <div
                  key={s.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.1rem 0'
                  }}
                >
                  <span style={{
                    width: '9px',
                    height: '9px',
                    borderRadius: '50%',
                    background: '#173B5F',
                    marginTop: '0.48rem',
                    flexShrink: 0
                  }} />
                  <p style={{
                    margin: 0,
                    fontSize: '17.5px',
                    color: '#173B5F',
                    fontWeight: 600,
                    lineHeight: 1.45
                  }}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Controls Row */}
          <div style={{ width: '100%', display: 'flex', gap: '0.75rem', marginTop: '0.2rem' }}>
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className={!isSpinning ? 'gold-glow-btn' : ''}
              style={{
                flex: 1.4,
                padding: '0.8rem 1rem',
                fontSize: '17.5px',
                fontWeight: 900,
                borderRadius: '16px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.6rem',
                background: isSpinning ? '#CBD5E1' : undefined,
                color: isSpinning ? '#64748B' : '#FFFFFF',
                border: isSpinning ? 'none' : undefined,
                cursor: isSpinning ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <RotateCw size={19} className={isSpinning ? 'spin-anim' : ''} /> {isSpinning ? 'Spinning...' : 'Rotate Magnet'}
            </button>

            <button
              onClick={handleReset}
              style={{
                flex: 0.8,
                padding: '0.8rem 0.9rem',
                fontSize: '16.5px',
                fontWeight: 900,
                borderRadius: '16px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.45rem',
                background: '#FFFFFF',
                color: '#173B5F',
                border: '1.5px solid #E2E8F0',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(217, 119, 6, 0.08)',
                transition: 'all 0.2s ease'
              }}
            >
              <RotateCcw size={18} color="#173B5F" /> Restart
            </button>
          </div>
        </div>

        {/* Container 2: Quick Check Observation Card */}
        <div 
          className="stage-container-2"
          style={{
            background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)',
            border: quizAnswer === 'yes' ? '2px solid #86EFAC' : '1.5px solid #E2E8F0',
            borderRadius: '24px',
            boxShadow: '0 8px 24px rgba(217, 119, 6, 0.08)',
            padding: '1.25rem 1.45rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '0.85rem',
            boxSizing: 'border-box'
          }}
        >
          <div style={{
            fontSize: '19.5px',
            fontWeight: 900,
            color: '#1E1B4B',
            lineHeight: 1.4,
            letterSpacing: '-0.01em'
          }}>
            Quick Check: Does a freely suspended magnet always settle in the North-South direction?
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => handleQuizAnswer('yes')}
              style={{
                flex: 1,
                padding: '0.8rem 1rem',
                borderRadius: '16px',
                fontSize: '17.5px',
                fontWeight: 900,
                cursor: 'pointer',
                background: quizAnswer === 'yes' ? '#DCFCE7' : '#FFFFFF',
                color: quizAnswer === 'yes' ? '#065F46' : '#1E1B4B',
                border: quizAnswer === 'yes' ? '2px solid #16A34A' : '1.5px solid #E2E8F0',
                boxShadow: quizAnswer === 'yes' ? '0 4px 14px rgba(5, 150, 105, 0.25)' : '0 2px 6px rgba(0, 0, 0, 0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease'
              }}
            >
              <CheckCircle size={19} color={quizAnswer === 'yes' ? '#16A34A' : '#173B5F'} /> Yes, Always!
            </button>
            <button
              onClick={() => handleQuizAnswer('no')}
              style={{
                flex: 1,
                padding: '0.8rem 1rem',
                borderRadius: '16px',
                fontSize: '17.5px',
                fontWeight: 900,
                cursor: 'pointer',
                background: quizAnswer === 'no' ? '#FEE2E2' : '#FFFFFF',
                color: quizAnswer === 'no' ? '#991B1B' : '#64748B',
                border: quizAnswer === 'no' ? '2px solid #DC2626' : '1.5px solid #E2E8F0',
                boxShadow: quizAnswer === 'no' ? '0 4px 14px rgba(220, 38, 38, 0.2)' : '0 2px 6px rgba(0, 0, 0, 0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease'
              }}
            >
              <XCircle size={19} color={quizAnswer === 'no' ? '#DC2626' : '#94A3B8'} /> No
            </button>
          </div>

          {/* Proceed Button Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.2rem' }}>
            <span style={{ fontSize: '0.95rem', color: '#173B5F', fontWeight: 800 }}>
              Stage 1 of 2 ● ○
            </span>

            <button
              onClick={onComplete}
              disabled={!isCompleted}
              className={isCompleted ? 'gold-glow-btn' : ''}
              style={{
                padding: '0.8rem 2.2rem',
                fontSize: '17.5px',
                fontWeight: 900,
                borderRadius: '24px',
                background: isCompleted ? undefined : '#E2E8F0',
                color: isCompleted ? '#FFFFFF' : '#94A3B8',
                border: 'none',
                cursor: isCompleted ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
                transition: 'all 0.2s ease'
              }}
            >
              Next <ArrowRight size={20} color={isCompleted ? '#FFFFFF' : '#94A3B8'} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}