import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

// ── 3D DESK ACCESSORY: REALISTIC WARM WALNUT ABACUS ──
function ClassroomAbacus({ position = [2.2, -0.1, -1.0], scale = 0.72 }) {
  const beads = useMemo(() => {
    const colors = ['#f59e0b', '#0284c7', '#dc2626', '#16a34a', '#9333ea'];
    return [0, 1, 2, 3, 4].map((rodIndex) => ({
      rodX: (rodIndex - 2) * 0.22,
      color: colors[rodIndex],
      lowerCount: (rodIndex * 2 + 1) % 5 + 1,
      upperActive: rodIndex % 2 === 1
    }));
  }, []);

  return (
    <group position={position} scale={scale} rotation={[0, -0.22, 0]}>
      {/* Outer Walnut Frame */}
      <mesh position={[0, 0.48, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.35, 0.06, 0.1]} />
        <meshStandardMaterial color="#381e0f" roughness={0.4} metalness={0.1} />
      </mesh>
      <mesh position={[0, -0.48, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.35, 0.06, 0.1]} />
        <meshStandardMaterial color="#381e0f" roughness={0.4} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.35, 0.04, 0.08]} />
        <meshStandardMaterial color="#2a150b" roughness={0.4} metalness={0.1} />
      </mesh>
      <mesh position={[-0.64, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.07, 1.02, 0.12]} />
        <meshStandardMaterial color="#381e0f" roughness={0.4} metalness={0.1} />
      </mesh>
      <mesh position={[0.64, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.07, 1.02, 0.12]} />
        <meshStandardMaterial color="#381e0f" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Polished Brass Rods & Beads */}
      {beads.map((rod, rIdx) => (
        <group key={rIdx} position={[rod.rodX, 0, 0]}>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 0.94, 12]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Upper Bead */}
          <mesh position={[0, rod.upperActive ? 0.22 : 0.38, 0]} castShadow>
            <cylinderGeometry args={[0.075, 0.075, 0.065, 16]} rotation={[0, 0, Math.PI / 2]} />
            <meshStandardMaterial color={rod.color} roughness={0.3} metalness={0.15} />
          </mesh>
          {/* Lower Beads */}
          {Array.from({ length: 4 }).map((_, bIdx) => {
            const isUp = bIdx < rod.lowerCount;
            const yPos = isUp ? 0.02 - bIdx * 0.075 : -0.38 + (3 - bIdx) * 0.075;
            return (
              <mesh key={bIdx} position={[0, yPos, 0]} castShadow>
                <cylinderGeometry args={[0.072, 0.072, 0.06, 16]} rotation={[0, 0, Math.PI / 2]} />
                <meshStandardMaterial color={rod.color} roughness={0.3} metalness={0.15} />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  );
}

// ── 3D DESK ACCESSORY: STACKED HARDCOVER MATHEMATICS TEXTBOOKS ──
function MathematicsBookStack({ position = [-2.2, -0.28, -1.0], rotation = [0, 0.35, 0] }) {
  return (
    <group position={position} rotation={rotation} scale={0.72}>
      {/* Book 1 (Bottom - Warm Chocolate Leather with Gold Foil) */}
      <group position={[0, 0.06, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.3, 0.12, 0.95]} />
          <meshStandardMaterial color="#3b1d11" roughness={0.45} />
        </mesh>
        <mesh position={[0.04, 0, 0]} receiveShadow>
          <boxGeometry args={[1.2, 0.09, 0.9]} />
          <meshStandardMaterial color="#fef3c7" roughness={0.8} />
        </mesh>
        <mesh position={[-0.62, 0, 0]}>
          <boxGeometry args={[0.04, 0.115, 0.94]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.85} roughness={0.25} />
        </mesh>
      </group>

      {/* Book 2 (Middle - Deep Burgundy Crimson) */}
      <group position={[0.08, 0.18, 0.04]} rotation={[0, -0.15, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.11, 0.9]} />
          <meshStandardMaterial color="#7f1d1d" roughness={0.5} />
        </mesh>
        <mesh position={[0.03, 0, 0]} receiveShadow>
          <boxGeometry args={[1.12, 0.08, 0.85]} />
          <meshStandardMaterial color="#fffbeb" roughness={0.8} />
        </mesh>
      </group>

      {/* Book 3 (Top - Forest Emerald with Gold Geometry Ring) */}
      <group position={[0.02, 0.29, 0.02]} rotation={[0, 0.08, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.15, 0.1, 0.85]} />
          <meshStandardMaterial color="#14532d" roughness={0.45} />
        </mesh>
        <mesh position={[0.03, 0, 0]} receiveShadow>
          <boxGeometry args={[1.08, 0.075, 0.8]} />
          <meshStandardMaterial color="#fefce8" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.052, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.12, 0.15, 16]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

// ── 3D DESK ACCESSORY: GEOMETRY TOOLS, RULER, PENCIL & GRAPH PAPER ──
function DeskStationeryAndTools({ position = [-1.9, -0.34, 0.75] }) {
  return (
    <group position={position} scale={0.75}>
      {/* Warm Cream Graph Paper Notebook Sheet */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0.18]} receiveShadow>
        <planeGeometry args={[1.3, 0.95]} />
        <meshStandardMaterial color="#fefce8" roughness={0.85} />
      </mesh>
      {/* Grid Pattern Lines */}
      <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0.18]}>
        <planeGeometry args={[1.2, 0.85]} />
        <meshBasicMaterial color="#b45309" wireframe transparent opacity={0.2} />
      </mesh>

      {/* Translucent Golden-Amber 30-60-90 Set Square Ruler */}
      <group position={[0.15, 0.025, -0.1]} rotation={[-Math.PI / 2, 0, -0.3]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.42, 0.42, 0.015, 3]} />
          <meshPhysicalMaterial
            color="#fbbf24"
            transmission={0.65}
            opacity={0.85}
            transparent
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>
      </group>

      {/* Polished Warm Cedar Wooden Measuring Ruler */}
      <group position={[-0.45, 0.02, 0.2]} rotation={[0, 0.7, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.1, 0.012, 0.14]} />
          <meshStandardMaterial color="#92400e" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.007, 0.065]}>
          <boxGeometry args={[1.1, 0.005, 0.012]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Sharpened Yellow & Gold Wooden Pencil */}
      <group position={[0.5, 0.022, 0.15]} rotation={[0, -0.4, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.022, 0.022, 0.75, 6]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#d97706" roughness={0.35} />
        </mesh>
        <mesh position={[0.4, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.022, 0.065, 12]} />
          <meshStandardMaterial color="#fed7aa" roughness={0.6} />
        </mesh>
        <mesh position={[0.435, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.009, 0.025, 12]} />
          <meshStandardMaterial color="#1c1917" roughness={0.3} />
        </mesh>
        <mesh position={[-0.39, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.023, 0.023, 0.04, 12]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[-0.42, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.022, 0.022, 0.035, 12]} />
          <meshStandardMaterial color="#f43f5e" roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}

