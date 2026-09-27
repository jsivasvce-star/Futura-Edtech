const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/science/class6/chapter2/version2/Chapter2LearningLab.jsx');
let content = fs.readFileSync(file, 'utf8');

// 1. Add transitionDirection state
content = content.replace(
  /const \[isAct27ObservationTransitionEnded, setIsAct27ObservationTransitionEnded\] = useState\(false\);/,
  "const [isAct27ObservationTransitionEnded, setIsAct27ObservationTransitionEnded] = useState(false);\n  const [transitionDirection, setTransitionDirection] = useState('forward');"
);

// 2. handleLabNext forwards
content = content.replace(/setIsPlayingAct24Transition\(true\);/, "setTransitionDirection('forward');\n      setIsPlayingAct24Transition(true);");
content = content.replace(/setIsPlayingAct24ObservationTransition\(true\);/, "setTransitionDirection('forward');\n      setIsPlayingAct24ObservationTransition(true);");
content = content.replace(/setIsPlayingAct25ObservationTransition\(true\);/, "setTransitionDirection('forward');\n      setIsPlayingAct25ObservationTransition(true);");
content = content.replace(/setIsPlayingAct26ObservationTransition\(true\);/, "setTransitionDirection('forward');\n        setIsPlayingAct26ObservationTransition(true);");
content = content.replace(/setIsPlayingAct27ObservationTransition\(true\);/, "setTransitionDirection('forward');\n        setIsPlayingAct27ObservationTransition(true);");

// 3. handleLabPrev backwards (intercepts)
content = content.replace(
  /if \(currentStep === 2\) \{\s*setCurrentStep\(1\);\s*setSection1SubTab\('scenes'\);\s*return;\s*\}/,
  "if (currentStep === 2) {\n      setTransitionDirection('backward');\n      setIsPlayingTransition(true);\n      return;\n    }"
);
content = content.replace(
  /if \(currentStep === 5\) \{\s*setCurrentStep\(4\);\s*return;\s*\}/,
  "if (currentStep === 5) {\n      setTransitionDirection('backward');\n      setIsPlayingAct24Transition(true);\n      return;\n    }"
);
content = content.replace(
  /if \(currentStep === 6\) \{\s*setCurrentStep\(5\);\s*return;\s*\}/,
  "if (currentStep === 6) {\n      setTransitionDirection('backward');\n      setIsPlayingAct24ObservationTransition(true);\n      return;\n    }"
);
content = content.replace(
  /if \(venationSubTab === 'correlation'\) \{\s*setVenationSubTab\('roots'\);\s*return;\s*\}/,
  "if (venationSubTab === 'correlation') {\n        setTransitionDirection('backward');\n        setIsPlayingAct27ObservationTransition(true);\n        return;\n      }"
);
content = content.replace(
  /if \(venationSubTab === 'roots'\) \{\s*setVenationSubTab\('venation'\);\s*return;\s*\}/,
  "if (venationSubTab === 'roots') {\n        setTransitionDirection('backward');\n        setIsPlayingAct26ObservationTransition(true);\n        return;\n      }"
);
content = content.replace(
  /\/\/ Back to Step 6\s*setCurrentStep\(6\);\s*return;/,
  "// Back to Step 6\n      setTransitionDirection('backward');\n      setIsPlayingAct25ObservationTransition(true);\n      return;"
);
// Remove hard resets from handleLabPrev
content = content.replace(/\/\/ Reset all transition states when navigating backward\s*setIsPlayingTransition\(false\);\s*setIsTransitionVideoEnded\(false\);\s*setIsPlayingAct24Transition\(false\);\s*setIsAct24TransitionEnded\(false\);\s*setIsPlayingAct24ObservationTransition\(false\);\s*setIsAct24ObservationTransitionEnded\(false\);\s*setIsPlayingAct25ObservationTransition\(false\);\s*setIsAct25ObservationTransitionEnded\(false\);\s*setIsPlayingAct26ObservationTransition\(false\);\s*setIsAct26ObservationTransitionEnded\(false\);\s*setIsPlayingAct27ObservationTransition\(false\);\s*setIsAct27ObservationTransitionEnded\(false\);\s*/, '');

// 4. Update the transition UI overlays "Next" buttons (and IntroStoryteller onComplete)
content = content.replace(
  /onComplete=\{\(\) => setIsPlayingTransition\(true\)\}/,
  "onComplete={() => {\n                      setTransitionDirection('forward');\n                      setIsPlayingTransition(true);\n                    }}"
);

