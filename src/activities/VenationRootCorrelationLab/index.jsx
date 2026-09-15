import React, { useState } from 'react';
import { ArrowLeft, RefreshCw, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTheme } from '../../../../ThemeContext';

const TABLE_PLANTS = [
  { id: 'lemongrass',  name: 'Lemon Grass',   emoji: '🌿', venation: 'parallel',   root: 'fibrous', hint: 'Grass-family plant — narrow leaves, grows in clumps.' },
  { id: 'marigold',    name: 'Marigold',       emoji: '🌼', venation: 'reticulate', root: 'taproot', hint: 'Broad leaf with a visible midrib and net pattern.' },
  { id: 'sadabahar',   name: 'Sadabahar',      emoji: '🌸', venation: 'reticulate', root: 'taproot', hint: 'Periwinkle — shiny oval leaves, net venation.' },
  { id: 'mustard',     name: 'Mustard',        emoji: '🟡', venation: 'reticulate', root: 'taproot', hint: 'Broad wavy leaves with a prominent midrib.' },
  { id: 'chickpea',    name: 'Chickpea',       emoji: '🫘', venation: 'reticulate', root: 'taproot', hint: 'Compound leaves with net venation — dicot plant.' },
];

const VENATION_OPTIONS = [
  { id: 'reticulate', label: 'Reticulate (Net)', icon: '🕸️', color: '#7c3aed' },
  { id: 'parallel',   label: 'Parallel (Lines)', icon: '📏', color: '#0891b2' },
];
const ROOT_OPTIONS = [
  { id: 'taproot',  label: 'Taproot',  icon: '🥕', color: '#f59e0b' },
  { id: 'fibrous',  label: 'Fibrous',  icon: '🌾', color: '#84cc16' },
];

