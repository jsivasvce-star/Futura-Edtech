jsx_path = 'src/science/class6/chapter8/StatesOfWaterThiravIdea/index.jsx'

new_jsx = """import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './index.css';
import bgImage from '../assets/water_flow_bg.jpg';

const StatesOfWaterThiravIdea = ({ onNext, onBack }) => {
  const [step, setStep] = useState(0);
  const [isFlowing, setIsFlowing] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1000);
    return () => clearTimeout(t1);
  }, []);

  const handleFlow = () => {
    setIsFlowing(true);
    setStep(2);
    // After animation duration, show next button
    setTimeout(() => {
      setIsFlowing(false);
      setIsFilled(true);
      setStep(3);
    }, 2500);
  };

  return (
    <div className="c8-thirav-wrapper" style={{ touchAction: 'none' }}>
      <img src={bgImage} alt="Thirav Idea Background" className="c8-thirav-bg-img" />

      <div className="c8-thirav-content fade-in">
        {/* Top Header */}
        <div className="c8-thirav-top-center">
          <div className="c8-thirav-wooden-sign">
            <div className="c8-thirav-wooden-header">THIRAV'S IDEA</div>
          </div>
        </div>

        {/* Back Button */}
        <button className="c8-thirav-btn-back" onClick={onBack}>
          <ArrowLeft size={20} /> BACK
        </button>

        {/* Dialog & Interactions */}
        <div className="c8-thirav-dialog-container">
          <div className="c8-thirav-bubble thirav-side">
            <p>“No, these are the same substances.”</p>
          </div>
          
          {step >= 1 && (
            <div className="c8-thirav-bubble thirav-side learner-prompt mt-4">
              <p>“Can you make the water flow?”</p>
            </div>
          )}
        </div>

        {step === 1 && (
          <div className="c8-thirav-experiment-start-area">
            <button className="c8-thirav-btn-start" onClick={handleFlow}>
              MAKE IT FLOW <ArrowRight size={24} />
            </button>
          </div>
        )}

        {/* Water Flow Animation Overlays */}
        {(isFlowing || isFilled) && (
          <div className="c8-thirav-flow-layer">
            {/* The stream from tall glass to short glass */}
            {isFlowing && <div className="c8-thirav-water-arc"></div>}
            
            {/* The rising water in the short glass */}
            <div className={`c8-thirav-glass-fill ${isFilled ? 'filled' : 'filling'}`}></div>
          </div>
        )}

        {/* Next Button appearing after flow */}
        {step >= 3 && (
          <div className="c8-thirav-experiment-start-area">
            <button className="c8-thirav-btn-start pulse" onClick={onNext}>
              NEXT <ArrowRight size={24} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default StatesOfWaterThiravIdea;
"""

with open(jsx_path, 'w', encoding='utf-8') as f:
    f.write(new_jsx)
