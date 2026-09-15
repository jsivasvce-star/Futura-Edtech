import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Table as TableIcon, 
  X, 
  Lock, 
  ShieldAlert, 
  Magnet, 
  Check, 
  Zap, 
  Volume2, 
  VolumeX 
} from 'lucide-react';
import './Activity4_1.css';

// 9 Extracted items based on NCERT Class 6 Chapter 4 Table 4.1 (notebook removed)
const EVIDENCE_ITEMS = [
  {
    id: 'clips',
    name: 'Paper Clips',
    evidenceNo: '01',
    material: 'Steel (Iron)',
    isMagnetic: true,
    category: 'Magnetic',
    image: '/Activity4_1/items/clips.png',
    desc: 'Made of steel wire containing iron, strongly attracted to magnets.',
    explanation: 'Ferromagnetic material: magnetic domains align with the magnet to create an attractive force.',
    tableAttracted: 'Yes',
  },
  {
    id: 'pens',
    name: 'Pens',
    evidenceNo: '02',
    material: 'Plastic Polymer',
    isMagnetic: false,
    category: 'Non-Magnetic',
    image: '/Activity4_1/items/pens.png',
    desc: 'Synthetic polymer casing, completely non-magnetic.',
    explanation: 'Plastics lack unpaired magnetic dipoles and are completely unaffected by magnets.',
    tableAttracted: 'No',
  },
  {
    id: 'ruler',
    name: 'Ruler',
    evidenceNo: '03',
    material: 'Plastic / Acrylic',
    isMagnetic: false,
    category: 'Non-Magnetic',
    image: '/Activity4_1/items/ruler.png',
    desc: 'Clear acrylic plastic scale, non-ferrous.',
    explanation: 'Dielectric polymer that experiences zero magnetic attraction.',
    tableAttracted: 'No',
  },
  {
    id: 'coins',
    name: 'Coins',
    evidenceNo: '04',
    material: 'Nickel-Steel Alloy',
    isMagnetic: true,
    category: 'Magnetic',
    image: '/Activity4_1/items/coins.png',
    desc: 'Metallic coins minted with nickel and iron alloy core.',
    explanation: 'Nickel and ferritic alloys have magnetic dipoles that produce strong attraction.',
    tableAttracted: 'Yes',
  },
  {
    id: 'bottle',
    name: 'Water Bottle',
    evidenceNo: '05',
    material: 'Stainless Steel / Glass',
    isMagnetic: false,
    category: 'Non-Magnetic',
    image: '/Activity4_1/items/bottle.png',
    desc: 'Austenitic stainless steel and glass body.',
    explanation: 'Austenitic crystal structure has non-magnetic face-centered cubic lattice.',
    tableAttracted: 'No',
  },
  {
    id: 'compass',
    name: 'Compass',
    evidenceNo: '06',
    material: 'Magnetized Steel Needle',
    isMagnetic: true,
    category: 'Magnetic',
    image: '/Activity4_1/items/compass.png',
    desc: 'Contains a magnetized steel needle pivoted at the center.',
    explanation: 'The needle itself is a permanent magnet with North and South poles.',
    tableAttracted: 'Yes',
  },
  {
    id: 'eraser',
    name: 'Eraser',
    evidenceNo: '07',
    material: 'Natural Rubber',
    isMagnetic: false,
    category: 'Non-Magnetic',
    image: '/Activity4_1/items/eraser.png',
    desc: 'Synthetic elastomer rubber, non-ferrous.',
    explanation: 'Rubber polymer chains possess no unpaired electrons and exhibit no magnetic pull.',
    tableAttracted: 'No',
  },
  {
    id: 'pencil_case',
    name: 'Pencil Case',
    evidenceNo: '08',
    material: 'Fabric Cloth',
    isMagnetic: false,
    category: 'Non-Magnetic',
    image: '/Activity4_1/items/pencil_case.png',
    desc: 'Woven synthetic cloth textile, non-magnetic.',
    explanation: 'Textile yarns and fabrics have zero magnetic susceptibility.',
    tableAttracted: 'No',
  },
  {
    id: 'pencil',
    name: 'Pencil',
    evidenceNo: '09',
    material: 'Wood & Graphite',
    isMagnetic: false,
    category: 'Non-Magnetic',
    image: '/Activity4_1/items/pencil.png',
    desc: 'Cedar wood casing with carbon graphite core.',
    explanation: 'Wood and graphite do not experience attraction to magnetic poles.',
    tableAttracted: 'No',
  },
];

