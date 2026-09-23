import React, { useState, useRef } from 'react';
import { Compass, CheckCircle2, ArrowLeft, Play, Pause } from 'lucide-react';
import AtlasBook from './AtlasBook';
import ChapterBackFooter from '../ChapterBackFooter';
import { theme } from './theme';
import page6Audio from '../audio/page6.mp3?url';
import { PAGE6_TRANSCRIPT } from './Page6Transcript';

const WordRenderer = ({ text, idPrefix, defaultColor, highlightColor, activeWordId }) => {
  const words = text.trim().split(/\s+/);
  return (
    <>
      {words.map((word, index) => {
        const wordId = `${idPrefix}-${index + 1}`;
        const isHighlighted = activeWordId === wordId;
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
              {word}
            </span>
            {index < words.length - 1 ? ' ' : ''}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default function AtlasIntroduction({ onNextActivity, onBack }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [activeWordId, setActiveWordId] = useState(null);
  const audioRef = useRef(null);

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
    if (audioRef.current) {
      const time = audioRef.current.currentTime;
      const activeWord = PAGE6_TRANSCRIPT.find(w => time >= w.start && time < w.end);
      let newActiveId = null;
      if (activeWord && activeWord.matchType === 'matched') {
        newActiveId = activeWord.pageWordId;
      }
      if (newActiveId !== activeWordId) {
        setActiveWordId(newActiveId);
      }
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setActiveWordId(null);
  };

  const audioButton = (
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
  );

  const handleNext = () => setCurrentPage(p => Math.min(3, p + 1));
  const handlePrev = () => setCurrentPage(p => Math.max(1, p - 1));
  const handleFinish = () => setIsCompleted(true);

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', flex: 1, height: '100%', fontFamily: '"Space Grotesk", sans-serif' }}>
      
      <div style={{
        width: '100%', 
        height: '100%',
        minHeight: '600px',
        display: 'flex', 
        flexDirection: 'column',
        background: `linear-gradient(160deg, ${theme.colors.paper} 0%, #EFE6D2 100%)`, 
        overflow: 'hidden', 
        position: 'relative',
        borderRadius: '20px',
        border: `2px solid ${theme.colors.border}`,
        boxShadow: theme.shadows.container
      }}>
      
      {/* Top Bar for Back Button */}
      {isOpen && (
        <div style={{ padding: `${theme.spacing.s3} ${theme.spacing.s6}`, borderBottom: `2px solid ${theme.colors.border}`, background: theme.colors.paper, zIndex: 20 }}>
          <button 
            onClick={() => setIsOpen(false)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: theme.spacing.s2, padding: `${theme.spacing.s1} 0`, background: 'transparent', border: 'none', color: theme.colors.primaryActive, fontSize: '13px', fontWeight: '800', cursor: 'pointer', transition: 'color 0.2s', fontFamily: theme.typography.fonts.body }}
            onMouseOver={(e) => e.currentTarget.style.color = theme.colors.primary}
            onMouseOut={(e) => e.currentTarget.style.color = theme.colors.primaryActive}
          >
            <ArrowLeft size={17} color={theme.colors.primaryActive} /> Back to Cover
          </button>
        </div>
      )}

      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
      {/* LEFT PANEL */}
      {!isOpen && (
        <div style={{ 
          flex: '0 0 32%', 
          minWidth: '340px', 
          padding: `${theme.spacing.fluid.lg} ${theme.spacing.fluid.lg}`,
          borderRight: `2px solid ${theme.colors.border}`, 
          background: `linear-gradient(160deg, ${theme.colors.paper} 0%, ${theme.colors.paperDark} 100%)`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          gap: theme.spacing.fluid.md,
          zIndex: 10,
          boxShadow: '4px 0 20px rgba(60,40,20,0.04)',
          minHeight: 0,
          overflow: 'hidden',
          transition: 'all 0.5s ease-in-out'
        }}>
          <div style={{ flexShrink: 0 }}>
          <div style={{ display: 'inline-flex', padding: '4px 14px', background: theme.colors.accentLight, border: `1px solid ${theme.colors.borderLight}`, color: theme.colors.primaryActive, borderRadius: theme.radius.full, fontSize: theme.typography.sizes.badge, fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: theme.spacing.s3 }}>
            Understanding Maps
          </div>

          <h1 style={{ fontSize: theme.typography.sizes.title, color: theme.colors.primary, margin: `0 0 ${theme.spacing.s2} 0`, lineHeight: 1.15, fontFamily: theme.typography.fonts.heading, fontWeight: 900 }}>
            <WordRenderer text="Atlas : A Collection of Maps" idPrefix="atlas" activeWordId={activeWordId} defaultColor={theme.colors.primary} highlightColor="#451a03" />
          </h1>

          <div style={{ fontSize: theme.typography.sizes.body, lineHeight: 1.55, color: theme.colors.text }}>
            <p style={{ margin: `0 0 ${theme.spacing.s2} 0`, color: theme.colors.text, fontWeight: 600, fontSize: 'inherit', lineHeight: 'inherit', textAlign: 'justify', textJustify: 'inter-word', hyphens: 'auto' }}>
              <WordRenderer text="An Atlas is a special book that contains many different kinds of maps." idPrefix="an" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" />
            </p>
            <p style={{ margin: 0, color: theme.colors.text, fontWeight: 600, fontSize: 'inherit', lineHeight: 'inherit', textAlign: 'justify', textJustify: 'inter-word', hyphens: 'auto' }}>
              <WordRenderer text="Open the Atlas and discover how each map helps us understand the world." idPrefix="open" activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" />
            </p>
          </div>
          </div>

          <div style={{ background: theme.colors.card, padding: theme.spacing.fluid.md, borderRadius: theme.radius.md, border: `1.5px solid ${theme.colors.border}`, boxShadow: theme.shadows.card, flex: '1 1 auto', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: `0 0 ${theme.spacing.s2} 0`, color: theme.colors.primaryActive, fontSize: theme.typography.sizes.small, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: theme.spacing.s1, fontWeight: 900, flexShrink: 0 }}>
              <Compass size={18} color={theme.colors.borderActive} /> Mission
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.fluid.xs, flex: 1, minHeight: 0 }}>
              {[
                { label: 'Explore the Atlas', done: isOpen },
                { label: 'Discover 3 Types of Maps', done: currentPage === 3 },
                { label: 'Complete the Journey', done: isCompleted }
              ].map((step, index) => (
                <div
                  key={step.label}
                  style={{ display: 'flex', gap: theme.spacing.s2, alignItems: 'center', flex: '1 1 0', minHeight: 0, background: theme.colors.paper, border: `1.5px solid ${theme.colors.border}`, borderRadius: theme.radius.sm, padding: `${theme.spacing.fluid.xs} ${theme.spacing.s3}` }}
                >
                  <CheckCircle2 size={19} color={step.done ? theme.colors.buttonGreen : theme.colors.primaryActive} style={{ flexShrink: 0 }} />
                  <div style={{ fontSize: theme.typography.sizes.body, color: theme.colors.text, fontWeight: 700, lineHeight: 1.25 }}>
                    <WordRenderer text={step.label} idPrefix={`item${index + 1}`} activeWordId={activeWordId} defaultColor={theme.colors.text} highlightColor="#451a03" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* RIGHT PANEL - Atlas */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: 'linear-gradient(160deg, #F7F1E2 0%, #EFE6D2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AtlasBook 
          isOpen={isOpen} 
          currentPage={currentPage}
          onNext={handleNext}
          onPrev={handlePrev}
          onFinish={handleFinish}
        />


      </div>
      </div>
      
      <audio
        ref={audioRef}
        src={page6Audio}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleAudioEnded}
      />

      <ChapterBackFooter
        onBack={onBack}
        nextLabel={!isOpen ? "Open Atlas" : "Next Activity"}
        onNext={!isOpen ? () => setIsOpen(true) : onNextActivity}
        nextDisabled={false}
        nextVariant="orange"
        beforeNextContent={!isOpen ? audioButton : null}
      />
    </div>
    </div>
  );
}
