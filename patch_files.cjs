const fs = require('fs');

function patch(file, search1, repl1, search2, repl2) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(search1, repl1);
  content = content.replace(search2, repl2);
  fs.writeFileSync(file, content);
}

const dir = 'C:/Users/GANES/Futura-Edtech/src/science/class6/chapter2/version2/';

patch(dir + 'VirtualBiodiversityExplorer/index.jsx',
  /export default function VirtualBiodiversityExplorer\(\{\s*onBackToDashboard,\s*onNextActivity,\s*typeFilter = 'plant',\s*initialSubPage = 1\s*\}\) \{/,
  "export default function VirtualBiodiversityExplorer({ onBackToDashboard, onNextActivity, typeFilter = 'plant', initialSubPage = 1, onStateChange }) {",
  /const \[subPage, setSubPage\] = useState\(initialSubPage\); \/\/ 1 = Her\/Shr\/Tree, 2 = Field Scanner/,
  "const [subPage, setSubPage] = useState(initialSubPage); // 1 = Her/Shr/Tree, 2 = Field Scanner\n  useEffect(() => { if (onStateChange) onStateChange(subPage); }, [subPage, onStateChange]);"
);

patch(dir + 'InlineSortingActivity/index.jsx',
  /export default function InlineSortingActivity\(\{ onBackToDashboard, onGoToDetective, onBackToDetective, onNextActivity, initialPhase = 'specimens', initialSpecimenIndex = 0 \}\) \{/,
  "export default function InlineSortingActivity({ onBackToDashboard, onGoToDetective, onBackToDetective, onNextActivity, initialPhase = 'specimens', initialSpecimenIndex = 0, onStateChange }) {",
  /const \[specimenIndex, setSpecimenIndex\] = useState\(initialSpecimenIndex\);/,
  "const [specimenIndex, setSpecimenIndex] = useState(initialSpecimenIndex);\n  useEffect(() => { if (onStateChange) onStateChange(phase, specimenIndex); }, [phase, specimenIndex, onStateChange]);"
);

patch(dir + 'PlantDetective/index.jsx',
  /export default function PlantDetectiveActivity\(\{ onBackToDashboard, onNextActivity \}\) \{/,
  "export default function PlantDetectiveActivity({ onBackToDashboard, onNextActivity, initialPhase = 'intro', initialSpecimenIndex = 0, onStateChange }) {",
  /const \[currentPhase, setCurrentPhase\] = useState\('intro'\); \/\/ 'intro', 'specimens', 'table', 'completion'\n\s*const \[currentSpecimenIndex, setCurrentSpecimenIndex\] = useState\(0\);/,
  "const [currentPhase, setCurrentPhase] = useState(initialPhase); // 'intro', 'specimens', 'table', 'completion'\n  const [currentSpecimenIndex, setCurrentSpecimenIndex] = useState(initialSpecimenIndex);\n  useEffect(() => { if (onStateChange) onStateChange(currentPhase, currentSpecimenIndex); }, [currentPhase, currentSpecimenIndex, onStateChange]);"
);

patch(dir + 'LeafVenationLab/index.jsx',
  /export default function LeafVenationLab\(\{ onBackToDashboard, onPreviousPage, onNext, initialPhase = 'cover', initialSpecimenIndex = 0 \}\) \{/,
  "export default function LeafVenationLab({ onBackToDashboard, onPreviousPage, onNext, initialPhase = 'cover', initialSpecimenIndex = 0, onStateChange }) {",
  /const \[specimenIndex, setSpecimenIndex\] = useState\(initialSpecimenIndex\);/,
  "const [specimenIndex, setSpecimenIndex] = useState(initialSpecimenIndex);\n  useEffect(() => { if (onStateChange) onStateChange(phase, specimenIndex); }, [phase, specimenIndex, onStateChange]);"
);

patch(dir + 'RootSystemsLab/index.jsx',
  /export default function RootSystemsLab\(\{ onBackToDashboard, onPreviousPage, onNext, initialSpecimenIndex = 0 \}\) \{/,
  "export default function RootSystemsLab({ onBackToDashboard, onPreviousPage, onNext, initialSpecimenIndex = 0, onStateChange }) {",
  /const \[specimenIndex, setSpecimenIndex\] = useState\(initialSpecimenIndex\);/,
  "const [specimenIndex, setSpecimenIndex] = useState(initialSpecimenIndex);\n  useEffect(() => { if (onStateChange) onStateChange(specimenIndex); }, [specimenIndex, onStateChange]);"
);

patch(dir + 'VenationRootCorrelationLab/index.jsx',
  /export default function VenationRootCorrelationLab\(\{ onBackToDashboard, onPreviousPage, onNext, initialPhase = 'split' \}\) \{/,
  "export default function VenationRootCorrelationLab({ onBackToDashboard, onPreviousPage, onNext, initialPhase = 'split', onStateChange }) {",
  /const \[phase, setPhase\] = useState\(initialPhase\); \/\/ 'split' | 'specimens' | 'lab'/,
  "const [phase, setPhase] = useState(initialPhase); // 'split' | 'specimens' | 'lab'\n  useEffect(() => { if (onStateChange) onStateChange(phase); }, [phase, onStateChange]);"
);

let c = fs.readFileSync(dir + 'Chapter2LearningLab.jsx', 'utf8');

if (!c.includes('const [step6Phase, setStep6Phase]')) {
  c = c.replace(
    /const \[correlationPhase, setCorrelationPhase\] = useState\(\(\) => \{/,
    "const [step6Phase, setStep6Phase] = useState('intro');\n  const [step6SpecimenIndex, setStep6SpecimenIndex] = useState(0);\n  const [correlationPhase, setCorrelationPhase] = useState(() => {"
  );
}

// Remove hardcoded state resets
c = c.replace(/setStep5Phase\('specimens'\);\s*setStep5SpecimenIndex\(8\);/g, '');
c = c.replace(/setRootsSpecimenIndex\(0\);/g, '');
c = c.replace(/setVenationPhase\('specimens'\);\s*setVenationSpecimenIndex\(6\);/g, '');
c = c.replace(/setRootsSpecimenIndex\(6\);/g, '');

c = c.replace(
  /<PlantDetectiveActivity\s+onBackToDashboard/g,
  `<PlantDetectiveActivity \n              initialPhase={step6Phase}\n              initialSpecimenIndex={step6SpecimenIndex}\n              onStateChange={(p, idx) => { setStep6Phase(p); setStep6SpecimenIndex(idx); }}\n              onBackToDashboard`
);

c = c.replace(
  /<InlineSortingActivity \s+initialPhase={step5Phase}/g,
  `<InlineSortingActivity \n              initialPhase={step5Phase}\n              onStateChange={(p, idx) => { setStep5Phase(p); setStep5SpecimenIndex(idx); }}\n`
);

c = c.replace(
  /initialSpecimenIndex={venationSpecimenIndex}\n\s*onBackToDashboard/g,
  `initialSpecimenIndex={venationSpecimenIndex}\n                onStateChange={(p, idx) => { setVenationPhase(p); setVenationSpecimenIndex(idx); }}\n                onBackToDashboard`
);

c = c.replace(
  /initialSpecimenIndex={rootsSpecimenIndex}\n\s*onBackToDashboard/g,
  `initialSpecimenIndex={rootsSpecimenIndex}\n                onStateChange={(idx) => setRootsSpecimenIndex(idx)}\n                onBackToDashboard`
);

c = c.replace(
  /initialPhase={correlationPhase}\n\s*onBackToDashboard/g,
  `initialPhase={correlationPhase}\n                onStateChange={(p) => setCorrelationPhase(p)}\n                onBackToDashboard`
);

c = c.replace(
  /typeFilter='plant'\n\s*initialSubPage={plantExplorerSubPage}\n\s*onBackToDashboard/g,
  `typeFilter='plant'\n              initialSubPage={plantExplorerSubPage}\n              onStateChange={(p) => setPlantExplorerSubPage(p)}\n              onBackToDashboard`
);

fs.writeFileSync(dir + 'Chapter2LearningLab.jsx', c);
console.log('Patched correctly');