export default function VenationRootCorrelationLab({ onBackToDashboard }) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Theme-specific styles
  const containerBg = isLight ? '#f8fafc' : '#0d1117';
  const textColor = isLight ? '#0f172a' : '#f0f9ff';
  const headerBg = isLight ? '#ffffff' : '#161b22';
  const borderCol = isLight ? '#cbd5e1' : 'rgba(255,255,255,0.05)';
  const sidebarBorder = isLight ? '#e2e8f0' : 'rgba(139,92,246,0.2)';
  const textMuted = isLight ? '#475569' : '#94a3b8';
  const textFaint = isLight ? '#64748b' : '#64748b';
  const cardBg = isLight ? '#ffffff' : '#161b22';
  const cardBorder = isLight ? '#e2e8f0' : 'rgba(139,92,246,0.3)';
  const optBgDefault = isLight ? '#ffffff' : 'rgba(255,255,255,0.03)';
  const optBorderDefault = isLight ? '#cbd5e1' : 'rgba(255,255,255,0.08)';
  const optTextDefault = isLight ? '#475569' : '#94a3b8';
  const rowOddBg = isLight ? '#f1f5f9' : '#0d1117';
  const rowEvenBg = isLight ? '#ffffff' : '#0f1520';
  const eurekaBg = isLight ? 'rgba(255,255,255,0.98)' : 'rgba(13,17,23,0.97)';
  const ruleBoxBg = isLight ? '#f8fafc' : '#161b22';
  const checkBtnBorder = isLight ? '#cbd5e1' : 'rgba(255,255,255,0.1)';

  const [answers, setAnswers] = useState(() => Object.fromEntries(TABLE_PLANTS.map(p => [p.id, { venation: null, root: null }])));
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState({});
  const [showEureka, setShowEureka] = useState(false);

  const allFilled = TABLE_PLANTS.every(p => answers[p.id].venation && answers[p.id].root);
  const allCorrect = TABLE_PLANTS.every(p => results[p.id]?.venation && results[p.id]?.root);

  const handleSet = (plantId, field, value) => {
    if (checked) return;
    setAnswers(prev => ({ ...prev, [plantId]: { ...prev[plantId], [field]: value } }));
  };

  const handleCheck = () => {
    const res = {};
    TABLE_PLANTS.forEach(p => {
      res[p.id] = {
        venation: answers[p.id].venation === p.venation,
        root: answers[p.id].root === p.root,
      };
    });
    setResults(res);
    setChecked(true);
    const allRight = TABLE_PLANTS.every(p => res[p.id].venation && res[p.id].root);
    if (allRight) {
      setTimeout(() => {
        setShowEureka(true);
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.4 } });
      }, 600);
    }
  };

  const handleReset = () => {
    setAnswers(Object.fromEntries(TABLE_PLANTS.map(p => [p.id, { venation: null, root: null }])));
    setChecked(false); setResults({}); setShowEureka(false);
  };

  const CellPicker = ({ options, value, isCorrect, isWrong, onChange }) => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', 
      gap: 'clamp(5px, 0.7vw, 9px)', 
      alignItems: 'center', 
      width: '100%',
      position: 'relative',
      boxSizing: 'border-box'
    }}>
      {options.map(opt => {
        const isSelected = value === opt.id;
        return (
          <button 
            key={opt.id} 
            onClick={() => onChange(opt.id)} 
            style={{ 
              background: isSelected ? `${opt.color}25` : optBgDefault, 
              border: `1.5px solid ${isSelected ? opt.color : optBorderDefault}`, 
              color: isSelected ? opt.color : optTextDefault, 
              padding: 'clamp(5px, 0.75vh, 8px) clamp(6px, 0.8vw, 12px)', 
              borderRadius: '9px', 
              cursor: checked ? 'default' : 'pointer', 
              fontSize: 'clamp(12px, 1.25vw, 13.5px)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '6px', 
              transition: 'all 0.15s', 
              fontWeight: isSelected ? '800' : 'normal',
              whiteSpace: 'nowrap',
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              boxSizing: 'border-box'
            }}
          >
            <span style={{ fontSize: 'clamp(1.05rem, 1.3vw, 1.25rem)', flexShrink: 0 }}>{opt.icon}</span> 
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{opt.label}</span>
            {checked && isSelected && isCorrect && <span style={{ color: '#4ade80', fontSize: '1.05rem', marginLeft: 'auto', flexShrink: 0 }}>✅</span>}
            {checked && isSelected && isWrong && <span style={{ color: '#f87171', fontSize: '1.05rem', marginLeft: 'auto', flexShrink: 0 }}>❌</span>}
          </button>
        );
      })}
    </div>
  );

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      width: '100%',
      background: containerBg, 
      color: textColor, 
      fontFamily: 'system-ui, sans-serif', 
      overflow: 'hidden', 
      position: 'relative',
      boxSizing: 'border-box'
    }}>
      {/* Header */}
      <div style={{ 
        background: headerBg, 
        borderBottom: `1px solid ${sidebarBorder}`, 
        padding: 'clamp(5px, 0.7vh, 8px) clamp(14px, 1.6vw, 20px)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        flexShrink: 0 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            onClick={onBackToDashboard} 
            style={{ 
              background: 'none', 
              border: '1px solid #cbd5e1', 
              color: textMuted, 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.45rem', 
              fontSize: 'clamp(12px, 1.25vw, 13.5px)',
              padding: 'clamp(4px, 0.6vh, 6px) clamp(10px, 1.1vw, 14px)',
              borderRadius: '8px'
            }}
          >
            <ArrowLeft size={16} /> Back
          </button>
          <div>
            <div style={{ fontSize: 'clamp(11px, 1.1vw, 12px)', color: '#8b5cf6', textTransform: 'uppercase', fontWeight: 'bold' }}>Activity 2.7 — Table 2.4</div>
            <div style={{ fontSize: 'clamp(14px, 1.5vw, 17px)', fontWeight: 'bold', color: textColor }}>🔗 Venation ↔ Root Correlation Lab</div>
          </div>
        </div>
        <button 
          onClick={handleReset} 
          style={{ 
            background: 'none', 
            border: `1px solid ${checkBtnBorder}`, 
            color: textMuted, 
            padding: 'clamp(4px, 0.6vh, 6px) clamp(12px, 1.2vw, 16px)', 
            borderRadius: '8px', 
            cursor: 'pointer', 
            fontSize: 'clamp(12px, 1.25vw, 13.5px)', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.4rem' 
          }}
        >
          <RefreshCw size={14} /> Reset
        </button>
      </div>

      {/* Instruction */}
      <div style={{ 
        background: containerBg, 
        borderBottom: `1px solid ${borderCol}`, 
        padding: 'clamp(6px, 0.9vh, 9px) clamp(16px, 2vw, 24px)', 
        fontSize: 'clamp(12.5px, 1.35vw, 14px)', 
        color: textMuted, 
        lineHeight: 1.5,
        textAlign: 'justify',
        textJustify: 'inter-word',
        textAlignLast: 'left',
        hyphens: 'auto',
        WebkitHyphens: 'auto',
        flexShrink: 0
      }}>
        <strong style={{ color: '#a78bfa' }}>Task:</strong> Fill in Table 2.4 below. For each plant, select its leaf venation type AND root system type using what you learned from Activities 2.5 and 2.6. Hints are provided under each plant name.
      </div>

      {/* Table & Actions Area */}
      <div style={{ 
        flex: 1, 
        minHeight: 0, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        padding: 'clamp(6px, 1vh, 10px) clamp(14px, 1.8vw, 24px)', 
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}>
        <div style={{ 
          background: '#ffffff', 
          borderRadius: '14px', 
          border: `1px solid ${borderCol}`, 
          boxShadow: '0 4px 18px rgba(0,0,0,0.06)', 
          overflow: 'hidden',
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box'
        }}>
          {/* Header Row */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '35% 5% 30% 30%', 
            background: headerBg,
            borderBottom: `2px solid ${sidebarBorder}`,
            alignItems: 'center',
            padding: 'clamp(6px, 0.9vh, 9px) clamp(10px, 1.4vw, 18px)',
            flexShrink: 0
          }}>
            <div style={{ color: '#8b5cf6', fontSize: 'clamp(12px, 1.3vw, 13.5px)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Plant Name</div>
            <div style={{ color: '#8b5cf6', fontSize: 'clamp(12px, 1.3vw, 13.5px)', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center', letterSpacing: '0.04em' }}>#</div>
            <div style={{ color: '#8b5cf6', fontSize: 'clamp(12px, 1.3vw, 13.5px)', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center', letterSpacing: '0.04em' }}>Leaf Venation</div>
            <div style={{ color: '#8b5cf6', fontSize: 'clamp(12px, 1.3vw, 13.5px)', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center', letterSpacing: '0.04em' }}>Root System</div>
          </div>

          {/* 5 Rows Body (Even 1fr Grid Height Distribution) */}
          <div style={{ 
            flex: 1, 
            minHeight: 0, 
            display: 'grid', 
            gridTemplateRows: 'repeat(5, 1fr)',
            background: '#ffffff'
          }}>
            {TABLE_PLANTS.map((plant, idx) => {
              const ans = answers[plant.id];
              const res = results[plant.id];
              const rowOk = res?.venation && res?.root;
              const rowWrong = checked && (!res?.venation || !res?.root);
              return (
                <div 
                  key={plant.id} 
                  style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '35% 5% 30% 30%', 
                    alignItems: 'center',
                    background: rowOk ? (isLight ? 'rgba(74,222,128,0.1)' : 'rgba(74,222,128,0.05)') : rowWrong ? (isLight ? 'rgba(248,113,113,0.1)' : 'rgba(248,113,113,0.05)') : idx % 2 === 0 ? rowOddBg : rowEvenBg, 
                    borderBottom: idx === TABLE_PLANTS.length - 1 ? 'none' : `1px solid ${borderCol}`, 
                    padding: '0 clamp(10px, 1.4vw, 18px)',
                    transition: 'background 0.3s',
                    boxSizing: 'border-box'
                  }}
                >
                  {/* Plant Name & Hint */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden', paddingRight: '10px' }}>
                    <span style={{ fontSize: 'clamp(1.4rem, 1.9vw, 1.75rem)', flexShrink: 0 }}>{plant.emoji}</span>
                    <div style={{ overflow: 'hidden', minWidth: 0 }}>
                      <div style={{ fontSize: 'clamp(13px, 1.4vw, 15px)', fontWeight: 600, color: textColor, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{plant.name}</div>
                      <div style={{ 
                        fontSize: 'clamp(11px, 1.15vw, 12.5px)', 
                        color: textMuted, 
                        fontStyle: 'italic', 
                        lineHeight: '1.25',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {plant.hint}
                      </div>
                    </div>
                  </div>

                  {/* Row Number */}
                  <div style={{ textAlign: 'center', fontSize: 'clamp(13px, 1.4vw, 15px)', color: textMuted, fontWeight: 'bold' }}>
                    {idx + 1}
                  </div>

                  {/* Leaf Venation */}
                  <div style={{ padding: '0 clamp(4px, 0.6vw, 8px)' }}>
                    <CellPicker options={VENATION_OPTIONS} value={ans.venation} isCorrect={res?.venation} isWrong={checked && !res?.venation} onChange={v => handleSet(plant.id, 'venation', v)} />
                  </div>

                  {/* Root System */}
                  <div style={{ padding: '0 clamp(4px, 0.6vw, 8px)' }}>
                    <CellPicker options={ROOT_OPTIONS} value={ans.root} isCorrect={res?.root} isWrong={checked && !res?.root} onChange={v => handleSet(plant.id, 'root', v)} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Check button */}
        {!checked && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 'clamp(4px, 0.7vh, 8px) 0', flexShrink: 0 }}>
            <button 
              onClick={handleCheck} 
              disabled={!allFilled} 
              style={{ 
                background: allFilled ? '#8b5cf6' : (isLight ? '#cbd5e1' : '#1e293b'), 
                border: 'none', 
                color: allFilled ? '#fff' : (isLight ? '#94a3b8' : '#475569'), 
                padding: 'clamp(7px, 1vh, 10px) clamp(28px, 2.8vw, 44px)', 
                borderRadius: '10px', 
                cursor: allFilled ? 'pointer' : 'not-allowed', 
                fontSize: 'clamp(13px, 1.4vw, 15px)', 
                fontWeight: 'bold', 
                boxShadow: allFilled ? '0 4px 16px rgba(139,92,246,0.4)' : 'none', 
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {allFilled ? '🔍 Check My Table' : `Fill all rows to continue (${TABLE_PLANTS.filter(p => answers[p.id].venation && answers[p.id].root).length}/${TABLE_PLANTS.length} done)`}
            </button>
          </div>
        )}

        {/* Partial error */}
        {checked && !allCorrect && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: 'clamp(4px, 0.7vh, 8px) 0', flexShrink: 0 }}>
            <div style={{ color: '#f87171', fontSize: 'clamp(12px, 1.25vw, 13.5px)', textAlign: 'center' }}>Some entries are incorrect. Check highlighted rows and try again!</div>
            <button 
              onClick={handleReset} 
              style={{ 
                background: isLight ? '#cbd5e1' : '#1e293b', 
                border: '1px solid rgba(248,113,113,0.3)', 
                color: isLight ? '#b91c1c' : '#f87171', 
                padding: 'clamp(4px, 0.6vh, 6px) clamp(12px, 1.2vw, 16px)', 
                borderRadius: '8px', 
                cursor: 'pointer', 
                fontSize: 'clamp(12px, 1.25vw, 13.5px)' 
              }}
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      {/* EUREKA OVERLAY (EXPANDED STAGE, INCREASED FONT SIZE, NO CONGESTION, JUSTIFIED ALIGNMENT) */}
      {showEureka && (
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: isLight ? 'rgba(240, 253, 244, 0.98)' : 'rgba(15, 23, 42, 0.98)', 
          backdropFilter: 'blur(12px)',
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: 'clamp(8px, 1.3vh, 16px)', 
          zIndex: 50, 
          padding: 'clamp(8px, 1.5vh, 18px) clamp(16px, 2.2vw, 36px)', 
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}>
          {/* Header Banner */}
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <span style={{ fontSize: 'clamp(2.2rem, 3.4vh, 3rem)' }}>💡</span>
              <h2 style={{ 
                color: isLight ? '#064e3b' : '#34d399', 
                margin: 0, 
                fontWeight: '900', 
                fontSize: 'clamp(1.8rem, 2.9vh, 2.4rem)',
                lineHeight: '1.2',
                letterSpacing: '-0.01em'
              }}>
                Eureka! You Discovered the Rule!
              </h2>
            </div>
            <p style={{ 
              color: isLight ? '#047857' : '#a7f3d0', 
              margin: '4px 0 0', 
              fontSize: 'clamp(14.5px, 1.75vh, 18px)', 
              fontWeight: '700' 
            }}>
              Table 2.4 is complete — look at the natural pattern that emerged!
            </p>
          </div>

          {/* Rule Diagram Card (Expanded Width to 1280px, Parallel 2-Column Correlation) */}
          <div style={{ 
            background: isLight ? '#ffffff' : '#1e293b', 
            borderRadius: '20px', 
            padding: 'clamp(10px, 1.6vh, 18px) clamp(20px, 2.5vw, 36px)', 
            border: `1.5px solid ${isLight ? '#a7f3d0' : '#334155'}`, 
            maxWidth: 'min(96%, 1280px)', 
            width: '100%', 
            boxShadow: '0 8px 30px rgba(6, 78, 59, 0.08)',
            boxSizing: 'border-box',
            flexShrink: 0
          }}>
            <h4 style={{ 
              color: isLight ? '#064e3b' : '#34d399', 
              margin: '0 0 clamp(6px, 1vh, 12px) 0', 
              textAlign: 'center', 
              fontSize: 'clamp(15px, 1.85vh, 18.5px)', 
              fontWeight: '900', 
              textTransform: 'uppercase', 
              letterSpacing: '0.06em' 
            }}>
              🔑 The Correlation Rule
            </h4>

            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 'clamp(6px, 1.1vh, 12px)' 
            }}>
              {/* Row 1: Reticulate ⟺ Taproot */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr auto 1fr', 
                gap: 'clamp(14px, 2.4vw, 32px)', 
                alignItems: 'center' 
              }}>
                <div style={{ 
                  background: isLight ? '#f5f3ff' : 'rgba(124,58,237,0.15)', 
                  borderRadius: '16px', 
                  padding: 'clamp(8px, 1.3vh, 14px) clamp(16px, 2vw, 26px)', 
                  textAlign: 'center', 
                  border: '1.5px solid #ddd6fe', 
                  boxShadow: '0 2px 8px rgba(109, 40, 217, 0.05)' 
                }}>
                  <div style={{ fontSize: 'clamp(2rem, 3.2vh, 2.6rem)', marginBottom: '2px' }}>🕸️</div>
                  <div style={{ color: '#6d28d9', fontWeight: '900', fontSize: 'clamp(16px, 2vh, 19.5px)' }}>Reticulate Venation</div>
                  <div style={{ color: isLight ? '#334155' : '#cbd5e1', fontSize: 'clamp(13.5px, 1.6vh, 16px)', fontWeight: '700', marginTop: '2px' }}>Net-like pattern</div>
                </div>

                <div style={{ textAlign: 'center', color: '#059669', fontSize: 'clamp(2rem, 3.2vh, 2.6rem)', fontWeight: '900', userSelect: 'none' }}>⟺</div>

                <div style={{ 
                  background: isLight ? '#ecfdf5' : 'rgba(5,150,105,0.15)', 
                  borderRadius: '16px', 
                  padding: 'clamp(8px, 1.3vh, 14px) clamp(16px, 2vw, 26px)', 
                  textAlign: 'center', 
                  border: '1.5px solid #a7f3d0', 
                  boxShadow: '0 2px 8px rgba(5, 150, 105, 0.05)' 
                }}>
                  <div style={{ fontSize: 'clamp(2rem, 3.2vh, 2.6rem)', marginBottom: '2px' }}>🥕</div>
                  <div style={{ color: '#047857', fontWeight: '900', fontSize: 'clamp(16px, 2vh, 19.5px)' }}>Taproot System</div>
                  <div style={{ color: isLight ? '#334155' : '#cbd5e1', fontSize: 'clamp(13.5px, 1.6vh, 16px)', fontWeight: '700', marginTop: '2px' }}>One main root</div>
                </div>
              </div>

              {/* Row 2: Parallel ⟺ Fibrous */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr auto 1fr', 
                gap: 'clamp(14px, 2.4vw, 32px)', 
                alignItems: 'center' 
              }}>
                <div style={{ 
                  background: isLight ? '#fdf2f8' : 'rgba(190,24,93,0.15)', 
                  borderRadius: '16px', 
                  padding: 'clamp(8px, 1.3vh, 14px) clamp(16px, 2vw, 26px)', 
                  textAlign: 'center', 
                  border: '1.5px solid #fbcfe8', 
                  boxShadow: '0 2px 8px rgba(190, 24, 93, 0.05)' 
                }}>
                  <div style={{ fontSize: 'clamp(2rem, 3.2vh, 2.6rem)', marginBottom: '2px' }}>📏</div>
                  <div style={{ color: '#be185d', fontWeight: '900', fontSize: 'clamp(16px, 2vh, 19.5px)' }}>Parallel Venation</div>
                  <div style={{ color: isLight ? '#334155' : '#cbd5e1', fontSize: 'clamp(13.5px, 1.6vh, 16px)', fontWeight: '700', marginTop: '2px' }}>Straight parallel lines</div>
                </div>

                <div style={{ textAlign: 'center', color: '#059669', fontSize: 'clamp(2rem, 3.2vh, 2.6rem)', fontWeight: '900', userSelect: 'none' }}>⟺</div>

                <div style={{ 
                  background: isLight ? '#f7fee7' : 'rgba(77,124,15,0.15)', 
                  borderRadius: '16px', 
                  padding: 'clamp(8px, 1.3vh, 14px) clamp(16px, 2vw, 26px)', 
                  textAlign: 'center', 
                  border: '1.5px solid #d9f99d', 
                  boxShadow: '0 2px 8px rgba(77, 124, 15, 0.05)' 
                }}>
                  <div style={{ fontSize: 'clamp(2rem, 3.2vh, 2.6rem)', marginBottom: '2px' }}>🌾</div>
                  <div style={{ color: '#4d7c0f', fontWeight: '900', fontSize: 'clamp(16px, 2vh, 19.5px)' }}>Fibrous Root System</div>
                  <div style={{ color: isLight ? '#334155' : '#cbd5e1', fontSize: 'clamp(13.5px, 1.6vh, 16px)', fontWeight: '700', marginTop: '2px' }}>Many thin equal roots</div>
                </div>
              </div>
            </div>
          </div>

          {/* Explanation Card (Expanded Width to 1280px, Parallel Justified Content, No Hyphen Splits) */}
          <div style={{ 
            background: isLight ? 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)' : 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', 
            borderRadius: '18px', 
            padding: 'clamp(10px, 1.4vh, 16px) clamp(20px, 2.5vw, 34px)', 
            border: `1.5px solid ${isLight ? '#a7f3d0' : '#334155'}`, 
            maxWidth: 'min(96%, 1280px)', 
            width: '100%', 
            boxSizing: 'border-box',
            boxShadow: '0 4px 18px rgba(6, 78, 59, 0.06)',
            flexShrink: 0
          }}>
            <div style={{ 
              color: isLight ? '#064e3b' : '#34d399', 
              fontWeight: '900', 
              fontSize: 'clamp(15.5px, 1.85vh, 18.5px)',
              marginBottom: '6px' 
            }}>
              💡 Why does this happen?
            </div>
            <p style={{ 
              color: isLight ? '#0f172a' : '#f1f5f9', 
              margin: 0,
              fontSize: 'clamp(14px, 1.7vh, 16.5px)', 
              lineHeight: '1.68', 
              textAlign: 'justify', 
              textJustify: 'inter-word', 
              textAlignLast: 'left', 
              wordBreak: 'normal',
              hyphens: 'none',
              WebkitHyphens: 'none',
              fontWeight: '600' 
            }}>
              Plants with net-like (<b style={{ color: isLight ? '#047857' : '#34d399' }}>reticulate</b>) leaf veins are called <b style={{ color: '#059669' }}>Dicots</b> — they have two cotyledons in their seeds and grow a deep <b style={{ color: isLight ? '#047857' : '#34d399' }}>taproot</b>. Plants with straight (<b style={{ color: isLight ? '#047857' : '#34d399' }}>parallel</b>) leaf veins are called <b style={{ color: isLight ? '#047857' : '#34d399' }}>Monocots</b> — they have one cotyledon and grow a cluster of thin <b style={{ color: isLight ? '#047857' : '#34d399' }}>fibrous roots</b>. This is how nature keeps things consistent!
            </p>
          </div>

          {/* Action Buttons Row */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '22px', 
            flexShrink: 0 
          }}>
            <button 
              onClick={handleReset} 
              style={{ 
                background: isLight ? '#ffffff' : '#334155', 
                border: `1.5px solid ${isLight ? '#a7f3d0' : '#475569'}`, 
                color: isLight ? '#064e3b' : '#f8fafc', 
                padding: 'clamp(8px, 1.25vh, 13px) clamp(24px, 2.5vw, 36px)', 
                borderRadius: '12px', 
                cursor: 'pointer', 
                fontSize: 'clamp(14.5px, 1.7vh, 17px)', 
                fontWeight: '800', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.6rem', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'all 0.15s ease'
              }}
            >
              <RefreshCw size={17} /> Redo
            </button>
            <button 
              onClick={() => onBackToDashboard('go_to_quiz')} 
              style={{ 
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
                border: '1.5px solid #34d399', 
                color: '#ffffff', 
                padding: 'clamp(9px, 1.3vh, 13px) clamp(30px, 3vw, 44px)', 
                borderRadius: '12px', 
                cursor: 'pointer', 
                fontSize: 'clamp(15px, 1.75vh, 17.5px)', 
                fontWeight: '900', 
                boxShadow: '0 4px 16px rgba(16, 185, 129, 0.35)',
                transition: 'all 0.15s ease'
              }}
            >
              Next: Take Quiz ➜
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
