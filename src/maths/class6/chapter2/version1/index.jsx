import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Chapter2CoverV1 from './Chapter2CoverV1';
import Section2_1Point from './sections/Section2_1Point';
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
        <line x1="5" y1="22" x2="24" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="5" y1="22" x2="19" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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

/**
 * Class 6 Mathematics · Chapter 2: Lines and Angles (Version 1)
 * Multi-Stage Navigation: Cover Page → Main Page (11 Cards) → Individual Section View
 */
export default function Class6MathsChapter2V1({ onBackToDashboard }) {
  const [viewState, setViewState] = useState('cover'); // 'cover' | 'main' | 'section'
  const [activeSection, setActiveSection] = useState(null);

  const handleSelectSection = (section) => {
    setActiveSection(section);
    setViewState('section');
  };

  // ── 1. COVER PAGE VIEW ──
  if (viewState === 'cover') {
    return (
      <Chapter2CoverV1
        onBackToDashboard={onBackToDashboard}
        onStartExploring={() => setViewState('main')}
      />
    );
  }

  // ── 2. INDIVIDUAL SECTION DESTINATION CONTAINER VIEW ──
  if (viewState === 'section' && activeSection) {
    if (activeSection.id === '2.1') {
      return <Section2_1Point onBack={() => setViewState('main')} />;
    }

    return (
      <div 
        className="ch2-v1-section-view"
        id={`ch2-v1-section-${activeSection.number.replace('.', '_')}`}
      >
        <header className="ch2-v1-section-topbar">
          <div className="ch2-v1-section-topbar-left">
            <button
              onClick={() => setViewState('main')}
              className="ch2-top-back-btn"
              style={{ position: 'static' }}
              title="Back to Chapter 2 Sections"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
            <div className="ch2-v1-section-title-wrap">
              <span className="ch2-v1-section-badge">CHAPTER 2 · LINES AND ANGLES</span>
              <h2 className="ch2-v1-section-name">{activeSection.fullName}</h2>
            </div>
          </div>
        </header>

        <main className="ch2-v1-section-canvas-area">
          {/* Empty / placeholder container ready for future development */}
        </main>
      </div>
    );
  }

  // ── 3. MAIN PAGE VIEW (11 CLICKABLE HEADING CARDS GRID) ──
  return (
    <div className="ch2-v1-main-page" id="ch2-v1-main-page">
      {/* Top Navigation Bar */}
      <header className="ch2-v1-navbar">
        <div className="ch2-v1-nav-left">
          <button
            onClick={() => setViewState('cover')}
            className="ch2-top-back-btn"
            style={{ position: 'static' }}
            title="Return to Chapter 2 Cover"
          >
            <ArrowLeft size={16} />
            <span>Back to Cover</span>
          </button>
          <div className="ch2-v1-nav-title-group">
            <span className="ch2-v1-nav-badge">CHAPTER 2</span>
            <h2 className="ch2-v1-nav-heading">LINES AND ANGLES</h2>
          </div>
        </div>
      </header>

      {/* Main Page Title Header */}
      <div className="ch2-v1-page-header">
        <h1 className="ch2-v1-page-title">LINES AND ANGLES</h1>
        <p className="ch2-v1-page-desc">
          Select a section below to begin exploring geometric concepts
        </p>
      </div>

      {/* 11 Heading Cards Container (Strict Single Viewport, 4-4-3 Centered) */}
      <main className="ch2-cards-container">
        {/* Row 1: 2.1 to 2.4 */}
        <div className="ch2-cards-row">
          {CHAPTER_2_V1_SECTIONS.slice(0, 4).map((sec) => (
            <div
              key={sec.id}
              className="ch2-heading-card"
              onClick={() => handleSelectSection(sec)}
              id={`ch2-card-${sec.id.replace('.', '_')}`}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelectSection(sec);
                }
              }}
            >
              <div className="ch2-card-top-row">
                <span className="ch2-card-number-badge">{sec.number}</span>
                <div className="ch2-card-icon-box">{sec.iconSvg}</div>
              </div>

              <div className="ch2-card-body">
                <h3 className="ch2-card-title">{sec.title}</h3>
              </div>

              <div className="ch2-card-bottom-row">
                <span className="ch2-card-action-text">EXPLORE</span>
                <ArrowRight size={16} className="ch2-card-arrow-icon" />
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: 2.5 to 2.8 */}
        <div className="ch2-cards-row">
          {CHAPTER_2_V1_SECTIONS.slice(4, 8).map((sec) => (
            <div
              key={sec.id}
              className="ch2-heading-card"
              onClick={() => handleSelectSection(sec)}
              id={`ch2-card-${sec.id.replace('.', '_')}`}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelectSection(sec);
                }
              }}
            >
              <div className="ch2-card-top-row">
                <span className="ch2-card-number-badge">{sec.number}</span>
                <div className="ch2-card-icon-box">{sec.iconSvg}</div>
              </div>

              <div className="ch2-card-body">
                <h3 className="ch2-card-title">{sec.title}</h3>
              </div>

              <div className="ch2-card-bottom-row">
                <span className="ch2-card-action-text">EXPLORE</span>
                <ArrowRight size={16} className="ch2-card-arrow-icon" />
              </div>
            </div>
          ))}
        </div>

        {/* Row 3: 2.9 to 2.11 (Centered Horizontally) */}
        <div className="ch2-cards-row-bottom">
          {CHAPTER_2_V1_SECTIONS.slice(8, 11).map((sec) => (
            <div
              key={sec.id}
              className="ch2-heading-card"
              onClick={() => handleSelectSection(sec)}
              id={`ch2-card-${sec.id.replace('.', '_')}`}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelectSection(sec);
                }
              }}
            >
              <div className="ch2-card-top-row">
                <span className="ch2-card-number-badge">{sec.number}</span>
                <div className="ch2-card-icon-box">{sec.iconSvg}</div>
              </div>

              <div className="ch2-card-body">
                <h3 className="ch2-card-title">{sec.title}</h3>
              </div>

              <div className="ch2-card-bottom-row">
                <span className="ch2-card-action-text">EXPLORE</span>
                <ArrowRight size={16} className="ch2-card-arrow-icon" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
