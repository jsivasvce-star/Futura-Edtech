import React, { useState, useRef, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import StandardVideoControlBar from './StandardVideoControlBar';

const RingMagnetVideoPlayer = forwardRef(function RingMagnetVideoPlayer({
  videoSrc = '/assets/stage3_ringmagnet.mp4',
  fallbackSrc = '/assets/stage3_ringmagnet.mp4',
  externalIsPaused = false,
  onExternalTogglePause,
  onExternalReset,
  onPhaseChange,
  currentStep = 'sprinkle',
  autoPlay = true,
  loop = false,
}, ref) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(loop);
  const [playbackRate, setPlaybackRate] = useState(1);
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

  useImperativeHandle(ref, () => ({
    playFromTime: (timeSec = 0) => {
      const video = videoRef.current;
      if (!video) return;
      video.currentTime = timeSec;
      setIsEnded(false);
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        video.muted = true;
        setIsMuted(true);
        video.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      });
    },
    seekAndPlay: (timeSec = 0) => {
      const video = videoRef.current;
      if (!video) return;
      video.currentTime = timeSec;
      setIsEnded(false);
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        video.muted = true;
        setIsMuted(true);
        video.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      });
    },
    reset: () => {
      const video = videoRef.current;
      if (!video) return;
      video.currentTime = 0;
      setIsEnded(false);
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        video.muted = true;
        setIsMuted(true);
        video.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      });
    },
    pause: () => {
      if (videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    },
    resume: () => {
      const video = videoRef.current;
      if (!video) return;
      if (video.ended) {
        video.currentTime = 0;
        setIsEnded(false);
      }
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  }), []);

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
  }, [autoPlay, externalIsPaused]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

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
    }, 3000);
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
    setCurrentTime(curr);

    const total = video.duration || duration || 29;
    const progress = total > 0 ? curr / total : 0;

    let phaseName = 'sprinkle';
    if (progress >= 0.68) {
      phaseName = 'poles';
    } else if (progress >= 0.33) {
      phaseName = 'tapping';
    }

    if (onPhaseChange) {
      onPhaseChange(phaseName, progress);
    }
  };

  const handleSeek = (targetTime) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = targetTime;
    setCurrentTime(targetTime);
  };

  const handleChangePlaybackRate = (rate) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const toggleLoop = () => {
    if (!videoRef.current) return;
    const nextLoop = !isLooping;
    videoRef.current.loop = nextLoop;
    setIsLooping(nextLoop);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
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
        src={videoSrc}
        loop={isLooping}
        muted={isMuted}
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

      {/* Top HUD: Step Indicators */}
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
                  fontSize: '14.5px',
                  fontWeight: 800,
                  padding: '3px 9px',
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

      {/* Scientific Overlay HUD during Phase 3 */}
      <AnimatePresence>
        {progressPercent >= 68 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              bottom: '75px',
              left: '16px',
              right: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              pointerEvents: 'none',
              zIndex: 15,
            }}
          >
            {/* Top Face (North) */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.88)',
              backdropFilter: 'blur(8px)',
              border: '1.5px solid #EF4444',
              borderRadius: '12px',
              padding: '6px 14px',
              boxShadow: '0 4px 14px rgba(239, 68, 68, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              textAlign: 'center',
            }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 900, color: '#F87171' }}>
                Top Face
              </span>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#FFFFFF' }}>
                North Pole (N)
              </span>
            </div>

            {/* Central Concept Tag */}
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
                Planar Poles
              </span>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#F8FAFC' }}>
                Poles are located on the two flat faces
              </span>
            </div>

            {/* Bottom Face (South) */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.88)',
              backdropFilter: 'blur(8px)',
              border: '1.5px solid #3B82F6',
              borderRadius: '12px',
              padding: '6px 14px',
              boxShadow: '0 4px 14px rgba(59, 130, 246, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              textAlign: 'center',
            }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 900, color: '#60A5FA' }}>
                Bottom Face
              </span>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#FFFFFF' }}>
                South Pole (S)
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

      {/* Standard Control Bar matching reference image */}
      <StandardVideoControlBar
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
        currentTime={currentTime}
        duration={duration}
        onSeek={handleSeek}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        playbackRate={playbackRate}
        onChangePlaybackRate={handleChangePlaybackRate}
        isLooping={isLooping}
        onToggleLoop={toggleLoop}
        showControls={showControls}
        onUserInteraction={handleMouseMove}
      />
    </div>
  );
});

export default RingMagnetVideoPlayer;
