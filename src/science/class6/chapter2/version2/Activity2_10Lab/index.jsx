import React, { useState, useEffect } from 'react';
import { Check, RotateCcw, Volume2, VolumeX, Sparkles, X, Award, ArrowLeft, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakNaturalIndianMale, stopNarration } from '../../../../../services/elevenLabsService';
import { habitatAudio } from '../AnimalHabitatExplorer/habitatAudio';

// Image assets for Activity 2.10
import bgWoodenDeck from './images/bg_wooden_deck.jpg';

import regionDesert from './images/region_desert.jpg';
import regionMountains from './images/region_mountains.jpg';
import regionOcean from './images/region_ocean.jpg';
import regionForest from './images/region_forest.jpg';
import regionOther from './images/region_other.jpg';

import itemCamel from './images/item_camel.jpg';
import itemCactus from './images/item_cactus.jpg';
import itemDeodarTree from './images/item_deodar_tree.jpg';
import itemSnowLeopard from './images/item_snow_leopard.jpg';
import itemFish from './images/item_fish.jpg';
import itemDolphin from './images/item_dolphin.jpg';
import itemLion from './images/item_lion.jpg';
import itemElephant from './images/item_elephant.jpg';
import itemMangoTree from './images/item_mango_tree.jpg';
import itemPineTree from './images/item_pine_tree.jpg';
import itemKangaroo from './images/item_kangaroo.jpg';
import itemCoral from './images/item_coral.jpg';
import itemWhale from './images/item_whale.jpg';
import itemTurtle from './images/item_turtle.jpg';
import itemPeacock from './images/item_peacock.jpg';
import itemFern from './images/item_fern.jpg';
import itemLotus from './images/item_lotus.jpg';
import itemWaterLily from './images/item_water_lily.jpg';

// Regions configuration matching Table 2.6 columns
export const REGIONS = [
  { id: 'desert', label: 'In the desert', headerBg: '#FFEDD5', headerColor: '#9A3412', image: regionDesert },
  { id: 'mountains', label: 'On mountains', headerBg: '#E0F2FE', headerColor: '#0369A1', image: regionMountains },
  { id: 'ocean', label: 'In the ocean', headerBg: '#CFFAFE', headerColor: '#0E7490', image: regionOcean },
  { id: 'forest', label: 'In the forest', headerBg: '#DCFCE7', headerColor: '#15803D', image: regionForest },
  { id: 'other', label: 'Any other region', headerBg: '#CCFBF1', headerColor: '#0F766E', image: regionOther }
];

// All 18 Specimen cards in exact order as the mockup image
export const SPECIMENS = [
  // Row 1 of drawer (9 items)
  { id: 'camel', name: 'Camel', image: itemCamel, correctRegions: ['desert'] },
  { id: 'cactus', name: 'Cactus', image: itemCactus, correctRegions: ['desert'] },
  { id: 'deodar_tree', name: 'Deodar tree', image: itemDeodarTree, correctRegions: ['mountains'] },
  { id: 'snow_leopard', name: 'Snow leopard', image: itemSnowLeopard, correctRegions: ['mountains'] },
  { id: 'fish', name: 'Fish', image: itemFish, correctRegions: ['ocean', 'other'] },
  { id: 'dolphin', name: 'Dolphin', image: itemDolphin, correctRegions: ['ocean'] },
  { id: 'lion', name: 'Lion', image: itemLion, correctRegions: ['forest'] },
  { id: 'elephant', name: 'Elephant', image: itemElephant, correctRegions: ['forest'] },
  { id: 'mango_tree', name: 'Mango tree', image: itemMangoTree, correctRegions: ['forest', 'other'] },

  // Row 2 of drawer (9 items)
  { id: 'pine_tree', name: 'Pine tree', image: itemPineTree, correctRegions: ['mountains'] },
  { id: 'kangaroo', name: 'Kangaroo', image: itemKangaroo, correctRegions: ['other', 'desert'] },
  { id: 'coral', name: 'Coral', image: itemCoral, correctRegions: ['ocean'] },
  { id: 'whale', name: 'Whale', image: itemWhale, correctRegions: ['ocean'] },
  { id: 'turtle', name: 'Turtle', image: itemTurtle, correctRegions: ['ocean', 'other'] },
  { id: 'peacock', name: 'Peacock', image: itemPeacock, correctRegions: ['forest'] },
  { id: 'fern', name: 'Fern', image: itemFern, correctRegions: ['forest'] },
  { id: 'lotus', name: 'Lotus', image: itemLotus, correctRegions: ['other'] },
  { id: 'water_lily', name: 'Water lily', image: itemWaterLily, correctRegions: ['other'] }
];

