import React, { useState, useRef, useEffect } from 'react';
import { Search, Lightbulb, RefreshCw, Lock, CheckCircle2, ChevronRight, Check, Folder } from 'lucide-react';
import classroomBg from '../images/clean_classroom.jpg';
import fpage14Audio from '../../audio/fpage14.mp3?url';
import fpage14Json from '../../json/fpage14.json';
import fpage14popupAudio from '../../audio/fpage14popup.mp3?url';
import fpage14popupJson from '../../json/fpage14popup.json';

// Placeholders ready for the exact purpose-made thumbnail assets once generated.
const placeholderImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

const CLASSROOM_OBJECTS = [
  { id: 'duster', image: placeholderImg, name: 'Duster', material: 'Wood', desc: 'A hard wooden back provides a strong grip for the soft felt underneath.', xPos: 58.5, yPos: 37.5, hitbox: 'rect', w: 5, h: 3 },
  { id: 'bottle', image: placeholderImg, name: 'Metal water bottle', material: 'Metal', desc: 'A strong and durable material that keeps water cold.', xPos: 36, yPos: 46, hitbox: 'rect', w: 5, h: 14 },
  { id: 'window', image: placeholderImg, name: 'Window pane', material: 'Glass', desc: 'Transparent material that allows light to pass through while keeping weather out.', xPos: 4, yPos: 30, hitbox: 'rect', w: 8, h: 30 },
  { id: 'backpack', image: placeholderImg, name: 'Bag', material: 'Fabric', desc: 'Soft, flexible, and strong material that can hold heavy books without tearing.', xPos: 88, yPos: 63, hitbox: 'rect', w: 14, h: 18 },
  { id: 'notebook', image: placeholderImg, name: 'Notebook', material: 'Paper', desc: 'Light and easy to carry. Smooth to write on. Can be folded. Made from plant-based material.', xPos: 42.5, yPos: 65, hitbox: 'rect', w: 14, h: 8 },
  { id: 'blackboard', image: placeholderImg, name: 'Blackboard', material: 'Slate', desc: 'A hard, dark rock material that is flat and holds chalk marks easily.', xPos: 50, yPos: 25 }
];

const MAGNIFIER_RADIUS = 140;
const DISCOVERY_RADIUS = 70;
const HOLD_DURATION_MS = 1000;

