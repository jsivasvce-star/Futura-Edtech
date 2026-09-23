import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Check, X, ArrowRight, ArrowLeft, Play, Pause } from 'lucide-react';
import newChiefDetectiveImage from '../../../../../../assets/4.detective.png';
import mb1 from '../../../../../../assets/MB1.png';
import mb2 from '../../../../../../assets/MB2.png';
import mb3 from '../../../../../../assets/MB3.png';
import mb4 from '../../../../../../assets/MB4.png';
import mb5 from '../../../../../../assets/MB5.png';
import mpage6Audio from '../../../audio/mpage6.mp3?url';
import mpage6Json from '../../../json/mpage6.json';
import mpage7Audio from '../../../audio/mpage7.mp3?url';
import mpage7Json from '../../../json/mpage7.json';
import mpage15Audio from '../../../audio/mpage15.mp3?url';
import mpage15Json from '../../../json/mpage15.json';
import mpage16Audio from '../../../audio/mpage16.mp3?url';
import mpage16Json from '../../../json/mpage16.json';
import mpage21Audio from '../../../audio/mpage21.mp3?url';
import mpage21Json from '../../../json/mpage21.json';
import mpage22Audio from '../../../audio/mpage22.mp3?url';
import mpage22Json from '../../../json/mpage22.json';
import mpage32Audio from '../../../audio/mpage32.mp3?url';
import mpage32Json from '../../../json/mpage32.json';
import mpage33Audio from '../../../audio/mpage33.mp3?url';
import mpage33Json from '../../../json/mpage33.json';
import mpage39Audio from '../../../audio/mpage39.mp3?url';
import mpage39Json from '../../../json/mpage39.json';
import mpage40Audio from '../../../audio/mpage40.mp3?url';
import mpage40Json from '../../../json/mpage40.json';
import mpage45Audio from '../../../audio/mpage45.mp3?url';
import mpage45Json from '../../../json/mpage45.json';
import mpage46Audio from '../../../audio/mpage46.mp3?url';
import mpage46Json from '../../../json/mpage46.json';
import mpage52Audio from '../../../audio/mpage52.mp3?url';
import mpage52Json from '../../../json/mpage52.json';
import mpage53Audio from '../../../audio/mpage53.mp3?url';
import mpage53Json from '../../../json/mpage53.json';
import mpage59Audio from '../../../audio/mpage59.mp3?url';
import mpage59Json from '../../../json/mpage59.json';
import mpage60Audio from '../../../audio/mpage60.mp3?url';
import mpage60Json from '../../../json/mpage60.json';
import mpage65Audio from '../../../audio/mpage65.mp3?url';
import mpage65Json from '../../../json/mpage65.json';
import mpage66Audio from '../../../audio/mpage66.mp3?url';
import mpage66Json from '../../../json/mpage66.json';

