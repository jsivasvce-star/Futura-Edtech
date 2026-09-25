import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, CheckCircle, CheckCircle2, Play, Pause, Sparkles, Maximize2, Minimize2 } from "lucide-react";
import CinematicSkyFlightCanvas from "./CinematicSkyFlightCanvas";

export default function Stage3_Explore({ onComplete, onNext }) {
  // Two pole modes: "same" (Like Poles - Repel) or "different" (Unlike Poles - Attract & Crash)
  const [interactionMode, setInteractionMode] = useState("same");
  const [isRunning, setIsRunning] = useState(true);
  const [hasTestedSame, setHasTestedSame] = useState(false);
  const [hasTestedDifferent, setHasTestedDifferent] = useState(false);
  const [actionPopup, setActionPopup] = useState(null); // 'same' | 'different' | null
  const [environmentMode, setEnvironmentMode] = useState("day"); // 'day' | 'night'

  const polesMatch = interactionMode === "same";

  // When clicking a poles button, show the popup BEFORE the activity starts
  const handleSelectMode = (mode) => {
    setActionPopup(mode);
  };

  // Confirm popup: close popup and start the activity with the selected mode
  const handleConfirmPopup = () => {
    if (actionPopup === "same") {
      setInteractionMode("same");
      setHasTestedSame(true);
      setIsRunning(true);
    } else if (actionPopup === "different") {
      setInteractionMode("different");
      setHasTestedDifferent(true);
      setIsRunning(true);
    }
    setActionPopup(null);
  };

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleFinish = () => {
    onComplete();
    onNext();
  };

  return (
    <div style={{ 
      padding: '0.5rem 1rem', 
      display: 'grid', 
      gridTemplateColumns: '1fr 500px',
      gap: '1.25rem', 
      height: '100%', 
      minHeight: 0, 
      overflow: 'hidden', 
      boxSizing: 'border-box',
      background: 'transparent',
      position: 'relative'
    }}>
      {/* Left Side: Maximized Flight Simulation Canvas */}
      <div style={{ display: "flex", flexDirection: "column", height: '100%', minHeight: 0, width: '100%' }}>
        {/* Full-Height Flight Simulation Canvas */}
        <div style={{ 
          position: "relative", 
          width: "100%", 
          height: "100%",
          flex: 1, 
          minHeight: 0, 
          background: "#020617", 
          border: "1.5px solid #A7F3D0",
          borderRadius: "24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          boxShadow: "0 10px 35px rgba(6, 78, 59, 0.15)"
        }}>
          <CinematicSkyFlightCanvas 
            interactionMode={interactionMode}
            isRunning={isRunning}
            polesMatch={polesMatch}
            environmentMode={environmentMode}
          />

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            style={{
              position: 'absolute',
              top: 14,
              right: 14,
              zIndex: 40,
              background: 'rgba(255, 255, 255, 0.92)',
              border: '1.5px solid rgba(255, 255, 255, 0.85)',
              borderRadius: '12px',
              padding: '6px 12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              color: '#0F172A',
              fontSize: '0.85rem',
              fontWeight: 800,
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
              transition: 'all 0.2s ease',
            }}
          >
            {isFullscreen ? <Minimize2 size={15} color="#0F172A" /> : <Maximize2 size={15} color="#0F172A" />}
            <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>
        </div>
      </div>

      {/* Right Side: Two Cards matching Reference Layout */}
      <div className="stage-right-column" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0.85rem',
        height: 'fit-content',
        maxHeight: '100%',
        minHeight: 0,
        boxSizing: 'border-box'
      }}>
        {/* Card 1: Steps of Instructions */}
        <div className="stage-container-1" style={{
          background: '#FFFDF5',
          border: '1.5px solid #0A2540',
          borderRadius: '24px',
          padding: '1.25rem 1.45rem',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.95rem',
          height: 'fit-content',
          flexShrink: 0
        }}>
          <h3 style={{ margin: 0, fontSize: '28px', fontWeight: 900, color: '#0A2540', textAlign: 'center' }}>
            Steps of Instructions
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="gold-step-badge" style={{ width: '40px', height: '40px', fontSize: '22px' }}>
                1
              </div>
              <span style={{ fontSize: '26px', color: '#0A2540', lineHeight: 1.35, fontWeight: 800 }}>
                Select 'Same Poles'.
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="gold-step-badge" style={{ width: '40px', height: '40px', fontSize: '22px' }}>
                2
              </div>
              <span style={{ fontSize: '26px', color: '#0A2540', lineHeight: 1.35, fontWeight: 800 }}>
                Observe like poles (N + N) repel.
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="gold-step-badge" style={{ width: '40px', height: '40px', fontSize: '22px' }}>
                3
              </div>
              <span style={{ fontSize: '26px', color: '#0A2540', lineHeight: 1.35, fontWeight: 800 }}>
                Select 'Different Poles'.
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="gold-step-badge" style={{ width: '40px', height: '40px', fontSize: '22px' }}>
                4
              </div>
              <span style={{ fontSize: '26px', color: '#0A2540', lineHeight: 1.35, fontWeight: 800 }}>
                Observe opposite poles (N + S) attract.
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Explore Controls */}
        <div className="stage-container-2" style={{
          background: '#FFFFFF',
          border: '1.5px solid #0A2540',
          borderRadius: '24px',
          padding: '1.25rem 1.45rem',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.95rem',
          height: 'fit-content',
          flexShrink: 0
        }}>
          <h3 style={{ margin: 0, fontSize: '28px', fontWeight: 900, color: '#0A2540', textAlign: 'center' }}>
            Explore Controls
          </h3>

          {/* Top Action: Pause Flight Button */}
          <button
            onClick={() => setIsRunning(!isRunning)}
            style={{
              width: '100%',
              padding: '0.85rem 1rem',
              borderRadius: '14px',
              background: '#D97706',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '22px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.65rem',
              border: 'none',
              boxShadow: '0 4px 12px rgba(217, 119, 6, 0.25)',
              transition: 'all 0.2s ease'
            }}
          >
            {isRunning ? (
              <>
                <Pause size={22} fill="#FFFFFF" color="#FFFFFF" /> Pause Flight
              </>
            ) : (
              <>
                <Play size={22} fill="#FFFFFF" color="#FFFFFF" /> Resume Flight
              </>
            )}
          </button>

          {/* Section 1: Explore Same and Different Poles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <div style={{ textAlign: 'center', fontWeight: 800, fontSize: '22px', color: '#0A2540' }}>
              Explore Same and Different Poles
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem'
            }}>
              <button 
                onClick={() => handleSelectMode("same")}
                style={{ 
                  padding: "0.75rem 0.9rem",
                  borderRadius: "14px",
                  fontSize: "20px",
                  fontWeight: 800,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: interactionMode === "same" ? "#D97706" : "#0B2240",
                  color: "#FFFFFF",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(217, 119, 6, 0.25)",
                  transition: "all 0.2s ease"
                }}
              >
                Same Poles
              </button>

              <button 
                onClick={() => handleSelectMode("different")}
                style={{ 
                  padding: "0.75rem 0.9rem",
                  borderRadius: "14px",
                  fontSize: "20px",
                  fontWeight: 800,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: interactionMode === "different" ? "#D97706" : "#0B2240",
                  color: "#FFFFFF",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(11, 34, 64, 0.25)",
                  transition: "all 0.2s ease"
                }}
              >
                Different Poles
              </button>
            </div>
          </div>

          {/* Section 2: Explore Day and Night */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <div style={{ textAlign: 'center', fontWeight: 800, fontSize: '22px', color: '#0A2540' }}>
              Explore Day and Night
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem'
            }}>
              <button
                onClick={() => setEnvironmentMode('day')}
                style={{
                  padding: '0.75rem 0.9rem',
                  borderRadius: '14px',
                  fontSize: '20px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: environmentMode === 'day' ? '#D97706' : '#0B2240',
                  color: '#FFFFFF',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(217, 119, 6, 0.25)',
                  transition: 'all 0.2s ease'
                }}
              >
                Day
              </button>
              <button
                onClick={() => setEnvironmentMode('night')}
                style={{
                  padding: '0.75rem 0.9rem',
                  borderRadius: '14px',
                  fontSize: '20px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: environmentMode === 'night' ? '#D97706' : '#0B2240',
                  color: '#FFFFFF',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(11, 34, 64, 0.25)',
                  transition: 'all 0.2s ease'
                }}
              >
                Night
              </button>
            </div>
          </div>

          {/* Bottom Primary CTA: Proceed to Quiz Button (Dark Blue #0A1931 with subtle shimmer) */}
          <button 
            onClick={handleFinish} 
            className="navy-btn"
            style={{ 
              width: "100%", 
              padding: "0.85rem 1.4rem", 
              fontSize: "22px", 
              fontWeight: 900, 
              borderRadius: "14px", 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              border: "1.5px solid #1E3A8A", 
              boxShadow: "0 4px 14px rgba(10, 25, 49, 0.35)", 
              cursor: "pointer", 
              transition: "all 0.2s ease" 
            }} 
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <CheckCircle2 size={24} color="#FFFFFF" strokeWidth={2.5} />
              <span>Proceed to Quiz</span>
            </div>
            <Sparkles size={24} color="#FFFFFF" fill="#FFFFFF" style={{ opacity: 0.9 }} />
          </button>
        </div>
      </div>
      
      {/* Action Pop-up Modal (Substantially Enlarged) */}
      <AnimatePresence>
        {actionPopup !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(2, 6, 23, 0.65)',
              zIndex: 100,
              backdropFilter: 'blur(6px)'
            }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ type: 'spring', bounce: 0.45, duration: 0.55 }}
              style={{
                background: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                borderRadius: '28px',
                padding: '3rem 3.2rem',
                maxWidth: '620px',
                width: '92%',
                boxShadow: '0 20px 50px rgba(15, 23, 42, 0.25)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.45rem',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}
            >
              <div style={{ 
                width: '84px', 
                height: '84px', 
                background: actionPopup === 'same' ? '#DCFCE7' : '#FEE2E2', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                border: `2.5px solid ${actionPopup === 'same' ? '#86EFAC' : '#FECACA'}`,
                fontSize: '2.6rem'
              }}>
                {actionPopup === 'same' ? '🟢' : '💥'}
              </div>
              
              <h3 style={{ 
                margin: 0, 
                color: actionPopup === 'same' ? '#064E3B' : '#991B1B', 
                fontSize: '2rem', 
                fontWeight: 900 
              }}>
                {actionPopup === 'same' ? 'Same Poles (Repulsion)' : 'Different Poles (Attraction)'}
              </h3>
              
              <p style={{ 
                margin: 0, 
                color: '#334155', 
                fontSize: '1.4rem', 
                fontWeight: 700, 
                lineHeight: 1.65 
              }}>
                {actionPopup === 'same' 
                  ? '🟢 SAME POLES: Flights approach from left & right — Like poles (N + N) repel, executing left & right cross-turns!' 
                  : '💥 DIFFERENT POLES: In-line flight from left to right — Opposite poles (N + S) attract in a straight line!'}
              </p>
              
              <button
                onClick={handleConfirmPopup}
                className="gold-glow-btn"
                style={{
                  marginTop: '0.6rem',
                  padding: '1rem 3.8rem',
                  borderRadius: '25px',
                  fontSize: '1.3rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem'
                }}
              >
                OK <CheckCircle2 size={22} color="#FFFFFF" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
