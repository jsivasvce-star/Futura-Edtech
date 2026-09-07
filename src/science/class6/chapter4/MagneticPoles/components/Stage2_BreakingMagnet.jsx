import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, ContactShadows, Environment, useTexture } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, AlertCircle, CheckCircle, XCircle, ArrowRight, BookOpen, RotateCcw, Hand } from 'lucide-react';
import * as THREE from 'three';
import '../MagneticPoles.css';

// ---------------------------------------------------------
// ---------------------------------------------------------
// Realistic White Floating Paper Sheet (No tray walls)
// ---------------------------------------------------------
function WhiteFloatingPaper() {
  return (
    <group>
      {/* 1. Pure Crisp White Bottom Paper Sheet */}
      <mesh receiveShadow castShadow position={[0, -0.015, 0]}>
        <boxGeometry args={[26, 0.04, 16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.92} metalness={0.0} />
      </mesh>

      {/* 2. Soft Edge Paper Trim / Underside Bevel */}
      <mesh position={[0, -0.04, 0]}>
        <boxGeometry args={[26.06, 0.015, 16.06]} />
        <meshStandardMaterial color="#CBD5E1" roughness={0.96} metalness={0.0} />
      </mesh>

      {/* 3. Compact Upright Background Paper Sheet (Directly behind magnet) */}
      <mesh receiveShadow castShadow position={[0, 4.25, -8.02]}>
        <boxGeometry args={[26, 8.5, 0.04]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.92} metalness={0.0} />
      </mesh>

      {/* 4. Upright Sheet Soft Edge Paper Trim / Frame Accent */}
      <mesh position={[0, 4.25, -8.045]}>
        <boxGeometry args={[26.06, 8.56, 0.015]} />
        <meshStandardMaterial color="#CBD5E1" roughness={0.96} metalness={0.0} />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------
// Rotatable System for Magnet
// ---------------------------------------------------------
function RotatableMagnetGroup({ children }) {
  const groupRef = useRef();
  const targetRotationY = useRef(0);
  const currentRotationY = useRef(0);
  const isPointerDown = useRef(false);
  const startX = useRef(0);

  useEffect(() => {
    const onPointerMove = (e) => {
      if (!isPointerDown.current) return;
      const deltaX = e.clientX - startX.current;
      startX.current = e.clientX;
      targetRotationY.current += deltaX * 0.012;
    };

    const onPointerUp = () => {
      isPointerDown.current = false;
      document.body.style.cursor = 'auto';
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const dt = Math.min(delta, 0.1);
    currentRotationY.current = THREE.MathUtils.lerp(currentRotationY.current, targetRotationY.current, dt * 12);
    groupRef.current.rotation.y = currentRotationY.current;
  });

  return (
    <group 
      ref={groupRef}
      onPointerDown={(e) => {
        e.stopPropagation();
        isPointerDown.current = true;
        startX.current = e.clientX;
        document.body.style.cursor = 'grabbing';
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'grab';
      }}
      onPointerOut={() => {
        if (!isPointerDown.current) {
          document.body.style.cursor = 'auto';
        }
      }}
    >
      {/* Invisible hit cylinder around magnet to catch drag gestures */}
      <mesh visible={false} position={[0, 4.0, 0]}>
        <cylinderGeometry args={[12, 12, 5.5, 32]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      {children}
    </group>
  );
}

// 3D Breaking Magnet Component exactly matching Stage 1 Magnet (14.0 x 1.5 x 2.2) and Paper (30 x 0.04 x 18)
function BreakingMagnet3D({ broken, showPoles }) {
  const leftGroupRef = useRef();
  const rightGroupRef = useRef();

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);
    // Smooth separation animation along X axis
    const targetLeftX = broken ? -3.5 : 0;
    const targetRightX = broken ? 3.5 : 0;

    if (leftGroupRef.current) {
      leftGroupRef.current.position.x = THREE.MathUtils.lerp(
        leftGroupRef.current.position.x,
        targetLeftX,
        dt * 6
      );
    }
    if (rightGroupRef.current) {
      rightGroupRef.current.position.x = THREE.MathUtils.lerp(
        rightGroupRef.current.position.x,
        targetRightX,
        dt * 6
      );
    }
  });

  return (
    <group position={[0, 4.2, 0]} scale={[1.35, 2.2, 1.35]}>
      {/* ---------------- LEFT PIECE (Length: 6.0, Height: 1.3, Depth: 1.9) ---------------- */}
      <group ref={leftGroupRef} position={[0, 0, 0]}>
        {/* Left Sub-Half: North Pole (3.0 length) */}
        <mesh position={[-4.5, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.0, 1.3, 1.9]} />
          <meshStandardMaterial color="#124982" roughness={0.4} metalness={0.25} />
        </mesh>
        
        {/* North Pole Letter */}
        <Text
          position={[-4.2, 0.66, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.95}
          color="#FFFFFF"
          fontWeight="bold"
        >
          N
        </Text>

        {/* Left Sub-Half: Body turns into South Pole upon reveal (3.0 length) */}
        <mesh position={[-1.5, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.0, 1.3, 1.9]} />
          <meshStandardMaterial
            color={showPoles ? '#A31820' : '#124982'}
            roughness={0.4}
            metalness={0.25}
          />
        </mesh>

        {/* New South Pole Letter on Left Piece cut edge */}
        {showPoles && (
          <Text
            position={[-1.5, 0.66, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.95}
            color="#FFFFFF"
            fontWeight="bold"
          >
            S
          </Text>
        )}
      </group>

      {/* ---------------- RIGHT PIECE (Length: 6.0, Height: 1.3, Depth: 1.9) ---------------- */}
      <group ref={rightGroupRef} position={[0, 0, 0]}>
        {/* Right Sub-Half: Body turns into North Pole upon reveal (3.0 length) */}
        <mesh position={[1.5, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.0, 1.3, 1.9]} />
          <meshStandardMaterial
            color={showPoles ? '#124982' : '#A31820'}
            roughness={0.4}
            metalness={0.25}
          />
        </mesh>

        {/* New North Pole Letter on Right Piece cut edge */}
        {showPoles && (
          <Text
            position={[1.5, 0.66, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.95}
            color="#FFFFFF"
            fontWeight="bold"
          >
            N
          </Text>
        )}

        {/* Right Sub-Half: South Pole (3.0 length) */}
        <mesh position={[4.5, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.0, 1.3, 1.9]} />
          <meshStandardMaterial color="#A31820" roughness={0.4} metalness={0.25} />
        </mesh>

        {/* South Pole Letter */}
        <Text
          position={[4.2, 0.66, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.95}
          color="#FFFFFF"
          fontWeight="bold"
        >
          S
        </Text>
      </group>

      {/* Center Dividing Seam (Exact dimension: 0.06 x 1.31 x 1.91) */}
      {!broken && (
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.06, 1.31, 1.91]} />
          <meshStandardMaterial color="#111827" roughness={0.7} />
        </mesh>
      )}
    </group>
  );
}

// ---------------------------------------------------------
// Perfectly fitted scale and position inside classroom blackboard (shifted significantly further downwards)
function AnimatedLabGroup({ children }) {
  const FIXED_SCALE = 0.42;
  return (
    <group position={[1.0, -1.1, 0]} scale={[FIXED_SCALE, FIXED_SCALE, FIXED_SCALE]}>
      {children}
    </group>
  );
}

export default function Stage2_BreakingMagnet({ onComplete }) {
  const [broken, setBroken] = useState(false);
  const [showPoles, setShowPoles] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState(null);

  const handleBreak = () => {
    setBroken(true);
  };

  const handleShowPoles = () => {
    setShowPoles(true);
  };

  const handleReset = () => {
    setBroken(false);
    setShowPoles(false);
    setQuizAnswer(null);
  };

  const handleQuizAnswer = (answer) => {
    setQuizAnswer(answer);
  };

  const handleNextSection = () => {
    if (onComplete) onComplete();
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
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
      }}
    >
      {/* Left Side: 3D Canvas Interactive Area matching Stage 1 background and sizing */}
      <div
        style={{
          flex: '1.8',
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          height: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            flex: 1,
            minHeight: '380px',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1.5px solid #A7F3D0',
            boxShadow: '0 12px 30px rgba(6, 78, 59, 0.12)',
            backgroundImage: `url('/MagneticPoles/classroom_sunset_bg.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        >
          {/* 3D Canvas Scene matching Stage 1 Camera, Lighting, and Controls */}
          <Canvas
            shadows
            gl={{ alpha: true, antialias: true }}
            camera={{ position: [0.3, 10.6, 24], fov: 40 }}
            style={{ width: '100%', height: '100%' }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.9} color="#FFF7ED" />
              <directionalLight
                position={[-12, 18, 10]}
                intensity={2.2}
                color="#FED7AA"
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-bias={-0.0001}
              />
              <directionalLight position={[12, 10, -5]} intensity={0.5} color="#E0F2FE" />
              <Environment preset="sunset" />

              <AnimatedLabGroup>
                <RotatableMagnetGroup>
                  <BreakingMagnet3D broken={broken} showPoles={showPoles} />
                </RotatableMagnetGroup>
                <WhiteFloatingPaper />

                {/* Soft Drop Shadow under Floating Paper */}
                <ContactShadows position={[0, -0.12, 0]} opacity={0.7} scale={38} blur={2.4} far={4} color="#000000" />
              </AnimatedLabGroup>
              <OrbitControls
                makeDefault
                target={[0.4, -0.9, 0]}
                enableZoom={false}
                enableRotate={true}
                minAzimuthAngle={0}
                maxAzimuthAngle={0}
                minPolarAngle={0.35}
                maxPolarAngle={1.42}
                enableDamping={true}
                dampingFactor={0.08}
                rotateSpeed={0.7}
                enablePan={false}
              />
            </Suspense>
          </Canvas>

          {/* Passive Interaction Hint Overlay */}
          <div style={{
            position: 'absolute',
            bottom: '14px',
            left: '16px',
            background: 'rgba(6, 78, 59, 0.82)',
            backdropFilter: 'blur(8px)',
            color: '#FFFFFF',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '0.78rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid rgba(167, 243, 208, 0.45)',
            pointerEvents: 'none',
            boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
            zIndex: 10
          }}>
            <Hand size={14} color="#FDE68A" />
            <span>Drag vertically to tilt view • Drag magnet to rotate</span>
          </div>
        </div>
      </div>

      {/* Right Side: Control Panel (Unified Warm Orange Theme) */}
      <div
        style={{
          flex: '1.15',
          background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
          border: '1.5px solid #FDE68A',
          borderRadius: '24px',
          padding: '1.25rem 1.35rem',
          boxShadow: '0 6px 24px rgba(217, 119, 6, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          minWidth: 0,
          overflowY: 'auto',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Scissors size={26} color="#D97706" />
            <h3 style={{ margin: 0, fontSize: '1.45rem', color: '#78350F', fontWeight: 900 }}>
              Stage 2: Breaking Magnet
            </h3>
          </div>
          <span style={{
            background: (broken && showPoles && quizAnswer === 'no') ? '#DCFCE7' : '#FEF3C7',
            color: (broken && showPoles && quizAnswer === 'no') ? '#15803D' : '#92400E',
            fontWeight: 900,
            fontSize: '0.88rem',
            padding: '0.35rem 0.8rem',
            borderRadius: '12px',
            border: (broken && showPoles && quizAnswer === 'no') ? '1.5px solid #86EFAC' : '1.5px solid #F59E0B'
          }}>
            Step {broken && showPoles ? 3 : broken ? 2 : 1} of 3
          </span>
        </div>

        {/* CONTAINER 1: Steps of Instructions */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.96)',
          border: '1.5px solid #FDE68A',
          borderRadius: '20px',
          padding: '1.1rem 1.2rem',
          boxShadow: '0 4px 14px rgba(217, 119, 6, 0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #FEF3C7', paddingBottom: '0.5rem' }}>
            <h4 style={{ margin: 0, fontSize: '1.15rem', color: '#78350F', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span>📋</span> Steps of Instructions
            </h4>
          </div>

          {/* All 3 Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              {
                stepNum: 1,
                title: '1. Break the Bar Magnet',
                desc: 'Click "1. Break" to cut the 3D bar magnet directly in half.'
              },
              {
                stepNum: 2,
                title: '2. Reveal New Magnetic Poles',
                desc: 'Click "2. Show Poles" to reveal magnetic polarity at the newly cut inner ends.'
              },
              {
                stepNum: 3,
                title: '3. Observe Magnetic Dipoles',
                desc: 'Notice that each half automatically forms a complete magnet with North (N) and South (S) poles.'
              }
            ].map((s) => {
              const currentStepNum = broken && showPoles ? 3 : broken ? 2 : 1;
              const isCurrent = currentStepNum === s.stepNum;
              const isPast = currentStepNum > s.stepNum || (s.stepNum === 3 && broken && showPoles && quizAnswer === 'no');

              return (
                <div
                  key={s.stepNum}
                  style={{
                    padding: '0.65rem 0.85rem',
                    borderRadius: '14px',
                    background: isPast ? '#DCFCE7' : isCurrent ? '#FEF3C7' : 'rgba(255, 255, 255, 0.7)',
                    border: isPast ? '1.5px solid #86EFAC' : isCurrent ? '1.5px solid #F59E0B' : '1.5px solid transparent',
                    boxShadow: isPast 
                      ? '0 3px 10px rgba(16, 185, 129, 0.1)' 
                      : isCurrent 
                      ? '0 3px 10px rgba(245, 158, 11, 0.12)' 
                      : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.2rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <span style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: isPast ? '#059669' : '#FEF3C7',
                        border: isPast ? '2px solid #059669' : '2px solid #F59E0B',
                        color: isPast ? '#FFFFFF' : '#92400E',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.92rem',
                        fontWeight: 900,
                        flexShrink: 0
                      }}>
                        {s.stepNum}
                      </span>
                      <span style={{ 
                        fontWeight: 900, 
                        fontSize: '1.1rem', 
                        color: isPast ? '#15803D' : isCurrent ? '#92400E' : '#78350F' 
                      }}>
                        {s.title}
                      </span>
                    </div>
                    {isPast && <CheckCircle size={20} color="#16A34A" />}
                  </div>
                  <p style={{ margin: '0.15rem 0 0 2.3rem', fontSize: '0.96rem', color: isPast ? '#166534' : '#065F46', lineHeight: 1.5, fontWeight: 600 }}>
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Action Controls */}
          <div style={{ width: '100%', display: 'flex', gap: '0.65rem', marginTop: '0.35rem', paddingTop: '0.5rem', borderTop: '1px solid #FEF3C7' }}>
            <button
              onClick={handleBreak}
              disabled={broken}
              className={!broken ? 'gold-glow-btn' : ''}
              style={{
                flex: 1,
                padding: '0.85rem 0.5rem',
                fontSize: '0.98rem',
                fontWeight: 900,
                borderRadius: '14px',
                background: !broken ? undefined : '#F1F5F9',
                color: !broken ? '#FFFFFF' : '#94A3B8',
                border: 'none',
                cursor: !broken ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                transition: 'all 0.2s ease',
              }}
            >
              <Scissors size={16} /> 1. Break
            </button>

            <button
              onClick={handleShowPoles}
              disabled={!broken || showPoles}
              className={broken && !showPoles ? 'gold-glow-btn' : ''}
              style={{
                flex: 1,
                padding: '0.85rem 0.5rem',
                fontSize: '0.98rem',
                fontWeight: 900,
                borderRadius: '14px',
                background: broken && !showPoles ? undefined : '#F1F5F9',
                color: broken && !showPoles ? '#FFFFFF' : '#94A3B8',
                border: 'none',
                cursor: broken && !showPoles ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                transition: 'all 0.2s ease',
              }}
            >
              🧲 {showPoles ? 'Poles Shown ✓' : '2. Show Poles'}
            </button>

            <button
              onClick={handleReset}
              disabled={!broken}
              style={{
                flex: 1,
                padding: '0.85rem 0.5rem',
                fontSize: '0.98rem',
                fontWeight: 800,
                borderRadius: '14px',
                background: '#FFFFFF',
                color: broken ? '#92400E' : '#94A3B8',
                border: '1.5px solid #FDE68A',
                cursor: broken ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                boxShadow: broken ? '0 2px 6px rgba(0,0,0,0.03)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <RotateCcw size={16} /> Reset
            </button>
          </div>
        </div>

        {/* CONTAINER 2: Observation & Conclusion Quiz */}
        <div
          style={{
            background: quizAnswer === 'no' ? '#DCFCE7' : 'rgba(255, 255, 255, 0.96)',
            border: quizAnswer === 'no' ? '1.5px solid #86EFAC' : '1.5px solid #FDE68A',
            borderRadius: '20px',
            padding: '1.1rem 1.2rem',
            boxShadow: quizAnswer === 'no' ? '0 4px 14px rgba(16, 185, 129, 0.12)' : '0 4px 14px rgba(217, 119, 6, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem'
          }}
        >
          <h4
            style={{
              color: quizAnswer === 'no' ? '#15803D' : '#78350F',
              margin: 0,
              fontSize: '1.2rem',
              fontWeight: 900,
              display: 'flex',
              alignItems: 'center',
              gap: '0.55rem',
            }}
          >
            <AlertCircle size={22} color={quizAnswer === 'no' ? '#16A34A' : '#D97706'} /> Observation & Conclusion
          </h4>
          <p style={{ margin: 0, color: quizAnswer === 'no' ? '#166534' : '#065F46', fontSize: '1.02rem', lineHeight: 1.55, fontWeight: 600 }}>
            Based on what happens when a magnet breaks, is it possible to obtain a magnet with only a single pole?
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <button
              onClick={() => handleQuizAnswer('yes')}
              style={{
                padding: '0.85rem 1.1rem',
                textAlign: 'left',
                fontSize: '0.98rem',
                fontWeight: 700,
                borderRadius: '14px',
                cursor: 'pointer',
                background: quizAnswer === 'yes' ? '#FEE2E2' : '#F8FAFC',
                borderColor: quizAnswer === 'yes' ? '#EF4444' : '#E2E8F0',
                borderWidth: '1.5px',
                borderStyle: 'solid',
                color: quizAnswer === 'yes' ? '#991B1B' : '#065F46',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                transition: 'all 0.2s ease',
              }}
            >
              <span>A) Yes, we can isolate a single North or South pole</span>
              {quizAnswer === 'yes' && <XCircle size={20} color="#EF4444" />}
            </button>

            <button
              onClick={() => handleQuizAnswer('no')}
              style={{
                padding: '0.85rem 1.1rem',
                textAlign: 'left',
                fontSize: '0.98rem',
                fontWeight: 700,
                borderRadius: '14px',
                cursor: 'pointer',
                background: quizAnswer === 'no' ? '#DCFCE7' : '#F8FAFC',
                borderColor: quizAnswer === 'no' ? '#10B981' : '#E2E8F0',
                borderWidth: '1.5px',
                borderStyle: 'solid',
                color: quizAnswer === 'no' ? '#064E3B' : '#065F46',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                transition: 'all 0.2s ease',
              }}
            >
              <span>B) No, a single isolated pole cannot exist</span>
              {quizAnswer === 'no' && <CheckCircle size={20} color="#10B981" />}
            </button>
          </div>

          {/* Proceed Button */}
          {(() => {
            const isReadyToProceed = broken && showPoles && quizAnswer === 'no';
            return (
              <button
                onClick={handleNextSection}
                disabled={!isReadyToProceed}
                className={isReadyToProceed ? 'gold-glow-btn' : ''}
                style={{
                  width: '100%',
                  padding: '0.95rem',
                  fontSize: '1.05rem',
                  fontWeight: 900,
                  borderRadius: '14px',
                  background: isReadyToProceed
                    ? undefined
                    : '#F1F5F9',
                  color: isReadyToProceed ? '#FFFFFF' : '#94A3B8',
                  border: isReadyToProceed ? 'none' : '1.5px solid #CBD5E1',
                  cursor: isReadyToProceed ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  transition: 'all 0.25s ease',
                }}
              >
                Proceed to Stage 3{' '}
                <ArrowRight size={18} color={isReadyToProceed ? '#FFFFFF' : '#94A3B8'} />
              </button>
            );
          })()}
        </div>
      </div>
    </div>
  );
}