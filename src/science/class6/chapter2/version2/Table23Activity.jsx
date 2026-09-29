import React, { useState } from 'react';
import { Check, RefreshCw, ArrowLeft, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

const BG_TABLE_GARDEN = '/activities/class6_chapter2/grouping/table2_3_garden_bg.jpg';

// Table 2.3: Grouping of plants based on height and nature of stem
export const TABLE_2_3_ROWS = [
  { id: 'mango', name: 'Mango' },
  { id: 'rose', name: 'Rose' },
  { id: 'tomato', name: 'Tomato' },
  { id: 'sunflower', name: 'Sunflower' },
  { id: 'hibiscus', name: 'Hibiscus' }
];

export const TABLE_2_3_COLUMNS = [
  { id: 'height', label: 'Height', group: 'Height', options: ['Short', 'Medium', 'Tall'] },
  { id: 'stemColor', label: 'Green / Brown', group: 'Nature of stem', options: ['Green', 'Brown'] },
  { id: 'stemTexture', label: 'Tender / Hard', group: 'Nature of stem', options: ['Tender', 'Hard'] },
  { id: 'stemThickness', label: 'Thick / Thin', group: 'Nature of stem', options: ['Thick', 'Thin'] },
  { id: 'branchLow', label: 'Close to the ground', group: 'Appearance of branches', options: ['Yes', 'No'] },
  { id: 'branchHigh', label: 'Higher up on the stem', group: 'Appearance of branches', options: ['Yes', 'No'] },
  { id: 'plantGroup', label: 'Name of plant group', group: null, options: ['Herb', 'Shrub', 'Tree'] }
];

const playAudioTone = (type = 'click') => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(554.37, now + 0.1);
      osc.frequency.setValueAtTime(659.25, now + 0.2);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    }
  } catch (e) {
    // Ignore audio restrictions
  }
};

