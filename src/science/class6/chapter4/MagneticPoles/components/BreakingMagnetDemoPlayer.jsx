import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Pause, RotateCcw, Volume2, VolumeX,
  Maximize2, Minimize2, Repeat, Sparkles, Layers
} from "lucide-react";

const PHASES = [
  { id: "whole",   label: "Whole Magnet",    duration: 3.5 },
  { id: "break",   label: "Break & Split",   duration: 3.5 },
  { id: "dipoles", label: "Dipole Formation",duration: 5.0 },
];
const TOTAL_DURATION = PHASES.reduce((s, p) => s + p.duration, 0);

function lerp(a, b, t) { return a + (b - a) * t; }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function easeInOut(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }

function roundRect(ctx, x, y, w, h, r) {
  if (typeof r === "number") r = { tl: r, tr: r, br: r, bl: r };
  const { tl = 0, tr = 0, br = 0, bl = 0 } = r;
  ctx.beginPath();
  ctx.moveTo(x + tl, y);
  ctx.lineTo(x + w - tr, y);
  ctx.arcTo(x + w, y, x + w, y + tr, tr);
  ctx.lineTo(x + w, y + h - br);
  ctx.arcTo(x + w, y + h, x + w - br, y + h, br);
  ctx.lineTo(x + bl, y + h);
  ctx.arcTo(x, y + h, x, y + h - bl, bl);
  ctx.lineTo(x, y + tl);
  ctx.arcTo(x, y, x + tl, y, tl);
  ctx.closePath();
}

