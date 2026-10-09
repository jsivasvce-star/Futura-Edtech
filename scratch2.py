import os

css_path = 'src/science/class6/chapter8/StatesOfWaterAaviIdea/index.css'
jsx_path = 'src/science/class6/chapter8/StatesOfWaterAaviIdea/index.jsx'

with open(jsx_path, 'r', encoding='utf-8') as f:
    text = f.read()

new_return = """
  return (
    <div className="c8-aavi-wrapper">
      <div 
        className={`c8-aavi-bg ${isLoaded ? 'fade-in' : ''} ${step === 0 ? 'idle-breathe' : ''}`} 
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      <div className={`c8-aavi-content ${isLoaded ? 'fade-in' : ''}`}>
        
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
"""

start_idx = text.find('  return (')
end_idx = text.rfind('  );\n};') + 4

if start_idx != -1 and end_idx != -1:
    text = text[:start_idx] + new_return + text[end_idx:]
    with open(jsx_path, 'w', encoding='utf-8') as f:
        f.write(text)
    print("Successfully updated JSX")
else:
    print("Could not find return statement")

with open(css_path, 'r', encoding='utf-8') as f:
    css_text = f.read()

# Make the font size adaptable via classes rather than !important global
css_text = css_text.replace(
    '.c8-aavi-observation-bubble p {\n  font-size: 4.5rem !important;\n  margin: 0;\n  line-height: 1.2;\n}',
    ''
)
css_text = css_text.replace(
    '.c8-aavi-observation-bubble p {\n  font-size: 2rem !important;\n  margin: 0;\n  line-height: 1.2;\n}',
    ''
)

css_append = """

/* Typography logic per step */
.c8-aavi-observation-bubble p {
  margin: 0;
  line-height: 1.3;
}

.c8-aavi-observation-bubble.step-1 p { font-size: 2.2rem; }
.c8-aavi-observation-bubble.step-2 p { font-size: 2rem; }
.c8-aavi-observation-bubble.step-3 p { font-size: 1.6rem; }
.c8-aavi-observation-bubble.step-4 p { font-size: 2.2rem; }

/* Navigation buttons */
.c8-aavi-nav-controls {
  position: absolute;
  bottom: 10%;
  right: 10%;
  z-index: 10;
}

.c8-aavi-btn-next {
  display: flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.4);
  padding: 15px 30px;
  font-size: 1.4rem;
  font-weight: 800;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(29, 78, 216, 0.5), inset 0 2px 5px rgba(255,255,255,0.3);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.c8-aavi-btn-next:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 15px 30px rgba(29, 78, 216, 0.6), inset 0 2px 5px rgba(255,255,255,0.4);
}

.c8-aavi-btn-next.final {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  box-shadow: 0 10px 25px rgba(5, 150, 105, 0.5), inset 0 2px 5px rgba(255,255,255,0.3);
}

.c8-aavi-btn-next.final:hover {
  box-shadow: 0 15px 30px rgba(5, 150, 105, 0.6), inset 0 2px 5px rgba(255,255,255,0.4);
}

/* Lemonade Ripple Animation */
.c8-aavi-lemonade-ripple {
  position: absolute;
  bottom: 12%;
  left: 33%;
  width: 120px;
  height: 60px;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%);
  animation: ripple-liquid 2s infinite ease-in-out;
  pointer-events: none;
  transform: rotate(-10deg);
}

@keyframes ripple-liquid {
  0% { transform: rotate(-10deg) scale(0.9); opacity: 0.3; }
  50% { transform: rotate(-10deg) scale(1.1); opacity: 0.7; }
  100% { transform: rotate(-10deg) scale(0.9); opacity: 0.3; }
}
"""

with open(css_path, 'a', encoding='utf-8') as f:
    f.write(css_append)
