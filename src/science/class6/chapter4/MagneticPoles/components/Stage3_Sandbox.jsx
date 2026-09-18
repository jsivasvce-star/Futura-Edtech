import React, { useState, useEffect, useRef, useMemo, useCallback, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, ContactShadows, Environment, useTexture } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Hand, RotateCcw, Shapes, Flag, BookOpen, CheckCircle, ArrowRight, Play, Pause } from 'lucide-react';
import RingMagnetVideoPlayer from './RingMagnetVideoPlayer';
import MagneticPolesVideoPlayer from './MagneticPolesVideoPlayer';
import * as THREE from 'three';
import { createCustomMagnetTextures } from './magnetTextureGenerator';
import '../MagneticPoles.css';

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
    // Anchored at y=2.4 (exact geometric midpoint between Magnet at y=4.2 and Filings at y=0.04-2.2)
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

// ----------------------------------------------------
// 1. REALISTIC 3D MAGNET MODELS (PROPORTIONATELY SIZED)
// ----------------------------------------------------

// A. Bar Magnet with Realistic Panoramic Texture Mapping
function BarMagnet3D() {
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

// B. Realistic Solid 3D Horseshoe Magnet (True U-Shape)
function HorseshoeMagnet3D() {
  const { northGeo, southGeo } = useMemo(() => {
    const extrudeSettings = {
      depth: 1.3,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    };

    // North Half Shape (Left side: X from -3.0 to 0)
    const nShape = new THREE.Shape();
    nShape.moveTo(-3.0, -2.6); // Outer pole tip
    nShape.lineTo(-3.0, 0.2);  // Outer leg start of arch
    nShape.absarc(0, 0.2, 3.0, Math.PI, Math.PI / 2, true); // Outer arc to (0, 3.2)
    nShape.lineTo(0, 1.8);     // Line to inner arc apex
    nShape.absarc(0, 0.2, 1.6, Math.PI / 2, Math.PI, false); // Inner arc to (-1.6, 0.2)
    nShape.lineTo(-1.6, -2.6); // Inner leg tip
    nShape.lineTo(-3.0, -2.6); // Close tip

    // South Half Shape (Right side: X from 0 to +3.0)
    const sShape = new THREE.Shape();
    sShape.moveTo(0, 3.2);     // Outer arc apex
    sShape.absarc(0, 0.2, 3.0, Math.PI / 2, 0, true); // Outer arc to (3.0, 0.2)
    sShape.lineTo(3.0, -2.6);  // Outer pole tip
    sShape.lineTo(1.6, -2.6);  // Inner pole tip
    sShape.lineTo(1.6, 0.2);   // Inner leg start of arch
    sShape.absarc(0, 0.2, 1.6, 0, Math.PI / 2, false); // Inner arc to (0, 1.8)
    sShape.lineTo(0, 3.2);     // Close at apex

    const nGeo = new THREE.ExtrudeGeometry(nShape, extrudeSettings);
    const sGeo = new THREE.ExtrudeGeometry(sShape, extrudeSettings);

    // Rotate so extrusion goes along Y axis (thickness 1.3)
    nGeo.rotateX(-Math.PI / 2);
    sGeo.rotateX(-Math.PI / 2);

    return { northGeo: nGeo, southGeo: sGeo };
  }, []);

  return (
    <group position={[0, 1.8, 0]}>
      {/* North Half (Red) */}
      <mesh geometry={northGeo} castShadow receiveShadow>
        <meshStandardMaterial color="#C51E28" roughness={0.55} metalness={0.12} />
      </mesh>
      <Text
        position={[-2.3, 1.36, 1.6]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.9}
        color="#FFFFFF"
        fontWeight="bold"
      >
        N
      </Text>

      {/* South Half (Blue) */}
      <mesh geometry={southGeo} castShadow receiveShadow>
        <meshStandardMaterial color="#1848B8" roughness={0.55} metalness={0.12} />
      </mesh>
      <Text
        position={[2.3, 1.36, 1.6]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.9}
        color="#FFFFFF"
        fontWeight="bold"
      >
        S
      </Text>

      {/* Center Seam dividing the U-arch */}
      <mesh position={[0, 0.65, -2.5]}>
        <boxGeometry args={[0.06, 1.32, 1.42]} />
        <meshStandardMaterial color="#111827" roughness={0.7} />
      </mesh>
    </group>
  );
}

// C. Realistic Solid 3D Ring Magnet
function RingMagnet3D() {
  const { northGeo, southGeo } = useMemo(() => {
    const extrudeSettings = {
      depth: 1.3,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    };

    // North Half Ring Shape (Left side: X from -2.8 to 0)
    const nShape = new THREE.Shape();
    nShape.absarc(0, 0, 2.8, Math.PI / 2, 3 * Math.PI / 2, false);
    nShape.lineTo(0, -1.4);
    nShape.absarc(0, 0, 1.4, 3 * Math.PI / 2, Math.PI / 2, true);
    nShape.lineTo(0, 2.8);

    // South Half Ring Shape (Right side: X from 0 to +2.8)
    const sShape = new THREE.Shape();
    sShape.absarc(0, 0, 2.8, -Math.PI / 2, Math.PI / 2, false);
    sShape.lineTo(0, 1.4);
    sShape.absarc(0, 0, 1.4, Math.PI / 2, -Math.PI / 2, true);
    sShape.lineTo(0, -2.8);

    const nGeo = new THREE.ExtrudeGeometry(nShape, extrudeSettings);
    const sGeo = new THREE.ExtrudeGeometry(sShape, extrudeSettings);

    nGeo.rotateX(-Math.PI / 2);
    sGeo.rotateX(-Math.PI / 2);

    return { northGeo: nGeo, southGeo: sGeo };
  }, []);

  return (
    <group position={[0, 1.8, 0]}>
      {/* North Half Ring (Red) */}
      <mesh geometry={northGeo} castShadow receiveShadow>
        <meshStandardMaterial color="#C51E28" roughness={0.55} metalness={0.12} />
      </mesh>
      <Text
        position={[-2.1, 1.36, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.9}
        color="#FFFFFF"
        fontWeight="bold"
      >
        N
      </Text>

      {/* South Half Ring (Blue) */}
      <mesh geometry={southGeo} castShadow receiveShadow>
        <meshStandardMaterial color="#1848B8" roughness={0.55} metalness={0.12} />
      </mesh>
      <Text
        position={[2.1, 1.36, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.9}
        color="#FFFFFF"
        fontWeight="bold"
      >
        S
      </Text>

      {/* Top and Bottom Seams */}
      <mesh position={[0, 0.65, -2.1]}>
        <boxGeometry args={[0.06, 1.32, 1.42]} />
        <meshStandardMaterial color="#111827" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.65, 2.1]}>
        <boxGeometry args={[0.06, 1.32, 1.42]} />
        <meshStandardMaterial color="#111827" roughness={0.7} />
      </mesh>
    </group>
  );
}

function ChosenMagnet3D({ shape }) {
  if (shape === 'bar') return <BarMagnet3D />;
  if (shape === 'horseshoe') return <HorseshoeMagnet3D />;
  if (shape === 'ring') return <RingMagnet3D />;
  return <HorseshoeMagnet3D />;
}

// ---------------------------------------------------------
// Perfectly fitted scale and position inside center of classroom blackboard
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

// ----------------------------------------------------
// 2. 3D FILINGS INSTANCED SYSTEM (PERFECTLY FITTED TO PAPER)
// ----------------------------------------------------
function FilingsSystem({ step, isSprinkling, isVibrating, shape, cycleKey, isPaused }) {
  const count = 14000;
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const lastCycleRef = useRef(-1);

  // Poles coordinates calculated per shape
  const poles = useMemo(() => {
    if (shape === 'horseshoe') {
      return { nX: -2.3, nZ: 2.2, sX: 2.3, sZ: 2.2, span: 3.5 };
    } else if (shape === 'ring') {
      return { nX: 0, nZ: -1.6, sX: 0, sZ: 1.6, span: 3.0 };
    }
    return { nX: -4.8, nZ: 0, sX: 4.8, sZ: 0, span: 4.0 };
  }, [shape]);

  const particles = useMemo(() => {
    const data = [];
    const numLines = 85;

    for (let i = 0; i < count; i++) {
      const randX = (Math.random() - 0.5) * 23;
      const randZ = (Math.random() - 0.5) * 13.5;
      const randomEuler = new THREE.Euler(Math.PI / 2, (Math.random() - 0.5) * Math.PI, 0);
      const initialQ = new THREE.Quaternion().setFromEuler(randomEuler);

      let targetX, targetZ;
      const clusterRoll = Math.random();

      if (clusterRoll < 0.42) {
        const isNorth = Math.random() < 0.5;
        const pX = isNorth ? poles.nX : poles.sX;
        const pZ = isNorth ? poles.nZ : poles.sZ;
        const angle = Math.random() * Math.PI * 2;
        const r = Math.pow(Math.random(), 2.0) * poles.span + 0.2;

        targetX = pX + Math.cos(angle) * r;
        targetZ = pZ + Math.sin(angle) * r;
      } else {
        const lineIdx = Math.floor(Math.random() * numLines);
        const t = Math.random();
        const loopR = 1.6 + (lineIdx / numLines) * 8.0;
        const theta = (t - 0.5) * Math.PI * 0.95;

        const side = Math.random() > 0.5 ? 1 : -1;
        targetX = Math.sin(theta) * (loopR + Math.sin(t * Math.PI) * 1.6);
        targetZ = side * Math.cos(theta) * loopR * 0.75 + (Math.random() - 0.5) * 0.25;
      }

      targetX = Math.max(-11.8, Math.min(11.8, targetX));
      targetZ = Math.max(-6.8, Math.min(6.8, targetZ));

      data.push({
        originX: randX,
        originZ: randZ,
        targetX,
        targetZ,
        scale: 0.65 + Math.random() * 0.45,
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

  const geometry = useMemo(() => new THREE.CylinderGeometry(0.034, 0.034, 0.18, 4), []);
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
    const poleY = shape === 'bar' ? 2.5 : 2.45;

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
      // 1. Sprinkling down
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

      // 2. Scattered on paper
      if (step === 'scattered') {
        p.visible = true;
        p.y = 0.04;
        p.x = p.originX;
        p.z = p.originZ;
        p.q.copy(p.initialQ);
      }

      // 3. Tapped - align along magnetic poles
      if (step === 'tapped' || (isVibrating && step === 'tapped')) {
        p.visible = true;
        p.x = THREE.MathUtils.lerp(p.x, p.targetX, dt * 5.2);
        p.z = THREE.MathUtils.lerp(p.z, p.targetZ, dt * 5.2);

        const dxN = p.x - poles.nX;
        const dyN = p.y - poleY;
        const dzN = p.z - poles.nZ;
        const distN = Math.max(0.35, Math.hypot(dxN, dyN, dzN));

        const dxS = p.x - poles.sX;
        const dyS = p.y - poleY;
        const dzS = p.z - poles.sZ;
        const distS = Math.max(0.35, Math.hypot(dxS, dyS, dzS));

        const Bx = dxN / Math.pow(distN, 3) - dxS / Math.pow(distS, 3);
        const By = dyN / Math.pow(distN, 3) - dyS / Math.pow(distS, 3);
        const Bz = dzN / Math.pow(distN, 3) - dzS / Math.pow(distS, 3);
        const Bmag = Math.hypot(Bx, By, Bz);

        if (Bmag > 0.0001) {
          const dir = new THREE.Vector3(Bx / Bmag, By / Bmag, Bz / Bmag);
          p.targetQ.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
          p.q.slerp(p.targetQ, dt * 7.5);

          const minDist = Math.min(distN, distS);
          if (minDist < 3.0) {
            const spikeHeight = (3.0 - minDist) * 0.75;
            p.y = THREE.MathUtils.lerp(p.y, 0.04 + spikeHeight * Math.abs(By / Bmag), dt * 6);
          } else {
            p.y = THREE.MathUtils.lerp(p.y, 0.04, dt * 6);
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

// ----------------------------------------------------
// 3. MAIN COMPONENT
// ----------------------------------------------------
export default function Stage3_Sandbox({ onComplete }) {
  const [step, setStep] = useState('waiting');
  const [cycleKey, setCycleKey] = useState(0);
  const [tapCount, setTapCount] = useState(0);
  const [shape, setShape] = useState('ring'); // 'horseshoe', 'ring', 'bar'
  const [isSprinkling, setIsSprinkling] = useState(false);
  const [isVibrating, setIsVibrating] = useState(false);
  const hasArrivedRef = useRef(false);

  // Synchronize phase with RingMagnetVideoPlayer
  const handleVideoPhaseChange = useCallback((phaseName, progress) => {
    // Video demonstration is visual; do not modify right-side contents or colors
  }, []);

  // Rotation and tilt controls for the magnet & iron filings
  const rotationRef = useRef({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e) => {
    if (e.target.closest('button')) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    lastPointerRef.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastPointerRef.current.x;
    const deltaY = e.clientY - lastPointerRef.current.y;
    lastPointerRef.current = { x: e.clientX, y: e.clientY };

    // Horizontal drag -> rotate around Y (Yaw, 360 deg)
    rotationRef.current.y += deltaX * 0.009;

    // Vertical drag -> tilt around X (Pitch, tilt up and towards front)
    rotationRef.current.x += deltaY * 0.007;

    // Clamp tilt angle: -0.35 rad to +1.25 rad
    rotationRef.current.x = Math.max(-0.35, Math.min(1.25, rotationRef.current.x));
  };

  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (_) { }
  };

  const handleResetRotation = (e) => {
    e.stopPropagation();
    rotationRef.current.x = 0;
    rotationRef.current.y = 0;
  };

  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  isPausedRef.current = isPaused;

  const phaseRef = useRef('sprinkle'); // 'sprinkle', 'scattered', 'tapping', 'observing'
  const phaseStartTimeRef = useRef(Date.now());
  const remainingMsRef = useRef(1800);
  const timeoutRef = useRef(null);

  const clearLoopTimers = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const advanceToNextPhase = (completedPhase) => {
    if (isPausedRef.current) return;
    if (completedPhase === 'sprinkle') {
      executePhase('scattered', 800);
    } else if (completedPhase === 'scattered') {
      executePhase('tapping', 750);
    } else if (completedPhase === 'tapping') {
      executePhase('observing', 3500);
    } else if (completedPhase === 'observing') {
      executePhase('sprinkle', 1800);
    }
  };

  const executePhase = (phase, duration) => {
    clearLoopTimers();
    phaseRef.current = phase;
    remainingMsRef.current = duration;
    phaseStartTimeRef.current = Date.now();

    if (phase === 'sprinkle') {
      setCycleKey((k) => k + 1);
      setStep('initial');
      setIsSprinkling(true);
      setIsVibrating(false);
    } else if (phase === 'scattered') {
      setStep('scattered');
      setIsSprinkling(false);
      setIsVibrating(false);
    } else if (phase === 'tapping') {
      setStep('tapped');
      setIsSprinkling(false);
      setIsVibrating(true);
      setTapCount((prev) => Math.max(prev, 1));
    } else if (phase === 'observing') {
      setStep('tapped');
      setIsSprinkling(false);
      setIsVibrating(false);
    }

    timeoutRef.current = setTimeout(() => {
      advanceToNextPhase(phase);
    }, duration);
  };

  // Only start pouring iron filings once the tray and magnet arrive at the center (3D Canvas only)
  const handleArrival = useCallback(() => {
    if (shape === 'ring' || shape === 'bar') return;
    if (hasArrivedRef.current) return;
    hasArrivedRef.current = true;
    executePhase('sprinkle', 1800);
  }, [shape]);

  // Safety fallback in case of background tab throttling
  useEffect(() => {
    if (shape === 'ring' || shape === 'bar') return;
    const fallbackTimer = setTimeout(() => {
      if (!hasArrivedRef.current) {
        handleArrival();
      }
    }, 2200);
    return () => {
      clearTimeout(fallbackTimer);
      clearLoopTimers();
    };
  }, [handleArrival, shape]);

  const handleShapeChange = (newShape) => {
    setShape(newShape);
    clearLoopTimers();
    setIsPaused(false);
    isPausedRef.current = false;
    setTapCount(0);
    if (newShape === 'horseshoe') {
      executePhase('sprinkle', 1800);
    } else {
      setStep('initial');
    }
  };

  const handleTogglePause = () => {
    if (!isPaused) {
      if (shape === 'horseshoe') {
        clearLoopTimers();
        const elapsed = Date.now() - phaseStartTimeRef.current;
        remainingMsRef.current = Math.max(50, remainingMsRef.current - elapsed);
      }
      setIsPaused(true);
      isPausedRef.current = true;
    } else {
      setIsPaused(false);
      isPausedRef.current = false;
      if (shape === 'horseshoe') {
        phaseStartTimeRef.current = Date.now();
        const currentPhase = phaseRef.current;
        const rem = remainingMsRef.current;

        timeoutRef.current = setTimeout(() => {
          advanceToNextPhase(currentPhase);
        }, rem);
      }
    }
  };

  const handleReset = () => {
    clearLoopTimers();
    setIsPaused(false);
    isPausedRef.current = false;
    setTapCount(0);
    if (shape === 'horseshoe') {
      executePhase('sprinkle', 1800);
    } else {
      setStep('initial');
    }
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
      }}
    >
      {/* Left Side: 3D Scene Interactive Area / Video Area */}
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
        {shape === 'ring' ? (
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
            <RingMagnetVideoPlayer
              videoSrc="/MagneticPoles/Ringmagnet.mp4"
              fallbackSrc="/assets/Ringmagnet.mp4"
              externalIsPaused={isPaused}
              onExternalTogglePause={handleTogglePause}
              onExternalReset={handleReset}
              onPhaseChange={handleVideoPhaseChange}
              currentStep={step}
              autoPlay={true}
              loop={false}
            />
          </div>
        ) : shape === 'bar' ? (
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
            <MagneticPolesVideoPlayer
              videoSrc="/MagneticPoles/Barmagnet.mp4"
              fallbackSrc="/assets/Barmagnet.mp4"
              externalIsPaused={isPaused}
              onExternalTogglePause={handleTogglePause}
              onExternalReset={handleReset}
              onPhaseChange={handleVideoPhaseChange}
              currentStep={step}
              autoPlay={true}
              loop={false}
            />
          </div>
        ) : (
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
              cursor: isDragging ? 'grabbing' : 'grab',
              touchAction: 'none',
              userSelect: 'none'
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {/* 3D Canvas Scene matching Stage 1 Camera & Lights */}
            <Canvas
              shadows
              gl={{ alpha: true, antialias: true }}
              camera={{ position: [0.1, 6.0, 22], fov: 38 }}
              style={{ width: '100%', height: '100%' }}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={1.1} color="#FFF7ED" />
                <directionalLight
                  position={[-8, 16, 14]}
                  intensity={2.0}
                  color="#FED7AA"
                  castShadow
                  shadow-mapSize={[2048, 2048]}
                  shadow-bias={-0.0001}
                />
                <directionalLight position={[10, 10, 10]} intensity={0.8} color="#E0F2FE" />
                <Environment preset="sunset" />

                <AnimatedLabGroup onArrival={handleArrival}>
                  <RotatableMagnetGroup rotationRef={rotationRef}>
                    <ChosenMagnet3D shape={shape} />
                    <FilingsSystem step={step} isSprinkling={isSprinkling} isVibrating={isVibrating} shape={shape} cycleKey={cycleKey} isPaused={isPaused} />
                  </RotatableMagnetGroup>
                  <ContactShadows position={[0, -0.02, 0]} opacity={0.48} scale={18} blur={2.0} far={2.5} color="#251605" />
                </AnimatedLabGroup>
                <OrbitControls
                  makeDefault
                  target={[0.1, 4.4, 0]}
                  enableZoom={false}
                  enableRotate={false}
                  enablePan={false}
                />
              </Suspense>
            </Canvas>

            {/* Interaction Controls & Hint Overlay */}
            <div style={{
              position: 'absolute',
              bottom: '14px',
              left: '16px',
              right: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              pointerEvents: 'none',
              zIndex: 10
            }}>
              <div style={{
                background: 'rgba(6, 78, 59, 0.86)',
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
                boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
              }}>
                <Hand size={14} color="#FDE68A" />
                <span>Hold & drag anywhere to rotate & tilt magnet</span>
              </div>

              <button
                onClick={handleResetRotation}
                style={{
                  pointerEvents: 'auto',
                  background: 'rgba(255, 255, 255, 0.94)',
                  border: '1.5px solid #A7F3D0',
                  borderRadius: '16px',
                  padding: '6px 12px',
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  color: '#065F46',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                  transition: 'all 0.2s'
                }}
                title="Reset view angle"
              >
                <RotateCcw size={13} color="#059669" />
                <span>Reset View</span>
              </button>
            </div>
          </div>
        )}
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
            background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
            border: '1.5px solid #FDE68A',
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
              <h4 style={{ margin: 0, fontSize: '19.5px', color: '#78350F', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span>📋</span> Steps of Instructions
              </h4>
            </div>

            {/* Bullet Points - Single-line brown instructions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                'Select a magnet shape and click "1. Sprinkle" for iron filings.',
                'Click "2. Tap Paper" to gently vibrate sheet and align filings.',
                'Observe that filings cluster at magnetic poles in every shape.'
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
                      background: '#D97706',
                      display: 'inline-block',
                      flexShrink: 0,
                      transform: 'translateY(-2px)'
                    }}
                  />
                  <p style={{ margin: 0, fontSize: '17.5px', lineHeight: 1.5, color: '#78350F', fontWeight: 600 }}>
                    {instruction}
                  </p>
                </div>
              ))}
            </div>

            {/* Magnet Shape Selector */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.55rem',
                marginTop: '0.85rem',
                paddingTop: '0.65rem',
                borderTop: '1px solid rgba(217, 119, 6, 0.2)'
              }}
            >
              <h5
                style={{
                  color: '#78350F',
                  margin: 0,
                  fontSize: '18px',
                  fontWeight: 900,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                }}
              >
                <Shapes size={18} color="#D97706" /> Choose Magnet Shape:
              </h5>

              <div style={{ display: 'flex', gap: '0.55rem' }}>
                <button
                  onClick={() => handleShapeChange('horseshoe')}
                  style={{
                    flex: 1,
                    padding: '0.75rem 0.5rem',
                    borderRadius: '12px',
                    border: '1.5px solid',
                    borderColor: shape === 'horseshoe' ? '#10B981' : '#FDE68A',
                    background: shape === 'horseshoe' ? '#DCFCE7' : '#FFFFFF',
                    color: shape === 'horseshoe' ? '#064E3B' : '#065F46',
                    fontWeight: 800,
                    fontSize: '16.5px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: shape === 'horseshoe' ? '0 2px 8px rgba(16, 185, 129, 0.2)' : '0 2px 6px rgba(0,0,0,0.02)',
                  }}
                >
                  Horseshoe 🧲
                </button>

                <button
                  onClick={() => handleShapeChange('ring')}
                  style={{
                    flex: 1,
                    padding: '0.75rem 0.5rem',
                    borderRadius: '12px',
                    border: '1.5px solid',
                    borderColor: shape === 'ring' ? '#10B981' : '#FDE68A',
                    background: shape === 'ring' ? '#DCFCE7' : '#FFFFFF',
                    color: shape === 'ring' ? '#064E3B' : '#065F46',
                    fontWeight: 800,
                    fontSize: '16.5px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: shape === 'ring' ? '0 2px 8px rgba(16, 185, 129, 0.2)' : '0 2px 6px rgba(0,0,0,0.02)',
                  }}
                >
                  Ring ⭕
                </button>

                <button
                  onClick={() => handleShapeChange('bar')}
                  style={{
                    flex: 1,
                    padding: '0.75rem 0.5rem',
                    borderRadius: '12px',
                    border: '1.5px solid',
                    borderColor: shape === 'bar' ? '#10B981' : '#FDE68A',
                    background: shape === 'bar' ? '#DCFCE7' : '#FFFFFF',
                    color: shape === 'bar' ? '#064E3B' : '#065F46',
                    fontWeight: 800,
                    fontSize: '16.5px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: shape === 'bar' ? '0 2px 8px rgba(16, 185, 129, 0.2)' : '0 2px 6px rgba(0,0,0,0.02)',
                  }}
                >
                  Bar 🔲
                </button>
              </div>
            </div>
          </div>

          {/* Action Controls */}
          <div style={{ width: '100%', display: 'flex', gap: '0.65rem', marginTop: 'auto', paddingTop: '0.85rem', borderTop: '1px solid rgba(217, 119, 6, 0.2)' }}>
            <button
              onClick={handleTogglePause}
              className="gold-glow-btn"
              style={{
                flex: 2,
                padding: '0.8rem 0.85rem',
                fontSize: '17px',
                fontWeight: 900,
                borderRadius: '14px',
                color: '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
              }}
            >
              {!isPaused ? (
                <>
                  <Pause size={18} fill="#FFFFFF" color="#FFFFFF" /> Pause Investigation
                </>
              ) : (
                <>
                  <Play size={18} fill="#FFFFFF" color="#FFFFFF" /> Resume Investigation
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              style={{
                flex: 1,
                padding: '0.8rem 0.6rem',
                fontSize: '17px',
                fontWeight: 800,
                borderRadius: '14px',
                background: '#FFFFFF',
                color: '#92400E',
                border: '1.5px solid #FDE68A',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                transition: 'all 0.2s ease',
              }}
            >
              <RotateCcw size={16} /> Reset
            </button>
          </div>
        </div>

        {/* CONTAINER 2: Observation Summary */}
        <div
          className="stage-container-2"
          style={{
            background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
            border: '1.5px solid #FDE68A',
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
            <h4
              style={{
                color: '#78350F',
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
              <Shapes size={22} color="#D97706" /> Observation Summary
            </h4>
            <p style={{ margin: '0.75rem 0', color: '#78350F', fontSize: '17.5px', lineHeight: 1.5, fontWeight: 700 }}>
              Do all magnet shapes exhibit the same concentration of magnetic poles?
            </p>
            <ul
              style={{
                margin: '0.65rem 0 0 0',
                paddingLeft: '1.25rem',
                color: '#78350F',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.55rem',
                fontSize: '17px',
                lineHeight: '1.5',
                fontWeight: 600,
              }}
            >
              <li>
                <strong style={{ color: '#92400E' }}>Horseshoe:</strong> Filings cluster tightly at both curved tips.
              </li>
              <li>
                <strong style={{ color: '#92400E' }}>Ring:</strong> Filings concentrate on opposite circular pole faces.
              </li>
              <li>
                <strong style={{ color: '#92400E' }}>Bar:</strong> Filings gather heavily at the two distant ends.
              </li>
            </ul>
          </div>

          <div style={{ paddingTop: '0.75rem', marginTop: 'auto' }}>
            <button
              onClick={() => {
                if (onComplete) onComplete();
              }}
              className="gold-glow-btn"
              style={{
                width: '100%',
                padding: '0.85rem 1.25rem',
                fontSize: '17.5px',
                fontWeight: 900,
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                transition: 'all 0.25s ease',
              }}
            >
              <Flag size={18} color="#FFFFFF" /> Finish Activity & Proceed to Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}