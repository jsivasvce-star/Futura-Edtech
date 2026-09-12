import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { ArrowRight } from 'lucide-react';
import classroomObjectsImg from '../../../../../../assets/classroom_objects.jpg';
import ancientPotteryImg from '../../../../../../assets/indian_pottery_illustration.jpg';

const SvgIcons = {
  MagnifyingGlass: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
  ),
  Play: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>),
  Pause: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>),
  Check: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>),
  IconCurrent: () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"></circle></svg>),
  IconLocked: () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="11" width="14" height="10" rx="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" fill="none"></path></svg>)
};


const clues = [
  {
    id: 1,
    title: "HOW OLD IS POTTERY?",
    bigFact: "7,000-8,000 YEARS",
    text: "The earliest pottery found in the Indian subcontinent dates back to 7,000 to 8,000 years in the Ganga plains and in Baluchistan.",
    timelineText: "AGE"
  },
  {
    id: 2,
    title: "POTTERY TECHNOLOGY",
    bigFact: "AROUND 4000 BCE",
    text: "About 4000 BCE onwards, Sindhu-Sarasvati developed techniques of wheel-turned pottery production, pigmentation, application of protective or decorative coats of multiple colours, decorative painting, etc.",
    timelineText: "SHAPING"
  },
  {
    id: 3,
    title: "HARAPPAN POTTERY",
    bigFact: "2600-1900 BCE",
    text: "These techniques became further sophisticated during the Sindhu-Sarasvati Civilisation, with a bright red surface painted with black-coloured designs displaying geometric patterns, and aquatic and terrestrial animals.",
    timelineText: "DESIGN"
  },
  {
    id: 4,
    title: "HOW WAS IT MADE?",
    bigFact: "TERRACOTTA",
    text: "The clay used for making pots, dishes, bowls and other items was carefully selected and cleaned, sieved, kneaded, turned over a wheel and finally baked in kilns.",
    timelineText: "MAKING"
  },
  {
    id: 5,
    title: "HOW WAS IT USED?",
    bigFact: "STORAGE & COOKING",
    text: "Pots were used for various purposes, from cooking to storage of food grains, oil, ghee, and so on. Some very large storage jars and other pottery items are exhibited at the National Museum, New Delhi.",
    timelineText: "USES"
  }
];

