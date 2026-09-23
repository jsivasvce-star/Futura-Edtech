import React, { useState } from 'react';
import { X, Sparkles, Volume2, CheckCircle, Lightbulb, BookmarkCheck } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function DiscoveryPopup({ 
  organism, 
  onClose, 
  onCollect, 
  isCollected 
}) {
  const [speaking, setSpeaking] = useState(false);

  if (!organism) return null;

  const handleSpeak = () => {
    if (speaking) {
      sounds.stopSpeech();
      setSpeaking(false);
    } else {
      setSpeaking(true);
      sounds.speak(`${organism.name}. ${organism.details} Fun Fact: ${organism.fact}`);
      setTimeout(() => setSpeaking(false), 8000);
    }
  };

  const handleCollectClick = () => {
    sounds.playStar();
    onCollect(organism.id);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      background: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(4px)'
    }}>
      {/* Pop-up Card */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '34rem',
        background: 'rgba(250, 248, 242, 0.55)',
        border: '2px solid rgba(20, 69, 47, 0.5)',
        borderRadius: '24px',
        padding: '1.75rem',
        boxShadow: '0 20px 50px rgba(20, 69, 47, 0.25)',
        overflow: 'hidden',
        color: '#14452F'
      }}>
        
        {/* Header Bar */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '1rem',
          borderBottom: '2px solid rgba(20, 69, 47, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              fontSize: '2.5rem',
              padding: '6px 10px',
              background: 'rgba(20, 69, 47, 0.08)',
              borderRadius: '16px',
              border: '1.5px solid #14452F'
            }}>
              {organism.emoji}
            </span>
            <div>
              <span style={{
                fontSize: '18px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                background: '#14452F',
                color: '#FFFFFF',
                padding: '4px 12px',
                borderRadius: '999px',
                border: '1px solid #10B981',
                display: 'inline-block'
              }}>
                {organism.type === 'plant' ? '🌿 Plant Discovery' : '🐾 Animal Discovery'}
              </span>
              <h2 style={{
                fontFamily: '"Fraunces", Georgia, serif',
                fontSize: '24px',
                fontWeight: 900,
                color: '#14452F',
                margin: '0.35rem 0 0'
              }}>
                {organism.name}
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            style={{
              padding: '8px',
              color: '#14452F',
              background: 'rgba(20, 69, 47, 0.08)',
              border: '1.5px solid #14452F',
              borderRadius: '999px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ position: 'relative', zIndex: 10, margin: '1.25rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Simple Explanation */}
          <div style={{
            background: 'rgba(250, 248, 242, 0.65)',
            border: '1.5px solid #14452F',
            borderRadius: '16px',
            padding: '1rem 1.25rem'
          }}>
            <p style={{
              fontSize: '18px',
              color: '#2D3748',
              fontWeight: 500,
              lineHeight: 1.5,
              margin: 0,
              textAlign: 'justify',
              textJustify: 'inter-word'
            }}>
              {organism.details}
            </p>
          </div>

          {/* Fun Fact Card */}
          <div style={{
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1.8px solid #D97706',
            borderRadius: '16px',
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px'
          }}>
            <div style={{ padding: '6px', background: 'rgba(217, 119, 6, 0.15)', color: '#B45309', borderRadius: '10px' }}>
              <Lightbulb className="w-5 h-5" />
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '21px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#B45309', display: 'block' }}>
                Did You Know?
              </span>
              <p style={{
                fontSize: '18px',
                color: '#78350F',
                fontWeight: 600,
                marginTop: '4px',
                marginBottom: 0,
                lineHeight: 1.5,
                textAlign: 'justify',
                textJustify: 'inter-word'
              }}>
                {organism.fact}
              </p>
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '0.5rem' }}>
          {/* Add to Journal Button */}
          <button
            onClick={handleCollectClick}
            disabled={isCollected}
            style={{
              flex: 1,
              padding: '0.85rem 1.25rem',
              borderRadius: '14px',
              fontWeight: 800,
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: isCollected ? 'default' : 'pointer',
              border: isCollected ? '1.5px solid #10B981' : '1.5px solid #10B981',
              background: isCollected ? 'rgba(20, 69, 47, 0.15)' : 'linear-gradient(135deg, #14452F 0%, #064E3B 100%)',
              color: isCollected ? '#14452F' : '#FFFFFF',
              boxShadow: isCollected ? 'none' : '0 4px 14px rgba(20, 69, 47, 0.25)',
              transition: 'all 0.15s ease'
            }}
          >
            {isCollected ? (
              <>
                <BookmarkCheck className="w-5 h-5 text-emerald-600" />
                <span>Saved to Journal (+25 XP)</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Collect Entry (+25 XP)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
