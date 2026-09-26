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

// 2. Helper to replace the onClick logic inside transition overlays
function replaceOverlayButtons(transitionName) {
    const regexContinue = new RegExp(`onClick=\\{\\(\\) => \\{\\s*set${transitionName}\\(false\\);\\s*set${transitionName.replace('IsPlaying', 'Is').replace('Transition', 'TransitionEnded')}\\(false\\);[\\s\\S]*?\\}\\}\\s*(style=\\{[\\s\\S]*?\\}\\s*>\\s*Continue)`, 'g');
    
    const replContinue = `onClick={() => {
                      set${transitionName}(false);
                      set${transitionName.replace('IsPlaying', 'Is').replace('Transition', 'TransitionEnded')}(false);
                      setCurrentStep(transitionTargetStep);
                      if (transitionTargetSubTab) setVenationSubTab(transitionTargetSubTab);
                    }}
                    $1`;
                    
    const regexBack = new RegExp(`onClick=\\{\\(\\) => \\{\\s*set${transitionName}\\(false\\);\\s*set${transitionName.replace('IsPlaying', 'Is').replace('Transition', 'TransitionEnded')}\\(false\\);[\\s\\S]*?\\}\\}\\s*(style=\\{[\\s\\S]*?\\}\\s*>\\s*<ArrowLeft size=\\{20\\} /> Back)`, 'g');
    
    const replBack = `onClick={() => {
                      set${transitionName}(false);
                      set${transitionName.replace('IsPlaying', 'Is').replace('Transition', 'TransitionEnded')}(false);
                      setCurrentStep(transitionSourceStep);
                      if (transitionSourceSubTab) setVenationSubTab(transitionSourceSubTab);
                    }}
                    $1`;

    content = content.replace(regexContinue, replContinue);
    content = content.replace(regexBack, replBack);
}

replaceOverlayButtons('IsPlayingTransition');
replaceOverlayButtons('IsPlayingAct24Transition');
replaceOverlayButtons('IsPlayingAct24ObservationTransition');
replaceOverlayButtons('IsPlayingAct25ObservationTransition');
replaceOverlayButtons('IsPlayingAct26ObservationTransition');
replaceOverlayButtons('IsPlayingAct27ObservationTransition');

// 3. Helper to replace the triggers
function replaceTriggers() {
    // This part is complex because the triggers are spread out. Let's do it manually via regex for handleLabPrev and onNext/onPrevious hooks.
    // Let's replace the whole handleLabPrev function
}

fs.writeFileSync('C:/Users/GANES/Futura-Edtech/refactor_transitions.cjs', content);
