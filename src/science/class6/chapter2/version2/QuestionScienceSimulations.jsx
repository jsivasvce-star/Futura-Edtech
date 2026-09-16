import React, { useState, useEffect } from 'react';
import { Play, Pause, FastForward, Activity } from 'lucide-react';

// High-Resolution Photographic Specimen Assets (Real Documentary Quality)
import wheatKidneyBeansImg from '../../../../assets/wheat_and_kidney_beans.jpg';
import animalsEcosystemImg from '../../../../assets/activity_animals_image.png';
import radishTaprootImg from '../../../../assets/radish_taproot_macro.jpg';
import mountainPlainsGoatImg from '../../../../assets/mountain_and_plains_goat.jpg';
import sacredGroveImg from '../../../../assets/sacred_grove.png';
import leafVenationImg from '../../../../assets/ch2_leaf_venation_macro.jpg';
import hibiscusShrubImg from '../../../../assets/rose_shrub_ultra.jpg';
import rootSystemsImg from '../../../../assets/ch2_root_systems_macro.jpg';
import duckWebbedFeetImg from '../../../../assets/duck_webbed_feet_macro.jpg';
import girCowImg from '../../../../assets/wildlife/gir_cow.jpg';

/**
 * Photorealistic Documentary 10-Second Scientific Simulation Lab
 * Zero text on the image - all controls and scientific takeaways are positioned
 * outside the visual stage in dedicated header/footer bars.
 */

