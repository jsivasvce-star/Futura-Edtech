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
                <linearGradient id="waterBaseGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#001845" stopOpacity="0.95"/>
                  <stop offset="40%" stopColor="#003566" stopOpacity="0.9"/>
                  <stop offset="70%" stopColor="#0077b6" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#00b4d8" stopOpacity="0.9"/>
                </linearGradient>
                <linearGradient id="waterHighlightGrad" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#90e0ef" stopOpacity="0.9"/>
                  <stop offset="50%" stopColor="#caf0f8" stopOpacity="0.7"/>
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2"/>
                </linearGradient>
                <linearGradient id="waterEdgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9"/>
                  <stop offset="60%" stopColor="#48cae4" stopOpacity="0.5"/>
                  <stop offset="100%" stopColor="#0077b6" stopOpacity="0"/>
                </linearGradient>
                <filter id="waterGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur"/>
                  <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                </filter>
              </defs>
              <g className="splash-group" filter="url(#waterGlow)">
                {/* Dark Base Layer */}
                <path className="wave-back" d="M190 145 C130 150, 70 120, 45 60 C50 85, 65 100, 80 95 C75 105, 85 115, 100 105 C95 120, 115 125, 130 115 C120 135, 160 140, 190 135 Z" fill="url(#waterBaseGrad)"/>
                
                {/* Mid Highlight Layer */}
                <path className="wave-mid" d="M185 140 C135 145, 80 115, 55 65 C60 80, 75 90, 85 85 C80 95, 95 105, 105 95 C100 110, 120 115, 135 105 C125 120, 155 130, 185 130 Z" fill="url(#waterHighlightGrad)"/>
                
                {/* Bright Edge/Rim Light Layer */}
                <path className="wave-front" d="M180 135 C140 140, 90 110, 65 70 C70 80, 80 85, 90 80 C85 90, 95 100, 105 95 C100 105, 115 110, 125 105 C120 115, 145 125, 180 125 Z" fill="url(#waterEdgeGrad)"/>
                
                {/* Realistic Droplets */}
                <circle className="drop d1" cx="35" cy="45" r="2.5" fill="#ffffff" opacity="0.9"/>
                <circle className="drop d2" cx="55" cy="70" r="1.5" fill="#caf0f8" opacity="0.8"/>
                <circle className="drop d3" cx="95" cy="80" r="3.5" fill="#90e0ef" opacity="0.8"/>
                <circle className="drop d4" cx="125" cy="90" r="2" fill="#ffffff" opacity="0.7"/>
                <circle className="drop d1" cx="45" cy="85" r="2.5" fill="#00b4d8" opacity="0.8"/>
                <circle className="drop d2" cx="85" cy="125" r="3" fill="#caf0f8" opacity="0.6"/>
                <circle className="drop d3" cx="145" cy="115" r="1.5" fill="#ffffff" opacity="0.9"/>
              </g>
            </svg>
            <svg viewBox="0 0 200 200" className="c8-splash-svg splash-right" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="waterBaseGradR" x1="100%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#001845" stopOpacity="0.95"/>
                  <stop offset="40%" stopColor="#003566" stopOpacity="0.9"/>
                  <stop offset="70%" stopColor="#0077b6" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#00b4d8" stopOpacity="0.9"/>
                </linearGradient>
                <linearGradient id="waterHighlightGradR" x1="100%" y1="50%" x2="0%" y2="50%">
                  <stop offset="0%" stopColor="#90e0ef" stopOpacity="0.9"/>
                  <stop offset="50%" stopColor="#caf0f8" stopOpacity="0.7"/>
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2"/>
                </linearGradient>
                <linearGradient id="waterEdgeGradR" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9"/>
                  <stop offset="60%" stopColor="#48cae4" stopOpacity="0.5"/>
                  <stop offset="100%" stopColor="#0077b6" stopOpacity="0"/>
                </linearGradient>
                <filter id="waterGlowR" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur"/>
                  <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                </filter>
              </defs>
              <g className="splash-group-right" filter="url(#waterGlowR)">
                <path className="wave-back" d="M10 145 C70 150, 130 120, 155 60 C150 85, 135 100, 120 95 C125 105, 115 115, 100 105 C105 120, 85 125, 70 115 C80 135, 40 140, 10 135 Z" fill="url(#waterBaseGradR)"/>
                <path className="wave-mid" d="M15 140 C65 145, 120 115, 145 65 C140 80, 125 90, 115 85 C120 95, 105 105, 95 95 C100 110, 80 115, 65 105 C75 120, 45 130, 15 130 Z" fill="url(#waterHighlightGradR)"/>
                <path className="wave-front" d="M20 135 C60 140, 110 110, 135 70 C130 80, 120 85, 110 80 C115 90, 105 100, 95 95 C100 105, 85 110, 75 105 C80 115, 55 125, 20 125 Z" fill="url(#waterEdgeGradR)"/>
                
                <circle className="drop d1" cx="165" cy="45" r="2.5" fill="#ffffff" opacity="0.9"/>
                <circle className="drop d2" cx="145" cy="70" r="1.5" fill="#caf0f8" opacity="0.8"/>
                <circle className="drop d3" cx="105" cy="80" r="3.5" fill="#90e0ef" opacity="0.8"/>
                <circle className="drop d4" cx="75" cy="90" r="2" fill="#ffffff" opacity="0.7"/>
                <circle className="drop d1" cx="155" cy="85" r="2.5" fill="#00b4d8" opacity="0.8"/>
                <circle className="drop d2" cx="115" cy="125" r="3" fill="#caf0f8" opacity="0.6"/>
                <circle className="drop d3" cx="55" cy="115" r="1.5" fill="#ffffff" opacity="0.9"/>
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
