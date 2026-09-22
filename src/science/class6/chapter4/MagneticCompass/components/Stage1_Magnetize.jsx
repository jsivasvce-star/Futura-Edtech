import React, { useState, useEffect, useMemo, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, useTexture } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw, ArrowRight, Play, BookOpen, HelpCircle, Leaf } from 'lucide-react';
import * as THREE from 'three';

// ---------------------------------------------------------
// 1. Extracted Real Sewing Needle on Wooden Tray Surface
// ---------------------------------------------------------
function ExtractedMagnetizedNeedle({ isMagnetized }) {
  const needleTexture = useTexture('/MagneticCompass/needle_magnetized.png');
  needleTexture.colorSpace = THREE.SRGBColorSpace;
  needleTexture.anisotropy = 16;
  const glowRef = useRef();

  useFrame((state) => {
    if (glowRef.current && isMagnetized) {
      glowRef.current.intensity = 1.4 + Math.sin(state.clock.elapsedTime * 4) * 0.6;
    }
  });

  return (
    <group position={[0, 0.08, 0]}>
      {/* Needle Sprite Plane laying flat directly on the wooden tray surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <planeGeometry args={[11.2, 1.26]} />
        <meshStandardMaterial
          map={needleTexture}
          transparent={true}
          alphaTest={0.05}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>

      {/* Subtle bottom drop shadow on the tray wood */}
      <mesh position={[0, -0.02, 0.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[11.0, 1.15]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.32} />
      </mesh>

      {/* Magnetic Aura on Poles when fully magnetized */}
      {isMagnetized && (
        <>
          <pointLight ref={glowRef} position={[0, 0.8, 0]} color="#38BDF8" distance={9} intensity={1.8} />
          {/* North Red Pole Aura */}
          <mesh position={[-4.7, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.3, 0.7, 24]} />
            <meshBasicMaterial color="#EF4444" transparent opacity={0.65} side={THREE.DoubleSide} />
          </mesh>
          {/* South Blue Pole Aura */}
          <mesh position={[4.6, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.3, 0.7, 24]} />
            <meshBasicMaterial color="#3B82F6" transparent opacity={0.65} side={THREE.DoubleSide} />
          </mesh>
        </>
      )}
    </group>
  );
}

// ---------------------------------------------------------
// 2. 3D Bar Magnet with Realistic Eye-to-Point Stroking Arc
// ---------------------------------------------------------
function BarMagnet3D({ strokeProgress, isAutoStroking }) {
  const magnetRef = useRef();

  useFrame(() => {
    if (!magnetRef.current) return;
    if (isAutoStroking) {
      const t = strokeProgress % 1;
      if (t < 0.75) {
        // Linear stroke from Eye (right, +4.8) to Point (left, -4.8)
        const p = t / 0.75;
        magnetRef.current.position.x = 4.8 - p * 9.6;
        magnetRef.current.position.y = 1.15;
        magnetRef.current.rotation.z = 0.15;
      } else {
        // Lifting and curving back to Eye
        const p = (t - 0.75) / 0.25;
        magnetRef.current.position.x = -4.8 + p * 9.6;
        magnetRef.current.position.y = 1.15 + Math.sin(p * Math.PI) * 2.6;
        magnetRef.current.rotation.z = -0.15;
      }
    } else {
      magnetRef.current.position.set(4.8, 1.15, 0);
      magnetRef.current.rotation.z = 0.15;
    }
  });

  return (
    <group ref={magnetRef} position={[4.8, 1.15, 0]} scale={[0.42, 0.42, 0.42]}>
      {/* North Red Half */}
      <mesh position={[-2.6, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.2, 1.4, 1.8]} />
        <meshStandardMaterial color="#DC2626" roughness={0.35} metalness={0.3} />
      </mesh>
      <Text
        position={[-3.6, 0.72, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={1.1}
        color="#FFFFFF"
        fontWeight="bold"
      >
        N
      </Text>

      {/* South Blue Half */}
      <mesh position={[2.6, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.2, 1.4, 1.8]} />
        <meshStandardMaterial color="#1D4ED8" roughness={0.35} metalness={0.3} />
      </mesh>
      <Text
        position={[3.6, 0.72, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={1.1}
        color="#FFFFFF"
        fontWeight="bold"
      >
        S
      </Text>

      {/* Center Divider Line */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.08, 1.42, 1.82]} />
        <meshStandardMaterial color="#0F172A" roughness={0.7} />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------
// 3. Iron Filings Attraction Particles
// ---------------------------------------------------------
function NeedleFilings3D({ isTesting, isSprinkling, isAttracted }) {
  const count = 4800;
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const poles = useMemo(
    () => ({
      nX: -4.8,
      sX: 4.8,
      poleY: 0.1,
      poleZ: 0,
      span: 2.2,
    }),
    []
  );

  const particles = useMemo(() => {
    const data = [];
    const numLines = 55;

    for (let i = 0; i < count; i++) {
      const randX = (Math.random() - 0.5) * 11.0;
      const randZ = (Math.random() - 0.5) * 6.5;
      const randomEuler = new THREE.Euler(Math.PI / 2, (Math.random() - 0.5) * Math.PI, 0);

      let targetX, targetZ;
      const clusterRoll = Math.random();

      if (clusterRoll < 0.5) {
        const isNorth = Math.random() < 0.5;
        const pX = isNorth ? poles.nX : poles.sX;
        const pZ = poles.poleZ;
        const angle = Math.random() * Math.PI * 2;
        const r = Math.pow(Math.random(), 2.0) * poles.span + 0.15;

        targetX = pX + Math.cos(angle) * r;
        targetZ = pZ + Math.sin(angle) * (r * 0.85);
      } else {
        const lineIdx = Math.floor(Math.random() * numLines);
        const t = Math.random();
        const loopR = 1.2 + (lineIdx / numLines) * 4.6;
        const theta = (t - 0.5) * Math.PI * 0.95;

        const side = Math.random() > 0.5 ? 1 : -1;
        targetX = Math.sin(theta) * (loopR + Math.sin(t * Math.PI) * 1.2);
        targetZ = side * Math.cos(theta) * loopR * 0.72 + (Math.random() - 0.5) * 0.18;
      }

      targetX = Math.max(-5.5, Math.min(5.5, targetX));
      targetZ = Math.max(-3.2, Math.min(3.2, targetZ));

      data.push({
        originX: randX,
        originZ: randZ,
        targetX,
        targetZ,
        scale: 0.65 + Math.random() * 0.45,
        x: randX,
        y: 11 + Math.random() * 5,
        z: randZ,
        floatY: 0.03 + Math.random() * 2.8,
        q: new THREE.Quaternion().setFromEuler(randomEuler),
        targetQ: new THREE.Quaternion(),
        visible: false,
        delay: Math.random() * 0.6,
      });
    }
    return data;
  }, [count, poles]);

  const geometry = useMemo(() => new THREE.CylinderGeometry(0.024, 0.024, 0.16, 4), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#27292D',
        roughness: 0.78,
        metalness: 0.88,
      }),
    []
  );

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const dt = Math.min(delta, 0.1);

    particles.forEach((p, i) => {
      if (!isTesting) {
        p.visible = false;
        p.y = 11 + Math.random() * 5;
        p.x = p.originX;
        p.z = p.originZ;
        p.delay = Math.random() * 0.6;
      } else {
        p.delay -= dt;
        if (p.delay <= 0) {
          p.visible = true;
          if (p.y > p.floatY && isSprinkling) {
            p.y -= dt * 20;
          }
        }

        if (isAttracted) {
          p.x = THREE.MathUtils.lerp(p.x, p.targetX, dt * 5.5);
          p.z = THREE.MathUtils.lerp(p.z, p.targetZ, dt * 5.5);

          const dxN = p.x - poles.nX;
          const dyN = p.y - poles.poleY;
          const dzN = p.z - poles.poleZ;
          const distN = Math.max(0.3, Math.hypot(dxN, dyN, dzN));

          const dxS = p.x - poles.sX;
          const dyS = p.y - poles.poleY;
          const dzS = p.z - poles.poleZ;
          const distS = Math.max(0.3, Math.hypot(dxS, dyS, dzS));

          const Bx = dxN / Math.pow(distN, 3) - dxS / Math.pow(distS, 3);
          const By = dyN / Math.pow(distN, 3) - dyS / Math.pow(distS, 3);
          const Bz = dzN / Math.pow(distN, 3) - dzS / Math.pow(distS, 3);
          const Bmag = Math.hypot(Bx, By, Bz);

          if (Bmag > 0.0001) {
            const dir = new THREE.Vector3(Bx / Bmag, By / Bmag, Bz / Bmag);
            p.targetQ.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
            p.q.slerp(p.targetQ, dt * 7.5);

            const minDist = Math.min(distN, distS);
            if (minDist < 2.4) {
              const spikeHeight = (2.4 - minDist) * 0.8;
              p.y = THREE.MathUtils.lerp(p.y, 0.03 + spikeHeight * Math.abs(By / Bmag), dt * 6.0);
            } else {
              p.y = THREE.MathUtils.lerp(p.y, 0.03, dt * 6.0);
            }
          }
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
// 4. Main Stage 1 Component with 6-Stroke Animation (+5 per stroke)
// ---------------------------------------------------------
export default function Stage1_Magnetize({ onComplete }) {
  const [strokeCount, setStrokeCount] = useState(0);
  const [isTesting, setIsTesting] = useState(false);
  const [isSprinkling, setIsSprinkling] = useState(false);
  const [isAttracted, setIsAttracted] = useState(false);
  const [testComplete, setTestComplete] = useState(false);
  const [isAutoStroking, setIsAutoStroking] = useState(false);
  const [strokeAnimProgress, setStrokeAnimProgress] = useState(0);
  const [prediction, setPrediction] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const maxStrokes = 30;
  const isMagnetized = strokeCount >= maxStrokes;

  // 6 stroke cycles in total, each cycle takes ~880ms and advances by 5 strokes
  useEffect(() => {
    let animFrame;
    let startTime;
    const strokeCycleDuration = 880; // ms per single stroke cycle

    if (isAutoStroking && strokeCount < maxStrokes) {
      const animateStroke = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(1, elapsed / strokeCycleDuration);

        setStrokeAnimProgress(progress);

        if (elapsed >= strokeCycleDuration) {
          setStrokeCount((prev) => {
            const next = Math.min(maxStrokes, prev + 5);
            if (next >= maxStrokes) {
              setIsAutoStroking(false);
              setStrokeAnimProgress(0);
            }
            return next;
          });
          startTime = timestamp;
        }

        if (isAutoStroking && strokeCount < maxStrokes) {
          animFrame = requestAnimationFrame(animateStroke);
        }
      };

      animFrame = requestAnimationFrame(animateStroke);
    }

    return () => cancelAnimationFrame(animFrame);
  }, [isAutoStroking, strokeCount]);

  const handleStartStrokes = () => {
    if (isAutoStroking || strokeCount >= maxStrokes) return;
    setIsAutoStroking(true);
  };

  const handleTestAndProceed = () => {
    if (!prediction) return;

    if (strokeCount < maxStrokes) {
      setStrokeCount(maxStrokes);
    }

    setIsTesting(true);
    setIsSprinkling(true);
    setIsAttracted(false);
    setTestComplete(false);

    setTimeout(() => {
      setIsSprinkling(false);
      setIsAttracted(true);
    }, 500);

    setTimeout(() => {
      setTestComplete(true);
      setShowFeedbackModal(true);
    }, 1400);
  };

  const handleReset = () => {
    setStrokeCount(0);
    setIsTesting(false);
    setIsSprinkling(false);
    setIsAttracted(false);
    setTestComplete(false);
    setIsAutoStroking(false);
    setStrokeAnimProgress(0);
    setPrediction(null);
    setShowFeedbackModal(false);
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
        position: 'relative'
      }}
    >
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
                border: prediction === 'yes' ? '2px solid #6EE7B7' : '2px solid #FCA5A5',
                borderRadius: '28px',
                padding: '2.5rem 2.8rem',
                maxWidth: '560px',
                width: '100%',
                boxShadow: prediction === 'yes' ? '0 24px 60px rgba(6, 78, 59, 0.35)' : '0 24px 60px rgba(153, 27, 27, 0.25)',
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
                background: prediction === 'yes' 
                  ? 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)'
                  : 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: prediction === 'yes' ? '0 8px 24px rgba(16, 185, 129, 0.25)' : '0 8px 24px rgba(239, 68, 68, 0.25)'
              }}>
                {prediction === 'yes' ? (
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
                  color: prediction === 'yes' ? '#064E3B' : '#991B1B' 
                }}>
                  {prediction === 'yes' ? 'Prediction Verified! 🎉' : "Observation Check!"}
                </h3>
                <p style={{ margin: 0, color: '#334155', fontSize: '1.45rem', lineHeight: 1.6, fontWeight: 700 }}>
                  {prediction === 'yes' ? (
                    'Excellent! Stroking the needle 30 times with a bar magnet transferred magnetic properties, turning it into a working magnet that attracts iron filings.'
                  ) : (
                    'Notice how the iron filings cling firmly to the needle poles! Stroking with the magnet magnetized the steel needle.'
                  )}
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
                  padding: '1.1rem 2rem',
                  fontSize: '1.45rem',
                  fontWeight: 900,
                  borderRadius: '18px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                Continue to Make a Compass <ArrowRight size={22} color="#FFFFFF" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Left Side: 3D Interactive Lab Area on HD Wooden Tray (65% width) */}
      <div
        style={{
          flex: '0 0 65%',
          maxWidth: '65%',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minHeight: 0,
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
            backgroundImage: `url('/MagneticCompass/magnetize_tray_bg.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* 3D WebGL Canvas Layer */}
          <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 10 }}>
            <Canvas
              shadows
              camera={{ position: [0, 8.2, 16], fov: 40 }}
              style={{ width: '100%', height: '100%' }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={1.15} color="#FFFFFF" />
                <directionalLight
                  position={[6, 16, 10]}
                  intensity={2.2}
                  color="#FFFBEB"
                  castShadow
                  shadow-mapSize-width={1024}
                  shadow-mapSize-height={1024}
                />
                <pointLight position={[-6, 6, -4]} intensity={0.5} color="#BAE6FD" />
                <directionalLight position={[-6, 8, -6]} intensity={0.9} color="#E0F2FE" />

                <group position={[0, -1.8, 0]} scale={[0.72, 0.72, 0.72]}>
                  {/* Extracted Magnetized Needle lying directly on the wooden tray */}
                  <ExtractedMagnetizedNeedle isMagnetized={isMagnetized} />

                  {/* 3D Bar Magnet stroking along the needle */}
                  {!isMagnetized && (
                    <BarMagnet3D
                      strokeProgress={strokeAnimProgress}
                      isAutoStroking={isAutoStroking}
                    />
                  )}

                  {/* Iron Filings attraction effect */}
                  <NeedleFilings3D
                    isTesting={isTesting}
                    isSprinkling={isSprinkling}
                    isAttracted={isAttracted}
                  />
                </group>

                <OrbitControls
                  makeDefault
                  target={[0, -1.2, 0]}
                  minAzimuthAngle={-0.3}
                  maxAzimuthAngle={0.3}
                  maxPolarAngle={Math.PI / 2.1}
                  minPolarAngle={0.1}
                  minDistance={6}
                  maxDistance={28}
                  enablePan={false}
                />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </div>

      {/* Right Side: 2× Scaled Typography with Exact Layout (35% width) */}
      <div className="stage-right-column" style={{ flex: '0 0 35%', maxWidth: '35%' }}>
        {/* Container 1: Try the experiment */}
        <div 
          className="stage-container-1"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1.5px solid #E2E8F0',
            borderRadius: '24px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
            padding: '1.2rem 1.55rem',
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
              <BookOpen size={30} color="#173B5F" strokeWidth={2.5} />
              <h3 style={{ margin: 0, fontSize: '2.1rem', color: '#1E1B4B', fontWeight: 900, letterSpacing: '-0.02em' }}>
                Try the experiment
              </h3>
            </div>
          </div>

          {/* Numbered Steps 1 to 4 with Warm Gold Badges */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { num: '1', text: 'Place the steel needle on the paper.' },
              { num: '2', text: 'Stroke from the eye to the point.' },
              { num: '3', text: 'Lift the magnet. Return to the start.' },
              { num: '4', text: 'Repeat 30 times with the same pole.' }
            ].map((step) => (
              <div key={step.num} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '1.35rem',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(217, 119, 6, 0.35)'
                }}>
                  {step.num}
                </div>
                <span style={{
                  fontSize: '1.45rem',
                  color: '#173B5F',
                  fontWeight: 700,
                  lineHeight: 1.35
                }}>
                  {step.text}
                </span>
              </div>
            ))}
          </div>

          {/* Tip / Leaf Callout Green Box */}
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
              <Leaf size={24} color="#16A34A" />
            </div>
            <span style={{ fontSize: '1.35rem', fontWeight: 900, color: '#14532D', lineHeight: 1.25 }}>
              One direction. Same pole. Every time.
            </span>
          </div>

          {/* Strokes Counter & Progress Bar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '1.4rem',
              fontWeight: 900,
              color: '#1E1B4B'
            }}>
              <span>Strokes: {strokeCount} / {maxStrokes}</span>
              <span>{Math.round((strokeCount / maxStrokes) * 100)}%</span>
            </div>
            <div style={{
              width: '100%',
              height: '10px',
              background: '#E2E8F0',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <motion.div
                animate={{ width: `${(strokeCount / maxStrokes) * 100}%` }}
                transition={{ duration: 0.2 }}
                style={{
                  height: '100%',
                  background: isMagnetized
                    ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                    : 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  borderRadius: '8px'
                }}
              />
            </div>
          </div>

          {/* Action Controls Row */}
          <div style={{ width: '100%', display: 'flex', gap: '0.85rem', marginTop: '0.1rem' }}>
            <button
              onClick={handleStartStrokes}
              disabled={isAutoStroking || isMagnetized}
              className={!isAutoStroking && !isMagnetized ? 'gold-glow-btn' : ''}
              style={{
                flex: 1.35,
                padding: '0.95rem 1.4rem',
                fontSize: '1.45rem',
                fontWeight: 900,
                borderRadius: '16px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.65rem',
                background: isMagnetized ? '#DCFCE7' : isAutoStroking ? '#F1F5F9' : undefined,
                color: isMagnetized ? '#15803D' : isAutoStroking ? '#94A3B8' : '#FFFFFF',
                border: isMagnetized ? '1.5px solid #86EFAC' : isAutoStroking ? '1.5px solid #E2E8F0' : undefined,
                cursor: isAutoStroking || isMagnetized ? 'default' : 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {isMagnetized ? (
                <><CheckCircle size={24} color="#15803D" /> 30 Strokes Complete</>
              ) : (
                <><Play size={24} color={!isAutoStroking ? '#FFFFFF' : '#94A3B8'} /> {isAutoStroking ? `Stroking (${strokeCount}/${maxStrokes})...` : 'Start 30 Strokes'}</>
              )}
            </button>

            <button
              onClick={handleReset}
              style={{
                flex: 0.75,
                padding: '0.95rem 1.2rem',
                fontSize: '1.35rem',
                fontWeight: 900,
                borderRadius: '16px',
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

        {/* Container 2: Predict before testing */}
        <div 
          className="stage-container-2"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1.5px solid #E2E8F0',
            borderRadius: '24px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
            padding: '1.2rem 1.55rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: '0.85rem',
            boxSizing: 'border-box'
          }}
        >
          {/* Header Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <HelpCircle size={30} color="#173B5F" strokeWidth={2.5} />
            <h3 style={{ margin: 0, fontSize: '2.1rem', color: '#1E1B4B', fontWeight: 900, letterSpacing: '-0.02em' }}>
              Predict before testing
            </h3>
          </div>

          {/* Question Text */}
          <div style={{
            fontSize: '1.45rem',
            fontWeight: 900,
            color: '#1E1B4B',
            lineHeight: 1.35,
            letterSpacing: '-0.01em'
          }}>
            After stroking, will the needle attract iron filings?
          </div>

          {/* Radio Options: Yes / No (Side-by-side) */}
          <div style={{ display: 'flex', gap: '0.85rem' }}>
            {[
              { id: 'yes', label: 'Yes' },
              { id: 'no', label: 'No' }
            ].map((option) => {
              const isSelected = prediction === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => setPrediction(option.id)}
                  style={{
                    flex: 1,
                    padding: '0.95rem 1.4rem',
                    borderRadius: '16px',
                    fontSize: '1.65rem',
                    fontWeight: 900,
                    cursor: 'pointer',
                    background: isSelected ? '#F0FDF4' : '#FFFFFF',
                    color: isSelected ? '#15803D' : '#1E1B4B',
                    border: isSelected ? '2px solid #16A34A' : '1.5px solid #CBD5E1',
                    boxShadow: isSelected ? '0 4px 12px rgba(22, 163, 74, 0.15)' : '0 2px 6px rgba(0, 0, 0, 0.03)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.85rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    border: isSelected ? '8px solid #16A34A' : '2px solid #94A3B8',
                    background: '#FFFFFF',
                    boxSizing: 'border-box',
                    flexShrink: 0,
                    transition: 'all 0.2s ease'
                  }} />
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>

          {/* Helper Prompt Text */}
          <div style={{ fontSize: '1.25rem', color: '#64748B', fontWeight: 600 }}>
            Make a prediction, then watch the test.
          </div>

          {/* Bottom Action Button: Next: Test the Needle */}
          <button
            onClick={handleTestAndProceed}
            disabled={!prediction || isTesting}
            className={prediction && !isTesting ? 'gold-glow-btn' : ''}
            style={{
              width: '100%',
              padding: '0.95rem 1.8rem',
              fontSize: '1.45rem',
              fontWeight: 900,
              borderRadius: '16px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.65rem',
              background: prediction && !isTesting ? undefined : '#E2E8F0',
              color: prediction && !isTesting ? '#FFFFFF' : '#94A3B8',
              border: prediction && !isTesting ? undefined : '1.5px solid #CBD5E1',
              cursor: prediction && !isTesting ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s ease'
            }}
          >
            {isTesting ? (
              'Testing with Iron Filings...'
            ) : (
              <>Next: Test the Needle <ArrowRight size={22} color={prediction ? '#FFFFFF' : '#94A3B8'} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}