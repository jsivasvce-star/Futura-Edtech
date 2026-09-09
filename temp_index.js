import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/science/class6/chapter6/MaterialsAroundUs/index.jsx");const useState = __vite__cjsImport0_react["useState"]; const useRef = __vite__cjsImport0_react["useRef"];const PropTypes = __vite__cjsImport13_propTypes;const _jsxDEV = __vite__cjsImport14_react_jsxDevRuntime["jsxDEV"]; const _Fragment = __vite__cjsImport14_react_jsxDevRuntime["Fragment"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=9a59d6f6";
import { ArrowLeft, RefreshCw, ArrowRight } from "/node_modules/.vite/deps/lucide-react.js?v=9a59d6f6";
import "/src/science/class6/chapter6/MaterialsAroundUs/theme.css";
import useSound from "/node_modules/.vite/deps/use-sound.js?v=9a59d6f6";
import { chapterFlow } from "/src/science/class6/chapter6/MaterialsAroundUs/storyEngine.js";
import ChiefDetective from "/src/science/class6/chapter6/MaterialsAroundUs/components/ChiefDetective/ChiefDetective.jsx";
import InvestigationHandbook from "/src/science/class6/chapter6/MaterialsAroundUs/components/Educational/InvestigationHandbook.jsx?t=1788802312753";
import DetectiveCheckpoint from "/src/science/class6/chapter6/MaterialsAroundUs/components/Educational/DetectiveCheckpoint.jsx";
import EvidenceSummary from "/src/science/class6/chapter6/MaterialsAroundUs/components/Educational/EvidenceSummary.jsx";
import ChapterCover from "/src/science/class6/chapter6/MaterialsAroundUs/components/Educational/ChapterCover.jsx";
import ChapterIntroSpread from "/src/science/class6/chapter6/MaterialsAroundUs/components/Educational/ChapterIntroSpread.jsx";
import MissionBriefingSpread from "/src/science/class6/chapter6/MaterialsAroundUs/components/Educational/MissionBriefingSpread.jsx";
import FullscreenButton from "/src/science/class6/chapter6/MaterialsAroundUs/components/Common/FullscreenButton.jsx";
import __vite__cjsImport13_propTypes from "/node_modules/.vite/deps/prop-types.js?v=9a59d6f6";
var _jsxFileName = "C:/Users/GANES/Futura-Edtech/src/science/class6/chapter6/MaterialsAroundUs/index.jsx";
import __vite__cjsImport14_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=9a59d6f6";
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
	const [currentFlowIndex, setCurrentFlowIndex] = useState(0);
	const [highestUnlockedIndex, setHighestUnlockedIndex] = useState(0);
	const [isTimelineOpen, setIsTimelineOpen] = useState(false);
	const [stageCompleted, setStageCompleted] = useState(false);
	const [, setXp] = useState(0);
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
	const [playSuccess] = useSound("https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3", { volume: .5 });
	// Pour Water activity (stage8_b) must be completely silent — no audio of any kind.
	const isSilentStage = () => chapterFlow[currentFlowIndex]?.id === "stage8_b";
	const addXp = (amount) => {
		setXp((prev) => prev + amount);
		if (!isSilentStage()) {
			try {
				playSuccess();
			} catch (err) {
				console.warn("Audio playback failed", err);
			}
		}
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
			if (nextNode && (nextNode.id === "stage2" || nextNode.id === "stage3_use" || nextNode.id === "stage4_1" || nextNode.id === "stage4_2" || nextNode.id === "stage4_4" || nextNode.id === "stage4_5" || nextNode.id === "stage6_a" || nextNode.id === "stage7_a" || nextNode.id === "stage8_a" || nextNode.id === "stage8_b")) {
				setShowHandbook(false);
			} else {
				setShowHandbook(true);
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
		console.log("[Parent] Activity completion state updating to TRUE");
		setStageCompleted(true);
	};
	return /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(FullscreenButton, {}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 140,
		columnNumber: 7
	}, this), showCover ? /* @__PURE__ */ _jsxDEV(ChapterCover, {
		onOpenBook: () => {
			setShowCover(false);
			setShowIntroSpread(true);
		},
		onBack: onBackToDashboard
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 142,
		columnNumber: 9
	}, this) : showIntroSpread ? /* @__PURE__ */ _jsxDEV(ChapterIntroSpread, {
		onContinue: () => setShowIntroSpread(false),
		onBack: () => {
			setShowIntroSpread(false);
			setShowCover(true);
		}
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 144,
		columnNumber: 9
	}, this) : /* @__PURE__ */ _jsxDEV("div", {
		className: "activity-workspace materials-around-us-theme flex h-screen bg-[var(--lesson-surface)] overflow-hidden",
		style: {
			paddingTop: 0,
			paddingBottom: "72px"
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
						background: "var(--lesson-surface)",
						border: "1px solid var(--lesson-border)",
						borderLeft: "none",
						borderTopRightRadius: "8px",
						borderBottomRightRadius: "8px",
						padding: "16px 8px",
						cursor: "pointer",
						boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
						transition: "left 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
						color: "var(--lesson-text)",
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
						lineNumber: 173,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 149,
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
						background: "var(--lesson-surface)",
						borderRight: "1px solid var(--lesson-border)",
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
								color: "var(--lesson-muted)",
								textTransform: "uppercase",
								letterSpacing: "1px"
							},
							children: "Investigation Progress"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 192,
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
												if (!isSilentStage()) {
													try {
														playSuccess();
													} catch (err) {
														console.warn("Audio playback failed", err);
													}
												}
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
											background: isActive ? "var(--lesson-accent-bg)" : "transparent",
											border: `1px solid ${isActive ? "var(--lesson-accent-border)" : "transparent"}`,
											color: isPast ? "var(--lesson-muted)" : isActive ? "var(--lesson-accent)" : "var(--lesson-text)",
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
											lineNumber: 241,
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
												lineNumber: 243,
												columnNumber: 25
											}, this), /* @__PURE__ */ _jsxDEV("span", {
												style: {
													fontSize: "0.7rem",
													color: "var(--lesson-muted)"
												},
												children: item.type === "mission" ? "Mission Briefing" : item.type === "activity" ? item.subtitle : "Evidence Review"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 246,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 242,
											columnNumber: 23
										}, this)]
									}, `item-${idx}`, true, {
										fileName: _jsxFileName,
										lineNumber: 210,
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
												color: isLocked ? "var(--lesson-muted)" : "var(--lesson-text)",
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
												lineNumber: 287,
												columnNumber: 25
											}, this), /* @__PURE__ */ _jsxDEV("span", {
												style: {
													fontSize: "0.8rem",
													transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
													transition: "transform 0.2s",
													color: "var(--lesson-muted)"
												},
												children: "▶"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 288,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 267,
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
											lineNumber: 291,
											columnNumber: 25
										}, this)]
									}, group.id, true, {
										fileName: _jsxFileName,
										lineNumber: 266,
										columnNumber: 21
									}, this);
								};
								return timelineTree.map((group) => renderTimelineGroup(group, 0));
							})()
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 195,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 191,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 177,
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
						overflowY: currentNode.type === "activity" ? "hidden" : "auto",
						marginLeft: isTimelineOpen ? "320px" : "0px",
						transition: "margin-left 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
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
							lineNumber: 314,
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
							lineNumber: 328,
							columnNumber: 13
						}, this),
						currentNode.type === "activity" && (["quiz", "summary"].includes(currentNode.id) ? /* @__PURE__ */ _jsxDEV(currentNode.component, {
							...currentNode.props || {},
							onComplete: handleStageComplete,
							addXp
						}, `${currentNode.id}-${resetKey}`, false, {
							fileName: _jsxFileName,
							lineNumber: 344,
							columnNumber: 15
						}, this) : showHandbook ? /* @__PURE__ */ _jsxDEV("div", {
							style: {
								flex: 1,
								minHeight: 0,
								padding: "1.5rem",
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
								lineNumber: 352,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 351,
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
								...currentNode.props || {},
								onComplete: handleStageComplete,
								addXp
							}, `${currentNode.id}-${resetKey}`, false, {
								fileName: _jsxFileName,
								lineNumber: 362,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 361,
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
											lineNumber: 379,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 378,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 377,
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
										ref: handbookRef,
										data: currentNode,
										onComplete: handleNext
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 384,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 383,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 375,
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
								lineNumber: 392,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 391,
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
											lineNumber: 409,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 408,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 407,
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
										lineNumber: 414,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 413,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 405,
								columnNumber: 15
							}, this);
						})()
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 312,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 147,
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
							lineNumber: 432,
							columnNumber: 13
						}, this), " Dashboard"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 427,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("button", {
						onClick: () => {
							if (currentNode.id === "sportsball") {
								const prevIndex = chapterFlow.findIndex((node) => node.id === "stage5");
								if (prevIndex !== -1) {
									setShowHandbook(false);
									setCurrentFlowIndex(prevIndex);
									return;
								}
							}
							if (currentNode.id === "stage5") {
								const prevIndex = chapterFlow.findIndex((node) => node.id === "stage3_material");
								if (prevIndex !== -1) {
									setShowHandbook(false);
									setCurrentFlowIndex(prevIndex);
									return;
								}
							}
							if (currentNode.id === "stage3_material") {
								const prevIndex = chapterFlow.findIndex((node) => node.id === "stage3_use");
								if (prevIndex !== -1) {
									setShowHandbook(false);
									setCurrentFlowIndex(prevIndex);
									return;
								}
							}
							if (currentNode.id === "stage2") {
								const prevIndex = chapterFlow.findIndex((node) => node.title === "Phase 2: Identification");
								if (prevIndex !== -1) {
									setShowHandbook(false);
									setCurrentFlowIndex(prevIndex);
									return;
								}
							}
							if (currentNode.id === "stage7_a") {
								const prevIndex = currentFlowIndex - 1;
								if (prevIndex >= 0) {
									setShowHandbook(true);
									setCurrentFlowIndex(prevIndex);
									return;
								}
							}
							if (currentNode.id === "stage7_b") {
								const prevIndex = chapterFlow.findIndex((node) => node.id === "stage7_a");
								if (prevIndex !== -1) {
									setShowHandbook(false);
									setCurrentFlowIndex(prevIndex);
									return;
								}
							}
							if (currentNode.id === "stage8_a") {
								const prevIndex = currentFlowIndex - 1;
								if (prevIndex >= 0) {
									setShowHandbook(false);
									setCurrentFlowIndex(prevIndex);
									return;
								}
							}
							if (currentNode.id === "stage8_b" || currentNode.id === "stage8_c") {
								const prevIndex = currentFlowIndex - 1;
								if (prevIndex >= 0) {
									setShowHandbook(false);
									setCurrentFlowIndex(prevIndex);
									return;
								}
							}
							if (!showHandbook && currentNode.type === "activity" && ![
								"stage8_b",
								"stage8_c",
								"stage3_use",
								"stage4_1",
								"stage4_2",
								"stage4_4",
								"stage4_5",
								"stage6_a"
							].includes(currentNode.id)) {
								setShowHandbook(true);
							} else if (currentFlowIndex > 0) {
								const prevIndex = currentFlowIndex - 1;
								const prevNode = chapterFlow[prevIndex];
								if (prevNode && prevNode.type === "mission") {
									setShowHandbook(true);
								} else {
									setShowHandbook(false);
								}
								setCurrentFlowIndex(prevIndex);
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
							lineNumber: 527,
							columnNumber: 13
						}, this), " Back"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 435,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 426,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", { className: "global-action-bar-center" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 531,
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
							lineNumber: 544,
							columnNumber: 13
						}, this), " Reset Activity"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 536,
						columnNumber: 11
					}, this), (currentNode.type === "activity" || currentNode.type === "checkpoint") && /* @__PURE__ */ _jsxDEV("button", {
						onClick: () => {
							const isHandbookActive = showHandbook && ![
								"stage8_b",
								"stage8_c",
								"stage3_use",
								"stage4_1",
								"stage4_2",
								"stage4_4",
								"stage4_5",
								"stage6_a"
							].includes(currentNode.id);
							if ((isHandbookActive || currentNode.type === "handbook") && handbookRef.current && handbookRef.current.handleGlobalNext) {
								const hasMore = handbookRef.current.handleGlobalNext();
								if (hasMore) return;
							}
							if (isHandbookActive) {
								setShowHandbook(false);
							} else {
								handleNext();
							}
						},
						disabled: showHandbook && ![
							"stage8_b",
							"stage8_c",
							"stage3_use",
							"stage4_1",
							"stage4_2",
							"stage4_4",
							"stage4_5",
							"stage6_a"
						].includes(currentNode.id) ? false : !(stageCompleted || currentNode.id === "stage2"),
						className: showHandbook && ![
							"stage8_b",
							"stage8_c",
							"stage3_use",
							"stage4_1",
							"stage4_2",
							"stage4_4",
							"stage4_5",
							"stage6_a"
						].includes(currentNode.id) || stageCompleted || currentNode.id === "stage2" ? "primary" : "outline",
						style: {
							padding: "0.85rem 1.8rem",
							fontSize: "1.5rem",
							fontWeight: "bold",
							gap: "0.75rem",
							borderRadius: "10px",
							opacity: showHandbook && ![
								"stage8_b",
								"stage8_c",
								"stage3_use",
								"stage4_1",
								"stage4_2",
								"stage4_4",
								"stage4_5",
								"stage6_a"
							].includes(currentNode.id) || stageCompleted || currentNode.id === "stage2" ? 1 : .5,
							cursor: showHandbook && ![
								"stage8_b",
								"stage8_c",
								"stage3_use",
								"stage4_1",
								"stage4_2",
								"stage4_4",
								"stage4_5",
								"stage6_a"
							].includes(currentNode.id) || stageCompleted || currentNode.id === "stage2" ? "pointer" : "not-allowed",
							transition: "all 0.3s",
							display: "flex",
							alignItems: "center"
						},
						children: ["Proceed to next ", /* @__PURE__ */ _jsxDEV(ArrowRight, { size: 26 }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 576,
							columnNumber: 31
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 548,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 535,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 425,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 146,
		columnNumber: 9
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 139,
		columnNumber: 5
	}, this);
}
_s(MaterialsAroundUsActivity, "yQX84hQ6AOrtQpUKZj0vMflxvks=", false, function() {
	return [useSound];
});
_c = MaterialsAroundUsActivity;
MaterialsAroundUsActivity.propTypes = { onBackToDashboard: PropTypes.func.isRequired };
var _c;
$RefreshReg$(_c, "MaterialsAroundUsActivity");
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
import * as __vite_react_currentExports from "/src/science/class6/chapter6/MaterialsAroundUs/index.jsx?t=1788802312753";
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

//# sourceMappingURL=data:application/json;base64,eyJtYXBwaW5ncyI6IkFBQUEsU0FBUyxVQUFVLGNBQWM7QUFDakMsU0FBUyxXQUFXLFdBQVcsa0JBQWtCO0FBQ2pELE9BQU87QUFDUCxPQUFPLGNBQWM7QUFDckIsU0FBUyxtQkFBbUI7QUFDNUIsT0FBTyxvQkFBb0I7QUFDM0IsT0FBTywyQkFBMkI7QUFDbEMsT0FBTyx5QkFBeUI7QUFDaEMsT0FBTyxxQkFBcUI7QUFDNUIsT0FBTyxrQkFBa0I7QUFDekIsT0FBTyx3QkFBd0I7QUFDL0IsT0FBTywyQkFBMkI7QUFDbEMsT0FBTyxzQkFBc0I7QUFDN0IsT0FBTyxlQUFlOzs7O0FBRXRCLE1BQU0sc0JBQXNCO0NBQzFCLE1BQU0sT0FBTyxDQUFDO0NBQ2QsSUFBSSxpQkFBaUI7Q0FDckIsSUFBSSxlQUFlO0NBRW5CLFlBQVksU0FBUyxNQUFNLFVBQVU7RUFDbkMsTUFBTSxPQUFPO0dBQUUsR0FBRztHQUFNLGVBQWU7RUFBTTtFQUM3QyxJQUFJLFlBQVk7RUFFaEIsSUFBSSxLQUFLLE1BQU0sU0FBUyxXQUFXLEtBQUssS0FBSyxNQUFNLFNBQVMsV0FBVyxHQUFHLFlBQVk7T0FDakYsSUFBSSxLQUFLLE1BQU0sU0FBUyxXQUFXLEtBQUssS0FBSyxNQUFNLFNBQVMsV0FBVyxHQUFHLFlBQVk7T0FDdEYsSUFBSSxLQUFLLE1BQU0sU0FBUyxXQUFXLEtBQUssS0FBSyxNQUFNLFNBQVMsV0FBVyxHQUFHLFlBQVk7T0FDdEYsSUFBSSxLQUFLLE1BQU0sU0FBUyxXQUFXLEtBQUssS0FBSyxNQUFNLFNBQVMsY0FBYyxLQUFLLEtBQUssTUFBTSxTQUFTLGFBQWEsR0FBRyxZQUFZO09BQy9ILFlBQVk7RUFFakIsSUFBSSxDQUFDLGtCQUFrQixlQUFlLE9BQU8sV0FBVztHQUN0RCxpQkFBaUI7SUFBRSxJQUFJO0lBQVcsT0FBTztJQUFXLE1BQU07SUFBVyxVQUFVLENBQUM7R0FBRTtHQUNsRixLQUFLLEtBQUssY0FBYztHQUN4QixlQUFlO0VBQ2pCO0VBRUEsSUFBSSxjQUFjLGVBQWU7R0FDL0IsTUFBTSxhQUFhLEtBQUssTUFBTSxNQUFNLG1CQUFtQjtHQUN2RCxJQUFJLFlBQVk7SUFDZCxNQUFNLFlBQVksV0FBVztJQUM3QixJQUFJLENBQUMsZ0JBQWdCLGFBQWEsT0FBTyxXQUFXO0tBQ2xELGVBQWU7TUFBRSxJQUFJO01BQVcsT0FBTztNQUFXLE1BQU07TUFBUyxVQUFVLENBQUM7S0FBRTtLQUM5RSxlQUFlLFNBQVMsS0FBSyxZQUFZO0lBQzNDO0lBQ0EsYUFBYSxTQUFTLEtBQUssSUFBSTtHQUNqQyxPQUFPO0lBQ0wsZUFBZSxTQUFTLEtBQUssSUFBSTtHQUNuQztFQUNGLE9BQU87R0FDTCxlQUFlLFNBQVMsS0FBSyxJQUFJO0VBQ25DO0NBQ0YsQ0FBQztDQUNELE9BQU87QUFDVCxFQUFDLENBQUU7QUFFSCxlQUFlLFNBQVMsMEJBQTBCLEVBQUUscUJBQXFCOztDQUN2RSxNQUFNLGNBQWMsT0FBTyxJQUFJO0NBQy9CLE1BQU0sQ0FBQyxrQkFBa0IsdUJBQXVCLFNBQVMsQ0FBQztDQUMxRCxNQUFNLENBQUMsc0JBQXNCLDJCQUEyQixTQUFTLENBQUM7Q0FDbEUsTUFBTSxDQUFDLGdCQUFnQixxQkFBcUIsU0FBUyxLQUFLO0NBQzFELE1BQU0sQ0FBQyxnQkFBZ0IscUJBQXFCLFNBQVMsS0FBSztDQUMxRCxNQUFNLEdBQUcsU0FBUyxTQUFTLENBQUM7Q0FDNUIsTUFBTSxDQUFDLFVBQVUsZUFBZSxTQUFTLENBQUM7Q0FDMUMsTUFBTSxDQUFDLFdBQVcsZ0JBQWdCLFNBQVMsSUFBSTtDQUMvQyxNQUFNLENBQUMsaUJBQWlCLHNCQUFzQixTQUFTLEtBQUs7Q0FDNUQsTUFBTSxDQUFDLGNBQWMsbUJBQW1CLFNBQVMsSUFBSTtDQUNyRCxNQUFNLENBQUMsZUFBZSxvQkFBb0IsU0FBUztFQUNqRCxlQUFlO0VBQU0sZUFBZTtFQUFNLGVBQWU7RUFBTSxlQUFlO0VBQU0saUJBQWlCO0VBQ3JHLGVBQWU7RUFBTSxlQUFlO0VBQU0sZUFBZTtFQUFNLGVBQWU7RUFBTSxlQUFlO0VBQU0sZUFBZTtDQUMxSCxDQUFDO0NBRUQsTUFBTSxjQUFjLE9BQU8sa0JBQWlCLFVBQVM7RUFBRSxHQUFHO0dBQU8sS0FBSyxDQUFDLEtBQUs7Q0FBSSxFQUFFO0NBRWxGLE1BQU0sQ0FBQyxlQUFlLFNBQVMscUVBQXFFLEVBQUUsUUFBUSxHQUFJLENBQUM7O0NBR25ILE1BQU0sc0JBQXNCLFlBQVksaUJBQWlCLEVBQUUsT0FBTztDQUVsRSxNQUFNLFNBQVMsV0FBVztFQUN4QixPQUFNLFNBQVEsT0FBTyxNQUFNO0VBQzNCLElBQUksQ0FBQyxjQUFjLEdBQUc7R0FDcEIsSUFBSTtJQUFFLFlBQVk7R0FBRyxTQUFTLEtBQUs7SUFBRSxRQUFRLEtBQUsseUJBQXlCLEdBQUc7R0FBRztFQUNuRjtDQUNGO0NBRUEsTUFBTSxtQkFBbUI7RUFDdkIsa0JBQWtCLEtBQUs7RUFDdkIsZ0JBQWdCLEtBQUs7RUFDckIsSUFBSSxtQkFBbUIsWUFBWSxTQUFTLEdBQUc7R0FDN0MsTUFBTSxZQUFZLG1CQUFtQjtHQUNyQyxvQkFBb0IsU0FBUztHQUM3QixJQUFJLFlBQVksc0JBQXNCO0lBQ3BDLHdCQUF3QixTQUFTO0dBQ25DO0VBQ0Y7Q0FDRjtDQUVBLE1BQU0sY0FBYyxZQUFZO0NBRWhDLE1BQU0sNEJBQTRCO0VBQ2hDLElBQUksWUFBWSxZQUFZLFlBQVksU0FBUyxXQUFXO0dBQzFELE1BQU0sWUFBWSxRQUFRO0VBQzVCO0VBQ0Esa0JBQWtCLEtBQUs7RUFDdkIsSUFBSSxtQkFBbUIsWUFBWSxTQUFTLEdBQUc7R0FDN0MsTUFBTSxZQUFZLG1CQUFtQjtHQUNyQyxNQUFNLFdBQVcsWUFBWTtHQUU3QixJQUFJLGFBQWEsU0FBUyxPQUFPLFlBQVksU0FBUyxPQUFPLGdCQUFnQixTQUFTLE9BQU8sY0FBYyxTQUFTLE9BQU8sY0FBYyxTQUFTLE9BQU8sY0FBYyxTQUFTLE9BQU8sY0FBYyxTQUFTLE9BQU8sY0FBYyxTQUFTLE9BQU8sY0FBYyxTQUFTLE9BQU8sY0FBYyxTQUFTLE9BQU8sYUFBYTtJQUMxVCxnQkFBZ0IsS0FBSztHQUN2QixPQUFPO0lBQ0wsZ0JBQWdCLElBQUk7R0FDdEI7R0FFQSxvQkFBb0IsU0FBUztHQUM3QixJQUFJLFlBQVksc0JBQXNCO0lBQ3BDLHdCQUF3QixTQUFTO0dBQ25DO0VBQ0Y7Q0FDRjtDQUVBLE1BQU0sOEJBQThCO0VBQ2xDLElBQUksWUFBWSxhQUFhLFlBQVksU0FBUyxhQUFhLFlBQVksU0FBUyxZQUFZO0dBQzlGLE1BQU0sWUFBWSxRQUFRO0VBQzVCO0VBQ0EsSUFBSSxZQUFZLFNBQVM7R0FDdkIsa0JBQWtCO0VBQ3BCLE9BQU87R0FDTCxXQUFXO0VBQ2I7Q0FDRjtDQUVBLE1BQU0sNEJBQTRCO0VBQ2hDLFFBQVEsSUFBSSxxREFBcUQ7RUFDakUsa0JBQWtCLElBQUk7Q0FDeEI7Q0FFQSxPQUNFLGdEQUNFLHdCQUFDLGtCQUFELENBQW1COzs7O1dBQ2xCLFlBQ0Msd0JBQUMsY0FBRDtFQUFjLGtCQUFrQjtHQUFFLGFBQWEsS0FBSztHQUFHLG1CQUFtQixJQUFJO0VBQUc7RUFBRyxRQUFRO0NBQW9COzs7O1lBQzlHLGtCQUNGLHdCQUFDLG9CQUFEO0VBQW9CLGtCQUFrQixtQkFBbUIsS0FBSztFQUFHLGNBQWM7R0FBRSxtQkFBbUIsS0FBSztHQUFHLGFBQWEsSUFBSTtFQUFHO0NBQUk7Ozs7WUFFcEksd0JBQUMsT0FBRDtFQUFLLFdBQVU7RUFBd0csT0FBTztHQUFFLFlBQVk7R0FBRyxlQUFlO0VBQU87WUFBckssQ0FDRix3QkFBQyxPQUFEO0dBQUssT0FBTztJQUFFLFNBQVM7SUFBUSxNQUFNO0lBQUcsVUFBVTtJQUFVLFVBQVU7R0FBVzthQUFqRjtJQUVFLHdCQUFDLFVBQUQ7S0FDRSxlQUFlLGtCQUFrQixDQUFDLGNBQWM7S0FDaEQsT0FBTztNQUNMLFVBQVU7TUFDVixNQUFNLGlCQUFpQixVQUFVO01BQ2pDLEtBQUs7TUFDTCxXQUFXO01BQ1gsUUFBUTtNQUNSLFlBQVk7TUFDWixRQUFRO01BQ1IsWUFBWTtNQUNaLHNCQUFzQjtNQUN0Qix5QkFBeUI7TUFDekIsU0FBUztNQUNULFFBQVE7TUFDUixXQUFXO01BQ1gsWUFBWTtNQUNaLE9BQU87TUFDUCxTQUFTO01BQ1QsWUFBWTtNQUNaLGdCQUFnQjtLQUNsQjtLQUNBLE9BQU07ZUFFTix3QkFBQyxZQUFEO01BQVksTUFBTTtNQUFJLE9BQU87T0FBRSxXQUFXLGlCQUFpQixtQkFBbUI7T0FBZ0IsWUFBWTtNQUFpQjtLQUFJOzs7OztJQUN6SDs7Ozs7SUFHUix3QkFBQyxPQUFEO0tBQ0UsV0FBVTtLQUNWLE9BQU87TUFDTCxVQUFVO01BQ1YsTUFBTTtNQUNOLEtBQUs7TUFBRyxRQUFRO01BQUcsUUFBUTtNQUMzQixZQUFZO01BQXlCLGFBQWE7TUFDbEQsU0FBUztNQUFRLGVBQWU7TUFDaEMsVUFBVTtNQUFVLFdBQVcsaUJBQWlCLCtCQUErQjtNQUMvRSxPQUFPO01BQ1AsV0FBVyxpQkFBaUIsa0JBQWtCO01BQzlDLFlBQVk7S0FDZDtlQUVBLHdCQUFDLE9BQUQ7TUFBSyxPQUFPO09BQUUsT0FBTztPQUFTLFNBQVM7T0FBVSxTQUFTO09BQVEsZUFBZTtPQUFVLFFBQVE7TUFBTztnQkFBMUcsQ0FDRSx3QkFBQyxNQUFEO09BQUksT0FBTztRQUFFLFFBQVE7UUFBZ0IsVUFBVTtRQUFVLE9BQU87UUFBdUIsZUFBZTtRQUFhLGVBQWU7T0FBTTtpQkFBRztNQUV2STs7OztnQkFDSix3QkFBQyxPQUFEO09BQUssT0FBTztRQUFFLFNBQVM7UUFBUSxlQUFlO1FBQVUsS0FBSztRQUFVLFdBQVc7UUFBUSxjQUFjO09BQVM7d0JBQ3ZHO1FBQ04sTUFBTSxzQkFBc0IsTUFBTSxjQUFjLE1BQU07U0FDcEQsTUFBTSxNQUFNLEtBQUs7U0FDakIsTUFBTSxXQUFXLHFCQUFxQixPQUFRLEtBQUssU0FBUyxhQUFhLG1CQUFtQixPQUFPLFlBQVksaUJBQWlCLENBQUMsU0FBUyxjQUFjLFlBQVksV0FBVyxHQUFHLE1BQU0sSUFBSSxPQUFPLEVBQUUsU0FBUyxVQUFVLElBQUk7U0FDNU4sTUFBTSxXQUFXLE1BQU07U0FDdkIsTUFBTSxTQUFTLE9BQU8sd0JBQXdCLENBQUM7U0FFL0MsSUFBSSxPQUFPO1NBQ1gsSUFBSSxLQUFLLFNBQVMsWUFBWSxPQUFPO1NBQ3JDLElBQUksS0FBSyxTQUFTLGFBQWEsS0FBSyxTQUFTLFdBQVcsT0FBTztTQUMvRCxJQUFJLEtBQUssU0FBUyxZQUFZLE9BQU87U0FDckMsSUFBSSxLQUFLLFNBQVMsY0FBYyxPQUFPO1NBRXZDLE9BQ0Usd0JBQUMsVUFBRDtVQUVFLFVBQVU7VUFDVixlQUFlO1dBQ2IsSUFBSSxDQUFDLFVBQVU7WUFDYixJQUFJLENBQUMsY0FBYyxHQUFHO2FBQUUsSUFBSTtjQUFFLFlBQVk7YUFBRyxTQUFTLEtBQUs7Y0FBRSxRQUFRLEtBQUsseUJBQXlCLEdBQUc7YUFBRztZQUFFO1lBQzNHLElBQUksS0FBSyxTQUFTLFdBQVc7YUFDM0IsZ0JBQWdCLElBQUk7WUFDdEIsT0FBTzthQUNMLGdCQUFnQixLQUFLO1lBQ3ZCO1lBQ0Esb0JBQW9CLEdBQUc7WUFDdkIsa0JBQWtCLEtBQUs7V0FDekI7VUFDRjtVQUNBLE9BQU87V0FDTCxTQUFTO1dBQ1QsWUFBWTtXQUNaLEtBQUs7V0FDTCxTQUFTO1dBQ1QsWUFBWSxHQUFHLGNBQWMsRUFBRTtXQUMvQixjQUFjO1dBQ2QsWUFBWSxXQUFXLDRCQUE0QjtXQUNuRCxRQUFRLGFBQWEsV0FBVyxnQ0FBZ0M7V0FDaEUsT0FBTyxTQUFTLHdCQUF3QixXQUFXLHlCQUF5QjtXQUM1RSxZQUFZO1dBQ1osU0FBUyxXQUFXLEtBQU07V0FDMUIsUUFBUSxXQUFXLGdCQUFnQjtXQUNuQyxXQUFXO1VBQ2I7b0JBN0JGLENBK0JFLHdCQUFDLFFBQUQ7V0FBTSxPQUFPO1lBQUUsVUFBVTtZQUFVLFlBQVk7V0FBRTtxQkFBSTtVQUFXOzs7O29CQUNoRSx3QkFBQyxPQUFEO1dBQUssT0FBTztZQUFFLFNBQVM7WUFBUSxlQUFlO1lBQVUsS0FBSztZQUFVLFVBQVU7V0FBRTtxQkFBbkYsQ0FDRSx3QkFBQyxRQUFEO1lBQU0sT0FBTzthQUFFLFVBQVU7YUFBVyxZQUFZLFdBQVcsU0FBUzthQUFLLFlBQVk7YUFBVSxVQUFVO2FBQVUsY0FBYztZQUFXO3NCQUN6SSxLQUFLO1dBQ0Y7Ozs7cUJBQ04sd0JBQUMsUUFBRDtZQUFNLE9BQU87YUFBRSxVQUFVO2FBQVUsT0FBTztZQUFzQjtzQkFDN0QsS0FBSyxTQUFTLFlBQVkscUJBQXFCLEtBQUssU0FBUyxhQUFhLEtBQUssV0FBVztXQUN2Rjs7OzttQkFDSDs7Ozs7a0JBQ0M7WUF2Q0QsUUFBUTs7OztnQkF1Q1A7UUFFWjtRQUVBLE1BQU0sdUJBQXVCLE9BQU8sY0FBYyxNQUFNO1NBQ3RELE1BQU0sYUFBYSxjQUFjLE1BQU07U0FFdkMsTUFBTSxpQkFBaUIsU0FBUztVQUM5QixJQUFJLEtBQUssa0JBQWtCLFdBQVcsT0FBTyxLQUFLO1VBQ2xELElBQUksS0FBSyxZQUFZLEtBQUssU0FBUyxTQUFTLEdBQUcsT0FBTyxjQUFjLEtBQUssU0FBUyxFQUFFO1VBQ3BGLE9BQU87U0FDVDtTQUNBLE1BQU0sYUFBYSxjQUFjLEtBQUs7U0FDdEMsTUFBTSxXQUFXLGFBQWE7U0FFOUIsT0FDRSx3QkFBQyxPQUFEO1VBQW9CLE9BQU87V0FBRSxTQUFTO1dBQVEsZUFBZTtXQUFVLEtBQUs7VUFBVTtvQkFBdEYsQ0FDRSx3QkFBQyxVQUFEO1dBQ0UsVUFBVTtXQUNWLGVBQWUsV0FBVyxNQUFNLEVBQUU7V0FDbEMsT0FBTztZQUNMLFNBQVM7WUFDVCxZQUFZO1lBQ1osZ0JBQWdCO1lBQ2hCLEtBQUs7WUFDTCxTQUFTO1lBQ1QsWUFBWSxHQUFHLGNBQWMsRUFBRTtZQUMvQixjQUFjO1lBQ2QsWUFBWTtZQUNaLFFBQVE7WUFDUixPQUFPLFdBQVcsd0JBQXdCO1lBQzFDLFlBQVk7WUFDWixRQUFRLFdBQVcsZ0JBQWdCO1lBQ25DLFdBQVc7WUFDWCxTQUFTLFdBQVcsS0FBTTtXQUM1QjtxQkFsQkYsQ0FvQkUsd0JBQUMsUUFBRDtZQUFNLE9BQU87YUFBRSxVQUFVO2FBQVUsTUFBTTthQUFHLFlBQVk7YUFBVSxVQUFVO2FBQVUsY0FBYztZQUFXO3NCQUFJLE1BQU07V0FBWTs7OztxQkFDckksd0JBQUMsUUFBRDtZQUFNLE9BQU87YUFBRSxVQUFVO2FBQVUsV0FBVyxhQUFhLGtCQUFrQjthQUFnQixZQUFZO2FBQWtCLE9BQU87WUFBc0I7c0JBQUc7V0FBTzs7OzttQkFDNUo7Ozs7O29CQUNQLGNBQWMsQ0FBQyxZQUNkLHdCQUFDLE9BQUQ7V0FBSyxPQUFPO1lBQUUsU0FBUztZQUFRLGVBQWU7WUFBVSxLQUFLO1lBQVcsV0FBVztXQUFVO3FCQUMxRixNQUFNLFNBQVMsS0FBSSxVQUFTO1lBQzNCLElBQUksTUFBTSxTQUFTLFdBQVcsTUFBTSxTQUFTLFdBQVc7YUFDdEQsT0FBTyxvQkFBb0IsT0FBTyxjQUFjLEVBQUc7WUFDckQsT0FBTzthQUNMLE9BQU8sbUJBQW1CLE9BQU8sY0FBYyxFQUFHO1lBQ3BEO1dBQ0YsQ0FBQztVQUNFOzs7O2tCQUVKO1lBbkNLLE1BQU07Ozs7Z0JBbUNYO1FBRVQ7UUFFQSxPQUFPLGFBQWEsS0FBSSxVQUFTLG9CQUFvQixPQUFPLENBQUMsQ0FBQztPQUNoRSxFQUFDLENBQUU7TUFDQTs7OztjQUNGOzs7Ozs7SUFDRjs7Ozs7SUFHTCx3QkFBQyxPQUFEO0tBQUssV0FBVTtLQUFtQixPQUFPO01BQUUsTUFBTTtNQUFHLFdBQVc7TUFBRyxTQUFTO01BQVEsZUFBZTtNQUFVLFVBQVU7TUFBWSxXQUFXLFlBQVksU0FBUyxhQUFhLFdBQVc7TUFBUSxZQUFZLGlCQUFpQixVQUFVO01BQU8sWUFBWTtLQUFpRDtlQUE3UztNQUNHLFlBQVksU0FBUyxhQUNwQix3QkFBQyx1QkFBRDtPQUNFLE1BQU07T0FDTixZQUFZO09BQ1osY0FBYztRQUNaLElBQUksbUJBQW1CLEdBQUc7U0FDeEIscUJBQW9CLFNBQVEsT0FBTyxDQUFDO1FBQ3RDLE9BQU87U0FDTCxtQkFBbUIsSUFBSTtRQUN6QjtPQUNGO01BQ0Q7Ozs7O01BR0YsWUFBWSxTQUFTLGFBQ3BCLHdCQUFDLGdCQUFEO09BQ0UsTUFBSztPQUNMLE1BQU07T0FDTixZQUFZO09BQ1osY0FBYztRQUNaLElBQUksbUJBQW1CLEdBQUc7U0FDeEIscUJBQW9CLFNBQVEsT0FBTyxDQUFDO1FBQ3RDLE9BQU87U0FDTCxtQkFBbUIsSUFBSTtRQUN6QjtPQUNGO01BQ0Q7Ozs7O01BR0YsWUFBWSxTQUFTLGVBQ3BCLENBQUMsUUFBUSxTQUFTLENBQUMsQ0FBQyxTQUFTLFlBQVksRUFBRSxJQUN6Qyx3QkFBQyxZQUFZLFdBQWI7T0FFRSxHQUFLLFlBQVksU0FBUyxDQUFDO09BQzNCLFlBQVk7T0FDTDtNQUNSLEdBSk0sR0FBRyxZQUFZLEdBQUcsR0FBRzs7OzthQUkzQixJQUNDLGVBQ0Ysd0JBQUMsT0FBRDtPQUFLLE9BQU87UUFBRSxNQUFNO1FBQUcsV0FBVztRQUFHLFNBQVM7UUFBVSxTQUFTO1FBQVEsZUFBZTtRQUFVLE9BQU87UUFBUSxRQUFRO1FBQVEsV0FBVztPQUFhO2lCQUN2Six3QkFBQyx1QkFBRDtRQUNFLEtBQUs7UUFDaUI7UUFDSjtRQUNGO1FBQ2hCLGNBQWMsZ0JBQWdCLEtBQUs7T0FDcEM7Ozs7O01BQ0U7Ozs7aUJBRUwsd0JBQUMsT0FBRDtPQUFLLE9BQU87UUFBRSxNQUFNO1FBQUcsV0FBVztRQUFHLFVBQVU7UUFBWSxTQUFTO1FBQVEsZUFBZTtRQUFVLFdBQVc7UUFBUSxTQUFTO1FBQVUsT0FBTztRQUFRLFFBQVE7UUFBUSxXQUFXO09BQWE7aUJBQ2hNLHdCQUFDLFlBQVksV0FBYjtRQUVFLEdBQUssWUFBWSxTQUFTLENBQUM7UUFDM0IsWUFBWTtRQUNMO09BQ1IsR0FKTSxHQUFHLFlBQVksR0FBRyxHQUFHOzs7O2NBSTNCO01BQ0U7Ozs7O01BSVIsWUFBWSxTQUFTLHFCQUFxQjtPQUN6QyxNQUFNLFdBQVcsWUFBWSxtQkFBbUI7T0FDaEQsT0FDRSx3QkFBQyxPQUFEO1FBQUssT0FBTztTQUFFLFVBQVU7U0FBWSxNQUFNO1NBQUcsU0FBUztRQUFPO2tCQUE3RCxDQUNHLFlBQVksU0FBUyxTQUFTLGNBQzdCLHdCQUFDLE9BQUQ7U0FBSyxPQUFPO1VBQUUsVUFBVTtVQUFZLEtBQUs7VUFBRyxNQUFNO1VBQUcsT0FBTztVQUFHLFFBQVE7VUFBRyxlQUFlO1VBQVEsVUFBVTtTQUFTO21CQUNsSCx3QkFBQyxPQUFEO1VBQUssT0FBTztXQUFFLE9BQU87V0FBUSxRQUFRO1dBQVEsUUFBUTtXQUFjLFdBQVc7VUFBYztvQkFDMUYsd0JBQUMsU0FBUyxXQUFWO1dBQW9CLEdBQUssU0FBUyxTQUFTLENBQUM7V0FBSSxhQUFXLENBQUM7V0FBRyxrQkFBZ0IsQ0FBQztVQUFJOzs7OztTQUNqRjs7Ozs7UUFDRjs7OztrQkFFUCx3QkFBQyxPQUFEO1NBQUssT0FBTztVQUFFLFVBQVU7VUFBWSxRQUFRO1VBQUksTUFBTTtVQUFHLFNBQVM7VUFBUSxpQkFBaUI7U0FBcUI7bUJBQzlHLHdCQUFDLHVCQUFEO1VBQXVCLEtBQUs7VUFBYSxNQUFNO1VBQWEsWUFBWTtTQUFhOzs7OztRQUNsRjs7OztnQkFDRjs7Ozs7O01BRVQsRUFBQyxDQUFFO01BRUYsWUFBWSxTQUFTLGdCQUNwQix3QkFBQyxPQUFEO09BQUssT0FBTztRQUFFLE1BQU07UUFBRyxTQUFTO1FBQVEsWUFBWTtRQUFtQixVQUFVO09BQVM7aUJBQ3hGLHdCQUFDLHFCQUFEO1FBQTJELE1BQU07UUFBYSxZQUFZO1FBQTRCO09BQVEsR0FBcEcsR0FBRyxZQUFZLEdBQUcsR0FBRzs7OztjQUErRTtNQUMzSDs7Ozs7TUFHTixZQUFZLFNBQVMsb0JBQW9CO09BQ3hDLElBQUksbUJBQW1CO09BQ3ZCLEtBQUssSUFBSSxJQUFJLG1CQUFtQixHQUFHLEtBQUssR0FBRyxLQUFLO1FBQzlDLElBQUksWUFBWSxFQUFFLENBQUMsU0FBUyxZQUFZO1NBQ3RDLG1CQUFtQixZQUFZO1NBQy9CO1FBQ0Y7T0FDRjtPQUNBLE9BQ0Usd0JBQUMsT0FBRDtRQUFLLE9BQU87U0FBRSxVQUFVO1NBQVksTUFBTTtTQUFHLFNBQVM7UUFBTztrQkFBN0QsQ0FDRyxvQkFDQyx3QkFBQyxPQUFEO1NBQUssT0FBTztVQUFFLFVBQVU7VUFBWSxLQUFLO1VBQUcsTUFBTTtVQUFHLE9BQU87VUFBRyxRQUFRO1VBQUcsZUFBZTtVQUFRLFVBQVU7U0FBUzttQkFDbEgsd0JBQUMsT0FBRDtVQUFLLE9BQU87V0FBRSxPQUFPO1dBQVEsUUFBUTtXQUFRLFFBQVE7V0FBYyxXQUFXO1VBQWM7b0JBQzFGLHdCQUFDLGlCQUFpQixXQUFsQjtXQUE0QixHQUFLLGlCQUFpQixTQUFTLENBQUM7V0FBSSxhQUFXLENBQUM7V0FBRyxrQkFBZ0IsQ0FBQztVQUFJOzs7OztTQUNqRzs7Ozs7UUFDRjs7OztrQkFFUCx3QkFBQyxPQUFEO1NBQUssT0FBTztVQUFFLFVBQVU7VUFBWSxRQUFRO1VBQUksTUFBTTtVQUFHLFNBQVM7VUFBUSxpQkFBaUI7U0FBcUI7bUJBQzlHLHdCQUFDLGlCQUFEO1VBQWlCLE1BQU07VUFBYSxZQUFZO1NBQXdCOzs7OztRQUNyRTs7OztnQkFDRjs7Ozs7O01BRVQsRUFBQyxDQUFFO0tBQ0E7Ozs7OztHQUNGOzs7OztZQUtMLHdCQUFDLE9BQUQ7R0FBSyxXQUFVO2FBQWY7SUFDRSx3QkFBQyxPQUFEO0tBQUssV0FBVTtlQUFmLENBQ0Usd0JBQUMsVUFBRDtNQUNFLFNBQVM7TUFDVCxXQUFVO01BQ1YsT0FBTztPQUFFLFNBQVM7T0FBa0IsVUFBVTtPQUFXLFlBQVk7T0FBUSxLQUFLO09BQVcsY0FBYztPQUFRLFNBQVM7T0FBUSxZQUFZO01BQVM7Z0JBSDNKLENBS0Usd0JBQUMsV0FBRCxFQUFXLE1BQU0sR0FBSzs7OztnQkFBQyxZQUNqQjs7Ozs7ZUFFUix3QkFBQyxVQUFEO01BQ0UsZUFBZTtPQUNiLElBQUksWUFBWSxPQUFPLGNBQWM7UUFDbkMsTUFBTSxZQUFZLFlBQVksV0FBVSxTQUFRLEtBQUssT0FBTyxRQUFRO1FBQ3BFLElBQUksY0FBYyxDQUFDLEdBQUc7U0FDcEIsZ0JBQWdCLEtBQUs7U0FDckIsb0JBQW9CLFNBQVM7U0FDN0I7UUFDRjtPQUNGO09BRUEsSUFBSSxZQUFZLE9BQU8sVUFBVTtRQUMvQixNQUFNLFlBQVksWUFBWSxXQUFVLFNBQVEsS0FBSyxPQUFPLGlCQUFpQjtRQUM3RSxJQUFJLGNBQWMsQ0FBQyxHQUFHO1NBQ3BCLGdCQUFnQixLQUFLO1NBQ3JCLG9CQUFvQixTQUFTO1NBQzdCO1FBQ0Y7T0FDRjtPQUVBLElBQUksWUFBWSxPQUFPLG1CQUFtQjtRQUN4QyxNQUFNLFlBQVksWUFBWSxXQUFVLFNBQVEsS0FBSyxPQUFPLFlBQVk7UUFDeEUsSUFBSSxjQUFjLENBQUMsR0FBRztTQUNwQixnQkFBZ0IsS0FBSztTQUNyQixvQkFBb0IsU0FBUztTQUM3QjtRQUNGO09BQ0Y7T0FFQSxJQUFJLFlBQVksT0FBTyxVQUFVO1FBQy9CLE1BQU0sWUFBWSxZQUFZLFdBQVUsU0FBUSxLQUFLLFVBQVUseUJBQXlCO1FBQ3hGLElBQUksY0FBYyxDQUFDLEdBQUc7U0FDcEIsZ0JBQWdCLEtBQUs7U0FDckIsb0JBQW9CLFNBQVM7U0FDN0I7UUFDRjtPQUNGO09BRUEsSUFBSSxZQUFZLE9BQU8sWUFBWTtRQUNqQyxNQUFNLFlBQVksbUJBQW1CO1FBQ3JDLElBQUksYUFBYSxHQUFHO1NBQ2xCLGdCQUFnQixJQUFJO1NBQ3BCLG9CQUFvQixTQUFTO1NBQzdCO1FBQ0Y7T0FDRjtPQUVBLElBQUksWUFBWSxPQUFPLFlBQVk7UUFDakMsTUFBTSxZQUFZLFlBQVksV0FBVSxTQUFRLEtBQUssT0FBTyxVQUFVO1FBQ3RFLElBQUksY0FBYyxDQUFDLEdBQUc7U0FDcEIsZ0JBQWdCLEtBQUs7U0FDckIsb0JBQW9CLFNBQVM7U0FDN0I7UUFDRjtPQUNGO09BRUEsSUFBSSxZQUFZLE9BQU8sWUFBWTtRQUNqQyxNQUFNLFlBQVksbUJBQW1CO1FBQ3JDLElBQUksYUFBYSxHQUFHO1NBQ2xCLGdCQUFnQixLQUFLO1NBQ3JCLG9CQUFvQixTQUFTO1NBQzdCO1FBQ0Y7T0FDRjtPQUVBLElBQUksWUFBWSxPQUFPLGNBQWMsWUFBWSxPQUFPLFlBQVk7UUFDbEUsTUFBTSxZQUFZLG1CQUFtQjtRQUNyQyxJQUFJLGFBQWEsR0FBRztTQUNsQixnQkFBZ0IsS0FBSztTQUNyQixvQkFBb0IsU0FBUztTQUM3QjtRQUNGO09BQ0Y7T0FFQSxJQUFJLENBQUMsZ0JBQWdCLFlBQVksU0FBUyxjQUFjLENBQUM7UUFBQztRQUFZO1FBQVk7UUFBYztRQUFZO1FBQVk7UUFBWTtRQUFZO09BQVUsQ0FBQyxDQUFDLFNBQVMsWUFBWSxFQUFFLEdBQUc7UUFDcEwsZ0JBQWdCLElBQUk7T0FDdEIsT0FBTyxJQUFJLG1CQUFtQixHQUFHO1FBQy9CLE1BQU0sWUFBWSxtQkFBbUI7UUFDckMsTUFBTSxXQUFXLFlBQVk7UUFDN0IsSUFBSSxZQUFZLFNBQVMsU0FBUyxXQUFXO1NBQzNDLGdCQUFnQixJQUFJO1FBQ3RCLE9BQU87U0FDTCxnQkFBZ0IsS0FBSztRQUN2QjtRQUNBLG9CQUFvQixTQUFTO09BQy9CLE9BQU87UUFDTCxtQkFBbUIsSUFBSTtPQUN6QjtNQUNGO01BQ0EsV0FBVTtNQUNWLE9BQU87T0FBRSxTQUFTO09BQWtCLFVBQVU7T0FBVyxZQUFZO09BQVEsS0FBSztPQUFXLGNBQWM7T0FBUSxPQUFPO09BQXVCLFNBQVM7T0FBUSxZQUFZO01BQVM7Z0JBMUZ6TCxDQTRGRSx3QkFBQyxXQUFELEVBQVcsTUFBTSxHQUFLOzs7O2dCQUFDLE9BQ2pCOzs7OzthQUNMOzs7Ozs7SUFFTCx3QkFBQyxPQUFELEVBQUssV0FBVSwyQkFFVjs7Ozs7SUFFTCx3QkFBQyxPQUFEO0tBQUssV0FBVTtlQUFmLENBQ0Usd0JBQUMsVUFBRDtNQUNFLGVBQWU7T0FDYixhQUFZLFNBQVEsT0FBTyxDQUFDO09BQzVCLGtCQUFrQixLQUFLO01BQ3pCO01BQ0EsV0FBVTtNQUNWLE9BQU87T0FBRSxTQUFTO09BQWtCLFVBQVU7T0FBVyxZQUFZO09BQVEsS0FBSztPQUFXLGNBQWM7T0FBUSxPQUFPO09BQWlCLGFBQWE7T0FBd0IsU0FBUztPQUFRLFlBQVk7TUFBUztnQkFOeE4sQ0FRRSx3QkFBQyxXQUFELEVBQVcsTUFBTSxHQUFLOzs7O2dCQUFDLGlCQUNqQjs7Ozs7Z0JBRU4sWUFBWSxTQUFTLGNBQWMsWUFBWSxTQUFTLGlCQUN4RCx3QkFBQyxVQUFEO01BQ0UsZUFBZTtPQUNiLE1BQU0sbUJBQW1CLGdCQUFnQixDQUFDO1FBQUM7UUFBWTtRQUFZO1FBQWM7UUFBWTtRQUFZO1FBQVk7UUFBWTtPQUFVLENBQUMsQ0FBQyxTQUFTLFlBQVksRUFBRTtPQUNwSyxLQUFLLG9CQUFvQixZQUFZLFNBQVMsZUFBZSxZQUFZLFdBQVcsWUFBWSxRQUFRLGtCQUFrQjtRQUN4SCxNQUFNLFVBQVUsWUFBWSxRQUFRLGlCQUFpQjtRQUNyRCxJQUFJLFNBQVM7T0FDZjtPQUNBLElBQUksa0JBQWtCO1FBQ3BCLGdCQUFnQixLQUFLO09BQ3ZCLE9BQU87UUFDTCxXQUFXO09BQ2I7TUFDRjtNQUNBLFVBQVcsZ0JBQWdCLENBQUM7T0FBQztPQUFZO09BQVk7T0FBYztPQUFZO09BQVk7T0FBWTtPQUFZO01BQVUsQ0FBQyxDQUFDLFNBQVMsWUFBWSxFQUFFLElBQUssUUFBUSxFQUFFLGtCQUFrQixZQUFZLE9BQU87TUFDMU0sV0FBYSxnQkFBZ0IsQ0FBQztPQUFDO09BQVk7T0FBWTtPQUFjO09BQVk7T0FBWTtPQUFZO09BQVk7TUFBVSxDQUFDLENBQUMsU0FBUyxZQUFZLEVBQUUsS0FBTSxrQkFBa0IsWUFBWSxPQUFPLFdBQVksWUFBWTtNQUMzTixPQUFPO09BQ0wsU0FBUztPQUNULFVBQVU7T0FDVixZQUFZO09BQ1osS0FBSztPQUNMLGNBQWM7T0FDZCxTQUFXLGdCQUFnQixDQUFDO1FBQUM7UUFBWTtRQUFZO1FBQWM7UUFBWTtRQUFZO1FBQVk7UUFBWTtPQUFVLENBQUMsQ0FBQyxTQUFTLFlBQVksRUFBRSxLQUFNLGtCQUFrQixZQUFZLE9BQU8sV0FBWSxJQUFJO09BQ2pOLFFBQVUsZ0JBQWdCLENBQUM7UUFBQztRQUFZO1FBQVk7UUFBYztRQUFZO1FBQVk7UUFBWTtRQUFZO09BQVUsQ0FBQyxDQUFDLFNBQVMsWUFBWSxFQUFFLEtBQU0sa0JBQWtCLFlBQVksT0FBTyxXQUFZLFlBQVk7T0FDeE4sWUFBWTtPQUNaLFNBQVM7T0FDVCxZQUFZO01BQ2Q7Z0JBMUJGLENBMkJDLG9CQUNpQix3QkFBQyxZQUFELEVBQVksTUFBTSxHQUFLOzs7O2NBQ2pDOzs7OzthQUVQOzs7Ozs7R0FDRjs7Ozs7VUFDRjs7Ozs7U0FFTDs7Ozs7QUFFSjs7Ozs7QUFFQSwwQkFBMEIsWUFBWSxFQUNwQyxtQkFBbUIsVUFBVSxLQUFLLFdBQ3BDIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbImluZGV4LmpzeCJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBBcnJvd0xlZnQsIFJlZnJlc2hDdywgQXJyb3dSaWdodCB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XHJcbmltcG9ydCAnLi90aGVtZS5jc3MnO1xyXG5pbXBvcnQgdXNlU291bmQgZnJvbSAndXNlLXNvdW5kJztcclxuaW1wb3J0IHsgY2hhcHRlckZsb3cgfSBmcm9tICcuL3N0b3J5RW5naW5lJztcclxuaW1wb3J0IENoaWVmRGV0ZWN0aXZlIGZyb20gJy4vY29tcG9uZW50cy9DaGllZkRldGVjdGl2ZS9DaGllZkRldGVjdGl2ZSc7XHJcbmltcG9ydCBJbnZlc3RpZ2F0aW9uSGFuZGJvb2sgZnJvbSAnLi9jb21wb25lbnRzL0VkdWNhdGlvbmFsL0ludmVzdGlnYXRpb25IYW5kYm9vayc7XHJcbmltcG9ydCBEZXRlY3RpdmVDaGVja3BvaW50IGZyb20gJy4vY29tcG9uZW50cy9FZHVjYXRpb25hbC9EZXRlY3RpdmVDaGVja3BvaW50JztcclxuaW1wb3J0IEV2aWRlbmNlU3VtbWFyeSBmcm9tICcuL2NvbXBvbmVudHMvRWR1Y2F0aW9uYWwvRXZpZGVuY2VTdW1tYXJ5JztcclxuaW1wb3J0IENoYXB0ZXJDb3ZlciBmcm9tICcuL2NvbXBvbmVudHMvRWR1Y2F0aW9uYWwvQ2hhcHRlckNvdmVyJztcclxuaW1wb3J0IENoYXB0ZXJJbnRyb1NwcmVhZCBmcm9tICcuL2NvbXBvbmVudHMvRWR1Y2F0aW9uYWwvQ2hhcHRlckludHJvU3ByZWFkJztcclxuaW1wb3J0IE1pc3Npb25CcmllZmluZ1NwcmVhZCBmcm9tICcuL2NvbXBvbmVudHMvRWR1Y2F0aW9uYWwvTWlzc2lvbkJyaWVmaW5nU3ByZWFkJztcclxuaW1wb3J0IEZ1bGxzY3JlZW5CdXR0b24gZnJvbSAnLi9jb21wb25lbnRzL0NvbW1vbi9GdWxsc2NyZWVuQnV0dG9uJztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuXHJcbmNvbnN0IHRpbWVsaW5lVHJlZSA9ICgoKSA9PiB7XHJcbiAgY29uc3QgdHJlZSA9IFtdO1xyXG4gIGxldCBjdXJyZW50QmFycmllciA9IG51bGw7XHJcbiAgbGV0IGN1cnJlbnRTdGFnZSA9IG51bGw7XHJcblxyXG4gIGNoYXB0ZXJGbG93LmZvckVhY2goKG5vZGUsIGluZGV4KSA9PiB7XHJcbiAgICBjb25zdCBpdGVtID0geyAuLi5ub2RlLCBvcmlnaW5hbEluZGV4OiBpbmRleCB9O1xyXG4gICAgbGV0IGJhcnJpZXJJZCA9IG51bGw7XHJcbiAgICBcclxuICAgIGlmIChub2RlLnRpdGxlLmluY2x1ZGVzKCdCYXJyaWVyIDEnKSB8fCBub2RlLnRpdGxlLmluY2x1ZGVzKCdTdGFnZSA2LjEnKSkgYmFycmllcklkID0gJ0JhcnJpZXIgNi4xJztcclxuICAgIGVsc2UgaWYgKG5vZGUudGl0bGUuaW5jbHVkZXMoJ0JhcnJpZXIgMicpIHx8IG5vZGUudGl0bGUuaW5jbHVkZXMoJ1N0YWdlIDYuMicpKSBiYXJyaWVySWQgPSAnQmFycmllciA2LjInO1xyXG4gICAgZWxzZSBpZiAobm9kZS50aXRsZS5pbmNsdWRlcygnQmFycmllciAzJykgfHwgbm9kZS50aXRsZS5pbmNsdWRlcygnU3RhZ2UgNi4zJykpIGJhcnJpZXJJZCA9ICdCYXJyaWVyIDYuMyc7XHJcbiAgICBlbHNlIGlmIChub2RlLnRpdGxlLmluY2x1ZGVzKCdCYXJyaWVyIDQnKSB8fCBub2RlLnRpdGxlLmluY2x1ZGVzKCdEbyBZb3UgS25vdz8nKSB8fCBub2RlLnRpdGxlLmluY2x1ZGVzKCdDb25jZXB0IE1hcCcpKSBiYXJyaWVySWQgPSAnQmFycmllciA2LjQnO1xyXG4gICAgZWxzZSBiYXJyaWVySWQgPSAnRmluYWwgV3JhcC11cCc7XHJcblxyXG4gICAgaWYgKCFjdXJyZW50QmFycmllciB8fCBjdXJyZW50QmFycmllci5pZCAhPT0gYmFycmllcklkKSB7XHJcbiAgICAgIGN1cnJlbnRCYXJyaWVyID0geyBpZDogYmFycmllcklkLCB0aXRsZTogYmFycmllcklkLCB0eXBlOiAnYmFycmllcicsIGNoaWxkcmVuOiBbXSB9O1xyXG4gICAgICB0cmVlLnB1c2goY3VycmVudEJhcnJpZXIpO1xyXG4gICAgICBjdXJyZW50U3RhZ2UgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChiYXJyaWVySWQgPT09ICdCYXJyaWVyIDYuMycpIHtcclxuICAgICAgY29uc3Qgc3RhZ2VNYXRjaCA9IG5vZGUudGl0bGUubWF0Y2goLyhTdGFnZSA2XFwuM1xcLlxcZCspLyk7XHJcbiAgICAgIGlmIChzdGFnZU1hdGNoKSB7XHJcbiAgICAgICAgY29uc3Qgc3RhZ2VOYW1lID0gc3RhZ2VNYXRjaFsxXTtcclxuICAgICAgICBpZiAoIWN1cnJlbnRTdGFnZSB8fCBjdXJyZW50U3RhZ2UuaWQgIT09IHN0YWdlTmFtZSkge1xyXG4gICAgICAgICAgY3VycmVudFN0YWdlID0geyBpZDogc3RhZ2VOYW1lLCB0aXRsZTogc3RhZ2VOYW1lLCB0eXBlOiAnc3RhZ2UnLCBjaGlsZHJlbjogW10gfTtcclxuICAgICAgICAgIGN1cnJlbnRCYXJyaWVyLmNoaWxkcmVuLnB1c2goY3VycmVudFN0YWdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3VycmVudFN0YWdlLmNoaWxkcmVuLnB1c2goaXRlbSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY3VycmVudEJhcnJpZXIuY2hpbGRyZW4ucHVzaChpdGVtKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY3VycmVudEJhcnJpZXIuY2hpbGRyZW4ucHVzaChpdGVtKTtcclxuICAgIH1cclxuICB9KTtcclxuICByZXR1cm4gdHJlZTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1hdGVyaWFsc0Fyb3VuZFVzQWN0aXZpdHkoeyBvbkJhY2tUb0Rhc2hib2FyZCB9KSB7XHJcbiAgY29uc3QgaGFuZGJvb2tSZWYgPSB1c2VSZWYobnVsbCk7XHJcbiAgY29uc3QgW2N1cnJlbnRGbG93SW5kZXgsIHNldEN1cnJlbnRGbG93SW5kZXhdID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW2hpZ2hlc3RVbmxvY2tlZEluZGV4LCBzZXRIaWdoZXN0VW5sb2NrZWRJbmRleF0gPSB1c2VTdGF0ZSgwKTtcclxuICBjb25zdCBbaXNUaW1lbGluZU9wZW4sIHNldElzVGltZWxpbmVPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc3RhZ2VDb21wbGV0ZWQsIHNldFN0YWdlQ29tcGxldGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbLCBzZXRYcF0gPSB1c2VTdGF0ZSgwKTtcclxuICBjb25zdCBbcmVzZXRLZXksIHNldFJlc2V0S2V5XSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtzaG93Q292ZXIsIHNldFNob3dDb3Zlcl0gPSB1c2VTdGF0ZSh0cnVlKTtcclxuICBjb25zdCBbc2hvd0ludHJvU3ByZWFkLCBzZXRTaG93SW50cm9TcHJlYWRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtzaG93SGFuZGJvb2ssIHNldFNob3dIYW5kYm9va10gPSB1c2VTdGF0ZSh0cnVlKTtcclxuICBjb25zdCBbZXhwYW5kZWROb2Rlcywgc2V0RXhwYW5kZWROb2Rlc10gPSB1c2VTdGF0ZSh7IFxyXG4gICAgJ0JhcnJpZXIgNi4xJzogdHJ1ZSwgJ0JhcnJpZXIgNi4yJzogdHJ1ZSwgJ0JhcnJpZXIgNi4zJzogdHJ1ZSwgJ0JhcnJpZXIgNi40JzogdHJ1ZSwgJ0ZpbmFsIFdyYXAtdXAnOiB0cnVlLFxyXG4gICAgJ1N0YWdlIDYuMy4xJzogdHJ1ZSwgJ1N0YWdlIDYuMy4yJzogdHJ1ZSwgJ1N0YWdlIDYuMy4zJzogdHJ1ZSwgJ1N0YWdlIDYuMy40JzogdHJ1ZSwgJ1N0YWdlIDYuMy41JzogdHJ1ZSwgJ1N0YWdlIDYuMy42JzogdHJ1ZVxyXG4gIH0pO1xyXG4gIFxyXG4gIGNvbnN0IHRvZ2dsZU5vZGUgPSAoaWQpID0+IHNldEV4cGFuZGVkTm9kZXMocHJldiA9PiAoeyAuLi5wcmV2LCBbaWRdOiAhcHJldltpZF0gfSkpO1xyXG5cclxuICBjb25zdCBbcGxheVN1Y2Nlc3NdID0gdXNlU291bmQoJ2h0dHBzOi8vYXNzZXRzLm1peGtpdC5jby9hY3RpdmVfc3RvcmFnZS9zZngvMjAxMy8yMDEzLXByZXZpZXcubXAzJywgeyB2b2x1bWU6IDAuNSB9KTtcclxuXHJcbiAgLy8gUG91ciBXYXRlciBhY3Rpdml0eSAoc3RhZ2U4X2IpIG11c3QgYmUgY29tcGxldGVseSBzaWxlbnQg4oCUIG5vIGF1ZGlvIG9mIGFueSBraW5kLlxyXG4gIGNvbnN0IGlzU2lsZW50U3RhZ2UgPSAoKSA9PiBjaGFwdGVyRmxvd1tjdXJyZW50Rmxvd0luZGV4XT8uaWQgPT09ICdzdGFnZThfYic7XHJcblxyXG4gIGNvbnN0IGFkZFhwID0gKGFtb3VudCkgPT4ge1xyXG4gICAgc2V0WHAocHJldiA9PiBwcmV2ICsgYW1vdW50KTtcclxuICAgIGlmICghaXNTaWxlbnRTdGFnZSgpKSB7XHJcbiAgICAgIHRyeSB7IHBsYXlTdWNjZXNzKCk7IH0gY2F0Y2ggKGVycikgeyBjb25zb2xlLndhcm4oJ0F1ZGlvIHBsYXliYWNrIGZhaWxlZCcsIGVycik7IH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVOZXh0ID0gKCkgPT4ge1xyXG4gICAgc2V0U3RhZ2VDb21wbGV0ZWQoZmFsc2UpO1xyXG4gICAgc2V0U2hvd0hhbmRib29rKGZhbHNlKTtcclxuICAgIGlmIChjdXJyZW50Rmxvd0luZGV4IDwgY2hhcHRlckZsb3cubGVuZ3RoIC0gMSkge1xyXG4gICAgICBjb25zdCBuZXh0SW5kZXggPSBjdXJyZW50Rmxvd0luZGV4ICsgMTtcclxuICAgICAgc2V0Q3VycmVudEZsb3dJbmRleChuZXh0SW5kZXgpO1xyXG4gICAgICBpZiAobmV4dEluZGV4ID4gaGlnaGVzdFVubG9ja2VkSW5kZXgpIHtcclxuICAgICAgICBzZXRIaWdoZXN0VW5sb2NrZWRJbmRleChuZXh0SW5kZXgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuICBcclxuICBjb25zdCBjdXJyZW50Tm9kZSA9IGNoYXB0ZXJGbG93W2N1cnJlbnRGbG93SW5kZXhdO1xyXG4gIFxyXG4gIGNvbnN0IGhhbmRsZU1pc3Npb25BY2NlcHQgPSAoKSA9PiB7XHJcbiAgICBpZiAoY3VycmVudE5vZGUucmV3YXJkWFAgJiYgY3VycmVudE5vZGUudHlwZSA9PT0gJ21pc3Npb24nKSB7XHJcbiAgICAgIGFkZFhwKGN1cnJlbnROb2RlLnJld2FyZFhQKTtcclxuICAgIH1cclxuICAgIHNldFN0YWdlQ29tcGxldGVkKGZhbHNlKTtcclxuICAgIGlmIChjdXJyZW50Rmxvd0luZGV4IDwgY2hhcHRlckZsb3cubGVuZ3RoIC0gMSkge1xyXG4gICAgICBjb25zdCBuZXh0SW5kZXggPSBjdXJyZW50Rmxvd0luZGV4ICsgMTtcclxuICAgICAgY29uc3QgbmV4dE5vZGUgPSBjaGFwdGVyRmxvd1tuZXh0SW5kZXhdO1xyXG4gICAgICBcclxuICAgICAgaWYgKG5leHROb2RlICYmIChuZXh0Tm9kZS5pZCA9PT0gJ3N0YWdlMicgfHwgbmV4dE5vZGUuaWQgPT09ICdzdGFnZTNfdXNlJyB8fCBuZXh0Tm9kZS5pZCA9PT0gJ3N0YWdlNF8xJyB8fCBuZXh0Tm9kZS5pZCA9PT0gJ3N0YWdlNF8yJyB8fCBuZXh0Tm9kZS5pZCA9PT0gJ3N0YWdlNF80JyB8fCBuZXh0Tm9kZS5pZCA9PT0gJ3N0YWdlNF81JyB8fCBuZXh0Tm9kZS5pZCA9PT0gJ3N0YWdlNl9hJyB8fCBuZXh0Tm9kZS5pZCA9PT0gJ3N0YWdlN19hJyB8fCBuZXh0Tm9kZS5pZCA9PT0gJ3N0YWdlOF9hJyB8fCBuZXh0Tm9kZS5pZCA9PT0gJ3N0YWdlOF9iJykpIHtcclxuICAgICAgICBzZXRTaG93SGFuZGJvb2soZmFsc2UpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNldFNob3dIYW5kYm9vayh0cnVlKTtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgc2V0Q3VycmVudEZsb3dJbmRleChuZXh0SW5kZXgpO1xyXG4gICAgICBpZiAobmV4dEluZGV4ID4gaGlnaGVzdFVubG9ja2VkSW5kZXgpIHtcclxuICAgICAgICBzZXRIaWdoZXN0VW5sb2NrZWRJbmRleChuZXh0SW5kZXgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRGVicmllZkNvbnRpbnVlID0gKCkgPT4ge1xyXG4gICAgaWYgKGN1cnJlbnROb2RlLnJld2FyZFhQICYmIChjdXJyZW50Tm9kZS50eXBlID09PSAnZGVicmllZicgfHwgY3VycmVudE5vZGUudHlwZSA9PT0gJ3N1bW1hcnknKSkge1xyXG4gICAgICBhZGRYcChjdXJyZW50Tm9kZS5yZXdhcmRYUCk7XHJcbiAgICB9XHJcbiAgICBpZiAoY3VycmVudE5vZGUuaXNGaW5hbCkge1xyXG4gICAgICBvbkJhY2tUb0Rhc2hib2FyZCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaGFuZGxlTmV4dCgpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZVN0YWdlQ29tcGxldGUgPSAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygnW1BhcmVudF0gQWN0aXZpdHkgY29tcGxldGlvbiBzdGF0ZSB1cGRhdGluZyB0byBUUlVFJyk7XHJcbiAgICBzZXRTdGFnZUNvbXBsZXRlZCh0cnVlKTtcclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPEZ1bGxzY3JlZW5CdXR0b24gLz5cclxuICAgICAge3Nob3dDb3ZlciA/IChcclxuICAgICAgICA8Q2hhcHRlckNvdmVyIG9uT3BlbkJvb2s9eygpID0+IHsgc2V0U2hvd0NvdmVyKGZhbHNlKTsgc2V0U2hvd0ludHJvU3ByZWFkKHRydWUpOyB9fSBvbkJhY2s9e29uQmFja1RvRGFzaGJvYXJkfSAvPlxyXG4gICAgICApIDogc2hvd0ludHJvU3ByZWFkID8gKFxyXG4gICAgICAgIDxDaGFwdGVySW50cm9TcHJlYWQgb25Db250aW51ZT17KCkgPT4gc2V0U2hvd0ludHJvU3ByZWFkKGZhbHNlKX0gb25CYWNrPXsoKSA9PiB7IHNldFNob3dJbnRyb1NwcmVhZChmYWxzZSk7IHNldFNob3dDb3Zlcih0cnVlKTsgfX0gLz5cclxuICAgICAgKSA6IChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFjdGl2aXR5LXdvcmtzcGFjZSBtYXRlcmlhbHMtYXJvdW5kLXVzLXRoZW1lIGZsZXggaC1zY3JlZW4gYmctW3ZhcigtLWxlc3Nvbi1zdXJmYWNlKV0gb3ZlcmZsb3ctaGlkZGVuXCIgc3R5bGU9e3sgcGFkZGluZ1RvcDogMCwgcGFkZGluZ0JvdHRvbTogJzcycHgnIH19PlxyXG4gICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZmxleDogMSwgb3ZlcmZsb3c6ICdoaWRkZW4nLCBwb3NpdGlvbjogJ3JlbGF0aXZlJyB9fT5cclxuICAgICAgICB7LyogVG9nZ2xlIEJ1dHRvbiAqL31cclxuICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc1RpbWVsaW5lT3BlbighaXNUaW1lbGluZU9wZW4pfVxyXG4gICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgIGxlZnQ6IGlzVGltZWxpbmVPcGVuID8gJzMyMHB4JyA6ICcwcHgnLFxyXG4gICAgICAgICAgICB0b3A6ICc1MCUnLFxyXG4gICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC01MCUpJyxcclxuICAgICAgICAgICAgekluZGV4OiAxMDEsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICd2YXIoLS1sZXNzb24tc3VyZmFjZSknLFxyXG4gICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tbGVzc29uLWJvcmRlciknLFxyXG4gICAgICAgICAgICBib3JkZXJMZWZ0OiAnbm9uZScsXHJcbiAgICAgICAgICAgIGJvcmRlclRvcFJpZ2h0UmFkaXVzOiAnOHB4JyxcclxuICAgICAgICAgICAgYm9yZGVyQm90dG9tUmlnaHRSYWRpdXM6ICc4cHgnLFxyXG4gICAgICAgICAgICBwYWRkaW5nOiAnMTZweCA4cHgnLFxyXG4gICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcclxuICAgICAgICAgICAgYm94U2hhZG93OiAnMnB4IDAgOHB4IHJnYmEoMCwwLDAsMC4xKScsXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb246ICdsZWZ0IDAuNHMgY3ViaWMtYmV6aWVyKDAuMTYsIDEsIDAuMywgMSknLFxyXG4gICAgICAgICAgICBjb2xvcjogJ3ZhcigtLWxlc3Nvbi10ZXh0KScsXHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJ1xyXG4gICAgICAgICAgfX1cclxuICAgICAgICAgIHRpdGxlPVwiVG9nZ2xlIFRpbWVsaW5lXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8QXJyb3dSaWdodCBzaXplPXsxNn0gc3R5bGU9e3sgdHJhbnNmb3JtOiBpc1RpbWVsaW5lT3BlbiA/ICdyb3RhdGUoMTgwZGVnKScgOiAncm90YXRlKDBkZWcpJywgdHJhbnNpdGlvbjogJ3RyYW5zZm9ybSAwLjNzJyB9fSAvPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG5cclxuICAgICAgICB7LyogVGltZWxpbmUgU2lkZWJhciAqL31cclxuICAgICAgICA8ZGl2IFxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwidGltZWxpbmUtZmx5b3V0XCJcclxuICAgICAgICAgIHN0eWxlPXt7IFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJywgXHJcbiAgICAgICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgICAgIHRvcDogMCwgYm90dG9tOiAwLCB6SW5kZXg6IDEwMCwgXHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICd2YXIoLS1sZXNzb24tc3VyZmFjZSknLCBib3JkZXJSaWdodDogJzFweCBzb2xpZCB2YXIoLS1sZXNzb24tYm9yZGVyKScsIFxyXG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBcclxuICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLCBib3hTaGFkb3c6IGlzVGltZWxpbmVPcGVuID8gJzRweCAwIDIwcHggcmdiYSgwLDAsMCwwLjIpJyA6ICdub25lJyxcclxuICAgICAgICAgICAgd2lkdGg6ICczMjBweCcsIFxyXG4gICAgICAgICAgICB0cmFuc2Zvcm06IGlzVGltZWxpbmVPcGVuID8gJ3RyYW5zbGF0ZVgoMCknIDogJ3RyYW5zbGF0ZVgoLTEwMCUpJyxcclxuICAgICAgICAgICAgdHJhbnNpdGlvbjogJ3RyYW5zZm9ybSAwLjRzIGN1YmljLWJlemllcigwLjE2LCAxLCAwLjMsIDEpLCBib3gtc2hhZG93IDAuNHMgZWFzZSdcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyB3aWR0aDogJzMyMHB4JywgcGFkZGluZzogJzEuNXJlbScsIGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIGhlaWdodDogJzEwMCUnIH19PlxyXG4gICAgICAgICAgICA8aDMgc3R5bGU9e3sgbWFyZ2luOiAnMCAwIDEuNXJlbSAwJywgZm9udFNpemU6ICcwLjlyZW0nLCBjb2xvcjogJ3ZhcigtLWxlc3Nvbi1tdXRlZCknLCB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJywgbGV0dGVyU3BhY2luZzogJzFweCcgfX0+XHJcbiAgICAgICAgICAgICAgSW52ZXN0aWdhdGlvbiBQcm9ncmVzc1xyXG4gICAgICAgICAgICA8L2gzPlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIGdhcDogJzAuNXJlbScsIG92ZXJmbG93WTogJ2F1dG8nLCBwYWRkaW5nUmlnaHQ6ICcwLjVyZW0nIH19PlxyXG4gICAgICAgICAgICAgIHsoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVuZGVyVGltZWxpbmVJdGVtID0gKGl0ZW0sIGluZGVudExldmVsID0gMCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBjb25zdCBpZHggPSBpdGVtLm9yaWdpbmFsSW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gY3VycmVudEZsb3dJbmRleCA9PT0gaWR4IHx8IChpdGVtLnR5cGUgPT09ICdtaXNzaW9uJyAmJiBjdXJyZW50Rmxvd0luZGV4ID4gaWR4ICYmIGNoYXB0ZXJGbG93W2N1cnJlbnRGbG93SW5kZXhdLnR5cGUgPT09ICdhY3Rpdml0eScgJiYgY2hhcHRlckZsb3cuZmluZEluZGV4KChuLCBpKSA9PiBpID4gaWR4ICYmIG4udHlwZSAhPT0gJ2FjdGl2aXR5JykgPiBjdXJyZW50Rmxvd0luZGV4KTtcclxuICAgICAgICAgICAgICAgICAgY29uc3QgaXNMb2NrZWQgPSBpZHggPiBoaWdoZXN0VW5sb2NrZWRJbmRleDtcclxuICAgICAgICAgICAgICAgICAgY29uc3QgaXNQYXN0ID0gaWR4IDw9IGhpZ2hlc3RVbmxvY2tlZEluZGV4ICYmICFpc0FjdGl2ZTtcclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIGxldCBpY29uID0gJ/Cfjq8nO1xyXG4gICAgICAgICAgICAgICAgICBpZiAoaXRlbS50eXBlID09PSAnYWN0aXZpdHknKSBpY29uID0gJ/Cfp6onO1xyXG4gICAgICAgICAgICAgICAgICBpZiAoaXRlbS50eXBlID09PSAnZGVicmllZicgfHwgaXRlbS50eXBlID09PSAnc3VtbWFyeScpIGljb24gPSAn8J+TnSc7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgPT09ICdoYW5kYm9vaycpIGljb24gPSAn8J+Tlic7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgPT09ICdjaGVja3BvaW50JykgaWNvbiA9ICfinIUnO1xyXG4gICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIFxyXG4gICAgICAgICAgICAgICAgICAgICAga2V5PXtgaXRlbS0ke2lkeH1gfSBcclxuICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0xvY2tlZH1cclxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0xvY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNTaWxlbnRTdGFnZSgpKSB7IHRyeSB7IHBsYXlTdWNjZXNzKCk7IH0gY2F0Y2ggKGVycikgeyBjb25zb2xlLndhcm4oJ0F1ZGlvIHBsYXliYWNrIGZhaWxlZCcsIGVycik7IH0gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgPT09ICdtaXNzaW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2hvd0hhbmRib29rKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTaG93SGFuZGJvb2soZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRDdXJyZW50Rmxvd0luZGV4KGlkeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SXNUaW1lbGluZU9wZW4oZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnZmxleC1zdGFydCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhcDogJzAuNzVyZW0nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMC43NXJlbScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbkxlZnQ6IGAke2luZGVudExldmVsICogMX1yZW1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc4cHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBpc0FjdGl2ZSA/ICd2YXIoLS1sZXNzb24tYWNjZW50LWJnKScgOiAndHJhbnNwYXJlbnQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IGAxcHggc29saWQgJHtpc0FjdGl2ZSA/ICd2YXIoLS1sZXNzb24tYWNjZW50LWJvcmRlciknIDogJ3RyYW5zcGFyZW50J31gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogaXNQYXN0ID8gJ3ZhcigtLWxlc3Nvbi1tdXRlZCknIDogaXNBY3RpdmUgPyAndmFyKC0tbGVzc29uLWFjY2VudCknIDogJ3ZhcigtLWxlc3Nvbi10ZXh0KScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb246ICdhbGwgMC4ycycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IGlzTG9ja2VkID8gMC40IDogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiBpc0xvY2tlZCA/ICdub3QtYWxsb3dlZCcgOiAncG9pbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2xlZnQnXHJcbiAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMS4ycmVtJywgZmxleFNocmluazogMCB9fT57aWNvbn08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIGdhcDogJzAuMnJlbScsIG1pbldpZHRoOiAwIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJzAuODVyZW0nLCBmb250V2VpZ2h0OiBpc0FjdGl2ZSA/ICdib2xkJyA6IDUwMCwgd2hpdGVTcGFjZTogJ25vd3JhcCcsIG92ZXJmbG93OiAnaGlkZGVuJywgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRTaXplOiAnMC43cmVtJywgY29sb3I6ICd2YXIoLS1sZXNzb24tbXV0ZWQpJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICB7aXRlbS50eXBlID09PSAnbWlzc2lvbicgPyAnTWlzc2lvbiBCcmllZmluZycgOiBpdGVtLnR5cGUgPT09ICdhY3Rpdml0eScgPyBpdGVtLnN1YnRpdGxlIDogJ0V2aWRlbmNlIFJldmlldyd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCByZW5kZXJUaW1lbGluZUdyb3VwID0gKGdyb3VwLCBpbmRlbnRMZXZlbCA9IDApID0+IHtcclxuICAgICAgICAgICAgICAgICAgY29uc3QgaXNFeHBhbmRlZCA9IGV4cGFuZGVkTm9kZXNbZ3JvdXAuaWRdO1xyXG4gICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgY29uc3QgZ2V0Rmlyc3RJbmRleCA9IChub2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUub3JpZ2luYWxJbmRleCAhPT0gdW5kZWZpbmVkKSByZXR1cm4gbm9kZS5vcmlnaW5hbEluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLmNoaWxkcmVuICYmIG5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMCkgcmV0dXJuIGdldEZpcnN0SW5kZXgobm9kZS5jaGlsZHJlblswXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDk5OTtcclxuICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgY29uc3QgZmlyc3RJbmRleCA9IGdldEZpcnN0SW5kZXgoZ3JvdXApO1xyXG4gICAgICAgICAgICAgICAgICBjb25zdCBpc0xvY2tlZCA9IGZpcnN0SW5kZXggPiBoaWdoZXN0VW5sb2NrZWRJbmRleDtcclxuXHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2dyb3VwLmlkfSBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBnYXA6ICcwLjI1cmVtJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzTG9ja2VkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0b2dnbGVOb2RlKGdyb3VwLmlkKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBnYXA6ICcwLjc1cmVtJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMC42cmVtIDAuNzVyZW0nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbkxlZnQ6IGAke2luZGVudExldmVsICogMX1yZW1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzhweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ3JnYmEoMCwwLDAsMC4wMyknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBpc0xvY2tlZCA/ICd2YXIoLS1sZXNzb24tbXV0ZWQpJyA6ICd2YXIoLS1sZXNzb24tdGV4dCknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IGlzTG9ja2VkID8gJ25vdC1hbGxvd2VkJyA6ICdwb2ludGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdsZWZ0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiBpc0xvY2tlZCA/IDAuNiA6IDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcwLjlyZW0nLCBmbGV4OiAxLCB3aGl0ZVNwYWNlOiAnbm93cmFwJywgb3ZlcmZsb3c6ICdoaWRkZW4nLCB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycgfX0+e2dyb3VwLnRpdGxlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFNpemU6ICcwLjhyZW0nLCB0cmFuc2Zvcm06IGlzRXhwYW5kZWQgPyAncm90YXRlKDkwZGVnKScgOiAncm90YXRlKDBkZWcpJywgdHJhbnNpdGlvbjogJ3RyYW5zZm9ybSAwLjJzJywgY29sb3I6ICd2YXIoLS1sZXNzb24tbXV0ZWQpJyB9fT7ilrY8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgIHtpc0V4cGFuZGVkICYmICFpc0xvY2tlZCAmJiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgZ2FwOiAnMC4yNXJlbScsIG1hcmdpblRvcDogJzAuMjVyZW0nIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtncm91cC5jaGlsZHJlbi5tYXAoY2hpbGQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkLnR5cGUgPT09ICdzdGFnZScgfHwgY2hpbGQudHlwZSA9PT0gJ2JhcnJpZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZW5kZXJUaW1lbGluZUdyb3VwKGNoaWxkLCBpbmRlbnRMZXZlbCArIDAuNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVuZGVyVGltZWxpbmVJdGVtKGNoaWxkLCBpbmRlbnRMZXZlbCArIDAuNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRpbWVsaW5lVHJlZS5tYXAoZ3JvdXAgPT4gcmVuZGVyVGltZWxpbmVHcm91cChncm91cCwgMCkpO1xyXG4gICAgICAgICAgICAgIH0pKCl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIHsvKiBNYWluIENvbnRlbnQgQXJlYSAtIEZ1bGwgV2lkdGggKi99XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhY3Rpdml0eS1jb250ZW50XCIgc3R5bGU9e3sgZmxleDogMSwgbWluSGVpZ2h0OiAwLCBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBwb3NpdGlvbjogJ3JlbGF0aXZlJywgb3ZlcmZsb3dZOiBjdXJyZW50Tm9kZS50eXBlID09PSAnYWN0aXZpdHknID8gJ2hpZGRlbicgOiAnYXV0bycsIG1hcmdpbkxlZnQ6IGlzVGltZWxpbmVPcGVuID8gJzMyMHB4JyA6ICcwcHgnLCB0cmFuc2l0aW9uOiAnbWFyZ2luLWxlZnQgMC40cyBjdWJpYy1iZXppZXIoMC4xNiwgMSwgMC4zLCAxKScgfX0+XHJcbiAgICAgICAgICB7Y3VycmVudE5vZGUudHlwZSA9PT0gJ21pc3Npb24nICYmIChcclxuICAgICAgICAgICAgPE1pc3Npb25CcmllZmluZ1NwcmVhZCBcclxuICAgICAgICAgICAgICBkYXRhPXtjdXJyZW50Tm9kZX0gXHJcbiAgICAgICAgICAgICAgb25Db250aW51ZT17aGFuZGxlTWlzc2lvbkFjY2VwdH0gXHJcbiAgICAgICAgICAgICAgb25CYWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudEZsb3dJbmRleCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgc2V0Q3VycmVudEZsb3dJbmRleChwcmV2ID0+IHByZXYgLSAxKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHNldFNob3dJbnRyb1NwcmVhZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9fSBcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIHtjdXJyZW50Tm9kZS50eXBlID09PSAnZGVicmllZicgJiYgKFxyXG4gICAgICAgICAgICA8Q2hpZWZEZXRlY3RpdmUgXHJcbiAgICAgICAgICAgICAgbW9kZT1cImRlYnJpZWZcIiBcclxuICAgICAgICAgICAgICBkYXRhPXtjdXJyZW50Tm9kZX0gXHJcbiAgICAgICAgICAgICAgb25Db250aW51ZT17aGFuZGxlRGVicmllZkNvbnRpbnVlfSBcclxuICAgICAgICAgICAgICBvbkJhY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Rmxvd0luZGV4ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICBzZXRDdXJyZW50Rmxvd0luZGV4KHByZXYgPT4gcHJldiAtIDEpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgc2V0U2hvd0ludHJvU3ByZWFkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICB7Y3VycmVudE5vZGUudHlwZSA9PT0gJ2FjdGl2aXR5JyAmJiAoXHJcbiAgICAgICAgICAgIFsncXVpeicsICdzdW1tYXJ5J10uaW5jbHVkZXMoY3VycmVudE5vZGUuaWQpID8gKFxyXG4gICAgICAgICAgICAgIDxjdXJyZW50Tm9kZS5jb21wb25lbnQgXHJcbiAgICAgICAgICAgICAgICBrZXk9e2Ake2N1cnJlbnROb2RlLmlkfS0ke3Jlc2V0S2V5fWB9XHJcbiAgICAgICAgICAgICAgICB7Li4uKGN1cnJlbnROb2RlLnByb3BzIHx8IHt9KX0gXHJcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlPXtoYW5kbGVTdGFnZUNvbXBsZXRlfSBcclxuICAgICAgICAgICAgICAgIGFkZFhwPXthZGRYcH0gXHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgKSA6IHNob3dIYW5kYm9vayA/IChcclxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZsZXg6IDEsIG1pbkhlaWdodDogMCwgcGFkZGluZzogJzEuNXJlbScsIGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIHdpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnLCBib3hTaXppbmc6ICdib3JkZXItYm94JyB9fT5cclxuICAgICAgICAgICAgICAgIDxJbnZlc3RpZ2F0aW9uSGFuZGJvb2sgXHJcbiAgICAgICAgICAgICAgICAgIHJlZj17aGFuZGJvb2tSZWZ9XHJcbiAgICAgICAgICAgICAgICAgIGhpZ2hlc3RVbmxvY2tlZEluZGV4PXtoaWdoZXN0VW5sb2NrZWRJbmRleH0gXHJcbiAgICAgICAgICAgICAgICAgIGN1cnJlbnRGbG93SW5kZXg9e2N1cnJlbnRGbG93SW5kZXh9IFxyXG4gICAgICAgICAgICAgICAgICBzdGFnZUNvbXBsZXRlZD17c3RhZ2VDb21wbGV0ZWR9IFxyXG4gICAgICAgICAgICAgICAgICBvbk5leHQ9eygpID0+IHNldFNob3dIYW5kYm9vayhmYWxzZSl9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZmxleDogMSwgbWluSGVpZ2h0OiAwLCBwb3NpdGlvbjogJ3JlbGF0aXZlJywgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgb3ZlcmZsb3dZOiAnYXV0bycsIHBhZGRpbmc6ICcxLjVyZW0nLCB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6ICcxMDAlJywgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcgfX0+XHJcbiAgICAgICAgICAgICAgICA8Y3VycmVudE5vZGUuY29tcG9uZW50IFxyXG4gICAgICAgICAgICAgICAgICBrZXk9e2Ake2N1cnJlbnROb2RlLmlkfS0ke3Jlc2V0S2V5fWB9XHJcbiAgICAgICAgICAgICAgICAgIHsuLi4oY3VycmVudE5vZGUucHJvcHMgfHwge30pfSBcclxuICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZT17aGFuZGxlU3RhZ2VDb21wbGV0ZX0gXHJcbiAgICAgICAgICAgICAgICAgIGFkZFhwPXthZGRYcH0gXHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgIHtjdXJyZW50Tm9kZS50eXBlID09PSAnaGFuZGJvb2snICYmICgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5leHROb2RlID0gY2hhcHRlckZsb3dbY3VycmVudEZsb3dJbmRleCArIDFdO1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdyZWxhdGl2ZScsIGZsZXg6IDEsIGRpc3BsYXk6ICdmbGV4JyB9fT5cclxuICAgICAgICAgICAgICAgIHtuZXh0Tm9kZSAmJiBuZXh0Tm9kZS50eXBlID09PSAnYWN0aXZpdHknICYmIChcclxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiAwLCBsZWZ0OiAwLCByaWdodDogMCwgYm90dG9tOiAwLCBwb2ludGVyRXZlbnRzOiAnbm9uZScsIG92ZXJmbG93OiAnaGlkZGVuJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnLCBmaWx0ZXI6ICdibHVyKDEycHgpJywgdHJhbnNmb3JtOiAnc2NhbGUoMS4wNSknIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPG5leHROb2RlLmNvbXBvbmVudCB7Li4uKG5leHROb2RlLnByb3BzIHx8IHt9KX0gYWRkWHA9eygpPT57fX0gb25Db21wbGV0ZT17KCk9Pnt9fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOiAncmVsYXRpdmUnLCB6SW5kZXg6IDEwLCBmbGV4OiAxLCBkaXNwbGF5OiAnZmxleCcsIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC40KScgfX0+XHJcbiAgICAgICAgICAgICAgICAgIDxJbnZlc3RpZ2F0aW9uSGFuZGJvb2sgcmVmPXtoYW5kYm9va1JlZn0gZGF0YT17Y3VycmVudE5vZGV9IG9uQ29tcGxldGU9e2hhbmRsZU5leHR9IC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pKCl9XHJcblxyXG4gICAgICAgICAge2N1cnJlbnROb2RlLnR5cGUgPT09ICdjaGVja3BvaW50JyAmJiAoXHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZmxleDogMSwgZGlzcGxheTogJ2ZsZXgnLCBiYWNrZ3JvdW5kOiAndmFyKC0tYmctY29sb3IpJywgb3ZlcmZsb3c6ICdoaWRkZW4nIH19PlxyXG4gICAgICAgICAgICAgIDxEZXRlY3RpdmVDaGVja3BvaW50IGtleT17YCR7Y3VycmVudE5vZGUuaWR9LSR7cmVzZXRLZXl9YH0gZGF0YT17Y3VycmVudE5vZGV9IG9uQ29tcGxldGU9e2hhbmRsZVN0YWdlQ29tcGxldGV9IGFkZFhwPXthZGRYcH0gLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgIHtjdXJyZW50Tm9kZS50eXBlID09PSAnc3VtbWFyeScgJiYgKCgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGxhc3RBY3Rpdml0eU5vZGUgPSBudWxsO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gY3VycmVudEZsb3dJbmRleCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGNoYXB0ZXJGbG93W2ldLnR5cGUgPT09ICdhY3Rpdml0eScpIHtcclxuICAgICAgICAgICAgICAgIGxhc3RBY3Rpdml0eU5vZGUgPSBjaGFwdGVyRmxvd1tpXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdyZWxhdGl2ZScsIGZsZXg6IDEsIGRpc3BsYXk6ICdmbGV4JyB9fT5cclxuICAgICAgICAgICAgICAgIHtsYXN0QWN0aXZpdHlOb2RlICYmIChcclxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiAwLCBsZWZ0OiAwLCByaWdodDogMCwgYm90dG9tOiAwLCBwb2ludGVyRXZlbnRzOiAnbm9uZScsIG92ZXJmbG93OiAnaGlkZGVuJyB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnLCBmaWx0ZXI6ICdibHVyKDEycHgpJywgdHJhbnNmb3JtOiAnc2NhbGUoMS4wNSknIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGxhc3RBY3Rpdml0eU5vZGUuY29tcG9uZW50IHsuLi4obGFzdEFjdGl2aXR5Tm9kZS5wcm9wcyB8fCB7fSl9IGFkZFhwPXsoKT0+e319IG9uQ29tcGxldGU9eygpPT57fX0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjogJ3JlbGF0aXZlJywgekluZGV4OiAxMCwgZmxleDogMSwgZGlzcGxheTogJ2ZsZXgnLCBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsIDAsIDAsIDAuNCknIH19PlxyXG4gICAgICAgICAgICAgICAgICA8RXZpZGVuY2VTdW1tYXJ5IGRhdGE9e2N1cnJlbnROb2RlfSBvbkNvbXBsZXRlPXtoYW5kbGVEZWJyaWVmQ29udGludWV9IC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pKCl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgey8qIOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkFxyXG4gICAgICAgICAgR0xPQkFMIEJPVFRPTSBBQ1RJT04gQkFSXHJcbiAgICAgICAgICDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZAgKi99XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ2xvYmFsLWFjdGlvbi1iYXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdsb2JhbC1hY3Rpb24tYmFyLWxlZnRcIj5cclxuICAgICAgICAgIDxidXR0b24gXHJcbiAgICAgICAgICAgIG9uQ2xpY2s9e29uQmFja1RvRGFzaGJvYXJkfSBcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwib3V0bGluZVwiIFxyXG4gICAgICAgICAgICBzdHlsZT17eyBwYWRkaW5nOiAnMC44NXJlbSAxLjZyZW0nLCBmb250U2l6ZTogJzEuNDVyZW0nLCBmb250V2VpZ2h0OiAnYm9sZCcsIGdhcDogJzAuNzVyZW0nLCBib3JkZXJSYWRpdXM6ICcxMHB4JywgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8QXJyb3dMZWZ0IHNpemU9ezI0fSAvPiBEYXNoYm9hcmRcclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG5cclxuICAgICAgICAgIDxidXR0b24gXHJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICBpZiAoY3VycmVudE5vZGUuaWQgPT09ICdzcG9ydHNiYWxsJykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJldkluZGV4ID0gY2hhcHRlckZsb3cuZmluZEluZGV4KG5vZGUgPT4gbm9kZS5pZCA9PT0gJ3N0YWdlNScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByZXZJbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgc2V0U2hvd0hhbmRib29rKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgc2V0Q3VycmVudEZsb3dJbmRleChwcmV2SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBpZiAoY3VycmVudE5vZGUuaWQgPT09ICdzdGFnZTUnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcmV2SW5kZXggPSBjaGFwdGVyRmxvdy5maW5kSW5kZXgobm9kZSA9PiBub2RlLmlkID09PSAnc3RhZ2UzX21hdGVyaWFsJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJldkluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICBzZXRTaG93SGFuZGJvb2soZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICBzZXRDdXJyZW50Rmxvd0luZGV4KHByZXZJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIGlmIChjdXJyZW50Tm9kZS5pZCA9PT0gJ3N0YWdlM19tYXRlcmlhbCcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByZXZJbmRleCA9IGNoYXB0ZXJGbG93LmZpbmRJbmRleChub2RlID0+IG5vZGUuaWQgPT09ICdzdGFnZTNfdXNlJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJldkluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICBzZXRTaG93SGFuZGJvb2soZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICBzZXRDdXJyZW50Rmxvd0luZGV4KHByZXZJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIGlmIChjdXJyZW50Tm9kZS5pZCA9PT0gJ3N0YWdlMicpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByZXZJbmRleCA9IGNoYXB0ZXJGbG93LmZpbmRJbmRleChub2RlID0+IG5vZGUudGl0bGUgPT09ICdQaGFzZSAyOiBJZGVudGlmaWNhdGlvbicpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByZXZJbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgc2V0U2hvd0hhbmRib29rKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgc2V0Q3VycmVudEZsb3dJbmRleChwcmV2SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBpZiAoY3VycmVudE5vZGUuaWQgPT09ICdzdGFnZTdfYScpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByZXZJbmRleCA9IGN1cnJlbnRGbG93SW5kZXggLSAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByZXZJbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgIHNldFNob3dIYW5kYm9vayh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgc2V0Q3VycmVudEZsb3dJbmRleChwcmV2SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBpZiAoY3VycmVudE5vZGUuaWQgPT09ICdzdGFnZTdfYicpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByZXZJbmRleCA9IGNoYXB0ZXJGbG93LmZpbmRJbmRleChub2RlID0+IG5vZGUuaWQgPT09ICdzdGFnZTdfYScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByZXZJbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgc2V0U2hvd0hhbmRib29rKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgc2V0Q3VycmVudEZsb3dJbmRleChwcmV2SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBpZiAoY3VycmVudE5vZGUuaWQgPT09ICdzdGFnZThfYScpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByZXZJbmRleCA9IGN1cnJlbnRGbG93SW5kZXggLSAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByZXZJbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgIHNldFNob3dIYW5kYm9vayhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgIHNldEN1cnJlbnRGbG93SW5kZXgocHJldkluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgaWYgKGN1cnJlbnROb2RlLmlkID09PSAnc3RhZ2U4X2InIHx8IGN1cnJlbnROb2RlLmlkID09PSAnc3RhZ2U4X2MnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcmV2SW5kZXggPSBjdXJyZW50Rmxvd0luZGV4IC0gMTtcclxuICAgICAgICAgICAgICAgIGlmIChwcmV2SW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICBzZXRTaG93SGFuZGJvb2soZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICBzZXRDdXJyZW50Rmxvd0luZGV4KHByZXZJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIGlmICghc2hvd0hhbmRib29rICYmIGN1cnJlbnROb2RlLnR5cGUgPT09ICdhY3Rpdml0eScgJiYgIVsnc3RhZ2U4X2InLCAnc3RhZ2U4X2MnLCAnc3RhZ2UzX3VzZScsICdzdGFnZTRfMScsICdzdGFnZTRfMicsICdzdGFnZTRfNCcsICdzdGFnZTRfNScsICdzdGFnZTZfYSddLmluY2x1ZGVzKGN1cnJlbnROb2RlLmlkKSkge1xyXG4gICAgICAgICAgICAgICAgc2V0U2hvd0hhbmRib29rKHRydWUpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudEZsb3dJbmRleCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByZXZJbmRleCA9IGN1cnJlbnRGbG93SW5kZXggLSAxO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJldk5vZGUgPSBjaGFwdGVyRmxvd1twcmV2SW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByZXZOb2RlICYmIHByZXZOb2RlLnR5cGUgPT09ICdtaXNzaW9uJykge1xyXG4gICAgICAgICAgICAgICAgICBzZXRTaG93SGFuZGJvb2sodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBzZXRTaG93SGFuZGJvb2soZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2V0Q3VycmVudEZsb3dJbmRleChwcmV2SW5kZXgpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZXRTaG93SW50cm9TcHJlYWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJvdXRsaW5lXCJcclxuICAgICAgICAgICAgc3R5bGU9e3sgcGFkZGluZzogJzAuODVyZW0gMS42cmVtJywgZm9udFNpemU6ICcxLjQ1cmVtJywgZm9udFdlaWdodDogJ2JvbGQnLCBnYXA6ICcwLjc1cmVtJywgYm9yZGVyUmFkaXVzOiAnMTBweCcsIGNvbG9yOiAndmFyKC0tdGV4dC1wcmltYXJ5KScsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicgfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPEFycm93TGVmdCBzaXplPXsyNH0gLz4gQmFja1xyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ2xvYmFsLWFjdGlvbi1iYXItY2VudGVyXCI+XHJcbiAgICAgICAgICB7LyogU2NpZW5jZSBEZXRlY3RpdmUgcmVtb3ZlZCBhcyByZXF1ZXN0ZWQgKi99XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJnbG9iYWwtYWN0aW9uLWJhci1yaWdodFwiPlxyXG4gICAgICAgICAgPGJ1dHRvbiBcclxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgIHNldFJlc2V0S2V5KHByZXYgPT4gcHJldiArIDEpO1xyXG4gICAgICAgICAgICAgIHNldFN0YWdlQ29tcGxldGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwib3V0bGluZVwiXHJcbiAgICAgICAgICAgIHN0eWxlPXt7IHBhZGRpbmc6ICcwLjg1cmVtIDEuNnJlbScsIGZvbnRTaXplOiAnMS40NXJlbScsIGZvbnRXZWlnaHQ6ICdib2xkJywgZ2FwOiAnMC43NXJlbScsIGJvcmRlclJhZGl1czogJzEwcHgnLCBjb2xvcjogJ3ZhcigtLWRhbmdlciknLCBib3JkZXJDb2xvcjogJ3ZhcigtLWRhbmdlci1ib3JkZXIpJywgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJyB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8UmVmcmVzaEN3IHNpemU9ezIyfSAvPiBSZXNldCBBY3Rpdml0eVxyXG4gICAgICAgICAgPC9idXR0b24+XHJcblxyXG4gICAgICAgICAgeyhjdXJyZW50Tm9kZS50eXBlID09PSAnYWN0aXZpdHknIHx8IGN1cnJlbnROb2RlLnR5cGUgPT09ICdjaGVja3BvaW50JykgJiYgKFxyXG4gICAgICAgICAgICA8YnV0dG9uIFxyXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzSGFuZGJvb2tBY3RpdmUgPSBzaG93SGFuZGJvb2sgJiYgIVsnc3RhZ2U4X2InLCAnc3RhZ2U4X2MnLCAnc3RhZ2UzX3VzZScsICdzdGFnZTRfMScsICdzdGFnZTRfMicsICdzdGFnZTRfNCcsICdzdGFnZTRfNScsICdzdGFnZTZfYSddLmluY2x1ZGVzKGN1cnJlbnROb2RlLmlkKTtcclxuICAgICAgICAgICAgICAgIGlmICgoaXNIYW5kYm9va0FjdGl2ZSB8fCBjdXJyZW50Tm9kZS50eXBlID09PSAnaGFuZGJvb2snKSAmJiBoYW5kYm9va1JlZi5jdXJyZW50ICYmIGhhbmRib29rUmVmLmN1cnJlbnQuaGFuZGxlR2xvYmFsTmV4dCkge1xyXG4gICAgICAgICAgICAgICAgICBjb25zdCBoYXNNb3JlID0gaGFuZGJvb2tSZWYuY3VycmVudC5oYW5kbGVHbG9iYWxOZXh0KCk7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChoYXNNb3JlKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNIYW5kYm9va0FjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICBzZXRTaG93SGFuZGJvb2soZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgaGFuZGxlTmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9eyhzaG93SGFuZGJvb2sgJiYgIVsnc3RhZ2U4X2InLCAnc3RhZ2U4X2MnLCAnc3RhZ2UzX3VzZScsICdzdGFnZTRfMScsICdzdGFnZTRfMicsICdzdGFnZTRfNCcsICdzdGFnZTRfNScsICdzdGFnZTZfYSddLmluY2x1ZGVzKGN1cnJlbnROb2RlLmlkKSkgPyBmYWxzZSA6ICEoc3RhZ2VDb21wbGV0ZWQgfHwgY3VycmVudE5vZGUuaWQgPT09ICdzdGFnZTInKX1cclxuICAgICAgICAgICAgICBjbGFzc05hbWU9eygoc2hvd0hhbmRib29rICYmICFbJ3N0YWdlOF9iJywgJ3N0YWdlOF9jJywgJ3N0YWdlM191c2UnLCAnc3RhZ2U0XzEnLCAnc3RhZ2U0XzInLCAnc3RhZ2U0XzQnLCAnc3RhZ2U0XzUnLCAnc3RhZ2U2X2EnXS5pbmNsdWRlcyhjdXJyZW50Tm9kZS5pZCkpIHx8IHN0YWdlQ29tcGxldGVkIHx8IGN1cnJlbnROb2RlLmlkID09PSAnc3RhZ2UyJykgPyAncHJpbWFyeScgOiAnb3V0bGluZSd9XHJcbiAgICAgICAgICAgICAgc3R5bGU9e3sgXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMC44NXJlbSAxLjhyZW0nLCBcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMS41cmVtJywgXHJcbiAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgICAgICBnYXA6ICcwLjc1cmVtJywgXHJcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxMHB4JyxcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6ICgoc2hvd0hhbmRib29rICYmICFbJ3N0YWdlOF9iJywgJ3N0YWdlOF9jJywgJ3N0YWdlM191c2UnLCAnc3RhZ2U0XzEnLCAnc3RhZ2U0XzInLCAnc3RhZ2U0XzQnLCAnc3RhZ2U0XzUnLCAnc3RhZ2U2X2EnXS5pbmNsdWRlcyhjdXJyZW50Tm9kZS5pZCkpIHx8IHN0YWdlQ29tcGxldGVkIHx8IGN1cnJlbnROb2RlLmlkID09PSAnc3RhZ2UyJykgPyAxIDogMC41LFxyXG4gICAgICAgICAgICAgICAgY3Vyc29yOiAoKHNob3dIYW5kYm9vayAmJiAhWydzdGFnZThfYicsICdzdGFnZThfYycsICdzdGFnZTNfdXNlJywgJ3N0YWdlNF8xJywgJ3N0YWdlNF8yJywgJ3N0YWdlNF80JywgJ3N0YWdlNF81JywgJ3N0YWdlNl9hJ10uaW5jbHVkZXMoY3VycmVudE5vZGUuaWQpKSB8fCBzdGFnZUNvbXBsZXRlZCB8fCBjdXJyZW50Tm9kZS5pZCA9PT0gJ3N0YWdlMicpID8gJ3BvaW50ZXInIDogJ25vdC1hbGxvd2VkJyxcclxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb246ICdhbGwgMC4zcycsXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJ1xyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICBQcm9jZWVkIHRvIG5leHQgPEFycm93UmlnaHQgc2l6ZT17MjZ9IC8+XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgICl9XHJcbiAgPC8+XHJcbiAgKTtcclxufVxyXG5cclxuTWF0ZXJpYWxzQXJvdW5kVXNBY3Rpdml0eS5wcm9wVHlwZXMgPSB7XHJcbiAgb25CYWNrVG9EYXNoYm9hcmQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcclxufTtcclxuIl19