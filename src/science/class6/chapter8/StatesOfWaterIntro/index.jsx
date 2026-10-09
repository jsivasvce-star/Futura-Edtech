import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './index.css';
import bgImage from '../assets/water_states_bg.jpg';

const StatesOfWaterIntro = ({ onNext, onBack }) => {
  return (
    <div className="chapter8-intro-wrapper">
      
      {/* Background Image */}
      <img
        src={bgImage}
        alt="States of Water Intro"
        className="chapter8-intro-bg"
      />

      {/* Brightness/Color correction overlay for right side */}
      <div className="chapter8-intro-overlay" />

      {/* Decorative hexagonal nodes in the background of the right side */}
      <div className="chapter8-intro-decorations">
         <svg className="decor icon-1" viewBox="0 0 100 100" fill="none" stroke="#60a5fa" strokeWidth="2">
            <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" />
            <circle cx="50" cy="10" r="4" fill="#60a5fa" />
         </svg>
         <svg className="decor icon-2" viewBox="0 0 100 100" fill="none" stroke="#60a5fa" strokeWidth="2">
            <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" />
            <circle cx="15" cy="70" r="4" fill="#60a5fa" />
         </svg>
         <svg className="decor icon-3" viewBox="0 0 100 100" fill="none" stroke="#60a5fa" strokeWidth="2">
            <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" />
            <circle cx="85" cy="30" r="4" fill="#60a5fa" />
         </svg>
      </div>

      {/* RIGHT SIDE CONTENT WRAPPER */}
      <div className="chapter8-intro-content-wrapper">
        
        {/* TYPOGRAPHY UI LAYER */}
        <div className="chapter8-intro-typography">
          
          {/* Title Group */}
          <div className="chapter8-title-group">
            <h2 className="chapter8-top-title">
              CHAPTER 8
            </h2>
            <div className="chapter8-top-title-underline" />
            <h1 className="chapter8-main-title">
              <span className="text-dark-blue">A Journey through</span>
              <br/>
              <span className="text-cyan-solid">States of Water</span>
            </h1>
          </div>

          {/* CLASS 6 - SCIENCE Pill */}
          <div className="chapter8-outline-pill">
            CLASS 6 - SCIENCE
          </div>

          {/* Rectangular Chapter Box */}
          <div className="chapter8-chapter-box">
            <h2 className="chapter8-box-heading">
              A Journey through States of Water
            </h2>
            <span className="chapter8-box-subtitle">
              CH 08
            </span>
          </div>

          {/* Bullet Points */}
          <div className="chapter8-bullet-points">
            <div className="chapter8-bullet-row">
              <span>SOLID</span>
              <div className="chapter8-bullet-dot"></div>
              <span>LIQUID</span>
              <div className="chapter8-bullet-dot"></div>
              <span>GAS</span>
            </div>
            <div className="chapter8-bullet-row chapter8-bullet-row-secondary">
              <span>MELTING</span>
              <div className="chapter8-bullet-dot"></div>
              <span>FREEZING</span>
              <div className="chapter8-bullet-dot"></div>
              <span>EVAPORATION</span>
              <div className="chapter8-bullet-dot"></div>
              <span>CONDENSATION</span>
            </div>
          </div>
        </div>

        {/* Visible Styled FOLLOW THE DROP button */}
        <button
          className="chapter8-glowing-btn"
          onClick={onNext}
          aria-label="Follow the Drop"
          title="Follow the Drop"
        >
          <div className="chapter8-btn-inner-glow" />
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 2 }}>
            <svg className="chapter8-btn-drop-icon" viewBox="0 0 24 24" fill="url(#dropGradient)" stroke="none">
              <defs>
                <linearGradient id="dropGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#82b1ff" />
                  <stop offset="100%" stopColor="#e0f2fe" />
                </linearGradient>
              </defs>
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
            <span className="chapter8-btn-text">FOLLOW THE DROP</span>
          </div>
          <ArrowRight className="chapter8-btn-icon" strokeWidth={3} />
        </button>
      </div>

      {/* Visible Styled BACK button */}
      <button
        onClick={onBack}
        aria-label="Back"
        title="Back"
        className="chapter8-back-btn"
      >
        <div className="chapter8-back-btn-glow" />
        <ArrowLeft className="chapter8-back-icon" strokeWidth={3} />
        <span className="chapter8-back-text">BACK</span>
      </button>
    </div>
  );
};

export default StatesOfWaterIntro;
