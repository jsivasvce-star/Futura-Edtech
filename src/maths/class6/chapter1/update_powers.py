import re

path = 'c:/futurax/Futura-Edtech/src/maths/class6/chapter1/VisualisingSequences.jsx'
with open(path, 'r', encoding='utf-8') as f:
    code = f.read()

pow2_repl = """const VisualizerPow2 = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={6} connectorLabel={()=>`x2`} connectorColor="#60a5fa" bottomValues={['1','2','4','8','16','?']}
    renderShapes={(pic, i, isFocus) => {
      if (pic === 1) {
        const animState = isFocus ? {opacity:1, scale:1} : {opacity:0, scale:0.5};
        return <motion.circle initial={false} animate={animState} transition={{type: 'spring'}} cx="0" cy="0" r="5" fill="#1d4ed8" />;
      }
      
      const n = Math.pow(2, pic - 2);
      let cols, rows;
      if (pic % 2 === 0) {
        cols = Math.sqrt(n);
        rows = cols;
      } else {
        cols = Math.sqrt(n / 2);
        rows = cols * 2;
      }
      
      const S = 12;
      const gap = 16;
      const offset = ((cols - 1) * S) / 2 + gap / 2;
      
      const leftDots = [];
      const rightDots = [];
      
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const y = (r - rows / 2 + 0.5) * S;
          const lx = -offset + (c - cols / 2 + 0.5) * S;
          const rx = offset + (c - cols / 2 + 0.5) * S;
          leftDots.push(<circle key={`l-${r}-${c}`} cx={lx} cy={y} r="4.5" fill="#1d4ed8" />);
          rightDots.push(<circle key={`r-${r}-${c}`} cx={rx} cy={y} r="4.5" fill="#60a5fa" />);
        }
      }
      
      const animStateLeft = isFocus ? {opacity:1, scale:1} : {opacity:0, scale:0.5};
      const animStateRight = isFocus ? {opacity:1, scale:1} : {opacity:0, scale:0.5};
      
      return (
        <g>
          <motion.g initial={false} animate={animStateLeft} transition={{type: 'spring', stiffness: 200, damping: 20}}>
            {leftDots}
          </motion.g>
          <motion.g initial={false} animate={animStateRight} transition={{type: 'spring', stiffness: 200, damping: 20, delay: 0.1}}>
            {rightDots}
          </motion.g>
        </g>
      );
    }} />
);"""

pow3_repl = """const VisualizerPow3 = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={6} connectorLabel={()=>`x3`} connectorColor="#4ade80" bottomValues={['1','3','9','27','81','?']}
    renderShapes={(pic, i, isFocus) => {
      if (pic === 1) {
        const animState = isFocus ? {opacity:1, scale:1} : {opacity:0, scale:0.5};
        return <motion.circle initial={false} animate={animState} transition={{type: 'spring'}} cx="0" cy="0" r="4" fill="#15803d" />;
      }
      
      const n = Math.pow(3, pic - 2);
      let cols, rows;
      if (pic % 2 === 0) {
        cols = Math.sqrt(n);
        rows = cols;
      } else {
        cols = Math.sqrt(n / 3);
        rows = cols * 3;
      }
      
      const S = 10;
      const gap = 14;
      const groupWidth = (cols - 1) * S;
      const offset = groupWidth + gap;
      
      const leftDots = [];
      const midDots = [];
      const rightDots = [];
      
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const y = (r - rows / 2 + 0.5) * S;
          const xBase = (c - cols / 2 + 0.5) * S;
          leftDots.push(<circle key={`l-${r}-${c}`} cx={xBase - offset} cy={y} r="3.5" fill="#15803d" />);
          midDots.push(<circle key={`m-${r}-${c}`} cx={xBase} cy={y} r="3.5" fill="#4ade80" />);
          rightDots.push(<circle key={`r-${r}-${c}`} cx={xBase + offset} cy={y} r="3.5" fill="#4ade80" />);
        }
      }
      
      const animStateLeft = isFocus ? {opacity:1, scale:1} : {opacity:0, scale:0.5};
      const animStateNew = isFocus ? {opacity:1, scale:1} : {opacity:0, scale:0.5};
      
      return (
        <g>
          <motion.g initial={false} animate={animStateLeft} transition={{type: 'spring', stiffness: 200, damping: 20}}>
            {leftDots}
          </motion.g>
          <motion.g initial={false} animate={animStateNew} transition={{type: 'spring', stiffness: 200, damping: 20, delay: 0.1}}>
            {midDots}
            {rightDots}
          </motion.g>
        </g>
      );
    }} />
);"""

code = re.sub(r'const VisualizerPow2 = \(\{ step, playStep, showHint \}\) => \([\s\S]*?\}\} />\s*\);', pow2_repl, code)
code = re.sub(r'const VisualizerPow3 = \(\{ step, playStep, showHint \}\) => \([\s\S]*?\}\} />\s*\);', pow3_repl, code)

with open(path, 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated Pow2 and Pow3")
