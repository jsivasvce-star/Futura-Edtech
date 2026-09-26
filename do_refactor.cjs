const fs = require('fs');
const file = 'C:/Users/GANES/Futura-Edtech/src/science/class6/chapter2/version2/Chapter2LearningLab.jsx';
let content = fs.readFileSync(file, 'utf8');

const stateVars = `
  const [transitionTargetStep, setTransitionTargetStep] = useState(null);
  const [transitionTargetSubTab, setTransitionTargetSubTab] = useState(null);
  const [transitionSourceStep, setTransitionSourceStep] = useState(null);
  const [transitionSourceSubTab, setTransitionSourceSubTab] = useState(null);
`;
content = content.replace(/const \[transitionDirection, setTransitionDirection\] = useState\('forward'\);/, `const [transitionDirection, setTransitionDirection] = useState('forward');${stateVars}`);

// First, replace the overlay buttons to use the target/source state blindly.
function replaceOverlayButtons(transitionName) {
    const endName = transitionName.replace('IsPlaying', 'Is').replace('Transition', 'TransitionEnded');
    
    const regexContinue = new RegExp(`onClick=\\{\\(\\) => \\{\\s*set${transitionName}\\(false\\);\\s*set${endName}\\(false\\);[\\s\\S]*?\\}\\}\\s*(style=\\{[\\s\\S]*?\\}\\s*>\\s*(Begin Investigation|Continue).*?</button>)`, 'g');
    
    const replContinue = `onClick={() => {
                      set${transitionName}(false);
                      set${endName}(false);
                      setCurrentStep(transitionTargetStep);
                      if (transitionTargetSubTab) setVenationSubTab(transitionTargetSubTab);
                    }}
                    $1`;
                    
    const regexBack = new RegExp(`onClick=\\{\\(\\) => \\{\\s*set${transitionName}\\(false\\);\\s*set${endName}\\(false\\);[\\s\\S]*?\\}\\}\\s*(style=\\{[\\s\\S]*?\\}\\s*>\\s*<ArrowLeft size=\\{20\\} /> Back\\s*</button>)`, 'g');
    
    const replBack = `onClick={() => {
                      set${transitionName}(false);
                      set${endName}(false);
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

// For transitions, we will use regex to find `setTransitionDirection('...'); \n setIsPlaying...(true);` 
// and inject the target/source setup.
// We must map which transition goes where.
// Act24Transition (Step 4 <-> 5)
// Act24ObservationTransition (Step 5 <-> 6)
// Act25ObservationTransition (Step 6 <-> 7 venation)
// Act26ObservationTransition (Step 7 venation <-> 7 roots)
// Act27ObservationTransition (Step 7 roots <-> 7 correlation)
// Transition (Step 1 <-> 2) - wait, this doesn't have an overlay? Oh wait, it does!

// Let's write a simple replacer for every instance:
function replaceTrigger(regex, replacerFn) {
    content = content.replace(regex, replacerFn);
}

// 1. handleLabNext triggers
content = content.replace(/if \(currentStep === 4\) \{\s*setTransitionDirection\('forward'\);\s*setIsPlayingAct24Transition\(true\);\s*return;\s*\}/, 
`if (currentStep === 4) {
      setTransitionTargetStep(5);
      setTransitionSourceStep(4);
      setTransitionDirection('forward');
      setIsPlayingAct24Transition(true);
      return;
    }`);

content = content.replace(/if \(currentStep === 5\) \{\s*setTransitionDirection\('forward'\);\s*setIsPlayingAct24ObservationTransition\(true\);\s*return;\s*\}/, 
`if (currentStep === 5) {
      setTransitionTargetStep(6);
      setTransitionSourceStep(5);
      setTransitionDirection('forward');
      setIsPlayingAct24ObservationTransition(true);
      return;
    }`);

content = content.replace(/if \(currentStep === 6\) \{\s*setTransitionDirection\('forward'\);\s*setIsPlayingAct25ObservationTransition\(true\);\s*return;\s*\}/, 
`if (currentStep === 6) {
      setTransitionTargetStep(7);
      setTransitionTargetSubTab('venation');
      setTransitionSourceStep(6);
      setTransitionSourceSubTab(null);
      setTransitionDirection('forward');
      setIsPlayingAct25ObservationTransition(true);
      return;
    }`);

content = content.replace(/if \(venationSubTab === 'venation'\) \{\s*setTransitionDirection\('forward'\);\s*setIsPlayingAct26ObservationTransition\(true\);\s*return;\s*\}/, 
`if (venationSubTab === 'venation') {
        setTransitionTargetStep(7);
        setTransitionTargetSubTab('roots');
        setTransitionSourceStep(7);
        setTransitionSourceSubTab('venation');
        setTransitionDirection('forward');
        setIsPlayingAct26ObservationTransition(true);
        return;
      }`);

content = content.replace(/if \(venationSubTab === 'roots'\) \{\s*setCorrelationPhase\('specimens'\);\s*setTransitionDirection\('forward'\);\s*setIsPlayingAct27ObservationTransition\(true\);\s*return;\s*\}/, 
`if (venationSubTab === 'roots') {
        setCorrelationPhase('specimens');
        setTransitionTargetStep(7);
        setTransitionTargetSubTab('correlation');
        setTransitionSourceStep(7);
        setTransitionSourceSubTab('roots');
        setTransitionDirection('forward');
        setIsPlayingAct27ObservationTransition(true);
        return;
      }`);

// 2. handleLabPrev triggers
content = content.replace(/if \(currentStep === 5\) \{\s*setTransitionDirection\('backward'\);\s*setIsPlayingAct24Transition\(true\);\s*return;\s*\}/, 
`if (currentStep === 5) {
      setTransitionTargetStep(4);
      setTransitionSourceStep(5);
      setTransitionDirection('backward');
      setIsPlayingAct24Transition(true);
      return;
    }`);

content = content.replace(/if \(currentStep === 6\) \{\s*setTransitionDirection\('backward'\);\s*setIsPlayingAct24ObservationTransition\(true\);\s*return;\s*\}/, 
`if (currentStep === 6) {
      setTransitionTargetStep(5);
      setTransitionSourceStep(6);
      setTransitionDirection('backward');
      setIsPlayingAct24ObservationTransition(true);
      return;
    }`);

content = content.replace(/if \(venationSubTab === 'correlation'\) \{\s*setTransitionDirection\('backward'\);\s*setIsPlayingAct27ObservationTransition\(true\);\s*return;\s*\}/, 
`if (venationSubTab === 'correlation') {
        setTransitionTargetStep(7);
        setTransitionTargetSubTab('roots');
        setTransitionSourceStep(7);
        setTransitionSourceSubTab('correlation');
        setTransitionDirection('backward');
        setIsPlayingAct27ObservationTransition(true);
        return;
      }`);

content = content.replace(/if \(venationSubTab === 'roots'\) \{\s*setTransitionDirection\('backward'\);\s*setIsPlayingAct26ObservationTransition\(true\);\s*return;\s*\}/, 
`if (venationSubTab === 'roots') {
        setTransitionTargetStep(7);
        setTransitionTargetSubTab('venation');
        setTransitionSourceStep(7);
        setTransitionSourceSubTab('roots');
        setTransitionDirection('backward');
        setIsPlayingAct26ObservationTransition(true);
        return;
      }`);

content = content.replace(/\/\/ Back to Step 6\s*setTransitionDirection\('backward'\);\s*setIsPlayingAct25ObservationTransition\(true\);\s*return;/, 
`// Back to Step 6
      setTransitionTargetStep(6);
      setTransitionTargetSubTab(null);
      setTransitionSourceStep(7);
      setTransitionSourceSubTab('venation');
      setTransitionDirection('backward');
      setIsPlayingAct25ObservationTransition(true);
      return;`);


fs.writeFileSync(file, content);
console.log('Script ran.');
