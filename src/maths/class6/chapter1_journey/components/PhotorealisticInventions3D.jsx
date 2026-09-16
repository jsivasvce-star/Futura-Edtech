import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';

// ============================================================================
// 1. 🚲 PHOTOREALISTIC MODERN BICYCLE SCENE
// ============================================================================
function BicycleModel({ isPlaying = true }) {
  const frontWheelRef = useRef();
  const rearWheelRef = useRef();
  const crankRef = useRef();
  const roadRef = useRef();
  const bikeGroupRef = useRef();

  // Spoke geometry: 18 stainless steel spokes per wheel
  const spokeAngles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => (i * Math.PI * 2) / 18);
  }, []);

  useFrame((state, delta) => {
    if (!isPlaying) return;
    const speed = delta * 7.0; // Realistic wheel rotation speed

    if (frontWheelRef.current) frontWheelRef.current.rotation.x += speed;
    if (rearWheelRef.current) rearWheelRef.current.rotation.x += speed;
    if (crankRef.current) crankRef.current.rotation.x += speed * 0.75;

    // Road texture motion
    if (roadRef.current) {
      roadRef.current.position.z = (roadRef.current.position.z + delta * 5.2) % 4.0;
    }

    // Subtle natural frame sway while pedaling
    if (bikeGroupRef.current) {
      bikeGroupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 4.0) * 0.018;
      bikeGroupRef.current.position.y = Math.sin(state.clock.elapsedTime * 8.0) * 0.008;
    }
  });

  return (
    <group position={[0, -0.45, 0]}>
      {/* ── MOVING ASPHALT ROADWAY ── */}
      <group position={[0, -0.82, 0]}>
        {/* Dark Asphalt Surface */}
        <mesh position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[4.5, 0.05, 14.0]} />
          <meshStandardMaterial color="#1a202c" roughness={0.88} metalness={0.12} />
        </mesh>

        {/* Concrete Curbs */}
        <mesh position={[-2.3, 0.08, 0]} receiveShadow>
          <boxGeometry args={[0.3, 0.16, 14.0]} />
          <meshStandardMaterial color="#475569" roughness={0.9} />
        </mesh>
        <mesh position={[2.3, 0.08, 0]} receiveShadow>
          <boxGeometry args={[0.3, 0.16, 14.0]} />
          <meshStandardMaterial color="#475569" roughness={0.9} />
        </mesh>

        {/* Realistic Yellow Dashed Center Line */}
        <group ref={roadRef}>
          {[-8, -4, 0, 4, 8].map((z, idx) => (
            <mesh key={idx} position={[0, 0.026, z]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.16, 2.2]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.6} />
            </mesh>
          ))}
        </group>
      </group>

      {/* ── BICYCLE BODY ── */}
      <group ref={bikeGroupRef} position={[0, 0, 0]} rotation={[0, -Math.PI / 2.3, 0]}>
        
        {/* REAR WHEEL */}
        <group position={[-1.25, 0, 0]} ref={rearWheelRef}>
          {/* Deep-section Aero Rim */}
          <mesh castShadow>
            <torusGeometry args={[0.78, 0.038, 16, 48]} />
            <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.7} />
          </mesh>
          {/* Rubber Tire with Tread */}
          <mesh>
            <torusGeometry args={[0.82, 0.032, 16, 48]} />
            <meshStandardMaterial color="#05070a" roughness={0.95} metalness={0.05} />
          </mesh>
          {/* Polished Aluminum Hub */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.06, 0.06, 0.16, 16]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.15} />
          </mesh>
          {/* Steel Spokes */}
          {spokeAngles.map((angle, idx) => (
            <mesh key={idx} rotation={[0, 0, angle]}>
              <cylinderGeometry args={[0.0035, 0.0035, 1.56, 6]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.98} roughness={0.1} />
            </mesh>
          ))}
          {/* Rear Cassette Sprockets */}
          <mesh position={[0, 0, 0.05]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.14, 0.14, 0.03, 24]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* FRONT WHEEL */}
        <group position={[1.25, 0, 0]} ref={frontWheelRef}>
          {/* Deep-section Aero Rim */}
          <mesh castShadow>
            <torusGeometry args={[0.78, 0.038, 16, 48]} />
            <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.7} />
          </mesh>
          {/* Rubber Tire */}
          <mesh>
            <torusGeometry args={[0.82, 0.032, 16, 48]} />
            <meshStandardMaterial color="#05070a" roughness={0.95} metalness={0.05} />
          </mesh>
          {/* Hub */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.055, 0.055, 0.14, 16]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.15} />
          </mesh>
          {/* Spokes */}
          {spokeAngles.map((angle, idx) => (
            <mesh key={idx} rotation={[0, 0, angle]}>
              <cylinderGeometry args={[0.0035, 0.0035, 1.56, 6]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.98} roughness={0.1} />
            </mesh>
          ))}
        </group>

        {/* ── METALLIC DIAMOND BICYCLE FRAME ── */}
        {/* Top Tube */}
        <mesh position={[0.05, 0.72, 0]} rotation={[0, 0, -0.08]} castShadow>
          <cylinderGeometry args={[0.032, 0.032, 1.35, 16]} />
          <meshStandardMaterial color="#0284c7" metalness={0.88} roughness={0.18} />
        </mesh>

        {/* Down Tube */}
        <mesh position={[0.08, 0.28, 0]} rotation={[0, 0, -0.74]} castShadow>
          <cylinderGeometry args={[0.042, 0.042, 1.45, 16]} />
          <meshStandardMaterial color="#0284c7" metalness={0.88} roughness={0.18} />
        </mesh>

        {/* Seat Tube */}
        <mesh position={[-0.45, 0.45, 0]} rotation={[0, 0, 0.32]} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 1.15, 16]} />
          <meshStandardMaterial color="#0284c7" metalness={0.88} roughness={0.18} />
        </mesh>

        {/* Chain Stays (Rear Hub to Bottom Bracket) */}
        <mesh position={[-0.72, -0.05, 0.045]} rotation={[0, 0.05, -0.1]} castShadow>
          <cylinderGeometry args={[0.022, 0.022, 1.12, 12]} />
          <meshStandardMaterial color="#0369a1" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[-0.72, -0.05, -0.045]} rotation={[0, -0.05, -0.1]} castShadow>
          <cylinderGeometry args={[0.022, 0.022, 1.12, 12]} />
          <meshStandardMaterial color="#0369a1" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Seat Stays (Rear Hub to Seat Cluster) */}
        <mesh position={[-0.85, 0.42, 0.045]} rotation={[0, 0.04, -0.56]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 1.15, 12]} />
          <meshStandardMaterial color="#0369a1" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[-0.85, 0.42, -0.045]} rotation={[0, -0.04, -0.56]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 1.15, 12]} />
          <meshStandardMaterial color="#0369a1" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Front Fork */}
        <group position={[1.1, 0.38, 0]} rotation={[0, 0, 0.32]}>
          <mesh position={[0, -0.38, 0.05]} castShadow>
            <cylinderGeometry args={[0.025, 0.025, 0.85, 12]} />
            <meshStandardMaterial color="#0284c7" metalness={0.85} roughness={0.2} />
          </mesh>
          <mesh position={[0, -0.38, -0.05]} castShadow>
            <cylinderGeometry args={[0.025, 0.025, 0.85, 12]} />
            <meshStandardMaterial color="#0284c7" metalness={0.85} roughness={0.2} />
          </mesh>
          {/* Steerer Tube */}
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.032, 0.032, 0.35, 16]} />
            <meshStandardMaterial color="#0f172a" roughness={0.3} />
          </mesh>
        </group>

        {/* Handlebars & Stem */}
        <group position={[0.74, 0.88, 0]}>
          {/* Stem */}
          <mesh position={[-0.06, -0.04, 0]} rotation={[0, 0, 0.4]}>
            <cylinderGeometry args={[0.025, 0.025, 0.14, 12]} />
            <meshStandardMaterial color="#0f172a" roughness={0.3} />
          </mesh>
          {/* Handlebar Crossbar */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.65, 16]} />
            <meshStandardMaterial color="#0f172a" roughness={0.4} />
          </mesh>
          {/* Rubber Grips */}
          <mesh position={[0, 0, 0.28]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.026, 0.026, 0.14, 16]} />
            <meshStandardMaterial color="#334155" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0, -0.28]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.026, 0.026, 0.14, 16]} />
            <meshStandardMaterial color="#334155" roughness={0.9} />
          </mesh>
        </group>

        {/* Saddle & Seatpost */}
        <group position={[-0.58, 0.85, 0]}>
          {/* Seatpost */}
          <mesh position={[0.04, -0.12, 0]} rotation={[0, 0, 0.32]}>
            <cylinderGeometry args={[0.024, 0.024, 0.32, 12]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Racing Saddle */}
          <mesh position={[-0.04, 0.05, 0]} rotation={[0, 0, -0.05]}>
            <boxGeometry args={[0.36, 0.06, 0.16]} />
            <meshStandardMaterial color="#0f172a" roughness={0.7} />
          </mesh>
        </group>

        {/* Crankset & Pedals (Rotates with Crank) */}
        <group position={[-0.22, -0.12, 0]} ref={crankRef}>
          {/* Front Chainring Gear */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.2, 0.2, 0.02, 32]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.15} />
          </mesh>
          {/* Right Crank Arm & Pedal */}
          <mesh position={[0, 0.14, 0.09]}>
            <boxGeometry args={[0.03, 0.28, 0.02]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
          </mesh>
          <mesh position={[0, 0.26, 0.14]}>
            <boxGeometry args={[0.1, 0.03, 0.09]} />
            <meshStandardMaterial color="#1e293b" roughness={0.8} />
          </mesh>
          {/* Left Crank Arm & Pedal */}
          <mesh position={[0, -0.14, -0.09]}>
            <boxGeometry args={[0.03, 0.28, 0.02]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
          </mesh>
          <mesh position={[0, -0.26, -0.14]}>
            <boxGeometry args={[0.1, 0.03, 0.09]} />
            <meshStandardMaterial color="#1e293b" roughness={0.8} />
          </mesh>
        </group>
      </group>

      {/* Realistic Soft Contact Shadow on Asphalt */}
      <ContactShadows position={[0, -0.8, 0]} opacity={0.75} scale={4.5} blur={1.4} far={2.0} />
    </group>
  );
}

