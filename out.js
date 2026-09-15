import { jsx, jsxs } from "react/jsx-runtime";
import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Droplet,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Hand,
  Info,
  HelpCircle,
  LayoutGrid,
  Play
} from "lucide-react";
import pourActivityVideo from "../../../../../assets/pour_activity.mp4";
const GRAVITY = 900;
const POUR_TILT = 35;
const FILL_SPEED = 0.3;
const TUMBLER_A = { cx: 250, cy: 260, hitR: 90 };
const TUMBLER_B = { cx: 420, cy: 260, hitR: 90 };
const GROUND_Y = 160;
const BOTTLE_INIT = { x: 20, y: GROUND_Y };
const THINK_OPTIONS = [
  "The bottle will hold all the water without any change.",
  "The bottle will overflow because it cannot hold all the water.",
  "The water will disappear when poured into the bottle.",
  "The bottle will become larger to hold the extra water."
];
const THINK_CORRECT_INDEX = 1;
export default function Stage8b_Volume({ onComplete, addXp }) {
  const [bottlePos, setBottlePos] = useState(BOTTLE_INIT);
  const [isDragging, setIsDragging] = useState(false);
  const [bottleTilt, setBottleTilt] = useState(0);
  const [isCapRemoved, setIsCapRemoved] = useState(false);
  const [waterLevelA, setWaterLevelA] = useState(0);
  const [waterLevelB, setWaterLevelB] = useState(0);
  const [bottleFill, setBottleFill] = useState(1);
  const canvasRef = useRef(null);
  const dropletsRef = useRef([]);
  const ripplesRef = useRef([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [thinkFeedback, setThinkFeedback] = useState(null);
  const [isThinkModalOpen, setIsThinkModalOpen] = useState(false);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef(null);
  const grabOffsetRef = useRef({ x: 0, y: 0 });
  const bottlePosRef = useRef(BOTTLE_INIT);
  const isDraggingRef = useRef(false);
  const bottleTiltRef = useRef(0);
  const waterLevelARef = useRef(0);
  const waterLevelBRef = useRef(0);
  const bottleFillRef = useRef(1);
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(performance.now());
  const activeTargetRef = useRef(null);
  const innerContainerRef = useRef(null);
  const autoStateRef = useRef("IDLE");
  const bottleVisualRef = useRef({ pos: BOTTLE_INIT, tilt: 0 });
  const colors = {
    cardBg: "var(--lesson-card)",
    cardBorder: "var(--lesson-border)",
    textDark: "var(--lesson-primary)",
    textMedium: "var(--lesson-secondary)",
    accent: "#B04924",
    successBg: "var(--lesson-success-bg)",
    successBorder: "var(--lesson-success-border)",
    successText: "var(--lesson-primary)",
    thinkBg: "var(--lesson-warning-bg)",
    thinkBorder: "var(--lesson-warning-border)",
    thinkText: "var(--lesson-primary)"
  };
  const getCanvasRect = () => containerRef.current?.getBoundingClientRect();
  useEffect(() => {
    if (waterLevelA >= 0.5 && waterLevelB >= 0.9) {
      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 1e3);
      return () => clearTimeout(timer);
    }
  }, [waterLevelA, waterLevelB, onComplete]);
  useEffect(() => {
    if (waterLevelA >= 0.49 && waterLevelB >= 0.94) {
      if (typeof addXp === "function") addXp(20);
      if (typeof onComplete === "function") onComplete();
    }
  }, [waterLevelA, waterLevelB, addXp, onComplete]);
  const handlePointerDown = useCallback((e) => {
    e.preventDefault();
    if (autoStateRef.current !== "IDLE") return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const rect = getCanvasRect();
    if (!rect) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    const canvasH = rect.height;
    const bx = bottlePosRef.current.x;
    const by = bottlePosRef.current.y;
    const bottleClientLeft = rect.left + bx;
    const bottleClientTop = rect.top + (canvasH - by - 240);
    grabOffsetRef.current = {
      x: clientX - bottleClientLeft,
      y: clientY - bottleClientTop
    };
    setIsDragging(true);
    isDraggingRef.current = true;
  }, []);
  const handlePointerMove = useCallback((e) => {
    if (!isDraggingRef.current) return;
    if (autoStateRef.current !== "IDLE") return;
    const rect = getCanvasRect();
    if (!rect) return;
    const canvasH = rect.height;
    const canvasW = rect.width;
    const newLeft = e.clientX - rect.left - grabOffsetRef.current.x;
    const newTop = e.clientY - rect.top - grabOffsetRef.current.y;
    const clampedLeft = Math.max(-30, Math.min(canvasW - 90, newLeft));
    const clampedTop = Math.max(-60, Math.min(canvasH - 80, newTop));
    const newX = clampedLeft;
    const newY = canvasH - clampedTop - 240;
    const next = { x: newX, y: newY };
    bottlePosRef.current = next;
    setBottlePos(next);
    const bottleCenterX = newX + 60;
    const bottleCenterY = canvasH - newY - 120;
    const dA = Math.hypot(bottleCenterX - TUMBLER_A.cx, bottleCenterY - TUMBLER_A.cy);
    const dB = Math.hypot(bottleCenterX - TUMBLER_B.cx, bottleCenterY - TUMBLER_B.cy);
    if (bottleFillRef.current <= 0) return;
    if (dA < TUMBLER_A.hitR * 1.5 && waterLevelARef.current < 0.5) {
      autoStateRef.current = "POUR_A";
      setIsDragging(false);
      isDraggingRef.current = false;
      const tPos = { x: TUMBLER_A.cx - 72, y: 130 };
      bottlePosRef.current = tPos;
      setBottlePos(tPos);
      const tTilt = 45;
      bottleTiltRef.current = tTilt;
      setBottleTilt(tTilt);
      return;
    }
    if (dB < TUMBLER_B.hitR * 1.5 && waterLevelBRef.current < 0.95) {
      autoStateRef.current = "POUR_B";
      setIsDragging(false);
      isDraggingRef.current = false;
      const tPos = { x: TUMBLER_B.cx - 48, y: 130 };
      bottlePosRef.current = tPos;
      setBottlePos(tPos);
      const tTilt = -45;
      bottleTiltRef.current = tTilt;
      setBottleTilt(tTilt);
      return;
    }
    const dx = newX - bottlePosRef.current.x;
    const targetTilt = Math.max(-15, Math.min(15, dx * -1.5));
    bottleTiltRef.current = targetTilt;
    setBottleTilt(targetTilt);
  }, []);
  const handlePointerUp = useCallback(() => {
    if (autoStateRef.current !== "IDLE") return;
    setIsDragging(false);
    isDraggingRef.current = false;
    setBottleTilt(0);
    bottleTiltRef.current = 0;
    activeTargetRef.current = null;
    dropletsRef.current = [];
    ripplesRef.current = [];
  }, []);
  const resetActivity = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 1e-3;
      setIsPlaying(false);
    }
    autoStateRef.current = "IDLE";
    setBottlePos(BOTTLE_INIT);
    bottlePosRef.current = BOTTLE_INIT;
    setIsDragging(false);
    isDraggingRef.current = false;
    setBottleTilt(0);
    bottleTiltRef.current = 0;
    setWaterLevelA(0);
    waterLevelARef.current = 0;
    setWaterLevelB(0);
    waterLevelBRef.current = 0;
    setBottleFill(1);
    bottleFillRef.current = 1;
    dropletsRef.current = [];
    ripplesRef.current = [];
    setThinkFeedback(null);
    setSelectedOption(null);
  };
  const handleCheckAnswer = (index) => {
    if (index === THINK_CORRECT_INDEX) {
      setThinkFeedback({ type: "success", text: "Correct! The bottle has a limited capacity. If the tumbler contains more water than it can hold, the extra water will overflow." });
    } else {
      setThinkFeedback({ type: "hint", text: "Think about the bottle's capacity. Can it hold more water than its maximum capacity?" });
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        width: "100%",
        height: "100vh",
        maxHeight: "100vh",
        overflow: "hidden",
        color: colors.textDark,
        padding: "0.5rem",
        boxSizing: "border-box",
        background: "var(--lesson-background)"
      },
      children: [
        /* @__PURE__ */ jsx("style", { children: `
          @keyframes btnPulse {
            0% { transform: scale(1); box-shadow: 0 4px 12px rgba(166, 75, 39, 0.2); }
            50% { transform: scale(1.02); box-shadow: 0 8px 24px rgba(166, 75, 39, 0.5); }
            100% { transform: scale(1); box-shadow: 0 4px 12px rgba(166, 75, 39, 0.2); }
          }
          @keyframes shineSweep {
            0% { left: -100%; }
            20% { left: 200%; }
            100% { left: 200%; }
          }
        ` }),
        /* @__PURE__ */ jsxs("div", { style: {
          background: colors.cardBg,
          border: `1px solid ${colors.cardBorder}`,
          borderRadius: "12px",
          padding: "0.75rem 1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.2rem",
          flexShrink: 0,
          boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
        }, children: [
          /* @__PURE__ */ jsxs("h2", { style: { margin: 0, fontSize: "36px", fontFamily: '"Merriweather", "Georgia", serif', color: colors.textDark, display: "flex", alignItems: "center", gap: "10px", fontWeight: "900" }, children: [
            /* @__PURE__ */ jsx(Box, { size: 36, color: colors.textDark, strokeWidth: 2.5 }),
            " Phase 2: Space and Volume"
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px", color: colors.textMedium, fontSize: "20px", fontFamily: '"Merriweather", "Georgia", serif' }, children: [
            /* @__PURE__ */ jsx(Info, { size: 20 }),
            /* @__PURE__ */ jsx("span", { children: "Section 6.3.6: Pour water from the bottle into the two identical tumblers to observe volume." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: "0.5rem", flex: 1, minHeight: 0, overflow: "hidden" }, children: [
          /* @__PURE__ */ jsx("div", { style: { flex: 1.4, display: "flex", flexDirection: "column", gap: "0.5rem", minHeight: 0 }, children: /* @__PURE__ */ jsxs("div", { style: {
            background: colors.cardBg,
            borderRadius: "12px",
            border: `1px solid ${colors.cardBorder}`,
            padding: "1.25rem",
            display: "flex",
            flexDirection: "column",
            flex: 1,
            position: "relative",
            boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
            minHeight: 0
          }, children: [
            /* @__PURE__ */ jsx("div", { style: { marginBottom: "1rem", fontSize: "20px", fontFamily: '"Merriweather", "Georgia", serif', color: colors.textDark, fontWeight: "500", lineHeight: "1.4", display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }, children: /* @__PURE__ */ jsxs("div", { style: { background: "#F8EBE3", padding: "16px 20px", borderRadius: "8px", borderLeft: `6px solid ${colors.accent}`, width: "100%", color: "#3E2723" }, children: [
              /* @__PURE__ */ jsx("strong", { style: { color: colors.accent, fontWeight: "bold" }, children: "Observe carefully:" }),
              " Watch the video and see what happens when the water is poured into the two identical tumblers."
            ] }) }),
            /* @__PURE__ */ jsxs(
              "div",
              {
                ref: containerRef,
                style: {
                  position: "relative",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "inset 0 4px 20px rgba(0,0,0,0.03)",
                  border: `1.5px solid ${colors.cardBorder}`,
                  userSelect: "none",
                  touchAction: "none"
                },
                children: [
                  /* @__PURE__ */ jsx(
                    "video",
                    {
                      ref: videoRef,
                      src: `${pourActivityVideo}#t=0.001`,
                      preload: "metadata",
                      style: { display: "block", width: "100%", height: "auto" },
                      onTimeUpdate: (e) => {
                        const time = e.target.currentTime;
                        const duration = e.target.duration;
                        if (duration) {
                          if (time > duration * 0.4 && waterLevelA < 0.5) setWaterLevelA(0.5);
                          if (time > duration * 0.8 && waterLevelB < 0.95) setWaterLevelB(0.95);
                        }
                      },
                      onEnded: () => {
                        setWaterLevelA(0.5);
                        setWaterLevelB(0.95);
                        setIsPlaying(false);
                      }
                    }
                  ),
                  !isPlaying && /* @__PURE__ */ jsxs(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(0, 0, 0, 0.2)",
                        cursor: "pointer"
                      },
                      onClick: () => {
                        if (videoRef.current) {
                          videoRef.current.play();
                          setIsPlaying(true);
                        }
                      },
                      onKeyDown: (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          if (videoRef.current) {
                            videoRef.current.play();
                            setIsPlaying(true);
                          }
                        }
                      },
                      role: "button",
                      tabIndex: 0,
                      "aria-label": "Play experiment video",
                      children: [
                        /* @__PURE__ */ jsx("style", { children: `
                      @keyframes playPulse {
                        0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.7); }
                        70% { transform: scale(1.05); box-shadow: 0 0 0 20px rgba(245, 158, 11, 0); }
                        100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
                      }
                    ` }),
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            style: {
                              width: "72px",
                              height: "72px",
                              borderRadius: "50%",
                              background: colors.accent,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              animation: "playPulse 2s infinite"
                            },
                            children: /* @__PURE__ */ jsx(Play, { size: 36, color: "white", style: { marginLeft: "4px" }, fill: "white" })
                          }
                        )
                      ]
                    }
                  )
                ]
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxs("div", { style: { flex: 1, display: "flex", flexDirection: "column", gap: "6px", minHeight: 0, overflow: "hidden" }, children: [
            /* @__PURE__ */ jsxs("div", { style: { background: colors.cardBg, borderRadius: "10px", border: `1px solid ${colors.cardBorder}`, padding: "16px 20px", display: "flex", flexDirection: "column", gap: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.02)", flexShrink: 0 }, children: [
              /* @__PURE__ */ jsxs("h4", { style: { margin: 0, fontSize: "32px", fontFamily: '"Merriweather", "Georgia", serif', color: colors.textDark, display: "flex", alignItems: "center", gap: "10px", fontWeight: "900" }, children: [
                /* @__PURE__ */ jsx(LayoutGrid, { size: 32, color: colors.textDark, strokeWidth: 2.5 }),
                " Investigation Log"
              ] }),
              /* @__PURE__ */ jsxs(AnimatePresence, { mode: "popLayout", children: [
                waterLevelA >= 0.49 && /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, style: { background: "white", padding: "12px 16px", borderRadius: "8px", border: `1px solid ${colors.cardBorder}`, display: "flex", gap: "16px", alignItems: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }, children: [
                  /* @__PURE__ */ jsx("div", { style: { width: "36px", height: "48px", position: "relative", flexShrink: 0 }, children: /* @__PURE__ */ jsx("img", { src: "/images/realistic_tumbler_water_half.jpg", alt: "Tumbler A", style: { width: "100%", height: "100%", objectFit: "contain", borderRadius: "4px" } }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("div", { style: { color: colors.accent, fontWeight: "800", fontSize: "20px", fontFamily: '"Merriweather", "Georgia", serif' }, children: "Observation 1" }),
                    /* @__PURE__ */ jsx("div", { style: { fontSize: "18px", color: colors.textDark, marginTop: "4px", lineHeight: "1.3", fontWeight: "600", fontFamily: '"Merriweather", "Georgia", serif' }, children: "Tumbler A is half-filled with water (50% Volume)." })
                  ] })
                ] }, "obsA"),
                waterLevelB >= 0.94 && /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, style: { background: "white", padding: "12px 16px", borderRadius: "8px", border: `1px solid ${colors.cardBorder}`, display: "flex", gap: "16px", alignItems: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }, children: [
                  /* @__PURE__ */ jsx("div", { style: { width: "36px", height: "48px", position: "relative", flexShrink: 0 }, children: /* @__PURE__ */ jsx("img", { src: "/images/realistic_tumbler_water_full.jpg", alt: "Tumbler B", style: { width: "100%", height: "100%", objectFit: "contain", borderRadius: "4px" } }) }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("div", { style: { color: colors.accent, fontWeight: "800", fontSize: "20px", fontFamily: '"Merriweather", "Georgia", serif' }, children: "Observation 2" }),
                    /* @__PURE__ */ jsx("div", { style: { fontSize: "18px", color: colors.textDark, marginTop: "4px", lineHeight: "1.3", fontWeight: "600", fontFamily: '"Merriweather", "Georgia", serif' }, children: "Tumbler B is almost completely filled with water." })
                  ] })
                ] }, "obsB")
              ] }),
              waterLevelA < 0.49 && waterLevelB < 0.94 && /* @__PURE__ */ jsx("div", { style: { textAlign: "center", color: colors.textMedium, fontSize: "15px", padding: "4px 0", fontStyle: "italic", fontWeight: "500" }, children: "Waiting for observations..." })
            ] }),
            /* @__PURE__ */ jsx(AnimatePresence, { children: waterLevelB >= 0.9 && /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.3 }, style: { background: colors.successBg, padding: "14px 20px", borderRadius: "10px", border: `1px solid ${colors.successBorder}`, flexShrink: 0 }, children: [
              /* @__PURE__ */ jsx("div", { style: { color: colors.successText, fontWeight: "900", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px", fontSize: "32px", fontFamily: '"Merriweather", "Georgia", serif' }, children: "\u{1F9EA} Scientific Conclusion" }),
              /* @__PURE__ */ jsxs("div", { style: { fontSize: "18px", color: colors.successText, lineHeight: "1.4", fontWeight: "600", display: "flex", flexDirection: "column", gap: "6px", fontFamily: '"Merriweather", "Georgia", serif' }, children: [
                /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: "8px", alignItems: "center" }, children: [
                  /* @__PURE__ */ jsx(CheckCircle2, { size: 20, color: colors.accent, style: { flexShrink: 0 }, strokeWidth: 2.5 }),
                  " The bottle has a limited amount of space."
                ] }),
                /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: "8px", alignItems: "center" }, children: [
                  /* @__PURE__ */ jsx(CheckCircle2, { size: 20, color: colors.accent, style: { flexShrink: 0 }, strokeWidth: 2.5 }),
                  " ",
                  /* @__PURE__ */ jsxs("span", { children: [
                    "The space occupied by an object or substance is called its ",
                    /* @__PURE__ */ jsx("strong", { style: { color: colors.accent, background: "#fef08a", padding: "2px 8px", fontWeight: "900", borderRadius: "4px" }, children: "VOLUME" }),
                    "."
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: "8px", alignItems: "center" }, children: [
                  /* @__PURE__ */ jsx(CheckCircle2, { size: 20, color: colors.accent, style: { flexShrink: 0 }, strokeWidth: 2.5 }),
                  " Different containers can have different volumes."
                ] }),
                /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: "8px", alignItems: "center" }, children: [
                  /* @__PURE__ */ jsx(CheckCircle2, { size: 20, color: colors.accent, style: { flexShrink: 0 }, strokeWidth: 2.5 }),
                  " We can observe and compare volume by pouring water!"
                ] })
              ] })
            ] }, "conclusion") }),
            /* @__PURE__ */ jsx(AnimatePresence, { children: waterLevelB >= 0.9 && /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5 }, children: /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setIsThinkModalOpen(true),
                style: {
                  position: "relative",
                  overflow: "hidden",
                  background: colors.accent,
                  border: "none",
                  color: "white",
                  padding: "16px 24px",
                  borderRadius: "16px",
                  width: "100%",
                  fontSize: "24px",
                  fontFamily: '"Merriweather", "Georgia", serif',
                  fontWeight: "900",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "12px",
                  animation: "btnPulse 2s infinite",
                  boxShadow: "0 4px 12px rgba(166, 75, 39, 0.3)",
                  marginTop: "4px",
                  flexShrink: 0
                },
                children: [
                  /* @__PURE__ */ jsx("div", { style: {
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    width: "40px",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                    transform: "skewX(-20deg)",
                    animation: "shineSweep 3s infinite"
                  } }),
                  /* @__PURE__ */ jsx("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", stroke: "#fef08a", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: { position: "absolute", top: "10px", left: "16px", opacity: 0.9 }, children: /* @__PURE__ */ jsx("path", { d: "M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" }) }),
                  /* @__PURE__ */ jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "#fef08a", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: { position: "absolute", bottom: "10px", right: "16px", opacity: 0.9 }, children: /* @__PURE__ */ jsx("path", { d: "M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" }) }),
                  /* @__PURE__ */ jsx(HelpCircle, { size: 28, strokeWidth: 2.5 }),
                  " Answer a Bonus Question!"
                ]
              }
            ) }, "think-btn") })
          ] })
        ] }),
        /* @__PURE__ */ jsx(AnimatePresence, { children: isThinkModalOpen && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            style: {
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(4px)",
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem"
            },
            children: /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { scale: 0.9, y: 20 },
                animate: { scale: 1, y: 0 },
                exit: { scale: 0.9, y: 20 },
                style: {
                  background: colors.cardBg,
                  padding: "32px 40px",
                  borderRadius: "24px",
                  border: `3px solid ${colors.cardBorder}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  maxWidth: "1200px",
                  width: "80vw",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                  position: "relative"
                },
                children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setIsThinkModalOpen(false),
                      style: {
                        position: "absolute",
                        top: "16px",
                        right: "16px",
                        background: "none",
                        border: "none",
                        fontSize: "24px",
                        cursor: "pointer",
                        color: colors.textMedium,
                        padding: "4px",
                        lineHeight: "1"
                      },
                      children: "\u2715"
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { style: { color: colors.textDark, fontWeight: "900", display: "flex", alignItems: "center", gap: "10px", fontSize: "36px", fontFamily: '"Merriweather", "Georgia", serif' }, children: [
                    /* @__PURE__ */ jsx(HelpCircle, { size: 36, color: colors.textDark, strokeWidth: 2.5 }),
                    " Think More!"
                  ] }),
                  /* @__PURE__ */ jsx("div", { style: { fontSize: "24px", color: colors.accent, lineHeight: "1.4", fontWeight: "800", fontFamily: '"Merriweather", "Georgia", serif' }, children: "What if we pour the water from Tumbler B back into the bottle? What will you observe?" }),
                  /* @__PURE__ */ jsxs("div", { style: { fontSize: "18px", fontStyle: "italic", color: colors.textMedium, lineHeight: "1.4", fontWeight: "600", fontFamily: '"Merriweather", "Georgia", serif' }, children: [
                    /* @__PURE__ */ jsx(Info, { size: 18, style: { display: "inline", verticalAlign: "middle", marginRight: "6px" } }),
                    "Hint: The bottle may not be able to hold all the water. What might happen if there is more water than the bottle can hold?"
                  ] }),
                  /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: "8px", marginTop: "24px" }, children: THINK_OPTIONS.map((opt, i) => {
                    const isCorrectSelection = thinkFeedback && thinkFeedback.type === "success" && selectedOption === i;
                    return /* @__PURE__ */ jsxs(
                      "div",
                      {
                        onClick: () => {
                          setSelectedOption(i);
                          handleCheckAnswer(i);
                        },
                        style: {
                          padding: "16px 20px",
                          borderRadius: "12px",
                          border: `2px solid ${isCorrectSelection ? colors.accent : selectedOption === i ? colors.accent : colors.cardBorder}`,
                          background: isCorrectSelection ? "var(--lesson-success-bg)" : selectedOption === i ? "#F8EBE3" : "white",
                          color: isCorrectSelection ? colors.accent : selectedOption === i ? colors.accent : colors.textDark,
                          fontSize: "20px",
                          lineHeight: "1.4",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          fontWeight: selectedOption === i ? "800" : "600",
                          fontFamily: '"Merriweather", "Georgia", serif',
                          boxShadow: selectedOption === i ? "0 2px 8px rgba(166, 75, 39, 0.1)" : "0 2px 4px rgba(0,0,0,0.02)",
                          transition: "all 0.2s ease",
                          minHeight: "44px"
                        },
                        children: [
                          /* @__PURE__ */ jsx("div", { style: {
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            border: `2px solid ${isCorrectSelection ? colors.accent : selectedOption === i ? colors.accent : colors.cardBorder}`,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexShrink: 0,
                            background: "white"
                          }, children: isCorrectSelection ? /* @__PURE__ */ jsx(CheckCircle2, { size: 18, color: colors.accent, strokeWidth: 2.5 }) : selectedOption === i && /* @__PURE__ */ jsx("div", { style: { width: "10px", height: "10px", borderRadius: "50%", background: colors.accent } }) }),
                          opt
                        ]
                      },
                      i
                    );
                  }) }),
                  /* @__PURE__ */ jsx(AnimatePresence, { children: thinkFeedback && /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, style: { overflow: "hidden" }, children: /* @__PURE__ */ jsxs("div", { style: { padding: "16px 20px", borderRadius: "12px", background: thinkFeedback.type === "success" ? colors.successBg : "var(--lesson-danger-bg)", border: `2px solid ${thinkFeedback.type === "success" ? colors.successBorder : "var(--lesson-danger-border)"}`, color: thinkFeedback.type === "success" ? colors.accent : "var(--lesson-danger)", fontSize: "18px", fontWeight: "700", fontFamily: '"Merriweather", "Georgia", serif', display: "flex", flexDirection: "column", gap: "10px", boxSizing: "border-box", marginTop: "4px" }, children: [
                    /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "flex-start", gap: "10px" }, children: [
                      thinkFeedback.type === "success" ? /* @__PURE__ */ jsx(CheckCircle2, { size: 24, color: colors.accent, style: { flexShrink: 0, marginTop: "2px" }, strokeWidth: 2.5 }) : /* @__PURE__ */ jsx(AlertCircle, { size: 24, style: { flexShrink: 0, marginTop: "2px" }, strokeWidth: 2.5 }),
                      /* @__PURE__ */ jsx("div", { children: thinkFeedback.text })
                    ] }),
                    thinkFeedback.type === "success" && /* @__PURE__ */ jsx("div", { style: { display: "flex", justifyContent: "flex-end", marginTop: "8px" }, children: /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => setIsThinkModalOpen(false),
                        style: {
                          background: colors.accent,
                          color: "white",
                          border: "none",
                          padding: "10px 24px",
                          borderRadius: "8px",
                          fontSize: "18px",
                          fontWeight: "bold",
                          fontFamily: '"Merriweather", "Georgia", serif',
                          cursor: "pointer",
                          boxShadow: "0 4px 12px rgba(166, 75, 39, 0.2)"
                        },
                        children: "Done"
                      }
                    ) })
                  ] }) }, "feedback") })
                ]
              }
            )
          },
          "think-modal"
        ) })
      ]
    }
  );
}
Stage8b_Volume.propTypes = {
  onComplete: PropTypes.func,
  addXp: PropTypes.func
};
