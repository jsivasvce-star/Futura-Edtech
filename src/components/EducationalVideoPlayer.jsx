import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Maximize, Volume2, VolumeX, ArrowLeft, ArrowRight } from 'lucide-react';

const EducationalVideoPlayer = ({ videoRef, src, onEnded, children }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleVolumeChange = () => setIsMuted(video.muted || video.volume === 0);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('volumechange', handleVolumeChange);

    if (video.readyState >= 1) {
      setDuration(video.duration);
    }
    setIsMuted(video.muted);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [videoRef]);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
  };

  const handleSeek = (e) => {
    const time = Number(e.target.value);
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed', 
        inset: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: 9999,
        background: '#000'
      }}
    >
      <video disablePictureInPicture
        ref={videoRef}
        src={src}
        autoPlay
        playsInline
        onEnded={onEnded}
        onClick={togglePlay}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />

      {children}

      {/* Persistent Custom Controls */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '56px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        gap: '16px',
        zIndex: 10001,
        pointerEvents: 'auto'
      }}>
        <button onClick={togglePlay} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>

        <span style={{ color: 'white', fontSize: '14px', fontFamily: 'monospace', minWidth: '40px', textAlign: 'right' }}>
          {formatTime(currentTime)}
        </span>

        <input 
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          style={{
            flex: 1,
            cursor: 'pointer',
            accentColor: '#34d399',
            height: '4px'
          }}
        />

        <span style={{ color: 'white', fontSize: '14px', fontFamily: 'monospace', minWidth: '40px' }}>
          {formatTime(duration)}
        </span>

        <button onClick={toggleMute} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>

        <button onClick={toggleFullscreen} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <Maximize size={24} />
        </button>
      </div>
    </div>
  );
};

export default EducationalVideoPlayer;
