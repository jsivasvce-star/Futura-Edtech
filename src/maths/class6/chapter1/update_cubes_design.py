import re

path = 'c:/futurax/Futura-Edtech/src/maths/class6/chapter1/VisualisingSequences.jsx'
with open(path, 'r', encoding='utf-8') as f:
    code = f.read()

replacement = """const VisualizerCube = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={5} connectorLabel={(i,pic)=>`+${pic*pic*pic - (pic-1)*(pic-1)*(pic-1)}`} connectorColor="#fb7185" bottomValues={['1','8','27','64','125','?']}
    renderShapes={(pic) => {
      const cubes = [];
      const sizes = [0, 22, 14, 10, 8, 6.5];
      const S = sizes[pic];
      const dx = S * Math.sqrt(3) / 2;
      const dy = S / 2;
      
      const layerColors = [
        { top: '#c084fc', left: '#a855f7', right: '#9333ea' }, // Purple
        { top: '#5eead4', left: '#2dd4bf', right: '#14b8a6' }, // Teal
        { top: '#fbcfe8', left: '#f472b6', right: '#db2777' }, // Pink
        { top: '#fde047', left: '#facc15', right: '#eab308' }, // Yellow
        { top: '#bfdbfe', left: '#60a5fa', right: '#3b82f6' }  // Blue
      ];
      
      for (let z=0; z<pic; z++) {
        for (let x=0; x<pic; x++) {
          for (let y=0; y<pic; y++) {
            const cx = (y - x) * dx;
            const cy = (x + y) * dy - z * S;
            
            const pTop = `0,${-S} ${dx},${-dy} 0,0 ${-dx},${-dy}`;
            const pRight = `${dx},${-dy} ${dx},${dy} 0,${S} 0,0`;
            const pLeft = `0,0 0,${S} ${-dx},${dy} ${-dx},${-dy}`;
            
            const cols = layerColors[z];
            // Layer by layer animation delay
            const animDelay = z * 0.4 + (x + y) * 0.03;
            
            cubes.push(
              <motion.g key={`${x}-${y}-${z}`} initial={{scale:0, opacity:0}} animate={{scale:1, opacity:1}} transition={{delay: animDelay}} transform={`translate(${cx}, ${cy})`}>
                <polygon points={pTop} fill={cols.top} fillOpacity="0.85" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
                <polygon points={pLeft} fill={cols.left} fillOpacity="0.85" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
                <polygon points={pRight} fill={cols.right} fillOpacity="0.85" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
              </motion.g>
            );
          }
        }
      }
      return <g>{cubes}</g>;
    }} />
);"""

# Locate existing VisualizerCube block
pattern = r'const VisualizerCube = \(\{ step, playStep, showHint \}\) => \([\s\S]*?\}\} />\s*\);'

new_code = re.sub(pattern, replacement, code)

with open(path, 'w', encoding='utf-8') as f:
    f.write(new_code)

print("Updated cubes design and animation.")
