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

// NCERT Table 2.3 Answer Key based on plant height, stem properties, and branches
export const TABLE_2_3_CORRECT_ANSWERS = {
  mango: {
    height: ['Tall'],
    stemColor: ['Brown'],
    stemTexture: ['Hard'],
    stemThickness: ['Thick'],
    branchLow: ['No'],
    branchHigh: ['Yes'],
    plantGroup: ['Tree']
  },
  rose: {
    height: ['Medium'],
    stemColor: ['Brown', 'Green'],
    stemTexture: ['Hard'],
    stemThickness: ['Thin'],
    branchLow: ['Yes'],
    branchHigh: ['No'],
    plantGroup: ['Shrub']
  },
  tomato: {
    height: ['Short'],
    stemColor: ['Green'],
    stemTexture: ['Tender'],
    stemThickness: ['Thin'],
    branchLow: ['No'],
    branchHigh: ['No'],
    plantGroup: ['Herb']
  },
  sunflower: {
    height: ['Medium', 'Tall'],
    stemColor: ['Green'],
    stemTexture: ['Tender', 'Hard'],
    stemThickness: ['Thin'],
    branchLow: ['No'],
    branchHigh: ['No'],
    plantGroup: ['Herb']
  },
  hibiscus: {
    height: ['Medium'],
    stemColor: ['Brown'],
    stemTexture: ['Hard'],
    stemThickness: ['Thin'],
    branchLow: ['Yes'],
    branchHigh: ['No'],
    plantGroup: ['Shrub']
  }
};

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
    } else if (type === 'error') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.setValueAtTime(180, now + 0.12);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.start(now);
      osc.stop(now + 0.28);
    }
  } catch (e) {
    // Ignore audio restrictions
  }
};

