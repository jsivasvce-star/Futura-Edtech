import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCcw, Volume2, VolumeX, Play, Pause, Maximize } from 'lucide-react';
import videoSrc from '../assets/activity_3_3.mp4';

export default function Activity33VideoPage({ onBack, onNext }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isBackHovered, setIsBackHovered] = useState(false);
  const [isNextHovered, setIsNextHovered] = useState(false);

  const hideControlsTimer = useRef(null);

  // Auto-hide controls after inactivity while playing
  const handleMouseMove = () => {
    setShowControls(true);
    if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    if (!isCompleted && isPlaying) {
      hideControlsTimer.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
    return () => {
      if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    if (
      videoRef.current.duration &&
      videoRef.current.currentTime >= videoRef.current.duration - 0.4
    ) {
      setIsCompleted(true);
      setShowControls(true);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(() => {});
        }
      });
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setIsCompleted(true);
    setShowControls(true);
  };

  const handleReplay = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
    setIsCompleted(false);
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = Math.max(0, Math.min(duration, pos * duration));
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleFullScreen = (e) => {
    e.stopPropagation();
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        userSelect: 'none',
        boxSizing: 'border-box',
      }}
    >
      {/* 1. Full-Screen Cinematic Video (No Overlap) */}
      <video
        ref={videoRef}
        src={videoSrc}
        playsInline
        autoPlay
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onClick={togglePlay}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          backgroundColor: '#000000',
          cursor: isCompleted ? 'default' : 'pointer',
        }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Centered Play Button Overlay if paused */}
      {!isPlaying && !isCompleted && (
        <motion.button
          type="button"
          onClick={togglePlay}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          style={{
            position: 'absolute',
            zIndex: 35,
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(245, 158, 11, 0.9)',
            border: '3px solid #FEF08A',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 0 30px rgba(245, 158, 11, 0.6)',
          }}
        >
          <Play size={36} color="#FFFFFF" style={{ marginLeft: '4px' }} />
        </motion.button>
      )}

      {/* 2. Top-Left Early Back Button (Discreet while playing, always safe) */}
      {!isCompleted && (
        <motion.button
          type="button"
          onClick={onBack}
          initial={{ opacity: 0 }}
          animate={{ opacity: showControls ? 0.9 : 0.2 }}
          whileHover={{ opacity: 1, scale: 1.05 }}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            zIndex: 40,
            background: 'rgba(2, 24, 17, 0.75)',
            border: '1.5px solid rgba(167, 243, 208, 0.4)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            color: '#FFFFFF',
            padding: '8px 16px',
            borderRadius: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '15px',
            fontWeight: 700,
            transition: 'opacity 0.25s ease',
          }}
          title="Back to Electrical Grinder"
        >
          <ArrowLeft size={18} color="#6EE7B7" />
          <span>Back</span>
        </motion.button>
      )}

      {/* 3. Top-Right Sound & Fullscreen Controls (Discreet) */}
      <motion.div
        animate={{ opacity: showControls || isCompleted ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 40,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          pointerEvents: showControls || isCompleted ? 'auto' : 'none',
        }}
      >
        <button
          type="button"
          onClick={toggleMute}
          style={{
            background: 'rgba(2, 24, 17, 0.75)',
            border: '1.5px solid rgba(167, 243, 208, 0.4)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            color: '#FFFFFF',
            padding: '8px 14px',
            borderRadius: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '14px',
            fontWeight: 700,
          }}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={18} color="#F87171" /> : <Volume2 size={18} color="#34D399" />}
          <span>{isMuted ? 'Unmute' : 'Mute'}</span>
        </button>

        <button
          type="button"
          onClick={toggleFullScreen}
          style={{
            background: 'rgba(2, 24, 17, 0.75)',
            border: '1.5px solid rgba(167, 243, 208, 0.4)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            color: '#FFFFFF',
            padding: '8px 12px',
            borderRadius: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title="Fullscreen"
        >
          <Maximize size={18} color="#A7F3D0" />
        </button>
      </motion.div>

      {/* 4. Sleek Bottom Scrubber & Time Bar (While Playing) */}
      <motion.div
        animate={{ opacity: showControls && !isCompleted ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '92vw',
          maxWidth: '1200px',
          zIndex: 35,
          background: 'rgba(2, 24, 17, 0.85)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(167, 243, 208, 0.3)',
          borderRadius: '14px',
          padding: '10px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          pointerEvents: showControls && !isCompleted ? 'auto' : 'none',
        }}
      >
        <button
          type="button"
          onClick={togglePlay}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#FEF08A',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: 0,
          }}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        <span style={{ color: '#D1D5DB', fontSize: '13px', fontWeight: 600, minWidth: '40px' }}>
          {formatTime(currentTime)}
        </span>

        {/* Progress bar */}
        <div
          onClick={handleSeek}
          style={{
            flex: 1,
            height: '6px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '3px',
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: `${duration ? (currentTime / duration) * 100 : 0}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #10B981, #F59E0B)',
              borderRadius: '3px',
              transition: 'width 0.1s linear',
            }}
          />
        </div>

        <span style={{ color: '#9CA3AF', fontSize: '13px', fontWeight: 600, minWidth: '40px' }}>
          {formatTime(duration)}
        </span>
      </motion.div>

      {/* 5. Navigation Controls Revealed AFTER COMPLETING VIDEO */}
      <AnimatePresence>
        {isCompleted && (
          <>
            {/* Bottom-Left: Back Button */}
            <motion.button
              type="button"
              onClick={() => {
                if (onBack) onBack();
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                position: 'absolute',
                bottom: '26px',
                left: '26px',
                zIndex: 60,
                background: isBackHovered
                  ? 'rgba(6, 78, 59, 0.95)'
                  : 'rgba(2, 28, 20, 0.92)',
                border: '2px solid #6EE7B7',
                color: '#ECFDF5',
                fontSize: '18px',
                fontWeight: 800,
                padding: '12px 26px',
                borderRadius: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), 0 0 16px rgba(110, 231, 183, 0.25)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={() => setIsBackHovered(true)}
              onMouseLeave={() => setIsBackHovered(false)}
            >
              <ArrowLeft size={22} color="#6EE7B7" />
              <span>Back</span>
            </motion.button>

            {/* Bottom-Center: Completion Badge + Replay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              style={{
                position: 'absolute',
                bottom: '26px',
                left: 0,
                right: 0,
                margin: '0 auto',
                width: 'fit-content',
                zIndex: 55,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(2, 28, 20, 0.92)',
                border: '1.5px solid rgba(254, 240, 138, 0.65)',
                borderRadius: '14px',
                padding: '10px 22px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), 0 0 20px rgba(254, 240, 138, 0.2)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                pointerEvents: 'auto',
              }}
            >
              <span
                style={{
                  color: '#FEF08A',
                  fontSize: '16px',
                  fontWeight: 800,
                  letterSpacing: '0.02em',
                  textShadow: '0 0 10px rgba(254, 240, 138, 0.4)',
                }}
              >
                Activity 3.3 Video Completed
              </span>

              <button
                type="button"
                onClick={handleReplay}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.35)',
                  color: '#FFFFFF',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s ease',
                }}
                title="Watch Again"
              >
                <RotateCcw size={14} />
                <span>Replay</span>
              </button>
            </motion.div>

            {/* Bottom-Right: Next Button */}
            <motion.button
              type="button"
              onClick={() => {
                if (onNext) onNext();
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                position: 'absolute',
                bottom: '26px',
                right: '26px',
                zIndex: 60,
                background: isNextHovered
                  ? 'linear-gradient(135deg, #F59E0B 0%, #B45309 100%)'
                  : 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                border: '2px solid #FEF08A',
                color: '#FFFFFF',
                fontSize: '19px',
                fontWeight: 900,
                padding: '12px 30px',
                borderRadius: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 8px 24px rgba(217, 119, 6, 0.6), 0 0 20px rgba(254, 240, 138, 0.35)',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={() => setIsNextHovered(true)}
              onMouseLeave={() => setIsNextHovered(false)}
            >
              <span>Next: Culinary Practices</span>
              <ArrowRight size={22} color="#FFFFFF" />
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
