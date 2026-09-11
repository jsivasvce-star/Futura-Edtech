import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AirExperiments3D from './AirExperiments3D';
import { motion, AnimatePresence } from 'framer-motion';

export default function Stage9a_WhatIsMatter({ onComplete, addXp }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completed, setCompleted] = useState({ 1: false, 2: false, 3: false });

  const goStep = (n) => {
    setCurrentStep(n);
  };

  const markComplete = (n) => {
    setCompleted(prev => ({ ...prev, [n]: true }));
  };

  // Step 1: Define Matter
  const [picked, setPicked] = useState({ space: false, mass: false });
  const pickChip = (which) => {
    if (completed[1]) return;
    const newPicked = { ...picked, [which]: true };
    setPicked(newPicked);
    if (newPicked.space && newPicked.mass) {
      markComplete(1);
    }
  };

  // Step 2: Investigate Air
  const [airDone, setAirDone] = useState(false);
  const handleAirComplete = () => {
    if (!airDone) {
      setAirDone(true);
      markComplete(2);
    }
  };

  // Step 3: Sort Evidence
  const [sortItems, setSortItems] = useState([
    { id: 'kg', ans: 'mass' },
    { id: 'g', ans: 'mass' },
    { id: 'L', ans: 'volume' },
    { id: 'mL', ans: 'volume' },
    { id: 'm³', ans: 'volume' },
  ]);
  const [massBin, setMassBin] = useState([]);
  const [volumeBin, setVolumeBin] = useState([]);
  const [askUnit, setAskUnit] = useState(null);
  const [shakeUnit, setShakeUnit] = useState(null);

  const answerSort = (choice) => {
    if (!askUnit) return;
    if (choice === askUnit.ans) {
      if (choice === 'mass') setMassBin([...massBin, askUnit.id]);
      else setVolumeBin([...volumeBin, askUnit.id]);
      
      const newItems = sortItems.filter(i => i.id !== askUnit.id);
      setSortItems(newItems);
      setAskUnit(null);

      if (newItems.length === 0) {
        markComplete(3);
      }
    } else {
      setAskUnit(null);
      setShakeUnit(askUnit.id);
      setTimeout(() => setShakeUnit(null), 400);
    }
  };

  // Final Evidence & Close Case
  const [caseClosed, setCaseClosed] = useState(false);
  const handleCloseCase = () => {
    setCaseClosed(true);
    if (typeof addXp === 'function') addXp(50);
    if (typeof onComplete === 'function') {
      setTimeout(onComplete, 3000);
    }
  };

  const clueTags = {
    1: completed[1] ? 'Clue found ✓' : 'Define matter',
    2: completed[2] ? 'Air is matter ✓' : 'Is air a suspect?',
    3: completed[3] ? 'Evidence filed ✓' : 'Sort the evidence',
  };

  return (
    <div className="case-wrap" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '80px', overflow: 'hidden' }}>
      <style>{`
        .case-wrap {
          --bg-cream: #F4F1E1;
          --border-color: #D2C4A7;
          --title-dark: #43372B;
          --subtitle-orange: #B84C23;
          --card-bg: #FCFAF5;
          --ink: #43372B;
          --ink-light: #5A4E3C;
          --white: #FFFFFF;
          --success-green: #38763E;

          background-color: var(--bg-cream);
          color: var(--ink);
          font-family: 'Inter', sans-serif;
          line-height: 1.3;
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          min-height: 0;
        }

        .case-wrap * { box-sizing: border-box; }

        /* Header */
        .c-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 40px;
          background: var(--bg-cream);
          flex: none;
        }
        .c-header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .c-header-left svg {
          color: var(--ink);
          width: 48px;
          height: 48px;
        }
        .c-header-left h1 {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          color: var(--title-dark);
          margin: 0;
          font-weight: 700;
        }
        .c-header-left p {
          font-size: 18px;
          color: var(--subtitle-orange);
          margin: 0;
          font-weight: 500;
        }
        .c-header-right {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 20px;
          font-weight: 600;
          color: var(--ink);
        }
        .clue-circles {
          display: flex;
          gap: 8px;
        }
        .c-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
        }
        .c-circle.done {
          background: var(--success-green);
          border-color: var(--success-green);
          color: white;
        }

        .c-top-nav {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 24px;
          padding: 20px 40px;
          background: #EBE5D3;
          border-bottom: 2px solid var(--border-color);
          border-top: 2px solid var(--border-color);
          flex: none;
        }

        .c-tab {
          display: flex;
          gap: 12px;
          align-items: center;
          background: var(--bg-cream);
          border: 2px solid var(--border-color);
          border-radius: 8px;
          padding: 10px 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: 240px;
        }
        
        .c-tab .badge {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: #5A4E3C;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 700;
          color: var(--white);
          flex: none;
        }
        
        .c-tab .txt { display: flex; flex-direction: column; }
        .c-tab .txt b { font-size: 18px; color: var(--title-dark); line-height: 1.2; }
        .c-tab .txt span { font-size: 14px; color: var(--ink-light); }

        .c-tab.active { background: var(--white); border-color: var(--subtitle-orange); box-shadow: 0 4px 12px rgba(184, 76, 35, 0.1); transform: translateY(-2px); }
        .c-tab.active .badge { background: var(--success-green); color: var(--white); }
        .c-tab.active .txt b { color: var(--subtitle-orange); }
        
        .c-tab.solved .badge { background: var(--success-green); color: var(--white); }

        .c-stage {
          padding: 12px 40px 16px 40px;
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
          position: relative;
        }

        .c-panel {
          display: none;
          flex: 1;
          flex-direction: column;
          min-height: 0;
        }
        .c-panel.active {
          display: flex;
        }

        /* Clue 1: Two Column Layout */
        .clue1-layout {
          display: flex;
          gap: 60px;
          flex: 1;
          min-height: 0;
        }
        
        .clue1-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding-top: 0;
        }
        
        .clue1-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          min-height: 0;
          justify-content: flex-end;
        }

        .clue1-img-wrap {
          flex: 1;
          width: 100%;
          min-height: 0;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 20px;
          display: flex;
        }

        .clue1-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .clue1-left h2 {
          font-family: 'Playfair Display', serif;
          font-size: 48px;
          font-weight: 800;
          color: var(--title-dark);
          margin: 0 0 4px 0;
          line-height: 1.1;
        }

        .clue1-left p.lead {
          font-size: 28px;
          color: var(--ink);
          margin: 0 0 6px 0;
          line-height: 1.3;
        }
        
        .clue1-left p.lead b {
          color: var(--subtitle-orange);
        }

        .prop-card {
          background: var(--white);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 8px 12px;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.03);
          border-left: 6px solid var(--subtitle-orange);
        }
        
        .prop-card.green {
          border-left-color: var(--success-green);
        }

        .prop-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #F8EDE6;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: none;
        }
        .prop-card.green .prop-icon { background: #EAF2EC; }
        
        .prop-icon svg {
          width: 28px;
          height: 28px;
          color: var(--subtitle-orange);
        }
        .prop-card.green .prop-icon svg { color: var(--success-green); }

        .prop-txt {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .prop-txt h4 {
          margin: 0;
          font-size: 28px;
          font-weight: 800;
          color: var(--subtitle-orange);
        }
        .prop-card.green .prop-txt h4 {
          color: var(--success-green);
        }
        .prop-txt p {
          margin: 0;
          font-size: 24px;
          color: var(--ink);
        }
        .prop-txt p b { color: var(--subtitle-orange); }

        .clue1-left p.body {
          font-size: 26px;
          color: var(--ink);
          margin: 6px 0;
          line-height: 1.3;
        }
        .clue1-left p.body b { color: var(--subtitle-orange); }

        .question-txt {
          font-size: 28px;
          font-weight: 800;
          color: var(--title-dark);
          margin-bottom: 4px;
        }

        .chip-opts {
          display: flex;
          gap: 16px;
          margin-bottom: 8px;
        }

        .chip-btn {
          flex: 1;
          padding: 12px 20px;
          font-size: 20px;
          font-weight: 700;
          text-align: center;
          background: var(--white);
          border: 2px solid var(--subtitle-orange);
          color: var(--subtitle-orange);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 0 var(--border-color);
        }

        .chip-btn:hover:not(:disabled) { transform: translateY(2px); box-shadow: 0 2px 0 var(--border-color); background: #FFF6F2; }
        .chip-btn.picked {
          background: var(--white);
          color: var(--subtitle-orange);
          box-shadow: none;
          transform: translateY(4px);
          border-color: var(--subtitle-orange);
        }

        .success-box {
          background: #E8F5E9;
          border: 2px solid var(--success-green);
          color: var(--success-green);
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 24px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .c-btn-action { 
          width: 100%;
          padding: 16px 32px;
          font-size: 22px;
          font-weight: 700;
          color: var(--white); 
          background: var(--subtitle-orange); 
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .c-btn-action:hover:not(:disabled) { background: #C55328; }
        .c-btn-action:disabled { opacity: 0.5; cursor: not-allowed; }

        /* General Stage classes */
        .c-panel { display: none; flex: 1; min-height: 0; flex-direction: column; }
        .c-panel.active { display: flex; animation: panelIn 0.3s ease forwards; }
        @keyframes panelIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .c-panel h2.gen { font-family: 'Playfair Display', serif; font-size: 34px; color: var(--title-dark); margin: 0 0 8px 0; border-bottom: 2px solid var(--border-color); padding-bottom: 12px; flex: none; }
        .c-panel .sub { font-size: 22px; color: var(--ink-light); margin: 0 0 20px 0; font-weight: 500; flex: none; }

        .c-sort-tray { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; background: var(--white); padding: 24px; border-radius: 16px; margin-bottom: 24px; border: 2px solid var(--border-color); flex: none; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
        .c-sort-chip { background: var(--bg-cream); border-radius: 8px; padding: 16px 32px; font-size: 24px; font-weight: 700; color: var(--title-dark); cursor: pointer; border: 2px solid var(--border-color); box-shadow: 0 4px 0 var(--border-color); transition: all 0.15s ease; }
        .c-sort-chip:hover { transform: translateY(2px); box-shadow: 0 2px 0 var(--border-color); }
        .c-sort-chip.shake { animation: shake 0.4s ease; border-color: var(--subtitle-orange); }

        .c-bins { display: flex; gap: 32px; flex: 1; min-height: 0; }
        .c-bin { flex: 1; border: 3px dashed var(--border-color); border-radius: 16px; padding: 24px; display: flex; flex-direction: column; gap: 16px; align-items: center; background: var(--white); overflow-y: auto; min-height: 0; }
        .c-bin h3 { font-size: 26px; color: var(--title-dark); font-weight: 700; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 1px; }
        .c-bin .item { background: var(--bg-cream); color: var(--title-dark); border: 2px solid var(--border-color); border-radius: 8px; padding: 12px 32px; font-size: 24px; font-weight: 700; box-shadow: 0 2px 0 var(--border-color); }

        .c-ask { position: absolute; inset: 0; background: rgba(0,0,0,0.5); display: none; align-items: center; justify-content: center; z-index: 10; backdrop-filter: blur(2px); }
        .c-ask.show { display: flex; }
        .c-ask-box { background: var(--white); border: 2px solid var(--border-color); border-radius: 16px; padding: 40px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.2); max-width: 500px; }
        .c-ask-box p { font-size: 28px; margin: 0 0 32px 0; color: var(--title-dark); font-weight: 700; line-height: 1.3; }
        .c-ask-box .opts { display: flex; gap: 20px; justify-content: center; }

        .c-final-evidence { margin-top: auto; padding: 24px 32px; background: var(--white); border: 2px solid var(--border-color); border-radius: 12px; flex: none; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .c-final-evidence h3 { font-size: 26px; color: var(--title-dark); margin: 0 0 16px; font-family: 'Playfair Display', serif; }
        .c-final-evidence ul { margin: 0; padding-left: 24px; list-style-type: square; color: var(--ink); font-size: 22px; display: flex; flex-direction: column; gap: 12px; }

        .c-btn-green { padding: 20px 40px; font-size: 24px; font-weight: 700; color: #fff; background: var(--success-green); border: none; border-radius: 12px; box-shadow: 0 6px 0 #2D6334; cursor: pointer; transition: all 0.15s ease; font-family: 'Inter', sans-serif; }
        .c-btn-green:hover:not(:disabled) { transform: translateY(2px); box-shadow: 0 4px 0 #2D6334; }
        .c-btn-green:disabled { opacity: 0.5; transform: translateY(6px); box-shadow: none; cursor: not-allowed; }

        .c-closed-overlay { position: absolute; inset: 0; background: rgba(244,241,225,0.96); display: none; align-items: center; justify-content: center; flex-direction: column; gap: 32px; text-align: center; z-index: 20; }
        .c-closed-overlay.show { display: flex; }
        .c-stamp-big { font-family: 'Playfair Display', serif; font-size: 80px; color: var(--success-green); border: 8px solid var(--success-green); padding: 20px 60px; border-radius: 16px; transform: rotate(-4deg); font-weight: 700; box-shadow: inset 0 0 0 4px rgba(255,255,255,0.5); }
      `}</style>



      <div className="c-stage">
        {/* STEP 1: Two-Column Educational Layout */}
        <div className={`c-panel ${currentStep === 1 ? 'active' : ''}`}>
          <div className="clue1-layout">
            <div className="clue1-left">
              <div className="c-header-left" style={{ padding: '0', marginBottom: '24px' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path><path d="M8 7h6"></path><path d="M8 11h8"></path></svg>
                <div>
                  <h1>Case File 6.4 — The Mystery of Matter</h1>
                  <p>Follow the clues to crack what "matter" really means.</p>
                </div>
              </div>

              <h2 style={{ marginBottom: '8px' }}>What makes something "matter"?</h2>
              <p className="lead" style={{ margin: '0 0 24px 0' }}>
                <span style={{ display: 'block', marginBottom: '8px' }}>Everything around us is made of <b>matter</b>.</span>
                <span style={{ display: 'block' }}>Matter has two important properties:</span>
              </p>
              
              <div className="prop-card">
                <div className="prop-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                </div>
                <div className="prop-txt">
                  <h4>It occupies space.</h4>
                  <p>Matter takes up space. This space is called <b>volume</b>.</p>
                </div>
              </div>

              <div className="prop-card green">
                <div className="prop-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.8 3.8l16.4 16.4"></path><path d="M3.8 20.2l16.4-16.4"></path><circle cx="12" cy="12" r="10"></circle></svg>
                </div>
                <div className="prop-txt">
                  <h4>It has mass.</h4>
                  <p><b>Mass</b> tells us how much matter is present.</p>
                </div>
              </div>

              <p className="body">Water, sand, pebbles and a cup are all <b>matter</b>.<br/>Anything that <b>occupies space</b> and <b>has mass</b> is called <b>matter</b>.</p>

              <div className="question-txt">What do these objects have in common?</div>
              
              <div className="chip-opts" style={{ fontSize: '26px', fontWeight: 700, color: 'var(--subtitle-orange)', width: '100%' }}>
                They occupy space and have mass — so they are matter.
              </div>


            </div>
            
            <div className="clue1-right">
              <div className="clue1-img-wrap">
                <img src="/assets/matter_examples_clue1.jpg" alt="Examples of matter" />
              </div>
              <div style={{ display: 'flex' }}>
                <button className="c-btn-action" onClick={() => {
                  setCompleted(prev => ({ ...prev, 1: true }));
                  goStep(2);
                }} style={{ width: '100%', justifyContent: 'center', padding: '16px 32px' }}>
                  <span>Next Clue &rarr;</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 2: Investigate Air */}
        <div className={`c-panel ${currentStep === 2 ? 'active' : ''}`}>
          <h2 className="gen">Evidence Tray: Interrogate the air</h2>
          <p className="sub">Observe the two experiments and identify what they show about air.</p>
          
          <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
             {currentStep === 2 && <AirExperiments3D onComplete={handleAirComplete} />}
          </div>

          <AnimatePresence>
             {completed[2] && (
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="success-box" style={{ marginTop: '20px', justifyContent: 'center' }}>
                 <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                 Verdict: air occupies space and has mass — case closed, air is matter.
               </motion.div>
             )}
          </AnimatePresence>

          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="c-btn-action" style={{ width: 'auto', padding: '16px 48px' }} disabled={!completed[2]} onClick={() => goStep(3)}>Next Clue →</button>
          </div>
        </div>

        {/* STEP 3: Sort Evidence */}
        <div className={`c-panel ${currentStep === 3 ? 'active' : ''}`}>
          <h2 className="gen">Evidence Tray: Sort the evidence</h2>
          <p className="sub">Tap a unit, then file it as mass or volume.</p>
          
          <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <div className="c-sort-tray">
              {sortItems.map(item => (
                <div key={item.id} className={`c-sort-chip ${shakeUnit === item.id ? 'shake' : ''}`} onClick={() => setAskUnit(item)}>
                  {item.id}
                </div>
              ))}
            </div>
            <div className="c-bins">
              <div className="c-bin">
                <h3>Mass</h3>
                {massBin.map(id => <div key={id} className="item">{id}</div>)}
              </div>
              <div className="c-bin">
                <h3>Volume</h3>
                {volumeBin.map(id => <div key={id} className="item">{id}</div>)}
              </div>
            </div>
            
            {completed[3] && (
              <div className="c-final-evidence">
                <h3>FINAL EVIDENCE FILED</h3>
                <ul>
                  <li>Matter takes up space (volume) and has mass.</li>
                  <li>Solids, liquids, and gases (like air) are all matter.</li>
                  <li>We can measure mass in kg or g, and volume in L or mL.</li>
                </ul>
              </div>
            )}
          </div>

          <div className={`c-ask ${askUnit ? 'show' : ''}`}>
            <div className="c-ask-box">
              <p>Detective, is <b>{askUnit?.id}</b> mass or volume evidence?</p>
              <div className="opts">
                <button className="c-btn-action" style={{ width: 'auto', padding: '16px 32px' }} onClick={() => answerSort('mass')}>Mass</button>
                <button className="c-btn-action" style={{ width: 'auto', padding: '16px 32px' }} onClick={() => answerSort('volume')}>Volume</button>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="c-btn-green" disabled={!completed[3]} onClick={handleCloseCase}>Close the case ✓</button>
          </div>
        </div>
      </div>

      <div className={`c-closed-overlay ${caseClosed ? 'show' : ''}`}>
         <div className="c-stamp-big">CASE CLOSED</div>
         <p style={{ fontSize: '32px', color: 'var(--ink)', maxWidth: '700px', fontWeight: 600, margin: '0' }}>
           You cracked the mystery of matter — every clue filed, every test run. Nice work, detective.
         </p>
      </div>
    </div>
  );
}

Stage9a_WhatIsMatter.propTypes = {
  onComplete: PropTypes.func,
  addXp: PropTypes.func
};
