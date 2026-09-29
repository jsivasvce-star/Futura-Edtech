import React, { useRef, useState, useMemo, useLayoutEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls, Html, useTexture, Stars } from '@react-three/drei';
import * as THREE from 'three';

import mercuryUrl from '../../../../social/chapter1-version3/components/mercury.jpg';
import venusUrl from '../../../../social/chapter1-version3/components/venus.jpg';
import earthUrl from '../../../../social/chapter1-version3/components/world-map.jpg';
import marsUrl from '../../../../social/chapter1-version3/components/mars.jpg';
import jupiterUrl from '../../../../social/chapter1-version3/components/jupiter.jpg';
import saturnUrl from '../../../../social/chapter1-version3/components/saturn.jpg';
import saturnRingUrl from '../../../../social/chapter1-version3/components/saturn_ring.png';
import uranusUrl from '../../../../social/chapter1-version3/components/uranus.jpg';
import neptuneUrl from '../../../../social/chapter1-version3/components/neptune.jpg';
import sunMapUrl from '../../../../social/chapter1-version3/components/sun-map.jpg';
import moonUrl from '../../../../assets/moon_texture.jpg';

// Preload textures to ensure instantaneous rendering
[
  mercuryUrl, venusUrl, earthUrl, marsUrl,
  jupiterUrl, saturnUrl, saturnRingUrl, uranusUrl,
  neptuneUrl, sunMapUrl, moonUrl
].forEach((url) => {
  try {
    useTexture.preload(url);
  } catch (e) {
    // Ignore preload warning if SSR or offline
  }
});

const PLANETS_CONFIG = [
  {
    name: 'Mercury',
    textureUrl: mercuryUrl,
    color: '#c4b09f',
    radius: 0.8,
    distance: 4.8,
    speed: 0.83,
    tilt: 0.03,
    initialAngle: Math.PI * 0.08
  },
  {
    name: 'Venus',
    textureUrl: venusUrl,
    color: '#ffffff',
    radius: 1.1,
    distance: 7.2,
    speed: 0.32,
    tilt: 3.09,
    initialAngle: Math.PI * 0.65
  },
  {
    name: 'Earth',
    textureUrl: earthUrl,
    color: '#ffffff',
    radius: 1.2,
    distance: 9.6,
    speed: 0.20,
    tilt: 0.41, // 23.5 degrees
    hasMoon: true,
    initialAngle: Math.PI * 0.80
  },
  {
    name: 'Mars',
    textureUrl: marsUrl,
    color: '#ffffff',
    radius: 0.9,
    distance: 12.0,
    speed: 0.11,
    tilt: 0.44, // 25.2 degrees
    initialAngle: -Math.PI * 0.28 // Front-right side of Sun, beautifully clear
  },
  {
    name: 'Jupiter',
    textureUrl: jupiterUrl,
    color: '#ffffff',
    radius: 2.2,
    distance: 16.5,
    speed: 0.02,
    tilt: 0.05,
    initialAngle: Math.PI * 0.12
  },
  {
    name: 'Saturn',
    textureUrl: saturnUrl,
    color: '#ffffff',
    radius: 1.9,
    distance: 24.5,
    speed: 0.007,
    tilt: 0.46, // 26.7 degrees
    hasSaturnRings: true,
    initialAngle: -Math.PI * 0.06
  },
  {
    name: 'Uranus',
    textureUrl: uranusUrl,
    color: '#d4f2f7',
    radius: 1.5,
    distance: 32.5,
    speed: 0.002,
    tilt: 1.71, // Rotates on its side (97.8 degrees)
    hasUranusRings: true,
    ringInner: 2.0,
    ringOuter: 2.2,
    ringColor: '#8a949e',
    ringOpacity: 0.4,
    initialAngle: Math.PI * 0.92
  },
  {
    name: 'Neptune',
    textureUrl: neptuneUrl,
    color: '#ffffff',
    radius: 1.4,
    distance: 38.5,
    speed: 0.001,
    tilt: 0.49,
    initialAngle: Math.PI * 1.12
  }
];

// Saturn's Ring Component
function SaturnRings({ radius }) {
  const ringTexture = useTexture(saturnRingUrl);
  const geomRef = useRef();

  useLayoutEffect(() => {
    if (geomRef.current) {
      const pos = geomRef.current.attributes.position;
      const uv = geomRef.current.attributes.uv;
      const inner = radius * 0.45;
      const outer = radius * 0.9;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const r = Math.sqrt(x * x + y * y);
        const u = (r - inner) / (outer - inner);
        uv.setXY(i, u, u);
      }
      uv.needsUpdate = true;
    }
  }, [radius]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry ref={geomRef} args={[radius * 0.45, radius * 0.9, 64]} />
      <meshStandardMaterial map={ringTexture} side={THREE.DoubleSide} transparent opacity={0.92} />
    </mesh>
  );
}

// Earth's Moon Component
function EarthMoon() {
  const moonOrbitRef = useRef();
  const moonSpinRef = useRef();
  const moonTexture = useTexture(moonUrl);

  useFrame((_, delta) => {
    if (moonOrbitRef.current) {
      moonOrbitRef.current.rotation.y += delta * 1.5;
    }
    if (moonSpinRef.current) {
      moonSpinRef.current.rotation.y += delta * 0.8;
    }
  });

  const moonDist = 0.8;
  return (
    <group ref={moonOrbitRef}>
      {/* Moon's orbit ring around Earth */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[moonDist - 0.015, moonDist + 0.015, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
      <group position={[moonDist, 0, 0]}>
        <Sphere ref={moonSpinRef} args={[0.08, 24, 24]}>
          <meshStandardMaterial map={moonTexture} color="#cbd5e1" roughness={0.85} />
        </Sphere>
        <Html position={[0, -0.18, 0]} center>
          <div style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '9px',
            fontWeight: 'bold',
            textShadow: '0 1px 3px #000',
            userSelect: 'none',
            pointerEvents: 'none',
            whiteSpace: 'nowrap'
          }}>
            Moon
          </div>
        </Html>
      </group>
    </group>
  );
}

// Orbiting Planet Component
function OrbitingPlanet({ planet, stage }) {
  const groupRef = useRef();
  const planetSpinRef = useRef();
  const texture = useTexture(planet.textureUrl);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * planet.speed;
    }
    if (planetSpinRef.current) {
      planetSpinRef.current.rotation.y += delta * 0.5;
    }
  });

  // Highlight orbits in stage 2 ("Find Pattern") or stage 3/4
  const isPatternStage = stage === 2;
  const isEarth = planet.name === 'Earth';
  const orbitColor = (stage >= 2 && stage <= 4 && isEarth) ? '#38bdf8' : '#ffffff';
  const orbitOpacity = isPatternStage ? 0.65 : (stage >= 3 && isEarth ? 0.75 : 0.38);

  return (
    <group ref={groupRef}>
      {/* Concentric Orbit Track */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[planet.distance, planet.distance + 0.045, 128]} />
        <meshBasicMaterial
          color={orbitColor}
          transparent
          opacity={orbitOpacity}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Planet Body positioned at distance */}
      <group rotation={[0, planet.initialAngle, 0]}>
        <group position={[planet.distance, 0, 0]}>
          <group scale={[2.5, 2.5, 2.5]}>
            <group rotation={[0, 0, planet.tilt || 0]}>
              <Sphere ref={planetSpinRef} args={[planet.radius * 0.3, 32, 32]}>
                <meshStandardMaterial map={texture} color={planet.color} roughness={0.7} />
              </Sphere>

              {planet.hasSaturnRings && <SaturnRings radius={planet.radius} />}

              {planet.hasUranusRings && (
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                  <ringGeometry
                    args={[
                      planet.radius * 0.3 * (planet.ringInner / 1.5),
                      planet.radius * 0.3 * (planet.ringOuter / 1.5),
                      64
                    ]}
                  />
                  <meshStandardMaterial
                    color={planet.ringColor}
                    side={THREE.DoubleSide}
                    transparent
                    opacity={planet.ringOpacity}
                  />
                </mesh>
              )}
            </group>

            {/* Earth's Moon */}
            {planet.hasMoon && <EarthMoon />}

            {/* Planet Label */}
            <Html position={[0, -planet.radius * 0.44, 0]} center>
              <div style={{
                color: 'rgba(255,255,255,0.85)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.4px',
                textShadow: '0 1px 3px rgba(0,0,0,0.95)',
                userSelect: 'none',
                pointerEvents: 'none',
                whiteSpace: 'nowrap'
              }}>
                {planet.name}
              </div>
            </Html>
          </group>
        </group>
      </group>
    </group>
  );
}

