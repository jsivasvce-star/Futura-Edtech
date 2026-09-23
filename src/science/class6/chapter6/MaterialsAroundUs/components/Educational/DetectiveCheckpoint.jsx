import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ShieldAlert, Check, X, ArrowRight, ArrowLeft, CheckCircle2, ClipboardList, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import newChiefDetectiveImage from '../../../../../../assets/4.detective.png';
import checkpointBg from '../../../../../../assets/detective_checkpoint_bg.png';
import barrier2Bg from '../../../../../../assets/barrier2_checkpoint_bg.jpg';
import stage6_3_1Bg from '../../../../../../assets/stage6_3_1_checkpoint_bg.png';
import stage6_3_2Bg from '../../../../../../assets/stage6_3_2_checkpoint_bg.png';
import stage6_3_3Bg from '../../../../../../assets/stage6_3_3_checkpoint_bg.png';
import stage6_3_4Bg from '../../../../../../assets/stage6_3_4_checkpoint_bg.png';
import stage6_3_5Bg from '../../../../../../assets/stage6_3_5_checkpoint_bg.png';
import stage6_3_6Bg from '../../../../../../assets/stage6_3_6_checkpoint_bg.png';
import barrier4Bg from '../../../../../../assets/barrier4_checkpoint_bg.png';
import { Play, Pause } from 'lucide-react';
import React from 'react';
import mpage18Audio from '../../../audio/mpage18.mp3?url';
import mpage18Json from '../../../json/mpage18.json';
import mpage19Audio from '../../../audio/mpage19.mp3?url';
import mpage19Json from '../../../json/mpage19.json';
import mpage20Audio from '../../../audio/mpage20.mp3?url';
import mpage20Json from '../../../json/mpage20.json';
import mpage29Audio from '../../../audio/mpage29.mp3?url';
import mpage29Json from '../../../json/mpage29.json';
import mpage30Audio from '../../../audio/mpage30.mp3?url';
import mpage30Json from '../../../json/mpage30.json';
import mpage31Audio from '../../../audio/mpage31.mp3?url';
import mpage31Json from '../../../json/mpage31.json';
import mpage35Audio from '../../../audio/mpage35.mp3?url';
import mpage35Json from '../../../json/mpage35.json';
import mpage36Audio from '../../../audio/mpage36.mp3?url';
import mpage36Json from '../../../json/mpage36.json';
import mpage37Audio from '../../../audio/mpage37.mp3?url';
import mpage37Json from '../../../json/mpage37.json';
import mpage38Audio from '../../../audio/mpage38.mp3?url';
import mpage38Json from '../../../json/mpage38.json';
import mpage42Audio from '../../../audio/mpage42.mp3?url';
import mpage42Json from '../../../json/mpage42.json';
import mpage43Audio from '../../../audio/mpage43.mp3?url';
import mpage43Json from '../../../json/mpage43.json';
import mpage44Audio from '../../../audio/mpage44.mp3?url';
import mpage44Json from '../../../json/mpage44.json';
import mpage49Audio from '../../../audio/mpage49.mp3?url';
import mpage49Json from '../../../json/mpage49.json';
import mpage50Audio from '../../../audio/mpage50.mp3?url';
import mpage50Json from '../../../json/mpage50.json';
import mpage51Audio from '../../../audio/mpage51.mp3?url';
import mpage51Json from '../../../json/mpage51.json';
import mpage56Audio from '../../../audio/mpage56.mp3?url';
import mpage56Json from '../../../json/mpage56.json';
import mpage57Audio from '../../../audio/mpage57.mp3?url';
import mpage57Json from '../../../json/mpage57.json';
import mpage58Audio from '../../../audio/mpage58.mp3?url';
import mpage58Json from '../../../json/mpage58.json';
import mpage62Audio from '../../../audio/mpage62.mp3?url';
import mpage62Json from '../../../json/mpage62.json';
import mpage63Audio from '../../../audio/mpage63.mp3?url';
import mpage63Json from '../../../json/mpage63.json';
import mpage64Json from '../../../json/mpage64.json';
import mpage65Audio from '../../../audio/mpage65.mp3?url';
import mpage65Json from '../../../json/mpage65.json';
import mpage71Audio from '../../../audio/mpage71.mp3?url';
import mpage71Json from '../../../json/mpage71.json';
import mpage72Audio from '../../../audio/mpage72.mp3?url';
import mpage72Json from '../../../json/mpage72.json';
import mpage73Audio from '../../../audio/mpage73.mp3?url';
import mpage73Json from '../../../json/mpage73.json';
import mpage77Audio from '../../../audio/mpage77.mp3?url';
import mpage77Json from '../../../json/mpage77.json';
import mpage78Audio from '../../../audio/mpage78.mp3?url';
import mpage78Json from '../../../json/mpage78.json';
import mpage79Audio from '../../../audio/mpage79.mp3?url';
import mpage79Json from '../../../json/mpage79.json';
import mpage80Audio from '../../../audio/mpage80.mp3?url';
import mpage80Json from '../../../json/mpage80.json';

