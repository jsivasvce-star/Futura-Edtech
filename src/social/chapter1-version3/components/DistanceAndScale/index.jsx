import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Target, Lightbulb, Book, MapPin, Link2, BarChart3, Building2, Compass, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import India from '@svg-maps/india';
import ChapterBackFooter from '../ChapterBackFooter';
import { ScrollableWithNav } from '../ContentScrollNav';

const IndiaMapSilhouette = () => (
  <svg viewBox={India.viewBox} width="48" height="48" style={{ filter: 'drop-shadow(0 4px 6px rgba(124, 92, 255, 0.2))' }}>
    {India.locations.map(location => (
      <path key={location.id} d={location.path} fill="var(--violet)" />
    ))}
  </svg>
);

const SchoolVector = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="90" rx="45" ry="8" fill="#a7d1a2" />
    <rect x="25" y="40" width="50" height="50" fill="#e6a87c" />
    <rect x="35" y="30" width="30" height="15" fill="#c48a60" />
    <polygon points="50,15 25,30 75,30" fill="#cd6b5c" />
    <rect x="42" y="65" width="16" height="25" fill="#8c5840" />
    <rect x="30" y="50" width="10" height="10" fill="#8ed1fc" />
    <rect x="60" y="50" width="10" height="10" fill="#8ed1fc" />
    <circle cx="50" cy="24" r="5" fill="#f4d03f" />
    <line x1="50" y1="15" x2="50" y2="5" stroke="#7f8c8d" strokeWidth="2" />
    <polygon points="50,5 65,10 50,15" fill="#e74c3c" />
  </svg>
);

const HouseVector = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="90" rx="40" ry="8" fill="#a7d1a2" />
    <rect x="25" y="45" width="50" height="45" fill="#f5d693" />
    <polygon points="50,20 15,45 85,45" fill="#e07a5f" />
    <rect x="40" y="65" width="16" height="25" fill="#a07a60" />
    <rect x="62" y="55" width="10" height="12" fill="#8ed1fc" />
    <rect x="28" y="55" width="10" height="12" fill="#8ed1fc" />
  </svg>
);

