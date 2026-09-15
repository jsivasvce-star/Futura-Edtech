import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/science/class6/chapter6/MaterialsAroundUs/index.jsx");const React = __vite__cjsImport0_react; const useState = __vite__cjsImport0_react["useState"]; const useRef = __vite__cjsImport0_react["useRef"];const _jsxDEV = __vite__cjsImport13_react_jsxDevRuntime["jsxDEV"]; const _Fragment = __vite__cjsImport13_react_jsxDevRuntime["Fragment"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=14d48983";
import { ArrowLeft, RefreshCw, Sun, Moon, ArrowRight } from "/node_modules/.vite/deps/lucide-react.js?v=14d48983";
import "/src/science/class6/chapter6/MaterialsAroundUs/theme.css";
import { useTheme } from "/src/ThemeContext.jsx";
import { chapterFlow } from "/src/science/class6/chapter6/MaterialsAroundUs/storyEngine.js?t=1789189356431";
import ChiefDetective from "/src/science/class6/chapter6/MaterialsAroundUs/components/ChiefDetective/ChiefDetective.jsx";
import InvestigationHandbook from "/src/science/class6/chapter6/MaterialsAroundUs/components/Educational/InvestigationHandbook.jsx";
import DetectiveCheckpoint from "/src/science/class6/chapter6/MaterialsAroundUs/components/Educational/DetectiveCheckpoint.jsx";
import EvidenceSummary from "/src/science/class6/chapter6/MaterialsAroundUs/components/Educational/EvidenceSummary.jsx";
import ChapterCover from "/src/science/class6/chapter6/MaterialsAroundUs/components/Educational/ChapterCover.jsx";
import ChapterIntroSpread from "/src/science/class6/chapter6/MaterialsAroundUs/components/Educational/ChapterIntroSpread.jsx";
import MissionBriefingSpread from "/src/science/class6/chapter6/MaterialsAroundUs/components/Educational/MissionBriefingSpread.jsx";
import FullscreenButton from "/src/science/class6/chapter6/MaterialsAroundUs/components/Common/FullscreenButton.jsx";
var _jsxFileName = "C:/Users/GANES/Futura-Edtech/src/science/class6/chapter6/MaterialsAroundUs/index.jsx";
import __vite__cjsImport13_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=14d48983";
var _s = $RefreshSig$();
const timelineTree = (() => {
	const tree = [];
	let currentBarrier = null;
	let currentStage = null;
	chapterFlow.forEach((node, index) => {
		const item = {
			...node,
			originalIndex: index
		};
		let barrierId = null;
		if (node.title.includes("Barrier 1") || node.title.includes("Stage 6.1")) barrierId = "Barrier 6.1";
		else if (node.title.includes("Barrier 2") || node.title.includes("Stage 6.2")) barrierId = "Barrier 6.2";
		else if (node.title.includes("Barrier 3") || node.title.includes("Stage 6.3")) barrierId = "Barrier 6.3";
		else if (node.title.includes("Barrier 4") || node.title.includes("Do You Know?") || node.title.includes("Concept Map")) barrierId = "Barrier 6.4";
		else barrierId = "Final Wrap-up";
		if (!currentBarrier || currentBarrier.id !== barrierId) {
			currentBarrier = {
				id: barrierId,
				title: barrierId,
				type: "barrier",
				children: []
			};
			tree.push(currentBarrier);
			currentStage = null;
		}
		if (barrierId === "Barrier 6.3") {
			const stageMatch = node.title.match(/(Stage 6\.3\.\d+)/);
			if (stageMatch) {
				const stageName = stageMatch[1];
				if (!currentStage || currentStage.id !== stageName) {
					currentStage = {
						id: stageName,
						title: stageName,
						type: "stage",
						children: []
					};
					currentBarrier.children.push(currentStage);
				}
				currentStage.children.push(item);
			} else {
				currentBarrier.children.push(item);
			}
		} else {
			currentBarrier.children.push(item);
		}
	});
	return tree;
})();
export default function MaterialsAroundUsActivity({ onBackToDashboard }) {
	_s();
	const handbookRef = useRef(null);
	const stageRef = useRef(null);
	const [currentFlowIndex, setCurrentFlowIndex] = useState(0);
	const [highestUnlockedIndex, setHighestUnlockedIndex] = useState(0);
	const [isTimelineOpen, setIsTimelineOpen] = useState(false);
	const [stageCompleted, setStageCompleted] = useState(false);
	const [xp, setXp] = useState(0);
	const [resetKey, setResetKey] = useState(0);
	const [showCover, setShowCover] = useState(true);
	const [showIntroSpread, setShowIntroSpread] = useState(false);
	const [showHandbook, setShowHandbook] = useState(true);
	const [expandedNodes, setExpandedNodes] = useState({
		"Barrier 6.1": true,
		"Barrier 6.2": true,
		"Barrier 6.3": true,
		"Barrier 6.4": true,
		"Final Wrap-up": true,
		"Stage 6.3.1": true,
		"Stage 6.3.2": true,
		"Stage 6.3.3": true,
		"Stage 6.3.4": true,
		"Stage 6.3.5": true,
		"Stage 6.3.6": true
	});
	const toggleNode = (id) => setExpandedNodes((prev) => ({
		...prev,
		[id]: !prev[id]
	}));
	const addXp = (amount) => {
		setXp((prev) => prev + amount);
	};
	const handleNext = () => {
		setStageCompleted(false);
		setShowHandbook(false);
		if (currentFlowIndex < chapterFlow.length - 1) {
			const nextIndex = currentFlowIndex + 1;
			setCurrentFlowIndex(nextIndex);
			if (nextIndex > highestUnlockedIndex) {
				setHighestUnlockedIndex(nextIndex);
			}
		}
	};
	const currentNode = chapterFlow[currentFlowIndex];
	const handleMissionAccept = () => {
		if (currentNode.rewardXP && currentNode.type === "mission") {
			addXp(currentNode.rewardXP);
		}
		setStageCompleted(false);
		if (currentFlowIndex < chapterFlow.length - 1) {
			const nextIndex = currentFlowIndex + 1;
			const nextNode = chapterFlow[nextIndex];
			if (nextNode && nextNode.id === "stage1") {
				setShowHandbook(true);
			} else {
				setShowHandbook(false);
			}
			setCurrentFlowIndex(nextIndex);
			if (nextIndex > highestUnlockedIndex) {
				setHighestUnlockedIndex(nextIndex);
			}
		}
	};
	const handleDebriefContinue = () => {
		if (currentNode.rewardXP && (currentNode.type === "debrief" || currentNode.type === "summary")) {
			addXp(currentNode.rewardXP);
		}
		if (currentNode.isFinal) {
			onBackToDashboard();
		} else {
			handleNext();
		}
	};
	const handleStageComplete = () => {
		setStageCompleted(true);
	};
	// Global Theme Hook
	const { theme, toggleTheme } = useTheme();
	return /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(FullscreenButton, {}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 137,
		columnNumber: 7
	}, this), showCover ? /* @__PURE__ */ _jsxDEV(ChapterCover, {
		onOpenBook: () => {
			setShowCover(false);
			setShowIntroSpread(true);
		},
		onBack: onBackToDashboard
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 139,
		columnNumber: 9
	}, this) : showIntroSpread ? /* @__PURE__ */ _jsxDEV(ChapterIntroSpread, {
		onContinue: () => setShowIntroSpread(false),
		onBack: () => {
			setShowIntroSpread(false);
			setShowCover(true);
		}
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 141,
		columnNumber: 9
	}, this) : /* @__PURE__ */ _jsxDEV("div", {
		className: "activity-workspace materials-around-us-theme",
		style: {
			paddingTop: 0,
			paddingBottom: "72px",
			background: "linear-gradient(135deg, #F5EFE6 0%, #EDE4D3 40%, #F0E8D8 70%, #E8DDCC 100%)"
		},
		children: [/* @__PURE__ */ _jsxDEV("div", {
			style: {
				display: "flex",
				flex: 1,
				overflow: "hidden",
				position: "relative"
			},
			children: [
				/* @__PURE__ */ _jsxDEV("button", {
					onClick: () => setIsTimelineOpen(!isTimelineOpen),
					style: {
						position: "absolute",
						left: isTimelineOpen ? "320px" : "0px",
						top: "50%",
						transform: "translateY(-50%)",
						zIndex: 101,
						background: "var(--surface)",
						border: "1px solid var(--border)",
						borderLeft: "none",
						borderTopRightRadius: "8px",
						borderBottomRightRadius: "8px",
						padding: "16px 8px",
						cursor: "pointer",
						boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
						transition: "left 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
						color: "var(--text-primary)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center"
					},
					title: "Toggle Timeline",
					children: /* @__PURE__ */ _jsxDEV(ArrowRight, {
						size: 16,
						style: {
							transform: isTimelineOpen ? "rotate(180deg)" : "rotate(0deg)",
							transition: "transform 0.3s"
						}
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 170,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 146,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "timeline-flyout",
					style: {
						position: "absolute",
						left: 0,
						top: 0,
						bottom: 0,
						zIndex: 100,
						background: "var(--surface)",
						borderRight: "1px solid var(--border)",
						display: "flex",
						flexDirection: "column",
						overflow: "hidden",
						boxShadow: isTimelineOpen ? "4px 0 20px rgba(0,0,0,0.2)" : "none",
						width: "320px",
						transform: isTimelineOpen ? "translateX(0)" : "translateX(-100%)",
						transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease"
					},
					children: /* @__PURE__ */ _jsxDEV("div", {
						style: {
							width: "320px",
							padding: "1.5rem",
							display: "flex",
							flexDirection: "column",
							height: "100%"
						},
						children: [/* @__PURE__ */ _jsxDEV("h3", {
							style: {
								margin: "0 0 1.5rem 0",
								fontSize: "0.9rem",
								color: "var(--text-muted)",
								textTransform: "uppercase",
								letterSpacing: "1px"
							},
							children: "Investigation Progress"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 189,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							style: {
								display: "flex",
								flexDirection: "column",
								gap: "0.5rem",
								overflowY: "auto",
								paddingRight: "0.5rem"
							},
							children: (() => {
								const renderTimelineItem = (item, indentLevel = 0) => {
									const idx = item.originalIndex;
									const isActive = currentFlowIndex === idx || item.type === "mission" && currentFlowIndex > idx && chapterFlow[currentFlowIndex].type === "activity" && chapterFlow.findIndex((n, i) => i > idx && n.type !== "activity") > currentFlowIndex;
									const isLocked = idx > highestUnlockedIndex;
									const isPast = idx <= highestUnlockedIndex && !isActive;
									let icon = "🎯";
									if (item.type === "activity") icon = "🧪";
									if (item.type === "debrief" || item.type === "summary") icon = "📝";
									if (item.type === "handbook") icon = "📖";
									if (item.type === "checkpoint") icon = "✅";
									return /* @__PURE__ */ _jsxDEV("button", {
										disabled: isLocked,
										onClick: () => {
											if (!isLocked) {
												if (item.type === "mission") {
													setShowHandbook(true);
												} else {
													setShowHandbook(false);
												}
												setCurrentFlowIndex(idx);
												setIsTimelineOpen(false);
											}
										},
										style: {
											display: "flex",
											alignItems: "flex-start",
											gap: "0.75rem",
											padding: "0.75rem",
											marginLeft: `${indentLevel * 1}rem`,
											borderRadius: "8px",
											background: isActive ? "var(--accent-bg)" : "transparent",
											border: `1px solid ${isActive ? "var(--accent-border)" : "transparent"}`,
											color: isPast ? "var(--text-muted)" : isActive ? "var(--accent)" : "var(--text-primary)",
											transition: "all 0.2s",
											opacity: isLocked ? .4 : 1,
											cursor: isLocked ? "not-allowed" : "pointer",
											textAlign: "left"
										},
										children: [/* @__PURE__ */ _jsxDEV("span", {
											style: {
												fontSize: "1.2rem",
												flexShrink: 0
											},
											children: icon
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 238,
											columnNumber: 23
										}, this), /* @__PURE__ */ _jsxDEV("div", {
											style: {
												display: "flex",
												flexDirection: "column",
												gap: "0.2rem",
												minWidth: 0
											},
											children: [/* @__PURE__ */ _jsxDEV("span", {
												style: {
													fontSize: "0.85rem",
													fontWeight: isActive ? "bold" : 500,
													whiteSpace: "nowrap",
													overflow: "hidden",
													textOverflow: "ellipsis"
												},
												children: item.title
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 240,
												columnNumber: 25
											}, this), /* @__PURE__ */ _jsxDEV("span", {
												style: {
													fontSize: "0.7rem",
													color: "var(--text-muted)"
												},
												children: item.type === "mission" ? "Mission Briefing" : item.type === "activity" ? item.subtitle : "Evidence Review"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 243,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 239,
											columnNumber: 23
										}, this)]
									}, `item-${idx}`, true, {
										fileName: _jsxFileName,
										lineNumber: 207,
										columnNumber: 21
									}, this);
								};
								const renderTimelineGroup = (group, indentLevel = 0) => {
									const isExpanded = expandedNodes[group.id];
									const getFirstIndex = (node) => {
										if (node.originalIndex !== undefined) return node.originalIndex;
										if (node.children && node.children.length > 0) return getFirstIndex(node.children[0]);
										return 999;
									};
									const firstIndex = getFirstIndex(group);
									const isLocked = firstIndex > highestUnlockedIndex;
									return /* @__PURE__ */ _jsxDEV("div", {
										style: {
											display: "flex",
											flexDirection: "column",
											gap: "0.25rem"
										},
										children: [/* @__PURE__ */ _jsxDEV("button", {
											disabled: isLocked,
											onClick: () => toggleNode(group.id),
											style: {
												display: "flex",
												alignItems: "center",
												justifyContent: "space-between",
												gap: "0.75rem",
												padding: "0.6rem 0.75rem",
												marginLeft: `${indentLevel * 1}rem`,
												borderRadius: "8px",
												background: "rgba(0,0,0,0.03)",
												border: "none",
												color: isLocked ? "var(--text-muted)" : "var(--text-primary)",
												fontWeight: "bold",
												cursor: isLocked ? "not-allowed" : "pointer",
												textAlign: "left",
												opacity: isLocked ? .6 : 1
											},
											children: [/* @__PURE__ */ _jsxDEV("span", {
												style: {
													fontSize: "0.9rem",
													flex: 1,
													whiteSpace: "nowrap",
													overflow: "hidden",
													textOverflow: "ellipsis"
												},
												children: group.title
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 284,
												columnNumber: 25
											}, this), /* @__PURE__ */ _jsxDEV("span", {
												style: {
													fontSize: "0.8rem",
													transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
													transition: "transform 0.2s",
													color: "var(--text-muted)"
												},
												children: "▶"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 285,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 264,
											columnNumber: 23
										}, this), isExpanded && !isLocked && /* @__PURE__ */ _jsxDEV("div", {
											style: {
												display: "flex",
												flexDirection: "column",
												gap: "0.25rem",
												marginTop: "0.25rem"
											},
											children: group.children.map((child) => {
												if (child.type === "stage" || child.type === "barrier") {
													return renderTimelineGroup(child, indentLevel + .5);
												} else {
													return renderTimelineItem(child, indentLevel + .5);
												}
											})
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 288,
											columnNumber: 25
										}, this)]
									}, group.id, true, {
										fileName: _jsxFileName,
										lineNumber: 263,
										columnNumber: 21
									}, this);
								};
								return timelineTree.map((group) => renderTimelineGroup(group, 0));
							})()
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 192,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 188,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 174,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "activity-content",
					style: {
						flex: 1,
						minHeight: 0,
						display: "flex",
						flexDirection: "column",
						position: "relative",
						overflowY: currentNode.type === "activity" ? "hidden" : "auto"
					},
					children: [
						currentNode.type === "mission" && /* @__PURE__ */ _jsxDEV(MissionBriefingSpread, {
							data: currentNode,
							onContinue: handleMissionAccept,
							onBack: () => {
								if (currentFlowIndex > 0) {
									setCurrentFlowIndex((prev) => prev - 1);
								} else {
									setShowIntroSpread(true);
								}
							}
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 311,
							columnNumber: 13
						}, this),
						currentNode.type === "debrief" && /* @__PURE__ */ _jsxDEV(ChiefDetective, {
							mode: "debrief",
							data: currentNode,
							onContinue: handleDebriefContinue,
							onBack: () => {
								if (currentFlowIndex > 0) {
									setCurrentFlowIndex((prev) => prev - 1);
								} else {
									setShowIntroSpread(true);
								}
							}
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 325,
							columnNumber: 13
						}, this),
						currentNode.type === "activity" && (["quiz", "summary"].includes(currentNode.id) ? /* @__PURE__ */ _jsxDEV(currentNode.component, {
							registerBackHandler: (handler) => {
								if (stageRef) stageRef.current = { handleGlobalBack: handler };
							},
							...currentNode.props || {},
							onComplete: handleStageComplete,
							addXp
						}, `${currentNode.id}-${resetKey}`, false, {
							fileName: _jsxFileName,
							lineNumber: 341,
							columnNumber: 15
						}, this) : showHandbook ? /* @__PURE__ */ _jsxDEV("div", {
							style: {
								flex: 1,
								minHeight: 0,
								padding: 0,
								display: "flex",
								flexDirection: "column",
								width: "100%",
								height: "100%",
								boxSizing: "border-box"
							},
							children: /* @__PURE__ */ _jsxDEV(InvestigationHandbook, {
								ref: handbookRef,
								highestUnlockedIndex,
								currentFlowIndex,
								stageCompleted,
								onNext: () => setShowHandbook(false)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 350,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 349,
							columnNumber: 15
						}, this) : /* @__PURE__ */ _jsxDEV("div", {
							style: {
								flex: 1,
								minHeight: 0,
								position: "relative",
								display: "flex",
								flexDirection: "column",
								overflowY: "auto",
								padding: "1.5rem",
								width: "100%",
								height: "100%",
								boxSizing: "border-box"
							},
							children: /* @__PURE__ */ _jsxDEV(currentNode.component, {
								registerBackHandler: (handler) => {
									if (stageRef) stageRef.current = { handleGlobalBack: handler };
								},
								...currentNode.props || {},
								onComplete: handleStageComplete,
								addXp
							}, `${currentNode.id}-${resetKey}`, false, {
								fileName: _jsxFileName,
								lineNumber: 360,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 359,
							columnNumber: 15
						}, this)),
						currentNode.type === "handbook" && (() => {
							const nextNode = chapterFlow[currentFlowIndex + 1];
							return /* @__PURE__ */ _jsxDEV("div", {
								style: {
									position: "relative",
									flex: 1,
									display: "flex"
								},
								children: [nextNode && nextNode.type === "activity" && /* @__PURE__ */ _jsxDEV("div", {
									style: {
										position: "absolute",
										top: 0,
										left: 0,
										right: 0,
										bottom: 0,
										pointerEvents: "none",
										overflow: "hidden"
									},
									children: /* @__PURE__ */ _jsxDEV("div", {
										style: {
											width: "100%",
											height: "100%",
											filter: "blur(12px)",
											transform: "scale(1.05)"
										},
										children: /* @__PURE__ */ _jsxDEV(nextNode.component, {
											...nextNode.props || {},
											addXp: () => {},
											onComplete: () => {}
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 378,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 377,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 376,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									style: {
										position: "relative",
										zIndex: 10,
										flex: 1,
										display: "flex",
										backgroundColor: "rgba(0, 0, 0, 0.4)"
									},
									children: /* @__PURE__ */ _jsxDEV(InvestigationHandbook, {
										data: currentNode,
										onComplete: handleNext
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 383,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 382,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 374,
								columnNumber: 15
							}, this);
						})(),
						currentNode.type === "checkpoint" && /* @__PURE__ */ _jsxDEV("div", {
							style: {
								flex: 1,
								display: "flex",
								background: "var(--bg-color)",
								overflow: "hidden"
							},
							children: /* @__PURE__ */ _jsxDEV(DetectiveCheckpoint, {
								data: currentNode,
								onComplete: handleStageComplete,
								addXp
							}, `${currentNode.id}-${resetKey}`, false, {
								fileName: _jsxFileName,
								lineNumber: 391,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 390,
							columnNumber: 13
						}, this),
						currentNode.type === "summary" && (() => {
							let lastActivityNode = null;
							for (let i = currentFlowIndex - 1; i >= 0; i--) {
								if (chapterFlow[i].type === "activity") {
									lastActivityNode = chapterFlow[i];
									break;
								}
							}
							return /* @__PURE__ */ _jsxDEV("div", {
								style: {
									position: "relative",
									flex: 1,
									display: "flex"
								},
								children: [lastActivityNode && /* @__PURE__ */ _jsxDEV("div", {
									style: {
										position: "absolute",
										top: 0,
										left: 0,
										right: 0,
										bottom: 0,
										pointerEvents: "none",
										overflow: "hidden"
									},
									children: /* @__PURE__ */ _jsxDEV("div", {
										style: {
											width: "100%",
											height: "100%",
											filter: "blur(12px)",
											transform: "scale(1.05)"
										},
										children: /* @__PURE__ */ _jsxDEV(lastActivityNode.component, {
											...lastActivityNode.props || {},
											addXp: () => {},
											onComplete: () => {}
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 408,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 407,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 406,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									style: {
										position: "relative",
										zIndex: 10,
										flex: 1,
										display: "flex",
										backgroundColor: "rgba(0, 0, 0, 0.4)"
									},
									children: /* @__PURE__ */ _jsxDEV(EvidenceSummary, {
										data: currentNode,
										onComplete: handleDebriefContinue
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 413,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 412,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 404,
								columnNumber: 15
							}, this);
						})()
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 309,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 144,
			columnNumber: 7
		}, this), /* @__PURE__ */ _jsxDEV("div", {
			className: "global-action-bar",
			children: [
				/* @__PURE__ */ _jsxDEV("div", {
					className: "global-action-bar-left",
					children: [/* @__PURE__ */ _jsxDEV("button", {
						onClick: onBackToDashboard,
						className: "outline",
						style: {
							padding: "0.85rem 1.6rem",
							fontSize: "1.45rem",
							fontWeight: "bold",
							gap: "0.75rem",
							borderRadius: "10px",
							display: "flex",
							alignItems: "center"
						},
						children: [/* @__PURE__ */ _jsxDEV(ArrowLeft, { size: 24 }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 431,
							columnNumber: 13
						}, this), " Dashboard"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 426,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("button", {
						onClick: () => {
							if (stageRef.current && stageRef.current.handleGlobalBack && stageRef.current.handleGlobalBack()) {
								return;
							}
							setShowHandbook(false);
							if (currentFlowIndex > 0) {
								setCurrentFlowIndex(currentFlowIndex - 1);
							} else {
								setShowIntroSpread(true);
							}
						},
						className: "outline",
						style: {
							padding: "0.85rem 1.6rem",
							fontSize: "1.45rem",
							fontWeight: "bold",
							gap: "0.75rem",
							borderRadius: "10px",
							color: "var(--text-primary)",
							display: "flex",
							alignItems: "center"
						},
						children: [/* @__PURE__ */ _jsxDEV(ArrowLeft, { size: 24 }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 449,
							columnNumber: 13
						}, this), " Back"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 434,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 425,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", { className: "global-action-bar-center" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 453,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "global-action-bar-right",
					children: [/* @__PURE__ */ _jsxDEV("button", {
						onClick: () => {
							setResetKey((prev) => prev + 1);
							setStageCompleted(false);
						},
						className: "outline",
						style: {
							padding: "0.85rem 1.6rem",
							fontSize: "1.45rem",
							fontWeight: "bold",
							gap: "0.75rem",
							borderRadius: "10px",
							color: "var(--danger)",
							borderColor: "var(--danger-border)",
							display: "flex",
							alignItems: "center"
						},
						children: [/* @__PURE__ */ _jsxDEV(RefreshCw, { size: 22 }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 466,
							columnNumber: 13
						}, this), " Reset Activity"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 458,
						columnNumber: 11
					}, this), (currentNode.type === "activity" || currentNode.type === "checkpoint") && /* @__PURE__ */ _jsxDEV("button", {
						onClick: () => {
							if (stageRef.current && stageRef.current.handleGlobalNext && stageRef.current.handleGlobalNext()) {
								return;
							}
							handleNext();
						},
						disabled: false,
						className: "primary",
						style: {
							padding: "0.85rem 1.8rem",
							fontSize: "1.5rem",
							fontWeight: "bold",
							gap: "0.75rem",
							borderRadius: "10px",
							opacity: 1,
							cursor: "pointer",
							transition: "all 0.3s",
							display: "flex",
							alignItems: "center"
						},
						children: ["Proceed to next ", /* @__PURE__ */ _jsxDEV(ArrowRight, { size: 26 }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 492,
							columnNumber: 31
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 470,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 457,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 424,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 143,
		columnNumber: 9
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 136,
		columnNumber: 5
	}, this);
}
_s(MaterialsAroundUsActivity, "QcTsQH5HsV3V6EbSW/Geai9z/ng=", false, function() {
	return [useTheme];
});
_c = MaterialsAroundUsActivity;
var _c;
$RefreshReg$(_c, "MaterialsAroundUsActivity");
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
import * as __vite_react_currentExports from "/src/science/class6/chapter6/MaterialsAroundUs/index.jsx?t=1789189356431";
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }

  const currentExports = __vite_react_currentExports;
  queueMicrotask(() => {
    RefreshRuntime.registerExportsForReactRefresh("C:/Users/GANES/Futura-Edtech/src/science/class6/chapter6/MaterialsAroundUs/index.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("C:/Users/GANES/Futura-Edtech/src/science/class6/chapter6/MaterialsAroundUs/index.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) { return RefreshRuntime.register(type, "C:/Users/GANES/Futura-Edtech/src/science/class6/chapter6/MaterialsAroundUs/index.jsx" + ' ' + id); }
function $RefreshSig$() { return RefreshRuntime.createSignatureFunctionForTransform(); }

//# sourceMappingURL=data:application/json;base64,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QUFXLGNBQWM7T0FBUSxPQUFPO09BQWlCLGFBQWE7T0FBd0IsU0FBUztPQUFRLFlBQVk7TUFBUztnQkFOeE4sQ0FRRSx3QkFBQyxXQUFELEVBQVcsTUFBTSxHQUFLOzs7O2dCQUFDLGlCQUNqQjs7Ozs7Z0JBRU4sWUFBWSxTQUFTLGNBQWMsWUFBWSxTQUFTLGlCQUN4RCx3QkFBQyxVQUFEO01BQ0UsZUFBZTtPQUNiLElBQUksU0FBUyxXQUFXLFNBQVMsUUFBUSxvQkFBb0IsU0FBUyxRQUFRLGlCQUFpQixHQUFHO1FBQ2hHO09BQ0Y7T0FDQSxXQUFXO01BQ2I7TUFDQSxVQUFVO01BQ1YsV0FBVztNQUNYLE9BQU87T0FDTCxTQUFTO09BQ1QsVUFBVTtPQUNWLFlBQVk7T0FDWixLQUFLO09BQ0wsY0FBYztPQUNkLFNBQVM7T0FDVCxRQUFRO09BQ1IsWUFBWTtPQUNaLFNBQVM7T0FDVCxZQUFZO01BQ2Q7Z0JBcEJGLENBcUJDLG9CQUNpQix3QkFBQyxZQUFELEVBQVksTUFBTSxHQUFLOzs7O2NBQ2pDOzs7OzthQUVQOzs7Ozs7R0FDRjs7Ozs7VUFDRjs7Ozs7U0FFTDs7Ozs7QUFFSiIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJpbmRleC5qc3giXSwidmVyc2lvbiI6Mywic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEFycm93TGVmdCwgUmVmcmVzaEN3LCBTdW4sIE1vb24sIEFycm93UmlnaHQgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xyXG5pbXBvcnQgJy4vdGhlbWUuY3NzJztcclxuaW1wb3J0IHsgdXNlVGhlbWUgfSBmcm9tICcuLi8uLi8uLi8uLi9UaGVtZUNvbnRleHQuanN4JztcclxuaW1wb3J0IHsgY2hhcHRlckZsb3cgfSBmcm9tICcuL3N0b3J5RW5naW5lJztcclxuaW1wb3J0IENoaWVmRGV0ZWN0aXZlIGZyb20gJy4vY29tcG9uZW50cy9DaGllZkRldGVjdGl2ZS9DaGllZkRldGVjdGl2ZSc7XHJcbmltcG9ydCBJbnZlc3RpZ2F0aW9uSGFuZGJvb2sgZnJvbSAnLi9jb21wb25lbnRzL0VkdWNhdGlvbmFsL0ludmVzdGlnYXRpb25IYW5kYm9vayc7XHJcbmltcG9ydCBEZXRlY3RpdmVDaGVja3BvaW50IGZyb20gJy4vY29tcG9uZW50cy9FZHVjYXRpb25hbC9EZXRlY3RpdmVDaGVja3BvaW50JztcclxuaW1wb3J0IEV2aWRlbmNlU3VtbWFyeSBmcm9tICcuL2NvbXBvbmVudHMvRWR1Y2F0aW9uYWwvRXZpZGVuY2VTdW1tYXJ5JztcclxuaW1wb3J0IENoYXB0ZXJDb3ZlciBmcm9tICcuL2NvbXBvbmVudHMvRWR1Y2F0aW9uYWwvQ2hhcHRlckNvdmVyJztcclxuaW1wb3J0IENoYXB0ZXJJbnRyb1NwcmVhZCBmcm9tICcuL2NvbXBvbmVudHMvRWR1Y2F0aW9uYWwvQ2hhcHRlckludHJvU3ByZWFkJztcclxuaW1wb3J0IE1pc3Npb25CcmllZmluZ1NwcmVhZCBmcm9tICcuL2NvbXBvbmVudHMvRWR1Y2F0aW9uYWwvTWlzc2lvbkJyaWVmaW5nU3ByZWFkJztcclxuaW1wb3J0IEZ1bGxzY3JlZW5CdXR0b24gZnJvbSAnLi9jb21wb25lbnRzL0NvbW1vbi9GdWxsc2NyZWVuQnV0dG9uJztcclxuXHJcbmNvbnN0IHRpbWVsaW5lVHJlZSA9ICgoKSA9PiB7XHJcbiAgY29uc3QgdHJlZSA9IFtdO1xyXG4gIGxldCBjdXJyZW50QmFycmllciA9IG51bGw7XHJcbiAgbGV0IGN1cnJlbnRTdGFnZSA9IG51bGw7XHJcblxyXG4gIGNoYXB0ZXJGbG93LmZvckVhY2goKG5vZGUsIGluZGV4KSA9PiB7XHJcbiAgICBjb25zdCBpdGVtID0geyAuLi5ub2RlLCBvcmlnaW5hbEluZGV4OiBpbmRleCB9O1xyXG4gICAgbGV0IGJhcnJpZXJJZCA9IG51bGw7XHJcbiAgICBcclxuICAgIGlmIChub2RlLnRpdGxlLmluY2x1ZGVzKCdCYXJyaWVyIDEnKSB8fCBub2RlLnRpdGxlLmluY2x1ZGVzKCdTdGFnZSA2LjEnKSkgYmFycmllcklkID0gJ0JhcnJpZXIgNi4xJztcclxuICAgIGVsc2UgaWYgKG5vZGUudGl0bGUuaW5jbHVkZXMoJ0JhcnJpZXIgMicpIHx8IG5vZGUudGl0bGUuaW5jbHVkZXMoJ1N0YWdlIDYuMicpKSBiYXJyaWVySWQgPSAnQmFycmllciA2LjInO1xyXG4gICAgZWxzZSBpZiAobm9kZS50aXRsZS5pbmNsdWRlcygnQmFycmllciAzJykgfHwgbm9kZS50aXRsZS5pbmNsdWRlcygnU3RhZ2UgNi4zJykpIGJhcnJpZXJJZCA9ICdCYXJyaWVyIDYuMyc7XHJcbiAgICBlbHNlIGlmIChub2RlLnRpdGxlLmluY2x1ZGVzKCdCYXJyaWVyIDQnKSB8fCBub2RlLnRpdGxlLmluY2x1ZGVzKCdEbyBZb3UgS25vdz8nKSB8fCBub2RlLnRpdGxlLmluY2x1ZGVzKCdDb25jZXB0IE1hcCcpKSBiYXJyaWVySWQgPSAnQmFycmllciA2LjQnO1xyXG4gICAgZWxzZSBiYXJyaWVySWQgPSAnRmluYWwgV3JhcC11cCc7XHJcblxyXG4gICAgaWYgKCFjdXJyZW50QmFycmllciB8fCBjdXJyZW50QmFycmllci5pZCAhPT0gYmFycmllcklkKSB7XHJcbiAgICAgIGN1cnJlbnRCYXJyaWVyID0geyBpZDogYmFycmllcklkLCB0aXRsZTogYmFycmllcklkLCB0eXBlOiAnYmFycmllcicsIGNoaWxkcmVuOiBbXSB9O1xyXG4gICAgICB0cmVlLnB1c2goY3VycmVudEJhcnJpZXIpO1xyXG4gICAgICBjdXJyZW50U3RhZ2UgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChiYXJyaWVySWQgPT09ICdCYXJyaWVyIDYuMycpIHtcclxuICAgICAgY29uc3Qgc3RhZ2VNYXRjaCA9IG5vZGUudGl0bGUubWF0Y2goLyhTdGFnZSA2XFwuM1xcLlxcZCspLyk7XHJcbiAgICAgIGlmIChzdGFnZU1hdGNoKSB7XHJcbiAgICAgICAgY29uc3Qgc3RhZ2VOYW1lID0gc3RhZ2VNYXRjaFsxXTtcclxuICAgICAgICBpZiAoIWN1cnJlbnRTdGFnZSB8fCBjdXJyZW50U3RhZ2UuaWQgIT09IHN0YWdlTmFtZSkge1xyXG4gICAgICAgICAgY3VycmVudFN0YWdlID0geyBpZDogc3RhZ2VOYW1lLCB0aXRsZTogc3RhZ2VOYW1lLCB0eXBlOiAnc3RhZ2UnLCBjaGlsZHJlbjogW10gfTtcclxuICAgICAgICAgIGN1cnJlbnRCYXJyaWVyLmNoaWxkcmVuLnB1c2goY3VycmVudFN0YWdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3VycmVudFN0YWdlLmNoaWxkcmVuLnB1c2goaXRlbSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY3VycmVudEJhcnJpZXIuY2hpbGRyZW4ucHVzaChpdGVtKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY3VycmVudEJhcnJpZXIuY2hpbGRyZW4ucHVzaChpdGVtKTtcclxuICAgIH1cclxuICB9KTtcclxuICByZXR1cm4gdHJlZTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1hdGVyaWFsc0Fyb3VuZFVzQWN0aXZpdHkoeyBvbkJhY2tUb0Rhc2hib2FyZCB9KSB7XHJcbiAgY29uc3QgaGFuZGJvb2tSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3Qgc3RhZ2VSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3QgW2N1cnJlbnRGbG93SW5kZXgsIHNldEN1cnJlbnRGbG93SW5kZXhdID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW2hpZ2hlc3RVbmxvY2tlZEluZGV4LCBzZXRIaWdoZXN0VW5sb2NrZWRJbmRleF0gPSB1c2VTdGF0ZSgwKTtcclxuICBjb25zdCBbaXNUaW1lbGluZU9wZW4sIHNldElzVGltZWxpbmVPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc3RhZ2VDb21wbGV0ZWQsIHNldFN0YWdlQ29tcGxldGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbeHAsIHNldFhwXSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtyZXNldEtleSwgc2V0UmVzZXRLZXldID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW3Nob3dDb3Zlciwgc2V0U2hvd0NvdmVyXSA9IHVzZVN0YXRlKHRydWUpO1xyXG4gIGNvbnN0IFtzaG93SW50cm9TcHJlYWQsIHNldFNob3dJbnRyb1NwcmVhZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3Nob3dIYW5kYm9vaywgc2V0U2hvd0hhbmRib29rXSA9IHVzZVN0YXRlKHRydWUpO1xyXG4gIGNvbnN0IFtleHBhbmRlZE5vZGVzLCBzZXRFeHBhbmRlZE5vZGVzXSA9IHVzZVN0YXRlKHsgXHJcbiAgICAnQmFycmllciA2LjEnOiB0cnVlLCAnQmFycmllciA2LjInOiB0cnVlLCAnQmFycmllciA2LjMnOiB0cnVlLCAnQmFycmllciA2LjQnOiB0cnVlLCAnRmluYWwgV3JhcC11cCc6IHRydWUsXHJcbiAgICAnU3RhZ2UgNi4zLjEnOiB0cnVlLCAnU3RhZ2UgNi4zLjInOiB0cnVlLCAnU3RhZ2UgNi4zLjMnOiB0cnVlLCAnU3RhZ2UgNi4zLjQnOiB0cnVlLCAnU3RhZ2UgNi4zLjUnOiB0cnVlLCAnU3RhZ2UgNi4zLjYnOiB0cnVlXHJcbiAgfSk7XHJcbiAgXHJcbiAgY29uc3QgdG9nZ2xlTm9kZSA9IChpZCkgPT4gc2V0RXhwYW5kZWROb2RlcyhwcmV2ID0+ICh7IC4uLnByZXYsIFtpZF06ICFwcmV2W2lkXSB9KSk7XHJcblxyXG4gIFxyXG5cclxuICBjb25zdCBhZGRYcCA9IChhbW91bnQpID0+IHtcclxuICAgIHNldFhwKHByZXYgPT4gcHJldiArIGFtb3VudCk7XHJcbiAgICBcclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVOZXh0ID0gKCkgPT4ge1xyXG4gICAgc2V0U3RhZ2VDb21wbGV0ZWQoZmFsc2UpO1xyXG4gICAgc2V0U2hvd0hhbmRib29rKGZhbHNlKTtcclxuICAgIGlmIChjdXJyZW50Rmxvd0luZGV4IDwgY2hhcHRlckZsb3cubGVuZ3RoIC0gMSkge1xyXG4gICAgICBjb25zdCBuZXh0SW5kZXggPSBjdXJyZW50Rmxvd0luZGV4ICsgMTtcclxuICAgICAgc2V0Q3VycmVudEZsb3dJbmRleChuZXh0SW5kZXgpO1xyXG4gICAgICBpZiAobmV4dEluZGV4ID4gaGlnaGVzdFVubG9ja2VkSW5kZXgpIHtcclxuICAgICAgICBzZXRIaWdoZXN0VW5sb2NrZWRJbmRleChuZXh0SW5kZXgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuICBcclxuICBjb25zdCBjdXJyZW50Tm9kZSA9IGNoYXB0ZXJGbG93W2N1cnJlbnRGbG93SW5kZXhdO1xyXG4gIFxyXG4gIGNvbnN0IGhhbmRsZU1pc3Npb25BY2NlcHQgPSAoKSA9PiB7XHJcbiAgICBpZiAoY3VycmVudE5vZGUucmV3YXJkWFAgJiYgY3VycmVudE5vZGUudHlwZSA9PT0gJ21pc3Npb24nKSB7XHJcbiAgICAgIGFkZFhwKGN1cnJlbnROb2RlLnJld2FyZFhQKTtcclxuICAgIH1cclxuICAgIHNldFN0YWdlQ29tcGxldGVkKGZhbHNlKTtcclxuICAgIGlmIChjdXJyZW50Rmxvd0luZGV4IDwgY2hhcHRlckZsb3cubGVuZ3RoIC0gMSkge1xyXG4gICAgICBjb25zdCBuZXh0SW5kZXggPSBjdXJyZW50Rmxvd0luZGV4ICsgMTtcclxuICAgICAgY29uc3QgbmV4dE5vZGUgPSBjaGFwdGVyRmxvd1tuZXh0SW5kZXhdO1xyXG4gICAgICBcclxuICAgICAgaWYgKG5leHROb2RlICYmIG5leHROb2RlLmlkID09PSAnc3RhZ2UxJykge1xyXG4gICAgICAgIHNldFNob3dIYW5kYm9vayh0cnVlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZXRTaG93SGFuZGJvb2soZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICBzZXRDdXJyZW50Rmxvd0luZGV4KG5leHRJbmRleCk7XHJcbiAgICAgIGlmIChuZXh0SW5kZXggPiBoaWdoZXN0VW5sb2NrZWRJbmRleCkge1xyXG4gICAgICAgIHNldEhpZ2hlc3RVbmxvY2tlZEluZGV4KG5leHRJbmRleCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVEZWJyaWVmQ29udGludWUgPSAoKSA9PiB7XHJcbiAgICBpZiAoY3VycmVudE5vZGUucmV3YXJkWFAgJiYgKGN1cnJlbnROb2RlLnR5cGUgPT09ICdkZWJyaWVmJyB8fCBjdXJyZW50Tm9kZS50eXBlID09PSAnc3VtbWFyeScpKSB7XHJcbiAgICAgIGFkZFhwKGN1cnJlbnROb2RlLnJld2FyZFhQKTtcclxuICAgIH1cclxuICAgIGlmIChjdXJyZW50Tm9kZS5pc0ZpbmFsKSB7XHJcbiAgICAgIG9uQmFja1RvRGFzaGJvYXJkKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBoYW5kbGVOZXh0KCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU3RhZ2VDb21wbGV0ZSA9ICgpID0+IHtcclxuICAgIHNldFN0YWdlQ29tcGxldGVkKHRydWUpO1xyXG4gIH07XHJcblxyXG4gIC8vIEdsb2JhbCBUaGVtZSBIb29rXHJcbiAgY29uc3QgeyB0aGVtZSwgdG9nZ2xlVGhlbWUgfSA9IHVzZVRoZW1lKCk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICA8RnVsbHNjcmVlbkJ1dHRvbiAvPlxyXG4gICAgICB7c2hvd0NvdmVyID8gKFxyXG4gICAgICAgIDxDaGFwdGVyQ292ZXIgb25PcGVuQm9vaz17KCkgPT4geyBzZXRTaG93Q292ZXIoZmFsc2UpOyBzZXRTaG93SW50cm9TcHJlYWQodHJ1ZSk7IH19IG9uQmFjaz17b25CYWNrVG9EYXNoYm9hcmR9IC8+XHJcbiAgICAgICkgOiBzaG93SW50cm9TcHJlYWQgPyAoXHJcbiAgICAgICAgPENoYXB0ZXJJbnRyb1NwcmVhZCBvbkNvbnRpbnVlPXsoKSA9PiBzZXRTaG93SW50cm9TcHJlYWQoZmFsc2UpfSBvbkJhY2s9eygpID0+IHsgc2V0U2hvd0ludHJvU3ByZWFkKGZhbHNlKTsgc2V0U2hvd0NvdmVyKHRydWUpOyB9fSAvPlxyXG4gICAgICApIDogKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aXZpdHktd29ya3NwYWNlIG1hdGVyaWFscy1hcm91bmQtdXMtdGhlbWVcIiBzdHlsZT17eyBwYWRkaW5nVG9wOiAwLCBwYWRkaW5nQm90dG9tOiAnNzJweCcsIGJhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjRjVFRkU2IDAlLCAjRURFNEQzIDQwJSwgI0YwRThEOCA3MCUsICNFOEREQ0MgMTAwJSknIH19PlxyXG4gICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZmxleDogMSwgb3ZlcmZsb3c6ICdoaWRkZW4nLCBwb3NpdGlvbjogJ3JlbGF0aXZlJyB9fT5cclxuICAgICAgICB7LyogVG9nZ2xlIEJ1dHRvbiAqL31cclxuICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc1RpbWVsaW5lT3BlbighaXNUaW1lbGluZU9wZW4pfVxyXG4gICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgIGxlZnQ6IGlzVGltZWxpbmVPcGVuID8gJzMyMHB4JyA6ICcwcHgnLFxyXG4gICAgICAgICAgICB0b3A6ICc1MCUnLFxyXG4gICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC01MCUpJyxcclxuICAgICAgICAgICAgekluZGV4OiAxMDEsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICd2YXIoLS1zdXJmYWNlKScsXHJcbiAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1ib3JkZXIpJyxcclxuICAgICAgICAgICAgYm9yZGVyTGVmdDogJ25vbmUnLFxyXG4gICAgICAgICAgICBib3JkZXJUb3BSaWdodFJhZGl1czogJzhweCcsXHJcbiAgICAgICAgICAgIGJvcmRlckJvdHRvbVJpZ2h0UmFkaXVzOiAnOHB4JyxcclxuICAgICAgICAgICAgcGFkZGluZzogJzE2cHggOHB4JyxcclxuICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAgICAgICAgIGJveFNoYWRvdzogJzJweCAwIDhweCByZ2JhKDAsMCwwLDAuMSknLFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiAnbGVmdCAwLjRzIGN1YmljLWJlemllcigwLjE2LCAxLCAwLjMsIDEpJyxcclxuICAgICAgICAgICAgY29sb3I6ICd2YXIoLS10ZXh0LXByaW1hcnkpJyxcclxuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInXHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgICAgdGl0bGU9XCJUb2dnbGUgVGltZWxpbmVcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxBcnJvd1JpZ2h0IHNpemU9ezE2fSBzdHlsZT17eyB0cmFuc2Zvcm06IGlzVGltZWxpbmVPcGVuID8gJ3JvdGF0ZSgxODBkZWcpJyA6ICdyb3RhdGUoMGRlZyknLCB0cmFuc2l0aW9uOiAndHJhbnNmb3JtIDAuM3MnIH19IC8+XHJcbiAgICAgICAgPC9idXR0b24+XHJcblxyXG4gICAgICAgIHsvKiBUaW1lbGluZSBTaWRlYmFyICovfVxyXG4gICAgICAgIDxkaXYgXHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJ0aW1lbGluZS1mbHlvdXRcIlxyXG4gICAgICAgICAgc3R5bGU9e3sgXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBcclxuICAgICAgICAgICAgbGVmdDogMCxcclxuICAgICAgICAgICAgdG9wOiAwLCBib3R0b206IDAsIHpJbmRleDogMTAwLCBcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLXN1cmZhY2UpJywgYm9yZGVyUmlnaHQ6ICcxcHggc29saWQgdmFyKC0tYm9yZGVyKScsIFxyXG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBcclxuICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLCBib3hTaGFkb3c6IGlzVGltZWxpbmVPcGVuID8gJzRweCAwIDIwcHggcmdiYSgwLDAsMCwwLjIpJyA6ICdub25lJyxcclxuICAgICAgICAgICAgd2lkdGg6ICczMjBweCcsIFxyXG4gICAgICAgICAgICB0cmFuc2Zvcm06IGlzVGltZWxpbmVPcGVuID8gJ3RyYW5zbGF0ZVgoMCknIDogJ3RyYW5zbGF0ZVgoLTEwMCUpJyxcclxuICAgICAgICAgICAgdHJhbnNpdGlvbjogJ3RyYW5zZm9ybSAwLjRzIGN1YmljLWJlemllcigwLjE2LCAxLCAwLjMsIDEpLCBib3gtc2hhZG93IDAuNHMgZWFzZSdcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzMyMHB4JywgcGFkZGluZzogJzEuNXJlbScsIGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIGhlaWdodDogJzEwMCUnIH19PlxyXG4gICAgICAgICAgICA8aDMgc3R5bGU9e3sgbWFyZ2luOiAnMCAwIDEuNXJlbSAwJywgZm9udFNpemU6ICcwLjlyZW0nLCBjb2xvcjogJ3ZhcigtLXRleHQtbXV0ZWQpJywgdGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZScsIGxldHRlclNwYWNpbmc6ICcxcHgnIH19PlxyXG4gICAgICAgICAgICAgIEludmVzdGlnYXRpb24gUHJvZ3Jlc3NcclxuICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBnYXA6ICcwLjVyZW0nLCBvdmVyZmxvd1k6ICdhdXRvJywgcGFkZGluZ1JpZ2h0OiAnMC41cmVtJyB9fT5cclxuICAgICAgICAgICAgICB7KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlbmRlclRpbWVsaW5lSXRlbSA9IChpdGVtLCBpbmRlbnRMZXZlbCA9IDApID0+IHtcclxuICAgICAgICAgICAgICAgICAgY29uc3QgaWR4ID0gaXRlbS5vcmlnaW5hbEluZGV4O1xyXG4gICAgICAgICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGN1cnJlbnRGbG93SW5kZXggPT09IGlkeCB8fCAoaXRlbS50eXBlID09PSAnbWlzc2lvbicgJiYgY3VycmVudEZsb3dJbmRleCA+IGlkeCAmJiBjaGFwdGVyRmxvd1tjdXJyZW50Rmxvd0luZGV4XS50eXBlID09PSAnYWN0aXZpdHknICYmIGNoYXB0ZXJGbG93LmZpbmRJbmRleCgobiwgaSkgPT4gaSA+IGlkeCAmJiBuLnR5cGUgIT09ICdhY3Rpdml0eScpID4gY3VycmVudEZsb3dJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlzTG9ja2VkID0gaWR4ID4gaGlnaGVzdFVubG9ja2VkSW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlzUGFzdCA9IGlkeCA8PSBoaWdoZXN0VW5sb2NrZWRJbmRleCAmJiAhaXNBY3RpdmU7XHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICBsZXQgaWNvbiA9ICfwn46vJztcclxuICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gJ2FjdGl2aXR5JykgaWNvbiA9ICfwn6eqJztcclxuICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gJ2RlYnJpZWYnIHx8IGl0ZW0udHlwZSA9PT0gJ3N1bW1hcnknKSBpY29uID0gJ/Cfk50nO1xyXG4gICAgICAgICAgICAgICAgICBpZiAoaXRlbS50eXBlID09PSAnaGFuZGJvb2snKSBpY29uID0gJ/Cfk5YnO1xyXG4gICAgICAgICAgICAgICAgICBpZiAoaXRlbS50eXBlID09PSAnY2hlY2twb2ludCcpIGljb24gPSAn4pyFJztcclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBcclxuICAgICAgICAgICAgICAgICAgICAgIGtleT17YGl0ZW0tJHtpZHh9YH0gXHJcbiAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNMb2NrZWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNMb2NrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS50eXBlID09PSAnbWlzc2lvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNob3dIYW5kYm9vayh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0hhbmRib29rKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q3VycmVudEZsb3dJbmRleChpZHgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldElzVGltZWxpbmVPcGVuKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2ZsZXgtc3RhcnQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnYXA6ICcwLjc1cmVtJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzAuNzVyZW0nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5MZWZ0OiBgJHtpbmRlbnRMZXZlbCAqIDF9cmVtYCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnOHB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogaXNBY3RpdmUgPyAndmFyKC0tYWNjZW50LWJnKScgOiAndHJhbnNwYXJlbnQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHtpc0FjdGl2ZSA/ICd2YXIoLS1hY2NlbnQtYm9yZGVyKScgOiAndHJhbnNwYXJlbnQnfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBpc1Bhc3QgPyAndmFyKC0tdGV4dC1tdXRlZCknIDogaXNBY3RpdmUgPyAndmFyKC0tYWNjZW50KScgOiAndmFyKC0tdGV4dC1wcmltYXJ5KScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb246ICdhbGwgMC4ycycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IGlzTG9ja2VkID8gMC40IDogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiBpc0xvY2tlZCA/ICdub3QtYWxsb3dlZCcgOiAncG9pbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2xlZnQnXHJcbiAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMS4ycmVtJywgZmxleFNocmluazogMCB9fT57aWNvbn08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIGdhcDogJzAuMnJlbScsIG1pbldpZHRoOiAwIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzAuODVyZW0nLCBmb250V2VpZ2h0OiBpc0FjdGl2ZSA/ICdib2xkJyA6IDUwMCwgd2hpdGVTcGFjZTogJ25vd3JhcCcsIG92ZXJmbG93OiAnaGlkZGVuJywgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMC43cmVtJywgY29sb3I6ICd2YXIoLS10ZXh0LW11dGVkKScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAge2l0ZW0udHlwZSA9PT0gJ21pc3Npb24nID8gJ01pc3Npb24gQnJpZWZpbmcnIDogaXRlbS50eXBlID09PSAnYWN0aXZpdHknID8gaXRlbS5zdWJ0aXRsZSA6ICdFdmlkZW5jZSBSZXZpZXcnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVuZGVyVGltZWxpbmVHcm91cCA9IChncm91cCwgaW5kZW50TGV2ZWwgPSAwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlzRXhwYW5kZWQgPSBleHBhbmRlZE5vZGVzW2dyb3VwLmlkXTtcclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGdldEZpcnN0SW5kZXggPSAobm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLm9yaWdpbmFsSW5kZXggIT09IHVuZGVmaW5lZCkgcmV0dXJuIG5vZGUub3JpZ2luYWxJbmRleDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5jaGlsZHJlbiAmJiBub2RlLmNoaWxkcmVuLmxlbmd0aCA+IDApIHJldHVybiBnZXRGaXJzdEluZGV4KG5vZGUuY2hpbGRyZW5bMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA5OTk7XHJcbiAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0SW5kZXggPSBnZXRGaXJzdEluZGV4KGdyb3VwKTtcclxuICAgICAgICAgICAgICAgICAgY29uc3QgaXNMb2NrZWQgPSBmaXJzdEluZGV4ID4gaGlnaGVzdFVubG9ja2VkSW5kZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtncm91cC5pZH0gc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgZ2FwOiAnMC4yNXJlbScgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0xvY2tlZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdG9nZ2xlTm9kZShncm91cC5pZCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiAnMC43NXJlbScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzAuNnJlbSAwLjc1cmVtJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5MZWZ0OiBgJHtpbmRlbnRMZXZlbCAqIDF9cmVtYCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICdyZ2JhKDAsMCwwLDAuMDMpJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6ICdub25lJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogaXNMb2NrZWQgPyAndmFyKC0tdGV4dC1tdXRlZCknIDogJ3ZhcigtLXRleHQtcHJpbWFyeSknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IGlzTG9ja2VkID8gJ25vdC1hbGxvd2VkJyA6ICdwb2ludGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdsZWZ0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiBpc0xvY2tlZCA/IDAuNiA6IDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcwLjlyZW0nLCBmbGV4OiAxLCB3aGl0ZVNwYWNlOiAnbm93cmFwJywgb3ZlcmZsb3c6ICdoaWRkZW4nLCB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycgfX0+e2dyb3VwLnRpdGxlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcwLjhyZW0nLCB0cmFuc2Zvcm06IGlzRXhwYW5kZWQgPyAncm90YXRlKDkwZGVnKScgOiAncm90YXRlKDBkZWcpJywgdHJhbnNpdGlvbjogJ3RyYW5zZm9ybSAwLjJzJywgY29sb3I6ICd2YXIoLS10ZXh0LW11dGVkKScgfX0+4pa2PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7aXNFeHBhbmRlZCAmJiAhaXNMb2NrZWQgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIGdhcDogJzAuMjVyZW0nLCBtYXJnaW5Ub3A6ICcwLjI1cmVtJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7Z3JvdXAuY2hpbGRyZW4ubWFwKGNoaWxkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZC50eXBlID09PSAnc3RhZ2UnIHx8IGNoaWxkLnR5cGUgPT09ICdiYXJyaWVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVuZGVyVGltZWxpbmVHcm91cChjaGlsZCwgaW5kZW50TGV2ZWwgKyAwLjUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlbmRlclRpbWVsaW5lSXRlbShjaGlsZCwgaW5kZW50TGV2ZWwgKyAwLjUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aW1lbGluZVRyZWUubWFwKGdyb3VwID0+IHJlbmRlclRpbWVsaW5lR3JvdXAoZ3JvdXAsIDApKTtcclxuICAgICAgICAgICAgICB9KSgpfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICB7LyogTWFpbiBDb250ZW50IEFyZWEgLSBGdWxsIFdpZHRoICovfVxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWN0aXZpdHktY29udGVudFwiIHN0eWxlPXt7IGZsZXg6IDEsIG1pbkhlaWdodDogMCwgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgcG9zaXRpb246ICdyZWxhdGl2ZScsIG92ZXJmbG93WTogY3VycmVudE5vZGUudHlwZSA9PT0gJ2FjdGl2aXR5JyA/ICdoaWRkZW4nIDogJ2F1dG8nIH19PlxyXG4gICAgICAgICAge2N1cnJlbnROb2RlLnR5cGUgPT09ICdtaXNzaW9uJyAmJiAoXHJcbiAgICAgICAgICAgIDxNaXNzaW9uQnJpZWZpbmdTcHJlYWQgXHJcbiAgICAgICAgICAgICAgZGF0YT17Y3VycmVudE5vZGV9IFxyXG4gICAgICAgICAgICAgIG9uQ29udGludWU9e2hhbmRsZU1pc3Npb25BY2NlcHR9IFxyXG4gICAgICAgICAgICAgIG9uQmFjaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRGbG93SW5kZXggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgIHNldEN1cnJlbnRGbG93SW5kZXgocHJldiA9PiBwcmV2IC0gMSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBzZXRTaG93SW50cm9TcHJlYWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfX0gXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICB7Y3VycmVudE5vZGUudHlwZSA9PT0gJ2RlYnJpZWYnICYmIChcclxuICAgICAgICAgICAgPENoaWVmRGV0ZWN0aXZlIFxyXG4gICAgICAgICAgICAgIG1vZGU9XCJkZWJyaWVmXCIgXHJcbiAgICAgICAgICAgICAgZGF0YT17Y3VycmVudE5vZGV9IFxyXG4gICAgICAgICAgICAgIG9uQ29udGludWU9e2hhbmRsZURlYnJpZWZDb250aW51ZX0gXHJcbiAgICAgICAgICAgICAgb25CYWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudEZsb3dJbmRleCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgc2V0Q3VycmVudEZsb3dJbmRleChwcmV2ID0+IHByZXYgLSAxKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHNldFNob3dJbnRyb1NwcmVhZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICAgIFxyXG4gICAgICAgICAge2N1cnJlbnROb2RlLnR5cGUgPT09ICdhY3Rpdml0eScgJiYgKFxyXG4gICAgICAgICAgICBbJ3F1aXonLCAnc3VtbWFyeSddLmluY2x1ZGVzKGN1cnJlbnROb2RlLmlkKSA/IChcclxuICAgICAgICAgICAgICA8Y3VycmVudE5vZGUuY29tcG9uZW50IFxyXG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJCYWNrSGFuZGxlcj17KGhhbmRsZXIpID0+IHsgaWYgKHN0YWdlUmVmKSBzdGFnZVJlZi5jdXJyZW50ID0geyBoYW5kbGVHbG9iYWxCYWNrOiBoYW5kbGVyIH07IH19XHJcbiAgICAgICAgICAgICAgICBrZXk9e2Ake2N1cnJlbnROb2RlLmlkfS0ke3Jlc2V0S2V5fWB9XHJcbiAgICAgICAgICAgICAgICB7Li4uKGN1cnJlbnROb2RlLnByb3BzIHx8IHt9KX0gXHJcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlPXtoYW5kbGVTdGFnZUNvbXBsZXRlfSBcclxuICAgICAgICAgICAgICAgIGFkZFhwPXthZGRYcH0gXHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgKSA6IHNob3dIYW5kYm9vayA/IChcclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZsZXg6IDEsIG1pbkhlaWdodDogMCwgcGFkZGluZzogMCwgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMTAwJScsIGJveFNpemluZzogJ2JvcmRlci1ib3gnIH19PlxyXG4gICAgICAgICAgICAgICAgPEludmVzdGlnYXRpb25IYW5kYm9vayBcclxuICAgICAgICAgICAgICAgICAgcmVmPXtoYW5kYm9va1JlZn1cclxuICAgICAgICAgICAgICAgICAgaGlnaGVzdFVubG9ja2VkSW5kZXg9e2hpZ2hlc3RVbmxvY2tlZEluZGV4fSBcclxuICAgICAgICAgICAgICAgICAgY3VycmVudEZsb3dJbmRleD17Y3VycmVudEZsb3dJbmRleH0gXHJcbiAgICAgICAgICAgICAgICAgIHN0YWdlQ29tcGxldGVkPXtzdGFnZUNvbXBsZXRlZH0gXHJcbiAgICAgICAgICAgICAgICAgIG9uTmV4dD17KCkgPT4gc2V0U2hvd0hhbmRib29rKGZhbHNlKX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmbGV4OiAxLCBtaW5IZWlnaHQ6IDAsIHBvc2l0aW9uOiAncmVsYXRpdmUnLCBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBvdmVyZmxvd1k6ICdhdXRvJywgcGFkZGluZzogJzEuNXJlbScsIHdpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnLCBib3hTaXppbmc6ICdib3JkZXItYm94JyB9fT5cclxuICAgICAgICAgICAgICAgIDxjdXJyZW50Tm9kZS5jb21wb25lbnQgXHJcbiAgICAgICAgICAgICAgICAgIHJlZ2lzdGVyQmFja0hhbmRsZXI9eyhoYW5kbGVyKSA9PiB7IGlmIChzdGFnZVJlZikgc3RhZ2VSZWYuY3VycmVudCA9IHsgaGFuZGxlR2xvYmFsQmFjazogaGFuZGxlciB9OyB9fVxyXG4gICAgICAgICAgICAgICAgICBrZXk9e2Ake2N1cnJlbnROb2RlLmlkfS0ke3Jlc2V0S2V5fWB9XHJcbiAgICAgICAgICAgICAgICAgIHsuLi4oY3VycmVudE5vZGUucHJvcHMgfHwge30pfSBcclxuICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17aGFuZGxlU3RhZ2VDb21wbGV0ZX0gXHJcbiAgICAgICAgICAgICAgICAgIGFkZFhwPXthZGRYcH0gXHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgIHtjdXJyZW50Tm9kZS50eXBlID09PSAnaGFuZGJvb2snICYmICgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5leHROb2RlID0gY2hhcHRlckZsb3dbY3VycmVudEZsb3dJbmRleCArIDFdO1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdyZWxhdGl2ZScsIGZsZXg6IDEsIGRpc3BsYXk6ICdmbGV4JyB9fT5cclxuICAgICAgICAgICAgICAgIHtuZXh0Tm9kZSAmJiBuZXh0Tm9kZS50eXBlID09PSAnYWN0aXZpdHknICYmIChcclxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiAwLCBsZWZ0OiAwLCByaWdodDogMCwgYm90dG9tOiAwLCBwb2ludGVyRXZlbnRzOiAnbm9uZScsIG92ZXJmbG93OiAnaGlkZGVuJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnLCBmaWx0ZXI6ICdibHVyKDEycHgpJywgdHJhbnNmb3JtOiAnc2NhbGUoMS4wNSknIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPG5leHROb2RlLmNvbXBvbmVudCB7Li4uKG5leHROb2RlLnByb3BzIHx8IHt9KX0gYWRkWHA9eygpPT57fX0gb25Db21wbGV0ZT17KCk9Pnt9fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAncmVsYXRpdmUnLCB6SW5kZXg6IDEwLCBmbGV4OiAxLCBkaXNwbGF5OiAnZmxleCcsIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC40KScgfX0+XHJcbiAgICAgICAgICAgICAgICAgIDxJbnZlc3RpZ2F0aW9uSGFuZGJvb2sgZGF0YT17Y3VycmVudE5vZGV9IG9uQ29tcGxldGU9e2hhbmRsZU5leHR9IC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pKCl9XHJcblxyXG4gICAgICAgICAge2N1cnJlbnROb2RlLnR5cGUgPT09ICdjaGVja3BvaW50JyAmJiAoXHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZmxleDogMSwgZGlzcGxheTogJ2ZsZXgnLCBiYWNrZ3JvdW5kOiAndmFyKC0tYmctY29sb3IpJywgb3ZlcmZsb3c6ICdoaWRkZW4nIH19PlxyXG4gICAgICAgICAgICAgIDxEZXRlY3RpdmVDaGVja3BvaW50IGtleT17YCR7Y3VycmVudE5vZGUuaWR9LSR7cmVzZXRLZXl9YH0gZGF0YT17Y3VycmVudE5vZGV9IG9uQ29tcGxldGU9e2hhbmRsZVN0YWdlQ29tcGxldGV9IGFkZFhwPXthZGRYcH0gLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgIHtjdXJyZW50Tm9kZS50eXBlID09PSAnc3VtbWFyeScgJiYgKCgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGxhc3RBY3Rpdml0eU5vZGUgPSBudWxsO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gY3VycmVudEZsb3dJbmRleCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGNoYXB0ZXJGbG93W2ldLnR5cGUgPT09ICdhY3Rpdml0eScpIHtcclxuICAgICAgICAgICAgICAgIGxhc3RBY3Rpdml0eU5vZGUgPSBjaGFwdGVyRmxvd1tpXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdyZWxhdGl2ZScsIGZsZXg6IDEsIGRpc3BsYXk6ICdmbGV4JyB9fT5cclxuICAgICAgICAgICAgICAgIHtsYXN0QWN0aXZpdHlOb2RlICYmIChcclxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiAwLCBsZWZ0OiAwLCByaWdodDogMCwgYm90dG9tOiAwLCBwb2ludGVyRXZlbnRzOiAnbm9uZScsIG92ZXJmbG93OiAnaGlkZGVuJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnLCBmaWx0ZXI6ICdibHVyKDEycHgpJywgdHJhbnNmb3JtOiAnc2NhbGUoMS4wNSknIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGxhc3RBY3Rpdml0eU5vZGUuY29tcG9uZW50IHsuLi4obGFzdEFjdGl2aXR5Tm9kZS5wcm9wcyB8fCB7fSl9IGFkZFhwPXsoKT0+e319IG9uQ29tcGxldGU9eygpPT57fX0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ3JlbGF0aXZlJywgekluZGV4OiAxMCwgZmxleDogMSwgZGlzcGxheTogJ2ZsZXgnLCBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsIDAsIDAsIDAuNCknIH19PlxyXG4gICAgICAgICAgICAgICAgICA8RXZpZGVuY2VTdW1tYXJ5IGRhdGE9e2N1cnJlbnROb2RlfSBvbkNvbXBsZXRlPXtoYW5kbGVEZWJyaWVmQ29udGludWV9IC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pKCl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgey8qIOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkFxyXG4gICAgICAgICAgR0xPQkFMIEJPVFRPTSBBQ1RJT04gQkFSXHJcbiAgICAgICAgICDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZAgKi99XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ2xvYmFsLWFjdGlvbi1iYXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdsb2JhbC1hY3Rpb24tYmFyLWxlZnRcIj5cclxuICAgICAgICAgIDxidXR0b24gXHJcbiAgICAgICAgICAgIG9uQ2xpY2s9e29uQmFja1RvRGFzaGJvYXJkfSBcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwib3V0bGluZVwiIFxyXG4gICAgICAgICAgICBzdHlsZT17eyBwYWRkaW5nOiAnMC44NXJlbSAxLjZyZW0nLCBmb250U2l6ZTogJzEuNDVyZW0nLCBmb250V2VpZ2h0OiAnYm9sZCcsIGdhcDogJzAuNzVyZW0nLCBib3JkZXJSYWRpdXM6ICcxMHB4JywgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8QXJyb3dMZWZ0IHNpemU9ezI0fSAvPiBEYXNoYm9hcmRcclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG5cclxuICAgICAgICAgIDxidXR0b24gXHJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICBpZiAoc3RhZ2VSZWYuY3VycmVudCAmJiBzdGFnZVJlZi5jdXJyZW50LmhhbmRsZUdsb2JhbEJhY2sgJiYgc3RhZ2VSZWYuY3VycmVudC5oYW5kbGVHbG9iYWxCYWNrKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgc2V0U2hvd0hhbmRib29rKGZhbHNlKTtcclxuICAgICAgICAgICAgICBpZiAoY3VycmVudEZsb3dJbmRleCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHNldEN1cnJlbnRGbG93SW5kZXgoY3VycmVudEZsb3dJbmRleCAtIDEpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZXRTaG93SW50cm9TcHJlYWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJvdXRsaW5lXCJcclxuICAgICAgICAgICAgc3R5bGU9e3sgcGFkZGluZzogJzAuODVyZW0gMS42cmVtJywgZm9udFNpemU6ICcxLjQ1cmVtJywgZm9udFdlaWdodDogJ2JvbGQnLCBnYXA6ICcwLjc1cmVtJywgYm9yZGVyUmFkaXVzOiAnMTBweCcsIGNvbG9yOiAndmFyKC0tdGV4dC1wcmltYXJ5KScsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPEFycm93TGVmdCBzaXplPXsyNH0gLz4gQmFja1xyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ2xvYmFsLWFjdGlvbi1iYXItY2VudGVyXCI+XHJcbiAgICAgICAgICB7LyogU2NpZW5jZSBEZXRlY3RpdmUgcmVtb3ZlZCBhcyByZXF1ZXN0ZWQgKi99XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJnbG9iYWwtYWN0aW9uLWJhci1yaWdodFwiPlxyXG4gICAgICAgICAgPGJ1dHRvbiBcclxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgIHNldFJlc2V0S2V5KHByZXYgPT4gcHJldiArIDEpO1xyXG4gICAgICAgICAgICAgIHNldFN0YWdlQ29tcGxldGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwib3V0bGluZVwiXHJcbiAgICAgICAgICAgIHN0eWxlPXt7IHBhZGRpbmc6ICcwLjg1cmVtIDEuNnJlbScsIGZvbnRTaXplOiAnMS40NXJlbScsIGZvbnRXZWlnaHQ6ICdib2xkJywgZ2FwOiAnMC43NXJlbScsIGJvcmRlclJhZGl1czogJzEwcHgnLCBjb2xvcjogJ3ZhcigtLWRhbmdlciknLCBib3JkZXJDb2xvcjogJ3ZhcigtLWRhbmdlci1ib3JkZXIpJywgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8UmVmcmVzaEN3IHNpemU9ezIyfSAvPiBSZXNldCBBY3Rpdml0eVxyXG4gICAgICAgICAgPC9idXR0b24+XHJcblxyXG4gICAgICAgICAgeyhjdXJyZW50Tm9kZS50eXBlID09PSAnYWN0aXZpdHknIHx8IGN1cnJlbnROb2RlLnR5cGUgPT09ICdjaGVja3BvaW50JykgJiYgKFxyXG4gICAgICAgICAgICA8YnV0dG9uIFxyXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChzdGFnZVJlZi5jdXJyZW50ICYmIHN0YWdlUmVmLmN1cnJlbnQuaGFuZGxlR2xvYmFsTmV4dCAmJiBzdGFnZVJlZi5jdXJyZW50LmhhbmRsZUdsb2JhbE5leHQoKSkge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVOZXh0KCk7XHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZmFsc2V9XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXsncHJpbWFyeSd9XHJcbiAgICAgICAgICAgICAgc3R5bGU9e3sgXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMC44NXJlbSAxLjhyZW0nLCBcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMS41cmVtJywgXHJcbiAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgICAgICBnYXA6ICcwLjc1cmVtJywgXHJcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxMHB4JyxcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDEsXHJcbiAgICAgICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcclxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb246ICdhbGwgMC4zcycsXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJ1xyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICBQcm9jZWVkIHRvIG5leHQgPEFycm93UmlnaHQgc2l6ZT17MjZ9IC8+XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgICl9XHJcbiAgPC8+XHJcbiAgKTtcclxufVxyXG4iXX0=