export default function DetectiveCheckpoint({ data, onComplete, addXp, onProceed, onBack }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  // const [score, setScore] = useState(0);
  // const [unlockedDiscoveries, setUnlockedDiscoveries] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [showCaseLog, setShowCaseLog] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const audioRef = React.useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [activeWordIndex, setActiveWordIndex] = React.useState(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error(e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    let currentJson;
    if (currentPage === 1) {
      if (data.title?.includes("Barrier 1")) {
        currentJson = mpage18Json;
      } else if (data.title?.includes("Barrier 2")) {
        currentJson = mpage29Json;
      } else if (data.title?.includes("6.3.1")) {
        currentJson = mpage35Json;
      } else if (data.title?.includes("6.3.2")) {
        currentJson = mpage42Json;
      } else if (data.title?.includes("6.3.3")) {
        currentJson = mpage49Json;
      } else if (data.title?.includes("6.3.5")) {
        currentJson = mpage62Json;
      } else if (data.title?.includes("6.3.6")) {
        currentJson = mpage71Json;
      } else if (data.title?.includes("Barrier 3")) {
        currentJson = mpage65Json;
      } else if (data.title?.includes("Barrier 4")) {
        currentJson = mpage77Json;
      }
    } else {
      if (data.title?.includes("Barrier 2") && currentQ === 0) {
        currentJson = mpage30Json;
      } else if (data.title?.includes("Barrier 2") && currentQ === 1) {
        currentJson = mpage31Json;
      } else if (data.title?.includes("6.3.1") && currentQ === 0) {
        currentJson = mpage37Json;
      } else if (data.title?.includes("6.3.1") && currentQ === 1) {
        currentJson = mpage38Json;
      } else if (data.title?.includes("6.3.2") && currentQ === 0) {
        currentJson = mpage43Json;
      } else if (data.title?.includes("6.3.2") && currentQ === 1) {
        currentJson = mpage44Json;
      } else if (data.title?.includes("6.3.3") && currentQ === 0) {
        currentJson = mpage50Json;
      } else if (data.title?.includes("6.3.3") && currentQ === 1) {
        currentJson = mpage51Json;
      } else if (data.title?.includes("6.3.4") && currentQ === 1) {
        currentJson = mpage58Json;
      } else if (data.title?.includes("6.3.5") && currentQ === 0) {
        currentJson = mpage63Json;
      } else if (data.title?.includes("6.3.5") && currentQ === 1) {
        currentJson = mpage64Json;
      } else if (data.title?.includes("6.3.6") && currentQ === 0) {
        currentJson = mpage72Json;
      } else if (data.title?.includes("6.3.6") && currentQ === 1) {
        currentJson = mpage73Json;
      } else if (data.title?.includes("Barrier 4") && currentQ === 0) {
        currentJson = mpage78Json;
      } else if (data.title?.includes("Barrier 4") && currentQ === 1) {
        currentJson = mpage79Json;
      } else if (data.title?.includes("Barrier 4") && currentQ === 2) {
        currentJson = mpage80Json;
      } else {
        currentJson = currentQ === 0 ? mpage19Json : mpage20Json;
      }
    }

    if (audioRef.current && typeof currentJson !== 'undefined') {
      const time = audioRef.current.currentTime;
      const activeIdx = currentJson.words.findIndex(w => time >= w.start && time < w.end);
      if (activeIdx !== activeWordIndex) {
        setActiveWordIndex(activeIdx);
      }
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setActiveWordIndex(null);
  };

  const W = ({ i, children }) => {
    const indices = Array.isArray(i) ? i : [i];
    const isActive = indices.includes(activeWordIndex);
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

  const BLAKE_IMG_URL = '/images/chief_detective_blake.png';


  const q = data.questions[currentQ];
  // const maxScore = data.questions.length * 10;

  // Calculate how many discoveries to unlock per question
  const unlockPerQuestion = Math.ceil(data.discoveries.length / data.questions.length);

  const handleSelect = (idx) => {
    if (isVerified) return; // Prevent multiple clicks or changing answer
    setSelected(idx);
    setIsVerified(true);

    if (idx === q.correct) {
      setIsCorrect(true);
      
      if (addXp) addXp(20);

      // Auto advance on correct answer
      setTimeout(() => {
        handleNext();
      }, 1000);
    } else {
      setIsCorrect(false);
      
      
      // Auto advance on wrong answer after a readable delay
      setTimeout(() => {
        handleNext();
      }, 5500);
    }
  };

  const handleNext = () => {
    if (currentQ < data.questions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelected(null);
      setIsVerified(false);
      setIsCorrect(null);
      setShowHint(false);
    } else {
      // Quiz complete
      console.log('[Detective Checkpoint] Question 2 completed');
      setQuizComplete(true);
      setShowCaseLog(true);
      setUnlockedDiscoveries(data.discoveries.length); // Ensure all are unlocked at the end
      if (addXp) addXp(50); // Completion bonus
    }
  };

  useEffect(() => {
    if (quizComplete && showCaseLog) {
      console.log('[Detective Checkpoint] Case Log opened');
      console.log('[Detective Checkpoint] Calling completion callback');
      if (onComplete) {
        onComplete();
      }
    }
  }, [quizComplete, showCaseLog, onComplete]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: '#FFFFFF',
      fontFamily: "'Merriweather', Georgia, serif",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '16px',
      zIndex: 9999,
      overflow: 'hidden'
    }}>
      <style>{`
        .book-frame {
          width: 100%;
          height: 100%;
          background: var(--lesson-surface);
          border: 8px solid var(--lesson-primary);
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.18);
          position: relative;
        }
        .spread {
          display: flex;
          width: 100%;
          height: 100%;
          border-radius: 8px;
          overflow: hidden;
        }
        .left-page-checkpoint {
          background: #f6f1e4;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: stretch;
          height: 100%;
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 24px 24px 72px;
        }
        .left-hero-wrapper-chk {
          width: 100%;
          flex: 1 1 auto;
          min-height: 0;
          display: flex;
          margin-bottom: 12px;
          overflow: hidden;
          border-radius: 8px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.12);
        }
        .hero-img-chk {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }
        .mission-header {
          font-family: 'Merriweather', Georgia, serif;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 1.8px;
          color: var(--lesson-primary);
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .mission-title {
          font-size: 24px;
          line-height: 1.15;
          color: var(--lesson-primary);
          font-weight: 700;
          margin: 0 0 16px 0;
          font-family: 'Merriweather', Georgia, serif;
          word-break: keep-all;
        }
        .speech-bubble-chk {
          position: relative;
          margin-top: 4px;
          width: 100%;
          background: white;
          padding: 1.5rem 1.8rem;
          min-height: 100px;
          display: flex;
          align-items: center;
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
          z-index: 20;
          border: 2px solid var(--lesson-border);
          flex: 0 0 auto;
        }
        .speech-bubble-chk::after {
          content: '';
          position: absolute;
          top: -14px;
          left: 32px;
          border-width: 0 14px 14px;
          border-style: solid;
          border-color: transparent transparent white;
          display: block;
          width: 0;
          z-index: 1;
        }
        .speech-bubble-chk::before {
          content: '';
          position: absolute;
          top: -17px;
          left: 30px;
          border-width: 0 16px 16px;
          border-style: solid;
          border-color: transparent transparent var(--lesson-border);
          display: block;
          width: 0;
        }
        .speech-speaker-chk {
          position: absolute;
          top: -22px;
          right: 20px;
          background: var(--lesson-muted, #A64B27);
          color: white;
          padding: 5px 18px;
          border-radius: 8px;
          font-family: 'Merriweather', Georgia, serif;
          font-size: 30px;
          font-weight: bold;
          letter-spacing: 1px;
          box-shadow: 0 3px 6px rgba(0,0,0,0.1);
        }
        @keyframes primary-pulse-chk {
          0% { box-shadow: 0 4px 15px rgba(217, 119, 6, 0.6), 0 0 0 0 rgba(245, 158, 11, 0.5); }
          50% { box-shadow: 0 6px 22px rgba(245, 158, 11, 0.8), 0 0 0 10px rgba(245, 158, 11, 0); }
          100% { box-shadow: 0 4px 15px rgba(217, 119, 6, 0.6), 0 0 0 0 rgba(245, 158, 11, 0); }
        }
        .start-btn {
          position: absolute;
          bottom: 18px;
          right: 28px;
          z-index: 100;
          background: var(--lesson-primary);
          color: white;
          border: 2px solid #FDE68A;
          padding: 16px 42px; /* Adjusted to compensate for 2px border */
          border-radius: 42px;
          font-family: 'Merriweather', Georgia, serif;
          font-size: 24.2px;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          box-shadow: 0 4px 15px rgba(217, 119, 6, 0.6);
          animation: primary-pulse-chk 2s infinite;
          transition: all 0.2s;
        }
        .start-btn:hover {
          transform: translateY(-2px);
          border-color: #FEF3C7;
        }
        .spread-back-btn {
          position: absolute;
          bottom: 18px;
          left: 24px;
          z-index: 100;
          background: var(--lesson-surface);
          border: 2px solid rgba(217, 119, 6, 0.5);
          color: var(--lesson-text);
          padding: 12px 26px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Merriweather', Georgia, serif;
          font-size: 20.9px;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(217, 119, 6, 0.2);
          transition: all 0.2s;
        }
        .spread-back-btn:hover {
          transform: translateY(-1px);
          border: 2px solid rgba(217, 119, 6, 0.8);
          box-shadow: 0 6px 16px rgba(217, 119, 6, 0.35);
        }
      `}</style>
      
      <audio 
        ref={audioRef} 
        src={currentPage === 1 ? (data.title?.includes("Barrier 2") ? mpage29Audio : data.title?.includes("6.3.1") ? mpage35Audio : data.title?.includes("6.3.2") ? mpage42Audio : data.title?.includes("6.3.3") ? mpage49Audio : data.title?.includes("6.3.4") ? mpage56Audio : data.title?.includes("6.3.5") ? mpage62Audio : data.title?.includes("6.3.6") ? mpage71Audio : data.title?.includes("Barrier 3") ? mpage65Audio : data.title?.includes("Barrier 4") ? mpage77Audio : mpage18Audio) : (data.title?.includes("Barrier 2") && currentQ === 0 ? mpage30Audio : data.title?.includes("Barrier 2") && currentQ === 1 ? mpage31Audio : data.title?.includes("6.3.1") && currentQ === 0 ? mpage37Audio : data.title?.includes("6.3.1") && currentQ === 1 ? mpage38Audio : data.title?.includes("6.3.2") && currentQ === 0 ? mpage43Audio : data.title?.includes("6.3.2") && currentQ === 1 ? mpage44Audio : data.title?.includes("6.3.3") && currentQ === 0 ? mpage50Audio : data.title?.includes("6.3.3") && currentQ === 1 ? mpage51Audio : data.title?.includes("6.3.4") && currentQ === 0 ? mpage57Audio : data.title?.includes("6.3.4") && currentQ === 1 ? mpage58Audio : data.title?.includes("6.3.5") && currentQ === 0 ? mpage63Audio : data.title?.includes("6.3.5") && currentQ === 1 ? mpage64Audio : data.title?.includes("6.3.6") && currentQ === 0 ? mpage72Audio : data.title?.includes("6.3.6") && currentQ === 1 ? mpage73Audio : data.title?.includes("Barrier 4") && currentQ === 0 ? mpage78Audio : data.title?.includes("Barrier 4") && currentQ === 1 ? mpage79Audio : data.title?.includes("Barrier 4") && currentQ === 2 ? mpage80Audio : (currentQ === 0 ? mpage19Audio : mpage20Audio))} 
        onTimeUpdate={handleTimeUpdate} 
        onEnded={handleAudioEnded} 
      />

      <motion.div 
        className="book-frame"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="spread">
      {/* Page 1: Briefing */}
      {currentPage === 1 && (
        <div className="left-page-checkpoint">
          <div style={{ flexShrink: 0, marginBottom: '8px' }}>
            <h1 className="mission-title" style={{ fontSize: '42px', marginTop: 0, marginBottom: '8px' }}>
              {data.title || "Detective Checkpoint"}
            </h1>
            <p style={{ margin: 0, fontSize: '28px', fontWeight: '500', color: 'var(--lesson-muted)', fontFamily: "'Merriweather', Georgia, serif" }}>
              Verify your understanding to record our findings.
            </p>
          </div>

          <div className="left-hero-wrapper-chk">
            <img 
              src={newChiefDetectiveImage} 
              alt="Chief Detective" 
              className="hero-img-chk"
            />
          </div>

          <motion.div 
            className="speech-bubble-chk"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="speech-speaker-chk">CHIEF BLAKE</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ margin: 0, fontSize: '28px', color: 'var(--lesson-text)', lineHeight: '1.45', fontWeight: '600', fontFamily: "'Merriweather', Georgia, serif" }}>
                {data.title?.includes("Barrier 1") ? (
                  <>
                    <W i={0}>Excellent</W> <W i={1}>work,</W> Detective. <W i={2}>You</W> <W i={3}>have</W> <W i={4}>successfully</W> <W i={5}>completed</W> <W i={6}>today's</W> <W i={7}>investigation.</W> <W i={8}>Let's</W> <W i={9}>record</W> <W i={10}>our</W> <W i={11}>findings</W> <W i={12}>in</W> <W i={13}>your</W> permanent <W i={14}>Investigation</W> <W i={15}>Handbook.</W>
                  </>
                ) : data.title?.includes("Barrier 2") ? (
                  <>
                    <W i={0}>Brilliant</W> deduction, <W i={1}>Detective.</W> <W i={2}>You</W> <W i={3}>successfully</W> <W i={4}>grouped</W> <W i={6}>materials</W> <W i={7}>and</W> <W i={8}>discovered</W> <W i={9}>how</W> <W i={10}>their</W> <W i={11}>properties</W> <W i={12}>match</W> <W i={13}>their</W> <W i={14}>purpose.</W> <W i={15}>Let's</W> <W i={16}>log</W> <W i={17}>this</W> <W i={18}>in</W> <W i={19}>your</W> <W i={20}>handbook.</W>
                  </>
                ) : data.title?.includes("6.3.1") ? (
                  <>
                    <W i={0}>Fantastic</W> <W i={1}>work</W> <W i={2}>Detective!</W> <W i={3}>You</W> <W i={4}>proved</W> <W i={5}>that</W> <W i={6}>observing</W> <W i={7}>and</W> <W i={8}>testing</W> <W i={9}>for</W> <W i={10}>lustre</W> <W i={11}>helps</W> <W i={12}>us</W> <W i={13}>identify</W> <W i={14}>materials</W> <W i={15}>correctly.</W>
                  </>
                ) : data.title?.includes("6.3.2") ? (
                  <>
                    <W i={0}>Excellent!</W> <W i={1}>You</W> <W i={2}>verified</W> <W i={3}>that</W> <W i={4}>hardness</W> <W i={5}>is</W> <W i={6}>determined</W> <W i={7}>by</W> <W i={8}>how</W> <W i={9}>easily</W> <W i={10}>a</W> <W i={11}>material</W> <W i={12}>can</W> <W i={13}>be</W> <W i={14}>compressed</W> <W i={15}>or</W> <W i={16}>scratched.</W> <W i={17}>This</W> <W i={18}>is</W> <W i={19}>vital</W> <W i={20}>evidence.</W>
                  </>
                ) : data.title?.includes("6.3.3") ? (
                  <>
                    <W i={0}>Great</W> <W i={1}>detective</W> <W i={2}>work!</W> <W i={3}>You</W> <W i={4}>have</W> <W i={5}>successfully</W> <W i={6}>mastered</W> <W i={7}>how</W> <W i={8}>visibility</W> <W i={9}>works</W> <W i={10}>through</W> <W i={11}>different</W> <W i={12}>materials.</W>
                  </>
                ) : data.title?.includes("6.3.4") ? (
                  <>
                    <W i={0}>Fantastic</W> <W i={1}>work!</W> <W i={2}>You</W> <W i={3}>have</W> <W i={4}>successfully</W> <W i={5}>identified</W> <W i={6}>which</W> <W i={7}>materials</W> <W i={8}>dissolve</W> <W i={9}>in</W> <W i={10}>water</W> <W i={11}>and</W> <W i={12}>which</W> <W i={13}>do</W> <W i={14}>not.</W>
                  </>
                ) : data.title?.includes("6.3.5") ? (
                  <>
                    <W i={0}>Incredible</W> <W i={1}>work,</W> <W i={2}>Detective.</W> <W i={3}>You</W> <W i={4}>have</W> <W i={5}>proven</W> <W i={6}>that</W> <W i={7}>we</W> <W i={8}>can</W> <W i={9}>measure</W> <W i={10}>how</W> <W i={11}>heavy</W> <W i={12}>objects</W> <W i={13}>are.</W>
                  </>
                ) : data.title?.includes("6.3.6") ? (
                  <>
                    <W i={0}>Excellent!</W> <W i={1}>You</W> <W i={2}>have</W> <W i={3}>uncovered</W> <W i={4}>the</W> <W i={5}>final</W> <W i={6}>fundamental</W> <W i={7}>property</W> <W i={8}>of</W> <W i={9}>all</W> <W i={10}>materials.</W>
                  </>
                ) : data.title?.includes("Barrier 3") ? (
                  <>
                    <W i={0}>There</W> <W i={1}>is</W> <W i={2}>one</W> <W i={3}>final</W> <W i={4}>puzzle</W> <W i={5}>for</W> <W i={6}>Barrier</W> <W i={7}>3.</W> <W i={8}>Besides</W> <W i={9}>mass,</W> <W i={10}>what</W> <W i={11}>else</W> <W i={12}>do</W> <W i={13}>all</W> <W i={14}>materials</W> <W i={15}>share?</W> <W i={16}>Investigate</W> <W i={17}>the</W> <W i={18}>concept</W> <W i={19}>of</W> <W i={20}>volume.</W>
                  </>
                ) : data.title?.includes("Barrier 4") ? (
                  <>
                    <W i={0}>Brilliant</W> <W i={1}>work!</W> <W i={2}>We</W> <W i={3}>have</W> <W i={4}>explored</W> <W i={5}>and</W> <W i={6}>understood</W> <W i={7}>the</W> <W i={8}>various</W> <W i={9}>properties</W> <W i={10}>of</W> <W i={11}>materials</W> <W i={12}>in</W> <W i={13}>the</W> <W i={14}>modern</W> <W i={15}>world.</W> <W i={16}>But</W> <W i={17}>I</W> <W i={18}>am</W> <W i={19}>curious...</W> <W i={20}>how</W> <W i={21}>did</W> <W i={22}>people</W> <W i={23}>classify</W> <W i={24}>them</W> <W i={25}>in</W> <W i={26}>ancient</W> <W i={27}>times?</W>
                  </>
                ) : (
                  data.dialogue || "Well done, detective! You've explored the Barrier. Now let's verify your understanding and log our discoveries."
                )}
              </p>
              <p style={{ margin: 0, fontSize: '28px', color: 'var(--lesson-secondary)', lineHeight: '1.45', fontWeight: '600', fontFamily: "'Merriweather', Georgia, serif" }}>
                {data.title?.includes("Barrier 1") ? (
                  <>
                    <W i={16}>Answer</W> <W i={17}>each</W> <W i={18}>question</W> <W i={19}>carefully.</W> <W i={20}>Correct</W> <W i={21}>answers</W> <W i={22}>will</W> <W i={23}>be</W> <W i={24}>added</W> <W i={25}>to</W> <W i={26}>our</W> <W i={27}>Case</W> <W i={28}>Log.</W>
                  </>
                ) : data.title?.includes("Barrier 2") ? (
                  <>
                    <W i={21}>Answer</W> <W i={22}>each</W> <W i={23}>question</W> <W i={24}>carefully.</W> <W i={26}>Correct</W> <W i={27}>answers</W> <W i={28}>will</W> <W i={29}>be</W> <W i={30}>added</W> <W i={31}>to</W> our <W i={33}>Case</W> <W i={34}>Log.</W>
                  </>
                ) : data.title?.includes("6.3.1") ? (
                  <>
                    <W i={21}>Answer</W> <W i={22}>each</W> <W i={23}>question</W> <W i={24}>carefully.</W> <W i={25}>Correct</W> <W i={26}>answers</W> <W i={27}>will</W> <W i={28}>be</W> <W i={29}>added</W> <W i={30}>to</W> <W i={31}>our</W> <W i={32}>Case</W> <W i={33}>Log.</W>
                  </>
                ) : data.title?.includes("6.3.2") ? (
                  <>
                    <W i={21}>Answer</W> <W i={22}>each</W> <W i={23}>question</W> <W i={24}>carefully.</W> <W i={25}>Correct</W> <W i={26}>answers</W> <W i={27}>will</W> <W i={28}>be</W> <W i={29}>added</W> <W i={30}>to</W> <W i={31}>our</W> <W i={32}>Case</W> <W i={33}>Log.</W>
                  </>
                ) : data.title?.includes("6.3.3") ? (
                  <>
                    <W i={13}>Answer</W> <W i={14}>each</W> <W i={15}>question</W> <W i={16}>carefully.</W> <W i={17}>Correct</W> <W i={18}>answers</W> <W i={19}>will</W> <W i={20}>be</W> <W i={21}>added</W> <W i={22}>to</W> <W i={23}>our</W> <W i={24}>Case</W> <W i={25}>Log.</W>
                  </>
                ) : data.title?.includes("6.3.4") ? (
                  <>
                    <W i={15}>Answer</W> <W i={16}>each</W> <W i={17}>question</W> <W i={18}>carefully.</W> <W i={19}>Correct</W> <W i={20}>answers</W> <W i={21}>will</W> <W i={22}>be</W> <W i={23}>added</W> <W i={24}>to</W> <W i={25}>our</W> <W i={26}>Case</W> <W i={27}>Log.</W>
                  </>
                ) : data.title?.includes("6.3.5") ? (
                  <>
                    <W i={14}>Answer</W> <W i={15}>each</W> <W i={16}>question</W> <W i={17}>carefully.</W> <W i={18}>Correct</W> <W i={19}>answers</W> <W i={20}>will</W> <W i={21}>be</W> <W i={22}>added</W> <W i={23}>to</W> <W i={24}>our</W> <W i={25}>Case</W> <W i={26}>Log.</W>
                  </>
                ) : data.title?.includes("6.3.6") ? (
                  <>
                    <W i={11}>Answer</W> <W i={12}>each</W> <W i={13}>question</W> <W i={14}>carefully.</W> <W i={15}>Correct</W> <W i={16}>answers</W> <W i={17}>will</W> <W i={18}>be</W> <W i={19}>added</W> <W i={20}>to</W> <W i={21}>our</W> <W i={22}>Case</W> <W i={23}>Log.</W>
                  </>
                ) : data.title?.includes("Barrier 3") ? (
                  "Answer each question carefully. Correct answers will be added to our Case Log."
                ) : data.title?.includes("Barrier 4") ? (
                  <>
                    <W i={28}>Answer</W> <W i={29}>each</W> <W i={30}>question</W> <W i={31}>carefully.</W> <W i={32}>Correct</W> <W i={33}>answers</W> <W i={34}>will</W> <W i={35}>be</W> <W i={36}>added</W> <W i={37}>to</W> <W i={38}>our</W> <W i={39}>Case</W> <W i={40}>Log.</W>
                  </>
                ) : (
                  "Answer each question carefully. Correct answers will be added to our Case Log."
                )}
              </p>
            </div>
          </motion.div>

          {onBack && (
            <button className="spread-back-btn" onClick={onBack} style={{ fontSize: '24px', fontWeight: '700', padding: '12px 24px' }}>
              <ArrowLeft size={24} /> Back
            </button>
          )}

          {data.title?.includes("Barrier 1") || data.title?.includes("Barrier 2") || data.title?.includes("6.3.1") || data.title?.includes("6.3.2") || data.title?.includes("6.3.3") || data.title?.includes("6.3.4") || data.title?.includes("6.3.5") || data.title?.includes("6.3.6") || data.title?.includes("Barrier 3") || data.title?.includes("Barrier 4") ? (
            <div style={{ position: 'absolute', bottom: '18px', right: '28px', zIndex: 100, display: 'flex', gap: '16px', alignItems: 'center' }}>
              <button
                onClick={toggleAudio}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: '#d97706',
                  color: 'white',
                  border: '3px solid #FEF08A',
                  padding: '12px 24px',
                  borderRadius: '42px',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(217, 119, 6, 0.4)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#FEF3C7'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#FEF08A'; }}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                {isPlaying ? "Pause" : "Play"}
              </button>
              <button className="start-btn" style={{ position: 'static', bottom: 'auto', right: 'auto', margin: 0 }} onClick={() => {
                if (audioRef.current) {
                  audioRef.current.pause();
                }
                setCurrentPage(2);
              }}>
                Next <ArrowRight size={26} />
              </button>
            </div>
          ) : (
            <button className="start-btn" onClick={() => setCurrentPage(2)}>
              Next <ArrowRight size={26} />
            </button>
          )}
        </div>
      )}

      {/* Page 2: Quiz Interface */}
      {currentPage === 2 && (
        <div style={{ background: '#f6f1e4', display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%', width: '100%', position: 'relative' }}>
          
          {/* Decorative Background */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '60%',
            backgroundImage: `url(${data?.title?.includes('Barrier 4') ? barrier4Bg : data?.title?.includes('6.3.6') ? stage6_3_6Bg : data?.title?.includes('6.3.5') ? stage6_3_5Bg : data?.title?.includes('6.3.4') ? stage6_3_4Bg : data?.title?.includes('6.3.3') ? stage6_3_3Bg : data?.title?.includes('6.3.2') ? stage6_3_2Bg : data?.title?.includes('6.3.1') ? stage6_3_1Bg : data?.title?.includes('Barrier 2') ? barrier2Bg : checkpointBg})`,
            backgroundSize: 'cover',
            backgroundPosition: '80% center',
            maskImage: 'linear-gradient(to right, transparent 20%, black 60%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 20%, black 60%)',
            pointerEvents: 'none',
            zIndex: 0
          }} />

          <button className="spread-back-btn" style={{ bottom: '18px', left: '24px', zIndex: 1000, fontSize: '24px', fontWeight: '700', padding: '12px 24px' }} onClick={() => {
            if (audioRef.current) {
              audioRef.current.pause();
              setIsPlaying(false);
              setActiveWordIndex(null);
            }
            setCurrentPage(1);
          }}>
            <ArrowLeft size={24} /> Back
          </button>
          
          {data.title?.includes("Barrier 1") || (data.title?.includes("Barrier 2") && (currentQ === 0 || currentQ === 1)) || (data.title?.includes("6.3.1") && (currentQ === 0 || currentQ === 1)) || (data.title?.includes("6.3.2") && (currentQ === 0 || currentQ === 1)) || (data.title?.includes("6.3.3") && (currentQ === 0 || currentQ === 1)) || (data.title?.includes("6.3.4") && (currentQ === 0 || currentQ === 1)) || (data.title?.includes("6.3.5") && (currentQ === 0 || currentQ === 1)) || (data.title?.includes("6.3.6") && (currentQ === 0 || currentQ === 1)) || (data.title?.includes("Barrier 3") && (currentQ === 0 || currentQ === 1)) || (data.title?.includes("Barrier 4") && (currentQ === 0 || currentQ === 1 || currentQ === 2)) ? (
            <div style={{ position: 'absolute', bottom: '18px', right: '28px', zIndex: 1000, display: 'flex', gap: '16px', alignItems: 'center' }}>
              <button
                onClick={toggleAudio}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: '#d97706',
                  color: 'white',
                  border: '3px solid #FEF08A',
                  padding: '12px 24px',
                  borderRadius: '42px',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(217, 119, 6, 0.4)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#FEF3C7'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#FEF08A'; }}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                {isPlaying ? "Pause" : "Play"}
              </button>
              <button 
                className="start-btn" 
                style={{ position: 'static', bottom: 'auto', right: 'auto', margin: 0 }} 
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.pause();
                    setIsPlaying(false);
                    setActiveWordIndex(null);
                  }
                  if (onProceed) onProceed(); 
                }}
              >
                Next <ArrowRight size={26} />
              </button>
            </div>
          ) : (
            <button 
              className="start-btn" 
              style={{ bottom: '18px', right: '28px', zIndex: 1000, fontSize: '24px', fontWeight: '700', padding: '12px 28px' }} 
              onClick={() => { if (onProceed) onProceed(); }}
            >
              Next <ArrowRight size={26} />
            </button>
          )}

          {/* Header */}
          <div style={{ padding: '0.5rem 2.5rem 0.5rem 1.5rem', borderBottom: '1px solid var(--lesson-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div>
                <h1 className="mission-title" style={{ fontSize: '54px', margin: 0, marginBottom: '8px' }}>
                  {data.title || "Detective Checkpoint"}
                </h1>
                <p style={{ margin: 0, fontSize: '28px', fontWeight: '600', color: 'var(--lesson-muted)', fontFamily: "'Merriweather', Georgia, serif" }}>
                  Verify your understanding to record our findings.
                </p>
              </div>
            </div>
          </div>

        {/* Content */}
        {!quizComplete ? (
          <div style={{ 
            padding: data?.title?.includes('6.3.6') ? '3rem 2rem 90px 2rem' : '1rem 2rem 90px 2rem', 
            flex: 1, 
            overflow: 'hidden', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: data?.title?.includes('6.3.6') ? 'flex-start' : 'center', 
            position: 'relative', 
            zIndex: 1, 
            width: '60%' 
          }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: 'clamp(34px, 4vw, 40px)', fontWeight: '800', color: 'var(--lesson-text)', display: 'flex', gap: '12px', fontFamily: "'Merriweather', Georgia, serif", lineHeight: '1.3' }}>
              <div style={{ background: 'var(--lesson-primary)', color: 'white', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.5rem' }}>
                Q
              </div>
              {data.title?.includes("Barrier 1") ? (
                currentQ === 0 ? (
                  <span>
                    <W i={0}>What</W> <W i={1}>do</W> <W i={2}>we</W> <W i={3}>call</W> <W i={4}>the</W> "<W i={5}>stuff</W>" <W i={6}>that</W> <W i={7}>an</W> <W i={8}>object</W> <W i={9}>is</W> <W i={10}>made</W> <W i={11}>of?</W>
                  </span>
                ) : (
                  <span>
                    <W i={0}>Can</W> <W i={1}>a</W> <W i={2}>single</W> <W i={3}>object</W> <W i={4}>like</W> <W i={5}>a</W> <W i={6}>plate</W> <W i={7}>be</W> <W i={8}>made</W> <W i={9}>from</W> <W i={10}>different</W> <W i={11}>materials,</W> <W i={12}>like</W> <W i={13}>glass,</W> <W i={14}>steel</W> <W i={15}>or</W> <W i={16}>plastic?</W>
                  </span>
                )
              ) : data.title?.includes("Barrier 2") && currentQ === 0 ? (
                <span>
                  <W i={0}>Why</W> <W i={1}>do</W> <W i={2}>we</W> <W i={3}>group</W> <W i={4}>objects</W> <W i={5}>together</W> (Classification)?
                </span>
              ) : data.title?.includes("Barrier 2") && currentQ === 1 ? (
                <span>
                  <W i={0}>Why</W> <W i={1}>is</W> <W i={2}>a</W> <W i={3}>cooking</W> <W i={4}>pot</W> <W i={5}>made</W> <W i={6}>of</W> <W i={7}>metal</W> <W i={8}>instead</W> <W i={9}>of</W> <W i={10}>paper?</W>
                </span>
              ) : data.title?.includes("6.3.1") && currentQ === 0 ? (
                <span>
                  <W i={0}>What</W> <W i={1}>do</W> <W i={2}>we</W> <W i={3}>call</W> <W i={4}>materials</W> <W i={5}>that</W> <W i={6}>have</W> <W i={7}>a</W> <W i={8}>shiny</W> <W i={9}>surface,</W> <W i={10}>like</W> <W i={11}>iron</W> <W i={12}>or</W> <W i={13}>gold?</W>
                </span>
              ) : data.title?.includes("6.3.1") && currentQ === 1 ? (
                <span>
                  <W i={0}>Are</W> <W i={1}>all</W> <W i={2}>lustrous</W> <W i={3}>materials</W> <W i={4}>metals?</W>
                </span>
              ) : data.title?.includes("6.3.2") && currentQ === 0 ? (
                <span>
                  <W i={0}>What</W> <W i={1}>do</W> <W i={2}>we</W> <W i={3}>call</W> <W i={4}>materials</W> <W i={5}>that</W> <W i={6}>are</W> <W i={7}>difficult</W> <W i={8}>to</W> <W i={9}>compress</W> <W i={10}>or</W> <W i={11}>scratch?</W>
                </span>
              ) : data.title?.includes("6.3.2") && currentQ === 1 ? (
                <span>
                  <W i={0}>Which</W> <W i={1}>of</W> <W i={2}>the</W> <W i={3}>following</W> <W i={4}>is</W> <W i={5}>an</W> <W i={6}>example</W> <W i={7}>of</W> <W i={8}>a</W> <W i={9}>soft</W> <W i={10}>material?</W>
                </span>
              ) : data.title?.includes("6.3.3") && currentQ === 0 ? (
                <span>
                  <W i={0}>Which</W> <W i={1}>material</W> <W i={2}>allows</W> <W i={3}>you</W> <W i={4}>to</W> <W i={5}>see</W> <W i={6}>clearly</W> <W i={7}>through</W> <W i={8}>it?</W>
                </span>
              ) : data.title?.includes("6.3.3") && currentQ === 1 ? (
                <span>
                  <W i={0}>If</W> <W i={1}>you</W> <W i={2}>can</W> <W i={3}>see</W> <W i={4}>through</W> <W i={5}>an</W> <W i={6}>object,</W> <W i={7}>but</W> <W i={8}>not</W> <W i={9}>clearly,</W> <W i={10}>what</W> <W i={11}>property</W> <W i={12}>does</W> <W i={13}>it</W> <W i={14}>have?</W>
                </span>
              ) : data.title?.includes("6.3.4") && currentQ === 0 ? (
                <span>
                  <W i={0}>What</W> <W i={1}>do</W> <W i={2}>we</W> <W i={3}>call</W> <W i={4}>a</W> <W i={5}>material</W> <W i={6}>that</W> <W i={7}>completely</W> <W i={8}>disappears</W> <W i={9}>when</W> <W i={10}>mixed</W> <W i={11}>with</W> <W i={12}>water,</W> <W i={13}>like</W> <W i={14}>salt?</W>
                </span>
              ) : data.title?.includes("6.3.4") && currentQ === 1 ? (
                <span>
                  <W i={0}>Which</W> <W i={1}>of</W> <W i={2}>the</W> <W i={3}>following</W> <W i={4}>materials</W> <W i={5}>is</W> <W i={6}>insoluble</W> <W i={7}>in</W> <W i={8}>water?</W>
                </span>
              ) : data.title?.includes("6.3.5") && currentQ === 0 ? (
                <span>
                  <W i={0}>What</W> <W i={1}>property</W> <W i={2}>tells</W> <W i={3}>us</W> <W i={4}>how</W> <W i={5}>heavy</W> <W i={6}>or</W> <W i={7}>light</W> <W i={8}>an</W> <W i={9}>object</W> <W i={10}>is?</W>
                </span>
              ) : data.title?.includes("6.3.5") && currentQ === 1 ? (
                <span>
                  <W i={0}>If</W> <W i={1}>an</W> <W i={2}>object</W> <W i={3}>is</W> <W i={4}>heavier</W> <W i={5}>than</W> <W i={6}>another,</W> <W i={7}>it</W> <W i={8}>has:</W>
                </span>
              ) : data.title?.includes("6.3.6") && currentQ === 0 ? (
                <span>
                  <W i={0}>The</W> <W i={1}>amount</W> <W i={2}>of</W> <W i={3}>space</W> <W i={4}>occupied</W> <W i={5}>by</W> <W i={6}>an</W> <W i={7}>object</W> <W i={8}>is</W> <W i={9}>called</W> <W i={10}>its:</W>
                </span>
              ) : data.title?.includes("6.3.6") && currentQ === 1 ? (
                <span>
                  <W i={0}>If</W> <W i={1}>a</W> <W i={2}>water</W> <W i={3}>bottle</W> <W i={4}>and</W> <W i={5}>a</W> <W i={6}>milk</W> <W i={7}>bottle</W> <W i={8}>both</W> <W i={9}>have</W> <W i={10}>"500</W> <W i={11}>mL"</W> <W i={12}>written</W> <W i={13}>on</W> <W i={14}>them,</W> <W i={15}>they</W> <W i={16}>have</W> <W i={17}>the</W> <W i={18}>same:</W>
                </span>
              ) : data.title?.includes("Barrier 4") && currentQ === 0 ? (
                <span>
                  <W i={0}>Anything</W> <W i={1}>that</W> <W i={2}>occupies</W> <W i={3}>space</W> <W i={4}>and</W> <W i={5}>has</W> <W i={6}>mass</W> <W i={7}>is</W> <W i={8}>called:</W>
                </span>
              ) : data.title?.includes("Barrier 4") && currentQ === 1 ? (
                <span>
                  <W i={0}>Is</W> <W i={1}>air</W> <W i={2}>considered</W> <W i={3}>matter?</W>
                </span>
              ) : data.title?.includes("Barrier 4") && currentQ === 2 ? (
                <span>
                  <W i={0}>Which</W> <W i={1}>of</W> <W i={2}>the</W> <W i={3}>following</W> <W i={4}>is</W> <W i={5}>the</W> <W i={6}>standard</W> <W i={7}>(SI)</W> <W i={8}>unit</W> <W i={9}>of</W> <W i={10}>Mass?</W>
                </span>
              ) : (
                q.question
              )}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '0.75rem' }}>
              {q.options.map((opt, idx) => {
                const isSelected = selected === idx;
                let bg = 'white';
                let border = '2px solid var(--lesson-border)';
                let iconColor = 'var(--lesson-muted)';

                if (isSelected) {
                  bg = 'var(--lesson-accent-bg)';
                  border = '2px solid var(--lesson-primary)';
                  iconColor = 'var(--lesson-primary)';
                }

                if (isVerified) {
                  if (idx === q.correct) {
                    bg = 'var(--lesson-success-bg)';
                    border = '2px solid var(--lesson-success-border)';
                    iconColor = 'var(--lesson-success-border)';
                  } else if (isSelected) {
                    bg = 'var(--lesson-danger-bg)';
                    border = '2px solid var(--lesson-danger)';
                    iconColor = 'var(--lesson-danger)';
                  } else {
                    bg = 'var(--lesson-surface)';
                    border = '2px solid var(--lesson-border)';
                    iconColor = 'var(--lesson-border)';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={isVerified}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '1rem',
                      padding: '0.75rem 1.25rem', borderRadius: '12px',
                      background: bg, border: border,
                      cursor: isVerified ? 'default' : 'pointer',
                      textAlign: 'left', transition: 'all 0.2s',
                      boxShadow: isSelected && !isVerified ? '0 4px 12px rgba(0,0,0,0.08)' : 'none'
                    }}
                  >
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: `2px solid ${iconColor}`, color: iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.4rem', flexShrink: 0 }}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span style={{ fontSize: 'clamp(28px, 3.5vw, 32px)', fontWeight: '700', color: 'var(--lesson-text)', flex: 1, fontFamily: "'Merriweather', Georgia, serif", lineHeight: '1.3' }}>{opt}</span>
                    {isVerified && idx === q.correct && (
                      <div style={{ background: 'var(--lesson-success-border)', color: 'white', borderRadius: '50%', padding: '6px' }}>
                        <Check size={20} strokeWidth={3} />
                      </div>
                    )}
                    {isVerified && isSelected && idx !== q.correct && (
                      <div style={{ background: 'var(--lesson-danger)', color: 'white', borderRadius: '50%', padding: '6px' }}>
                        <X size={20} strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Actions */}
            <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {isVerified ? (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: '#FDFBF7', padding: '0.75rem 1rem', borderRadius: '12px', border: '2px solid #D9C9A3' }}>
                  <div style={{ background: isCorrect ? '#4B7A2A' : '#A64B27', color: 'white', padding: '8px', borderRadius: '50%', flexShrink: 0, marginTop: '2px' }}>
                    {isCorrect ? <Check size={20} strokeWidth={3} /> : <X size={20} strokeWidth={3} />}
                  </div>
                  <div style={{ width: '100%', fontFamily: "'Merriweather', Georgia, serif" }}>
                    <div style={{ fontSize: 'clamp(18px, 2.5vw, 21px)', fontWeight: '800', color: isCorrect ? '#4B7A2A' : '#A64B27', marginBottom: '4px' }}>
                      {isCorrect ? '✓ Correct! Great job, Detective.' : '✕ Not quite.'}
                    </div>
                    
                    {!isCorrect && (
                      <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ fontSize: 'clamp(18px, 2.5vw, 21px)', color: '#3B2A1F' }}>
                          <span style={{ fontWeight: '500' }}>Correct answer:</span> <span style={{ fontWeight: '800', color: '#A64B27' }}>{q.options[q.correct]}</span>
                        </div>
                        <div style={{ fontSize: '18px', fontWeight: '800', color: '#7A6A52', marginTop: '4px' }}>
                          Why?
                        </div>
                        <div style={{ fontSize: '17px', fontWeight: '500', color: '#3B2A1F', lineHeight: '1.5' }}>
                          {q.explanation || "Please review the properties of materials again."}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  {!showHint ? (
                    <button
                      onClick={() => setShowHint(true)}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '1rem 1.5rem', borderRadius: '8px', border: '1px solid var(--lesson-border)', background: 'white', color: 'var(--lesson-muted)', fontSize: '24px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' }}
                    >
                      <Lightbulb size={24} /> Need a hint?
                    </button>
                  ) : (
                    <div style={{ background: 'var(--lesson-warning-bg)', border: '1px solid var(--lesson-warning-bg)', padding: '1rem 1.5rem', borderRadius: '8px', color: 'var(--lesson-primary)', fontSize: 'clamp(24px, 3.5vw, 28px)', fontWeight: '700', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <Lightbulb size={24} color="#A64B27" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div style={{ lineHeight: '1.4' }}>
                        <strong>Hint:</strong> {q.hint || "Think about the properties we just learned!"}
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>

          </div>
        ) : (
          <div style={{ padding: '3rem', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', zIndex: 1, width: '55%', fontFamily: "'Merriweather', Georgia, serif" }}>
            <div style={{ width: '80px', height: '80px', background: '#4B7A2A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'white' }}>
              <CheckCircle2 size={48} />
            </div>
            <h2 style={{ color: '#3B2A1F', margin: '0 0 1rem 0', fontSize: 'clamp(30px, 3.5vw, 36px)', fontWeight: '900' }}>Checkpoint Complete!</h2>
            <p style={{ color: '#7A6A52', fontSize: 'clamp(18px, 2.5vw, 21px)', fontWeight: '600', maxWidth: '400px', marginBottom: '2rem' }}>
              Excellent work! All discoveries have been securely logged to the Case File.
              <br/><br/>
              <span style={{ fontSize: '0.9rem', color: '#7A6A52' }}>Click "Next" in the bottom right corner to continue.</span>
            </p>
          </div>
        )}
        </div>
      )}

      {quizComplete && showCaseLog && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: '#F4EBDD',
              border: '6px solid #3E2723',
              borderRadius: '0',
              padding: '2.5rem',
              maxWidth: '900px',
              width: '90%',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              textAlign: 'center',
              fontFamily: "'Merriweather', Georgia, serif"
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', color: '#A64B27' }}>
              <ClipboardList size={40} />
            </div>
            <h2 style={{ margin: '0 0 0.5rem 0', color: '#3B2A1F', fontSize: '3rem', fontWeight: 900 }}>✓ CASE LOG UPDATED</h2>
            <p style={{ margin: '0 0 2rem 0', color: '#7A6A52', fontSize: '1.6rem', fontWeight: 600 }}>
              Checkpoint completed. Your findings have been securely recorded.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left', marginBottom: '2.5rem' }}>
              {data.discoveries.map((discovery, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '12px', fontSize: '26px', fontWeight: 600, color: '#3B2A1F', lineHeight: '1.5', background: '#FDFBF7', padding: '1.2rem', borderRadius: '12px', border: '1px solid #D9C9A3' }}>
                  <div style={{ color: '#4B7A2A', flexShrink: 0, marginTop: '2px' }}><CheckCircle2 size={24} /></div>
                  <div>{discovery}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowCaseLog(false)}
              style={{
                background: '#A64B27',
                color: '#FFFFFF',
                border: 'none',
                padding: '1rem 3rem',
                borderRadius: '10px',
                fontSize: '28px',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'background 0.2s',
                boxShadow: '0 4px 15px rgba(166, 75, 39, 0.4)',
                fontFamily: "'Merriweather', Georgia, serif"
              }}
            >
              Continue
            </button>
          </motion.div>
        </div>
      )}
        </div>
      </motion.div>
    </div>
  );
}

DetectiveCheckpoint.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    dialogue: PropTypes.string,
    discoveries: PropTypes.array,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.string),
        correct: PropTypes.number,
        explanation: PropTypes.string,
        hint: PropTypes.string
      })
    )
  }).isRequired,
  onComplete: PropTypes.func.isRequired,
  addXp: PropTypes.func
};
