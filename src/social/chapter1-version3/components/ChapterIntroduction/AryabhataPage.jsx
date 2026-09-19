import React, { useState, useRef, useEffect } from 'react';
import { AUDIO_TRANSCRIPT as PAGE1_TRANSCRIPT, PAGE2_TRANSCRIPT } from './AryabhataTranscript';
import { ChevronRight, ChevronLeft, BookOpen, Info, Link2, Layers, Sparkles, Play, Pause } from 'lucide-react';
import page1Audio from '../audio/page1.mpeg?url';
import page2Audio from '../audio/page2.mp3';
import Earth3DGlobe from './Earth3DGlobe';

const NAVY = '#0A2540';
const AMBER = '#B45309';
const MONO = '"IBM Plex Mono", "SF Mono", ui-monospace, Menlo, monospace';
const SERIF = '"Fraunces", "Iowan Old Style", Palatino, Georgia, serif';
const SANS = '"Space Grotesk", system-ui, -apple-system, sans-serif';

const SLIDES = [
  { title: 'The Spherical Earth', badge: 'Introduction' },
  { title: 'Who was Āryabhaṭa?', badge: 'Section 1' }
];

const SLIDE_2_GRID = [
  {
    icon: '🌍',
    badge: 'Key Fact 1 · Earth Shape',
    title: 'The Earth is a Sphere',
    desc: 'Stated clearly that the Earth is a round sphere floating in space, surrounded by an envelope of atmosphere rather than resting flat.'
  },
  {
    icon: '🔄',
    badge: 'Key Fact 2 · Rotation',
    title: 'Rotation on Axis',
    desc: 'Discovered that the Earth rotates on its own axis once every day, creating the continuous natural cycle of day, night and moving stars.'
  },
  {
    icon: '📏',
    badge: 'Key Fact 3 · Circumference',
    title: "Earth's Dimensions",
    desc: 'Calculated the circumference and diameter of the spherical Earth, astonishingly close to the measurements obtained by modern satellites.'
  },
  {
    icon: '🌘',
    badge: 'Key Fact 4 · Astronomy',
    title: 'Eclipses & Geometry',
    desc: 'Explained that the Moon shines by reflected sunlight, proved eclipses are cast by planetary shadows, and derived constant π ≈ 3.1416.'
  }
];

const SLIDE_3_GRID = [
  {
    icon: '⏳',
    badge: 'Key Fact 1 · Classical Era',
    title: '476 – 550 CE',
    desc: 'Lived and worked in ancient Kusumapura (Patliputra) over 1,500 years ago during the flourishing golden era of Indian science.'
  },
  {
    icon: '📜',
    badge: 'Key Fact 2 · Masterpiece',
    title: 'The Āryabhaṭīya',
    desc: 'Composed his world-renowned treatise on mathematics and astronomy in 499 CE at the young age of just 23 years.'
  },
  {
    icon: '🗺️',
    badge: 'Key Fact 3 · Coordinates',
    title: 'Global Coordinates',
    desc: 'Pioneered coordinate geometry methods using meridians of longitude and parallels of latitude to define precise locations on Earth.'
  },
  {
    icon: '🕰️',
    badge: 'Key Fact 4 · Time Systems',
    title: 'Rotation & Time',
    desc: "Connected the Earth's 360° rotational geometry (turning 15° every hour) to solar passage and geographical time variations."
  }
];

const TIMELINE = [
  { year: '476 CE', desc: 'Born' },
  { year: '499 CE', desc: 'Āryabhaṭīya' },
  { year: '~500 CE', desc: 'Earth spins' },
  { year: '550 CE', desc: 'Legacy lives on' }
];

const cardBase = {
  borderRadius: '16px',
  boxSizing: 'border-box'
};

const WordRenderer = ({ text, idPrefix, defaultColor, highlightColor, activeWordId }) => {
  const words = text.trim().split(/\s+/);
  return (
    <>
      {words.map((word, index) => {
        const wordId = `${idPrefix}-${index + 1}`;
        const isHighlighted = activeWordId === wordId;
        const hasNewline = word.includes('\n');
        const cleanWord = word.replace('\n', '');

        return (
          <React.Fragment key={index}>
            <span
              data-word-id={wordId}
              style={{
                color: isHighlighted ? highlightColor : defaultColor,
                background: isHighlighted ? 'rgba(180, 83, 9, 0.1)' : 'transparent',
                borderRadius: '4px',
                padding: '0 2px',
                transition: 'all 0.15s ease-out'
              }}>
              {cleanWord}
            </span>
            {hasNewline ? <br /> : ' '}
          </React.Fragment>
        );
      })}
    </>
  );
};

