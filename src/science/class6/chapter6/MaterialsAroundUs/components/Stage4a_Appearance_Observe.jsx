import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, FlashlightOff } from "lucide-react";

import paperImg      from "../../../../../assets/paper image.webp";
import cardboardImg  from "../../../../../assets/cardboard image.jpg";
import woodImg       from "../../../../../assets/wood image.webp";
import copperWireImg from "../../../../../assets/copperwire image.webp";
import aluminiumImg  from "../../../../../assets/aluminiumrod image.webp";
import steelSpoonImg from "../../../../../assets/steelspoon image.webp";

// WhichSide Activity specific imports
import glassMarbleImg from "../../../../../assets/glassmarble image.jpg";
import goldCoinImg    from "../../../../../assets/goldcoin image.jpg";
import plasticRulerImg from "../../../../../assets/plasticruler image.jpg";
import rubberBandImg  from "../../../../../assets/rubberband image.webp";
import cdImg          from "../../../../../assets/cd image.jpg";
import pencilImg      from "../../../../../assets/pencil image.jpg";

const MATERIALS = [
  { id: "paper",     name: "Paper",         img: paperImg,      isShiny: false,
    shineFact: "Paper has a rough, fibrous surface that scatters light in all directions — no clear reflection." },
  { id: "cardboard", name: "Cardboard",     img: cardboardImg,  isShiny: false,
    shineFact: "Cardboard is coarse and uneven. Light scatters off it without forming a sharp reflection." },
  { id: "wood",      name: "Wood",          img: woodImg,       isShiny: false,
    shineFact: "Wood has a rough, porous surface. It absorbs and diffuses light rather than reflecting it clearly." },
  { id: "copper",    name: "Copper Wire",   img: copperWireImg, isShiny: true,
    shineFact: "Copper is a metal with a smooth surface. It reflects light sharply, producing a clear bright spot." },
  { id: "aluminium", name: "Aluminium Rod", img: aluminiumImg,  isShiny: true,
    shineFact: "Aluminium is a lustrous metal. Its polished surface reflects light strongly and clearly." },
  { id: "steel",     name: "Steel Spoon",   img: steelSpoonImg, isShiny: true,
    shineFact: "Stainless steel has a very smooth metallic surface that reflects light clearly — it is lustrous." },
];

// const SHINY_IDS = new Set(MATERIALS.filter(m => m.isShiny).map(m => m.id));

const WHICH_SIDE_MATERIALS = [
  { id: "cd", name: "CD", img: cdImg, isShiny: true },
  { id: "goldcoin", name: "Gold Coin", img: goldCoinImg, isShiny: true },
  { id: "rubberband", name: "Rubber Band", img: rubberBandImg, isShiny: false },
  { id: "glassmarble", name: "Glass Marble", img: glassMarbleImg, isShiny: true },
  { id: "pencil", name: "Pencil", img: pencilImg, isShiny: false },
  { id: "plasticruler", name: "Plastic Ruler", img: plasticRulerImg, isShiny: false },
];

