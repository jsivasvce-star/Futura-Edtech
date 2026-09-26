const fs = require('fs');
const file = 'C:/Users/GANES/Futura-Edtech/src/science/class6/chapter2/version2/Chapter2LearningLab.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add state variables
const stateVars = `
  const [transitionTargetStep, setTransitionTargetStep] = useState(null);
  const [transitionTargetSubTab, setTransitionTargetSubTab] = useState(null);
  const [transitionSourceStep, setTransitionSourceStep] = useState(null);
  const [transitionSourceSubTab, setTransitionSourceSubTab] = useState(null);
`;
content = content.replace(/const \[transitionDirection, setTransitionDirection\] = useState\('forward'\);/, `const [transitionDirection, setTransitionDirection] = useState('forward');${stateVars}`);

// 2. Replace overlay logic.
// There are exactly 5 transitions with overlays (Act24, Act24Observation, Act25Observation, Act26Observation, Act27Observation).
// The first one (Transition) has no overlay? Wait, let's check.
// I will just find all the onClick handlers in the overlays.
// I can just replace `if (transitionDirection === 'forward') { ... } else { ... }` inside the onClick handlers!

// For Act 2.4 Transition Overlay:
content = content.replace(/if \(transitionDirection === 'forward'\) \{\s*setCurrentStep\(4\);\s*\} else \{\s*setCurrentStep\(5\);\s*\}/g,
`setCurrentStep(transitionSourceStep);
if (transitionSourceSubTab) setVenationSubTab(transitionSourceSubTab);`);

content = content.replace(/if \(transitionDirection === 'forward'\) \{\s*setCurrentStep\(5\);\s*\} else \{\s*setCurrentStep\(4\);\s*\}/g,
`setCurrentStep(transitionTargetStep);
if (transitionTargetSubTab) setVenationSubTab(transitionTargetSubTab);`);

// For Act 2.4 Observation Transition Overlay:
content = content.replace(/if \(transitionDirection === 'forward'\) \{\s*setCurrentStep\(5\);\s*\} else \{\s*setCurrentStep\(6\);\s*\}/g,
`setCurrentStep(transitionSourceStep);
if (transitionSourceSubTab) setVenationSubTab(transitionSourceSubTab);`);

content = content.replace(/if \(transitionDirection === 'forward'\) \{\s*setCurrentStep\(6\);\s*\} else \{\s*setCurrentStep\(5\);\s*\}/g,
`setCurrentStep(transitionTargetStep);
if (transitionTargetSubTab) setVenationSubTab(transitionTargetSubTab);`);

// For Act 2.5 Observation Transition Overlay:
content = content.replace(/if \(transitionDirection === 'forward'\) \{\s*setCurrentStep\(6\);\s*\} else \{\s*setCurrentStep\(7\);\s*setVenationSubTab\('venation'\);\s*\}/g,
`setCurrentStep(transitionSourceStep);
if (transitionSourceSubTab) setVenationSubTab(transitionSourceSubTab);`);

content = content.replace(/if \(transitionDirection === 'forward'\) \{\s*setCurrentStep\(7\);\s*setVenationSubTab\('venation'\);\s*\} else \{\s*setCurrentStep\(6\);\s*\}/g,
`setCurrentStep(transitionTargetStep);
if (transitionTargetSubTab) setVenationSubTab(transitionTargetSubTab);`);

// For Act 2.6 Observation Transition Overlay:
content = content.replace(/if \(transitionDirection === 'forward'\) \{\s*setCurrentStep\(7\);\s*setVenationSubTab\('venation'\);\s*\} else \{\s*setCurrentStep\(7\);\s*setVenationSubTab\('roots'\);\s*\}/g,
`setCurrentStep(transitionSourceStep);
if (transitionSourceSubTab) setVenationSubTab(transitionSourceSubTab);`);

content = content.replace(/if \(transitionDirection === 'forward'\) \{\s*setCurrentStep\(7\);\s*setVenationSubTab\('roots'\);\s*\} else \{\s*setCurrentStep\(7\);\s*setVenationSubTab\('venation'\);\s*\}/g,
`setCurrentStep(transitionTargetStep);
if (transitionTargetSubTab) setVenationSubTab(transitionTargetSubTab);`);

// For Act 2.7 Observation Transition Overlay:
content = content.replace(/if \(transitionDirection === 'forward'\) \{\s*setCurrentStep\(7\);\s*setVenationSubTab\('roots'\);\s*\} else \{\s*setCurrentStep\(7\);\s*setVenationSubTab\('correlation'\);\s*\}/g,
`setCurrentStep(transitionSourceStep);
if (transitionSourceSubTab) setVenationSubTab(transitionSourceSubTab);`);

