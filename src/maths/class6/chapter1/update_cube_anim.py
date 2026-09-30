import re

path = 'c:/futurax/Futura-Edtech/src/maths/class6/chapter1/VisualisingSequences.jsx'
with open(path, 'r', encoding='utf-8') as f:
    code = f.read()

replacement = """const VisualizerCube = ({ step, playStep, showHint }) => {
  const [separate, setSeparate] = useState(false);
  
  const toggleControls = (
    <div style={{display: 'flex', gap: '8px', background: 'rgba(15,23,42,0.8)', padding: '4px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)'}}>
      <button onClick={() => setSeparate(false)} style={{padding: '6px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: !separate ? 'rgba(255,255,255,0.15)' : 'transparent', color: !separate ? '#fff' : '#94a3b8', fontWeight: '600'}}>Solid cubes</button>
      <button onClick={() => setSeparate(true)} style={{padding: '6px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: separate ? 'rgba(255,255,255,0.15)' : 'transparent', color: separate ? '#fff' : '#94a3b8', fontWeight: '600'}}>Separate layers</button>
    </div>
  );

  return (
    <BoxVisualizer step={step} playStep={playStep} showHint={showHint} hideArrows={true} extraControls={toggleControls} numPictures={6} connectorLabel={(i,pic)=>`+${pic*pic*pic - (pic-1)*(pic-1)*(pic-1)}`} connectorColor="#fb7185" bottomValues={['1','8','27','64','125','?']}
      renderShapes={(pic) => {
        const layers = [];
        const sizes = [0, 26, 18, 14, 11.5, 10, 8.5];
        const S = sizes[pic];
        const dx = S * Math.sqrt(3) / 2;
        const dy = S / 2;
        const gap = separate ? S * 0.8 : 0;
        
        const layerColors = [
          { top: '#c084fc', left: '#a855f7', right: '#9333ea' },
          { top: '#5eead4', left: '#2dd4bf', right: '#14b8a6' },
          { top: '#fbcfe8', left: '#f472b6', right: '#db2777' },
          { top: '#fde047', left: '#facc15', right: '#eab308' },
          { top: '#bfdbfe', left: '#60a5fa', right: '#3b82f6' },
          { top: '#fca5a5', left: '#f87171', right: '#ef4444' }
        ];
        
        for (let z=0; z<pic; z++) {
          const cubesInLayer = [];
          for (let x=0; x<pic; x++) {
            for (let y=0; y<pic; y++) {
              const cx = (y - x) * dx;
              const cy = (x + y) * dy - z * S - z * gap + (pic * gap) / 2;
              
              const pTop = `0,${-S} ${dx},${-dy} 0,0 ${-dx},${-dy}`;
              const pRight = `${dx},${-dy} ${dx},${dy} 0,${S} 0,0`;
              const pLeft = `0,0 0,${S} ${-dx},${dy} ${-dx},${-dy}`;
              
              const cols = layerColors[z];
              
              cubesInLayer.push(
                <g key={`${x}-${y}`} transform={`translate(${cx}, ${cy})`}>
                  <polygon points={pTop} fill={cols.top} stroke="rgba(0,0,0,0.3)" strokeWidth="0.8" />
                  <polygon points={pLeft} fill={cols.left} stroke="rgba(0,0,0,0.3)" strokeWidth="0.8" />
                  <polygon points={pRight} fill={cols.right} stroke="rgba(0,0,0,0.3)" strokeWidth="0.8" />
                </g>
              );
            }
          }
          
          const animDelay = z * 0.07;
          layers.push(
            <motion.g key={`layer-${z}`} initial={{opacity:0, y: -40, scale: 0.95}} animate={{opacity:1, y: 0, scale: 1}} transition={{delay: animDelay, type: 'spring', stiffness: 200, damping: 20}}>
              {cubesInLayer}
            </motion.g>
          );
        }
        return <g>{layers}</g>;
      }} />
  );
};"""

pattern = r'const VisualizerCube = \(\{ step, playStep, showHint \}\) => \{[\s\S]*?\}\} />\s*\);\s*\};'

new_code = re.sub(pattern, replacement, code)

with open(path, 'w', encoding='utf-8') as f:
    f.write(new_code)

print("Updated cubes drop-in animation.")
