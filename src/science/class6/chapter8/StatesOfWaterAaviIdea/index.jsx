import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './index.css';
import bgImage from '../assets/aavi_idea_bg.jpg';

const StatesOfWaterAaviIdea = ({ onNext, onBack }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const handleTouchIce = () => {
    // For now, this just triggers the next internal state (Step 1)
    setStep(1);
  };


  return (
    <div className="c8-aavi-wrapper">
      <div 
        className={`c8-aavi-bg ${isLoaded ? 'fade-in' : ''} ${step === 0 ? 'idle-breathe' : ''}`} 
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      <div className={`c8-aavi-content ${isLoaded ? 'fade-in' : ''}`}>
        {/* Persistent Back Button (Bottom Left) */}
        <button className="c8-aavi-btn-back" onClick={handleBack}>
          <ArrowLeft size={24} /> BACK
        </button>

        
        {/* Top-center premium wooden title */}
        <div className="c8-aavi-top-center">
          <div className="c8-aavi-wooden-sign">
            <div className="c8-aavi-wooden-header">AAVI'S IDEA</div>
          </div>
        </div>

        {/* Interactive Layer */}
        {step === 0 && (
          <div className="c8-aavi-interactive-layer">
            <button 
              className="c8-aavi-btn-touch-ice"
              onClick={handleTouchIce}
            >
              TOUCH THE ICE
            </button>
          </div>
        )}
        
        {/* Step 1 to 4: Dynamic Bubble & Animations */}
        {step >= 1 && (
          <div className="c8-aavi-step1-layer">
            
            {/* Sparkles around the ice cube in Aavi's hand */}
            <div className="c8-aavi-sparkles-container">
              <div className="c8-sparkle s1">✨</div>
              <div className="c8-sparkle s2">✨</div>
              <div className="c8-sparkle s3">✨</div>
            </div>

            {/* Ice character happy reaction (subtle glow) */}
            <div className="c8-aavi-ice-reaction"></div>

            {/* Lemonade Ripple (Appears in Step 2+) */}
            {step >= 2 && (
              <div className="c8-aavi-lemonade-ripple"></div>
            )}

            {/* Observation Bubble (Upper Right/Left) */}
            <div className={`c8-aavi-observation-bubble step-${step}`}>
              {step === 1 && <p>“Ice feels hard to hold.”</p>}
              {step === 2 && <p>“Water cannot be held in the same way.”</p>}
              {step === 3 && <p>“Ice feels hard to touch and you can hold it in your hands,<br/>whereas, water cannot be held in the same way.”</p>}
              {step === 4 && <p>“So, they must be different substances.”</p>}
            </div>

            {/* Navigation Controls */}
            <div className="c8-aavi-nav-controls">
              {step === 1 && (
                <button className="c8-aavi-btn-next" onClick={() => setStep(2)}>
                  COMPARE WITH WATER <ArrowRight size={24} />
                </button>
              )}
              {step >= 2 && step <= 3 && (
                <button className="c8-aavi-btn-next" onClick={() => setStep(step + 1)}>
                  NEXT <ArrowRight size={24} />
                </button>
              )}
              {step === 4 && (
                <button className="c8-aavi-btn-next final" onClick={onNext}>
                  NEXT <ArrowRight size={24} />
                </button>
              )}
            </div>
          </div>
        )}
        
      </div>
    </div>
  );

};

export default StatesOfWaterAaviIdea;