export default function Table23Activity({ onBack, onNext }) {
  // Table 2.3 answers: { [rowId]: { [columnId]: value } }
  const [table23Answers, setTable23Answers] = useState({});
  const [table23Checked, setTable23Checked] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleTable23Select = (rowId, columnId, value) => {
    playAudioTone('click');
    setTable23Answers(prev => ({
      ...prev,
      [rowId]: { ...prev[rowId], [columnId]: value }
    }));
    setTable23Checked(false);
    setFeedback(null);
  };

  const handleTable23Reset = () => {
    playAudioTone('click');
    setTable23Answers({});
    setTable23Checked(false);
    setFeedback(null);
  };

  const handleTable23Check = () => {
    playAudioTone('click');
    setTable23Checked(true);

    let allCorrect = true;
    let anyUnfilled = false;
    let wrongCount = 0;

    TABLE_2_3_ROWS.forEach(row => {
      TABLE_2_3_COLUMNS.forEach(col => {
        const val = table23Answers[row.id]?.[col.id];
        if (!val) {
          anyUnfilled = true;
          allCorrect = false;
        } else if (!TABLE_2_3_CORRECT_ANSWERS[row.id]?.[col.id]?.includes(val)) {
          wrongCount++;
          allCorrect = false;
        }
      });
    });

    if (allCorrect) {
      playAudioTone('success');
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      setFeedback({
        type: 'success',
        message: '🎉 Brilliant! All plant characteristics and categories are correctly identified!'
      });
    } else if (anyUnfilled && wrongCount === 0) {
      playAudioTone('error');
      setFeedback({
        type: 'incomplete',
        message: '⚠️ Please select answers for all empty cells marked in red.'
      });
    } else {
      playAudioTone('error');
      setFeedback({
        type: 'error',
        message: `❌ ${wrongCount > 0 ? `${wrongCount} cell${wrongCount > 1 ? 's are' : ' is'} incorrect (marked in red).` : 'Some entries are missing.'} Review the plant evidence and try again!`
      });
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
      paddingTop: '44px',
      paddingBottom: '52px',
      paddingLeft: '16px',
      paddingRight: '16px',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      {/* Header: Wood Sign Title */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '20px',
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
          fontSize: '26px',
          fontWeight: 900,
          color: '#FFFFFF',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)'
        }}>
          Let's Explore <span style={{ color: '#FDE047' }}>Plants!</span>
        </h1>
        <p style={{
          margin: '2px 0 0',
          fontFamily: '"Outfit", sans-serif',
          fontSize: '24px',
          fontWeight: 700,
          color: '#FEF3C7',
          letterSpacing: '0.03em'
        }}>
          Observe &bull; Think &bull; Group
        </p>
      </div>

      {/* Main Table Card - slightly expanded top and bottom */}
      <div style={{
        width: 'min(98vw, 1540px)',
        maxWidth: '100%',
        maxHeight: '100%',
        overflow: 'hidden',
        boxSizing: 'border-box',
        background: 'linear-gradient(165deg, rgba(255, 255, 255, 0.96) 0%, rgba(240, 253, 244, 0.94) 45%, rgba(220, 252, 231, 0.90) 100%)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '2.5px solid #86EFAC',
        borderRadius: '24px',
        padding: '12px 18px',
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
          padding: '8px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          boxShadow: '0 6px 18px rgba(6, 78, 59, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.35)'
        }}>
          <span style={{ fontSize: '26px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>🌿</span>
          <h2 style={{
            margin: 0,
            fontFamily: '"Outfit", sans-serif',
            fontSize: '26px',
            fontWeight: 900,
            color: '#FFFFFF',
            textAlign: 'center',
            letterSpacing: '0.01em',
            textShadow: '0 2px 4px rgba(0,0,0,0.4)'
          }}>
            Table 2.3: <span style={{ color: '#FDE047', textShadow: '0 0 12px rgba(250, 204, 21, 0.6), 0 2px 4px rgba(0,0,0,0.5)' }}>Grouping of plants based on height and nature of stem</span>
          </h2>
          <span style={{ fontSize: '26px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>🌿</span>
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
                  background: 'linear-gradient(180deg, #BBF7D0 0%, #A7F3D0 100%)', padding: '8px 4px', fontSize: '24px', fontWeight: 900,
                  fontFamily: '"Outfit", sans-serif',
                  color: '#064E3B', borderBottom: '1.5px solid #6EE7B7', borderRight: '1.5px solid #86EFAC', width: '5%'
                }}>S. no.</th>
                <th rowSpan={2} style={{
                  background: 'linear-gradient(180deg, #BBF7D0 0%, #A7F3D0 100%)', padding: '8px 8px', fontSize: '24px', fontWeight: 900,
                  fontFamily: '"Outfit", sans-serif',
                  color: '#064E3B', borderBottom: '1.5px solid #6EE7B7', borderRight: '1.5px solid #86EFAC', width: '13%'
                }}>Name of the plant</th>
                <th style={{
                  background: 'linear-gradient(180deg, #86EFAC 0%, #4ADE80 100%)', padding: '8px 4px', fontSize: '24px', fontWeight: 900,
                  fontFamily: '"Outfit", sans-serif',
                  color: '#064E3B', borderBottom: '1.5px solid #22C55E', borderRight: '1.5px solid #4ADE80', width: '11%'
                }}>Height</th>
                <th colSpan={3} style={{
                  background: 'linear-gradient(180deg, #86EFAC 0%, #4ADE80 100%)', padding: '8px 4px', fontSize: '24px', fontWeight: 900,
                  fontFamily: '"Outfit", sans-serif',
                  color: '#064E3B', borderBottom: '1.5px solid #22C55E', borderRight: '1.5px solid #4ADE80', width: '33%'
                }}>Nature of stem</th>
                <th colSpan={2} style={{
                  background: 'linear-gradient(180deg, #86EFAC 0%, #4ADE80 100%)', padding: '8px 4px', fontSize: '24px', fontWeight: 900,
                  fontFamily: '"Outfit", sans-serif',
                  color: '#064E3B', borderBottom: '1.5px solid #22C55E', borderRight: '1.5px solid #4ADE80', width: '25%'
                }}>Appearance of branches</th>
                <th rowSpan={2} style={{
                  background: 'linear-gradient(180deg, #BBF7D0 0%, #A7F3D0 100%)', padding: '8px 8px', fontSize: '24px', fontWeight: 900,
                  fontFamily: '"Outfit", sans-serif',
                  color: '#064E3B', borderBottom: '1.5px solid #6EE7B7', width: '13%'
                }}>Name of plant group</th>
              </tr>
              <tr>
                <th style={{ background: 'linear-gradient(180deg, #ECFDF5 0%, #DCFCE7 100%)', padding: '6px 4px', fontSize: '22px', fontWeight: 800, fontFamily: '"Outfit", sans-serif', color: '#166534', borderBottom: '1.5px solid #86EFAC', borderRight: '1px solid #A7F3D0', width: '11%' }}>Short / Medium / Tall</th>
                <th style={{ background: 'linear-gradient(180deg, #ECFDF5 0%, #DCFCE7 100%)', padding: '6px 4px', fontSize: '22px', fontWeight: 800, fontFamily: '"Outfit", sans-serif', color: '#166534', borderBottom: '1.5px solid #86EFAC', borderRight: '1px solid #A7F3D0', width: '11%' }}>Green / Brown</th>
                <th style={{ background: 'linear-gradient(180deg, #ECFDF5 0%, #DCFCE7 100%)', padding: '6px 4px', fontSize: '22px', fontWeight: 800, fontFamily: '"Outfit", sans-serif', color: '#166534', borderBottom: '1.5px solid #86EFAC', borderRight: '1px solid #A7F3D0', width: '11%' }}>Tender / Hard</th>
                <th style={{ background: 'linear-gradient(180deg, #ECFDF5 0%, #DCFCE7 100%)', padding: '6px 4px', fontSize: '22px', fontWeight: 800, fontFamily: '"Outfit", sans-serif', color: '#166534', borderBottom: '1.5px solid #86EFAC', borderRight: '1px solid #A7F3D0', width: '11%' }}>Thick / Thin</th>
                <th style={{ background: 'linear-gradient(180deg, #ECFDF5 0%, #DCFCE7 100%)', padding: '6px 4px', fontSize: '22px', fontWeight: 800, fontFamily: '"Outfit", sans-serif', color: '#166534', borderBottom: '1.5px solid #86EFAC', borderRight: '1px solid #A7F3D0', width: '12.5%' }}>Close to the ground</th>
                <th style={{ background: 'linear-gradient(180deg, #ECFDF5 0%, #DCFCE7 100%)', padding: '6px 4px', fontSize: '22px', fontWeight: 800, fontFamily: '"Outfit", sans-serif', color: '#166534', borderBottom: '1.5px solid #86EFAC', borderRight: '1px solid #A7F3D0', width: '12.5%' }}>Higher up on the stem</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_2_3_ROWS.map((row, rowIdx) => (
                <tr key={row.id} style={{
                  background: rowIdx % 2 === 0 ? 'rgba(255,255,255,0.92)' : 'rgba(240,253,244,0.72)',
                  transition: 'background 0.15s ease'
                }}>
                  <td style={{
                    padding: '7px 4px',
                    fontSize: '23px',
                    fontWeight: 900,
                    fontFamily: '"Outfit", sans-serif',
                    color: '#065F46',
                    borderBottom: rowIdx === TABLE_2_3_ROWS.length - 1 ? 'none' : '1px solid #D1FAE5',
                    borderRight: '1px solid #D1FAE5',
                    textAlign: 'center'
                  }}>
                    {rowIdx + 1}.
                  </td>
                  <td style={{
                    padding: '7px 10px',
                    fontSize: '23px',
                    fontWeight: 900,
                    fontFamily: '"Outfit", sans-serif',
                    color: '#0F172A',
                    borderBottom: rowIdx === TABLE_2_3_ROWS.length - 1 ? 'none' : '1px solid #D1FAE5',
                    borderRight: '1px solid #D1FAE5'
                  }}>
                    {row.name}
                  </td>
                  {TABLE_2_3_COLUMNS.map((col, cIdx) => {
                    const value = (table23Answers[row.id] && table23Answers[row.id][col.id]) || '';
                    const isValCorrect = !!(value && TABLE_2_3_CORRECT_ANSWERS[row.id]?.[col.id]?.includes(value));

                    return (
                      <td key={col.id} style={{
                        padding: '5px 4px',
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
                            padding: '6px 8px',
                            minHeight: '42px',
                            borderRadius: '8px',
                            border: table23Checked
                              ? (isValCorrect ? '2.5px solid #22C55E' : '2.5px solid #EF4444')
                              : (value ? '1.5px solid #64748B' : '1.5px solid #CBD5E1'),
                            background: table23Checked
                              ? (isValCorrect ? 'rgba(240, 253, 244, 0.95)' : 'rgba(254, 242, 242, 0.95)')
                              : '#FFFFFF',
                            color: '#1E293B',
                            fontSize: '22px',
                            fontFamily: '"Inter", sans-serif',
                            fontWeight: 700,
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

        {/* Feedback Message Banner - content justified */}
        {feedback && (
          <div style={{
            padding: '8px 18px',
            borderRadius: '12px',
            fontSize: '22px',
            fontWeight: 800,
            textAlign: 'justify',
            fontFamily: '"Inter", sans-serif',
            lineHeight: 1.35,
            background: feedback.type === 'success'
              ? 'linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)'
              : (feedback.type === 'incomplete'
                  ? 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)'
                  : 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)'),
            color: feedback.type === 'success'
              ? '#14532D'
              : (feedback.type === 'incomplete' ? '#78350F' : '#991B1B'),
            border: feedback.type === 'success'
              ? '2px solid #22C55E'
              : (feedback.type === 'incomplete' ? '2px solid #F59E0B' : '2px solid #EF4444'),
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}>
            {feedback.message}
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '18px', paddingTop: '4px' }}>
          <button
            onClick={handleTable23Check}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)',
              border: '2px solid #86EFAC',
              borderRadius: '24px',
              padding: '10px 30px',
              fontSize: '22px',
              fontWeight: 900,
              color: '#FFFFFF',
              cursor: 'pointer',
              boxShadow: '0 6px 18px rgba(22, 163, 74, 0.45), inset 0 1px 0 rgba(255,255,255,0.3)',
              fontFamily: '"Outfit", sans-serif',
              transition: 'transform 0.15s ease, boxShadow 0.15s ease'
            }}
          >
            <Check size={22} /> Check Answer
          </button>
          <button
            onClick={handleTable23Reset}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
              border: '2px solid #FDBA74',
              borderRadius: '24px',
              padding: '10px 30px',
              fontSize: '22px',
              fontWeight: 900,
              color: '#FFFFFF',
              cursor: 'pointer',
              boxShadow: '0 6px 18px rgba(234, 88, 12, 0.45), inset 0 1px 0 rgba(255,255,255,0.3)',
              fontFamily: '"Outfit", sans-serif',
              transition: 'transform 0.15s ease, boxShadow 0.15s ease'
            }}
          >
            <RefreshCw size={20} /> Reset
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
          bottom: '12px',
          left: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.94)',
          border: '2px solid #CBD5E1',
          borderRadius: '26px',
          padding: '10px 24px',
          fontSize: '22px',
          fontWeight: 900,
          color: '#1E293B',
          cursor: 'pointer',
          boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
          zIndex: 50
        }}
      >
        <ArrowLeft size={22} /> Back to Act 2.4 Detective
      </button>
      <button
        onClick={() => {
          playAudioTone('click');
          if (onNext) onNext();
        }}
        style={{
          position: 'absolute',
          bottom: '12px',
          right: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'linear-gradient(135deg, #15803D 0%, #166534 100%)',
          border: '2px solid #86EFAC',
          borderRadius: '28px',
          padding: '10px 26px',
          fontSize: '22px',
          fontWeight: 900,
          color: '#FFFFFF',
          cursor: 'pointer',
          boxShadow: '0 6px 22px rgba(22, 101, 52, 0.5)',
          zIndex: 50
        }}
      >
        Proceed to Act 2.5 Leaf Venation <ArrowRight size={22} />
      </button>
    </div>
  );
}
