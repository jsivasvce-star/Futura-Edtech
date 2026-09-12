import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import React, { useState, useRef } from "react";
import { ArrowLeft, RefreshCw, Sun, Moon, ArrowRight } from "lucide-react";
import "./theme.css";
import { useTheme } from "../../../../ThemeContext.jsx";
import { chapterFlow } from "./storyEngine";
import ChiefDetective from "./components/ChiefDetective/ChiefDetective";
import InvestigationHandbook from "./components/Educational/InvestigationHandbook";
import DetectiveCheckpoint from "./components/Educational/DetectiveCheckpoint";
import EvidenceSummary from "./components/Educational/EvidenceSummary";
import ChapterCover from "./components/Educational/ChapterCover";
import ChapterIntroSpread from "./components/Educational/ChapterIntroSpread";
import MissionBriefingSpread from "./components/Educational/MissionBriefingSpread";
import FullscreenButton from "./components/Common/FullscreenButton";
const timelineTree = (() => {
  const tree = [];
  let currentBarrier = null;
  let currentStage = null;
  chapterFlow.forEach((node, index) => {
    const item = { ...node, originalIndex: index };
    let barrierId = null;
    if (node.title.includes("Barrier 1") || node.title.includes("Stage 6.1")) barrierId = "Barrier 6.1";
    else if (node.title.includes("Barrier 2") || node.title.includes("Stage 6.2")) barrierId = "Barrier 6.2";
    else if (node.title.includes("Barrier 3") || node.title.includes("Stage 6.3")) barrierId = "Barrier 6.3";
    else if (node.title.includes("Barrier 4") || node.title.includes("Do You Know?") || node.title.includes("Concept Map")) barrierId = "Barrier 6.4";
    else barrierId = "Final Wrap-up";
    if (!currentBarrier || currentBarrier.id !== barrierId) {
      currentBarrier = { id: barrierId, title: barrierId, type: "barrier", children: [] };
      tree.push(currentBarrier);
      currentStage = null;
    }
    if (barrierId === "Barrier 6.3") {
      const stageMatch = node.title.match(/(Stage 6\.3\.\d+)/);
      if (stageMatch) {
        const stageName = stageMatch[1];
        if (!currentStage || currentStage.id !== stageName) {
          currentStage = { id: stageName, title: stageName, type: "stage", children: [] };
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
  const handbookRef = useRef(null);
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
  const toggleNode = (id) => setExpandedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
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
  const { theme, toggleTheme } = useTheme();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(FullscreenButton, {}),
    showCover ? /* @__PURE__ */ jsx(ChapterCover, { onOpenBook: () => {
      setShowCover(false);
      setShowIntroSpread(true);
    }, onBack: onBackToDashboard }) : showIntroSpread ? /* @__PURE__ */ jsx(ChapterIntroSpread, { onContinue: () => setShowIntroSpread(false), onBack: () => {
      setShowIntroSpread(false);
      setShowCover(true);
    } }) : /* @__PURE__ */ jsxs("div", { className: "activity-workspace materials-around-us-theme", style: { paddingTop: 0, paddingBottom: "72px", background: "linear-gradient(135deg, #F5EFE6 0%, #EDE4D3 40%, #F0E8D8 70%, #E8DDCC 100%)" }, children: [
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", flex: 1, overflow: "hidden", position: "relative" }, children: [
        /* @__PURE__ */ jsx(
          "button",
          {
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
            children: /* @__PURE__ */ jsx(ArrowRight, { size: 16, style: { transform: isTimelineOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" } })
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
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
            children: /* @__PURE__ */ jsxs("div", { style: { width: "320px", padding: "1.5rem", display: "flex", flexDirection: "column", height: "100%" }, children: [
              /* @__PURE__ */ jsx("h3", { style: { margin: "0 0 1.5rem 0", fontSize: "0.9rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }, children: "Investigation Progress" }),
              /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: "0.5rem", overflowY: "auto", paddingRight: "0.5rem" }, children: (() => {
                const renderTimelineItem = (item, indentLevel = 0) => {
                  const idx = item.originalIndex;
                  const isActive = currentFlowIndex === idx || item.type === "mission" && currentFlowIndex > idx && chapterFlow[currentFlowIndex].type === "activity" && chapterFlow.findIndex((n, i) => i > idx && n.type !== "activity") > currentFlowIndex;
                  const isLocked = idx > highestUnlockedIndex;
                  const isPast = idx <= highestUnlockedIndex && !isActive;
                  let icon = "\u{1F3AF}";
                  if (item.type === "activity") icon = "\u{1F9EA}";
                  if (item.type === "debrief" || item.type === "summary") icon = "\u{1F4DD}";
                  if (item.type === "handbook") icon = "\u{1F4D6}";
                  if (item.type === "checkpoint") icon = "\u2705";
                  return /* @__PURE__ */ jsxs(
                    "button",
                    {
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
                        opacity: isLocked ? 0.4 : 1,
                        cursor: isLocked ? "not-allowed" : "pointer",
                        textAlign: "left"
                      },
                      children: [
                        /* @__PURE__ */ jsx("span", { style: { fontSize: "1.2rem", flexShrink: 0 }, children: icon }),
                        /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "0.2rem", minWidth: 0 }, children: [
                          /* @__PURE__ */ jsx("span", { style: { fontSize: "0.85rem", fontWeight: isActive ? "bold" : 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: item.title }),
                          /* @__PURE__ */ jsx("span", { style: { fontSize: "0.7rem", color: "var(--text-muted)" }, children: item.type === "mission" ? "Mission Briefing" : item.type === "activity" ? item.subtitle : "Evidence Review" })
                        ] })
                      ]
                    },
                    `item-${idx}`
                  );
                };
                const renderTimelineGroup = (group, indentLevel = 0) => {
                  const isExpanded = expandedNodes[group.id];
                  const getFirstIndex = (node) => {
                    if (node.originalIndex !== void 0) return node.originalIndex;
                    if (node.children && node.children.length > 0) return getFirstIndex(node.children[0]);
                    return 999;
                  };
                  const firstIndex = getFirstIndex(group);
                  const isLocked = firstIndex > highestUnlockedIndex;
                  return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "0.25rem" }, children: [
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
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
                          opacity: isLocked ? 0.6 : 1
                        },
                        children: [
                          /* @__PURE__ */ jsx("span", { style: { fontSize: "0.9rem", flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: group.title }),
                          /* @__PURE__ */ jsx("span", { style: { fontSize: "0.8rem", transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s", color: "var(--text-muted)" }, children: "\u25B6" })
                        ]
                      }
                    ),
                    isExpanded && !isLocked && /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: "0.25rem", marginTop: "0.25rem" }, children: group.children.map((child) => {
                      if (child.type === "stage" || child.type === "barrier") {
                        return renderTimelineGroup(child, indentLevel + 0.5);
                      } else {
                        return renderTimelineItem(child, indentLevel + 0.5);
                      }
                    }) })
                  ] }, group.id);
                };
                return timelineTree.map((group) => renderTimelineGroup(group, 0));
              })() })
            ] })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "activity-content", style: { flex: 1, minHeight: 0, display: "flex", flexDirection: "column", position: "relative", overflowY: currentNode.type === "activity" ? "hidden" : "auto" }, children: [
          currentNode.type === "mission" && /* @__PURE__ */ jsx(
            MissionBriefingSpread,
            {
              data: currentNode,
              onContinue: handleMissionAccept,
              onBack: () => {
                if (currentFlowIndex > 0) {
                  setCurrentFlowIndex((prev) => prev - 1);
                } else {
                  setShowIntroSpread(true);
                }
              }
            }
          ),
          currentNode.type === "debrief" && /* @__PURE__ */ jsx(
            ChiefDetective,
            {
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
            }
          ),
          currentNode.type === "activity" && (["quiz", "summary"].includes(currentNode.id) ? /* @__PURE__ */ jsx(
            currentNode.component,
            {
              ...currentNode.props || {},
              onComplete: handleStageComplete,
              addXp
            },
            `${currentNode.id}-${resetKey}`
          ) : showHandbook ? /* @__PURE__ */ jsx("div", { style: { flex: 1, minHeight: 0, padding: 0, display: "flex", flexDirection: "column", width: "100%", height: "100%", boxSizing: "border-box" }, children: /* @__PURE__ */ jsx(
            InvestigationHandbook,
            {
              ref: handbookRef,
              highestUnlockedIndex,
              currentFlowIndex,
              stageCompleted,
              onNext: () => setShowHandbook(false)
            }
          ) }) : /* @__PURE__ */ jsx("div", { style: { flex: 1, minHeight: 0, position: "relative", display: "flex", flexDirection: "column", overflowY: "auto", padding: "1.5rem", width: "100%", height: "100%", boxSizing: "border-box" }, children: /* @__PURE__ */ jsx(
            currentNode.component,
            {
              ...currentNode.props || {},
              onComplete: handleStageComplete,
              addXp
            },
            `${currentNode.id}-${resetKey}`
          ) })),
          currentNode.type === "handbook" && (() => {
            const nextNode = chapterFlow[currentFlowIndex + 1];
            return /* @__PURE__ */ jsxs("div", { style: { position: "relative", flex: 1, display: "flex" }, children: [
              nextNode && nextNode.type === "activity" && /* @__PURE__ */ jsx("div", { style: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", overflow: "hidden" }, children: /* @__PURE__ */ jsx("div", { style: { width: "100%", height: "100%", filter: "blur(12px)", transform: "scale(1.05)" }, children: /* @__PURE__ */ jsx(nextNode.component, { ...nextNode.props || {}, addXp: () => {
              }, onComplete: () => {
              } }) }) }),
              /* @__PURE__ */ jsx("div", { style: { position: "relative", zIndex: 10, flex: 1, display: "flex", backgroundColor: "rgba(0, 0, 0, 0.4)" }, children: /* @__PURE__ */ jsx(InvestigationHandbook, { data: currentNode, onComplete: handleNext }) })
            ] });
          })(),
          currentNode.type === "checkpoint" && /* @__PURE__ */ jsx("div", { style: { flex: 1, display: "flex", background: "var(--bg-color)", overflow: "hidden" }, children: /* @__PURE__ */ jsx(DetectiveCheckpoint, { data: currentNode, onComplete: handleStageComplete, addXp }, `${currentNode.id}-${resetKey}`) }),
          currentNode.type === "summary" && (() => {
            let lastActivityNode = null;
            for (let i = currentFlowIndex - 1; i >= 0; i--) {
              if (chapterFlow[i].type === "activity") {
                lastActivityNode = chapterFlow[i];
                break;
              }
            }
            return /* @__PURE__ */ jsxs("div", { style: { position: "relative", flex: 1, display: "flex" }, children: [
              lastActivityNode && /* @__PURE__ */ jsx("div", { style: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", overflow: "hidden" }, children: /* @__PURE__ */ jsx("div", { style: { width: "100%", height: "100%", filter: "blur(12px)", transform: "scale(1.05)" }, children: /* @__PURE__ */ jsx(lastActivityNode.component, { ...lastActivityNode.props || {}, addXp: () => {
              }, onComplete: () => {
              } }) }) }),
              /* @__PURE__ */ jsx("div", { style: { position: "relative", zIndex: 10, flex: 1, display: "flex", backgroundColor: "rgba(0, 0, 0, 0.4)" }, children: /* @__PURE__ */ jsx(EvidenceSummary, { data: currentNode, onComplete: handleDebriefContinue }) })
            ] });
          })()
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "global-action-bar", children: [
        /* @__PURE__ */ jsxs("div", { className: "global-action-bar-left", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: onBackToDashboard,
              className: "outline",
              style: { padding: "0.85rem 1.6rem", fontSize: "1.45rem", fontWeight: "bold", gap: "0.75rem", borderRadius: "10px", display: "flex", alignItems: "center" },
              children: [
                /* @__PURE__ */ jsx(ArrowLeft, { size: 24 }),
                " Dashboard"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                if (!showHandbook && currentNode.type === "activity" && currentNode.id === "stage1") {
                  setShowHandbook(true);
                } else if (currentFlowIndex > 0) {
                  const prevIndex = currentFlowIndex - 1;
                  const prevNode = chapterFlow[prevIndex];
                  if (prevNode && prevNode.type === "mission" && prevNode.title.includes("Barrier 1")) {
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
              style: { padding: "0.85rem 1.6rem", fontSize: "1.45rem", fontWeight: "bold", gap: "0.75rem", borderRadius: "10px", color: "var(--text-primary)", display: "flex", alignItems: "center" },
              children: [
                /* @__PURE__ */ jsx(ArrowLeft, { size: 24 }),
                " Back"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "global-action-bar-center" }),
        /* @__PURE__ */ jsxs("div", { className: "global-action-bar-right", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => {
                setResetKey((prev) => prev + 1);
                setStageCompleted(false);
              },
              className: "outline",
              style: { padding: "0.85rem 1.6rem", fontSize: "1.45rem", fontWeight: "bold", gap: "0.75rem", borderRadius: "10px", color: "var(--danger)", borderColor: "var(--danger-border)", display: "flex", alignItems: "center" },
              children: [
                /* @__PURE__ */ jsx(RefreshCw, { size: 22 }),
                " Reset Activity"
              ]
            }
          ),
          (currentNode.type === "activity" || currentNode.type === "checkpoint") && /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: showHandbook && !["stage8_b", "stage8_c", "stage3_use", "stage4_1", "stage4_2", "stage4_4", "stage4_5", "stage6_a"].includes(currentNode.id) ? () => {
                if (handbookRef.current && handbookRef.current.handleGlobalNext) {
                  const shouldClose = handbookRef.current.handleGlobalNext();
                  if (shouldClose) setShowHandbook(false);
                } else {
                  setShowHandbook(false);
                }
              } : handleNext,
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
              children: [
                "Proceed to next ",
                /* @__PURE__ */ jsx(ArrowRight, { size: 26 })
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}
