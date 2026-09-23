import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, CheckCircle, CheckCircle2, Play, Pause, Maximize2, Minimize2 } from "lucide-react";
import CinematicSkyFlightCanvas from "./CinematicSkyFlightCanvas";

export default function Stage3_Explore({ onComplete, onNext }) {
  // Two pole modes: "same" (Like Poles - Repel) or "different" (Unlike Poles - Attract & Crash)
  const [interactionMode, setInteractionMode] = useState("same");
  const [isRunning, setIsRunning] = useState(true);
  const [hasTestedSame, setHasTestedSame] = useState(false);
  const [hasTestedDifferent, setHasTestedDifferent] = useState(false);
  const [actionPopup, setActionPopup] = useState(null); // 'same' | 'different' | null

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
      gridTemplateColumns: '1fr 440px',
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

      {/* Right Side: Two Golden Containers */}
      <div className="stage-right-column" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.65rem',
        height: '100%',
        minHeight: 0,
        boxSizing: 'border-box'
      }}>
        {/* Container 1: Steps of Instructions */}
        <div className="stage-container-1" style={{
          background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)',
          border: '1.5px solid #E2E8F0',
          borderRadius: '24px',
          padding: '1.4rem 1.6rem',
          boxShadow: '0 6px 24px rgba(217, 119, 6, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem'
        }}>
          <h3 style={{ margin: 0, fontSize: '19.5px', fontWeight: 900, color: '#1E1B4B' }}>
            Steps of Instructions
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#173B5F', marginTop: '0.48rem', flexShrink: 0 }} />
              <span style={{ fontSize: '17.5px', color: '#173B5F', lineHeight: 1.45, fontWeight: 700 }}>
                Select "1. Same Poles" to observe like poles (N + N) repelling apart.
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#173B5F', marginTop: '0.48rem', flexShrink: 0 }} />
              <span style={{ fontSize: '17.5px', color: '#173B5F', lineHeight: 1.45, fontWeight: 700 }}>
                Select "2. Different Poles" to observe opposite poles (N + S) attracting together.
              </span>
            </div>
          </div>
        </div>

        {/* Container 2: Controls & Actions */}
        <div className="stage-container-2" style={{
          background: 'linear-gradient(135deg, #F3F7F9 0%, #EAF2F6 100%)',
          border: '1.5px solid #E2E8F0',
          borderRadius: '24px',
          padding: '1.4rem 1.6rem',
          boxShadow: '0 6px 24px rgba(217, 119, 6, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          flex: 1,
          minHeight: 0
        }}>
          <h3 style={{ margin: 0, fontSize: '19.5px', fontWeight: 900, color: '#1E1B4B' }}>
            Explore Controls
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {/* 1. Start / Pause Flight Animation Button */}
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="gold-glow-btn"
              style={{
                width: '100%',
                padding: '0.85rem 1rem',
                borderRadius: '16px',
                color: '#FFFFFF',
                fontWeight: 900,
                fontSize: '17.5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                transition: 'all 0.2s ease'
              }}
            >
              {isRunning ? (
                <>
                  <Pause size={20} fill="#FFFFFF" color="#FFFFFF" /> Pause Flight
                </>
              ) : (
                <>
                  <Play size={20} fill="#FFFFFF" color="#FFFFFF" /> Resume Flight Animation
                </>
              )}
            </button>

            {/* 2. Same Poles Button */}
            <button 
              onClick={() => handleSelectMode("same")} 
              className={interactionMode === "same" ? "gold-glow-btn" : ""}
              style={{ 
                width: "100%", 
                padding: "0.85rem 1.15rem",
                borderRadius: "16px",
                fontSize: "17.5px",
                fontWeight: 900,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: interactionMode === "same" 
                  ? undefined 
                  : "#FFFFFF",
                color: interactionMode === "same" ? "#FFFFFF" : "#065F46",
                border: interactionMode === "same" ? "none" : "1.5px solid #E2E8F0",
                boxShadow: interactionMode === "same" 
                  ? undefined 
                  : "0 2px 6px rgba(0,0,0,0.03)",
                transition: "all 0.2s ease"
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {hasTestedSame && <CheckCircle size={20} color={interactionMode === "same" ? "#FFFFFF" : "#059669"} />}
                🛡️ 1. Same Poles
              </span>
              <span style={{ 
                fontSize: "0.88rem", 
                fontWeight: 800, 
                background: interactionMode === "same" ? "rgba(255, 255, 255, 0.25)" : "#EAF2F6", 
                color: interactionMode === "same" ? "#FFFFFF" : "#173B5F", 
                padding: "4px 10px", 
                borderRadius: "10px" 
              }}>
                {hasTestedSame ? "Tested ✓" : "Repels Apart ⬅️ ➡️"}
              </span>
            </button>

            {/* 3. Different Poles Button */}
            <button 
              onClick={() => handleSelectMode("different")} 
              className={interactionMode === "different" ? "gold-glow-btn" : ""}
              style={{ 
                width: "100%", 
                padding: "0.85rem 1.15rem",
                borderRadius: "16px",
                fontSize: "17.5px",
                fontWeight: 900,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: interactionMode === "different" 
                  ? undefined 
                  : "#FFFFFF",
                color: interactionMode === "different" ? "#FFFFFF" : "#065F46",
                border: interactionMode === "different" ? "none" : "1.5px solid #E2E8F0",
                boxShadow: interactionMode === "different" 
                  ? undefined 
                  : "0 2px 6px rgba(0,0,0,0.03)",
                transition: "all 0.2s ease"
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {hasTestedDifferent && <CheckCircle size={20} color={interactionMode === "different" ? "#FFFFFF" : "#059669"} />}
                💥 2. Different Poles
              </span>
              <span style={{ 
                fontSize: "0.88rem", 
                fontWeight: 800, 
                background: interactionMode === "different" ? "rgba(255, 255, 255, 0.25)" : "#EAF2F6", 
                color: interactionMode === "different" ? "#FFFFFF" : "#173B5F", 
                padding: "4px 10px", 
                borderRadius: "10px" 
              }}>
                {hasTestedDifferent ? "Tested ✓" : "Attracts & Collides 💥"}
              </span>
            </button>
          </div>

          {/* Proceed to Quiz Button */}
          <button 
            onClick={handleFinish} 
            className="gold-glow-btn"
            style={{ 
              width: "100%", 
              padding: "0.85rem 1.4rem", 
              fontSize: "17.5px", 
              fontWeight: 900, 
              borderRadius: "16px", 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center", 
              gap: "0.6rem",
              marginTop: "auto",
              cursor: "pointer"
            }}
          >
            <CheckCircle2 size={22} color="#FFFFFF" /> Proceed to Quiz
          </button>
        </div>
      </div>
      
      {/* Action Pop-up Modal (Displayed before activity starts) */}
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
              transition={{ type: 'spring', bounce: 0.5, duration: 0.6 }}
              style={{
                background: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                borderRadius: '24px',
                padding: '2.4rem 2.6rem',
                maxWidth: '500px',
                width: '90%',
                boxShadow: '0 12px 40px rgba(69, 26, 3, 0.2)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.35rem',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}
            >
              <div style={{ 
                width: '68px', 
                height: '68px', 
                background: actionPopup === 'same' ? '#DCFCE7' : '#FEE2E2', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                border: `2px solid ${actionPopup === 'same' ? '#86EFAC' : '#FECACA'}`,
                fontSize: '2.2rem'
              }}>
                {actionPopup === 'same' ? '🟢' : '💥'}
              </div>
              
              <h3 style={{ 
                margin: 0, 
                color: actionPopup === 'same' ? '#064E3B' : '#991B1B', 
                fontSize: '1.55rem', 
                fontWeight: 900 
              }}>
                {actionPopup === 'same' ? 'Same Poles (Repulsion)' : 'Different Poles (Attraction)'}
              </h3>
              
              <p style={{ 
                margin: 0, 
                color: '#065F46', 
                fontSize: '1.2rem', 
                fontWeight: 700, 
                lineHeight: 1.6 
              }}>
                {actionPopup === 'same' 
                  ? '🟢 SAME POLES: Flights approach from left & right — Like poles (N + N) repel, executing left & right cross-turns!' 
                  : '💥 DIFFERENT POLES: In-line flight from left to right — Opposite poles (N + S) attract in a straight line!'}
              </p>
              
              <button
                onClick={handleConfirmPopup}
                className="gold-glow-btn"
                style={{
                  marginTop: '0.5rem',
                  padding: '0.9rem 3.2rem',
                  borderRadius: '25px',
                  fontSize: '1.15rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.55rem'
                }}
              >
                OK <CheckCircle2 size={20} color="#FFFFFF" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
