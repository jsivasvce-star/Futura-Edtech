import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './index.css';
import bgImage from '../assets/water_slogan_bg.jpg';

const StatesOfWaterSlogan = ({ onNext, onBack }) => {
  return (
    <div className="c8-slogan-wrapper">
      <img src={bgImage} alt="Water states background" className="c8-slogan-bg" />
      <div className="c8-slogan-glare-overlay"></div>
      
      <div className="c8-slogan-content-layer">
        
        {/* Top Quote Section */}
        <div className="c8-slogan-quote-section">
          <div className="c8-slogan-quote-icon-left">“</div>
          
          <div className="c8-slogan-quote-text-container">
            <div className="c8-slogan-quote-decor-line top-decor">
              <div className="c8-slogan-ornament"></div>
            </div>
            
            <p className="c8-slogan-tamil-text">
              நெடுங்கடலும் தன்னீர்மை குன்றும் தடிந்தெழிலி<br />
              தான்நல்கா தாகி விடின்
            </p>
            
            <p className="c8-slogan-english-text">
              If it does not rain well, even the mighty ocean<br />
              will be drained.
            </p>
            
            <p className="c8-slogan-source-text">
              (திருக்குறள்)
            </p>
            
            <div className="c8-slogan-quote-decor-line bottom-decor">
              <div className="c8-slogan-ornament"></div>
            </div>
          </div>
          
          <div className="c8-slogan-quote-icon-right">”</div>
        </div>

        {/* Main Highlighted Slogan */}
        <div className="c8-slogan-main-highlight">
          <h1 className="c8-slogan-title">
            <span className="c8-slogan-title-dark">Water changes its form,</span>
            <br />
            <span className="c8-slogan-title-cyan">but it remains water.</span>
          </h1>
          <div className="c8-slogan-water-splashes">
            <svg viewBox="0 0 200 200" className="c8-splash-svg splash-left" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#4facfe" stopOpacity="0.9"/>
                </linearGradient>
                <linearGradient id="waterGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1"/>
                  <stop offset="100%" stopColor="#00f2fe" stopOpacity="0.5"/>
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <g className="splash-group">
                <path className="wave-back" d="M180 160 C120 160, 40 140, 20 80 C40 130, 100 145, 170 145 Z" fill="url(#waterGrad)" filter="url(#glow)"/>
                <path className="wave-front" d="M190 150 C140 170, 50 160, 10 90 C30 140, 110 155, 180 135 Z" fill="url(#waterGradLight)" />
                <circle className="drop d1" cx="35" cy="65" r="5" fill="#fff" opacity="0.9" filter="url(#glow)"/>
                <circle className="drop d2" cx="15" cy="105" r="3" fill="#00f2fe" opacity="0.8"/>
                <circle className="drop d3" cx="75" cy="145" r="4" fill="#fff" opacity="0.9"/>
                <circle className="drop d4" cx="50" cy="110" r="2.5" fill="#ffffff" opacity="0.7"/>
              </g>
            </svg>
            <svg viewBox="0 0 200 200" className="c8-splash-svg splash-right" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="waterGradR" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#4facfe" stopOpacity="0.9"/>
                </linearGradient>
                <linearGradient id="waterGradLightR" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1"/>
                  <stop offset="100%" stopColor="#00f2fe" stopOpacity="0.5"/>
                </linearGradient>
                <filter id="glowR">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <g className="splash-group-right">
                <path className="wave-back" d="M20 160 C80 160, 160 140, 180 80 C160 130, 100 145, 30 145 Z" fill="url(#waterGradR)" filter="url(#glowR)"/>
                <path className="wave-front" d="M10 150 C60 170, 150 160, 190 90 C170 140, 90 155, 20 135 Z" fill="url(#waterGradLightR)" />
                <circle className="drop d1" cx="165" cy="65" r="5" fill="#fff" opacity="0.9" filter="url(#glowR)"/>
                <circle className="drop d2" cx="185" cy="105" r="3" fill="#00f2fe" opacity="0.8"/>
                <circle className="drop d3" cx="125" cy="145" r="4" fill="#fff" opacity="0.9"/>
                <circle className="drop d4" cx="150" cy="110" r="2.5" fill="#ffffff" opacity="0.7"/>
              </g>
            </svg>
          </div>
        </div>


      </div>

      {/* Navigation */}
      <button onClick={onBack} className="c8-slogan-btn-back" aria-label="Back">
        <ArrowLeft strokeWidth={3} className="c8-slogan-btn-icon-dark" />
        <span>BACK</span>
      </button>
      
      <button onClick={onNext} className="c8-slogan-btn-next" aria-label="Continue">
        <span>CONTINUE</span>
        <ArrowRight strokeWidth={3} className="c8-slogan-btn-icon-light" />
      </button>

    </div>
  );
};

export default StatesOfWaterSlogan;
