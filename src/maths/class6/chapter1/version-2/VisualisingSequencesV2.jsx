import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import b1 from './image/b1.png';
import b2 from './image/b2.png';
import b3 from './image/b3.png';
import bg from './image/bg.png';
import bg2 from './image/bg2.png';
import bg3 from './image/bg3.png';
import s1 from './image/s1.png';
import s2 from './image/s2.png';
import s3 from './image/s3.png';
import b4 from './image/b4.png';
import s4 from './image/s4.png';
import b5 from './image/b5.png';
import s5 from './image/s5.png';
import b6 from './image/b6.png';
import b7 from './image/b7.png';
import b8 from './image/b8.png';
import b9 from './image/b9.png';
import b10 from './image/b10.png';
import b11 from './image/b11.png';
import s6 from './image/s6.png';
import s7 from './image/s7.png';
import s8 from './image/s8.png';
import s9 from './image/s9.png';
import s10 from './image/s10.png';
import { motion } from 'framer-motion';
import page1Audio from './audio/page1.mp3';
import v1Audio from './audio/v1.mp3';
import v2Audio from './audio/v2.mp3';
import v3Audio from './audio/v3.mp3';
import page3Audio from './audio/page3.mp3';
import page4Audio from './audio/page4.mp3';
import page5Audio from './audio/page5.mp3';
import page6Audio from './audio/page6.mp3';
import page7Audio from './audio/page7.mp3';
import page8Audio from './audio/page8.mp3';
import page9Audio from './audio/page9.mp3';
import page10Audio from './audio/page10.mp3';

