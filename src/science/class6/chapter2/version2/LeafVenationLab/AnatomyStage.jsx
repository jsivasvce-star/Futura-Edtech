import React, { useState } from 'react';
import { venationAudio } from './venationAudio';

const ANATOMY_DATA = {
  hibiscus: [
    { id: 'petiole', x: 28, y: 82, label: 'Petiole', title: 'Petiole (Leaf Stalk)', desc: 'The slender stalk attaching the leaf blade to the twig, conducting water from the stem.' },
    { id: 'midrib', x: 48, y: 50, label: 'Midrib', title: 'Midrib (Main Vein)', desc: 'The central, prominent vein that runs along the middle of the leaf blade.' },
    { id: 'lamina', x: 72, y: 35, label: 'Lamina', title: 'Lamina (Leaf Blade)', desc: 'The broad, green expanded portion of the leaf where photosynthesis takes place.' },
    { id: 'veins', x: 62, y: 62, label: 'Veinlets', title: 'Veinlets (Branching Web)', desc: 'Secondary branches forming a fine reticulate (net-like) mesh throughout the blade.' }
  ],
  banana: [
    { id: 'petiole', x: 22, y: 80, label: 'Petiole / Sheath', title: 'Petiole & Leaf Base', desc: 'A long, thick stalk with clasping sheath that firmly anchors this huge blade to the trunk.' },
    { id: 'midrib', x: 48, y: 50, label: 'Prominent Midrib', title: 'Central Midrib', desc: 'A massive central ridge containing heavy vascular cables running all the way to the tip.' },
    { id: 'lamina', x: 68, y: 32, label: 'Giant Lamina', title: 'Lamina (Broad Blade)', desc: 'Expansive tropical blade designed to absorb maximum sunlight under the forest canopy.' },
    { id: 'veins', x: 55, y: 62, label: 'Parallel Veins', title: 'Parallel Veins', desc: 'Dozens of straight vascular lines running side-by-side from midrib out to the margin.' }
  ],
  grass: [
    { id: 'petiole', x: 18, y: 82, label: 'Sheath Base', title: 'Leaf Sheath Base', desc: 'Enwraps and protects the grass node and growing meristem from grazing animals.' },
    { id: 'midrib', x: 50, y: 50, label: 'Central Rib', title: 'Central Midrib', desc: 'Strengthens the slender blade so it stands upright towards sunlight.' },
    { id: 'lamina', x: 68, y: 38, label: 'Slender Blade', title: 'Linear Lamina', desc: 'Narrow aerodynamic blade reducing water loss and wind resistance in open meadows.' },
    { id: 'veins', x: 38, y: 60, label: 'Parallel Lines', title: 'Parallel Veins', desc: 'Fine, continuous parallel lines extending unbroken from base to tip.' }
  ],
  rose: [
    { id: 'petiole', x: 25, y: 80, label: 'Petiole', title: 'Petiole (Leaflet Stalk)', desc: 'Short stalk attaching this oval leaflet to the central leaf rachis.' },
    { id: 'midrib', x: 48, y: 50, label: 'Midrib', title: 'Central Midrib', desc: 'Main structural axis dividing the leaflet into symmetrical halves.' },
    { id: 'lamina', x: 70, y: 34, label: 'Serrated Lamina', title: 'Lamina (Toothed Edge)', desc: 'Oval blade with fine serrated teeth along the perimeter for guttation & air flow.' },
    { id: 'veins', x: 60, y: 64, label: 'Reticulate Veins', title: 'Reticulate Net', desc: 'Intricate branching veins resembling cracked mud or a fishing net.' }
  ],
  maize: [
    { id: 'petiole', x: 18, y: 80, label: 'Sheath & Ligule', title: 'Sheath Attachment', desc: 'Tightly wraps the maize stalk, preventing moisture and insects from entering the stem.' },
    { id: 'midrib', x: 50, y: 50, label: 'White Midrib', title: 'Rigid Midrib', desc: 'Prominent pale central ridge providing mechanical backbone to the long blade.' },
    { id: 'lamina', x: 74, y: 32, label: 'Sword Lamina', title: 'Sword-shaped Blade', desc: 'Elongated blade capturing maximum sunlight in agricultural crop rows.' },
    { id: 'veins', x: 40, y: 62, label: 'Parallel Veins', title: 'Parallel Vascular Bundles', desc: 'Long, uninterrupted straight tracks transporting water from the roots.' }
  ]
};

export default function AnatomyStage({ leaf }) {
  const [activePin, setActivePin] = useState(null);
  const pins = ANATOMY_DATA[leaf.id] || ANATOMY_DATA.hibiscus;

  const handleSelectPin = (pin) => {
    venationAudio.playPinPing();
    setActivePin(pin.id === activePin?.id ? null : pin);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '280px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        overflow: 'hidden',
        background: 'radial-gradient(circle at center, rgba(255,255,255,0.95) 0%, rgba(240,248,242,0.7) 100%)',
        borderRadius: '16px',
        border: '1.5px solid rgba(20, 69, 47, 0.25)'
      }}
    >
      {/* Background blueprint grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(to right, rgba(20, 69, 47, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(20, 69, 47, 0.08) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        pointerEvents: 'none',
        opacity: 0.7
      }} />

      {/* Leaf Specimen - Full Width & Height */}
      <img
        src={leaf.image}
        alt={leaf.name}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '14px',
          filter: 'brightness(0.95) contrast(1.08)',
          pointerEvents: 'none',
          zIndex: 2
        }}
      />

      {/* Interactive Anatomy Pins */}
      {pins.map(pin => {
        const isSelected = activePin?.id === pin.id;

        return (
          <div
            key={pin.id}
            onClick={() => handleSelectPin(pin)}
            style={{
              position: 'absolute',
              left: `${pin.x}%`,
              top: `${pin.y}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {/* Pulsing Pin Ring */}
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: isSelected ? '#10B981' : '#14452F',
              border: '2.5px solid #FFFFFF',
              boxShadow: isSelected ? '0 0 16px #10B981' : '0 4px 10px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: '900',
              transition: 'all 0.2s ease'
            }}>
              ✦
            </div>

            {/* Pin Tag */}
            <div style={{
              background: isSelected ? '#10B981' : 'rgba(20, 69, 47, 0.92)',
              color: '#FFFFFF',
              padding: '3px 10px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '900',
              fontFamily: '"Outfit", sans-serif',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              whiteSpace: 'nowrap',
              border: '1px solid rgba(255,255,255,0.4)'
            }}>
              {pin.label}
            </div>
          </div>
        );
      })}

      {/* Anatomical Details Spotlight Card */}
      {activePin && (
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '14px',
          maxWidth: '320px',
          background: 'rgba(250, 248, 242, 0.98)',
          border: '2px solid #14452F',
          borderRadius: '14px',
          padding: '10px 14px',
          boxShadow: '0 8px 24px rgba(20, 69, 47, 0.25)',
          zIndex: 20
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
            <div style={{ fontSize: '17px', fontWeight: '900', color: '#14452F', fontFamily: '"Fraunces", Georgia, serif' }}>
              {activePin.title}
            </div>
            <button
              onClick={() => setActivePin(null)}
              style={{ background: 'none', border: 'none', fontSize: '16px', color: '#14452F', cursor: 'pointer', fontWeight: '900' }}
            >
              ✕
            </button>
          </div>
          <div style={{ fontSize: '16px', color: '#334155', fontWeight: '600', lineHeight: '1.4' }}>
            {activePin.desc}
          </div>
        </div>
      )}

    </div>
  );
}
