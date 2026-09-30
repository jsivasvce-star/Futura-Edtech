import React from 'react';
import questionMarkImage from '../qn.png';

export default function TriangularNumbersRecall({ onNext, onPrev }) {
  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: '#0f172a',
      display: 'flex',
      flexDirection: 'column',
      color: '#f8fafc',
      fontFamily: 'Inter, system-ui, sans-serif',
      overflow: 'hidden'
    }}>
      
      {/* Background Decorative Elements */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40vh', pointerEvents: 'none', zIndex: 0 }}>
         {/* Subtle green leaves/waves matching screenshot aesthetics but in dark theme */}
         <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
           <path d="M 10,100 Q 15,60 30,100 Z" fill="rgba(74, 222, 128, 0.05)" />
           <path d="M -5,100 Q 15,40 40,100 Z" fill="rgba(74, 222, 128, 0.03)" />
           
           <path d="M 80,100 Q 90,50 105,100 Z" fill="rgba(74, 222, 128, 0.05)" />
           <path d="M 60,100 Q 85,40 110,100 Z" fill="rgba(74, 222, 128, 0.03)" />
           
           {/* Subtle ground curve */}
           <path d="M 0,100 Q 50,70 100,100 Z" fill="rgba(255, 255, 255, 0.02)" />
         </svg>
      </div>

      {/* Top Header */}
      <div style={{ padding: '32px 40px 24px 40px', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div>
          <div style={{ fontSize: '18px', color: '#cbd5e1', letterSpacing: '1px', fontWeight: '800', marginBottom: '8px' }}>
            VISUAL PATTERNS &nbsp;•&nbsp; <span style={{color: '#4ade80'}}>1.3 &nbsp;•&nbsp; CONCEPT 05 / 11</span>
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: '800', margin: '0 0 4px 0', color: '#ffffff', letterSpacing: '-0.5px', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
            Triangular numbers
          </h1>
          <h2 style={{ fontSize: '22px', fontWeight: '500', margin: '0', color: '#cbd5e1', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
            One new row. A bigger triangle.
          </h2>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '120px',
        zIndex: 10,
        marginTop: '-20px'
      }}>
        
        {/* Left Text */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '64px', fontWeight: '800', color: '#f8fafc', letterSpacing: '2px' }}>
            1, 3, 6, 10, 15 ...
          </div>
        </div>

        {/* Right Character */}
        <div style={{ 
          position: 'relative', 
          height: '350px', 
          width: '350px',
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center'
        }}>
          
          <img 
            src={questionMarkImage} 
            alt="Question Mark" 
            style={{
              height: '100%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.4))'
            }} 
          />

        </div>
      </div>

      {/* Bottom Footer */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 40px',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        zIndex: 10,
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(10px)'
      }}>
        {/* Progress Left */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <button 
            onClick={() => onPrev && onPrev()}
            style={{
              background: 'rgba(15,23,42,0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#cbd5e1',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              padding: '10px 20px',
              borderRadius: '8px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(30,41,59,0.9)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(15,23,42,0.8)'; e.currentTarget.style.color = '#cbd5e1'; }}
          >
            &larr; Previous concept
          </button>
        </div>

        {/* Action Buttons Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <button 
            onClick={() => onNext && onNext()}
            style={{
              backgroundColor: '#0ea5e9',
              color: '#fff',
              padding: '14px 28px',
              borderRadius: '10px',
              border: 'none',
              fontWeight: '700',
              fontSize: '15px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px 0 rgba(14, 165, 233, 0.4)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px 0 rgba(14, 165, 233, 0.5)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px 0 rgba(14, 165, 233, 0.4)'; }}
          >
            Continue 
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
      
    </div>
  );
}