export default function VisualisingSequencesV2({ onNext }) {
  const [page, setPage] = useState(1);
  const [page2Step, setPage2Step] = useState(0);
  const [page3Step, setPage3Step] = useState(0);
  const [movedBalls, setMovedBalls] = useState(false);
  const [movedBalls2, setMovedBalls2] = useState(false);
  const [movedBalls3, setMovedBalls3] = useState(false);
  const [movedBalls4, setMovedBalls4] = useState(false);
  const [page11Step, setPage11Step] = useState(0);
  
  const audioRef = useRef(null);
  const v1Ref = useRef(null);
  const v2Ref = useRef(null);
  const v3Ref = useRef(null);
  const page3Ref = useRef(null);
  const page4Ref = useRef(null);
  const page5Ref = useRef(null);
  const page6Ref = useRef(null);
  const page7Ref = useRef(null);
  const page8Ref = useRef(null);
  const page9Ref = useRef(null);
  const page10Ref = useRef(null);

  useEffect(() => {
    if (page === 1) {
      setPage2Step(0);
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.log('Audio autoplay blocked:', e));
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }

    if (page === 2) {
      const t = setTimeout(() => {
        setPage2Step(1);
        if (v1Ref.current) v1Ref.current.play().catch(e => console.log('v1 autoplay blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (v1Ref.current) { v1Ref.current.pause(); v1Ref.current.currentTime = 0; }
      if (v2Ref.current) { v2Ref.current.pause(); v2Ref.current.currentTime = 0; }
      if (v3Ref.current) { v3Ref.current.pause(); v3Ref.current.currentTime = 0; }
    }

    if (page === 3) {
      setPage3Step(0);
      const t = setTimeout(() => {
        if (page3Ref.current) page3Ref.current.play().catch(e => console.log('page3 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page3Ref.current) { page3Ref.current.pause(); page3Ref.current.currentTime = 0; }
    }

    if (page === 4) {
      const t = setTimeout(() => {
        if (page4Ref.current) page4Ref.current.play().catch(e => console.log('page4 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page4Ref.current) { page4Ref.current.pause(); page4Ref.current.currentTime = 0; }
    }

    if (page === 5) {
      const t = setTimeout(() => {
        if (page5Ref.current) page5Ref.current.play().catch(e => console.log('page5 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page5Ref.current) { page5Ref.current.pause(); page5Ref.current.currentTime = 0; }
    }

    if (page === 7) {
      const t = setTimeout(() => {
        if (page6Ref.current) page6Ref.current.play().catch(e => console.log('page6 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page6Ref.current) { page6Ref.current.pause(); page6Ref.current.currentTime = 0; }
    }

    if (page === 9) {
      const t = setTimeout(() => {
        if (page7Ref.current) page7Ref.current.play().catch(e => console.log('page7 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page7Ref.current) { page7Ref.current.pause(); page7Ref.current.currentTime = 0; }
    }

    if (page === 11) {
      setPage11Step(0);
      const t = setTimeout(() => {
        if (page8Ref.current) page8Ref.current.play().catch(e => console.log('page8 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page8Ref.current) { page8Ref.current.pause(); page8Ref.current.currentTime = 0; }
      if (page9Ref.current) { page9Ref.current.pause(); page9Ref.current.currentTime = 0; }
    }

    if (page === 12) {
      const t = setTimeout(() => {
        if (page10Ref.current) page10Ref.current.play().catch(e => console.log('page10 audio blocked:', e));
      }, 500);
      return () => clearTimeout(t);
    } else {
      if (page10Ref.current) { page10Ref.current.pause(); page10Ref.current.currentTime = 0; }
    }
  }, [page]);

  const handleNext = () => {
    if (page === 1) {
      setPage(2);
    } else if (page === 2) {
      setPage(3);
    } else if (page === 3) {
      setPage(4);
    } else if (page === 4) {
      setPage(5);
    } else if (page === 5) {
      setPage(6);
    } else if (page === 6) {
      setPage(7);
    } else if (page === 7) {
      setPage(8);
    } else if (page === 8) {
      setPage(9);
    } else if (page === 9) {
      setPage(10);
    } else if (page === 10) {
      setPage(11);
    } else if (page === 11) {
      setPage(12);
    } else if (page === 12) {
      setPage(13);
    } else {
      if (onNext) onNext();
    }
  };

  const handlePrev = () => {
    if (page === 2) {
      setPage(1);
    } else if (page === 3) {
      setPage(2);
    } else if (page === 4) {
      setPage(3);
    } else if (page === 5) {
      setPage(4);
      setMovedBalls(false);
    } else if (page === 6) {
      setPage(5);
    } else if (page === 7) {
      setPage(6);
      setMovedBalls2(false);
    } else if (page === 8) {
      setPage(7);
    } else if (page === 9) {
      setPage(8);
      setMovedBalls3(false);
    } else if (page === 10) {
      setPage(9);
    } else if (page === 11) {
      setPage(10);
    } else if (page === 12) {
      setPage(11);
      setMovedBalls4(false);
    } else if (page === 13) {
      setPage(12);
    }
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '"Nunito", "Segoe UI", Arial, sans-serif'
    }}>
      <audio ref={audioRef} src={page1Audio} />
      <audio ref={v1Ref} src={v1Audio} onEnded={() => { setPage2Step(2); if (v2Ref.current) v2Ref.current.play().catch(e=>console.log(e)); }} />
      <audio ref={v2Ref} src={v2Audio} onEnded={() => { setPage2Step(3); if (v3Ref.current) v3Ref.current.play().catch(e=>console.log(e)); }} />
      <audio ref={v3Ref} src={v3Audio} />
      <audio ref={page3Ref} src={page3Audio} onEnded={() => setPage3Step(1)} />
      <audio ref={page4Ref} src={page4Audio} />
      <audio ref={page5Ref} src={page5Audio} />
      <audio ref={page6Ref} src={page6Audio} />
      <audio ref={page7Ref} src={page7Audio} />
      <audio ref={page8Ref} src={page8Audio} onEnded={() => {
        setPage11Step(1);
        if (page9Ref.current) page9Ref.current.play().catch(e => console.log('page9 blocked:', e));
      }} />
      <audio ref={page9Ref} src={page9Audio} />
      <audio ref={page10Ref} src={page10Audio} />
      
      {/* Header */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'linear-gradient(90deg, #0e2a70 0%, #0a1f50 100%)',
        padding: '12px 24px',
        color: 'white',
        borderBottom: '3px solid #60a5fa',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '4px 16px',
            borderRadius: '10px',
            fontSize: '1.4rem',
            fontWeight: '900'
          }}>
            1.3
          </div>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: '800',
            color: 'white',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            Visualising Number Sequences <span style={{ color: '#94a3b8', fontWeight: '300' }}>|</span> Series A
          </h1>
        </div>
        <div style={{
          fontSize: '1.1rem',
          fontWeight: '400',
          color: '#e2e8f0'
        }}>
          Let's look at some interesting number sequences...
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{
        flex: 1,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundImage: `url(${page === 1 ? bg : page === 2 ? bg2 : page === 3 ? bg3 : bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        
        {/* Title Badge Top Left */}
        {page < 4 && (
          <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
            <div style={{
              backgroundColor: '#0f172a',
              color: 'white',
              padding: '8px 20px',
              borderRadius: '12px',
              fontSize: '1.4rem',
              fontWeight: '900',
              zIndex: 2,
              boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
            }}>
              {page === 1 ? 'A1' : page === 2 ? 'A2' : 'A3'}
            </div>
            <div style={{
              backgroundColor: '#fde047',
              color: '#1e3a8a',
              padding: '8px 32px 8px 36px',
              borderRadius: '0 24px 24px 0',
              fontSize: '1.2rem',
              fontWeight: '700',
              marginLeft: '-16px',
              zIndex: 1,
              boxShadow: '2px 2px 8px rgba(0,0,0,0.1)'
            }}>
              {page === 1 ? 'Recall the mysterious names' : page === 2 ? 'Create the question' : 'Open the door to visualisation'}
            </div>
          </div>
        )}

        {page === 4 && (
          <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
            <div style={{
              backgroundColor: '#0f172a',
              color: 'white',
              padding: '8px 20px',
              borderRadius: '12px',
              fontSize: '1.4rem',
              fontWeight: '900',
              zIndex: 2,
              boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
            }}>
              B1
            </div>
            <div style={{
              backgroundColor: '#fef08a',
              color: '#1e3a8a',
              padding: '8px 32px 8px 36px',
              borderRadius: '0 24px 24px 0',
              fontSize: '1.2rem',
              fontWeight: '700',
              marginLeft: '-16px',
              zIndex: 1,
              boxShadow: '2px 2px 8px rgba(0,0,0,0.1)'
            }}>
              Start with 1
            </div>
          </div>
        )}

        {page === 1 && (
          <>
            {/* Page 1 Content */}
            {/* Boy Image (b1.png) - Anchored to bottom left */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '35%', // ~30-35% of the page
              height: '55%', 
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img 
                src={b1} 
                alt="Boy sitting at desk" 
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>

            {/* Right Column: Sequences Table */}
            <div style={{
              position: 'absolute',
              top: '50%',
              right: '40px',
              transform: 'translateY(-50%)',
              width: '60%', // ~65-70% of the page (accounting for right margin)
              maxWidth: '1000px', // Allow it to grow wider
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              zIndex: 10
            }}>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '32px',
                padding: '56px',
                boxShadow: '0 16px 50px rgba(0,0,0,0.15)',
                display: 'flex',
                flexDirection: 'column',
                gap: '48px',
                border: '4px solid #f1f5f9'
              }}>
                
                {/* Row 1: Triangular Numbers */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#fff1f2',
                  borderRadius: '24px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    backgroundColor: '#fce7f3',
                    color: '#831843',
                    padding: '48px 32px',
                    width: '220px',
                    fontWeight: '800',
                    fontSize: '1.6rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    lineHeight: '1.3'
                  }}>
                    Triangular<br/>Numbers
                  </div>
                  <div style={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'space-around',
                    padding: '0 40px',
                    fontSize: '3rem',
                    fontWeight: '800',
                    color: '#1e1b4b'
                  }}>
                    <span>1</span>
                    <span>3</span>
                    <span>6</span>
                    <span>10</span>
                    <span>15</span>
                    <span style={{ color: '#475569' }}>...</span>
                  </div>
                </div>

                {/* Row 2: Square Numbers */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#f0f9ff',
                  borderRadius: '24px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    backgroundColor: '#e0f2fe',
                    color: '#0c4a6e',
                    padding: '48px 32px',
                    width: '220px',
                    fontWeight: '800',
                    fontSize: '1.6rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    lineHeight: '1.3'
                  }}>
                    Square<br/>Numbers
                  </div>
                  <div style={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'space-around',
                    padding: '0 40px',
                    fontSize: '3rem',
                    fontWeight: '800',
                    color: '#1e1b4b'
                  }}>
                    <span>1</span>
                    <span>4</span>
                    <span>9</span>
                    <span>16</span>
                    <span>25</span>
                    <span style={{ color: '#475569' }}>...</span>
                  </div>
                </div>

                {/* Row 3: Cube Numbers */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#f0fdf4',
                  borderRadius: '24px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    backgroundColor: '#dcfce7',
                    color: '#14532d',
                    padding: '48px 32px',
                    width: '220px',
                    fontWeight: '800',
                    fontSize: '1.6rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    lineHeight: '1.3'
                  }}>
                    Cube<br/>Numbers
                  </div>
                  <div style={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'space-around',
                    padding: '0 40px',
                    fontSize: '3rem',
                    fontWeight: '800',
                    color: '#1e1b4b'
                  }}>
                    <span>1</span>
                    <span>8</span>
                    <span>27</span>
                    <span>64</span>
                    <span>125</span>
                    <span style={{ color: '#475569' }}>...</span>
                  </div>
                </div>

              </div>
            </div>
          </>
        )}

        {page === 2 && (
          <>
            {/* Page 2 Content */}
            
            {/* Single Triangular Numbers Row floating at the top */}
            <div style={{
              position: 'absolute',
              top: '18%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80%',
              maxWidth: '1100px',
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '16px',
              boxShadow: '0 0 30px rgba(236, 72, 153, 0.4)', // Pink glowing shadow
              border: '4px solid #fbcfe8', // Pinkish border
              zIndex: 10
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#fff1f2',
                borderRadius: '16px',
                overflow: 'hidden'
              }}>
                <div style={{
                  backgroundColor: '#fce7f3',
                  color: '#831843',
                  padding: '40px 32px',
                  width: '220px',
                  fontWeight: '800',
                  fontSize: '1.6rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  lineHeight: '1.3'
                }}>
                  Triangular<br/>Numbers
                </div>
                <div style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'space-around',
                  padding: '0 40px',
                  fontSize: '3rem',
                  fontWeight: '800',
                  color: '#1e1b4b'
                }}>
                  <span>1</span>
                  <span>3</span>
                  <span>6</span>
                  <span>10</span>
                  <span>15</span>
                  <span style={{ color: '#475569' }}>...</span>
                </div>
              </div>
            </div>

            {/* Conversation bubbles (s1, s2, s3) */}
            <div style={{
              position: 'absolute',
              top: '38%', // Positioned below the row
              left: '55%', // Shifted slightly right to match the red box alignment
              transform: 'translateX(-50%)',
              width: '90%', 
              height: '35%', 
              zIndex: 10,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              gap: '16px' // Gap between the images
            }}>
              <img 
                src={s1} 
                alt="Conversation bubble 1" 
                style={{
                  maxWidth: '30%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  mixBlendMode: 'multiply',
                  opacity: page2Step >= 1 ? 1 : 0,
                  transition: 'opacity 0.4s ease-in-out'
                }}
              />
              <img 
                src={s2} 
                alt="Conversation bubble 2" 
                style={{
                  maxWidth: '30%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  mixBlendMode: 'multiply',
                  opacity: page2Step >= 2 ? 1 : 0,
                  transition: 'opacity 0.4s ease-in-out'
                }}
              />
              <img 
                src={s3} 
                alt="Conversation bubble 3" 
                style={{
                  maxWidth: '30%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  mixBlendMode: 'multiply',
                  opacity: page2Step >= 3 ? 1 : 0,
                  transition: 'opacity 0.4s ease-in-out'
                }}
              />
            </div>

            {/* Boy Image (b2.png) - Anchored to bottom, wider to fit bubbles */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-2%', // Shifted slightly left
              width: '90%', // Very wide to accommodate speech bubbles if they are in the image
              height: '40%', // Decreased size
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img 
                src={b2} 
                alt="Boy asking questions" 
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>
          </>
        )}

        {page === 3 && (
          <>
            {/* Page 3 Content */}

            {/* Central White Box Container */}
            <div style={{
              position: 'absolute',
              top: '35%', // Moved up slightly
              left: '55%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '24px',
              padding: '40px 60px',
              width: '60%',
              minWidth: '700px',
              boxShadow: '0 0 40px rgba(139, 92, 246, 0.25)', // Soft purple glow
              border: '3px solid #ede9fe',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              opacity: page3Step >= 1 ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '32px', width: '100%', justifyContent: 'center' }}>
                <div style={{
                  backgroundColor: '#6366f1',
                  color: 'white',
                  borderRadius: '24px',
                  padding: '16px 32px',
                  fontSize: '3rem',
                  fontWeight: '900',
                  boxShadow: '0 8px 20px rgba(99, 102, 241, 0.3)',
                  border: '6px solid #e0e7ff'
                }}>
                  1.3
                </div>
                <div style={{
                  color: '#1e1b4b',
                  fontSize: '3.5rem',
                  fontWeight: '900',
                  lineHeight: '1.1',
                  textAlign: 'left'
                }}>
                  Visualising<br/>Number Sequences
                </div>
              </div>
              
              <div style={{ width: '80%', height: '2px', backgroundColor: '#e2e8f0', marginBottom: '24px' }}></div>
              
              <div style={{
                color: '#1d4ed8',
                fontSize: '2rem',
                fontWeight: '600'
              }}>
                Let's turn numbers into pictures.
              </div>
            </div>

            {/* Boy Image (b3.png) */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '50%', // Wide enough to fit him and his bubble
              height: '45%', // Reduced height to decrease size
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img 
                src={b3} 
                alt="Boy visualizing numbers" 
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>
          </>
        )}

        {page === 4 && (
          <>
            {/* Pink Sequence Bar */}
            <div style={{
              position: 'absolute',
              top: '110px',
              left: '50px',
              right: '50px',
              backgroundColor: '#fce7f3',
              borderRadius: '24px',
              padding: '16px 80px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '3.5rem',
              fontWeight: '800',
              color: '#1e1b4b',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              zIndex: 10
            }}>
              <span>1</span>
              <span>3</span>
              <span>6</span>
              <span>10</span>
              <span>15</span>
              <span>...</span>
            </div>

            {/* Boy Image (b4.png) */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-2%',
              width: '28%',
              height: '45%', 
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img 
                src={b4} 
                alt="Boy" 
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>
            
            {/* Speech Bubble (s4.png) */}
            <div style={{
              position: 'absolute',
              bottom: '28%',
              left: '18%',
              width: '23%',
              zIndex: 6
            }}>
              <img 
                src={s4} 
                alt="Speech bubble" 
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>

            {/* Frost Glass Box with Red Dot */}
            <div style={{
              position: 'absolute',
              top: '55%',
              right: '20%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              borderRadius: '32px',
              padding: '80px 100px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '2px solid rgba(255,255,255,1)',
              zIndex: 10
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#e11d48',
                borderRadius: '50%',
                boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 2px 2px 10px rgba(225, 29, 72, 0.4)',
                marginBottom: '40px'
              }}></div>
              <div style={{
                backgroundColor: '#fef08a',
                padding: '12px 40px',
                borderRadius: '12px',
                fontSize: '2.2rem',
                fontWeight: '900',
                color: '#1e1b4b'
              }}>
                1
              </div>
            </div>
          </>
        )}

        {page === 5 && (
          <>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px',
                fontSize: '1.4rem',
                fontWeight: '900',
                zIndex: 2,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                B2
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e3a8a',
                padding: '8px 32px 8px 36px',
                borderRadius: '0 24px 24px 0',
                fontSize: '1.2rem',
                fontWeight: '700',
                marginLeft: '-16px',
                zIndex: 1,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.1)'
              }}>
                Add two more to make 3
              </div>
            </div>

            {/* Pink Sequence Bar */}
            <div style={{
              position: 'absolute',
              top: '110px',
              left: '50px',
              right: '50px',
              backgroundColor: '#fce7f3',
              borderRadius: '24px',
              padding: '16px 80px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '3.5rem',
              fontWeight: '800',
              color: '#1e1b4b',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              zIndex: 10
            }}>
              <span>1</span>
              <span style={{ backgroundColor: '#f9a8d4', padding: '0 24px', borderRadius: '16px' }}>3</span>
              <span>6</span>
              <span>10</span>
              <span>15</span>
              <span>...</span>
            </div>

            {/* Boy Image (b5.png) */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-2%',
              width: '28%',
              height: '45%', 
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img 
                src={b5} 
                alt="Boy" 
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>
            
            {/* Speech Bubble (s5.png) */}
            <div style={{
              position: 'absolute',
              bottom: '30%',
              left: '18%',
              width: '24%',
              zIndex: 6
            }}>
              <img 
                src={s5} 
                alt="Speech bubble" 
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>

            {/* Target Left Box */}
            <div style={{
              position: 'absolute',
              top: '55%',
              right: '35%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              borderRadius: '32px',
              padding: '50px 60px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '2px solid rgba(255,255,255,1)',
              zIndex: 10
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#e11d48',
                borderRadius: '50%',
                boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 2px 2px 10px rgba(225, 29, 72, 0.4)',
                marginBottom: '40px'
              }}></div>
              
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ width: '54px', height: '54px', borderRadius: '50%', border: '4px dashed #3b82f6', position: 'relative' }}>
                   {movedBalls && <motion.div layoutId="ball1" style={{ position: 'absolute', top: -4, left: -4, width: '54px', height: '54px', backgroundColor: '#0284c7', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>
                <div style={{ width: '54px', height: '54px', borderRadius: '50%', border: '4px dashed #3b82f6', position: 'relative' }}>
                   {movedBalls && <motion.div layoutId="ball2" style={{ position: 'absolute', top: -4, left: -4, width: '54px', height: '54px', backgroundColor: '#0284c7', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>
              </div>
            </div>

            {/* Dashed Arrow (Visible when not moved) */}
            {!movedBalls && (
              <div style={{
                position: 'absolute',
                top: '60%',
                right: '25%',
                width: '15%',
                height: '60px',
                transform: 'translateY(-50%)',
                zIndex: 5,
                pointerEvents: 'none'
              }}>
                <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <path d="M 90 20 Q 50 10 10 30" fill="transparent" stroke="#1d4ed8" strokeWidth="4" strokeDasharray="8 8" />
                  <polygon points="10,30 25,20 20,38" fill="#1d4ed8" />
                </svg>
              </div>
            )}

            {/* Source Right Box */}
            <div 
              onClick={() => setMovedBalls(true)}
              style={{
                position: 'absolute',
                top: '55%',
                right: '10%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(10px)',
                borderRadius: '32px',
                padding: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                border: '4px solid #4ade80',
                zIndex: 11,
                cursor: 'pointer'
              }}
            >
              <div style={{ position: 'relative', width: '120px', height: '140px' }}>
                {!movedBalls && (
                  <div style={{ position: 'absolute', inset: 0, transform: 'rotate(25deg)' }}>
                    <motion.div layoutId="ball1" style={{ position: 'absolute', top: 10, left: 33, width: '54px', height: '54px', backgroundColor: '#0284c7', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                    <div style={{ position: 'absolute', top: 50, left: 56, width: '8px', height: '40px', backgroundColor: 'white', zIndex: 1 }} />
                    <motion.div layoutId="ball2" style={{ position: 'absolute', bottom: 10, left: 33, width: '54px', height: '54px', backgroundColor: '#0284c7', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {page === 6 && (
          <>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px',
                fontSize: '1.4rem',
                fontWeight: '900',
                zIndex: 2,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                B2 (after placing)
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e3a8a',
                padding: '8px 32px 8px 36px',
                borderRadius: '0 24px 24px 0',
                fontSize: '1.4rem',
                fontWeight: '800',
                marginLeft: '-16px',
                zIndex: 1,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.1)'
              }}>
                1 + 2 = 3
              </div>
            </div>

            {/* Pink Sequence Bar */}
            <div style={{
              position: 'absolute',
              top: '110px',
              left: '50px',
              right: '50px',
              backgroundColor: '#fce7f3',
              borderRadius: '24px',
              padding: '16px 80px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '3.5rem',
              fontWeight: '800',
              color: '#1e1b4b',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              zIndex: 10
            }}>
              <span>1</span>
              <span style={{ backgroundColor: '#f9a8d4', padding: '0 24px', borderRadius: '16px' }}>3</span>
              <span>6</span>
              <span>10</span>
              <span>15</span>
              <span>...</span>
            </div>

            {/* Boy Image (b6.png) */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-2%',
              width: '28%',
              height: '45%', 
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img 
                src={b6} 
                alt="Boy" 
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>
            
            {/* Center Box */}
            <div style={{
              position: 'absolute',
              top: '55%',
              right: '25%', 
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              borderRadius: '32px',
              padding: '60px 80px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '2px solid rgba(255,255,255,1)',
              zIndex: 10
            }}>
              {/* Triangle of dots */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '40px' }}>
                <div style={{
                  width: '54px', height: '54px', backgroundColor: '#e11d48', borderRadius: '50%',
                  boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.2), 2px 2px 10px rgba(225, 29, 72, 0.4)'
                }}></div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{
                    width: '54px', height: '54px', backgroundColor: '#0284c7', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(2, 132, 199, 0.4)'
                  }}></div>
                  <div style={{
                    width: '54px', height: '54px', backgroundColor: '#0284c7', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(2, 132, 199, 0.4)'
                  }}></div>
                </div>
              </div>

              {/* Equation Label */}
              <div style={{
                backgroundColor: '#d9f99d',
                padding: '12px 32px',
                borderRadius: '24px',
                fontSize: '2rem',
                fontWeight: '900',
                color: '#1e1b4b'
              }}>
                1 + 2 = 3
              </div>
            </div>
          </>
        )}

        {page === 7 && (
          <>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px',
                fontSize: '1.4rem',
                fontWeight: '900',
                zIndex: 2,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                B3
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e3a8a',
                padding: '8px 32px 8px 36px',
                borderRadius: '0 24px 24px 0',
                fontSize: '1.2rem',
                fontWeight: '700',
                marginLeft: '-16px',
                zIndex: 1,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.1)'
              }}>
                Add three more to make 6
              </div>
            </div>

            {/* Pink Sequence Bar */}
            <div style={{
              position: 'absolute',
              top: '110px',
              left: '50px',
              right: '50px',
              backgroundColor: '#fce7f3',
              borderRadius: '24px',
              padding: '16px 80px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '3.5rem',
              fontWeight: '800',
              color: '#1e1b4b',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              zIndex: 10
            }}>
              <span>1</span>
              <span>3</span>
              <span style={{ backgroundColor: '#f9a8d4', padding: '0 24px', borderRadius: '16px' }}>6</span>
              <span>10</span>
              <span>15</span>
              <span>...</span>
            </div>

            {/* Boy Image (b7.png) */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-2%',
              width: '28%',
              height: '45%', 
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img 
                src={b7} 
                alt="Boy" 
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>
            
            {/* Speech Bubble (s6.png) */}
            <div style={{
              position: 'absolute',
              bottom: '30%',
              left: '18%',
              width: '24%',
              zIndex: 6
            }}>
              <img 
                src={s6} 
                alt="Speech bubble" 
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>

            {/* Target Left Box */}
            <div style={{
              position: 'absolute',
              top: '55%',
              right: '35%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              borderRadius: '32px',
              padding: '40px 60px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '2px solid rgba(255,255,255,1)',
              zIndex: 10
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <div style={{
                  width: '48px', height: '48px', backgroundColor: '#e11d48', borderRadius: '50%',
                  boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 2px 2px 10px rgba(225, 29, 72, 0.4)'
                }}></div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#0284c7', borderRadius: '50%',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(2, 132, 199, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#0284c7', borderRadius: '50%',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(2, 132, 199, 0.4)'
                  }}></div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px dashed #3b82f6', position: 'relative' }}>
                   {movedBalls2 && <motion.div layoutId="ball3" style={{ position: 'absolute', top: -4, left: -4, width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px dashed #3b82f6', position: 'relative' }}>
                   {movedBalls2 && <motion.div layoutId="ball4" style={{ position: 'absolute', top: -4, left: -4, width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px dashed #3b82f6', position: 'relative' }}>
                   {movedBalls2 && <motion.div layoutId="ball5" style={{ position: 'absolute', top: -4, left: -4, width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>
              </div>
            </div>

            {/* Dashed Arrow (Visible when not moved) */}
            {!movedBalls2 && (
              <div style={{
                position: 'absolute',
                top: '60%',
                right: '25%',
                width: '15%',
                height: '60px',
                transform: 'translateY(-50%)',
                zIndex: 5,
                pointerEvents: 'none'
              }}>
                <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <path d="M 90 20 Q 50 10 10 30" fill="transparent" stroke="#1d4ed8" strokeWidth="4" strokeDasharray="8 8" />
                  <polygon points="10,30 25,20 20,38" fill="#1d4ed8" />
                </svg>
              </div>
            )}

            {/* Source Right Box */}
            <div 
              onClick={() => setMovedBalls2(true)}
              style={{
                position: 'absolute',
                top: '55%',
                right: '10%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(10px)',
                borderRadius: '32px',
                padding: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                border: '4px solid #4ade80',
                zIndex: 11,
                cursor: 'pointer'
              }}
            >
              <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                {!movedBalls2 && (
                  <div style={{ position: 'absolute', inset: 0 }}>
                    {/* Triangle pointing down (2 on top, 1 on bottom) */}
                    <motion.div layoutId="ball3" style={{ position: 'absolute', top: 10, left: 10, width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                    <motion.div layoutId="ball4" style={{ position: 'absolute', top: 10, left: 62, width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                    <motion.div layoutId="ball5" style={{ position: 'absolute', bottom: 10, left: 36, width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {page === 8 && (
          <>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px',
                fontSize: '1.4rem',
                fontWeight: '900',
                zIndex: 2,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                B3 (after placing)
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e3a8a',
                padding: '8px 32px 8px 36px',
                borderRadius: '0 24px 24px 0',
                fontSize: '1.4rem',
                fontWeight: '800',
                marginLeft: '-16px',
                zIndex: 1,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.1)'
              }}>
                3 + 3 = 6
              </div>
            </div>

            {/* Pink Sequence Bar */}
            <div style={{
              position: 'absolute',
              top: '110px',
              left: '50px',
              right: '50px',
              backgroundColor: '#fce7f3',
              borderRadius: '24px',
              padding: '16px 80px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '3.5rem',
              fontWeight: '800',
              color: '#1e1b4b',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              zIndex: 10
            }}>
              <span>1</span>
              <span>3</span>
              <span style={{ backgroundColor: '#f9a8d4', padding: '0 24px', borderRadius: '16px' }}>6</span>
              <span>10</span>
              <span>15</span>
              <span>...</span>
            </div>

            {/* Boy Image (b8.png) */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-2%',
              width: '28%',
              height: '45%', 
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img 
                src={b8} 
                alt="Boy" 
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>
            
            {/* Center Box */}
            <div style={{
              position: 'absolute',
              top: '55%',
              right: '25%', 
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              borderRadius: '32px',
              padding: '50px 80px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '2px solid rgba(255,255,255,1)',
              zIndex: 10
            }}>
              {/* Triangle of dots with background shadow */}
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '40px', padding: '10px 20px' }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.05), rgba(59, 130, 246, 0.3))',
                  zIndex: 0
                }}></div>
                <div style={{
                  width: '54px', height: '54px', backgroundColor: '#e11d48', borderRadius: '50%',
                  boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.2), 2px 2px 10px rgba(225, 29, 72, 0.4)',
                  zIndex: 1
                }}></div>
                <div style={{ display: 'flex', gap: '16px', zIndex: 1 }}>
                  <div style={{
                    width: '54px', height: '54px', backgroundColor: '#0284c7', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(2, 132, 199, 0.4)'
                  }}></div>
                  <div style={{
                    width: '54px', height: '54px', backgroundColor: '#0284c7', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(2, 132, 199, 0.4)'
                  }}></div>
                </div>
                <div style={{ display: 'flex', gap: '16px', zIndex: 1 }}>
                  <div style={{
                    width: '54px', height: '54px', backgroundColor: '#22c55e', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                  }}></div>
                  <div style={{
                    width: '54px', height: '54px', backgroundColor: '#22c55e', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                  }}></div>
                  <div style={{
                    width: '54px', height: '54px', backgroundColor: '#22c55e', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                  }}></div>
                </div>
              </div>

              {/* Equation Label */}
              <div style={{
                backgroundColor: '#d9f99d',
                padding: '12px 32px',
                borderRadius: '24px',
                fontSize: '2rem',
                fontWeight: '900',
                color: '#1e1b4b'
              }}>
                3 + 3 = 6
              </div>
            </div>
          </>
        )}

        {page === 9 && (
          <>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px',
                fontSize: '1.4rem',
                fontWeight: '900',
                zIndex: 2,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                B4
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e3a8a',
                padding: '8px 32px 8px 36px',
                borderRadius: '0 24px 24px 0',
                fontSize: '1.2rem',
                fontWeight: '700',
                marginLeft: '-16px',
                zIndex: 1,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.1)'
              }}>
                Your turn - add four more
              </div>
            </div>

            {/* Pink Sequence Bar */}
            <div style={{
              position: 'absolute',
              top: '110px',
              left: '50px',
              right: '50px',
              backgroundColor: '#fce7f3',
              borderRadius: '24px',
              padding: '16px 80px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '3.5rem',
              fontWeight: '800',
              color: '#1e1b4b',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              zIndex: 10
            }}>
              <span>1</span>
              <span>3</span>
              <span>6</span>
              <span style={{ backgroundColor: '#f9a8d4', padding: '0 24px', borderRadius: '16px' }}>10</span>
              <span>15</span>
              <span>...</span>
            </div>

            {/* Boy Image (b9.png) */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-2%',
              width: '28%',
              height: '45%', 
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img 
                src={b9} 
                alt="Boy" 
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>
            
            {/* Speech Bubble (s7.png) */}
            <div style={{
              position: 'absolute',
              bottom: '30%',
              left: '18%',
              width: '24%',
              zIndex: 6
            }}>
              <img 
                src={s7} 
                alt="Speech bubble" 
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>

            {/* Target Left Box */}
            <div style={{
              position: 'absolute',
              top: '55%',
              right: '35%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              borderRadius: '32px',
              padding: '40px 60px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '2px solid rgba(255,255,255,1)',
              zIndex: 10
            }}>
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '20px', padding: '10px 20px' }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.05), rgba(59, 130, 246, 0.3))',
                  zIndex: 0
                }}></div>
                <div style={{
                  width: '48px', height: '48px', backgroundColor: '#e11d48', borderRadius: '50%',
                  boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 2px 2px 10px rgba(225, 29, 72, 0.4)', zIndex: 1
                }}></div>
                <div style={{ display: 'flex', gap: '12px', zIndex: 1 }}>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#0284c7', borderRadius: '50%',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(2, 132, 199, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#0284c7', borderRadius: '50%',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(2, 132, 199, 0.4)'
                  }}></div>
                </div>
                <div style={{ display: 'flex', gap: '12px', zIndex: 1 }}>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                  }}></div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px dashed #3b82f6', position: 'relative' }}>
                   {movedBalls3 && <motion.div layoutId="ball6" style={{ position: 'absolute', top: -4, left: -4, width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px dashed #3b82f6', position: 'relative' }}>
                   {movedBalls3 && <motion.div layoutId="ball7" style={{ position: 'absolute', top: -4, left: -4, width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px dashed #3b82f6', position: 'relative' }}>
                   {movedBalls3 && <motion.div layoutId="ball8" style={{ position: 'absolute', top: -4, left: -4, width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px dashed #3b82f6', position: 'relative' }}>
                   {movedBalls3 && <motion.div layoutId="ball9" style={{ position: 'absolute', top: -4, left: -4, width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>
              </div>
            </div>

            {/* Dashed Arrow (Visible when not moved) */}
            {!movedBalls3 && (
              <div style={{
                position: 'absolute',
                top: '60%',
                right: '25%',
                width: '15%',
                height: '60px',
                transform: 'translateY(-50%)',
                zIndex: 5,
                pointerEvents: 'none'
              }}>
                <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <path d="M 90 20 Q 50 10 10 30" fill="transparent" stroke="#1d4ed8" strokeWidth="4" strokeDasharray="8 8" />
                  <polygon points="10,30 25,20 20,38" fill="#1d4ed8" />
                </svg>
              </div>
            )}

            {/* Source Right Box */}
            <div 
              onClick={() => setMovedBalls3(true)}
              style={{
                position: 'absolute',
                top: '55%',
                right: '10%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(10px)',
                borderRadius: '32px',
                padding: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                border: '4px solid #4ade80',
                zIndex: 11,
                cursor: 'pointer'
              }}
            >
              <div style={{ position: 'relative', width: '120px', height: '150px' }}>
                {!movedBalls3 && (
                  <div style={{ position: 'absolute', inset: 0 }}>
                    <motion.div layoutId="ball6" style={{ position: 'absolute', top: 10, left: 36, width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 4 }} />
                    <motion.div layoutId="ball7" style={{ position: 'absolute', top: 50, left: 16, width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 3 }} />
                    <motion.div layoutId="ball8" style={{ position: 'absolute', top: 50, left: 56, width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 3 }} />
                    <motion.div layoutId="ball9" style={{ position: 'absolute', top: 90, left: 36, width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {page === 10 && (
          <>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px',
                fontSize: '1.4rem',
                fontWeight: '900',
                zIndex: 2,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                B4 (after placing)
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e3a8a',
                padding: '8px 32px 8px 36px',
                borderRadius: '0 24px 24px 0',
                fontSize: '1.4rem',
                fontWeight: '800',
                marginLeft: '-16px',
                zIndex: 1,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.1)'
              }}>
                6 + 4 = 10
              </div>
            </div>

            {/* Pink Sequence Bar */}
            <div style={{
              position: 'absolute',
              top: '110px',
              left: '50px',
              right: '50px',
              backgroundColor: '#fce7f3',
              borderRadius: '24px',
              padding: '16px 80px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '3.5rem',
              fontWeight: '800',
              color: '#1e1b4b',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              zIndex: 10
            }}>
              <span>1</span>
              <span>3</span>
              <span>6</span>
              <span style={{ backgroundColor: '#f9a8d4', padding: '0 24px', borderRadius: '16px' }}>10</span>
              <span>15</span>
              <span>...</span>
            </div>

            {/* Boy Image (b10.png) */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-2%',
              width: '28%',
              height: '45%', 
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img 
                src={b10} 
                alt="Boy" 
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>
            
            {/* Center Box */}
            <div style={{
              position: 'absolute',
              top: '55%',
              right: '25%', 
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              borderRadius: '32px',
              padding: '40px 80px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '2px solid rgba(255,255,255,1)',
              zIndex: 10
            }}>
              {/* Triangle of dots with background shadow */}
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '30px', padding: '10px 20px' }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.05), rgba(59, 130, 246, 0.3))',
                  zIndex: 0
                }}></div>
                <div style={{
                  width: '48px', height: '48px', backgroundColor: '#e11d48', borderRadius: '50%',
                  boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.2), 2px 2px 10px rgba(225, 29, 72, 0.4)',
                  zIndex: 1
                }}></div>
                <div style={{ display: 'flex', gap: '16px', zIndex: 1 }}>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#0284c7', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(2, 132, 199, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#0284c7', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(2, 132, 199, 0.4)'
                  }}></div>
                </div>
                <div style={{ display: 'flex', gap: '16px', zIndex: 1 }}>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                  }}></div>
                </div>
                <div style={{ display: 'flex', gap: '16px', zIndex: 1 }}>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)'
                  }}></div>
                </div>
              </div>

              {/* Equation Label */}
              <div style={{
                backgroundColor: '#d9f99d',
                padding: '12px 32px',
                borderRadius: '24px',
                fontSize: '2rem',
                fontWeight: '900',
                color: '#1e1b4b'
              }}>
                6 + 4 = 10
              </div>
            </div>
          </>
        )}

        {page === 11 && (
          <>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px',
                fontSize: '1.4rem',
                fontWeight: '900',
                zIndex: 2,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                B5
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e3a8a',
                padding: '8px 32px 8px 36px',
                borderRadius: '0 24px 24px 0',
                fontSize: '1.4rem',
                fontWeight: '800',
                marginLeft: '-16px',
                zIndex: 1,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.1)'
              }}>
                Now do you see it?
              </div>
            </div>

            {/* Sequence Bar - No highlight */}
            <div style={{
              position: 'absolute',
              top: '110px',
              left: '50px',
              right: '50px',
              backgroundColor: '#fce7f3',
              borderRadius: '24px',
              padding: '16px 80px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '3.5rem',
              fontWeight: '800',
              color: '#1e1b4b',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              zIndex: 10
            }}>
              <span>1</span>
              <span>3</span>
              <span>6</span>
              <span>10</span>
              <span>...</span>
            </div>

            {/* Boy Image (b9.png) */}
            {page11Step === 0 && (
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-2%',
              width: '28%',
              height: '45%', 
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img 
                src={b9} 
                alt="Boy" 
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>
            )}
            
            {/* Left Speech Bubble (s8.png) */}
            {page11Step === 0 && (
            <div style={{
              position: 'absolute',
              bottom: '35%',
              left: '10%',
              width: '22%',
              zIndex: 6
            }}>
              <img 
                src={s8} 
                alt="Speech bubble" 
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>
            )}
            
            {/* Right Speech Bubble (s9.png) */}
            {page11Step === 1 && (
            <div style={{
              position: 'absolute',
              top: '32%',
              right: '10%',
              width: '22%',
              zIndex: 6
            }}>
              <img 
                src={s9} 
                alt="Pink Speech bubble" 
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>
            )}

            {/* Center Area */}
            {page11Step === 1 && (
            <div style={{
              position: 'absolute',
              top: '55%',
              right: '30%', 
              transform: 'translateY(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10
            }}>
              {/* Triangle of dots with background shadow and dashed border */}
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '20px', padding: '30px' }}>
                <div style={{
                  position: 'absolute',
                  inset: 20,
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.05), rgba(59, 130, 246, 0.3))',
                  zIndex: 0
                }}></div>
                
                {/* Dashed SVG Triangle */}
                <svg width="100%" height="100%" viewBox="0 0 300 276" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 10 }}>
                   <polygon points="150,10 0,265 300,265" fill="transparent" stroke="#f472b6" strokeWidth="6" strokeDasharray="12 12" strokeLinejoin="round" />
                </svg>

                <div style={{
                  width: '48px', height: '48px', backgroundColor: '#e11d48', borderRadius: '50%',
                  boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.2), 2px 2px 10px rgba(225, 29, 72, 0.4)',
                  zIndex: 1
                }}></div>
                <div style={{ display: 'flex', gap: '16px', zIndex: 1 }}>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#0284c7', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(2, 132, 199, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#0284c7', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(2, 132, 199, 0.4)'
                  }}></div>
                </div>
                <div style={{ display: 'flex', gap: '16px', zIndex: 1 }}>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                  }}></div>
                </div>
                <div style={{ display: 'flex', gap: '16px', zIndex: 1 }}>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%',
                    boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)'
                  }}></div>
                </div>
              </div>

              {/* Triangular Numbers Box */}
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '4px solid #f472b6',
                padding: '16px 40px',
                borderRadius: '32px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                minWidth: '400px'
              }}>
                <div style={{ color: '#be123c', fontSize: '1.8rem', fontWeight: '800' }}>
                  Triangular Numbers
                </div>
                <div style={{ color: '#1e1b4b', fontSize: '2.5rem', fontWeight: '900', display: 'flex', gap: '32px' }}>
                  <span>1</span>
                  <span>3</span>
                  <span>6</span>
                  <span>10</span>
                  <span>...</span>
                </div>
              </div>
            </div>
            )}
          </>
        )}

        {page === 12 && (
          <>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px',
                fontSize: '1.4rem',
                fontWeight: '900',
                zIndex: 2,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                B6
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e3a8a',
                padding: '8px 32px 8px 36px',
                borderRadius: '0 24px 24px 0',
                fontSize: '1.2rem',
                fontWeight: '700',
                marginLeft: '-16px',
                zIndex: 1,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.1)'
              }}>
                One more - add five to make 15
              </div>
            </div>

            {/* Pink Sequence Bar */}
            <div style={{
              position: 'absolute',
              top: '110px',
              left: '50px',
              right: '50px',
              backgroundColor: '#fce7f3',
              borderRadius: '24px',
              padding: '16px 80px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '3.5rem',
              fontWeight: '800',
              color: '#1e1b4b',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              zIndex: 10
            }}>
              <span>1</span>
              <span>3</span>
              <span>6</span>
              <span>10</span>
              <span style={{ backgroundColor: '#f9a8d4', padding: '0 24px', borderRadius: '16px' }}>15</span>
              <span>...</span>
            </div>

            {/* Boy Image (b5.png) */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-2%',
              width: '28%',
              height: '45%', 
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img 
                src={b5} 
                alt="Boy" 
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>
            
            {/* Speech Bubble (s10.png) */}
            <div style={{
              position: 'absolute',
              bottom: '30%',
              left: '18%',
              width: '24%',
              zIndex: 6
            }}>
              <img 
                src={s10} 
                alt="Speech bubble" 
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>

            {/* Target Left Box */}
            <div style={{
              position: 'absolute',
              top: '55%',
              right: '28%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              borderRadius: '32px',
              padding: '40px 60px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '2px solid rgba(255,255,255,1)',
              zIndex: 10
            }}>
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '20px', padding: '10px 20px' }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.05), rgba(59, 130, 246, 0.3))',
                  zIndex: 0
                }}></div>
                <div style={{
                  width: '48px', height: '48px', backgroundColor: '#e11d48', borderRadius: '50%',
                  boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 2px 2px 10px rgba(225, 29, 72, 0.4)', zIndex: 1
                }}></div>
                <div style={{ display: 'flex', gap: '12px', zIndex: 1 }}>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#0284c7', borderRadius: '50%',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(2, 132, 199, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#0284c7', borderRadius: '50%',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(2, 132, 199, 0.4)'
                  }}></div>
                </div>
                <div style={{ display: 'flex', gap: '12px', zIndex: 1 }}>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#22c55e', borderRadius: '50%',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                  }}></div>
                </div>
                <div style={{ display: 'flex', gap: '12px', zIndex: 1 }}>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)'
                  }}></div>
                  <div style={{
                    width: '48px', height: '48px', backgroundColor: '#f59e0b', borderRadius: '50%',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)'
                  }}></div>
                </div>
              </div>
              
              {/* Bottom row: 5 dashed circles */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px dashed #8b5cf6', position: 'relative' }}>
                   {movedBalls4 && <motion.div layoutId="ball10" style={{ position: 'absolute', top: -4, left: -4, width: '48px', height: '48px', backgroundColor: '#8b5cf6', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px dashed #8b5cf6', position: 'relative' }}>
                   {movedBalls4 && <motion.div layoutId="ball11" style={{ position: 'absolute', top: -4, left: -4, width: '48px', height: '48px', backgroundColor: '#8b5cf6', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px dashed #8b5cf6', position: 'relative' }}>
                   {movedBalls4 && <motion.div layoutId="ball12" style={{ position: 'absolute', top: -4, left: -4, width: '48px', height: '48px', backgroundColor: '#8b5cf6', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px dashed #8b5cf6', position: 'relative' }}>
                   {movedBalls4 && <motion.div layoutId="ball13" style={{ position: 'absolute', top: -4, left: -4, width: '48px', height: '48px', backgroundColor: '#8b5cf6', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px dashed #8b5cf6', position: 'relative' }}>
                   {movedBalls4 && <motion.div layoutId="ball14" style={{ position: 'absolute', top: -4, left: -4, width: '48px', height: '48px', backgroundColor: '#8b5cf6', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)' }} />}
                </div>
              </div>
            </div>

            {/* Dashed Arrow (Visible when not moved) */}
            {!movedBalls4 && (
              <div style={{
                position: 'absolute',
                top: '60%',
                right: '25%',
                width: '10%',
                height: '60px',
                transform: 'translateY(-50%)',
                zIndex: 5,
                pointerEvents: 'none'
              }}>
                <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <path d="M 90 20 Q 50 10 10 30" fill="transparent" stroke="#1d4ed8" strokeWidth="4" strokeDasharray="8 8" />
                  <polygon points="10,30 25,20 20,38" fill="#1d4ed8" />
                </svg>
              </div>
            )}

            {/* Source Right Box */}
            <div 
              onClick={() => setMovedBalls4(true)}
              style={{
                position: 'absolute',
                top: '55%',
                right: '10%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(10px)',
                borderRadius: '32px',
                padding: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                border: '4px solid #4ade80',
                zIndex: 11,
                cursor: 'pointer'
              }}
            >
              <div style={{ position: 'relative', width: '120px', height: '190px' }}>
                {!movedBalls4 && (
                  <div style={{ position: 'absolute', inset: 0 }}>
                    <motion.div layoutId="ball10" style={{ position: 'absolute', top: 10, left: 36, width: '48px', height: '48px', backgroundColor: '#8b5cf6', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 5 }} />
                    <motion.div layoutId="ball11" style={{ position: 'absolute', top: 50, left: 16, width: '48px', height: '48px', backgroundColor: '#8b5cf6', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 4 }} />
                    <motion.div layoutId="ball12" style={{ position: 'absolute', top: 50, left: 56, width: '48px', height: '48px', backgroundColor: '#8b5cf6', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 4 }} />
                    <motion.div layoutId="ball13" style={{ position: 'absolute', top: 90, left: 36, width: '48px', height: '48px', backgroundColor: '#8b5cf6', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 3 }} />
                    <motion.div layoutId="ball14" style={{ position: 'absolute', top: 130, left: 16, width: '48px', height: '48px', backgroundColor: '#8b5cf6', borderRadius: '50%', boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)', zIndex: 2 }} />
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {page === 13 && (
          <>
            <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', alignItems: 'center', gap: '0', zIndex: 10 }}>
              <div style={{
                backgroundColor: '#0f172a',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '12px',
                fontSize: '1.4rem',
                fontWeight: '900',
                zIndex: 2,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.2)'
              }}>
                B6 (after placing)
              </div>
              <div style={{
                backgroundColor: '#fef08a',
                color: '#1e3a8a',
                padding: '8px 32px 8px 36px',
                borderRadius: '0 24px 24px 0',
                fontSize: '1.4rem',
                fontWeight: '800',
                marginLeft: '-16px',
                zIndex: 1,
                boxShadow: '2px 2px 8px rgba(0,0,0,0.1)'
              }}>
                10 + 5 = 15
              </div>
            </div>

            {/* Pink Sequence Bar */}
            <div style={{
              position: 'absolute',
              top: '110px',
              left: '50px',
              right: '50px',
              backgroundColor: '#fce7f3',
              borderRadius: '24px',
              padding: '16px 80px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '3.5rem',
              fontWeight: '800',
              color: '#1e1b4b',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              zIndex: 10
            }}>
              <span>1</span>
              <span>3</span>
              <span>6</span>
              <span>10</span>
              <span style={{ backgroundColor: '#f9a8d4', padding: '0 24px', borderRadius: '16px' }}>15</span>
              <span>...</span>
            </div>

            {/* Boy Image (b11.png) */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '-2%',
              width: '28%',
              height: '45%', 
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-start'
            }}>
              <img 
                src={b11} 
                alt="Boy" 
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'left bottom',
                  display: 'block',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>
            
            {/* Center Container for Box and Triangular Numbers Box */}
            <div style={{
              position: 'absolute',
              top: '60%',
              right: '25%', 
              transform: 'translateY(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              zIndex: 10
            }}>
              {/* Frosted Glass Box */}
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(10px)',
                borderRadius: '32px',
                padding: '20px 40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                border: '2px solid rgba(255,255,255,1)',
              }}>
                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', marginBottom: '12px', padding: '10px 16px' }}>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                    background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.05), rgba(59, 130, 246, 0.3))',
                    zIndex: 0
                  }}></div>
                  <div style={{
                    width: '44px', height: '44px', backgroundColor: '#e11d48', borderRadius: '50%',
                    boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.2), 2px 2px 10px rgba(225, 29, 72, 0.4)', zIndex: 1
                  }}></div>
                  <div style={{ display: 'flex', gap: '8px', zIndex: 1 }}>
                    <div style={{
                      width: '44px', height: '44px', backgroundColor: '#0284c7', borderRadius: '50%',
                      boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(2, 132, 199, 0.4)'
                    }}></div>
                    <div style={{
                      width: '44px', height: '44px', backgroundColor: '#0284c7', borderRadius: '50%',
                      boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(2, 132, 199, 0.4)'
                    }}></div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', zIndex: 1 }}>
                    <div style={{
                      width: '44px', height: '44px', backgroundColor: '#22c55e', borderRadius: '50%',
                      boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                    }}></div>
                    <div style={{
                      width: '44px', height: '44px', backgroundColor: '#22c55e', borderRadius: '50%',
                      boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                    }}></div>
                    <div style={{
                      width: '44px', height: '44px', backgroundColor: '#22c55e', borderRadius: '50%',
                      boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(34, 197, 94, 0.4)'
                    }}></div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', zIndex: 1 }}>
                    <div style={{
                      width: '44px', height: '44px', backgroundColor: '#f59e0b', borderRadius: '50%',
                      boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)'
                    }}></div>
                    <div style={{
                      width: '44px', height: '44px', backgroundColor: '#f59e0b', borderRadius: '50%',
                      boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)'
                    }}></div>
                    <div style={{
                      width: '44px', height: '44px', backgroundColor: '#f59e0b', borderRadius: '50%',
                      boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)'
                    }}></div>
                    <div style={{
                      width: '44px', height: '44px', backgroundColor: '#f59e0b', borderRadius: '50%',
                      boxShadow: 'inset -4px -4px 8px rgba(0,0,0,0.25), 2px 2px 10px rgba(245, 158, 11, 0.4)'
                    }}></div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', zIndex: 1 }}>
                    <div style={{
                      width: '44px', height: '44px', backgroundColor: '#8b5cf6', borderRadius: '50%',
                      boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(139, 92, 246, 0.4)'
                    }}></div>
                    <div style={{
                      width: '44px', height: '44px', backgroundColor: '#8b5cf6', borderRadius: '50%',
                      boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(139, 92, 246, 0.4)'
                    }}></div>
                    <div style={{
                      width: '44px', height: '44px', backgroundColor: '#8b5cf6', borderRadius: '50%',
                      boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(139, 92, 246, 0.4)'
                    }}></div>
                    <div style={{
                      width: '44px', height: '44px', backgroundColor: '#8b5cf6', borderRadius: '50%',
                      boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(139, 92, 246, 0.4)'
                    }}></div>
                    <div style={{
                      width: '44px', height: '44px', backgroundColor: '#8b5cf6', borderRadius: '50%',
                      boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25), 2px 2px 10px rgba(139, 92, 246, 0.4)'
                    }}></div>
                  </div>
                </div>

                {/* Equation Label */}
                <div style={{
                  backgroundColor: '#d9f99d',
                  padding: '12px 32px',
                  borderRadius: '24px',
                  fontSize: '2rem',
                  fontWeight: '900',
                  color: '#1e1b4b'
                }}>
                  10 + 5 = 15
                </div>
              </div>

              {/* Triangular Numbers Box */}
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '4px solid #f472b6',
                padding: '12px 32px',
                borderRadius: '24px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                minWidth: '400px'
              }}>
                <div style={{ color: '#be123c', fontSize: '1.4rem', fontWeight: '800' }}>
                  Triangular Numbers
                </div>
                <div style={{ color: '#1e1b4b', fontSize: '2.2rem', fontWeight: '900', display: 'flex', gap: '24px' }}>
                  <span>1</span>
                  <span>3</span>
                  <span>6</span>
                  <span>10</span>
                  <span>15</span>
                  <span>...</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Previous Button (Not on Page 1) */}
        {page > 1 && (
          <button 
            onClick={handlePrev}
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#0a369d',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '3px solid white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              zIndex: 20
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <ChevronLeft size={36} strokeWidth={3} />
          </button>
        )}

        {/* Next Button */}
        <button 
          onClick={handleNext}
          style={{
            position: 'absolute',
            bottom: '24px',
            right: '24px',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#0a369d',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '3px solid white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            zIndex: 20
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <ChevronRight size={36} strokeWidth={3} />
        </button>

      </main>
    </div>
  );
}
