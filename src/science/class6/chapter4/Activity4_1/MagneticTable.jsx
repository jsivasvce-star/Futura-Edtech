import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
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
  Zap 
} from 'lucide-react';
import './Activity4_1.css';
import ch4scannerBg from '../../../../assets/ch4scanner.png';
import ch4clips from '../../../../assets/ch4clips.png';
import ch4pens from '../../../../assets/ch4pens.png';
import ch4ruler from '../../../../assets/ch4ruler.png';
import ch4bottle from '../../../../assets/ch4bottle.png';
import ch4coin from '../../../../assets/ch4coin.png';
import ch4eraser from '../../../../assets/ch4eraser.png';
import ch4compass from '../../../../assets/ch4compass.png';
import ch4case from '../../../../assets/ch4case.png';
import ch4pencil from '../../../../assets/ch4pencil.png';


// 9 Extracted items based on NCERT Class 6 Chapter 4 Table 4.1 (notebook removed)
const EVIDENCE_ITEMS = [
  {
    id: 'clips',
    name: 'Paper Clips',
    evidenceNo: '01',
    material: 'Steel',
    materialDisplay: 'Material: Steel',
    isMagnetic: true,
    statusText: 'MAGNETIC',
    category: 'Magnetic',
    popupImage: ch4clips,
    image: '/Activity4_1/items/clips.png',
    desc: 'Made of steel wire containing iron, strongly attracted to magnets.',
    observation: 'These paper clips are made of steel, which contains iron. A magnet pulls them towards it.',
    tableAttracted: 'Yes',
  },
  {
    id: 'pens',
    name: 'Pens',
    evidenceNo: '02',
    material: 'Plastic Polymer',
    materialDisplay: 'Material: Plastic Polymer',
    isMagnetic: false,
    statusText: 'NON-MAGNETIC',
    category: 'Non-Magnetic',
    popupImage: ch4pens,
    image: '/Activity4_1/items/pens.png',
    desc: 'Synthetic polymer casing, completely non-magnetic.',
    observation: 'The plastic body is not attracted to a magnet. A metal clip or spring may behave differently.',
    tableAttracted: 'No',
  },
  {
    id: 'ruler',
    name: 'Ruler',
    evidenceNo: '03',
    material: 'Wood',
    materialDisplay: 'Material: Wood',
    isMagnetic: false,
    statusText: 'NON-MAGNETIC',
    category: 'Non-Magnetic',
    popupImage: ch4ruler,
    image: '/Activity4_1/items/woodenruler.png',
    desc: 'Wooden measuring scale, non-ferrous.',
    observation: 'Wood is an insulator and not attracted to a magnet. This ruler stays in place.',
    tableAttracted: 'No',
  },
  {
    id: 'coins',
    name: 'Coins',
    evidenceNo: '04',
    material: 'Steel Coins',
    materialDisplay: 'Material: Steel Coins',
    isMagnetic: true,
    statusText: 'MAGNETIC',
    category: 'Magnetic',
    popupImage: ch4coin,
    image: '/Activity4_1/items/coins.png',
    desc: 'Metallic coins minted with nickel and iron alloy core.',
    observation: 'These steel coins are attracted to a magnet. Coins made from other metals may behave differently.',
    tableAttracted: 'Yes',
  },
  {
    id: 'bottle',
    name: 'Water Bottle',
    evidenceNo: '05',
    material: 'Stainless Steel',
    materialDisplay: 'Material: Stainless Steel',
    isMagnetic: false,
    statusText: 'NON-MAGNETIC',
    category: 'Non-Magnetic',
    popupImage: ch4bottle,
    image: '/Activity4_1/items/bottle.png',
    desc: 'Austenitic stainless steel and glass body.',
    observation: 'This stainless-steel bottle is not attracted to the magnet. Other types of stainless steel can be attracted.',
    tableAttracted: 'No',
  },
  {
    id: 'compass',
    name: 'Compass',
    evidenceNo: '06',
    material: 'Magnetic Needle',
    materialDisplay: 'Material: Needle',
    isMagnetic: true,
    statusText: 'MAGNETIC',
    category: 'Magnetic',
    popupImage: ch4compass,
    image: '/Activity4_1/items/compass.png',
    desc: 'Contains a magnetized steel needle pivoted at the center.',
    observation: "The compass needle is a small magnet. It lines up with Earth's magnetic field and helps find directions.",
    tableAttracted: 'Yes',
  },
  {
    id: 'eraser',
    name: 'Eraser',
    evidenceNo: '07',
    material: 'Rubber',
    materialDisplay: 'Material: Rubber',
    isMagnetic: false,
    statusText: 'NON-MAGNETIC',
    category: 'Non-Magnetic',
    popupImage: ch4eraser,
    image: '/Activity4_1/items/eraser.png',
    desc: 'Synthetic elastomer rubber, non-ferrous.',
    observation: 'This eraser is made of rubber. A magnet does not attract it.',
    tableAttracted: 'No',
  },
  {
    id: 'pencil_case',
    name: 'Pencil Case',
    evidenceNo: '08',
    material: 'Fabric Body',
    materialDisplay: 'Material: Fabric Body',
    isMagnetic: false,
    statusText: 'NON-MAGNETIC',
    category: 'Non-Magnetic',
    popupImage: ch4case,
    image: '/Activity4_1/items/pencil_case.png',
    desc: 'Woven synthetic cloth textile, non-magnetic.',
    observation: 'The fabric body is not attracted to a magnet. The zip or metal fasteners may behave differently.',
    tableAttracted: 'No',
  },
  {
    id: 'pencil',
    name: 'Pencil',
    evidenceNo: '09',
    material: 'Wood and Graphite',
    materialDisplay: 'Material: Wood and Graphite',
    isMagnetic: false,
    statusText: 'NON-MAGNETIC',
    category: 'Non-Magnetic',
    popupImage: ch4pencil,
    image: '/Activity4_1/items/pencil.png',
    desc: 'Cedar wood casing with carbon graphite core.',
    observation: 'The wood and graphite are not attracted to a magnet. A metal clip, if present, may behave differently.',
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
    } else if (type === 'celebration') {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
        gain.gain.setValueAtTime(0.18, ctx.currentTime + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.12);
        osc.stop(ctx.currentTime + i * 0.12 + 0.6);
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
      const THRESHOLD = 220; // Lower threshold to cleanly eliminate off-white / gray shaded backgrounds
      const FEATHER = 25;    // smooth transition zone width
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] === 0) continue; // Already fully transparent cutout
        const r = data[i], g = data[i + 1], b = data[i + 2];
        // Only treat as background if ALL channels are near-white / light neutral
        const minChannel = Math.min(r, g, b);
        if (minChannel >= THRESHOLD) {
          // Linear ramp: THRESHOLD → alpha=255, THRESHOLD+FEATHER → alpha=0
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
  const [showProceedModal, setShowProceedModal] = useState(false);
  const soundEnabled = false; // Sounds disabled per design requirement
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
        setScannedMap(prev => {
          const next = { ...prev, [item.id]: true };
          if (Object.keys(next).length === EVIDENCE_ITEMS.length) {
            // All objects are scanned! Delay briefly so the user sees the 9th item scan, then pop up modal
            setTimeout(() => {
              setShowProceedModal(true);
              playSound('celebration', soundEnabled);
              try {
                confetti({
                  particleCount: 90,
                  spread: 70,
                  origin: { y: 0.6 }
                });
              } catch (e) {}
            }, 700);
          }
          return next;
        });
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
    setShowProceedModal(false);
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
          background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)',
          border: '5px solid #0284C7',
          borderRadius: '16px',
          boxShadow: '0 6px 24px rgba(217, 119, 6, 0.08), 0 0 10px rgba(2, 132, 199, 0.25)',
          padding: '0.85rem',
          boxSizing: 'border-box',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Subtle Corner Registration Ticks */}
          <div style={{ position: 'absolute', top: 8, left: 8, width: 10, height: 10, borderTop: '2px solid #E2E8F0', borderLeft: '2px solid #E2E8F0', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 8, right: 8, width: 10, height: 10, borderTop: '2px solid #E2E8F0', borderRight: '2px solid #E2E8F0', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 8, left: 8, width: 10, height: 10, borderBottom: '2px solid #E2E8F0', borderLeft: '2px solid #E2E8F0', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 8, right: 8, width: 10, height: 10, borderBottom: '2px solid #E2E8F0', borderRight: '2px solid #E2E8F0', pointerEvents: 'none' }} />

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
                      background: item.isMagnetic ? '#16A34A' : '#0284C7',
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
                    padding: '2px',
                    position: 'relative',
                    overflow: 'hidden',
                    marginBottom: '2px',
                  }}>
                    <img
                      src={getImgSrc(item)}
                      alt={item.name}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        display: 'block',
                        transition: 'transform 0.2s ease',
                        transform: ['bottle', 'compass', 'pencil'].includes(item.id) ? 'scale(1.2)' : 'none',
                      }}
                    />
                  </div>

                  {/* Card Footer: Object Name & Status Badge (Only when Scanning or Scanned) */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%', flexShrink: 0, alignItems: 'center', marginTop: 'auto' }}>
                    <div style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #214A70 0%, #173B5F 100%)',
                      borderRadius: '8px',
                      padding: '10px 4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(23, 59, 95, 0.25)',
                      boxSizing: 'border-box'
                    }}>
                      <span style={{
                        fontSize: ['clips', 'pens', 'ruler', 'eraser'].includes(item.id) ? '1.32rem' : '1.2rem',
                        fontWeight: 900,
                        color: '#FFFFFF',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        textAlign: 'center',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        {item.name}
                      </span>
                    </div>

                    {statusText && (
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        background: statusBg,
                        color: statusColor,
                        padding: '3px 10px',
                        borderRadius: '4px',
                        fontSize: '1.15rem',
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
          border: '5px solid #0284C7',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35), 0 0 10px rgba(2, 132, 199, 0.25)',
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

              {/* Proceed to Quiz HUD Button */}
              {isAllComplete && (
                <button
                  onClick={() => {
                    setShowProceedModal(false);
                    if (onComplete) onComplete();
                  }}
                  className="gold-glow-btn"
                  style={{
                    padding: '4px 11px',
                    fontSize: '0.78rem',
                    fontWeight: 900,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    cursor: 'pointer',
                    color: '#FFFFFF',
                    border: 'none',
                  }}
                  title="Proceed to Knowledge Quiz"
                >
                  <span>Proceed to Quiz</span>
                  <ArrowRight size={13} color="#FFFFFF" />
                </button>
              )}
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
            overflow: 'hidden',
          }}>
            {/* Dedicated Background Layer (Zoomed 10%) */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${ch4scannerBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: 'scale(1.1)',
              zIndex: 0,
            }} />

            {/* Subtle Sunlight & Depth Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.05) 0%, rgba(15, 23, 42, 0.2) 100%)',
              zIndex: 1,
              pointerEvents: 'none',
            }} />

            {/* Circular Radar Chamber Container - Transparent to reveal background pad */}
            <div style={{
              position: 'relative',
              width: 'min(395px, 82vw)',
              height: 'min(395px, 82vw)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
            }}>
              {/* CENTRAL GLOWING SCANNER HOLOGRAPHIC UI */}
              <div style={{
                position: 'relative',
                width: '320px',
                height: '320px',
                borderRadius: '50%',
                background: 'transparent',
                border: 'none',
                boxShadow: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                zIndex: 5,
              }}>
                {/* ACTIVE ITEM ON RADAR PAD */}
                {selectedItem ? (
                  <div style={{
                    position: 'relative',
                    width: '92%',
                    height: '92%',
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
                        maxWidth: '98%',
                        maxHeight: '98%',
                        objectFit: 'contain',
                        filter: scanState === 'scanning'
                          ? 'drop-shadow(0 0 28px rgba(0, 229, 255, 0.9)) drop-shadow(0 0 12px rgba(0,229,255,0.6)) brightness(1.1)'
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
                        background: '#00E5FF',
                        boxShadow: '0 0 14px #00E5FF, 0 0 24px #00BFFF',
                        zIndex: 6,
                        animation: 'laser-sweep-vertical 1.35s ease-in-out infinite',
                        pointerEvents: 'none',
                      }} />
                    )}
                  </div>
                ) : null}
              </div>

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

            {/* Scan results are now shown as a full-screen centered popup outside the scanner */}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SCAN RESULT — FULL-SCREEN CENTERED POPUP (moved from inside scanner)      */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedItem && scanState === 'complete' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(11, 17, 32, 0.72)',
              backdropFilter: 'blur(8px)',
              zIndex: 999998,
              padding: '1.5rem',
              boxSizing: 'border-box',
            }}
            onClick={() => {
              setScanState('idle');
              setSelectedItem(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.84, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.84, y: -10 }}
              transition={{ type: 'spring', damping: 22, stiffness: 280 }}
              onClick={(e) => {
                e.stopPropagation();
                setScanState('idle');
                setSelectedItem(null);
                if (isAllComplete && selectedItem.id === 'pencil') {
                   setShowTableModal(true);
                }
              }}
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: '90vw',
                maxHeight: '90vh',
                cursor: 'pointer',
              }}
            >
              <button
                style={{
                  position: 'absolute',
                  top: '-15px',
                  right: '-15px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  color: '#0F172A',
                  border: '2px solid #E2E8F0',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setScanState('idle');
                  setSelectedItem(null);
                  if (isAllComplete && selectedItem.id === 'pencil') {
                     setShowTableModal(true);
                  }
                }}
              >
                <span style={{ fontSize: '28px', color: '#000000', fontWeight: 'bold', lineHeight: 1, marginTop: '-2px' }}>&times;</span>
              </button>
              <img 
                src={selectedItem.popupImage} 
                alt={selectedItem.name + ' observation'} 
                style={{
                  maxWidth: '700px',
                  maxHeight: '65vh',
                  objectFit: 'contain',
                  borderRadius: '16px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* ALL OBJECTS SCANNED — PROCEED TO QUIZ CENTERED POP-UP MODAL               */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showProceedModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.72)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 999999,
              padding: '1.5rem',
              boxSizing: 'border-box',
            }}
            onClick={() => setShowProceedModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.86, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.86, y: -15 }}
              transition={{ type: 'spring', damping: 24, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#FFFFFF',
                borderRadius: '24px',
                border: '3px solid #86EFAC',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
                maxWidth: '670px',
                width: '100%',
                padding: '4rem 2.5rem 3rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '1.5rem',
                position: 'relative',
                boxSizing: 'border-box',
              }}
            >
              {/* Title & Badge */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', marginTop: '10px' }}>
                <span style={{
                  fontSize: '1.2rem',
                  fontWeight: 900,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: '#059669',
                  background: '#ECFDF5',
                  padding: '8px 20px',
                  borderRadius: '24px',
                  border: '1px solid #A7F3D0',
                }}>
                  ALL 9 ITEMS SCANNED
                </span>
                <h2 style={{
                  margin: 0,
                  fontSize: '2.8rem',
                  fontWeight: 900,
                  color: '#064E3B',
                  letterSpacing: '-0.01em',
                }}>
                  Evidence Collection Complete!
                </h2>
              </div>

              {/* Description & Results Container */}
              <div style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '20px',
                padding: '2rem',
                width: '100%',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.75rem',
              }}>
                <p style={{
                  margin: 0,
                  fontSize: '1.65rem',
                  lineHeight: 1.5,
                  fontWeight: 600,
                  color: '#1E293B',
                  textAlign: 'center',
                }}>
                  You have tested all 9 classroom items and determined which materials are attracted by a magnet.
                </p>
                
                {/* Side-by-side Large Result Boxes */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', width: '100%' }}>
                  <div style={{ 
                    flex: 1,
                    fontSize: '1.65rem', 
                    fontWeight: 800, 
                    color: '#064E3B', 
                    background: '#ECFDF5', 
                    padding: '1.25rem 1rem', 
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.1)',
                  }}>
                    <span style={{ fontSize: '2.1rem' }}>🧲</span> 3 Magnetic
                  </div>
                  <div style={{ 
                    flex: 1,
                    fontSize: '1.65rem', 
                    fontWeight: 800, 
                    color: '#0369A1', 
                    background: '#E0F2FE', 
                    padding: '1.25rem 1rem', 
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    boxShadow: '0 4px 12px rgba(14, 165, 233, 0.1)',
                  }}>
                    <span style={{ fontSize: '2.1rem' }}>⛔</span> 6 Non-Magnetic
                  </div>
                </div>
              </div>

              {/* Prominent Proceed Button */}
              <button
                onClick={() => {
                  setShowProceedModal(false);
                  if (onComplete) onComplete();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                  width: '100%',
                  maxWidth: '600px',
                  padding: '1.25rem',
                  fontSize: '1.65rem',
                  fontWeight: 900,
                  color: '#0F172A',
                  background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
                  borderRadius: '20px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(245, 158, 11, 0.35)',
                  transition: 'transform 0.1s ease',
                  marginTop: '0.5rem',
                }}
              >
                <span>Proceed to Knowledge Quiz →</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)',
              borderBottom: '1.5px solid #E2E8F0',
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
