import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './index.css';
import bgImage from '../assets/water_states_meet_bg.jpg';

const StatesOfWaterPage0 = ({ onNext, onBack }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="c8-page0-wrapper">
      <div 
        className="c8-page0-bg" 
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      <div className={`c8-page0-content ${isLoaded ? 'fade-in' : ''}`}>
        
        {/* Top-left wooden sign (Premium Water-Themed) */}
        <div className="c8-page0-top-left">
          <div className="c8-page0-wooden-sign">
            <div className="c8-page0-wooden-header">CHAPTER 8</div>
            <div className="c8-page0-wooden-sub">A Journey through<br/>States of Water</div>
          </div>
        </div>

        {/* Bottom area */}
        <div className="c8-page0-bottom-area">
          
          {/* Bottom-left: Back Button */}
          <div className="c8-page0-bottom-left">
            <button onClick={onBack} className="c8-page0-btn back-btn" aria-label="Back">
              <ArrowLeft size={18} strokeWidth={2.5} />
              BACK
            </button>
          </div>

          {/* Bottom-right: Glass Card & Explore Button */}
          <div className="c8-page0-bottom-right">
            
            <div className="c8-page0-glass-card">
              <h2 className="c8-page0-title">What exactly is ice?</h2>
              <p className="c8-page0-text">Are ice and water really different substances?</p>
              
            </div>

            <button onClick={onNext} className="c8-page0-btn next-btn" aria-label="Explore">
              LET'S EXPLORE
              <ArrowRight size={18} strokeWidth={3} />
            </button>
            
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default StatesOfWaterPage0;
