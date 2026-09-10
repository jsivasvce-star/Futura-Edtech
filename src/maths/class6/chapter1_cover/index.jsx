import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Compass } from 'lucide-react';
import PatternLab3D from './PatternLab3D';
import Class6MathsChapter1Journey from '../chapter1_journey';
import './cover.css';

export default function Class6MathsChapter1Cover({ onBackToDashboard }) {
  const [viewState, setViewState] = useState('cover'); // 'cover' | 'journey'

  if (viewState === 'journey') {
    return (
      <Class6MathsChapter1Journey
        onBackToDashboard={() => setViewState('cover')}
      />
    );
  }

  return (
    <div className="chapter1-cover-container">
      {/* Ambient background glows */}
      <div className="cover-ambient-bg" />
      <div className="cover-ambient-glow cover-glow-1" />
      <div className="cover-ambient-glow cover-glow-2" />

      {/* ── LEFT 60%: IMMERSIVE 3D MATHEMATICAL ANIMATION ── */}
      <section className="cover-left-section">
        <div className="cover-3d-wrapper">
          <div className="cover-3d-badge">
            <Compass size={14} style={{ display: 'inline', marginRight: '6px' }} />
            Interactive Pattern Studio
          </div>
          <PatternLab3D />
        </div>
      </section>

      {/* ── RIGHT 40%: CHAPTER IDENTITY & PRIMARY ACTION ── */}
      <section className="cover-right-section">
        {/* Subtle Mathematical Board Background Diagrams */}
        <div className="cover-board-graphics" aria-hidden="true">
          <svg className="cover-board-svg" viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Coordinate Grid & Origin */}
            <path d="M40 700 L560 700 M500 100 L500 750" stroke="#d97706" strokeWidth="1" strokeOpacity="0.18" />
            <path d="M100 150 L500 150 M100 300 L500 300 M100 450 L500 450 M100 600 L500 600" stroke="#b45309" strokeWidth="0.8" strokeDasharray="4 6" strokeOpacity="0.12" />
            
            {/* Geometric Triangle Construction & Compass Arc */}
            <polygon points="380,180 520,380 240,380" stroke="#d97706" strokeWidth="1.5" strokeOpacity="0.22" fill="rgba(245, 158, 11, 0.03)" />
            <circle cx="380" cy="280" r="110" stroke="#b45309" strokeWidth="1" strokeDasharray="3 4" strokeOpacity="0.15" />
            <path d="M 270,280 A 110,110 0 0,1 490,280" stroke="#ea580c" strokeWidth="1.2" strokeOpacity="0.2" />
            
            {/* Inscribed Polygon (Hexagon & Tessellation Lines) */}
            <polygon points="460,520 520,485 520,415 460,380 400,415 400,485" stroke="#d97706" strokeWidth="1.2" strokeOpacity="0.2" fill="none" />
            
            {/* Mathematical Notation & Sequence Formulae */}
            <text x="440" y="140" fill="#9a3412" fillOpacity="0.25" fontSize="16" fontFamily="monospace" fontWeight="bold">aₙ = a₁ + (n-1)d</text>
            <text x="420" y="340" fill="#b45309" fillOpacity="0.22" fontSize="20" fontFamily="serif" fontStyle="italic">Σ, π, Δ, θ</text>
            <text x="120" y="680" fill="#9a3412" fillOpacity="0.2" fontSize="14" fontFamily="monospace">f(n) = f(n-1) + f(n-2)</text>
            <text x="350" y="640" fill="#d97706" fillOpacity="0.2" fontSize="24" fontFamily="serif">∞</text>
          </svg>
        </div>

        {/* Class Badge */}
        <div className="cover-class-badge">
          CLASS 6 · MATHEMATICS
        </div>

        {/* Main Title */}
        <div className="cover-title-group">
          <span className="cover-title-patterns">PATTERNS</span>
          <span className="cover-title-in-maths">IN MATHEMATICS</span>
        </div>

        {/* Chapter Number */}
        <div className="cover-ch-badge">
          CHAPTER 1
        </div>

        {/* Concise Textbook Keywords */}
        <div className="cover-keywords">
          NUMBERS · SEQUENCES · SHAPES · PATTERNS
        </div>

        {/* Primary Action Button */}
        <button
          className="cover-begin-btn"
          onClick={() => setViewState('journey')}
        >
          BEGIN CHAPTER <ArrowRight size={22} className="cover-btn-arrow" />
        </button>

        {/* Realistic Mathematics Books & Stationery Decorative Accent */}
        <div className="cover-books-stationery-accent" aria-hidden="true">
          <div className="accent-book-stack">
            <div className="accent-book accent-book-1">
              <span className="accent-book-title">MATH · VI</span>
            </div>
            <div className="accent-book accent-book-2">
              <span className="accent-book-title">GEOMETRY</span>
            </div>
          </div>
          <div className="accent-geometry-tool" />
        </div>
      </section>

      {/* ── BOTTOM LEFT BACK BUTTON ── */}
      <button
        className="cover-back-btn"
        onClick={onBackToDashboard}
        title="Return to Class 6th Mathematics"
      >
        <ArrowLeft size={16} /> BACK
      </button>
    </div>
  );
}
