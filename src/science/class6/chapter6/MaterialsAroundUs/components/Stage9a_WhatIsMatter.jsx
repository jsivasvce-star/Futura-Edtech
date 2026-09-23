import React, { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import AirExperiments3D from './AirExperiments3D';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import mpage74Audio from '../../audio/mpage74.mp3?url';
import mpage74Json from '../../json/mpage74.json';
import mpage75Audio from '../../audio/mpage75.mp3?url';
import mpage75Json from '../../json/mpage75.json';
import fpage76Audio from '../../audio/fpage76.mp3?url';
import fpage76Json from '../../json/fpage76.json';

const Stage9a_WhatIsMatter = ({ onComplete, addXp, registerBackHandler, setExtraRightAction }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completed, setCompleted] = useState({ 1: false, 2: false, 3: false });

  const audioPageRef = React.useRef(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(-1);

  React.useEffect(() => {
    setIsPlayingAudio(false);
    setActiveWordIndex(-1);
    if (audioPageRef.current) {
      audioPageRef.current.pause();
      audioPageRef.current.currentTime = 0;
    }
  }, [currentStep]);

  const toggleAudio = React.useCallback(() => {
    if (audioPageRef.current) {
      if (isPlayingAudio) {
        audioPageRef.current.pause();
      } else {
        audioPageRef.current.play().catch(e => console.error(e));
      }
      setIsPlayingAudio(!isPlayingAudio);
    }
  }, [isPlayingAudio]);

  const handleTimeUpdate = React.useCallback(() => {
    if (audioPageRef.current) {
      const time = audioPageRef.current.currentTime;
      let activeIdx = -1;
      if (currentStep === 1) {
        activeIdx = mpage74Json.words.findIndex(w => time >= w.start && time < w.end);
      } else if (currentStep === 2) {
        activeIdx = mpage75Json.words.findIndex(w => time >= w.start && time < w.end);
      } else if (currentStep === 3) {
        activeIdx = fpage76Json.words.findIndex(w => time >= w.start && time < w.end);
      }
      if (activeIdx !== activeWordIndex) {
        setActiveWordIndex(activeIdx);
      }
    }
  }, [activeWordIndex, currentStep]);

  const W = ({ children }) => {
    let isActive = false;
    if (activeWordIndex >= 0) {
      let activeText = '';
      if (currentStep === 1 && mpage74Json.words[activeWordIndex]) {
         activeText = mpage74Json.words[activeWordIndex].text.toLowerCase().replace(/[^a-z0-9]/g, '');
      } else if (currentStep === 2 && mpage75Json.words[activeWordIndex]) {
         activeText = mpage75Json.words[activeWordIndex].text.toLowerCase().replace(/[^a-z0-9]/g, '');
      } else if (currentStep === 3 && fpage76Json.words[activeWordIndex]) {
         activeText = fpage76Json.words[activeWordIndex].text.toLowerCase().replace(/[^a-z0-9]/g, '');
      }
      
      const uiText = (typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : '').toLowerCase().replace(/[^a-z0-9]/g, '');
      
      if (activeText && uiText && (uiText === activeText || uiText.includes(activeText) || activeText.includes(uiText))) {
        isActive = true;
      }
    }

    return (
      <span
        style={{
          color: isActive ? '#FFFFFF' : 'inherit',
          background: isActive ? '#A94727' : 'transparent',
          borderRadius: '4px',
          padding: '0 2px',
          transition: 'all 0.15s ease-out'
        }}
      >
        {children}
      </span>
    );
  };

  React.useEffect(() => {
    if ((currentStep === 1 || currentStep === 2 || currentStep === 3) && typeof setExtraRightAction === 'function') {
      setExtraRightAction(
        <button
          onClick={toggleAudio}
          className="outline"
          style={{
            padding: '0.85rem 1.6rem',
            fontSize: '1.6rem',
            fontWeight: 'bold',
            gap: '0.75rem',
            borderRadius: '10px',
            color: '#3E2723',
            borderColor: '#3E2723',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            background: 'white'
          }}
        >
          {isPlayingAudio ? <Pause size={24} /> : <Play size={24} />}
          {isPlayingAudio ? "Pause Audio" : "Play Audio"}
        </button>
      );
    } else {
      if (typeof setExtraRightAction === 'function') {
        setExtraRightAction(null);
      }
      if (audioPageRef.current && isPlayingAudio) {
        audioPageRef.current.pause();
        setIsPlayingAudio(false);
      }
    }
  }, [currentStep, setExtraRightAction, isPlayingAudio, toggleAudio]);

  const goStep = (n) => {
    setCurrentStep(n);
  };

  React.useEffect(() => {
    if (registerBackHandler) {
      registerBackHandler(() => {
        if (currentStep > 1) {
          setCurrentStep(currentStep - 1);
          return true;
        }
        return false;
      });
    }
  }, [currentStep, registerBackHandler]);

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
        setShowFinalEvidence(true);
      }
    } else {
      setAskUnit(null);
      setShakeUnit(askUnit.id);
      setTimeout(() => setShakeUnit(null), 400);
    }
  };

  // Final Evidence & Close Case
  const [caseClosed, setCaseClosed] = useState(false);
  const [showFinalEvidence, setShowFinalEvidence] = useState(false);
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
    <div className="case-wrap" style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', height: '100%', overflow: 'hidden', borderRadius: '16px', border: '2px solid var(--border-color)', background: 'var(--bg-cream)' }}>
      {(currentStep === 1 || currentStep === 2 || currentStep === 3) && (
        <audio
          ref={audioPageRef}
          src={currentStep === 1 ? mpage74Audio : currentStep === 2 ? mpage75Audio : fpage76Audio}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => {
            setIsPlayingAudio(false);
            setActiveWordIndex(-1);
          }}
        />
      )}
      <style>{`
        .case-wrap {
          --bg-cream: #FDFBF7;
          --border-color: #D9C9A3;
          --title-dark: #3B2A1F;
          --subtitle-orange: #A64B27;
          --card-bg: #FDFBF7;
          --ink: #3B2A1F;
          --ink-light: #7A6A52;
          --white: #FDFBF7;
          --success-green: #4B7A2A;

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

        @keyframes btnPulse {
          0% { transform: scale(1); box-shadow: 0 4px 12px rgba(166, 75, 39, 0.2); }
          50% { transform: scale(1.02); box-shadow: 0 8px 24px rgba(166, 75, 39, 0.5); }
          100% { transform: scale(1); box-shadow: 0 4px 12px rgba(166, 75, 39, 0.2); }
        }
        @keyframes shineSweep {
          0% { left: -100%; }
          20% { left: 200%; }
          100% { left: 200%; }
        }

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
          background: #7A6A52;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 700;
          color: #FFFFFF;
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
          padding: 16px 40px 16px 40px;
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
          gap: 40px;
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
          margin-bottom: 16px;
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
          padding: 10px 16px;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 16px;
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
          margin: 8px 0 4px 0;
        }

        .chip-opts {
          display: flex;
          gap: 16px;
          margin: 0;
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

        .c-btn-green { padding: 20px 40px; font-size: 24px; font-weight: 700; color: #fff; background: var(--success-green); border: none; border-radius: 12px; box-shadow: 0 6px 0 #395E20; cursor: pointer; transition: all 0.15s ease; font-family: 'Inter', sans-serif; }
        .c-btn-green:hover:not(:disabled) { transform: translateY(2px); box-shadow: 0 4px 0 #395E20; }
        .c-btn-green:disabled { opacity: 0.5; transform: translateY(6px); box-shadow: none; cursor: not-allowed; }

        .c-closed-overlay { position: absolute; inset: 0; background: rgba(253,251,247,0.96); display: none; align-items: center; justify-content: center; flex-direction: column; gap: 32px; text-align: center; z-index: 20; }
        .c-closed-overlay.show { display: flex; }
        .c-stamp-big { font-family: 'Playfair Display', serif; font-size: 80px; color: var(--success-green); border: 8px solid var(--success-green); padding: 20px 60px; border-radius: 16px; transform: rotate(-4deg); font-weight: 700; box-shadow: inset 0 0 0 4px rgba(255,255,255,0.5); }
      `}</style>



      <div className="c-stage">
        {/* STEP 1: Two-Column Educational Layout */}
        <div className={`c-panel ${currentStep === 1 ? 'active' : ''}`}>
          <div className="clue1-layout">
            <div className="clue1-left">
              <h2 style={{ margin: '0 0 12px 0' }}><W i={0}>What</W> <W i={1}>makes</W> <W i={2}>something</W> <W i={3}>"matter"?</W></h2>
              <p className="lead" style={{ margin: '0 0 16px 0' }}>
                <span style={{ display: 'block', marginBottom: '8px' }}><W i={4}>Everything</W> <W i={5}>around</W> <W i={6}>us</W> <W i={7}>is</W> <W i={8}>made</W> <W i={9}>of</W> <b><W i={10}>matter</W></b>.</span>
                <span style={{ display: 'block' }}><W i={11}>Matter</W> <W i={12}>has</W> <W i={13}>two</W> <W i={14}>important</W> <W i={15}>properties:</W></span>
              </p>
              
              <div className="prop-card">
                <div className="prop-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                </div>
                <div className="prop-txt">
                  <h4><W i={16}>It</W> <W i={17}>occupies</W> <W i={18}>space.</W></h4>
                  <p><W i={19}>Matter</W> <W i={20}>takes</W> <W i={21}>up</W> <W i={22}>space.</W> <W i={23}>This</W> <W i={24}>space</W> <W i={25}>is</W> <W i={26}>called</W> <b><W i={27}>volume</W></b>.</p>
                </div>
              </div>

              <div className="prop-card green">
                <div className="prop-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.8 3.8l16.4 16.4"></path><path d="M3.8 20.2l16.4-16.4"></path><circle cx="12" cy="12" r="10"></circle></svg>
                </div>
                <div className="prop-txt">
                  <h4><W i={28}>It</W> <W i={29}>has</W> <W i={30}>mass.</W></h4>
                  <p><b><W i={31}>Mass</W></b> <W i={32}>tells</W> <W i={33}>us</W> <W i={34}>how</W> <W i={35}>much</W> <W i={36}>matter</W> <W i={37}>is</W> <W i={38}>present.</W></p>
                </div>
              </div>

              <p className="body"><W i={39}>Water,</W> <W i={40}>sand,</W> <W i={41}>pebbles</W> <W i={42}>and</W> <W i={43}>a</W> <W i={44}>cup</W> <W i={45}>are</W> <W i={46}>all</W> <b><W i={47}>matter</W></b>.<br/><W i={48}>Anything</W> <W i={49}>that</W> <b><W i={50}>occupies</W> <W i={51}>space</W></b> <W i={52}>and</W> <b><W i={53}>has</W> <W i={54}>mass</W></b> <W i={55}>is</W> <W i={56}>called</W> <b><W i={57}>matter</W></b>.</p>

              <div className="question-txt"><W i={58}>What</W> <W i={59}>do</W> <W i={60}>these</W> <W i={61}>objects</W> <W i={62}>have</W> <W i={63}>in</W> <W i={64}>common?</W></div>
              
              <div className="chip-opts" style={{ fontSize: '26px', fontWeight: 700, color: 'var(--subtitle-orange)', width: '100%' }}>
                <W i={65}>They</W> <W i={66}>occupy</W> <W i={67}>space</W> <W i={68}>and</W> <W i={69}>have</W> <W i={70}>mass</W> <W i={71}>—</W> <W i={72}>so</W> <W i={73}>they</W> <W i={74}>are</W> <W i={75}>matter.</W>
              </div>


            </div>
            
            <div className="clue1-right">
              <div className="clue1-img-wrap">
                <img src="/assets/matter_examples_clue1.jpg" alt="Examples of matter" />
              </div>
              <div style={{ display: 'flex' }}>
                <button 
                  onClick={() => {
                    setCompleted(prev => ({ ...prev, 1: true }));
                    goStep(2);
                  }}
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    background: '#B04924',
                    border: 'none',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '16px',
                    width: '100%',
                    fontSize: '28px',
                    fontFamily: '"Merriweather", "Georgia", serif',
                    fontWeight: '900',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '12px',
                    animation: 'btnPulse 2s infinite',
                    boxShadow: '0 4px 12px rgba(166, 75, 39, 0.3)'
                  }}
                >
                  <div style={{
                     position: 'absolute', top: 0, bottom: 0, width: '40px',
                     background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                     transform: 'skewX(-20deg)',
                     animation: 'shineSweep 3s infinite'
                  }} />
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', top: '10px', left: '16px', opacity: 0.9 }}><path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/></svg>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', bottom: '10px', right: '16px', opacity: 0.9 }}><path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/></svg>
                  Next Clue →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 2: Investigate Air */}
        <div className={`c-panel ${currentStep === 2 ? 'active' : ''}`}>
          <h2 className="gen"><W i={0}>Evidence</W> <W i={1}>Tray:</W> <W i={2}>Interrogate</W> <W i={3}>the</W> <W i={4}>air</W></h2>
          <p className="sub"><W i={5}>Observe</W> <W i={6}>the</W> <W i={7}>two</W> <W i={8}>experiments</W> <W i={9}>and</W> <W i={10}>identify</W> <W i={11}>what</W> <W i={12}>they</W> <W i={13}>show</W> <W i={14}>about</W> <W i={15}>air.</W></p>
          
          <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
             {currentStep === 2 && <AirExperiments3D onComplete={handleAirComplete} W={W} />}
          </div>

          <AnimatePresence>
             {completed[2] && (
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="success-box" style={{ marginTop: '20px', justifyContent: 'center' }}>
                 <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                 Verdict: air occupies space and has mass — case closed, air is matter.
               </motion.div>
             )}
          </AnimatePresence>

          <div style={{ marginTop: '24px', display: 'flex' }}>
            <button 
              onClick={() => goStep(3)}
              style={{
                position: 'relative',
                overflow: 'hidden',
                background: '#B04924',
                border: 'none',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '16px',
                width: '100%',
                fontSize: '28px',
                fontFamily: '"Merriweather", "Georgia", serif',
                fontWeight: '900',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '12px',
                animation: 'btnPulse 2s infinite',
                boxShadow: '0 4px 12px rgba(166, 75, 39, 0.3)'
              }}
            >
              <div style={{
                 position: 'absolute', top: 0, bottom: 0, width: '40px',
                 background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                 transform: 'skewX(-20deg)',
                 animation: 'shineSweep 3s infinite'
              }} />
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', top: '10px', left: '16px', opacity: 0.9 }}><path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/></svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', bottom: '10px', right: '16px', opacity: 0.9 }}><path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/></svg>
              Next Clue →
            </button>
          </div>
        </div>

        {/* STEP 3: Sort Evidence */}
        <div className={`c-panel ${currentStep === 3 ? 'active' : ''}`}>
          <h2 className="gen"><W>Evidence</W> <W>Tray:</W> <W>Sort</W> <W>the</W> <W>evidence</W></h2>
          <p className="sub"><strong style={{ color: 'var(--lesson-primary)', fontSize: '1.1em', fontWeight: '900' }}><W>CLICK</W> 👆</strong> <W>a</W> <W>unit</W> <W>to</W> <W>sort</W> <W>it</W> <W>as</W> <W>MASS</W> <W>or</W> <W>VOLUME.</W></p>
          
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
        </div>
      </div>

      <AnimatePresence>
        {showFinalEvidence && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(4px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="c-final-evidence"
              style={{
                 margin: 0,
                 width: '100%',
                 maxWidth: '680px',
                 maxHeight: '90vh',
                 overflowY: 'auto',
                 boxShadow: '0 12px 48px rgba(0,0,0,0.4)',
                 border: '2px solid var(--border-color)',
                 position: 'relative'
              }}
            >
              <h3 style={{ 
                borderBottom: '2px solid var(--border-color)', 
                paddingBottom: '16px',
                margin: '0 0 20px',
                fontSize: '36px',
                fontFamily: '"Playfair Display", "Merriweather", serif',
                fontWeight: 900,
                color: 'var(--title-dark)'
              }}>FINAL EVIDENCE FILED</h3>
              <ul style={{ 
                margin: 0, 
                paddingLeft: '32px', 
                listStyleType: 'square', 
                color: 'var(--ink)', 
                fontSize: '28px', 
                fontWeight: 600,
                fontFamily: '"Merriweather", "Georgia", serif',
                lineHeight: '1.4',
                display: 'flex', 
                flexDirection: 'column', 
                gap: '12px' 
              }}>
                <li>Matter takes up space (volume) and has mass.</li>
                <li>Solids, liquids, and gases (like air) are all matter.</li>
                <li>We can measure mass in kg or g, and volume in L or mL.</li>
              </ul>
              <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'center' }}>
                <button 
                  onClick={() => {
                    setShowFinalEvidence(false);
                    handleCloseCase();
                  }}
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    background: '#B04924',
                    border: 'none',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '16px',
                    width: '100%',
                    fontSize: '28px',
                    fontFamily: '"Merriweather", "Georgia", serif',
                    fontWeight: '900',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '12px',
                    animation: 'btnPulse 2s infinite',
                    boxShadow: '0 4px 12px rgba(166, 75, 39, 0.3)'
                  }}
                >
                  <div style={{
                     position: 'absolute', top: 0, bottom: 0, width: '40px',
                     background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                     transform: 'skewX(-20deg)',
                     animation: 'shineSweep 3s infinite'
                  }} />
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', top: '10px', left: '16px', opacity: 0.9 }}><path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/></svg>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', bottom: '10px', right: '16px', opacity: 0.9 }}><path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/></svg>
                  Done ✓
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`c-closed-overlay ${caseClosed ? 'show' : ''}`}>
         <div className="c-stamp-big">CASE CLOSED</div>
         <p style={{ fontSize: '32px', color: 'var(--ink)', maxWidth: '700px', fontWeight: 600, margin: '0' }}>
           You cracked the mystery of matter — every clue filed, every test run. Nice work, detective.
         </p>
      </div>
    </div>
  );
};

export default Stage9a_WhatIsMatter;

Stage9a_WhatIsMatter.propTypes = {
  onComplete: PropTypes.func,
  addXp: PropTypes.func
};
