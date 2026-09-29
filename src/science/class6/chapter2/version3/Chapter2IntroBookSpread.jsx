import React, { useState } from 'react';
import { 
  ChevronRight, ChevronLeft, Volume2, VolumeX, Sparkles, BookOpen, 
  CheckCircle2, Compass, ArrowRight, ShieldCheck, Heart, Eye, Award
} from 'lucide-react';
import sanskritSlogan from '../../../../assets/sanskrit_slogan.png';

const NAVY = '#064E3B';
const EMERALD = '#059669';
const AMBER = '#B45309';
const SERIF = '"Fraunces", "Iowan Old Style", Palatino, Georgia, serif';
const SANS = '"Space Grotesk", system-ui, -apple-system, sans-serif';
const MONO = '"IBM Plex Mono", monospace';

// Authentic bird audio synthesis using Web Audio API
function playBirdSong(birdType) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    if (birdType === 'koel') {
      // Asian Koel distinctive rising whistle: 'Koo-ooo!'
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1600, now + 0.35);
      gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.52);

      // Repeat second pulse slightly higher
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(950, now + 0.55);
      osc2.frequency.exponentialRampToValueAtTime(1850, now + 0.95);
      gain2.setValueAtTime(0, now + 0.55);
      gain2.gain.linearRampToValueAtTime(0.28, now + 0.65);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.1);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.55);
      osc2.stop(now + 1.15);
    } else if (birdType === 'sparrow') {
      // House Sparrow rapid chirp-chirp
      [0, 0.16, 0.34].forEach((t) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(2800, now + t);
        osc.frequency.exponentialRampToValueAtTime(3600, now + t + 0.04);
        osc.frequency.exponentialRampToValueAtTime(2200, now + t + 0.09);
        gain.setValueAtTime(0, now + t);
        gain.gain.linearRampToValueAtTime(0.2, now + t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.11);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + t);
        osc.stop(now + t + 0.12);
      });
    } else if (birdType === 'bulbul') {
      // Red-vented Bulbul pleasant warble
      const freqs = [1400, 1800, 1550, 2100];
      freqs.forEach((f, idx) => {
        const t = idx * 0.12;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + t);
        osc.frequency.exponentialRampToValueAtTime(f + 250, now + t + 0.09);
        gain.setValueAtTime(0, now + t);
        gain.gain.linearRampToValueAtTime(0.22, now + t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + t);
        osc.stop(now + t + 0.13);
      });
    } else if (birdType === 'crow') {
      // House Crow throaty 'Caw-Caw'
      [0, 0.45].forEach((t) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(580, now + t);
        osc.frequency.exponentialRampToValueAtTime(420, now + t + 0.28);
        gain.setValueAtTime(0, now + t);
        gain.gain.linearRampToValueAtTime(0.18, now + t + 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.32);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + t);
        osc.stop(now + t + 0.34);
      });
    }
  } catch (e) {
    console.warn('Audio playback not supported', e);
  }
}

const BIRDS_DATA = [
  { id: 'koel', name: 'Asian Koel', call: 'Koo-ooo! Koo-ooo!', icon: '🕊️', desc: 'Melodious rising whistle echoing through mango groves.' },
  { id: 'sparrow', name: 'House Sparrow', call: 'Chirp-chirp! Cheep!', icon: '🐦', desc: 'Lively, rapid chirping near shrubs and community verandahs.' },
  { id: 'bulbul', name: 'Red-vented Bulbul', call: 'Peep-whistle-tweet!', icon: '🎶', desc: 'Rhythmic, bubbling warble from garden hedges.' },
  { id: 'crow', name: 'House Crow', call: 'Caw! Caw! Caw!', icon: '🦅', desc: 'Deep, resonant social call signaling flock alerts.' }
];

const SLIDES = [
  {
    title: 'Interconnected Web of Life',
    badge: 'Section 1 · Ecological Wisdom',
    subtitle: 'Trees stand in the sun to give cooling shade to others'
  },
  {
    title: 'The School Nature Walk Guide',
    badge: 'Section 2 · Field Mentors & Ethics',
    subtitle: 'Exploring plants and animals without disturbing nature'
  },
  {
    title: 'What is Biodiversity?',
    badge: 'Section 3 · Biological Definition',
    subtitle: 'The rich variety of living organisms in a particular region'
  },
  {
    title: 'Your Fieldwork Mission',
    badge: 'Section 4 · Chapter 2 Roadmap',
    subtitle: 'From plant stems and leaf veins to seeds and adaptations'
  }
];

