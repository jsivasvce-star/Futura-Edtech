import React, { useState, useEffect, useRef, useMemo, useCallback, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, ContactShadows, Environment, useTexture } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Hand, RotateCcw, Shapes, Flag, BookOpen, CheckCircle, ArrowRight, ArrowLeft, Play, Pause } from 'lucide-react';
import stage3HorseshoeImg from '../../../../../assets/stage3_horseshoe.png';
import stage3RingImg from '../../../../../assets/stage3_ring.png';
import stage3BarImg from '../../../../../assets/stage3_bar.png';
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
// 3. PAGE CONFIGURATIONS FOR THREE SEQUENTIAL SCREENS
// ----------------------------------------------------
const SHAPE_PAGES = {
  horseshoe: {
    pageNumber: 1,
    title: 'Horseshoe Magnet',
    icon: '🧲',
    instructions: [
      'Sprinkle iron filings around the horseshoe magnet.',
      'Gently tap the sheet.',
      'Observe where the filings gather most.'
    ],
    observations: [
      'Filings gather most at the two curved ends.',
      'These ends are the North and South poles.'
    ]
  },
  ring: {
    pageNumber: 2,
    title: 'Ring Magnet',
    icon: '⭕',
    instructions: [
      'Sprinkle iron filings around the ring magnet.',
      'Gently tap the sheet.',
      'Observe where the filings gather most.'
    ],
    observations: [
      'Filings gather most around the two poles.',
      'The poles are where the magnetic pull is strongest.'
    ]
  },
  bar: {
    pageNumber: 3,
    title: 'Bar Magnet',
    icon: '🔲',
    instructions: [
      'Sprinkle iron filings around the bar magnet.',
      'Gently tap the sheet.',
      'Observe where the filings gather most.'
    ],
    observations: [
      'Filings gather most near both ends.',
      'The ends are the North and South poles.'
    ]
  }
};

