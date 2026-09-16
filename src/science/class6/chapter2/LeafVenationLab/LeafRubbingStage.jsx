import React, { useState, useRef, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { venationAudio } from './venationAudio';

export default function LeafRubbingStage({ leaf }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [rubbedPercent, setRubbedPercent] = useState(0);
  const [crayonColor, setCrayonColor] = useState('#27272A'); // Charcoal
  const strokeCountRef = useRef(0);

  const colors = [
    { id: '#27272A', label: 'Charcoal Pencil', emoji: '✏️' },
    { id: '#15803D', label: 'Forest Crayon', emoji: '🖍️' },
    { id: '#9A3412', label: 'Terracotta Chalk', emoji: '🖍️' },
  ];

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = 460;
    const height = canvas.height = 320;

    // Fill with semi-translucent parchment paper texture
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(253, 250, 243, 0.88)';
    ctx.fillRect(0, 0, width, height);

    // Subtle paper grain dots
    ctx.fillStyle = 'rgba(180, 160, 130, 0.12)';
    for (let i = 0; i < 400; i++) {
      ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2);
    }
  }, [leaf.id]);

  const handlePointerDown = (e) => {
    setIsDrawing(true);
    rub(e);
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
  };

  const rub = (e) => {
    if (!canvasRef.current || !containerRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = ((clientX - rect.left) / rect.width) * canvasRef.current.width;
    const y = ((clientY - rect.top) / rect.height) * canvasRef.current.height;

    const ctx = canvasRef.current.getContext('2d');
    ctx.save();

    // Rubbing simulation: broad sideways strokes with textured grain
    ctx.globalCompositeOperation = 'source-over';
    const grad = ctx.createRadialGradient(x, y, 6, x, y, 32);
    grad.addColorStop(0, crayonColor);
    grad.addColorStop(0.6, `${crayonColor}99`);
    grad.addColorStop(1, 'transparent');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    strokeCountRef.current += 1;
    venationAudio.playRubbingScratch();

    if (strokeCountRef.current % 6 === 0) {
      setRubbedPercent(prev => Math.min(100, prev + 2));
    }
  };

  const handleReset = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(253, 250, 243, 0.88)';
    ctx.fillRect(0, 0, width, height);
    setRubbedPercent(0);
    strokeCountRef.current = 0;
  };

  return (
    <div
      ref={containerRef}
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
        background: 'radial-gradient(circle at center, #FBF8F0 0%, #EFE9D9 100%)',
        borderRadius: '16px',
        border: '1.5px solid rgba(20, 69, 47, 0.25)'
      }}
    >
      {/* Underlying Real Leaf Specimen (acting as the physical raised template) */}
      <div style={{
        position: 'absolute',
        maxWidth: '360px',
        maxHeight: '250px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: 'contrast(1.2) drop-shadow(0 6px 14px rgba(0,0,0,0.15))',
        opacity: 0.85
      }}>
        <img
          src={leaf.image}
          alt={leaf.name}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Parchment Paper Rubbing Canvas Overlay */}
      <canvas
        ref={canvasRef}
        onMouseDown={handlePointerDown}
        onMouseMove={(e) => isDrawing && rub(e)}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={(e) => isDrawing && rub(e)}
        onTouchEnd={handlePointerUp}
        style={{
          position: 'relative',
          zIndex: 5,
          width: '460px',
          height: '280px',
          maxWidth: '92%',
          borderRadius: '10px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
          border: '2px dashed #B45309',
          cursor: 'crosshair'
        }}
      />

      {/* Top Controls: Crayon Picker & Reset */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '12px',
        right: '12px',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {colors.map(c => (
            <button
              key={c.id}
              onClick={() => setCrayonColor(c.id)}
              style={{
                background: crayonColor === c.id ? '#14452F' : 'rgba(250, 248, 242, 0.55)',
                color: crayonColor === c.id ? '#FFFFFF' : '#14452F',
                border: `2px solid ${c.id === '#27272A' ? '#14452F' : c.id}`,
                padding: '4px 10px',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: crayonColor === c.id ? '0 2px 8px rgba(0,0,0,0.2)' : 'none'
              }}
            >
              <span>{c.emoji}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            background: '#14452F',
            color: '#FFFFFF',
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '900',
            fontFamily: '"Outfit", sans-serif'
          }}>
            {rubbedPercent}% Rubbed
          </div>

          <button
            onClick={handleReset}
            style={{
              background: 'rgba(250, 248, 242, 0.55)',
              color: '#14452F',
              border: '2px solid rgba(20, 69, 47, 0.5)',
              padding: '4px 10px',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <RefreshCw size={14} />
            <span>Clear Paper</span>
          </button>
        </div>
      </div>

    </div>
  );
}
