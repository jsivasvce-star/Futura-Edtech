import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { ArrowRight } from 'lucide-react';
import classroomObjectsImg from '../../../../../../assets/handbook_right_illustration.jpg';
import ancientPotteryImg from '../../../../../../assets/ancient_pottery_fragments.jpg';
import potterShapingImg from '../../../../../../assets/potter_shaping_clay.jpg';
import potteryPatternsImg from '../../../../../../assets/traditional_pottery_patterns.jpg';
import potteryKilnImg from '../../../../../../assets/traditional_pottery_kiln.jpg';
import potteryUsesImg from '../../../../../../assets/pottery_uses_storage.jpg';
import fpage8Audio from '../../../audio/fpage8.mp3?url';
import fpage8Json from '../../../json/fpage8.json';
import fpage9Audio from '../../../audio/fpage9.mp3?url';
import fpage9Json from '../../../json/fpage9.json';
import fpage10Audio from '../../../audio/fpage10.mp3?url';
import fpage10Json from '../../../json/fpage10.json';
import fpage11Audio from '../../../audio/fpage11.mp3?url';
import fpage11Json from '../../../json/fpage11.json';
import fpage12Audio from '../../../audio/fpage12.mp3?url';
import fpage12Json from '../../../json/fpage12.json';
import fpage13Audio from '../../../audio/fpage13.mp3?url';
import fpage13Json from '../../../json/fpage13.json';
const SvgIcons = {
  MagnifyingGlass: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
  ),
  Play: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>),
  Pause: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>),
  Check: () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>),
  IconCurrent: () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"></circle></svg>),
  IconLocked: () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="11" width="14" height="10" rx="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" fill="none"></path></svg>)
};


const clues = [
  {
    id: 1,
    title: "HOW OLD IS POTTERY?",
    bigFact: "7,000-8,000 YEARS",
    text: "The earliest pottery found in the Indian subcontinent dates back to 7,000 to 8,000 years in the Ganga plains and in Baluchistan.",
    timelineText: "AGE",
    image: ancientPotteryImg
  },
  {
    id: 2,
    title: "POTTERY TECHNOLOGY",
    bigFact: "AROUND 4000 BCE",
    text: "About 4000 BCE onwards, Sindhu-Sarasvati developed techniques of wheel-turned pottery production, pigmentation, application of protective or decorative coats of multiple colours, decorative painting, etc.",
    timelineText: "SHAPING",
    image: potterShapingImg
  },
  {
    id: 3,
    title: "HARAPPAN POTTERY",
    bigFact: "2600-1900 BCE",
    text: "These techniques became further sophisticated during the Sindhu-Sarasvati Civilisation, with a bright red surface painted with black-coloured designs displaying geometric patterns, and aquatic and terrestrial animals.",
    timelineText: "DESIGN",
    image: potteryPatternsImg
  },
  {
    id: 4,
    title: "HOW WAS IT MADE?",
    bigFact: "TERRACOTTA",
    text: "The clay used for making pots, dishes, bowls and other items was carefully selected and cleaned, sieved, kneaded, turned over a wheel and finally baked in kilns.",
    timelineText: "MAKING",
    image: potteryKilnImg
  },
  {
    id: 5,
    title: "HOW WAS IT USED?",
    bigFact: "STORAGE & COOKING",
    text: "Pots were used for various purposes, from cooking to storage of food grains, oil, ghee, and so on. Some very large storage jars and other pottery items are exhibited at the National Museum, New Delhi.",
    timelineText: "USES",
    image: potteryUsesImg
  }
];