// ----------------------------------------------------
// 4. MAIN COMPONENT
// ----------------------------------------------------
export default function Stage3_Sandbox({ onComplete }) {
  const [step, setStep] = useState('waiting');
  const [cycleKey, setCycleKey] = useState(0);
  const [tapCount, setTapCount] = useState(0);
  const [shape, setShape] = useState('horseshoe'); // 'horseshoe' (Page 1), 'ring' (Page 2), 'bar' (Page 3)
  const [isSprinkling, setIsSprinkling] = useState(false);
  const [isVibrating, setIsVibrating] = useState(false);
  const hasArrivedRef = useRef(false);

  const currentShapeData = SHAPE_PAGES[shape] || SHAPE_PAGES.horseshoe;

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

  const handlePageChange = (newShape) => {
    setShape(newShape);
    clearLoopTimers();
    setIsPaused(false);
    isPausedRef.current = false;
    setTapCount(0);
    if (newShape === 'horseshoe') {
      hasArrivedRef.current = true;
      executePhase('sprinkle', 1800);
    } else {
      setStep('initial');
    }
  };

  const handleNextPage = () => {
    if (shape === 'horseshoe') {
      handlePageChange('ring');
    } else if (shape === 'ring') {
      handlePageChange('bar');
    } else if (shape === 'bar') {
      if (onComplete) onComplete();
    }
  };

  const handlePrevPage = () => {
    if (shape === 'bar') {
      handlePageChange('ring');
    } else if (shape === 'ring') {
      handlePageChange('horseshoe');
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
      {/* Dedicated Large Image Viewer Container (Occupies maximum available space, dominant area matching Stage 1 & Stage 2) */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          minHeight: 0,
          height: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* Display Container: Image Panel matching Video Player container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            flex: 1,
            minHeight: 0,
            overflow: 'hidden',
            borderRadius: '24px',
            backgroundColor: '#070C18',
            border: '1.5px solid #A7F3D0',
            boxShadow: '0 12px 30px rgba(6, 78, 59, 0.16)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            userSelect: 'none',
            boxSizing: 'border-box',
          }}
        >
          <img
            src={shape === 'ring' ? stage3RingImg : shape === 'bar' ? stage3BarImg : stage3HorseshoeImg}
            alt={shape === 'ring' ? 'Stage 3 Ring Magnet' : shape === 'bar' ? 'Stage 3 Bar Magnet' : 'Stage 3 Horseshoe Magnet'}
            style={{
              width: '100%',
              height: '100%',
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              display: 'block',
              userSelect: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      {/* Right Column: Fullscreen non-scrolling, matching Stage 1 & Stage 2 */}
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
            padding: '0.65rem 0.85rem',
            boxShadow: '0 4px 16px rgba(217, 119, 6, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            flex: '1.15 1 auto',
            minHeight: 0,
          }}
        >
          {/* Top Section: Title & Instructions */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1.5px solid rgba(217, 119, 6, 0.25)', paddingBottom: '0.25rem', marginBottom: '0.35rem' }}>
              <h4 style={{ margin: 0, fontSize: '32px', color: '#173B5F', fontWeight: 800, lineHeight: 1.15, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span>{currentShapeData.icon}</span> {currentShapeData.title}
              </h4>
              <span style={{
                fontSize: '13.5px',
                fontWeight: 800,
                color: '#065F46',
                background: '#DCFCE7',
                padding: '2px 9px',
                borderRadius: '12px',
                border: '1px solid #86EFAC',
                letterSpacing: '0.02em',
                flexShrink: 0
              }}>
                Page {currentShapeData.pageNumber} of 3
              </span>
            </div>

            {/* Bullet Points - Shape Specific Instructions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {currentShapeData.instructions.map((instruction, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.45rem',
                    padding: '0'
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#173B5F',
                      display: 'inline-block',
                      flexShrink: 0,
                      marginTop: '8px'
                    }}
                  />
                  <p style={{ margin: 0, fontSize: '24px', lineHeight: 1.15, color: '#173B5F', fontWeight: 600 }}>
                    {instruction}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section: Action Controls — always in dedicated area, never overlapping content */}
          {shape !== 'bar' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0', paddingTop: '0.35rem', borderTop: '1px solid rgba(217, 119, 6, 0.2)', flexShrink: 0 }}>
              <div style={{ width: '100%', display: 'flex', gap: '0.45rem', flexWrap: 'nowrap' }}>
                <button
                  onClick={handleTogglePause}
                  className="gold-glow-btn"
                  style={{
                    flex: 2,
                    minWidth: 0,
                    padding: '0.45rem 0.85rem',
                    fontSize: '21px',
                    fontWeight: 700,
                    lineHeight: 1.1,
                    borderRadius: '14px',
                    color: '#FFFFFF',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap'
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
                    minWidth: 0,
                    padding: '0.45rem 0.6rem',
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
                    gap: '6px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <RotateCcw size={16} /> Reset
                </button>
              </div>
            </div>
          ) : (
            <div style={{
              width: '100%',
              paddingTop: '0.35rem',
              borderTop: '1px solid rgba(217, 119, 6, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.55rem',
              color: '#065F46',
              fontSize: '16px',
              fontWeight: 700,
              flexShrink: 0
            }}>
              <CheckCircle size={19} color="#10B981" style={{ flexShrink: 0 }} />
              <span>Observe filings cluster at North (N) &amp; South (S) poles.</span>
            </div>
          )}
        </div>

        {/* CONTAINER 2: Observation Summary */}
        <div
          style={{
            background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)',
            border: '1.5px solid #E2E8F0',
            borderRadius: '24px',
            padding: '0.65rem 0.85rem',
            boxShadow: '0 6px 24px rgba(217, 119, 6, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            flex: '1 1 auto',
            minHeight: 0,
          }}
        >
          {/* Top Section: Observation content */}
          <div>
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
                paddingBottom: '0.25rem',
                borderBottom: '1.5px solid rgba(217, 119, 6, 0.25)'
              }}
            >
              <Shapes size={23} color="#173B5F" /> Observation Summary
            </h4>
            <ul
              style={{
                margin: '0.35rem 0 0 0',
                paddingLeft: '1.35rem',
                color: '#173B5F',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.3rem',
                fontSize: '23px',
                lineHeight: '1.2',
                fontWeight: 600,
              }}
            >
              {currentShapeData.observations.map((obs, idx) => (
                <li key={idx}>
                  {obs}
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Section: Navigation Controls — always in dedicated area, never overlapping */}
          <div style={{ paddingTop: '0.35rem', flexShrink: 0, display: 'flex', gap: '0.45rem' }}>
            {shape !== 'horseshoe' && (
              <button
                onClick={handlePrevPage}
                style={{
                  flex: 1,
                  padding: '0.45rem 0.85rem',
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
                  gap: '0.5rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                <ArrowLeft size={18} /> Previous
              </button>
            )}

            <button
              onClick={handleNextPage}
              className="gold-glow-btn"
              style={{
                flex: shape === 'horseshoe' ? 1 : 1.6,
                padding: '0.45rem 0.85rem',
                fontSize: '21px',
                fontWeight: 700,
                lineHeight: 1.1,
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.25s ease',
                minWidth: 0,
                textAlign: 'center'
              }}
            >
              {shape === 'horseshoe' ? (
                <>
                  Next: Ring Magnet <ArrowRight size={18} color="#FFFFFF" />
                </>
              ) : shape === 'ring' ? (
                <>
                  Next: Bar Magnet <ArrowRight size={18} color="#FFFFFF" />
                </>
              ) : (
                <>
                  <Flag size={18} color="#FFFFFF" /> Finish Activity &amp; Proceed to Quiz
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}