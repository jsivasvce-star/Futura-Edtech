/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, FlaskConical, Sparkles, Compass } from 'lucide-react';
import ch4Cover from '../../../../assets/ch4_cover.png';
import './Chapter4Cover.css';

export default function Chapter4Cover({ onStartJourney, onBack }) {
  const handleBack = () => {
    if (typeof onBack === 'function') {
      onBack();
    } else if (window.history.length > 1) {
      window.history.back();
    }
  };

  return (
    <div className="ch4-cover-viewport">
      {/* Top-Left Back Button */}
      <button
        className="ch4-cover-back-btn"
        onClick={handleBack}
        title="Back"
        aria-label="Back"
      >
        <ArrowLeft size={19} strokeWidth={2.6} className="ch4-cover-back-icon" />
        <span>Back</span>
      </button>

      {/* 16:9 Master Canvas with Full-Bleed ch4_cover Backdrop */}
      <div className="ch4-cover-canvas">
        <img
          src={ch4Cover}
          alt="Class 6 Science Chapter 4 - Exploring Magnets"
          className="ch4-cover-backdrop-img"
        />

        {/* LEFT-SIDE ZONE: Horizontally & vertically centered in the left half of the screen */}
        <div className="ch4-cover-left-zone">
          <motion.div
            className="ch4-square-glass-card"
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          >
          {/* 1. Small Top Badge: GRADE 6 • SCIENCE • CHAPTER 4 */}
          <div className="ch4-glass-badge">
            <FlaskConical size={20} className="ch4-glass-badge-icon" strokeWidth={2.4} />
            <span className="ch4-glass-badge-text">GRADE 6 • SCIENCE • CHAPTER 4</span>
          </div>

          {/* 2. Main Heading: EXPLORING MAGNETS */}
          <div className="ch4-glass-title-group">
            <span className="ch4-glass-title-line">EXPLORING</span>
            <span className="ch4-glass-title-line">MAGNETS</span>
          </div>

          {/* 3 & 4. Topic Lines */}
          <div className="ch4-glass-topics-group">
            <div className="ch4-glass-topic-line">
              <Sparkles size={22} className="ch4-glass-topic-icon" strokeWidth={2.5} />
              <span>Magnets • Poles • Compass</span>
            </div>
            <div className="ch4-glass-topic-line">
              <Compass size={22} className="ch4-glass-topic-icon" strokeWidth={2.5} />
              <span>Fields • Forces</span>
            </div>
          </div>

          {/* 5. Button: Start the journey → */}
          <button
            className="ch4-glass-start-btn"
            onClick={onStartJourney}
            title="Start the journey"
          >
            <span>Start the journey</span>
            <ArrowRight size={24} strokeWidth={2.6} className="ch4-glass-btn-arrow" />
          </button>
        </motion.div>
        </div>
      </div>
    </div>
  );
}