// Web Audio API Synthesizer for tactile feedback
function playSound(type, soundEnabled = true) {
  if (!soundEnabled) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(640, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } else if (type === 'scan_loop') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(520, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } else if (type === 'magnetic') {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.14, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.35);
      });
    } else if (type === 'nonMagnetic') {
      [440, 349.23].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.09);
        gain.gain.setValueAtTime(0.1, ctx.currentTime + i * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.09 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.09);
        osc.stop(ctx.currentTime + i * 0.09 + 0.3);
      });
    }
  } catch (err) {
    // Audio context may be restricted by autoplay policy
  }
}

// ─── Canvas-based white background remover ───────────────────────────────────
// Processes image pixel-by-pixel: near-white pixels become transparent with
// smooth anti-aliased feathering so edges look clean on any dark background.
const transparentCache = new Map();

async function removeWhiteBg(src) {
  if (transparentCache.has(src)) return transparentCache.get(src);
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const THRESHOLD = 235; // pixels brighter than this are considered white bg
      const FEATHER = 20;    // smooth transition zone width
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        // Only treat as background if ALL channels are near-white
        const minChannel = Math.min(r, g, b);
        if (minChannel >= THRESHOLD) {
          // Linear ramp: 235 → alpha=255 (fully opaque edge), 250+ → alpha=0 (fully transparent bg)
          const t = Math.min(1, (minChannel - THRESHOLD) / FEATHER);
          data[i + 3] = Math.round((1 - t) * data[i + 3]);
        }
      }
      ctx.putImageData(imageData, 0, 0);
      const result = canvas.toDataURL('image/png');
      transparentCache.set(src, result);
      resolve(result);
    };
    img.onerror = () => resolve(src); // fallback to original on error
    img.src = src;
  });
}