const PotterySpotlight = ({ currentClue, setCurrentClue, setExtraRightAction }) => {
  const currentData = clues[currentClue - 1];
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(null);
  const audioRef = useRef(null);

  const getAudioSrc = () => {
    if (currentClue === 1) return fpage9Audio;
    if (currentClue === 2) return fpage10Audio;
    if (currentClue === 3) return fpage11Audio;
    if (currentClue === 4) return fpage12Audio;
    if (currentClue === 5) return fpage13Audio;
    return null;
  };

  const getAudioJson = () => {
    if (currentClue === 1) return fpage9Json;
    if (currentClue === 2) return fpage10Json;
    if (currentClue === 3) return fpage11Json;
    if (currentClue === 4) return fpage12Json;
    if (currentClue === 5) return fpage13Json;
    return null;
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error(e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (setExtraRightAction) {
      if (currentClue >= 1 && currentClue <= 5) {
        setExtraRightAction(
          <button
            onClick={toggleAudio}
            className="outline"
            style={{
              padding: '0.85rem 1.6rem',
              fontSize: '1.6rem',
              fontWeight: 'bold',
              gap: '0.75rem',
              borderRadius: '10px',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {isPlaying ? <SvgIcons.Pause /> : <SvgIcons.Play />} {isPlaying ? "Pause" : "Play"}
          </button>
        );
      } else {
        setExtraRightAction(null);
      }
    }
    return () => {
      if (setExtraRightAction) setExtraRightAction(null);
    };
  }, [currentClue, setExtraRightAction, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setActiveWordIndex(null);
  }, [currentClue]);

  const handleTimeUpdate = () => {
    const json = getAudioJson();
    if (audioRef.current && json) {
      const time = audioRef.current.currentTime;
      const activeIdx = json.words.findIndex(w => time >= w.start && time < w.end);
      if (activeIdx !== activeWordIndex) {
        setActiveWordIndex(activeIdx);
      }
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setActiveWordIndex(null);
  };

  const W = ({ i, children }) => {
    const indices = Array.isArray(i) ? i : [i];
    const isActive = indices.includes(activeWordIndex);
    return (
      <span
        style={{
          color: isActive ? '#FFFFFF' : 'inherit',
          background: isActive ? '#A94727' : 'transparent',
          borderRadius: '4px',
          padding: '0 2px',
          transition: 'all 0.15s ease-out'
        }}
      >
        {children}
      </span>
    );
  };

  const timelineNode = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 'auto', paddingTop: '8px', flexWrap: 'nowrap', overflow: 'hidden' }}>
      {clues.map((c, idx) => (
        <React.Fragment key={c.id}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div 
              onClick={() => setCurrentClue(c.id)}
              style={{
                width: '32px', height: '32px', 
                borderRadius: '50%',
                background: currentClue === c.id ? '#A94727' : (currentClue > c.id ? '#2C6E63' : '#D8C3A5'),
                color: currentClue === c.id || currentClue > c.id ? 'white' : '#8D6E63',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                fontWeight: 'bold', fontSize: '14px', cursor: 'pointer',
                boxShadow: currentClue === c.id ? '0 0 0 4px rgba(169, 71, 39, 0.25)' : 'none',
                flexShrink: 0
              }}
            >
              {currentClue > c.id ? <SvgIcons.Check /> : `0${c.id}`}
            </div>
            <div style={{ 
              fontSize: '11px', 
              fontWeight: '700', 
              fontFamily: "'Merriweather', Georgia, serif",
              color: currentClue === c.id ? '#A94727' : '#8D6E63',
              marginTop: '4px'
            }}>
              {c.timelineText}
            </div>
          </div>
          {idx < clues.length - 1 && (
            <div style={{ 
              height: '3px', 
              width: '40px',
              background: currentClue > c.id ? '#2C6E63' : '#D8C3A5',
              margin: '0 4px',
              flexShrink: 1,
              transform: 'translateY(-8px)'
            }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '0', boxSizing: 'border-box', overflow: 'hidden' }}>
      {getAudioSrc() && (
        <audio
          ref={audioRef}
          src={getAudioSrc()}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleAudioEnded}
        />
      )}
      <div style={{ marginBottom: '8px' }}>
        <h3 style={{ fontSize: '42px', fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, color: '#4A3B5C', margin: '0 0 8px 0', wordBreak: 'break-word', lineHeight: '1.2' }}>
          {currentClue === 1 ? (
            <><W i={0}>HOW</W> <W i={1}>OLD</W> <W i={2}>IS</W> <W i={3}>POTTERY?</W></>
          ) : currentClue === 4 ? (
            <><W i={0}>HOW</W> <W i={1}>WAS</W> <W i={2}>IT</W> <W i={3}>MADE?</W></>
          ) : currentClue === 5 ? (
            <><W i={0}>HOW</W> <W i={1}>WAS</W> <W i={2}>IT</W> <W i={3}>USED?</W></>
          ) : (
            currentData.title
          )}
        </h3>
        <div style={{ fontSize: '36px', fontFamily: "'Merriweather', Georgia, serif", fontWeight: 700, color: '#A94727', letterSpacing: '1px' }}>
          DO YOU KNOW?
        </div>
      </div>

      <div style={{ 
        flex: '1 1 auto', 
        backgroundColor: '#FDFBF7', 
        borderRadius: '12px', 
        border: '1.5px solid #D8C3A5', 
        borderLeft: '8px solid #A94727',
        padding: '20px 32px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '40px',
        marginBottom: '16px',
        minHeight: 'min-content',
        boxSizing: 'border-box',
        overflow: 'visible'
      }}>
        
        {/* Left Text Box (55-60%) */}
        <div style={{ flex: '1 1 58%', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ fontSize: '56px', fontFamily: "'Merriweather', Georgia, serif", fontWeight: 900, color: '#3E2723', marginBottom: '16px', lineHeight: '1.15', wordBreak: 'break-word' }}>
            {currentClue === 1 ? (
              <span style={{
                color: (activeWordIndex >= 16 && activeWordIndex <= 21) ? '#FFFFFF' : 'inherit',
                background: (activeWordIndex >= 16 && activeWordIndex <= 21) ? '#A94727' : 'transparent',
                borderRadius: '4px', padding: '0 2px', transition: 'all 0.15s'
              }}>7,000-8,000 YEARS</span>
            ) : currentClue === 2 ? (
              <span style={{
                color: (activeWordIndex >= 16 && activeWordIndex <= 18) ? '#FFFFFF' : 'inherit',
                background: (activeWordIndex >= 16 && activeWordIndex <= 18) ? '#A94727' : 'transparent',
                borderRadius: '4px', padding: '0 2px', transition: 'all 0.15s'
              }}>AROUND 4000 BCE</span>
            ) : currentClue === 4 ? (
              <span style={{
                color: (activeWordIndex === 4) ? '#FFFFFF' : 'inherit',
                background: (activeWordIndex === 4) ? '#A94727' : 'transparent',
                borderRadius: '4px', padding: '0 2px', transition: 'all 0.15s'
              }}>TERRACOTTA</span>
            ) : currentClue === 5 ? (
              <><W i={4}>STORAGE</W> <W i={5}>&</W> <W i={6}>COOKING</W></>
            ) : (
              currentData.bigFact
            )}
          </div>
          
          <div style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: '28px', fontWeight: 600, color: '#3E2723', lineHeight: '1.45', maxWidth: '100%', overflow: 'visible' }}>
            {currentClue === 1 ? (
              <>
                <W i={4}>The</W> <W i={5}>earliest</W> <W i={6}>pottery</W> <W i={7}>found</W> <W i={8}>in</W> <W i={9}>the</W> <W i={10}>Indian</W> <W i={11}>subcontinent</W> <W i={12}>dates</W> <W i={13}>back</W> <W i={14}>to</W> <W i={[16,17]}>7,000</W> <W i={18}>to</W> <W i={[19,20]}>8,000</W> <W i={21}>years</W> <W i={26}>in</W> <W i={27}>the</W> <W i={28}>Ganga</W> <W i={29}>plains</W> <W i={30}>and</W> <W i={31}>in</W> <W i={32}>Baluchistan.</W>
              </>
            ) : currentClue === 2 ? (
              <>
                <W i={16}>About</W> <W i={17}>4000</W> <W i={18}>BCE</W> onwards, <W i={[19,20]}>Sindhu-Sarasvati</W> <W i={21}>developed</W> <W i={22}>techniques</W> <W i={23}>of</W> <W i={[24,25]}>wheel-turned</W> <W i={26}>pottery</W> <W i={27}>production,</W> <W i={28}>pigmentation,</W> <W i={29}>application</W> <W i={30}>of</W> <W i={31}>protective</W> <W i={32}>or</W> <W i={33}>decorative</W> <W i={34}>coats</W> <W i={35}>of</W> <W i={36}>multiple</W> <W i={37}>colours,</W> <W i={38}>decorative</W> <W i={39}>painting,</W> <W i={40}>etc.</W>
              </>
            ) : currentClue === 3 ? (
              <>
                <W i={0}>These</W> <W i={1}>techniques</W> <W i={2}>became</W> <W i={3}>further</W> <W i={4}>sophisticated</W> <W i={5}>during</W> <W i={6}>the</W> <W i={[7,8]}>Sindhu-Sarasvati</W> <W i={9}>Civilisation,</W> <W i={10}>with</W> <W i={11}>a</W> <W i={12}>bright</W> <W i={13}>red</W> <W i={14}>surface</W> <W i={15}>painted</W> <W i={16}>with</W> <W i={[17,18]}>black-coloured</W> <W i={19}>designs</W> <W i={20}>displaying</W> <W i={21}>geometric</W> <W i={22}>patterns,</W> <W i={23}>and</W> <W i={24}>aquatic</W> <W i={25}>and</W> <W i={26}>terrestrial</W> <W i={27}>animals.</W>
              </>
            ) : currentClue === 4 ? (
              <>
                <W i={5}>The</W> <W i={6}>clay</W> <W i={7}>used</W> <W i={8}>for</W> <W i={9}>making</W> <W i={10}>pots,</W> <W i={11}>dishes,</W> <W i={12}>bowls</W> <W i={13}>and</W> <W i={14}>other</W> <W i={15}>items</W> <W i={16}>was</W> <W i={17}>carefully</W> <W i={18}>selected</W> <W i={19}>and</W> <W i={20}>cleaned,</W> <W i={21}>sieved,</W> <W i={22}>kneaded,</W> <W i={23}>turned</W> <W i={24}>over</W> <W i={25}>a</W> <W i={26}>wheel</W> <W i={27}>and</W> <W i={28}>finally</W> <W i={29}>baked</W> <W i={30}>in</W> <W i={31}>kilns.</W>
              </>
            ) : currentClue === 5 ? (
              <>
                <W i={13}>Pots</W> <W i={14}>were</W> <W i={15}>used</W> <W i={16}>for</W> <W i={17}>various</W> <W i={18}>purposes,</W> <W i={19}>from</W> <W i={20}>cooking</W> <W i={21}>to</W> <W i={22}>storage</W> <W i={23}>of</W> <W i={24}>food</W> <W i={25}>grains,</W> <W i={26}>oil,</W> <W i={27}>ghee,</W> <W i={28}>and</W> <W i={29}>so</W> <W i={30}>on.</W> <W i={31}>Some</W> <W i={32}>very</W> <W i={33}>large</W> <W i={34}>storage</W> <W i={35}>jars</W> <W i={36}>and</W> <W i={37}>other</W> <W i={38}>pottery</W> <W i={39}>items</W> <W i={40}>are</W> <W i={41}>exhibited</W> <W i={42}>at</W> <W i={43}>the</W> <W i={44}>National</W> <W i={45}>Museum,</W> <W i={46}>New</W> <W i={47}>Delhi.</W>
              </>
            ) : (
              currentData.text
            )}
          </div>
        </div>

        {/* Right Image Box (35-40%) */}
        <div style={{ flex: '0 0 38%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <img 
            src={currentData.image} 
            alt="Pottery" 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '40vh',
              objectFit: 'contain',
              mixBlendMode: 'multiply',
              filter: 'drop-shadow(0 12px 24px rgba(62, 39, 35, 0.15))'
            }} 
          />
        </div>
      </div>

      <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', alignItems: 'center' }}>
          {currentClue < clues.length ? (
             <button 
               onClick={() => setCurrentClue(currentClue + 1)}
               style={{
                 background: '#A94727', color: 'white', border: 'none', borderRadius: '24px',
                 padding: 'clamp(8px, 1.5vw, 12px) clamp(16px, 3vw, 24px)', fontWeight: 'bold', fontSize: 'clamp(14px, 1.8vw, 18px)',
                 cursor: 'pointer', boxShadow: '0 2px 6px rgba(169, 71, 39, 0.25)'
               }}
             >
               NEXT CLUE →
             </button>
          ) : (
             <div style={{
                 background: '#2C6E63', color: 'white', borderRadius: '24px',
                 padding: 'clamp(8px, 1.5vw, 12px) clamp(16px, 3vw, 24px)', fontWeight: 'bold', fontSize: 'clamp(14px, 1.8vw, 18px)',
                 boxShadow: '0 2px 6px rgba(44, 110, 99, 0.25)',
                 display: 'flex', alignItems: 'center', gap: '8px'
               }}>
               INVESTIGATION COMPLETE! <SvgIcons.Check />
             </div>
          )}
        </div>
        {timelineNode}
      </div>
    </div>
  );
};

const InvestigationHandbookRender = ({ highestUnlockedIndex = 0, currentFlowIndex = 0, stageCompleted = false, onNext, onComplete, initialPage = 1, setExtraRightAction }, ref) => {
  const handleProceed = onNext || onComplete;
  
  const [b1Page, setB1Page] = useState(initialPage);
  const [currentClue, setCurrentClue] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(null);
  const audioRef = useRef(null);

  useImperativeHandle(ref, () => ({
    handleGlobalNext: () => {
      if (currentFlowIndex < 5) {
        if (b1Page === 1) {
          setB1Page(2);
          return true; // Event handled internally, don't propagate
        } else if (b1Page === 2) {
          if (currentClue < 5) {
            return true; // Event handled (user must click clue button), don't propagate
          }
          return false; // Done with page 2, allow index.jsx to proceed
        }
      }
      return false; // Let index.jsx proceed for other barriers
    },
    handleGlobalBack: () => {
      if (currentFlowIndex < 5) {
        if (b1Page === 2) {
          setB1Page(1);
          return true; // Event handled internally
        }
      }
      return false; // Let index.jsx handle back
    }
  }));

  // Determine which barrier we are in
  // currentFlowIndex 13 is Mission 3. index >= 13 is Barrier 3.
  const isBarrier2 = currentFlowIndex >= 5 && currentFlowIndex < 13;
  const isBarrier3 = currentFlowIndex >= 13;

  // Barrier 1 logic
  const isPhase1Done = highestUnlockedIndex > 1 || (currentFlowIndex === 1 && stageCompleted);
  const isPhase2Done = highestUnlockedIndex > 2 || (currentFlowIndex === 2 && stageCompleted);

  // Barrier 2 logic
  const isB2Phase1Done = highestUnlockedIndex > 6 || (currentFlowIndex === 6 && stageCompleted);
  const isB2Phase2Done = highestUnlockedIndex > 7 || (currentFlowIndex === 7 && stageCompleted);
  const isB2Phase3Done = highestUnlockedIndex > 8 || (currentFlowIndex === 8 && stageCompleted);
  const isB2Phase4Done = highestUnlockedIndex > 9 || (currentFlowIndex === 9 && stageCompleted);
  const isB2Phase5Done = highestUnlockedIndex > 10 || (currentFlowIndex === 10 && stageCompleted);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error(e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (setExtraRightAction) {
      if (b1Page === 1 && !isBarrier2 && !isBarrier3) {
        setExtraRightAction(
          <button
            onClick={toggleAudio}
            className="outline"
            style={{
              padding: '0.85rem 1.6rem',
              fontSize: '1.6rem',
              fontWeight: 'bold',
              gap: '0.75rem',
              borderRadius: '10px',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {isPlaying ? <SvgIcons.Pause /> : <SvgIcons.Play />} {isPlaying ? "Pause" : "Play"}
          </button>
        );
      } else if (b1Page !== 2) {
        setExtraRightAction(null);
      }
    }
    return () => {
      if (setExtraRightAction && b1Page === 1) setExtraRightAction(null);
    };
  }, [b1Page, isBarrier2, isBarrier3, setExtraRightAction, isPlaying]);

  useEffect(() => {
    if (b1Page !== 1 || isBarrier2 || isBarrier3) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      setActiveWordIndex(null);
    }
  }, [b1Page, isBarrier2, isBarrier3]);

  const handleTimeUpdate = () => {
    if (audioRef.current && typeof fpage8Json !== 'undefined') {
      const time = audioRef.current.currentTime;
      const activeIdx = fpage8Json.words.findIndex(w => time >= w.start && time < w.end);
      if (activeIdx !== activeWordIndex) {
        setActiveWordIndex(activeIdx);
      }
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setActiveWordIndex(null);
  };

  const W = ({ i, children }) => {
    const isActive = activeWordIndex === i;
    return (
      <span
        style={{
          color: isActive ? '#FFFFFF' : 'inherit',
          background: isActive ? '#A94727' : 'transparent',
          borderRadius: '4px',
          padding: '0 2px',
          transition: 'all 0.15s ease-out'
        }}
      >
        {children}
      </span>
    );
  };

  return (
    <div style={{
      width: '100%',
      height: (!isBarrier2 && !isBarrier3) ? '100vh' : '100%',
      position: (!isBarrier2 && !isBarrier3) ? 'fixed' : 'relative',
      top: (!isBarrier2 && !isBarrier3) ? 0 : 'auto',
      left: (!isBarrier2 && !isBarrier3) ? 0 : 'auto',
      zIndex: (!isBarrier2 && !isBarrier3) ? 50 : 1,
      minHeight: 0,
      boxSizing: 'border-box',
      background: '#F4EBDD',
      paddingBottom: (!isBarrier2 && !isBarrier3) ? '82px' : 0,
      borderRadius: 0,
      boxShadow: 'none',
      display: 'flex',
      flexDirection: 'column',
      border: (!isBarrier2 && !isBarrier3) ? 'none' : '6px solid #3E2723',
      overflow: 'hidden'
    }}>
      {(!isBarrier2 && !isBarrier3 && b1Page === 1) && (
        <audio
          ref={audioRef}
          src={fpage8Audio}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleAudioEnded}
        />
      )}
      {(!isBarrier2 && !isBarrier3 && b1Page === 1) && (
        <style>{`
          .global-action-bar {
            border: none !important;
            box-shadow: none !important;
            background: transparent !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
          }
          .global-action-bar button {
            border-radius: 20px !important;
          }
        `}</style>
      )}
      {/* TWO PAGES SPREAD CONTAINER */}
      <div style={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden'
      }}>
        {!isBarrier2 && !isBarrier3 ? (
          // ================= BARRIER 1 PAGES =================
          <>
            {b1Page === 1 && (
              <div style={{ flex: 1, minHeight: 0, padding: 0, position: 'relative', display: 'flex', flexDirection: 'row', overflow: 'hidden', background: '#FFFCF8' }}>
                {/* ================= PAGE 1 ================= */}
                
                {/* Left Edge Decorations */}
                <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '220px', zIndex: 5, pointerEvents: 'none' }}>
                  {/* Curved pastel shapes & Dotted Path */}
                  <svg viewBox="0 0 150 800" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} preserveAspectRatio="none">
                    <path d="M0,0 L80,0 C120,150 30,300 90,450 C150,600 40,750 80,800 L0,800 Z" fill="#F4EBDD" />
                    <path d="M0,0 L50,0 C80,150 20,300 60,450 C100,600 20,750 50,800 L0,800 Z" fill="#E8F1EA" />
                    <path d="M45,0 C85,150 15,300 75,450 C135,600 25,750 65,800" fill="none" stroke="#D3B895" strokeWidth="2" strokeDasharray="6 6" />
                  </svg>
                  
                  {/* Science / Botanical Doodles */}
                  
                  {/* Lightbulb */}
                  <svg style={{ position: 'absolute', top: '12%', left: '45px', opacity: 0.9, transform: 'rotate(-10deg)' }} width="48" height="48" viewBox="0 0 24 24" fill="#FFF9C4" stroke="#3E2723" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18h6"/><path d="M10 22h4"/>
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5"/>
                    <path d="M12 2v2"/><path d="M4 6l1.5 1.5"/><path d="M20 6l-1.5 1.5"/>
                  </svg>
                  
                  {/* Leaf */}
                  <svg style={{ position: 'absolute', top: '35%', left: '30px', opacity: 0.9, transform: 'rotate(15deg)' }} width="42" height="42" viewBox="0 0 24 24" fill="#E8F1EA" stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                  </svg>

                  {/* Atom */}
                  <svg style={{ position: 'absolute', top: '58%', left: '35px', opacity: 0.9, transform: 'rotate(-5deg)' }} width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="#3E2723" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="2.5" fill="#C0392B" stroke="none"/>
                    <path d="M19 12c0 3.8-3.1 7-7 7s-7-3.1-7-7 3.1-7 7-7 7 3.1 7 7z" transform="rotate(60 12 12)"/>
                    <path d="M19 12c0 3.8-3.1 7-7 7s-7-3.1-7-7 3.1-7 7-7 7 3.1 7 7z" transform="rotate(120 12 12)"/>
                    <path d="M19 12c0 3.8-3.1 7-7 7s-7-3.1-7-7 3.1-7 7-7 7 3.1 7 7z" transform="rotate(180 12 12)"/>
                  </svg>

                  {/* Books bottom-left */}
                  <svg style={{ position: 'absolute', bottom: '8%', left: '25px', zIndex: 3, transform: 'rotate(-8deg)' }} width="75" height="75" viewBox="0 0 100 100" fill="none" stroke="#3E2723" strokeWidth="2.5" strokeLinejoin="round">
                    {/* Top Book */}
                    <rect x="20" y="55" width="60" height="15" rx="2" fill="#2E7D32"/>
                    <rect x="30" y="55" width="50" height="15" fill="#FFFFFF"/>
                    <line x1="30" y1="62.5" x2="80" y2="62.5" stroke="#E0E0E0" strokeWidth="1"/>
                    {/* Bottom Book */}
                    <rect x="15" y="72" width="70" height="18" rx="2" fill="#C0392B"/>
                    <rect x="25" y="72" width="60" height="18" fill="#FFFFFF"/>
                    <line x1="25" y1="81" x2="85" y2="81" stroke="#E0E0E0" strokeWidth="1"/>
                  </svg>
                  
                  {/* Decorative dots */}
                  <div style={{ position: 'absolute', top: '25%', left: '90px', width: '8px', height: '8px', borderRadius: '50%', background: '#F1C40F' }} />
                  <div style={{ position: 'absolute', top: '30%', left: '40px', width: '5px', height: '5px', borderRadius: '50%', background: '#E67E22' }} />
                  <div style={{ position: 'absolute', bottom: '40%', left: '100px', width: '10px', height: '10px', borderRadius: '50%', background: '#F5B041', opacity: 0.6 }} />
                  <div style={{ position: 'absolute', bottom: '25%', left: '95px', width: '6px', height: '6px', borderRadius: '50%', background: '#27AE60', opacity: 0.6 }} />
                </div>

                {/* LEFT COLUMN – 65% */}
                <div style={{ 
                  width: '65%', 
                  padding: '24px 40px 24px 175px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '10px', 
                  zIndex: 2, 
                  position: 'relative',
                  background: 'transparent'
                }}>
                  <div>
                    <h2 style={{ margin: 0, fontFamily: "'Merriweather', Georgia, serif", fontSize: '50px', color: '#2C4E3D', fontWeight: '900', lineHeight: 1.15 }}>
                      What are Objects Made Of?
                    </h2>
                    <div style={{ width: '420px', height: '4px', background: '#2C4E3D', opacity: 0.9, borderRadius: '2px', marginTop: '4px' }} />
                  </div>

                  <div style={{ fontFamily: "'Merriweather', Georgia, serif", color: '#3E2723', position: 'relative', zIndex: 3 }}>
                    <p style={{ margin: '0 0 8px 0', fontSize: '26px', lineHeight: '1.45', fontWeight: 500, color: '#3E2723' }}>
                      <W i={0}>Look</W> <W i={1}>around</W> <W i={2}>you!</W> <W i={3}>You</W> <W i={4}>can</W> <W i={5}>see</W> <W i={6}>many</W> <W i={7}>things</W> – <W i={8}>a</W> <W i={9}>chair,</W> <W i={10}>a</W> <W i={11}>book,</W> <W i={12}>a</W> <W i={13}>water</W> <W i={14}>bottle,</W> <W i={15}>a</W> <W i={16}>pencil</W> <W i={17}>and</W> <W i={18}>so</W> <W i={19}>on.</W>
                    </p>
                    <p style={{ margin: 0, fontSize: '26px', lineHeight: '1.45', fontWeight: 500, color: '#3E2723' }}>
                      <W i={20}>These</W> <W i={21}>are</W> <W i={22}>all</W> <strong style={{ color: '#A94727', fontWeight: 700 }}><W i={23}>objects</W></strong>. <W i={24}>Even</W> <W i={25}>though</W> <W i={26}>they</W> <W i={27}>look</W> <W i={28}>different,</W> <W i={29}>each</W> <W i={30}>object</W> <W i={31}>is</W> <W i={32}>made</W> <W i={33}>of</W> <W i={34}>some</W> <strong style={{ color: '#A94727', fontWeight: 700 }}><W i={35}>material</W></strong>.
                    </p>
                  </div>

                  {/* Definition Box */}
                  <div style={{ background: 'rgba(253, 251, 247, 0.95)', border: '1.5px solid #D8C3A5', borderLeft: '8px solid #A94727', borderRadius: '12px', padding: '12px 20px', position: 'relative', zIndex: 3 }}>
                    <div style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: '24px', fontWeight: 500, color: '#3E2723', lineHeight: 1.45 }}>
                      <div style={{ marginBottom: '4px' }}><strong style={{ color: '#A94727', fontWeight: 700 }}><W i={37}>Material:</W></strong> <W i={39}>The</W> <W i={40}>substance</W> <W i={41}>used</W> <W i={42}>to</W> <W i={43}>make</W> <W i={44}>an</W> <W i={45}>object.</W></div>
                      <div><strong style={{ color: '#A94727', fontWeight: 700 }}><W i={47}>Object:</W></strong> <W i={49}>Anything</W> <W i={50}>we</W> <W i={51}>can</W> <W i={52}>see</W> <W i={53}>or</W> <W i={54}>use</W> <W i={55}>around</W> <W i={56}>us.</W></div>
                    </div>
                  </div>

                  {/* Examples Box */}
                  <div style={{ background: 'rgba(253, 251, 247, 0.95)', border: '1.5px solid #D8C3A5', borderLeft: '8px solid #A94727', borderRadius: '12px', padding: '12px 20px', position: 'relative', zIndex: 3 }}>
                    <h4 style={{ margin: '0 0 4px 0', color: '#4A3B5C', fontSize: '30px', fontWeight: 700, fontFamily: "'Merriweather', Georgia, serif" }}>Examples:</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontFamily: "'Merriweather', Georgia, serif", fontSize: '23px', fontWeight: 500, color: '#3E2723', lineHeight: 1.45 }}>
                      <div>• <W i={59}>A</W> <W i={60}>chair</W> <W i={61}>can</W> <W i={62}>be</W> <W i={63}>made</W> <W i={64}>of</W> <W i={65}>wood,</W> <W i={66}>plastic</W> <W i={67}>or</W> <W i={68}>steel.</W></div>
                      <div>• <W i={69}>A</W> <W i={70}>plate</W> <W i={71}>can</W> <W i={72}>be</W> <W i={73}>made</W> <W i={74}>of</W> <W i={75}>steel,</W> <W i={76}>glass</W> <W i={77}>or</W> <W i={78}>plastic.</W></div>
                      <div>• <W i={79}>A</W> <W i={80}>bottle</W> <W i={81}>can</W> <W i={82}>be</W> <W i={83}>made</W> <W i={84}>of</W> <W i={85}>plastic,</W> <W i={86}>glass</W> <W i={87}>or</W> <W i={88}>steel.</W></div>
                    </div>
                  </div>

                  {/* Think! Box */}
                  <div style={{ background: 'rgba(253, 251, 247, 0.95)', border: '1.5px solid #D8C3A5', borderLeft: '8px solid #A94727', borderRadius: '12px', padding: '12px 20px', position: 'relative', zIndex: 3 }}>
                    <div style={{ fontFamily: "'Merriweather', Georgia, serif", fontSize: '23px', fontWeight: 500, color: '#3E2723', lineHeight: 1.45 }}>
                      <strong style={{ fontWeight: 700, color: '#A94727', fontSize: '30px', fontFamily: "'Merriweather', Georgia, serif", display: 'inline-block', marginBottom: '2px' }}>Think!</strong><br />
                      <W i={89}>One</W> <W i={90}>object</W> <W i={91}>can</W> <W i={92}>be</W> <W i={93}>made</W> <W i={94}>from</W> <W i={95}>different</W> <W i={96}>materials.</W> <W i={98}>One</W> <W i={99}>material</W> <W i={100}>can</W> <W i={101}>be</W> <W i={102}>used</W> <W i={103}>to</W> <W i={104}>make</W> <W i={105}>many</W> <W i={106}>different</W> <W i={107}>objects.</W> <W i={108}>Can</W> <W i={109}>you</W> <W i={110}>think</W> <W i={111}>of</W> <W i={112}>more</W> <W i={113}>examples?</W>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN IMAGE (Absolute) */}
                <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '35%', zIndex: 1 }}>
                  <img 
                    src={classroomObjectsImg} 
                    alt="Classroom Objects" 
                    style={{ 
                      width: '100%',
                      height: '100%', 
                      objectFit: 'cover',
                      objectPosition: 'center center',
                      mixBlendMode: 'multiply',
                    }} 
                  />
                </div>
              </div>
            )}

            {b1Page === 2 && (
              <div style={{ flex: 1, minHeight: 0, padding: '20px 48px', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                {/* ================= PAGE 2 ================= */}
                <div>
                  <h2 style={{ margin: 0, fontFamily: "'Merriweather', Georgia, serif", fontSize: '50px', color: '#2C4E3D', fontWeight: '900', lineHeight: 1.15 }}>
                    Historical Spotlight: Pottery
                  </h2>
                  <div style={{ width: '100%', height: '4px', background: '#2C4E3D', opacity: 0.9, borderRadius: '2px', marginTop: '12px', marginBottom: '16px' }} />
                </div>

                <PotterySpotlight currentClue={currentClue} setCurrentClue={setCurrentClue} setExtraRightAction={setExtraRightAction} />
              </div>
            )}
          </>
        ) : isBarrier2 ? (
          // ================= BARRIER 2 TWO-PAGE SPREAD =================
          <>
            {/* ================= LEFT PAGE B2 (PAGE 1) ================= */}
            <div style={{ flex: 1, minHeight: 0, padding: '24px 32px', position: 'relative', display: 'flex', flexDirection: 'column', overflowY: 'hidden', borderRight: '1px solid var(--lesson-border)' }}>
              <h2 style={{ margin: '0 0 16px 0', fontSize: 'calc(var(--text-2xl) * 1.15)', color: 'var(--lesson-primary)', fontWeight: 'bold', borderBottom: '4px solid var(--lesson-accent)', paddingBottom: '6px', display: 'inline-block' }}>
                Observe and Identify Appearance of Materials
              </h2>

              <div style={{ fontSize: 'clamp(1.30rem, 1.55vw, 1.65rem)', color: 'var(--lesson-text)', lineHeight: '1.4', marginBottom: '14px', fontWeight: '600' }}>
                <p style={{ margin: '0 0 10px 0', fontSize: 'inherit', lineHeight: 'inherit' }}>Materials can look different from each other.</p>
                <p style={{ margin: '0 0 10px 0', fontSize: 'inherit', lineHeight: 'inherit' }}>Some have shiny surfaces, while others look dull.</p>
                <p style={{ margin: '0 0 10px 0', fontSize: 'inherit', lineHeight: 'inherit' }}>They may also differ in <strong style={{ color: 'var(--lesson-primary)', fontWeight: '800' }}>colour</strong> and <strong style={{ color: 'var(--lesson-primary)', fontWeight: '800' }}>texture</strong>, such as smooth or rough.</p>
              </div>

              <div style={{ border: '2px solid var(--lesson-accent)', borderRadius: '12px', padding: '16px', background: 'var(--lesson-surface)', marginBottom: '14px' }}>
                <h4 style={{ margin: '0 0 10px 0', color: 'var(--lesson-accent)', fontSize: 'calc(var(--text-lg) * 1.15)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ✨ Lustrous vs Non-lustrous
                </h4>
                <div style={{ fontSize: 'calc(var(--text-lg) * 1.15)', color: 'var(--lesson-text)', lineHeight: '1.4', fontWeight: '600' }}>
                  <p style={{ margin: '0 0 10px 0' }}>Materials with shiny surfaces are called <strong style={{ color: 'var(--lesson-accent)', fontWeight: '800' }}>lustrous</strong>. Metals like iron, copper and aluminium are usually lustrous.</p>
                  <p style={{ margin: '0' }}>Paper, wood and rubber are examples of <strong style={{ color: 'var(--lesson-accent)', fontWeight: '800' }}>non-lustrous</strong> materials.</p>
                </div>
              </div>

              <div style={{ marginTop: 'auto', background: 'var(--lesson-warning-bg)', border: '2px solid var(--lesson-warning-border)', borderRadius: '12px', padding: '12px 18px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ fontSize: 'calc(var(--text-xl) * 1.3)' }}>📌</div>
                <div style={{ fontSize: 'calc(var(--text-lg) * 1.3)', color: 'var(--lesson-primary)', lineHeight: '1.35' }}>
                  <strong>Remember!</strong><br/>
                  Not everything that shines is a metal!
                </div>
              </div>
            </div>

            {/* ================= RIGHT PAGE B2 (PAGE 2) ================= */}
            <div style={{ flex: 1, minHeight: 0, padding: '20px 28px', position: 'relative', display: 'flex', flexDirection: 'column', overflowY: 'hidden' }}>
              <h2 style={{ margin: '0 0 12px 0', fontSize: 'calc(var(--text-2xl) * 1.15)', color: 'var(--lesson-primary)', fontWeight: 'bold' }}>
                Investigation: Group by Appearance
              </h2>

              <div style={{ fontSize: 'clamp(1.30rem, 1.55vw, 1.65rem)', color: 'var(--lesson-text)', lineHeight: '1.4', marginBottom: '14px', fontWeight: '600' }}>
                <p style={{ margin: '0', fontSize: 'inherit', lineHeight: 'inherit' }}>Materials can be different in the way they look. Let's group them based on how their surface appears when light falls on them.</p>
              </div>

              <div style={{ background: 'var(--lesson-warning-bg)', border: '1px solid var(--lesson-warning-border)', borderRadius: '12px', padding: '12px 16px', display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ fontSize: 'calc(var(--text-xl) * 1.1)' }}>💡</div>
                <div style={{ fontSize: 'calc(var(--text-lg) * 1.15)', color: 'var(--lesson-primary)', lineHeight: '1.4', fontWeight: '600' }}>
                  Look carefully under the lamp.<br/>Drag each item to the correct group.
                </div>
              </div>

              <div style={{ border: '2px solid var(--lesson-success)', borderRadius: '12px', padding: '12px 18px', background: 'var(--lesson-success-bg)', display: 'flex', position: 'relative', marginBottom: '14px' }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 10px 0', color: 'var(--lesson-success)', fontSize: 'calc(var(--text-lg) * 1.1)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                    🎯 MISSION CHECKLIST
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: 'calc(var(--text-lg) * 1.05)', color: 'var(--lesson-success)', fontWeight: '600' }}>
                      <input type="checkbox" checked={true} readOnly style={{ width: '18px', height: '18px', accentColor: 'var(--lesson-success)', marginTop: '2px' }} />
                      <span>Read the Handbook</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: 'calc(var(--text-lg) * 1.05)', color: 'var(--lesson-success)', fontWeight: '600' }}>
                      <input type="checkbox" checked={false} readOnly style={{ width: '18px', height: '18px', accentColor: 'var(--lesson-success)', marginTop: '2px' }} />
                      <span>Observe the materials</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: 'calc(var(--text-lg) * 1.05)', color: 'var(--lesson-success)', fontWeight: '600' }}>
                      <input type="checkbox" checked={false} readOnly style={{ width: '18px', height: '18px', accentColor: 'var(--lesson-success)', marginTop: '2px' }} />
                      <span>Group by appearance</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: 'calc(var(--text-lg) * 1.05)', color: 'var(--lesson-success)', fontWeight: '600' }}>
                      <input type="checkbox" checked={false} readOnly style={{ width: '18px', height: '18px', accentColor: 'var(--lesson-success)', marginTop: '2px' }} />
                      <span>Test with the lamp</span>
                    </label>
                  </div>
                </div>
              </div>

              <div style={{ border: '1px solid var(--lesson-border)', borderRadius: '12px', padding: '12px 18px', background: 'var(--lesson-surface)', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                <h4 style={{ margin: '0', color: 'var(--lesson-primary)', fontSize: 'calc(var(--text-lg) * 1.1)', fontWeight: 'bold' }}>
                  How to do:
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: 'calc(var(--text-lg) * 1.05)', color: 'var(--lesson-text)', fontWeight: '600' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--lesson-accent-bg)', color: 'var(--lesson-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👆</div> Drag an item from the tray
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: 'calc(var(--text-lg) * 1.05)', color: 'var(--lesson-text)', fontWeight: '600' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--lesson-accent-bg)', color: 'var(--lesson-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🎯</div> Drop it in the right group
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: 'calc(var(--text-lg) * 1.05)', color: 'var(--lesson-text)', fontWeight: '600' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--lesson-accent-bg)', color: 'var(--lesson-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👁️</div> Click the lamp to observe again
                </div>
              </div>


            </div>
          </>
        ) : null}
      </div>

      {/* FOOTER BAR – thin, no visible label */}
      <div style={{
        height: '4px',
        background: 'transparent',
        flexShrink: 0
      }} />
    </div>
  );
};

const InvestigationHandbook = forwardRef(InvestigationHandbookRender);
export default InvestigationHandbook;