export default function MissionBriefingSpread({ data, onContinue, onBack }) {
  const [currentPage, setCurrentPage] = useState(1);
  const BLAKE_IMG_URL = '/images/chief_detective_blake.png';
  const isBarrier2 = data?.title?.includes('Barrier 2') || data?.title?.includes('Grouping Materials') || data?.id === 'barrier_2';
  
  // ALWAYS use the new wide asset as requested, preventing fallback to narrow portraits
  const detectiveImg = newChiefDetectiveImage;
  
  const handleStart = () => {
    onContinue();
  };

  // The user explicitly requested this exact string mapping for the title
  let displayTitle = data?.title || 'The Classroom Mystery';
  if (displayTitle === 'The Classroom Mystery (Barrier 1)') {
    displayTitle = 'The Classroom Mystery (Barrier 2)';
  } else if (typeof displayTitle === 'string') {
    displayTitle = displayTitle.replace('Barrier 2', 'Barrier\u00A02');
  }

  const isBarrier2Mystery = displayTitle.includes('The Classroom Mystery');
  const isPhase2Identification = displayTitle.includes('Phase 2: Identification');
  const isBarrier2GroupingMaterials = displayTitle.includes('Grouping Materials');
  const isAppearanceStage = displayTitle.includes('Appearance (Stage 6.3.1)');
  const isHardnessStage = displayTitle.includes('Hardness (Stage 6.3.2)');
  const isTransparencyStage = displayTitle.includes('Transparency (Stage 6.3.3)');
  const isSolubilityStage = displayTitle.includes('Solubility (Stage 6.3.4)');
  const isMassStage = displayTitle.includes('Mass (Stage 6.3.5)');
  const isVolumeStage = displayTitle.includes('Volume (Stage 6.3.6)') || displayTitle.includes('Barrier 3');
  const hasAudio = isBarrier2Mystery || isPhase2Identification || isBarrier2GroupingMaterials || isAppearanceStage || isHardnessStage || isTransparencyStage || isSolubilityStage || isMassStage || isVolumeStage;

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [activeWordIndex, setActiveWordIndex] = useState(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setActiveWordIndex(null);
  }, [currentPage]);

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
    if (audioRef.current && hasAudio) {
      const time = audioRef.current.currentTime;
      let words = [];
      if (isPhase2Identification) {
        words = currentPage === 1 ? mpage15Json.words : mpage16Json.words;
      } else if (isBarrier2GroupingMaterials) {
        words = currentPage === 1 ? mpage21Json.words : mpage22Json.words;
      } else if (isAppearanceStage) {
        words = currentPage === 1 ? mpage32Json.words : mpage33Json.words;
      } else if (isHardnessStage) {
        words = currentPage === 1 ? mpage39Json.words : mpage40Json.words;
      } else if (isTransparencyStage) {
        words = currentPage === 1 ? mpage45Json.words : mpage46Json.words;
      } else if (isSolubilityStage) {
        words = currentPage === 1 ? mpage52Json.words : mpage53Json.words;
      } else if (isMassStage) {
        words = currentPage === 1 ? mpage59Json.words : mpage60Json.words;
      } else if (isVolumeStage) {
        words = currentPage === 1 ? mpage65Json.words : mpage66Json.words;
      } else if (currentPage === 1) {
        words = mpage6Json.words;
      } else if (currentPage === 2) {
        words = mpage7Json.words;
      }
      
      const activeIdx = words.findIndex(w => time >= w.start && time < w.end);
      if (activeIdx !== activeWordIndex) {
        setActiveWordIndex(activeIdx);
      }
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setActiveWordIndex(null);
  };

  const isUserPage = displayTitle.includes('The Classroom Mystery') || displayTitle.includes('Barrier 4');
  const colorMainHeading = isUserPage ? '#2C4E3D' : 'var(--lesson-primary)';
  const colorBodyText = isUserPage ? '#3E2723' : '#3b4560'; // or 'var(--lesson-text)' depending on usage
  const colorHighlight = isUserPage ? '#A94727' : 'var(--lesson-danger)';
  const colorSubHeading = isUserPage ? '#4A3B5C' : 'var(--lesson-primary)';

  const getDecorativeImage = (title) => {
    if (!title) return mb1;
    const t = title.toLowerCase();
    
    if (t.includes('appearance')) return mb3;
    if (t.includes('hardness')) return mb4;
    if (t.includes('transparency') || t.includes('transparent')) return mb5;
    if (t.includes('solubility') || t.includes('soluble')) return mb1;
    if (t.includes('mass')) return mb2;
    if (t.includes('space') || t.includes('volume')) return mb3;
    if (t.includes('quiz') || t.includes('final')) return mb4;
    if (t.includes('grouping') || t.includes('barrier 2') || t.includes('barrier\u00A02')) return mb2;
    
    return mb1;
  };
  
  const mbDecorativeImage = getDecorativeImage(displayTitle);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: '#FFFFFF',
      fontFamily: '"Times New Roman", serif',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '16px',
      zIndex: 9999,
      overflow: 'hidden'
    }}>
      <style>
        {`
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
          .page-spread {
            flex: 1;
            width: 100%;
          }
          .left-page {
            background: #f6f1e4;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
            height: 100%;
            overflow: hidden;
            position: relative;
            padding: 16px 40px 76px;
          }
          .left-hero-wrapper {
            width: 100%;
            margin-bottom: 16px;
            flex: 0 0 auto;
            display: block;
            overflow: hidden;
            border-radius: 8px;
            box-shadow: 0 6px 16px rgba(0,0,0,0.12);
          }
          .barrier2-hero-img, .default-hero-img {
            width: 100%;
            height: auto;
            object-fit: contain;
            display: block;
          }

          /* ---------- RIGHT PAGE ---------- */
          .right-page {
            background: #f6f1e4;
            height: 100%;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            z-index: 1;
          }
          .mb-decorative-bg {
            position: absolute;
            bottom: -5%; /* Pull down slightly so it anchors firmly */
            right: -10%; /* Pull right to compensate for transparent left edge */
            width: 130%; /* Drastically increased to double the visible scene size */
            max-width: none; /* Removed limits */
            height: auto;
            object-fit: contain;
            pointer-events: none;
            z-index: 0;
          }
          
          .right-page::after {
            content: '';
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 1;
            background: 
              linear-gradient(to right, #f6f1e4 0%, #f6f1e4 25%, transparent 60%),
              linear-gradient(to bottom, #f6f1e4 0%, transparent 12%),
              linear-gradient(to top, #f6f1e4 0%, transparent 12%);
          }
          .right-page-content {
            width: 100%;
            height: 100%;
            overflow-y: auto;
            padding: 32px 40px 96px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            box-sizing: border-box;
            position: relative;
            z-index: 2;
          }
          
          /* ---------- LEFT PAGE SPEECH BUBBLE ---------- */
          .briefing-box {
            position: relative;
            margin-top: 4px;
            width: 100%;
            background: white;
            padding: 2.5rem 1.8rem;
            min-height: 120px;
            display: flex;
            align-items: center;
            border-radius: 12px;
            box-shadow: 0 6px 20px rgba(0,0,0,0.1);
            z-index: 20;
            border: 2px solid var(--lesson-border);
            flex: 0 0 auto;
          }
          .speech-bubble::after {
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
          .speech-bubble::before {
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
          .speech-speaker {
            position: absolute;
            top: -22px;
            right: 20px;
            background: var(--lesson-muted);
            color: white;
            padding: 5px 18px;
            border-radius: 8px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 30px;
            font-weight: bold;
            letter-spacing: 1px;
            box-shadow: 0 3px 6px rgba(0,0,0,0.1);
          }

          /* ---------- RIGHT PAGE CONTENT ---------- */
          .mission-header {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 20px;
            font-weight: 700;
            letter-spacing: 1.8px;
            color: ${colorMainHeading};
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .mission-title {
            font-size: 24px;
            line-height: 1.15;
            color: ${colorMainHeading};
            font-weight: 700;
            margin: 0 0 16px 0;
            font-family: Georgia, "Times New Roman", serif;
            word-break: keep-all;
          }
          .mission-content {
            margin-bottom: 22px;
            width: 100%;
          }
          .mission-content p {
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 16px;
            line-height: 1.5;
            color: ${colorBodyText};
          }
          .mission-box {
            background: var(--lesson-surface);
            border: 1px solid var(--lesson-border);
            border-left: 4px solid ${colorHighlight};
            border-radius: 12px;
            padding: 22px 26px;
            margin-bottom: 22px;
            width: 58%; /* Reduced from 100% to prevent overlap with the right-side background image */
          }
          .mission-box h3 {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 20px;
            font-weight: 700;
            color: ${colorSubHeading};
            margin: 0 0 12px 0;
            display: flex;
            align-items: center;
            gap: 10px;
            letter-spacing: 1px;
          }
          .mission-box p, .mission-box li {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 20px;
            color: ${isUserPage ? '#3E2723' : 'var(--lesson-text)'};
            line-height: 1.45;
            font-weight: 600;
          }
          .mission-meta {
            display: flex;
            gap: 48px;
            padding-top: 18px;
            margin-bottom: 22px;
            width: 100%;
          }
          .meta-item {
            display: flex;
            flex-direction: column;
            gap: 5px;
          }
          .meta-label {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 16px;
            font-weight: 700;
            color: var(--lesson-muted);
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .meta-value {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 16px;
            font-weight: 600;
            color: var(--lesson-text);
            display: flex;
            align-items: center;
            gap: 7px;
          }
          .meta-stars {
            color: var(--lesson-warning);
            font-size: 28px;
          }
          .meta-stars.empty {
            color: var(--lesson-border);
          }

          @keyframes primary-pulse {
            0% { box-shadow: 0 6px 20px rgba(217, 119, 6, 0.8), 0 0 0 0 rgba(245, 158, 11, 0.7); }
            50% { box-shadow: 0 10px 30px rgba(245, 158, 11, 1), 0 0 0 16px rgba(245, 158, 11, 0); }
            100% { box-shadow: 0 6px 20px rgba(217, 119, 6, 0.8), 0 0 0 0 rgba(245, 158, 11, 0); }
          }
          .start-btn {
            position: absolute;
            bottom: 18px;
            right: 28px;
            z-index: 10000;
            background: var(--lesson-primary);
            color: white;
            border: 3px solid #FEF08A;
            padding: 15px 41px; /* Adjusted to compensate for 3px border */
            border-radius: 42px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 24.2px;
            font-weight: 700;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 14px;
            box-shadow: 0 6px 20px rgba(217, 119, 6, 0.8);
            animation: primary-pulse 2s infinite;
            transition: all 0.2s;
            width: fit-content;
          }
          .start-btn:hover {
            transform: translateY(-2px);
            background: var(--lesson-primary);
            border-color: #FEF3C7;
          }

          .spread-back-btn {
            position: absolute;
            bottom: 18px;
            left: 24px;
            top: auto;
            z-index: 10000;
            background: var(--lesson-surface);
            border: 2px solid rgba(217, 119, 6, 0.5);
            color: var(--lesson-text);
            padding: 12px 26px;
            border-radius: 11px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 20.9px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(217, 119, 6, 0.2);
            transition: all 0.2s;
          }
          .spread-back-btn:hover {
            background: var(--lesson-surface);
            transform: translateY(-1px);
            border: 2px solid rgba(217, 119, 6, 0.8);
            box-shadow: 0 6px 16px rgba(217, 119, 6, 0.35);
          }
        `}
      </style>

      {(hasAudio) && (
        <audio
          key={currentPage}
          ref={audioRef}
          src={isPhase2Identification ? (currentPage === 1 ? mpage15Audio : mpage16Audio) : (isBarrier2GroupingMaterials ? (currentPage === 1 ? mpage21Audio : mpage22Audio) : (isAppearanceStage ? (currentPage === 1 ? mpage32Audio : mpage33Audio) : (isHardnessStage ? (currentPage === 1 ? mpage39Audio : mpage40Audio) : (isTransparencyStage ? (currentPage === 1 ? mpage45Audio : mpage46Audio) : (isSolubilityStage ? (currentPage === 1 ? mpage52Audio : mpage53Audio) : (isMassStage ? (currentPage === 1 ? mpage59Audio : mpage60Audio) : (isVolumeStage ? (currentPage === 1 ? mpage65Audio : mpage66Audio) : (currentPage === 1 ? mpage6Audio : mpage7Audio))))))))}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleAudioEnded}
        />
      )}

      <motion.div 
        className="book-frame"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="spread">
          {currentPage === 1 && (
            <div className="page-spread left-page">
              <div className="mission-header" style={{ fontSize: '34px' }}>
                <ShieldAlert size={34} />
                MISSION BRIEFING
              </div>
              <h1 className="mission-title" style={{ fontSize: '42px' }}>
                {displayTitle}
              </h1>
              
              <div className="left-hero-wrapper">
                <img 
                  src={detectiveImg} 
                  alt="Chief Detective" 
                  className={isBarrier2 ? "barrier2-hero-img" : "default-hero-img"}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/400x600.png?text=Blake'; }}
                />
              </div>
              <motion.div 
                className="briefing-box speech-bubble"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="speech-speaker">CHIEF BLAKE</div>
                <p style={{ margin: 0, fontSize: '28px', color: 'var(--lesson-text)', lineHeight: '1.45', fontWeight: '600' }}>
                  {isPhase2Identification ? (
                    <>
                      {mpage15Json.words.slice(0, 25).map((w, i) => (
                        <React.Fragment key={i}>
                          <span
                            style={{
                              color: activeWordIndex === i ? '#A94727' : 'var(--lesson-text)',
                              background: activeWordIndex === i ? 'rgba(169, 71, 39, 0.1)' : 'transparent',
                              borderRadius: '4px',
                              padding: '0 2px',
                              transition: 'all 0.15s ease-out'
                            }}
                          >
                            {w.text}
                          </span>
                          {i < mpage15Json.words.slice(0, 25).length - 1 ? ' ' : ''}
                        </React.Fragment>
                      ))}
                    </>
                  ) : isBarrier2Mystery ? (
                    <>
                      {mpage6Json.words.slice(0, 25).map((w, i) => (
                        <React.Fragment key={i}>
                          <span
                            style={{
                              color: activeWordIndex === i ? '#A94727' : 'var(--lesson-text)',
                              background: activeWordIndex === i ? 'rgba(169, 71, 39, 0.1)' : 'transparent',
                              borderRadius: '4px',
                              padding: '0 2px',
                              transition: 'all 0.15s ease-out'
                            }}
                          >
                            {w.text}
                          </span>
                          {i < mpage6Json.words.slice(0, 25).length - 1 ? ' ' : ''}
                        </React.Fragment>
                      ))}
                    </>
                  ) : isBarrier2GroupingMaterials && currentPage === 1 ? (
                    <>
                      {mpage21Json.words.slice(0, 24).map((w, i) => (
                        <React.Fragment key={i}>
                          <span
                            style={{
                              color: activeWordIndex === i ? '#A94727' : 'var(--lesson-text)',
                              background: activeWordIndex === i ? 'rgba(169, 71, 39, 0.1)' : 'transparent',
                              borderRadius: '4px',
                              padding: '0 2px',
                              transition: 'all 0.15s ease-out'
                            }}
                          >
                            {w.text}
                          </span>
                          {i < mpage21Json.words.slice(0, 24).length - 1 ? ' ' : ''}
                        </React.Fragment>
                      ))}
                    </>
                  ) : isAppearanceStage && currentPage === 1 ? (
                    <>
                      {mpage32Json.words.slice(0, 34).map((w, i) => (
                        <React.Fragment key={i}>
                          <span
                            style={{
                              color: activeWordIndex === i ? '#A94727' : 'var(--lesson-text)',
                              background: activeWordIndex === i ? 'rgba(169, 71, 39, 0.1)' : 'transparent',
                              borderRadius: '4px',
                              padding: '0 2px',
                              transition: 'all 0.15s ease-out'
                            }}
                          >
                            {w.text}
                          </span>
                          {i < mpage32Json.words.slice(0, 34).length - 1 ? ' ' : ''}
                        </React.Fragment>
                      ))}
                    </>
                  ) : isHardnessStage && currentPage === 1 ? (
                    <>
                      {mpage39Json.words.slice(0, 24).map((w, i) => (
                        <React.Fragment key={i}>
                          <span
                            style={{
                              color: activeWordIndex === i ? '#A94727' : 'var(--lesson-text)',
                              background: activeWordIndex === i ? 'rgba(169, 71, 39, 0.1)' : 'transparent',
                              borderRadius: '4px',
                              padding: '0 2px',
                              transition: 'all 0.15s ease-out'
                            }}
                          >
                            {w.text}
                          </span>
                          {i < mpage39Json.words.slice(0, 24).length - 1 ? ' ' : ''}
                        </React.Fragment>
                      ))}
                    </>
                  ) : isTransparencyStage && currentPage === 1 ? (
                    <>
                      {mpage45Json.words.map((w, i) => (
                        <React.Fragment key={i}>
                          <span
                            style={{
                              color: activeWordIndex === i ? '#A94727' : 'var(--lesson-text)',
                              background: activeWordIndex === i ? 'rgba(169, 71, 39, 0.1)' : 'transparent',
                              borderRadius: '4px',
                              padding: '0 2px',
                              transition: 'all 0.15s ease-out'
                            }}
                          >
                            {w.text}
                          </span>
                          {i < mpage45Json.words.length - 1 ? ' ' : ''}
                        </React.Fragment>
                      ))}
                    </>
                  ) : isSolubilityStage && currentPage === 1 ? (
                    <>
                      {mpage52Json.words.map((w, i) => (
                        <React.Fragment key={i}>
                          <span
                            style={{
                              color: activeWordIndex === i ? '#A94727' : 'var(--lesson-text)',
                              background: activeWordIndex === i ? 'rgba(169, 71, 39, 0.1)' : 'transparent',
                              borderRadius: '4px',
                              padding: '0 2px',
                              transition: 'all 0.15s ease-out'
                            }}
                          >
                            {w.text}
                          </span>
                          {i < mpage52Json.words.length - 1 ? ' ' : ''}
                        </React.Fragment>
                      ))}
                    </>
                  ) : isMassStage && currentPage === 1 ? (
                    <>
                      {mpage59Json.words.map((w, i) => (
                        <React.Fragment key={i}>
                          <span
                            style={{
                              color: activeWordIndex === i ? '#A94727' : 'var(--lesson-text)',
                              background: activeWordIndex === i ? 'rgba(169, 71, 39, 0.1)' : 'transparent',
                              borderRadius: '4px',
                              padding: '0 2px',
                              transition: 'all 0.15s ease-out'
                            }}
                          >
                            {w.text}
                          </span>
                          {i < mpage59Json.words.length - 1 ? ' ' : ''}
                        </React.Fragment>
                      ))}
                    </>
                  ) : isVolumeStage && currentPage === 1 ? (
                    <>
                      {mpage65Json.words.map((w, i) => (
                        <React.Fragment key={i}>
                          <span
                            style={{
                              color: activeWordIndex === i ? '#A94727' : 'var(--lesson-text)',
                              background: activeWordIndex === i ? 'rgba(169, 71, 39, 0.1)' : 'transparent',
                              borderRadius: '4px',
                              padding: '0 2px',
                              transition: 'all 0.15s ease-out'
                            }}
                          >
                            {w.text}
                          </span>
                          {i < mpage65Json.words.length - 1 ? ' ' : ''}
                        </React.Fragment>
                      ))}
                    </>
                  ) : (
                    data.dialogue || "Good morning, Detective. Headquarters has received an unusual science case. Study your investigation brief carefully before proceeding!"
                  )}
                </p>
              </motion.div>

              <button className="spread-back-btn" onClick={onBack}>
                <ArrowLeft size={20} /> Back
              </button>
              
              <div style={{ position: 'absolute', bottom: '18px', right: '28px', zIndex: 10000, display: 'flex', gap: '16px', alignItems: 'center' }}>
                {(isPhase2Identification || (currentPage === 1 && isBarrier2Mystery) || (currentPage === 1 && isBarrier2GroupingMaterials) || (currentPage === 1 && isAppearanceStage) || (currentPage === 1 && isHardnessStage) || (currentPage === 1 && isTransparencyStage) || (currentPage === 1 && isSolubilityStage) || (currentPage === 1 && isMassStage) || (currentPage === 1 && isVolumeStage)) && (
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
                      padding: '15px 24px',
                      borderRadius: '42px',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      boxShadow: '0 6px 20px rgba(217, 119, 6, 0.5)',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#FEF3C7'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#FEF08A'; }}
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    {isPlaying ? "Pause" : "Play"}
                  </button>
                )}
                <button className="start-btn" style={{ position: 'static', bottom: 'auto', right: 'auto' }} onClick={() => setCurrentPage(2)}>
                  Next <ArrowRight size={22} />
                </button>
              </div>
            </div>
          )}

          {currentPage === 2 && (
            <div className="page-spread right-page">
              <img src={mbDecorativeImage} alt="" className="mb-decorative-bg" aria-hidden="true" />
              <div className="right-page-content">
                <div className="mission-header" style={{ fontSize: '34px' }}>
                  <ShieldAlert size={20} />
                  MISSION BRIEFING
                </div>
                
                <h1 className="mission-title" style={{ fontSize: '42px' }}>
                  {displayTitle}
                </h1>
                
                <div className="mission-content">
                  <p style={{ fontSize: '28px', color: 'var(--lesson-text)', lineHeight: '1.45', fontWeight: '600', margin: 0 }}>
                    {isPhase2Identification && currentPage === 2 ? (
                      <>
                        {mpage16Json.words.slice(0, 10).map((w, i) => (
                          <React.Fragment key={i}>
                            <span
                              style={{
                                color: activeWordIndex === i ? '#A94727' : 'var(--lesson-text)',
                                background: activeWordIndex === i ? 'rgba(169, 71, 39, 0.1)' : 'transparent',
                                borderRadius: '4px',
                                padding: '0 2px',
                                transition: 'all 0.15s ease-out'
                              }}
                            >
                              {w.text}
                            </span>
                            {i < mpage16Json.words.slice(0, 10).length - 1 ? ' ' : ''}
                          </React.Fragment>
                        ))}
                      </>
                    ) : isBarrier2Mystery && currentPage === 2 ? (
                      <>
                        {mpage7Json.words.map((w, i) => (
                          <React.Fragment key={i}>
                            <span
                              style={{
                                color: activeWordIndex === i ? '#A94727' : 'var(--lesson-text)',
                                background: activeWordIndex === i ? 'rgba(169, 71, 39, 0.1)' : 'transparent',
                                borderRadius: '4px',
                                padding: '0 2px',
                                transition: 'all 0.15s ease-out'
                              }}
                            >
                              {w.text}
                            </span>
                            {i < mpage7Json.words.length - 1 ? ' ' : ''}
                          </React.Fragment>
                        ))}
                      </>
                    ) : isBarrier2GroupingMaterials && currentPage === 2 ? (
                      <>
                        {mpage22Json.words.slice(0, 31).map((w, i) => (
                          <React.Fragment key={i}>
                            <span
                              style={{
                                color: activeWordIndex === i ? '#A94727' : 'var(--lesson-text)',
                                background: activeWordIndex === i ? 'rgba(169, 71, 39, 0.1)' : 'transparent',
                                borderRadius: '4px',
                                padding: '0 2px',
                                transition: 'all 0.15s ease-out'
                              }}
                            >
                              {w.text}
                            </span>
                            {i < mpage22Json.words.slice(0, 31).length - 1 ? ' ' : ''}
                          </React.Fragment>
                        ))}
                      </>
                    ) : isAppearanceStage && currentPage === 2 ? (
                      <>
                        {mpage33Json.words.slice(0, 20).map((w, i) => (
                          <React.Fragment key={i}>
                            <span
                              style={{
                                color: activeWordIndex === i ? '#A94727' : 'var(--lesson-text)',
                                background: activeWordIndex === i ? 'rgba(169, 71, 39, 0.1)' : 'transparent',
                                borderRadius: '4px',
                                padding: '0 2px',
                                transition: 'all 0.15s ease-out'
                              }}
                            >
                              {w.text}
                            </span>
                            {i < mpage33Json.words.slice(0, 20).length - 1 ? ' ' : ''}
                          </React.Fragment>
                        ))}
                      </>
                    ) : isHardnessStage && currentPage === 2 ? (
                      <>
                        {mpage40Json.words.slice(0, 38).map((w, i) => (
                          <React.Fragment key={i}>
                            <span
                              style={{
                                color: activeWordIndex === i ? '#A94727' : 'var(--lesson-text)',
                                background: activeWordIndex === i ? 'rgba(169, 71, 39, 0.1)' : 'transparent',
                                borderRadius: '4px',
                                padding: '0 2px',
                                transition: 'all 0.15s ease-out'
                              }}
                            >
                              {w.text}
                            </span>
                            {i < mpage40Json.words.slice(0, 38).length - 1 ? ' ' : ''}
                          </React.Fragment>
                        ))}
                      </>
                    ) : isTransparencyStage && currentPage === 2 ? (
                      <>
                        {mpage46Json.words.slice(0, 26).map((w, i) => (
                          <React.Fragment key={i}>
                            <span
                              style={{
                                color: activeWordIndex === i ? '#A94727' : 'var(--lesson-text)',
                                background: activeWordIndex === i ? 'rgba(169, 71, 39, 0.1)' : 'transparent',
                                borderRadius: '4px',
                                padding: '0 2px',
                                transition: 'all 0.15s ease-out'
                              }}
                            >
                              {w.text}
                            </span>
                            {i < mpage46Json.words.slice(0, 26).length - 1 ? ' ' : ''}
                          </React.Fragment>
                        ))}
                      </>
                    ) : isSolubilityStage && currentPage === 2 ? (
                      <>
                        {mpage53Json.words.slice(0, 32).map((w, i) => (
                          <React.Fragment key={i}>
                            <span
                              style={{
                                color: activeWordIndex === i ? '#A94727' : 'var(--lesson-text)',
                                background: activeWordIndex === i ? 'rgba(169, 71, 39, 0.1)' : 'transparent',
                                borderRadius: '4px',
                                padding: '0 2px',
                                transition: 'all 0.15s ease-out'
                              }}
                            >
                              {w.text}
                            </span>
                            {i < mpage53Json.words.slice(0, 32).length - 1 ? ' ' : ''}
                          </React.Fragment>
                        ))}
                      </>
                    ) : isMassStage && currentPage === 2 ? (
                      <>
                        {mpage60Json.words.slice(0, 21).map((w, i) => (
                          <React.Fragment key={i}>
                            <span
                              style={{
                                color: activeWordIndex === i ? '#A94727' : 'var(--lesson-text)',
                                background: activeWordIndex === i ? 'rgba(169, 71, 39, 0.1)' : 'transparent',
                                borderRadius: '4px',
                                padding: '0 2px',
                                transition: 'all 0.15s ease-out'
                              }}
                            >
                              {w.text}
                            </span>
                            {i < mpage60Json.words.slice(0, 21).length - 1 ? ' ' : ''}
                          </React.Fragment>
                        ))}
                      </>
                    ) : isVolumeStage && currentPage === 2 ? (
                      <>
                        {mpage66Json.words.slice(0, 20).map((w, i) => (
                          <React.Fragment key={i}>
                            <span
                              style={{
                                color: activeWordIndex === i ? '#A94727' : 'var(--lesson-text)',
                                background: activeWordIndex === i ? 'rgba(169, 71, 39, 0.1)' : 'transparent',
                                borderRadius: '4px',
                                padding: '0 2px',
                                transition: 'all 0.15s ease-out'
                              }}
                            >
                              {w.text}
                            </span>
                            {i < mpage66Json.words.slice(0, 20).length - 1 ? ' ' : ''}
                          </React.Fragment>
                        ))}
                      </>
                    ) : (
                      data.description || "Review the handbook and proceed to the activity area to complete the required tasks for this barrier."
                    )}
                  </p>
                </div>
                
                <div className="mission-box">
                  <h3 style={{ fontSize: '32px' }}><Check size={20} color="var(--lesson-danger)" /> OBJECTIVES</h3>
                  {Array.isArray(data.objective) ? (
                    <ul style={{ margin: 0, paddingLeft: '26px', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                      {data.objective.map((obj, i) => (
                        <li key={i} style={{ fontSize: '32px', color: 'var(--lesson-text)', lineHeight: '1.45' }}>
                          {obj}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ fontSize: '32px' }}>{data.objective || "Complete the investigation."}</p>
                  )}
                </div>
                
                <div className="mission-meta">
                  <div className="meta-item">
                    <span className="meta-label" style={{ fontSize: '28px' }}>Difficulty</span>
                    <span className="meta-value" style={{ fontSize: '28px' }}>
                      {[1, 2, 3].map(star => (
                        <span key={star} className={`meta-stars ${star > (data.difficulty || 1) ? 'empty' : ''}`}>★</span>
                      ))}
                    </span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label" style={{ fontSize: '28px' }}>Est. Time</span>
                    <span className="meta-value" style={{ fontSize: '28px' }}>⏱ {data.estimatedTime || '5 minutes'}</span>
                  </div>
                </div>
              </div>

              <button className="spread-back-btn" onClick={() => setCurrentPage(1)}>
                <ArrowLeft size={20} /> Back
              </button>
              <div style={{ position: 'absolute', bottom: '18px', right: '28px', zIndex: 10000, display: 'flex', gap: '16px', alignItems: 'center' }}>
                {(isPhase2Identification || (currentPage === 2 && isBarrier2Mystery) || (currentPage === 2 && isBarrier2GroupingMaterials) || (currentPage === 2 && isAppearanceStage) || (currentPage === 2 && isHardnessStage) || (currentPage === 2 && isTransparencyStage) || (currentPage === 2 && isSolubilityStage) || (currentPage === 2 && isMassStage) || (currentPage === 2 && isVolumeStage)) && (
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
                      padding: '15px 24px',
                      borderRadius: '42px',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      boxShadow: '0 6px 20px rgba(217, 119, 6, 0.5)',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#FEF3C7'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#FEF08A'; }}
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    {isPlaying ? "Pause" : "Play"}
                  </button>
                )}
                <button className="start-btn" style={{ position: 'static', bottom: 'auto', right: 'auto' }} onClick={handleStart}>
                  Acknowledge & Begin <ArrowRight size={22} />
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
