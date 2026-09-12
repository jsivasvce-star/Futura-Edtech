import React, { useState, useEffect, Suspense } from 'react';
import { ArrowLeft } from 'lucide-react';
import ErrorBoundary from '../../../../components/ErrorBoundary';

import traffic1 from '../../../../assets/traffic_1.jpeg';
import traffic2 from '../../../../assets/traffic_2.jpeg';
import traffic3 from '../../../../assets/traffic_3.jpeg';
import traffic4 from '../../../../assets/traffic_4.jpeg';
import traffic5 from '../../../../assets/traffic_5.jpeg';
import traffic6 from '../../../../assets/traffic_6.jpeg';
import traffic7 from '../../../../assets/traffic_7.jpeg';
import traffic8 from '../../../../assets/traffic_8.jpeg';

import audio1 from '../../../../assets/audio/1.mp3';
import audio2 from '../../../../assets/audio/2.mp3';
import audio3 from '../../../../assets/audio/3.mp3';
import audio4 from '../../../../assets/audio/4.mp3';
import audio5 from '../../../../assets/audio/5.mp3';
import audio6 from '../../../../assets/audio/6.mp3';
import audio7 from '../../../../assets/audio/7.mp3';
import audio8 from '../../../../assets/audio/8.mp3';
import exploreWordTimings from './exploreWordTimings.json';
import nature1 from '../../../../assets/nature_1.png';
import natureSunflower from '../../../../assets/nature_sunflower.png';
import natureLeave from '../../../../assets/nature_leave.png';
import natureFern from '../../../../assets/nature_fern.png';
import natureFlower from '../../../../assets/nature_flower.png';
import natureRock from '../../../../assets/nature_rock.png';
import natureShell from '../../../../assets/nature_shell.png';

import homeEnvironment from '../../../../assets/home_environment.png';
import homeStairs from '../../../../assets/home_stairs.png';
import homeBook from '../../../../assets/home_book.png';
import homeWindow from '../../../../assets/home_window.png';
import homeClock from '../../../../assets/home_clock.png';
import homeTiles from '../../../../assets/home_tiles.png';

import schoolEnvironment from '../../../../assets/school_environment.png';
import schoolDesk from '../../../../assets/school_desk.png';
import schoolCorridor from '../../../../assets/school_corridor.png';
import schoolBoard from '../../../../assets/school_board.png';
import schoolSportsCourt from '../../../../assets/school_sports court.png';

const SCHOOL_OBJECTS = [
  {
    id: 'desk',
    name: 'Desk',
    image: schoolDesk,
    heading: 'Desk — Grid & Row Arrangement',
    description: 'Desks are arranged in neat parallel rows and columns, forming an organized grid pattern across the classroom.',
    box: { left: '0%', top: '65%', width: '58%', height: '35%', borderRadius: '12px' }
  },
  {
    id: 'corridor',
    name: 'Corridor',
    image: schoolCorridor,
    heading: 'Corridor — Perspective & Repetition',
    description: 'The pillars and railings repeat at equal intervals, converging toward a vanishing point with perspective symmetry.',
    box: { left: '0%', top: '0%', width: '37%', height: '45%', borderRadius: '0 0 20px 0' }
  },
  {
    id: 'board',
    name: 'Board',
    image: schoolBoard,
    heading: 'Board — Coordinate Grid Pattern',
    description: 'The board features a rectangular frame and a square grid pattern ideal for graphing and geometry.',
    box: { left: '12.5%', top: '46%', width: '29%', height: '16.5%', borderRadius: '8px' }
  },
  {
    id: 'sports_court',
    name: 'Sports Court',
    image: schoolSportsCourt,
    heading: 'Sports Court — Geometric Markings',
    description: 'The court showcases concentric circles, arcs, rectangles, and lines of symmetry for balanced gameplay.',
    box: { left: '50%', top: '42%', width: '48%', height: '34%', borderRadius: '16px' }
  }
];

const HOME_OBJECTS = [
  {
    id: 'stairs',
    name: 'Stairs',
    image: homeStairs,
    heading: 'Stairs — Step Pattern',
    description: 'The steps follow a repeating geometric pattern with symmetric star designs on the marble.',
    box: { left: '75%', top: '10%', width: '22%', height: '45%', borderRadius: '16px' }
  },
  {
    id: 'book',
    name: 'Book',
    image: homeBook,
    heading: 'Book — Rectangular & Stack Pattern',
    description: 'The stacked books show neat rectangular shapes and parallel lines in their arrangement.',
    box: { left: '21%', top: '55%', width: '8%', height: '7%', borderRadius: '6px' }
  },
  {
    id: 'window',
    name: 'Window',
    image: homeWindow,
    heading: 'Window — Grid Pattern',
    description: 'The window frame forms a grid of equal rectangles and intersecting parallel lines.',
    box: { left: '19%', top: '8%', width: '17%', height: '30%', borderRadius: '8px' }
  },
  {
    id: 'clock',
    name: 'Clock',
    image: homeClock,
    heading: 'Clock — Circular & Angle Pattern',
    description: 'The circular clock face divides time into equal intervals and moving rotational angles.',
    box: { left: '40%', top: '10%', width: '6%', height: '11%', borderRadius: '50%' }
  },
  {
    id: 'tiles',
    name: 'Tiles',
    image: homeTiles,
    heading: 'Tiles — Tessellation Pattern',
    description: 'The floor tiles fit together perfectly in repeating geometric and tessellation patterns without gaps.',
    box: { left: '35%', top: '65%', width: '30%', height: '27%', borderRadius: '16px' }
  }
];

const NATURE_OBJECTS = [
  {
    id: 'sunflower',
    name: 'Sunflower',
    image: natureSunflower,
    heading: 'Sunflower — Spiral Pattern',
    description: 'The seeds of a sunflower are arranged in beautiful spirals. These spirals form a natural mathematical pattern.',
    box: { left: '71%', top: '17%', width: '23%', height: '35%', borderRadius: '50%' }
  },
  {
    id: 'leaves',
    name: 'Leaves',
    image: natureLeave,
    heading: 'Leaves — Symmetry and Vein Pattern',
    description: 'Leaves show symmetry in their shape, while their veins form branching patterns that spread from the main vein.',
    box: { left: '58%', top: '40%', width: '16%', height: '31%', borderRadius: '30px' }
  },
  {
    id: 'fern',
    name: 'Fern',
    image: natureFern,
    heading: 'Fern — Repeating Pattern',
    description: 'The small leaflets repeat along the fern. The repeated structure creates a natural repeating, fractal-like pattern.',
    box: { left: '11%', top: '38%', width: '33%', height: '37%', borderRadius: '30px' }
  },
  {
    id: 'flower',
    name: 'Flower',
    image: natureFlower,
    heading: 'Flower — Radial Symmetry',
    description: 'The petals are arranged around a central point. Similar parts repeat as we move around the centre, creating radial symmetry.',
    box: { left: '40%', top: '54%', width: '14%', height: '22%', borderRadius: '50%' }
  },
  {
    id: 'rocks',
    name: 'Rocks',
    image: natureRock,
    heading: 'Rocks — Natural Patterns',
    description: 'Rocks and pebbles can have natural lines, bands and textures. Some patterns repeat, while others appear random.',
    box: { left: '1%', top: '72%', width: '32%', height: '24%', borderRadius: '25px' }
  },
  {
    id: 'shell',
    name: 'Shell',
    image: natureShell,
    heading: 'Shell — Spiral Pattern',
    description: 'The shell grows in a spiral shape. Its curved lines wind around a central point, creating a natural spiral pattern.',
    box: { left: '55%', top: '73%', width: '13%', height: '18%', borderRadius: '50%' }
  }
];

const TRAFFIC_SLIDES = [
  {
    id: 1,
    src: traffic1,
    audio: audio1,
    alt: 'traffic 1',
    subtitle: "Let's look at this road junction. Right now, the traffic signal is Red, and all the vehicles have stopped."
  },
  {
    id: 2,
    src: traffic2,
    audio: audio2,
    alt: 'traffic 2',
    subtitle: "The signal doesn't stay the same forever. The colours keep changing in a specific order. Let's pause here at Yellow."
  },
  {
    id: 3,
    src: traffic3,
    audio: audio3,
    alt: 'traffic 3',
    subtitle: "Can you guess what comes after Yellow? Before the real signal changes, make your choice!"
  },
  {
    id: 4,
    src: traffic4,
    audio: audio4,
    alt: 'traffic 4',
    subtitle: "Let’s look at the pattern in order: It starts with Red, goes to Green, then Yellow, and finally... another Red."
  },
  {
    id: 5,
    src: traffic5,
    audio: audio5,
    alt: 'traffic 5',
    subtitle: "Did you notice? The sequence doesn't stop. After Yellow, it jumps right back to the beginning!"
  },
  {
    id: 6,
    src: traffic6,
    audio: audio6,
    alt: 'traffic 6',
    subtitle: "Since it keeps repeating, we can arrange it into a circle. This is called a repeating cycle: Red, Green, Yellow, and back to Red."
  },
  {
    id: 7,
    src: traffic7,
    audio: audio7,
    alt: 'traffic 7',
    subtitle: "Now that we know the secret cycle, we can predict what happens next! If we know the pattern, we can always find the next colour."
  },
  {
    id: 8,
    src: traffic8,
    audio: audio8,
    alt: 'traffic 8',
    subtitle: "We can even predict what happens after many changes! By moving 5 steps around our cycle starting from Red, we can easily see we will land on Yellow."
  }
];

const LESSON_TABS = [
  { id: 1, title: 'Nature' },
  { id: 2, title: 'Home' },
  { id: 3, title: 'School' },
  { id: 4, title: 'Everyday Activity' },
  { id: 5, title: 'Technology' },
  { id: 6, title: 'From Pattern → Why?' }
];

