const fs = require('fs');
let content = fs.readFileSync('C:/Users/GANES/Futura-Edtech/src/science/class6/chapter2/version2/Chapter2LearningLab.jsx', 'utf8');

const overlayCode = `
        {/* ============================================================ */}
        {/* TRANSITION OVERLAY FOR ACTIVITY 2.1                          */}
        {/* ============================================================ */}
        {isPlayingTransition && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 9999, background: '#000' }}>
            <video disablePictureInPicture 
              src={activity21TransitionVideo} 
              autoPlay 
              playsInline 
              onEnded={() => {
                setIsTransitionVideoEnded(true);
              }}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                filter: isTransitionVideoEnded ? 'blur(8px)' : 'none',
                transition: 'filter 0.5s ease'
              }}
            />
            
            {/* Navigation UI that appears when video ends */}
            {isTransitionVideoEnded && (
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '32px',
                background: 'rgba(0, 0, 0, 0.45)', // Subtle dark overlay
                zIndex: 10000
              }}>
                {/* Top empty space to push center card to center */}
                <div />
                
                {/* Center Card */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                  <div style={{
                    background: '#F3EFE0', // cream/light yellow
                    border: '2px solid #84A98C', // subtle green border
                    borderRadius: '24px',
                    padding: '48px 64px',
                    maxWidth: '700px',
                    textAlign: 'center',
                    position: 'relative',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.25)',
                    overflow: 'hidden'
                  }}>
                    {/* Botanical decoration top */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
                      <div style={{ height: '1px', width: '40px', background: '#84A98C' }} />
                      <Leaf color="#4B7F52" size={28} />
                      <div style={{ height: '1px', width: '40px', background: '#84A98C' }} />
                    </div>
                    
                    <h2 style={{
                      color: '#2D4A22',
                      fontSize: '28px',
                      fontWeight: '800',
                      lineHeight: '1.4',
                      marginBottom: '24px',
                      fontFamily: 'Outfit, sans-serif'
                    }}>
                      We observed many different<br />
                      plants and animals around us.
                    </h2>
                    
                    <div style={{ height: '1px', width: '40px', background: '#84A98C', margin: '0 auto 24px auto' }} />

                    <p style={{
                      color: '#4A5D23',
                      fontSize: '20px',
                      fontWeight: '500',
                      lineHeight: '1.5'
                    }}>
                      Now, let's take a closer look at them<br />
                      and see how they are different.
                    </p>
                    
                    {/* Subtle side leaves decoration */}
                    <div style={{ position: 'absolute', left: '-20px', top: '50%', transform: 'translateY(-50%)', opacity: 0.15 }}>
                      <Leaf size={100} color="#4B7F52" />
                    </div>
                    <div style={{ position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%) scaleX(-1)', opacity: 0.15 }}>
                      <Leaf size={100} color="#4B7F52" />
                    </div>
                  </div>
                </div>
                
                {/* Bottom Navigation */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button 
                    onClick={() => {
                      setIsPlayingTransition(false);
                      setIsTransitionVideoEnded(false);
                      setCurrentStep(transitionSourceStep);
                      if (transitionSourceStep === 1) {
                        setSection1SubTab('scenes');
                        setIntroInitialScene(6);
                      }
                    }}
                    style={{
                      background: '#F3EFE0',
                      color: '#1E293B',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px 28px',
                      fontSize: '18px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                      transition: 'transform 0.2s'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  >
                    <ArrowLeft size={20} /> Back
                  </button>
                  
                  <button 
                    className="bio-cta-btn"
                    onClick={() => {
                      setIsPlayingTransition(false);
                      setIsTransitionVideoEnded(false);
                      setCurrentStep(transitionTargetStep);
                      if (transitionTargetStep === 1) {
                        setSection1SubTab('scenes');
                        setIntroInitialScene(6);
                      }
                    }}
                  >
                    Next <ArrowRight size={20} style={{ marginLeft: '6px' }} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}`;

const target1 = `        {/* ============================================================ */}
        {/* TAB 1: SECTION 1 — SLOGAN PAGE & STORY SCENES                */}`;

content = content.replace(target1, overlayCode + '\n' + target1);

const target2Start = content.indexOf('{isPlayingTransition ? (');
const target2End = content.indexOf(') : (\n                  <IntroStoryteller');
const introCode = `<IntroStoryteller
                  initialScene={introInitialScene}
                  onComplete={() => {
                    setTransitionDirection('forward');
                    setTransitionSourceStep(1);
                    setTransitionTargetStep(2);
                    setIsPlayingTransition(true);
                  }}
                  onBack={() => {
                    setSection1SubTab('slogan');
                    setSloganInitialPage(5);
                  }}
                />`;

const target2ToReplace = content.substring(target2Start, target2End + ') : (\n                  <IntroStoryteller'.length - '<IntroStoryteller'.length) + `<IntroStoryteller
                    initialScene={introInitialScene}
                    onComplete={() => {
                      setTransitionDirection('forward');
                      setIsPlayingTransition(true);
                    }}
                    onBack={() => {
                      setSection1SubTab('slogan');
                      setSloganInitialPage(5);
                    }}
                  />
                )}`;

content = content.replace(target2ToReplace, introCode);

const target3 = `                // IMPORTANT: since the transition video is inside step 1, we must switch to step 1 right away
                setCurrentStep(1);
                setSection1SubTab('scenes');`;

content = content.replace(target3, '');

fs.writeFileSync('C:/Users/GANES/Futura-Edtech/src/science/class6/chapter2/version2/Chapter2LearningLab.jsx', content);
console.log('done!');