// ── SCENE 1: NUMBER SEQUENCES (VIRAHĀNKA TILES) ──
function NumberSequencesScene() {
  const groupRef = useRef();
  const tiles = [
    { num: '1', x: -1.75, z: 0.2, color: '#f59e0b' },
    { num: '2', x: -1.05, z: 0.08, color: '#f59e0b' },
    { num: '3', x: -0.35, z: -0.04, color: '#0ea5e9' },
    { num: '5', x: 0.35, z: -0.04, color: '#0ea5e9' },
    { num: '8', x: 1.05, z: 0.08, color: '#a855f7' },
    { num: '13', x: 1.75, z: 0.2, color: '#ec4899' }
  ];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.04;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.08, 0]}>
      {/* Walnut & Brass Track Base */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <boxGeometry args={[4.2, 0.035, 0.85]} />
        <meshStandardMaterial color="#291a10" metalness={0.4} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.045, 0.36]}>
        <cylinderGeometry args={[0.014, 0.014, 4.2, 16]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.045, -0.36]}>
        <cylinderGeometry args={[0.014, 0.014, 4.2, 16]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Number Tiles */}
      {tiles.map((tile, i) => (
        <group key={i} position={[tile.x, 0.2, tile.z]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.58, 0.28, 0.58]} />
            <meshStandardMaterial color="#1c130d" roughness={0.35} metalness={0.2} />
          </mesh>
          <mesh position={[0, 0.145, 0]} receiveShadow>
            <boxGeometry args={[0.5, 0.015, 0.5]} />
            <meshStandardMaterial color="#451a03" roughness={0.35} />
          </mesh>
          <Text
            position={[0, 0.2, 0.02]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.25}
            color={tile.color}
            fontWeight="900"
            anchorX="center"
            anchorY="middle"
          >
            {tile.num}
          </Text>
        </group>
      ))}

      <Text
        position={[0, -0.15, 0.72]}
        fontSize={0.16}
        maxWidth={4.0}
        color="#fde68a"
        fontWeight="bold"
        anchorX="center"
        anchorY="middle"
      >
        Virahānka (Fibonacci) Sequence: 1, 2, 3, 5, 8, 13...
      </Text>
    </group>
  );
}

