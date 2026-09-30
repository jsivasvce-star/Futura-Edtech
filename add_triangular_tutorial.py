import re

file_path = r'c:\futurax\Futura-Edtech\src\maths\class6\chapter1\VisualisingSequences.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Create TriangularNumbersTutorial Component
new_tutorial_code = """const TriangularNumbersTutorial = () => {
  const [step, setStep] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shakeId, setShakeId] = useState(null);
  const [showCorrect, setShowCorrect] = useState(false);

  const handleAnswer = (val) => {
    if (val === 10) {
      setSelectedAnswer(val);
      setTimeout(() => setShowCorrect(true), 300);
      setTimeout(() => setStep(3), 1200);
    } else {
      setShakeId(val);
      setTimeout(() => setShakeId(null), 500);
    }
  };

  const offsets = [0, 80, 190, 340];
  const nums = [1, 2, 3]; // The base widths for 1, 3, 6

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '10px 20px', boxSizing: 'border-box', position: 'relative' }}>
      
      {/* Progress Pill */}
      <div style={{ position: 'absolute', top: '10px', left: '20px', background: 'rgba(236, 72, 153, 0.15)', border: '1px solid rgba(236, 72, 153, 0.3)', color: '#f472b6', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', zIndex: 20, letterSpacing: '0.5px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
        Step {step} of 3: {step === 1 ? 'Watch' : step === 2 ? 'Try It' : 'Success!'}
      </div>

      {/* SVG Graphic Area */}
      <div style={{ flex: step === 1 ? 1 : 0.5, transition: 'flex 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: '180px' }}>
        <svg viewBox="0 -10 600 200" className="seq-svg" style={{ width: '100%', maxWidth: '800px', overflow: 'visible', transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)', transform: step >= 2 ? 'scale(0.8) translateY(20px)' : 'scale(1)' }}>
          <g transform="translate(60, 20)">
            {nums.map((num, i) => {
              const dots = [];
              for (let row = 0; row < num; row++) {
                for (let col = 0; col <= row; col++) {
                  const x = offsets[i] + (col * 32) - (row * 16);
                  const y = row * 28;
                  dots.push(
                    <circle key={`${row}-${col}`} cx={x} cy={y} r="14" fill="#ec4899" className="anim-pop" style={{ animationDelay: `${i * 1.5 + row * 0.1}s` }} />
                  );
                }
              }
              const totalDots = num * (num + 1) / 2;
              return (
                <g key={i} className="anim-fade" style={{ animationDelay: `${i * 1.5}s` }}>
                  {dots}
                  <text x={offsets[i]} y={140} fill="#ec4899" fontSize="28" fontWeight="bold" textAnchor="middle" className="anim-fade" style={{ animationDelay: `${i * 1.5 + num * 0.15 + 0.3}s`, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
                    {totalDots}
                  </text>
                </g>
              );
            })}

            {showCorrect && (
              <g className="anim-fade" style={{ animationDelay: '0s' }}>
                {(() => {
                  const dots = [];
                  for (let row = 0; row < 4; row++) {
                    for (let col = 0; col <= row; col++) {
                      const x = offsets[3] + (col * 32) - (row * 16);
                      const y = row * 28;
                      dots.push(
                        <circle key={`${row}-${col}`} cx={x} cy={y} r="14" fill="#ec4899" className="anim-pop" style={{ animationDelay: `${row * 0.1}s` }} />
                      );
                    }
                  }
                  return dots;
                })()}
                <text x={offsets[3]} y={140} fill="#ec4899" fontSize="28" fontWeight="bold" textAnchor="middle" className="anim-fade" style={{ animationDelay: `0.6s`, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
                  10
                </text>
              </g>
            )}

            {step === 2 && !showCorrect && (
              <g className="anim-fade">
                {(() => {
                  const dots = [];
                  for (let row = 0; row < 4; row++) {
                    for (let col = 0; col <= row; col++) {
                      const x = offsets[3] + (col * 32) - (row * 16);
                      const y = row * 28;
                      dots.push(
                        <circle key={`${row}-${col}`} cx={x} cy={y} r="14" fill="rgba(255,255,255,0.02)" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" className="anim-pop" style={{ animationDelay: `${row * 0.05}s` }} />
                      );
                    }
                  }
                  return dots;
                })()}
                <text x={offsets[3]} y={60} fill="#94a3b8" fontSize="48" fontWeight="bold" textAnchor="middle" className="anim-fade" style={{ animationDelay: `0.5s` }}>?</text>
              </g>
            )}
          </g>
        </svg>
      </div>
      
      {/* Dynamic Content Area */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', flex: step === 1 ? 0 : 1, width: '100%', transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
        
        {step === 1 && (
          <div className="anim-fade" style={{ animationDelay: '5s', background: 'linear-gradient(145deg, #1e293b, #0f172a)', border: '1px solid rgba(255,255,255,0.05)', padding: '32px 40px', borderRadius: '24px', boxShadow: '0 24px 48px rgba(0,0,0,0.5)', width: '100%', maxWidth: '700px', zIndex: 10 }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div style={{ color: '#ec4899', fontSize: '14px', fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase' }}>PATTERN RULE</div>
              <div style={{ background: 'rgba(236, 72, 153, 0.15)', border: '1px solid rgba(236, 72, 153, 0.3)', color: '#f472b6', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '700', letterSpacing: '0.5px' }}>Pyramids</div>
            </div>

            <h4 style={{ color: '#f8fafc', margin: '0 0 24px 0', fontSize: '28px', fontWeight: '800', textAlign: 'left' }}>Building a bigger triangle!</h4>
            
            <p style={{ color: '#94a3b8', margin: '0 0 32px 0', fontSize: '16px', lineHeight: '1.6', textAlign: 'left' }}>
              Every time you build the next triangle, you simply add a new bottom row that is <strong>one block wider</strong> than the previous row!<br/><br/>
              Notice how the 3rd triangle has a base of 3 blocks.
            </p>
            
            <div style={{ textAlign: 'center' }}>
              <button 
                onClick={() => setStep(2)}
                className="anim-pop quiz-btn" 
                style={{ animationDelay: '6s', padding: '16px 40px', background: 'linear-gradient(to bottom, #ec4899, #db2777)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', fontSize: '18px', fontWeight: '800', cursor: 'pointer', transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)', boxShadow: '0 8px 24px rgba(236, 72, 153, 0.4)' }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(236, 72, 153, 0.5)'; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(236, 72, 153, 0.4)'; }}
              >
                Next: Try It Yourself!
              </button>
            </div>
          </div>
        )}

        {step >= 2 && (
          <div className="anim-fade" style={{ background: 'linear-gradient(145deg, #1e293b, #0f172a)', border: '1px solid rgba(236,72,153,0.2)', padding: '40px', borderRadius: '24px', boxShadow: '0 24px 48px rgba(0,0,0,0.5)', width: '100%', maxWidth: '700px', textAlign: 'center', zIndex: 10 }}>
            {step === 2 ? (
              <>
                <h4 style={{ color: '#f472b6', margin: '0 0 16px 0', fontSize: '14px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>Learning Checkpoint</h4>
                <p style={{ color: '#f8fafc', margin: '0 0 32px 0', fontSize: '24px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  What comes next in this pattern? <strong style={{ color: '#ec4899', fontSize: '28px', letterSpacing: '2px', background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.2)', padding: '6px 16px', borderRadius: '12px', marginLeft: '12px' }}>1, 3, 6, __</strong>
                </p>
                <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
                  {[8, 9, 10].map(val => (
                    <button
                      key={val}
                      onClick={() => handleAnswer(val)}
                      className={`quiz-btn ${selectedAnswer === val ? 'selected' : ''}`}
                      style={{
                        background: selectedAnswer === val ? 'linear-gradient(to bottom, #ec4899, #db2777)' : 'linear-gradient(to bottom, #1e293b, #0f172a)',
                        border: selectedAnswer === val ? '2px solid rgba(255,255,255,0.4)' : '2px solid #334155',
                        transform: shakeId === val ? 'translateX(-5px) translateX(5px)' : 'none',
                        animation: shakeId === val ? 'shake 0.4s' : 'none',
                      }}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="anim-pop" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <div className="celebration-ring-pink" style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '4px solid #ec4899', opacity: 0 }}></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'linear-gradient(to right, rgba(236,72,153,0.1), rgba(236,72,153,0.2))', border: '1px solid rgba(236,72,153,0.3)', padding: '12px 32px', borderRadius: '30px', boxShadow: '0 12px 32px rgba(236,72,153,0.2)', zIndex: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '16px', background: 'linear-gradient(to bottom, #f472b6, #db2777)', color: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span style={{ color: '#f472b6', fontSize: '20px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>Pattern Mastered</span>
                  </div>
                </div>
                
                <p style={{ color: '#f8fafc', fontSize: '22px', fontWeight: '700', margin: '0 0 16px 0' }}>
                  Awesome! You just added a base of 4 blocks to make 10!
                </p>
                <p style={{ color: '#94a3b8', margin: 0, fontSize: '18px' }}>
                  Click <strong style={{ color: '#f472b6' }}>"Next Pattern"</strong> to discover the next rule!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <style>{`
        @keyframes ringExpandPink {
          0% { transform: scale(0.8); opacity: 1; border-width: 8px; }
          100% { transform: scale(1.8); opacity: 0; border-width: 1px; }
        }
        .celebration-ring-pink {
          animation: ringExpandPink 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          animation-delay: 0.2s;
        }
        .quiz-btn {
          padding: 16px 40px;
          font-size: 32px;
          font-weight: 900;
          color: white;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 8px 16px rgba(0,0,0,0.4);
          position: relative;
          overflow: hidden;
        }
        .quiz-btn::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,0));
          pointer-events: none;
        }
        .quiz-btn:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 12px 24px rgba(0,0,0,0.5);
        }
        .quiz-btn.selected {
          transform: scale(0.95);
          box-shadow: 0 0 20px rgba(255,255,255,0.4), inset 0 4px 8px rgba(0,0,0,0.4);
        }
      `}</style>
    </div>
  );
};
"""