// isPlayingTransition Next button
content = content.replace(
  /onClick=\{\(\) => \{\s*setIsPlayingTransition\(false\);\s*setIsTransitionVideoEnded\(false\);\s*setCurrentStep\(2\);\s*\}\}/,
  "onClick={() => {\n                      setIsPlayingTransition(false);\n                      setIsTransitionVideoEnded(false);\n                      if (transitionDirection === 'forward') {\n                        setCurrentStep(2);\n                      } else {\n                        setCurrentStep(1);\n                        setSection1SubTab('scenes');\n                        setIntroInitialScene(6);\n                      }\n                    }}"
);

// isPlayingAct24Transition Next button
content = content.replace(
  /onClick=\{\(\) => \{\s*setIsPlayingAct24Transition\(false\);\s*setIsAct24TransitionEnded\(false\);\s*setCurrentStep\(5\);\s*\}\}/,
  "onClick={() => {\n                      setIsPlayingAct24Transition(false);\n                      setIsAct24TransitionEnded(false);\n                      if (transitionDirection === 'forward') {\n                        setCurrentStep(5);\n                      } else {\n                        setCurrentStep(4);\n                      }\n                    }}"
);

// isPlayingAct24ObservationTransition Next button
content = content.replace(
  /onClick=\{\(\) => \{\s*setIsPlayingAct24ObservationTransition\(false\);\s*setIsAct24ObservationTransitionEnded\(false\);\s*setCurrentStep\(6\);\s*\}\}/,
  "onClick={() => {\n                      setIsPlayingAct24ObservationTransition(false);\n                      setIsAct24ObservationTransitionEnded(false);\n                      if (transitionDirection === 'forward') {\n                        setCurrentStep(6);\n                      } else {\n                        setStep5Phase('specimens');\n                        setStep5SpecimenIndex(8);\n                        setCurrentStep(5);\n                      }\n                    }}"
);

// isPlayingAct25ObservationTransition Next button
content = content.replace(
  /onClick=\{\(\) => \{\s*setIsPlayingAct25ObservationTransition\(false\);\s*setIsAct25ObservationTransitionEnded\(false\);\s*setCurrentStep\(7\);\s*\}\}/,
  "onClick={() => {\n                      setIsPlayingAct25ObservationTransition(false);\n                      setIsAct25ObservationTransitionEnded(false);\n                      if (transitionDirection === 'forward') {\n                        setCurrentStep(7);\n                      } else {\n                        setCurrentStep(6);\n                      }\n                    }}"
);

// isPlayingAct26ObservationTransition Next button
content = content.replace(
  /onClick=\{\(\) => \{\s*setIsPlayingAct26ObservationTransition\(false\);\s*setIsAct26ObservationTransitionEnded\(false\);\s*\/\/ Back goes to Leaf Venation Lab\s*setCurrentStep\(7\);\s*setVenationSubTab\('roots'\);\s*\}\}/,
  "onClick={() => {\n                      setIsPlayingAct26ObservationTransition(false);\n                      setIsAct26ObservationTransitionEnded(false);\n                      if (transitionDirection === 'forward') {\n                        setCurrentStep(7); \n                        setVenationSubTab('roots');\n                      } else {\n                        setVenationPhase('specimens');\n                        setVenationSpecimenIndex(6);\n                        setCurrentStep(7);\n                        setVenationSubTab('venation');\n                      }\n                    }}"
);

// isPlayingAct27ObservationTransition Next button
content = content.replace(
  /onClick=\{\(\) => \{\s*setIsPlayingAct27ObservationTransition\(false\);\s*setIsAct27ObservationTransitionEnded\(false\);\s*\/\/ Back goes to Root Systems Lab\s*setCurrentStep\(7\);\s*setVenationSubTab\('correlation'\);\s*\}\}/,
  "onClick={() => {\n                      setIsPlayingAct27ObservationTransition(false);\n                      setIsAct27ObservationTransitionEnded(false);\n                      if (transitionDirection === 'forward') {\n                        setCurrentStep(7); \n                        setVenationSubTab('correlation');\n                      } else {\n                        setRootsSpecimenIndex(6);\n                        setCurrentStep(7);\n                        setVenationSubTab('roots');\n                      }\n                    }}"
);

// 5. Internal Component props