// ── SCENE 2: GROWING BLOCKS (SQUARE NUMBERS 1 -> 4 -> 9) ──
function GrowingBlocksScene() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.25, 0]}>
      {/* 1x1 Stage */}
      <group position={[-1.75, 0, 0.3]}>
        <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.36, 0.36, 0.36]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.25} metalness={0.2} />
        </mesh>
      </group>

      {/* 2x2 Stage */}
      <group position={[-0.65, 0, 0.05]}>
        {[-0.19, 0.19].map((x, xi) =>
          [-0.19, 0.19].map((z, zi) => (
            <mesh key={`${xi}-${zi}`} position={[x, 0.18, z]} castShadow receiveShadow>
              <boxGeometry args={[0.36, 0.36, 0.36]} />
              <meshStandardMaterial
                color={xi === 0 && zi === 0 ? '#38bdf8' : '#818cf8'}
                roughness={0.25}
                metalness={0.2}
              />
            </mesh>
          ))
        )}
      </group>

      {/* 3x3 Stage */}
      <group position={[0.8, 0, -0.2]}>
        {[-0.36, 0, 0.36].map((x, xi) =>
          [-0.36, 0, 0.36].map((z, zi) => {
            const isStage1 = xi === 0 && zi === 0;
            const isStage2 = xi <= 1 && zi <= 1 && !isStage1;
            const color = isStage1 ? '#38bdf8' : isStage2 ? '#818cf8' : '#c084fc';
            return (
              <mesh key={`${xi}-${zi}`} position={[x, 0.18, z]} castShadow receiveShadow>
                <boxGeometry args={[0.34, 0.34, 0.34]} />
                <meshStandardMaterial color={color} roughness={0.25} metalness={0.2} />
              </mesh>
            );
          })
        )}
      </group>

      {/* Ground Guideline */}
      <mesh position={[0, 0.01, 0.08]} rotation={[-Math.PI / 2, 0, -0.12]}>
        <planeGeometry args={[3.8, 0.025]} />
        <meshBasicMaterial color="#d97706" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