export default function Stage1_Intro({ onComplete, addXp, setExtraRightAction }) {
  // State
  const [glassPos, setGlassPos] = useState({ x: 300, y: 300 });
  const [isDragging, setIsDragging] = useState(false);
  const [discovered, setDiscovered] = useState([]);
  const [hoverTarget, setHoverTarget] = useState(null);
  const [holdProgress, setHoldProgress] = useState(0);
  const [viewState, setViewState] = useState('explore'); // explore, zoom, completed
  const [activeObject, setActiveObject] = useState(null);
  const [hintActive, setHintActive] = useState(false);
  const [inspectionComplete, setInspectionComplete] = useState(false);
  const [isPopActive, setIsPopActive] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(null);
  const audioRef = useRef(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error(e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (setExtraRightAction) {
      setExtraRightAction(
        <button
          onClick={toggleAudio}
          className="outline"
          style={{
            padding: '0.85rem 1.6rem',
            fontSize: '1.6rem',
            fontWeight: 'bold',
            gap: '0.75rem',
            borderRadius: '10px',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {isPlaying ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          )} {isPlaying ? "Pause" : "Play"}
        </button>
      );
    }
    return () => {
      if (setExtraRightAction) setExtraRightAction(null);
    };
  }, [setExtraRightAction, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setActiveWordIndex(null);
    }
  }, [viewState]);

  const handleTimeUpdate = () => {
    const currentJson = viewState === 'completed' ? fpage14popupJson : fpage14Json;
    if (audioRef.current && typeof currentJson !== 'undefined') {
      const time = audioRef.current.currentTime;
      const activeIdx = currentJson.words.findIndex(w => time >= w.start && time < w.end);
      if (activeIdx !== activeWordIndex) {
        setActiveWordIndex(activeIdx);
      }
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setActiveWordIndex(null);
  };

  const W = ({ i, children }) => {
    const indices = Array.isArray(i) ? i : [i];
    const isActive = indices.includes(activeWordIndex);
    return (
      <span
        style={{
          color: isActive ? '#FFFFFF' : 'inherit',
          background: isActive ? '#2C6E63' : 'transparent',
          borderRadius: '4px',
          padding: '0 2px',
          transition: 'all 0.15s ease-out'
        }}
      >
        {children}
      </span>
    );
  };

  useEffect(() => {
    setIsPopActive(inspectionComplete);
  }, [inspectionComplete]);

  useEffect(() => {
    if (viewState !== 'zoom') {
      setInspectionComplete(false);
    }
  }, [viewState]);

  // Refs
  const containerRef = useRef(null);
  const holdTimerRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const glassRef = useRef({ x: 300, y: 300 });
  const clipLayerRef = useRef(null);
  const physicalGlassRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(entries => {
      setContainerSize({
        width: entries[0].contentRect.width,
        height: entries[0].contentRect.height
      });
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const getPixelCoordinates = (pctX, pctY, width, height) => {
    if (!width || !height) return { x: 0, y: 0 };
    const wI = 768; // Original Image Width
    const hI = 1024; // Original Image Height
    const scale = Math.max(width / wI, height / hI);
    const wR = wI * scale;
    const hR = hI * scale;
    const xOffset = (width - wR) / 2;
    const yOffset = (height - hR) / 2;
    
    return {
      x: xOffset + (pctX / 100) * wR,
      y: yOffset + (pctY / 100) * hR
    };
  };

  const getMappedCoordinates = (pctX, pctY) => {
    if (!containerSize.width || !containerSize.height) return { x: pctX, y: pctY };
    const coords = getPixelCoordinates(pctX, pctY, containerSize.width, containerSize.height);
    return {
      x: (coords.x / containerSize.width) * 100,
      y: (coords.y / containerSize.height) * 100
    };
  };

  const getMaskImage = () => {
    if (discovered.length === 0) return 'none';
    const gradients = discovered.map(id => {
      const obj = CLASSROOM_OBJECTS.find(o => o.id === id);
      const { x, y } = getMappedCoordinates(obj.xPos, obj.yPos);
      return `radial-gradient(circle at ${x}% ${y}%, black 40px, transparent 90px)`;
    });
    return gradients.join(', ');
  };

  const playSound = (type) => {
    // Placeholder for subtle sounds if needed
  };

  const handlePointerDown = (e) => {
    if (viewState !== 'explore') return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const dist = Math.hypot(x - glassRef.current.x, y - glassRef.current.y);
    if (dist <= MAGNIFIER_RADIUS + 20) {
      setIsDragging(true);
      e.target.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e) => {
    if (viewState !== 'explore') return;

    const rect = containerRef.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    if (isDragging) {
      x = Math.max(0, Math.min(rect.width, x));
      y = Math.max(0, Math.min(rect.height, y));
      
      glassRef.current = { x, y };
      
      if (clipLayerRef.current) {
        clipLayerRef.current.style.clipPath = `circle(${MAGNIFIER_RADIUS / 1.3}px at ${x}px ${y}px)`;
        clipLayerRef.current.style.transformOrigin = `${x}px ${y}px`;
      }
      
      if (physicalGlassRef.current) {
        physicalGlassRef.current.style.top = `${y - MAGNIFIER_RADIUS}px`;
        physicalGlassRef.current.style.left = `${x - MAGNIFIER_RADIUS}px`;
      }
      
      checkCollisions(x, y, rect.width, rect.height);
    }
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    e.target.releasePointerCapture(e.pointerId);
  };

  const checkCollisions = (mouseX, mouseY, width, height) => {
    let foundTarget = null;

    for (const obj of CLASSROOM_OBJECTS) {
      // Allow colliding with already discovered objects so they can be inspected again

      const { x: objX, y: objY } = getPixelCoordinates(obj.xPos, obj.yPos, width, height);

      let isHit = false;
      if (obj.hitbox === 'rect') {
        const scale = Math.max(width / 768, height / 1024);
        const wPx = (obj.w / 100) * 768 * scale;
        const hPx = (obj.h / 100) * 1024 * scale;
        const dx = Math.abs(mouseX - objX);
        const dy = Math.abs(mouseY - objY);
        isHit = (dx <= wPx / 2 && dy <= hPx / 2);
      } else {
        const dist = Math.hypot(mouseX - objX, mouseY - objY);
        isHit = dist <= DISCOVERY_RADIUS;
      }
      
      if (isHit) {
        foundTarget = obj;
        break;
      }
    }

    if (foundTarget) {
      if (discovered.includes(foundTarget.id)) {
        // If already discovered, just update the active object to show its bubble immediately
        if (activeObject?.id !== foundTarget.id) {
          setActiveObject(foundTarget);
        }
        if (hoverTarget) {
          setHoverTarget(null);
          clearHoldTimer();
        }
      } else {
        // Not discovered yet, start the scan timer
        if (hoverTarget?.id !== foundTarget.id) {
          setHoverTarget(foundTarget);
          startHoldTimer(foundTarget);
        }
      }
    } else {
      if (hoverTarget) {
        setHoverTarget(null);
        clearHoldTimer();
      }
    }
  };

  const startHoldTimer = (obj) => {
    clearHoldTimer();
    let progress = 0;
    
    progressIntervalRef.current = setInterval(() => {
      progress += 10;
      setHoldProgress(progress);
    }, 10);

    holdTimerRef.current = setTimeout(() => {
      triggerDiscovery(obj);
    }, HOLD_DURATION_MS);
  };

  const clearHoldTimer = () => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    setHoldProgress(0);
  };

  const triggerDiscovery = (obj) => {
    clearHoldTimer();
    setHoverTarget(null);
    setActiveObject(obj);
    
    // Progressively add to discovered objects using functional update to guarantee no stale state overwrites
    setDiscovered(prev => {
      if (prev.includes(obj.id)) return prev;
      return [...prev, obj.id];
    });

    setViewState('zoom');
    setHintActive(false);
    playSound('discovery');
  };

  const returnToClassroom = () => {
    // Check if ALL objects have now been discovered
    // We check against the current length. If this was the last object,
    // the triggerDiscovery already added it to the `discovered` array.
    if (discovered.length === CLASSROOM_OBJECTS.length || (discovered.length === CLASSROOM_OBJECTS.length - 1 && !discovered.includes(activeObject.id))) {
      // In case state hasn't flushed yet, also handle length-1 if activeObject is missing
      setTimeout(() => {
        setViewState('completed');
        playSound('success');
      }, 500);
    } else {
      setViewState('explore');
    }
  };

  const resetActivity = () => {
    setDiscovered([]);
    setViewState('explore');
    setActiveObject(null);
    setGlassPos({ x: 300, y: 300 });
    glassRef.current = { x: 300, y: 300 };
    setHintActive(false);
  };

  const triggerHint = () => {
    setHintActive(true);
    setTimeout(() => setHintActive(false), 2000);
  };

  // Zoom Transform logic
  let transformStyle = 'scale(1) translate(0px, 0px)';
  let transformOriginStyle = 'center';

  if (viewState === 'zoom' && activeObject && containerRef.current) {
    const rect = containerRef.current.getBoundingClientRect();
    const { x: objX, y: objY } = getPixelCoordinates(activeObject.xPos, activeObject.yPos, rect.width, rect.height);
    
    const scale = 2.5;
    
    // Target translation to put the object at the center of the container
    let finalX = (rect.width / 2) - (objX * scale);
    let finalY = (rect.height / 2) - (objY * scale);
    
    // Clamp the translation so we don't show the black background
    const minX = rect.width * (1 - scale);
    const minY = rect.height * (1 - scale);
    
    finalX = Math.max(minX, Math.min(0, finalX));
    finalY = Math.max(minY, Math.min(0, finalY));
    
    transformOriginStyle = '0 0';
    transformStyle = `translate(${finalX}px, ${finalY}px) scale(${scale})`;
  }

  // Visual Theme Colors matching reference
  const theme = {
    bg: 'var(--lesson-surface)',
    textMain: 'var(--lesson-primary)',
    textAccent: 'var(--lesson-success)',
    cardBg: 'var(--lesson-card)',
    border: 'var(--lesson-border)',
    success: 'var(--lesson-success)', // used for checks (actually green in image, let's use var(--lesson-success))
  };

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100%', 
      minHeight: 0, 
      fontFamily: 'system-ui, -apple-system, sans-serif', 
      background: 'var(--lesson-surface)', 
      borderRadius: '0px',
      padding: '8px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <style>{`
        @keyframes gentlePulse {
          0% { transform: scale(1); box-shadow: 0 6px 16px rgba(0,0,0,0.05); }
          25% { transform: scale(1.08); box-shadow: 0 0 0 6px rgba(166,75,39,0.4), 0 8px 24px rgba(166,75,39,0.5); }
          50% { transform: scale(1); box-shadow: 0 6px 16px rgba(0,0,0,0.05); }
          100% { transform: scale(1); box-shadow: 0 6px 16px rgba(0,0,0,0.05); }
        }
        .attention-btn-pulse {
          animation: gentlePulse 1.2s infinite ease-in-out;
        }
        @media (prefers-reduced-motion: reduce) {
          .attention-btn-pulse {
            animation: none !important;
            transform: scale(1.03) !important;
            box-shadow: 0 0 0 4px rgba(166,75,39,0.3), 0 8px 24px rgba(166,75,39,0.4) !important;
          }
        }
      `}</style>
      
      {/* MAIN CONTENT AREA */}
      <div style={{ display: 'grid', gridTemplateColumns: '7fr 3fr', gap: '12px', flex: 1, minHeight: 0 }}>
        
        {/* LEFT PANEL: CLASSROOM */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minWidth: 0 }}>
          
          {/* IMMERSIVE VIEWPORT */}
          <div 
            ref={containerRef}
            style={{
              flex: 1, position: 'relative', overflow: 'hidden',
              borderRadius: '0px', border: '4px solid var(--lesson-primary)',
              background: '#000',
              boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
              cursor: viewState === 'explore' ? (isDragging ? 'grabbing' : 'grab') : 'default',
              touchAction: 'none'
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {/* ZOOMABLE CONTAINER */}
            <div 
              onTransitionEnd={(e) => {
                if (e.propertyName === 'transform' && viewState === 'zoom') {
                  setInspectionComplete(true);
                }
              }}
              style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              transform: transformStyle,
              transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transformOrigin: transformOriginStyle
            }}>
              {/* Base Classroom Image */}
              <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backgroundImage: `url(${classroomBg})`,
                backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
              }} />

            </div>

            {/* CALLOUTS (Rendered outside the transform to prevent clipping/scaling bugs) */}
            {CLASSROOM_OBJECTS.map(obj => {
               const isActive = activeObject?.id === obj.id;
               if (!isActive || viewState === 'completed') return null;

               const { x, y } = getMappedCoordinates(obj.xPos, obj.yPos);
               
               let basePxX = 0;
               let basePxY = 0;
               if (containerSize.width) {
                 basePxX = (x / 100) * containerSize.width;
                 basePxY = (y / 100) * containerSize.height;
               }

               let currentScale = 1;
               let translateX = 0;
               let translateY = 0;
               
               if (viewState === 'zoom' && activeObject && containerSize.width) {
                 currentScale = 2.5;
                 const { x: objX, y: objY } = getPixelCoordinates(activeObject.xPos, activeObject.yPos, containerSize.width, containerSize.height);
                 
                 let fX = (containerSize.width / 2) - (objX * currentScale);
                 let fY = (containerSize.height / 2) - (objY * currentScale);
                 
                 const minX = containerSize.width * (1 - currentScale);
                 const minY = containerSize.height * (1 - currentScale);
                 
                 translateX = Math.max(minX, Math.min(0, fX));
                 translateY = Math.max(minY, Math.min(0, fY));
               }

               const objectScreenCenterX = basePxX * currentScale + translateX;
               const objectScreenCenterY = basePxY * currentScale + translateY;

               let halfW = 40;
               let halfH = 40;
               if (containerSize.width) {
                   const scaleFactor = Math.max(containerSize.width / 768, containerSize.height / 1024);
                   if (obj.hitbox === 'rect') {
                       halfW = ((obj.w / 100) * 768 * scaleFactor) / 2;
                       halfH = ((obj.h / 100) * 1024 * scaleFactor) / 2;
                   } else {
                       halfW = 60 * scaleFactor;
                       halfH = 60 * scaleFactor;
                   }
               }
               const zoomedHalfW = halfW * currentScale;
               const zoomedHalfH = halfH * currentScale;

               const margin = 16;
               const bubbleEstW = 160;
               const bubbleEstH = 110;
               
               let placement = 'top';
               const spaceTop = objectScreenCenterY - zoomedHalfH;
               const spaceBottom = containerSize.height - (objectScreenCenterY + zoomedHalfH);
               const spaceLeft = objectScreenCenterX - zoomedHalfW;
               const spaceRight = containerSize.width - (objectScreenCenterX + zoomedHalfW);

               if (spaceTop < bubbleEstH + margin) {
                   if (spaceBottom >= bubbleEstH + margin) {
                       placement = 'bottom';
                   } else if (spaceRight >= bubbleEstW + margin) {
                       placement = 'right';
                   } else if (spaceLeft >= bubbleEstW + margin) {
                       placement = 'left';
                   } else {
                       placement = 'bottom';
                   }
               } else if (spaceLeft < bubbleEstW / 2 + margin && spaceRight >= bubbleEstW + margin) {
                   placement = 'right';
               } else if (spaceRight < bubbleEstW / 2 + margin && spaceLeft >= bubbleEstW + margin) {
                   placement = 'left';
               }

               let transformVal = '';
               let arrowStyle = {};
               let innerArrowStyle = {};
               let originStyle = 'center';
               
               if (placement === 'right') {
                   transformVal = `translate(${zoomedHalfW + margin}px, -50%)`;
                   originStyle = 'left center';
                   arrowStyle = { left: '-12px', top: '50%', transform: 'translateY(-50%)', borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderRight: '12px solid var(--lesson-success)' };
                   innerArrowStyle = { left: '-8px', top: '50%', transform: 'translateY(-50%)', borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderRight: '9px solid var(--lesson-card)' };
               } else if (placement === 'left') {
                   transformVal = `translate(calc(-100% - ${zoomedHalfW + margin}px), -50%)`;
                   originStyle = 'right center';
                   arrowStyle = { right: '-12px', top: '50%', transform: 'translateY(-50%)', borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderLeft: '12px solid var(--lesson-success)' };
                   innerArrowStyle = { right: '-8px', top: '50%', transform: 'translateY(-50%)', borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: '9px solid var(--lesson-card)' };
               } else if (placement === 'bottom') {
                   transformVal = `translate(-50%, ${zoomedHalfH + margin}px)`;
                   originStyle = 'top center';
                   arrowStyle = { top: '-12px', left: '50%', transform: 'translateX(-50%)', borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderBottom: '12px solid var(--lesson-success)' };
                   innerArrowStyle = { top: '-8px', left: '50%', transform: 'translateX(-50%)', borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderBottom: '9px solid var(--lesson-card)' };
               } else {
                   transformVal = `translate(-50%, calc(-100% - ${zoomedHalfH + margin}px))`;
                   originStyle = 'bottom center';
                   arrowStyle = { bottom: '-12px', left: '50%', transform: 'translateX(-50%)', borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '12px solid var(--lesson-success)' };
                   innerArrowStyle = { bottom: '-8px', left: '50%', transform: 'translateX(-50%)', borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: '9px solid var(--lesson-card)' };
               }

               return (
                 <div key={`bubble-${obj.id}`} style={{
                    position: 'absolute',
                    left: `${objectScreenCenterX}px`, top: `${objectScreenCenterY}px`,
                    transform: transformVal,
                    transformOrigin: originStyle,
                    transition: 'left 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    opacity: 1,
                    background: 'var(--lesson-card)',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    border: '3px solid var(--lesson-success)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                    zIndex: 99999,
                    pointerEvents: 'none',
                    display: 'flex', flexDirection: 'column', gap: '2px', minWidth: '100px'
                 }}>
                    <div style={{ fontSize: '0.65rem', fontWeight: '800', letterSpacing: '0.5px', color: 'var(--lesson-muted)' }}>OBJECT</div>
                    <div style={{ fontSize: '1rem', fontWeight: '900', lineHeight: '1', color: 'var(--lesson-primary)' }}>{obj.name}</div>
                    <div style={{ fontSize: '0.65rem', fontWeight: '800', letterSpacing: '0.5px', color: 'var(--lesson-muted)', marginTop: '6px' }}>MATERIAL</div>
                    <div style={{ fontSize: '1rem', fontWeight: '900', lineHeight: '1', color: 'var(--lesson-success)' }}>{obj.material}</div>
                    
                    {/* Outer border arrow */}
                    <div style={{
                        position: 'absolute',
                        ...arrowStyle,
                        width: 0, height: 0,
                        zIndex: 1
                    }} />
                    {/* Inner white fill for arrow */}
                    <div style={{
                        position: 'absolute',
                        ...innerArrowStyle,
                        width: 0, height: 0,
                        zIndex: 2
                    }} />
                 </div>
               )
            })}

            {/* Target Circles */}
            {viewState === 'explore' && CLASSROOM_OBJECTS.map((obj) => {
               if (discovered.includes(obj.id)) return null;
               const { x, y } = getMappedCoordinates(obj.xPos, obj.yPos);
               let w = '70px', h = '70px';
               if (obj.hitbox === 'rect' && containerSize.width) {
                   const scale = Math.max(containerSize.width / 768, containerSize.height / 1024);
                   w = `${(obj.w / 100) * 768 * scale}px`;
                   h = `${(obj.h / 100) * 1024 * scale}px`;
               }
                return (
                 <div key={obj.id} style={{
                   position: 'absolute',
                   top: `${y}%`, left: `${x}%`,
                   width: w, height: h,
                   transform: 'translate(-50%, -50%)',
                   border: `2px dashed rgba(251, 191, 36, 0.8)`,
                   borderRadius: obj.hitbox === 'rect' ? '16px' : '50%',
                   pointerEvents: 'none',
                   zIndex: 6
                 }} />
               )
            })}


            {/* Clear Mask Layer (Magnified) */}
            {viewState === 'explore' && (
              <div
                ref={clipLayerRef}
                style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backgroundImage: `url(${classroomBg})`,
                backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
                clipPath: `circle(${MAGNIFIER_RADIUS / 1.3}px at ${glassRef.current.x}px ${glassRef.current.y}px)`,
                transformOrigin: `${glassRef.current.x}px ${glassRef.current.y}px`,
                transform: 'scale(1.3)',
                pointerEvents: 'none',
                zIndex: 5
              }} />
            )}

            {/* Hint Box (Bottom Left) */}
            
            {/* Hold Progress Ring (No dashed outlines) */}
            {viewState === 'explore' && hoverTarget && (
               <div style={{
                  position: 'absolute',
                  top: `${getMappedCoordinates(hoverTarget.xPos, hoverTarget.yPos).y}%`, 
                  left: `${getMappedCoordinates(hoverTarget.xPos, hoverTarget.yPos).x}%`,
                  width: '100px', height: '100px',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                  zIndex: 4
                }}>
                    <svg style={{ position: 'absolute', top: '-10px', left: '-10px', width: '120px', height: '120px' }}>
                       <circle cx="60" cy="60" r="50" fill="none" stroke="var(--lesson-warning)" strokeWidth="6" 
                               strokeDasharray="314" strokeDashoffset={314 - (314 * (holdProgress / 1000))}
                               style={{ transition: 'stroke-dashoffset 0.05s linear', transform: 'rotate(-90deg)', transformOrigin: '60px 60px' }} />
                    </svg>
                </div>
            )}

            {/* Instruction Overlay */}
            {viewState === 'explore' && (
              <div style={{ position: 'absolute', bottom: '24px', left: '24px', textAlign: 'left', pointerEvents: 'none', zIndex: 10 }}>
                <div style={{ background: 'rgba(20,20,20,0.85)', color: 'white', padding: '10px 20px', borderRadius: '16px', fontWeight: '700', fontSize: '1rem', letterSpacing: '0.5px', boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}>
                  Move the <span style={{ color: 'var(--lesson-warning)' }}>magnifying glass</span><br/>around and find hidden objects!
                </div>
              </div>
            )}



            {/* Physical Magnifying Glass Overlay */}
            {viewState === 'explore' && (
              <div 
                ref={physicalGlassRef}
                style={{
                position: 'absolute',
                top: glassRef.current.y - MAGNIFIER_RADIUS,
                left: glassRef.current.x - MAGNIFIER_RADIUS,
                width: MAGNIFIER_RADIUS * 2,
                height: MAGNIFIER_RADIUS * 2,
                pointerEvents: 'none',
                zIndex: 20
              }}>
                {/* Glass Rim */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                  borderRadius: '50%',
                  border: '14px solid var(--lesson-muted)',
                  boxShadow: 'inset 0 0 30px rgba(0,0,0,0.6), inset 4px 4px 10px rgba(255,255,255,0.6), 0 15px 35px rgba(0,0,0,0.5)',
                  boxSizing: 'border-box'
                }}>
                   <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: '4px solid var(--lesson-primary)', boxSizing: 'border-box' }} />
                </div>
                
                {/* Glare/Reflection */}
                <div style={{
                  position: 'absolute', top: '10%', left: '15%', width: '70%', height: '70%',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 40%)',
                  pointerEvents: 'none'
                }} />
                
                {/* Wooden Handle */}
                <div style={{
                  position: 'absolute',
                  top: '85%', left: '85%',
                  width: '40px', height: '180px',
                  background: 'linear-gradient(90deg, #3e220b 0%, #6b4226 30%, #2a1405 100%)',
                  borderRadius: '20px',
                  transform: 'rotate(-45deg)',
                  transformOrigin: 'top left',
                  boxShadow: '8px 8px 20px rgba(0,0,0,0.6)',
                  border: '2px solid #1a0c03'
                }}>
                   {/* Handle Base Knob */}
                   <div style={{
                      position: 'absolute', bottom: '-10px', left: '-5px', width: '50px', height: '30px',
                      background: 'radial-gradient(ellipse at top, #a67c00, #4d3900)',
                      borderRadius: '20px',
                      border: '2px solid var(--lesson-primary)'
                   }} />
                </div>
                
                {/* Connector */}
                <div style={{
                  position: 'absolute',
                  top: '85%', left: '85%',
                  width: '36px', height: '36px',
                  background: 'radial-gradient(circle at 30% 30%, #d4af37, var(--lesson-muted))',
                  borderRadius: '50%',
                  transform: 'translate(-30%, -30%)',
                  boxShadow: 'inset -2px -2px 10px rgba(0,0,0,0.7)',
                  border: '2px solid var(--lesson-primary)'
                }} />
              </div>
            )}

            {/* Completion Overlay */}
            {viewState === 'completed' && (
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(245, 239, 230, 0.85)', backdropFilter: 'blur(8px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
                 <div style={{ background: 'var(--lesson-card)', padding: '3rem', borderRadius: '24px', border: '4px solid var(--lesson-primary)', boxShadow: '0 25px 50px rgba(0,0,0,0.3)', textAlign: 'center', maxWidth: '500px' }}>
                   <div style={{ width: '80px', height: '80px', background: 'var(--lesson-success)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                     <CheckCircle2 size={56} strokeWidth={2.5} />
                   </div>
                   <h2 style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--lesson-primary)', margin: '0 0 1rem 0' }}>CASE SOLVED!</h2>
                   <p style={{ fontSize: '1.25rem', color: 'var(--lesson-secondary)', margin: '0 0 2rem 0', lineHeight: '1.5', fontWeight: '700' }}>
                    <W i={0}>Excellent</W> <W i={1}>work!</W> <W i={2}>You</W> <W i={3}>discovered</W> <W i={4}>what</W> <W i={5}>all</W> <W i={6}>the</W> <W i={7}>everyday</W> <W i={8}>objects</W> <W i={9}>are</W> <W i={10}>made</W> <W i={11}>of.</W> <W i={12}>Objects</W> <W i={13}>are</W> <W i={14}>made</W> <W i={15}>from</W> <W i={16}>materials!</W>
                   </p>
                 <button onClick={() => { addXp(30); onComplete(); }} style={{ background: 'var(--lesson-accent)', color: 'white', padding: '16px 40px', fontSize: '1.3rem', fontWeight: '900', borderRadius: '16px', border: 'none', cursor: 'pointer', boxShadow: '0 8px 20px rgba(60,36,21,0.4)' }}>
                   PROCEED TO LAB &rarr;
                 </button>
                 </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: CASE FILE */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, minWidth: 0 }}>
          <audio ref={audioRef} src={viewState === 'completed' ? fpage14popupAudio : fpage14Audio} onTimeUpdate={handleTimeUpdate} onEnded={handleAudioEnded} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--lesson-card)', border: '2px solid var(--lesson-border)', borderRadius: '0px', overflow: 'hidden', boxShadow: '0 8px 25px rgba(0,0,0,0.04)' }}>
            
            {/* Header */}
            <div style={{ padding: '24px 24px 16px 24px' }}>
              <h3 style={{ margin: 0, fontSize: '1.9rem', fontWeight: '900', color: 'var(--heading-main)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Folder size={32} fill="var(--lesson-primary)" /> CASE FILE
              </h3>
            </div>
            
            <p style={{ margin: '0 24px', fontSize: '1.3rem', color: 'var(--lesson-secondary)', fontWeight: '600', lineHeight: '1.4' }}>
              <W i={7}>Move</W> <W i={8}>the</W> <W i={9}>magnifying</W> <W i={10}>glass</W> <W i={11}>around</W> <W i={12}>the</W> <W i={13}>classroom</W> <W i={14}>to</W> <W i={15}>find</W> <W i={16}>objects</W> <W i={17}>and</W> <W i={18}>identify</W> <W i={19}>their</W> <W i={20}>materials.</W>
            </p>

            <div style={{ margin: '16px 24px', background: '#F9F4EB', borderRadius: '16px', padding: '20px', border: '2px dashed #E8DCC8', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Search size={48} color="#3B2A1F" strokeWidth={2.5} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#3B2A1F', lineHeight: '1' }}>
                    {discovered.length} / {CLASSROOM_OBJECTS.length}
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#7A6A52', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    clues discovered
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', width: '100%', gap: '4px', height: '12px', marginTop: '8px' }}>
                {CLASSROOM_OBJECTS.map((_, i) => (
                  <div key={i} style={{ flex: 1, borderRadius: '6px', background: i < discovered.length ? 'var(--lesson-success)' : '#E8DCC8' }} />
                ))}
              </div>
            </div>

            <div style={{ padding: '0 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', overflow: 'hidden' }}>
              <h4 style={{ margin: '0', fontSize: '1.4rem', fontWeight: '900', color: '#3B2A1F', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{color: "#3B2A1F"}}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                DISCOVERED CLUES
              </h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', paddingBottom: '16px' }}>
                {CLASSROOM_OBJECTS.map((obj, i) => {
                  const isFound = discovered.includes(obj.id);
                  
                  if (isFound) {
                    return (
                      <div key={i} style={{ background: '#F9F4EB', border: '2px solid #E8DCC8', borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                        <div style={{ width: '100%', height: '60px', borderRadius: '8px', overflow: 'hidden', marginBottom: '8px', background: '#E8DCC8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <img src={obj.image} alt={obj.name} style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                        </div>
                        <div style={{ fontSize: '1rem', fontWeight: '800', color: '#3B2A1F', textAlign: 'center' }}>{obj.material}</div>
                        <div style={{ position: 'absolute', top: '-6px', right: '-6px', background: 'var(--lesson-success)', color: 'white', borderRadius: '50%', padding: '4px', display: 'flex' }}>
                          <Check size={16} strokeWidth={4} />
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div key={i} style={{ background: '#F9F4EB', border: '2px solid #E8DCC8', borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '90px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px dashed #D9C9A3', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D9C9A3', fontSize: '1.5rem', fontWeight: '900' }}>
                          ?
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>

            {viewState === 'zoom' ? (
              <div style={{ padding: '12px 24px', background: '#FFFFFF', borderTop: '2px solid var(--lesson-border)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button onClick={returnToClassroom} className={isPopActive ? "attention-btn-pulse" : ""} style={{ 
                   width: '100%', padding: '12px', background: '#A64B27', color: '#FFFFFF', border: '2px solid var(--lesson-primary)', fontSize: '1.5rem', fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', borderRadius: '16px', cursor: 'pointer', 
                   boxShadow: '0 6px 16px rgba(0,0,0,0.05)',
                   transition: 'all 0.3s ease-in-out'
                 }}>
                   {isPopActive ? '✨ RETURN TO CLASSROOM' : 'RETURN TO CLASSROOM'}
                 <ChevronRight size={28} />
                 </button>
              </div>
            ) : (
              <div style={{ margin: '16px 24px', background: '#F9F4EB', borderRadius: '16px', padding: '16px', border: '2px solid #E8DCC8', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Lightbulb size={32} color="#D9A05B" fill="#FDE68A" />
                <p style={{ margin: 0, fontSize: '1.1rem', color: '#3B2A1F', fontWeight: '600', lineHeight: '1.4' }}>
                  Look carefully at different objects.<br/>They are made of different materials!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
