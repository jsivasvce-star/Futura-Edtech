import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

// ── COLOR PALETTES FOR REALISTIC MATERIALS ──
const PALETTES = {
  all_ones: { primary: '#e2e8f0', accent: '#f59e0b', metalness: 0.85, roughness: 0.18 },
  counting: { primary: '#b45309', accent: '#fbbf24', metalness: 0.15, roughness: 0.45 },
  odd_numbers: { primary: '#2563eb', accent: '#60a5fa', metalness: 0.7, roughness: 0.2 },
  even_numbers: { primary: '#dc2626', accent: '#f87171', metalness: 0.75, roughness: 0.2 },
  triangular: { primary: '#059669', accent: '#34d399', metalness: 0.8, roughness: 0.25 },
  squares: { primary: '#d97706', accent: '#fcd34d', metalness: 0.85, roughness: 0.15 },
  cubes: { primary: '#7c3aed', accent: '#c084fc', metalness: 0.6, roughness: 0.25 },
  virahanka: { primary: '#0284c7', accent: '#38bdf8', metalness: 0.7, roughness: 0.2 },
  powers_of_2: { primary: '#db2777', accent: '#f472b6', metalness: 0.65, roughness: 0.25 },
  powers_of_3: { primary: '#0d9488', accent: '#2dd4bf', metalness: 0.75, roughness: 0.2 }
};

// ── CINEMATIC CAMERA CONTROLLER (AUTOMATIC SMOOTH MOTION, NO USER DRAG REQUIRED) ──
function CinematicCamera({ activeSequence, isPlaying, stepIndex = 0 }) {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime();
    const speed = isPlaying ? 0.35 : 0.08;

    if (activeSequence === 'opening') {
      // Sweeping camera dolly through architectural boulevard
      camera.position.x = Math.sin(t * 0.25) * 2.5;
      camera.position.y = 3.5 + Math.cos(t * 0.18) * 0.4;
      camera.position.z = 8.5 + Math.sin(t * 0.15) * 1.5;
      camera.lookAt(0, 1.2, 0);
    } else if (activeSequence === 'cubes') {
      // Elevated orbit to inspect 3D cube volume
      const angle = t * speed;
      const radius = 6.8 + (stepIndex > 2 ? 2.5 : 0);
      camera.position.x = Math.cos(angle) * radius;
      camera.position.y = 4.2;
      camera.position.z = Math.sin(angle) * radius;
      camera.lookAt(0, 1.0, 0);
    } else if (activeSequence === 'triangular') {
      // Gentle elevated sweep showing triangle formation
      const angle = Math.sin(t * speed * 0.6) * 0.45;
      camera.position.x = Math.sin(angle) * 7.0;
      camera.position.y = 4.5;
      camera.position.z = Math.cos(angle) * 7.0;
      camera.lookAt(0, 1.4, 0);
    } else if (activeSequence === 'squares') {
      // High-angle architectural view for rows and columns
      const angle = Math.sin(t * speed * 0.5) * 0.35;
      camera.position.x = Math.sin(angle) * 6.5;
      camera.position.y = 5.2;
      camera.position.z = Math.cos(angle) * 6.5;
      camera.lookAt(0, 0.5, 0);
    } else {
      // Default natural cinematic drift
      const angle = Math.sin(t * speed * 0.5) * 0.4;
      camera.position.x = Math.sin(angle) * 6.2;
      camera.position.y = 2.8 + Math.cos(t * 0.2) * 0.3;
      camera.position.z = Math.cos(angle) * 6.2;
      camera.lookAt(0, 0.8, 0);
    }
  });

  return null;
}

