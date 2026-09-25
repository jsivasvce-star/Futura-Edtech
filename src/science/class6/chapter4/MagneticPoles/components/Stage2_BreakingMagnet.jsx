import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, ContactShadows, Environment, useTexture } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Scissors, AlertCircle, CheckCircle, XCircle, ArrowRight, BookOpen, RotateCcw, Hand, HelpCircle, Sparkles } from 'lucide-react';
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
      }}
    >
      {/* Left Side: 3D Video Player Scene (65% width) */}
      <div
        style={{
          flex: '0 0 65%',
          maxWidth: '65%',
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
            maxWidth: '100%',
            flex: 1,
            minHeight: '380px',
            borderRadius: '24px',
            border: '1.5px solid rgba(255, 255, 255, 0.8)',
            overflow: 'hidden',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.12)',
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

      {/* Right Side: 35% Grid Proportion */}
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
              { num: '1', text: 'Watch the magnet break into two smaller pieces.' },
              { num: '2', text: 'Observe what happens at the broken ends.' },
              { num: '3', text: 'Notice each broken piece becomes a complete magnet.' }
            ].map((s) => (
              <div key={s.num} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div className="gold-step-badge">{s.num}</div>
                <span style={{ fontSize: '1.55rem', color: '#173B5F', fontWeight: 700, lineHeight: 1.35 }}>
                  {s.text}
                </span>
              </div>
            ))}
          </div>

          {/* Tip / Observation Green Box */}
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
                Poles always exist in pairs.
              </span>
              <span style={{ fontSize: '1.18rem', fontWeight: 600, color: '#15803D', lineHeight: 1.25 }}>
                A broken magnet always forms North and South.
              </span>
            </div>
          </div>

          {/* Action Controls Row */}
          <div style={{ width: '100%', display: 'flex', gap: '0.85rem', marginTop: '0.1rem' }}>
            <button
              onClick={isPlaying ? handlePause : handleResume}
              className={isPlaying ? 'gold-glow-btn' : ''}
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
                background: !isPlaying ? '#F3F7F9' : undefined,
                color: !isPlaying ? '#173B5F' : '#FFFFFF',
                border: !isPlaying ? '1.5px solid #E2E8F0' : undefined
              }}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} fill="currentColor" />}
              {isPlaying ? 'Pause' : 'Resume'}
            </button>

            <button
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

        {/* CONTAINER 2: Observation & Conclusion */}
        <div
          className="stage-container-2"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: quizAnswer === 'no' ? '2px solid #86EFAC' : quizAnswer === 'yes' ? '2px solid #FECACA' : '1.5px solid #E2E8F0',
            borderRadius: '24px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
            padding: '1.25rem 1.55rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: '0.85rem',
            boxSizing: 'border-box',
          }}
        >
          {/* Header Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <HelpCircle size={32} color="#173B5F" strokeWidth={2.5} />
            <h3 style={{ margin: 0, fontSize: '2.15rem', color: '#1E1B4B', fontWeight: 900, letterSpacing: '-0.02em' }}>
              Observation & Conclusion
            </h3>
          </div>
          
          <p style={{ margin: 0, color: '#173B5F', fontSize: '1.45rem', lineHeight: 1.35, fontWeight: 700 }}>
            Based on what happens when a magnet breaks, is it possible to obtain a magnet with only a single pole?
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <button
              type="button"
              onClick={() => handleQuizAnswer('yes')}
              aria-pressed={quizAnswer === 'yes'}
              style={{
                padding: '0.95rem 1.35rem',
                textAlign: 'left',
                fontSize: '1.35rem',
                fontWeight: 800,
                lineHeight: 1.25,
                borderRadius: '16px',
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
              {quizAnswer === 'yes' && <XCircle size={24} color="#EF4444" />}
            </button>

            <button
              type="button"
              onClick={() => handleQuizAnswer('no')}
              aria-pressed={quizAnswer === 'no'}
              style={{
                padding: '0.95rem 1.35rem',
                textAlign: 'left',
                fontSize: '1.35rem',
                fontWeight: 800,
                lineHeight: 1.25,
                borderRadius: '16px',
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
              {quizAnswer === 'no' && <CheckCircle size={24} color="#10B981" />}
            </button>
          </div>

          {/* Positive Feedback when 'no' is selected */}
          {quizAnswer === 'no' && (
            <div
              style={{
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
                gap: '0.65rem',
              }}
            >
              <CheckCircle size={22} color="#10B981" style={{ flexShrink: 0 }} />
              <span>🎉 Correct! A single isolated pole cannot exist. Every broken piece forms both North and South poles.</span>
            </div>
          )}

          {/* Corrective Feedback when 'yes' is selected */}
          {quizAnswer === 'yes' && (
            <div
              style={{
                padding: '0.75rem 1.15rem',
                borderRadius: '14px',
                background: '#FEF2F2',
                border: '1.5px solid #F87171',
                color: '#991B1B',
                fontSize: '1.15rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
              }}
            >
              <XCircle size={20} color="#DC2626" style={{ flexShrink: 0 }} />
              <span>Incorrect. Single isolated magnetic poles cannot exist! When broken, each piece becomes a complete magnet.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}