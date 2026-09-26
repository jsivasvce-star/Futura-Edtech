const fs = require('fs');
let c2 = fs.readFileSync('C:/Users/GANES/Futura-Edtech/src/science/class6/chapter2/version2/Chapter2LearningLab.jsx', 'utf8');

c2 = c2.replace(
  /onEnded=\{\(\) => \{\s*setIsTransitionVideoEnded\(true\);\s*\}\}/g,
  `onEnded={() => {
                        if (transitionDirection === 'backward') {
                          setIsPlayingTransition(false);
                          setCurrentStep(transitionTargetStep);
                          if (transitionTargetStep === 1) {
                            setSection1SubTab('scenes');
                            setIntroInitialScene(6);
                          }
                        } else {
                          setIsTransitionVideoEnded(true);
                        }
                      }}`
);

c2 = c2.replace(
  /onEnded=\{\(\) => \{\s*setIsAct24TransitionEnded\(true\);\s*\}\}/g,
  `onEnded={() => {
                if (transitionDirection === 'backward') {
                  setIsPlayingAct24Transition(false);
                  setCurrentStep(transitionTargetStep);
                  if (transitionTargetSubTab) setVenationSubTab(transitionTargetSubTab);
                } else {
                  setIsAct24TransitionEnded(true);
                }
              }}`
);

c2 = c2.replace(
  /onEnded=\{\(\) => \{\s*setIsAct24ObservationTransitionEnded\(true\);\s*\}\}/g,
  `onEnded={() => {
                if (transitionDirection === 'backward') {
                  setIsPlayingAct24ObservationTransition(false);
                  setCurrentStep(transitionTargetStep);
                  if (transitionTargetSubTab) setVenationSubTab(transitionTargetSubTab);
                } else {
                  setIsAct24ObservationTransitionEnded(true);
                }
              }}`
);

c2 = c2.replace(
  /onEnded=\{\(\) => \{\s*setIsAct25ObservationTransitionEnded\(true\);\s*\}\}/g,
  `onEnded={() => {
                if (transitionDirection === 'backward') {
                  setIsPlayingAct25ObservationTransition(false);
                  setCurrentStep(transitionTargetStep);
                  if (transitionTargetSubTab) setVenationSubTab(transitionTargetSubTab);
                } else {
                  setIsAct25ObservationTransitionEnded(true);
                }
              }}`
);

c2 = c2.replace(
  /onEnded=\{\(\) => \{\s*setIsAct26ObservationTransitionEnded\(true\);\s*\}\}/g,
  `onEnded={() => {
                if (transitionDirection === 'backward') {
                  setIsPlayingAct26ObservationTransition(false);
                  setCurrentStep(transitionTargetStep);
                  if (transitionTargetSubTab) setVenationSubTab(transitionTargetSubTab);
                } else {
                  setIsAct26ObservationTransitionEnded(true);
                }
              }}`
);

c2 = c2.replace(
  /onEnded=\{\(\) => \{\s*setIsAct27ObservationTransitionEnded\(true\);\s*\}\}/g,
  `onEnded={() => {
                if (transitionDirection === 'backward') {
                  setIsPlayingAct27ObservationTransition(false);
                  setCurrentStep(transitionTargetStep);
                  if (transitionTargetSubTab) setVenationSubTab(transitionTargetSubTab);
                } else {
                  setIsAct27ObservationTransitionEnded(true);
                }
              }}`
);

// We must also pass startAtLastPage to VirtualBiodiversityExplorer inside Chapter2LearningLab!
c2 = c2.replace(
  /<VirtualBiodiversityExplorer\s+typeFilter="plant"/g,
  `<VirtualBiodiversityExplorer
              typeFilter="plant"
              startAtLastPage={transitionDirection === 'backward'}`
);
c2 = c2.replace(
  /<VirtualBiodiversityExplorer\s+typeFilter="animal"/g,
  `<VirtualBiodiversityExplorer 
              typeFilter="animal" 
              startAtLastPage={transitionDirection === 'backward'}`
);

fs.writeFileSync('C:/Users/GANES/Futura-Edtech/src/science/class6/chapter2/version2/Chapter2LearningLab.jsx', c2);

// 2. Update VirtualBiodiversityExplorer
let vbe = fs.readFileSync('C:/Users/GANES/Futura-Edtech/src/science/class6/chapter2/version2/VirtualBiodiversityExplorer/index.jsx', 'utf8');
vbe = vbe.replace(
  /export default function VirtualBiodiversityExplorer\(\{\s*onBackToDashboard,\s*typeFilter = 'plant',\s*onNextSection,\s*onNextActivity,\s*isFullscreen = false\s*\}\) \{/g,
  `export default function VirtualBiodiversityExplorer({ onBackToDashboard, typeFilter = 'plant', onNextSection, onNextActivity, isFullscreen = false, startAtLastPage = false }) {`
);

vbe = vbe.replace(
  /const \[subPage, setSubPage\] = useState\(typeFilter === 'animal' \? 2 : 1\);/g,
  `const [subPage, setSubPage] = useState(startAtLastPage ? (typeFilter === 'animal' ? 2 : 3) : (typeFilter === 'animal' ? 2 : 1));`
);

fs.writeFileSync('C:/Users/GANES/Futura-Edtech/src/science/class6/chapter2/version2/VirtualBiodiversityExplorer/index.jsx', vbe);
console.log('Success');