// ── OPENING 3D SCENE: ARCHITECTURAL BOULEVARD & REPEATING STREET PATTERNS ──
function OpeningScene({ isPlaying }) {
  const groupRef = useRef();

  // Architectural columns / streetlamps that appear in increasing counts (1 -> 2 -> 3 -> 4 -> 5)
  const lampGroups = useMemo(() => [
    { count: 1, z: 4.5, x: -2.8, color: '#f59e0b' },
    { count: 2, z: 2.2, x: 2.8, color: '#f59e0b' },
    { count: 3, z: 0.0, x: -2.8, color: '#f59e0b' },
    { count: 4, z: -2.2, x: 2.8, color: '#f59e0b' },
    { count: 5, z: -4.5, x: -2.8, color: '#f59e0b' }
  ], []);

  useFrame(({ clock }) => {
    if (groupRef.current && isPlaying) {
      const t = clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Modern Granite Boulevard Floor with Geometric Paving */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[16, 20]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Repeating Boulevard Road Lines */}
      {[-4, -2, 0, 2, 4].map((z, i) => (
        <mesh key={`dash-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, z]} receiveShadow>
          <planeGeometry args={[0.2, 1.2]} />
          <meshStandardMaterial color="#fef08a" roughness={0.4} metalness={0.1} />
        </mesh>
      ))}

      {/* Architectural Arches & Modern Repeating Buildings */}
      {[-5, -2.5, 0, 2.5, 5].map((zPos, idx) => (
        <group key={`arch-${idx}`} position={[0, 0, zPos]}>
          {/* Left Building Facade Column */}
          <mesh position={[-4.5, 2.2, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.2, 4.4, 1.8]} />
            <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.3} />
          </mesh>
          {/* Glass Architectural Window Ribs */}
          <mesh position={[-3.85, 2.2, 0]}>
            <boxGeometry args={[0.08, 3.8, 1.6]} />
            <meshStandardMaterial color="#60a5fa" roughness={0.1} metalness={0.9} transparent opacity={0.65} />
          </mesh>

          {/* Right Building Facade Column */}
          <mesh position={[4.5, 2.2, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.2, 4.4, 1.8]} />
            <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.3} />
          </mesh>
          <mesh position={[3.85, 2.2, 0]}>
            <boxGeometry args={[0.08, 3.8, 1.6]} />
            <meshStandardMaterial color="#60a5fa" roughness={0.1} metalness={0.9} transparent opacity={0.65} />
          </mesh>
        </group>
      ))}

      {/* Streetlamps Grouped in Repeating/Increasing Pattern (1 -> 2 -> 3 -> 4 -> 5) */}
      {lampGroups.map((grp, gIdx) => (
        <group key={`grp-${gIdx}`} position={[grp.x, 0, grp.z]}>
          {Array.from({ length: grp.count }).map((_, lIdx) => {
            const offsetX = (lIdx - (grp.count - 1) / 2) * 0.45;
            return (
              <group key={`lamp-${gIdx}-${lIdx}`} position={[offsetX, 0, 0]}>
                {/* Pole */}
                <mesh position={[0, 1.1, 0]} castShadow>
                  <cylinderGeometry args={[0.035, 0.05, 2.2, 16]} />
                  <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.2} />
                </mesh>
                {/* Glowing Lantern Fixture */}
                <mesh position={[0, 2.2, 0]} castShadow>
                  <sphereGeometry args={[0.13, 16, 16]} />
                  <meshStandardMaterial color="#fef08a" emissive="#fbbf24" emissiveIntensity={1.8} roughness={0.1} />
                </mesh>
                <pointLight position={[0, 2.2, 0]} intensity={1.5} distance={3.5} color="#fef08a" />
              </group>
            );
          })}
        </group>
      ))}
    </group>
  );
}

// ── 1. ALL 1’s (1, 1, 1, 1, 1...) ──
function AllOnesScene({ step = 4, isPlaying, bonusSpawnCount = 0 }) {
  const palette = PALETTES.all_ones;
  const count = Math.min(step + 1 + bonusSpawnCount, 6);
  const items = Array.from({ length: count }, (_, i) => i);

  return (
    <group position={[0, 0, 0]}>
      {items.map((idx) => {
        const xPos = (idx - (count - 1) / 2) * 1.45;
        return (
          <group key={idx} position={[xPos, 0, 0]}>
            {/* Elegant Polished Pedestal */}
            <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.42, 0.48, 0.7, 32]} />
              <meshStandardMaterial color="#1e293b" metalness={0.4} roughness={0.3} />
            </mesh>
            {/* Gold Trim Ring */}
            <mesh position={[0, 0.7, 0]} castShadow>
              <torusGeometry args={[0.42, 0.03, 16, 32]} rotation={[Math.PI / 2, 0, 0]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.15} />
            </mesh>

            {/* Identical Floating Metallic Cube of Value 1 */}
            <Float speed={isPlaying ? 2 : 0} rotationIntensity={0.3} floatIntensity={0.25}>
              <mesh position={[0, 1.45, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.65, 0.65, 0.65]} />
                <meshStandardMaterial color={palette.primary} metalness={palette.metalness} roughness={palette.roughness} />
              </mesh>
            </Float>
          </group>
        );
      })}
    </group>
  );
}

// ── 2. COUNTING NUMBERS (1, 2, 3, 4, 5...) ──
function CountingNumbersScene({ step = 4, isPlaying, bonusSpawnCount = 0 }) {
  const palette = PALETTES.counting;
  const count = Math.min(step + 1 + bonusSpawnCount, 6);
  const towers = Array.from({ length: count }, (_, i) => i + 1);

  return (
    <group position={[0, 0, 0]}>
      {towers.map((h, colIdx) => {
        const xPos = (colIdx - (count - 1) / 2) * 1.35;
        return (
          <group key={colIdx} position={[xPos, 0, 0]}>
            {Array.from({ length: h }).map((_, blockIdx) => {
              const yPos = 0.32 + blockIdx * 0.64;
              return (
                <mesh key={blockIdx} position={[0, yPos, 0]} castShadow receiveShadow>
                  <boxGeometry args={[0.62, 0.58, 0.62]} />
                  <meshStandardMaterial
                    color={palette.primary}
                    metalness={palette.metalness}
                    roughness={palette.roughness}
                  />
                </mesh>
              );
            })}
          </group>
        );
      })}
    </group>
  );
}

// ── 3. ODD NUMBERS (1, 3, 5, 7, 9...) ──
function OddNumbersScene({ step = 4, isPlaying, bonusSpawnCount = 0 }) {
  const palette = PALETTES.odd_numbers;
  const oddCounts = [1, 3, 5, 7, 9, 11, 13];
  const idx = Math.min(step + bonusSpawnCount, oddCounts.length - 1);
  const count = oddCounts[idx];
  const pairsCount = Math.floor(count / 2);

  return (
    <group position={[0, 0, 0]}>
      {/* Central Standout "Odd" Sphere */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.85} roughness={0.15} emissive="#f59e0b" emissiveIntensity={0.25} />
      </mesh>

      {/* Symmetrical Paired Spheres flanking the center */}
      {Array.from({ length: pairsCount }).map((_, pIdx) => {
        const yPos = 0.45 + pIdx * 0.85;
        return (
          <group key={pIdx}>
            {/* Left Partner */}
            <mesh position={[-0.95, yPos, 0]} castShadow receiveShadow>
              <sphereGeometry args={[0.38, 32, 32]} />
              <meshStandardMaterial color={palette.primary} metalness={palette.metalness} roughness={palette.roughness} />
            </mesh>
            {/* Right Partner */}
            <mesh position={[0.95, yPos, 0]} castShadow receiveShadow>
              <sphereGeometry args={[0.38, 32, 32]} />
              <meshStandardMaterial color={palette.primary} metalness={palette.metalness} roughness={palette.roughness} />
            </mesh>
            {/* Connecting Bridge Bar Showing Pair */}
            <mesh position={[0, yPos, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 1.8, 16]} rotation={[0, 0, Math.PI / 2]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.6} roughness={0.3} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// ── 4. EVEN NUMBERS (2, 4, 6, 8, 10...) ──
function EvenNumbersScene({ step = 4, isPlaying, bonusSpawnCount = 0 }) {
  const palette = PALETTES.even_numbers;
  const evenCounts = [2, 4, 6, 8, 10, 12, 14];
  const idx = Math.min(step + bonusSpawnCount, evenCounts.length - 1);
  const count = evenCounts[idx];
  const pairsCount = count / 2;

  return (
    <group position={[0, 0, 0]}>
      {Array.from({ length: pairsCount }).map((_, pIdx) => {
        const yPos = 0.45 + (pIdx - (pairsCount - 1) / 2) * 0.95 + 1.2;
        return (
          <group key={pIdx}>
            {/* Left Sphere */}
            <mesh position={[-0.8, yPos, 0]} castShadow receiveShadow>
              <sphereGeometry args={[0.38, 32, 32]} />
              <meshStandardMaterial color={palette.primary} metalness={palette.metalness} roughness={palette.roughness} />
            </mesh>
            {/* Right Sphere */}
            <mesh position={[0.8, yPos, 0]} castShadow receiveShadow>
              <sphereGeometry args={[0.38, 32, 32]} />
              <meshStandardMaterial color={palette.primary} metalness={palette.metalness} roughness={palette.roughness} />
            </mesh>
            {/* Connector Pair Link */}
            <mesh position={[0, yPos, 0]}>
              <cylinderGeometry args={[0.045, 0.045, 1.5, 16]} rotation={[0, 0, Math.PI / 2]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.7} roughness={0.2} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// ── 5. TRIANGULAR NUMBERS (1, 3, 6, 10, 15...) ──
function TriangularNumbersScene({ step = 4, isPlaying, bonusSpawnCount = 0 }) {
  const palette = PALETTES.triangular;
  const rows = Math.min(step + 1 + bonusSpawnCount, 6); // 1 to 6
  const sphereRadius = 0.35;
  const spacing = 0.76;

  const spheres = useMemo(() => {
    const list = [];
    for (let r = 0; r < rows; r++) {
      const itemsInRow = r + 1;
      const y = (rows - 1 - r) * spacing * 0.86 + 0.4;
      const startX = -((itemsInRow - 1) * spacing) / 2;
      for (let i = 0; i < itemsInRow; i++) {
        list.push({
          x: startX + i * spacing,
          y,
          z: 0,
          row: r
        });
      }
    }
    return list;
  }, [rows, spacing]);

  return (
    <group position={[0, 0, 0]}>
      {spheres.map((s, idx) => (
        <mesh key={idx} position={[s.x, s.y, s.z]} castShadow receiveShadow>
          <sphereGeometry args={[sphereRadius, 32, 32]} />
          <meshStandardMaterial
            color={s.row === 0 ? '#34d399' : palette.primary}
            metalness={palette.metalness}
            roughness={palette.roughness}
          />
        </mesh>
      ))}
    </group>
  );
}

// ── 6. SQUARE NUMBERS (1, 4, 9, 16, 25...) ──
function SquareNumbersScene({ step = 4, isPlaying, bonusSpawnCount = 0 }) {
  const palette = PALETTES.squares;
  const n = Math.min(step + 1 + bonusSpawnCount, 6); // 1 to 6
  const blockSize = 0.52;
  const gap = 0.08;
  const pitch = blockSize + gap;

  const blocks = useMemo(() => {
    const list = [];
    const offset = ((n - 1) * pitch) / 2;
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        list.push({
          x: c * pitch - offset,
          z: r * pitch - offset,
          y: blockSize / 2
        });
      }
    }
    return list;
  }, [n, pitch, blockSize]);

  return (
    <group position={[0, 0, 0]}>
      {/* Base Grid Platform */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <boxGeometry args={[n * pitch + 0.4, 0.06, n * pitch + 0.4]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.4} />
      </mesh>

      {blocks.map((b, idx) => (
        <mesh key={idx} position={[b.x, b.y + 0.06, b.z]} castShadow receiveShadow>
          <boxGeometry args={[blockSize, blockSize * 0.8, blockSize]} />
          <meshStandardMaterial
            color={palette.primary}
            metalness={palette.metalness}
            roughness={palette.roughness}
          />
        </mesh>
      ))}
    </group>
  );
}

// ── 7. CUBE NUMBERS (1, 8, 27, 64...) ──
function CubeNumbersScene({ step = 2, isPlaying, bonusSpawnCount = 0 }) {
  const palette = PALETTES.cubes;
  const n = Math.min(step + 1 + bonusSpawnCount, 4); // 1 to 4
  const size = 0.48;
  const gap = 0.06;
  const pitch = size + gap;

  const smallCubes = useMemo(() => {
    const list = [];
    const offset = ((n - 1) * pitch) / 2;
    for (let x = 0; x < n; x++) {
      for (let y = 0; y < n; y++) {
        for (let z = 0; z < n; z++) {
          list.push({
            x: x * pitch - offset,
            y: y * pitch + size / 2 + 0.1,
            z: z * pitch - offset
          });
        }
      }
    }
    return list;
  }, [n, pitch, size]);

  return (
    <group position={[0, 0, 0]}>
      {smallCubes.map((c, idx) => (
        <mesh key={idx} position={[c.x, c.y, c.z]} castShadow receiveShadow>
          <boxGeometry args={[size, size, size]} />
          <meshStandardMaterial
            color={palette.primary}
            metalness={palette.metalness}
            roughness={palette.roughness}
            transparent={n >= 3 && idx % 3 === 0}
            opacity={n >= 3 && idx % 3 === 0 ? 0.85 : 1.0}
          />
        </mesh>
      ))}
    </group>
  );
}

// ── 8. VIRAHĀNKA NUMBERS (1, 2, 3, 5, 8, 13...) ──
function VirahankaNumbersScene({ step = 3, isPlaying }) {
  const stages = [
    { prevA: 1, prevB: 1, sum: 2 },
    { prevA: 1, prevB: 2, sum: 3 },
    { prevA: 2, prevB: 3, sum: 5 },
    { prevA: 3, prevB: 5, sum: 8 },
    { prevA: 5, prevB: 8, sum: 13 }
  ];
  const cur = stages[Math.min(step, stages.length - 1)];

  return (
    <group position={[0, 0, 0]}>
      {/* Group A (Left Cluster) */}
      <group position={[-2.4, 0.4, 0]}>
        {Array.from({ length: cur.prevA }).map((_, i) => (
          <mesh key={`a-${i}`} position={[(i % 3) * 0.5 - 0.5, Math.floor(i / 3) * 0.5 + 0.3, 0]} castShadow>
            <sphereGeometry args={[0.22, 24, 24]} />
            <meshStandardMaterial color="#0284c7" metalness={0.7} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* Plus Sign */}
      <mesh position={[-1.1, 0.9, 0]}>
        <boxGeometry args={[0.4, 0.08, 0.08]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
      <mesh position={[-1.1, 0.9, 0]}>
        <boxGeometry args={[0.08, 0.4, 0.08]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>

      {/* Group B (Middle Cluster) */}
      <group position={[0.2, 0.4, 0]}>
        {Array.from({ length: cur.prevB }).map((_, i) => (
          <mesh key={`b-${i}`} position={[(i % 3) * 0.5 - 0.5, Math.floor(i / 3) * 0.5 + 0.3, 0]} castShadow>
            <sphereGeometry args={[0.22, 24, 24]} />
            <meshStandardMaterial color="#38bdf8" metalness={0.7} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* Equals Sign */}
      <mesh position={[1.4, 1.05, 0]}>
        <boxGeometry args={[0.4, 0.07, 0.07]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
      <mesh position={[1.4, 0.75, 0]}>
        <boxGeometry args={[0.4, 0.07, 0.07]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>

      {/* Combined Result Cluster */}
      <group position={[2.7, 0.4, 0]}>
        {Array.from({ length: cur.sum }).map((_, i) => (
          <mesh key={`sum-${i}`} position={[(i % 3) * 0.48 - 0.5, Math.floor(i / 3) * 0.48 + 0.25, 0]} castShadow>
            <sphereGeometry args={[0.21, 24, 24]} />
            <meshStandardMaterial color="#34d399" metalness={0.8} roughness={0.15} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// ── 9. POWERS OF 2 (1, 2, 4, 8, 16, 32...) ──
function PowersOfTwoScene({ step = 3, isPlaying }) {
  const palette = PALETTES.powers_of_2;
  const counts = [1, 2, 4, 8, 16, 32];
  const count = counts[Math.min(step, counts.length - 1)];

  const positions = useMemo(() => {
    const list = [];
    const cols = count <= 8 ? count : 8;
    const rows = Math.ceil(count / cols);
    const spacingX = 0.58;
    const spacingY = 0.58;
    const offsetX = ((cols - 1) * spacingX) / 2;
    const offsetY = ((rows - 1) * spacingY) / 2;

    for (let i = 0; i < count; i++) {
      const c = i % cols;
      const r = Math.floor(i / cols);
      list.push({
        x: c * spacingX - offsetX,
        y: r * spacingY - offsetY + 1.2,
        z: (r % 2) * 0.2
      });
    }
    return list;
  }, [count]);

  return (
    <group position={[0, 0, 0]}>
      {positions.map((p, idx) => (
        <mesh key={idx} position={[p.x, p.y, p.z]} castShadow receiveShadow>
          <sphereGeometry args={[0.22, 24, 24]} />
          <meshStandardMaterial color={palette.primary} metalness={palette.metalness} roughness={palette.roughness} />
        </mesh>
      ))}
    </group>
  );
}

// ── 10. POWERS OF 3 (1, 3, 9, 27, 81...) ──
function PowersOfThreeScene({ step = 2, isPlaying }) {
  const palette = PALETTES.powers_of_3;
  const counts = [1, 3, 9, 27];
  const count = counts[Math.min(step, counts.length - 1)];

  const triads = useMemo(() => {
    const list = [];
    if (count === 1) {
      list.push({ x: 0, y: 1.0, z: 0 });
      return list;
    }
    const numGroups = count / 3;
    const radius = numGroups > 1 ? 2.2 : 0;
    for (let g = 0; g < numGroups; g++) {
      const groupAngle = (g / numGroups) * Math.PI * 2;
      const gx = Math.cos(groupAngle) * radius;
      const gz = Math.sin(groupAngle) * radius;
      for (let i = 0; i < 3; i++) {
        const itemAngle = (i / 3) * Math.PI * 2;
        list.push({
          x: gx + Math.cos(itemAngle) * 0.45,
          y: 0.8 + (g % 2) * 0.3,
          z: gz + Math.sin(itemAngle) * 0.45
        });
      }
    }
    return list;
  }, [count]);

  return (
    <group position={[0, 0, 0]}>
      {triads.map((p, idx) => (
        <mesh key={idx} position={[p.x, p.y, p.z]} castShadow receiveShadow>
          <boxGeometry args={[0.34, 0.34, 0.34]} />
          <meshStandardMaterial color={palette.primary} metalness={palette.metalness} roughness={palette.roughness} />
        </mesh>
      ))}
    </group>
  );
}

// ── MAIN EXPORTED COMPONENT ──
export default function NumberPatterns3DCanvas({
  activeSequence = 'triangular',
  isPlaying = true,
  stepIndex = 3,
  bonusSpawnCount = 0
}) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#020617', overflow: 'hidden' }}>
      <Canvas
        shadows
        camera={{ position: [0, 3.5, 7.5], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Cinematic Camera Controller with auto glides */}
        <CinematicCamera activeSequence={activeSequence} isPlaying={isPlaying} stepIndex={stepIndex} />

        {/* Studio Lighting Setup */}
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[6, 9, 6]}
          intensity={1.8}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={25}
          shadow-camera-left={-8}
          shadow-camera-right={8}
          shadow-camera-top={8}
          shadow-camera-bottom={-8}
          shadow-bias={-0.0001}
        />
        <pointLight position={[-6, 4, -4]} intensity={0.9} color="#38bdf8" />
        <pointLight position={[5, -1, 3]} intensity={0.6} color="#f59e0b" />

        {/* Contact Shadows Ground Plane */}
        <ContactShadows
          position={[0, -0.01, 0]}
          opacity={0.75}
          scale={15}
          blur={1.6}
          far={8}
          color="#000000"
        />

        {/* 3D Sequences */}
        {activeSequence === 'opening' && <OpeningScene isPlaying={isPlaying} />}
        {activeSequence === 'all_ones' && <AllOnesScene step={stepIndex} isPlaying={isPlaying} bonusSpawnCount={bonusSpawnCount} />}
        {activeSequence === 'counting' && <CountingNumbersScene step={stepIndex} isPlaying={isPlaying} bonusSpawnCount={bonusSpawnCount} />}
        {activeSequence === 'odd_numbers' && <OddNumbersScene step={stepIndex} isPlaying={isPlaying} bonusSpawnCount={bonusSpawnCount} />}
        {activeSequence === 'even_numbers' && <EvenNumbersScene step={stepIndex} isPlaying={isPlaying} bonusSpawnCount={bonusSpawnCount} />}
        {activeSequence === 'triangular' && <TriangularNumbersScene step={stepIndex} isPlaying={isPlaying} bonusSpawnCount={bonusSpawnCount} />}
        {activeSequence === 'squares' && <SquareNumbersScene step={stepIndex} isPlaying={isPlaying} bonusSpawnCount={bonusSpawnCount} />}
        {activeSequence === 'cubes' && <CubeNumbersScene step={stepIndex} isPlaying={isPlaying} bonusSpawnCount={bonusSpawnCount} />}
        {activeSequence === 'virahanka' && <VirahankaNumbersScene step={stepIndex} isPlaying={isPlaying} />}
        {activeSequence === 'powers_of_2' && <PowersOfTwoScene step={stepIndex} isPlaying={isPlaying} />}
        {activeSequence === 'powers_of_3' && <PowersOfThreeScene step={stepIndex} isPlaying={isPlaying} />}
      </Canvas>
    </div>
  );
}
