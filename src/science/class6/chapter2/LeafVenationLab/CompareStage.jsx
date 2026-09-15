import React, { useState } from 'react';
import { venationAudio } from './venationAudio';

export default function CompareStage({ currentLeaf, allLeaves }) {
  // Pick an opposing leaf by default for instant contrast
  const defaultCompareId = allLeaves.find(l => l.venation !== currentLeaf.venation)?.id || allLeaves[0].id;
  const [compareId, setCompareId] = useState(defaultCompareId);
  const [syncLight, setSyncLight] = useState(true);

  const compareLeaf = allLeaves.find(l => l.id === compareId) || allLeaves[0];

  const toggleLight = () => {
    venationAudio.playSwitch();
    setSyncLight(l => !l);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '280px',
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none',
        overflow: 'hidden',
        background: syncLight
          ? 'radial-gradient(circle at center, #1E293B 0%, #0F172A 100%)'
          : 'radial-gradient(circle at center, rgba(255,255,255,0.95) 0%, rgba(240,248,242,0.7) 100%)',
        borderRadius: '16px',
        border: '1.5px solid rgba(20, 69, 47, 0.25)',
        padding: '8px 12px',
        boxSizing: 'border-box',
        transition: 'background 0.35s ease'
      }}
    >
      {/* Top Header: Comparison Selector & Synchronous Light Switch */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '6px',
        zIndex: 10
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: syncLight ? '#FEF08A' : '#14452F',
          fontSize: '16px',
          fontWeight: '900',
          fontFamily: '"Outfit", sans-serif'
        }}>
          <span>⚖️ Dual Specimen Comparator</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={toggleLight}
            style={{
              background: syncLight ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' : '#FAF8F2',
              color: syncLight ? '#FFFFFF' : '#14452F',
              border: '1.8px solid #D97706',
              borderRadius: '10px',
              padding: '4px 10px',
              fontSize: '16px',
              fontWeight: '900',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <span>{syncLight ? '🔦 Backlight ON' : '💡 Backlight OFF'}</span>
          </button>
        </div>
      </div>

      {/* Side by Side Split Columns */}
      <div style={{
        flex: 1,
        minHeight: 0,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px'
      }}>
        {/* Specimen 1: Current Leaf */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: syncLight ? 'rgba(255,255,255,0.05)' : 'rgba(20,69,47,0.04)',
          borderRadius: '12px',
          padding: '6px',
          border: '1.5px solid rgba(20,69,47,0.18)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {syncLight && (
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at center, rgba(254,240,138,0.3) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />
          )}
          <img
            src={currentLeaf.image}
            alt={currentLeaf.name}
            style={{
              maxWidth: '85%',
              maxHeight: '140px',
              objectFit: 'contain',
              filter: syncLight
                ? 'brightness(1.25) contrast(1.2) drop-shadow(0 0 20px rgba(251,191,36,0.65))'
                : 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))'
            }}
          />
          <div style={{
            marginTop: '6px',
            textAlign: 'center',
            zIndex: 2
          }}>
            <div style={{
              fontSize: '17px',
              fontWeight: '900',
              color: syncLight ? '#FFFFFF' : '#14452F',
              fontFamily: '"Fraunces", Georgia, serif'
            }}>
              {currentLeaf.name}
            </div>
            <div style={{
              fontSize: '16px',
              fontWeight: '900',
              color: currentLeaf.venation === 'reticulate' ? '#10B981' : '#38BDF8',
              marginTop: '2px'
            }}>
              {currentLeaf.venationType} Venation
            </div>
          </div>
        </div>

        {/* Specimen 2: Comparator Leaf */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: syncLight ? 'rgba(255,255,255,0.05)' : 'rgba(20,69,47,0.04)',
          borderRadius: '12px',
          padding: '6px',
          border: '1.5px solid rgba(20,69,47,0.18)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {syncLight && (
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at center, rgba(254,240,138,0.3) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />
          )}

          {/* Comparator Selector */}
          <div style={{ position: 'absolute', top: '6px', right: '6px', zIndex: 10 }}>
            <select
              value={compareId}
              onChange={(e) => setCompareId(e.target.value)}
              style={{
                background: '#FAF8F2',
                color: '#14452F',
                border: '1.5px solid #14452F',
                borderRadius: '8px',
                padding: '2px 6px',
                fontSize: '16px',
                fontWeight: '800',
                cursor: 'pointer'
              }}
            >
              {allLeaves.map(l => (
                <option key={l.id} value={l.id}>
                  {l.emoji} {l.name}
                </option>
              ))}
            </select>
          </div>

          <img
            src={compareLeaf.image}
            alt={compareLeaf.name}
            style={{
              maxWidth: '85%',
              maxHeight: '140px',
              objectFit: 'contain',
              filter: syncLight
                ? 'brightness(1.25) contrast(1.2) drop-shadow(0 0 20px rgba(251,191,36,0.65))'
                : 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))'
            }}
          />
          <div style={{
            marginTop: '6px',
            textAlign: 'center',
            zIndex: 2
          }}>
            <div style={{
              fontSize: '17px',
              fontWeight: '900',
              color: syncLight ? '#FFFFFF' : '#14452F',
              fontFamily: '"Fraunces", Georgia, serif'
            }}>
              {compareLeaf.name}
            </div>
            <div style={{
              fontSize: '16px',
              fontWeight: '900',
              color: compareLeaf.venation === 'reticulate' ? '#10B981' : '#38BDF8',
              marginTop: '2px'
            }}>
              {compareLeaf.venationType} Venation
            </div>
          </div>
        </div>
      </div>

      {/* Contrast Banner at Bottom */}
      <div style={{
        marginTop: '6px',
        background: syncLight ? 'rgba(15, 23, 42, 0.85)' : '#FAF8F2',
        border: '1.5px solid #14452F',
        borderRadius: '10px',
        padding: '5px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '16px',
        fontWeight: '700',
        color: syncLight ? '#F1F5F9' : '#14452F',
        zIndex: 10
      }}>
        <span>
          🕸️ <strong>Reticulate:</strong> Branching web (Dicot)
        </span>
        <span style={{ opacity: 0.5 }}>|</span>
        <span>
          📏 <strong>Parallel:</strong> Side-by-side lines (Monocot)
        </span>
      </div>
    </div>
  );
}
