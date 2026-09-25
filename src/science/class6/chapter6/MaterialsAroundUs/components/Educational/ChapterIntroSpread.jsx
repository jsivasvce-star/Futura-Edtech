import React, { useEffect } from 'react';
import htmlUrl from '../../../../../../assets/final_sloganforCH6.html?url';

export default function ChapterIntroSpread({ onContinue, onBack }) {
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'NAVIGATE') {
        if (event.data.direction === 'back') {
          onBack();
        } else if (event.data.direction === 'next') {
          onContinue();
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onBack, onContinue]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 10000,
      margin: 0,
      padding: 0,
      width: '100vw',
      height: '100vh',
      background: '#000',
      overflow: 'hidden'
    }}>
      <iframe
        src={htmlUrl}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block'
        }}
        title="Chapter 6 Slogan"
        onLoad={(e) => {
          try {
            const win = e.target.contentWindow;
            const doc = win.document;
            
            // Override the back button function on page 1
            win.goBackFromFirst = () => {
              if (win.stopAudio) win.stopAudio();
              window.postMessage({ type: 'NAVIGATE', direction: 'back' }, '*');
            };
            
            // Add click handler to the next button on page 5
            const page5Next = doc.querySelector('#outer-5 .next-btn');
            if (page5Next) {
              page5Next.classList.remove('disabled');
              page5Next.onclick = (ev) => {
                ev.preventDefault();
                if (win.stopAudio) win.stopAudio();
                window.postMessage({ type: 'NAVIGATE', direction: 'next' }, '*');
              };
            }

            // Inject scaling logic to remove baked-in black bars
            const style = doc.createElement('style');
            style.innerHTML = `
              .page-outer { overflow: hidden !important; }
              .imgwrap { transform-origin: center center !important; }
            `;
            doc.head.appendChild(style);

            const adjustScale = () => {
              const wraps = doc.querySelectorAll('.imgwrap');
              wraps.forEach(wrap => {
                wrap.style.transform = 'none';
                const rect = wrap.getBoundingClientRect();
                if (rect.width > 0 && rect.height > 0) {
                  const scaleX = win.innerWidth / rect.width;
                  const scaleY = win.innerHeight / rect.height;
                  
                  // Page 1 has black padding baked directly into the image itself.
                  // We scale the height by an extra 4% (1.04) to push those black pixels off-screen.
                  wrap.style.transform = `scale(${scaleX}, ${scaleY * 1.04})`;
                }
              });
            };

            win.addEventListener('resize', adjustScale);
            const originalShowPage = win.showPage;
            if (originalShowPage) {
              win.showPage = (n) => {
                originalShowPage(n);
                setTimeout(adjustScale, 10);
              };
            }
            setTimeout(adjustScale, 50);

          } catch (err) {
            console.error("Failed to inject iframe navigation handlers", err);
          }
        }}
      />
    </div>
  );
}
