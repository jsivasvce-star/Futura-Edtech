import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, ContactShadows, Environment, useTexture } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Scissors, AlertCircle, CheckCircle, XCircle, ArrowRight, BookOpen, RotateCcw, Hand } from 'lucide-react';
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
  const videoPlayerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [warningPrompt, setWarningPrompt] = useState(null);

  const handleVideoPhaseChange = useCallback((phase, progress) => {
    // Video demonstration is visual; do not modify right-side contents or colors
  }, []);

  const handlePause = () => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.pause();
    }
    setIsPlaying(false);
  };

  const handleResume = () => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.resume();
    }
    setIsPlaying(true);
  };

  const handleReset = () => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.reset();
    }
    setIsPlaying(true);
    setQuizAnswer(null);
    setWarningPrompt(null);
  };

  const handleQuizAnswer = (answer) => {
    setQuizAnswer(answer);
    setWarningPrompt(null);
  };

  const handleProceedClick = () => {
    if (!quizAnswer) {
      setWarningPrompt('Please answer the observation question before clicking "Proceed".');
      return;
    }
    if (quizAnswer === 'yes') {
      setWarningPrompt('Incorrect answer. Single isolated magnetic poles cannot exist! Please select the correct answer to proceed.');
      return;
    }
    setWarningPrompt(null);
    if (onComplete) onComplete();
  };

  return (
    <div
      style={{
        padding: '0.35rem 0.5rem',
        display: 'flex',
        gap: '0.85rem',
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
          flex: '1.25',
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          minHeight: 0,
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
            minHeight: 0,
            overflow: 'hidden',
            borderRadius: '24px',
          }}
        >
          <BreakingMagnetVideoPlayer
            ref={videoPlayerRef}
            videoSrc="/assets/stage 2.mp4"
            fallbackSrc="/assets/stage 2.mp4"
            onPlaybackStateChange={setIsPlaying}
            onPhaseChange={handleVideoPhaseChange}
            onExternalReset={handleReset}
            autoPlay={true}
            loop={false}
          />
        </div>
      </div>

      {/* Right Column: Fullscreen non-scrolling, Halfscreen scrolling */}
      <div
        className="custom-scrollbar"
        style={{
          width: '560px',
          maxWidth: '560px',
          flex: '0 0 560px',
          height: '100%',
          maxHeight: '100%',
          minHeight: 0,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.55rem',
          minWidth: 0,
          overflow: 'hidden',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
      >
        {/* CONTAINER 1: Steps of Instructions */}
        <div
          style={{
            background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)',
            border: '1.5px solid #E2E8F0',
            borderRadius: '24px',
            padding: '0.7rem 0.85rem',
            boxShadow: '0 6px 24px rgba(217, 119, 6, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            flex: '0 0 auto',
            minHeight: 0,
          }}
        >
          {/* Top Section: Title & Instructions */}
          <div style={{ minHeight: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1.5px solid rgba(217, 119, 6, 0.25)', paddingBottom: '0.35rem', marginBottom: '0.45rem' }}>
              <h4 style={{ margin: 0, fontSize: '32px', color: '#173B5F', fontWeight: 800, lineHeight: 1.15, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span>📋</span> Steps of Instructions
              </h4>
            </div>

            {/* Bullet Points - Single-line brown instructions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {[
                'Watch the 3D video demonstration of a bar magnet breaking into pieces.',
                'Use "Pause" and "Resume" to closely observe the magnet and pole formation.',
                'Notice each broken half forms a complete magnet with North and South poles.'
              ].map((instruction, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.45rem',
                    padding: '0.05rem 0'
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
                      marginTop: '8px'
                    }}
                  />
                  <p style={{ margin: 0, fontSize: '24px', lineHeight: 1.18, color: '#173B5F', fontWeight: 600 }}>
                    {instruction}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section: Action Controls — always in dedicated area, never overlapping content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingTop: '0.4rem', borderTop: '1px solid rgba(217, 119, 6, 0.2)', flexShrink: 0 }}>
            <div style={{ width: '100%', display: 'flex', gap: '0.45rem', flexWrap: 'nowrap' }}>
              <button
                onClick={handlePause}
                className={isPlaying ? 'gold-glow-btn' : ''}
                style={{
                  flex: 1,
                  minWidth: 0,
                  padding: '0.45rem 0.35rem',
                  fontSize: '21px',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  borderRadius: '14px',
                  border: isPlaying ? 'none' : '1.5px solid #CBD5E1',
                  background: isPlaying ? undefined : '#FFFFFF',
                  color: isPlaying ? '#FFFFFF' : '#173B5F',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  boxShadow: isPlaying ? undefined : '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
                title="Pause Demonstration"
              >
                <Pause size={16} /> Pause
              </button>

              <button
                onClick={handleResume}
                className={!isPlaying ? 'gold-glow-btn' : ''}
                style={{
                  flex: 1,
                  minWidth: 0,
                  padding: '0.45rem 0.35rem',
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
                  boxShadow: !isPlaying ? undefined : '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
                title="Resume Demonstration"
              >
                <Play size={16} fill="currentColor" /> Resume
              </button>

              <button
                onClick={handleReset}
                style={{
                  flex: 1,
                  minWidth: 0,
                  padding: '0.45rem 0.35rem',
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
                title="Reset Demonstration and Replay from Start"
              >
                <RotateCcw size={15} /> Reset
              </button>
            </div>
          </div>
        </div>

        {/* CONTAINER 2: Observation & Conclusion Quiz */}
        <div
          style={{
            background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)',
            border: '1.5px solid #E2E8F0',
            borderRadius: '24px',
            padding: '0.75rem 0.85rem',
            boxShadow: '0 6px 24px rgba(217, 119, 6, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
            minHeight: 0,
            boxSizing: 'border-box',
          }}
        >
          {/* Top Section: Question + Quiz options + Feedback */}
          <div style={{ minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <h4
              style={{
                color: '#173B5F',
                margin: 0,
                fontSize: '30px',
                fontWeight: 800,
                lineHeight: 1.15,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                paddingBottom: '0.35rem',
                borderBottom: '1.5px solid rgba(217, 119, 6, 0.25)'
              }}
            >
              <AlertCircle size={23} color="#173B5F" /> Observation & Conclusion
            </h4>
            <p style={{ margin: '0.25rem 0 0.35rem 0', color: '#173B5F', fontSize: '23px', lineHeight: 1.15, fontWeight: 700 }}>
              Based on what happens when a magnet breaks, is it possible to obtain a magnet with only a single pole?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.2rem' }}>
              <button
                type="button"
                onClick={() => handleQuizAnswer('yes')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleQuizAnswer('yes');
                  }
                }}
                aria-pressed={quizAnswer === 'yes'}
                style={{
                  padding: '0.45rem 0.85rem',
                  textAlign: 'left',
                  fontSize: '21px',
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
                type="button"
                onClick={() => handleQuizAnswer('no')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleQuizAnswer('no');
                  }
                }}
                aria-pressed={quizAnswer === 'no'}
                style={{
                  padding: '0.45rem 0.85rem',
                  textAlign: 'left',
                  fontSize: '21px',
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

            {/* In-container positive feedback when 'no' is selected */}
            <AnimatePresence>
              {quizAnswer === 'no' && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    marginTop: '0.4rem',
                    padding: '0.55rem 0.85rem',
                    borderRadius: '14px',
                    background: '#ECFDF5',
                    border: '1.5px solid #6EE7B7',
                    color: '#065F46',
                    fontSize: '15px',
                    fontWeight: 800,
                    lineHeight: 1.35,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.55rem',
                    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.12)',
                  }}
                >
                  <CheckCircle size={20} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ flex: 1 }}>🎉 Correct! A single isolated magnetic pole cannot exist. Every magnet always has both North and South poles!</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* In-container corrective feedback when 'yes' is selected */}
            <AnimatePresence>
              {quizAnswer === 'yes' && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    marginTop: '0.4rem',
                    padding: '0.55rem 0.85rem',
                    borderRadius: '14px',
                    background: '#FEF2F2',
                    border: '1.5px solid #F87171',
                    color: '#991B1B',
                    fontSize: '15px',
                    fontWeight: 800,
                    lineHeight: 1.35,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.55rem',
                    boxShadow: '0 4px 14px rgba(239, 68, 68, 0.12)',
                  }}
                >
                  <XCircle size={20} color="#DC2626" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ flex: 1 }}>Incorrect. Single isolated magnetic poles cannot exist! When broken, each piece becomes a complete magnet with two poles. Try again!</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Prompt when user attempts to proceed without answering */}
            <AnimatePresence>
              {warningPrompt && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    marginTop: '0.4rem',
                    padding: '0.55rem 0.85rem',
                    borderRadius: '14px',
                    background: '#FFFBEB',
                    border: '1.5px solid #FCD34D',
                    color: '#92400E',
                    fontSize: '15px',
                    fontWeight: 800,
                    lineHeight: 1.35,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.55rem',
                    boxShadow: '0 4px 14px rgba(245, 158, 11, 0.12)',
                  }}
                >
                  <AlertCircle size={20} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ flex: 1 }}>{warningPrompt}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Section: Proceed Button — always in dedicated area, never overlapping */}
          {(() => {
            const isReadyToProceed = quizAnswer === 'no';
            return (
              <div style={{ paddingTop: '0.45rem', flexShrink: 0 }}>
                <button
                  onClick={handleProceedClick}
                  className={isReadyToProceed ? 'gold-glow-btn' : ''}
                  style={{
                    width: '100%',
                    padding: '0.55rem 1.25rem',
                    fontSize: '21px',
                    fontWeight: 900,
                    borderRadius: '14px',
                    background: isReadyToProceed
                      ? undefined
                      : '#FFFFFF',
                    color: isReadyToProceed ? '#FFFFFF' : '#173B5F',
                    border: isReadyToProceed ? 'none' : '1.5px solid #CBD5E1',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.6rem',
                    whiteSpace: 'nowrap',
                    boxShadow: isReadyToProceed
                      ? undefined
                      : '0 2px 8px rgba(0,0,0,0.04)',
                    transition: 'all 0.25s ease',
                  }}
                >
                  Proceed to Stage 3{' '}
                  <ArrowRight size={18} color={isReadyToProceed ? '#FFFFFF' : '#92400E'} />
                </button>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}