// ============================================================================
// 2. 🚆 PHOTOREALISTIC HIGH-SPEED BULLET TRAIN SCENE
// ============================================================================
function TrainModel({ isPlaying = true }) {
  const trainGroupRef = useRef();
  const trackMotionRef = useRef();

  useFrame((state, delta) => {
    if (!isPlaying) return;
    const speed = delta * 12.0;

    // Fast track motion rushing backwards
    if (trackMotionRef.current) {
      trackMotionRef.current.position.z = (trackMotionRef.current.position.z + speed) % 2.5;
    }

    // High-speed subtle train vibration and sway
    if (trainGroupRef.current) {
      trainGroupRef.current.position.y = Math.sin(state.clock.elapsedTime * 14.0) * 0.006;
      trainGroupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 3.5) * 0.008;
    }
  });

  return (
    <group position={[0, -0.3, 0]}>
      {/* ── REALISTIC RAILWAY TRACK SYSTEM ── */}
      <group position={[0, -0.65, 0]}>
        {/* Ballast Gravel Bed */}
        <mesh position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[3.8, 0.2, 16.0]} />
          <meshStandardMaterial color="#334155" roughness={0.95} />
        </mesh>

        {/* Polished Continuous Steel Rails */}
        <mesh position={[-0.85, 0.16, 0]} castShadow>
          <boxGeometry args={[0.07, 0.12, 16.0]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.96} roughness={0.12} />
        </mesh>
        <mesh position={[0.85, 0.16, 0]} castShadow>
          <boxGeometry args={[0.07, 0.12, 16.0]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.96} roughness={0.12} />
        </mesh>

        {/* Concrete Cross Sleepers (Moving Rushing Backwards) */}
        <group ref={trackMotionRef}>
          {Array.from({ length: 24 }).map((_, i) => (
            <mesh key={i} position={[0, 0.08, -10 + i * 1.0]} receiveShadow>
              <boxGeometry args={[2.5, 0.08, 0.22]} />
              <meshStandardMaterial color="#475569" roughness={0.85} />
            </mesh>
          ))}
        </group>

        {/* Overhead Catenary Power Poles */}
        {[-6, 0, 6].map((z, idx) => (
          <group key={idx} position={[1.85, 1.4, z]}>
            <mesh>
              <cylinderGeometry args={[0.05, 0.06, 3.2, 12]} />
              <meshStandardMaterial color="#64748b" metalness={0.8} />
            </mesh>
            <mesh position={[-0.9, 1.4, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.03, 0.03, 1.9, 8]} />
              <meshStandardMaterial color="#64748b" metalness={0.8} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ── HIGH-SPEED STREAMLINED TRAIN COACHES ── */}
      <group ref={trainGroupRef} position={[0, 0.05, 0]}>
        {/* LEAD LOCOMOTIVE (AERODYNAMIC BULLET NOSE) */}
        <group position={[0, 0, 1.2]}>
          {/* Main Aerodynamic Body Shell */}
          <mesh position={[0, 0.25, 0]} castShadow>
            <boxGeometry args={[1.5, 1.15, 3.8]} />
            <meshStandardMaterial color="#f8fafc" metalness={0.65} roughness={0.18} />
          </mesh>

          {/* Aerodynamic Tapered Nose */}
          <mesh position={[0, 0.08, 2.25]} rotation={[0.42, 0, 0]} castShadow>
            <boxGeometry args={[1.46, 0.95, 1.2]} />
            <meshStandardMaterial color="#f8fafc" metalness={0.65} roughness={0.18} />
          </mesh>

          {/* Sleek Bullet Train Cockpit Windshield (Tinted Glass) */}
          <mesh position={[0, 0.45, 2.05]} rotation={[0.55, 0, 0]}>
            <boxGeometry args={[1.25, 0.38, 0.55]} />
            <meshStandardMaterial color="#0f172a" roughness={0.05} metalness={0.9} />
          </mesh>

          {/* Electric Blue Speed Racing Stripe */}
          <mesh position={[0, 0.1, 0.1]}>
            <boxGeometry args={[1.52, 0.18, 4.2]} />
            <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* Panoramic Passenger Window Strip */}
          <mesh position={[0.76, 0.42, -0.4]}>
            <boxGeometry args={[0.02, 0.28, 2.8]} />
            <meshStandardMaterial color="#020617" roughness={0.1} />
          </mesh>
          <mesh position={[-0.76, 0.42, -0.4]}>
            <boxGeometry args={[0.02, 0.28, 2.8]} />
            <meshStandardMaterial color="#020617" roughness={0.1} />
          </mesh>

          {/* Headlights (Bright Warm Beams) */}
          <mesh position={[-0.45, -0.15, 2.7]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={2.5} />
          </mesh>
          <mesh position={[0.45, -0.15, 2.7]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={2.5} />
          </mesh>

          {/* Roof Pantograph (Power Collector) */}
          <group position={[0, 0.95, -1.2]}>
            <mesh>
              <boxGeometry args={[0.5, 0.04, 0.6]} />
              <meshStandardMaterial color="#334155" metalness={0.8} />
            </mesh>
            <mesh position={[0, 0.22, 0]} rotation={[0.4, 0, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 0.55, 8]} />
              <meshStandardMaterial color="#dc2626" metalness={0.8} />
            </mesh>
          </group>
        </group>

        {/* PASSENGER COACH 2 */}
        <group position={[0, 0.25, -2.8]}>
          <mesh castShadow>
            <boxGeometry args={[1.5, 1.15, 3.8]} />
            <meshStandardMaterial color="#f8fafc" metalness={0.65} roughness={0.18} />
          </mesh>
          {/* Stripe */}
          <mesh position={[0, -0.15, 0]}>
            <boxGeometry args={[1.52, 0.18, 3.82]} />
            <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Windows */}
          <mesh position={[0.76, 0.17, 0]}>
            <boxGeometry args={[0.02, 0.28, 3.5]} />
            <meshStandardMaterial color="#020617" roughness={0.1} />
          </mesh>
          <mesh position={[-0.76, 0.17, 0]}>
            <boxGeometry args={[0.02, 0.28, 3.5]} />
            <meshStandardMaterial color="#020617" roughness={0.1} />
          </mesh>
        </group>

        {/* Steel Train Bogie Wheels */}
        {[-3.8, -1.8, 0.5, 2.0].map((z, idx) => (
          <group key={idx} position={[0, -0.42, z]}>
            <mesh position={[-0.85, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.22, 0.22, 0.08, 24]} />
              <meshStandardMaterial color="#475569" metalness={0.92} roughness={0.2} />
            </mesh>
            <mesh position={[0.85, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.22, 0.22, 0.08, 24]} />
              <meshStandardMaterial color="#475569" metalness={0.92} roughness={0.2} />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.05, 0.05, 1.75, 12]} />
              <meshStandardMaterial color="#334155" metalness={0.9} />
            </mesh>
          </group>
        ))}
      </group>

      <ContactShadows position={[0, -0.6, 0]} opacity={0.85} scale={6.5} blur={1.5} far={2.5} />
    </group>
  );
}

