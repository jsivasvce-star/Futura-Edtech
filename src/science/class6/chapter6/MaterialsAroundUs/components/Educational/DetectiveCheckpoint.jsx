import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ShieldAlert, Check, X, ArrowRight, ArrowLeft, CheckCircle2, ClipboardList, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import newChiefDetectiveImage from '../../../../../../assets/4.detective.png';

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
      fontFamily: '"Times New Roman", serif',
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
          font-family: Arial, Helvetica, sans-serif;
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
          font-family: Arial, Helvetica, sans-serif;
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
          font-family: Arial, Helvetica, sans-serif;
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
            <p style={{ margin: 0, fontSize: '28px', fontWeight: '500', color: 'var(--lesson-muted)', fontFamily: 'Arial, Helvetica, sans-serif' }}>
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
              <p style={{ margin: 0, fontSize: '28px', color: 'var(--lesson-text)', lineHeight: '1.45', fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                {data.dialogue || "Well done, detective! You've explored the Barrier. Now let's verify your understanding and log our discoveries."}
              </p>
              <p style={{ margin: 0, fontSize: '28px', color: 'var(--lesson-secondary)', lineHeight: '1.45', fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                Answer each question carefully. Correct answers will be added to our Case Log.
              </p>
            </div>
          </motion.div>

          {onBack && (
            <button className="spread-back-btn" onClick={onBack}>
              <ArrowLeft size={20} /> Back
            </button>
          )}
          <button className="start-btn" onClick={() => setCurrentPage(2)}>
            Next <ArrowRight size={22} />
          </button>
        </div>
      )}

      {/* Page 2: Quiz Interface */}
      {currentPage === 2 && (
        <div style={{ background: '#f6f1e4', display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%', width: '100%', position: 'relative' }}>

          <button className="spread-back-btn" style={{ bottom: '18px', left: '24px', zIndex: 1000 }} onClick={() => setCurrentPage(1)}>
            <ArrowLeft size={20} /> Back
          </button>
          
          <button 
            className="start-btn" 
            style={{ bottom: '18px', right: '28px', zIndex: 1000 }} 
            onClick={() => { if (onProceed) onProceed(); }}
          >
            Next <ArrowRight size={22} />
          </button>

          {/* Header */}
          <div style={{ padding: '2rem 2.5rem', borderBottom: '1px solid var(--lesson-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ background: '#FFFFFF', padding: '10px', borderRadius: '12px', color: 'var(--lesson-primary)' }}>
                <ShieldAlert size={34} />
              </div>
              <div>
                <h1 className="mission-title" style={{ fontSize: '42px', margin: 0, marginBottom: '8px' }}>
                  {data.title || "Detective Checkpoint"}
                </h1>
                <p style={{ margin: 0, fontSize: '24px', fontWeight: '500', color: 'var(--lesson-muted)', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                  Verify your understanding to record our findings.
                </p>
              </div>
            </div>
          </div>

        {/* Content */}
        {!quizComplete ? (
          <div style={{ padding: '2rem', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--lesson-secondary)', fontWeight: '600' }}>Question {currentQ + 1} of {data.questions.length}</span>
              <div style={{ flex: 1, height: '6px', background: 'var(--lesson-border)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', background: '#A64B27', width: `${((currentQ + 1) / data.questions.length) * 100}%`, transition: 'width 0.3s ease' }} />
              </div>
            </div>

            <h3 style={{ margin: '0 0 2rem 0', fontSize: 'clamp(28px, 3.5vw, 32px)', fontWeight: '700', color: 'var(--lesson-text)', display: 'flex', gap: '12px', fontFamily: 'Arial, Helvetica, sans-serif' }}>
              <div style={{ background: 'var(--lesson-primary)', color: 'white', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.2rem' }}>
                Q
              </div>
              {q.question}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '40px' }}>
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
                      padding: '1.2rem 1.5rem', borderRadius: '12px',
                      background: bg, border: border,
                      cursor: isVerified ? 'default' : 'pointer',
                      textAlign: 'left', transition: 'all 0.2s',
                      boxShadow: isSelected && !isVerified ? '0 4px 12px rgba(0,0,0,0.08)' : 'none'
                    }}
                  >
                    <div style={{ width: '34px', height: '34px', borderRadius: '50%', border: `2px solid ${iconColor}`, color: iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.1rem', flexShrink: 0 }}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span style={{ fontSize: 'clamp(22px, 3vw, 26px)', fontWeight: '500', color: 'var(--lesson-text)', flex: 1, fontFamily: 'Arial, Helvetica, sans-serif' }}>{opt}</span>
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
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {isVerified ? (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', background: isCorrect ? 'var(--lesson-success-bg)' : 'var(--lesson-danger-bg)', padding: '1.25rem 1.5rem', borderRadius: '12px', border: `1px solid ${isCorrect ? 'var(--lesson-success-border)' : 'var(--lesson-danger-border)'}` }}>
                  <div style={{ background: isCorrect ? '#A64B27' : 'var(--lesson-danger)', color: 'white', padding: '8px', borderRadius: '50%', flexShrink: 0, marginTop: '2px' }}>
                    {isCorrect ? <Check size={20} strokeWidth={3} /> : <X size={20} strokeWidth={3} />}
                  </div>
                  <div style={{ width: '100%' }}>
                    <div style={{ fontSize: 'clamp(18px, 2.5vw, 21px)', fontWeight: '800', color: isCorrect ? '#A64B27' : '#991b1b', marginBottom: '4px' }}>
                      {isCorrect ? '✓ Correct! Great job, Detective.' : '✕ Not quite.'}
                    </div>
                    
                    {!isCorrect && (
                      <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ fontSize: 'clamp(18px, 2.5vw, 21px)', color: '#991b1b' }}>
                          <span style={{ fontWeight: '500' }}>Correct answer:</span> <span style={{ fontWeight: '800' }}>{q.options[q.correct]}</span>
                        </div>
                        <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--lesson-danger)', marginTop: '8px' }}>
                          Why?
                        </div>
                        <div style={{ fontSize: '17px', fontWeight: '500', color: '#991b1b', lineHeight: '1.5' }}>
                          {q.explanation || "Please review the properties of materials again."}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div style={{ flex: 1 }}>
                  {!showHint ? (
                    <button
                      onClick={() => setShowHint(true)}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.75rem 1.25rem', borderRadius: '8px', border: '1px solid var(--lesson-border)', background: 'white', color: 'var(--lesson-muted)', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
                    >
                      <Lightbulb size={18} /> Need a hint?
                    </button>
                  ) : (
                    <div style={{ background: 'var(--lesson-warning-bg)', border: '1px solid var(--lesson-warning-bg)', padding: '0.75rem 1.25rem', borderRadius: '8px', color: 'var(--lesson-primary)', fontSize: 'clamp(17px, 2.5vw, 21px)', fontWeight: '600', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <Lightbulb size={18} color="#A64B27" style={{ flexShrink: 0, marginTop: '2px' }} />
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
          <div style={{ padding: '3rem', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', background: '#A64B27', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'white' }}>
              <CheckCircle2 size={48} />
            </div>
            <h2 style={{ color: 'var(--lesson-text)', margin: '0 0 1rem 0', fontSize: 'clamp(30px, 3.5vw, 36px)', fontWeight: '900' }}>Checkpoint Complete!</h2>
            <p style={{ color: 'var(--lesson-secondary)', fontSize: 'clamp(18px, 2.5vw, 21px)', fontWeight: '600', maxWidth: '400px', marginBottom: '2rem' }}>
              Excellent work! All discoveries have been securely logged to the Case File.
              <br/><br/>
              <span style={{ fontSize: '0.9rem', color: 'var(--lesson-muted)' }}>Click "Next" in the bottom right corner to continue.</span>
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
              background: 'rgba(255, 255, 255, 0.98)',
              border: '2px solid var(--lesson-border)',
              borderRadius: '20px',
              padding: '2.5rem',
              maxWidth: '680px',
              width: '90%',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              textAlign: 'center'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--lesson-primary)' }}>
              <ClipboardList size={40} />
            </div>
            <h2 style={{ margin: '0 0 0.5rem 0', color: 'var(--lesson-text)', fontSize: '2rem', fontWeight: 800 }}>✓ CASE LOG UPDATED</h2>
            <p style={{ margin: '0 0 2rem 0', color: 'var(--lesson-secondary)', fontSize: '1.2rem', fontWeight: 600 }}>
              Checkpoint completed. Your findings have been securely recorded.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left', marginBottom: '2.5rem' }}>
              {data.discoveries.map((discovery, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '12px', fontSize: '20px', fontWeight: 600, color: 'var(--lesson-text)', lineHeight: '1.5', background: '#f6f1e4', padding: '1.2rem', borderRadius: '12px', border: '1px solid var(--lesson-border)' }}>
                  <div style={{ color: 'var(--lesson-primary)', flexShrink: 0, marginTop: '2px' }}><CheckCircle2 size={24} /></div>
                  <div>{discovery}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowCaseLog(false)}
              style={{
                background: 'var(--lesson-primary)',
                color: '#FFFFFF',
                border: 'none',
                padding: '1rem 3rem',
                borderRadius: '10px',
                fontSize: '20px',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'background 0.2s',
                boxShadow: '0 4px 6px -1px rgba(64, 82, 160, 0.3)'
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
