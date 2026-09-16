import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import ChapterBackFooter from './ChapterBackFooter';

export default function ChessSeatMinigame({ onComplete, onBack }) {
  const [progress, setProgress] = useState(0);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', text: string }

  const missions = [
    { row: 'C', col: 5 },
    { row: 'E', col: 2 }
  ];

  const currentMission = missions[Math.min(progress, missions.length - 1)];
  const isComplete = progress >= missions.length;

  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const cols = [1, 2, 3, 4, 5, 6, 7, 8];

  const handleSeatClick = (r, c) => {
    if (isComplete) return;

    if (r === currentMission.row && c === currentMission.col) {
      setFeedback({ type: 'success', text: `Correct! You found Row ${r}, Seat ${c}.` });
      setTimeout(() => {
        setFeedback(null);
        setProgress(p => p + 1);
      }, 1500);
    } else {
      setFeedback({ type: 'error', text: `Oops! That's Row ${r}, Seat ${c}. Try again!` });
      setTimeout(() => {
        setFeedback(null);
      }, 2000);
    }
  };

  return (
    <div style={{
      width: '100%', height: '100%', minHeight: 0,
      display: 'flex', flexDirection: 'column', background: '#F8F9FA',
      fontFamily: '"Space Grotesk", sans-serif'
    }}>
            <div style={{ display: 'flex', flex: 1, minHeight: 0, padding: '24px', gap: '24px', overflow: 'hidden' }}>
      {/* LEFT COLUMN */}
      <div style={{
        width: '55%',
        display: 'flex', flexDirection: 'column', gap: '16px'
      }}>
        {/* TEXT CARD */}
        <div style={{
          background: '#F3EFE6', borderRadius: '16px', padding: '24px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#D97706', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
            BIG QUESTION 2 - (A)
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#1E293B', fontFamily: '"Fraunces", serif', margin: '0 0 8px 0' }}>
            Understanding coordinates
          </h1>

          <div style={{ color: '#475569', lineHeight: 1.3, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <p style={{ margin: 0, fontSize: '24px' }}>Imagine you are playing a game of chess.</p>
            <p style={{ margin: 0, fontSize: '24px' }}>Every square on the chessboard has its own address.</p>
            <p style={{ margin: 0, fontSize: '24px' }}>
              Instead of saying, <strong>"Move to the middle,"</strong> players use a letter and a number, like <strong>d2</strong> or <strong>e4</strong>.
            </p>
            <p style={{ margin: 0, fontSize: '24px' }}>This tells everyone the exact square.</p>
          </div>
        </div>

        {/* CHESSBOARD VISUAL CARD */}
        <div style={{
          background: '#F3EFE6', borderRadius: '16px', padding: '24px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
          display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minHeight: 0, gap: '32px'
        }}>
          {[
            { col: 3, row: 1 }, // d2
            { col: 4, row: 3 }  // e4
          ].map((target, idx) => (
            <div key={idx} style={{
              background: '#FFFFFF', padding: '16px',
              borderRadius: '16px', border: '1.5px solid #F2DFBC',
              boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
              display: 'flex', flexDirection: 'column', gap: '8px'
            }}>
              <div style={{ display: 'flex' }}>
                {/* Row labels */}
                <div style={{ display: 'flex', flexDirection: 'column-reverse', justifyContent: 'space-around', paddingRight: '8px', color: '#64748B', fontWeight: 700, fontSize: '12px' }}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <div key={n} style={{ height: '28px', display: 'flex', alignItems: 'center' }}>{n}</div>)}
                </div>
                {/* Grid */}
                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(8, 28px)',
                  gridTemplateRows: 'repeat(8, 28px)', border: '1px solid #CBD5E1'
                }}>
                  {Array.from({ length: 64 }).map((_, i) => {
                    const r = 7 - Math.floor(i / 8);
                    const c = i % 8;
                    const isDark = (r + c) % 2 === 0;
                    
                    const isHighlightedCol = c === target.col;
                    const isHighlightedRow = r === target.row;
                    const isTarget = isHighlightedCol && isHighlightedRow;

                    let bg = isDark ? '#38BDF8' : '#BAE6FD';
                    if (isHighlightedCol || isHighlightedRow) bg = '#FDE68A';
                    if (isTarget) bg = '#F59E0B';

                    return (
                      <div key={i} style={{
                        background: bg,
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        {isTarget && <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFFFFF', border: '2px solid #B45309' }} />}
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Col labels */}
              <div style={{ display: 'flex', marginLeft: '12px', justifyContent: 'space-around', color: '#64748B', fontWeight: 700, fontSize: '12px', paddingLeft: '4px' }}>
                {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(l => <div key={l} style={{ width: '28px', textAlign: 'center' }}>{l}</div>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN - REMAINING (approx 35-40%) */}
      <div style={{
        flex: 1, padding: '32px',
        display: 'flex', flexDirection: 'column',
        background: '#F3EFE6', borderRadius: '16px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#1E293B', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Ticket color="#D97706" /> Let's Explore — Find Your Seat
          </h2>
          <div style={{ background: '#F1F5F9', padding: '6px 12px', borderRadius: '999px', fontSize: '14px', fontWeight: 800, color: '#475569' }}>
            Progress: {progress} / {missions.length}
          </div>
        </div>

        <p style={{ color: '#475569', fontSize: '18px', marginBottom: '24px' }}>
          Use the seat ticket below to find the correct seat in the theatre.
        </p>

        <div style={{
          flex: 1, background: '#FFFFFF', borderRadius: '16px',
          border: '1px solid #E2E8F0', padding: '32px 24px',
          display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}>
          {/* SCREEN */}
          <div style={{
            width: '80%', height: '32px', background: '#334155',
            borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            color: '#94A3B8', fontSize: '12px', fontWeight: 900,
            letterSpacing: '0.3em', paddingBottom: '4px', marginBottom: '32px'
          }}>
            SCREEN
          </div>

          {/* Seat Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '16px repeat(8, 28px)', gap: '12px 16px', alignItems: 'center' }}>
            {/* Top-left empty cell */}
            <div />
            {/* Col numbers */}
            {cols.map(c => (
              <div key={`col-${c}`} style={{ width: '28px', textAlign: 'center', color: '#64748B', fontWeight: 800, fontSize: '14px', paddingBottom: '4px' }}>
                {c}
              </div>
            ))}

            {/* Rows */}
            {rows.map(r => (
              <React.Fragment key={r}>
                <div style={{ width: '16px', color: '#64748B', fontWeight: 800, fontSize: '14px', textAlign: 'right' }}>{r}</div>
                {cols.map(c => {
                  const isTarget = !isComplete && r === currentMission.row && c === currentMission.col;
                  
                  return (
                    <motion.button
                      key={`${r}${c}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleSeatClick(r, c)}
                      style={{
                        width: '28px', height: '28px',
                        background: '#475569',
                        borderRadius: '6px 6px 4px 4px',
                        border: 'none', cursor: isComplete ? 'default' : 'pointer',
                        boxShadow: 'inset 0 -4px 0 rgba(0,0,0,0.3)',
                        position: 'relative',
                        padding: 0
                      }}
                    >
                      {/* Arm rests */}
                      <div style={{ position: 'absolute', top: '10px', left: '-2px', width: '4px', height: '14px', background: '#334155', borderRadius: '2px' }} />
                      <div style={{ position: 'absolute', top: '10px', right: '-2px', width: '4px', height: '14px', background: '#334155', borderRadius: '2px' }} />
                    </motion.button>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '24px', alignItems: 'stretch' }}>
          {/* TICKET */}
          {!isComplete && (
            <motion.div
              key={progress}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                background: '#FFFFFF', border: '2px solid #F5A623',
                borderRadius: '12px', padding: '12px 16px',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', minWidth: '120px'
              }}
            >
              <div style={{ fontSize: '10px', fontWeight: 900, color: '#64748B', letterSpacing: '0.05em' }}>YOUR TICKET</div>
              <div style={{ fontSize: '16px', fontWeight: 900, color: '#D97706' }}>
                ROW {currentMission.row} SEAT {currentMission.col}
              </div>
            </motion.div>
          )}

          {/* INFO/FEEDBACK BOX */}
          <div style={{
            flex: 1, background: feedback ? (feedback.type === 'success' ? '#F0FDF4' : '#FEF2F2') : '#FFFFFF',
            border: `1.5px solid ${feedback ? (feedback.type === 'success' ? '#22C55E' : '#EF4444') : '#E2E8F0'}`,
            borderRadius: '12px', padding: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: feedback ? (feedback.type === 'success' ? '#16A34A' : '#EF4444') : '#475569', fontWeight: 700 }}>
              {feedback ? (
                feedback.type === 'success' ? <CheckCircle2 /> : <AlertCircle />
              ) : (
                <div style={{ background: '#FDE68A', padding: '6px', borderRadius: '50%' }}>👆</div>
              )}
              {feedback ? feedback.text : (isComplete ? "Great job! You've mastered basic coordinates." : "Click the correct seat inside the theatre.")}
            </div>

          </div>
        </div>
      </div>
      </div>
<ChapterBackFooter 
        onBack={onBack}
        onNext={onComplete}
        nextLabel="Next Activity"
        nextDisabled={!isComplete}
        nextVariant="orange"
      />
    </div>
  );
}
