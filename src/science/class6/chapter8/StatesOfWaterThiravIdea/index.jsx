import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './index.css';
import bgImageStatic from '../assets/water_flow_bg.jpg';
import bgImagePouring from '../assets/water_pouring_bg.jpg';
import bgImageClean from '../assets/thirav_idea_clean_bg.jpg';

const StatesOfWaterThiravIdea = ({ onNext, onBack }) => {
  const [step, setStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    if (step === 0) {
      const t1 = setTimeout(() => setStep(1), 1000);
      return () => clearTimeout(t1);
    }
  }, [step]);

  const handleNextDialogue = () => {
    if (step === 1) {
      setStep(2);
    }
  };

  const handleNextStage = () => {
    if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      if (selectedAnswer === 'correct') {
        onNext(); // Go directly to test ice if they click next after getting it correct!
      }
    } else if (step === 4) {
      onNext();
    }
  };

  const handleBack = () => {
    if (step === 4) {
      setStep(3);
    } else if (step === 3) {
      setStep(2);
      setSelectedAnswer(null);
    } else {
      onBack();
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
        <button className="c8-thirav-btn-back" onClick={handleBack}>
          <ArrowLeft size={20} /> BACK
        </button>

        {/* Next Button Bottom Right (Handles Stage 2 -> 3 and Stage 3 -> Next Stage) */}
        {step >= 1 && (
          <div className="c8-thirav-next-bottom-right">
            <button 
              className={`c8-thirav-btn-next ${
                (step === 1 || (step === 3 && selectedAnswer !== 'correct')) ? 'disabled' : 'pulse'
              }`}
              onClick={
                (step === 2 || (step === 3 && selectedAnswer === 'correct') || step === 4) ? handleNextStage : undefined
              }
            >
              NEXT <ArrowRight size={24} />
            </button>
          </div>
        )}

        {/* Dialog & Interactions */}
        {step < 3 && (
          <div className="c8-thirav-new-dialog-container">
            {step < 2 && (
              <div className="c8-thirav-glass-bubble">
                <p>“No, these are the same substances.”</p>
                <div className="c8-thirav-glass-pointer"></div>
              </div>
            )}
            
            {step === 1 && (
              <div className="c8-thirav-investigation-card fade-in">
                <div className="c8-thirav-card-content">
                  <span className="c8-thirav-icon-drop">💧</span>
                  <p>Can you make the water flow?</p>
                </div>
                <button className="c8-thirav-btn-start pulse" onClick={handleNextDialogue}>
                  START <ArrowRight size={20} />
                </button>
              </div>
            )}

            {step >= 2 && (
              <div className="c8-thirav-glass-bubble fade-in">
                <p>“Look, water flows easily!”</p>
                <div className="c8-thirav-glass-pointer"></div>
              </div>
            )}
          </div>
        )}

        {/* Stage 4 UI */}
        {(step === 3 || step === 4) && (
          <div className="c8-thirav-stage4-container fade-in">
             <div className="c8-thirav-stage4-question">
               {step === 4 ? (
                 <p style={{color: '#16a34a'}}>Correct! Water flows easily.</p>
               ) : (
                 <p>What did you observe?</p>
               )}
             </div>
             
             {step === 3 && (
               <>
                 <div className="c8-thirav-stage4-answers">
                    <button 
                      className={`c8-thirav-answer-card ${selectedAnswer === 'correct' ? 'correct' : ''}`}
                      onClick={() => {
                        setSelectedAnswer('correct');
                        setTimeout(() => setStep(4), 1000); // Auto advance to step 4 when correct
                      }}
                    >
                      Water flows
                    </button>
                    <button 
                      className={`c8-thirav-answer-card ${selectedAnswer === 'incorrect' ? 'incorrect' : ''}`}
                      onClick={() => setSelectedAnswer('incorrect')}
                    >
                      Water stays in one place
                    </button>
                 </div>

                 {selectedAnswer === 'incorrect' && (
                   <div className="c8-thirav-feedback bounce">
                     Try Again!
                   </div>
                 )}
               </>
             )}
          </div>
        )}



      </div>
    </div>
  );
};

export default StatesOfWaterThiravIdea;