// Glowing Sun Component
function TheSun() {
  const sunMap = useTexture(sunMapUrl);
  const sunMeshRef = useRef();

  useFrame((_, delta) => {
    if (sunMeshRef.current) {
      sunMeshRef.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <group>
      <Sphere ref={sunMeshRef} args={[3, 36, 36]} rotation={[0, -Math.PI / 2, 0]}>
        <meshBasicMaterial map={sunMap} color="#fef08a" />
      </Sphere>

      {/* Sun Light Source */}
      <pointLight position={[0, 0, 0]} intensity={550} color="#fef08a" distance={100} decay={2} />

      {/* Corona Inner Glow */}
      <mesh>
        <sphereGeometry args={[3.25, 32, 32]} />
        <meshBasicMaterial
          color="#fef08a"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Corona Outer Radiance */}
      <mesh>
        <sphereGeometry args={[3.55, 32, 32]} />
        <meshBasicMaterial
          color="#f59e0b"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Sun Label */}
      <Html position={[0, -3.7, 0]} center>
        <div style={{
          color: '#fef08a',
          fontSize: '12px',
          fontWeight: 800,
          letterSpacing: '1px',
          textShadow: '0 0 8px rgba(254,240,138,0.7)',
          userSelect: 'none',
          pointerEvents: 'none'
        }}>
          SUN
        </div>
      </Html>
    </group>
  );
}

// Asteroid Belt Component
function AsteroidBelt() {
  const meshRef = useRef();
  const count = 3000;

  useLayoutEffect(() => {
    if (meshRef.current) {
      const dummy = new THREE.Object3D();
      for (let i = 0; i < count; i++) {
        const radius = 13.6 + Math.random() * 1.3;
        const angle = Math.random() * Math.PI * 2;
        const y = (Math.random() - 0.5) * (Math.random() * 1.8);

        dummy.position.set(
          radius * Math.cos(angle),
          y,
          radius * Math.sin(angle)
        );

        dummy.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );

        dummy.scale.set(
          0.02 + Math.random() * 0.055,
          0.02 + Math.random() * 0.038,
          0.02 + Math.random() * 0.075
        );

        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group>
      <instancedMesh ref={meshRef} args={[null, null, count]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#78716c" roughness={1.0} metalness={0.1} />
      </instancedMesh>
      <Html position={[14.2, 1.45, 0]} center>
        <div style={{
          color: '#9ca3af',
          fontSize: '11px',
          fontWeight: 800,
          textShadow: '0 1px 3px #000',
          whiteSpace: 'nowrap',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          userSelect: 'none',
          pointerEvents: 'none'
        }}>
          ASTEROID BELT
        </div>
      </Html>
    </group>
  );
}

// Stage 3 & 4: Educational Gravity & Inertia Visual Balance Overlay
function OrbitalPhysicsVectors({ stage }) {
  // Only display subtle mathematical balance vectors during Step 3 and Step 4
  if (stage !== 3 && stage !== 4) return null;

  return null;
}

export default function SolarSystemSimulation({ stage = 1 }) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      backgroundColor: '#000000',
      overflow: 'hidden'
    }}>
      <Canvas
        camera={{ position: [0, 15, 50], fov: 46 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <Suspense fallback={
          <Html center>
            <div style={{
              color: '#94a3b8',
              fontSize: '13px',
              fontFamily: 'system-ui, sans-serif',
              letterSpacing: '0.5px'
            }}>
              Loading Solar System...
            </div>
          </Html>
        }>
          <color attach="background" args={['#000000']} />
          <ambientLight intensity={0.45} />

          {/* Deep Starfield */}
          <Stars radius={120} depth={60} count={3500} factor={3.5} saturation={0} fade speed={0.5} />

          {/* Central Sun */}
          <TheSun />

          {/* Asteroid Belt */}
          <AsteroidBelt />

          {/* Orbiting Planets with concentric orbit tracks */}
          {PLANETS_CONFIG.map((planet) => (
            <OrbitingPlanet key={planet.name} planet={planet} stage={stage} />
          ))}

          {/* Interactive and Smooth OrbitControls */}
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            maxPolarAngle={Math.PI / 2.05}
            minDistance={16}
            maxDistance={85}
            enableDamping={true}
            dampingFactor={0.06}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
