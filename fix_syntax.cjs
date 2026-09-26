const fs = require('fs');
let file = 'C:/Users/GANES/Futura-Edtech/src/science/class6/chapter2/version2/VenationRootCorrelationLab/index.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /export default function VenationRootCorrelationLab[\s\S]*?const \[specimenIndex, setSpecimenIndex\] = useState\(0\);/;
const repl = `export default function VenationRootCorrelationLab({ onBackToDashboard, onPreviousPage, onNext, initialPhase = 'specimens', onStateChange }) {
  const [phase, setPhase] = useState(initialPhase); // 'specimens' | 'lab'
  useEffect(() => { if (onStateChange) onStateChange(phase); }, [phase, onStateChange]);
  const [specimenIndex, setSpecimenIndex] = useState(0);`;

content = content.replace(regex, repl);
fs.writeFileSync(file, content);
console.log('Fixed syntax error');