# Insert the new component right before "export default function VisualisingSequences"
insert_target = "export default function VisualisingSequences"
content = content.replace(insert_target, new_tutorial_code + "\n\n" + insert_target)

# 2. Modify the slides array inside VisualisingSequences
slides_old = """  const slides = [
    { type: 'intro', id: 'intro', title: "Number Sequences", desc: "Introduction" },
    { type: 'tutorial', patternId: 1, title: "How to Read Patterns", desc: "Step-by-Step Guide" },
    { type: 'pattern', patternId: 1 },
    { type: 'tutorial', patternId: 2, title: "Growing the Pattern", desc: "Counting Numbers Guide" },
    { type: 'pattern', patternId: 2 },
    { type: 'tutorial', patternId: 3, title: "Summing Odd Numbers", desc: "Making Perfect Squares" },
    { type: 'pattern', patternId: 3 },
    { type: 'tutorial', patternId: 4, title: "Even Numbers in Pairs", desc: "Always divisible by 2" },
    { type: 'pattern', patternId: 4 }
  ];"""

# Replace "Summing Odd Numbers" with "The Odd One Out" in slides array as requested earlier
slides_new = """  const slides = [
    { type: 'intro', id: 'intro', title: "Number Sequences", desc: "Introduction" },
    { type: 'tutorial', patternId: 1, title: "How to Read Patterns", desc: "Step-by-Step Guide" },
    { type: 'pattern', patternId: 1 },
    { type: 'tutorial', patternId: 2, title: "Growing the Pattern", desc: "Counting Numbers Guide" },
    { type: 'pattern', patternId: 2 },
    { type: 'tutorial', patternId: 3, title: "The Odd One Out", desc: "Always one block left" },
    { type: 'pattern', patternId: 3 },
    { type: 'tutorial', patternId: 4, title: "Even Numbers in Pairs", desc: "Always divisible by 2" },
    { type: 'pattern', patternId: 4 }
  ];
  
  // Add triangular numbers tutorial dynamically
  slides.push({ type: 'tutorial', patternId: 5, title: "Triangular Pyramids", desc: "Building a wider base" });"""

content = content.replace(slides_old, slides_new)

# 3. Add TriangularNumbersTutorial to the rendering switch
render_old = """      {currentSlide.type === 'tutorial' && currentSlide.patternId === 3 && <OddNumbersTutorial />}
      {currentSlide.type === 'tutorial' && currentSlide.patternId === 4 && <EvenNumbersTutorial />}
      {currentSlide.type === 'pattern' && <SequenceVisualizer patternId={currentSlide.patternId} />}"""

render_new = """      {currentSlide.type === 'tutorial' && currentSlide.patternId === 3 && <OddNumbersTutorial />}
      {currentSlide.type === 'tutorial' && currentSlide.patternId === 4 && <EvenNumbersTutorial />}
      {currentSlide.type === 'tutorial' && currentSlide.patternId === 5 && <TriangularNumbersTutorial />}
      {currentSlide.type === 'pattern' && <SequenceVisualizer patternId={currentSlide.patternId} />}"""

content = content.replace(render_old, render_new)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated successfully")
