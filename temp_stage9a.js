import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/science/class6/chapter6/MaterialsAroundUs/components/Stage9a_WhatIsMatter.jsx");const React = __vite__cjsImport0_react; const useState = __vite__cjsImport0_react["useState"]; const forwardRef = __vite__cjsImport0_react["forwardRef"]; const useImperativeHandle = __vite__cjsImport0_react["useImperativeHandle"];const _jsxDEV = __vite__cjsImport4_react_jsxDevRuntime["jsxDEV"];const PropTypes = __vite__cjsImport1_propTypes;import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=14d48983";
import __vite__cjsImport1_propTypes from "/node_modules/.vite/deps/prop-types.js?v=14d48983";
import AirExperiments3D from "/src/science/class6/chapter6/MaterialsAroundUs/components/AirExperiments3D.jsx?t=1789154960376";
import { motion, AnimatePresence } from "/node_modules/.vite/deps/framer-motion.js?v=14d48983";
var _jsxFileName = "C:/Users/GANES/Futura-Edtech/src/science/class6/chapter6/MaterialsAroundUs/components/Stage9a_WhatIsMatter.jsx";
import __vite__cjsImport4_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=14d48983";
var _s = $RefreshSig$();
const Stage9a_WhatIsMatter = ({ onComplete, addXp, registerBackHandler }) => {
	_s();
	const [currentStep, setCurrentStep] = useState(1);
	const [completed, setCompleted] = useState({
		1: false,
		2: false,
		3: false
	});
	const goStep = (n) => {
		setCurrentStep(n);
	};
	React.useEffect(() => {
		if (registerBackHandler) {
			registerBackHandler(() => {
				if (currentStep > 1) {
					setCurrentStep(currentStep - 1);
					return true;
				}
				return false;
			});
		}
	}, [currentStep, registerBackHandler]);
	const markComplete = (n) => {
		setCompleted((prev) => ({
			...prev,
			[n]: true
		}));
	};
	// Step 1: Define Matter
	const [picked, setPicked] = useState({
		space: false,
		mass: false
	});
	const pickChip = (which) => {
		if (completed[1]) return;
		const newPicked = {
			...picked,
			[which]: true
		};
		setPicked(newPicked);
		if (newPicked.space && newPicked.mass) {
			markComplete(1);
		}
	};
	// Step 2: Investigate Air
	const [airDone, setAirDone] = useState(false);
	const handleAirComplete = () => {
		if (!airDone) {
			setAirDone(true);
			markComplete(2);
		}
	};
	// Step 3: Sort Evidence
	const [sortItems, setSortItems] = useState([
		{
			id: "kg",
			ans: "mass"
		},
		{
			id: "g",
			ans: "mass"
		},
		{
			id: "L",
			ans: "volume"
		},
		{
			id: "mL",
			ans: "volume"
		},
		{
			id: "m³",
			ans: "volume"
		}
	]);
	const [massBin, setMassBin] = useState([]);
	const [volumeBin, setVolumeBin] = useState([]);
	const [askUnit, setAskUnit] = useState(null);
	const [shakeUnit, setShakeUnit] = useState(null);
	const answerSort = (choice) => {
		if (!askUnit) return;
		if (choice === askUnit.ans) {
			if (choice === "mass") setMassBin([...massBin, askUnit.id]);
			else setVolumeBin([...volumeBin, askUnit.id]);
			const newItems = sortItems.filter((i) => i.id !== askUnit.id);
			setSortItems(newItems);
			setAskUnit(null);
			if (newItems.length === 0) {
				markComplete(3);
				setShowFinalEvidence(true);
			}
		} else {
			setAskUnit(null);
			setShakeUnit(askUnit.id);
			setTimeout(() => setShakeUnit(null), 400);
		}
	};
	// Final Evidence & Close Case
	const [caseClosed, setCaseClosed] = useState(false);
	const [showFinalEvidence, setShowFinalEvidence] = useState(false);
	const handleCloseCase = () => {
		setCaseClosed(true);
		if (typeof addXp === "function") addXp(50);
		if (typeof onComplete === "function") {
			setTimeout(onComplete, 3e3);
		}
	};
	const clueTags = {
		1: completed[1] ? "Clue found ✓" : "Define matter",
		2: completed[2] ? "Air is matter ✓" : "Is air a suspect?",
		3: completed[3] ? "Evidence filed ✓" : "Sort the evidence"
	};
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "case-wrap",
		style: {
			position: "absolute",
			top: 0,
			left: 0,
			right: 0,
			bottom: "80px",
			overflow: "hidden"
		},
		children: [
			/* @__PURE__ */ _jsxDEV("style", { children: `
        .case-wrap {
          --bg-cream: #F4F1E1;
          --border-color: #D2C4A7;
          --title-dark: #43372B;
          --subtitle-orange: #B84C23;
          --card-bg: #FCFAF5;
          --ink: #43372B;
          --ink-light: #5A4E3C;
          --white: #FFFFFF;
          --success-green: #38763E;

          background-color: var(--bg-cream);
          color: var(--ink);
          font-family: 'Inter', sans-serif;
          line-height: 1.3;
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          min-height: 0;
        }

        .case-wrap * { box-sizing: border-box; }

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

        /* Header */
        .c-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 40px;
          background: var(--bg-cream);
          flex: none;
        }
        .c-header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .c-header-left svg {
          color: var(--ink);
          width: 48px;
          height: 48px;
        }
        .c-header-left h1 {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          color: var(--title-dark);
          margin: 0;
          font-weight: 700;
        }
        .c-header-left p {
          font-size: 18px;
          color: var(--subtitle-orange);
          margin: 0;
          font-weight: 500;
        }
        .c-header-right {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 20px;
          font-weight: 600;
          color: var(--ink);
        }
        .clue-circles {
          display: flex;
          gap: 8px;
        }
        .c-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
        }
        .c-circle.done {
          background: var(--success-green);
          border-color: var(--success-green);
          color: white;
        }

        .c-top-nav {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 24px;
          padding: 20px 40px;
          background: #EBE5D3;
          border-bottom: 2px solid var(--border-color);
          border-top: 2px solid var(--border-color);
          flex: none;
        }

        .c-tab {
          display: flex;
          gap: 12px;
          align-items: center;
          background: var(--bg-cream);
          border: 2px solid var(--border-color);
          border-radius: 8px;
          padding: 10px 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: 240px;
        }
        
        .c-tab .badge {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: #5A4E3C;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 700;
          color: var(--white);
          flex: none;
        }
        
        .c-tab .txt { display: flex; flex-direction: column; }
        .c-tab .txt b { font-size: 18px; color: var(--title-dark); line-height: 1.2; }
        .c-tab .txt span { font-size: 14px; color: var(--ink-light); }

        .c-tab.active { background: var(--white); border-color: var(--subtitle-orange); box-shadow: 0 4px 12px rgba(184, 76, 35, 0.1); transform: translateY(-2px); }
        .c-tab.active .badge { background: var(--success-green); color: var(--white); }
        .c-tab.active .txt b { color: var(--subtitle-orange); }
        
        .c-tab.solved .badge { background: var(--success-green); color: var(--white); }

        .c-stage {
          padding: 12px 40px 16px 40px;
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
          position: relative;
        }

        .c-panel {
          display: none;
          flex: 1;
          flex-direction: column;
          min-height: 0;
        }
        .c-panel.active {
          display: flex;
        }

        /* Clue 1: Two Column Layout */
        .clue1-layout {
          display: flex;
          gap: 60px;
          flex: 1;
          min-height: 0;
        }
        
        .clue1-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding-top: 0;
        }
        
        .clue1-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          min-height: 0;
          justify-content: flex-end;
        }

        .clue1-img-wrap {
          flex: 1;
          width: 100%;
          min-height: 0;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 20px;
          display: flex;
        }

        .clue1-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .clue1-left h2 {
          font-family: 'Playfair Display', serif;
          font-size: 48px;
          font-weight: 800;
          color: var(--title-dark);
          margin: 0 0 4px 0;
          line-height: 1.1;
        }

        .clue1-left p.lead {
          font-size: 28px;
          color: var(--ink);
          margin: 0 0 6px 0;
          line-height: 1.3;
        }
        
        .clue1-left p.lead b {
          color: var(--subtitle-orange);
        }

        .prop-card {
          background: var(--white);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 8px 12px;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.03);
          border-left: 6px solid var(--subtitle-orange);
        }
        
        .prop-card.green {
          border-left-color: var(--success-green);
        }

        .prop-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #F8EDE6;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: none;
        }
        .prop-card.green .prop-icon { background: #EAF2EC; }
        
        .prop-icon svg {
          width: 28px;
          height: 28px;
          color: var(--subtitle-orange);
        }
        .prop-card.green .prop-icon svg { color: var(--success-green); }

        .prop-txt {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .prop-txt h4 {
          margin: 0;
          font-size: 28px;
          font-weight: 800;
          color: var(--subtitle-orange);
        }
        .prop-card.green .prop-txt h4 {
          color: var(--success-green);
        }
        .prop-txt p {
          margin: 0;
          font-size: 24px;
          color: var(--ink);
        }
        .prop-txt p b { color: var(--subtitle-orange); }

        .clue1-left p.body {
          font-size: 26px;
          color: var(--ink);
          margin: 6px 0;
          line-height: 1.3;
        }
        .clue1-left p.body b { color: var(--subtitle-orange); }

        .question-txt {
          font-size: 28px;
          font-weight: 800;
          color: var(--title-dark);
          margin-bottom: 4px;
        }

        .chip-opts {
          display: flex;
          gap: 16px;
          margin-bottom: 8px;
        }

        .chip-btn {
          flex: 1;
          padding: 12px 20px;
          font-size: 20px;
          font-weight: 700;
          text-align: center;
          background: var(--white);
          border: 2px solid var(--subtitle-orange);
          color: var(--subtitle-orange);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 0 var(--border-color);
        }

        .chip-btn:hover:not(:disabled) { transform: translateY(2px); box-shadow: 0 2px 0 var(--border-color); background: #FFF6F2; }
        .chip-btn.picked {
          background: var(--white);
          color: var(--subtitle-orange);
          box-shadow: none;
          transform: translateY(4px);
          border-color: var(--subtitle-orange);
        }

        .success-box {
          background: #E8F5E9;
          border: 2px solid var(--success-green);
          color: var(--success-green);
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 24px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .c-btn-action { 
          width: 100%;
          padding: 16px 32px;
          font-size: 22px;
          font-weight: 700;
          color: var(--white); 
          background: var(--subtitle-orange); 
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .c-btn-action:hover:not(:disabled) { background: #C55328; }
        .c-btn-action:disabled { opacity: 0.5; cursor: not-allowed; }

        /* General Stage classes */
        .c-panel { display: none; flex: 1; min-height: 0; flex-direction: column; }
        .c-panel.active { display: flex; animation: panelIn 0.3s ease forwards; }
        @keyframes panelIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .c-panel h2.gen { font-family: 'Playfair Display', serif; font-size: 34px; color: var(--title-dark); margin: 0 0 8px 0; border-bottom: 2px solid var(--border-color); padding-bottom: 12px; flex: none; }
        .c-panel .sub { font-size: 22px; color: var(--ink-light); margin: 0 0 20px 0; font-weight: 500; flex: none; }

        .c-sort-tray { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; background: var(--white); padding: 24px; border-radius: 16px; margin-bottom: 24px; border: 2px solid var(--border-color); flex: none; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
        .c-sort-chip { background: var(--bg-cream); border-radius: 8px; padding: 16px 32px; font-size: 24px; font-weight: 700; color: var(--title-dark); cursor: pointer; border: 2px solid var(--border-color); box-shadow: 0 4px 0 var(--border-color); transition: all 0.15s ease; }
        .c-sort-chip:hover { transform: translateY(2px); box-shadow: 0 2px 0 var(--border-color); }
        .c-sort-chip.shake { animation: shake 0.4s ease; border-color: var(--subtitle-orange); }

        .c-bins { display: flex; gap: 32px; flex: 1; min-height: 0; }
        .c-bin { flex: 1; border: 3px dashed var(--border-color); border-radius: 16px; padding: 24px; display: flex; flex-direction: column; gap: 16px; align-items: center; background: var(--white); overflow-y: auto; min-height: 0; }
        .c-bin h3 { font-size: 26px; color: var(--title-dark); font-weight: 700; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 1px; }
        .c-bin .item { background: var(--bg-cream); color: var(--title-dark); border: 2px solid var(--border-color); border-radius: 8px; padding: 12px 32px; font-size: 24px; font-weight: 700; box-shadow: 0 2px 0 var(--border-color); }

        .c-ask { position: absolute; inset: 0; background: rgba(0,0,0,0.5); display: none; align-items: center; justify-content: center; z-index: 10; backdrop-filter: blur(2px); }
        .c-ask.show { display: flex; }
        .c-ask-box { background: var(--white); border: 2px solid var(--border-color); border-radius: 16px; padding: 40px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.2); max-width: 500px; }
        .c-ask-box p { font-size: 28px; margin: 0 0 32px 0; color: var(--title-dark); font-weight: 700; line-height: 1.3; }
        .c-ask-box .opts { display: flex; gap: 20px; justify-content: center; }

        .c-final-evidence { margin-top: auto; padding: 24px 32px; background: var(--white); border: 2px solid var(--border-color); border-radius: 12px; flex: none; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .c-final-evidence h3 { font-size: 26px; color: var(--title-dark); margin: 0 0 16px; font-family: 'Playfair Display', serif; }
        .c-final-evidence ul { margin: 0; padding-left: 24px; list-style-type: square; color: var(--ink); font-size: 22px; display: flex; flex-direction: column; gap: 12px; }

        .c-btn-green { padding: 20px 40px; font-size: 24px; font-weight: 700; color: #fff; background: var(--success-green); border: none; border-radius: 12px; box-shadow: 0 6px 0 #2D6334; cursor: pointer; transition: all 0.15s ease; font-family: 'Inter', sans-serif; }
        .c-btn-green:hover:not(:disabled) { transform: translateY(2px); box-shadow: 0 4px 0 #2D6334; }
        .c-btn-green:disabled { opacity: 0.5; transform: translateY(6px); box-shadow: none; cursor: not-allowed; }

        .c-closed-overlay { position: absolute; inset: 0; background: rgba(244,241,225,0.96); display: none; align-items: center; justify-content: center; flex-direction: column; gap: 32px; text-align: center; z-index: 20; }
        .c-closed-overlay.show { display: flex; }
        .c-stamp-big { font-family: 'Playfair Display', serif; font-size: 80px; color: var(--success-green); border: 8px solid var(--success-green); padding: 20px 60px; border-radius: 16px; transform: rotate(-4deg); font-weight: 700; box-shadow: inset 0 0 0 4px rgba(255,255,255,0.5); }
      ` }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 103,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "c-stage",
				children: [
					/* @__PURE__ */ _jsxDEV("div", {
						className: `c-panel ${currentStep === 1 ? "active" : ""}`,
						children: /* @__PURE__ */ _jsxDEV("div", {
							className: "clue1-layout",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "clue1-left",
								children: [
									/* @__PURE__ */ _jsxDEV("div", {
										className: "c-header-left",
										style: {
											padding: "0",
											marginBottom: "24px"
										},
										children: [/* @__PURE__ */ _jsxDEV("svg", {
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2.5",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											children: [
												/* @__PURE__ */ _jsxDEV("path", { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 502,
													columnNumber: 139
												}, this),
												/* @__PURE__ */ _jsxDEV("path", { d: "M8 7h6" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 502,
													columnNumber: 219
												}, this),
												/* @__PURE__ */ _jsxDEV("path", { d: "M8 11h8" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 502,
													columnNumber: 243
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 502,
											columnNumber: 17
										}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h1", { children: "Case File 6.4 — The Mystery of Matter" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 504,
											columnNumber: 19
										}, this), /* @__PURE__ */ _jsxDEV("p", { children: "Follow the clues to crack what \"matter\" really means." }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 505,
											columnNumber: 19
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 503,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 501,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("h2", {
										style: { marginBottom: "8px" },
										children: "What makes something \"matter\"?"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 509,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("p", {
										className: "lead",
										style: { margin: "0 0 24px 0" },
										children: [/* @__PURE__ */ _jsxDEV("span", {
											style: {
												display: "block",
												marginBottom: "8px"
											},
											children: [
												"Everything around us is made of ",
												/* @__PURE__ */ _jsxDEV("b", { children: "matter" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 511,
													columnNumber: 105
												}, this),
												"."
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 511,
											columnNumber: 17
										}, this), /* @__PURE__ */ _jsxDEV("span", {
											style: { display: "block" },
											children: "Matter has two important properties:"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 512,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 510,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("div", {
										className: "prop-card",
										children: [/* @__PURE__ */ _jsxDEV("div", {
											className: "prop-icon",
											children: /* @__PURE__ */ _jsxDEV("svg", {
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "2",
												strokeLinecap: "round",
												strokeLinejoin: "round",
												children: [
													/* @__PURE__ */ _jsxDEV("path", { d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 517,
														columnNumber: 139
													}, this),
													/* @__PURE__ */ _jsxDEV("polyline", { points: "3.27 6.96 12 12.01 20.73 6.96" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 517,
														columnNumber: 278
													}, this),
													/* @__PURE__ */ _jsxDEV("line", {
														x1: "12",
														y1: "22.08",
														x2: "12",
														y2: "12"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 517,
														columnNumber: 338
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 517,
												columnNumber: 19
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 516,
											columnNumber: 17
										}, this), /* @__PURE__ */ _jsxDEV("div", {
											className: "prop-txt",
											children: [/* @__PURE__ */ _jsxDEV("h4", { children: "It occupies space." }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 520,
												columnNumber: 19
											}, this), /* @__PURE__ */ _jsxDEV("p", { children: [
												"Matter takes up space. This space is called ",
												/* @__PURE__ */ _jsxDEV("b", { children: "volume" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 521,
													columnNumber: 66
												}, this),
												"."
											] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 521,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 519,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 515,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("div", {
										className: "prop-card green",
										children: [/* @__PURE__ */ _jsxDEV("div", {
											className: "prop-icon",
											children: /* @__PURE__ */ _jsxDEV("svg", {
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "2",
												strokeLinecap: "round",
												strokeLinejoin: "round",
												children: [
													/* @__PURE__ */ _jsxDEV("path", { d: "M3.8 3.8l16.4 16.4" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 527,
														columnNumber: 139
													}, this),
													/* @__PURE__ */ _jsxDEV("path", { d: "M3.8 20.2l16.4-16.4" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 527,
														columnNumber: 175
													}, this),
													/* @__PURE__ */ _jsxDEV("circle", {
														cx: "12",
														cy: "12",
														r: "10"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 527,
														columnNumber: 212
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 527,
												columnNumber: 19
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 526,
											columnNumber: 17
										}, this), /* @__PURE__ */ _jsxDEV("div", {
											className: "prop-txt",
											children: [/* @__PURE__ */ _jsxDEV("h4", { children: "It has mass." }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 530,
												columnNumber: 19
											}, this), /* @__PURE__ */ _jsxDEV("p", { children: [/* @__PURE__ */ _jsxDEV("b", { children: "Mass" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 531,
												columnNumber: 22
											}, this), " tells us how much matter is present."] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 531,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 529,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 525,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("p", {
										className: "body",
										children: [
											"Water, sand, pebbles and a cup are all ",
											/* @__PURE__ */ _jsxDEV("b", { children: "matter" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 535,
												columnNumber: 74
											}, this),
											".",
											/* @__PURE__ */ _jsxDEV("br", {}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 535,
												columnNumber: 88
											}, this),
											"Anything that ",
											/* @__PURE__ */ _jsxDEV("b", { children: "occupies space" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 535,
												columnNumber: 107
											}, this),
											" and ",
											/* @__PURE__ */ _jsxDEV("b", { children: "has mass" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 535,
												columnNumber: 133
											}, this),
											" is called ",
											/* @__PURE__ */ _jsxDEV("b", { children: "matter" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 535,
												columnNumber: 159
											}, this),
											"."
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 535,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("div", {
										className: "question-txt",
										children: "What do these objects have in common?"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 537,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("div", {
										className: "chip-opts",
										style: {
											fontSize: "26px",
											fontWeight: 700,
											color: "var(--subtitle-orange)",
											width: "100%"
										},
										children: "They occupy space and have mass — so they are matter."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 539,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 500,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "clue1-right",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "clue1-img-wrap",
									children: /* @__PURE__ */ _jsxDEV("img", {
										src: "/assets/matter_examples_clue1.jpg",
										alt: "Examples of matter"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 548,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 547,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									style: { display: "flex" },
									children: /* @__PURE__ */ _jsxDEV("button", {
										onClick: () => {
											setCompleted((prev) => ({
												...prev,
												1: true
											}));
											goStep(2);
										},
										style: {
											position: "relative",
											overflow: "hidden",
											background: "#B04924",
											border: "none",
											color: "white",
											padding: "12px 24px",
											borderRadius: "16px",
											width: "100%",
											fontSize: "28px",
											fontFamily: "\"Merriweather\", \"Georgia\", serif",
											fontWeight: "900",
											cursor: "pointer",
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											gap: "12px",
											animation: "btnPulse 2s infinite",
											boxShadow: "0 4px 12px rgba(166, 75, 39, 0.3)"
										},
										children: [
											/* @__PURE__ */ _jsxDEV("div", { style: {
												position: "absolute",
												top: 0,
												bottom: 0,
												width: "40px",
												background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
												transform: "skewX(-20deg)",
												animation: "shineSweep 3s infinite"
											} }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 577,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ _jsxDEV("svg", {
												width: "32",
												height: "32",
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "#fef08a",
												strokeWidth: "2",
												strokeLinecap: "round",
												strokeLinejoin: "round",
												style: {
													position: "absolute",
													top: "10px",
													left: "16px",
													opacity: .9
												},
												children: /* @__PURE__ */ _jsxDEV("path", { d: "M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 583,
													columnNumber: 231
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 583,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ _jsxDEV("svg", {
												width: "24",
												height: "24",
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "#fef08a",
												strokeWidth: "2",
												strokeLinecap: "round",
												strokeLinejoin: "round",
												style: {
													position: "absolute",
													bottom: "10px",
													right: "16px",
													opacity: .9
												},
												children: /* @__PURE__ */ _jsxDEV("path", { d: "M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 584,
													columnNumber: 235
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 584,
												columnNumber: 19
											}, this),
											"Next Clue →"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 551,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 550,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 546,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 499,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 498,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: `c-panel ${currentStep === 2 ? "active" : ""}`,
						children: [
							/* @__PURE__ */ _jsxDEV("h2", {
								className: "gen",
								children: "Evidence Tray: Interrogate the air"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 594,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("p", {
								className: "sub",
								children: "Observe the two experiments and identify what they show about air."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 595,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								style: {
									flex: 1,
									minHeight: 0,
									display: "flex",
									flexDirection: "column"
								},
								children: currentStep === 2 && /* @__PURE__ */ _jsxDEV(AirExperiments3D, { onComplete: handleAirComplete }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 598,
									columnNumber: 36
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 597,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV(AnimatePresence, { children: completed[2] && /* @__PURE__ */ _jsxDEV(motion.div, {
								initial: {
									opacity: 0,
									y: 10
								},
								animate: {
									opacity: 1,
									y: 0
								},
								className: "success-box",
								style: {
									marginTop: "20px",
									justifyContent: "center"
								},
								children: [/* @__PURE__ */ _jsxDEV("svg", {
									width: "28",
									height: "28",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "3",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									children: /* @__PURE__ */ _jsxDEV("polyline", { points: "20 6 9 17 4 12" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 604,
										columnNumber: 161
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 604,
									columnNumber: 18
								}, this), "Verdict: air occupies space and has mass — case closed, air is matter."]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 603,
								columnNumber: 16
							}, this) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 601,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								style: {
									marginTop: "24px",
									display: "flex"
								},
								children: /* @__PURE__ */ _jsxDEV("button", {
									onClick: () => goStep(3),
									style: {
										position: "relative",
										overflow: "hidden",
										background: "#B04924",
										border: "none",
										color: "white",
										padding: "12px 24px",
										borderRadius: "16px",
										width: "100%",
										fontSize: "28px",
										fontFamily: "\"Merriweather\", \"Georgia\", serif",
										fontWeight: "900",
										cursor: "pointer",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										gap: "12px",
										animation: "btnPulse 2s infinite",
										boxShadow: "0 4px 12px rgba(166, 75, 39, 0.3)"
									},
									children: [
										/* @__PURE__ */ _jsxDEV("div", { style: {
											position: "absolute",
											top: 0,
											bottom: 0,
											width: "40px",
											background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
											transform: "skewX(-20deg)",
											animation: "shineSweep 3s infinite"
										} }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 634,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ _jsxDEV("svg", {
											width: "32",
											height: "32",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "#fef08a",
											strokeWidth: "2",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											style: {
												position: "absolute",
												top: "10px",
												left: "16px",
												opacity: .9
											},
											children: /* @__PURE__ */ _jsxDEV("path", { d: "M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 640,
												columnNumber: 227
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 640,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ _jsxDEV("svg", {
											width: "24",
											height: "24",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "#fef08a",
											strokeWidth: "2",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											style: {
												position: "absolute",
												bottom: "10px",
												right: "16px",
												opacity: .9
											},
											children: /* @__PURE__ */ _jsxDEV("path", { d: "M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 641,
												columnNumber: 231
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 641,
											columnNumber: 15
										}, this),
										"Next Clue →"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 611,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 610,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 593,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: `c-panel ${currentStep === 3 ? "active" : ""}`,
						children: [
							/* @__PURE__ */ _jsxDEV("h2", {
								className: "gen",
								children: "Evidence Tray: Sort the evidence"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 649,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("p", {
								className: "sub",
								children: "Tap a unit, then file it as mass or volume."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 650,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								style: {
									flex: 1,
									minHeight: 0,
									display: "flex",
									flexDirection: "column"
								},
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "c-sort-tray",
									children: sortItems.map((item) => /* @__PURE__ */ _jsxDEV("div", {
										className: `c-sort-chip ${shakeUnit === item.id ? "shake" : ""}`,
										onClick: () => setAskUnit(item),
										children: item.id
									}, item.id, false, {
										fileName: _jsxFileName,
										lineNumber: 655,
										columnNumber: 17
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 653,
									columnNumber: 13
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "c-bins",
									children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "c-bin",
										children: [/* @__PURE__ */ _jsxDEV("h3", { children: "Mass" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 662,
											columnNumber: 17
										}, this), massBin.map((id) => /* @__PURE__ */ _jsxDEV("div", {
											className: "item",
											children: id
										}, id, false, {
											fileName: _jsxFileName,
											lineNumber: 663,
											columnNumber: 36
										}, this))]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 661,
										columnNumber: 15
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "c-bin",
										children: [/* @__PURE__ */ _jsxDEV("h3", { children: "Volume" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 666,
											columnNumber: 17
										}, this), volumeBin.map((id) => /* @__PURE__ */ _jsxDEV("div", {
											className: "item",
											children: id
										}, id, false, {
											fileName: _jsxFileName,
											lineNumber: 667,
											columnNumber: 38
										}, this))]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 665,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 660,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 652,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: `c-ask ${askUnit ? "show" : ""}`,
								children: /* @__PURE__ */ _jsxDEV("div", {
									className: "c-ask-box",
									children: [/* @__PURE__ */ _jsxDEV("p", { children: [
										"Detective, is ",
										/* @__PURE__ */ _jsxDEV("b", { children: askUnit?.id }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 674,
											columnNumber: 32
										}, this),
										" mass or volume evidence?"
									] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 674,
										columnNumber: 15
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "opts",
										children: [/* @__PURE__ */ _jsxDEV("button", {
											className: "c-btn-action",
											style: {
												width: "auto",
												padding: "16px 32px"
											},
											onClick: () => answerSort("mass"),
											children: "Mass"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 676,
											columnNumber: 17
										}, this), /* @__PURE__ */ _jsxDEV("button", {
											className: "c-btn-action",
											style: {
												width: "auto",
												padding: "16px 32px"
											},
											onClick: () => answerSort("volume"),
											children: "Volume"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 677,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 675,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 673,
									columnNumber: 13
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 672,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 648,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 496,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV(AnimatePresence, { children: showFinalEvidence && /* @__PURE__ */ _jsxDEV(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				style: {
					position: "fixed",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					background: "rgba(0,0,0,0.6)",
					backdropFilter: "blur(4px)",
					zIndex: 9999,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					padding: "24px"
				},
				children: /* @__PURE__ */ _jsxDEV(motion.div, {
					initial: {
						scale: .9,
						y: 20
					},
					animate: {
						scale: 1,
						y: 0
					},
					exit: {
						scale: .9,
						y: 20
					},
					className: "c-final-evidence",
					style: {
						margin: 0,
						width: "100%",
						maxWidth: "680px",
						maxHeight: "90vh",
						overflowY: "auto",
						boxShadow: "0 12px 48px rgba(0,0,0,0.4)",
						border: "2px solid var(--border-color)",
						position: "relative"
					},
					children: [
						/* @__PURE__ */ _jsxDEV("h3", {
							style: {
								borderBottom: "2px solid var(--border-color)",
								paddingBottom: "16px",
								margin: "0 0 20px",
								fontSize: "36px",
								fontFamily: "\"Playfair Display\", \"Merriweather\", serif",
								fontWeight: 900,
								color: "var(--title-dark)"
							},
							children: "FINAL EVIDENCE FILED"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 718,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ _jsxDEV("ul", {
							style: {
								margin: 0,
								paddingLeft: "32px",
								listStyleType: "square",
								color: "var(--ink)",
								fontSize: "28px",
								fontWeight: 600,
								fontFamily: "\"Merriweather\", \"Georgia\", serif",
								lineHeight: "1.4",
								display: "flex",
								flexDirection: "column",
								gap: "12px"
							},
							children: [
								/* @__PURE__ */ _jsxDEV("li", { children: "Matter takes up space (volume) and has mass." }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 740,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("li", { children: "Solids, liquids, and gases (like air) are all matter." }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 741,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("li", { children: "We can measure mass in kg or g, and volume in L or mL." }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 742,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 727,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							style: {
								marginTop: "28px",
								display: "flex",
								justifyContent: "center"
							},
							children: /* @__PURE__ */ _jsxDEV("button", {
								onClick: () => {
									setShowFinalEvidence(false);
									handleCloseCase();
								},
								style: {
									position: "relative",
									overflow: "hidden",
									background: "#B04924",
									border: "none",
									color: "white",
									padding: "12px 24px",
									borderRadius: "16px",
									width: "100%",
									fontSize: "28px",
									fontFamily: "\"Merriweather\", \"Georgia\", serif",
									fontWeight: "900",
									cursor: "pointer",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									gap: "12px",
									animation: "btnPulse 2s infinite",
									boxShadow: "0 4px 12px rgba(166, 75, 39, 0.3)"
								},
								children: [
									/* @__PURE__ */ _jsxDEV("div", { style: {
										position: "absolute",
										top: 0,
										bottom: 0,
										width: "40px",
										background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
										transform: "skewX(-20deg)",
										animation: "shineSweep 3s infinite"
									} }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 771,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("svg", {
										width: "32",
										height: "32",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "#fef08a",
										strokeWidth: "2",
										strokeLinecap: "round",
										strokeLinejoin: "round",
										style: {
											position: "absolute",
											top: "10px",
											left: "16px",
											opacity: .9
										},
										children: /* @__PURE__ */ _jsxDEV("path", { d: "M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 777,
											columnNumber: 231
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 777,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("svg", {
										width: "24",
										height: "24",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "#fef08a",
										strokeWidth: "2",
										strokeLinecap: "round",
										strokeLinejoin: "round",
										style: {
											position: "absolute",
											bottom: "10px",
											right: "16px",
											opacity: .9
										},
										children: /* @__PURE__ */ _jsxDEV("path", { d: "M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 778,
											columnNumber: 235
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 778,
										columnNumber: 19
									}, this),
									"Done ✓"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 745,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 744,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 702,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 686,
				columnNumber: 11
			}, this) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 684,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: `c-closed-overlay ${caseClosed ? "show" : ""}`,
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "c-stamp-big",
					children: "CASE CLOSED"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 788,
					columnNumber: 10
				}, this), /* @__PURE__ */ _jsxDEV("p", {
					style: {
						fontSize: "32px",
						color: "var(--ink)",
						maxWidth: "700px",
						fontWeight: 600,
						margin: "0"
					},
					children: "You cracked the mystery of matter — every clue filed, every test run. Nice work, detective."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 789,
					columnNumber: 10
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 787,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 102,
		columnNumber: 5
	}, this);
};
_s(Stage9a_WhatIsMatter, "98WOwUtqH37MA4zO9uqNC/JTmV0=");
_c = Stage9a_WhatIsMatter;
export default Stage9a_WhatIsMatter;
Stage9a_WhatIsMatter.propTypes = {
	onComplete: PropTypes.func,
	addXp: PropTypes.func
};
var _c;
$RefreshReg$(_c, "Stage9a_WhatIsMatter");
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
import * as __vite_react_currentExports from "/src/science/class6/chapter6/MaterialsAroundUs/components/Stage9a_WhatIsMatter.jsx?t=1789189356431";
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }

  const currentExports = __vite_react_currentExports;
  queueMicrotask(() => {
    RefreshRuntime.registerExportsForReactRefresh("C:/Users/GANES/Futura-Edtech/src/science/class6/chapter6/MaterialsAroundUs/components/Stage9a_WhatIsMatter.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("C:/Users/GANES/Futura-Edtech/src/science/class6/chapter6/MaterialsAroundUs/components/Stage9a_WhatIsMatter.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) { return RefreshRuntime.register(type, "C:/Users/GANES/Futura-Edtech/src/science/class6/chapter6/MaterialsAroundUs/components/Stage9a_WhatIsMatter.jsx" + ' ' + id); }
function $RefreshSig$() { return RefreshRuntime.createSignatureFunctionForTransform(); }

//# sourceMappingURL=data:application/json;base64,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U0FBQztRQUV0UTs7Ozs7O01BQ0w7Ozs7O0tBQ0s7Ozs7OztHQUNGOzs7O1lBRUM7Ozs7O0dBRWpCLHdCQUFDLE9BQUQ7SUFBSyxXQUFXLG9CQUFvQixhQUFhLFNBQVM7Y0FBMUQsQ0FDRyx3QkFBQyxPQUFEO0tBQUssV0FBVTtlQUFjO0lBQWdCOzs7O2NBQzdDLHdCQUFDLEtBQUQ7S0FBRyxPQUFPO01BQUUsVUFBVTtNQUFRLE9BQU87TUFBYyxVQUFVO01BQVMsWUFBWTtNQUFLLFFBQVE7S0FBSTtlQUFHO0lBRW5HOzs7O1lBQ0Q7Ozs7OztFQUNGOzs7Ozs7QUFFVDs7O0FBRUEsZUFBZTtBQUVmLHFCQUFxQixZQUFZO0NBQy9CLFlBQVksVUFBVTtDQUN0QixPQUFPLFVBQVU7QUFDbkIiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiU3RhZ2U5YV9XaGF0SXNNYXR0ZXIuanN4Il0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgZm9yd2FyZFJlZiwgdXNlSW1wZXJhdGl2ZUhhbmRsZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQWlyRXhwZXJpbWVudHMzRCBmcm9tICcuL0FpckV4cGVyaW1lbnRzM0QnO1xuaW1wb3J0IHsgbW90aW9uLCBBbmltYXRlUHJlc2VuY2UgfSBmcm9tICdmcmFtZXItbW90aW9uJztcblxuY29uc3QgU3RhZ2U5YV9XaGF0SXNNYXR0ZXIgPSAoeyBvbkNvbXBsZXRlLCBhZGRYcCwgcmVnaXN0ZXJCYWNrSGFuZGxlciB9KSA9PiB7XG4gIGNvbnN0IFtjdXJyZW50U3RlcCwgc2V0Q3VycmVudFN0ZXBdID0gdXNlU3RhdGUoMSk7XG4gIGNvbnN0IFtjb21wbGV0ZWQsIHNldENvbXBsZXRlZF0gPSB1c2VTdGF0ZSh7IDE6IGZhbHNlLCAyOiBmYWxzZSwgMzogZmFsc2UgfSk7XG5cbiAgY29uc3QgZ29TdGVwID0gKG4pID0+IHtcbiAgICBzZXRDdXJyZW50U3RlcChuKTtcbiAgfTtcblxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChyZWdpc3RlckJhY2tIYW5kbGVyKSB7XG4gICAgICByZWdpc3RlckJhY2tIYW5kbGVyKCgpID0+IHtcbiAgICAgICAgaWYgKGN1cnJlbnRTdGVwID4gMSkge1xuICAgICAgICAgIHNldEN1cnJlbnRTdGVwKGN1cnJlbnRTdGVwIC0gMSk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCBbY3VycmVudFN0ZXAsIHJlZ2lzdGVyQmFja0hhbmRsZXJdKTtcblxuICBjb25zdCBtYXJrQ29tcGxldGUgPSAobikgPT4ge1xuICAgIHNldENvbXBsZXRlZChwcmV2ID0+ICh7IC4uLnByZXYsIFtuXTogdHJ1ZSB9KSk7XG4gIH07XG5cbiAgLy8gU3RlcCAxOiBEZWZpbmUgTWF0dGVyXG4gIGNvbnN0IFtwaWNrZWQsIHNldFBpY2tlZF0gPSB1c2VTdGF0ZSh7IHNwYWNlOiBmYWxzZSwgbWFzczogZmFsc2UgfSk7XG4gIGNvbnN0IHBpY2tDaGlwID0gKHdoaWNoKSA9PiB7XG4gICAgaWYgKGNvbXBsZXRlZFsxXSkgcmV0dXJuO1xuICAgIGNvbnN0IG5ld1BpY2tlZCA9IHsgLi4ucGlja2VkLCBbd2hpY2hdOiB0cnVlIH07XG4gICAgc2V0UGlja2VkKG5ld1BpY2tlZCk7XG4gICAgaWYgKG5ld1BpY2tlZC5zcGFjZSAmJiBuZXdQaWNrZWQubWFzcykge1xuICAgICAgbWFya0NvbXBsZXRlKDEpO1xuICAgIH1cbiAgfTtcblxuICAvLyBTdGVwIDI6IEludmVzdGlnYXRlIEFpclxuICBjb25zdCBbYWlyRG9uZSwgc2V0QWlyRG9uZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IGhhbmRsZUFpckNvbXBsZXRlID0gKCkgPT4ge1xuICAgIGlmICghYWlyRG9uZSkge1xuICAgICAgc2V0QWlyRG9uZSh0cnVlKTtcbiAgICAgIG1hcmtDb21wbGV0ZSgyKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gU3RlcCAzOiBTb3J0IEV2aWRlbmNlXG4gIGNvbnN0IFtzb3J0SXRlbXMsIHNldFNvcnRJdGVtc10gPSB1c2VTdGF0ZShbXG4gICAgeyBpZDogJ2tnJywgYW5zOiAnbWFzcycgfSxcbiAgICB7IGlkOiAnZycsIGFuczogJ21hc3MnIH0sXG4gICAgeyBpZDogJ0wnLCBhbnM6ICd2b2x1bWUnIH0sXG4gICAgeyBpZDogJ21MJywgYW5zOiAndm9sdW1lJyB9LFxuICAgIHsgaWQ6ICdtwrMnLCBhbnM6ICd2b2x1bWUnIH0sXG4gIF0pO1xuICBjb25zdCBbbWFzc0Jpbiwgc2V0TWFzc0Jpbl0gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFt2b2x1bWVCaW4sIHNldFZvbHVtZUJpbl0gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFthc2tVbml0LCBzZXRBc2tVbml0XSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbc2hha2VVbml0LCBzZXRTaGFrZVVuaXRdID0gdXNlU3RhdGUobnVsbCk7XG5cbiAgY29uc3QgYW5zd2VyU29ydCA9IChjaG9pY2UpID0+IHtcbiAgICBpZiAoIWFza1VuaXQpIHJldHVybjtcbiAgICBpZiAoY2hvaWNlID09PSBhc2tVbml0LmFucykge1xuICAgICAgaWYgKGNob2ljZSA9PT0gJ21hc3MnKSBzZXRNYXNzQmluKFsuLi5tYXNzQmluLCBhc2tVbml0LmlkXSk7XG4gICAgICBlbHNlIHNldFZvbHVtZUJpbihbLi4udm9sdW1lQmluLCBhc2tVbml0LmlkXSk7XG4gICAgICBcbiAgICAgIGNvbnN0IG5ld0l0ZW1zID0gc29ydEl0ZW1zLmZpbHRlcihpID0+IGkuaWQgIT09IGFza1VuaXQuaWQpO1xuICAgICAgc2V0U29ydEl0ZW1zKG5ld0l0ZW1zKTtcbiAgICAgIHNldEFza1VuaXQobnVsbCk7XG5cbiAgICAgIGlmIChuZXdJdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgbWFya0NvbXBsZXRlKDMpO1xuICAgICAgICBzZXRTaG93RmluYWxFdmlkZW5jZSh0cnVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc2V0QXNrVW5pdChudWxsKTtcbiAgICAgIHNldFNoYWtlVW5pdChhc2tVbml0LmlkKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0U2hha2VVbml0KG51bGwpLCA0MDApO1xuICAgIH1cbiAgfTtcblxuICAvLyBGaW5hbCBFdmlkZW5jZSAmIENsb3NlIENhc2VcbiAgY29uc3QgW2Nhc2VDbG9zZWQsIHNldENhc2VDbG9zZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2hvd0ZpbmFsRXZpZGVuY2UsIHNldFNob3dGaW5hbEV2aWRlbmNlXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgaGFuZGxlQ2xvc2VDYXNlID0gKCkgPT4ge1xuICAgIHNldENhc2VDbG9zZWQodHJ1ZSk7XG4gICAgaWYgKHR5cGVvZiBhZGRYcCA9PT0gJ2Z1bmN0aW9uJykgYWRkWHAoNTApO1xuICAgIGlmICh0eXBlb2Ygb25Db21wbGV0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgc2V0VGltZW91dChvbkNvbXBsZXRlLCAzMDAwKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY2x1ZVRhZ3MgPSB7XG4gICAgMTogY29tcGxldGVkWzFdID8gJ0NsdWUgZm91bmQg4pyTJyA6ICdEZWZpbmUgbWF0dGVyJyxcbiAgICAyOiBjb21wbGV0ZWRbMl0gPyAnQWlyIGlzIG1hdHRlciDinJMnIDogJ0lzIGFpciBhIHN1c3BlY3Q/JyxcbiAgICAzOiBjb21wbGV0ZWRbM10gPyAnRXZpZGVuY2UgZmlsZWQg4pyTJyA6ICdTb3J0IHRoZSBldmlkZW5jZScsXG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImNhc2Utd3JhcFwiIHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IDAsIGxlZnQ6IDAsIHJpZ2h0OiAwLCBib3R0b206ICc4MHB4Jywgb3ZlcmZsb3c6ICdoaWRkZW4nIH19PlxuICAgICAgPHN0eWxlPntgXG4gICAgICAgIC5jYXNlLXdyYXAge1xuICAgICAgICAgIC0tYmctY3JlYW06ICNGNEYxRTE7XG4gICAgICAgICAgLS1ib3JkZXItY29sb3I6ICNEMkM0QTc7XG4gICAgICAgICAgLS10aXRsZS1kYXJrOiAjNDMzNzJCO1xuICAgICAgICAgIC0tc3VidGl0bGUtb3JhbmdlOiAjQjg0QzIzO1xuICAgICAgICAgIC0tY2FyZC1iZzogI0ZDRkFGNTtcbiAgICAgICAgICAtLWluazogIzQzMzcyQjtcbiAgICAgICAgICAtLWluay1saWdodDogIzVBNEUzQztcbiAgICAgICAgICAtLXdoaXRlOiAjRkZGRkZGO1xuICAgICAgICAgIC0tc3VjY2Vzcy1ncmVlbjogIzM4NzYzRTtcblxuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJnLWNyZWFtKTtcbiAgICAgICAgICBjb2xvcjogdmFyKC0taW5rKTtcbiAgICAgICAgICBmb250LWZhbWlseTogJ0ludGVyJywgc2Fucy1zZXJpZjtcbiAgICAgICAgICBsaW5lLWhlaWdodDogMS4zO1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgbWluLWhlaWdodDogMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5jYXNlLXdyYXAgKiB7IGJveC1zaXppbmc6IGJvcmRlci1ib3g7IH1cblxuICAgICAgICBAa2V5ZnJhbWVzIGJ0blB1bHNlIHtcbiAgICAgICAgICAwJSB7IHRyYW5zZm9ybTogc2NhbGUoMSk7IGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgxNjYsIDc1LCAzOSwgMC4yKTsgfVxuICAgICAgICAgIDUwJSB7IHRyYW5zZm9ybTogc2NhbGUoMS4wMik7IGJveC1zaGFkb3c6IDAgOHB4IDI0cHggcmdiYSgxNjYsIDc1LCAzOSwgMC41KTsgfVxuICAgICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHNjYWxlKDEpOyBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMTY2LCA3NSwgMzksIDAuMik7IH1cbiAgICAgICAgfVxuICAgICAgICBAa2V5ZnJhbWVzIHNoaW5lU3dlZXAge1xuICAgICAgICAgIDAlIHsgbGVmdDogLTEwMCU7IH1cbiAgICAgICAgICAyMCUgeyBsZWZ0OiAyMDAlOyB9XG4gICAgICAgICAgMTAwJSB7IGxlZnQ6IDIwMCU7IH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIEhlYWRlciAqL1xuICAgICAgICAuYy1oZWFkZXIge1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgcGFkZGluZzogMTJweCA0MHB4O1xuICAgICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWJnLWNyZWFtKTtcbiAgICAgICAgICBmbGV4OiBub25lO1xuICAgICAgICB9XG4gICAgICAgIC5jLWhlYWRlci1sZWZ0IHtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgZ2FwOiAxNnB4O1xuICAgICAgICB9XG4gICAgICAgIC5jLWhlYWRlci1sZWZ0IHN2ZyB7XG4gICAgICAgICAgY29sb3I6IHZhcigtLWluayk7XG4gICAgICAgICAgd2lkdGg6IDQ4cHg7XG4gICAgICAgICAgaGVpZ2h0OiA0OHB4O1xuICAgICAgICB9XG4gICAgICAgIC5jLWhlYWRlci1sZWZ0IGgxIHtcbiAgICAgICAgICBmb250LWZhbWlseTogJ1BsYXlmYWlyIERpc3BsYXknLCBzZXJpZjtcbiAgICAgICAgICBmb250LXNpemU6IDMycHg7XG4gICAgICAgICAgY29sb3I6IHZhcigtLXRpdGxlLWRhcmspO1xuICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICB9XG4gICAgICAgIC5jLWhlYWRlci1sZWZ0IHAge1xuICAgICAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgICAgICBjb2xvcjogdmFyKC0tc3VidGl0bGUtb3JhbmdlKTtcbiAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgICAgfVxuICAgICAgICAuYy1oZWFkZXItcmlnaHQge1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICBnYXA6IDE2cHg7XG4gICAgICAgICAgZm9udC1zaXplOiAyMHB4O1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgICAgY29sb3I6IHZhcigtLWluayk7XG4gICAgICAgIH1cbiAgICAgICAgLmNsdWUtY2lyY2xlcyB7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBnYXA6IDhweDtcbiAgICAgICAgfVxuICAgICAgICAuYy1jaXJjbGUge1xuICAgICAgICAgIHdpZHRoOiAzMnB4O1xuICAgICAgICAgIGhlaWdodDogMzJweDtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgICAgYm9yZGVyOiAycHggc29saWQgdmFyKC0tYm9yZGVyLWNvbG9yKTtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgLmMtY2lyY2xlLmRvbmUge1xuICAgICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXN1Y2Nlc3MtZ3JlZW4pO1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0tc3VjY2Vzcy1ncmVlbik7XG4gICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgLmMtdG9wLW5hdiB7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIGdhcDogMjRweDtcbiAgICAgICAgICBwYWRkaW5nOiAyMHB4IDQwcHg7XG4gICAgICAgICAgYmFja2dyb3VuZDogI0VCRTVEMztcbiAgICAgICAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgdmFyKC0tYm9yZGVyLWNvbG9yKTtcbiAgICAgICAgICBib3JkZXItdG9wOiAycHggc29saWQgdmFyKC0tYm9yZGVyLWNvbG9yKTtcbiAgICAgICAgICBmbGV4OiBub25lO1xuICAgICAgICB9XG5cbiAgICAgICAgLmMtdGFiIHtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGdhcDogMTJweDtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWJnLWNyZWFtKTtcbiAgICAgICAgICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1ib3JkZXItY29sb3IpO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgICAgICBwYWRkaW5nOiAxMHB4IDIwcHg7XG4gICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XG4gICAgICAgICAgbWluLXdpZHRoOiAyNDBweDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLmMtdGFiIC5iYWRnZSB7XG4gICAgICAgICAgd2lkdGg6IDMycHg7XG4gICAgICAgICAgaGVpZ2h0OiAzMnB4O1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAjNUE0RTNDO1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgICAgICBjb2xvcjogdmFyKC0td2hpdGUpO1xuICAgICAgICAgIGZsZXg6IG5vbmU7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC5jLXRhYiAudHh0IHsgZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgfVxuICAgICAgICAuYy10YWIgLnR4dCBiIHsgZm9udC1zaXplOiAxOHB4OyBjb2xvcjogdmFyKC0tdGl0bGUtZGFyayk7IGxpbmUtaGVpZ2h0OiAxLjI7IH1cbiAgICAgICAgLmMtdGFiIC50eHQgc3BhbiB7IGZvbnQtc2l6ZTogMTRweDsgY29sb3I6IHZhcigtLWluay1saWdodCk7IH1cblxuICAgICAgICAuYy10YWIuYWN0aXZlIHsgYmFja2dyb3VuZDogdmFyKC0td2hpdGUpOyBib3JkZXItY29sb3I6IHZhcigtLXN1YnRpdGxlLW9yYW5nZSk7IGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgxODQsIDc2LCAzNSwgMC4xKTsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0ycHgpOyB9XG4gICAgICAgIC5jLXRhYi5hY3RpdmUgLmJhZGdlIHsgYmFja2dyb3VuZDogdmFyKC0tc3VjY2Vzcy1ncmVlbik7IGNvbG9yOiB2YXIoLS13aGl0ZSk7IH1cbiAgICAgICAgLmMtdGFiLmFjdGl2ZSAudHh0IGIgeyBjb2xvcjogdmFyKC0tc3VidGl0bGUtb3JhbmdlKTsgfVxuICAgICAgICBcbiAgICAgICAgLmMtdGFiLnNvbHZlZCAuYmFkZ2UgeyBiYWNrZ3JvdW5kOiB2YXIoLS1zdWNjZXNzLWdyZWVuKTsgY29sb3I6IHZhcigtLXdoaXRlKTsgfVxuXG4gICAgICAgIC5jLXN0YWdlIHtcbiAgICAgICAgICBwYWRkaW5nOiAxMnB4IDQwcHggMTZweCA0MHB4O1xuICAgICAgICAgIGZsZXg6IDE7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgIG1pbi1oZWlnaHQ6IDA7XG4gICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB9XG5cbiAgICAgICAgLmMtcGFuZWwge1xuICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICAgICAgZmxleDogMTtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgIG1pbi1oZWlnaHQ6IDA7XG4gICAgICAgIH1cbiAgICAgICAgLmMtcGFuZWwuYWN0aXZlIHtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgLyogQ2x1ZSAxOiBUd28gQ29sdW1uIExheW91dCAqL1xuICAgICAgICAuY2x1ZTEtbGF5b3V0IHtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGdhcDogNjBweDtcbiAgICAgICAgICBmbGV4OiAxO1xuICAgICAgICAgIG1pbi1oZWlnaHQ6IDA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC5jbHVlMS1sZWZ0IHtcbiAgICAgICAgICBmbGV4OiAxO1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICBwYWRkaW5nLXRvcDogMDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLmNsdWUxLXJpZ2h0IHtcbiAgICAgICAgICBmbGV4OiAxO1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgICAgICAgICBtaW4taGVpZ2h0OiAwO1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gICAgICAgIH1cblxuICAgICAgICAuY2x1ZTEtaW1nLXdyYXAge1xuICAgICAgICAgIGZsZXg6IDE7XG4gICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgbWluLWhlaWdodDogMDtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgLmNsdWUxLWltZy13cmFwIGltZyB7XG4gICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgIG9iamVjdC1maXQ6IGNvdmVyO1xuICAgICAgICB9XG5cbiAgICAgICAgLmNsdWUxLWxlZnQgaDIge1xuICAgICAgICAgIGZvbnQtZmFtaWx5OiAnUGxheWZhaXIgRGlzcGxheScsIHNlcmlmO1xuICAgICAgICAgIGZvbnQtc2l6ZTogNDhweDtcbiAgICAgICAgICBmb250LXdlaWdodDogODAwO1xuICAgICAgICAgIGNvbG9yOiB2YXIoLS10aXRsZS1kYXJrKTtcbiAgICAgICAgICBtYXJnaW46IDAgMCA0cHggMDtcbiAgICAgICAgICBsaW5lLWhlaWdodDogMS4xO1xuICAgICAgICB9XG5cbiAgICAgICAgLmNsdWUxLWxlZnQgcC5sZWFkIHtcbiAgICAgICAgICBmb250LXNpemU6IDI4cHg7XG4gICAgICAgICAgY29sb3I6IHZhcigtLWluayk7XG4gICAgICAgICAgbWFyZ2luOiAwIDAgNnB4IDA7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDEuMztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLmNsdWUxLWxlZnQgcC5sZWFkIGIge1xuICAgICAgICAgIGNvbG9yOiB2YXIoLS1zdWJ0aXRsZS1vcmFuZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgLnByb3AtY2FyZCB7XG4gICAgICAgICAgYmFja2dyb3VuZDogdmFyKC0td2hpdGUpO1xuICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJvcmRlci1jb2xvcik7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICAgICAgICBwYWRkaW5nOiA4cHggMTJweDtcbiAgICAgICAgICBtYXJnaW4tYm90dG9tOiA2cHg7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIGdhcDogMTJweDtcbiAgICAgICAgICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgwLDAsMCwwLjAzKTtcbiAgICAgICAgICBib3JkZXItbGVmdDogNnB4IHNvbGlkIHZhcigtLXN1YnRpdGxlLW9yYW5nZSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC5wcm9wLWNhcmQuZ3JlZW4ge1xuICAgICAgICAgIGJvcmRlci1sZWZ0LWNvbG9yOiB2YXIoLS1zdWNjZXNzLWdyZWVuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5wcm9wLWljb24ge1xuICAgICAgICAgIHdpZHRoOiA0OHB4O1xuICAgICAgICAgIGhlaWdodDogNDhweDtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgICAgYmFja2dyb3VuZDogI0Y4RURFNjtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgZmxleDogbm9uZTtcbiAgICAgICAgfVxuICAgICAgICAucHJvcC1jYXJkLmdyZWVuIC5wcm9wLWljb24geyBiYWNrZ3JvdW5kOiAjRUFGMkVDOyB9XG4gICAgICAgIFxuICAgICAgICAucHJvcC1pY29uIHN2ZyB7XG4gICAgICAgICAgd2lkdGg6IDI4cHg7XG4gICAgICAgICAgaGVpZ2h0OiAyOHB4O1xuICAgICAgICAgIGNvbG9yOiB2YXIoLS1zdWJ0aXRsZS1vcmFuZ2UpO1xuICAgICAgICB9XG4gICAgICAgIC5wcm9wLWNhcmQuZ3JlZW4gLnByb3AtaWNvbiBzdmcgeyBjb2xvcjogdmFyKC0tc3VjY2Vzcy1ncmVlbik7IH1cblxuICAgICAgICAucHJvcC10eHQge1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICBnYXA6IDRweDtcbiAgICAgICAgfVxuICAgICAgICAucHJvcC10eHQgaDQge1xuICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICBmb250LXNpemU6IDI4cHg7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDgwMDtcbiAgICAgICAgICBjb2xvcjogdmFyKC0tc3VidGl0bGUtb3JhbmdlKTtcbiAgICAgICAgfVxuICAgICAgICAucHJvcC1jYXJkLmdyZWVuIC5wcm9wLXR4dCBoNCB7XG4gICAgICAgICAgY29sb3I6IHZhcigtLXN1Y2Nlc3MtZ3JlZW4pO1xuICAgICAgICB9XG4gICAgICAgIC5wcm9wLXR4dCBwIHtcbiAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgZm9udC1zaXplOiAyNHB4O1xuICAgICAgICAgIGNvbG9yOiB2YXIoLS1pbmspO1xuICAgICAgICB9XG4gICAgICAgIC5wcm9wLXR4dCBwIGIgeyBjb2xvcjogdmFyKC0tc3VidGl0bGUtb3JhbmdlKTsgfVxuXG4gICAgICAgIC5jbHVlMS1sZWZ0IHAuYm9keSB7XG4gICAgICAgICAgZm9udC1zaXplOiAyNnB4O1xuICAgICAgICAgIGNvbG9yOiB2YXIoLS1pbmspO1xuICAgICAgICAgIG1hcmdpbjogNnB4IDA7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDEuMztcbiAgICAgICAgfVxuICAgICAgICAuY2x1ZTEtbGVmdCBwLmJvZHkgYiB7IGNvbG9yOiB2YXIoLS1zdWJ0aXRsZS1vcmFuZ2UpOyB9XG5cbiAgICAgICAgLnF1ZXN0aW9uLXR4dCB7XG4gICAgICAgICAgZm9udC1zaXplOiAyOHB4O1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA4MDA7XG4gICAgICAgICAgY29sb3I6IHZhcigtLXRpdGxlLWRhcmspO1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDRweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5jaGlwLW9wdHMge1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgZ2FwOiAxNnB4O1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5jaGlwLWJ0biB7XG4gICAgICAgICAgZmxleDogMTtcbiAgICAgICAgICBwYWRkaW5nOiAxMnB4IDIwcHg7XG4gICAgICAgICAgZm9udC1zaXplOiAyMHB4O1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgIGJhY2tncm91bmQ6IHZhcigtLXdoaXRlKTtcbiAgICAgICAgICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1zdWJ0aXRsZS1vcmFuZ2UpO1xuICAgICAgICAgIGNvbG9yOiB2YXIoLS1zdWJ0aXRsZS1vcmFuZ2UpO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XG4gICAgICAgICAgYm94LXNoYWRvdzogMCA0cHggMCB2YXIoLS1ib3JkZXItY29sb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgLmNoaXAtYnRuOmhvdmVyOm5vdCg6ZGlzYWJsZWQpIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDJweCk7IGJveC1zaGFkb3c6IDAgMnB4IDAgdmFyKC0tYm9yZGVyLWNvbG9yKTsgYmFja2dyb3VuZDogI0ZGRjZGMjsgfVxuICAgICAgICAuY2hpcC1idG4ucGlja2VkIHtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS13aGl0ZSk7XG4gICAgICAgICAgY29sb3I6IHZhcigtLXN1YnRpdGxlLW9yYW5nZSk7XG4gICAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoNHB4KTtcbiAgICAgICAgICBib3JkZXItY29sb3I6IHZhcigtLXN1YnRpdGxlLW9yYW5nZSk7XG4gICAgICAgIH1cblxuICAgICAgICAuc3VjY2Vzcy1ib3gge1xuICAgICAgICAgIGJhY2tncm91bmQ6ICNFOEY1RTk7XG4gICAgICAgICAgYm9yZGVyOiAycHggc29saWQgdmFyKC0tc3VjY2Vzcy1ncmVlbik7XG4gICAgICAgICAgY29sb3I6IHZhcigtLXN1Y2Nlc3MtZ3JlZW4pO1xuICAgICAgICAgIHBhZGRpbmc6IDEycHggMjBweDtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgICAgICAgZm9udC1zaXplOiAyNHB4O1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIGdhcDogMTJweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5jLWJ0bi1hY3Rpb24geyBcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICBwYWRkaW5nOiAxNnB4IDMycHg7XG4gICAgICAgICAgZm9udC1zaXplOiAyMnB4O1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICAgICAgY29sb3I6IHZhcigtLXdoaXRlKTsgXG4gICAgICAgICAgYmFja2dyb3VuZDogdmFyKC0tc3VidGl0bGUtb3JhbmdlKTsgXG4gICAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjE1cyBlYXNlO1xuICAgICAgICB9XG4gICAgICAgIC5jLWJ0bi1hY3Rpb246aG92ZXI6bm90KDpkaXNhYmxlZCkgeyBiYWNrZ3JvdW5kOiAjQzU1MzI4OyB9XG4gICAgICAgIC5jLWJ0bi1hY3Rpb246ZGlzYWJsZWQgeyBvcGFjaXR5OiAwLjU7IGN1cnNvcjogbm90LWFsbG93ZWQ7IH1cblxuICAgICAgICAvKiBHZW5lcmFsIFN0YWdlIGNsYXNzZXMgKi9cbiAgICAgICAgLmMtcGFuZWwgeyBkaXNwbGF5OiBub25lOyBmbGV4OiAxOyBtaW4taGVpZ2h0OiAwOyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyB9XG4gICAgICAgIC5jLXBhbmVsLmFjdGl2ZSB7IGRpc3BsYXk6IGZsZXg7IGFuaW1hdGlvbjogcGFuZWxJbiAwLjNzIGVhc2UgZm9yd2FyZHM7IH1cbiAgICAgICAgQGtleWZyYW1lcyBwYW5lbEluIHsgZnJvbSB7IG9wYWNpdHk6IDA7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMHB4KTsgfSB0byB7IG9wYWNpdHk6IDE7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsgfSB9XG5cbiAgICAgICAgLmMtcGFuZWwgaDIuZ2VuIHsgZm9udC1mYW1pbHk6ICdQbGF5ZmFpciBEaXNwbGF5Jywgc2VyaWY7IGZvbnQtc2l6ZTogMzRweDsgY29sb3I6IHZhcigtLXRpdGxlLWRhcmspOyBtYXJnaW46IDAgMCA4cHggMDsgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHZhcigtLWJvcmRlci1jb2xvcik7IHBhZGRpbmctYm90dG9tOiAxMnB4OyBmbGV4OiBub25lOyB9XG4gICAgICAgIC5jLXBhbmVsIC5zdWIgeyBmb250LXNpemU6IDIycHg7IGNvbG9yOiB2YXIoLS1pbmstbGlnaHQpOyBtYXJnaW46IDAgMCAyMHB4IDA7IGZvbnQtd2VpZ2h0OiA1MDA7IGZsZXg6IG5vbmU7IH1cblxuICAgICAgICAuYy1zb3J0LXRyYXkgeyBkaXNwbGF5OiBmbGV4OyBnYXA6IDE2cHg7IGZsZXgtd3JhcDogd3JhcDsganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IGJhY2tncm91bmQ6IHZhcigtLXdoaXRlKTsgcGFkZGluZzogMjRweDsgYm9yZGVyLXJhZGl1czogMTZweDsgbWFyZ2luLWJvdHRvbTogMjRweDsgYm9yZGVyOiAycHggc29saWQgdmFyKC0tYm9yZGVyLWNvbG9yKTsgZmxleDogbm9uZTsgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsMCwwLDAuMDMpOyB9XG4gICAgICAgIC5jLXNvcnQtY2hpcCB7IGJhY2tncm91bmQ6IHZhcigtLWJnLWNyZWFtKTsgYm9yZGVyLXJhZGl1czogOHB4OyBwYWRkaW5nOiAxNnB4IDMycHg7IGZvbnQtc2l6ZTogMjRweDsgZm9udC13ZWlnaHQ6IDcwMDsgY29sb3I6IHZhcigtLXRpdGxlLWRhcmspOyBjdXJzb3I6IHBvaW50ZXI7IGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWJvcmRlci1jb2xvcik7IGJveC1zaGFkb3c6IDAgNHB4IDAgdmFyKC0tYm9yZGVyLWNvbG9yKTsgdHJhbnNpdGlvbjogYWxsIDAuMTVzIGVhc2U7IH1cbiAgICAgICAgLmMtc29ydC1jaGlwOmhvdmVyIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDJweCk7IGJveC1zaGFkb3c6IDAgMnB4IDAgdmFyKC0tYm9yZGVyLWNvbG9yKTsgfVxuICAgICAgICAuYy1zb3J0LWNoaXAuc2hha2UgeyBhbmltYXRpb246IHNoYWtlIDAuNHMgZWFzZTsgYm9yZGVyLWNvbG9yOiB2YXIoLS1zdWJ0aXRsZS1vcmFuZ2UpOyB9XG5cbiAgICAgICAgLmMtYmlucyB7IGRpc3BsYXk6IGZsZXg7IGdhcDogMzJweDsgZmxleDogMTsgbWluLWhlaWdodDogMDsgfVxuICAgICAgICAuYy1iaW4geyBmbGV4OiAxOyBib3JkZXI6IDNweCBkYXNoZWQgdmFyKC0tYm9yZGVyLWNvbG9yKTsgYm9yZGVyLXJhZGl1czogMTZweDsgcGFkZGluZzogMjRweDsgZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgZ2FwOiAxNnB4OyBhbGlnbi1pdGVtczogY2VudGVyOyBiYWNrZ3JvdW5kOiB2YXIoLS13aGl0ZSk7IG92ZXJmbG93LXk6IGF1dG87IG1pbi1oZWlnaHQ6IDA7IH1cbiAgICAgICAgLmMtYmluIGgzIHsgZm9udC1zaXplOiAyNnB4OyBjb2xvcjogdmFyKC0tdGl0bGUtZGFyayk7IGZvbnQtd2VpZ2h0OiA3MDA7IG1hcmdpbjogMCAwIDEycHggMDsgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTsgbGV0dGVyLXNwYWNpbmc6IDFweDsgfVxuICAgICAgICAuYy1iaW4gLml0ZW0geyBiYWNrZ3JvdW5kOiB2YXIoLS1iZy1jcmVhbSk7IGNvbG9yOiB2YXIoLS10aXRsZS1kYXJrKTsgYm9yZGVyOiAycHggc29saWQgdmFyKC0tYm9yZGVyLWNvbG9yKTsgYm9yZGVyLXJhZGl1czogOHB4OyBwYWRkaW5nOiAxMnB4IDMycHg7IGZvbnQtc2l6ZTogMjRweDsgZm9udC13ZWlnaHQ6IDcwMDsgYm94LXNoYWRvdzogMCAycHggMCB2YXIoLS1ib3JkZXItY29sb3IpOyB9XG5cbiAgICAgICAgLmMtYXNrIHsgcG9zaXRpb246IGFic29sdXRlOyBpbnNldDogMDsgYmFja2dyb3VuZDogcmdiYSgwLDAsMCwwLjUpOyBkaXNwbGF5OiBub25lOyBhbGlnbi1pdGVtczogY2VudGVyOyBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgei1pbmRleDogMTA7IGJhY2tkcm9wLWZpbHRlcjogYmx1cigycHgpOyB9XG4gICAgICAgIC5jLWFzay5zaG93IHsgZGlzcGxheTogZmxleDsgfVxuICAgICAgICAuYy1hc2stYm94IHsgYmFja2dyb3VuZDogdmFyKC0td2hpdGUpOyBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1ib3JkZXItY29sb3IpOyBib3JkZXItcmFkaXVzOiAxNnB4OyBwYWRkaW5nOiA0MHB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7IGJveC1zaGFkb3c6IDAgMjBweCA0MHB4IHJnYmEoMCwwLDAsMC4yKTsgbWF4LXdpZHRoOiA1MDBweDsgfVxuICAgICAgICAuYy1hc2stYm94IHAgeyBmb250LXNpemU6IDI4cHg7IG1hcmdpbjogMCAwIDMycHggMDsgY29sb3I6IHZhcigtLXRpdGxlLWRhcmspOyBmb250LXdlaWdodDogNzAwOyBsaW5lLWhlaWdodDogMS4zOyB9XG4gICAgICAgIC5jLWFzay1ib3ggLm9wdHMgeyBkaXNwbGF5OiBmbGV4OyBnYXA6IDIwcHg7IGp1c3RpZnktY29udGVudDogY2VudGVyOyB9XG5cbiAgICAgICAgLmMtZmluYWwtZXZpZGVuY2UgeyBtYXJnaW4tdG9wOiBhdXRvOyBwYWRkaW5nOiAyNHB4IDMycHg7IGJhY2tncm91bmQ6IHZhcigtLXdoaXRlKTsgYm9yZGVyOiAycHggc29saWQgdmFyKC0tYm9yZGVyLWNvbG9yKTsgYm9yZGVyLXJhZGl1czogMTJweDsgZmxleDogbm9uZTsgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsMCwwLDAuMDUpOyB9XG4gICAgICAgIC5jLWZpbmFsLWV2aWRlbmNlIGgzIHsgZm9udC1zaXplOiAyNnB4OyBjb2xvcjogdmFyKC0tdGl0bGUtZGFyayk7IG1hcmdpbjogMCAwIDE2cHg7IGZvbnQtZmFtaWx5OiAnUGxheWZhaXIgRGlzcGxheScsIHNlcmlmOyB9XG4gICAgICAgIC5jLWZpbmFsLWV2aWRlbmNlIHVsIHsgbWFyZ2luOiAwOyBwYWRkaW5nLWxlZnQ6IDI0cHg7IGxpc3Qtc3R5bGUtdHlwZTogc3F1YXJlOyBjb2xvcjogdmFyKC0taW5rKTsgZm9udC1zaXplOiAyMnB4OyBkaXNwbGF5OiBmbGV4OyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBnYXA6IDEycHg7IH1cblxuICAgICAgICAuYy1idG4tZ3JlZW4geyBwYWRkaW5nOiAyMHB4IDQwcHg7IGZvbnQtc2l6ZTogMjRweDsgZm9udC13ZWlnaHQ6IDcwMDsgY29sb3I6ICNmZmY7IGJhY2tncm91bmQ6IHZhcigtLXN1Y2Nlc3MtZ3JlZW4pOyBib3JkZXI6IG5vbmU7IGJvcmRlci1yYWRpdXM6IDEycHg7IGJveC1zaGFkb3c6IDAgNnB4IDAgIzJENjMzNDsgY3Vyc29yOiBwb2ludGVyOyB0cmFuc2l0aW9uOiBhbGwgMC4xNXMgZWFzZTsgZm9udC1mYW1pbHk6ICdJbnRlcicsIHNhbnMtc2VyaWY7IH1cbiAgICAgICAgLmMtYnRuLWdyZWVuOmhvdmVyOm5vdCg6ZGlzYWJsZWQpIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDJweCk7IGJveC1zaGFkb3c6IDAgNHB4IDAgIzJENjMzNDsgfVxuICAgICAgICAuYy1idG4tZ3JlZW46ZGlzYWJsZWQgeyBvcGFjaXR5OiAwLjU7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSg2cHgpOyBib3gtc2hhZG93OiBub25lOyBjdXJzb3I6IG5vdC1hbGxvd2VkOyB9XG5cbiAgICAgICAgLmMtY2xvc2VkLW92ZXJsYXkgeyBwb3NpdGlvbjogYWJzb2x1dGU7IGluc2V0OiAwOyBiYWNrZ3JvdW5kOiByZ2JhKDI0NCwyNDEsMjI1LDAuOTYpOyBkaXNwbGF5OiBub25lOyBhbGlnbi1pdGVtczogY2VudGVyOyBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgZ2FwOiAzMnB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7IHotaW5kZXg6IDIwOyB9XG4gICAgICAgIC5jLWNsb3NlZC1vdmVybGF5LnNob3cgeyBkaXNwbGF5OiBmbGV4OyB9XG4gICAgICAgIC5jLXN0YW1wLWJpZyB7IGZvbnQtZmFtaWx5OiAnUGxheWZhaXIgRGlzcGxheScsIHNlcmlmOyBmb250LXNpemU6IDgwcHg7IGNvbG9yOiB2YXIoLS1zdWNjZXNzLWdyZWVuKTsgYm9yZGVyOiA4cHggc29saWQgdmFyKC0tc3VjY2Vzcy1ncmVlbik7IHBhZGRpbmc6IDIwcHggNjBweDsgYm9yZGVyLXJhZGl1czogMTZweDsgdHJhbnNmb3JtOiByb3RhdGUoLTRkZWcpOyBmb250LXdlaWdodDogNzAwOyBib3gtc2hhZG93OiBpbnNldCAwIDAgMCA0cHggcmdiYSgyNTUsMjU1LDI1NSwwLjUpOyB9XG4gICAgICBgfTwvc3R5bGU+XG5cblxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImMtc3RhZ2VcIj5cbiAgICAgICAgey8qIFNURVAgMTogVHdvLUNvbHVtbiBFZHVjYXRpb25hbCBMYXlvdXQgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgYy1wYW5lbCAke2N1cnJlbnRTdGVwID09PSAxID8gJ2FjdGl2ZScgOiAnJ31gfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNsdWUxLWxheW91dFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjbHVlMS1sZWZ0XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYy1oZWFkZXItbGVmdFwiIHN0eWxlPXt7IHBhZGRpbmc6ICcwJywgbWFyZ2luQm90dG9tOiAnMjRweCcgfX0+XG4gICAgICAgICAgICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjIuNVwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIj48cGF0aCBkPVwiTTQgMTkuNXYtMTVBMi41IDIuNSAwIDAgMSA2LjUgMkgyMHYyMEg2LjVhMi41IDIuNSAwIDAgMSAwLTVIMjBcIj48L3BhdGg+PHBhdGggZD1cIk04IDdoNlwiPjwvcGF0aD48cGF0aCBkPVwiTTggMTFoOFwiPjwvcGF0aD48L3N2Zz5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGgxPkNhc2UgRmlsZSA2LjQg4oCUIFRoZSBNeXN0ZXJ5IG9mIE1hdHRlcjwvaDE+XG4gICAgICAgICAgICAgICAgICA8cD5Gb2xsb3cgdGhlIGNsdWVzIHRvIGNyYWNrIHdoYXQgXCJtYXR0ZXJcIiByZWFsbHkgbWVhbnMuPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8aDIgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiAnOHB4JyB9fT5XaGF0IG1ha2VzIHNvbWV0aGluZyBcIm1hdHRlclwiPzwvaDI+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImxlYWRcIiBzdHlsZT17eyBtYXJnaW46ICcwIDAgMjRweCAwJyB9fT5cbiAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snLCBtYXJnaW5Cb3R0b206ICc4cHgnIH19PkV2ZXJ5dGhpbmcgYXJvdW5kIHVzIGlzIG1hZGUgb2YgPGI+bWF0dGVyPC9iPi48L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJyB9fT5NYXR0ZXIgaGFzIHR3byBpbXBvcnRhbnQgcHJvcGVydGllczo8L3NwYW4+XG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvcC1jYXJkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9wLWljb25cIj5cbiAgICAgICAgICAgICAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIyXCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiPjxwYXRoIGQ9XCJNMjEgMTZWOGEyIDIgMCAwIDAtMS0xLjczbC03LTRhMiAyIDAgMCAwLTIgMGwtNyA0QTIgMiAwIDAgMCAzIDh2OGEyIDIgMCAwIDAgMSAxLjczbDcgNGEyIDIgMCAwIDAgMiAwbDctNEEyIDIgMCAwIDAgMjEgMTZ6XCI+PC9wYXRoPjxwb2x5bGluZSBwb2ludHM9XCIzLjI3IDYuOTYgMTIgMTIuMDEgMjAuNzMgNi45NlwiPjwvcG9seWxpbmU+PGxpbmUgeDE9XCIxMlwiIHkxPVwiMjIuMDhcIiB4Mj1cIjEyXCIgeTI9XCIxMlwiPjwvbGluZT48L3N2Zz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb3AtdHh0XCI+XG4gICAgICAgICAgICAgICAgICA8aDQ+SXQgb2NjdXBpZXMgc3BhY2UuPC9oND5cbiAgICAgICAgICAgICAgICAgIDxwPk1hdHRlciB0YWtlcyB1cCBzcGFjZS4gVGhpcyBzcGFjZSBpcyBjYWxsZWQgPGI+dm9sdW1lPC9iPi48L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvcC1jYXJkIGdyZWVuXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9wLWljb25cIj5cbiAgICAgICAgICAgICAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIyXCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiPjxwYXRoIGQ9XCJNMy44IDMuOGwxNi40IDE2LjRcIj48L3BhdGg+PHBhdGggZD1cIk0zLjggMjAuMmwxNi40LTE2LjRcIj48L3BhdGg+PGNpcmNsZSBjeD1cIjEyXCIgY3k9XCIxMlwiIHI9XCIxMFwiPjwvY2lyY2xlPjwvc3ZnPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvcC10eHRcIj5cbiAgICAgICAgICAgICAgICAgIDxoND5JdCBoYXMgbWFzcy48L2g0PlxuICAgICAgICAgICAgICAgICAgPHA+PGI+TWFzczwvYj4gdGVsbHMgdXMgaG93IG11Y2ggbWF0dGVyIGlzIHByZXNlbnQuPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJib2R5XCI+V2F0ZXIsIHNhbmQsIHBlYmJsZXMgYW5kIGEgY3VwIGFyZSBhbGwgPGI+bWF0dGVyPC9iPi48YnIvPkFueXRoaW5nIHRoYXQgPGI+b2NjdXBpZXMgc3BhY2U8L2I+IGFuZCA8Yj5oYXMgbWFzczwvYj4gaXMgY2FsbGVkIDxiPm1hdHRlcjwvYj4uPC9wPlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicXVlc3Rpb24tdHh0XCI+V2hhdCBkbyB0aGVzZSBvYmplY3RzIGhhdmUgaW4gY29tbW9uPzwvZGl2PlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGlwLW9wdHNcIiBzdHlsZT17eyBmb250U2l6ZTogJzI2cHgnLCBmb250V2VpZ2h0OiA3MDAsIGNvbG9yOiAndmFyKC0tc3VidGl0bGUtb3JhbmdlKScsIHdpZHRoOiAnMTAwJScgfX0+XG4gICAgICAgICAgICAgICAgVGhleSBvY2N1cHkgc3BhY2UgYW5kIGhhdmUgbWFzcyDigJQgc28gdGhleSBhcmUgbWF0dGVyLlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjbHVlMS1yaWdodFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNsdWUxLWltZy13cmFwXCI+XG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvYXNzZXRzL21hdHRlcl9leGFtcGxlc19jbHVlMS5qcGdcIiBhbHQ9XCJFeGFtcGxlcyBvZiBtYXR0ZXJcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcgfX0+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0Q29tcGxldGVkKHByZXYgPT4gKHsgLi4ucHJldiwgMTogdHJ1ZSB9KSk7XG4gICAgICAgICAgICAgICAgICAgIGdvU3RlcCgyKTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI0IwNDkyNCcsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzEycHggMjRweCcsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzE2cHgnLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzI4cHgnLFxuICAgICAgICAgICAgICAgICAgICBmb250RmFtaWx5OiAnXCJNZXJyaXdlYXRoZXJcIiwgXCJHZW9yZ2lhXCIsIHNlcmlmJyxcbiAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogJzkwMCcsXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIGdhcDogJzEycHgnLFxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb246ICdidG5QdWxzZSAycyBpbmZpbml0ZScsXG4gICAgICAgICAgICAgICAgICAgIGJveFNoYWRvdzogJzAgNHB4IDEycHggcmdiYSgxNjYsIDc1LCAzOSwgMC4zKSdcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogMCwgYm90dG9tOiAwLCB3aWR0aDogJzQwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCg5MGRlZywgdHJhbnNwYXJlbnQsIHJnYmEoMjU1LDI1NSwyNTUsMC40KSwgdHJhbnNwYXJlbnQpJyxcbiAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3NrZXdYKC0yMGRlZyknLFxuICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uOiAnc2hpbmVTd2VlcCAzcyBpbmZpbml0ZSdcbiAgICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMzJcIiBoZWlnaHQ9XCIzMlwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cIiNmZWYwOGFcIiBzdHJva2VXaWR0aD1cIjJcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogJzEwcHgnLCBsZWZ0OiAnMTZweCcsIG9wYWNpdHk6IDAuOSB9fT48cGF0aCBkPVwiTTEyIDJsMyA3IDcgMy03IDMtMyA3LTMtNy03LTMgNy0zelwiLz48L3N2Zz5cbiAgICAgICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiI2ZlZjA4YVwiIHN0cm9rZVdpZHRoPVwiMlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgYm90dG9tOiAnMTBweCcsIHJpZ2h0OiAnMTZweCcsIG9wYWNpdHk6IDAuOSB9fT48cGF0aCBkPVwiTTEyIDJsMyA3IDcgMy03IDMtMyA3LTMtNy03LTMgNy0zelwiLz48L3N2Zz5cbiAgICAgICAgICAgICAgICAgIE5leHQgQ2x1ZSDihpJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFNURVAgMjogSW52ZXN0aWdhdGUgQWlyICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGMtcGFuZWwgJHtjdXJyZW50U3RlcCA9PT0gMiA/ICdhY3RpdmUnIDogJyd9YH0+XG4gICAgICAgICAgPGgyIGNsYXNzTmFtZT1cImdlblwiPkV2aWRlbmNlIFRyYXk6IEludGVycm9nYXRlIHRoZSBhaXI8L2gyPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInN1YlwiPk9ic2VydmUgdGhlIHR3byBleHBlcmltZW50cyBhbmQgaWRlbnRpZnkgd2hhdCB0aGV5IHNob3cgYWJvdXQgYWlyLjwvcD5cbiAgICAgICAgICBcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZsZXg6IDEsIG1pbkhlaWdodDogMCwgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyB9fT5cbiAgICAgICAgICAgICB7Y3VycmVudFN0ZXAgPT09IDIgJiYgPEFpckV4cGVyaW1lbnRzM0Qgb25Db21wbGV0ZT17aGFuZGxlQWlyQ29tcGxldGV9IC8+fVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPEFuaW1hdGVQcmVzZW5jZT5cbiAgICAgICAgICAgICB7Y29tcGxldGVkWzJdICYmIChcbiAgICAgICAgICAgICAgIDxtb3Rpb24uZGl2IGluaXRpYWw9e3sgb3BhY2l0eTogMCwgeTogMTAgfX0gYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCB5OiAwIH19IGNsYXNzTmFtZT1cInN1Y2Nlc3MtYm94XCIgc3R5bGU9e3sgbWFyZ2luVG9wOiAnMjBweCcsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjI4XCIgaGVpZ2h0PVwiMjhcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjNcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCI+PHBvbHlsaW5lIHBvaW50cz1cIjIwIDYgOSAxNyA0IDEyXCI+PC9wb2x5bGluZT48L3N2Zz5cbiAgICAgICAgICAgICAgICAgVmVyZGljdDogYWlyIG9jY3VwaWVzIHNwYWNlIGFuZCBoYXMgbWFzcyDigJQgY2FzZSBjbG9zZWQsIGFpciBpcyBtYXR0ZXIuXG4gICAgICAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L0FuaW1hdGVQcmVzZW5jZT5cblxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAnMjRweCcsIGRpc3BsYXk6ICdmbGV4JyB9fT5cbiAgICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGdvU3RlcCgzKX1cbiAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyNCMDQ5MjQnLFxuICAgICAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcxMnB4IDI0cHgnLFxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzE2cHgnLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICcyOHB4JyxcbiAgICAgICAgICAgICAgICBmb250RmFtaWx5OiAnXCJNZXJyaXdlYXRoZXJcIiwgXCJHZW9yZ2lhXCIsIHNlcmlmJyxcbiAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnOTAwJyxcbiAgICAgICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgIGdhcDogJzEycHgnLFxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogJ2J0blB1bHNlIDJzIGluZmluaXRlJyxcbiAgICAgICAgICAgICAgICBib3hTaGFkb3c6ICcwIDRweCAxMnB4IHJnYmEoMTY2LCA3NSwgMzksIDAuMyknXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogMCwgYm90dG9tOiAwLCB3aWR0aDogJzQwcHgnLFxuICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KDkwZGVnLCB0cmFuc3BhcmVudCwgcmdiYSgyNTUsMjU1LDI1NSwwLjQpLCB0cmFuc3BhcmVudCknLFxuICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICdza2V3WCgtMjBkZWcpJyxcbiAgICAgICAgICAgICAgICAgYW5pbWF0aW9uOiAnc2hpbmVTd2VlcCAzcyBpbmZpbml0ZSdcbiAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjMyXCIgaGVpZ2h0PVwiMzJcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCIjZmVmMDhhXCIgc3Ryb2tlV2lkdGg9XCIyXCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0eWxlPXt7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6ICcxMHB4JywgbGVmdDogJzE2cHgnLCBvcGFjaXR5OiAwLjkgfX0+PHBhdGggZD1cIk0xMiAybDMgNyA3IDMtNyAzLTMgNy0zLTctNy0zIDctM3pcIi8+PC9zdmc+XG4gICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiI2ZlZjA4YVwiIHN0cm9rZVdpZHRoPVwiMlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgYm90dG9tOiAnMTBweCcsIHJpZ2h0OiAnMTZweCcsIG9wYWNpdHk6IDAuOSB9fT48cGF0aCBkPVwiTTEyIDJsMyA3IDcgMy03IDMtMyA3LTMtNy03LTMgNy0zelwiLz48L3N2Zz5cbiAgICAgICAgICAgICAgTmV4dCBDbHVlIOKGklxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBTVEVQIDM6IFNvcnQgRXZpZGVuY2UgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgYy1wYW5lbCAke2N1cnJlbnRTdGVwID09PSAzID8gJ2FjdGl2ZScgOiAnJ31gfT5cbiAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwiZ2VuXCI+RXZpZGVuY2UgVHJheTogU29ydCB0aGUgZXZpZGVuY2U8L2gyPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInN1YlwiPlRhcCBhIHVuaXQsIHRoZW4gZmlsZSBpdCBhcyBtYXNzIG9yIHZvbHVtZS48L3A+XG4gICAgICAgICAgXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBmbGV4OiAxLCBtaW5IZWlnaHQ6IDAsIGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicgfX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImMtc29ydC10cmF5XCI+XG4gICAgICAgICAgICAgIHtzb3J0SXRlbXMubWFwKGl0ZW0gPT4gKFxuICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpdGVtLmlkfSBjbGFzc05hbWU9e2BjLXNvcnQtY2hpcCAke3NoYWtlVW5pdCA9PT0gaXRlbS5pZCA/ICdzaGFrZScgOiAnJ31gfSBvbkNsaWNrPXsoKSA9PiBzZXRBc2tVbml0KGl0ZW0pfT5cbiAgICAgICAgICAgICAgICAgIHtpdGVtLmlkfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjLWJpbnNcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjLWJpblwiPlxuICAgICAgICAgICAgICAgIDxoMz5NYXNzPC9oMz5cbiAgICAgICAgICAgICAgICB7bWFzc0Jpbi5tYXAoaWQgPT4gPGRpdiBrZXk9e2lkfSBjbGFzc05hbWU9XCJpdGVtXCI+e2lkfTwvZGl2Pil9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImMtYmluXCI+XG4gICAgICAgICAgICAgICAgPGgzPlZvbHVtZTwvaDM+XG4gICAgICAgICAgICAgICAge3ZvbHVtZUJpbi5tYXAoaWQgPT4gPGRpdiBrZXk9e2lkfSBjbGFzc05hbWU9XCJpdGVtXCI+e2lkfTwvZGl2Pil9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGMtYXNrICR7YXNrVW5pdCA/ICdzaG93JyA6ICcnfWB9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjLWFzay1ib3hcIj5cbiAgICAgICAgICAgICAgPHA+RGV0ZWN0aXZlLCBpcyA8Yj57YXNrVW5pdD8uaWR9PC9iPiBtYXNzIG9yIHZvbHVtZSBldmlkZW5jZT88L3A+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3B0c1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYy1idG4tYWN0aW9uXCIgc3R5bGU9e3sgd2lkdGg6ICdhdXRvJywgcGFkZGluZzogJzE2cHggMzJweCcgfX0gb25DbGljaz17KCkgPT4gYW5zd2VyU29ydCgnbWFzcycpfT5NYXNzPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJjLWJ0bi1hY3Rpb25cIiBzdHlsZT17eyB3aWR0aDogJ2F1dG8nLCBwYWRkaW5nOiAnMTZweCAzMnB4JyB9fSBvbkNsaWNrPXsoKSA9PiBhbnN3ZXJTb3J0KCd2b2x1bWUnKX0+Vm9sdW1lPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxBbmltYXRlUHJlc2VuY2U+XG4gICAgICAgIHtzaG93RmluYWxFdmlkZW5jZSAmJiAoXG4gICAgICAgICAgPG1vdGlvbi5kaXYgXG4gICAgICAgICAgICBpbml0aWFsPXt7IG9wYWNpdHk6IDAgfX1cbiAgICAgICAgICAgIGFuaW1hdGU9e3sgb3BhY2l0eTogMSB9fVxuICAgICAgICAgICAgZXhpdD17eyBvcGFjaXR5OiAwIH19XG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgICAgICAgICAgdG9wOiAwLCBsZWZ0OiAwLCByaWdodDogMCwgYm90dG9tOiAwLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAncmdiYSgwLDAsMCwwLjYpJyxcbiAgICAgICAgICAgICAgYmFja2Ryb3BGaWx0ZXI6ICdibHVyKDRweCknLFxuICAgICAgICAgICAgICB6SW5kZXg6IDk5OTksXG4gICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgcGFkZGluZzogJzI0cHgnXG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgICAgIGluaXRpYWw9e3sgc2NhbGU6IDAuOSwgeTogMjAgfX1cbiAgICAgICAgICAgICAgYW5pbWF0ZT17eyBzY2FsZTogMSwgeTogMCB9fVxuICAgICAgICAgICAgICBleGl0PXt7IHNjYWxlOiAwLjksIHk6IDIwIH19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImMtZmluYWwtZXZpZGVuY2VcIlxuICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICBtYXJnaW46IDAsXG4gICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICAgICAgIG1heFdpZHRoOiAnNjgwcHgnLFxuICAgICAgICAgICAgICAgICBtYXhIZWlnaHQ6ICc5MHZoJyxcbiAgICAgICAgICAgICAgICAgb3ZlcmZsb3dZOiAnYXV0bycsXG4gICAgICAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMTJweCA0OHB4IHJnYmEoMCwwLDAsMC40KScsXG4gICAgICAgICAgICAgICAgIGJvcmRlcjogJzJweCBzb2xpZCB2YXIoLS1ib3JkZXItY29sb3IpJyxcbiAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZSdcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGgzIHN0eWxlPXt7IFxuICAgICAgICAgICAgICAgIGJvcmRlckJvdHRvbTogJzJweCBzb2xpZCB2YXIoLS1ib3JkZXItY29sb3IpJywgXG4gICAgICAgICAgICAgICAgcGFkZGluZ0JvdHRvbTogJzE2cHgnLFxuICAgICAgICAgICAgICAgIG1hcmdpbjogJzAgMCAyMHB4JyxcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogJzM2cHgnLFxuICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdcIlBsYXlmYWlyIERpc3BsYXlcIiwgXCJNZXJyaXdlYXRoZXJcIiwgc2VyaWYnLFxuICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDkwMCxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3ZhcigtLXRpdGxlLWRhcmspJ1xuICAgICAgICAgICAgICB9fT5GSU5BTCBFVklERU5DRSBGSUxFRDwvaDM+XG4gICAgICAgICAgICAgIDx1bCBzdHlsZT17eyBcbiAgICAgICAgICAgICAgICBtYXJnaW46IDAsIFxuICAgICAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiAnMzJweCcsIFxuICAgICAgICAgICAgICAgIGxpc3RTdHlsZVR5cGU6ICdzcXVhcmUnLCBcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3ZhcigtLWluayknLCBcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogJzI4cHgnLCBcbiAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgICAgICAgZm9udEZhbWlseTogJ1wiTWVycml3ZWF0aGVyXCIsIFwiR2VvcmdpYVwiLCBzZXJpZicsXG4gICAgICAgICAgICAgICAgbGluZUhlaWdodDogJzEuNCcsXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBcbiAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgXG4gICAgICAgICAgICAgICAgZ2FwOiAnMTJweCcgXG4gICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgIDxsaT5NYXR0ZXIgdGFrZXMgdXAgc3BhY2UgKHZvbHVtZSkgYW5kIGhhcyBtYXNzLjwvbGk+XG4gICAgICAgICAgICAgICAgPGxpPlNvbGlkcywgbGlxdWlkcywgYW5kIGdhc2VzIChsaWtlIGFpcikgYXJlIGFsbCBtYXR0ZXIuPC9saT5cbiAgICAgICAgICAgICAgICA8bGk+V2UgY2FuIG1lYXN1cmUgbWFzcyBpbiBrZyBvciBnLCBhbmQgdm9sdW1lIGluIEwgb3IgbUwuPC9saT5cbiAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6ICcyOHB4JywgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicgfX0+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0ZpbmFsRXZpZGVuY2UoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVDbG9zZUNhc2UoKTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI0IwNDkyNCcsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzEycHggMjRweCcsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzE2cHgnLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzI4cHgnLFxuICAgICAgICAgICAgICAgICAgICBmb250RmFtaWx5OiAnXCJNZXJyaXdlYXRoZXJcIiwgXCJHZW9yZ2lhXCIsIHNlcmlmJyxcbiAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogJzkwMCcsXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIGdhcDogJzEycHgnLFxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb246ICdidG5QdWxzZSAycyBpbmZpbml0ZScsXG4gICAgICAgICAgICAgICAgICAgIGJveFNoYWRvdzogJzAgNHB4IDEycHggcmdiYSgxNjYsIDc1LCAzOSwgMC4zKSdcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogMCwgYm90dG9tOiAwLCB3aWR0aDogJzQwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCg5MGRlZywgdHJhbnNwYXJlbnQsIHJnYmEoMjU1LDI1NSwyNTUsMC40KSwgdHJhbnNwYXJlbnQpJyxcbiAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3NrZXdYKC0yMGRlZyknLFxuICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uOiAnc2hpbmVTd2VlcCAzcyBpbmZpbml0ZSdcbiAgICAgICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMzJcIiBoZWlnaHQ9XCIzMlwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cIiNmZWYwOGFcIiBzdHJva2VXaWR0aD1cIjJcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogJzEwcHgnLCBsZWZ0OiAnMTZweCcsIG9wYWNpdHk6IDAuOSB9fT48cGF0aCBkPVwiTTEyIDJsMyA3IDcgMy03IDMtMyA3LTMtNy03LTMgNy0zelwiLz48L3N2Zz5cbiAgICAgICAgICAgICAgICAgIDxzdmcgd2lkdGg9XCIyNFwiIGhlaWdodD1cIjI0XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiI2ZlZjA4YVwiIHN0cm9rZVdpZHRoPVwiMlwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgYm90dG9tOiAnMTBweCcsIHJpZ2h0OiAnMTZweCcsIG9wYWNpdHk6IDAuOSB9fT48cGF0aCBkPVwiTTEyIDJsMyA3IDcgMy03IDMtMyA3LTMtNy03LTMgNy0zelwiLz48L3N2Zz5cbiAgICAgICAgICAgICAgICAgIERvbmUg4pyTXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvQW5pbWF0ZVByZXNlbmNlPlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17YGMtY2xvc2VkLW92ZXJsYXkgJHtjYXNlQ2xvc2VkID8gJ3Nob3cnIDogJyd9YH0+XG4gICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImMtc3RhbXAtYmlnXCI+Q0FTRSBDTE9TRUQ8L2Rpdj5cbiAgICAgICAgIDxwIHN0eWxlPXt7IGZvbnRTaXplOiAnMzJweCcsIGNvbG9yOiAndmFyKC0taW5rKScsIG1heFdpZHRoOiAnNzAwcHgnLCBmb250V2VpZ2h0OiA2MDAsIG1hcmdpbjogJzAnIH19PlxuICAgICAgICAgICBZb3UgY3JhY2tlZCB0aGUgbXlzdGVyeSBvZiBtYXR0ZXIg4oCUIGV2ZXJ5IGNsdWUgZmlsZWQsIGV2ZXJ5IHRlc3QgcnVuLiBOaWNlIHdvcmssIGRldGVjdGl2ZS5cbiAgICAgICAgIDwvcD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU3RhZ2U5YV9XaGF0SXNNYXR0ZXI7XG5cblN0YWdlOWFfV2hhdElzTWF0dGVyLnByb3BUeXBlcyA9IHtcbiAgb25Db21wbGV0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gIGFkZFhwOiBQcm9wVHlwZXMuZnVuY1xufTtcbiJdfQ==