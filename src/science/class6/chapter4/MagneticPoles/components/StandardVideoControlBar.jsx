import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  MoreVertical, 
  Check, 
  RotateCcw,
  Repeat
} from 'lucide-react';

export default function StandardVideoControlBar({
  isPlaying = false,
  onTogglePlay,
  currentTime = 0,
  duration = 0,
  onSeek,
  isMuted = false,
  onToggleMute,
  isFullscreen = false,
  onToggleFullscreen,
  playbackRate = 1,
  onChangePlaybackRate,
  isLooping = false,
  onToggleLoop,
  showControls = true,
  onUserInteraction,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [menuView, setMenuView] = useState('main'); // 'main' | 'speed'
  const menuRef = useRef(null);
  const scrubberRef = useRef(null);
  const [isHoveringScrubber, setIsHoveringScrubber] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
        setMenuView('main');
      }
    };
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;

  const handleScrubberSeek = (e) => {
    if (!scrubberRef.current || duration <= 0) return;
    const rect = scrubberRef.current.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const targetTime = (clickX / rect.width) * duration;
    if (onSeek) onSeek(targetTime);
    if (onUserInteraction) onUserInteraction();
  };

  const handleMouseDown = (e) => {
    setIsScrubbing(true);
    handleScrubberSeek(e);

    const handleMouseMove = (moveEvent) => {
      handleScrubberSeek(moveEvent);
    };

    const handleMouseUp = () => {
      setIsScrubbing(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  return (
    <motion.div
      initial={false}
      animate={{ 
        opacity: showControls || !isPlaying || showMenu ? 1 : 0, 
        y: showControls || !isPlaying || showMenu ? 0 : 8 
      }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.55) 60%, transparent 100%)',
        padding: '16px 14px 8px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        zIndex: 35,
        pointerEvents: showControls || !isPlaying || showMenu ? 'auto' : 'none',
        userSelect: 'none',
        fontFamily: "'Inter', 'Outfit', system-ui, -apple-system, sans-serif"
      }}
    >
      {/* Top Controls Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '0 4px'
      }}>
        {/* Left Side: Play/Pause and Time Counter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => {
              if (onTogglePlay) onTogglePlay();
              if (onUserInteraction) onUserInteraction();
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              outline: 'none',
              transition: 'transform 0.15s ease, opacity 0.15s ease',
              opacity: 0.95
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.95'}
            title={isPlaying ? 'Pause' : 'Play'}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? (
              <Pause size={20} fill="#FFFFFF" color="#FFFFFF" strokeWidth={0} />
            ) : (
              <Play size={20} fill="#FFFFFF" color="#FFFFFF" strokeWidth={0} style={{ marginLeft: '1px' }} />
            )}
          </button>

          <span style={{
            fontSize: '13.5px',
            fontWeight: 500,
            color: '#FFFFFF',
            letterSpacing: '0.3px',
            whiteSpace: 'nowrap'
          }}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        {/* Right Side: Audio, Fullscreen, Overflow Options */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', position: 'relative' }}>
          {/* Audio Mute/Unmute */}
          <button
            onClick={() => {
              if (onToggleMute) onToggleMute();
              if (onUserInteraction) onUserInteraction();
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              outline: 'none',
              opacity: 0.95,
              transition: 'opacity 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.95'}
            title={isMuted ? 'Unmute' : 'Mute'}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX size={20} color="#FFFFFF" />
            ) : (
              <Volume2 size={20} color="#FFFFFF" />
            )}
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={() => {
              if (onToggleFullscreen) onToggleFullscreen();
              if (onUserInteraction) onUserInteraction();
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              outline: 'none',
              opacity: 0.95,
              transition: 'opacity 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.95'}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? (
              <Minimize2 size={19} color="#FFFFFF" />
            ) : (
              <Maximize2 size={19} color="#FFFFFF" />
            )}
          </button>

          {/* Overflow Menu Button */}
          <div style={{ position: 'relative' }} ref={menuRef}>
            <button
              onClick={() => {
                setShowMenu(prev => !prev);
                setMenuView('main');
                if (onUserInteraction) onUserInteraction();
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#FFFFFF',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                outline: 'none',
                opacity: 0.95,
                transition: 'opacity 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.95'}
              title="More options"
              aria-label="More options"
            >
              <MoreVertical size={20} color="#FFFFFF" />
            </button>

            {/* Overflow Dropdown Popup */}
            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 10 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: 'absolute',
                    bottom: 'calc(100% + 12px)',
                    right: 0,
                    width: '180px',
                    background: 'rgba(15, 23, 42, 0.96)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                    padding: '6px',
                    zIndex: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    boxSizing: 'border-box'
                  }}
                >
                  {menuView === 'main' ? (
                    <>
                      {/* Playback Speed item */}
                      <button
                        onClick={() => setMenuView('speed')}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#FFFFFF',
                          padding: '8px 10px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '13px',
                          fontWeight: 500,
                          textAlign: 'left',
                          transition: 'background 0.15s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <span>Playback Speed</span>
                        <span style={{ color: '#94A3B8', fontSize: '12px' }}>
                          {playbackRate === 1 ? 'Normal' : `${playbackRate}x`} ›
                        </span>
                      </button>

                      {/* Loop Video item */}
                      <button
                        onClick={() => {
                          if (onToggleLoop) onToggleLoop();
                        }}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#FFFFFF',
                          padding: '8px 10px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '13px',
                          fontWeight: 500,
                          textAlign: 'left',
                          transition: 'background 0.15s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Repeat size={14} color="#94A3B8" /> Loop
                        </span>
                        {isLooping && <Check size={14} color="#38BDF8" />}
                      </button>

                      {/* Restart Video item */}
                      <button
                        onClick={() => {
                          if (onSeek) onSeek(0);
                          setShowMenu(false);
                        }}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#FFFFFF',
                          padding: '8px 10px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '13px',
                          fontWeight: 500,
                          textAlign: 'left',
                          transition: 'background 0.15s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <RotateCcw size={14} color="#94A3B8" /> Restart Video
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Sub-menu: Speed Selection */}
                      <div style={{
                        padding: '4px 8px 6px 8px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <button
                          onClick={() => setMenuView('main')}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#94A3B8',
                            fontSize: '12px',
                            cursor: 'pointer',
                            padding: 0
                          }}
                        >
                          ‹ Back
                        </button>
                        <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>Playback Speed</span>
                      </div>

                      {speedOptions.map((spd) => (
                        <button
                          key={spd}
                          onClick={() => {
                            if (onChangePlaybackRate) onChangePlaybackRate(spd);
                            setShowMenu(false);
                            setMenuView('main');
                          }}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#FFFFFF',
                            padding: '6px 10px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: '12.5px',
                            fontWeight: playbackRate === spd ? 700 : 400,
                            textAlign: 'left',
                            transition: 'background 0.15s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                          <span>{spd === 1 ? '1x (Normal)' : `${spd}x`}</span>
                          {playbackRate === spd && <Check size={14} color="#38BDF8" />}
                        </button>
                      ))}
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom Scrubber Bar (Matching reference image: horizontal white bar across bottom) */}
      <div
        ref={scrubberRef}
        onMouseDown={handleMouseDown}
        onMouseEnter={() => setIsHoveringScrubber(true)}
        onMouseLeave={() => setIsHoveringScrubber(false)}
        style={{
          position: 'relative',
          width: '100%',
          height: isHoveringScrubber || isScrubbing ? '6px' : '4px',
          background: 'rgba(255, 255, 255, 0.35)',
          borderRadius: '2px',
          cursor: 'pointer',
          overflow: 'hidden',
          transition: 'height 0.15s ease',
          marginTop: '4px'
        }}
        title="Seek"
      >
        {/* Played Progress Bar (Solid Crisp White) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: `${progressPercent}%`,
            background: '#FFFFFF',
            borderRadius: '2px',
            boxShadow: '0 0 4px rgba(255, 255, 255, 0.5)',
            transition: isScrubbing ? 'none' : 'width 0.08s linear'
          }}
        />
      </div>
    </motion.div>
  );
}