export default function MagneticTable({ onComplete, onTableCompleted }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [scanState, setScanState] = useState('idle'); // 'idle' | 'scanning' | 'complete'
  const [scanProgress, setScanProgress] = useState(0);
  const [scannedMap, setScannedMap] = useState({}); // { [id]: boolean }
  const [showTableModal, setShowTableModal] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  // Stores canvas-processed transparent versions of each item image
  const [transparentImgs, setTransparentImgs] = useState({});

  const scannedCount = Object.keys(scannedMap).length;
  const isAllComplete = scannedCount === EVIDENCE_ITEMS.length;
  const magneticCount = Object.keys(scannedMap).filter(id => EVIDENCE_ITEMS.find(i => i.id === id)?.isMagnetic).length;
  const nonMagneticCount = scannedCount - magneticCount;

  // Pre-process all item images on mount: strip white backgrounds via Canvas API
  useEffect(() => {
    let cancelled = false;
    const processAll = async () => {
      const entries = await Promise.all(
        EVIDENCE_ITEMS.map(async (item) => {
          const transparent = await removeWhiteBg(item.image);
          return [item.id, transparent];
        })
      );
      if (!cancelled) {
        setTransparentImgs(Object.fromEntries(entries));
      }
    };
    processAll();
    return () => { cancelled = true; };
  }, []);

  // Helper: returns transparent version if ready, otherwise original
  const getImgSrc = (item) => transparentImgs[item.id] || item.image;

  // Notify parent component when all items are scanned
  useEffect(() => {
    if (isAllComplete && onTableCompleted) {
      onTableCompleted(true);
    }
  }, [isAllComplete, onTableCompleted]);

  // Handle click-to-scan on an Evidence Card
  const handleCardClick = (item) => {
    if (scanState === 'scanning') return; // Do not interrupt an ongoing scan

    playSound('click', soundEnabled);
    setSelectedItem(item);

    // If item was already scanned, display results immediately without re-scanning
    if (scannedMap[item.id]) {
      setScanState('complete');
      setScanProgress(100);
      return;
    }

    // Otherwise initiate active scan sequence
    setScanState('scanning');
    setScanProgress(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setScanProgress(progress);
      if (progress % 20 === 0) {
        playSound('scan_loop', soundEnabled);
      }

      if (progress >= 100) {
        clearInterval(interval);
        setScannedMap(prev => ({ ...prev, [item.id]: true }));
        setScanState('complete');
        setScanProgress(100);

        if (item.isMagnetic) {
          playSound('magnetic', soundEnabled);
        } else {
          playSound('nonMagnetic', soundEnabled);
        }
      }
    }, 45); // 50 steps * 45ms = ~2.25s
  };

  // Reset entire activity
  const handleResetActivity = () => {
    playSound('click', soundEnabled);
    setScannedMap({});
    setSelectedItem(null);
    setScanState('idle');
    setScanProgress(0);
    if (onTableCompleted) {
      onTableCompleted(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      minHeight: 0,
      gap: '0.65rem',
      boxSizing: 'border-box',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Top Main Workspace: 2-Column Split (Left: Evidence Board, Right: Scanner Device) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.25fr 1fr',
        gap: '0.85rem',
        flex: 1,
        minHeight: 0,
        height: '100%',
        overflow: 'hidden',
      }}>

        {/* ========================================================================= */}
        {/* LEFT COLUMN: OBJECT CARDS CONTAINER                                       */}
        {/* ========================================================================= */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minHeight: 0,
          background: '#FAF8F5',
          border: '2px solid #D9C9A3',
          borderRadius: '16px',
          boxShadow: 'inset 0 0 40px rgba(226, 211, 185, 0.35), 0 4px 16px rgba(0,0,0,0.06)',
          padding: '0.85rem',
          boxSizing: 'border-box',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Subtle Corner Registration Ticks */}
          <div style={{ position: 'absolute', top: 8, left: 8, width: 10, height: 10, borderTop: '2px solid #D9C9A3', borderLeft: '2px solid #D9C9A3', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 8, right: 8, width: 10, height: 10, borderTop: '2px solid #D9C9A3', borderRight: '2px solid #D9C9A3', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 8, left: 8, width: 10, height: 10, borderBottom: '2px solid #D9C9A3', borderLeft: '2px solid #D9C9A3', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 8, right: 8, width: 10, height: 10, borderBottom: '2px solid #D9C9A3', borderRight: '2px solid #D9C9A3', pointerEvents: 'none' }} />

          {/* Object Cards Grid: 9 Items in strict 3×3 layout */}
          <div
            className="evidence-board-scroll"
            style={{
              flex: 1,
              minHeight: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(3, 1fr)',
              gap: '0.7rem',
              overflowY: 'auto',
              paddingRight: '4px',
              paddingBottom: '4px',
              boxSizing: 'border-box',
            }}
          >
            {EVIDENCE_ITEMS.map((item) => {
              const isScanned = !!scannedMap[item.id];
              const isSelected = selectedItem?.id === item.id;
              const isScanning = isSelected && scanState === 'scanning';

              let borderColor = 'rgba(0, 0, 0, 0.08)';
              let cardBg = '#FFFFFF';
              let shadow = '0 3px 10px rgba(0, 0, 0, 0.04)';
              let statusText = null;
              let statusColor = '#64748B';
              let statusBg = '#F1F5F9';

              if (isScanned) {
                if (item.isMagnetic) {
                  borderColor = '#86EFAC';
                  cardBg = '#F0FDF4';
                  statusText = '🧲 MAGNETIC';
                  statusColor = '#15803D';
                  statusBg = '#DCFCE7';
                  shadow = '0 3px 10px rgba(22, 163, 74, 0.12)';
                } else {
                  borderColor = '#FCA5A5';
                  cardBg = '#FFF1F2';
                  statusText = '🛡️ NON-MAGNETIC';
                  statusColor = '#B91C1C';
                  statusBg = '#FEE2E2';
                  shadow = '0 3px 10px rgba(239, 68, 68, 0.09)';
                }
              }

              if (isScanning) {
                borderColor = '#0284C7';
                cardBg = '#F0F9FF';
                statusText = 'SCANNING...';
                statusColor = '#0284C7';
                statusBg = '#E0F2FE';
                shadow = '0 0 16px rgba(2, 132, 199, 0.28)';
              } else if (isSelected) {
                borderColor = '#A94727';
                shadow = '0 6px 16px rgba(169, 71, 39, 0.18)';
              }

              return (
                <div
                  key={item.id}
                  onClick={() => handleCardClick(item)}
                  className={`evidence-card ${isScanning ? 'is-active-scan' : ''}`}
                  style={{
                    borderRadius: '12px',
                    border: `1.5px solid ${borderColor}`,
                    background: cardBg,
                    boxShadow: shadow,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '0.65rem',
                    cursor: scanState === 'scanning' && !isSelected ? 'not-allowed' : 'pointer',
                    userSelect: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                    boxSizing: 'border-box',
                  }}
                  title={isScanned 
                    ? `${item.name}: Scanned as ${item.category}. Click to inspect findings.`
                    : `Click to scan ${item.name}`}
                >
                  {/* Top-right Status Checkmark when Scanned */}
                  {isScanned && (
                    <div style={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: item.isMagnetic ? '#16A34A' : '#EF4444',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      zIndex: 5,
                    }}>
                      <Check size={11} color="#FFFFFF" strokeWidth={3} />
                    </div>
                  )}

                  {/* Clean Object Image Container — transparent processed image */}
                  <div style={{
                    flex: 1,
                    minHeight: 0,
                    background: 'transparent',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '6px',
                    position: 'relative',
                    overflow: 'hidden',
                    marginBottom: '6px',
                  }}>
                    <img
                      src={getImgSrc(item)}
                      alt={item.name}
                      style={{
                        maxWidth: '92%',
                        maxHeight: '92%',
                        objectFit: 'contain',
                        display: 'block',
                        transition: 'transform 0.2s ease',
                      }}
                    />
                  </div>

                  {/* Card Footer: Object Name & Status Badge (Only when Scanning or Scanned) */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flexShrink: 0, alignItems: 'center' }}>
                    <span style={{
                      fontSize: '0.88rem',
                      fontWeight: 900,
                      color: '#2D3748',
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      width: '100%',
                      textAlign: 'center',
                    }}>
                      {item.name}
                    </span>

                    {statusText && (
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        background: statusBg,
                        color: statusColor,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '0.68rem',
                        fontWeight: 900,
                        letterSpacing: '0.2px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        {isScanning && (
                          <div style={{
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            background: '#0284C7',
                            animation: 'pulse-scanner-glow 1s infinite',
                          }} />
                        )}
                        <span>{statusText}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>


        {/* ========================================================================= */}
        {/* RIGHT COLUMN: CIRCULAR SCANNER DEVICE                                     */}
        {/* ========================================================================= */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minHeight: 0,
          background: '#0B1120',
          borderRadius: '16px',
          border: '2px solid #1E293B',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
          overflow: 'hidden',
          position: 'relative',
          boxSizing: 'border-box',
        }}>

          {/* Scanner Device Top HUD Bar */}
          <div style={{
            padding: '0.6rem 0.9rem',
            background: 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)',
            borderBottom: '1.5px solid #334155',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            zIndex: 10,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: scanState === 'scanning' ? '#38BDF8' : '#10B981',
                boxShadow: scanState === 'scanning' ? '0 0 10px #38BDF8' : '0 0 10px #10B981',
              }} />
              <span style={{ fontSize: '0.92rem', fontWeight: 900, color: '#F8FAFC', letterSpacing: '0.6px' }}>
                MAGNETIC SPECTROMETER
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {/* Sound Toggle */}
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  color: soundEnabled ? '#38BDF8' : '#94A3B8',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                }}
                title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
              >
                {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
                <span>{soundEnabled ? 'FX ON' : 'MUTED'}</span>
              </button>

              {/* Progress Chip */}
              <span style={{
                fontSize: '0.78rem',
                fontWeight: 900,
                padding: '3px 9px',
                borderRadius: '12px',
                background: isAllComplete ? 'rgba(16, 185, 129, 0.2)' : 'rgba(56, 189, 248, 0.15)',
                border: isAllComplete ? '1px solid #10B981' : '1px solid #38BDF8',
                color: isAllComplete ? '#34D399' : '#38BDF8',
              }}>
                {scannedCount} / 9 SCANNED
              </span>
            </div>
          </div>

          {/* Central Scanner Chamber / Radar Pad */}
          <div style={{
            flex: 1,
            minHeight: 0,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: "url('/Activity4_1/scanner_pad_bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            overflow: 'hidden',
          }}>
            {/* Dark Ambient Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.4) 0%, rgba(11, 17, 32, 0.8) 100%)',
              zIndex: 1,
              pointerEvents: 'none',
            }} />

            {/* Circular Radar Chamber Container */}
            <div style={{
              position: 'relative',
              width: 'min(330px, 70vw)',
              height: 'min(330px, 70vw)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
            }}>
              {/* Radar Rotating Sweep Beam */}
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, rgba(56, 189, 248, 0) 0deg, rgba(56, 189, 248, 0.18) 45deg, rgba(56, 189, 248, 0) 46deg)',
                animation: 'radar-sweep 4s linear infinite',
                pointerEvents: 'none',
              }} />

              {/* Concentric Cyan Radar Circles */}
              <div style={{
                position: 'absolute',
                width: '78%',
                height: '78%',
                borderRadius: '50%',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute',
                width: '52%',
                height: '52%',
                borderRadius: '50%',
                border: '1px dashed rgba(56, 189, 248, 0.3)',
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute',
                width: '26%',
                height: '26%',
                borderRadius: '50%',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                pointerEvents: 'none',
              }} />

              {/* Crosshair Axes */}
              <div style={{
                position: 'absolute',
                width: '88%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.4) 50%, transparent 100%)',
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute',
                height: '88%',
                width: '1px',
                background: 'linear-gradient(180deg, transparent 0%, rgba(56, 189, 248, 0.4) 50%, transparent 100%)',
                pointerEvents: 'none',
              }} />

              {/* ACTIVE ITEM ON RADAR PAD */}
              {selectedItem ? (
                <div style={{
                  position: 'relative',
                  width: '82%',
                  height: '82%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 4,
                }}>
                  {/* Object Image — canvas-processed transparent PNG, floats on dark radar */}
                  <img
                    src={getImgSrc(selectedItem)}
                    alt={selectedItem.name}
                    style={{
                      position: 'relative',
                      zIndex: 5,
                      maxWidth: '80%',
                      maxHeight: '80%',
                      objectFit: 'contain',
                      filter: scanState === 'scanning'
                        ? 'drop-shadow(0 0 28px rgba(56, 189, 248, 0.9)) drop-shadow(0 0 12px rgba(56,189,248,0.6)) brightness(1.1)'
                        : selectedItem.isMagnetic
                        ? 'drop-shadow(0 0 24px rgba(34, 197, 94, 0.85)) drop-shadow(0 0 10px rgba(34,197,94,0.5))'
                        : 'drop-shadow(0 0 20px rgba(239, 68, 68, 0.75)) drop-shadow(0 0 8px rgba(239,68,68,0.4))',
                      transition: 'filter 0.4s ease, transform 0.3s ease',
                      animation: scanState === 'scanning' ? 'holographic-pulse 1.8s ease-in-out infinite' : 'none',
                    }}
                  />

                  {/* Vertical Laser Sweep Line */}
                  {scanState === 'scanning' && (
                    <div style={{
                      position: 'absolute',
                      left: '5%',
                      right: '5%',
                      height: '3px',
                      background: '#38BDF8',
                      boxShadow: '0 0 14px #38BDF8, 0 0 24px #0284C7',
                      zIndex: 6,
                      animation: 'laser-sweep-vertical 1.35s ease-in-out infinite',
                      pointerEvents: 'none',
                    }} />
                  )}
                </div>
              ) : (
                /* IDLE STATE IN SCANNER RADAR */
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '1rem',
                  gap: '0.45rem',
                  zIndex: 4,
                  pointerEvents: 'none',
                }}>
                  <Search size={48} color="#38BDF8" style={{ filter: 'drop-shadow(0 0 14px rgba(56, 189, 248, 0.6))' }} />
                  <span style={{
                    fontSize: '1.45rem',
                    fontWeight: 900,
                    color: '#E0F2FE',
                    letterSpacing: '0.4px',
                    textShadow: '0 0 12px rgba(56, 189, 248, 0.6)',
                  }}>
                    Scanner Active
                  </span>
                  <span style={{
                    fontSize: '0.88rem',
                    color: '#94A3B8',
                    maxWidth: '220px',
                    lineHeight: 1.4,
                    fontWeight: 700,
                  }}>
                    Click any object on the left to scan it!
                  </span>
                </div>
              )}

              {/* Progress HUD Badge while scanning */}
              {scanState === 'scanning' && (
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  background: 'rgba(15, 23, 42, 0.92)',
                  border: '1.5px solid #38BDF8',
                  borderRadius: '12px',
                  padding: '6px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  zIndex: 10,
                  boxShadow: '0 8px 24px rgba(2, 132, 199, 0.35)',
                  minWidth: '180px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <span style={{ fontSize: '0.74rem', fontWeight: 900, color: '#38BDF8', letterSpacing: '0.6px' }}>
                      SCANNING...
                    </span>
                    <span style={{ fontSize: '0.88rem', fontWeight: 900, color: '#FFFFFF' }}>
                      {scanProgress}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div style={{
                    width: '100%',
                    height: '5px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '3px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${scanProgress}%`,
                      height: '100%',
                      background: '#38BDF8',
                      boxShadow: '0 0 10px #38BDF8',
                      transition: 'width 0.08s linear',
                    }} />
                  </div>
                </div>
              )}
            </div>

            {/* SCAN RESULTS TELEMETRY CARD (WHEN A SCAN IS COMPLETED) */}
            {selectedItem && scanState === 'complete' && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25 }}
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '12px',
                  right: '12px',
                  background: 'rgba(15, 23, 42, 0.94)',
                  backdropFilter: 'blur(10px)',
                  border: selectedItem.isMagnetic ? '1.5px solid #22C55E' : '1.5px solid #EF4444',
                  borderRadius: '14px',
                  padding: '0.75rem 1rem',
                  boxShadow: selectedItem.isMagnetic 
                    ? '0 8px 25px rgba(34, 197, 94, 0.25)' 
                    : '0 8px 25px rgba(239, 68, 68, 0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                  zIndex: 10,
                  boxSizing: 'border-box',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.05rem', fontWeight: 900, color: '#FFFFFF' }}>
                      {selectedItem.name}
                    </span>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '6px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#94A3B8',
                    }}>
                      {selectedItem.material}
                    </span>
                  </div>

                  {/* Status Banner */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '3px 10px',
                    borderRadius: '8px',
                    background: selectedItem.isMagnetic ? '#16A34A' : '#DC2626',
                    color: '#FFFFFF',
                    fontSize: '0.78rem',
                    fontWeight: 900,
                    letterSpacing: '0.3px',
                    boxShadow: selectedItem.isMagnetic 
                      ? '0 2px 10px rgba(22, 163, 74, 0.4)' 
                      : '0 2px 10px rgba(220, 38, 38, 0.4)',
                  }}>
                    {selectedItem.isMagnetic ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                    <span>{selectedItem.isMagnetic ? 'FERROMAGNETIC' : 'NON-MAGNETIC'}</span>
                  </div>
                </div>

                <p style={{
                  margin: 0,
                  fontSize: '0.78rem',
                  color: '#CBD5E1',
                  lineHeight: 1.35,
                  fontWeight: 600,
                }}>
                  {selectedItem.explanation}
                </p>
              </motion.div>
            )}
          </div>

          {/* Device Bottom Summary Stats */}
          <div style={{
            padding: '0.55rem 0.9rem',
            background: '#0B1120',
            borderTop: '1.5px solid #1E293B',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.5rem',
            flexShrink: 0,
            zIndex: 10,
          }}>
            <div style={{
              background: 'rgba(34, 197, 94, 0.12)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '8px',
              padding: '0.35rem 0.65rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: '0.78rem', color: '#86EFAC', fontWeight: 800 }}>🧲 Magnetic:</span>
              <strong style={{ fontSize: '0.92rem', color: '#4ADE80', fontWeight: 900 }}>{magneticCount}</strong>
            </div>

            <div style={{
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              padding: '0.35rem 0.65rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: '0.78rem', color: '#FCA5A5', fontWeight: 800 }}>🛡️ Non-Magnetic:</span>
              <strong style={{ fontSize: '0.92rem', color: '#F87171', fontWeight: 900 }}>{nonMagneticCount}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM ACTION BAR (Reset Activity, Status & Proceed to Quiz)             */}
      {/* ========================================================================= */}
      <div style={{
        padding: '0.55rem 0.85rem',
        background: '#FFFFFF',
        border: '1.5px solid #E2E8F0',
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
        gap: '0.75rem',
      }}>
        {/* Left: Reset Button & Table 4.1 Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={handleResetActivity}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0.6rem 1.15rem',
              fontSize: '0.86rem',
              fontWeight: 800,
              borderRadius: '12px',
              background: '#F8FAFC',
              border: '1.5px solid #CBD5E1',
              color: '#475569',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            title="Reset scanned materials to test again"
          >
            <RotateCcw size={15} color="#475569" />
            <span>Reset Activity</span>
          </button>

          <button
            onClick={() => setShowTableModal(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0.6rem 1.15rem',
              fontSize: '0.86rem',
              fontWeight: 800,
              borderRadius: '12px',
              background: '#F8FAFC',
              border: '1.5px solid #CBD5E1',
              color: '#064E3B',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            title="View NCERT Table 4.1 Material Log"
          >
            <TableIcon size={15} color="#064E3B" />
            <span>NCERT Table 4.1</span>
          </button>
        </div>

        {/* Center: Activity Status Feedback */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {isAllComplete ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#16A34A' }}>
              <CheckCircle2 size={18} />
              <span style={{ fontSize: '0.92rem', fontWeight: 900 }}>
                All 10 Materials Classified! Ready for Knowledge Quiz.
              </span>
            </div>
          ) : (
            <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#64748B' }}>
              Click items to scan ({scannedCount}/10 completed)
            </span>
          )}
        </div>

        {/* Right: Proceed to Knowledge Quiz */}
        <button
          onClick={isAllComplete ? onComplete : undefined}
          disabled={!isAllComplete}
          className={isAllComplete ? 'gold-glow-btn' : ''}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.65rem 1.45rem',
            fontSize: '0.92rem',
            fontWeight: 900,
            borderRadius: '12px',
            background: isAllComplete ? undefined : '#F1F5F9',
            color: isAllComplete ? '#FFFFFF' : '#94A3B8',
            border: isAllComplete ? 'none' : '1.5px solid #CBD5E1',
            cursor: isAllComplete ? 'pointer' : 'not-allowed',
            opacity: isAllComplete ? 1 : 0.65,
            transition: 'all 0.25s ease',
          }}
          title={isAllComplete ? 'Proceed to Knowledge Quiz' : 'Scan all 10 objects to unlock the quiz'}
        >
          {!isAllComplete && <Lock size={15} color="#94A3B8" />}
          <span>Proceed to next</span>
          <ArrowRight size={17} color={isAllComplete ? '#FFFFFF' : '#94A3B8'} />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* NCERT TABLE 4.1 POP-UP MODAL                                              */}
      {/* ========================================================================= */}
      {showTableModal && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1.5rem',
            boxSizing: 'border-box',
          }}
          onClick={() => setShowTableModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              border: '2px solid #D9C9A3',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
              maxWidth: '720px',
              width: '100%',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxSizing: 'border-box',
            }}
          >
            {/* Modal Header */}
            <div style={{
              padding: '1rem 1.25rem',
              background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
              borderBottom: '1.5px solid #FDE68A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <TableIcon size={22} color="#064E3B" />
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 900, color: '#064E3B' }}>
                    NCERT Table 4.1: Finding Materials Attracted by a Magnet
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: '#047857', fontWeight: 700 }}>
                    Class 6 Science — Magnetic and Non-Magnetic Materials
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowTableModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '6px',
                  color: '#64748B',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Table Content */}
            <div style={{ padding: '1rem', overflowY: 'auto', flex: 1 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0' }}>
                    <th style={{ textAlign: 'left', padding: '10px 12px', color: '#334155', fontWeight: 900 }}>#</th>
                    <th style={{ textAlign: 'left', padding: '10px 12px', color: '#334155', fontWeight: 900 }}>Object Name</th>
                    <th style={{ textAlign: 'left', padding: '10px 12px', color: '#334155', fontWeight: 900 }}>Material Composition</th>
                    <th style={{ textAlign: 'center', padding: '10px 12px', color: '#334155', fontWeight: 900 }}>Attracted by Magnet?</th>
                  </tr>
                </thead>
                <tbody>
                  {EVIDENCE_ITEMS.map((item, idx) => {
                    const isScanned = !!scannedMap[item.id];
                    return (
                      <tr key={item.id} style={{
                        borderBottom: '1px solid #F1F5F9',
                        background: idx % 2 === 0 ? '#FFFFFF' : '#FAF8F5'
                      }}>
                        <td style={{ padding: '8px 12px', fontWeight: 800, color: '#64748B' }}>{item.evidenceNo}</td>
                        <td style={{ padding: '8px 12px', fontWeight: 900, color: '#1E293B' }}>{item.name}</td>
                        <td style={{ padding: '8px 12px', color: '#475569', fontWeight: 600 }}>{item.material}</td>
                        <td style={{ padding: '8px 12px', textAlign: 'center' }}>
                          {isScanned ? (
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '2px 8px',
                              borderRadius: '6px',
                              fontSize: '0.78rem',
                              fontWeight: 900,
                              background: item.isMagnetic ? '#DCFCE7' : '#FEE2E2',
                              color: item.isMagnetic ? '#15803D' : '#B91C1C',
                            }}>
                              {item.tableAttracted} {item.isMagnetic ? '✓' : '✗'}
                            </span>
                          ) : (
                            <span style={{ color: '#94A3B8', fontSize: '0.78rem', fontStyle: 'italic' }}>
                              Pending scan...
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '0.75rem 1.25rem',
              borderTop: '1px solid #E2E8F0',
              display: 'flex',
              justifyContent: 'flex-end',
              background: '#F8FAFC',
            }}>
              <button
                onClick={() => setShowTableModal(false)}
                style={{
                  padding: '6px 16px',
                  borderRadius: '8px',
                  background: '#1E293B',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '0.84rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                Close Table
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
