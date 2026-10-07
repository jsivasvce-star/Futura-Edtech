import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './index.css';
import bgImageStatic from '../assets/water_flow_bg.jpg';
import bgImagePouring from '../assets/water_pouring_bg.jpg';

const StatesOfWaterThiravIdea = ({ onNext, onBack }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step === 0) {
      const t1 = setTimeout(() => setStep(1), 1000);
      return () => clearTimeout(t1);
    }
  }, [step]);

  const handleNextDialogue = () => {
    if (step === 1) {
      // Switch to the pouring image
      setStep(2);
    } else if (step === 2) {
      // Proceed to next screen
      onNext();
    }
  };

  // Determine which background to show
  const currentBg = step >= 2 ? bgImagePouring : bgImageStatic;

  return (
    <div className="c8-thirav-wrapper" style={{ touchAction: 'none' }}>
      <img src={currentBg} alt="Thirav Idea Background" className="c8-thirav-bg-img fade-in" key={currentBg} />

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
          {step < 2 && (
            <div className="c8-thirav-bubble thirav-side">
              <p>“No, these are the same substances.”</p>
            </div>
          )}
          
          {step === 1 && (
            <div className="c8-thirav-bubble thirav-side learner-prompt mt-4 fade-in">
              <p>“Can you make the water flow?”</p>
            </div>
          )}

          {step >= 2 && (
            <div className="c8-thirav-bubble thirav-side fade-in">
              <p>“Look, water flows easily!”</p>
            </div>
          )}
        </div>

        {/* Next Button */}
        {step >= 1 && (
          <div className="c8-thirav-experiment-start-area">
            <button className="c8-thirav-btn-start pulse" onClick={handleNextDialogue}>
              NEXT <ArrowRight size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatesOfWaterThiravIdea;
