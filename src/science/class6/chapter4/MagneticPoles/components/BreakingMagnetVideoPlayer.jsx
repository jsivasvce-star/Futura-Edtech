import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2 
} from 'lucide-react';

export default function BreakingMagnetVideoPlayer({
  videoSrc = '/MagneticPoles/breaking_magnet_demonstration.mp4',
  fallbackSrc = '/assets/WhatsApp Video 2026-09-16 at 2.06.03 PM.mp4',
  broken = false,
  showPoles = false,
  onPhaseChange,
  onExternalReset,
  autoPlay = true,
  loop = false,
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const progressScrubberRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isEnded, setIsEnded] = useState(false);
  const controlsTimeoutRef = useRef(null);
  const prevBrokenRef = useRef(broken);
  const prevShowPolesRef = useRef(showPoles);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setIsEnded(true);
    setShowControls(true);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    if (onPhaseChange) {
      onPhaseChange('dipoles', 1.0);
    }
  }, [onPhaseChange]);

  // Initialize playback and duration
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration || 22);
      if (autoPlay) {
        video.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Autoplay with audio was blocked; retry muted
          video.muted = true;
          setIsMuted(true);
          video.play().then(() => {
            setIsPlaying(true);
          }).catch(() => {});
        });
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [autoPlay]);

  // Sync external step buttons (e.g. learner clicked "1. Break" or "2. Show Poles")
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const total = video.duration || duration || 22;
    const breakTime = total * 0.33;
    const polesTime = total * 0.66;

    if (broken && !prevBrokenRef.current) {
      if (video.currentTime < breakTime) {
        video.currentTime = breakTime;
        video.play().catch(() => {});
        setIsPlaying(true);
      }
    }
    prevBrokenRef.current = broken;

    if (showPoles && !prevShowPolesRef.current) {
      if (video.currentTime < polesTime) {
        video.currentTime = polesTime;
        video.play().catch(() => {});
        setIsPlaying(true);
      }
    }
    prevShowPolesRef.current = showPoles;
  }, [broken, showPoles, duration]);

  // Auto-hide controls timer
  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) {
        setShowControls(false);
      }
    }, 2800);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      if (video.ended) {
        video.currentTime = 0;
        setIsEnded(false);
      }
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleReplay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    setIsEnded(false);
    video.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {});
    if (onExternalReset) {
      onExternalReset();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {});
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const curr = video.currentTime;
    const total = video.duration || duration || 22;

    setCurrentTime(curr);
    const progress = total > 0 ? curr / total : 0;

    if (total > 0 && onPhaseChange) {
      if (progress < 0.33) {
        onPhaseChange('intact', progress);
      } else if (progress < 0.66) {
        onPhaseChange('broken', progress);
      } else {
        onPhaseChange('dipoles', progress);
      }
    }
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    const bar = progressScrubberRef.current;
    if (!video || !bar) return;

    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const total = video.duration || duration || 22;
    video.currentTime = percentage * total;
    setCurrentTime(video.currentTime);
  };

  const formatTime = (secs) => {
    const validSecs = isNaN(secs) || secs < 0 ? 0 : Math.floor(secs);
    const m = Math.floor(validSecs / 60);
    const s = validSecs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const totalDuration = duration || 22;
  const progressPercent = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  // Determine active phase index: 1 = Whole Magnet, 2 = Break & Split, 3 = Dipoles Form
  const currentPhaseIndex = progressPercent < 33 ? 1 : progressPercent < 66 ? 2 : 3;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        if (isPlaying) setShowControls(false);
      }}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '380px',
        borderRadius: isFullscreen ? '0' : '24px',
        overflow: 'hidden',
        backgroundColor: '#070C18',
        border: isFullscreen ? 'none' : '1.5px solid #A7F3D0',
        boxShadow: isFullscreen ? 'none' : '0 12px 30px rgba(6, 78, 59, 0.16)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        boxSizing: 'border-box',
      }}
    >
      {/* HTML5 Video Element */}
      <video
        ref={videoRef}
        src={videoSrc}
        loop={false}
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => {
          setIsPlaying(true);
          setIsEnded(false);
        }}
        onPause={() => setIsPlaying(false)}
        onEnded={handleEnded}
        onClick={isEnded ? handleReplay : togglePlay}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          backgroundColor: '#070C18',
          cursor: 'pointer',
        }}
      >
        <source src={videoSrc} type="video/mp4" />
        <source src={fallbackSrc} type="video/mp4" />
        <source src="/assets/breaking_magnet.mp4" type="video/mp4" />
        Your browser does not support HTML5 video playback.
      </video>

      {/* Top HUD: Phase Badges (Pinned at top right) */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '14px',
        display: 'flex',
        alignItems: 'center',
        zIndex: 20,
        pointerEvents: 'none',
      }}>
        {/* Phase Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          borderRadius: '14px',
          padding: '4px 10px',
          boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
        }}>
          {[
            { num: 1, label: 'Whole Magnet' },
            { num: 2, label: 'Break & Split' },
            { num: 3, label: 'Dipoles Form' }
          ].map((p) => {
            const isStepActive = currentPhaseIndex === p.num;
            return (
              <span
                key={p.num}
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 900,
                  padding: '2px 8px',
                  borderRadius: '10px',
                  background: isStepActive ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' : 'transparent',
                  color: isStepActive ? '#FFFFFF' : '#94A3B8',
                  boxShadow: isStepActive ? '0 2px 8px rgba(217, 119, 6, 0.4)' : 'none',
                  transition: 'all 0.25s ease'
                }}
              >
                {p.num}. {p.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Educational Field Callouts: Visible in Phase 3 (Dipole Formation) */}
      <AnimatePresence>
        {progressPercent >= 60 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              bottom: '76px',
              left: '16px',
              right: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              pointerEvents: 'none',
              zIndex: 15,
            }}
          >
            {/* Left Piece Badge */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.88)',
              backdropFilter: 'blur(8px)',
              border: '1.5px solid #22C55E',
              borderRadius: '12px',
              padding: '6px 12px',
              boxShadow: '0 4px 14px rgba(34, 197, 94, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              textAlign: 'center',
            }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 900, color: '#4ADE80' }}>
                Left Piece
              </span>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#E2E8F0' }}>
                N (red) ── S (blue)
              </span>
            </div>

            {/* Center Monopole Concept Tag */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.88)',
              backdropFilter: 'blur(8px)',
              border: '1.5px solid #F59E0B',
              borderRadius: '12px',
              padding: '6px 14px',
              boxShadow: '0 4px 14px rgba(245, 158, 11, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              textAlign: 'center',
            }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 900, color: '#FBBF24' }}>
                Magnetic Dipoles
              </span>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#F8FAFC' }}>
                Isolated poles (monopoles) do not exist
              </span>
            </div>

            {/* Right Piece Badge */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.88)',
              backdropFilter: 'blur(8px)',
              border: '1.5px solid #22C55E',
              borderRadius: '12px',
              padding: '6px 12px',
              boxShadow: '0 4px 14px rgba(34, 197, 94, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              textAlign: 'center',
            }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 900, color: '#4ADE80' }}>
                Right Piece
              </span>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#E2E8F0' }}>
                N (red) ── S (blue)
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Large Center Replay Button Overlay (when video finishes) */}
      <AnimatePresence>
        {isEnded && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 35,
              pointerEvents: 'none',
            }}
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 350 }}
              style={{ pointerEvents: 'auto' }}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.93 }}
                onClick={handleReplay}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '16px 32px',
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  border: '3.5px solid #FFFFFF',
                  boxShadow: '0 10px 35px rgba(217, 119, 6, 0.75), 0 0 35px rgba(245, 158, 11, 0.5)',
                  cursor: 'pointer',
                  color: '#FFFFFF',
                  outline: 'none',
                }}
                title="Replay Demonstration"
              >
                <RotateCcw size={38} color="#FFFFFF" strokeWidth={2.8} />
                <span
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 900,
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                    color: '#FFFFFF',
                  }}
                >
                  Replay
                </span>
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Center Play Button Overlay (when paused mid-video) */}
      <AnimatePresence>
        {!isPlaying && !isEnded && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 25,
              pointerEvents: 'none',
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              style={{ pointerEvents: 'auto' }}
            >
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                onClick={togglePlay}
                style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  border: '3px solid rgba(255, 255, 255, 0.9)',
                  boxShadow: '0 8px 30px rgba(217, 119, 6, 0.6), 0 0 30px rgba(245, 158, 11, 0.4)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  outline: 'none',
                }}
                title="Play Demonstration"
              >
                <Play size={34} color="#FFFFFF" style={{ marginLeft: '4px' }} fill="#FFFFFF" />
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Streamlined Controls Bar */}
      <motion.div
        initial={false}
        animate={{
          opacity: showControls || !isPlaying ? 1 : 0,
          y: showControls || !isPlaying ? 0 : 15,
        }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'absolute',
          bottom: '12px',
          left: '14px',
          right: '14px',
          background: 'rgba(15, 23, 42, 0.92)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '16px',
          padding: '8px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          zIndex: 30,
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.5)',
          pointerEvents: showControls || !isPlaying ? 'auto' : 'none',
        }}
      >
        {/* Progress Scrubber Bar */}
        <div
          ref={progressScrubberRef}
          onClick={handleSeek}
          style={{
            position: 'relative',
            width: '100%',
            height: '8px',
            background: 'rgba(255, 255, 255, 0.18)',
            borderRadius: '4px',
            cursor: 'pointer',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: `${progressPercent}%`,
              background: 'linear-gradient(90deg, #38BDF8 0%, #22C55E 50%, #F59E0B 100%)',
              borderRadius: '4px',
              transition: 'width 0.1s linear',
            }}
          />
        </div>

        {/* Buttons Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Left: Play/Pause, Replay, Time */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={togglePlay}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '8px',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                cursor: 'pointer',
              }}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={16} fill="#FFFFFF" /> : <Play size={16} fill="#FFFFFF" />}
            </button>

            <button
              onClick={handleReplay}
              style={{
                background: 'transparent',
                border: 'none',
                borderRadius: '8px',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#CBD5E1',
                cursor: 'pointer',
              }}
              title="Restart Demonstration"
            >
              <RotateCcw size={16} />
            </button>

            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#E2E8F0', letterSpacing: '0.3px' }}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Right: Audio, Fullscreen */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Audio Toggle */}
            <button
              onClick={toggleMute}
              style={{
                background: 'transparent',
                border: 'none',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isMuted ? '#EF4444' : '#E2E8F0',
                cursor: 'pointer',
              }}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              style={{
                background: 'transparent',
                border: 'none',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#E2E8F0',
                cursor: 'pointer',
              }}
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