// Row 1 pre-filled default examples from NCERT Table 2.6
const PREFILLED_ROW_1 = {
  desert: 'Camel',
  mountains: 'Deodar tree',
  ocean: 'Fish',
  forest: 'Lion'
};

export default function Activity2_10Lab({ onBack, onComplete, onNext, onPrevious }) {
  // Table grid state: 4 rows x 5 regions
  // Row 1: desert, mountains, ocean, forest are pre-filled in textbook, 'r1-other' is droppable
  // Rows 2, 3, 4: all 5 regions are droppable
  const [tableGrid, setTableGrid] = useState({
    'r1-other': null,
    'r2-desert': null,
    'r2-mountains': null,
    'r2-ocean': null,
    'r2-forest': null,
    'r2-other': null,
    'r3-desert': null,
    'r3-mountains': null,
    'r3-ocean': null,
    'r3-forest': null,
    'r3-other': null,
    'r4-desert': null,
    'r4-mountains': null,
    'r4-ocean': null,
    'r4-forest': null,
    'r4-other': null
  });

  const [selectedSpecimenId, setSelectedSpecimenId] = useState(null);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [draggedSpecimenId, setDraggedSpecimenId] = useState(null);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);

  useEffect(() => {
    return () => {
      stopNarration();
    };
  }, []);

  const handleReadAloud = () => {
    if (isSpeaking) {
      stopNarration();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    speakNaturalIndianMale({
      text: "Activity 2.10. Let us compare and analyse. Look at Table 2.6. Recreate a similar table on the board. List the names of plants and animals you or your classmates have observed in the regions given below. A few examples are given. You can add more.",
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false)
    });
  };

  // Find if a specimen is currently placed anywhere on the board
  const isSpecimenPlaced = (specimenId) => {
    return Object.values(tableGrid).some(item => item && item.id === specimenId);
  };

  // Handle clicking a specimen card in the tray
  const handleSpecimenClick = (specimen) => {
    if (habitatAudio?.playSelect) habitatAudio.playSelect();
    if (selectedSpecimenId === specimen.id) {
      setSelectedSpecimenId(null);
    } else {
      setSelectedSpecimenId(specimen.id);
    }
  };

  // Handle clicking a table cell
  const handleCellClick = (cellKey, regionId) => {
    if (selectedSpecimenId) {
      const specimen = SPECIMENS.find(s => s.id === selectedSpecimenId);
      if (!specimen) return;

      if (habitatAudio?.playMatchSuccess) habitatAudio.playMatchSuccess();
      setTableGrid(prev => ({
        ...prev,
        [cellKey]: specimen
      }));
      setSelectedSpecimenId(null);
      setEvaluationResult(null);
    } else if (tableGrid[cellKey]) {
      // Remove item on direct click
      if (habitatAudio?.playSelect) habitatAudio.playSelect();
      setTableGrid(prev => ({
        ...prev,
        [cellKey]: null
      }));
      setEvaluationResult(null);
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e, specimen) => {
    setDraggedSpecimenId(specimen.id);
    e.dataTransfer.setData('text/plain', specimen.id);
    if (habitatAudio?.playSelect) habitatAudio.playSelect();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e, cellKey) => {
    e.preventDefault();
    const specimenId = e.dataTransfer.getData('text/plain') || draggedSpecimenId;
    if (!specimenId) return;

    const specimen = SPECIMENS.find(s => s.id === specimenId);
    if (specimen) {
      if (habitatAudio?.playMatchSuccess) habitatAudio.playMatchSuccess();
      setTableGrid(prev => ({
        ...prev,
        [cellKey]: specimen
      }));
      setEvaluationResult(null);
      setSelectedSpecimenId(null);
    }
    setDraggedSpecimenId(null);
  };

  // Remove a specimen from a cell
  const handleRemoveItem = (e, cellKey) => {
    e.stopPropagation();
    if (habitatAudio?.playSelect) habitatAudio.playSelect();
    setTableGrid(prev => ({
      ...prev,
      [cellKey]: null
    }));
    setEvaluationResult(null);
  };

  // Check answers
  const handleCheckAnswers = () => {
    const placedEntries = Object.entries(tableGrid).filter(([_, item]) => item !== null);

    if (placedEntries.length === 0) {
      alert("Please drag and place some plants and animals into the table first!");
      return;
    }

    let correctCount = 0;
    const details = {};

    placedEntries.forEach(([cellKey, item]) => {
      const [_, regionId] = cellKey.split('-');
      const isCorrect = item.correctRegions.includes(regionId);
      if (isCorrect) correctCount++;
      details[cellKey] = isCorrect;
    });

    setEvaluationResult({
      correctCount,
      totalPlaced: placedEntries.length,
      details
    });

    if (correctCount >= 3 && correctCount === placedEntries.length) {
      if (habitatAudio?.playCelebration) habitatAudio.playCelebration();
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      setShowCelebrationModal(true);
    } else if (correctCount > 0) {
      if (habitatAudio?.playMatchSuccess) habitatAudio.playMatchSuccess();
    }
  };

  // Reset table
  const handleReset = () => {
    if (habitatAudio?.playSelect) habitatAudio.playSelect();
    setTableGrid({
      'r1-other': null,
      'r2-desert': null,
      'r2-mountains': null,
      'r2-ocean': null,
      'r2-forest': null,
      'r2-other': null,
      'r3-desert': null,
      'r3-mountains': null,
      'r3-ocean': null,
      'r3-forest': null,
      'r3-other': null,
      'r4-desert': null,
      'r4-mountains': null,
      'r4-ocean': null,
      'r4-forest': null,
      'r4-other': null
    });
    setSelectedSpecimenId(null);
    setEvaluationResult(null);
    setShowCelebrationModal(false);
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      minHeight: '100vh',
      backgroundImage: `url(${bgWoodenDeck})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '10px 18px 12px',
      boxSizing: 'border-box',
      overflow: 'hidden',
      userSelect: 'none',
      fontFamily: '"Plus Jakarta Sans", "Outfit", sans-serif'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Outfit:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap');

        .specimen-card {
          transition: transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.18s ease;
        }
        .specimen-card:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25) !important;
        }
        .table-cell-droppable {
          transition: background-color 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
        }
        .table-cell-droppable:hover {
          background-color: rgba(240, 249, 255, 0.95) !important;
        }
        .check-btn-glow {
          box-shadow: 0 4px 14px rgba(6, 78, 59, 0.45);
          transition: all 0.2s ease;
        }
        .check-btn-glow:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(6, 78, 59, 0.65), 0 0 16px rgba(52, 211, 153, 0.4);
        }
      `}</style>

      {/* ============================================================ */}
      {/* 1. TOP HEADER ROW: Hanging Sign Spacer & Instructions Card   */}
      {/* ============================================================ */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '100%',
        position: 'relative',
        zIndex: 20
      }}>
        {/* Invisible Spacer matching the hanging wooden sign on background */}
        <div style={{
          width: '280px',
          height: '92px',
          flexShrink: 0
        }} />

        {/* Top Middle-Right Instruction Card (Frosted Light Blue Card) */}
        <div style={{
          flex: 1,
          maxWidth: '680px',
          marginLeft: '20px',
          background: 'rgba(224, 242, 254, 0.88)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderRadius: '16px',
          padding: '8px 18px',
          boxShadow: '0 6px 20px rgba(15, 23, 42, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          <div>
            <div style={{ fontSize: '14.5px', fontWeight: '800', color: '#0F172A', lineHeight: 1.3 }}>
              Look at Table 2.6. Recreate a similar table on the board.
            </div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#334155', lineHeight: 1.35, marginTop: '2px' }}>
              List the names of plants and animals you or your classmates have observed in the regions given below. A few examples are given. You can add more.
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* Audio Voice Narration Button */}
            <button
              onClick={handleReadAloud}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                background: isSpeaking ? '#DC2626' : '#0284C7',
                border: '1.5px solid #FFFFFF',
                borderRadius: '8px',
                color: '#FFFFFF',
                fontWeight: '800',
                fontSize: '13px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}
            >
              {isSpeaking ? <VolumeX size={15} /> : <Volume2 size={15} />}
              <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
            </button>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              title="Reset Table"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 10px',
                background: 'rgba(255, 255, 255, 0.9)',
                border: '1.5px solid #94A3B8',
                borderRadius: '8px',
                color: '#334155',
                fontWeight: '700',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. CENTER STAGE: Table 2.6 Board with Wooden Border Frame     */}
      {/* ============================================================ */}
      <div style={{
        margin: '4px auto 0',
        width: '100%',
        maxWidth: '960px',
        background: 'linear-gradient(180deg, #7C4820 0%, #522D10 100%)',
        padding: '6px',
        borderRadius: '16px',
        boxShadow: '0 14px 36px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3)',
        border: '2px solid #A36531',
        zIndex: 15
      }}>
        {/* Top Header Strip inside Wood Frame */}
        <div style={{
          background: '#45220C',
          borderRadius: '10px 10px 0 0',
          padding: '5px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          color: '#FFFFFF',
          fontWeight: '900',
          fontSize: '16.5px',
          fontFamily: '"Outfit", sans-serif',
          borderBottom: '1.5px solid #854B20',
          letterSpacing: '0.01em'
        }}>
          <span style={{ fontSize: '18px' }}>🍃</span>
          <span>Table 2.6: Animals and plants found in different surroundings</span>
        </div>

        {/* The 6-Column Data Grid */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.96)',
          borderRadius: '0 0 10px 10px',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '55px repeat(5, 1fr)',
          border: '1.5px solid #7DD3FC'
        }}>
          {/* Header Row */}
          {/* Column 1: S. No. */}
          <div style={{
            background: '#F1F5F9',
            borderRight: '1px solid #7DD3FC',
            borderBottom: '1px solid #7DD3FC',
            padding: '8px 4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '900',
            fontSize: '14px',
            color: '#1E293B',
            textAlign: 'center'
          }}>
            S. no.
          </div>

          {/* Columns 2 to 6: Regions with Landscape Thumbnails */}
          {REGIONS.map((region, rIdx) => (
            <div
              key={region.id}
              style={{
                background: region.headerBg,
                borderRight: rIdx === REGIONS.length - 1 ? 'none' : '1px solid #7DD3FC',
                borderBottom: '1px solid #7DD3FC',
                padding: '5px 6px 4px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px'
              }}
            >
              <div style={{
                fontSize: '13px',
                fontWeight: '900',
                color: region.headerColor,
                textAlign: 'center',
                lineHeight: 1.15
              }}>
                {region.label}
              </div>
              <div style={{
                width: '100%',
                maxWidth: '135px',
                height: '38px',
                borderRadius: '5px',
                overflow: 'hidden',
                boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                border: '1px solid rgba(255,255,255,0.8)'
              }}>
                <img
                  src={region.image}
                  alt={region.label}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          ))}

          {/* Row 1: S.no 1 with Pre-filled textbook examples */}
          <div style={{
            background: '#F8FAFC',
            borderRight: '1px solid #7DD3FC',
            borderBottom: '1px solid #7DD3FC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '800',
            fontSize: '13.5px',
            color: '#1E293B',
            minHeight: '34px'
          }}>
            1
          </div>
          {/* Desert Row 1 (Pre-filled Camel) */}
          <div style={{
            borderRight: '1px solid #7DD3FC',
            borderBottom: '1px solid #7DD3FC',
            background: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px 8px',
            fontSize: '13.5px',
            fontWeight: '800',
            color: '#1E293B'
          }}>
            <span>Camel</span>
          </div>
          {/* Mountains Row 1 (Pre-filled Deodar tree) */}
          <div style={{
            borderRight: '1px solid #7DD3FC',
            borderBottom: '1px solid #7DD3FC',
            background: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px 8px',
            fontSize: '13.5px',
            fontWeight: '800',
            color: '#1E293B'
          }}>
            <span>Deodar tree</span>
          </div>
          {/* Ocean Row 1 (Pre-filled Fish) */}
          <div style={{
            borderRight: '1px solid #7DD3FC',
            borderBottom: '1px solid #7DD3FC',
            background: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px 8px',
            fontSize: '13.5px',
            fontWeight: '800',
            color: '#1E293B'
          }}>
            <span>Fish</span>
          </div>
          {/* Forest Row 1 (Pre-filled Lion) */}
          <div style={{
            borderRight: '1px solid #7DD3FC',
            borderBottom: '1px solid #7DD3FC',
            background: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px 8px',
            fontSize: '13.5px',
            fontWeight: '800',
            color: '#1E293B'
          }}>
            <span>Lion</span>
          </div>
          {/* Other region Row 1 (Droppable slot) */}
          {renderDroppableCell('r1-other', 'other', false)}

          {/* Rows 2, 3, 4 */}
          {[2, 3, 4].map(rowNum => (
            <React.Fragment key={rowNum}>
              {/* S.no column */}
              <div style={{
                background: '#F8FAFC',
                borderRight: '1px solid #7DD3FC',
                borderBottom: rowNum === 4 ? 'none' : '1px solid #7DD3FC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '13.5px',
                color: '#1E293B',
                minHeight: '34px'
              }}>
                {rowNum}
              </div>

              {/* 5 droppable cells for this row */}
              {REGIONS.map((region, rIdx) => {
                const cellKey = `r${rowNum}-${region.id}`;
                const isLastCol = rIdx === REGIONS.length - 1;
                const isLastRow = rowNum === 4;
                return renderDroppableCell(cellKey, region.id, isLastCol, isLastRow);
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. BOTTOM SPECIMEN DRAWER: 2 Rows of 9 Draggable Cards       */}
      {/* ============================================================ */}
      <div style={{
        margin: '4px auto 0',
        width: '100%',
        maxWidth: '960px',
        background: 'rgba(255, 255, 255, 0.72)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: '16px',
        border: '2px solid rgba(255, 255, 255, 0.9)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.22)',
        padding: '7px 10px',
        boxSizing: 'border-box',
        zIndex: 15
      }}>
        {/* Row 1 of Specimen Cards (9 items) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(9, 1fr)',
          gap: '7px',
          marginBottom: '5px'
        }}>
          {SPECIMENS.slice(0, 9).map(renderSpecimenCard)}
        </div>

        {/* Row 2 of Specimen Cards (9 items) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(9, 1fr)',
          gap: '7px'
        }}>
          {SPECIMENS.slice(9, 18).map(renderSpecimenCard)}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. BOTTOM ACTION ROW: Back Button, Tip, Check Answers & Next */}
      {/* ============================================================ */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '960px',
        margin: '5px auto 2px',
        zIndex: 20,
        gap: '10px'
      }}>
        {/* Back Navigation Button */}
        <button
          onClick={() => {
            if (onBack) onBack();
            else if (onPrevious) onPrevious();
            else window.history.back();
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 20px',
            background: 'rgba(15, 23, 42, 0.70)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1.8px solid #D4AF37',
            borderRadius: '24px',
            color: '#F8FAFC',
            fontWeight: '800',
            fontSize: '14.5px',
            fontFamily: '"Outfit", sans-serif',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35)',
            transition: 'all 0.2s ease',
            flexShrink: 0
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.borderColor = '#FDE68A';
            e.currentTarget.style.boxShadow = '0 6px 18px rgba(245, 158, 11, 0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.borderColor = '#D4AF37';
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.35)';
          }}
        >
          <ArrowLeft size={16} color="#FBBF24" />
          <span>Back</span>
        </button>

        {/* Instruction Badge Pill (Center) */}
        <div style={{
          background: 'rgba(254, 243, 199, 0.95)',
          border: '1.5px solid #F59E0B',
          borderRadius: '24px',
          padding: '6px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
        }}>
          <span style={{ fontSize: '17px' }}>💡</span>
          <span style={{ fontSize: '13.5px', fontWeight: '800', color: '#78350F' }}>
            {selectedSpecimenId
              ? 'Now click any empty slot in the table to place it!'
              : 'Drag the pictures to fill the table'}
          </span>
        </div>

        {/* Right Action Group: Check Answers & Next Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {/* Check My Answers Button (Forest Green Pill) */}
          <button
            onClick={handleCheckAnswers}
            className="check-btn-glow"
            style={{
              background: 'linear-gradient(135deg, #064E3B 0%, #065F46 100%)',
              border: '2px solid #34D399',
              borderRadius: '24px',
              padding: '7px 20px',
              color: '#FFFFFF',
              fontWeight: '900',
              fontSize: '14.5px',
              fontFamily: '"Outfit", sans-serif',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              letterSpacing: '0.01em'
            }}
          >
            <span>Check answers</span>
            <Check size={16} />
          </button>

          {/* Next Navigation Button */}
          <button
            onClick={() => {
              if (onComplete) onComplete();
              else if (onNext) onNext();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 22px',
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              border: '1.8px solid #FDE68A',
              borderRadius: '24px',
              color: '#FFFFFF',
              fontWeight: '900',
              fontSize: '14.5px',
              fontFamily: '"Outfit", sans-serif',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(217, 119, 6, 0.45)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(217, 119, 6, 0.65)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(217, 119, 6, 0.45)';
            }}
          >
            <span>Next</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>



      {/* Celebration & Feedback Modal */}
      {showCelebrationModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '24px 30px',
            maxWidth: '460px',
            width: '90%',
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            border: '2px solid #10B981'
          }}>
            <div style={{ fontSize: '42px', marginBottom: '8px' }}>🎉</div>
            <h3 style={{ margin: '0 0 8px', fontSize: '22px', color: '#064E3B', fontWeight: '900' }}>
              Splendid Work!
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: '15px', color: '#334155', lineHeight: 1.5 }}>
              You correctly classified plants and animals into their natural surroundings! You now understand how different habitats support distinct living communities.
            </p>
            <div style={{
              background: '#ECFDF5',
              border: '1.5px solid #10B981',
              borderRadius: '12px',
              padding: '10px 16px',
              marginBottom: '18px',
              fontWeight: '800',
              color: '#065F46',
              fontSize: '16px'
            }}>
              ⭐ Score: {evaluationResult?.correctCount} / {evaluationResult?.totalPlaced} Correct
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={() => setShowCelebrationModal(false)}
                style={{
                  padding: '9px 20px',
                  background: '#F1F5F9',
                  border: '1.5px solid #CBD5E1',
                  borderRadius: '10px',
                  color: '#334155',
                  fontWeight: '800',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Review Table
              </button>
              {onComplete && (
                <button
                  onClick={onComplete}
                  style={{
                    padding: '9px 24px',
                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                    border: '1.5px solid #34D399',
                    borderRadius: '10px',
                    color: '#FFFFFF',
                    fontWeight: '900',
                    fontSize: '14.5px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)'
                  }}
                >
                  Continue Next ➔
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Helper to render a droppable cell in Table 2.6
  function renderDroppableCell(cellKey, regionId, isLastCol = false, isLastRow = false) {
    const item = tableGrid[cellKey];
    const isEvaluated = evaluationResult && evaluationResult.details && evaluationResult.details[cellKey] !== undefined;
    const isCorrect = isEvaluated ? evaluationResult.details[cellKey] : null;

    let cellBg = '#FFFFFF';
    let cellBorder = isLastCol ? 'none' : '1px solid #7DD3FC';
    if (isEvaluated) {
      cellBg = isCorrect ? 'rgba(209, 250, 229, 0.9)' : 'rgba(254, 226, 226, 0.9)';
    }

    return (
      <div
        key={cellKey}
        onClick={() => handleCellClick(cellKey, regionId)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, cellKey)}
        className="table-cell-droppable"
        style={{
          borderRight: cellBorder,
          borderBottom: isLastRow ? 'none' : '1px solid #7DD3FC',
          background: cellBg,
          minHeight: '34px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2px 5px',
          cursor: selectedSpecimenId ? 'pointer' : 'default',
          position: 'relative'
        }}
      >
        {item ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            background: isEvaluated
              ? (isCorrect ? '#D1FAE5' : '#FEE2E2')
              : '#F0F9FF',
            border: `1.5px solid ${isEvaluated ? (isCorrect ? '#10B981' : '#EF4444') : '#38BDF8'}`,
            borderRadius: '5px',
            padding: '2px 4px',
            gap: '4px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', overflow: 'hidden' }}>
              <img
                src={item.image}
                alt={item.name}
                style={{ width: '20px', height: '20px', borderRadius: '3px', objectFit: 'cover' }}
              />
              <span style={{
                fontSize: '12px',
                fontWeight: '800',
                color: '#0F172A',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {item.name}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              {isEvaluated && (
                <span style={{ fontSize: '11px', fontWeight: '900', color: isCorrect ? '#059669' : '#DC2626' }}>
                  {isCorrect ? '✓' : '✕'}
                </span>
              )}
              <button
                onClick={(e) => handleRemoveItem(e, cellKey)}
                title="Remove"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748B',
                  cursor: 'pointer',
                  padding: '1px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <X size={12} />
              </button>
            </div>
          </div>
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: selectedSpecimenId ? '#0284C7' : '#94A3B8',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            {selectedSpecimenId ? 'Click to place' : ''}
          </div>
        )}
      </div>
    );
  }

  // Helper to render each specimen card in the drawer
  function renderSpecimenCard(specimen) {
    const isSelected = selectedSpecimenId === specimen.id;
    const isPlaced = isSpecimenPlaced(specimen.id);

    return (
      <div
        key={specimen.id}
        draggable
        onDragStart={(e) => handleDragStart(e, specimen)}
        onClick={() => handleSpecimenClick(specimen)}
        className="specimen-card"
        style={{
          background: '#FFFFFF',
          borderRadius: '7px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'grab',
          boxShadow: isSelected
            ? '0 0 0 2.5px #F59E0B, 0 6px 16px rgba(245, 158, 11, 0.45)'
            : '0 2px 6px rgba(0,0,0,0.12)',
          border: isSelected ? '1.5px solid #F59E0B' : '1px solid rgba(0,0,0,0.08)',
          position: 'relative',
          opacity: isPlaced ? 0.75 : 1
        }}
      >
        {/* Placed badge indicator */}
        {isPlaced && (
          <div style={{
            position: 'absolute',
            top: '2px',
            right: '2px',
            background: '#10B981',
            color: '#FFFFFF',
            borderRadius: '50%',
            width: '14px',
            height: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '9px',
            fontWeight: '900',
            zIndex: 2,
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
          }}>
            ✓
          </div>
        )}

        {/* Thumbnail Image */}
        <div style={{ width: '100%', height: '52px', overflow: 'hidden', background: '#F1F5F9' }}>
          <img
            src={specimen.image}
            alt={specimen.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Label */}
        <div style={{
          padding: '3px 2px',
          textAlign: 'center',
          fontSize: '11px',
          fontWeight: '800',
          color: '#1E293B',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '95%',
          fontFamily: '"Outfit", sans-serif'
        }}>
          {specimen.name}
        </div>
      </div>
    );
  }
}