// ============================================================================
// 3. 🚗 PHOTOREALISTIC MODERN CAR SCENE
// ============================================================================
function CarModel({ isPlaying = true }) {
  const wheelsRef = useRef([]);
  const roadMarksRef = useRef();
  const carBodyRef = useRef();

  useFrame((state, delta) => {
    if (!isPlaying) return;
    const speed = delta * 14.0;

    // Fast alloy wheel rotation
    wheelsRef.current.forEach((w) => {
      if (w) w.rotation.x += speed;
    });

    // Highway road dashes rushing past
    if (roadMarksRef.current) {
      roadMarksRef.current.position.z = (roadMarksRef.current.position.z + speed * 0.6) % 3.0;
    }

    // Dynamic car chassis suspension response
    if (carBodyRef.current) {
      carBodyRef.current.position.y = Math.sin(state.clock.elapsedTime * 12.0) * 0.007;
      carBodyRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 6.0) * 0.005;
    }
  });

  return (
    <group position={[0, -0.4, 0]}>
      {/* ── ASPHALT HIGHWAY ── */}
      <group position={[0, -0.6, 0]}>
        <mesh position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[4.2, 0.06, 12.0]} />
          <meshStandardMaterial color="#111827" roughness={0.88} />
        </mesh>
        {/* Moving White Lane Dashes */}
        <group ref={roadMarksRef}>
          {[-6, -3, 0, 3, 6].map((z, idx) => (
            <mesh key={idx} position={[0, 0.035, z]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.18, 1.6]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.5} />
            </mesh>
          ))}
        </group>
      </group>

      {/* ── CAR MODEL (LUXURY SPORT COUPE) ── */}
      <group ref={carBodyRef} position={[0, 0, 0]} rotation={[0, -Math.PI / 1.8, 0]}>
        {/* Lower Chassis / Side Sills */}
        <mesh position={[0, 0.05, 0]} castShadow>
          <boxGeometry args={[3.6, 0.42, 1.68]} />
          <meshStandardMaterial color="#b91c1c" metalness={0.88} roughness={0.16} />
        </mesh>

        {/* Sculpted Hood & Trunk Taper */}
        <mesh position={[0.78, 0.16, 0]} rotation={[0, 0, -0.08]} castShadow>
          <boxGeometry args={[1.7, 0.32, 1.64]} />
          <meshStandardMaterial color="#dc2626" metalness={0.9} roughness={0.14} />
        </mesh>
        <mesh position={[-0.95, 0.22, 0]} rotation={[0, 0, 0.06]} castShadow>
          <boxGeometry args={[1.2, 0.32, 1.62]} />
          <meshStandardMaterial color="#dc2626" metalness={0.9} roughness={0.14} />
        </mesh>

        {/* Aerodynamic Glass Cabin (Windshield, Roof, Windows) */}
        <mesh position={[-0.1, 0.52, 0]} castShadow>
          <boxGeometry args={[1.75, 0.48, 1.45]} />
          <meshStandardMaterial color="#090d16" roughness={0.08} metalness={0.92} />
        </mesh>

        {/* Front Projector LED Headlights */}
        <mesh position={[1.68, 0.12, 0.58]}>
          <boxGeometry args={[0.1, 0.1, 0.35]} />
          <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={3.0} />
        </mesh>
        <mesh position={[1.68, 0.12, -0.58]}>
          <boxGeometry args={[0.1, 0.1, 0.35]} />
          <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={3.0} />
        </mesh>

        {/* Rear LED Taillight Bar */}
        <mesh position={[-1.76, 0.22, 0]}>
          <boxGeometry args={[0.08, 0.08, 1.48]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2.5} />
        </mesh>

        {/* Side Mirrors */}
        <mesh position={[0.62, 0.45, 0.82]}>
          <boxGeometry args={[0.16, 0.08, 0.12]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh position={[0.62, 0.45, -0.82]}>
          <boxGeometry args={[0.16, 0.08, 0.12]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>

        {/* 4 ALLOY WHEELS WITH RUBBER TIRES */}
        {[
          { pos: [1.12, -0.16, 0.82], idx: 0 },
          { pos: [1.12, -0.16, -0.82], idx: 1 },
          { pos: [-1.15, -0.16, 0.82], idx: 2 },
          { pos: [-1.15, -0.16, -0.82], idx: 3 }
        ].map(({ pos, idx }) => (
          <group
            key={idx}
            position={pos}
            ref={(el) => (wheelsRef.current[idx] = el)}
          >
            {/* Rubber Tire */}
            <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.34, 0.34, 0.22, 28]} />
              <meshStandardMaterial color="#0a0e17" roughness={0.92} />
            </mesh>
            {/* Sport Multi-spoke Alloy Rim */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.26, 0.26, 0.23, 24]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.92} roughness={0.2} />
            </mesh>
            {/* Red Brake Caliper */}
            <mesh position={[0.12, 0, 0]}>
              <boxGeometry args={[0.1, 0.14, 0.08]} />
              <meshStandardMaterial color="#ef4444" />
            </mesh>
          </group>
        ))}
      </group>

      <ContactShadows position={[0, -0.58, 0]} opacity={0.82} scale={5.0} blur={1.4} far={2.0} />
    </group>
  );
}

