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

export default function RingMagnetVideoPlayer({
  videoSrc = '/assets/stage3_ringmagnet.mp4',
  fallbackSrc = '/assets/stage3_ringmagnet.mp4',
  externalIsPaused = false,
  onExternalTogglePause,
  onExternalReset,
  onPhaseChange,
  currentStep = 'sprinkle',
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

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setIsEnded(true);
    setShowControls(true);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  // Sync with external paused state
  useEffect(() => {
    if (!videoRef.current) return;
    if (externalIsPaused) {
      if (!videoRef.current.paused) {
        videoRef.current.pause();
      }
    } else {
      if (videoRef.current.paused && !isEnded) {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      }
    }
  }, [externalIsPaused, isEnded]);

  // Autoplay and duration setup
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration || 29);
      if (autoPlay && !externalIsPaused) {
        video.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Autoplay with audio was blocked; fallback to muted autoplay
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
        if (onExternalTogglePause && externalIsPaused) {
          onExternalTogglePause();
        }
      }).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
      if (onExternalTogglePause && !externalIsPaused) {
        onExternalTogglePause();
      }
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
    const total = video.duration || duration || 29;

    setCurrentTime(curr);
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    const bar = progressScrubberRef.current;
    const total = video?.duration || duration || 29;
    if (!video || !bar || total <= 0) return;

    const rect = bar.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const newRatio = clickX / rect.width;
    const targetTime = newRatio * total;
    video.currentTime = targetTime;
    setCurrentTime(targetTime);
  };

  const formatTime = (secs) => {
    const validSecs = isNaN(secs) || secs < 0 ? 0 : Math.floor(secs);
    const m = Math.floor(validSecs / 60);
    const s = validSecs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const totalDuration = duration || 29;
  const progressPercent = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  // Determine active phase index: 1 = Sprinkle, 2 = Tap & Align, 3 = Circular Poles
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
        <source src="/assets/stage3_ringmagnet.mp4" type="video/mp4" />
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
            { num: 1, label: 'Sprinkle' },
            { num: 2, label: 'Tap & Align' },
            { num: 3, label: 'Circular Poles' }
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
                  background: isStepActive ? 'linear-gradient(135deg, #214A70 0%, #173B5F 100%)' : 'transparent',
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

      {/* Scientific Field Annotations HUD (Displays when in Phase 3) */}
      <AnimatePresence>
        {progressPercent >= 55 && (
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
            {/* Top Face Badge */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.88)',
              backdropFilter: 'blur(8px)',
              border: '1.5px solid #38BDF8',
              borderRadius: '12px',
              padding: '6px 12px',
              boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              textAlign: 'center',
            }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 900, color: '#38BDF8' }}>
                Circular Face
              </span>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#E2E8F0' }}>
                Strong Magnetic Attraction
              </span>
            </div>

            {/* Center Hole Tag */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.88)',
              backdropFilter: 'blur(8px)',
              border: '1.5px solid #214A70',
              borderRadius: '12px',
              padding: '6px 14px',
              boxShadow: '0 4px 14px rgba(245, 158, 11, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              textAlign: 'center',
            }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 900, color: '#214A70' }}>
                Center Hole
              </span>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#F8FAFC' }}>
                Zero force — no filings gather in opening
              </span>
            </div>

            {/* Opposite Face Badge */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.88)',
              backdropFilter: 'blur(8px)',
              border: '1.5px solid #38BDF8',
              borderRadius: '12px',
              padding: '6px 12px',
              boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              textAlign: 'center',
            }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 900, color: '#38BDF8' }}>
                Opposite Face
              </span>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#E2E8F0' }}>
                Opposite Magnetic Pole
              </span>
            </div>
          </motion.div>
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
                  background: 'linear-gradient(135deg, #214A70 0%, #173B5F 100%)',
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
                <Play size={34} color="#FFFFFF" fill="#FFFFFF" style={{ marginLeft: '4px' }} />
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
              background: 'linear-gradient(90deg, #38BDF8 0%, #22C55E 50%, #214A70 100%)',
              borderRadius: '4px',
              transition: 'width 0.1s linear',
            }}
          />
        </div>

        {/* Buttons Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Left: Play/Pause, Replay, Time */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={togglePlay}
              style={{
                background: 'rgba(255, 255, 255, 0.22)',
                border: '1.5px solid rgba(255, 255, 255, 0.45)',
                borderRadius: '8px',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
              }}
              title={isPlaying ? 'Pause (⏸)' : 'Play / Start (▶)'}
              aria-label={isPlaying ? 'Pause video' : 'Play / Start video'}
            >
              {isPlaying ? (
                <Pause size={17} fill="#FFFFFF" color="#FFFFFF" strokeWidth={0} />
              ) : (
                <Play size={17} fill="#FFFFFF" color="#FFFFFF" strokeWidth={0} style={{ marginLeft: '2px' }} />
              )}
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
                transition: 'all 0.15s ease',
              }}
              title="Restart Demonstration (↺)"
              aria-label="Restart demonstration"
            >
              <RotateCcw size={16} />
            </button>

            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#E2E8F0', letterSpacing: '0.3px', userSelect: 'none', marginLeft: '2px' }}>
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
