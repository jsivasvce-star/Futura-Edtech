import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  Repeat, 
  Sparkles, 
  Layers
} from 'lucide-react';

export default function MagneticPolesVideoPlayer({
  videoSrc = '/MagneticPoles/iron_filings_demonstration.mp4',
  fallbackSrc = '/assets/When_the_iron_filings_are_spri.mp4',
  externalIsPaused = false,
  onExternalTogglePause,
  onExternalReset,
  onPhaseChange,
  currentStep = 'sprinkle',
  autoPlay = true,
  loop = true,
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const progressScrubberRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(loop);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [isEnded, setIsEnded] = useState(false);
  const controlsTimeoutRef = useRef(null);

  // Sync with external paused state from Stage 1 control panel
  useEffect(() => {
    if (!videoRef.current) return;
    if (externalIsPaused && !videoRef.current.paused) {
      videoRef.current.pause();
    } else if (!externalIsPaused && videoRef.current.paused && isPlaying) {
      videoRef.current.play().catch(() => {});
    }
  }, [externalIsPaused, isPlaying]);

  // Initial autoplay setup
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration || 0);
      if (autoPlay) {
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
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [autoPlay]);

  // Auto-hide controls after inactivity
  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) {
        setShowControls(false);
      }
    }, 3200);
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

  const toggleLoop = () => {
    setIsLooping(!isLooping);
    if (videoRef.current) {
      videoRef.current.loop = !isLooping;
    }
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
    setCurrentTime(curr);

    // Dynamic phase identification
    if (duration > 0 && onPhaseChange) {
      const progress = curr / duration;
      if (progress < 0.32) {
        onPhaseChange('sprinkle', progress);
      } else if (progress < 0.65) {
        onPhaseChange('tap', progress);
      } else {
        onPhaseChange('poles', progress);
      }
    }
  };

  const handleSeek = (e) => {
    if (!progressScrubberRef.current || !videoRef.current || duration <= 0) return;
    const rect = progressScrubberRef.current.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const newRatio = clickX / rect.width;
    const targetTime = newRatio * duration;
    videoRef.current.currentTime = targetTime;
    setCurrentTime(targetTime);
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Phase indicator based on current timeline
  const currentPhaseIndex = progressPercent < 33 ? 1 : progressPercent < 68 ? 2 : 3;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '380px',
        borderRadius: isFullscreen ? '0' : '24px',
        overflow: 'hidden',
        background: '#0B1120',
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
        loop={isLooping}
        muted={isMuted}
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          if (!isLooping) {
            setIsEnded(true);
            setIsPlaying(false);
          }
        }}
        onClick={togglePlay}
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
        Your browser does not support HTML5 video playback.
      </video>

      {/* Top HUD: Title & Phase Badges */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '14px',
        right: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 20,
        pointerEvents: 'none',
      }}>
        {/* Title Badge */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(56, 189, 248, 0.4)',
          borderRadius: '14px',
          padding: '5px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
        }}>
          <Sparkles size={16} color="#38BDF8" />
          <span style={{ fontSize: '0.84rem', fontWeight: 900, color: '#F0F9FF', letterSpacing: '0.4px' }}>
            3D Science Demo · Magnetic Poles Pattern
          </span>
        </div>

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
        }}>
          {[
            { num: 1, label: 'Sprinkle' },
            { num: 2, label: 'Tap & Align' },
            { num: 3, label: 'Poles Cluster' }
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

      {/* Scientific Field Annotations HUD (Displays when in Phase 3 or when toggled) */}
      <AnimatePresence>
        {showAnnotations && progressPercent >= 45 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              bottom: '80px',
              left: '16px',
              right: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              pointerEvents: 'none',
              zIndex: 15,
            }}
          >
            {/* North Pole Badge */}
            <div style={{
              background: 'rgba(220, 38, 38, 0.88)',
              backdropFilter: 'blur(6px)',
              border: '1.5px solid #FCA5A5',
              borderRadius: '12px',
              padding: '6px 12px',
              color: '#FFFFFF',
              boxShadow: '0 4px 16px rgba(220, 38, 38, 0.45)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              textAlign: 'center',
            }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 900, letterSpacing: '0.5px' }}>
                NORTH POLE (N)
              </span>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#FEE2E2' }}>
                Maximum Attraction
              </span>
            </div>

            {/* Neutral Zone Badge */}
            <div style={{
              background: 'rgba(30, 41, 59, 0.86)',
              backdropFilter: 'blur(6px)',
              border: '1.5px solid #94A3B8',
              borderRadius: '12px',
              padding: '5px 12px',
              color: '#F1F5F9',
              boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              textAlign: 'center',
            }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 900, letterSpacing: '0.5px', color: '#FDE68A' }}>
                NEUTRAL ZONE
              </span>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#CBD5E1' }}>
                Minimum Attraction
              </span>
            </div>

            {/* South Pole Badge */}
            <div style={{
              background: 'rgba(37, 99, 235, 0.88)',
              backdropFilter: 'blur(6px)',
              border: '1.5px solid #93C5FD',
              borderRadius: '12px',
              padding: '6px 12px',
              color: '#FFFFFF',
              boxShadow: '0 4px 16px rgba(37, 99, 235, 0.45)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              textAlign: 'center',
            }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 900, letterSpacing: '0.5px' }}>
                SOUTH POLE (S)
              </span>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#DBEAFE' }}>
                Maximum Attraction
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Large Center Play / Replay Button Overlay */}
      <AnimatePresence>
        {(!isPlaying || isEnded) && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            style={{
              position: 'absolute',
              zIndex: 25,
              pointerEvents: 'auto',
            }}
          >
            <button
              onClick={isEnded ? handleReplay : togglePlay}
              style={{
                width: '74px',
                height: '74px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                border: '3px solid rgba(255, 255, 255, 0.85)',
                boxShadow: '0 8px 30px rgba(217, 119, 6, 0.6), 0 0 30px rgba(245, 158, 11, 0.4)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              title={isEnded ? 'Replay Demonstration' : 'Play Demonstration'}
            >
              {isEnded ? (
                <RotateCcw size={32} color="#FFFFFF" />
              ) : (
                <Play size={34} color="#FFFFFF" style={{ marginLeft: '4px' }} fill="#FFFFFF" />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Floating Control Bar */}
      <motion.div
        initial={false}
        animate={{ opacity: showControls || !isPlaying ? 1 : 0, y: showControls || !isPlaying ? 0 : 15 }}
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
        {/* Progress Bar Scrubber */}
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
          title="Click to seek"
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: `${progressPercent}%`,
              background: 'linear-gradient(90deg, #38BDF8 0%, #F59E0B 100%)',
              borderRadius: '4px',
              boxShadow: '0 0 10px rgba(56, 189, 248, 0.8)',
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

          {/* Right: Annotations Toggle, Loop Toggle, Audio, Fullscreen */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Field Labels Toggle */}
            <button
              onClick={() => setShowAnnotations(!showAnnotations)}
              style={{
                background: showAnnotations ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                border: showAnnotations ? '1px solid #38BDF8' : '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                padding: '4px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                color: showAnnotations ? '#38BDF8' : '#94A3B8',
                cursor: 'pointer',
                fontSize: '0.74rem',
                fontWeight: 800,
              }}
              title={showAnnotations ? 'Hide Field Labels' : 'Show Field Labels'}
            >
              <Layers size={13} />
              <span>{showAnnotations ? 'Labels ON' : 'Labels OFF'}</span>
            </button>

            {/* Loop Toggle */}
            <button
              onClick={toggleLoop}
              style={{
                background: isLooping ? 'rgba(245, 158, 11, 0.2)' : 'transparent',
                border: isLooping ? '1px solid #F59E0B' : '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                padding: '4px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                color: isLooping ? '#FBBF24' : '#94A3B8',
                cursor: 'pointer',
                fontSize: '0.74rem',
                fontWeight: 800,
              }}
              title={isLooping ? 'Looping Enabled' : 'Looping Disabled'}
            >
              <Repeat size={13} />
              <span>{isLooping ? 'Loop' : 'Once'}</span>
            </button>

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