function blendColors(a, b, t) {
  const parse = (hex) => [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
  const [ar, ag, ab2] = parse(a);
  const [br, bg, bb] = parse(b);
  return `rgb(${Math.round(lerp(ar, br, t))},${Math.round(lerp(ag, bg, t))},${Math.round(lerp(ab2, bb, t))})`;
}

function drawFieldLoops(ctx, cx, cy, hw, hh, color, alpha, count) {
  if (alpha <= 0.01) return;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.6;
  for (let i = 0; i < count; i++) {
    const scaleX = lerp(0.9, 2.6, i / Math.max(count - 1, 1));
    const scaleY = lerp(0.8, 1.9, i / Math.max(count - 1, 1));
    const op = lerp(0.9, 0.22, i / Math.max(count - 1, 1));
    ctx.save();
    ctx.globalAlpha = alpha * op;
    ctx.beginPath();
    ctx.ellipse(cx, cy, hw * scaleX, hh * scaleY, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}

function drawFullMagnet(ctx, cx, cy, w, h) {
  const r = h * 0.18;
  const RED = "#DC2626", BLUE = "#2563EB", DARK = "#1E293B";
  const x = cx - w / 2, y = cy - h / 2, hw = w / 2;

  ctx.save(); roundRect(ctx, x, y, hw, h, { tl: r, tr: 0, br: 0, bl: r });
  ctx.fillStyle = RED; ctx.fill(); ctx.strokeStyle = DARK; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore();

  ctx.save(); roundRect(ctx, x + hw, y, hw, h, { tl: 0, tr: r, br: r, bl: 0 });
  ctx.fillStyle = BLUE; ctx.fill(); ctx.strokeStyle = DARK; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore();

  ctx.save(); roundRect(ctx, x, y, w, h, r);
  const sheen = ctx.createLinearGradient(x, y, x, y + h);
  sheen.addColorStop(0, "rgba(255,255,255,0.22)"); sheen.addColorStop(0.45, "rgba(255,255,255,0.05)"); sheen.addColorStop(1, "rgba(0,0,0,0.12)");
  ctx.fillStyle = sheen; ctx.fill(); ctx.restore();

  ctx.save(); ctx.strokeStyle = DARK; ctx.lineWidth = 2; ctx.setLineDash([4, 3]);
  ctx.beginPath(); ctx.moveTo(cx, y + 4); ctx.lineTo(cx, y + h - 4); ctx.stroke(); ctx.setLineDash([]); ctx.restore();

  const labels = [["N", "NORTH", cx - hw / 2], ["S", "SOUTH", cx + hw / 2]];
  labels.forEach(([lbl, sub, lx]) => {
    ctx.save(); ctx.fillStyle = "#FFF"; ctx.font = `bold ${h * 0.38}px Inter,sans-serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(lbl, lx, cy); ctx.restore();
    ctx.save(); ctx.fillStyle = "rgba(255,255,255,0.6)"; ctx.font = `600 ${h * 0.13}px Inter,sans-serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(sub, lx, cy + h * 0.32); ctx.restore();
  });
}

function drawHalfMagnet(ctx, cx, cy, w, h, offsetX, which, splitT, poleReveal) {
  const qw = w / 4, subW = qw / 2, r = h * 0.18;
  const RED = "#DC2626", BLUE = "#2563EB", DARK = "#1E293B";
  const x = cx + offsetX - qw, y = cy - h / 2;
  const outerColor = which === "left" ? RED : BLUE;
  const outerLabel = which === "left" ? "N" : "S";
  const innerColor = which === "left" ? BLUE : RED;
  const innerLabel = which === "left" ? "S" : "N";

  const ox = which === "left" ? x : x + subW;
  const outerCorn = which === "left" ? { tl: r, tr: 0, br: 0, bl: r } : { tl: 0, tr: r, br: r, bl: 0 };
  ctx.save(); roundRect(ctx, ox, y, subW, h, outerCorn);
  ctx.fillStyle = outerColor; ctx.fill(); ctx.strokeStyle = DARK; ctx.lineWidth = 1; ctx.stroke(); ctx.restore();
  ctx.save(); ctx.fillStyle = "#FFF"; ctx.font = `bold ${h * 0.38}px Inter,sans-serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(outerLabel, ox + subW / 2, cy); ctx.restore();

  const ix = which === "left" ? x + subW : x;
  ctx.save(); roundRect(ctx, ix, y, subW, h, 0);
  ctx.fillStyle = blendColors(outerColor, innerColor, poleReveal); ctx.fill(); ctx.strokeStyle = DARK; ctx.lineWidth = 1; ctx.stroke(); ctx.restore();

  if (poleReveal > 0.05) {
    ctx.save(); ctx.globalAlpha = clamp(poleReveal * 2, 0, 1); ctx.fillStyle = "#FFF";
    ctx.font = `bold ${h * 0.38}px Inter,sans-serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(innerLabel, ix + subW / 2, cy); ctx.restore();
  }

  if (poleReveal > 0.3) {
    const glowX = which === "left" ? ix + subW : ix;
    ctx.save(); ctx.globalAlpha = clamp((poleReveal - 0.3) * 1.5, 0, 0.5);
    const g = ctx.createRadialGradient(glowX, cy, 0, glowX, cy, h * 0.55);
    g.addColorStop(0, innerColor); g.addColorStop(1, "transparent");
    ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(glowX, cy, h * 0.45, h * 0.45, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  }
}

export default function BreakingMagnetDemoPlayer({
  externalIsPaused = false,
  onExternalTogglePause,
  onExternalReset,
  onPhaseChange,
  autoPlay = true,
  loop = true,
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const containerRef = useRef(null);
  const vtRef = useRef(0);
  const lastTRef = useRef(null);
  const playingRef = useRef(false);
  const progressBarRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(loop);
  const [isMuted, setIsMuted] = useState(true);
  const [isEnded, setIsEnded] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const controlsTimeout = useRef(null);

  const getPhaseState = useCallback((t) => {
    let acc = 0;
    for (let i = 0; i < PHASES.length; i++) {
      const next = acc + PHASES[i].duration;
      if (t < next || i === PHASES.length - 1) {
        return { phaseIdx: i, localT: clamp((t - acc) / PHASES[i].duration, 0, 1) };
      }
      acc = next;
    }
    return { phaseIdx: PHASES.length - 1, localT: 1 };
  }, []);

  const draw = useCallback((t) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width / (window.devicePixelRatio || 1);
    const H = canvas.height / (window.devicePixelRatio || 1);
    const { phaseIdx, localT } = getPhaseState(t);
    const eT = easeInOut(localT);

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, "#07111A"); bg.addColorStop(0.5, "#0C1C2E"); bg.addColorStop(1, "#0A1521");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    ctx.save(); ctx.strokeStyle = "rgba(56,189,248,0.04)"; ctx.lineWidth = 1;
    for (let gx = 0; gx < W; gx += 28) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke(); }
    for (let gy = 0; gy < H; gy += 28) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke(); }
    ctx.restore();

    const cx = W / 2, cy = H * 0.46;
    const barW = Math.min(W * 0.64, 340), barH = Math.min(H * 0.14, 52);

    if (phaseIdx === 0) {
      drawFieldLoops(ctx, cx - barW / 4, cy, barW / 4, barH * 1.6, "#DC2626", 0.28, 5);
      drawFieldLoops(ctx, cx + barW / 4, cy, barW / 4, barH * 1.6, "#2563EB", 0.25, 5);
      const rise = lerp(H * 0.12, 0, clamp(eT * 2, 0, 1));
      ctx.save(); ctx.translate(0, rise); drawFullMagnet(ctx, cx, cy, barW, barH); ctx.restore();
      ctx.save(); ctx.globalAlpha = clamp(eT, 0, 1); ctx.strokeStyle = "rgba(251,191,36,0.55)"; ctx.lineWidth = 1.5; ctx.setLineDash([5, 4]);
      ctx.beginPath(); ctx.moveTo(cx, cy - barH * 0.9); ctx.lineTo(cx, cy + barH * 0.9); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = "rgba(251,191,36,0.9)"; ctx.font = `700 ${Math.max(10, barH * 0.21)}px Inter,sans-serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText("Neutral Zone", cx, cy - barH * 1.15); ctx.restore();
    }

    if (phaseIdx === 1) {
      const splitAmt = lerp(0, barW * 0.17, eT);
      const la = clamp(1 - eT * 2, 0, 0.28);
      drawFieldLoops(ctx, cx - barW / 4, cy, barW / 4, barH * 1.6, "#DC2626", la, 5);
      drawFieldLoops(ctx, cx + barW / 4, cy, barW / 4, barH * 1.6, "#2563EB", la, 5);
      drawHalfMagnet(ctx, cx, cy, barW, barH, -splitAmt, "left", eT, 0);
      drawHalfMagnet(ctx, cx, cy, barW, barH, splitAmt, "right", eT, 0);
      const cp = clamp(eT * 1.5, 0, 1);
      if (cp > 0) {
        ctx.save(); ctx.globalAlpha = clamp(cp * 1.6, 0, 1) * (1 - clamp((eT - 0.7) * 3, 0, 1));
        ctx.strokeStyle = "#FDE68A"; ctx.lineWidth = 2.5; ctx.shadowColor = "#F59E0B"; ctx.shadowBlur = 12;
        const top = cy - barH * 0.8, bot = cy + barH * 0.8, segs = 8;
        ctx.beginPath(); ctx.moveTo(cx, top);
        for (let i = 1; i <= segs; i++) {
          const frac = i / segs;
          if (frac <= cp) ctx.lineTo(cx + (i % 2 === 0 ? 5 : -5), lerp(top, bot, frac));
        }
        ctx.stroke(); ctx.restore();
      }
      if (eT > 0.1) {
        ctx.save(); ctx.globalAlpha = clamp(eT * 3, 0, 1); ctx.fillStyle = "#FDE68A";
        ctx.font = `800 ${Math.max(11, barH * 0.28)}px Inter,sans-serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText("Breaking...", cx, cy - barH * 1.6); ctx.restore();
      }
    }

    if (phaseIdx === 2) {
      const splitAmt = lerp(barW * 0.17, barW * 0.22, eT);
      const pr = clamp(eT * 1.5, 0, 1), fa = clamp(eT * 2, 0, 0.72);
      const lx = cx - splitAmt - barW * 0.25, rx = cx + splitAmt + barW * 0.25;
      drawFieldLoops(ctx, lx, cy, barW * 0.21, barH * 1.45, "#22C55E", fa, 4);
      drawFieldLoops(ctx, rx, cy, barW * 0.21, barH * 1.45, "#22C55E", fa, 4);
      drawHalfMagnet(ctx, cx, cy, barW, barH, -splitAmt, "left", 1, pr);
      drawHalfMagnet(ctx, cx, cy, barW, barH, splitAmt, "right", 1, pr);

      if (pr > 0.4) {
        const la = clamp((pr - 0.4) * 2, 0, 1), labelY = cy - barH * 1.55;
        [[lx, "N \u2500\u2500\u2500 S"], [rx, "N \u2500\u2500\u2500 S"]].forEach(([lpos, txt]) => {
          ctx.save(); ctx.globalAlpha = la;
          roundRect(ctx, lpos - 50, labelY - barH * 0.275, 100, barH * 0.55, 8);
          ctx.fillStyle = "rgba(15,23,42,0.85)"; ctx.fill(); ctx.strokeStyle = "#22C55E"; ctx.lineWidth = 1.5; ctx.stroke();
          ctx.fillStyle = "#22C55E"; ctx.font = `700 ${Math.max(8, barH * 0.2)}px Inter,sans-serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
          ctx.fillText(txt, lpos, labelY); ctx.restore();
        });
      }

      if (eT > 0.55) {
        const ca = clamp((eT - 0.55) * 2.5, 0, 1), callY = cy + barH * 2.0;
        const callW = Math.min(W * 0.82, 400), callH = barH * 1.45;
        ctx.save(); ctx.globalAlpha = ca;
        roundRect(ctx, cx - callW / 2, callY, callW, callH, 10);
        ctx.fillStyle = "rgba(15,23,42,0.92)"; ctx.fill(); ctx.strokeStyle = "rgba(34,197,94,0.55)"; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.fillStyle = "#FDE68A"; ctx.font = `800 ${Math.max(9, barH * 0.24)}px Inter,sans-serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText("Magnetic poles always exist in pairs", cx, callY + callH * 0.35);
        ctx.fillStyle = "#94A3B8"; ctx.font = `600 ${Math.max(8, barH * 0.19)}px Inter,sans-serif`;
        ctx.fillText("Isolated magnetic monopoles do not exist", cx, callY + callH * 0.72);
        ctx.restore();
      }
    }

    setPhaseIndex(phaseIdx);
    if (onPhaseChange) onPhaseChange(["whole","break","dipoles"][phaseIdx], t / TOTAL_DURATION);
  }, [getPhaseState, onPhaseChange]);

  const startPlay = useCallback(() => {
    if (playingRef.current) return;
    playingRef.current = true; lastTRef.current = null;
    setIsPlaying(true); setIsEnded(false);
    const tick = (now) => {
      if (!playingRef.current) return;
      if (lastTRef.current === null) lastTRef.current = now;
      const dt = Math.min((now - lastTRef.current) / 1000, 0.05);
      lastTRef.current = now;
      vtRef.current += dt;
      if (vtRef.current >= TOTAL_DURATION) {
        if (isLooping) { vtRef.current = 0; lastTRef.current = null; }
        else { vtRef.current = TOTAL_DURATION; playingRef.current = false; setIsPlaying(false); setIsEnded(true); draw(TOTAL_DURATION); setCurrentTime(TOTAL_DURATION); return; }
      }
      setCurrentTime(vtRef.current);
      draw(vtRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [draw, isLooping]);

  const stopPlay = useCallback(() => {
    playingRef.current = false; lastTRef.current = null;
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) { stopPlay(); if (onExternalTogglePause && !externalIsPaused) onExternalTogglePause(); }
    else { startPlay(); if (onExternalTogglePause && externalIsPaused) onExternalTogglePause(); }
  }, [isPlaying, stopPlay, startPlay, onExternalTogglePause, externalIsPaused]);

  const handleReplay = useCallback(() => {
    stopPlay(); vtRef.current = 0; setCurrentTime(0); setIsEnded(false);
    if (onExternalReset) onExternalReset();
    draw(0);
    setTimeout(startPlay, 50);
  }, [stopPlay, startPlay, onExternalReset, draw]);

  useEffect(() => {
    if (externalIsPaused && isPlaying) stopPlay();
    else if (!externalIsPaused && !isPlaying && !isEnded) startPlay();
  }, [externalIsPaused]); // eslint-disable-line

  useEffect(() => {
    draw(0);
    if (autoPlay) startPlay();
    return () => stopPlay();
  }, []); // eslint-disable-line

  useEffect(() => {
    const canvas = canvasRef.current, container = containerRef.current;
    if (!canvas || !container) return;
    const ro = new ResizeObserver(() => {
      const { width, height } = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr; canvas.height = height * dpr;
      canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
      const ctx = canvas.getContext("2d"); ctx.scale(dpr, dpr);
      draw(vtRef.current);
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, [draw]);

  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => { if (playingRef.current) setShowControls(false); }, 3200);
  }, []);

  const handleSeek = (e) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const ratio = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    const newT = ratio * TOTAL_DURATION;
    vtRef.current = newT; setCurrentTime(newT); setIsEnded(false); draw(newT);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    else document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
  };

  const pct = (currentTime / TOTAL_DURATION) * 100;
  const fmt = (s) => { const m = Math.floor(s / 60), sec = Math.floor(s % 60); return `${m}:${sec < 10 ? "0" : ""}${sec}`; };

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={() => setShowControls(false)}
      style={{ position:"relative", width:"100%", height:"100%", minHeight:"380px", borderRadius:isFullscreen?"0":"24px", overflow:"hidden",
        background:"#07111A", border:isFullscreen?"none":"1.5px solid #A7F3D0", boxShadow:isFullscreen?"none":"0 12px 30px rgba(6,78,59,0.16)",
        display:"flex", alignItems:"center", justifyContent:"center", userSelect:"none", boxSizing:"border-box" }}>

      <canvas ref={canvasRef} onClick={togglePlay}
        style={{ position:"absolute", inset:0, width:"100%", height:"100%", cursor:"pointer", display:"block" }} />

      {/* Top HUD */}
      <div style={{ position:"absolute", top:"12px", left:"14px", right:"14px", display:"flex", alignItems:"center", justifyContent:"space-between", zIndex:20, pointerEvents:"none" }}>
        <div style={{ background:"rgba(15,23,42,0.85)", backdropFilter:"blur(8px)", border:"1px solid rgba(56,189,248,0.4)", borderRadius:"14px", padding:"5px 12px", display:"flex", alignItems:"center", gap:"8px" }}>
          <Sparkles size={15} color="#38BDF8" />
          <span style={{ fontSize:"0.83rem", fontWeight:900, color:"#F0F9FF" }}>3D Demo · Breaking a Magnet — Dipole Formation</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"5px", background:"rgba(15,23,42,0.85)", backdropFilter:"blur(8px)", border:"1px solid rgba(245,158,11,0.35)", borderRadius:"14px", padding:"4px 10px" }}>
          {[{n:1,l:"Whole Magnet"},{n:2,l:"Break & Split"},{n:3,l:"Dipole Formation"}].map(p => {
            const active = phaseIndex === p.n - 1;
            return <span key={p.n} style={{ fontSize:"0.71rem", fontWeight:900, padding:"2px 8px", borderRadius:"10px",
              background: active ? "linear-gradient(135deg,#F59E0B 0%,#D97706 100%)" : "transparent",
              color: active ? "#FFF" : "#94A3B8", boxShadow: active ? "0 2px 8px rgba(217,119,6,0.4)" : "none", transition:"all 0.25s" }}>
              {p.n}. {p.l}
            </span>;
          })}
        </div>
      </div>

      <AnimatePresence>
        {showAnnotations && phaseIndex === 2 && (
          <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:8}} transition={{duration:0.35}}
            style={{ position:"absolute", top:"62px", left:"16px", right:"16px", display:"flex", alignItems:"flex-start", justifyContent:"space-around", pointerEvents:"none", zIndex:15 }}>
            {[{label:"Left Piece",sub:"N (red) \u2500\u2500\u2500 S (blue)"},{label:"Right Piece",sub:"N (red) \u2500\u2500\u2500 S (blue)"}].map((b,i) => (
              <div key={i} style={{ background:"rgba(15,23,42,0.88)", backdropFilter:"blur(6px)", border:"1.5px solid #22C55E", borderRadius:"12px", padding:"6px 14px", boxShadow:"0 4px 16px rgba(34,197,94,0.4)", display:"flex", flexDirection:"column", gap:"2px", textAlign:"center" }}>
                <span style={{ fontSize:"0.73rem", fontWeight:900, color:"#22C55E" }}>{b.label}</span>
                <span style={{ fontSize:"0.67rem", fontWeight:700, color:"#94A3B8" }}>{b.sub}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(!isPlaying || isEnded) && (
          <motion.div initial={{scale:0.8,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.8,opacity:0}} transition={{type:"spring",damping:20,stiffness:300}}
            style={{ position:"absolute", zIndex:25, pointerEvents:"auto" }}>
            <button onClick={isEnded ? handleReplay : togglePlay}
              style={{ width:"74px", height:"74px", borderRadius:"50%", background:"linear-gradient(135deg,#F59E0B 0%,#D97706 100%)",
                border:"3px solid rgba(255,255,255,0.85)", boxShadow:"0 8px 30px rgba(217,119,6,0.6),0 0 30px rgba(245,158,11,0.4)",
                cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"transform 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              title={isEnded ? "Replay" : "Play"}>
              {isEnded ? <RotateCcw size={32} color="#FFF" /> : <Play size={34} color="#FFF" fill="#FFF" style={{marginLeft:"4px"}} />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div initial={false} animate={{opacity:showControls||!isPlaying?1:0, y:showControls||!isPlaying?0:15}} transition={{duration:0.25}}
        style={{ position:"absolute", bottom:"12px", left:"14px", right:"14px", background:"rgba(15,23,42,0.92)", backdropFilter:"blur(12px)",
          border:"1px solid rgba(255,255,255,0.15)", borderRadius:"16px", padding:"8px 14px", display:"flex", flexDirection:"column", gap:"6px",
          zIndex:30, boxShadow:"0 8px 25px rgba(0,0,0,0.5)", pointerEvents:showControls||!isPlaying?"auto":"none" }}>
        <div ref={progressBarRef} onClick={handleSeek}
          style={{ position:"relative", width:"100%", height:"8px", background:"rgba(255,255,255,0.18)", borderRadius:"4px", cursor:"pointer", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:0, left:0, height:"100%", width:`${pct}%`, background:"linear-gradient(90deg,#38BDF8 0%,#22C55E 50%,#F59E0B 100%)", borderRadius:"4px", transition:"width 0.1s linear" }} />
        </div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
            <button onClick={togglePlay} title={isPlaying?"Pause":"Play"}
              style={{ background:"rgba(255,255,255,0.1)", border:"none", borderRadius:"8px", width:"32px", height:"32px", display:"flex", alignItems:"center", justifyContent:"center", color:"#FFF", cursor:"pointer" }}>
              {isPlaying ? <Pause size={16} fill="#FFF" /> : <Play size={16} fill="#FFF" />}
            </button>
            <button onClick={handleReplay} title="Restart"
              style={{ background:"transparent", border:"none", borderRadius:"8px", width:"32px", height:"32px", display:"flex", alignItems:"center", justifyContent:"center", color:"#CBD5E1", cursor:"pointer" }}>
              <RotateCcw size={16} />
            </button>
            <span style={{ fontSize:"0.8rem", fontWeight:800, color:"#E2E8F0" }}>{fmt(currentTime)} / {fmt(TOTAL_DURATION)}</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
            <button onClick={() => setShowAnnotations(v => !v)}
              style={{ background:showAnnotations?"rgba(56,189,248,0.2)":"transparent", border:showAnnotations?"1px solid #38BDF8":"1px solid rgba(255,255,255,0.2)", borderRadius:"8px", padding:"4px 8px", display:"flex", alignItems:"center", gap:"5px", color:showAnnotations?"#38BDF8":"#94A3B8", cursor:"pointer", fontSize:"0.74rem", fontWeight:800 }}>
              <Layers size={13} /><span>{showAnnotations?"Labels ON":"Labels OFF"}</span>
            </button>
            <button onClick={() => setIsLooping(v => !v)}
              style={{ background:isLooping?"rgba(245,158,11,0.2)":"transparent", border:isLooping?"1px solid #F59E0B":"1px solid rgba(255,255,255,0.2)", borderRadius:"8px", padding:"4px 8px", display:"flex", alignItems:"center", gap:"5px", color:isLooping?"#FBBF24":"#94A3B8", cursor:"pointer", fontSize:"0.74rem", fontWeight:800 }}>
              <Repeat size={13} /><span>{isLooping?"Loop":"Once"}</span>
            </button>
            <button onClick={() => setIsMuted(v => !v)} title={isMuted?"Unmute":"Mute"}
              style={{ background:"transparent", border:"none", width:"30px", height:"30px", display:"flex", alignItems:"center", justifyContent:"center", color:isMuted?"#EF4444":"#E2E8F0", cursor:"pointer" }}>
              {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
            </button>
            <button onClick={toggleFullscreen} title={isFullscreen?"Exit Fullscreen":"Fullscreen"}
              style={{ background:"transparent", border:"none", width:"30px", height:"30px", display:"flex", alignItems:"center", justifyContent:"center", color:"#E2E8F0", cursor:"pointer" }}>
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
