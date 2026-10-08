import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Chapter2CoverV1 from './Chapter2CoverV1';
import Section2_1Point from './sections/Section2_1Point';
import Section2_2LineSegment from './sections/Section2_2LineSegment';
import Section2_3Line from './sections/Section2_3Line';
import SectionQuiz from './sections/SectionQuiz';
import Chapter2InteractiveSection from './sections/Chapter2InteractiveSection';
import './cover.css';

/**
 * EXACT 11 SECTIONS SPECIFIED FOR CHAPTER 2 (LINES AND ANGLES - V1)
 */
export const CHAPTER_2_V1_SECTIONS = [
  {
    id: '2.1',
    number: '2.1',
    title: 'Point',
    fullName: '2.1 — Point',
    iconSvg: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="8" fill="rgba(2, 132, 199, 0.18)" />
        <circle cx="14" cy="14" r="3.5" fill="currentColor" />
      </svg>
    )
  },
  {
    id: '2.2',
    number: '2.2',
    title: 'Line Segment',
    fullName: '2.2 — Line Segment',
    iconSvg: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <line x1="4" y1="14" x2="24" y2="14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="4" cy="14" r="3" fill="currentColor" />
        <circle cx="24" cy="14" r="3" fill="currentColor" />
      </svg>
    )
  },
  {
    id: '2.3',
    number: '2.3',
    title: 'Line',
    fullName: '2.3 — Line',
    iconSvg: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <line x1="5" y1="14" x2="23" y2="14" stroke="currentColor" strokeWidth="2.5" />
        <path d="M 7 10 L 3 14 L 7 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 21 10 L 25 14 L 21 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: '2.4',
    number: '2.4',
    title: 'Ray',
    fullName: '2.4 — Ray',
    iconSvg: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="5" cy="14" r="3" fill="currentColor" />
        <line x1="5" y1="14" x2="23" y2="14" stroke="currentColor" strokeWidth="2.5" />
        <path d="M 20 10 L 25 14 L 20 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: '2.5',
    number: '2.5',
    title: 'Angle',
    fullName: '2.5 — Angle',
    iconSvg: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="5" cy="22" r="3" fill="currentColor" />
        <line x1="5" y1="22" x2="24" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="5" y1="22" x2="20" y2="6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 12 22 A 8 8 0 0 0 10 17" stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  },
  {
    id: '2.6',
    number: '2.6',
    title: 'Comparing Angles',
    fullName: '2.6 — Comparing Angles',
    iconSvg: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <line x1="4" y1="22" x2="16" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="4" y1="22" x2="14" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="15" y1="22" x2="25" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="15" y1="22" x2="23" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: '2.7',
    number: '2.7',
    title: 'Making Rotating Arms',
    fullName: '2.7 — Making Rotating Arms',
    iconSvg: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="3.5" fill="currentColor" />
        <line x1="14" y1="14" x2="25" y2="14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="14" y1="14" x2="14" y2="3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 21 8 A 9 9 0 0 0 14 5" stroke="currentColor" strokeWidth="1.8" strokeDasharray="2,2" />
        <path d="M 22 11 L 24 7 L 19 8" fill="currentColor" />
      </svg>
    )
  },
  {
    id: '2.8',
    number: '2.8',
    title: 'Special Types of Angles',
    fullName: '2.8 — Special Types of Angles',
    iconSvg: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <line x1="6" y1="22" x2="24" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="6" y1="22" x2="6" y2="4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="6" y="14" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    )
  },
  {
    id: '2.9',
    number: '2.9',
    title: 'Measuring Angles',
    fullName: '2.9 — Measuring Angles',
    iconSvg: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M 4 20 A 10 10 0 0 1 24 20 Z" fill="rgba(2, 132, 199, 0.15)" stroke="currentColor" strokeWidth="2" />
        <line x1="14" y1="20" x2="21" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="14" cy="20" r="1.5" fill="currentColor" />
      </svg>
    )
  },
  {
    id: '2.10',
    number: '2.10',
    title: 'Drawing Angles',
    fullName: '2.10 — Drawing Angles',
    iconSvg: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <line x1="5" y1="22" x2="24" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="5" y1="22" x2="19" y2="8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 18 7 L 23 12 L 20 15 L 15 10 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    id: '2.11',
    number: '2.11',
    title: 'Types of Angles and their Measures',
    fullName: '2.11 — Types of Angles and their Measures',
    iconSvg: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M 4 22 L 12 22 L 8 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 14 22 L 24 22 L 24 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
];