// ============================================================================
// 4. ✈️ PHOTOREALISTIC COMMERCIAL AIRPLANE SCENE
// ============================================================================
function AirplaneModel({ isPlaying = true }) {
  const planeRef = useRef();
  const cloudsRef = useRef();
  const fanRef1 = useRef();
  const fanRef2 = useRef();

  useFrame((state, delta) => {
    if (!isPlaying) return;
    const time = state.clock.elapsedTime;

    // Majestic flight banking motion
    if (planeRef.current) {
      planeRef.current.position.y = Math.sin(time * 0.8) * 0.12;
      planeRef.current.rotation.z = Math.sin(time * 0.6) * 0.06; // Gentle bank
      planeRef.current.rotation.x = Math.sin(time * 0.4) * 0.03; // Pitch
    }

    // Turbofan high-speed blade spinning
    if (fanRef1.current) fanRef1.current.rotation.z += delta * 24.0;
    if (fanRef2.current) fanRef2.current.rotation.z += delta * 24.0;

    // Atmospheric clouds drifting smoothly below
    if (cloudsRef.current) {
      cloudsRef.current.position.z = (cloudsRef.current.position.z + delta * 3.5) % 8.0;
    }
  });

  return (
    <group position={[0, 0.1, 0]}>
      {/* ── DRIFTING 3D VOLUMETRIC CLOUDS (BELOW IN STRATOSPHERE) ── */}
      <group ref={cloudsRef} position={[0, -1.8, 0]}>
        {[-8, -4, 0, 4, 8].map((z, idx) => (
          <group key={idx} position={[(idx % 2 === 0 ? -1.8 : 1.8), 0, z]}>
            <mesh>
              <sphereGeometry args={[1.2, 16, 16]} />
              <meshStandardMaterial color="#f1f5f9" roughness={0.9} transparent opacity={0.45} />
            </mesh>
            <mesh position={[0.7, -0.2, 0.4]}>
              <sphereGeometry args={[0.9, 14, 14]} />
              <meshStandardMaterial color="#e2e8f0" roughness={0.95} transparent opacity={0.4} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ── COMMERCIAL JET AIRLINER ── */}
      <group ref={planeRef} position={[0, 0, 0]} rotation={[0, -Math.PI / 2.2, 0]}>
        {/* Main Cylindrical Pressurized Fuselage */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.42, 0.42, 4.2, 32]} />
          <meshStandardMaterial color="#ffffff" metalness={0.65} roughness={0.18} />
        </mesh>

        {/* Aerodynamic Nose Cone (Radome) */}
        <mesh position={[2.35, 0, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
          <coneGeometry args={[0.42, 0.75, 32]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.65} roughness={0.18} />
        </mesh>

        {/* Cockpit Windshield (Curved Polarized Glass) */}
        <mesh position={[2.15, 0.18, 0]} rotation={[0, 0, -0.4]}>
          <boxGeometry args={[0.3, 0.18, 0.45]} />
          <meshStandardMaterial color="#0284c7" roughness={0.05} metalness={0.92} />
        </mesh>

        {/* Passenger Cabin Windows Strip */}
        <mesh position={[0.2, 0.12, 0.42]}>
          <boxGeometry args={[3.1, 0.08, 0.02]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} />
        </mesh>
        <mesh position={[0.2, 0.12, -0.42]}>
          <boxGeometry args={[3.1, 0.08, 0.02]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} />
        </mesh>

        {/* SWEPT-BACK MAIN WINGS */}
        {/* Right Wing */}
        <group position={[0.3, -0.06, 1.85]} rotation={[0, -0.42, 0.08]}>
          <mesh castShadow>
            <boxGeometry args={[0.85, 0.05, 3.2]} />
            <meshStandardMaterial color="#f1f5f9" metalness={0.68} roughness={0.2} />
          </mesh>
          {/* Vertical Winglet */}
          <mesh position={[0, 0.22, 1.58]} rotation={[0, 0, 0.35]}>
            <boxGeometry args={[0.35, 0.45, 0.04]} />
            <meshStandardMaterial color="#0284c7" metalness={0.8} />
          </mesh>
        </group>

        {/* Left Wing */}
        <group position={[0.3, -0.06, -1.85]} rotation={[0, 0.42, -0.08]}>
          <mesh castShadow>
            <boxGeometry args={[0.85, 0.05, 3.2]} />
            <meshStandardMaterial color="#f1f5f9" metalness={0.68} roughness={0.2} />
          </mesh>
          {/* Vertical Winglet */}
          <mesh position={[0, 0.22, -1.58]} rotation={[0, 0, -0.35]}>
            <boxGeometry args={[0.35, 0.45, 0.04]} />
            <meshStandardMaterial color="#0284c7" metalness={0.8} />
          </mesh>
        </group>

        {/* TURBOFAN ENGINES */}
        {/* Right Engine */}
        <group position={[0.45, -0.38, 1.15]} rotation={[0, 0, Math.PI / 2]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.22, 0.24, 0.85, 24]} />
            <meshStandardMaterial color="#475569" metalness={0.85} roughness={0.2} />
          </mesh>
          {/* Spinning Fan Blades */}
          <group position={[0, 0.4, 0]} ref={fanRef1}>
            <cylinderGeometry args={[0.18, 0.18, 0.04, 16]} />
            <meshStandardMaterial color="#0f172a" metalness={0.9} />
          </group>
        </group>

        {/* Left Engine */}
        <group position={[0.45, -0.38, -1.15]} rotation={[0, 0, Math.PI / 2]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.22, 0.24, 0.85, 24]} />
            <meshStandardMaterial color="#475569" metalness={0.85} roughness={0.2} />
          </mesh>
          {/* Spinning Fan Blades */}
          <group position={[0, 0.4, 0]} ref={fanRef2}>
            <cylinderGeometry args={[0.18, 0.18, 0.04, 16]} />
            <meshStandardMaterial color="#0f172a" metalness={0.9} />
          </group>
        </group>

        {/* SWEPT EMPENNAGE (TAIL ASSEMBLY) */}
        {/* Vertical Tail Fin */}
        <group position={[-1.85, 0.72, 0]} rotation={[0, 0, -0.55]}>
          <mesh castShadow>
            <boxGeometry args={[0.7, 1.35, 0.06]} />
            <meshStandardMaterial color="#0284c7" metalness={0.75} roughness={0.2} />
          </mesh>
        </group>
        {/* Horizontal Stabilizers */}
        <mesh position={[-1.9, 0.12, 0]} castShadow>
          <boxGeometry args={[0.65, 0.04, 1.8]} />
          <meshStandardMaterial color="#f1f5f9" metalness={0.65} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

// ============================================================================
// 5. 🏗️ PHOTOREALISTIC BUILDINGS & BRIDGES SCENE
// ============================================================================
function BridgeArchitectureModel({ isPlaying = true }) {
  const waterRef = useRef();
  const vehicleRef = useRef();
  const scenePanRef = useRef();

  useFrame((state, delta) => {
    if (!isPlaying) return;
    const time = state.clock.elapsedTime;

    // Realistic water shimmer
    if (waterRef.current) {
      waterRef.current.rotation.z = Math.sin(time * 0.8) * 0.012;
    }

    // Moving bridge vehicle
    if (vehicleRef.current) {
      vehicleRef.current.position.x = ((time * 1.8) % 7.0) - 3.5;
    }

    // Subtle slow cinematic architectural panning
    if (scenePanRef.current) {
      scenePanRef.current.rotation.y = Math.sin(time * 0.25) * 0.08;
    }
  });

  return (
    <group ref={scenePanRef} position={[0, -0.45, 0]}>
      {/* ── REALISTIC DEEP RIVER WATER ── */}
      <mesh ref={waterRef} position={[0, -1.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14.0, 10.0, 32, 32]} />
        <meshStandardMaterial color="#0369a1" roughness={0.12} metalness={0.88} />
      </mesh>

      {/* ── CONCRETE BRIDGE PIERS ── */}
      <mesh position={[-2.4, -0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.75, 1.4, 1.8]} />
        <meshStandardMaterial color="#64748b" roughness={0.85} />
      </mesh>
      <mesh position={[2.4, -0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.75, 1.4, 1.8]} />
        <meshStandardMaterial color="#64748b" roughness={0.85} />
      </mesh>

      {/* ── BRIDGE ROADWAY DECK ── */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[6.8, 0.16, 1.5]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>

      {/* ── GEOMETRIC STEEL TRUSS FRAMEWORK (WARREN TRUSS) ── */}
      {/* Heavy Steel Longitudinal I-Beams (Top Chords) */}
      <mesh position={[0, 1.35, 0.72]}>
        <boxGeometry args={[5.2, 0.08, 0.08]} />
        <meshStandardMaterial color="#d97706" metalness={0.92} roughness={0.25} />
      </mesh>
      <mesh position={[0, 1.35, -0.72]}>
        <boxGeometry args={[5.2, 0.08, 0.08]} />
        <meshStandardMaterial color="#d97706" metalness={0.92} roughness={0.25} />
      </mesh>

      {/* Diagonal Triangular Truss Struts */}
      {[-2.0, -1.0, 0, 1.0, 2.0].map((x, idx) => {
        const isOdd = idx % 2 === 1;
        return (
          <group key={idx}>
            {/* Front Truss Side */}
            <mesh position={[x, 0.78, 0.72]} rotation={[0, 0, isOdd ? 0.72 : -0.72]}>
              <cylinderGeometry args={[0.038, 0.038, 1.45, 12]} />
              <meshStandardMaterial color="#b45309" metalness={0.9} roughness={0.28} />
            </mesh>
            {/* Back Truss Side */}
            <mesh position={[x, 0.78, -0.72]} rotation={[0, 0, isOdd ? 0.72 : -0.72]}>
              <cylinderGeometry args={[0.038, 0.038, 1.45, 12]} />
              <meshStandardMaterial color="#b45309" metalness={0.9} roughness={0.28} />
            </mesh>
            {/* Overhead Transverse Bracing Struts */}
            <mesh position={[x, 1.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.03, 0.03, 1.44, 8]} />
              <meshStandardMaterial color="#d97706" metalness={0.88} />
            </mesh>
          </group>
        );
      })}

      {/* Moving Vehicle on Bridge Deck */}
      <group ref={vehicleRef} position={[0, 0.35, 0.25]}>
        <mesh castShadow>
          <boxGeometry args={[0.8, 0.24, 0.38]} />
          <meshStandardMaterial color="#0284c7" metalness={0.8} />
        </mesh>
        <mesh position={[0.2, 0.18, 0]} castShadow>
          <boxGeometry args={[0.38, 0.16, 0.34]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>

      {/* ── CITY SKYLINE BACKGROUND (GEOMETRIC SKYSCRAPERS) ── */}
      <group position={[0, 0.8, -3.2]}>
        {/* Modern Tower 1 (Faceted Glass) */}
        <mesh position={[-2.8, 0.9, 0]} castShadow>
          <boxGeometry args={[1.2, 3.8, 1.2]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.88} roughness={0.12} />
        </mesh>
        {/* Skyscraper Spire */}
        <mesh position={[-2.8, 3.0, 0]}>
          <coneGeometry args={[0.08, 1.2, 8]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.95} />
        </mesh>

        {/* Modern Tower 2 (High-rise Glass & Steel) */}
        <mesh position={[-1.2, 1.4, -0.6]} castShadow>
          <boxGeometry args={[1.4, 4.8, 1.4]} />
          <meshStandardMaterial color="#0284c7" metalness={0.85} roughness={0.15} />
        </mesh>

        {/* Modern Tower 3 (Angular Geometric Facade) */}
        <mesh position={[1.4, 1.1, -0.4]} rotation={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[1.3, 4.2, 1.1]} />
          <meshStandardMaterial color="#0ea5e9" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Tower 4 */}
        <mesh position={[3.0, 0.7, 0]} castShadow>
          <boxGeometry args={[1.1, 3.2, 1.1]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.25} />
        </mesh>
      </group>

      <ContactShadows position={[0, 0.15, 0]} opacity={0.65} scale={5.5} blur={1.2} />
    </group>
  );
}

// ============================================================================
// 6. 📱 PHOTOREALISTIC MODERN TECHNOLOGY SCENE
// ============================================================================
function TechnologyModel({ isPlaying = true }) {
  const phoneRef = useRef();
  const chipRef = useRef();
  const pulseGroupRef = useRef();

  useFrame((state, delta) => {
    if (!isPlaying) return;
    const time = state.clock.elapsedTime;

    // Elegant product-commercial showcase rotation
    if (phoneRef.current) {
      phoneRef.current.rotation.y = -0.3 + Math.sin(time * 0.7) * 0.18;
      phoneRef.current.position.y = Math.sin(time * 1.2) * 0.04;
    }

    if (chipRef.current) {
      chipRef.current.rotation.y = 0.4 + Math.cos(time * 0.6) * 0.15;
      chipRef.current.position.y = -0.15 + Math.cos(time * 1.1) * 0.03;
    }

    if (pulseGroupRef.current) {
      pulseGroupRef.current.rotation.z = time * 0.3;
    }
  });

  return (
    <group position={[0, -0.1, 0]}>
      {/* Reflective Studio Display Pedestal */}
      <mesh position={[0, -1.05, 0]} receiveShadow>
        <cylinderGeometry args={[3.2, 3.4, 0.2, 48]} />
        <meshStandardMaterial color="#090d16" roughness={0.2} metalness={0.85} />
      </mesh>

      {/* ── 1. MODERN ULTRA-SLIM SMARTPHONE ── */}
      <group ref={phoneRef} position={[-0.85, 0.2, 0]} rotation={[0.08, -0.3, 0]}>
        {/* Titanium Frame Chassis */}
        <mesh castShadow>
          <boxGeometry args={[1.35, 2.75, 0.12]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.96} roughness={0.16} />
        </mesh>

        {/* Curved Glass Back (Matte Ceramic) */}
        <mesh position={[0, 0, -0.062]}>
          <boxGeometry args={[1.33, 2.73, 0.01]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.4} />
        </mesh>

        {/* Edge-to-Edge High-Res OLED Display Screen */}
        <mesh position={[0, 0, 0.062]}>
          <boxGeometry args={[1.31, 2.71, 0.01]} />
          <meshStandardMaterial color="#020617" roughness={0.05} metalness={0.95} />
        </mesh>

        {/* Glowing Screen Content / Real-time User Interface */}
        <mesh position={[0, 0.1, 0.068]}>
          <planeGeometry args={[1.2, 2.3]} />
          <meshStandardMaterial color="#0284c7" emissive="#0369a1" emissiveIntensity={0.65} roughness={0.1} />
        </mesh>

        {/* Camera Island & Triple Lenses */}
        <group position={[-0.35, 0.85, -0.08]}>
          <mesh>
            <boxGeometry args={[0.48, 0.65, 0.06]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} />
          </mesh>
          {[-0.18, 0.0, 0.18].map((y, i) => (
            <mesh key={i} position={[0, y, -0.04]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.04, 20]} />
              <meshStandardMaterial color="#0284c7" metalness={0.95} roughness={0.05} />
            </mesh>
          ))}
        </group>
      </group>

      {/* ── 2. HIGH-PERFORMANCE SILICON PROCESSOR CHIP ── */}
      <group ref={chipRef} position={[1.1, 0.1, 0.2]} rotation={[0.2, 0.4, -0.1]}>
        {/* Silicon Package Substrate */}
        <mesh castShadow>
          <boxGeometry args={[1.65, 1.65, 0.08]} />
          <meshStandardMaterial color="#090d16" roughness={0.4} metalness={0.7} />
        </mesh>

        {/* Polished Metallic Heat Spreader (Die Cap) */}
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[1.35, 1.35, 0.04]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.98} roughness={0.12} />
        </mesh>

        {/* Golden Logic Interconnect Pins */}
        {[-0.72, -0.48, -0.24, 0, 0.24, 0.48, 0.72].map((x, i) => (
          <group key={i}>
            <mesh position={[x, -0.85, 0]}>
              <boxGeometry args={[0.06, 0.12, 0.04]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.99} roughness={0.1} />
            </mesh>
            <mesh position={[x, 0.85, 0]}>
              <boxGeometry args={[0.06, 0.12, 0.04]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.99} roughness={0.1} />
            </mesh>
          </group>
        ))}

        {/* Glowing Micro-Circuit Die Patterns */}
        <mesh position={[0, 0, 0.075]}>
          <planeGeometry args={[1.0, 1.0]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={1.4} wireframe />
        </mesh>
      </group>

      {/* Futuristic Orbiting Logic Pulse Rings */}
      <group ref={pulseGroupRef} position={[0, 0.1, 0]}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.2, 0.012, 16, 64]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.8} transparent opacity={0.65} />
        </mesh>
        <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
          <torusGeometry args={[2.0, 0.01, 16, 64]} />
          <meshStandardMaterial color="#f43f5e" emissive="#f43f5e" emissiveIntensity={1.8} transparent opacity={0.5} />
        </mesh>
      </group>

      <ContactShadows position={[0, -0.95, 0]} opacity={0.8} scale={5.5} blur={1.5} far={2.0} />
    </group>
  );
}

// ============================================================================
// MAIN EXPORTED COMPONENT: PHOTOREALISTIC 3D THEATER
// ============================================================================
export default function PhotorealisticInventions3D({
  activeId = 'bicycles',
  subMode = 'train', // 'train' | 'car' for trains_cars
  isPlaying = true
}) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <Canvas
        camera={{ position: [0, 0.8, 4.2], fov: 42 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15
        }}
        style={{ width: '100%', height: '100%', background: '#070b14' }}
      >
        {/* ── CINEMATIC STUDIO LIGHTING RIG ── */}
        <color attach="background" args={['#070b14']} />
        <ambientLight intensity={0.8} />
        
        {/* Key Sunlight / Studio Rim */}
        <directionalLight
          position={[5, 8, 4]}
          intensity={1.8}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={0.5}
          shadow-camera-far={25}
        />
        {/* Cool Blue Fill Light */}
        <directionalLight position={[-5, 3, -3]} intensity={0.9} color="#38bdf8" />
        {/* Warm Rim Highlight */}
        <pointLight position={[0, 4, -4]} intensity={1.2} color="#fef08a" />

        {/* ── 3D SCENE SWITCHER ── */}
        {activeId === 'bicycles' && <BicycleModel isPlaying={isPlaying} />}
        {activeId === 'trains_cars' && subMode === 'train' && <TrainModel isPlaying={isPlaying} />}
        {activeId === 'trains_cars' && subMode === 'car' && <CarModel isPlaying={isPlaying} />}
        {activeId === 'planes' && <AirplaneModel isPlaying={isPlaying} />}
        {activeId === 'buildings' && <BridgeArchitectureModel isPlaying={isPlaying} />}
        {activeId === 'technology' && <TechnologyModel isPlaying={isPlaying} />}

        {/* Interactive Smooth 3D Orbit Dragging */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.95}
          minPolarAngle={Math.PI / 6}
          rotateSpeed={0.85}
        />
      </Canvas>
    </div>
  );
}
