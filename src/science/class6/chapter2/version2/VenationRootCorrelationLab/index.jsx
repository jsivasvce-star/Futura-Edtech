import React, { useState, useMemo, useEffect, useRef } from 'react';
import { RotateCcw, Check, Lightbulb, Leaf, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

import bgImg from './activity27_bg.jpg';
import { correlationAudio } from './correlationAudio';

import specimen01LemongrassBlended from './specimen_01_lemongrass_blended.png';
import specimen02MarigoldBlended from './specimen_02_marigold_blended.png';
import specimen03SadabaharBlended from './specimen_03_sadabahar_blended.png';
import specimen04ChickpeaBlended from './specimen_04_chickpea_blended.png';
import specimen05WheatBlended from './specimen_05_wheat_blended.png';

// =========================================================================
// FULLSCREEN SPECIMEN SLIDES (ACTIVITY 2.7) — EXACT 16:9 HD SPECIMENS
// =========================================================================
const CORRELATION_SPECIMEN_SLIDES = [
  {
    id: 1,
    num: '01',
    name: 'Lemongrass',
    venation: 'Parallel venation',
    root: 'Fibrous root system',
    image: specimen01LemongrassBlended
  },
  {
    id: 2,
    num: '02',
    name: 'Marigold',
    venation: 'Reticulate venation',
    root: 'Tap root system',
    image: specimen02MarigoldBlended
  },
  {
    id: 3,
    num: '03',
    name: 'Sadabahar (Periwinkle)',
    venation: 'Reticulate venation',
    root: 'Tap root system',
    image: specimen03SadabaharBlended
  },
  {
    id: 4,
    num: '04',
    name: 'Chickpea',
    venation: 'Reticulate venation',
    root: 'Tap root system',
    image: specimen04ChickpeaBlended
  },
  {
    id: 5,
    num: '05',
    name: 'Wheat',
    venation: 'Parallel venation',
    root: 'Fibrous root system',
    image: specimen05WheatBlended
  }
];

// Specimen photographs — 12 realistic botanical images
import lemongrassImg from './plants/lemongrass.jpg';
import marigoldImg from './plants/marigold.jpg';
import sadabaharImg from './plants/sadabahar.jpg';
import chickpeaImg from './plants/chickpea.jpg';
import wheatImg from './plants/wheat.jpg';
import maizeImg from './plants/maize.jpg';
import onionImg from './plants/onion.jpg';
import grassImg from './plants/grass.jpg';
import hibiscusImg from './plants/hibiscus.jpg';
import roseImg from './plants/rose.jpg';
import neemImg from './plants/neem.jpg';
import mangoImg from './plants/mango.jpg';

// =========================================================================
// NCERT CLASS 6 · TABLE 2.4 — leaf venation always tracks the root system:
// parallel venation -> fibrous roots, reticulate venation -> tap root.
// =========================================================================
const PLANTS = [
  { id: 'lemongrass', name: 'Lemongrass', img: lemongrassImg, venation: 'parallel', root: 'fibrous' },
  { id: 'marigold', name: 'Marigold', img: marigoldImg, venation: 'reticulate', root: 'tap' },
  { id: 'sadabahar', name: 'Sadabahar', img: sadabaharImg, venation: 'reticulate', root: 'tap' },
  { id: 'chickpea', name: 'Chickpea', img: chickpeaImg, venation: 'reticulate', root: 'tap' },
  { id: 'wheat', name: 'Wheat', img: wheatImg, venation: 'parallel', root: 'fibrous' },
  { id: 'maize', name: 'Maize', img: maizeImg, venation: 'parallel', root: 'fibrous' },
  { id: 'onion', name: 'Onion', img: onionImg, venation: 'parallel', root: 'fibrous' },
  { id: 'grass', name: 'Grass', img: grassImg, venation: 'parallel', root: 'fibrous' },
  { id: 'hibiscus', name: 'Hibiscus', img: hibiscusImg, venation: 'reticulate', root: 'tap' },
  { id: 'rose', name: 'Rose', img: roseImg, venation: 'reticulate', root: 'tap' },
  { id: 'neem', name: 'Neem', img: neemImg, venation: 'reticulate', root: 'tap' },
  { id: 'mango', name: 'Mango', img: mangoImg, venation: 'reticulate', root: 'tap' }
];

// Vector Icons & Drawings exactly matching Image 2
const StemHeaderIcon = () => (
  <svg width="34" height="34" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
    <path d="M7 25C7 25 8.5 15.5 18 8C24 3.5 27 4.5 27 4.5C27 4.5 27.5 7.5 22.5 13.5C14.5 23 7 25 7 25Z" fill="#0D472B"/>
    <path d="M7.5 24.5C13.5 18 19.5 12 26 5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M14 18.5C15 16.5 18 17 20 16" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M18 14.5C19 12.5 22 13 24 12" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M11 20.5C9.5 19.5 10.5 17.5 12.5 16.5" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M15 16.5C13.5 15.5 14.5 13.5 16.5 12.5" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const RootCircleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 2V8" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M12 8V22" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round"/>
    <path d="M12 11L6 16" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M12 11L18 16" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M12 15L8 19" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M12 15L16 19" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M9 13.5L7 11" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M15 13.5L17 11" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const ReticulateIcon = () => (
  <svg width="26" height="26" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
    <path d="M6 26C6 26 8 16 18 8C24 3.2 27 4 27 4C27 4 27.8 7 23 13C15 23 6 26 6 26Z" fill="#0D472B"/>
    <path d="M7 25C13 19 20 12 26 5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M13 19C14 17 17 18 19 17" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M17 15C18 13 21 14 23 13" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M11 21C9 20 10 18 12 17" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M15 17C13 16 14 14 16 13" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const ParallelIcon = () => (
  <svg width="26" height="26" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
    <path d="M8 27C11 19 16 10 24 5C23 13 18 22 10 28L8 27Z" fill="#0D472B"/>
    <path d="M9 26C13 18 18 10 23 6" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M11 27C14 20 18 13 22 8" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round"/>
    <path d="M8 25C11 17 16 9 21 5.5" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);

const FibrousIcon = () => (
  <svg width="26" height="26" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
    <path d="M16 3V9" stroke="#4A2411" strokeWidth="2.8" strokeLinecap="round"/>
    <path d="M16 9C12 15 8 21 6 28" stroke="#4A2411" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M16 9C20 15 24 21 26 28" stroke="#4A2411" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M16 9C14 16 12 23 10 29" stroke="#4A2411" strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 9C18 16 20 23 22 29" stroke="#4A2411" strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 9V29" stroke="#4A2411" strokeWidth="2" strokeLinecap="round"/>
    <path d="M11 18L7 22" stroke="#4A2411" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M21 18L25 22" stroke="#4A2411" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const TapIcon = () => (
  <svg width="26" height="26" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
    <path d="M12 4C10 2 8 2 8 2C8 2 9 4 11 5.5" stroke="#4A2411" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="#4A2411"/>
    <path d="M20 4C22 2 24 2 24 2C24 2 23 4 21 5.5" stroke="#4A2411" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="#4A2411"/>
    <path d="M16 6V1.5" stroke="#4A2411" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M12 6.5C12 6.5 12.5 16 15.5 27C15.7 27.8 16.3 27.8 16.5 27C19.5 16 20 6.5 20 6.5H12Z" fill="#4A2411"/>
    <path d="M13 11L7 13.5" stroke="#4A2411" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M19 11L25 13.5" stroke="#4A2411" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M14 16L8 19" stroke="#4A2411" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M18 16L24 19" stroke="#4A2411" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M14.8 21L10.5 24" stroke="#4A2411" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M17.2 21L21.5 24" stroke="#4A2411" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const ReticulateDrawing = () => (
  <svg width="86" height="66" viewBox="0 0 80 75" fill="none">
    <path d="M18 64C24 45 42 22 68 12C63 32 45 56 18 64Z" stroke="#8FA89B" strokeWidth="1.8" fill="rgba(143, 168, 155, 0.08)"/>
    <path d="M18 64C34 47 50 30 68 12" stroke="#8FA89B" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M30 52C36 46 44 48 48 44" stroke="#8FA89B" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M42 40C48 34 54 36 58 32" stroke="#8FA89B" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M25 57C28 50 32 48 36 46" stroke="#8FA89B" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M36 46C39 39 44 38 48 35" stroke="#8FA89B" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const ParallelDrawing = () => (
  <svg width="86" height="66" viewBox="0 0 80 75" fill="none">
    <path d="M22 66C28 46 42 24 64 12C57 32 42 54 24 67L22 66Z" stroke="#8FA89B" strokeWidth="1.8" fill="rgba(143, 168, 155, 0.08)"/>
    <path d="M23 64C30 46 42 26 62 13" stroke="#8FA89B" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M26 66C33 48 46 29 60 17" stroke="#8FA89B" strokeWidth="1.1" strokeLinecap="round"/>
    <path d="M20 62C27 43 38 23 58 12" stroke="#8FA89B" strokeWidth="1.1" strokeLinecap="round"/>
  </svg>
);

const FibrousDrawing = () => (
  <svg width="86" height="66" viewBox="0 0 80 75" fill="none">
    <path d="M40 8V20" stroke="#B09B88" strokeWidth="2" strokeLinecap="round"/>
    <path d="M40 20C32 32 22 45 16 64" stroke="#B09B88" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M40 20C48 32 58 45 64 64" stroke="#B09B88" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M40 20C37 35 34 48 32 66" stroke="#B09B88" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M40 20C43 35 46 48 48 66" stroke="#B09B88" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M40 20V67" stroke="#B09B88" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M27 38L20 46" stroke="#B09B88" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M53 38L60 46" stroke="#B09B88" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M35 44L28 53" stroke="#B09B88" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M45 44L52 53" stroke="#B09B88" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const TapDrawing = () => (
  <svg width="86" height="66" viewBox="0 0 80 75" fill="none">
    <path d="M37 8H43L41 24C40.5 40 40.2 55 40 68C39.8 55 39.5 40 39 24L37 8Z" stroke="#B09B88" strokeWidth="1.8" fill="rgba(176, 155, 136, 0.12)"/>
    <path d="M39 24L26 33" stroke="#B09B88" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M41 26L54 35" stroke="#B09B88" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M39.5 36L28 47" stroke="#B09B88" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M40.5 38L52 49" stroke="#B09B88" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M39.8 48L32 58" stroke="#B09B88" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M40.2 50L48 60" stroke="#B09B88" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M29 40L23 44" stroke="#B09B88" strokeWidth="1.1" strokeLinecap="round"/>
    <path d="M51 42L57 46" stroke="#B09B88" strokeWidth="1.1" strokeLinecap="round"/>
  </svg>
);

const ZONES = [
  { id: 'reticulate', group: 'venation', label: 'Reticulate venation', icon: <ReticulateIcon />, drawing: <ReticulateDrawing /> },
  { id: 'parallel', group: 'venation', label: 'Parallel venation', icon: <ParallelIcon />, drawing: <ParallelDrawing /> },
  { id: 'fibrous', group: 'root', label: 'Fibrous root', icon: <FibrousIcon />, drawing: <FibrousDrawing /> },
  { id: 'tap', group: 'root', label: 'Tap root', icon: <TapIcon />, drawing: <TapDrawing /> }
];


const TONE = {
  venation: {
    panelBg: '#EDF7ED',
    panelBorder: '#C8E6C9',
    zoneCardBg: '#E8F5EC',
    zoneCardBorder: '#C8E6C9',
    zoneDropBg: 'rgba(255, 255, 255, 0.45)',
    zoneDropBorder: '#A5D6A7',
    heading: '#0F3D24',
    badge: '#0D472B',
    dropText: '#8A9A86'
  },
  root: {
    panelBg: '#FBF2E9',
    panelBorder: '#E5D0BA',
    zoneCardBg: '#F6E8D7',
    zoneCardBorder: '#E8DACB',
    zoneDropBg: 'rgba(255, 255, 255, 0.45)',
    zoneDropBorder: '#D7CCC8',
    heading: '#3E1E0F',
    badge: '#4A2411',
    dropText: '#9E8E7E'
  }
};

export default function VenationRootCorrelationLab({ onBackToDashboard, onPreviousPage, onNext, initialPhase = 'specimens' }) {
  const [phase, setPhase] = useState(initialPhase); // 'specimens' | 'lab'
  const [specimenIndex, setSpecimenIndex] = useState(0);

  // plantId -> { venation: zoneId | null, root: zoneId | null }
  const [placements, setPlacements] = useState({});
  const [checked, setChecked] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [dragId, setDragId] = useState(null);
  const [hoverZone, setHoverZone] = useState(null);
  const [touchPoint, setTouchPoint] = useState(null); // { x, y } while dragging a plant card (mouse or touch)
  const pointerDrag = useRef(null); // { pointerId, plantId, startX, startY, moved }
  const [hoverPos, setHoverPos] = useState(null); // { x, y } cursor position while a plant is click-selected, for the follow-the-cursor preview

  useEffect(() => {
    if (phase !== 'specimens') return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        if (specimenIndex > 0) {
          setSpecimenIndex(prev => prev - 1);
          correlationAudio.playSwitch();
        } else if (onPreviousPage) {
          onPreviousPage();
        } else if (onBackToDashboard) {
          onBackToDashboard();
        }
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        if (specimenIndex < CORRELATION_SPECIMEN_SLIDES.length - 1) {
          setSpecimenIndex(prev => prev + 1);
          correlationAudio.playSwitch();
        } else {
          setPhase('lab');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, specimenIndex, onPreviousPage, onBackToDashboard]);

  // Follow-the-cursor preview: once a plant is click-selected, its thumbnail
  // tracks the mouse so the user can visually "carry" it over to a box and click to drop it.
  useEffect(() => {
    if (!selectedId || phase !== 'lab') {
      setHoverPos(null);
      return;
    }
    const handleMove = (e) => {
      setHoverPos({ x: e.clientX, y: e.clientY });
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const zoneEl = el && el.closest('[data-zone]');
      setHoverZone(zoneEl ? zoneEl.getAttribute('data-zone') : null);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [selectedId, phase]);

  const getPlacement = (plantId) => placements[plantId] || { venation: null, root: null };

  const assign = (plantId, zone) => {
    if (!plantId) return;
    const current = placements[plantId] || { venation: null, root: null };
    const otherGroup = zone.group === 'venation' ? 'root' : 'venation';

    setPlacements(prev => ({
      ...prev,
      [plantId]: { ...(prev[plantId] || { venation: null, root: null }), [zone.group]: zone.id }
    }));
    setChecked(false);

    // If the other group hasn't been assigned yet, keep the plant selected for easy 1-2 tapping!
    if (!current[otherGroup]) {
      setSelectedId(plantId);
    } else {
      setSelectedId(null);
    }
  };

  const unassign = (plantId, group) => {
    setPlacements(prev => ({
      ...prev,
      [plantId]: { ...getPlacement(plantId), [group]: null }
    }));
    setChecked(false);
  };

  const plantsInZone = (zone) =>
    PLANTS.filter(p => getPlacement(p.id)[zone.group] === zone.id);

  const isZoneSolved = (zone) => {
    const expected = PLANTS.filter(p => p[zone.group] === zone.id).map(p => p.id).sort();
    const actual = plantsInZone(zone).map(p => p.id).sort();
    return expected.length === actual.length && expected.every((id, i) => id === actual[i]);
  };

  const solvedCount = useMemo(
    () => ZONES.filter(isZoneSolved).length,
    [placements] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const allPlaced = PLANTS.every(p => {
    const pl = getPlacement(p.id);
    return pl.venation && pl.root;
  });

  const allSolved = solvedCount === ZONES.length;

  const handleCheck = () => {
    setChecked(true);
    if (allSolved) {
      confetti({ particleCount: 140, spread: 78, origin: { y: 0.6 } });
    }
  };

  const handleClear = () => {
    setPlacements({});
    setChecked(false);
    setSelectedId(null);
  };

  // ---------------------------------------------------------------------
  const PlantCard = ({ plant }) => {
    const pl = getPlacement(plant.id);
    const done = pl.venation && pl.root;
    const isSelected = selectedId === plant.id;

    return (
      <button
        type="button"
        data-plant={plant.id}
        onPointerDown={(e) => {
          if (e.pointerType === 'mouse' && e.button !== 0) return;
          pointerDrag.current = { pointerId: e.pointerId, plantId: plant.id, startX: e.clientX, startY: e.clientY, moved: false };
          try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) {}
        }}
        onPointerMove={(e) => {
          const drag = pointerDrag.current;
          if (!drag || drag.plantId !== plant.id || drag.pointerId !== e.pointerId) return;
          const dx = e.clientX - drag.startX;
          const dy = e.clientY - drag.startY;
          if (!drag.moved && Math.hypot(dx, dy) > 6) {
            drag.moved = true;
            setDragId(plant.id);
          }
          if (drag.moved) {
            setTouchPoint({ x: e.clientX, y: e.clientY });
            const el = document.elementFromPoint(e.clientX, e.clientY);
            const zoneEl = el && el.closest('[data-zone]');
            setHoverZone(zoneEl ? zoneEl.getAttribute('data-zone') : null);
          }
        }}
        onPointerUp={(e) => {
          const drag = pointerDrag.current;
          if (drag && drag.plantId === plant.id && drag.pointerId === e.pointerId) {
            if (drag.moved) {
              const el = document.elementFromPoint(e.clientX, e.clientY);
              const zoneEl = el && el.closest('[data-zone]');
              if (zoneEl) {
                const zone = ZONES.find(z => z.id === zoneEl.getAttribute('data-zone'));
                if (zone) assign(plant.id, zone);
              }
            } else {
              setSelectedId(isSelected ? null : plant.id);
            }
          }
          pointerDrag.current = null;
          setDragId(null);
          setHoverZone(null);
          setTouchPoint(null);
        }}
        onPointerCancel={() => {
          pointerDrag.current = null;
          setDragId(null);
          setHoverZone(null);
          setTouchPoint(null);
        }}
        title={done ? `${plant.name} - filed in both groups` : `Select ${plant.name}, then click a group`}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          width: '100%',
          height: '100%',
          minHeight: 0,
          background: '#FFFFFF',
          border: `2.5px solid ${isSelected ? '#F59E0B' : done ? '#16A34A' : 'rgba(15, 23, 42, 0.12)'}`,
          borderRadius: '14px',
          padding: 0,
          overflow: 'hidden',
          cursor: 'grab',
          touchAction: 'none',
          textAlign: 'left',
          boxShadow: isSelected
            ? '0 10px 24px rgba(245, 158, 11, 0.45)'
            : '0 4px 12px rgba(15, 23, 42, 0.14)',
          opacity: dragId === plant.id ? 0.45 : 1,
          transform: isSelected ? 'translateY(-3px)' : 'none',
          transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
          fontFamily: '"Outfit", sans-serif'
        }}
      >
        {/* Portrait specimen photo fills the card */}
        <div style={{
          flex: 1,
          minHeight: 0,
          width: '100%',
          overflow: 'hidden',
          background: '#FFFFFF'
        }}>
          <img
            src={plant.img}
            alt={plant.name}
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '50% 30%',
              display: 'block'
            }}
          />
        </div>

        <div style={{
          width: '100%',
          boxSizing: 'border-box',
          flexShrink: 0,
          padding: '5px 6px',
          background: '#FFFFFF',
          borderTop: '1.5px solid rgba(15, 23, 42, 0.08)',
          fontSize: '18px',
          fontWeight: 800,
          color: '#14532D',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {plant.name}
          </span>
        </div>

        {/* Venation/root placement status dots — moved onto the image corner so the name bar can stay centered */}
        <span style={{ position: 'absolute', top: '7px', left: '7px', display: 'flex', gap: '4px' }}>
          <span style={{
            width: '10px', height: '10px', borderRadius: '50%',
            background: pl.venation ? '#16A34A' : 'rgba(255,255,255,0.55)',
            border: '1px solid rgba(15,23,42,0.25)'
          }} />
          <span style={{
            width: '10px', height: '10px', borderRadius: '50%',
            background: pl.root ? '#B45309' : 'rgba(255,255,255,0.55)',
            border: '1px solid rgba(15,23,42,0.25)'
          }} />
        </span>

        {done && (
          <span style={{
            position: 'absolute', top: '7px', right: '7px',
            width: '26px', height: '26px', borderRadius: '50%',
            background: '#16A34A', color: '#FFFFFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '15px', fontWeight: 900,
            boxShadow: '0 2px 7px rgba(0,0,0,0.35)'
          }}>&#10003;</span>
        )}
      </button>
    );
  };

  // ---------------------------------------------------------------------
  // Drop Zone exactly matching Image 2
  const DropZone = ({ zone }) => {
    const tone = TONE[zone.group];
    const members = plantsInZone(zone);
    const solved = isZoneSolved(zone);
    const isHover = hoverZone === zone.id;

    return (
      <div
        data-zone={zone.id}
        onClick={() => selectedId && assign(selectedId, zone)}
        style={{
          background: tone.zoneCardBg,
          border: `1px solid ${tone.zoneCardBorder}`,
          borderRadius: '14px',
          padding: '8px 9px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          minWidth: 0,
          cursor: selectedId ? 'copy' : 'default',
          transition: 'background 0.15s ease, border-color 0.15s ease'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', minWidth: 0 }}>
          <span style={{
            display: 'flex', alignItems: 'center', gap: '7px',
            fontSize: '19px', fontWeight: 900, color: tone.heading,
            fontFamily: '"Fraunces", Georgia, serif',
            whiteSpace: 'nowrap',
            minWidth: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {zone.icon}
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{zone.label}</span>
          </span>
          {checked && (
            <span style={{
              fontSize: '13px', fontWeight: 900,
              color: solved ? '#166534' : '#B91C1C',
              background: solved ? '#DCFCE7' : '#FEE2E2',
              border: `1.5px solid ${solved ? '#86EFAC' : '#FCA5A5'}`,
              padding: '1px 7px', borderRadius: '999px', whiteSpace: 'nowrap',
              flexShrink: 0
            }}>
              {solved ? 'Correct' : 'Not yet'}
            </span>
          )}
        </div>

        {/* Inner dashed drop box */}
        <div style={{
          flex: 1,
          minHeight: '52px',
          background: isHover ? 'rgba(255, 255, 255, 0.95)' : tone.zoneDropBg,
          border: `1.5px dashed ${isHover ? '#F59E0B' : checked && solved ? '#16A34A' : tone.zoneDropBorder}`,
          borderRadius: '12px',
          padding: '6px 8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: members.length === 0 ? 'center' : 'flex-start',
          justifyContent: members.length === 0 ? 'center' : 'flex-start',
          gap: '6px',
          transition: 'border-color 0.15s ease, background 0.15s ease'
        }}>
          {members.length === 0 ? (
            <>
              {zone.drawing}
              <span style={{
                fontSize: '17px',
                fontStyle: 'italic',
                fontWeight: 600,
                color: tone.dropText,
                fontFamily: '"Outfit", sans-serif'
              }}>
                Drop plants here
              </span>
            </>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', width: '100%' }}>
              {members.map(p => {
                const right = p[zone.group] === zone.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={(e) => { e.stopPropagation(); unassign(p.id, zone.group); }}
                    title={`Remove ${p.name}`}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '5px',
                      background: checked ? (right ? '#DCFCE7' : '#FEE2E2') : '#FFFFFF',
                      border: `1.5px solid ${checked ? (right ? '#4ADE80' : '#FCA5A5') : 'rgba(15,23,42,0.15)'}`,
                      borderRadius: '999px',
                      padding: '2px 8px 2px 3px',
                      fontSize: '17px', fontWeight: 800, color: '#14532D',
                      cursor: 'pointer', fontFamily: '"Outfit", sans-serif',
                      boxShadow: '0 2px 5px rgba(15,23,42,0.08)'
                    }}
                  >
                    <img
                      src={p.img}
                      alt=""
                      style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <span>{p.name}</span>
                    {checked && <span>{right ? '✓' : '✕'}</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ---------------------------------------------------------------------
  // Group Panel exactly matching Image 2
  const GroupPanel = ({ title, icon, group }) => {
    const tone = TONE[group];
    return (
      <div style={{
        background: tone.panelBg,
        border: `1.5px solid ${tone.panelBorder}`,
        borderRadius: '18px',
        padding: '8px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        flex: 1,
        minHeight: 0,
        overflow: 'hidden',
        boxShadow: '0 4px 16px rgba(0,0,0,0.04)'
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          fontSize: '19px', fontWeight: 900, color: tone.heading,
          fontFamily: '"Fraunces", Georgia, serif',
          flexShrink: 0
        }}>
          {group === 'venation' ? (
            icon
          ) : (
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: tone.badge,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0
            }}>
              {icon}
            </div>
          )}
          {title}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '8px', alignItems: 'stretch', flex: 1, minWidth: 0 }}>
          {ZONES.filter(z => z.group === group).map(z => <DropZone key={z.id} zone={z} />)}
        </div>
      </div>
    );
  };

  if (phase === 'specimens') {
    const activeSlide = CORRELATION_SPECIMEN_SLIDES[specimenIndex];
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#07160E',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        zIndex: 1000
      }}>
        <style>{`
          html, body, #root {
            overflow: hidden !important;
            height: 100vh !important;
          }
        `}</style>

        {/* Exact 16:9 Aspect-Ratio Container without pixel break */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          maxWidth: 'calc(100vh * (16 / 9))',
          maxHeight: 'calc(100vw * (9 / 16))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img
            src={activeSlide.image}
            alt={activeSlide.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
              userSelect: 'none',
              filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.5))'
            }}
          />
        </div>

        {/* Title pill (Habitats Page style) */}
        {(() => {
          const displayTitle = activeSlide.name;
          const isLong = displayTitle.length > 18;
          return (
            <div style={{
              position: 'absolute',
              top: '22px',
              left: '50%',
              transform: 'translateX(-50%)',
              maxWidth: '78vw',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '2px solid rgba(253, 230, 138, 0.85)',
              borderRadius: '14px',
              padding: isLong ? '8px 24px' : '8px 32px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75)',
              zIndex: 1010
            }}>
              <h1 style={{
                margin: 0,
                fontSize: isLong ? '20px' : '28px',
                fontWeight: 900,
                fontFamily: '"Fraunces", Georgia, serif',
                color: '#FFFBEB',
                lineHeight: 1.15,
                whiteSpace: 'nowrap',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 14px rgba(253, 230, 138, 0.55)'
              }}>
                {displayTitle}
              </h1>
            </div>
          );
        })()}

        {/* Floating Bottom Left Control: Back */}
        <button
          onClick={() => {
            correlationAudio.playSwitch();
            if (specimenIndex > 0) {
              setSpecimenIndex(prev => prev - 1);
            } else if (onPreviousPage) {
              onPreviousPage();
            } else if (onBackToDashboard) {
              onBackToDashboard();
            }
          }}
          style={{
            position: 'absolute',
            bottom: '22px',
            left: '26px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '2px solid rgba(253, 230, 138, 0.85)',
            borderRadius: '26px',
            padding: '10px 22px',
            fontSize: '18px',
            fontWeight: 900,
            color: '#FFFBEB',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75)',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 14px rgba(253, 230, 138, 0.55)',
            zIndex: 1010,
            transition: 'all 0.18s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Back
        </button>

        {/* Floating Bottom Center: Progress Indicators */}
        <div style={{
          position: 'absolute',
          bottom: '22px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(4, 26, 16, 0.85)',
          border: '1.5px solid rgba(110, 231, 183, 0.4)',
          borderRadius: '24px',
          padding: '7px 18px',
          backdropFilter: 'blur(4px)',
          zIndex: 1010,
          boxShadow: '0 4px 16px rgba(0,0,0,0.35)'
        }}>
          {CORRELATION_SPECIMEN_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                correlationAudio.playSwitch();
                setSpecimenIndex(idx);
              }}
              style={{
                width: idx === specimenIndex ? '28px' : '10px',
                height: '10px',
                borderRadius: '5px',
                background: idx === specimenIndex ? '#34D399' : 'rgba(255, 255, 255, 0.35)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.25s ease'
              }}
              title={`Specimen ${s.num}: ${s.name}`}
            />
          ))}
          <span style={{ color: '#A7F3D0', fontWeight: 800, fontSize: '14px', marginLeft: '6px', fontFamily: '"Outfit", sans-serif' }}>
            {specimenIndex + 1} / {CORRELATION_SPECIMEN_SLIDES.length}
          </span>
        </div>

        {/* Floating Bottom Right: Next Slide or Enter Lab */}
        <button
          onClick={() => {
            correlationAudio.playSwitch();
            if (specimenIndex < CORRELATION_SPECIMEN_SLIDES.length - 1) {
              setSpecimenIndex(prev => prev + 1);
            } else {
              setPhase('lab');
            }
          }}
          style={{
            position: 'absolute',
            bottom: '22px',
            right: '26px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '2px solid rgba(253, 230, 138, 0.85)',
            borderRadius: '28px',
            padding: '11px 26px',
            fontSize: '18px',
            fontWeight: 900,
            color: '#FFFBEB',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75)',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 14px rgba(253, 230, 138, 0.55)',
            zIndex: 1010,
            transition: 'all 0.18s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {specimenIndex < CORRELATION_SPECIMEN_SLIDES.length - 1 ? 'Next' : 'Enter Activity 2.7 Lab'}
        </button>

      </div>
    );
  }

  return (
    <div style={{
      flex: 1,
      minHeight: 0,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      padding: '0.7rem 1rem',
      boxSizing: 'border-box',
      overflow: 'hidden',
      backgroundImage: `url(${bgImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: '#DCEBF5',
      fontFamily: '"Outfit", sans-serif'
    }}>

      {/* ---------------- Header: wooden title sign + progress ---------------- */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '14px', flexShrink: 0 }}>
        <div style={{
          background: 'linear-gradient(170deg, #D6A96A 0%, #BE8B4A 48%, #A3702F 100%)',
          border: '3px solid #8A5C22',
          borderRadius: '10px',
          padding: '8px 22px 10px',
          boxShadow: '0 10px 26px rgba(60, 38, 10, 0.45)'
        }}>
          <div style={{
            fontSize: '28px', fontWeight: 900, color: '#2A1706', lineHeight: 1.12,
            fontFamily: '"Fraunces", Georgia, serif'
          }}>
            Activity 2.7: Let us relate and analyse
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#4A2E10', fontStyle: 'italic', marginTop: '2px' }}>
            Explore. Observe. Group. Learn.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '9px',
            background: 'rgba(255, 255, 255, 0.93)',
            border: '2px solid rgba(22, 101, 52, 0.25)',
            borderRadius: '999px',
            padding: '7px 16px',
            fontSize: '20px', fontWeight: 900, color: '#14532D',
            boxShadow: '0 6px 18px rgba(15, 23, 42, 0.18)'
          }}>
            <Leaf size={17} color="#16A34A" />
            <span>Venation &amp; Root</span>
          </div>

          <div style={{
            background: 'linear-gradient(170deg, #C08F4E 0%, #9A6C2E 100%)',
            border: '2.5px solid #7A5320',
            borderRadius: '10px',
            padding: '6px 16px',
            textAlign: 'center',
            boxShadow: '0 8px 20px rgba(60, 38, 10, 0.42)'
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              fontSize: '26px', fontWeight: 900, color: '#FFF7E3',
              fontFamily: '"Fraunces", Georgia, serif'
            }}>
              <Trophy size={17} color="#FDE68A" />
              {solvedCount} / {ZONES.length}
            </div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#FBE7C0', marginTop: '-1px' }}>
              groups complete
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Grouping rule ---------------- */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        background: 'rgba(255, 255, 255, 0.92)',
        border: '2px solid rgba(22, 101, 52, 0.18)',
        borderRadius: '999px',
        padding: '7px 18px',
        flexShrink: 0,
        boxShadow: '0 5px 16px rgba(15, 23, 42, 0.12)'
      }}>
        <Lightbulb size={18} color="#D97706" />
        <span style={{ fontSize: '20px', fontWeight: 900, color: '#14532D' }}>Grouping rule:</span>
        <span style={{ fontSize: '20px', fontWeight: 600, color: '#334155' }}>
          {selectedId
            ? `${PLANTS.find(p => p.id === selectedId)?.name} selected — now click the group it belongs to.`
            : 'Drag a plant from the left into the correct venation group and the correct root group. (You can also tap a plant, then tap a group.)'}
        </span>
      </div>

      {/* ---------------- Main: plants dock + grouping panels ---------------- */}
      <div style={{
        flex: 1,
        minHeight: 0,
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 58fr) minmax(0, 42fr)',
        gap: '12px'
      }}>
        {/* Plants dock */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.93)',
          border: '2px solid rgba(22, 101, 52, 0.18)',
          borderRadius: '18px',
          padding: '12px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          minHeight: 0,
          boxShadow: '0 10px 28px rgba(15, 23, 42, 0.16)'
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            fontSize: '27px', fontWeight: 900, color: '#14532D',
            fontFamily: '"Fraunces", Georgia, serif', flexShrink: 0
          }}>
            <span style={{
              width: '34px', height: '34px', borderRadius: '50%',
              background: '#166534', color: '#FFFFFF',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px'
            }}>🌿</span>
            Plants
          </div>

          <div style={{
            flex: 1,
            minHeight: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gridTemplateRows: 'repeat(3, minmax(0, 1fr))',
            gap: '10px'
          }}>
            {PLANTS.map(p => <PlantCard key={p.id} plant={p} />)}
          </div>
        </div>

        {/* Grouping panels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minHeight: 0 }}>
          <GroupPanel title="Type of stem" icon={<StemHeaderIcon />} group="venation" />
          <GroupPanel title="Type of root" icon={<RootCircleIcon />} group="root" />
        </div>
      </div>

      {/* ---------------- Footer: hint, clear, check, navigation ---------------- */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        <button
          type="button"
          onClick={onPreviousPage || onBackToDashboard}
          style={footBtn('habitat')}
        >
          <span>Previous</span>
        </button>

        <div style={{
          flex: 1,
          minWidth: 0,
          display: 'flex', alignItems: 'center', gap: '9px',
          background: 'rgba(255, 255, 255, 0.92)',
          border: '2px solid rgba(22, 101, 52, 0.18)',
          borderRadius: '999px',
          padding: '7px 18px',
          boxShadow: '0 5px 16px rgba(15, 23, 42, 0.12)'
        }}>
          <Leaf size={17} color="#16A34A" />
          <span style={{
            fontSize: '20px', fontWeight: 700, color: '#334155',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
          }}>
            {checked && allSolved
              ? 'Every group is correct — parallel veins always go with fibrous roots, and reticulate veins with a tap root.'
              : checked
              ? 'Some plants are in the wrong group. Look at the leaf veins again, then fix the red ones.'
              : 'Look for a feature shared by every member of a group.'}
          </span>
        </div>

        <button type="button" onClick={handleClear} style={footBtn('ghost')}>
          <RotateCcw size={16} />
          <span>Clear</span>
        </button>

        <button
          type="button"
          onClick={handleCheck}
          disabled={!allPlaced}
          title={allPlaced ? 'Check my answers' : 'Place every plant in a venation group and a root group first'}
          style={footBtn(allPlaced ? 'check' : 'disabled')}
        >
          <Check size={17} />
          <span>{allPlaced ? 'Check my answers' : 'Place all 12 plants'}</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          title="Next: Activity 2.8 Seed Dissection"
          style={footBtn('habitat')}
        >
          <span>Next</span>
        </button>
      </div>

      {/* Floating preview that follows the finger while touch-dragging a plant card */}
      {(touchPoint || hoverPos) && (dragId || selectedId) && (() => {
        const activePos = touchPoint || hoverPos;
        const activePlantId = dragId || selectedId;
        const draggedPlant = PLANTS.find(p => p.id === activePlantId);
        if (!draggedPlant) return null;
        return (
          <div
            style={{
              position: 'fixed',
              left: activePos.x,
              top: activePos.y,
              transform: 'translate(-50%, -120%)',
              width: '92px',
              height: '110px',
              borderRadius: '14px',
              overflow: 'hidden',
              background: '#FFFFFF',
              border: '2.5px solid #F59E0B',
              boxShadow: '0 14px 30px rgba(0, 0, 0, 0.35)',
              pointerEvents: 'none',
              zIndex: 2000,
              opacity: 0.94
            }}
          >
            <img
              src={draggedPlant.img}
              alt=""
              style={{ width: '100%', height: '76%', objectFit: 'cover', objectPosition: '50% 30%', display: 'block' }}
            />
            <div style={{
              fontSize: '13px', fontWeight: 800, color: '#14532D',
              textAlign: 'center', padding: '2px 4px', fontFamily: '"Outfit", sans-serif'
            }}>
              {draggedPlant.name}
            </div>
          </div>
        );
      })()}
    </div>
  );
}

// Shared footer button styling
function footBtn(kind) {
  const base = {
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
    borderRadius: '999px',
    padding: '9px 20px',
    fontSize: '20px',
    fontWeight: 900,
    fontFamily: '"Outfit", sans-serif',
    cursor: 'pointer',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease'
  };

  if (kind === 'habitat') {
    return {
      ...base,
      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '2px solid rgba(253, 230, 138, 0.85)',
      color: '#FFFBEB',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75)',
      textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 14px rgba(253, 230, 138, 0.55)'
    };
  }
  if (kind === 'primary') {
    return {
      ...base,
      background: 'linear-gradient(135deg, #F5B534 0%, #D97706 100%)',
      color: '#FFFFFF',
      border: '2px solid #FDE68A',
      boxShadow: '0 8px 22px rgba(217, 119, 6, 0.5)'
    };
  }
  if (kind === 'check') {
    return {
      ...base,
      background: 'linear-gradient(180deg, #17803D 0%, #0F5132 100%)',
      color: '#FFFFFF',
      border: '2px solid rgba(167, 243, 208, 0.5)',
      boxShadow: '0 8px 20px rgba(6, 60, 34, 0.45)'
    };
  }
  if (kind === 'disabled') {
    return {
      ...base,
      background: 'rgba(255, 255, 255, 0.96)',
      color: 'rgba(15, 23, 42, 0.58)',
      border: '2px solid rgba(15, 23, 42, 0.18)',
      cursor: 'not-allowed',
      boxShadow: '0 5px 14px rgba(15, 23, 42, 0.16)'
    };
  }
  return {
    ...base,
    background: 'rgba(255, 255, 255, 0.93)',
    color: '#14532D',
    border: '2px solid rgba(22, 101, 52, 0.22)',
    boxShadow: '0 5px 14px rgba(15, 23, 42, 0.14)'
  };
}
