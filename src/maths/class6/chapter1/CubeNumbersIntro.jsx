import React from 'react';

export default function CubeNumbersIntro() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        border: '3px solid #60a5fa',
        borderRadius: '24px',
        padding: '32px 40px',
        width: '640px',
        position: 'relative',
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
      }}>
        
        {/* Header Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{
            backgroundColor: '#1e3a8a',
            color: 'white',
            fontWeight: '900',
            fontSize: '22px',
            padding: '8px 16px',
            borderRadius: '10px'
          }}>
            D1
          </div>
          <div style={{
            backgroundColor: '#fef08a',
            color: '#1e3a8a',
            fontWeight: '700',
            fontSize: '18px',
            padding: '10px 24px',
            borderRadius: '10px'
          }}>
            Start with a new sequence
          </div>
        </div>

        {/* Sequence Row */}
        <div style={{
          backgroundColor: '#fae8ff',
          borderRadius: '50px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          padding: '6px 24px 6px 6px',
          marginBottom: '48px',
          width: 'fit-content'
        }}>
          <div style={{
            backgroundColor: '#e9d5ff',
            color: '#1e3a8a',
            fontWeight: '800',
            fontSize: '18px',
            padding: '10px 20px',
            borderRadius: '30px'
          }}>
            Cube Numbers
          </div>
          <div style={{
            color: '#1e3a8a',
            fontWeight: '800',
            fontSize: '22px',
            letterSpacing: '5px'
          }}>
            1 &nbsp; 8 &nbsp; 27 &nbsp; 64 &nbsp; 125 &nbsp; ...
          </div>
        </div>

        {/* Main Content Area */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative', paddingBottom: '10px' }}>
          
          {/* Boy and Speech Bubble */}
          <div style={{ position: 'relative', width: '280px', height: '220px' }}>
            {/* Speech Bubble */}
            <div style={{
              position: 'absolute',
              top: '-40px',
              left: '60px',
              backgroundColor: '#f0f9ff',
              border: '2px solid #60a5fa',
              borderRadius: '50%',
              padding: '24px 32px',
              width: '220px',
              height: '150px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              zIndex: 10,
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}>
              <p style={{ margin: 0, color: '#1e3a8a', fontWeight: '700', fontSize: '15px', lineHeight: '1.4' }}>
                Triangular numbers<br/>
                made triangles.<br/>
                Square numbers<br/>
                made squares.<br/>
                What about<br/>
                cube numbers?
              </p>
              {/* Bubble Tail */}
              <div style={{
                position: 'absolute',
                bottom: '-4px',
                left: '60px',
                width: '16px',
                height: '16px',
                backgroundColor: '#f0f9ff',
                borderBottom: '2px solid #60a5fa',
                borderRight: '2px solid #60a5fa',
                transform: 'rotate(45deg)',
                zIndex: -1
              }} />
            </div>

            {/* Boy Image */}
            <img 
              src="b13.png" 
              alt="Thinking boy" 
              style={{
                position: 'absolute',
                bottom: '-25px',
                left: '-10px',
                width: '160px',
                objectFit: 'contain'
              }}
            />
          </div>

          {/* Right Side: Cube and Equation */}
          <div style={{
            backgroundColor: '#f8fafc',
            borderRadius: '24px',
            padding: '32px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            width: '180px',
            boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.02)'
          }}>
            {/* 3D Cube Graphic */}
            <div style={{ position: 'relative', width: '80px', height: '80px' }}>
              <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ overflow: 'visible' }}>
                {/* Top face */}
                <polygon points="50,15 85,35 50,55 15,35" fill="#3b82f6" />
                {/* Left face */}
                <polygon points="15,35 50,55 50,95 15,75" fill="#1d4ed8" />
                {/* Right face */}
                <polygon points="50,55 85,35 85,75 50,95" fill="#2563eb" />
                
                {/* Edge Highlights */}
                <polyline points="15,35 50,15 85,35" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
                <line x1="50" y1="55" x2="50" y2="15" stroke="#93c5fd" strokeWidth="1.5" />
                <line x1="50" y1="55" x2="15" y2="35" stroke="#93c5fd" strokeWidth="1.5" />
                <line x1="50" y1="55" x2="85" y2="35" stroke="#60a5fa" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Equation Pill */}
            <div style={{
              backgroundColor: '#fef08a',
              color: '#1e3a8a',
              fontWeight: '800',
              fontSize: '18px',
              padding: '8px 16px',
              borderRadius: '20px',
              whiteSpace: 'nowrap'
            }}>
              1 &times; 1 &times; 1 = 1
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
