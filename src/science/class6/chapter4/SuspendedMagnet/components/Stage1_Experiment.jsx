import React, { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCw, CheckCircle, XCircle, RotateCcw, ArrowRight, Compass, BookOpen, HelpCircle, Leaf, Maximize2, Minimize2 } from 'lucide-react';
import * as THREE from 'three';

// -------------------------------------------------------------------
// 1. Realistic 3D Suspended Bar Magnet with Smooth Physics Swing
// -------------------------------------------------------------------
function SuspendedMagnet3D({ targetRotation, isSpinning }) {
  const magnetGroupRef = useRef();
  const currentAngle = useRef(0.25);
  const velocity = useRef(0);

  // High-Resolution Procedural Texture with Bold N & S and realistic beveled styling
  const magnetTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Red North Half
    const redGrad = ctx.createLinearGradient(0, 0, 512, 256);
    redGrad.addColorStop(0, '#B91C1C');
    redGrad.addColorStop(0.3, '#DC2626');
    redGrad.addColorStop(0.7, '#EF4444');
    redGrad.addColorStop(1, '#B91C1C');
    ctx.fillStyle = redGrad;
    ctx.fillRect(0, 0, 512, 256);

    // Blue South Half
    const blueGrad = ctx.createLinearGradient(512, 0, 1024, 256);
    blueGrad.addColorStop(0, '#1E40AF');
    blueGrad.addColorStop(0.3, '#1D4ED8');
    blueGrad.addColorStop(0.7, '#2563EB');
    blueGrad.addColorStop(1, '#1E40AF');
    ctx.fillStyle = blueGrad;
    ctx.fillRect(512, 0, 512, 256);

    // Top Gloss Highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
    ctx.fillRect(0, 0, 1024, 22);

    // Bottom Ambient Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.fillRect(0, 234, 1024, 22);

    // Center divider line
    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.fillRect(510, 0, 4, 256);

    // North Bold Letter 'N'
    ctx.font = '900 136px "Outfit", "Inter", sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 3;
    ctx.fillText('N', 256, 134);

    // South Bold Letter 'S'
    ctx.fillText('S', 768, 134);

    const tex = new THREE.CanvasTexture(canvas);
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
      const springK = 7.0;
      const damping = 0.86;
      const force = -springK * currentAngle.current;
      velocity.current = (velocity.current + force * dt) * Math.pow(damping, dt * 60);
      currentAngle.current += velocity.current * dt;
      magnetGroupRef.current.rotation.y = currentAngle.current;
    }
  });

  return (
    // Aligned position: x: -0.58 connects accurately under the brass hook on the wooden stand
    <group position={[-0.58, 0.2, 0]}>
      {/* Hanging Suspension Thread connecting from wooden arm brass hook (y: 6.2) down to center knot (y: 0.8) */}
      <mesh position={[0, 3.5, 0]}>
        <cylinderGeometry args={[0.022, 0.022, 5.4, 16]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#FFFFFF"
          emissiveIntensity={0.55}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {/* Center Thread Knot & Suspension Loop */}
      <mesh position={[0, 0.82, 0]}>
        <torusGeometry args={[0.18, 0.038, 16, 32]} />
        <meshStandardMaterial
          color="#FFFBEB"
          emissive="#FFFFFF"
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Rotating 3D Bar Magnet Assembly */}
      <group ref={magnetGroupRef}>
        <pointLight position={[-3.5, 0.5, 3.5]} intensity={5.0} color="#FF6B6B" distance={18} />
        <pointLight position={[3.5, 0.5, 3.5]} intensity={5.0} color="#60A5FA" distance={18} />
        <pointLight position={[0, 3.0, 4.0]} intensity={4.5} color="#FFFFFF" distance={20} />
        <pointLight position={[0, -2.5, 3.0]} intensity={2.8} color="#F3F7F9" distance={16} />
        <pointLight position={[-3.5, 0.5, -3.5]} intensity={4.0} color="#FF4444" distance={16} />
        <pointLight position={[3.5, 0.5, -3.5]} intensity={4.0} color="#3B82F6" distance={16} />

        {/* North Half Metallic Red Core */}
        <mesh position={[-3.1, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[6.1, 2.55, 0.9]} />
          <meshStandardMaterial
            color="#DC2626"
            emissive="#DC2626"
            emissiveIntensity={0.18}
            roughness={0.22}
            metalness={0.65}
          />
        </mesh>

        {/* South Half Metallic Blue Core */}
        <mesh position={[3.1, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[6.1, 2.55, 0.9]} />
          <meshStandardMaterial
            color="#1D4ED8"
            emissive="#2563EB"
            emissiveIntensity={0.18}
            roughness={0.22}
            metalness={0.65}
          />
        </mesh>

        {/* Center Wrapped String Binding Collar Knot */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.55, 2.65, 0.96]} />
          <meshStandardMaterial
            color="#FFFBEB"
            emissive="#FFFFFF"
            emissiveIntensity={0.4}
            roughness={0.35}
            metalness={0.1}
          />
        </mesh>

        {/* Front Face with Sharp N and S Textures */}
        <mesh position={[0, 0, 0.46]} castShadow receiveShadow>
          <planeGeometry args={[12.4, 2.55]} />
          <meshStandardMaterial
            map={magnetTexture}
            emissiveMap={magnetTexture}
            emissive="#FFFFFF"
            emissiveIntensity={0.25}
            transparent={true}
            roughness={0.2}
            metalness={0.45}
          />
        </mesh>

        {/* Back Face */}
        <mesh position={[0, 0, -0.46]} rotation={[0, Math.PI, 0]} scale={[-1, 1, 1]} castShadow receiveShadow>
          <planeGeometry args={[12.4, 2.55]} />
          <meshStandardMaterial
            map={magnetTexture}
            emissiveMap={magnetTexture}
            emissive="#FFFFFF"
            emissiveIntensity={0.25}
            transparent={true}
            roughness={0.2}
            metalness={0.45}
          />
        </mesh>

        {/* North End Cap */}
        <mesh position={[-6.15, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[0.9, 2.55]} />
          <meshStandardMaterial color="#B91C1C" roughness={0.25} metalness={0.65} />
        </mesh>

        {/* South End Cap */}
        <mesh position={[6.15, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.9, 2.55]} />
          <meshStandardMaterial color="#1E40AF" roughness={0.25} metalness={0.65} />
        </mesh>

        {/* Pole Shimmers */}
        <mesh position={[-3.1, 0, 0]}>
          <boxGeometry args={[6.25, 2.65, 1.05]} />
          <meshBasicMaterial
            color="#EF4444"
            transparent={true}
            opacity={0.06}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        <mesh position={[3.1, 0, 0]}>
          <boxGeometry args={[6.25, 2.65, 1.05]} />
          <meshBasicMaterial
            color="#3B82F6"
            transparent={true}
            opacity={0.06}
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
  const [selectedOption, setSelectedOption] = useState(null);
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
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    const extraSpins = (Math.floor(Math.random() * 2) + 3) * Math.PI * 2;
    setTargetRotation(targetRotation + extraSpins);

    setTimeout(() => {
      setIsSpinning(false);
      setTargetRotation(0);
      setSpinCount(prev => prev + 1);
    }, 2800);
  };

  const handleReset = () => {
    setSpinCount(0);
    setIsSpinning(false);
    setTargetRotation(0.25);
    setSelectedOption(null);
    setShowFeedbackModal(false);
  };

  const handleContinue = () => {
    if (!selectedOption) return;
    setShowFeedbackModal(true);
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
                border: selectedOption === 'north_south' ? '2px solid #6EE7B7' : '2px solid #FCA5A5',
                borderRadius: '28px',
                padding: '2.5rem 2.8rem',
                maxWidth: '560px',
                width: '100%',
                boxShadow: selectedOption === 'north_south' ? '0 24px 60px rgba(6, 78, 59, 0.35)' : '0 24px 60px rgba(153, 27, 27, 0.25)',
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
                background: selectedOption === 'north_south' 
                  ? 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)'
                  : 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: selectedOption === 'north_south' ? '0 8px 24px rgba(16, 185, 129, 0.25)' : '0 8px 24px rgba(239, 68, 68, 0.25)'
              }}>
                {selectedOption === 'north_south' ? (
                  <CheckCircle size={44} color="#059669" />
                ) : (
                  <XCircle size={44} color="#DC2626" />
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <h3 style={{ 
                  margin: 0, 
                  fontSize: '2.1rem', 
                  fontWeight: 900, 
                  color: selectedOption === 'north_south' ? '#064E3B' : '#991B1B' 
                }}>
                  {selectedOption === 'north_south' ? 'Observation Verified!' : "Let's Check Again!"}
                </h3>
                <p style={{ margin: 0, color: '#334155', fontSize: '1.45rem', lineHeight: 1.6, fontWeight: 700 }}>
                  {selectedOption === 'north_south' ? (
                    '🎉 Correct! A freely suspended magnet always comes to rest pointing in the North-South direction.'
                  ) : (
                    "Notice how the suspended bar magnet rotates and always comes to rest pointing along the Earth's North-South magnetic axis."
                  )}
                </p>
              </div>

              <button
                onClick={() => {
                  setShowFeedbackModal(false);
                  if (selectedOption === 'north_south' && onComplete) {
                    onComplete();
                  }
                }}
                className={selectedOption === 'north_south' ? 'gold-glow-btn' : ''}
                style={{
                  width: '100%',
                  marginTop: '0.5rem',
                  padding: '1.1rem 2rem',
                  fontSize: '1.45rem',
                  fontWeight: 900,
                  borderRadius: '18px',
                  background: selectedOption === 'north_south' ? undefined : '#CBD5E1',
                  color: '#FFFFFF',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 14px rgba(217, 119, 6, 0.35)'
                }}
              >
                {selectedOption === 'north_south' ? 'OK' : 'Try Again'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Left Side: 3D Lab Simulation Area */}
      <div style={{
        flex: '0 0 calc(64% - 0.65rem)',
        maxWidth: 'calc(64% - 0.65rem)',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        height: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{
          position: 'relative',
          width: '100%',
          flex: 1,
          minHeight: '380px',
          borderRadius: '24px',
          border: '1.5px solid rgba(255, 255, 255, 0.8)',
          overflow: 'hidden',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.12)',
          backgroundImage: `url('/suspended_stand_bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}>
          {/* Top Left Observation Badge matching reference image */}
          <div style={{
            position: 'absolute',
            top: '18px',
            left: '20px',
            zIndex: 30,
            background: '#FFFBEB',
            border: '1.5px solid #FDE68A',
            borderRadius: '24px',
            padding: '0.45rem 1.15rem',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.55rem',
            pointerEvents: 'none'
          }}>
            <span style={{ fontSize: '1.25rem' }}>👁</span>
            <span style={{ fontSize: '1.1rem', color: '#1E1B4B', fontWeight: 900 }}>
              Observation: <span style={{ fontWeight: 700, color: '#334155' }}>Magnet has settled</span>
            </span>
          </div>

          {/* Fullscreen Button */}
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

          {/* Callout Badge 1: Thin thread (pointing to vertical thread) */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '46.8%',
            zIndex: 25,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center'
          }}>
            <svg width="46" height="24" style={{ overflow: 'visible' }}>
              <circle cx="2" cy="18" r="3.5" fill="#FFFFFF" stroke="#64748B" strokeWidth="1.5" />
              <line x1="2" y1="18" x2="44" y2="8" stroke="#FFFFFF" strokeWidth="2.5" />
            </svg>
            <div style={{
              background: '#FFFBEB',
              border: '1.5px solid #FDE68A',
              borderRadius: '16px',
              padding: '0.35rem 0.95rem',
              fontSize: '1.05rem',
              fontWeight: 900,
              color: '#1E1B4B',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
              whiteSpace: 'nowrap'
            }}>
              Thin thread
            </div>
          </div>

          {/* Bottom Floating Card: "It settles approximately north–south..." */}
          <div style={{
            position: 'absolute',
            bottom: '18px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 30,
            width: '92%',
            maxWidth: '680px',
            background: '#FFFBEB',
            border: '1.5px solid #FDE68A',
            borderRadius: '24px',
            padding: '0.85rem 1.4rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.14)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.1rem',
            pointerEvents: 'none'
          }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '2px solid #064E3B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}>
              <Compass size={28} color="#064E3B" strokeWidth={2.5} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <div style={{
                fontSize: '1.35rem',
                fontWeight: 900,
                color: '#064E3B',
                lineHeight: 1.25,
                letterSpacing: '-0.01em'
              }}>
                It settles approximately north–south.
              </div>
              <div style={{
                fontSize: '1.15rem',
                fontWeight: 600,
                color: '#334155',
                lineHeight: 1.25
              }}>
                Earth's magnetic field guides its direction.
              </div>
            </div>
          </div>

          {/* 3D WebGL Canvas */}
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

              <SuspendedMagnet3D targetRotation={targetRotation} isSpinning={isSpinning} />
              <ContactShadows position={[-0.58, -4.6, 0]} opacity={0.55} scale={16} blur={2.4} far={8} color="#000000" />
            </Suspense>
          </Canvas>
        </div>
      </div>

      {/* Right Side: Interactive Controls & Observation Panel */}
      <div className="stage-right-column" style={{ flex: '0 0 calc(36% - 0.65rem)', maxWidth: 'calc(36% - 0.65rem)' }}>
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
          {/* Header Row without "Step 1 of 3" label */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <BookOpen size={32} color="#173B5F" strokeWidth={2.5} />
              <h3 style={{ margin: 0, fontSize: '2.15rem', color: '#1E1B4B', fontWeight: 900, letterSpacing: '-0.02em' }}>
                Try the experiment
              </h3>
            </div>
          </div>

          {/* Numbered Steps with 2× Scaled Text and Warm Gold Step Badges */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { num: '1', text: 'Rotate the magnet gently.' },
              { num: '2', text: 'Release it. Watch it turn and settle.' },
              { num: '3', text: 'Repeat. Compare the final direction.' }
            ].map((step) => (
              <div key={step.num} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div className="gold-step-badge">
                  {step.num}
                </div>
                <span style={{
                  fontSize: '1.55rem',
                  color: '#173B5F',
                  fontWeight: 700,
                  lineHeight: 1.35
                }}>
                  {step.text}
                </span>
              </div>
            ))}
          </div>

          {/* Tip / Caution Green Box */}
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
              <Leaf size={26} color="#16A34A" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
              <span style={{ fontSize: '1.35rem', fontWeight: 900, color: '#14532D', lineHeight: 1.25 }}>
                Keep other magnets and iron objects away.
              </span>
              <span style={{ fontSize: '1.18rem', fontWeight: 600, color: '#15803D', lineHeight: 1.25 }}>
                They can affect the result.
              </span>
            </div>
          </div>

          {/* Action Controls Row with Warm Gold / Glow Effects */}
          <div style={{ width: '100%', display: 'flex', gap: '0.85rem', marginTop: '0.1rem' }}>
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className={!isSpinning ? 'gold-glow-btn' : ''}
              style={{
                flex: 1.35,
                padding: '0.95rem 1.4rem',
                fontSize: '1.45rem',
                fontWeight: 900,
                borderRadius: '18px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.65rem',
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
                padding: '0.95rem 1.2rem',
                fontSize: '1.35rem',
                fontWeight: 900,
                borderRadius: '18px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.55rem',
                background: '#FFFBEB',
                color: '#92400E',
                border: '1.5px solid #FDE68A',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(217, 119, 6, 0.12)',
                transition: 'all 0.2s ease'
              }}
            >
              <RotateCcw size={22} color="#92400E" /> Reset
            </button>
          </div>
        </div>

        {/* Container 2: Check your observation */}
        <div 
          className="stage-container-2"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: selectedOption === 'north_south' ? '2px solid #86EFAC' : selectedOption === 'east_west' ? '2px solid #FECACA' : '1.5px solid #E2E8F0',
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

          {/* Question Text */}
          <div style={{
            fontSize: '1.55rem',
            fontWeight: 900,
            color: '#1E1B4B',
            lineHeight: 1.35,
            letterSpacing: '-0.01em'
          }}>
            After settling, which direction does the magnet point?
          </div>

          {/* Radio Options: Correct turns green, incorrect turns red */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {[
              { id: 'north_south', label: 'North–South', isCorrect: true },
              { id: 'east_west', label: 'East–West', isCorrect: false }
            ].map((option) => {
              const isSelected = selectedOption === option.id;
              const isGreen = isSelected && option.isCorrect;
              const isRed = isSelected && !option.isCorrect;

              let bg = '#FFFFFF';
              let border = '1.5px solid #CBD5E1';
              let textColor = '#1E1B4B';
              let dotBorder = '2px solid #94A3B8';
              let dotBg = '#FFFFFF';

              if (isGreen) {
                bg = '#F0FDF4';
                border = '2px solid #16A34A';
                textColor = '#15803D';
                dotBorder = '8px solid #16A34A';
              } else if (isRed) {
                bg = '#FEF2F2';
                border = '2px solid #DC2626';
                textColor = '#DC2626';
                dotBorder = '8px solid #DC2626';
              }

              return (
                <button
                  key={option.id}
                  onClick={() => setSelectedOption(option.id)}
                  style={{
                    width: '100%',
                    padding: '0.95rem 1.5rem',
                    borderRadius: '16px',
                    fontSize: '1.65rem',
                    fontWeight: 900,
                    cursor: 'pointer',
                    background: bg,
                    color: textColor,
                    border: border,
                    boxShadow: isGreen
                      ? '0 4px 14px rgba(22, 163, 74, 0.18)'
                      : isRed
                      ? '0 4px 14px rgba(220, 38, 38, 0.18)'
                      : '0 2px 6px rgba(0, 0, 0, 0.03)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    textAlign: 'left',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    border: dotBorder,
                    background: dotBg,
                    boxSizing: 'border-box',
                    flexShrink: 0,
                    transition: 'all 0.2s ease'
                  }} />
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>

          {/* Footer Row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '0.2rem',
            gap: '0.75rem'
          }}>
            <span style={{ fontSize: '1.25rem', color: '#64748B', fontWeight: 600 }}>
              Choose an answer to continue.
            </span>

            <button
              onClick={handleContinue}
              disabled={!selectedOption}
              className={selectedOption ? 'gold-glow-btn' : ''}
              style={{
                padding: '0.9rem 2.2rem',
                fontSize: '1.45rem',
                fontWeight: 900,
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
                background: selectedOption ? undefined : '#E2E8F0',
                color: selectedOption ? '#FFFFFF' : '#94A3B8',
                border: selectedOption ? undefined : '1.5px solid #CBD5E1',
                cursor: selectedOption ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease'
              }}
            >
              Continue <ArrowRight size={22} color={selectedOption ? '#FFFFFF' : '#94A3B8'} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}