import re

file_path = r'c:\futurax\Futura-Edtech\src\maths\class6\chapter1\VisualisingSequences.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update SequenceVisualizer case 4
old_case_4 = """      case 4: // Even numbers
        return (
          <svg viewBox="0 0 600 120" className="seq-svg">
            <g transform="translate(40, 20)">
              {[2, 4, 6, 8, 10, 12].map((num, i) => (
                <g key={i} transform={`translate(${i * 60}, 0)`}>
                  {[...Array(num)].map((_, j) => (
                    <rect key={j} x={(j % 2) * 12} y={Math.floor(j / 2) * 12} width="10" height="10" rx="2" fill="#8b5cf6" className="anim-pop" style={{ animationDelay: `${(i * 0.1) + (j * 0.05)}s` }} />
                  ))}
                  <text x="10" y={(num / 2) * 12 + 15} fill="#94a3b8" fontSize="10" textAnchor="middle">{num}</text>
                </g>
              ))}
            </g>
          </svg>
        );"""

new_case_4 = """      case 4: { // Even numbers
        const offsets = [0, 50, 124, 222, 344, 490];
        return (
          <svg viewBox="0 0 650 140" className="seq-svg">
            <g transform="translate(40, 40)">
              {[2, 4, 6, 8, 10, 12].map((num, i) => {
                const cols = num / 2;
                const width = cols * 24;
                const centerX = offsets[i] + width / 2;
                return (
                  <g key={i}>
                    {[...Array(num)].map((_, j) => {
                      const col = Math.floor(j / 2);
                      const row = j % 2;
                      return (
                        <rect key={j} x={offsets[i] + col * 24} y={row * 24} width="20" height="20" rx="4" fill="#8b5cf6" className="anim-pop" style={{ animationDelay: `${(i * 0.1) + (col * 0.1)}s` }} />
                      );
                    })}
                    <text x={centerX} y={70} fill="#94a3b8" fontSize="14" fontWeight="bold" textAnchor="middle" className="anim-fade" style={{ animationDelay: `${i * 0.1 + cols * 0.1 + 0.1}s` }}>{num}</text>
                  </g>
                );
              })}
            </g>
          </svg>
        );
      }"""

content = content.replace(old_case_4, new_case_4)