export const CHAPTER_2_V1_QUIZ = {
  id: 'quiz',
  number: 'Q',
  title: 'Quiz',
  fullName: 'Chapter 2 — Final Quiz',
  theme: 'quiz',
  glowColor: 'rgba(107, 33, 168, 0.55)',
  image: '/assets/maths/class6/chapter2/card_quiz_hd.png'
};

/**
 * EXACT 12 CHAPTER FLOW CARDS (4-Column × 3-Row Desktop Grid matching reference)
 */
export const CHAPTER_2_FLOW_CARDS = [
  {
    id: '2.1',
    number: '2.1',
    title: 'Point',
    fullName: '2.1 — Point',
    theme: 'point',
    glowColor: 'rgba(29, 78, 216, 0.55)',
    image: '/assets/maths/class6/chapter2/card_2_1_point_hd.png'
  },
  {
    id: '2.2',
    number: '2.2',
    title: 'Line Segment',
    fullName: '2.2 — Line Segment',
    theme: 'linesegment',
    glowColor: 'rgba(5, 150, 105, 0.55)',
    image: '/assets/maths/class6/chapter2/card_2_2_linesegment_hd.png'
  },
  {
    id: '2.3',
    number: '2.3',
    title: 'Line',
    fullName: '2.3 — Line',
    theme: 'line',
    glowColor: 'rgba(79, 70, 229, 0.55)',
    image: '/assets/maths/class6/chapter2/card_2_3_line_hd.png'
  },
  {
    id: '2.4',
    number: '2.4',
    title: 'Ray',
    fullName: '2.4 — Ray',
    theme: 'ray',
    glowColor: 'rgba(217, 119, 6, 0.55)',
    image: '/assets/maths/class6/chapter2/card_2_4_ray_hd.png'
  },
  {
    id: '2.5',
    number: '2.5',
    title: 'Angle',
    fullName: '2.5 — Angle',
    theme: 'angle',
    glowColor: 'rgba(219, 39, 119, 0.55)',
    image: '/assets/maths/class6/chapter2/card_2_5_angle_hd.png'
  },
  {
    id: '2.6',
    number: '2.6',
    title: 'Comparing Angles',
    fullName: '2.6 — Comparing Angles',
    theme: 'comparingangles',
    glowColor: 'rgba(8, 145, 178, 0.55)',
    image: '/assets/maths/class6/chapter2/card_2_6_comparingangles_hd.png'
  },
  {
    id: '2.7',
    number: '2.7',
    title: 'Making Rotating Arms',
    fullName: '2.7 — Making Rotating Arms',
    theme: 'rotatingarms',
    glowColor: 'rgba(29, 78, 216, 0.55)',
    image: '/assets/maths/class6/chapter2/card_2_7_rotatingarms_hd.png'
  },
  {
    id: '2.8',
    number: '2.8',
    title: 'Special Types of Angles',
    fullName: '2.8 — Special Types of Angles',
    theme: 'specialangles',
    glowColor: 'rgba(124, 58, 237, 0.55)',
    image: '/assets/maths/class6/chapter2/card_2_8_specialangles_hd.png'
  },
  {
    id: '2.9',
    number: '2.9',
    title: 'Measuring Angles',
    fullName: '2.9 — Measuring Angles',
    theme: 'measuringangles',
    glowColor: 'rgba(217, 119, 6, 0.55)',
    image: '/assets/maths/class6/chapter2/card_2_9_measuringangles_hd.png'
  },
  {
    id: '2.10',
    number: '2.10',
    title: 'Drawing Angles',
    fullName: '2.10 — Drawing Angles',
    theme: 'drawingangles',
    glowColor: 'rgba(2, 132, 199, 0.55)',
    image: '/assets/maths/class6/chapter2/card_2_10_drawingangles_hd.png'
  },
  {
    id: '2.11',
    number: '2.11',
    title: 'Types of Angles and their Measures',
    fullName: '2.11 — Types of Angles and their Measures',
    theme: 'typesofangles',
    glowColor: 'rgba(13, 148, 136, 0.55)',
    image: '/assets/maths/class6/chapter2/card_2_11_typesofangles_hd.png'
  },
  CHAPTER_2_V1_QUIZ
];