content = content.replace(/if \(transitionDirection === 'forward'\) \{\s*setCurrentStep\(7\);\s*setVenationSubTab\('correlation'\);\s*\} else \{\s*setCurrentStep\(7\);\s*setVenationSubTab\('roots'\);\s*\}/g,
`setCurrentStep(transitionTargetStep);
if (transitionTargetSubTab) setVenationSubTab(transitionTargetSubTab);`);


// 3. Now replace all triggers.
// We will write a helper function that takes `setTransitionDirection(dir); \n setIsPlaying...(true);` 
// and prepends `setTransitionTargetStep(t); setTransitionTargetSubTab(ts); setTransitionSourceStep(s); setTransitionSourceSubTab(ss);`

// Wait, the triggers are called from different places. It's safer to just replace them by matching the exact line.
// But some of them don't have newlines between them (e.g. inline triggers).
// So let's match `setTransitionDirection\('([a-z]+)'\);\s*setIsPlaying([a-zA-Z0-9]+)Transition\(true\);`

// Since we know the exact step mappings for each transition:
/*
Transition:
- backward: target 1, source 2 (from step 2 back)
- forward: target 2, source 1 (from step 1 next)

Act24Transition:
- backward: target 4, source 5 (from step 5 back)
- forward: target 5, source 4 (from step 4 next)

Act24ObservationTransition:
- backward: target 5, source 6 (from step 6 back)
- forward: target 6, source 5 (from step 5 next)

Act25ObservationTransition:
- backward: target 6, source 7(venation)
- forward: target 7(venation), source 6

Act26ObservationTransition:
- backward: target 7(venation), source 7(roots)
- forward: target 7(roots), source 7(venation)

Act27ObservationTransition:
- backward: target 7(roots), source 7(correlation)
- forward: target 7(correlation), source 7(roots)
*/

const transitionMap = {
    'Transition': {
        forward: { targetStep: 2, targetSubTab: null, sourceStep: 1, sourceSubTab: null },
        backward: { targetStep: 1, targetSubTab: null, sourceStep: 2, sourceSubTab: null }
    },
    'Act24Transition': {
        forward: { targetStep: 5, targetSubTab: null, sourceStep: 4, sourceSubTab: null },
        backward: { targetStep: 4, targetSubTab: null, sourceStep: 5, sourceSubTab: null }
    },
    'Act24ObservationTransition': {
        forward: { targetStep: 6, targetSubTab: null, sourceStep: 5, sourceSubTab: null },
        backward: { targetStep: 5, targetSubTab: null, sourceStep: 6, sourceSubTab: null }
    },
    'Act25ObservationTransition': {
        forward: { targetStep: 7, targetSubTab: "'venation'", sourceStep: 6, sourceSubTab: null },
        backward: { targetStep: 6, targetSubTab: null, sourceStep: 7, sourceSubTab: "'venation'" }
    },
    'Act26ObservationTransition': {
        forward: { targetStep: 7, targetSubTab: "'roots'", sourceStep: 7, sourceSubTab: "'venation'" },
        backward: { targetStep: 7, targetSubTab: "'venation'", sourceStep: 7, sourceSubTab: "'roots'" }
    },
    'Act27ObservationTransition': {
        forward: { targetStep: 7, targetSubTab: "'correlation'", sourceStep: 7, sourceSubTab: "'roots'" },
        backward: { targetStep: 7, targetSubTab: "'roots'", sourceStep: 7, sourceSubTab: "'correlation'" }
    }
};

content = content.replace(/setTransitionDirection\('([a-z]+)'\);\s*setIsPlaying([a-zA-Z0-9]+)Transition\(true\);/g, (match, dir, trans) => {
    const fullTransName = trans + 'Transition';
    if (!transitionMap[fullTransName]) return match; // Fallback for unknown
    const map = transitionMap[fullTransName][dir];
    if (!map) return match; // Fallback
    
    return `setTransitionTargetStep(${map.targetStep});
                setTransitionTargetSubTab(${map.targetSubTab});
                setTransitionSourceStep(${map.sourceStep});
                setTransitionSourceSubTab(${map.sourceSubTab});
                setTransitionDirection('${dir}');
                setIsPlaying${fullTransName}(true);`;
});

// One Edge Case: 'Transition' (for Act 1->2) has setIsPlayingTransition(true) without a specific name.
content = content.replace(/setTransitionDirection\('([a-z]+)'\);\s*setIsPlayingTransition\(true\);/g, (match, dir) => {
    const map = transitionMap['Transition'][dir];
    if (!map) return match;
    
    return `setTransitionTargetStep(${map.targetStep});
                setTransitionTargetSubTab(${map.targetSubTab});
                setTransitionSourceStep(${map.sourceStep});
                setTransitionSourceSubTab(${map.sourceSubTab});
                setTransitionDirection('${dir}');
                setIsPlayingTransition(true);`;
});


fs.writeFileSync(file, content);
console.log('Refactored correctly.');