// VirtualBiodiversityExplorer (Step 2)
content = content.replace(
  /onBackToDashboard=\{\(\) => \{\s*setCurrentStep\(1\);\s*setSection1SubTab\('scenes'\);\s*setIntroInitialScene\(6\);\s*\}\}/,
  "onBackToDashboard={() => {\n                setTransitionDirection('backward');\n                setIsPlayingTransition(true);\n              }}"
);

// AppreciatingBiodiversityActivity (Step 4)
// -> forward transition 
content = content.replace(
  /onNextActivity=\{\(\) => \{\s*setIsPlayingAct24Transition\(true\);\s*\}\}/,
  "onNextActivity={() => {\n                setTransitionDirection('forward');\n                setIsPlayingAct24Transition(true);\n              }}"
);

// InlineSortingActivity (Step 5)
content = content.replace(
  /onBackToDashboard=\{\(\) => setCurrentStep\(4\)\}/,
  "onBackToDashboard={() => {\n                setTransitionDirection('backward');\n                setIsPlayingAct24Transition(true);\n              }}"
);
content = content.replace(
  /onNextActivity=\{\(\) => \{\s*setIsPlayingAct24ObservationTransition\(true\);\s*\}\}/,
  "onNextActivity={() => {\n                setTransitionDirection('forward');\n                setIsPlayingAct24ObservationTransition(true);\n              }}"
);

// PlantDetectiveActivity (Step 6)
content = content.replace(
  /onBackToDashboard=\{\(\) => \{\s*setStep5Phase\('specimens'\);\s*setStep5SpecimenIndex\(8\);\s*\/\/ Specimen 09 .*?\s*setCurrentStep\(5\);\s*\}\}/,
  "onBackToDashboard={() => {\n                setTransitionDirection('backward');\n                setIsPlayingAct24ObservationTransition(true);\n              }}"
);
content = content.replace(
  /onNextActivity=\{\(\) => setIsPlayingAct25ObservationTransition\(true\)\}/,
  "onNextActivity={() => {\n                setTransitionDirection('forward');\n                setIsPlayingAct25ObservationTransition(true);\n              }}"
);

// LeafVenationLab (Step 7)
content = content.replace(
  /onBackToDashboard=\{\(\) => setCurrentStep\(6\)\}/,
  "onBackToDashboard={() => {\n                  setTransitionDirection('backward');\n                  setIsPlayingAct25ObservationTransition(true);\n                }}"
);
content = content.replace(
  /onPreviousPage=\{\(\) => setCurrentStep\(6\)\}/,
  "onPreviousPage={() => {\n                  setTransitionDirection('backward');\n                  setIsPlayingAct25ObservationTransition(true);\n                }}"
);
content = content.replace(
  /onNext=\{\(\) => \{\s*setRootsSpecimenIndex\(0\);\s*setIsPlayingAct26ObservationTransition\(true\);\s*\}\}/,
  "onNext={() => {\n                  setTransitionDirection('forward');\n                  setRootsSpecimenIndex(0);\n                  setIsPlayingAct26ObservationTransition(true);\n                }}"
);

// RootSystemsLab (Step 7)
content = content.replace(
  /onBackToDashboard=\{\(\) => setCurrentStep\(6\)\}/g,
  "onBackToDashboard={() => {\n                  setTransitionDirection('backward');\n                  setIsPlayingAct25ObservationTransition(true);\n                }}"
);
content = content.replace(
  /onPreviousPage=\{\(\) => \{\s*setVenationPhase\('specimens'\);\s*setVenationSpecimenIndex\(6\);\s*setVenationSubTab\('venation'\);\s*\}\}/,
  "onPreviousPage={() => {\n                  setTransitionDirection('backward');\n                  setIsPlayingAct26ObservationTransition(true);\n                }}"
);
content = content.replace(
  /onNext=\{\(\) => \{\s*setCorrelationPhase\('specimens'\);\s*setIsPlayingAct27ObservationTransition\(true\);\s*\}\}/,
  "onNext={() => {\n                  setTransitionDirection('forward');\n                  setCorrelationPhase('specimens');\n                  setIsPlayingAct27ObservationTransition(true);\n                }}"
);

// VenationRootCorrelationLab (Step 7)
content = content.replace(
  /onPreviousPage=\{\(\) => \{\s*setRootsSpecimenIndex\(6\);\s*setVenationSubTab\('roots'\);\s*\}\}/,
  "onPreviousPage={() => {\n                  setTransitionDirection('backward');\n                  setIsPlayingAct27ObservationTransition(true);\n                }}"
);

fs.writeFileSync(file, content);
console.log('Done replacing.');