const WHICH_SIDE_SHINY_IDS = new Set(WHICH_SIDE_MATERIALS.filter(m => m.isShiny).map(m => m.id));
// ── Torch observation modal ────────────────────────────────────────────────────
const TorchObservation = ({ mat, onDone, onCancel }) => {
  const [torchOn, setTorchOn] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayHint, setOverlayHint] = useState(null);

  const [showCorrect, setShowCorrect] = useState(false);

  useEffect(() => {
    let timer;
    if (torchOn) {
      timer = setTimeout(() => setShowOverlay(true), 3000);
    } else {
      setShowOverlay(false);
      setOverlayHint(null);
      setShowCorrect(false);
    }
    return () => clearTimeout(timer);
  }, [torchOn]);

  const handleToggle = (isOn) => {
    setTorchOn(isOn);
  };

  const handleAnswer = (answer) => {
    const isCorrect = answer === (mat.isShiny ? "shiny" : "dull");
    if (isCorrect) {
      setOverlayHint(null);
      setShowCorrect(true);
      setTimeout(() => {
        setShowCorrect(false);
        setShowOverlay(false);
        onDone(answer);
      }, 1500);
    } else {
      setOverlayHint("Hint: Look closely. Is there a clear reflection?");
    }
  };

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      borderRadius: 16, overflow: "hidden",
      background: '#3e2c1e',
      border: "1px solid #6b5c51",
      boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
      position: 'relative'
    }}>
      {/* Header */}
      <div style={{
        padding: "0.8rem 1.5rem",
        background: "#2c1e14",
        borderBottom: "1px solid #4a3525",
        display: "flex", alignItems: "center", gap: 16, flexShrink: 0,
        position: 'relative'
      }}>
        <span style={{ fontSize: "2rem" }}>🔦</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#d1a25a", letterSpacing: "0.5px" }}>
            Investigating: {mat.name}
          </div>
        </div>
        <button onClick={onCancel} style={{
          background: '#4a3525', border: '4px solid #fdfbf7',
          borderRadius: '50%', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fdfbf7', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
          flexShrink: 0
        }} onMouseOver={(e) => { e.currentTarget.style.background = '#6b5c51'; e.currentTarget.style.transform = 'scale(1.1)'; }} 
           onMouseOut={(e) => { e.currentTarget.style.background = '#4a3525'; e.currentTarget.style.transform = 'scale(1)'; }}>
          <X size={48} strokeWidth={4} />
        </button>
      </div>

      <div style={{ flex: 1, display: "flex", overflow: "hidden", position: "relative" }}>
        
        {/* Left: Investigation Area */}
        <div style={{ width: "70%", position: "relative", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem", flexShrink: 0 }}>
          
          <div style={{
            position: "relative", flex: 1, width: "100%", minHeight: 0,
            borderRadius: 12, overflow: "hidden",
            boxShadow: "0 4px 24px rgba(0,0,0,0.6)",
            background: "#ffffff",
            display: "flex", justifyContent: "center", alignItems: "center",
            transition: "background 0.3s"
          }}>
            <img src={mat.img} alt={mat.name} draggable="false" style={{
              width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "multiply",
              filter: (torchOn && mat.isShiny) ? "brightness(1.05) contrast(1.05)" : "brightness(0.95) contrast(1.02)",
              transition: "filter 0.3s",
            }} />

            {/* Torch Head & Light Beams */}
            <div style={{
              position: "absolute", top: 0, left: "50%",
              transform: "translateX(-50%)",
              display: "flex", flexDirection: "column", alignItems: "center",
              zIndex: 20,
              filter: torchOn
                ? "drop-shadow(0 4px 8px rgba(253, 230, 138, 0.4))"
                : "drop-shadow(0 2px 6px rgba(0,0,0,0.7))",
              transition: "filter 0.2s",
            }}>
              <div style={{ width: 24, height: 35, background: "linear-gradient(to right, #e2d9c8, #8a6545, #e2d9c8)", borderBottom: "2px solid #4a3525" }} />
              <div style={{ width: 48, height: 24, background: "linear-gradient(to right, #8a6545, #4a3525, #8a6545)", clipPath: "polygon(25% 0, 75% 0, 100% 100%, 0 100%)", borderBottom: torchOn ? "4px solid #fde047" : "4px solid #2c1e14" }} />
            </div>

            {torchOn && (
              <div style={{
                position: "absolute", top: 59, left: "50%",
                width: "100%", height: "calc(100% - 59px)", transform: "translateX(-50%)",
                background: "linear-gradient(to bottom, rgba(250, 204, 21, 0.25) 0%, rgba(250, 204, 21, 0.05) 40%, transparent 100%)",
                pointerEvents: "none", clipPath: "polygon(44% 0%, 56% 0%, 90% 100%, 10% 100%)", zIndex: 10,
              }} />
            )}

            {torchOn && mat.isShiny && (
              <>
                <div style={{
                  position: "absolute", top: "50%", left: "50%", width: "15%", paddingBottom: "15%", borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,230,0.3) 40%, transparent 70%)",
                  transform: "translate(-50%,-50%)", filter: "blur(2px)", pointerEvents: "none", zIndex: 15,
                }} />
                <motion.div animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.15, 0.95] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }} style={{ position: "absolute", top: "35%", left: "35%", width: "32px", height: "32px", color: "#fbbf24", filter: "drop-shadow(0 0 8px rgba(251,191,36,0.8))", zIndex: 35, pointerEvents: "none", transform: "translate(-50%, -50%)" }}>
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C12 0 12 10.5 24 12C12 13.5 12 24 12 24C12 24 12 13.5 0 12C12 10.5 12 0 12 0Z" /></svg>
                </motion.div>
                <motion.div animate={{ opacity: [0.5, 0.9, 0.5], scale: [0.9, 1.1, 0.9] }} transition={{ repeat: Infinity, duration: 2.1, ease: "easeInOut", delay: 0.7 }} style={{ position: "absolute", top: "60%", left: "55%", width: "24px", height: "24px", color: "#fbbf24", filter: "drop-shadow(0 0 6px rgba(251,191,36,0.7))", zIndex: 35, pointerEvents: "none", transform: "translate(-50%, -50%)" }}>
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C12 0 12 10.5 24 12C12 13.5 12 24 12 24C12 24 12 13.5 0 12C12 10.5 12 0 12 0Z" /></svg>
                </motion.div>
                <motion.div animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.9, 1.1, 0.9] }} transition={{ repeat: Infinity, duration: 1.7, ease: "easeInOut", delay: 1.2 }} style={{ position: "absolute", top: "45%", left: "70%", width: "16px", height: "16px", color: "#fbbf24", filter: "drop-shadow(0 0 4px rgba(251,191,36,0.6))", zIndex: 35, pointerEvents: "none", transform: "translate(-50%, -50%)" }}>
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C12 0 12 10.5 24 12C12 13.5 12 24 12 24C12 24 12 13.5 0 12C12 10.5 12 0 12 0Z" /></svg>
                </motion.div>
              </>
            )}
            
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "10px 16px",
              background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
              fontSize: "1.5rem", fontWeight: 900, color: "#fdfbf7", letterSpacing: "1px",
              zIndex: 20,
            }}>
              {mat.name}
            </div>

            {/* Observation Overlay */}
            <AnimatePresence>
              {showOverlay && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  style={{
                    position: "absolute", inset: 0, zIndex: 60,
                    background: "rgba(44, 30, 20, 0.75)", backdropFilter: "blur(4px)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <div style={{
                    background: "#fdfbf7", padding: "2rem 3rem", borderRadius: 16,
                    border: "3px solid #d1a25a", boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem"
                  }}>
                    <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#8a6545" }}>{mat.name}</div>
                    <div style={{ fontSize: "2.1rem", fontWeight: 900, color: "#4a3525", marginBottom: 12 }}>What did you observe?</div>
                    
                    {showCorrect ? (
                      <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#16a34a", padding: "1.25rem", textAlign: "center", width: "100%", background: "#dcfce7", borderRadius: 10, border: "2px solid #22c55e" }}>
                        ✓ Correct!
                      </div>
                    ) : (
                      <div style={{ display: "flex", gap: "1.25rem", width: "100%" }}>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                          onClick={() => handleAnswer("shiny")}
                          style={{
                            flex: 1, padding: "1rem", borderRadius: 10,
                            background: "#4a3525", color: "#fdfbf7",
                            fontWeight: 900, fontSize: "1.6rem", cursor: "pointer",
                            border: "2px solid #6b5c51",
                          }}>
                          ✨ Shiny
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                          onClick={() => handleAnswer("dull")}
                          style={{
                            flex: 1, padding: "1rem", borderRadius: 10,
                            background: "#4a3525", color: "#fdfbf7",
                            fontWeight: 900, fontSize: "1.6rem", cursor: "pointer",
                            border: "2px solid #6b5c51",
                          }}>
                          ◇ Dull
                        </motion.button>
                      </div>
                    )}
                    {overlayHint && (
                      <div style={{ color: "#dc2626", fontWeight: 700, fontSize: "1.1rem", marginTop: 8 }}>
                        {overlayHint}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* Right: Controls Panel */}
        <div style={{
          width: "30%", padding: "1.25rem", borderLeft: "1px solid #4a3525",
          background: "transparent", display: "flex", flexDirection: "column", gap: "0.85rem", overflow: "hidden", flexShrink: 0
        }}>
          
          <div style={{
            background: "#8a6545", borderRadius: 12,
            padding: "0.85rem", border: "1px solid #a0744e",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)", flexShrink: 0
          }}>
            <div style={{ fontSize: "2.1rem", color: "#fdfbf7", marginBottom: "0.5rem", fontWeight: 900 }}>
              Observation
            </div>
            <div style={{ fontSize: "1.4rem", color: "#fdfbf7", lineHeight: 1.3, marginBottom: "0.75rem" }}>
              Turn the torch ON and OFF and observe what happens to the light.
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <button
                onClick={() => handleToggle(true)}
                style={{
                  padding: "0.85rem", borderRadius: 8,
                  background: "#4a3525",
                  color: "#fdfbf7", border: torchOn ? "3px solid #d1a25a" : "3px solid #6b5c51",
                  fontSize: "1.65rem", fontWeight: 900, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "all 0.2s",
                  boxShadow: torchOn ? "0 0 16px rgba(209,162,90,0.5)" : "none"
                }}
              >
                🔦 TORCH ON
              </button>
              <button
                onClick={() => handleToggle(false)}
                style={{
                  padding: "0.85rem", borderRadius: 8,
                  background: "#4a3525",
                  color: "#fdfbf7", border: !torchOn ? "3px solid #d1a25a" : "3px solid #6b5c51",
                  fontSize: "1.65rem", fontWeight: 900, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "all 0.2s",
                  boxShadow: !torchOn ? "0 0 16px rgba(209,162,90,0.5)" : "none"
                }}
              >
                <FlashlightOff size={22} /> TORCH OFF
              </button>
            </div>
          </div>

          <div style={{
            background: "#f0e8d9", borderRadius: 12, padding: "1.5rem",
            border: "1px solid #d1a25a", flex: 1,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}>
            <div style={{ fontWeight: 900, color: "#8a6545", marginBottom: "1rem", fontSize: "2.35rem" }}>Watch for:</div>
            <ul style={{ margin: 0, paddingLeft: "2.5rem", display: "flex", flexDirection: "column", gap: "12px", color: "#4a3525", fontWeight: 700, fontSize: "1.9rem", lineHeight: 1.4 }}>
              <li>Does a bright spot appear?</li>
              <li>Is the reflection clear or soft?</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Material card in grid ─────────────────────────────────────────────────────
const MaterialCard = ({ mat, state, onClick }) => {
  const isActive = state === "active";
  const isDone   = state === "done";
  return (
    <motion.div
      layout
      onClick={() => !isDone && onClick(mat.id)}
      whileHover={!isDone ? { scale: 1.04, y: -3 } : {}}
      whileTap={!isDone ? { scale: 0.97 } : {}}
      style={{
        position: "relative", borderRadius: 14, overflow: "hidden",
        display: "flex", flexDirection: "column", height: "100%",
        cursor: isDone ? "default" : "pointer",
        border: isActive ? "3px solid #d1a25a"
               : isDone ? "3px solid " + (mat.isShiny ? "#d1a25a" : "#a0744e")
               : "3px solid #e2d9c8",
        transition: "border 0.25s", background: '#fdfbf7',
        boxShadow: isActive
          ? "0 0 0 4px rgba(209,162,90,0.25), 0 8px 24px rgba(0,0,0,0.3)"
          : "0 4px 16px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ position: "relative", flex: 1, minHeight: 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", padding: "0", background: "transparent" }}>
        <img src={mat.img} alt={mat.name} draggable="false" style={{
          width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "multiply",
          objectPosition: "center", display: "block",
          transform: (mat.id === "paper" || mat.id === "steel") ? "scale(1.15)" : "scale(1.4)", transformOrigin: "center",
          filter: isDone && mat.isShiny
            ? "brightness(1.15) contrast(1.08) saturate(1.1)"
            : isDone ? "brightness(0.88) contrast(1.05)"
            : "brightness(0.9) contrast(1.05)",
          transition: "filter 0.4s ease",
        }} />
        {isDone && (
          <div style={{
            position: "absolute", top: 12, right: 12,
            background: mat.isShiny ? "rgba(209,162,90,0.95)" : "rgba(138,101,69,0.95)",
            borderRadius: 24, padding: "6px 16px",
            fontSize: "1.35rem", fontWeight: 900, color: "#fdfbf7",
            display: "flex", alignItems: "center", gap: 6, backdropFilter: "blur(4px)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
          }}>
            {mat.isShiny ? "✨ Shiny" : "🪨 Dull"}
          </div>
        )}
        {isActive && (
          <motion.div
            animate={{ opacity: [0.7, 0, 0.7], scale: [1, 1.06, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            style={{
              position: "absolute", inset: 0, borderRadius: 12,
              border: "3px solid #d1a25a", pointerEvents: "none",
            }}
          />
        )}
        {!isDone && !isActive && (
          <div style={{
            position: "absolute", inset: 0, borderRadius: 12,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(74,53,37,0.3)",
            opacity: 0, transition: "opacity 0.2s",
          }} className="hover-show">
            <span style={{ fontSize: "2.5rem" }}>🔦</span>
          </div>
        )}
      </div>
      <div style={{
        textAlign: "center", padding: "12px 6px 16px",
        fontSize: "1.5rem", fontWeight: 900,
        color: isDone ? (mat.isShiny ? "#8a6545" : "#6b5c51") : "#4a3525",
      }}>
        {mat.name}
      </div>
    </motion.div>
  );
};

// ── Which Side Activity (Drag & Drop) ───────────────────────────────────────
const WhichSideActivity = ({ onSolve }) => {
  const [unplaced, setUnplaced] = useState(WHICH_SIDE_MATERIALS.map(m => m.id));
  const [shinyGroup, setShinyGroup] = useState([]);
  const [dullGroup, setDullGroup] = useState([]);
  const [errorIds, setErrorIds] = useState(new Set());
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("mat_id", id);
  };

  const handleDrop = (e, zone) => {
    e.preventDefault();
    if (isSuccess) return;
    const id = e.dataTransfer.getData("mat_id");
    if (!id) return;
    
    setUnplaced(prev => prev.filter(x => x !== id));
    setShinyGroup(prev => prev.filter(x => x !== id));
    setDullGroup(prev => prev.filter(x => x !== id));

    if (zone === "unplaced") setUnplaced(prev => [...prev, id]);
    if (zone === "shiny") setShinyGroup(prev => [...prev, id]);
    if (zone === "dull") setDullGroup(prev => [...prev, id]);
    
    setErrorIds(prev => {
      const n = new Set(prev);
      n.delete(id);
      return n;
    });
  };

  const handleDragOver = (e) => e.preventDefault();

  useEffect(() => {
    if (unplaced.length === 0 && shinyGroup.length + dullGroup.length === WHICH_SIDE_MATERIALS.length) {
      const errors = new Set();
      shinyGroup.forEach(id => {
        if (!WHICH_SIDE_SHINY_IDS.has(id)) errors.add(id);
      });
      dullGroup.forEach(id => {
        if (WHICH_SIDE_SHINY_IDS.has(id)) errors.add(id);
      });
      
      if (errors.size === 0) {
        setIsSuccess(true);
        setTimeout(onSolve, 2000);
      } else {
        setErrorIds(errors);
      }
    }
  }, [unplaced.length, shinyGroup.length, dullGroup.length, onSolve, dullGroup, shinyGroup]);

  const renderCard = (id) => {
    const mat = WHICH_SIDE_MATERIALS.find(m => m.id === id);
    if (!mat) return null;
    const isError = errorIds.has(id);
    return (
      <motion.div
        key={id}
        draggable={!isSuccess}
        onDragStart={(e) => handleDragStart(e, id)}
        whileHover={!isSuccess ? { scale: 1.05 } : {}}
        whileTap={!isSuccess ? { scale: 0.95 } : {}}
        style={{
          width: 130, height: 135,
          background: "white", borderRadius: 12,
          border: isError ? "2px solid var(--lesson-danger)" : "1px solid var(--lesson-border)",
          boxShadow: isError ? "0 0 8px rgba(239,68,68,0.5)" : "0 4px 6px rgba(0,0,0,0.05)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 12, cursor: isSuccess ? "default" : "grab",
          backgroundColor: isError ? "var(--lesson-danger-bg)" : "white",
        }}
      >
        <div style={{ flex: 1, width: "100%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 8 }}>
          <img src={mat.img} alt={mat.name} draggable="false" style={{ width: "90%", height: "90%", objectFit: "contain", mixBlendMode: "multiply", transform: "scale(1.2)" }} />
        </div>
        <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#4a3525", textAlign: "center", lineHeight: 1.1, paddingBottom: 8 }}>{mat.name}</div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      style={{
        background: "white", borderRadius: 20, padding: "2.25rem 3rem",
        width: 940, maxWidth: "95vw",
        boxShadow: "0 24px 48px rgba(0,0,0,0.3)",
        display: "flex", flexDirection: "column", gap: "1.75rem",
        fontFamily: "'Inter', sans-serif"
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h2 style={{ margin: 0, fontSize: "2.5rem", fontWeight: 900, color: "#4a3525", fontFamily: "'Merriweather', 'Georgia', serif" }}>
          Which Side?
        </h2>
        <p style={{ margin: "8px 0 0", fontSize: "1.5rem", fontWeight: 700, color: "#6b5c51", whiteSpace: "nowrap" }}>
          Drag each object to the side where it belongs.
        </p>
      </div>

      <div
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, "unplaced")}
        style={{
          minHeight: 140, display: "flex", flexWrap: "nowrap", justifyContent: "center", gap: "1rem",
          padding: "1rem", borderRadius: 12, background: "rgba(0,0,0,0.02)"
        }}
      >
        {unplaced.map(renderCard)}
      </div>

      <div style={{ display: "flex", gap: "1.5rem" }}>
        <div
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "shiny")}
          style={{
            flex: 1, minHeight: 230, borderRadius: 16,
            border: "2px dashed #facc15", background: "rgba(250,204,21,0.05)",
            padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem",
            alignItems: "center"
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#A64B27", letterSpacing: "1px" }}>✨ SHINY</div>
            <div style={{ fontSize: "1rem", fontWeight: 600, color: "#A64B27", marginTop: 4 }}>Lustrous materials</div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem", width: "100%" }}>
            {shinyGroup.map(renderCard)}
          </div>
        </div>

        <div
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "dull")}
          style={{
            flex: 1, minHeight: 230, borderRadius: 16,
            border: "2px dashed #facc15", background: "rgba(250,204,21,0.05)",
            padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem",
            alignItems: "center"
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#A64B27", letterSpacing: "1px" }}>◈ DULL</div>
            <div style={{ fontSize: "1rem", fontWeight: 600, color: "#A64B27", marginTop: 4 }}>Non-lustrous materials</div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem", width: "100%" }}>
            {dullGroup.map(renderCard)}
          </div>
        </div>
      </div>
      
      {isSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", color: "#A64B27", fontWeight: 900, fontSize: "1.2rem" }}
        >
          🎉 Excellent! You classified them perfectly.
        </motion.div>
      )}
    </motion.div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
export default function Stage4a_Appearance_Observe({ onComplete, addXp }) {
  const [observations, setObservations]     = useState({});
  const [activeMat, setActiveMat]           = useState(null);
  const [challengeSolved, setChallengeSolved] = useState(false);

  const doneCount = Object.keys(observations).length;
  const allDone   = doneCount === MATERIALS.length;

  const handleCardClick = (id) => {
    if (observations[id]) return;
    setActiveMat(id);
  };

  const handleObservationDone = (answer) => {
    setObservations(prev => ({
      ...prev,
      [activeMat]: { result: answer, answer },
    }));
    setActiveMat(null);
  };

  const handleChallengeSolved = () => {
    setChallengeSolved(true);
    addXp(60);
    setTimeout(onComplete, 1200);
  };

  // const handleReset = () => {
  //   setObservations({});
  //   setActiveMat(null);
  //   setChallengeSolved(false);
  // };

  const mats = MATERIALS.map(m => ({ ...m }));
  const activeMaterial = mats.find(m => m.id === activeMat);
  const showChallengePanel = allDone && !challengeSolved;

  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: "0.6rem",
      width: "100%", height: "100%", overflow: "hidden",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      position: "relative",
    }}>
      {/* Title */}
      <div className="glass-panel" style={{
        padding: "0.85rem 1.25rem",
        border: "2px solid #e2d9c8",
        background: "#fdfbf7",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
        borderRadius: "14px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
      }}>
        <div>
          <h3 style={{ margin: 0, fontSize: "1.6rem", color: '#4a3525', fontWeight: 900 }}>
            🔦 Shine Hunt – Torch Observation Lab
          </h3>
          <p style={{ margin: "4px 0 0", fontSize: "1.1rem", color: "#8a6545", fontWeight: 700 }}>
            Shine the torch on each object and observe what happens to the light.
          </p>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "flex", gap: "0.6rem", flex: 1, minHeight: 0, overflow: "hidden" }}>

        {/* Scene area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem", minWidth: 0, overflow: "hidden", position: "relative" }}>

            <>
              <div style={{
                background: "#f0e8d9",
                border: "2px solid #e2d9c8", borderRadius: 10,
                padding: "0.65rem 1rem", fontSize: "1.4rem",
                color: "#4a3525", fontWeight: 800, flexShrink: 0,
              }}>
                🔦 Click any material to open the torch observation.{doneCount > 0 ? "  (" + doneCount + "/6 done)" : ""}
              </div>

              <div style={{
                flex: 1, minHeight: 0, overflow: "hidden",
                display: activeMat ? "none" : "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridTemplateRows: "repeat(2, 1fr)",
                gap: "0.65rem",
              }}>
                {mats.map(mat => {
                  const state = observations[mat.id] ? "done" : activeMat === mat.id ? "active" : "idle";
                  return <MaterialCard key={mat.id} mat={mat} state={state} onClick={handleCardClick} />;
                })}
              </div>

              {/* Torch observation inline replacing grid */}
              <AnimatePresence>
                {activeMat && activeMaterial && (
                  <motion.div
                    key={"torch-" + activeMat}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    style={{ position: "absolute", inset: 0, zIndex: 30 }}
                  >
                    <TorchObservation mat={activeMaterial} onDone={handleObservationDone} onCancel={() => setActiveMat(null)} />
                  </motion.div>
                )}
              </AnimatePresence>
            </>
        </div>

        {/* Detective Board */}
        {!activeMat && (
          <div className="glass-panel" style={{
            width: 340, flexShrink: 0,
            display: "flex", flexDirection: "column",
            padding: "1rem", overflow: "hidden",
            background: "#fdfbf7",
          border: "2px solid #e2d9c8",
          borderRadius: "16px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)"
        }}>
          <div style={{
            fontWeight: 900, fontSize: "1.6rem", color: "#4a3525",
            borderBottom: "2px solid #e2d9c8",
            paddingBottom: "0.25rem", marginBottom: "0.5rem",
          }}>
            🔎 Shine Detective
          </div>
          <div style={{ 
            display: "flex", flexDirection: "column", flex: 1, overflow: "hidden",
            background: "#f0e8d9", borderRadius: 14, border: "1px solid #d1a25a", padding: "0.25rem"
          }}>
            {MATERIALS.map(mat => {
              const obs = observations[mat.id];
              return (
                <div key={mat.id} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "8px 12px",
                  borderBottom: "1px solid rgba(138,101,69,0.2)",
                  transition: "all 0.3s",
                }}>
                  <img src={mat.img} alt={mat.name} draggable="false"
                    style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 8, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <div style={{ fontSize: "1.45rem", fontWeight: 900, color: "#4a3525", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {mat.name}
                    </div>
                    <div style={{ fontSize: "1.25rem", marginTop: 2 }}>
                      {obs ? (
                        <span style={{ color: "#8a6545", fontWeight: 800 }}>
                          {obs.result === "shiny" ? "✨ Shiny" : "🪨 Dull"}
                        </span>
                      ) : (
                        <span style={{ color: "#8a7b6f", fontWeight: 700 }}>? Not observed</span>
                      )}
                    </div>
                  </div>
                  {obs && <Check size={24} color="#d1a25a" />}
                </div>
              );
            })}
          </div>

          {/* Shine Record */}
          <div style={{
            marginTop: "0.5rem", padding: "0.75rem 1.25rem",
            background: "#4a3525", borderRadius: 14,
            border: "2px solid #6b5c51",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
          }}>
            <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#fdfbf7", marginBottom: "0.4rem" }}>
              Shine Record
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.25rem", color: "#d1a25a", fontWeight: 800 }}>
                <span>✨ Shiny Objects</span>
                <span>{Object.values(observations).filter(o => o.result === "shiny").length} / 6</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.25rem", color: "#e2d9c8", fontWeight: 800 }}>
                <span>◇ Dull Objects</span>
                <span>{Object.values(observations).filter(o => o.result === "dull").length} / 6</span>
              </div>
            </div>
          </div>

          {allDone && !challengeSolved && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              style={{
                marginTop: "0.85rem",
                background: "rgba(209,162,90,0.18)", border: "1px solid rgba(209,162,90,0.4)",
                borderRadius: 12, padding: "0.85rem",
                fontSize: "1.1rem", color: "#8a6545", fontWeight: 800, lineHeight: 1.4, textAlign: "center",
              }}>
              🎯 All observed!<br/>
              <span style={{ color: "#d1a25a" }}>Final challenge →</span>
            </motion.div>
          )}
          {challengeSolved && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{
                marginTop: "0.85rem",
                background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.4)",
                borderRadius: 12, padding: "0.85rem",
                fontSize: "1.2rem", color: "var(--lesson-success-border)", fontWeight: 800, textAlign: "center",
              }}>
              🎉 Case Solved!
            </motion.div>
          )}
        </div>
        )}
      </div>
      
      {/* Modal Overlay for Which Side Activity */}
      <AnimatePresence>
        {showChallengePanel && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: "absolute", inset: 0, zIndex: 100,
              background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)",
              display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem"
            }}
          >
            <WhichSideActivity onSolve={handleChallengeSolved} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

TorchObservation.propTypes = {
  mat: PropTypes.object.isRequired,
  onDone: PropTypes.func.isRequired
};

MaterialCard.propTypes = {
  mat: PropTypes.object.isRequired,
  state: PropTypes.string,
  onClick: PropTypes.func
};

WhichSideActivity.propTypes = {
  onSolve: PropTypes.func.isRequired
};

Stage4a_Appearance_Observe.propTypes = {
  onComplete: PropTypes.func.isRequired,
  addXp: PropTypes.func
};
