import React from 'react';
import { Compass, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { PhysicalMapPage, PoliticalMapPage, ThematicMapPage } from './MapPages';
import { theme } from './theme';
export default function AtlasBook({ isOpen, currentPage, onNext, onPrev, onFinish }) {
  return (    <div style={{ 
      width: '100%', height: '100%', 
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      perspective: '2000px',
      padding: '1rem'
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        transform: isOpen ? 'translateX(0)' : 'translateX(-25%)',
        transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        transformStyle: 'preserve-3d'
      }}>
        
        {/* RIGHT HALF (Back cover + right pages) */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', width: '50%', height: '100%',
          backgroundColor: theme.colors.coverDark, borderRadius: '0 8px 8px 0',
          boxShadow: '10px 20px 40px rgba(60,40,20,0.3)',
          border: `2px solid ${theme.colors.border}`
        }}>
          <div style={{
            position: 'absolute', top: '10px', bottom: '10px', left: 0, right: '10px',
            backgroundColor: theme.colors.paper, borderRadius: '0 4px 4px 0',
            boxShadow: 'inset -5px 0 20px rgba(60,40,20,0.05)'
          }}></div>
        </div>

        {/* LEFT HALF */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '50%', height: '100%',
          backgroundColor: theme.colors.coverDark, borderRadius: '8px 0 0 8px',
          opacity: isOpen ? 1 : 0, transition: 'opacity 0.3s ease-in-out',
          boxShadow: '-10px 20px 40px rgba(60,40,20,0.2)',
          border: `2px solid ${theme.colors.border}`
        }}>
          <div style={{
            position: 'absolute', top: '10px', bottom: '10px', left: '10px', right: 0,
            backgroundColor: theme.colors.paper, borderRadius: '4px 0 0 4px',
            boxShadow: 'inset 5px 0 20px rgba(60,40,20,0.05)'
          }}></div>
        </div>

        <div style={{
          position: 'absolute', top: 0, bottom: 0, left: '50%', width: '40px', transform: 'translateX(-50%)',
          background: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(60,40,20,0.08) 40%, rgba(60,40,20,0.25) 50%, rgba(60,40,20,0.08) 60%, rgba(0,0,0,0) 100%)',
          zIndex: 10, pointerEvents: 'none', opacity: isOpen ? 1 : 0, transition: 'opacity 0.6s'
        }}></div>
        
        <div style={{
          position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', width: '20px', height: '80px',
          backgroundColor: theme.colors.buttonOrangeHover, zIndex: 12, boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
          opacity: isOpen ? 1 : 0, transition: 'opacity 0.6s', borderRadius: '0 0 3px 3px'
        }}></div>

        {/* PAGE CONTENT CONTAINER */}
        <div style={{
          position: 'absolute', top: '10px', bottom: '10px', left: '10px', right: '10px',
          zIndex: 15, display: 'flex', opacity: isOpen ? 1 : 0, transition: 'opacity 0.8s 0.2s',
          pointerEvents: isOpen ? 'auto' : 'none'
        }}>
            <div key={currentPage} style={{ width: '100%', height: '100%', animation: 'pageTurn 0.4s ease-out', boxSizing: 'border-box' }}>
              {currentPage === 1 && <PhysicalMapPage onNextMap={onNext} onPrevMap={onPrev} currentPage={1} onFinish={onFinish} />}
              {currentPage === 2 && <PoliticalMapPage onNextMap={onNext} onPrevMap={onPrev} currentPage={2} onFinish={onFinish} />}
              {currentPage === 3 && <ThematicMapPage onNextMap={onNext} onPrevMap={onPrev} currentPage={3} onFinish={onFinish} />}
            </div>
        </div>

        {/* FRONT COVER */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', width: '50%', height: '100%',
          transformOrigin: 'left center',
          transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isOpen ? 'rotateY(-180deg)' : 'rotateY(0deg)',
          transformStyle: 'preserve-3d',
          zIndex: isOpen ? 10 : 50
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: theme.colors.coverDark, borderRadius: '0 8px 8px 0',
            boxShadow: isOpen ? 'none' : '5px 0 15px rgba(60,40,20,0.4)',
            backfaceVisibility: 'hidden',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            borderLeft: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ border: `2px solid ${theme.colors.borderLight}`, width: '85%', height: '90%', borderRadius: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <Compass size={64} color={theme.colors.borderLight} style={{ marginBottom: theme.spacing.s6, opacity: 0.9 }} />
              <h1 style={{ color: theme.colors.coverLight, fontSize: '3.2rem', letterSpacing: '6px', margin: 0, fontFamily: theme.typography.fonts.heading, fontWeight: 900, textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>ATLAS</h1>
              <div style={{ height: '2px', width: '60%', backgroundColor: theme.colors.borderLight, margin: `${theme.spacing.fluid.lg} 0`, opacity: 0.7 }}></div>
              <div style={{ color: theme.colors.coverLight, fontSize: '1.1rem', letterSpacing: '4px', opacity: 0.9, fontWeight: 700 }}>A COLLECTION OF MAPS</div>
            </div>
          </div>
          
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: theme.colors.coverDark, borderRadius: '8px 0 0 8px',
            transform: 'rotateY(180deg)', backfaceVisibility: 'hidden',
            borderRight: '1px solid rgba(0,0,0,0.2)'
          }}>
             <div style={{ position: 'absolute', top: '10px', bottom: '10px', left: '10px', right: '0', backgroundColor: theme.colors.paper, borderRadius: '4px 0 0 4px', boxShadow: 'inset 5px 0 20px rgba(60,40,20,0.05)' }}></div>
          </div>
        </div>

      </div>

      <style>
        {`
          @keyframes pageTurn {
            0% { opacity: 0; transform: translateX(10px); filter: brightness(0.9); }
            100% { opacity: 1; transform: translateX(0); filter: brightness(1); }
          }
        `}
      </style>
    </div>
  );
}