export default function DistanceAndScale({ onComplete, onBack }) {
  // State for new guided activity
  const [selectedDistance, setSelectedDistance] = useState(4);
  const [isCalculated, setIsCalculated] = useState(false);
  const [challengeAnswer, setChallengeAnswer] = useState(null); // 'correct', 'incorrect', or null
  const [mainPage, setMainPage] = useState(1);
  const [rightPage, setRightPage] = useState(1);
  const [leftPage, setLeftPage] = useState(1);

  const realDistance = selectedDistance * 500;

  return (
    <div className="distance-scale-container">
      <style>{`
        .distance-scale-container {
          --navy: #78350F; --ink: #3D2E24; --mut: #92400E; --card: #FFF9F0; --cardline: #F2DFBC;
          --amber: #D97706; --blue: #2563EB; --green: #16A34A; --violet: #7C3AED;
          --paper1: #FFF9F0; --paper2: #FBF3E3;
          --serif: "Fraunces", Georgia, serif; --mono: "Space Grotesk", sans-serif; --geo: "Space Grotesk", system-ui, sans-serif;
          
          font-family: var(--geo);
          color: var(--ink);
          height: 100%;
          display: flex;
          flex-direction: column;
          min-height: 650px;
          box-sizing: border-box;
          border-radius: 16px;
          background: linear-gradient(160deg, #F7F1E2 0%, #EFE6D2 100%);
        }
        
        .distance-scale-container * {
          box-sizing: border-box;
        }

        .ds-spread {
          flex: 1; display: grid; grid-template-columns: 1fr 1fr; border-radius: 16px; overflow: hidden; position: relative;
          border: 2px solid #F2DFBC; box-shadow: 0 8px 30px rgba(60,40,20,0.06);
          background: #EFE6D2;
        }
        .ds-spread::after { content:""; position:absolute; left:50%; top:0; bottom:0; width:2px; background: #F2DFBC; z-index:3; }

        .ds-single-pane { grid-template-columns: 1fr; width: 100%; }
        .ds-single-pane::after { display: none; }
        .ds-left, .ds-right { border-left: none !important; }

        .ds-ribbon { position:absolute; top:-6px; left:calc(50% - 10px); width:20px; height:64px; background:#D97706; z-index:4; border-radius:0 0 3px 3px; }
        
        .ds-left {
          background: linear-gradient(160deg, #FFF9F0 0%, #FBF3E3 100%);
          padding: clamp(14px, 1.8vw, 24px);
          display: flex;
          flex-direction: column;
          min-height: 0;
          overflow: hidden;
          justify-content: space-between;
        }
        .ds-eyebrow {
          font-family: var(--geo);
          font-size: 15px;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: var(--amber);
          font-weight: 800;
          margin-bottom: 2px;
        }
        .ds-h1 {
          font-family: var(--serif);
          font-weight: 900;
          color: var(--navy);
          font-size: clamp(28px, 3.1999999999999997vw, 40px);
          line-height: 1.15;
          margin: 0 0 2px 0;
        }
        .ds-sub {
          font-family: var(--serif);
          font-style: italic;
          color: #92400E;
          font-size: clamp(19px, 2.0vw, 21px);
          margin-bottom: 4px;
          line-height: 1.35;
          text-align: justify;
          text-justify: inter-word;
        }
        .ds-left p {
          font-size: 17px;
          line-height: 1.45;
          color: var(--ink);
          margin-bottom: 8px;
          margin-top: 0;
          font-weight: 600;
          text-align: justify;
          text-justify: inter-word;
        }
        .ds-left p b { color:var(--navy); font-weight:800; }
        
        .ds-comp { display:flex; gap:8px; margin:4px 0 14px; flex-wrap:wrap; }
        .ds-comp span { cursor: pointer; font-family:var(--geo); font-size: 16px; font-weight:700; padding:6px 14px; border-radius:8px; border:1.5px solid #F2DFBC; background:#FFF9F0; color:#92400E; user-select: none; }
        .ds-comp span.ds-on { background:#92400E; color:#fff; border-color:#92400E; }
        
        .ds-scaleex { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin:6px 0 14px; }
        .ds-scaleex .ds-e { background:#FFFFFF; border:1.5px solid #F2DFBC; border-radius:10px; padding:11px 13px; }
        .ds-scaleex .ds-e .ds-k { font-family:var(--geo); font-size: 15px; letter-spacing:.06em; color:#92400E; text-transform:uppercase; margin-bottom:0; font-weight:800; }
        .ds-scaleex .ds-e .ds-v { font-weight:800; color:var(--navy); font-size: clamp(19px, 2.1vw, 22px); margin-top:3px; margin-bottom:0; }
        
        .ds-dyk { margin-top:auto; background:#FEF3C7; border:1.5px solid #FDE68A; border-left:5px solid var(--amber); border-radius:10px; padding:clamp(10px,1.4vw,14px); }
        .ds-dyk h4 { display:flex; gap:7px; align-items:center; color:#92400E; font-weight:800; font-size: 17px; margin-bottom:4px; margin-top:0; }
        .ds-dyk p { color:#78350F; font-size: 16px; lineHeight:1.45; margin:0; font-weight:600; text-align: justify; text-justify: inter-word; }
        
        .ds-right {
          background: linear-gradient(160deg, #FFF9F0 0%, #FBF3E3 100%);
          padding: clamp(14px, 1.8vw, 24px);
          display: flex;
          flex-direction: column;
          min-height: 0;
          position: relative;
          border-left: 2px solid #F2DFBC;
          justify-content: space-between;
        }
        .ds-rlabel {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--navy);
          font-family: var(--serif);
          font-weight: 900;
          font-size: clamp(28px, 3.1999999999999997vw, 40px);
          line-height: 1.15;
          margin: 0 0 2px 0;
        }
        .ds-rsub {
          font-family: var(--serif);
          font-style: italic;
          font-size: clamp(19px, 2.0vw, 21px);
          color: #92400E;
          margin-bottom: 4px;
          line-height: 1.35;
          font-weight: 600;
          text-align: justify;
          text-justify: inter-word;
        }
        
        .ds-scroll { flex:1; min-height:0; overflow:hidden; display:flex; flex-direction:column; justify-content:space-between; position: relative; }

        .ds-step-card {
          background: #FFFFFF;
          border: 1.5px solid #F2DFBC;
          border-radius: 16px;
          padding: clamp(12px, 1.8vh, 18px);
          box-shadow: 0 4px 12px rgba(60,40,20,0.03);
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          min-height: 0;
        }
        .ds-step-card > :nth-child(2) {
          margin-top: auto;
          margin-bottom: auto;
        }
        
        .ds-step-title {
          font-family: var(--geo);
          font-weight: 800;
          font-size: 28px;
          color: var(--navy);
          margin-bottom: 12px;
          display: flex;
          align-items: flex-start;
          flex-direction: column;
        }
        .ds-step-title-num {
          font-family: var(--geo);
          font-size: 20px;
          color: var(--amber);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 2px;
          font-weight: 800;
        }

        .ds-step1-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
        }
        .ds-step1-badge {
          background: var(--blue);
          color: #fff;
          font-family: var(--geo);
          font-weight: 900;
          font-size: 28px;
          padding: 10px 28px;
          border-radius: 999px;
          box-shadow: 0 6px 16px rgba(47,109,240,0.25);
        }
        .ds-step1-desc {
          font-size: 17px;
          color: var(--ink);
          line-height: 1.45;
          max-width: 320px;
          margin: 0;
          font-weight: 600;
          text-align: justify;
          text-justify: inter-word;
        }

        .ds-step2-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }
        .ds-seg-group {
          display: flex;
          gap: 10px;
          width: 100%;
        }
        .ds-seg-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px;
          border-radius: 12px;
          border: 1.5px solid var(--cardline);
          background: #FFF9F0;
          cursor: pointer;
          font-family: var(--geo);
          font-size: 17px;
          font-weight: 800;
          color: #78350F;
          transition: all 0.2s;
        }
        .ds-seg-btn.ds-seg-active {
          border-color: var(--amber);
          background: #FEF3C7;
          color: #92400E;
        }
        .ds-seg-circle {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 2px solid currentColor;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ds-seg-btn.ds-seg-active .ds-seg-circle::after {
          content: '';
          width: 6px;
          height: 6px;
          background: currentColor;
          border-radius: 50%;
        }

        .ds-calc-box {
          background: #FFF9F0;
          border: 1.5px solid #F2DFBC;
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .ds-calc-row {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--geo);
          font-size: 22px;
          font-weight: 800;
          color: var(--navy);
        }
        .ds-calc-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .ds-calc-label {
          font-family: var(--geo);
          font-size: 15px;
          color: var(--mut);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 800;
        }
        .ds-calc-val {
          background: #FFFFFF;
          padding: 5px 14px;
          border-radius: 8px;
          border: 1.5px solid #F2DFBC;
          color: var(--navy);
          font-weight: 800;
        }
        .ds-calc-val-q {
          background: var(--amber);
          color: #fff;
          border: none;
          font-weight: 800;
        }

        .ds-primary-btn {
          background: var(--amber);
          color: #fff;
          font-family: var(--geo);
          font-weight: 800;
          font-size: 17px;
          padding: 12px 28px;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(217,119,6,0.3);
          transition: all 0.2s;
          width: 100%;
          margin-top: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .ds-primary-btn:hover {
          background: #B45309;
          color: #fff;
          transform: scale(1.02);
        }
        .ds-primary-btn:active {
          transform: scale(0.98);
        }

        .ds-result-card {
          background: #DCFCE7;
          border: 1.5px solid #86EFAC;
          border-radius: 16px;
          padding: 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          animation: ds-fade 0.4s ease-out;
          flex: 1;
          justify-content: center;
        }
        @keyframes ds-fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .ds-res-title {
          color: #166534;
          font-size: 24px;
          font-weight: 900;
          margin: 6px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ds-res-text {
          font-size: 17px;
          color: var(--ink);
          margin-bottom: 8px;
          font-weight: 600;
          text-align: justify;
          text-justify: inter-word;
        }
        .ds-res-big {
          font-size: 32px;
          font-weight: 900;
          color: #166534;
          background: #fff;
          padding: 6px 20px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(22,101,52,0.1);
          border: 1.5px solid #86EFAC;
        }
        
        .ds-res-comp {
          display: flex;
          flex-direction: column;
          gap: 6px;
          width: 100%;
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1.5px solid #86EFAC;
        }
        
        .ds-rem-card {
          background: #FEF3C7;
          border: 1.5px solid #FDE68A;
          border-radius: 12px;
          padding: 14px;
        }
        .ds-rem-title {
          font-family: var(--geo);
          font-weight: 800;
          font-size: 17px;
          color: #92400E;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .ds-rem-list {
          margin: 0;
          padding-left: 20px;
          color: var(--ink);
          font-size: 16px;
          line-height: 1.45;
          font-weight: 600;
          text-align: justify;
          text-justify: inter-word;
        }

        .ds-chal-btn {
          background: #fff;
          border: 2px solid var(--cardline);
          border-radius: 12px;
          padding: 10px;
          font-family: var(--geo);
          font-weight: 800;
          font-size: 17px;
          color: var(--navy);
          cursor: pointer;
          flex: 1;
          transition: all 0.2s;
        }
        .ds-chal-btn:hover { border-color: var(--blue); color: var(--blue); }
        .ds-chal-correct { background: var(--green); border-color: var(--green); color: #fff; pointer-events: none; }
        .ds-chal-incorrect { background: #fee2e2; border-color: #ef4444; color: #ef4444; pointer-events: none; }
        
        .ds-next-act {
          position: sticky;
          bottom: 0;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-top: 14px;
          padding-bottom: 14px;
          background: linear-gradient(to top, #FFF9F0 80%, transparent);
          z-index: 10;
        }
        
        .ds-nav-btn {
          font-family: var(--geo); font-weight: 700; border: none; cursor: pointer;
          background: var(--amber); color: #fff; padding: 10px 22px; border-radius: 999px; font-size: 15px; transition: all .2s;
          box-shadow: 0 4px 15px rgba(245, 166, 35, 0.4);
        }
        .ds-nav-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(245, 166, 35, 0.5);
        }
        .ds-complete-btn {
          font-family: var(--geo); font-weight: 700; border: none; cursor: pointer;
          background: var(--green); color: #fff; padding: 10px 22px; border-radius: 999px; font-size: 15px; transition: all .2s;
          box-shadow: 0 4px 15px rgba(18, 161, 95, 0.4);
        }
        .ds-complete-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(18, 161, 95, 0.5);
        }

        /* NEW LEFT PANEL STYLES */
        .ds-left-layout {
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
          gap: clamp(6px, 1vh, 10px);
        }

        .ds-left-section {
          display: flex;
          flex-direction: column;
        }
        
        .ds-s1-header {
          flex: 0 0 auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-bottom: 2px;
        }
        
        .ds-s2-what {
          flex: 0 0 auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .ds-s3-visual {
          flex: 1;
          min-height: 0;
          position: relative;
          background-color: #FFF9F0;
          background-image: 
            linear-gradient(#F2DFBC 1px, transparent 1px),
            linear-gradient(90deg, #F2DFBC 1px, transparent 1px);
          background-size: 20px 20px;
          border: 1.5px solid #F2DFBC;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          overflow: hidden;
        }
        
        .ds-s4-examples {
          flex: 0 0 auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .ds-section-heading {
          font-family: var(--geo);
          font-weight: 800;
          font-size: clamp(19px, 1.7999999999999998vw, 21px);
          margin: 0 0 4px 0;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .ds-h-blue { color: var(--blue); }
        .ds-h-purple { color: var(--violet); }
        .ds-h-green { color: var(--green); }
        
        /* What is Scale Blocks */
        .ds-what-blocks {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          justify-content: space-between;
        }
        .ds-what-block {
          flex: 1;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 6px;
        }
        .ds-what-icon {
          color: var(--amber);
          flex-shrink: 0;
          margin-top: 1px;
        }
        .ds-what-text {
          font-family: var(--geo);
          font-size: 17px;
          font-weight: 600;
          color: var(--ink);
          line-height: 1.35;
          margin: 0;
          text-align: justify;
          text-justify: inter-word;
        }

        /* Main Visual Redesign */
        .ds-rw-zone {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 2;
        }
        
        .ds-zone-badge {
          background: var(--navy);
          color: #fff;
          font-family: var(--geo);
          font-weight: 800;
          font-size: 14px;
          letter-spacing: 0.08em;
          padding: 3px 12px;
          border-radius: 999px;
          text-transform: uppercase;
          box-shadow: 0 4px 10px rgba(120,53,15,0.2);
          margin-bottom: 6px;
        }
        
        .ds-zone-badge-green {
          background: var(--green);
          box-shadow: 0 4px 10px rgba(22,163,74,0.2);
        }

        .ds-scene {
          width: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          position: relative;
        }

        .ds-ruler-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          padding-bottom: 10px;
          position: relative;
        }

        .ds-ruler {
          width: 90%;
          height: 2.5px;
          background: var(--amber);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ds-ruler::before, .ds-ruler::after {
          content: "";
          position: absolute;
          border-style: solid;
          border-width: 4px 6px;
          top: -3px;
        }
        
        .ds-ruler::before { left: -4px; border-color: transparent var(--amber) transparent transparent; }
        .ds-ruler::after { right: -4px; border-color: transparent transparent transparent var(--amber); }

        .ds-ruler-map { background: var(--green); }
        .ds-ruler-map::before { border-color: transparent var(--green) transparent transparent; }
        .ds-ruler-map::after { border-color: transparent transparent transparent var(--green); }

        .ds-ruler-label {
          background: #FFF9F0;
          border: 1.5px solid var(--amber);
          color: var(--navy);
          font-family: var(--geo);
          font-weight: 800;
          font-size: 14.5px;
          padding: 2px 10px;
          border-radius: 999px;
          position: absolute;
          top: -12px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        }
        
        .ds-ruler-label-map {
          border-color: var(--green);
          color: var(--green);
          top: auto;
          bottom: -16px;
        }

        .ds-scale-hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          margin: 4px 0;
          z-index: 3;
        }
        
        .ds-hero-badge {
          background: var(--amber);
          color: #fff;
          font-family: var(--geo);
          font-weight: 900;
          font-size: clamp(22px, 2.8vw, 28px);
          padding: 6px 28px;
          border-radius: 999px;
          box-shadow: 0 6px 20px rgba(217,119,6,0.3);
        }
        
        .ds-hero-caption {
          font-family: var(--geo);
          font-size: 16px;
          color: var(--mut);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 800;
        }

        .ds-callout {
          position: absolute;
          bottom: 8px;
          right: 8px;
          background: rgba(255, 249, 240, 0.95);
          backdrop-filter: blur(4px);
          border: 1.5px solid #F2DFBC;
          border-radius: 8px;
          padding: 6px 10px;
          box-shadow: 0 4px 12px rgba(60,40,20,0.05);
          max-width: 140px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          z-index: 4;
        }
        
        .ds-callout-right {
          position: relative;
          bottom: auto;
          right: auto;
          max-width: 100%;
          width: 100%;
          margin-top: auto;
          margin-bottom: 8px;
          padding: 12px 16px;
          box-sizing: border-box;
          box-shadow: 0 4px 16px rgba(60,40,20,0.06);
          background: rgba(255, 252, 246, 0.95);
        }
        
        .ds-callout-title {
          font-size: 16px;
          font-weight: 800;
          color: var(--amber);
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .ds-callout-right .ds-callout-title {
          font-size: 20px;
          margin-bottom: 4px;
        }
        
        .ds-callout-text {
          font-family: var(--geo);
          font-size: 16px;
          font-weight: 600;
          color: var(--ink);
          line-height: 1.35;
          margin: 0;
          text-align: justify;
          text-justify: inter-word;
        }
        
        .ds-callout-right .ds-callout-text {
          font-size: 19px;
          text-align: left;
          line-height: 1.45;
          text-justify: auto;
        }
        
        /* Examples */
        .ds-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .ds-card {
          background: #FFFFFF;
          border: 1.5px solid #F2DFBC;
          border-radius: 10px;
          padding: 8px 12px;
          box-shadow: 0 2px 8px rgba(60,40,20,0.03);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ds-card-icon {
          flex: 0 0 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ds-card-content {
          flex: 1;
        }
        .ds-card-title {
          font-family: var(--geo);
          font-weight: 800;
          font-size: 15px;
          color: var(--violet);
          margin-bottom: 1px;
        }
        .ds-card-val {
          font-family: var(--geo);
          font-weight: 900;
          font-size: clamp(17px, 1.7000000000000002vw, 19px);
          color: var(--navy);
          margin-bottom: 1px;
        }
        .ds-card-cap {
          font-size: 15px;
          color: var(--mut);
          line-height: 1.25;
          text-align: justify;
          text-justify: inter-word;
        }

        @media (max-aspect-ratio:1/1), (max-width:900px) {
          .ds-spread { grid-template-columns:1fr; }
          .ds-spread::after { display:none; }
          .ds-left { min-height:auto; }
          .ds-cards-grid { grid-template-columns: 1fr; }
          .ds-what-blocks { flex-direction: column; gap: 12px; }
          .ds-what-block { flex-direction: row; align-items: center; }
        }
      `}</style>

      {mainPage === 1 && (
        <div className="ds-spread ds-single-pane" style={{ flex: 1, minHeight: 0 }}>
          <div className="ds-ribbon"></div>
          {/* LEFT · concept */}
          <div className="ds-left">
            <div className="ds-left-layout">

              {/* Section 1: Header */}
              <div className="ds-s1-header">
                <div className="ds-eyebrow">Chapter 1 · Distance &amp; Scale</div>
                <h1 className="ds-h1">Shrinking the World</h1>
                <div className="ds-sub">How a huge place fits on paper</div>
              </div>

                                {/* Section 2: What is Scale? */}
                  <div className="ds-s2-what">
                    <h3 className="ds-section-heading ds-h-blue">
                      <Map size={18} strokeWidth={2.5} /> What is Scale?
                    </h3>
                    <div className="ds-what-blocks" style={{ flexDirection: 'column', gap: '6px' }}>
                      <div className="ds-what-block">
                        <Map className="ds-what-icon" size={18} strokeWidth={2.5} />
                        <p className="ds-what-text">Maps are drawn smaller than the real world.</p>
                      </div>
                      <div className="ds-what-block">
                        <Target className="ds-what-icon" size={18} strokeWidth={2.5} />
                        <p className="ds-what-text">Scale is the ratio between map distance and real distance.</p>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Main Visual */}
                  <div className="ds-s3-visual">
                    <div style={{ position: 'absolute', opacity: 0.04, right: '-30px', top: '-30px', pointerEvents: 'none' }}>
                      <Compass size={180} />
                    </div>

                    <div style={{ position: 'absolute', top: '20%', bottom: '20%', width: '1px', background: 'rgba(47,109,240,0.2)', zIndex: 1, left: '50%', transform: 'translateX(-50%)' }}></div>

                    {/* Zone 1: Real World */}
                    <div className="ds-rw-zone">
                      <div className="ds-zone-badge">Real World</div>
                      <div className="ds-scene">
                        <SchoolVector size={68} />
                        <div className="ds-ruler-container">
                          <div className="ds-ruler">
                            <div className="ds-ruler-label">500 metres</div>
                          </div>
                        </div>
                        <HouseVector size={68} />
                      </div>
                    </div>

                    {/* Zone 2: Scale Badge */}
                    <div className="ds-scale-hero">
                      <div className="ds-hero-badge">1 cm = 500 m</div>
                      <div className="ds-hero-caption">Map Scale</div>
                    </div>

                    {/* Zone 3: Map */}
                    <div className="ds-rw-zone" style={{ width: '35%' }}>
                      <div className="ds-zone-badge ds-zone-badge-green">Map</div>
                      <div className="ds-scene">
                        <SchoolVector size={30} />
                        <div className="ds-ruler-container">
                          <div className="ds-ruler ds-ruler-map">
                            <div className="ds-ruler-label ds-ruler-label-map">1 cm</div>
                          </div>
                        </div>
                        <HouseVector size={30} />
                      </div>
                    </div>

                  </div>

              </div>
            </div>
          </div>
      )}

      {mainPage === 2 && (
        <div className="ds-spread ds-single-pane" style={{ flex: 1, minHeight: 0 }}>
          <div className="ds-ribbon"></div>
          {/* RIGHT · guided activity */}
          <div className="ds-right">
            <div className="ds-left-layout">

              {/* Section 1: Right Header (Parallel to Left Header) */}
              <div className="ds-s1-header">
                <div className="ds-eyebrow">Interactive Activity</div>
                <h2 className="ds-rlabel">📏 Let's Explore — Measure Distance</h2>
                <div className="ds-rsub">Let's find the real distance using the map scale.</div>
              </div>

              <div className="ds-scroll">

                {/* Step 1: Know the Scale */}
                {rightPage === 1 && (
                  <div className="ds-step-card">
                    <div className="ds-step-title">
                      <span className="ds-step-title-num">Step 1</span>
                      Know the Scale
                    </div>
                    <div className="ds-step1-content">
                      <div className="ds-step1-badge">1 cm = 500 m</div>
                      <p className="ds-step1-desc">
                        <MapPin size={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '4px', color: 'var(--amber)' }} />
                        This means that every 1 cm on the map represents 500 metres in the real world.
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 2: Measure the Road */}
                {rightPage === 2 && (
                  <div className="ds-step-card">
                    <div className="ds-step-title">
                      <div className="ds-step-title-num">Step 2</div>
                      <div>Measure the Road</div>
                    </div>
                    <div className="ds-step2-content">
                      <div className="ds-scene" style={{ width: `${selectedDistance * 15}%`, minWidth: '120px', transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)', margin: '0 auto', marginBottom: '8px' }}>
                        <SchoolVector size={38} />
                        <div className="ds-ruler-container" style={{ paddingBottom: '10px' }}>
                          <div className="ds-ruler ds-ruler-map" style={{ width: '100%' }}>
                            <div className="ds-ruler-label ds-ruler-label-map">{selectedDistance} cm</div>
                          </div>
                        </div>
                        <HouseVector size={38} />
                      </div>

                      <div className="ds-seg-group">
                        {[2, 4, 6].map(val => (
                          <button
                            key={val}
                            className={`ds-seg-btn ${selectedDistance === val ? 'ds-seg-active' : ''}`}
                            onClick={() => {
                              setSelectedDistance(val);
                              setIsCalculated(false);
                            }}
                          >
                            <div className="ds-seg-circle"></div>
                            {val} cm
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Calculate */}
                {rightPage === 3 && (
                  <div className="ds-step-card">
                    <div className="ds-step-title">
                      <span className="ds-step-title-num">Step 3</span>
                      Let's Calculate
                    </div>

                    <div className="ds-calc-box">
                      <div className="ds-calc-row">
                        <div className="ds-calc-item">
                          <span className="ds-calc-label">Map Distance</span>
                          <span className="ds-calc-val">{selectedDistance} cm</span>
                        </div>
                        <div>×</div>
                        <div className="ds-calc-item">
                          <span className="ds-calc-label">Scale</span>
                          <span className="ds-calc-val">500 m</span>
                        </div>
                        <div>=</div>
                        <div className="ds-calc-item">
                          <span className="ds-calc-label">Real Distance</span>
                          <span className="ds-calc-val ds-calc-val-q">?</span>
                        </div>
                      </div>
                    </div>

                    {!isCalculated && (
                      <button
                        className="ds-primary-btn"
                        onClick={() => {
                          setIsCalculated(true);
                          setRightPage(4);
                        }}
                      >
                        Find the Real Distance
                      </button>
                    )}
                  </div>
                )}

                {/* Step 4: Result */}
                {rightPage === 4 && isCalculated && (
                  <div className="ds-result-card">
                    <div className="ds-res-text"><b>{selectedDistance} cm</b> on the map represents</div>
                    <div className="ds-res-big">{realDistance.toLocaleString()} metres</div>
                    <div className="ds-res-text" style={{ marginTop: '10px', marginBottom: 0 }}>in the real world.</div>

                    <div className="ds-res-comp">
                      <div className="ds-scene">
                        <SchoolVector size={28} />
                        <div className="ds-ruler-container" style={{ paddingBottom: '10px' }}>
                          <div className="ds-ruler ds-ruler-map" style={{ width: '40%' }}>
                            <div className="ds-ruler-label ds-ruler-label-map">{selectedDistance} cm</div>
                          </div>
                        </div>
                        <HouseVector size={28} />
                      </div>
                      <div style={{ textAlign: 'center', color: 'var(--green)', fontSize: '13px' }}>↓</div>
                      <div className="ds-scene">
                        <SchoolVector size={46} />
                        <div className="ds-ruler-container" style={{ paddingBottom: '10px' }}>
                          <div className="ds-ruler" style={{ width: '90%' }}>
                            <div className="ds-ruler-label">{realDistance.toLocaleString()} metres</div>
                          </div>
                        </div>
                        <HouseVector size={46} />
                      </div>
                    </div>
                  </div>
                )}

              </div>
              
              {/* Remember Callout moved to right side */}
              <div className="ds-callout ds-callout-right">
                <div className="ds-callout-title">
                  <Lightbulb size={16} strokeWidth={3} /> Remember
                </div>
                <p className="ds-callout-text">Maps are smaller, but the scale tells us the real distance.</p>
              </div>

              {/* Sub-page navigation — Parallel Symmetrical Baseline */}
              <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1.5px solid #F2DFBC', paddingTop: '8px', marginTop: '6px' }}>
                <button
                  onClick={() => setRightPage(p => Math.max(1, p - 1))}
                  disabled={rightPage === 1}
                  style={{
                    fontFamily: 'var(--geo)', fontWeight: 800, fontSize: '15px',
                    background: '#FFF9F0', color: '#78350F', border: '1.5px solid #F2DFBC', borderRadius: '999px',
                    padding: '8px 18px', cursor: rightPage === 1 ? 'not-allowed' : 'pointer',
                    opacity: rightPage === 1 ? 0.35 : 1, transition: 'all 0.2s'
                  }}
                >
                  ◀ Prev
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '15px', fontWeight: 700, color: '#92400E' }}>
                  <span>Step {rightPage} of {isCalculated ? 4 : 3}</span>
                  {[1, 2, 3, ...(isCalculated ? [4] : [])].map(step => (
                    <span key={step} style={{ width: '9px', height: '9px', borderRadius: '50%', background: rightPage === step ? '#D97706' : '#F2DFBC' }} />
                  ))}
                </div>
                <button
                  onClick={() => {
                    const maxPage = isCalculated ? 4 : 3;
                    setRightPage(p => Math.min(maxPage, p + 1));
                  }}
                  disabled={rightPage === (isCalculated ? 4 : 3)}
                  style={{
                    fontFamily: 'var(--geo)', fontWeight: 800, fontSize: '15px',
                    background: '#F59E0B', color: '#fff', border: 'none', borderRadius: '999px',
                    padding: '8px 18px', cursor: rightPage === (isCalculated ? 4 : 3) ? 'not-allowed' : 'pointer',
                    opacity: rightPage === (isCalculated ? 4 : 3) ? 0.35 : 1, transition: 'all 0.2s'
                  }}
                >
                  Next ▶
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      <ChapterBackFooter
        onBack={mainPage === 1 ? onBack : () => setMainPage(1)}
        nextLabel={
          mainPage === 1
            ? 'Continue to Activity'
            : 'Continue to Directions'
        }
        onNext={
          mainPage === 1
            ? () => setMainPage(2)
            : onComplete
        }
        nextVariant={mainPage === 1 ? 'blue' : 'navy'}
      />
    </div>
  );
}