const PotterySpotlight = ({ currentClue, setCurrentClue }) => {
  const currentData = clues[currentClue - 1];

  const timelineNode = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 'auto', paddingTop: '8px', flexWrap: 'nowrap', overflow: 'hidden' }}>
      {clues.map((c, idx) => (
        <React.Fragment key={c.id}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div 
              onClick={() => setCurrentClue(c.id)}
              style={{
                width: '32px', height: '32px', 
                borderRadius: '50%',
                background: currentClue === c.id ? '#A94727' : (currentClue > c.id ? '#2C6E63' : '#D8C3A5'),
                color: currentClue === c.id || currentClue > c.id ? 'white' : '#8D6E63',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                fontWeight: 'bold', fontSize: '14px', cursor: 'pointer',
                boxShadow: currentClue === c.id ? '0 0 0 4px rgba(169, 71, 39, 0.25)' : 'none',
                flexShrink: 0
              }}
            >
              {currentClue > c.id ? <SvgIcons.Check /> : `0${c.id}`}
            </div>
            <div style={{ 
              fontSize: '11px', 
              fontWeight: '700', 
              fontFamily: "'Merriweather', Georgia, serif",
              color: currentClue === c.id ? '#A94727' : '#8D6E63',
              marginTop: '4px'
            }}>
              {c.timelineText}
            </div>
          </div>
          {idx < clues.length - 1 && (
            <div style={{ 
              height: '3px', 
              width: '40px',
              background: currentClue > c.id ? '#2C6E63' : '#D8C3A5',
              margin: '0 4px',
              flexShrink: 1,
              transform: 'translateY(-8px)'
            }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '0', boxSizing: 'border-box', overflow: 'hidden' }}>
      
      <div style={{ marginBottom: '8px' }}>
        <h3 style={{ fontSize: '42px', fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, color: '#3F2923', margin: '0 0 8px 0', wordBreak: 'break-word', lineHeight: '1.2' }}>
          {currentData.title}
        </h3>
        <div style={{ fontSize: '36px', fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, color: '#A94727', letterSpacing: '1px' }}>
          DO YOU KNOW?
        </div>
      </div>

      <div style={{ 
        flex: '1 1 auto', 
        backgroundColor: '#FDFBF7', 
        borderRadius: '12px', 
        border: '1.5px solid #D8C3A5', 
        borderLeft: '8px solid #A94727',
        padding: '20px 32px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '40px',
        marginBottom: '16px',
        minHeight: 'min-content',
        boxSizing: 'border-box',
        overflow: 'visible'
      }}>
        
        {/* Left Text Box (55-60%) */}
        <div style={{ flex: '1 1 58%', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ fontSize: '42px', fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, color: '#3F2923', marginBottom: '16px', lineHeight: '1.15', wordBreak: 'break-word' }}>
            {currentData.bigFact}
          </div>
          
          <div style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: '24px', fontWeight: 500, color: '#3F2923', lineHeight: '1.45', maxWidth: '100%', overflow: 'visible' }}>
            {currentData.text}
          </div>
        </div>

        {/* Right Image Box (35-40%) */}
        <div style={{ flex: '0 0 38%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <img 
            src={ancientPotteryImg} 
            alt="Pottery" 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '40vh',
              objectFit: 'contain',
              mixBlendMode: 'multiply',
              filter: 'drop-shadow(0 12px 24px rgba(62, 39, 35, 0.15))'
            }} 
          />
        </div>
      </div>

      <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', alignItems: 'center' }}>
          {currentClue < clues.length ? (
             <button 
               onClick={() => setCurrentClue(currentClue + 1)}
               style={{
                 background: '#A94727', color: 'white', border: 'none', borderRadius: '24px',
                 padding: 'clamp(8px, 1.5vw, 12px) clamp(16px, 3vw, 24px)', fontWeight: 'bold', fontSize: 'clamp(14px, 1.8vw, 18px)',
                 cursor: 'pointer', boxShadow: '0 2px 6px rgba(169, 71, 39, 0.25)'
               }}
             >
               NEXT CLUE →
             </button>
          ) : (
             <div style={{
                 background: '#2C6E63', color: 'white', borderRadius: '24px',
                 padding: 'clamp(8px, 1.5vw, 12px) clamp(16px, 3vw, 24px)', fontWeight: 'bold', fontSize: 'clamp(14px, 1.8vw, 18px)',
                 boxShadow: '0 2px 6px rgba(44, 110, 99, 0.25)',
                 display: 'flex', alignItems: 'center', gap: '8px'
               }}>
               INVESTIGATION COMPLETE! <SvgIcons.Check />
             </div>
          )}
        </div>
        {timelineNode}
      </div>
    </div>
  );
};

