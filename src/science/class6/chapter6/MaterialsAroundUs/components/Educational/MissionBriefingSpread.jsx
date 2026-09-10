import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Check, X, ArrowRight, ArrowLeft } from 'lucide-react';
import newChiefDetectiveImage from '../../../../../../assets/4.detective.png';
import mbDecorativeImage from '../../../../../../assets/4.MBimage.png';

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
            mix-blend-mode: multiply;
            opacity: 0.85;
            -webkit-mask-image: linear-gradient(to top left, black 50%, transparent 100%);
            mask-image: linear-gradient(to top left, black 50%, transparent 100%);
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
            font-size: 34px;
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
            color: #3b4560;
          }
          .mission-box {
            background: var(--lesson-surface);
            border: 1px solid var(--lesson-border);
            border-left: 4px solid var(--lesson-danger);
            border-radius: 12px;
            padding: 22px 26px;
            margin-bottom: 22px;
            width: 58%; /* Reduced from 100% to prevent overlap with the right-side background image */
          }
          .mission-box h3 {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 20px;
            font-weight: 700;
            color: var(--lesson-primary);
            margin: 0 0 12px 0;
            display: flex;
            align-items: center;
            gap: 10px;
            letter-spacing: 1px;
          }
          .mission-box p, .mission-box li {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 20px;
            color: var(--lesson-text);
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

          .start-btn {
            position: absolute;
            bottom: 18px;
            right: 28px;
            z-index: 10000;
            background: var(--lesson-primary);
            color: white;
            border: none;
            padding: 18px 44px;
            border-radius: 42px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 22px;
            font-weight: 700;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 14px;
            box-shadow: 0 6px 18px rgba(64,82,160,0.3);
            transition: all 0.2s;
            width: fit-content;
          }
          .start-btn:hover {
            transform: translateY(-2px);
            background: var(--lesson-primary);
          }

          .spread-back-btn {
            position: absolute;
            bottom: 18px;
            left: 24px;
            top: auto;
            z-index: 10000;
            background: var(--lesson-surface);
            border: 2px solid var(--lesson-border);
            color: var(--lesson-text);
            padding: 12px 26px;
            border-radius: 11px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 19px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 5px 14px rgba(0,0,0,0.09);
            transition: all 0.2s;
          }
          .spread-back-btn:hover {
            background: var(--lesson-surface);
            transform: translateY(-1px);
          }
        `}
      </style>

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
                  {data.dialogue || "Good morning, Detective. Headquarters has received an unusual science case. Study your investigation brief carefully before proceeding!"}
                </p>
              </motion.div>

              <button className="spread-back-btn" onClick={onBack}>
                <ArrowLeft size={20} /> Back
              </button>
              <button className="start-btn" onClick={() => setCurrentPage(2)}>
                Next <ArrowRight size={22} />
              </button>
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
                  <p style={{ fontSize: '28px' }}>{data.description || "Review the handbook and proceed to the activity area to complete the required tasks for this barrier."}</p>
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
              <button className="start-btn" onClick={handleStart}>
                Acknowledge & Begin <ArrowRight size={22} />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
