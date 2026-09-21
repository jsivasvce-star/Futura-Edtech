import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, ContactShadows, Environment, useTexture } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, AlertCircle, CheckCircle, XCircle, ArrowRight, BookOpen, RotateCcw, Hand } from 'lucide-react';
import BreakingMagnetVideoPlayer from './BreakingMagnetVideoPlayer';
import * as THREE from 'three';
import '../MagneticPoles.css';

// ---------------------------------------------------------

// ---------------------------------------------------------
// Rotatable System for Magnet
// ---------------------------------------------------------
// ---------------------------------------------------------
// Rotatable System for Magnet (2-Axis Pitch & Yaw centered at y = 4.2)
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
    <group position={[0, 4.2, 0]}>
      <group ref={groupRef}>
        <group position={[0, -4.2, 0]}>
          {children}
        </group>
      </group>
    </group>
  );
}

// 3D Breaking Magnet Component exactly matching Stage 1 Magnet (Colors: #DC2626 & #2563EB, No dark lines)
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

  // Solid, vibrant colors exactly matching Stage 1
  const RED = '#DC2626';
  const BLUE = '#2563EB';

  return (
    <group position={[0, 4.2, 0]} scale={[1.35, 2.2, 1.35]}>
      {/* ---------------- LEFT PIECE (Length: 6.0, Height: 1.3, Depth: 1.9) ---------------- */}
      <group ref={leftGroupRef} position={[0, 0, 0]}>
        {/* Left Sub-Half: North Pole (3.0 length) - Bold Red */}
        <mesh position={[-4.5, 0, 0]} castShadow receiveShadow={false}>
          <boxGeometry args={[3.0, 1.3, 1.9]} />
          <meshStandardMaterial color={RED} roughness={0.4} metalness={0.1} />
        </mesh>

        {/* Left Sub-Half: Body turns into South Pole upon reveal (3.0 length) */}
        <mesh position={[-1.5, 0, 0]} castShadow receiveShadow={false}>
          <boxGeometry args={[3.0, 1.3, 1.9]} />
          <meshStandardMaterial
            color={showPoles ? BLUE : RED}
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>

        {/* North Pole Text on Front and Top */}
        <Text
          position={[showPoles ? -4.5 : -3.0, 0, 0.965]}
          fontSize={showPoles ? 0.52 : 0.65}
          color="#FFFFFF"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          North
        </Text>
        <Text
          position={[showPoles ? -4.5 : -3.0, 0.665, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={showPoles ? 0.52 : 0.65}
          color="#FFFFFF"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          North
        </Text>

        {/* New South Pole Text on Left Piece cut edge upon reveal */}
        {showPoles && (
          <>
            <Text
              position={[-1.5, 0, 0.965]}
              fontSize={0.52}
              color="#FFFFFF"
              fontWeight="bold"
              anchorX="center"
              anchorY="middle"
            >
              South
            </Text>
            <Text
              position={[-1.5, 0.665, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              fontSize={0.52}
              color="#FFFFFF"
              fontWeight="bold"
              anchorX="center"
              anchorY="middle"
            >
              South
            </Text>
          </>
        )}
      </group>

      {/* ---------------- RIGHT PIECE (Length: 6.0, Height: 1.3, Depth: 1.9) ---------------- */}
      <group ref={rightGroupRef} position={[0, 0, 0]}>
        {/* Right Sub-Half: Body turns into North Pole upon reveal (3.0 length) */}
        <mesh position={[1.5, 0, 0]} castShadow receiveShadow={false}>
          <boxGeometry args={[3.0, 1.3, 1.9]} />
          <meshStandardMaterial
            color={showPoles ? RED : BLUE}
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>

        {/* New North Pole Text on Right Piece cut edge upon reveal */}
        {showPoles && (
          <>
            <Text
              position={[1.5, 0, 0.965]}
              fontSize={0.52}
              color="#FFFFFF"
              fontWeight="bold"
              anchorX="center"
              anchorY="middle"
            >
              North
            </Text>
            <Text
              position={[1.5, 0.665, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              fontSize={0.52}
              color="#FFFFFF"
              fontWeight="bold"
              anchorX="center"
              anchorY="middle"
            >
              North
            </Text>
          </>
        )}

        {/* Right Sub-Half: South Pole (3.0 length) - Deep Ocean Blue */}
        <mesh position={[4.5, 0, 0]} castShadow receiveShadow={false}>
          <boxGeometry args={[3.0, 1.3, 1.9]} />
          <meshStandardMaterial color={BLUE} roughness={0.4} metalness={0.1} />
        </mesh>

        {/* South Pole Text on Front and Top */}
        <Text
          position={[showPoles ? 4.5 : 3.0, 0, 0.965]}
          fontSize={showPoles ? 0.52 : 0.65}
          color="#FFFFFF"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          South
        </Text>
        <Text
          position={[showPoles ? 4.5 : 3.0, 0.665, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={showPoles ? 0.52 : 0.65}
          color="#FFFFFF"
          fontWeight="bold"
          anchorX="center"
          anchorY="middle"
        >
          South
        </Text>
      </group>
    </group>
  );
}

// ---------------------------------------------------------
// Classroom Blackboard Centered Lab Placement
// ---------------------------------------------------------
function AnimatedLabGroup({ children }) {
  const FIXED_SCALE = 0.36;
  return (
    <group position={[0.1, 5.2, 0]} scale={[FIXED_SCALE, FIXED_SCALE, FIXED_SCALE]}>
      {children}
    </group>
  );
}

export default function Stage2_BreakingMagnet({ onComplete }) {
  const [broken, setBroken] = useState(false);
  const [showPoles, setShowPoles] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState(null);

  const handleVideoPhaseChange = useCallback((phase, progress) => {
    // Video demonstration is visual; do not modify right-side contents or colors
  }, []);


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
        background: 'transparent',
      }}
    >
      {/* Dedicated Viewer Container (3D Demonstration Video) */}
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
        {/* Display Container: Video Player */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            flex: 1,
            minHeight: '380px',
            overflow: 'hidden',
            borderRadius: '24px',
          }}
        >
          <BreakingMagnetVideoPlayer
            videoSrc="/MagneticPoles/breaking_magnet_demonstration.mp4"
            fallbackSrc="/assets/WhatsApp Video 2026-09-16 at 2.06.03 PM.mp4"
            broken={broken}
            showPoles={showPoles}
            onPhaseChange={handleVideoPhaseChange}
            onExternalReset={handleReset}
            autoPlay={true}
            loop={false}
          />
        </div>
      </div>

      {/* Right Column: Fullscreen non-scrolling, Halfscreen scrolling */}
      <div
        className="stage-right-column custom-scrollbar"
        style={{
          flex: '1.15',
          height: '100%',
          maxHeight: '100%',
          minHeight: 0,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.65rem',
          minWidth: 0,
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
      >
        {/* CONTAINER 1: Steps of Instructions */}
        <div
          className="stage-container-1"
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1.5px solid rgba(217, 119, 6, 0.25)', paddingBottom: '0.6rem', marginBottom: '0.75rem' }}>
              <h4 style={{ margin: 0, fontSize: '19.5px', color: '#173B5F', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span>📋</span> Steps of Instructions
              </h4>
            </div>

            {/* Bullet Points - Single-line brown instructions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                'Click "1. Break" to cut the 3D bar magnet directly in half.',
                'Click "2. Show Poles" to reveal magnetic polarity at the cut ends.',
                'Notice each half forms a complete magnet with N and S poles.'
              ].map((instruction, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '0.75rem',
                    padding: '0.1rem 0'
                  }}
                >
                  <span
                    style={{
                      width: '9px',
                      height: '9px',
                      borderRadius: '50%',
                      background: '#173B5F',
                      display: 'inline-block',
                      flexShrink: 0,
                      transform: 'translateY(-2px)'
                    }}
                  />
                  <p style={{ margin: 0, fontSize: '17.5px', lineHeight: 1.5, color: '#173B5F', fontWeight: 600 }}>
                    {instruction}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Controls */}
          <div style={{ width: '100%', display: 'flex', gap: '0.65rem', marginTop: 'auto', paddingTop: '0.85rem', borderTop: '1px solid rgba(217, 119, 6, 0.2)' }}>
            <button
              onClick={handleBreak}
              className="gold-glow-btn"
              style={{
                flex: 1,
                padding: '0.8rem 0.5rem',
                fontSize: '17px',
                fontWeight: 900,
                borderRadius: '14px',
                border: 'none',
                cursor: 'pointer',
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
              style={{
                flex: 1,
                padding: '0.8rem 0.5rem',
                fontSize: '17px',
                fontWeight: 800,
                borderRadius: '14px',
                background: '#FFFFFF',
                color: '#173B5F',
                border: '1.5px solid #E2E8F0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                transition: 'all 0.2s ease',
              }}
            >
              🧲 2. Show Poles
            </button>

            <button
              onClick={handleReset}
              style={{
                flex: 1,
                padding: '0.8rem 0.5rem',
                fontSize: '17px',
                fontWeight: 800,
                borderRadius: '14px',
                background: '#FFFFFF',
                color: '#173B5F',
                border: '1.5px solid #E2E8F0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
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
            background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)',
            border: '1.5px solid #E2E8F0',
            borderRadius: '24px',
            padding: '1.25rem 1.45rem',
            boxShadow: '0 6px 24px rgba(217, 119, 6, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1.15,
            minHeight: 0,
            boxSizing: 'border-box'
          }}
        >
          <div>
            <h4
              style={{
                color: '#173B5F',
                margin: 0,
                fontSize: '19.5px',
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
                paddingBottom: '0.55rem',
                borderBottom: '1.5px solid rgba(217, 119, 6, 0.25)'
              }}
            >
              <AlertCircle size={22} color="#173B5F" /> Observation & Conclusion
            </h4>
            <p style={{ margin: '0.75rem 0', color: '#173B5F', fontSize: '17.5px', lineHeight: 1.5, fontWeight: 700 }}>
              Based on what happens when a magnet breaks, is it possible to obtain a magnet with only a single pole?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.65rem' }}>
              <button
                onClick={() => handleQuizAnswer('yes')}
                style={{
                  padding: '0.85rem 1.15rem',
                  textAlign: 'left',
                  fontSize: '17px',
                  fontWeight: 700,
                  borderRadius: '14px',
                  cursor: 'pointer',
                  background: quizAnswer === 'yes' ? '#FEE2E2' : '#FFFFFF',
                  borderColor: quizAnswer === 'yes' ? '#EF4444' : '#E2E8F0',
                  borderWidth: '1.5px',
                  borderStyle: 'solid',
                  color: quizAnswer === 'yes' ? '#991B1B' : '#173B5F',
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
                  padding: '0.85rem 1.15rem',
                  textAlign: 'left',
                  fontSize: '17px',
                  fontWeight: 700,
                  borderRadius: '14px',
                  cursor: 'pointer',
                  background: quizAnswer === 'no' ? '#DCFCE7' : '#FFFFFF',
                  borderColor: quizAnswer === 'no' ? '#10B981' : '#E2E8F0',
                  borderWidth: '1.5px',
                  borderStyle: 'solid',
                  color: quizAnswer === 'no' ? '#064E3B' : '#173B5F',
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
          </div>

          {/* Proceed Button */}
          {(() => {
            const isReadyToProceed = quizAnswer === 'no';
            return (
              <div style={{ paddingTop: '0.75rem', marginTop: 'auto' }}>
                <button
                  onClick={handleNextSection}
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
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}