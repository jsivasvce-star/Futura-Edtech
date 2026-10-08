/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Ruler, Sparkles, MoveRight } from 'lucide-react';
import ch5Cover from '../../../../assets/ch5_cover.png';
import './Chapter5Cover.css';

export default function Chapter5Cover({ onStartJourney, onBack }) {
  const handleBack = () => {
    if (typeof onBack === 'function') {
      onBack();
    } else if (window.history.length > 1) {
      window.history.back();
    }
  };

  return (
    <div className="ch5-cover-viewport">
      {/* Top-Left Back Button */}
      <button
        className="ch5-cover-back-btn"
        onClick={handleBack}
        title="Back to Class 6 Wing"
        aria-label="Back"
      >
        <ArrowLeft size={19} strokeWidth={2.6} className="ch5-cover-back-icon" />
        <span>Back</span>
      </button>

      {/* 16:9 Master Canvas with Full-Bleed ch5_cover Backdrop */}
      <div className="ch5-cover-canvas">
        <img
          src={ch5Cover}
          alt="Class 6 Science Chapter 5 - Measurement of Length and Motion"
          className="ch5-cover-backdrop-img"
        />

        {/* LEFT-SIDE ZONE: Horizontally & vertically centered in the left half of the screen */}
        <div className="ch5-cover-left-zone">
          <motion.div
            className="ch5-square-glass-card"
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          >
            {/* 1. Small Top Badge: GRADE 6 • SCIENCE • CHAPTER 5 */}
            <div className="ch5-glass-badge">
              <Ruler size={20} className="ch5-glass-badge-icon" strokeWidth={2.4} />
              <span className="ch5-glass-badge-text">GRADE 6 • SCIENCE • CHAPTER 5</span>
            </div>

            {/* 2. Main Heading: MEASUREMENT OF LENGTH AND MOTION */}
            <div className="ch5-glass-title-group">
              <span className="ch5-glass-title-line">MEASUREMENT OF</span>
              <span className="ch5-glass-title-line">LENGTH & MOTION</span>
            </div>

            {/* 3 & 4. Topic Lines */}
            <div className="ch5-glass-topics-group">
              <div className="ch5-glass-topic-line">
                <Sparkles size={22} className="ch5-glass-topic-icon" strokeWidth={2.5} />
                <span>Units • Rulers • Curved Lines</span>
              </div>
              <div className="ch5-glass-topic-line">
                <MoveRight size={22} className="ch5-glass-topic-icon" strokeWidth={2.5} />
                <span>Linear • Circular • Periodic Motion</span>
              </div>
            </div>

            {/* 5. Button: Start the journey → */}
            <button
              className="ch5-glass-start-btn"
              onClick={onStartJourney}
              title="Start the journey"
            >
              <span>Start the journey</span>
              <ArrowRight size={24} strokeWidth={2.6} className="ch5-glass-btn-arrow" />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