// ── SCENE 3: GEOMETRIC SHAPES (POLYGONS 3 -> 4 -> 5 -> 6 SIDES) ──
function ShapeTransformationScene() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.28) * 0.06;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.22, 0]}>
      {/* Triangle (3) */}
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.25}>
        <group position={[-1.55, 0, 0]}>
          <mesh rotation={[0.35, 0.2, 0]} castShadow>
            <cylinderGeometry args={[0.38, 0.38, 0.1, 3]} />
            <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.3} />
          </mesh>
        </group>
      </Float>

      {/* Square (4) */}
      <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.25}>
        <group position={[-0.52, 0.15, 0.15]}>
          <mesh rotation={[0.25, 0.35, 0.1]} castShadow>
            <cylinderGeometry args={[0.38, 0.38, 0.1, 4]} />
            <meshStandardMaterial color="#0ea5e9" roughness={0.2} metalness={0.3} />
          </mesh>
        </group>
      </Float>

      {/* Pentagon (5) */}
      <Float speed={1.3} rotationIntensity={0.15} floatIntensity={0.25}>
        <group position={[0.52, 0.08, 0.1]}>
          <mesh rotation={[0.25, -0.25, 0]} castShadow>
            <cylinderGeometry args={[0.38, 0.38, 0.1, 5]} />
            <meshStandardMaterial color="#a855f7" roughness={0.2} metalness={0.3} />
          </mesh>
        </group>
      </Float>

      {/* Hexagon (6) */}
      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.25}>
        <group position={[1.55, 0.2, -0.08]}>
          <mesh rotation={[0.4, 0.2, 0]} castShadow>
            <cylinderGeometry args={[0.4, 0.4, 0.1, 6]} />
            <meshStandardMaterial color="#ec4899" roughness={0.2} metalness={0.3} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