export default function QuestionScienceSimulations({
  questionId,
  onComplete,
  onSkip
}) {
  const [timeLeft, setTimeLeft] = useState(10.0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0.1) {
          clearInterval(interval);
          if (onComplete) onComplete();
          return 0;
        }
        return parseFloat((prev - 0.1).toFixed(1));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPaused, onComplete]);

  const progressPct = ((10 - timeLeft) / 10) * 100;

  const getScientificTakeaway = id => {
    switch (id) {
      case 1:
        return '🌾 Monocot (Wheat) has 1 cotyledon, parallel veins, and fibrous roots. 🫘 Dicot (Bean) has 2 cotyledons, reticulate net veins, and a deep taproot.';
      case 2:
        return '🌊 Aquatic animals live in water. 🌲 Terrestrial animals inhabit land. 🐸 Amphibious animals live comfortably across both ecosystems.';
      case 3:
        return '🥕 Radish has a swollen primary taproot that stores food reserves, while lateral secondary rootlets actively absorb water and soil minerals.';
      case 4:
        return '🏔️ Mountain goats possess specialized concave hooves with elastic rubber traction pads that grip sheer rock faces without slipping.';
      case 5:
        return '🐄 Viviparous animals (mammals) give live birth to young. 🪺 Oviparous animals (birds, fish, reptiles) lay protective hard-shelled eggs.';
      case 6:
        return '🌿 Sacred Groves (Pavithravana) preserve virgin forest canopies that anchor topsoil, prevent landslides, and recharge groundwater aquifers.';
      case 7:
        return '🍃 Reticulate venation forms an intricate web of branching veinlets (dicots). 🌾 Parallel venation runs straight from base to tip (monocots).';
      case 8:
        return '🌺 Hibiscus is a shrub: it produces multiple hard woody stems branching right at the ground level, unlike a tall single-trunk tree.';
      case 9:
        return '🥕 Taproots provide deep vertical bedrock anchorage against wind. 🌾 Fibrous roots form a dense superficial mat that prevents soil erosion.';
      case 10:
        return '🦆 Webbed feet expand wide during the power stroke to generate high hydrodynamic thrust, then collapse shut on the recovery stroke.';
      default:
        return '🔬 Scientific observation completed: Structural morphology directly supports biological function and habitat adaptation.';
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '2px solid rgba(20, 69, 47, 0.5)',
        background: '#04130C',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)',
        boxSizing: 'border-box',
        userSelect: 'none'
      }}
    >
      <style>{`
        @keyframes scanLaserVertical {
          0% { top: 0%; opacity: 0.8; }
          50% { top: 92%; opacity: 1; }
          100% { top: 0%; opacity: 0.8; }
        }
        @keyframes macroZoomPan {
          0% { transform: scale(1) translate(0px, 0px); }
          50% { transform: scale(1.16) translate(-12px, -8px); }
          100% { transform: scale(1.08) translate(10px, 6px); }
        }
        @keyframes pulseBioReticle {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        @keyframes vortexStreamline {
          0% { stroke-dashoffset: 120; opacity: 0.3; }
          50% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0.2; }
        }
        @keyframes snowBlizzardDrift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-140px, 80px); }
        }
        @keyframes sapParticleFlow {
          0% { stroke-dashoffset: 160; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* 1. TOP DEDICATED CONTROL BAR (OUTSIDE IMAGE) */}
      <div
        style={{
          height: '38px',
          flexShrink: 0,
          background: '#0A2518',
          borderBottom: '1.5px solid #10B981',
          padding: '0 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FCD34D', fontSize: '16px', fontWeight: 900, fontFamily: "'Outfit', sans-serif" }}>
            <Activity size={16} color="#34D399" />
            <span>Documentary Simulation</span>
          </span>
          <div style={{ width: '120px', height: '8px', background: 'rgba(255,255,255,0.15)', borderRadius: '4px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${progressPct}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #10B981, #F59E0B)',
                transition: 'width 0.1s linear'
              }}
            />
          </div>
          <span style={{ color: '#D1FAE5', fontSize: '16px', fontWeight: 900, minWidth: '36px' }}>
            {timeLeft.toFixed(1)}s
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            style={{
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid #34D399',
              color: '#FFFFFF',
              borderRadius: '6px',
              padding: '2px 8px',
              fontSize: '16px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {isPaused ? <Play size={14} /> : <Pause size={14} />}
            <span>{isPaused ? 'Resume' : 'Pause'}</span>
          </button>

          <button
            type="button"
            onClick={onSkip}
            style={{
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              border: '1px solid #FCD34D',
              color: '#FFFFFF',
              borderRadius: '6px',
              padding: '2px 10px',
              fontSize: '16px',
              fontWeight: 900,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>Skip</span>
            <FastForward size={14} />
          </button>
        </div>
      </div>

      {/* 2. PURE PHOTOGRAPHIC VISUAL STAGE (100% CLEAN - ZERO WORDS ON IMAGE) */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          position: 'relative',
          width: '100%',
          overflow: 'hidden'
        }}
      >
        {questionId === 1 && <CleanSimQ1WheatVsBean />}
        {questionId === 2 && <CleanSimQ2Wildlife />}
        {questionId === 3 && <CleanSimQ3Radish />}
        {questionId === 4 && <CleanSimQ4MountainGoat />}
        {questionId === 5 && <CleanSimQ5Reproduction />}
        {questionId === 6 && <CleanSimQ6SacredGrove />}
        {questionId === 7 && <CleanSimQ7LeafVenation />}
        {questionId === 8 && <CleanSimQ8HibiscusShrub />}
        {questionId === 9 && <CleanSimQ9SubterraneanRoots />}
        {questionId === 10 && <CleanSimQ10DuckPropulsion />}
      </div>

      {/* 3. DEDICATED SCIENTIFIC ANALYSIS BAR (OUTSIDE IMAGE) */}
      <div
        style={{
          minHeight: '44px',
          flexShrink: 0,
          background: '#061E13',
          borderTop: '1.5px solid #10B981',
          padding: '6px 14px',
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box'
        }}
      >
        <span style={{ color: '#E2E8F0', fontSize: '16px', fontWeight: 700, lineHeight: 1.3 }}>
          {getScientificTakeaway(questionId)}
        </span>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// PURE CLEAN VISUAL STAGES (ZERO WORDS ON TOP OF THE PHOTOGRAPH)
// -------------------------------------------------------------

function CleanSimQ1WheatVsBean() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <img
        src={wheatKidneyBeansImg}
        alt="Wheat vs Kidney Beans Macro"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          animation: 'macroZoomPan 10s ease-in-out infinite alternate',
          display: 'block'
        }}
      />
      {/* Optical Laser Scanner Beam (Pure Light FX, zero text) */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, transparent, #10B981, #FDE047, #10B981, transparent)',
          boxShadow: '0 0 16px #34D399, 0 0 28px #10B981',
          animation: 'scanLaserVertical 3.5s ease-in-out infinite',
          zIndex: 10,
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}

function CleanSimQ2Wildlife() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <img
        src={animalsEcosystemImg}
        alt="Living Wildlife Ecosystem"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          animation: 'macroZoomPan 12s ease-in-out infinite alternate',
          display: 'block'
        }}
      />
    </div>
  );
}

function CleanSimQ3Radish() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <img
        src={radishTaprootImg}
        alt="Radish Taproot Macro"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          animation: 'macroZoomPan 10s ease-in-out infinite alternate',
          display: 'block'
        }}
      />
      {/* Dynamic Subterranean Water & Mineral Uptake Particles (Zero Words) */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 10, pointerEvents: 'none' }}>
        <g stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="10 8" fill="none" style={{ animation: 'sapParticleFlow 2s linear infinite' }}>
          <path d="M 220 300 C 290 280, 360 250, 410 220" />
          <path d="M 600 310 C 530 280, 470 250, 420 220" />
          <path d="M 410 380 L 410 160" stroke="#67E8F9" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function CleanSimQ4MountainGoat() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <img
        src={mountainPlainsGoatImg}
        alt="Mountain Goat High-Altitude Cliff"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          animation: 'macroZoomPan 12s ease-in-out infinite alternate',
          display: 'block'
        }}
      />
      {/* Dynamic Alpine Blizzard Particle Field (Zero Words) */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 10, pointerEvents: 'none' }}>
        <g fill="#FFFFFF" opacity="0.65" style={{ animation: 'snowBlizzardDrift 2.5s linear infinite' }}>
          <circle cx="150" cy="80" r="3" />
          <circle cx="300" cy="140" r="2.5" />
          <circle cx="450" cy="90" r="3.5" />
          <circle cx="600" cy="180" r="2.8" />
          <circle cx="720" cy="110" r="3.2" />
        </g>
      </svg>
    </div>
  );
}

function CleanSimQ5Reproduction() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <img
        src={girCowImg}
        alt="Viviparous Mammal Nursing"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          animation: 'macroZoomPan 10s ease-in-out infinite alternate',
          display: 'block'
        }}
      />
    </div>
  );
}

function CleanSimQ6SacredGrove() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <img
        src={sacredGroveImg}
        alt="Sacred Grove Canopy"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          animation: 'macroZoomPan 12s ease-in-out infinite alternate',
          display: 'block'
        }}
      />
    </div>
  );
}

function CleanSimQ7LeafVenation() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <img
        src={leafVenationImg}
        alt="Leaf Venation Macro"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          animation: 'macroZoomPan 10s ease-in-out infinite alternate',
          display: 'block'
        }}
      />
      {/* Microscopic Optical Crosshair (Pure geometric reticle, zero words) */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 10 }}>
        <div style={{ width: '180px', height: '180px', border: '2px dashed #FCD34D', borderRadius: '50%', animation: 'pulseBioReticle 2s infinite' }} />
      </div>
    </div>
  );
}

function CleanSimQ8HibiscusShrub() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <img
        src={hibiscusShrubImg}
        alt="Hibiscus Shrub Architecture"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          animation: 'macroZoomPan 11s ease-in-out infinite alternate',
          display: 'block'
        }}
      />
    </div>
  );
}

function CleanSimQ9SubterraneanRoots() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <img
        src={rootSystemsImg}
        alt="Subterranean Root Systems"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          animation: 'macroZoomPan 10s ease-in-out infinite alternate',
          display: 'block'
        }}
      />
    </div>
  );
}

function CleanSimQ10DuckPropulsion() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <img
        src={duckWebbedFeetImg}
        alt="Duck Webbed Feet Macro"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          animation: 'macroZoomPan 10s ease-in-out infinite alternate',
          display: 'block'
        }}
      />
      {/* Hydrodynamic Thrust Vortex Rings & Propulsion Vector (Pure fluid FX, zero words) */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 10, pointerEvents: 'none' }}>
        <g stroke="#38BDF8" fill="none" strokeLinecap="round">
          <circle cx="340" cy="220" r="45" strokeWidth="3" strokeDasharray="14 10" style={{ animation: 'vortexStreamline 1.4s infinite' }} />
          <circle cx="340" cy="220" r="85" strokeWidth="2" strokeDasharray="18 12" style={{ animation: 'vortexStreamline 1.4s 0.3s infinite' }} />
          <line x1="340" y1="220" x2="480" y2="160" stroke="#FDE047" strokeWidth="4" />
          <polygon points="480,160 460,150 465,170" fill="#FDE047" />
        </g>
      </svg>
    </div>
  );
}