# 2. Add EvenNumbersTutorial component
even_tutorial = """const EvenNumbersTutorial = () => {
  const [step, setStep] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shakeId, setShakeId] = useState(null);
  const [showCorrect, setShowCorrect] = useState(false);

  const handleAnswer = (val) => {
    if (val === 8) {
      setSelectedAnswer(val);
      setTimeout(() => setShowCorrect(true), 300);
      setTimeout(() => setStep(3), 1200);
    } else {
      setShakeId(val);
      setTimeout(() => setShakeId(null), 500);
    }
  };

  const offsets = [0, 60, 144, 252];

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '10px 20px', boxSizing: 'border-box', position: 'relative' }}>
      
      {/* Progress Pill */}
      <div style={{ position: 'absolute', top: '10px', left: '20px', background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.3)', color: '#60a5fa', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', zIndex: 20, letterSpacing: '0.5px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
        Step {step} of 3: {step === 1 ? 'Watch' : step === 2 ? 'Try It' : 'Success!'}
      </div>

      {/* SVG Graphic Area */}
      <div style={{ flex: step === 1 ? 1 : 0.5, transition: 'flex 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: '180px' }}>
        <svg viewBox="0 0 600 160" className="seq-svg" style={{ width: '100%', maxWidth: '750px', overflow: 'visible', transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)', transform: step >= 2 ? 'scale(0.8) translateY(20px)' : 'scale(1)' }}>
          <g transform="translate(100, 40)">
            {[2, 4, 6].map((num, i) => {
              const cols = num / 2;
              const centerX = offsets[i] + (cols * 30) / 2;
              return (
                <g key={i} className="anim-fade" style={{ animationDelay: `${i * 1.5}s` }}>
                  {[...Array(num)].map((_, j) => {
                    const col = Math.floor(j / 2);
                    const row = j % 2;
                    return (
                      <rect key={j} x={offsets[i] + col * 30} y={row * 30} width="26" height="26" rx="6" fill="#8b5cf6" className="anim-pop" style={{ animationDelay: `${i * 1.5 + col * 0.15}s` }} />
                    );
                  })}
                  <text x={centerX} y={80} fill="#8b5cf6" fontSize="22" fontWeight="bold" textAnchor="middle" className="anim-fade" style={{ animationDelay: `${i * 1.5 + cols * 0.15 + 0.3}s`, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
                    {num}
                  </text>
                </g>
              );
            })}

            {showCorrect && (
              <g className="anim-fade" style={{ animationDelay: '0s' }}>
                {[...Array(8)].map((_, j) => {
                  const col = Math.floor(j / 2);
                  const row = j % 2;
                  return (
                    <rect key={j} x={offsets[3] + col * 30} y={row * 30} width="26" height="26" rx="6" fill="#8b5cf6" className="anim-pop" style={{ animationDelay: `${col * 0.15}s` }} />
                  );
                })}
                <text x={offsets[3] + (4 * 30) / 2} y={80} fill="#8b5cf6" fontSize="22" fontWeight="bold" textAnchor="middle" className="anim-fade" style={{ animationDelay: `0.6s`, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
                  8
                </text>
              </g>
            )}

            {step === 2 && !showCorrect && (
              <g className="anim-fade">
                {[...Array(8)].map((_, j) => {
                  const col = Math.floor(j / 2);
                  const row = j % 2;
                  return (
                    <rect key={j} x={offsets[3] + col * 30} y={row * 30} width="26" height="26" rx="6" fill="rgba(255,255,255,0.02)" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" className="anim-pop" style={{ animationDelay: `${j * 0.05}s` }} />
                  );
                })}
                <text x={offsets[3] + (4 * 30) / 2} y={35} fill="#94a3b8" fontSize="32" fontWeight="bold" textAnchor="middle" className="anim-fade" style={{ animationDelay: `0.5s` }}>?</text>
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
              <div style={{ color: '#8b5cf6', fontSize: '14px', fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase' }}>PATTERN RULE</div>
              <div style={{ background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.3)', color: '#c4b5fd', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '700', letterSpacing: '0.5px' }}>Pairs</div>
            </div>

            <h4 style={{ color: '#f8fafc', margin: '0 0 24px 0', fontSize: '28px', fontWeight: '800', textAlign: 'left' }}>Even numbers always come in pairs!</h4>
            
            <p style={{ color: '#94a3b8', margin: '0 0 32px 0', fontSize: '16px', lineHeight: '1.6', textAlign: 'left' }}>
              Notice how every even number can be arranged in exactly <strong>2 rows</strong> perfectly. There is never an odd block left over!<br/><br/>
              To get the next even number, you just add another pair (one column of 2).
            </p>
            
            <div style={{ textAlign: 'center' }}>
              <button 
                onClick={() => setStep(2)}
                className="anim-pop quiz-btn" 
                style={{ animationDelay: '6s', padding: '16px 40px', background: 'linear-gradient(to bottom, #3b82f6, #2563eb)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', fontSize: '18px', fontWeight: '800', cursor: 'pointer', transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)', boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)' }}
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
                  What comes after 6?
                </p>
                <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
                  {[7, 8, 9].map(val => (
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
                  Awesome! You just added another column (pair) to make 8!
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

content = content.replace("export default function VisualisingSequences({ onNext }) {", even_tutorial + "\nexport default function VisualisingSequences({ onNext }) {")

# 3. Update slides definition
new_slides_loop = """    { type: 'tutorial', patternId: 3, title: "Summing Odd Numbers", desc: "Making Perfect Squares" },
    { type: 'pattern', patternId: 3 },
    { type: 'tutorial', patternId: 4, title: "Even Numbers in Pairs", desc: "Always divisible by 2" },
    { type: 'pattern', patternId: 4 }
  ];
  
  // Dynamically add the remaining sequence patterns
  for (let i = 5; i <= SEQUENCES.length; i++) {"""

content = content.replace(
    "    { type: 'tutorial', patternId: 3, title: \"Summing Odd Numbers\", desc: \"Making Perfect Squares\" },\n    { type: 'pattern', patternId: 3 }\n  ];\n  \n  // Dynamically add the remaining sequence patterns\n  for (let i = 4; i <= SEQUENCES.length; i++) {",
    new_slides_loop
)

# 4. Update the render logic
old_render = "{currentSlide.patternId === 1 ? <SequenceTutorial /> : currentSlide.patternId === 2 ? <CountingTutorial /> : <OddNumbersTutorial />}"
new_render = "{currentSlide.patternId === 1 ? <SequenceTutorial /> : currentSlide.patternId === 2 ? <CountingTutorial /> : currentSlide.patternId === 3 ? <OddNumbersTutorial /> : <EvenNumbersTutorial />}"

content = content.replace(old_render, new_render)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated successfully")
