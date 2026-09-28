import React, { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Class6MathsChapter1Journey from '../chapter1_journey';
import './cover.css';

export default function Class6MathsChapter1Cover({ onBackToDashboard, onStartJourney }) {
  const [viewState, setViewState] = useState('cover'); // 'cover' | 'journey'
  const [isBtnClicked, setIsBtnClicked] = useState(false);

  const videoRef = useRef(null);

  // Seamless video loop ensuring no watermark or static outro is displayed
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= 7.2) {
      videoRef.current.currentTime = 0;
    }
  };

  // START THE JOURNEY Click Interaction -> Navigates ONLY to the existing Chapter Flow page
  const handleStartJourney = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isBtnClicked) return;
    setIsBtnClicked(true);

    setTimeout(() => {
      if (typeof onStartJourney === 'function') {
        onStartJourney();
      } else {
        setViewState('journey');
      }
    }, 180);
  };

  // ── ROUTE: EXISTING CHAPTER 1 FLOW PAGE (CHAPTER JOURNEY MAP) ──
  if (viewState === 'journey') {
    return (
      <Class6MathsChapter1Journey
        onBackToDashboard={() => setViewState('cover')}
      />
    );
  }

  // ── ROUTE 0: CHAPTER 1 COVER PAGE MATCHING chapter1_new ASSET ──
  return (
    <div className="chapter1-video-cover-root" id="chapter1-new-cover-page">
      {/* ── BACKGROUND VIDEO LAYER (Using chapter1_new_coverpage.mp4) ── */}
      <div className="cover-video-wrapper">
        <video
          ref={videoRef}
          className="cover-video-media"
          src="/assets/chapter1_new_coverpage.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          controls={false}
          controlsList="nodownload noplaybackrate nopictureinpicture"
          tabIndex={-1}
          aria-hidden="true"
          onTimeUpdate={handleTimeUpdate}
        />
        {/* Subtle ambient lighting vignette */}
        <div className="cover-video-vignette" />
      </div>

      {/* ── MINIMAL TOP-LEFT BACK BUTTON ── */}
      <button
        type="button"
        className="cover-top-back-btn"
        onClick={onBackToDashboard}
        aria-label="Back to Mathematics Department"
      >
        <ArrowLeft size={16} />
        <span>Back</span>
      </button>

      {/* ── CENTRE CONTENT CARD (HD Crisp Typography: Large, Bold, Black) ── */}
      <div className="cover-center-content-card">
        {/* Main Title: Very Large, Bold, Black */}
        <h1 className="cover-main-heading">
          PATTERNS IN MATHEMATICS
        </h1>

        {/* Subtitle: Large, Bold, Clearly Readable */}
        <p className="cover-sub-keywords">
          Number · Pattern · Shapes · Sequences
        </p>

        {/* Prominent START THE JOURNEY Button */}
        <button
          type="button"
          className={`cover-start-journey-btn ${isBtnClicked ? 'clicked' : ''}`}
          onClick={handleStartJourney}
          id="cover-start-the-journey-button"
          aria-label="Start the Journey into Chapter 1"
        >
          <span>START THE JOURNEY</span>
          <ArrowRight size={20} className="cover-btn-arrow-icon" />
        </button>
      </div>
    </div>
  );
}
