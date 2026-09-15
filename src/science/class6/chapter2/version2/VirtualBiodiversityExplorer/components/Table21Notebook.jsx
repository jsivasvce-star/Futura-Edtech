import React from 'react';
import { CheckCircle2, BookmarkCheck, Sparkles, BookOpen, Stamp } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function Table21Notebook({
  plant,
  loggedData = {},
  isLogged = false,
  onStampLog,
  testedStem = false,
  inspectedLeaf = false,
  inspectedFlower = false
}) {
  const isAllInspected = testedStem && inspectedLeaf && inspectedFlower;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      background: 'linear-gradient(175deg, #FAF8F2 0%, #F5F1E5 55%, #ECE5D5 100%)',
      borderRadius: '20px',
      border: '2px solid #14452F',
      padding: 'clamp(10px, 1.4vh, 16px) clamp(12px, 1.6vw, 20px)',
      boxShadow: '0 12px 32px rgba(20, 69, 47, 0.12)',
      boxSizing: 'border-box',
      overflow: 'hidden',
      fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif'
    }}>
      {/* Table Header */}
      <div style={{ flexShrink: 0, borderBottom: '2px solid #14452F', paddingBottom: '6px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={18} color="#14452F" />
            <span style={{
              fontFamily: '"Outfit", system-ui, sans-serif',
              fontWeight: 900,
              fontSize: '18px',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: '#0A3B24'
            }}>
              NCERT Table 2.1 · Field Observation Journal
            </span>
          </div>

          {isLogged ? (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#EAF7EE',
              color: '#0A3B24',
              border: '1.5px solid #14452F',
              borderRadius: '20px',
              padding: '4px 12px',
              fontSize: '14px',
              fontWeight: 800,
              fontFamily: '"Outfit", sans-serif'
            }}>
              <CheckCircle2 size={14} /> Stamped in Journal
            </span>
          ) : (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#FEF3C7',
              color: '#92400E',
              border: '1.5px solid #D97706',
              borderRadius: '20px',
              padding: '4px 12px',
              fontSize: '14px',
              fontWeight: 800,
              fontFamily: '"Outfit", sans-serif'
            }}>
              <Sparkles size={13} /> 3 Observations Needed
            </span>
          )}
        </div>
      </div>

      {/* Specimen Profile Title */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#FAF8F2',
        border: '1.5px solid #2D6A4F',
        borderRadius: '12px',
        padding: '6px 12px',
        margin: '4px 0',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.6rem' }}>{plant?.emoji || '🌿'}</span>
          <div>
            <h4 style={{
              margin: 0,
              fontFamily: '"Fraunces", Georgia, serif',
              color: '#0A3B24',
              fontSize: '20px',
              fontWeight: 900,
              lineHeight: 1.15
            }}>
              {plant?.popupName || plant?.name}
            </h4>
            <span style={{
              fontSize: '14px',
              fontWeight: 700,
              color: '#2D6A4F',
              fontFamily: '"Outfit", sans-serif'
            }}>
              Specimen ID: #{plant?.id?.toUpperCase()}
            </span>
          </div>
        </div>

        <span style={{
          background: plant?.verifyQ?.correct === 2 ? '#E0F2FE' : plant?.verifyQ?.correct === 1 ? '#FEF3C7' : '#EAF7EE',
          color: plant?.verifyQ?.correct === 2 ? '#0369A1' : plant?.verifyQ?.correct === 1 ? '#92400E' : '#0A3B24',
          border: '1.5px solid currentColor',
          borderRadius: '8px',
          padding: '4px 12px',
          fontSize: '15px',
          fontWeight: 800,
          fontFamily: '"Outfit", sans-serif'
        }}>
          {plant?.verifyQ?.correct === 2 ? (plant?.id === 'neem' ? 'Tree' : 'Shrub') : 'Herb'}
        </span>
      </div>

      {/* Official Table 2.1 Grid Entries */}
      <div style={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(4px, 0.8vh, 8px)',
        overflow: 'hidden'
      }}>
        {/* Row 1: Stem */}
        <div style={{
          background: testedStem ? '#FAF8F2' : '#F5F1E5',
          border: testedStem ? '1.8px solid #14452F' : '1.5px dashed #2D6A4F',
          borderRadius: '10px',
          padding: '6px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '3px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '16px', fontWeight: 800, color: '#0A3B24', letterSpacing: '0.02em', textTransform: 'uppercase', fontFamily: '"Outfit", sans-serif' }}>
              1. Stem Properties (Height & Hardness)
            </span>
            {testedStem ? (
              <span style={{ fontSize: '14px', color: '#14452F', fontWeight: 800 }}>✓ Verified</span>
            ) : (
              <span style={{ fontSize: '14px', color: '#64748B', fontWeight: 600 }}>Inspect stem hotspot</span>
            )}
          </div>
          <p style={{
            margin: 0,
            fontSize: '16px',
            color: testedStem ? '#0F3822' : '#475569',
            lineHeight: 1.45,
            fontWeight: testedStem ? 600 : 500,
            textAlign: 'justify',
            textJustify: 'inter-word'
          }}>
            {plant?.tableInfo?.stem || 'Observe stem color, flexibility, thickness, and hardness.'}
          </p>
        </div>

        {/* Row 2: Leaves */}
        <div style={{
          background: inspectedLeaf ? '#FAF8F2' : '#F5F1E5',
          border: inspectedLeaf ? '1.8px solid #14452F' : '1.5px dashed #2D6A4F',
          borderRadius: '10px',
          padding: '6px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '3px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '16px', fontWeight: 800, color: '#0A3B24', letterSpacing: '0.02em', textTransform: 'uppercase', fontFamily: '"Outfit", sans-serif' }}>
              2. Leaf Shape & Node Arrangement
            </span>
            {inspectedLeaf ? (
              <span style={{ fontSize: '14px', color: '#14452F', fontWeight: 800 }}>✓ Verified</span>
            ) : (
              <span style={{ fontSize: '14px', color: '#64748B', fontWeight: 600 }}>Inspect leaf hotspot</span>
            )}
          </div>
          <p style={{
            margin: 0,
            fontSize: '16px',
            color: inspectedLeaf ? '#0F3822' : '#475569',
            lineHeight: 1.45,
            fontWeight: inspectedLeaf ? 600 : 500,
            textAlign: 'justify',
            textJustify: 'inter-word'
          }}>
            {plant?.tableInfo?.leaves || 'Observe whether leaves are single alternate, opposite pairs, or pinnate.'}
          </p>
        </div>

        {/* Row 3: Flowers & Observations */}
        <div style={{
          background: inspectedFlower ? '#FAF8F2' : '#F5F1E5',
          border: inspectedFlower ? '1.8px solid #14452F' : '1.5px dashed #2D6A4F',
          borderRadius: '10px',
          padding: '6px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '3px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '16px', fontWeight: 800, color: '#0A3B24', letterSpacing: '0.02em', textTransform: 'uppercase', fontFamily: '"Outfit", sans-serif' }}>
              3. Flowers & Special Features
            </span>
            {inspectedFlower ? (
              <span style={{ fontSize: '14px', color: '#14452F', fontWeight: 800 }}>✓ Verified</span>
            ) : (
              <span style={{ fontSize: '14px', color: '#64748B', fontWeight: 600 }}>Inspect flower hotspot</span>
            )}
          </div>
          <p style={{
            margin: 0,
            fontSize: '16px',
            color: inspectedFlower ? '#0F3822' : '#475569',
            lineHeight: 1.45,
            fontWeight: inspectedFlower ? 600 : 500,
            textAlign: 'justify',
            textJustify: 'inter-word'
          }}>
            {plant?.tableInfo?.flowers || 'Observe flower color, petals, scent, and unique traits.'}
          </p>
        </div>
      </div>

      {/* Action Stamp Bar */}
      <div style={{
        flexShrink: 0,
        borderTop: '2px solid #14452F',
        paddingTop: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px'
      }}>
        <div style={{ fontSize: '15px', color: '#0A3B24', fontWeight: 700, fontFamily: '"Outfit", sans-serif' }}>
          {isLogged
            ? '✓ Recorded in NCERT Table 2.1 Science Journal'
            : isAllInspected
            ? 'All 3 features inspected! Ready to stamp.'
            : 'Tap the 3D hotspots to unlock journal stamp.'}
        </div>

        <button
          type="button"
          onClick={() => {
            sounds.playStar();
            onStampLog(plant?.id);
          }}
          disabled={isLogged || !isAllInspected}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: isLogged
              ? '#EAF7EE'
              : isAllInspected
              ? 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)'
              : '#E2E8F0',
            color: isLogged
              ? '#0A3B24'
              : isAllInspected
              ? '#ffffff'
              : '#94A3B8',
            border: isLogged
              ? '1.8px solid #14452F'
              : isAllInspected
              ? '1.5px solid #10B981'
              : '1px solid #CBD5E1',
            borderRadius: '10px',
            padding: '8px 20px',
            fontSize: '16px',
            fontWeight: 800,
            cursor: isLogged || !isAllInspected ? 'default' : 'pointer',
            boxShadow: isAllInspected && !isLogged ? '0 4px 14px rgba(20, 69, 47, 0.35)' : 'none',
            fontFamily: '"Outfit", sans-serif',
            transition: 'all 0.2s ease'
          }}
        >
          <Stamp size={16} />
          <span>{isLogged ? 'Journal Entry Verified' : 'Stamp Table 2.1'}</span>
        </button>
      </div>
    </div>
  );
}