const InvestigationHandbookRender = ({ highestUnlockedIndex = 0, currentFlowIndex = 0, stageCompleted = false, onNext, onComplete }, ref) => {
  const handleProceed = onNext || onComplete;
  
  const [b1Page, setB1Page] = useState(1);
  const [currentClue, setCurrentClue] = useState(1);

  useImperativeHandle(ref, () => ({
    handleGlobalNext: () => {
      if (currentFlowIndex < 5) {
        if (b1Page === 1) {
          setB1Page(2);
          return false; // Don't close handbook
        } else if (b1Page === 2) {
          if (currentClue < 5) {
            return false; // Don't close handbook, user must click the internal clue button
          }
          return true; // Close handbook
        }
      }
      return true; // Close handbook for other barriers
    }
  }));

  // Determine which barrier we are in
  // currentFlowIndex 13 is Mission 3. index >= 13 is Barrier 3.
  const isBarrier2 = currentFlowIndex >= 5 && currentFlowIndex < 13;
  const isBarrier3 = currentFlowIndex >= 13;

  // Barrier 1 logic
  const isPhase1Done = highestUnlockedIndex > 1 || (currentFlowIndex === 1 && stageCompleted);
  const isPhase2Done = highestUnlockedIndex > 2 || (currentFlowIndex === 2 && stageCompleted);

  // Barrier 2 logic
  const isB2Phase1Done = highestUnlockedIndex > 6 || (currentFlowIndex === 6 && stageCompleted);
  const isB2Phase2Done = highestUnlockedIndex > 7 || (currentFlowIndex === 7 && stageCompleted);
  const isB2Phase3Done = highestUnlockedIndex > 8 || (currentFlowIndex === 8 && stageCompleted);
  const isB2Phase4Done = highestUnlockedIndex > 9 || (currentFlowIndex === 9 && stageCompleted);
  const isB2Phase5Done = highestUnlockedIndex > 10 || (currentFlowIndex === 10 && stageCompleted);



  return (
    <div style={{
      width: '100%',
      height: (!isBarrier2 && !isBarrier3) ? '100vh' : '100%',
      position: (!isBarrier2 && !isBarrier3) ? 'fixed' : 'relative',
      top: (!isBarrier2 && !isBarrier3) ? 0 : 'auto',
      left: (!isBarrier2 && !isBarrier3) ? 0 : 'auto',
      zIndex: (!isBarrier2 && !isBarrier3) ? 50 : 1,
      minHeight: 0,
      boxSizing: 'border-box',
      background: '#F4EBDD',
      paddingBottom: (!isBarrier2 && !isBarrier3) ? '82px' : 0,
      borderRadius: 0,
      boxShadow: 'none',
      display: 'flex',
      flexDirection: 'column',
      border: (!isBarrier2 && !isBarrier3) ? 'none' : '6px solid #3E2723',
      overflow: 'hidden'
    }}>
      {(!isBarrier2 && !isBarrier3 && b1Page === 1) && (
        <style>{`
          .global-action-bar {
            border: none !important;
            box-shadow: none !important;
            background: transparent !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
          }
          .global-action-bar button {
            border-radius: 20px !important;
          }
        `}</style>
      )}
      {/* TWO PAGES SPREAD CONTAINER */}
      <div style={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden'
      }}>
        {!isBarrier2 && !isBarrier3 ? (
          // ================= BARRIER 1 PAGES =================
          <>
            {b1Page === 1 && (
              <div style={{ flex: 1, minHeight: 0, padding: '24px 48px', position: 'relative', display: 'flex', flexDirection: 'row', gap: '48px', overflow: 'hidden' }}>
                {/* ================= PAGE 1 ================= */}
                {/* LEFT COLUMN – 58% */}
                <div style={{ width: 'calc(58% - 24px)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <h2 style={{ margin: 0, fontFamily: "'Merriweather', Georgia, serif", fontSize: '50px', color: '#3F2923', fontWeight: '900', lineHeight: 1.15 }}>
                      What are Objects Made Of?
                    </h2>
                    <div style={{ width: '420px', height: '4px', background: '#3F2923', opacity: 0.9, borderRadius: '2px', marginTop: '4px' }} />
                  </div>

                  <div style={{ fontFamily: "'Merriweather', Georgia, serif", color: '#3F2923' }}>
                    <p style={{ margin: '0 0 8px 0', fontSize: '26px', lineHeight: '1.45', fontWeight: 500 }}>
                      Look around you! You can see many things – a chair, a book, a water bottle, a pencil and so on.
                    </p>
                    <p style={{ margin: 0, fontSize: '26px', lineHeight: '1.45', fontWeight: 500 }}>
                      These are all <strong style={{ color: '#A94727', fontWeight: 700 }}>objects</strong>. Even though they look different, each object is made of some <strong style={{ color: '#A94727', fontWeight: 700 }}>material</strong>.
                    </p>
                  </div>

                  {/* Definition Box */}
                  <div style={{ background: '#FDFBF7', border: '1.5px solid #D8C3A5', borderLeft: '8px solid #A94727', borderRadius: '12px', padding: '12px 20px' }}>
                    <div style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: '24px', fontWeight: 500, color: '#3F2923', lineHeight: 1.45 }}>
                      <div style={{ marginBottom: '6px' }}><strong style={{ color: '#A94727', fontWeight: 700 }}>Material:</strong> The substance used to make an object.</div>
                      <div><strong style={{ color: '#A94727', fontWeight: 700 }}>Object:</strong> Anything we can see or use around us.</div>
                    </div>
                  </div>

                  {/* Examples Box */}
                  <div style={{ background: '#FDFBF7', border: '1.5px solid #D8C3A5', borderLeft: '8px solid #A94727', borderRadius: '12px', padding: '12px 20px' }}>
                    <h4 style={{ margin: '0 0 6px 0', color: '#325244', fontSize: '30px', fontWeight: 700, fontFamily: "'Merriweather', Georgia, serif" }}>Examples:</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: "'Merriweather', Georgia, serif", fontSize: '23px', fontWeight: 500, color: '#3F2923', lineHeight: 1.45 }}>
                      <div>• A chair can be made of wood, plastic or steel.</div>
                      <div>• A plate can be made of steel, glass or plastic.</div>
                      <div>• A bottle can be made of plastic, glass or steel.</div>
                    </div>
                  </div>

                  {/* Think! Box */}
                  <div style={{ background: '#FDFBF7', border: '1.5px solid #D8C3A5', borderLeft: '8px solid #A94727', borderRadius: '12px', padding: '12px 20px' }}>
                    <div style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: '23px', fontWeight: 500, color: '#3F2923', lineHeight: 1.45 }}>
                      <strong style={{ fontWeight: 700, color: '#A94727', fontSize: '30px', fontFamily: "'Merriweather', Georgia, serif", display: 'inline-block', marginBottom: '2px' }}>Think!</strong><br />
                      One object can be made from different materials. One material can be used to make many different objects. Can you think of more examples?
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN – 42% */}
                <div style={{ width: 'calc(42% - 24px)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <img 
                    src={classroomObjectsImg} 
                    alt="Classroom Objects – desk, chair, book, water bottle, pencil" 
                    style={{ 
                      width: '100%',
                      height: '100%', 
                      objectFit: 'contain',
                      objectPosition: 'center',
                      mixBlendMode: 'multiply',
                      transform: 'scale(1.3) translateX(0%)',
                    }} 
                  />
                </div>
              </div>
            )}

            {b1Page === 2 && (
              <div style={{ flex: 1, minHeight: 0, padding: '20px 48px', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                {/* ================= PAGE 2 ================= */}
                <div>
                  <h2 style={{ margin: 0, fontFamily: "'Merriweather', Georgia, serif", fontSize: '50px', color: '#3F2923', fontWeight: '900', lineHeight: 1.15 }}>
                    Historical Spotlight: Pottery
                  </h2>
                  <div style={{ width: '100%', height: '4px', background: '#A94727', opacity: 0.9, borderRadius: '2px', marginTop: '12px', marginBottom: '16px' }} />
                </div>

                <PotterySpotlight currentClue={currentClue} setCurrentClue={setCurrentClue} />
              </div>
            )}
          </>
        ) : isBarrier2 ? (
          // ================= BARRIER 2 TWO-PAGE SPREAD =================
          <>
            {/* ================= LEFT PAGE B2 (PAGE 1) ================= */}
            <div style={{ flex: 1, minHeight: 0, padding: '24px 32px', position: 'relative', display: 'flex', flexDirection: 'column', overflowY: 'hidden', borderRight: '1px solid var(--lesson-border)' }}>
              <h2 style={{ margin: '0 0 16px 0', fontSize: 'calc(var(--text-2xl) * 1.15)', color: 'var(--lesson-primary)', fontWeight: 'bold', borderBottom: '4px solid var(--lesson-accent)', paddingBottom: '6px', display: 'inline-block' }}>
                Observe and Identify Appearance of Materials
              </h2>

              <div style={{ fontSize: 'clamp(1.30rem, 1.55vw, 1.65rem)', color: 'var(--lesson-text)', lineHeight: '1.4', marginBottom: '14px', fontWeight: '600' }}>
                <p style={{ margin: '0 0 10px 0', fontSize: 'inherit', lineHeight: 'inherit' }}>Materials can look different from each other.</p>
                <p style={{ margin: '0 0 10px 0', fontSize: 'inherit', lineHeight: 'inherit' }}>Some have shiny surfaces, while others look dull.</p>
                <p style={{ margin: '0 0 10px 0', fontSize: 'inherit', lineHeight: 'inherit' }}>They may also differ in <strong style={{ color: 'var(--lesson-primary)', fontWeight: '800' }}>colour</strong> and <strong style={{ color: 'var(--lesson-primary)', fontWeight: '800' }}>texture</strong>, such as smooth or rough.</p>
              </div>

              <div style={{ border: '2px solid var(--lesson-accent)', borderRadius: '12px', padding: '16px', background: 'var(--lesson-surface)', marginBottom: '14px' }}>
                <h4 style={{ margin: '0 0 10px 0', color: 'var(--lesson-accent)', fontSize: 'calc(var(--text-lg) * 1.15)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ✨ Lustrous vs Non-lustrous
                </h4>
                <div style={{ fontSize: 'calc(var(--text-lg) * 1.15)', color: 'var(--lesson-text)', lineHeight: '1.4', fontWeight: '600' }}>
                  <p style={{ margin: '0 0 10px 0' }}>Materials with shiny surfaces are called <strong style={{ color: 'var(--lesson-accent)', fontWeight: '800' }}>lustrous</strong>. Metals like iron, copper and aluminium are usually lustrous.</p>
                  <p style={{ margin: '0' }}>Paper, wood and rubber are examples of <strong style={{ color: 'var(--lesson-accent)', fontWeight: '800' }}>non-lustrous</strong> materials.</p>
                </div>
              </div>

              <div style={{ marginTop: 'auto', background: 'var(--lesson-warning-bg)', border: '2px solid var(--lesson-warning-border)', borderRadius: '12px', padding: '12px 18px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ fontSize: 'calc(var(--text-xl) * 1.3)' }}>📌</div>
                <div style={{ fontSize: 'calc(var(--text-lg) * 1.3)', color: 'var(--lesson-primary)', lineHeight: '1.35' }}>
                  <strong>Remember!</strong><br/>
                  Not everything that shines is a metal!
                </div>
              </div>
            </div>

            {/* ================= RIGHT PAGE B2 (PAGE 2) ================= */}
            <div style={{ flex: 1, minHeight: 0, padding: '20px 28px', position: 'relative', display: 'flex', flexDirection: 'column', overflowY: 'hidden' }}>
              <h2 style={{ margin: '0 0 12px 0', fontSize: 'calc(var(--text-2xl) * 1.15)', color: 'var(--lesson-primary)', fontWeight: 'bold' }}>
                Investigation: Group by Appearance
              </h2>

              <div style={{ fontSize: 'clamp(1.30rem, 1.55vw, 1.65rem)', color: 'var(--lesson-text)', lineHeight: '1.4', marginBottom: '14px', fontWeight: '600' }}>
                <p style={{ margin: '0', fontSize: 'inherit', lineHeight: 'inherit' }}>Materials can be different in the way they look. Let's group them based on how their surface appears when light falls on them.</p>
              </div>

              <div style={{ background: 'var(--lesson-warning-bg)', border: '1px solid var(--lesson-warning-border)', borderRadius: '12px', padding: '12px 16px', display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ fontSize: 'calc(var(--text-xl) * 1.1)' }}>💡</div>
                <div style={{ fontSize: 'calc(var(--text-lg) * 1.15)', color: 'var(--lesson-primary)', lineHeight: '1.4', fontWeight: '600' }}>
                  Look carefully under the lamp.<br/>Drag each item to the correct group.
                </div>
              </div>

              <div style={{ border: '2px solid var(--lesson-success)', borderRadius: '12px', padding: '12px 18px', background: 'var(--lesson-success-bg)', display: 'flex', position: 'relative', marginBottom: '14px' }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 10px 0', color: 'var(--lesson-success)', fontSize: 'calc(var(--text-lg) * 1.1)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                    🎯 MISSION CHECKLIST
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: 'calc(var(--text-lg) * 1.05)', color: 'var(--lesson-success)', fontWeight: '600' }}>
                      <input type="checkbox" checked={true} readOnly style={{ width: '18px', height: '18px', accentColor: 'var(--lesson-success)', marginTop: '2px' }} />
                      <span>Read the Handbook</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: 'calc(var(--text-lg) * 1.05)', color: 'var(--lesson-success)', fontWeight: '600' }}>
                      <input type="checkbox" checked={false} readOnly style={{ width: '18px', height: '18px', accentColor: 'var(--lesson-success)', marginTop: '2px' }} />
                      <span>Observe the materials</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: 'calc(var(--text-lg) * 1.05)', color: 'var(--lesson-success)', fontWeight: '600' }}>
                      <input type="checkbox" checked={false} readOnly style={{ width: '18px', height: '18px', accentColor: 'var(--lesson-success)', marginTop: '2px' }} />
                      <span>Group by appearance</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: 'calc(var(--text-lg) * 1.05)', color: 'var(--lesson-success)', fontWeight: '600' }}>
                      <input type="checkbox" checked={false} readOnly style={{ width: '18px', height: '18px', accentColor: 'var(--lesson-success)', marginTop: '2px' }} />
                      <span>Test with the lamp</span>
                    </label>
                  </div>
                </div>
              </div>

              <div style={{ border: '1px solid var(--lesson-border)', borderRadius: '12px', padding: '12px 18px', background: 'var(--lesson-surface)', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                <h4 style={{ margin: '0', color: 'var(--lesson-primary)', fontSize: 'calc(var(--text-lg) * 1.1)', fontWeight: 'bold' }}>
                  How to do:
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: 'calc(var(--text-lg) * 1.05)', color: 'var(--lesson-text)', fontWeight: '600' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--lesson-accent-bg)', color: 'var(--lesson-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👆</div> Drag an item from the tray
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: 'calc(var(--text-lg) * 1.05)', color: 'var(--lesson-text)', fontWeight: '600' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--lesson-accent-bg)', color: 'var(--lesson-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🎯</div> Drop it in the right group
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: 'calc(var(--text-lg) * 1.05)', color: 'var(--lesson-text)', fontWeight: '600' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--lesson-accent-bg)', color: 'var(--lesson-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👁️</div> Click the lamp to observe again
                </div>
              </div>


            </div>
          </>
        ) : null}
      </div>

      {/* FOOTER BAR – thin, no visible label */}
      <div style={{
        height: '4px',
        background: 'transparent',
        flexShrink: 0
      }} />
    </div>
  );
};

const InvestigationHandbook = forwardRef(InvestigationHandbookRender);
export default InvestigationHandbook;
