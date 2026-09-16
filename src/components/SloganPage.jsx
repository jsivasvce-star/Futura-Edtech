import React from "react";
import { ArrowLeft, ArrowRight, BookOpen, Sparkles, Volume2, VolumeX } from "lucide-react";
import { useTheme } from "../ThemeContext";
import { speakNaturalIndianMale, stopNarration } from "../services/elevenLabsService";

export default function SloganPage({
  chapterNum,
  title,
  sloganImg,
  sloganExplanation,
  onBack,
  onEnterLab,
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [currentSlide, setCurrentSlide] = React.useState(1);
  const [isPlayingAudio, setIsPlayingAudio] = React.useState(false);
  const [isPlayingSlide2Audio, setIsPlayingSlide2Audio] = React.useState(false);
  const audioRef = React.useRef(null);
  const slide2AudioRef = React.useRef(null);

  React.useEffect(() => {
    // Ensure any overlapping floating controls from App (e.g. zIndex 999999) are hidden while Slogan is active
    if (chapterNum === 2) {
      const els = document.querySelectorAll('div[style*="999999"], div[style*="z-index: 999999"], div[style*="zIndex: 999999"]');
      els.forEach(el => { el.style.setProperty('display', 'none', 'important'); });
      return () => {
        els.forEach(el => { el.style.removeProperty('display'); });
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
        if (slide2AudioRef.current) {
          slide2AudioRef.current.pause();
          slide2AudioRef.current = null;
        }
      };
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (slide2AudioRef.current) {
        slide2AudioRef.current.pause();
        slide2AudioRef.current = null;
      }
    };
  }, [chapterNum]);

  const toggleSloganAudio = () => {
    if (isPlayingAudio) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      stopNarration();
      setIsPlayingAudio(false);
    } else {
      if (slide2AudioRef.current) {
        slide2AudioRef.current.pause();
        setIsPlayingSlide2Audio(false);
      }
      stopNarration();
      if (!audioRef.current) {
        audioRef.current = new Audio('/activities/ch2_slogan_voice.mp3');
        audioRef.current.onended = () => setIsPlayingAudio(false);
        audioRef.current.onerror = () => {
          speakNaturalIndianMale({
            text: "Chhāyām-anyasya kurvanti tishthanti svayam-ātape. Phalāny-api parārthāya vrikshāh satpurushā iva. Trees stand in the Sun and give shade to others. Their fruits are also for others. Likewise, good people bear all hardships and bring welfare to others. They give to others whatever they have earned.",
            onEnd: () => setIsPlayingAudio(false),
            onError: () => setIsPlayingAudio(false)
          });
          setIsPlayingAudio(true);
        };
      }
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true);
      }).catch(() => {
        speakNaturalIndianMale({
          text: "Chhāyām-anyasya kurvanti tishthanti svayam-ātape. Phalāny-api parārthāya vrikshāh satpurushā iva. Trees stand in the Sun and give shade to others. Their fruits are also for others. Likewise, good people bear all hardships and bring welfare to others. They give to others whatever they have earned.",
          onEnd: () => setIsPlayingAudio(false),
          onError: () => setIsPlayingAudio(false)
        });
        setIsPlayingAudio(true);
      });
    }
  };

  const toggleSlide2Audio = () => {
    if (isPlayingSlide2Audio) {
      if (slide2AudioRef.current) {
        slide2AudioRef.current.pause();
        slide2AudioRef.current.currentTime = 0;
      }
      stopNarration();
      setIsPlayingSlide2Audio(false);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlayingAudio(false);
      }
      stopNarration();
      if (!slide2AudioRef.current) {
        slide2AudioRef.current = new Audio('/activities/ch2_why_study_voice.mp3');
        slide2AudioRef.current.onended = () => setIsPlayingSlide2Audio(false);
        slide2AudioRef.current.onerror = () => {
          speakNaturalIndianMale({
            text: "Why Study Diversity in the Living World? Exploring nature teaches us that all living beings, from the tiniest seed to the tallest banyan tree, are connected in a vibrant ecosystem. Let us begin our learning journey!",
            onEnd: () => setIsPlayingSlide2Audio(false),
            onError: () => setIsPlayingSlide2Audio(false)
          });
          setIsPlayingSlide2Audio(true);
        };
      }
      slide2AudioRef.current.currentTime = 0;
      slide2AudioRef.current.play().then(() => {
        setIsPlayingSlide2Audio(true);
      }).catch(() => {
        speakNaturalIndianMale({
          text: "Why Study Diversity in the Living World? Exploring nature teaches us that all living beings, from the tiniest seed to the tallest banyan tree, are connected in a vibrant ecosystem. Let us begin our learning journey!",
          onEnd: () => setIsPlayingSlide2Audio(false),
          onError: () => setIsPlayingSlide2Audio(false)
        });
        setIsPlayingSlide2Audio(true);
      });
    }
  };

  // Generate stable random bubbles across the width of the page
  const bubbles = React.useMemo(() => {
    return Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 8 + 4, // 4px to 12px
      delay: Math.random() * 5,
      duration: Math.random() * 6 + 5,
    }));
  }, []);

  return (
    <div style={{
      position: "absolute",
      inset: 0,
      overflow: "hidden",
      color: "#1e293b",
      background: "#e9e4d8",
      fontFamily: "Space Grotesk, system-ui, sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <style>{`
        /* Erupting bubbles styling from cover page */
        .bubble-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
          overflow: hidden;
        }
        .bubble-bg span {
          position: absolute;
          bottom: -20px;
          border-radius: 50%;
          background: rgba(47, 107, 61, 0.18); /* matching green theme */
          animation: bubbleRise linear infinite;
        }
        @keyframes bubbleRise {
          0% { transform: translateY(0) scale(0.8); opacity: 0; }
          15% { opacity: 0.6; }
          85% { opacity: 0.6; }
          100% { transform: translateY(-105vh) scale(1.3); opacity: 0; }
        }

        /* Full-screen layout */
        .frame {
          width: 100%;
          height: 100%;
          background: #fff;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          z-index: 10;
          position: relative;
        }

        /* Scrollable layout columns for full height */
        .left {
          background: #f4ecdf;
          padding: clamp(75px, 8vw, 95px) clamp(20px, 2.5vw, 36px) clamp(24px, 3vw, 40px) clamp(20px, 2.5vw, 36px);
          overflow-y: auto;
          height: 100%;
          box-sizing: border-box;
          position: relative;
        }
        .right {
          background: #ffffff;
          padding: clamp(75px, 8vw, 95px) clamp(20px, 2.5vw, 36px) clamp(24px, 3vw, 40px) clamp(20px, 2.5vw, 36px);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          height: 100%;
          box-sizing: border-box;
          position: relative;
        }

        /* Slim green scrollbars */
        .left::-webkit-scrollbar, .right::-webkit-scrollbar {
          width: 6px;
        }
        .left::-webkit-scrollbar-track, .right::-webkit-scrollbar-track {
          background: transparent;
        }
        .left::-webkit-scrollbar-thumb, .right::-webkit-scrollbar-thumb {
          background: rgba(47, 107, 61, 0.25);
          border-radius: 99px;
        }
        .left::-webkit-scrollbar-thumb:hover, .right::-webkit-scrollbar-thumb:hover {
          background: rgba(47, 107, 61, 0.45);
        }

        /* Cascade Sequential Pop Up animations (one-by-one) */
        .animate-pop {
          opacity: 0;
          transform: translateY(16px) scale(0.97);
          animation: popInOneByOne 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        @keyframes popInOneByOne {
          0% { opacity: 0; transform: translateY(16px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        .eyebrow {
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #047857;
          margin-bottom: 10px;
        }
        .eyebrow span.chap {
          color: #064e3b;
          background: #dcfce7;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 800;
        }
        
        h1.title {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: clamp(30px, 3.8vw, 44px);
          color: #064e3b;
          margin: 0 0 26px 0;
          line-height: 1.15;
          font-weight: bold;
        }

        .hero {
          position: relative;
          height: clamp(180px, 24vh, 320px);
          border-radius: 18px;
          overflow: hidden;
          margin-bottom: 26px;
          background: linear-gradient(160deg, #2f6b3d 0%, #1e4a28 55%, #14331b 100%);
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
        }
        .hero img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        .badge {
          position: absolute;
          top: 18px;
          right: 18px;
          background: #dcfce7;
          border: 1.5px solid #86efac;
          color: #064e3b;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.8px;
          padding: 8px 14px;
          border-radius: 20px;
        }
        .caption {
          position: absolute;
          bottom: 14px;
          left: 18px;
          color: #f4ecdf;
          font-size: 13px;
          opacity: 0.9;
        }

        .quote-card {
          background: #ffffff;
          border-radius: 18px;
          box-shadow: 0 8px 22px rgba(0,0,0,0.08);
          padding: clamp(24px, 3vw, 36px) clamp(24px, 3vw, 40px);
          position: relative;
        }
        .quote-mark {
          font-size: 46px;
          color: #2f6b3d;
          line-height: 0.5;
          margin-bottom: 10px;
          font-family: Georgia, serif;
        }
        .sanskrit {
          font-size: clamp(16px, 1.3vw, 19px);
          color: #064e3b;
          font-weight: 600;
          line-height: 1.7;
          margin-bottom: 6px;
        }
        .source-top {
          text-align: right;
          color: #7a7364;
          font-size: 13px;
          margin-bottom: 16px;
        }
        .translation {
          font-family: Georgia, serif;
          font-style: italic;
          color: #33322e;
          font-size: clamp(16px, 1.8vw, 22px);
          font-weight: 700;
          line-height: 1.65;
        }
        .source-bottom {
          text-align: right;
          color: #33322e;
          font-style: italic;
          fontSize: 15px;
          margin-top: 14px;
        }

        .right h2.section {
          font-family: Georgia, serif;
          font-size: clamp(26px, 2.8vw, 36px);
          color: #064e3b;
          margin: 0 0 24px 0;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: bold;
        }
        
        .highlight {
          background: #f0fdf4;
          border-left: 5px solid #10b981;
          border-radius: 14px;
          padding: clamp(24px, 2.8vw, 34px) clamp(28px, 3.2vw, 40px);
          margin-bottom: 36px;
          text-align: left;
        }
        .highlight h3 {
          font-family: Georgia, serif;
          color: #064e3b;
          font-size: clamp(20px, 2.2vw, 26px);
          margin: 0 0 12px 0;
          font-weight: bold;
        }
        .highlight p {
          color: #3a3a34;
          font-size: clamp(16px, 1.4vw, 18.5px);
          line-height: 1.8;
          margin: 0;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(20px, 2.4vw, 30px);
          width: 100%;
        }
        .card {
          background: #fff;
          border: 1px solid #ece7db;
          border-radius: 16px;
          padding: clamp(20px, 2.2vw, 26px) clamp(22px, 2.4vw, 30px);
          box-shadow: 0 4px 14px rgba(0,0,0,0.04);
          text-align: left;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        }
        .card .label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.8px;
          color: #059669;
          margin-bottom: 6px;
        }
        .card h4 {
          font-family: Georgia, serif;
          font-size: clamp(18px, 1.9vw, 22px);
          color: #064e3b;
          margin: 0 0 8px 0;
          font-weight: bold;
        }
        .card p {
          font-size: clamp(14px, 1.2vw, 16px);
          color: #5a584f;
          line-height: 1.6;
          margin: 0;
        }

        .back-cover-btn {
          position: absolute;
          top: clamp(14px, 2.5vw, 36px);
          left: clamp(14px, 2.5vw, 36px);
          z-index: 30;
          font-size: 13px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #064e3b;
          background: none;
          border: none;
          cursor: pointer;
          font-weight: 700;
        }
        .back-cover-btn:hover {
          color: #047857;
        }

        .enter-lab-cta {
          margin-top: auto;
          align-self: flex-start;
          font-weight: 700;
          border: none;
          cursor: pointer;
          background: #10b981;
          color: #06180f;
          padding: 14px 36px;
          border-radius: 10px;
          font-size: 16px;
          box-shadow: 0 10px 25px rgba(16, 185, 129, 0.25);
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .enter-lab-cta:hover {
          background: #34d399;
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(16, 185, 129, 0.4);
        }

        @media (max-width: 980px) {
          .frame {
            grid-template-columns: 1fr;
            overflow-y: auto;
            max-height: 85vh;
          }
          .grid {
            grid-template-columns: 1fr;
          }
          .enter-lab-cta {
            margin-top: 24px;
          }
        }
      `}</style>
      
      {chapterNum === 2 && (
        <style>{`
          #global-theme-music-controls,
          #global-floating-controls,
          button[title*="Nature Sounds"],
          div[style*="z-index: 999999"],
          div[style*="zIndex: 999999"],
          div[style*="999999"] {
            display: none !important;
          }

          /* Viewport Fitting Overrides for Chapter 2 */
          .frame {
            height: 100vh !important;
            overflow: hidden !important;
            max-height: none !important;
          }
          .left {
            overflow: hidden !important;
            padding: clamp(2vh, 4vh, 95px) clamp(20px, 2.5vw, 36px) clamp(2vh, 4vh, 40px) clamp(20px, 2.5vw, 36px) !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
          }
          .right {
            overflow: hidden !important;
            padding: clamp(2vh, 4vh, 95px) clamp(20px, 2.5vw, 36px) clamp(2vh, 4vh, 40px) clamp(20px, 2.5vw, 36px) !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
          }

          /* Remove grey background from CHAPTER */
          .eyebrow span.chap {
            background: transparent !important;
            padding: 0 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
          }

          /* Vertical Spacing Reductions */
          .eyebrow { margin-bottom: clamp(4px, 1vh, 10px) !important; }
          h1.title { margin: 0 0 clamp(8px, 1.5vh, 26px) 0 !important; }
          .hero { 
            flex: 1 !important;
            min-height: 0 !important;
            margin-bottom: clamp(10px, 2vh, 26px) !important; 
          }
          .quote-card { padding: clamp(12px, 2vh, 36px) clamp(24px, 3vw, 40px) !important; }
          .quote-mark { margin-bottom: clamp(2px, 0.5vh, 10px) !important; }
          .sanskrit { margin-bottom: clamp(2px, 0.5vh, 6px) !important; }
          .source-top { margin-bottom: clamp(6px, 1vh, 16px) !important; }
          .source-bottom { margin-top: clamp(6px, 1vh, 14px) !important; }
          
          .right h2.section { margin: 0 0 clamp(10px, 2vh, 24px) 0 !important; }
          .highlight { 
            padding: clamp(12px, 2vh, 34px) clamp(28px, 3.2vw, 40px) !important;
            margin-bottom: clamp(12px, 2vh, 36px) !important;
          }
          .highlight h3 { margin: 0 0 clamp(4px, 1vh, 12px) 0 !important; }
          .grid { gap: clamp(10px, 1.5vh, 30px) !important; margin-bottom: clamp(20px, 3vh, 40px) !important; }
          .card { padding: clamp(10px, 1.5vh, 26px) clamp(22px, 2.4vw, 30px) !important; }
          .card .label { margin-bottom: clamp(2px, 0.5vh, 6px) !important; }
          .card h4 { margin: 0 0 clamp(2px, 0.5vh, 8px) 0 !important; }

          @media (max-width: 980px) {
            .frame {
              grid-template-columns: 1fr 1fr !important;
            }
          }
        `}</style>
      )}

      {/* Bubble background */}
      <div className="bubble-bg">
        {bubbles.map(b => (
          <span key={b.id} style={{
            left: `${b.left}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`
          }} />
        ))}
      </div>

      {chapterNum !== 2 && (
        <button className="back-cover-btn" onClick={onBack}>
          <ArrowLeft size={16} /> Cover Page
        </button>
      )}

      {chapterNum === 2 ? (
        currentSlide === 1 ? (
          /* ==================== CHAPTER 2 - SLIDE 1 OF 2: ANCIENT WISDOM ON NATURE ==================== */
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            minHeight: 0,
            background: 'linear-gradient(160deg, #F4FAF6 0%, #E8F4EC 100%)',
            padding: 'clamp(10px, 1.8vh, 18px) clamp(16px, 3vw, 40px)',
            boxSizing: 'border-box',
            overflow: 'hidden',
            zIndex: 10
          }}>
            {/* Header */}
            <div style={{
              flexShrink: 0,
              marginBottom: 'clamp(3px, 0.6vh, 8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%'
            }}>
              <div>
                <div style={{
                  fontFamily: '"Space Grotesk", system-ui, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(11px, 1.25vh, 13px)',
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: '#10b981',
                  marginBottom: '2px'
                }}>
                  Chapter 2 · Class 6 Science
                </div>
                <h1 style={{
                  fontFamily: 'Georgia, serif',
                  fontWeight: 900,
                  color: '#2f6b3d',
                  fontSize: 'clamp(19px, 2.3vh, 27px)',
                  lineHeight: 1.15,
                  margin: 0,
                  letterSpacing: '-.01em'
                }}>
                  Diversity in the Living World
                </h1>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.pause();
                    setIsPlayingAudio(false);
                  }
                  onEnterLab();
                }}
                style={{
                  fontFamily: '"Space Grotesk", system-ui, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(13px, 1.5vh, 15px)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '9px 24px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
                  transition: 'all 0.2s ease',
                  flexShrink: 0
                }}
              >
                <span>Next: Story Scenes</span>
                <ArrowRight size={16} strokeWidth={2.5} />
              </button>
            </div>

            {/* Main Content: Perfectly Aligned Top-and-Bottom Layout with Wide Justified Slogan */}
            <div style={{
              flex: 1,
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              overflow: 'hidden'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: 'min(900px, 94vw)',
                maxWidth: '900px',
                gap: 'clamp(6px, 1vh, 10px)'
              }}>
                {/* Top: Image Card with Full Image Completely Visible */}
                <div className="animate-pop" style={{
                  width: '100%',
                  height: 'clamp(180px, 34vh, 290px)',
                  margin: 0,
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '2px solid #10b981',
                  background: '#0d2818',
                  boxShadow: '0 8px 24px rgba(16, 185, 129, 0.16)',
                  animationDelay: '0.2s',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {/* Ambient blurred backdrop to seamlessly fill widescreen frame */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'url(/activities/ancient_wisdom_tree.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(16px) brightness(0.65)',
                    transform: 'scale(1.08)',
                    zIndex: 1
                  }} />

                  {/* 100% Completely Visible Nature Image (No cropping of tree canopy or students) */}
                  <img
                    src="/activities/ancient_wisdom_tree.jpg"
                    alt="Ancient wisdom nature illustration"
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      display: 'block',
                      zIndex: 2
                    }}
                  />

                  <div className="badge" style={{
                    position: 'absolute',
                    top: '10px',
                    right: '12px',
                    background: 'rgba(13, 40, 24, 0.92)',
                    backdropFilter: 'blur(8px)',
                    color: '#E8F4EC',
                    fontSize: '12px',
                    fontWeight: 800,
                    letterSpacing: '0.8px',
                    padding: '4px 12px',
                    borderRadius: '24px',
                    zIndex: 10,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.25)'
                  }}>
                    ANCIENT WISDOM ON NATURE
                  </div>
                </div>

                {/* Bottom: Heritage Sanskrit & Justified Slogan Quote Card (16px Font Size) */}
                <div className="animate-pop" style={{
                  width: '100%',
                  background: '#ffffff',
                  borderRadius: '16px',
                  border: '2px solid #A7F3D0',
                  boxShadow: '0 6px 20px rgba(16, 185, 129, 0.08)',
                  padding: 'clamp(8px, 1.2vh, 12px) clamp(16px, 2.5vw, 32px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 'clamp(6px, 0.8vh, 8px)',
                  boxSizing: 'border-box',
                  animationDelay: '0.4s',
                  flexShrink: 0
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
                    <div style={{
                      fontFamily: 'Georgia, serif',
                      fontWeight: 800,
                      color: '#0f4024',
                      fontSize: 'clamp(16px, 2.1vh, 19px)',
                      lineHeight: 1.35,
                      margin: 0,
                      textAlign: 'center',
                      letterSpacing: '0.015em'
                    }}>
                      छायामन्यस्य कुर्वन्ति तिष्ठन्ति स्वयमातपे ।<br />
                      फलान्यपि परार्थाय वृक्षाः सत्पुरुषा इव ॥
                    </div>
                    <p style={{
                      fontFamily: 'Georgia, serif',
                      fontStyle: 'italic',
                      fontWeight: 600,
                      color: '#0f172a',
                      fontSize: '16px',
                      lineHeight: 1.5,
                      margin: 0,
                      textAlign: 'center',
                      width: '100%'
                    }}>
                      "Trees stand in the Sun and give shade to others. Their fruits are also for others. Likewise, good people bear all hardships and bring welfare to others. They give to others whatever they have earned."
                    </p>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                    borderTop: '1.5px solid rgba(16, 185, 129, 0.18)',
                    paddingTop: '6px',
                    marginTop: '2px',
                    width: '100%',
                    flexWrap: 'nowrap'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flexShrink: 1, overflow: 'hidden' }}>
                      <span style={{
                        fontFamily: '"Space Grotesk", system-ui, sans-serif',
                        fontWeight: 800,
                        color: '#10b981',
                        fontSize: '14.5px',
                        whiteSpace: 'nowrap'
                      }}>
                        — सुभाषित (Subhashita)
                      </span>
                      <span style={{ color: '#9ca3af', fontSize: '12px' }}>•</span>
                      <span style={{
                        fontFamily: '"Space Grotesk", system-ui, sans-serif',
                        fontWeight: 600,
                        color: '#475569',
                        fontSize: '14px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        Ancient Sanskrit Subhashita (Wise Saying)
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={toggleSloganAudio}
                      style={{
                        flexShrink: 0,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: isPlayingAudio ? '#10b981' : '#E8F4EC',
                        color: isPlayingAudio ? '#ffffff' : '#065f46',
                        border: '1.5px solid #10b981',
                        borderRadius: '999px',
                        padding: '5px 15px',
                        fontSize: '13.5px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(16, 185, 129, 0.15)',
                        transition: 'all 0.2s ease',
                        whiteSpace: 'nowrap'
                      }}
                      title={isPlayingAudio ? "Stop Voiceover" : "Listen to Human Voiceover"}
                    >
                      {isPlayingAudio ? <VolumeX size={15} /> : <Volume2 size={15} />}
                      <span>{isPlayingAudio ? 'Stop Voiceover' : 'Listen Voiceover'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Reduced Compact Footer Navigation — Fixed properly without overlap */}
            <div style={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              paddingTop: 'clamp(4px, 0.6vh, 8px)',
              marginTop: 'clamp(4px, 0.6vh, 8px)',
              borderTop: '1.5px solid rgba(16, 185, 129, 0.2)'
            }}>
              {/* Slide Indicator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ display: 'inline-flex', gap: '6px', alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={() => setCurrentSlide(1)}
                    style={{
                      width: '20px',
                      height: '6px',
                      padding: 0,
                      borderRadius: '999px',
                      border: 'none',
                      background: '#10b981',
                      cursor: 'pointer'
                    }}
                    title="Slide 1"
                  />
                  <button
                    type="button"
                    onClick={() => setCurrentSlide(2)}
                    style={{
                      width: '6px',
                      height: '6px',
                      padding: 0,
                      borderRadius: '50%',
                      border: 'none',
                      background: '#A7F3D0',
                      cursor: 'pointer'
                    }}
                    title="Slide 2"
                  />
                </span>
                <span style={{
                  fontFamily: '"Space Grotesk", system-ui, sans-serif',
                  fontWeight: 800,
                  color: '#2f6b3d',
                  fontSize: 'clamp(12px, 1.4vh, 13.5px)'
                }}>
                  Slide 1 of 2
                </span>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => {
                    if (audioRef.current) {
                      audioRef.current.pause();
                      setIsPlayingAudio(false);
                    }
                    onBack();
                  }}
                  style={{
                    fontFamily: '"Space Grotesk", system-ui, sans-serif',
                    fontWeight: 700,
                    fontSize: 'clamp(11.5px, 1.35vh, 13.5px)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#E8F4EC',
                    color: '#2f6b3d',
                    border: '1.5px solid #10b981',
                    borderRadius: '999px',
                    padding: '6px 18px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(16,185,129,.10)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <ArrowLeft size={15} strokeWidth={2.5} /> Back to Cover
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (audioRef.current) {
                      audioRef.current.pause();
                      setIsPlayingAudio(false);
                    }
                    onEnterLab();
                  }}
                  style={{
                    fontFamily: '"Space Grotesk", system-ui, sans-serif',
                    fontWeight: 800,
                    fontSize: 'clamp(12px, 1.4vh, 15px)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '999px',
                    padding: '8px 24px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(16,185,129,.30)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>Next: Story Scenes</span>
                  <ArrowRight size={16} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ==================== CHAPTER 2 - SLIDE 2 OF 2: SECTION 1 & CORE TOPICS ==================== */
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            minHeight: 0,
            background: '#ffffff',
            padding: 'clamp(14px, 2vh, 24px) clamp(24px, 3.5vw, 48px)',
            boxSizing: 'border-box',
            overflow: 'hidden',
            zIndex: 10
          }}>
            {/* Header */}
            <div style={{ flexShrink: 0, marginBottom: 'clamp(8px, 1.2vh, 14px)' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: '"Space Grotesk", system-ui, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(13px, 1.6vh, 16px)',
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: '#10b981',
                marginBottom: '4px'
              }}>
                <Sparkles size={18} color="#10b981" /> SECTION 1
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                flexWrap: 'nowrap'
              }}>
                <h2 style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontFamily: 'Georgia, serif',
                  fontWeight: 900,
                  color: '#2f6b3d',
                  fontSize: 'clamp(26px, 3.5vh, 38px)',
                  lineHeight: 1.15,
                  margin: 0,
                  letterSpacing: '-.01em'
                }}>
                  <BookOpen size={32} color="#2f6b3d" strokeWidth={2.2} />
                  Why study this chapter?
                </h2>

                <button
                  type="button"
                  onClick={toggleSlide2Audio}
                  style={{
                    flexShrink: 0,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: isPlayingSlide2Audio ? '#10b981' : '#E8F4EC',
                    color: isPlayingSlide2Audio ? '#ffffff' : '#065f46',
                    border: '1.5px solid #10b981',
                    borderRadius: '999px',
                    padding: '8px 20px',
                    fontSize: 'clamp(12px, 1.4vh, 14px)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(16, 185, 129, 0.15)',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap'
                  }}
                  title={isPlayingSlide2Audio ? "Pause Voiceover" : "Listen to Human Indian Voiceover"}
                >
                  {isPlayingSlide2Audio ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  <span>{isPlayingSlide2Audio ? 'Pause Narration' : 'Listen Voiceover'}</span>
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div style={{
              flex: 1,
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(10px, 1.4vh, 16px)'
            }}>
              {/* Top Highlight Banner: Interconnected Web of Life */}
              <div className="highlight animate-pop" style={{
                background: '#E8F4EC',
                borderLeft: '6px solid #10b981',
                borderRadius: '18px',
                padding: 'clamp(12px, 1.6vh, 20px) clamp(20px, 2.2vw, 32px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                boxShadow: '0 6px 20px rgba(16,185,129,.08)',
                animationDelay: '0.2s',
                margin: 0,
                flexShrink: 0
              }}>
                <h3 style={{
                  fontFamily: 'Georgia, serif',
                  fontWeight: 900,
                  color: '#2f6b3d',
                  fontSize: 'clamp(22px, 2.8vh, 30px)',
                  margin: 0,
                  lineHeight: 1.2
                }}>
                  Interconnected Web of Life
                </h3>
                <p style={{
                  fontFamily: '"Space Grotesk", system-ui, sans-serif',
                  fontWeight: 600,
                  color: '#000000',
                  fontSize: 'clamp(15.5px, 2.05vh, 19.5px)',
                  lineHeight: 1.6,
                  margin: 0,
                  textAlign: 'justify',
                  textJustify: 'inter-word',
                  width: '100%'
                }}>
                  {sloganExplanation}
                </p>
              </div>

              {/* Ascending Order 4 Core Topic Cards in a Spacious 2x2 Grid */}
              <div style={{
                flex: 1,
                minHeight: 0,
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
                gap: 'clamp(10px, 1.4vh, 16px)'
              }}>
                {[
                  {
                    label: '01 · BIOMES & HABITATS',
                    title: 'Biomes & Habitats',
                    desc: 'Plants and animals thrive in specific environments, from deserts to grasslands, adapting to survive.',
                    delay: '0.35s'
                  },
                  {
                    label: '02 · ADAPTATION',
                    title: 'Adaptation',
                    desc: 'Discover how organisms develop special features over generations to fit their unique habitats.',
                    delay: '0.45s'
                  },
                  {
                    label: '03 · PLANT & ANIMAL DIVERSITY',
                    title: 'Plant & Animal Diversity',
                    desc: 'Observe the rich diversity of plants and animals around us, examining variations in stems, leaves, roots, and movements.',
                    delay: '0.55s'
                  },
                  {
                    label: '04 · CLASSIFICATION',
                    title: 'Classification',
                    desc: 'Learn how scientists group and organize the vast variety of living creatures based on shared traits.',
                    delay: '0.65s'
                  }
                ].map((card, i) => (
                  <div
                    key={i}
                    className="animate-pop"
                    style={{
                      background: '#ffffff',
                      border: '2px solid #E8F4EC',
                      borderRadius: '18px',
                      padding: 'clamp(12px, 1.6vh, 20px) clamp(18px, 2vw, 28px)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      gap: 'clamp(6px, 1vh, 10px)',
                      boxShadow: '0 6px 18px rgba(16,185,129,.06)',
                      animationDelay: card.delay,
                      minHeight: 0,
                      transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                    }}
                  >
                    <div>
                      <div style={{
                        fontFamily: '"Space Grotesk", system-ui, sans-serif',
                        fontWeight: 800,
                        color: '#10b981',
                        fontSize: 'clamp(12.5px, 1.55vh, 15px)',
                        letterSpacing: '.08em',
                        textTransform: 'uppercase',
                        marginBottom: '4px'
                      }}>
                        {card.label}
                      </div>
                      <div style={{
                        fontFamily: 'Georgia, serif',
                        fontWeight: 900,
                        color: '#2f6b3d',
                        fontSize: 'clamp(20px, 2.6vh, 27px)',
                        marginBottom: '4px',
                        lineHeight: 1.2
                      }}>
                        {card.title}
                      </div>
                    </div>
                    <div style={{
                      fontFamily: '"Space Grotesk", system-ui, sans-serif',
                      fontWeight: 600,
                      color: '#000000',
                      fontSize: 'clamp(15px, 1.95vh, 18.5px)',
                      lineHeight: 1.55,
                      textAlign: 'justify',
                      textJustify: 'inter-word',
                      width: '100%'
                    }}>
                      {card.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Navigation */}
            <div style={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              paddingTop: 'clamp(12px, 1.8vh, 20px)',
              marginTop: 'clamp(12px, 1.8vh, 20px)',
              borderTop: '2px solid #E8F4EC'
            }}>
              {/* Slide Indicator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={() => setCurrentSlide(1)}
                    style={{
                      width: '10px',
                      height: '10px',
                      padding: 0,
                      borderRadius: '50%',
                      border: 'none',
                      background: '#A7F3D0',
                      cursor: 'pointer'
                    }}
                    title="Slide 1"
                  />
                  <button
                    type="button"
                    onClick={() => setCurrentSlide(2)}
                    style={{
                      width: '28px',
                      height: '10px',
                      padding: 0,
                      borderRadius: '999px',
                      border: 'none',
                      background: '#10b981',
                      cursor: 'pointer'
                    }}
                    title="Slide 2"
                  />
                </span>
                <span style={{
                  fontFamily: '"Space Grotesk", system-ui, sans-serif',
                  fontWeight: 800,
                  color: '#2f6b3d',
                  fontSize: 'clamp(14px, 1.8vh, 17px)'
                }}>
                  Slide 2 of 2
                </span>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => {
                    if (slide2AudioRef.current) {
                      slide2AudioRef.current.pause();
                      setIsPlayingSlide2Audio(false);
                    }
                    setCurrentSlide(1);
                  }}
                  style={{
                    fontFamily: '"Space Grotesk", system-ui, sans-serif',
                    fontWeight: 700,
                    fontSize: 'clamp(14px, 1.8vh, 16px)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#E8F4EC',
                    color: '#2f6b3d',
                    border: '1.5px solid #10b981',
                    borderRadius: '999px',
                    padding: '12px 26px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(16,185,129,.12)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <ArrowLeft size={18} strokeWidth={2.5} /> Back
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (slide2AudioRef.current) {
                      slide2AudioRef.current.pause();
                      setIsPlayingSlide2Audio(false);
                    }
                    onEnterLab();
                  }}
                  style={{
                    fontFamily: '"Space Grotesk", system-ui, sans-serif',
                    fontWeight: 800,
                    fontSize: 'clamp(14px, 1.8vh, 16px)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '999px',
                    padding: '12px 30px',
                    cursor: 'pointer',
                    boxShadow: '0 6px 18px rgba(16,185,129,.35)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Next: Story Scenes <ArrowRight size={18} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        )
      ) : (
        /* STANDARD ROUTING FOR OTHER BIOLOGY CHAPTERS */
        <div style={{
          width: "100%",
          maxWidth: "1350px",
          height: "100%",
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          alignItems: "center",
          padding: "2rem clamp(24px, 4vw, 64px)",
          gap: "clamp(24px, 5vw, 80px)",
          zIndex: 5,
          boxSizing: "border-box"
        }}>
          {/* LEFT SHEET: Slogan Mount */}
          <div className="animate-pop" style={{ display: "flex", flexDirection: "column", gap: "1.25rem", width: "100%", animationDelay: "0.2s" }}>
            <div className="quote-card" style={{ background: "#faf8f4", border: "1px solid rgba(0,0,0,0.08)" }}>
              <div className="vintage-tape" />
              <div className="spiral-holes" style={{ display: "none" }}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="spiral-hole" />
                ))}
              </div>

              <div style={{ position: "relative", width: "100%", padding: "0.4rem", background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "4px", boxSizing: "border-box" }}>
                {sloganImg ? (
                  <img
                    src={sloganImg}
                    alt="Chapter Slogan"
                    style={{
                      width: "100%",
                      maxHeight: "380px",
                      objectFit: "contain",
                      borderRadius: "4px"
                    }}
                  />
                ) : (
                  <div style={{
                    width: "100%",
                    height: "260px",
                    background: "linear-gradient(135deg, #065f46 0%, #022c22 100%)",
                    borderRadius: "4px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#a7f3d0",
                    padding: "2rem",
                    textAlign: "center",
                    boxSizing: "border-box"
                  }}>
                    <Sparkles size={48} style={{ marginBottom: "1rem", color: "#34d399" }} />
                    <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: "bold" }}>वृक्षाः सत्पुरुषा इव</h3>
                    <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.85rem", opacity: 0.8 }}>"Trees are like good people, living for others."</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SHEET: Explanation text */}
          <div className="animate-pop" style={{ display: "flex", flexDirection: "column", gap: "1.5rem", width: "100%", animationDelay: "0.7s" }}>
            <div className="quote-card" style={{ background: "#faf8f4", border: "1px solid rgba(0,0,0,0.08)", transform: "rotate(1deg)" }}>
              <div style={{ position: "absolute", top: "0.85rem", right: "1.25rem", fontFamily: "monospace", fontSize: "0.75rem", fontWeight: "bold", color: "#8b5a2b", opacity: 0.8, letterSpacing: "0.08em" }}>[ 📁 FIELD ENTRY #0{chapterNum} ]</div>
              <h4 style={{ fontFamily: "Georgia, serif", fontWeight: "bold", fontSize: "1.6rem", color: "#065f46", borderBottom: "2px solid rgba(6, 95, 70, 0.15)", paddingBottom: "0.5rem", marginBottom: "1.25rem", marginTop: 0 }}>Why study this chapter?</h4>
              <p style={{ fontSize: "1.15rem", lineHeight: "1.85", color: "#1a202c", textAlign: "justify", textJustify: "inter-word", hyphens: "auto", WebkitHyphens: "auto", margin: 0 }}>
                {sloganExplanation}
              </p>
            </div>

            <button className="enter-lab-cta animate-pop" style={{ animationDelay: "1.2s" }} onClick={onEnterLab}>
              Enter Learning Lab <BookOpen size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
