import re

file_path = r'c:\futurax\Futura-Edtech\src\maths\class6\chapter1\VisualisingSequences.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

odd_tutorial = """const OddNumbersTutorial = () => {
  const [step, setStep] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shakeId, setShakeId] = useState(null);
  const [showCorrect, setShowCorrect] = useState(false);

  const colors3 = ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#06b6d4'];

  const handleAnswer = (val) => {
    if (val === 7) {
      setSelectedAnswer(val);
      setTimeout(() => setShowCorrect(true), 300);
      setTimeout(() => setStep(3), 1200);
    } else {
      setShakeId(val);
      setTimeout(() => setShakeId(null), 500);
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '10px 20px', boxSizing: 'border-box', position: 'relative' }}>
      
      {/* Progress Pill */}
      <div style={{ position: 'absolute', top: '10px', left: '20px', background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.3)', color: '#60a5fa', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', zIndex: 20, letterSpacing: '0.5px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
        Step {step} of 3: {step === 1 ? 'Watch' : step === 2 ? 'Try It' : 'Success!'}
      </div>

      {/* SVG Graphic Area */}
      <div style={{ flex: step === 1 ? 1 : 0.5, transition: 'flex 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: '180px' }}>
        <svg viewBox="0 0 600 240" className="seq-svg" style={{ width: '100%', maxWidth: '750px', overflow: 'visible', transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)', transform: step >= 2 ? 'scale(0.8) translateY(20px)' : 'scale(1)' }}>
          <g transform="translate(180, 40)">
            {[0, 1, 2].map((layer) => (
              <g key={layer} className="anim-fade" style={{ animationDelay: `${layer * 2}s` }}>
                {[...Array(layer * 2 + 1)].map((_, j) => {
                  const isTop = j <= layer;
                  const x = isTop ? j : layer;
                  const y = isTop ? layer : layer - (j - layer);
                  return (
                    <rect key={j} x={x * 24} y={y * 24} width="20" height="20" rx="6" fill={colors3[layer]} className="anim-pop" style={{ animationDelay: `${layer * 2 + j * 0.1}s` }} />
                  );
                })}
                <text x={layer * 24 + 10} y={-10} fill={colors3[layer]} fontSize="18" fontWeight="bold" textAnchor="middle" className="anim-fade" style={{ animationDelay: `${layer * 2 + 0.8}s`, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
                  +{layer * 2 + 1}
                </text>
              </g>
            ))}

            {showCorrect && (
              <g className="anim-fade" style={{ animationDelay: '0s' }}>
                {[...Array(7)].map((_, j) => {
                  const layer = 3;
                  const isTop = j <= layer;
                  const x = isTop ? j : layer;
                  const y = isTop ? layer : layer - (j - layer);
                  return (
                    <rect key={j} x={x * 24} y={y * 24} width="20" height="20" rx="6" fill={colors3[layer]} className="anim-pop" style={{ animationDelay: `${j * 0.1}s` }} />
                  );
                })}
                <text x={3 * 24 + 10} y={-10} fill={colors3[3]} fontSize="18" fontWeight="bold" textAnchor="middle" className="anim-fade" style={{ animationDelay: `0.8s`, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
                  +7
                </text>
              </g>
            )}

            {step === 2 && !showCorrect && (
              <g className="anim-fade">
                {[...Array(7)].map((_, j) => {
                  const layer = 3;
                  const isTop = j <= layer;
                  const x = isTop ? j : layer;
                  const y = isTop ? layer : layer - (j - layer);
                  return (
                    <rect key={j} x={x * 24} y={y * 24} width="20" height="20" rx="6" fill="rgba(255,255,255,0.02)" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" className="anim-pop" style={{ animationDelay: `${j * 0.05}s` }} />
                  );
                })}
                <text x={3 * 24 + 10} y={-15} fill="#94a3b8" fontSize="24" fontWeight="bold" textAnchor="middle" className="anim-fade" style={{ animationDelay: `0.5s` }}>?</text>
              </g>
            )}
            
            {/* The Text Explanation for Step 1 */}
            {step === 1 && (
              <text x="180" y="50" fill="#f8fafc" fontSize="24" fontWeight="bold" className="anim-fade" style={{ animationDelay: '6s' }}>
                Sum of odds = Perfect Squares
              </text>
            )}
          </g>
        </svg>
      </div>
      
      {/* Dynamic Content Area */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', flex: step === 1 ? 0 : 1, width: '100%', transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
        
        {step === 1 && (
          <div className="anim-fade" style={{ animationDelay: '7s', background: 'linear-gradient(145deg, #1e293b, #0f172a)', border: '1px solid rgba(255,255,255,0.05)', padding: '32px 40px', borderRadius: '24px', boxShadow: '0 24px 48px rgba(0,0,0,0.5)', width: '100%', maxWidth: '700px', zIndex: 10 }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div style={{ color: '#f59e0b', fontSize: '14px', fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase' }}>PATTERN RULE</div>
              <div style={{ background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#fcd34d', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '700', letterSpacing: '0.5px' }}>Shape-shifting</div>
            </div>

            <h4 style={{ color: '#f8fafc', margin: '0 0 24px 0', fontSize: '28px', fontWeight: '800', textAlign: 'left' }}>Adding odd numbers builds perfect squares!</h4>
            
            <p style={{ color: '#94a3b8', margin: '0 0 32px 0', fontSize: '16px', lineHeight: '1.6', textAlign: 'left' }}>
              Each new odd number wraps around the previous square like an "L", forming the next bigger square. <br/><br/>
              <strong>1</strong> + <strong style={{color: '#f97316'}}>3</strong> = <strong>4</strong> (2x2 square) <br/>
              <strong>4</strong> + <strong style={{color: '#f59e0b'}}>5</strong> = <strong>9</strong> (3x3 square)
            </p>
            
            <div style={{ textAlign: 'center' }}>
              <button 
                onClick={() => setStep(2)}
                className="anim-pop" 
                style={{ animationDelay: '8s', padding: '16px 40px', background: 'linear-gradient(to bottom, #3b82f6, #2563eb)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', fontSize: '18px', fontWeight: '800', cursor: 'pointer', transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)', boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)' }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(59, 130, 246, 0.5)'; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(59, 130, 246, 0.4)'; }}
              >
                Next: Try It Yourself!
              </button>
            </div>
          </div>
        )}

        {step >= 2 && (
          <div className="anim-fade" style={{ background: 'linear-gradient(145deg, #1e293b, #0f172a)', border: '1px solid rgba(59,130,246,0.2)', padding: '40px', borderRadius: '24px', boxShadow: '0 24px 48px rgba(0,0,0,0.5)', width: '100%', maxWidth: '700px', textAlign: 'center', zIndex: 10 }}>
            {step === 2 ? (
              <>
                <h4 style={{ color: '#60a5fa', margin: '0 0 16px 0', fontSize: '14px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>Learning Checkpoint</h4>
                <p style={{ color: '#f8fafc', margin: '0 0 32px 0', fontSize: '24px', fontWeight: '600' }}>
                  What is the next odd number to add to make a 4x4 square?
                </p>
                <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
                  {[5, 6, 7].map(val => (
                    <button
                      key={val}
                      onClick={() => handleAnswer(val)}
                      className={`quiz-btn ${selectedAnswer === val ? 'selected' : ''}`}
                      style={{
                        background: selectedAnswer === val ? 'linear-gradient(to bottom, #3b82f6, #2563eb)' : 'linear-gradient(to bottom, #1e293b, #0f172a)',
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
                  <div className="celebration-ring-blue" style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '4px solid #3b82f6', opacity: 0 }}></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'linear-gradient(to right, rgba(59,130,246,0.1), rgba(59,130,246,0.2))', border: '1px solid rgba(59,130,246,0.3)', padding: '12px 32px', borderRadius: '30px', boxShadow: '0 12px 32px rgba(59,130,246,0.2)', zIndex: 2 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '16px', background: 'linear-gradient(to bottom, #60a5fa, #2563eb)', color: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <span style={{ color: '#60a5fa', fontSize: '20px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>Pattern Mastered</span>
                  </div>
                </div>
                
                <p style={{ color: '#f8fafc', fontSize: '22px', fontWeight: '700', margin: '0 0 16px 0' }}>
                  Awesome! Adding 7 gives us a 4x4 square (16 blocks total).
                </p>
                <p style={{ color: '#94a3b8', margin: 0, fontSize: '18px' }}>
                  Click <strong style={{ color: '#60a5fa' }}>"Next Pattern"</strong> to discover the next rule!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
"""

content = content.replace("export default function VisualisingSequences({ onNext }) {", odd_tutorial + "\nexport default function VisualisingSequences({ onNext }) {")

# Update slides definition
old_slides_loop = """  // Dynamically add the remaining sequence patterns
  for (let i = 3; i <= SEQUENCES.length; i++) {"""

new_slides_loop = """    { type: 'tutorial', patternId: 3, title: "Summing Odd Numbers", desc: "Making Perfect Squares" },
    { type: 'pattern', patternId: 3 }
  ];
  
  // Dynamically add the remaining sequence patterns
  for (let i = 4; i <= SEQUENCES.length; i++) {"""

content = content.replace(
    "  ];\n  \n  // Dynamically add the remaining sequence patterns\n  for (let i = 3; i <= SEQUENCES.length; i++) {",
    new_slides_loop
)

# Update the render logic
old_render = "{currentSlide.patternId === 1 ? <SequenceTutorial /> : <CountingTutorial />}"
new_render = "{currentSlide.patternId === 1 ? <SequenceTutorial /> : currentSlide.patternId === 2 ? <CountingTutorial /> : <OddNumbersTutorial />}"

content = content.replace(old_render, new_render)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated successfully")
