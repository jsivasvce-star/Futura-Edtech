import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Compass,
} from 'lucide-react';
import videoSrc from '../assets/food_miles_video_part2.mp4';

export default function FoodMilesVideoPart2Page({ onBack, onNext }) {
  const videoRef = useRef(null);
  const hideControlsTimer = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);

  // Auto-hide controls after inactivity while playing
  const handleMouseMove = () => {
    setShowControls(true);
    if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    if (!isCompleted && isPlaying) {
      hideControlsTimer.current = setTimeout(() => {
        setShowControls(false);
      }, 3500);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay policy fallback: mute and play
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        });
    }

    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT') return;
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      } else if (e.key === 'ArrowRight' && e.shiftKey) {
        onNext?.();
      } else if (e.key === 'ArrowLeft' && e.shiftKey) {
        onBack?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    };
  }, [onNext, onBack]);

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

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    if (
      videoRef.current.duration &&
      videoRef.current.currentTime >= videoRef.current.duration - 0.2
    ) {
      setIsCompleted(true);
      setShowControls(true);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setIsCompleted(true);
    setShowControls(true);
  };

  const handleReplay = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
    setIsCompleted(false);
  };

  const handleSeek = (e) => {
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newFraction = Math.max(0, Math.min(1, clickX / rect.width));
    videoRef.current.currentTime = newFraction * duration;
    setCurrentTime(newFraction * duration);
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#0B0703',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        userSelect: 'none',
        boxSizing: 'border-box',
      }}
    >
      {/* 1. Full-Screen Cinematic Video */}
      <video
        ref={videoRef}
        src={videoSrc}
        playsInline
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onClick={togglePlay}
        style={{
          width: '100vw',
          height: '100vh',
          objectFit: 'contain',
          backgroundColor: '#0B0703',
          cursor: 'pointer',
          zIndex: 2,
        }}
      />

      {/* 2. Top Bar (Back button, Category Badge, and Sound Toggle) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '90px',
          background: 'linear-gradient(to bottom, rgba(11, 7, 3, 0.85) 0%, transparent 100%)',
          zIndex: 40,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          boxSizing: 'border-box',
        }}
      >
        {/* Back Navigation */}
        <motion.button
          type="button"
          onClick={onBack}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          style={{
            pointerEvents: 'auto',
            background: 'rgba(28, 14, 4, 0.88)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '2px solid rgba(251, 191, 36, 0.55)',
            color: '#FEF08A',
            fontSize: '17px',
            fontWeight: 800,
            padding: '8px 20px',
            borderRadius: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
            transition: 'all 0.15s ease',
          }}
        >
          <ArrowLeft size={20} color="#FEF08A" />
          <span>Food Miles Part 1</span>
        </motion.button>

        {/* Badges & Controls in Top-Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', pointerEvents: 'auto' }}>
          {/* Badge */}
          <div
            style={{
              background: 'rgba(28, 14, 4, 0.88)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '2px solid rgba(254, 240, 138, 0.75)',
              borderRadius: '999px',
              padding: '6px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.45)',
            }}
          >
            <Compass size={18} color="#FBBF24" />
            <span
              style={{
                color: '#FEF08A',
                fontSize: '13px',
                fontWeight: 800,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Food Miles Journey • Part 2
            </span>
          </div>

          {/* Quick Sound Toggle */}
          <motion.button
            type="button"
            onClick={toggleMute}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: isMuted ? 'rgba(245, 158, 11, 0.9)' : 'rgba(16, 185, 129, 0.9)',
              border: '1.5px solid #FEF08A',
              color: '#FFFFFF',
              borderRadius: '999px',
              padding: '6px 16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 800,
              fontSize: '13px',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)',
            }}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            <span>{isMuted ? 'Muted' : 'Sound On'}</span>
          </motion.button>
        </div>
      </div>

      {/* 3. Big Center Play/Replay Overlay when paused or completed */}
      <AnimatePresence>
        {(!isPlaying || isCompleted) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            onClick={isCompleted ? handleReplay : togglePlay}
            style={{
              position: 'absolute',
              zIndex: 35,
              width: '88px',
              height: '88px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.95) 0%, rgba(217, 119, 6, 0.95) 100%)',
              border: '3px solid #FEF08A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 10px 40px rgba(217, 119, 6, 0.7), 0 0 30px rgba(254, 240, 138, 0.5)',
            }}
          >
            {isCompleted ? (
              <RotateCcw size={40} color="#FFFFFF" />
            ) : (
              <Play size={40} color="#FFFFFF" style={{ marginLeft: '4px' }} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Bottom Controls Bar & Next Button */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '24px 28px',
              background: 'linear-gradient(to top, rgba(11, 7, 3, 0.92) 0%, rgba(11, 7, 3, 0.6) 60%, transparent 100%)',
              zIndex: 40,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxSizing: 'border-box',
            }}
          >
            {/* Timeline Scrubber */}
            <div
              onClick={handleSeek}
              style={{
                position: 'relative',
                width: '100%',
                height: '8px',
                background: 'rgba(255, 255, 255, 0.2)',
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
                  bottom: 0,
                  width: `${progressPercent}%`,
                  background: 'linear-gradient(90deg, #F59E0B 0%, #FEF08A 100%)',
                  borderRadius: '4px',
                  boxShadow: '0 0 10px rgba(254, 240, 138, 0.6)',
                  transition: 'width 0.1s linear',
                }}
              />
            </div>

            {/* Bottom Row Controls */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              {/* Left Side: Play/Pause, Replay, Time */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <motion.button
                  type="button"
                  onClick={togglePlay}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    border: '1px solid rgba(254, 240, 138, 0.4)',
                    color: '#FEF08A',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: '2px' }} />}
                </motion.button>

                <motion.button
                  type="button"
                  onClick={handleReplay}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    border: '1px solid rgba(254, 240, 138, 0.4)',
                    color: '#FEF08A',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  title="Replay from start"
                >
                  <RotateCcw size={18} />
                </motion.button>

                <span
                  style={{
                    color: '#FEF08A',
                    fontSize: '14px',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    minWidth: '90px',
                  }}
                >
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Right Side: Next Button */}
              <motion.button
                type="button"
                onClick={onNext}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  border: '2px solid #FEF08A',
                  color: '#FFFFFF',
                  fontSize: '18px',
                  fontWeight: 900,
                  padding: '10px 26px',
                  borderRadius: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 8px 26px rgba(217, 119, 6, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.4)',
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.6)',
                  transition: 'all 0.15s ease',
                }}
              >
                <span>Go Local</span>
                <ArrowRight size={22} color="#FFFFFF" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