const DEBUG_SYNC = false;

export default function AryabhataPage({ onNext, onBack, isNextEnabled }) {
  const [slide, setSlide] = useState(0);
  const [turnDir, setTurnDir] = useState('fwd'); // 'fwd' | 'back'
  const isLast = slide === SLIDES.length - 1;

  // Audio Karaoke State
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeWordId, setActiveWordId] = useState(null);
  const [debugData, setDebugData] = useState(null);

  useEffect(() => {
    window.validateNarrationSync = (s = slide) => {
      const transcript = s === 0 ? PAGE1_TRANSCRIPT : PAGE2_TRANSCRIPT;
      console.log("AUDIO WORD | START | END | PAGE WORD | MATCH TYPE");
      console.log("--------------------------------------------------");
      transcript.forEach(w => {
        console.log(`${w.audioWord.padEnd(12)} | ${w.start.toFixed(2).padStart(5)} | ${w.end.toFixed(2).padStart(5)} | ${(w.pageWordId || '—').padEnd(12)} | ${w.matchType}`);
      });
    };
    return () => { delete window.validateNarrationSync; };
  }, [slide]);

  useEffect(() => {
    // When changing slides, stop the audio and reset state
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setActiveWordId(null);
  }, [slide]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    const activeTranscript = slide === 0 ? PAGE1_TRANSCRIPT : PAGE2_TRANSCRIPT;
    if (audioRef.current) {
      const time = audioRef.current.currentTime;
      // Find the segment containing currentTime
      const activeWord = activeTranscript.find(w => time >= w.start && time < w.end);

      let newActiveId = null;
      if (activeWord && activeWord.matchType === 'matched') {
        newActiveId = activeWord.pageWordId;
      }

      if (newActiveId !== activeWordId) {
        setActiveWordId(newActiveId);
      }

      if (DEBUG_SYNC) {
        setDebugData({
          time: time,
          word: activeWord ? activeWord.audioWord : 'NONE',
          start: activeWord ? activeWord.start : 0,
          end: activeWord ? activeWord.end : 0,
          pageWord: (activeWord && activeWord.pageWordId) ? activeWord.pageWordId : 'NONE',
          matchType: activeWord ? activeWord.matchType : 'NONE',
          highlight: newActiveId ? 'ACTIVE' : 'NONE'
        });
      }
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setActiveWordId(null);
    if (DEBUG_SYNC) setDebugData(null);
  };

  const goToSlide = (target) => {
    if (target < 0 || target >= SLIDES.length) return;
    setTurnDir(target > slide ? 'fwd' : 'back');
    setSlide(target);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', minHeight: 0, background: '#fff', overflow: 'hidden' }}>
      <style>{`
        @keyframes bookTurnFwd {
          0%   { opacity: 0; transform: perspective(1200px) rotateY(-14deg) translateX(24px) scale(0.98); }
          60%  { opacity: 1; }
          100% { opacity: 1; transform: perspective(1200px) rotateY(0deg) translateX(0) scale(1); }
        }
        @keyframes bookTurnBack {
          0%   { opacity: 0; transform: perspective(1200px) rotateY(14deg) translateX(-24px) scale(0.98); }
          60%  { opacity: 1; }
          100% { opacity: 1; transform: perspective(1200px) rotateY(0deg) translateX(0) scale(1); }
        }
        .book-slide-fwd { animation: bookTurnFwd 0.38s cubic-bezier(0.22, 0.61, 0.36, 1) both; }
        .book-slide-back { animation: bookTurnBack 0.38s cubic-bezier(0.22, 0.61, 0.36, 1) both; }
      `}</style>

      {/* Audio Element */}
      <audio
        key={`audio-${slide}`}
        ref={audioRef}
        src={slide === 0 ? page1Audio : page2Audio}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleAudioEnded}
      />

      {DEBUG_SYNC && debugData && isPlaying && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', background: 'rgba(0,0,0,0.85)', color: '#0F0', padding: '16px', borderRadius: '8px', fontFamily: 'monospace', fontSize: '14px', zIndex: 9999, boxShadow: '0 4px 12px rgba(0,0,0,0.3)', minWidth: '250px' }}>
          <div>Audio time: {debugData.time.toFixed(3)}s</div>
          <div style={{ marginTop: '8px', color: '#FFF' }}>Audio word:</div>
          <div style={{ color: '#0FF', fontSize: '16px', fontWeight: 'bold' }}>{debugData.word}</div>
          {debugData.word !== 'NONE' && (
            <div style={{ marginTop: '4px', color: '#AAA' }}>Timing:<br />{debugData.start.toFixed(3)} → {debugData.end.toFixed(3)}</div>
          )}
          <div style={{ marginTop: '8px', color: '#FFF' }}>Matched page word:</div>
          <div style={{ color: debugData.pageWord !== 'NONE' ? '#0F0' : '#F00' }}>{debugData.pageWord}</div>
          <div style={{ marginTop: '8px', color: '#FFF' }}>Match type:</div>
          <div style={{ color: debugData.matchType === 'matched' ? '#0F0' : '#FA0' }}>{debugData.matchType.toUpperCase()}</div>
          <div style={{ marginTop: '8px', color: '#FFF' }}>Highlight:</div>
          <div style={{ color: debugData.highlight === 'ACTIVE' ? '#0F0' : '#F00', fontWeight: 'bold' }}>{debugData.highlight}</div>
        </div>
      )}

      {/* Main Content Area */}
      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column', padding: '24px 28px 10px' }}>
        <div key={slide} className={turnDir === 'fwd' ? 'book-slide-fwd' : 'book-slide-back'} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>

          {/* SLIDE 0: Introduction (Globe) */}
          {slide === 0 && (
            <div style={{ display: 'flex', height: '100%', gap: '24px' }}>
              {/* Left Side: 60% */}
              <div style={{
                flex: '0 0 60%',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                gap: '16px',
                background: 'linear-gradient(160deg, #F7F1E2 0%, #EFE6D2 100%)',
                padding: '24px 28px',
                borderRadius: '16px',
                border: '1.5px solid #E5D5C0',
                boxShadow: '0 8px 24px rgba(14,42,69,.08)'
              }}>
                <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: '32px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#B45309', marginBottom: '6px' }}>
                    Chapter 1 · <WordRenderer text="Class 6 Social Science" idPrefix="ch" activeWordId={activeWordId} defaultColor="#B45309" highlightColor="#451a03" />
                  </div>
                  <h1 style={{ fontFamily: SERIF, fontWeight: 900, color: NAVY, fontSize: '32px', lineHeight: 1.2, margin: 0, letterSpacing: '-.01em' }}>
                    <WordRenderer text="Locating Places on the Earth" idPrefix="ti" activeWordId={activeWordId} defaultColor={NAVY} highlightColor="#451a03" />
                  </h1>
                </div>
                <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', flex: '1 1 auto', minHeight: 0 }}>
                  <Earth3DGlobe />
                </div>
              </div>

              {/* Right Side: 40% */}
              <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}>
                <div style={{
                  ...cardBase,
                  background: 'linear-gradient(160deg, #F7F1E2 0%, #EFE6D2 100%)',
                  boxShadow: '0 8px 24px rgba(14,42,69,.08)',
                  padding: '24px 28px',
                  border: '1.5px solid #E5D5C0',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <p style={{ fontFamily: SANS, fontStyle: 'italic', fontWeight: 600, color: NAVY, fontSize: '21px', lineHeight: 1.5, margin: '0 0 12px', textAlign: 'left' }}>
                    <WordRenderer
                      text="The globe of the Earth stands in space, made up of water, earth, fire and air and is spherical."
                      idPrefix="q1"
                      activeWordId={activeWordId}
                      defaultColor={NAVY}
                      highlightColor="#451a03"
                    />
                    {' '}…{' '}
                    <WordRenderer
                      text="It is surrounded by all creatures."
                      idPrefix="q2"
                      activeWordId={activeWordId}
                      defaultColor={NAVY}
                      highlightColor="#451a03"
                    />
                  </p>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: SANS, fontWeight: 800, color: NAVY, fontSize: '16px' }}>— Āryabhaṭa</div>
                    <div style={{ fontFamily: SANS, color: '#B45309', fontSize: '13px', marginTop: '4px', fontWeight: 600 }}>Āryabhaṭīya · about 500 CE</div>
                  </div>
                </div>

                <div style={{
                  ...cardBase,
                  background: 'linear-gradient(160deg, #F7F1E2 0%, #EFE6D2 100%)',
                  boxShadow: '0 8px 24px rgba(14,42,69,.08)',
                  padding: '32px 32px',
                  border: '1.5px solid #E5D5C0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  flex: 1
                }}>
                  <h3 style={{ fontFamily: SERIF, fontWeight: 900, color: NAVY, fontSize: '30px', margin: 0 }}>Āryabhaṭa's Discoveries</h3>
                  <ol style={{ fontFamily: SANS, color: NAVY, fontSize: '21px', fontWeight: 600, margin: 0, paddingLeft: '28px', display: 'flex', flexDirection: 'column', gap: '20px', lineHeight: 1.5 }}>
                    <li>
                      <WordRenderer
                        text="The Earth is a giant, round ball floating in space."
                        idPrefix="f1a"
                        activeWordId={activeWordId}
                        defaultColor={NAVY}
                        highlightColor="#451a03"
                      /> <span style={{ fontWeight: 400, color: '#3D2E24' }}>
                        <WordRenderer
                          text="This means that the Earth is not flat."
                          idPrefix="f1b"
                          activeWordId={activeWordId}
                          defaultColor="#3D2E24"
                          highlightColor="#451a03"
                        /> <WordRenderer
                          text="It is shaped like a ball, just like the globe we use in our classrooms."
                          idPrefix="f1c"
                          activeWordId={activeWordId}
                          defaultColor="#3D2E24"
                          highlightColor="#451a03"
                        />
                      </span>
                    </li>
                    <li>
                      <WordRenderer
                        text="The Earth spins around like a top, giving us day and night."
                        idPrefix="f2a"
                        activeWordId={activeWordId}
                        defaultColor={NAVY}
                        highlightColor="#451a03"
                      /> <span style={{ fontWeight: 400, color: '#3D2E24' }}>
                        <WordRenderer
                          text="As the Earth spins, the side facing the Sun has daytime, while the side facing away from the Sun has nighttime."
                          idPrefix="f2b"
                          activeWordId={activeWordId}
                          defaultColor="#3D2E24"
                          highlightColor="#451a03"
                        />
                      </span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 1: Overview */}
          {slide === 1 && (
            <div style={{ display: 'flex', height: '100%', gap: '24px' }}>
              {/* Left Side: 60% */}
              <div style={{
                flex: '0 0 60%',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                gap: '16px',
                background: 'linear-gradient(160deg, #F7F1E2 0%, #EFE6D2 100%)',
                padding: '24px 28px',
                borderRadius: '16px',
                border: '1.5px solid #E5D5C0',
                boxShadow: '0 8px 24px rgba(14,42,69,.08)'
              }}>
                <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: SANS, fontWeight: 800, fontSize: '18px', letterSpacing: '.14em', textTransform: 'uppercase', color: AMBER, marginBottom: '6px' }}>
                    <Sparkles size={16} color={AMBER} /> {SLIDES[slide].badge}
                  </div>
                  <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: SERIF, fontWeight: 900, color: NAVY, fontSize: '32px', lineHeight: 1.2, margin: 0 }}>
                    <BookOpen size={26} color="#3b6ea5" strokeWidth={2.2} />
                    Historical Facts — <WordRenderer text="Who was Āryabhaṭa?" idPrefix="t" activeWordId={activeWordId} defaultColor={NAVY} highlightColor="#451a03" />
                  </h2>
                </div>
                <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', flex: '1 1 auto', minHeight: 0 }}>
                  <img src="/images/aryabhata_portrait.jpg" alt="Aryabhata Portrait" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>

              {/* Right Side: 40% */}
              <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}>
                <div style={{
                  ...cardBase,
                  background: 'linear-gradient(160deg, #F7F1E2 0%, #EFE6D2 100%)',
                  border: '1.5px solid #E5D5C0',
                  padding: '24px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  boxShadow: '0 8px 24px rgba(14,42,69,.08)'
                }}>
                  <h3 style={{ fontFamily: SERIF, fontWeight: 900, color: '#B45309', fontSize: '30px', margin: 0, lineHeight: 1.3 }}>
                    <WordRenderer text="A pioneer of Indian astronomy & mathematics" idPrefix="s" activeWordId={activeWordId} defaultColor="#B45309" highlightColor="#451a03" />
                  </h3>
                  <p style={{ fontFamily: SANS, fontWeight: 600, color: '#3D2E24', fontSize: '19px', lineHeight: 1.65, margin: 0, textAlign: 'justify', textJustify: 'inter-word' }}>
                    <WordRenderer text="Working around 500 CE, Āryabhaṭa asked some very important questions — what shape is the Earth, why do stars appear to move, and how do we measure our planet?" idPrefix="p1" activeWordId={activeWordId} defaultColor="#3D2E24" highlightColor="#451a03" />
                  </p>
                  <p style={{ fontFamily: SANS, fontWeight: 600, color: '#3D2E24', fontSize: '19px', lineHeight: 1.65, margin: 0, textAlign: 'justify', textJustify: 'inter-word' }}>
                    <WordRenderer text="At just 23 years of age, he composed his famous" idPrefix="p2A" activeWordId={activeWordId} defaultColor="#3D2E24" highlightColor="#451a03" /> <b style={{ color: '#1A0D05', fontWeight: 800 }}><WordRenderer text="Āryabhaṭīya" idPrefix="p2B" activeWordId={activeWordId} defaultColor="#1A0D05" highlightColor="#451a03" /></b> <WordRenderer text="in 499 CE. It became a important work that influenced many scholars for generation." idPrefix="p2C" activeWordId={activeWordId} defaultColor="#3D2E24" highlightColor="#451a03" />
                  </p>
                </div>

                <div style={{
                  ...cardBase,
                  background: 'linear-gradient(160deg, #F7F1E2 0%, #EFE6D2 100%)',
                  border: '1.5px solid #E5D5C0',
                  padding: '20px 24px',
                  boxShadow: '0 8px 24px rgba(14,42,69,.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px'
                }}>
                  <div style={{ fontFamily: SERIF, fontWeight: 900, color: '#2C1A0E', fontSize: '20px' }}>
                    Timeline of Āryabhaṭa
                  </div>
                  <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '10px' }}>
                    <div style={{ position: 'absolute', left: '6%', right: '6%', top: '9px', height: '3px', background: 'linear-gradient(90deg, #B45309 0%, #D79A2B 50%, #B45309 100%)', borderRadius: '2px' }} />
                    {TIMELINE.map(t => (
                      <div key={t.year} style={{ position: 'relative', textAlign: 'center', flex: 1 }}>
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#B45309', margin: '0 auto 8px', border: '3px solid #FAF6EE', boxShadow: '0 3px 8px rgba(180,83,9,0.35)' }} />
                        <div style={{ fontFamily: MONO, fontWeight: 900, color: '#2C1A0E', fontSize: '16px' }}>{t.year}</div>
                        <div style={{ fontFamily: SANS, color: '#3D2E24', fontSize: '14px', marginTop: '4px', fontWeight: 800 }}>{t.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ============ BOOK SLIDE FOOTER ============ */}
      <div style={{
        flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: '14px', padding: '16px 28px', borderTop: '1px solid #E4EBF3', background: '#f8fafc'
      }}>
        {/* Page Indicators */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: SANS, fontWeight: 700, color: '#5c6b7a', fontSize: '15.5px' }}>
            Slide {slide + 1} of {SLIDES.length}
          </span>
          <span style={{ display: 'inline-flex', gap: '8px' }}>
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  width: '11px', height: '11px', padding: 0, borderRadius: '50%', border: 'none',
                  cursor: 'pointer', background: i === slide ? '#D79A2B' : '#DCE4EC',
                  transition: 'all .25s', transform: i === slide ? 'scale(1.2)' : 'scale(1)'
                }}
              />
            ))}
          </span>
        </div>

        {/* Nav Buttons parallel */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>

          {/* Audio Speaker Button */}
          <button
            type="button"
            onClick={toggleAudio}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '8px 16px', background: '#d97706',
              border: 'none', borderRadius: '999px',
              fontSize: '14px', fontWeight: 800, color: '#fff',
              cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              marginRight: '8px'
            }}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>

          <button
            type="button"
            onClick={() => {
              if (slide > 0) {
                goToSlide(slide - 1);
              } else if (onBack) {
                onBack();
              }
            }}
            disabled={slide === 0 && !onBack}
            style={{
              fontFamily: SANS, fontWeight: 700, fontSize: '15.5px',
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: '#0E3556', color: '#fff', border: 'none',
              borderRadius: '999px', padding: '12px 24px',
              cursor: (slide === 0 && !onBack) ? 'not-allowed' : 'pointer',
              opacity: (slide === 0 && !onBack) ? 0.35 : 1,
              boxShadow: '0 6px 16px rgba(14,42,69,.22)'
            }}
          >
            <ChevronLeft size={18} strokeWidth={2.5} /> Back
          </button>

          <button
            type="button"
            onClick={() => {
              if (isLast) { if (onNext) onNext(); return; }
              goToSlide(slide + 1);
            }}
            disabled={isLast && isNextEnabled === false}
            style={{
              fontFamily: SANS, fontWeight: 700, fontSize: '15.5px',
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: isLast ? '#16a34a' : '#F59E0B', color: '#fff', border: 'none',
              borderRadius: '999px', padding: '12px 26px',
              cursor: isLast && isNextEnabled === false ? 'not-allowed' : 'pointer',
              opacity: isLast && isNextEnabled === false ? 0.45 : 1,
              boxShadow: isLast ? '0 6px 16px rgba(22,163,74,.3)' : '0 6px 16px rgba(245,158,11,.38)'
            }}
          >
            {isLast ? 'Continue' : 'Next'} <ChevronRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