export const CHAPTER_2_V1_ALL_ITEMS = CHAPTER_2_FLOW_CARDS;

/**
 * Class 6 Mathematics · Chapter 2: Lines and Angles (Version 1)
 * Production-Quality Chapter Flow Page matching exact Reference Design
 */
export default function Class6MathsChapter2V1({ onBackToDashboard }) {
  // If explicitly requesting direct flow view via URL hash (#activity=chapter2_v1&flow=true), show flow page;
  // Otherwise default to the interactive Cover Page ('cover')!
  const isDirectFlow = typeof window !== 'undefined' && (
    window.location.hash.includes('flow=true') || 
    window.location.hash.includes('view=flow')
  );
  const [viewState, setViewState] = useState(isDirectFlow ? 'main' : 'cover'); // 'cover' | 'main' | 'section'
  const [activeSection, setActiveSection] = useState(null);

  // Synchronize hash state so browser Back/Forward buttons navigate between Cover and Flow
  useEffect(() => {
    const handleHashOrPopState = () => {
      const hash = window.location.hash || '';
      if (hash.includes('flow=true') || hash.includes('view=flow')) {
        setViewState('main');
      } else if (hash.includes('activity=chapter2_v1')) {
        setViewState('cover');
      }
    };
    window.addEventListener('hashchange', handleHashOrPopState);
    window.addEventListener('popstate', handleHashOrPopState);
    return () => {
      window.removeEventListener('hashchange', handleHashOrPopState);
      window.removeEventListener('popstate', handleHashOrPopState);
    };
  }, []);

  // Keyboard Escape shortcut from Chapter Flow page returns to Cover Page
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && viewState === 'main') {
        if (typeof window !== 'undefined') {
          window.location.hash = '#subject=class6_maths&activity=chapter2_v1';
        }
        setViewState('cover');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewState]);

  const handleSelectSection = (section) => {
    setActiveSection(section);
    setViewState('section');
  };

  // ── 1. COVER PAGE VIEW ──
  if (viewState === 'cover') {
    return (
      <Chapter2CoverV1
        onBackToDashboard={onBackToDashboard}
        onStartExploring={() => {
          if (typeof window !== 'undefined') {
            window.location.hash = '#subject=class6_maths&activity=chapter2_v1&flow=true';
          }
          setViewState('main');
        }}
      />
    );
  }

  // ── 2. INDIVIDUAL SECTION DESTINATION CONTAINER VIEW ──
  if (viewState === 'section' && activeSection) {
    if (activeSection.id === '2.1') {
      return <Section2_1Point onBack={() => setViewState('main')} />;
    }

    if (activeSection.id === '2.2') {
      return (
        <Section2_2LineSegment
          onBackToMap={() => setViewState('main')}
          onBack={() => setViewState('main')}
          onBackTo2_1={() => {
            const sec21 = CHAPTER_2_FLOW_CARDS.find((s) => s.id === '2.1');
            if (sec21) handleSelectSection(sec21);
          }}
          onNextSection={() => {
            const sec23 = CHAPTER_2_FLOW_CARDS.find((s) => s.id === '2.3');
            if (sec23) handleSelectSection(sec23);
          }}
        />
      );
    }

    if (activeSection.id === '2.3') {
      return (
        <Section2_3Line
          onBackToMap={() => setViewState('main')}
          onBack={() => setViewState('main')}
          onBackTo2_2={() => {
            const sec22 = CHAPTER_2_FLOW_CARDS.find((s) => s.id === '2.2');
            if (sec22) handleSelectSection(sec22);
          }}
          onNextSection={() => {
            const sec24 = CHAPTER_2_FLOW_CARDS.find((s) => s.id === '2.4');
            if (sec24) handleSelectSection(sec24);
          }}
        />
      );
    }

    if (activeSection.id === 'quiz') {
      return <SectionQuiz onBack={() => setViewState('main')} />;
    }

    // Sections 2.4 through 2.11: Fully functional interactive laboratory
    return (
      <Chapter2InteractiveSection
        section={activeSection}
        onBack={() => setViewState('main')}
      />
    );
  }

  // ── 3. MAIN CHAPTER FLOW PAGE VIEW (100% Matching Reference Design) ──
  return (
    <div className="ch2-flow-page-root" id="ch2-v1-main-page">
      {/* Highlighted Top-Left Back Button */}
      <button
        onClick={() => {
          if (typeof window !== 'undefined') {
            window.location.hash = '#subject=class6_maths&activity=chapter2_v1';
          }
          setViewState('cover');
        }}
        className="ch2-flow-back-btn-highlighted"
        title="Back to Chapter 2 Cover"
        id="ch2-flow-back-btn"
        aria-label="Back to Chapter 2 Cover"
      >
        <ArrowLeft size={18} strokeWidth={2.6} className="ch2-flow-back-icon" />
        <span>Back</span>
      </button>

      <div className="ch2-flow-stage">
        {/* Single Centered Ivory Plaque with Gold Metallic Border — NO Back Button */}
        <header 
          className="ch2-header-plaque" 
          role="banner"
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.location.hash = '#subject=class6_maths&activity=chapter2_v1';
            }
            setViewState('cover');
          }}
          title="Grade 6 Chapter 2: Lines and Angles (Click to return to Cover)"
          style={{ cursor: 'pointer' }}
        >
          <span className="ch2-plaque-screw screw-left" aria-hidden="true" />
          <div className="ch2-plaque-text-wrap">
            <span className="ch2-plaque-eyebrow">GRADE 6 • MATHEMATICS • CHAPTER 2</span>
            <h1 className="ch2-plaque-title">LINES AND ANGLES</h1>
          </div>
          <span className="ch2-plaque-screw screw-right" aria-hidden="true" />
        </header>

        {/* 12 Heading Cards Container (Strict 4-Column × 3-Row Grid) */}
        <main className="ch2-flow-cards-grid" role="region" aria-label="Chapter 2 Section Cards">
          {CHAPTER_2_FLOW_CARDS.map((card) => (
            <div
              key={card.id}
              className={`ch2-ref-card ch2-theme-${card.theme}`}
              onClick={() => handleSelectSection(card)}
              id={`ch2-card-${card.id.replace('.', '_')}`}
              tabIndex={0}
              role="button"
              aria-label={`Section ${card.number}: ${card.title} - Explore`}
              style={{ '--card-glow': card.glowColor }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelectSection(card);
                }
              }}
            >
              <img
                src={card.image}
                alt={`${card.number} ${card.title}`}
                className="ch2-ref-card-img"
                loading="eager"
              />
              <div className="ch2-ref-card-sheen" aria-hidden="true" />
              {/* Interactive Action Bar on card bottom */}
              <div className="ch2-ref-card-overlay">
                <span className="ch2-ref-card-badge-accessible" aria-hidden="true">{card.number}</span>
                <span className="ch2-ref-card-title-accessible" aria-hidden="true">{card.title}</span>
                <div
                  className="ch2-ref-card-action-bar"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectSection(card);
                  }}
                  title={`Explore ${card.title}`}
                >
                  <span className="ch2-ref-explore-text">EXPLORE</span>
                  <span className="ch2-ref-explore-arrow" aria-hidden="true">→</span>
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