export default function Chapter2IntroBookSpread({ onNextActivity, onReadAloud, isSpeaking }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [turnDir, setTurnDir] = useState('fwd');
  const [activeBird, setActiveBird] = useState(null);
  const [fieldKit, setFieldKit] = useState({
    notebook: true,
    pen: true,
    bottle: true,
    lens: false,
    pouch: false
  });

  const goToSlide = (idx) => {
    if (idx < 0 || idx >= SLIDES.length) return;
    setTurnDir(idx > currentSlide ? 'fwd' : 'back');
    setCurrentSlide(idx);
  };

  const handlePlayBird = (birdId) => {
    setActiveBird(birdId);
    playBirdSong(birdId);
    setTimeout(() => setActiveBird(null), 1200);
  };

  const toggleKitItem = (key) => {
    setFieldKit(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={{
      display: 'flex',
      width: '100%',
      height: '100%',
      minHeight: 0,
      background: '#ffffff',
      borderRadius: '20px',
      overflow: 'hidden',
      border: '1.5px solid #a7f3d0',
      boxShadow: '0 10px 40px rgba(6, 78, 59, 0.08)',
      boxSizing: 'border-box'
    }}>
      <style>{`
        @keyframes bookTurnFwd {
          0%   { opacity: 0; transform: perspective(1200px) rotateY(-12deg) translateX(20px) scale(0.99); }
          60%  { opacity: 1; }
          100% { opacity: 1; transform: perspective(1200px) rotateY(0deg) translateX(0) scale(1); }
        }
        @keyframes bookTurnBack {
          0%   { opacity: 0; transform: perspective(1200px) rotateY(12deg) translateX(-20px) scale(0.99); }
          60%  { opacity: 1; }
          100% { opacity: 1; transform: perspective(1200px) rotateY(0deg) translateX(0) scale(1); }
        }
        .book-slide-fwd { animation: bookTurnFwd 0.35s cubic-bezier(0.22, 0.61, 0.36, 1) both; }
        .book-slide-back { animation: bookTurnBack 0.35s cubic-bezier(0.22, 0.61, 0.36, 1) both; }
        .bird-pulse { animation: birdPulse 0.6s ease-in-out infinite alternate; }
        @keyframes birdPulse {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
      `}</style>

      {/* ============================================================ */}
      {/* LEFT PANEL: REALISTIC BOTANICAL STAGE & FIELD STATION (44%)  */}
      {/* ============================================================ */}
      <div style={{
        flex: '0 0 44%',
        minWidth: 0,
        height: '100%',
        boxSizing: 'border-box',
        background: 'linear-gradient(160deg, #f0fdf4 0%, #dcfce7 60%, #bbf7d0 100%)',
        borderRight: '1.5px solid #a7f3d0',
        padding: '22px 26px 18px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '14px',
        overflowY: 'auto',
        scrollbarWidth: 'thin'
      }}>
        {/* Left Header matching LocatingPlaces */}
        <div style={{ flexShrink: 0 }}>
          <div style={{
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: '14.5px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#047857',
            marginBottom: '4px'
          }}>
            Class 6 Science · Chapter 2
          </div>
          <h1 style={{
            fontFamily: SERIF,
            fontWeight: 900,
            color: NAVY,
            fontSize: '26px',
            lineHeight: 1.2,
            margin: 0,
            letterSpacing: '-0.01em'
          }}>
            Diversity in the Living World
          </h1>
        </div>

        {/* Ancient Sanskrit Verse Card with Gold Seal */}
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          border: '1.5px solid #a7f3d0',
          borderLeft: '5px solid #059669',
          padding: '14px 18px',
          boxShadow: '0 4px 16px rgba(6, 78, 59, 0.05)',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{
              fontFamily: SANS,
              fontSize: '14px',
              fontWeight: 800,
              color: '#047857',
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}>
              📜 Classical Subhashita (Page 9)
            </span>
            <span style={{ fontSize: '13.5px', color: AMBER, fontWeight: '800' }}>Traditional Wisdom</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              background: '#f0fdf4',
              border: '1px solid #86efac',
              borderRadius: '12px',
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <img 
                src={sanskritSlogan} 
                alt="Sanskrit Slogan" 
                style={{ height: '42px', objectFit: 'contain' }}
              />
            </div>
            <p style={{
              margin: 0,
              fontFamily: SANS,
              fontSize: '16px',
              color: '#064e3b',
              fontWeight: 600,
              lineHeight: 1.55
            }}>
              "Trees stand in the sun to give cooling shade to others. Their fruits are also for others."
            </p>
          </div>
        </div>

        {/* Interactive Bird Acoustics Canopy Simulator (Maniram Chacha Mimics) */}
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          border: '1.5px solid #a7f3d0',
          padding: '14px 18px',
          boxShadow: '0 4px 16px rgba(6, 78, 59, 0.05)',
          flex: '1 1 auto',
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>🌳</span>
                <div>
                  <h3 style={{
                    margin: 0,
                    fontFamily: SANS,
                    fontSize: '17px',
                    fontWeight: 800,
                    color: NAVY
                  }}>
                    Canopy Acoustics: Bird Calls Mimic
                  </h3>
                  <span style={{ fontSize: '13.5px', color: '#047857', fontWeight: 700 }}>
                    Maniram Chacha's Auditory Biodiversity Demonstration (Page 10)
                  </span>
                </div>
              </div>
              <span style={{
                fontSize: '13.5px',
                fontWeight: 800,
                color: '#059669',
                background: '#dcfce7',
                padding: '4px 10px',
                borderRadius: '8px'
              }}>
                Tap to Listen
              </span>
            </div>

            <p style={{
              margin: '0 0 10px 0',
              fontFamily: SANS,
              fontSize: '16px',
              color: '#1f2937',
              lineHeight: 1.55
            }}>
              Maniram chacha mimics bird calls to demonstrate that <b>every bird has its own unique chirp</b> in nature:
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '8px'
            }}>
              {BIRDS_DATA.map((bird) => {
                const isPlaying = activeBird === bird.id;
                return (
                  <button
                    key={bird.id}
                    onClick={() => handlePlayBird(bird.id)}
                    className={isPlaying ? 'bird-pulse' : ''}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 12px',
                      background: isPlaying ? 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)' : '#f8fafc',
                      border: `1.5px solid ${isPlaying ? '#059669' : '#cbd5e1'}`,
                      borderRadius: '12px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                      boxShadow: isPlaying ? '0 4px 14px rgba(5, 150, 105, 0.25)' : 'none'
                    }}
                  >
                    <span style={{ fontSize: '26px' }}>{bird.icon}</span>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{
                        fontFamily: SANS,
                        fontSize: '16px',
                        fontWeight: 800,
                        color: NAVY,
                        lineHeight: 1.2
                      }}>
                        {bird.name}
                      </div>
                      <div style={{
                        fontFamily: MONO,
                        fontSize: '13.5px',
                        fontWeight: 700,
                        color: '#059669',
                        marginTop: '2px'
                      }}>
                        {bird.call}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Student Field Gear Checklist */}
          <div style={{
            background: '#f0fdf4',
            border: '1.5px solid #a7f3d0',
            borderRadius: '12px',
            padding: '10px 14px',
            marginTop: '10px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '6px'
            }}>
              <span style={{
                fontFamily: SANS,
                fontSize: '14px',
                fontWeight: 800,
                color: '#047857',
                textTransform: 'uppercase'
              }}>
                🎒 Nature Walk Field Kit (Page 10)
              </span>
              <span style={{ fontSize: '13px', color: '#059669', fontWeight: 700 }}>
                {Object.values(fieldKit).filter(Boolean).length}/5 Packed
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {[
                { key: 'notebook', label: 'Field Notebook' },
                { key: 'pen', label: 'Black Ink Pen' },
                { key: 'bottle', label: 'Water Bottle' },
                { key: 'lens', label: 'Magnifying Lens' },
                { key: 'pouch', label: 'Fallen Leaf Pouch' }
              ].map(item => (
                <button
                  key={item.key}
                  onClick={() => toggleKitItem(item.key)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '5px 10px',
                    borderRadius: '8px',
                    background: fieldKit[item.key] ? '#ffffff' : 'transparent',
                    border: `1px solid ${fieldKit[item.key] ? '#059669' : '#cbd5e1'}`,
                    color: fieldKit[item.key] ? NAVY : '#64748b',
                    fontSize: '13.5px',
                    fontFamily: SANS,
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <CheckCircle2 size={15} color={fieldKit[item.key] ? '#059669' : '#94a3b8'} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* RIGHT PANEL: INTERACTIVE BOOK SLIDE DECK (56%)               */}
      {/* ============================================================ */}
      <div style={{
        flex: '1 1 56%',
        minWidth: 0,
        height: '100%',
        boxSizing: 'border-box',
        padding: '22px 28px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#ffffff',
        overflow: 'hidden'
      }}>
        {/* Right Header with Slide Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1.5px solid #e2e8f0',
          paddingBottom: '12px',
          flexShrink: 0
        }}>
          <div>
            <div style={{
              fontFamily: SANS,
              fontSize: '14.5px',
              fontWeight: 800,
              color: '#059669',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '3px'
            }}>
              {SLIDES[currentSlide].badge}
            </div>
            <h2 style={{
              fontFamily: SERIF,
              fontSize: '25px',
              fontWeight: 900,
              color: NAVY,
              margin: 0,
              lineHeight: 1.2
            }}>
              {SLIDES[currentSlide].title}
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Read Aloud Button */}
            <button
              onClick={() => onReadAloud(
                currentSlide === 0
                  ? "Section one: Interconnected web of life. Trees stand in the sun to give cooling shade and fruits to others. Every plant, animal, and microorganism in a habitat contributes to the shared ecological web."
                  : currentSlide === 1
                  ? "Section two: The school nature walk guide. Doctor Raghu and Maniram chacha guide students on an experiential garden trail. Observe without disturbing, notice scents, and listen to distinct bird calls."
                  : currentSlide === 2
                  ? "Section three: What is biodiversity? The variety of plants and animals found in a particular region contributes to the biodiversity of that region. Every member plays an essential ecological role."
                  : "Section four: Your fieldwork mission. Join us across activities two point one through two point ten, recording plant features, animal locomotion, leaf venation, root systems, and adaptations."
              )}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                background: isSpeaking ? '#fee2e2' : '#f0fdf4',
                border: `1.5px solid ${isSpeaking ? '#fca5a5' : '#a7f3d0'}`,
                borderRadius: '10px',
                color: isSpeaking ? '#991b1b' : '#047857',
                fontWeight: 800,
                fontSize: '14px',
                fontFamily: SANS,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span>{isSpeaking ? 'Stop' : 'Narration'}</span>
            </button>

            {/* Slide Back & Next */}
            <button
              onClick={() => goToSlide(currentSlide - 1)}
              disabled={currentSlide === 0}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: currentSlide === 0 ? '#f1f5f9' : '#ffffff',
                border: '1.5px solid #cbd5e1',
                color: currentSlide === 0 ? '#94a3b8' : NAVY,
                cursor: currentSlide === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={() => goToSlide(currentSlide + 1)}
              disabled={currentSlide === SLIDES.length - 1}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: currentSlide === SLIDES.length - 1 ? '#f1f5f9' : '#ffffff',
                border: '1.5px solid #cbd5e1',
                color: currentSlide === SLIDES.length - 1 ? '#94a3b8' : NAVY,
                cursor: currentSlide === SLIDES.length - 1 ? 'not-allowed' : 'pointer'
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Dynamic Slide Stage with Page Turn Animation */}
        <div 
          key={currentSlide}
          className={turnDir === 'fwd' ? 'book-slide-fwd' : 'book-slide-back'}
          style={{
            flex: 1,
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '16px 0',
            overflowY: 'auto'
          }}
        >
          {/* ============================================================ */}
          {/* SLIDE 1: INTERCONNECTED WEB OF LIFE                          */}
          {/* ============================================================ */}
          {currentSlide === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{
                background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)',
                border: '1.5px solid #a7f3d0',
                borderRadius: '14px',
                padding: '16px 20px'
              }}>
                <p style={{
                  margin: '0 0 10px 0',
                  fontFamily: SANS,
                  fontSize: '17px',
                  color: '#1f2937',
                  lineHeight: 1.62,
                  textAlign: 'justify'
                }}>
                  <b>The Noble Tree Verse:</b> "Just as trees bear hardships to offer sweet fruit and sheltering shade to all, living creatures do not survive alone. Every organism is interconnected, giving and receiving within an ecological web."
                </p>
                <div style={{
                  fontFamily: SANS,
                  fontSize: '15px',
                  color: '#059669',
                  fontWeight: 700
                }}>
                  — Class 6 Science Opening Subhashita (Page 9)
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                <div style={{
                  background: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '16px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.04)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '26px' }}>🌳</span>
                    <div>
                      <h4 style={{ margin: 0, fontFamily: SANS, fontSize: '18px', fontWeight: 800, color: NAVY }}>
                        Canopy Shelter &amp; Shade
                      </h4>
                      <span style={{ fontSize: '14px', color: '#059669', fontWeight: 700 }}>Flora to Fauna</span>
                    </div>
                  </div>
                  <p style={{ margin: 0, fontFamily: SANS, fontSize: '16px', color: '#374151', lineHeight: 1.55 }}>
                    Large trees provide nesting sanctuaries for birds, tree hollows for squirrels, and cooling shade for ground mammals and wild grasses.
                  </p>
                </div>

                <div style={{
                  background: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '16px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.04)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '26px' }}>🐝</span>
                    <div>
                      <h4 style={{ margin: 0, fontFamily: SANS, fontSize: '18px', fontWeight: 800, color: NAVY }}>
                        Pollination &amp; Dispersal
                      </h4>
                      <span style={{ fontSize: '14px', color: '#059669', fontWeight: 700 }}>Fauna to Flora</span>
                    </div>
                  </div>
                  <p style={{ margin: 0, fontFamily: SANS, fontSize: '16px', color: '#374151', lineHeight: 1.55 }}>
                    Butterflies and bees pollinate blooming flowers, while fruit-eating birds and monkeys disperse seeds far away, regenerating forests.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* SLIDE 2: THE SCHOOL NATURE WALK GUIDE                        */}
          {/* ============================================================ */}
          {currentSlide === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <p style={{
                margin: 0,
                fontFamily: SANS,
                fontSize: '17px',
                color: '#1f2937',
                lineHeight: 1.62,
                textAlign: 'justify'
              }}>
                On a fresh morning following refreshing rain, science teacher <b>Madam Sulekha</b> invites <b>Dr. Raghu</b> (Research Laboratory scientist) and <b>Maniram chacha</b> (elderly naturalist) to lead an inspiring nature walk.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                <div style={{
                  background: '#ffffff',
                  border: '1.5px solid #a7f3d0',
                  borderRadius: '14px',
                  padding: '14px',
                  boxShadow: '0 4px 12px rgba(6, 78, 59, 0.04)'
                }}>
                  <div style={{ fontSize: '26px', marginBottom: '6px' }}>👃</div>
                  <h4 style={{ margin: '0 0 4px 0', fontFamily: SANS, fontSize: '17px', fontWeight: 800, color: NAVY }}>
                    Scents of Nature
                  </h4>
                  <p style={{ margin: 0, fontFamily: SANS, fontSize: '15px', color: '#4b5563', lineHeight: 1.5 }}>
                    Notice the fragrance of crushed tulsi leaves, wet soil (petrichor), and sweet floral blossoms.
                  </p>
                </div>

                <div style={{
                  background: '#ffffff',
                  border: '1.5px solid #a7f3d0',
                  borderRadius: '14px',
                  padding: '14px',
                  boxShadow: '0 4px 12px rgba(6, 78, 59, 0.04)'
                }}>
                  <div style={{ fontSize: '26px', marginBottom: '6px' }}>👂</div>
                  <h4 style={{ margin: '0 0 4px 0', fontFamily: SANS, fontSize: '17px', fontWeight: 800, color: NAVY }}>
                    Listen Mindfully
                  </h4>
                  <p style={{ margin: 0, fontFamily: SANS, fontSize: '15px', color: '#4b5563', lineHeight: 1.5 }}>
                    Hear the rustling wind in branches, busy buzzing of bees, and distinct calls of native birds.
                  </p>
                </div>

                <div style={{
                  background: '#ffffff',
                  border: '1.5px solid #a7f3d0',
                  borderRadius: '14px',
                  padding: '14px',
                  boxShadow: '0 4px 12px rgba(6, 78, 59, 0.04)'
                }}>
                  <div style={{ fontSize: '26px', marginBottom: '6px' }}>🛡️</div>
                  <h4 style={{ margin: '0 0 4px 0', fontFamily: SANS, fontSize: '17px', fontWeight: 800, color: NAVY }}>
                    Zero Disturbance
                  </h4>
                  <p style={{ margin: 0, fontFamily: SANS, fontSize: '15px', color: '#4b5563', lineHeight: 1.5 }}>
                    Respect all living creatures. Do not pluck fresh leaves or flowers; collect only fallen specimens.
                  </p>
                </div>
              </div>

              <div style={{
                background: '#f8fafc',
                border: '1.5px solid #e2e8f0',
                borderRadius: '12px',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <span style={{ fontSize: '22px' }}>💡</span>
                <span style={{ fontFamily: SANS, fontSize: '16px', color: '#334155', fontWeight: 600 }}>
                  <b>Rule (Page 11):</b> "Take care of plants and animals. Do not disturb nests or pluck living leaves. Observe them thriving in their natural habitat."
                </span>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* SLIDE 3: WHAT IS BIODIVERSITY?                               */}
          {/* ============================================================ */}
          {currentSlide === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Highlighted Gold-Emerald Definition Callout */}
              <div style={{
                background: 'linear-gradient(135deg, #ecfdf5 0%, #dcfce7 100%)',
                border: '2px solid #059669',
                borderRadius: '16px',
                padding: '16px 20px',
                boxShadow: '0 4px 18px rgba(5, 150, 105, 0.12)'
              }}>
                <div style={{
                  fontFamily: SANS,
                  fontSize: '14px',
                  fontWeight: 800,
                  color: '#047857',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '6px'
                }}>
                  Official Definition (Page 13)
                </div>
                <h3 style={{
                  fontFamily: SERIF,
                  fontSize: '22px',
                  color: NAVY,
                  margin: '0 0 6px 0',
                  lineHeight: 1.3
                }}>
                  "The variety of plants and animals found in a particular region contributes to the biodiversity of that region."
                </h3>
                <p style={{ margin: 0, fontFamily: SANS, fontSize: '16px', color: '#064e3b', lineHeight: 1.55 }}>
                  Every species—from tiny soil burrowing ants and soft grasses to towering banyan trees and soaring hawks—fulfills a vital ecological duty.
                </p>
              </div>

              {/* 3 Pillars of Living Biodiversity */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                <div style={{
                  background: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '14px'
                }}>
                  <span style={{ fontSize: '24px' }}>🌿</span>
                  <h4 style={{ margin: '6px 0 4px 0', fontFamily: SANS, fontSize: '17px', fontWeight: 800, color: NAVY }}>
                    Structural Diversity
                  </h4>
                  <p style={{ margin: 0, fontFamily: SANS, fontSize: '15px', color: '#4b5563', lineHeight: 1.5 }}>
                    Stems vary in height and thickness (herbs, shrubs, trees). Leaves vary in shapes and vein patterns.
                  </p>
                </div>

                <div style={{
                  background: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '14px'
                }}>
                  <span style={{ fontSize: '24px' }}>🐾</span>
                  <h4 style={{ margin: '6px 0 4px 0', fontFamily: SANS, fontSize: '17px', fontWeight: 800, color: NAVY }}>
                    Locomotion Diversity
                  </h4>
                  <p style={{ margin: 0, fontFamily: SANS, fontSize: '15px', color: '#4b5563', lineHeight: 1.5 }}>
                    Animals move in diverse ways: flying wings, crawling legs, swimming fins, and hopping hindlimbs.
                  </p>
                </div>

                <div style={{
                  background: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '14px'
                }}>
                  <span style={{ fontSize: '24px' }}>🏕️</span>
                  <h4 style={{ margin: '6px 0 4px 0', fontFamily: SANS, fontSize: '17px', fontWeight: 800, color: NAVY }}>
                    Habitat Adaptation
                  </h4>
                  <p style={{ margin: 0, fontFamily: SANS, fontSize: '15px', color: '#4b5563', lineHeight: 1.5 }}>
                    Life thrives in diverse biomes: hot sandy deserts, freezing Himalayan mountains, forests, and oceans.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* SLIDE 4: YOUR FIELDWORK MISSION ROADMAP                     */}
          {/* ============================================================ */}
          {currentSlide === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <p style={{
                margin: 0,
                fontFamily: SANS,
                fontSize: '17px',
                color: '#1f2937',
                lineHeight: 1.62
              }}>
                Ready to step into the shoes of a field naturalist? Here is your complete curriculum roadmap for Chapter 2:
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '10px'
              }}>
                {[
                  { step: 'Act 2.1', title: 'Botanical & Zoological Labs', desc: 'Log real plants (Table 2.1) and animal habitats (Table 2.2).' },
                  { step: 'Act 2.2–2.3', title: 'Appreciation & Grouping', desc: 'Collaborative blackboard sketch & sorting by scientific criteria.' },
                  { step: 'Act 2.4', title: 'Plant Detective', desc: 'Classify herbs, shrubs, trees, climbers & creepers (Table 2.3).' },
                  { step: 'Act 2.5–2.8', title: 'Venation, Roots & Seeds', desc: 'Discover how leaf veins, taproots & cotyledons interlock.' },
                  { step: 'Act 2.9–2.10', title: 'Adaptations & Biomes', desc: 'Camels, deodars, and Indian conservation champions.' },
                  { step: 'Summary', title: 'Exercises & Sacred Groves', desc: 'Solve all 10 textbook questions with instant feedback.' }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: '#ffffff',
                      border: '1.5px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '12px 14px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px'
                    }}
                  >
                    <span style={{
                      fontFamily: MONO,
                      fontSize: '13px',
                      fontWeight: 800,
                      color: '#059669',
                      background: '#ecfdf5',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      flexShrink: 0
                    }}>
                      {item.step}
                    </span>
                    <div>
                      <div style={{ fontFamily: SANS, fontSize: '16px', fontWeight: 800, color: NAVY }}>
                        {item.title}
                      </div>
                      <div style={{ fontFamily: SANS, fontSize: '14.5px', color: '#64748b', marginTop: '2px' }}>
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1.5px solid #e2e8f0',
          paddingTop: '14px',
          flexShrink: 0
        }}>
          {/* Pagination Indicators */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                style={{
                  width: currentSlide === idx ? '28px' : '10px',
                  height: '10px',
                  borderRadius: '5px',
                  background: currentSlide === idx ? '#059669' : '#cbd5e1',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              />
            ))}
            <span style={{
              marginLeft: '8px',
              fontFamily: SANS,
              fontSize: '14.5px',
              fontWeight: 800,
              color: '#64748b'
            }}>
              Slide {currentSlide + 1} of {SLIDES.length}
            </span>
          </div>

          {/* Action Button */}
          {currentSlide < SLIDES.length - 1 ? (
            <button
              onClick={() => goToSlide(currentSlide + 1)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 22px',
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                borderRadius: '12px',
                color: '#ffffff',
                fontFamily: SANS,
                fontWeight: 800,
                fontSize: '16px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(5, 150, 105, 0.35)',
                transition: 'all 0.2s ease'
              }}
            >
              <span>Next Section</span>
              <ChevronRight size={18} />
            </button>
          ) : (
            <button
              onClick={onNextActivity}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 26px',
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                borderRadius: '12px',
                color: '#ffffff',
                fontFamily: SANS,
                fontWeight: 900,
                fontSize: '16.5px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(217, 119, 6, 0.4)',
                transition: 'all 0.2s ease'
              }}
            >
              <span>Begin Activity 2.1 (Botanical Walk)</span>
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