export default function Table23Activity({ onBack, onNext }) {
  // Table 2.3 answers: { [rowId]: { [columnId]: value } }
  const [table23Answers, setTable23Answers] = useState({});
  const [table23Checked, setTable23Checked] = useState(false);

  const handleTable23Select = (rowId, columnId, value) => {
    playAudioTone('click');
    setTable23Answers(prev => ({
      ...prev,
      [rowId]: { ...prev[rowId], [columnId]: value }
    }));
    setTable23Checked(false);
  };

  const handleTable23Reset = () => {
    playAudioTone('click');
    setTable23Answers({});
    setTable23Checked(false);
  };

  const handleTable23Check = () => {
    playAudioTone('click');
    setTable23Checked(true);
    const allFilled = TABLE_2_3_ROWS.every(row =>
      TABLE_2_3_COLUMNS.every(col => !!(table23Answers[row.id] && table23Answers[row.id][col.id]))
    );
    if (allFilled) {
      playAudioTone('success');
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    }
  };

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `url('${BG_TABLE_GARDEN}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: '60px',
      paddingBottom: '68px',
      paddingLeft: '20px',
      paddingRight: '20px',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      {/* Header: Wood Sign Title */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '24px',
        background: 'linear-gradient(180deg, #B07D48 0%, #7F4F24 100%)',
        border: '3px solid #5C3A1A',
        borderRadius: '14px',
        padding: '6px 22px',
        boxShadow: '0 6px 16px rgba(0,0,0,0.35)',
        transform: 'rotate(-1.5deg)',
        zIndex: 45
      }}>
        <h1 style={{
          margin: 0,
          fontFamily: '"Outfit", sans-serif',
          fontSize: '22px',
          fontWeight: 900,
          color: '#FFFFFF',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)'
        }}>
          Let's Explore <span style={{ color: '#FDE047' }}>Plants!</span>
        </h1>
        <p style={{
          margin: '2px 0 0',
          fontFamily: '"Outfit", sans-serif',
          fontSize: '20px',
          fontWeight: 700,
          color: '#FEF3C7',
          letterSpacing: '0.03em'
        }}>
          Observe &bull; Think &bull; Group
        </p>
      </div>

      {/* Main Table Card */}
      <div style={{
        width: 'min(97vw, 1500px)',
        maxWidth: '100%',
        maxHeight: '100%',
        overflow: 'hidden',
        boxSizing: 'border-box',
        background: 'linear-gradient(165deg, rgba(255, 255, 255, 0.96) 0%, rgba(240, 253, 244, 0.94) 45%, rgba(220, 252, 231, 0.90) 100%)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '2.5px solid #86EFAC',
        borderRadius: '24px',
        padding: '14px 20px',
        boxShadow: '0 25px 60px -10px rgba(6, 78, 59, 0.4), 0 0 0 3px rgba(255, 255, 255, 0.95), 0 0 35px rgba(34, 197, 94, 0.35), inset 0 2px 4px rgba(255, 255, 255, 0.9)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {/* Table Title Bar */}
        <div style={{
          background: 'linear-gradient(135deg, #064E3B 0%, #15803D 50%, #166534 100%)',
          border: '1.5px solid #86EFAC',
          borderRadius: '14px',
          padding: '8px 22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          boxShadow: '0 6px 18px rgba(6, 78, 59, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.35)'
        }}>
          <span style={{ fontSize: '22px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>🌿</span>
          <h2 style={{
            margin: 0,
            fontFamily: '"Outfit", sans-serif',
            fontSize: '22px',
            fontWeight: 800,
            color: '#FFFFFF',
            textAlign: 'center',
            letterSpacing: '0.01em',
            textShadow: '0 2px 4px rgba(0,0,0,0.4)'
          }}>
            Table 2.3: <span style={{ color: '#FDE047', textShadow: '0 0 12px rgba(250, 204, 21, 0.6), 0 2px 4px rgba(0,0,0,0.5)' }}>Grouping of plants based on height and nature of stem</span>
          </h2>
          <span style={{ fontSize: '22px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>🌿</span>
        </div>

        {/* Table */}
        <div style={{
          overflowX: 'auto',
          width: '100%',
          boxSizing: 'border-box',
          borderRadius: '12px',
          border: '1.5px solid #86EFAC',
          boxShadow: '0 4px 14px rgba(6, 78, 59, 0.08)'
        }}>
          <table style={{
            width: '100%',
            tableLayout: 'fixed',
            borderCollapse: 'separate',
            borderSpacing: 0,
            fontFamily: '"Inter", sans-serif'
          }}>
            <thead>
              <tr>
                <th rowSpan={2} style={{
                  background: 'linear-gradient(180deg, #BBF7D0 0%, #A7F3D0 100%)', padding: '6px 4px', fontSize: '20px', fontWeight: 800,
                  color: '#064E3B', borderBottom: '1.5px solid #6EE7B7', borderRight: '1.5px solid #86EFAC', width: '5%'
                }}>S. no.</th>
                <th rowSpan={2} style={{
                  background: 'linear-gradient(180deg, #BBF7D0 0%, #A7F3D0 100%)', padding: '6px 6px', fontSize: '20px', fontWeight: 800,
                  color: '#064E3B', borderBottom: '1.5px solid #6EE7B7', borderRight: '1.5px solid #86EFAC', width: '12%'
                }}>Name of the plant</th>
                <th style={{
                  background: 'linear-gradient(180deg, #86EFAC 0%, #4ADE80 100%)', padding: '6px 4px', fontSize: '20px', fontWeight: 800,
                  color: '#064E3B', borderBottom: '1.5px solid #22C55E', borderRight: '1.5px solid #4ADE80', width: '11%'
                }}>Height</th>
                <th colSpan={3} style={{
                  background: 'linear-gradient(180deg, #86EFAC 0%, #4ADE80 100%)', padding: '6px 4px', fontSize: '20px', fontWeight: 800,
                  color: '#064E3B', borderBottom: '1.5px solid #22C55E', borderRight: '1.5px solid #4ADE80', width: '33%'
                }}>Nature of stem</th>
                <th colSpan={2} style={{
                  background: 'linear-gradient(180deg, #86EFAC 0%, #4ADE80 100%)', padding: '6px 4px', fontSize: '20px', fontWeight: 800,
                  color: '#064E3B', borderBottom: '1.5px solid #22C55E', borderRight: '1.5px solid #4ADE80', width: '26%'
                }}>Appearance of branches</th>
                <th rowSpan={2} style={{
                  background: 'linear-gradient(180deg, #BBF7D0 0%, #A7F3D0 100%)', padding: '6px 6px', fontSize: '20px', fontWeight: 800,
                  color: '#064E3B', borderBottom: '1.5px solid #6EE7B7', width: '13%'
                }}>Name of plant group</th>
              </tr>
              <tr>
                <th style={{ background: 'linear-gradient(180deg, #ECFDF5 0%, #DCFCE7 100%)', padding: '4px 3px', fontSize: '20px', fontWeight: 700, color: '#166534', borderBottom: '1.5px solid #86EFAC', borderRight: '1px solid #A7F3D0', width: '11%' }}>Short / Medium / Tall</th>
                <th style={{ background: 'linear-gradient(180deg, #ECFDF5 0%, #DCFCE7 100%)', padding: '4px 3px', fontSize: '20px', fontWeight: 700, color: '#166534', borderBottom: '1.5px solid #86EFAC', borderRight: '1px solid #A7F3D0', width: '11%' }}>Green / Brown</th>
                <th style={{ background: 'linear-gradient(180deg, #ECFDF5 0%, #DCFCE7 100%)', padding: '4px 3px', fontSize: '20px', fontWeight: 700, color: '#166534', borderBottom: '1.5px solid #86EFAC', borderRight: '1px solid #A7F3D0', width: '11%' }}>Tender / Hard</th>
                <th style={{ background: 'linear-gradient(180deg, #ECFDF5 0%, #DCFCE7 100%)', padding: '4px 3px', fontSize: '20px', fontWeight: 700, color: '#166534', borderBottom: '1.5px solid #86EFAC', borderRight: '1px solid #A7F3D0', width: '11%' }}>Thick / Thin</th>
                <th style={{ background: 'linear-gradient(180deg, #ECFDF5 0%, #DCFCE7 100%)', padding: '4px 3px', fontSize: '20px', fontWeight: 700, color: '#166534', borderBottom: '1.5px solid #86EFAC', borderRight: '1px solid #A7F3D0', width: '13%' }}>Close to the ground</th>
                <th style={{ background: 'linear-gradient(180deg, #ECFDF5 0%, #DCFCE7 100%)', padding: '4px 3px', fontSize: '20px', fontWeight: 700, color: '#166534', borderBottom: '1.5px solid #86EFAC', borderRight: '1px solid #A7F3D0', width: '13%' }}>Higher up on the stem</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_2_3_ROWS.map((row, rowIdx) => (
                <tr key={row.id} style={{
                  background: rowIdx % 2 === 0 ? 'rgba(255,255,255,0.92)' : 'rgba(240,253,244,0.72)',
                  transition: 'background 0.15s ease'
                }}>
                  <td style={{
                    padding: '6px 4px',
                    fontSize: '20px',
                    fontWeight: 800,
                    color: '#065F46',
                    borderBottom: rowIdx === TABLE_2_3_ROWS.length - 1 ? 'none' : '1px solid #D1FAE5',
                    borderRight: '1px solid #D1FAE5',
                    textAlign: 'center'
                  }}>
                    {rowIdx + 1}.
                  </td>
                  <td style={{
                    padding: '6px 8px',
                    fontSize: '20px',
                    fontWeight: 800,
                    color: '#0F172A',
                    borderBottom: rowIdx === TABLE_2_3_ROWS.length - 1 ? 'none' : '1px solid #D1FAE5',
                    borderRight: '1px solid #D1FAE5'
                  }}>
                    {row.name}
                  </td>
                  {TABLE_2_3_COLUMNS.map((col, cIdx) => {
                    const value = (table23Answers[row.id] && table23Answers[row.id][col.id]) || '';
                    return (
                      <td key={col.id} style={{
                        padding: '4px 4px',
                        borderBottom: rowIdx === TABLE_2_3_ROWS.length - 1 ? 'none' : '1px solid #D1FAE5',
                        borderRight: cIdx === TABLE_2_3_COLUMNS.length - 1 ? 'none' : '1px solid #D1FAE5',
                        overflow: 'hidden'
                      }}>
                        <select
                          value={value}
                          onChange={(e) => handleTable23Select(row.id, col.id, e.target.value)}
                          style={{
                            width: '100%',
                            maxWidth: '100%',
                            boxSizing: 'border-box',
                            padding: '4px 6px',
                            minHeight: '38px',
                            borderRadius: '8px',
                            border: table23Checked
                              ? (value ? '2px solid #22C55E' : '2px solid #F87171')
                              : '1.5px solid #CBD5E1',
                            background: table23Checked && value
                              ? 'rgba(240, 253, 244, 0.95)'
                              : '#FFFFFF',
                            color: '#1E293B',
                            fontSize: '20px',
                            fontFamily: '"Inter", sans-serif',
                            fontWeight: 600,
                            cursor: 'pointer',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
                          }}
                        >
                          <option value="">Select</option>
                          {col.options.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '18px', paddingTop: '2px' }}>
          <button
            onClick={handleTable23Check}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)',
              border: '2px solid #86EFAC',
              borderRadius: '24px',
              padding: '9px 28px',
              fontSize: '20px',
              fontWeight: 800,
              color: '#FFFFFF',
              cursor: 'pointer',
              boxShadow: '0 6px 18px rgba(22, 163, 74, 0.45), inset 0 1px 0 rgba(255,255,255,0.3)',
              fontFamily: '"Outfit", sans-serif',
              transition: 'transform 0.15s ease, boxShadow 0.15s ease'
            }}
          >
            <Check size={20} /> Check Answer
          </button>
          <button
            onClick={handleTable23Reset}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
              border: '2px solid #FDBA74',
              borderRadius: '24px',
              padding: '9px 28px',
              fontSize: '20px',
              fontWeight: 800,
              color: '#FFFFFF',
              cursor: 'pointer',
              boxShadow: '0 6px 18px rgba(234, 88, 12, 0.45), inset 0 1px 0 rgba(255,255,255,0.3)',
              fontFamily: '"Outfit", sans-serif',
              transition: 'transform 0.15s ease, boxShadow 0.15s ease'
            }}
          >
            <RefreshCw size={18} /> Reset
          </button>
        </div>
      </div>

      {/* Back / Next Nav */}
      <button
        onClick={() => {
          playAudioTone('click');
          if (onBack) onBack();
        }}
        style={{
          position: 'absolute',
          bottom: '14px',
          left: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.92)',
          border: '2px solid #CBD5E1',
          borderRadius: '26px',
          padding: '9px 22px',
          fontSize: '20px',
          fontWeight: 800,
          color: '#1E293B',
          cursor: 'pointer',
          boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
          zIndex: 50
        }}
      >
        <ArrowLeft size={20} /> Back to Act 2.4 Detective
      </button>
      <button
        onClick={() => {
          playAudioTone('click');
          if (onNext) onNext();
        }}
        style={{
          position: 'absolute',
          bottom: '14px',
          right: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'linear-gradient(135deg, #15803D 0%, #166534 100%)',
          border: '2px solid #86EFAC',
          borderRadius: '28px',
          padding: '9px 24px',
          fontSize: '20px',
          fontWeight: 900,
          color: '#FFFFFF',
          cursor: 'pointer',
          boxShadow: '0 6px 22px rgba(22, 101, 52, 0.5)',
          zIndex: 50
        }}
      >
        Proceed to Act 2.5 Leaf Venation <ArrowRight size={20} />
      </button>
    </div>
  );
}