function FullscreenExplore1_1({ onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [activeLessonTab, setActiveLessonTab] = useState(1);
  const [selectedNatureObj, setSelectedNatureObj] = useState(null);
  const [selectedHomeObj, setSelectedHomeObj] = useState(null);
  const [selectedSchoolObj, setSelectedSchoolObj] = useState(null);

  const words = React.useMemo(() => {
    const text = TRAFFIC_SLIDES[currentSlide]?.subtitle || '';
    return text.split(' ');
  }, [currentSlide]);

  // Voice-synchronized word highlighting and 5-second auto-next delay
  useEffect(() => {
    if (currentSlide >= TRAFFIC_SLIDES.length) {
      return;
    }

    setCurrentWordIndex(-1);

    const slideData = TRAFFIC_SLIDES[currentSlide];
    const audioSrc = slideData?.audio;
    if (!audioSrc) return;

    const timings = exploreWordTimings[slideData.id] || [];

    let isMounted = true;
    let animFrameId = null;
    let delayTimer = null;

    const audio = new Audio(audioSrc);
    // Slow down playback for clear, natural, and easy-to-follow narration
    audio.playbackRate = 0.85;
    audio.preservesPitch = true;

    const trackWordHighlight = () => {
      if (!isMounted || !audio || audio.ended || audio.paused) return;
      const t = audio.currentTime;
      let activeIndex = -1;
      for (let i = 0; i < timings.length; i++) {
        const item = timings[i];
        if (t >= item.start && t <= item.end) {
          activeIndex = item.index;
          break;
        }
      }
      setCurrentWordIndex(activeIndex);
      animFrameId = requestAnimationFrame(trackWordHighlight);
    };

    audio.play().then(() => {
      if (isMounted) {
        animFrameId = requestAnimationFrame(trackWordHighlight);
      }
    }).catch((err) => {
      console.log('Audio playback waiting for user interaction:', err);
    });

    audio.onended = () => {
      if (!isMounted) return;
      // Remove the final word highlight when audio finishes
      setCurrentWordIndex(-1);

      // For Images 1–7 only: Wait an additional 5 seconds, then move to next image
      if (currentSlide < TRAFFIC_SLIDES.length - 1) {
        delayTimer = setTimeout(() => {
          if (isMounted) {
            setCurrentSlide((prev) => prev + 1);
          }
        }, 5000);
      }
    };

    return () => {
      isMounted = false;
      if (animFrameId) cancelAnimationFrame(animFrameId);
      if (delayTimer) clearTimeout(delayTimer);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [currentSlide]);

  // Support Escape key to exit fullscreen modal if needed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const isLessonContent = currentSlide >= TRAFFIC_SLIDES.length;

  if (isLessonContent) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 999999,
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#020617',
        boxSizing: 'border-box'
      }}>
        {/* Top Single Horizontal Row: Back Button + 6 Navigation Boxes */}
        <div style={{
          flexShrink: 0,
          width: '100%',
          minWidth: 0,
          padding: 'clamp(8px, 1.2vh, 12px) clamp(12px, 1.5vw, 20px)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '0.45rem',
          boxSizing: 'border-box',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          zIndex: 10
        }}>
          <button
            type="button"
            onClick={onClose}
            title="Back to Main Page"
            style={{
              flexShrink: 0,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.45rem 0.85rem',
              minHeight: '46px',
              fontSize: '0.82rem',
              fontWeight: '800',
              color: '#0f172a',
              border: '1.5px solid #cbd5e1',
              borderRadius: '12px',
              background: '#ffffff',
              cursor: 'pointer',
              boxSizing: 'border-box',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
              fontFamily: '"Space Grotesk", sans-serif',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#f59e0b';
              e.currentTarget.style.color = '#d97706';
              e.currentTarget.style.transform = 'translateX(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#cbd5e1';
              e.currentTarget.style.color = '#0f172a';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Main Page</span>
          </button>

          <nav
            style={{
              flex: 1,
              minWidth: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
              gap: '0.35rem',
              boxSizing: 'border-box'
            }}
          >
            {LESSON_TABS.map((tab) => {
              const isActive = activeLessonTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveLessonTab(tab.id);
                    setSelectedNatureObj(null);
                    setSelectedHomeObj(null);
                    setSelectedSchoolObj(null);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.35rem 0.45rem',
                    background: isActive ? '#ffffff' : '#f8fafc',
                    border: `1.5px solid ${isActive ? '#F5A623' : '#cbd5e1'}`,
                    borderRadius: '12px',
                    width: '100%',
                    minHeight: '46px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: isActive ? '0 4px 15px rgba(245, 166, 35, 0.25)' : 'none',
                    textAlign: 'left',
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '6px',
                    background: isActive ? '#F5A623' : '#64748b',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.72rem',
                    fontWeight: 'bold',
                    flexShrink: 0
                  }}>
                    {tab.id}
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    minWidth: 0,
                    flex: 1
                  }}>
                    <span style={{
                      fontSize: '0.74rem',
                      fontWeight: '800',
                      color: '#0f172a',
                      lineHeight: 1.15,
                      whiteSpace: 'normal',
                      width: '100%'
                    }}>
                      {tab.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content Area: Exact 20% Content + 80% Image Split for Nature */}
        <div style={{
          flex: 1,
          width: '100%',
          height: '100%',
          minHeight: 0,
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          overflow: 'hidden',
          position: 'relative'
        }}>
          {activeLessonTab === 1 && (
            <>
              {/* LEFT SIDE: Content panel (exactly 20% width) */}
              <div style={{
                flex: '0 0 20%',
                width: '20%',
                maxWidth: '20%',
                minWidth: '20%',
                height: '100%',
                backgroundColor: '#ffffff',
                borderRight: '1px solid #cbd5e1',
                padding: 'clamp(8px, 1.2vh, 14px) clamp(8px, 0.9vw, 12px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                boxSizing: 'border-box',
                zIndex: 5,
                overflowY: 'auto'
              }}>
                {/* Visual Card matching screenshot layout */}
                <div style={{
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #d1d5db',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 3px 12px rgba(0, 0, 0, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  boxSizing: 'border-box'
                }}>
                  {/* Dark Forest Green Header Banner */}
                  <div style={{
                    backgroundColor: '#1b4332',
                    padding: 'clamp(8px, 1.3vh, 12px) clamp(10px, 1vw, 14px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ fontSize: '1.35rem', lineHeight: 1 }}>🍃</span>
                    <h2 style={{
                      fontFamily: '"Times New Roman", Times, Georgia, serif',
                      fontSize: 'clamp(1.15rem, 1.35vw, 1.45rem)',
                      fontWeight: 700,
                      color: '#ffffff',
                      margin: 0,
                      lineHeight: 1.2,
                      letterSpacing: '0.01em'
                    }}>
                      Explore Nature
                    </h2>
                  </div>

                  {/* Card Content Body */}
                  <div style={{
                    padding: 'clamp(10px, 1.5vh, 14px) clamp(10px, 1vw, 14px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    boxSizing: 'border-box'
                  }}>
                    {/* Instruction */}
                    <p style={{
                      fontFamily: '"Times New Roman", Times, Georgia, serif',
                      fontSize: 'clamp(1rem, 1.1vw, 1.15rem)',
                      color: '#0f172a',
                      lineHeight: 1.45,
                      margin: 0,
                      fontWeight: 600
                    }}>
                      Click the sunflower, leaves, fern, flower, rocks, and shell to explore their mathematical patterns.
                    </p>

                    {/* 6 Clickable Object Rows with Small Thumbnails */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      marginTop: '2px'
                    }}>
                      {NATURE_OBJECTS.map((item) => {
                        const isSelected = selectedNatureObj?.id === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setSelectedNatureObj(isSelected ? null : item)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              width: '100%',
                              padding: 'clamp(6px, 0.8vh, 8px) clamp(8px, 0.8vw, 12px)',
                              backgroundColor: isSelected ? '#ecfdf5' : '#ffffff',
                              border: `1.5px solid ${isSelected ? '#10b981' : '#e2e8f0'}`,
                              borderRadius: '8px',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                              boxSizing: 'border-box',
                              boxShadow: isSelected ? '0 2px 6px rgba(16, 185, 129, 0.2)' : 'none'
                            }}
                            onMouseEnter={(e) => {
                              if (!isSelected) {
                                e.currentTarget.style.borderColor = '#cbd5e1';
                                e.currentTarget.style.backgroundColor = '#f8fafc';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isSelected) {
                                e.currentTarget.style.borderColor = '#e2e8f0';
                                e.currentTarget.style.backgroundColor = '#ffffff';
                              }
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <img
                                src={item.image}
                                alt={item.name}
                                style={{
                                  width: '30px',
                                  height: '30px',
                                  borderRadius: '50%',
                                  objectFit: 'cover',
                                  border: `1.5px solid ${isSelected ? '#10b981' : '#cbd5e1'}`,
                                  flexShrink: 0
                                }}
                              />
                              <span style={{
                                fontFamily: '"Times New Roman", Times, Georgia, serif',
                                fontSize: 'clamp(1rem, 1.1vw, 1.15rem)',
                                fontWeight: isSelected ? 700 : 600,
                                color: isSelected ? '#065f46' : '#1e293b'
                              }}>
                                {item.name}
                              </span>
                            </div>
                            <span style={{
                              fontFamily: '"Times New Roman", Times, Georgia, serif',
                              fontSize: '1.2rem',
                              fontWeight: 700,
                              color: isSelected ? '#10b981' : '#94a3b8'
                            }}>
                              ›
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Selected Pattern Details Display (when an object is clicked) */}
                    {selectedNatureObj && (
                      <div style={{
                        marginTop: '4px',
                        padding: 'clamp(10px, 1.4vh, 14px)',
                        backgroundColor: '#f0fdf4',
                        border: '1.5px solid #86efac',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}>
                        <h4 style={{
                          fontFamily: '"Times New Roman", Times, Georgia, serif',
                          fontSize: 'clamp(1.05rem, 1.2vw, 1.25rem)',
                          fontWeight: 700,
                          color: '#14532d',
                          margin: 0,
                          lineHeight: 1.25
                        }}>
                          {selectedNatureObj.heading}
                        </h4>
                        <p style={{
                          fontFamily: '"Times New Roman", Times, Georgia, serif',
                          fontSize: 'clamp(1rem, 1.1vw, 1.15rem)',
                          color: '#1e293b',
                          lineHeight: 1.5,
                          margin: 0,
                          fontWeight: 500
                        }}>
                          {selectedNatureObj.description}
                        </p>
                        <button
                          type="button"
                          onClick={() => setSelectedNatureObj(null)}
                          style={{
                            marginTop: '2px',
                            padding: '5px 10px',
                            fontSize: '0.95rem',
                            fontFamily: '"Times New Roman", Times, Georgia, serif',
                            fontWeight: 700,
                            color: '#166534',
                            border: '1px solid #166534',
                            borderRadius: '6px',
                            backgroundColor: '#ffffff',
                            cursor: 'pointer',
                            alignSelf: 'flex-start',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#166534';
                            e.currentTarget.style.color = '#ffffff';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#ffffff';
                            e.currentTarget.style.color = '#166534';
                          }}
                        >
                          ← Full Nature Scene
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE: Large Image / Nature Scene Area (exactly 80% width) */}
              <div style={{
                flex: '0 0 80%',
                width: '80%',
                maxWidth: '80%',
                minWidth: '80%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#0f172a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
                margin: 0,
                padding: 0
              }}>
                <img
                  src={selectedNatureObj ? selectedNatureObj.image : nature1}
                  alt={selectedNatureObj ? selectedNatureObj.name : 'Nature Discovery Scene'}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                    userSelect: 'none'
                  }}
                  loading="eager"
                />

                {/* Invisible Clickable Hotspot Areas over the Nature Image (ONLY over actual objects) */}
                {!selectedNatureObj && NATURE_OBJECTS.map((obj) => (
                  <div
                    key={obj.id}
                    title={`Click ${obj.name}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNatureObj(obj);
                    }}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedNatureObj(obj);
                    }}
                    style={{
                      position: 'absolute',
                      left: obj.box.left,
                      top: obj.box.top,
                      width: obj.box.width,
                      height: obj.box.height,
                      cursor: 'pointer',
                      backgroundColor: 'transparent',
                      zIndex: 10,
                      userSelect: 'none',
                      WebkitTapHighlightColor: 'transparent',
                      borderRadius: obj.box.borderRadius || '12px'
                    }}
                  />
                ))}
              </div>
            </>
          )}

          {activeLessonTab === 2 && (
            <>
              {/* LEFT SIDE: Content panel (exactly 20% width) */}
              <div style={{
                flex: '0 0 20%',
                width: '20%',
                maxWidth: '20%',
                minWidth: '20%',
                height: '100%',
                backgroundColor: '#ffffff',
                borderRight: '1px solid #cbd5e1',
                padding: 'clamp(8px, 1.2vh, 14px) clamp(8px, 0.9vw, 12px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                boxSizing: 'border-box',
                zIndex: 5,
                overflowY: 'auto'
              }}>
                {/* Visual Card matching screenshot layout */}
                <div style={{
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #d1d5db',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 3px 12px rgba(0, 0, 0, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  boxSizing: 'border-box'
                }}>
                  {/* Dark Forest Green Header Banner */}
                  <div style={{
                    backgroundColor: '#1b4332',
                    padding: 'clamp(8px, 1.3vh, 12px) clamp(10px, 1vw, 14px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ fontSize: '1.35rem', lineHeight: 1 }}>🏠</span>
                    <h2 style={{
                      fontFamily: '"Times New Roman", Times, Georgia, serif',
                      fontSize: 'clamp(1.15rem, 1.35vw, 1.45rem)',
                      fontWeight: 700,
                      color: '#ffffff',
                      margin: 0,
                      lineHeight: 1.2,
                      letterSpacing: '0.01em'
                    }}>
                      Explore Home
                    </h2>
                  </div>

                  {/* Card Content Body */}
                  <div style={{
                    padding: 'clamp(10px, 1.5vh, 14px) clamp(10px, 1vw, 14px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    boxSizing: 'border-box'
                  }}>
                    {/* Instruction */}
                    <p style={{
                      fontFamily: '"Times New Roman", Times, Georgia, serif',
                      fontSize: 'clamp(1rem, 1.1vw, 1.15rem)',
                      color: '#0f172a',
                      lineHeight: 1.45,
                      margin: 0,
                      fontWeight: 600
                    }}>
                      Click the stairs, book, window, clock, and tiles to explore their mathematical patterns.
                    </p>

                    {/* 5 Clickable Object Rows with Small Thumbnails */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      marginTop: '2px'
                    }}>
                      {HOME_OBJECTS.map((item) => {
                        const isSelected = selectedHomeObj?.id === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setSelectedHomeObj(isSelected ? null : item)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              width: '100%',
                              padding: 'clamp(6px, 0.8vh, 8px) clamp(8px, 0.8vw, 12px)',
                              backgroundColor: isSelected ? '#ecfdf5' : '#ffffff',
                              border: `1.5px solid ${isSelected ? '#10b981' : '#e2e8f0'}`,
                              borderRadius: '8px',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                              boxSizing: 'border-box',
                              boxShadow: isSelected ? '0 2px 6px rgba(16, 185, 129, 0.2)' : 'none'
                            }}
                            onMouseEnter={(e) => {
                              if (!isSelected) {
                                e.currentTarget.style.borderColor = '#cbd5e1';
                                e.currentTarget.style.backgroundColor = '#f8fafc';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isSelected) {
                                e.currentTarget.style.borderColor = '#e2e8f0';
                                e.currentTarget.style.backgroundColor = '#ffffff';
                              }
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <img
                                src={item.image}
                                alt={item.name}
                                style={{
                                  width: '30px',
                                  height: '30px',
                                  borderRadius: '50%',
                                  objectFit: 'cover',
                                  border: `1.5px solid ${isSelected ? '#10b981' : '#cbd5e1'}`,
                                  flexShrink: 0
                                }}
                              />
                              <span style={{
                                fontFamily: '"Times New Roman", Times, Georgia, serif',
                                fontSize: 'clamp(1rem, 1.1vw, 1.15rem)',
                                fontWeight: isSelected ? 700 : 600,
                                color: isSelected ? '#065f46' : '#1e293b'
                              }}>
                                {item.name}
                              </span>
                            </div>
                            <span style={{
                              fontFamily: '"Times New Roman", Times, Georgia, serif',
                              fontSize: '1.2rem',
                              fontWeight: 700,
                              color: isSelected ? '#10b981' : '#94a3b8'
                            }}>
                              ›
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Selected Pattern Details Display (when an object is clicked) */}
                    {selectedHomeObj && (
                      <div style={{
                        marginTop: '4px',
                        padding: 'clamp(10px, 1.4vh, 14px)',
                        backgroundColor: '#f0fdf4',
                        border: '1.5px solid #86efac',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}>
                        <h4 style={{
                          fontFamily: '"Times New Roman", Times, Georgia, serif',
                          fontSize: 'clamp(1.05rem, 1.2vw, 1.25rem)',
                          fontWeight: 700,
                          color: '#14532d',
                          margin: 0,
                          lineHeight: 1.25
                        }}>
                          {selectedHomeObj.heading}
                        </h4>
                        <p style={{
                          fontFamily: '"Times New Roman", Times, Georgia, serif',
                          fontSize: 'clamp(1rem, 1.1vw, 1.15rem)',
                          color: '#1e293b',
                          lineHeight: 1.5,
                          margin: 0,
                          fontWeight: 500
                        }}>
                          {selectedHomeObj.description}
                        </p>
                        <button
                          type="button"
                          onClick={() => setSelectedHomeObj(null)}
                          style={{
                            marginTop: '2px',
                            padding: '5px 10px',
                            fontSize: '0.95rem',
                            fontFamily: '"Times New Roman", Times, Georgia, serif',
                            fontWeight: 700,
                            color: '#166534',
                            border: '1px solid #166534',
                            borderRadius: '6px',
                            backgroundColor: '#ffffff',
                            cursor: 'pointer',
                            alignSelf: 'flex-start',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#166534';
                            e.currentTarget.style.color = '#ffffff';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#ffffff';
                            e.currentTarget.style.color = '#166534';
                          }}
                        >
                          ← Full Home Scene
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE: Large Image / Home Scene Area (exactly 80% width) */}
              <div style={{
                flex: '0 0 80%',
                width: '80%',
                maxWidth: '80%',
                minWidth: '80%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#0f172a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
                margin: 0,
                padding: 0
              }}>
                <img
                  src={selectedHomeObj ? selectedHomeObj.image : homeEnvironment}
                  alt={selectedHomeObj ? selectedHomeObj.name : 'Home Discovery Scene'}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                    userSelect: 'none'
                  }}
                  loading="eager"
                />

                {/* Invisible Clickable Hotspot Areas over the Home Image (ONLY over actual objects) */}
                {!selectedHomeObj && HOME_OBJECTS.map((obj) => (
                  <div
                    key={obj.id}
                    title={`Click ${obj.name}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedHomeObj(obj);
                    }}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedHomeObj(obj);
                    }}
                    style={{
                      position: 'absolute',
                      left: obj.box.left,
                      top: obj.box.top,
                      width: obj.box.width,
                      height: obj.box.height,
                      cursor: 'pointer',
                      backgroundColor: 'transparent',
                      zIndex: 10,
                      userSelect: 'none',
                      WebkitTapHighlightColor: 'transparent',
                      borderRadius: obj.box.borderRadius || '12px'
                    }}
                  />
                ))}
              </div>
            </>
          )}

          {activeLessonTab === 3 && (
            <>
              {/* LEFT SIDE: Content panel (exactly 20% width) */}
              <div style={{
                flex: '0 0 20%',
                width: '20%',
                maxWidth: '20%',
                minWidth: '20%',
                height: '100%',
                backgroundColor: '#ffffff',
                borderRight: '1px solid #cbd5e1',
                padding: 'clamp(8px, 1.2vh, 14px) clamp(8px, 0.9vw, 12px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                boxSizing: 'border-box',
                zIndex: 5,
                overflowY: 'auto'
              }}>
                {/* Visual Card matching screenshot layout */}
                <div style={{
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #d1d5db',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 3px 12px rgba(0, 0, 0, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  boxSizing: 'border-box'
                }}>
                  {/* Dark Forest Green Header Banner */}
                  <div style={{
                    backgroundColor: '#1b4332',
                    padding: 'clamp(8px, 1.3vh, 12px) clamp(10px, 1vw, 14px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ fontSize: '1.35rem', lineHeight: 1 }}>🏫</span>
                    <h2 style={{
                      fontFamily: '"Times New Roman", Times, Georgia, serif',
                      fontSize: 'clamp(1.15rem, 1.35vw, 1.45rem)',
                      fontWeight: 700,
                      color: '#ffffff',
                      margin: 0,
                      lineHeight: 1.2,
                      letterSpacing: '0.01em'
                    }}>
                      Explore School
                    </h2>
                  </div>

                  {/* Card Content Body */}
                  <div style={{
                    padding: 'clamp(10px, 1.5vh, 14px) clamp(10px, 1vw, 14px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    boxSizing: 'border-box'
                  }}>
                    {/* Instruction */}
                    <p style={{
                      fontFamily: '"Times New Roman", Times, Georgia, serif',
                      fontSize: 'clamp(1rem, 1.1vw, 1.15rem)',
                      color: '#0f172a',
                      lineHeight: 1.45,
                      margin: 0,
                      fontWeight: 600
                    }}>
                      Click the desk, corridor, board, and sports court to explore their mathematical patterns.
                    </p>

                    {/* 4 Clickable Object Rows with Small Thumbnails */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      marginTop: '2px'
                    }}>
                      {SCHOOL_OBJECTS.map((item) => {
                        const isSelected = selectedSchoolObj?.id === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setSelectedSchoolObj(isSelected ? null : item)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              width: '100%',
                              padding: 'clamp(6px, 0.8vh, 8px) clamp(8px, 0.8vw, 12px)',
                              backgroundColor: isSelected ? '#ecfdf5' : '#ffffff',
                              border: `1.5px solid ${isSelected ? '#10b981' : '#e2e8f0'}`,
                              borderRadius: '8px',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                              boxSizing: 'border-box',
                              boxShadow: isSelected ? '0 2px 6px rgba(16, 185, 129, 0.2)' : 'none'
                            }}
                            onMouseEnter={(e) => {
                              if (!isSelected) {
                                e.currentTarget.style.borderColor = '#cbd5e1';
                                e.currentTarget.style.backgroundColor = '#f8fafc';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isSelected) {
                                e.currentTarget.style.borderColor = '#e2e8f0';
                                e.currentTarget.style.backgroundColor = '#ffffff';
                              }
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <img
                                src={item.image}
                                alt={item.name}
                                style={{
                                  width: '30px',
                                  height: '30px',
                                  borderRadius: '50%',
                                  objectFit: 'cover',
                                  border: `1.5px solid ${isSelected ? '#10b981' : '#cbd5e1'}`,
                                  flexShrink: 0
                                }}
                              />
                              <span style={{
                                fontFamily: '"Times New Roman", Times, Georgia, serif',
                                fontSize: 'clamp(1rem, 1.1vw, 1.15rem)',
                                fontWeight: isSelected ? 700 : 600,
                                color: isSelected ? '#065f46' : '#1e293b'
                              }}>
                                {item.name}
                              </span>
                            </div>
                            <span style={{
                              fontFamily: '"Times New Roman", Times, Georgia, serif',
                              fontSize: '1.2rem',
                              fontWeight: 700,
                              color: isSelected ? '#10b981' : '#94a3b8'
                            }}>
                              ›
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Selected Pattern Details Display (when an object is clicked) */}
                    {selectedSchoolObj && (
                      <div style={{
                        marginTop: '4px',
                        padding: 'clamp(10px, 1.4vh, 14px)',
                        backgroundColor: '#f0fdf4',
                        border: '1.5px solid #86efac',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}>
                        <h4 style={{
                          fontFamily: '"Times New Roman", Times, Georgia, serif',
                          fontSize: 'clamp(1.05rem, 1.2vw, 1.25rem)',
                          fontWeight: 700,
                          color: '#14532d',
                          margin: 0,
                          lineHeight: 1.25
                        }}>
                          {selectedSchoolObj.heading}
                        </h4>
                        <p style={{
                          fontFamily: '"Times New Roman", Times, Georgia, serif',
                          fontSize: 'clamp(1rem, 1.1vw, 1.15rem)',
                          color: '#1e293b',
                          lineHeight: 1.5,
                          margin: 0,
                          fontWeight: 500
                        }}>
                          {selectedSchoolObj.description}
                        </p>
                        <button
                          type="button"
                          onClick={() => setSelectedSchoolObj(null)}
                          style={{
                            marginTop: '2px',
                            padding: '5px 10px',
                            fontSize: '0.95rem',
                            fontFamily: '"Times New Roman", Times, Georgia, serif',
                            fontWeight: 700,
                            color: '#166534',
                            border: '1px solid #166534',
                            borderRadius: '6px',
                            backgroundColor: '#ffffff',
                            cursor: 'pointer',
                            alignSelf: 'flex-start',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#166534';
                            e.currentTarget.style.color = '#ffffff';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#ffffff';
                            e.currentTarget.style.color = '#166534';
                          }}
                        >
                          ← Full School Scene
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE: Large Image / School Scene Area (exactly 80% width) */}
              <div style={{
                flex: '0 0 80%',
                width: '80%',
                maxWidth: '80%',
                minWidth: '80%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#0f172a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
                margin: 0,
                padding: 0
              }}>
                <img
                  src={selectedSchoolObj ? selectedSchoolObj.image : schoolEnvironment}
                  alt={selectedSchoolObj ? selectedSchoolObj.name : 'School Discovery Scene'}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                    userSelect: 'none'
                  }}
                  loading="eager"
                />

                {/* Invisible Clickable Hotspot Areas over the School Image (ONLY over actual objects) */}
                {!selectedSchoolObj && SCHOOL_OBJECTS.map((obj) => (
                  <div
                    key={obj.id}
                    title={`Click ${obj.name}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSchoolObj(obj);
                    }}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedSchoolObj(obj);
                    }}
                    style={{
                      position: 'absolute',
                      left: obj.box.left,
                      top: obj.box.top,
                      width: obj.box.width,
                      height: obj.box.height,
                      cursor: 'pointer',
                      backgroundColor: 'transparent',
                      zIndex: 10,
                      userSelect: 'none',
                      WebkitTapHighlightColor: 'transparent',
                      borderRadius: obj.box.borderRadius || '12px'
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  const activeImage = TRAFFIC_SLIDES[currentSlide];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 999999,
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#020617',
    }}>
      {/* ── TOP 90%: FULL-WIDTH COMPLETE ORIGINAL IMAGE (ZERO CROPPING, ZERO DISTORTION) ── */}
      <div style={{
        width: '100%',
        height: '90vh',
        flex: '0 0 90vh',
        margin: 0,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <img
          key={activeImage.id}
          src={activeImage.src}
          alt={activeImage.alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
            margin: 0,
            padding: 0,
            userSelect: 'none',
          }}
          loading="eager"
        />

        {activeImage.id === 8 && (
          <button
            type="button"
            onClick={() => setCurrentSlide(TRAFFIC_SLIDES.length)}
            style={{
              position: 'absolute',
              bottom: '24px',
              right: '28px',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 22px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: '#ffffff',
              fontSize: '0.95rem',
              fontWeight: '800',
              fontFamily: '"Space Grotesk", sans-serif',
              border: '1.5px solid rgba(254, 243, 199, 0.4)',
              borderRadius: '12px',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(217, 119, 6, 0.45), 0 2px 6px rgba(0,0,0,0.3)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(217, 119, 6, 0.6), 0 4px 10px rgba(0,0,0,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(217, 119, 6, 0.45), 0 2px 6px rgba(0,0,0,0.3)';
            }}
          >
            <span>Next →</span>
          </button>
        )}
      </div>

      {/* ── BOTTOM 10%: COMPACT CLEAN NARRATION TEXT AREA (TIMES NEW ROMAN) ── */}
      <div style={{
        width: '100%',
        height: '10vh',
        flex: '0 0 10vh',
        backgroundColor: '#0b0f19',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6px 24px',
        boxSizing: 'border-box',
        userSelect: 'none',
      }}>
        <p style={{
          fontFamily: '"Times New Roman", Times, Georgia, serif',
          fontSize: 'clamp(1.05rem, 1.55vw, 1.4rem)',
          lineHeight: 1.3,
          color: '#f8fafc',
          margin: 0,
          textAlign: 'center',
          maxWidth: '1200px',
        }}>
          {words.map((word, idx) => {
            const isCurrent = currentWordIndex === idx;
            return (
              <span
                key={idx}
                style={{
                  display: 'inline',
                  color: isCurrent ? '#fbbf24' : '#f8fafc',
                  fontWeight: isCurrent ? 700 : 400,
                  textDecoration: isCurrent ? 'underline' : 'none',
                  textUnderlineOffset: '5px',
                  textDecorationColor: '#f59e0b',
                  backgroundColor: isCurrent ? 'rgba(245, 158, 11, 0.16)' : 'transparent',
                  padding: '1px 3px',
                  borderRadius: '3px',
                  transition: 'color 0.1s ease, background-color 0.1s ease',
                }}
              >
                {word}{' '}
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
}

export default function InteractiveModal({
  node,
  onClose,
  onCompleteNode
}) {
  if (node.id === '1.1') {
    return (
      <ErrorBoundary>
        <Suspense fallback={null}>
          <FullscreenExplore1_1 onClose={onClose} />
        </Suspense>
      </ErrorBoundary>
    );
  }

  return null;
}

