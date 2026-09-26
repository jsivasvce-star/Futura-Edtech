const fs = require('fs');
const file = 'C:/Users/GANES/Futura-Edtech/src/science/class6/chapter2/version2/Chapter2LearningLab.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/if \(transitionDirection === 'forward'\) \{\s*setCurrentStep\(2\);\s*\} else \{\s*setCurrentStep\(1\);\s*setSection1SubTab\('scenes'\);\s*setIntroInitialScene\(2\);\s*\}/g,
`setCurrentStep(transitionTargetStep);
if (transitionTargetSubTab) setSection1SubTab(transitionTargetSubTab);
if (transitionTargetStep === 1) setIntroInitialScene(2);`);

content = content.replace(/if \(transitionDirection === 'forward'\) \{\s*setCurrentStep\(1\);\s*setSection1SubTab\('scenes'\);\s*setIntroInitialScene\(2\);\s*\} else \{\s*setCurrentStep\(2\);\s*\}/g,
`setCurrentStep(transitionSourceStep);
if (transitionSourceSubTab) setSection1SubTab(transitionSourceSubTab);
if (transitionSourceStep === 1) setIntroInitialScene(2);`);

fs.writeFileSync(file, content);
console.log('Fixed intro transition');