// ── SCENE 4: REAL-WORLD TESSELLATIONS & STEPPED STAIRS PATTERNS ──
function TessellationPatternScene() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.28) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.28, 0]}>
      {/* Stepped Architectural Stairs */}
      <group position={[-1.0, 0, 0]}>
        {[1, 2, 3, 4].map((tierHeight, colIdx) =>
          Array.from({ length: tierHeight }).map((_, rowIdx) => (
            <mesh
              key={`${colIdx}-${rowIdx}`}
              position={[(colIdx - 1.5) * 0.28, (rowIdx + 0.5) * 0.2, 0]}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[0.26, 0.18, 0.52]} />
              <meshStandardMaterial
                color={
                  colIdx === 0
                    ? '#f59e0b'
                    : colIdx === 1
                    ? '#0ea5e9'
                    : colIdx === 2
                    ? '#a855f7'
                    : '#ec4899'
                }
                roughness={0.35}
                metalness={0.2}
              />
            </mesh>
          ))
        )}
      </group>

      {/* Honeycomb Hexagonal Tessellation Tiles */}
      <group position={[1.15, 0.04, 0]} rotation={[-0.35, 0.25, 0]}>
        {[
          [0, 0],
          [0.38, 0.22],
          [-0.38, 0.22],
          [0.38, -0.22],
          [-0.38, -0.22],
          [0, 0.44],
          [0, -0.44]
        ].map(([hx, hz], hi) => (
          <mesh key={hi} position={[hx, 0.08, hz]} castShadow receiveShadow>
            <cylinderGeometry args={[0.22, 0.22, 0.055, 6]} />
            <meshStandardMaterial
              color={hi === 0 ? '#fbbf24' : '#0ea5e9'}
              roughness={0.25}
              metalness={0.25}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// ── MAIN PATTERN LAB 3D CONTAINER ──
export default function PatternLab3D() {
  const [activeSceneIndex, setActiveSceneIndex] = useState(1); // Default to 'Growing Patterns'

  const scenes = [
    { title: 'Number Sequences', component: <NumberSequencesScene /> },
    { title: 'Growing Patterns', component: <GrowingBlocksScene /> },
    { title: 'Geometric Shapes', component: <ShapeTransformationScene /> },
    { title: 'Tessellations & Stairs', component: <TessellationPatternScene /> }
  ];

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* 3D Canvas Viewport */}
      <Canvas camera={{ position: [0, 1.4, 5.3], fov: 38 }} shadows dpr={[1, 2]}>
        {/* Warm Sunlight & Ambient Studio Lighting */}
        <ambientLight intensity={1.2} color="#fef3c7" />
        {/* Warm Classroom Window Sunlight */}
        <directionalLight
          position={[6, 9, 7]}
          intensity={2.8}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
          color="#fffbeb"
        />
        {/* Warm Amber Secondary Light */}
        <directionalLight position={[-5, 6, -3]} intensity={1.2} color="#fde68a" />
        <pointLight position={[-3, 3, 2]} intensity={0.9} color="#fbbf24" />
        <pointLight position={[3, 3.5, 1]} intensity={1.1} color="#f59e0b" />

        {/* Classroom Desk Workspace Table */}
        <group position={[0, -0.38, 0]}>
          {/* Polished Warm Walnut Desk Surface */}
          <mesh receiveShadow position={[0, -0.08, 0]}>
            <boxGeometry args={[7.2, 0.12, 4.8]} />
            <meshStandardMaterial color="#351e12" roughness={0.38} metalness={0.08} />
          </mesh>
          {/* Desk Warm Wooden Bevel Border */}
          <mesh position={[0, -0.015, 0]}>
            <boxGeometry args={[6.4, 0.01, 3.8]} />
            <meshStandardMaterial color="#451a03" roughness={0.4} />
          </mesh>
          {/* Dark Charcoal / Black Mathematics Workboard */}
          <mesh receiveShadow position={[0, 0.002, 0]}>
            <boxGeometry args={[5.6, 0.02, 3.3]} />
            <meshStandardMaterial color="#18181b" roughness={0.5} metalness={0.15} />
          </mesh>
          {/* Workboard Muted Copper / Gold Rim Trim */}
          <mesh position={[0, 0.015, 1.66]}>
            <boxGeometry args={[5.62, 0.012, 0.03]} />
            <meshStandardMaterial color="#d97706" metalness={0.85} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.015, -1.66]}>
            <boxGeometry args={[5.62, 0.012, 0.03]} />
            <meshStandardMaterial color="#d97706" metalness={0.85} roughness={0.25} />
          </mesh>
          <mesh position={[-2.81, 0.015, 0]}>
            <boxGeometry args={[0.03, 0.012, 3.32]} />
            <meshStandardMaterial color="#d97706" metalness={0.85} roughness={0.25} />
          </mesh>
          <mesh position={[2.81, 0.015, 0]}>
            <boxGeometry args={[0.03, 0.012, 3.32]} />
            <meshStandardMaterial color="#d97706" metalness={0.85} roughness={0.25} />
          </mesh>
          {/* Subtle Warm Grid Lines on Workboard */}
          <mesh position={[0, 0.014, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[5.5, 3.2]} />
            <meshBasicMaterial color="#fbbf24" wireframe transparent opacity={0.08} />
          </mesh>
        </group>

        {/* Classroom Accessories: Stacked Books, Abacus, Geometry Tools */}
        <MathematicsBookStack position={[-2.2, -0.28, -1.0]} rotation={[0, 0.35, 0]} />
        <ClassroomAbacus position={[2.2, -0.1, -1.0]} scale={0.72} />
        <DeskStationeryAndTools position={[-1.9, -0.34, 0.75]} />

        {/* Scaled Active Manipulative Scene (Focal Point) */}
        <group position={[0, 0.05, 0]} scale={0.88}>
          {scenes[activeSceneIndex].component}
        </group>

        {/* Soft Contact Shadows on Desk Surface */}
        <ContactShadows position={[0, -0.36, 0]} opacity={0.65} scale={6.0} blur={1.6} far={2.5} />

        {/* Interactive Smooth Orbit Tilt */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={Math.PI / 4}
          maxAzimuthAngle={Math.PI / 7}
          minAzimuthAngle={-Math.PI / 7}
        />
      </Canvas>

      {/* 2D UI Overlay: Clean 2D Shape Labels with TRIANGLE */}
      {activeSceneIndex === 2 && (
        <div className="cover-2d-shape-labels-overlay">
          <div className="shape-2d-label shape-triangle">TRIANGLE</div>
          <div className="shape-2d-label">SQUARE</div>
          <div className="shape-2d-label">PENTAGON</div>
          <div className="shape-2d-label">HEXAGON</div>
        </div>
      )}

      {/* 2D Concept Selector Overlay — TRUE 2D HTML/UI OVERLAY */}
      <div className="cover-concept-selector">
        {scenes.map((scene, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSceneIndex(idx)}
            className={`concept-tab-btn ${activeSceneIndex === idx ? 'active' : ''}`}
          >
            {scene.title}
          </button>
        ))}
      </div>
    </div>
  );
}
