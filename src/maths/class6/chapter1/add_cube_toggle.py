import re

path = 'c:/futurax/Futura-Edtech/src/maths/class6/chapter1/VisualisingSequences.jsx'
with open(path, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update BoxVisualizer to include extraControls
pattern_box = r'const BoxVisualizer = \(\{ step, playStep, numPictures, renderShapes, bottomValues, connectorLabel, connectorColor, showHint \}\) => \{\s*return \(\s*<svg viewBox="0 0 1100 320" className="seq-svg">'
repl_box = """const BoxVisualizer = ({ step, playStep, numPictures, renderShapes, bottomValues, connectorLabel, connectorColor, showHint, extraControls }) => {
  return (
    <div style={{position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {extraControls && <div style={{position: 'absolute', top: -30, zIndex: 10}}>{extraControls}</div>}
      <svg viewBox="0 0 1100 320" className="seq-svg">"""
code = re.sub(pattern_box, repl_box, code)

# Close the div at the end of BoxVisualizer
pattern_box_end = r'</svg>\s*\);\s*\};'
repl_box_end = """</svg>\n    </div>\n  );\n};"""
code = re.sub(pattern_box_end, repl_box_end, code)

# 2. Update VisualizerCube
pattern_cube = r'const VisualizerCube = \(\{ step, playStep, showHint \}\) => \([\s\S]*?\}\} />\s*\);'

repl_cube = """const VisualizerCube = ({ step, playStep, showHint }) => {
  const [separate, setSeparate] = useState(false);
  
  const toggleControls = (
    <div style={{display: 'flex', gap: '8px', background: 'rgba(15,23,42,0.8)', padding: '4px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)'}}>
      <button onClick={() => setSeparate(false)} style={{padding: '6px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: !separate ? 'rgba(255,255,255,0.15)' : 'transparent', color: !separate ? '#fff' : '#94a3b8', fontWeight: '600'}}>Solid cubes</button>
      <button onClick={() => setSeparate(true)} style={{padding: '6px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: separate ? 'rgba(255,255,255,0.15)' : 'transparent', color: separate ? '#fff' : '#94a3b8', fontWeight: '600'}}>Separate layers</button>
    </div>
  );

  return (
    <BoxVisualizer step={step} playStep={playStep} showHint={showHint} extraControls={toggleControls} numPictures={5} connectorLabel={(i,pic)=>`+${pic*pic*pic - (pic-1)*(pic-1)*(pic-1)}`} connectorColor="#fb7185" bottomValues={['1','8','27','64','125','?']}
      renderShapes={(pic) => {
        const cubes = [];
        const sizes = [0, 26, 18, 14, 11.5, 10];
        const S = sizes[pic];
        const dx = S * Math.sqrt(3) / 2;
        const dy = S / 2;
        const gap = separate ? S * 0.8 : 0;
        
        const layerColors = [
          { top: '#c084fc', left: '#a855f7', right: '#9333ea' },
          { top: '#5eead4', left: '#2dd4bf', right: '#14b8a6' },
          { top: '#fbcfe8', left: '#f472b6', right: '#db2777' },
          { top: '#fde047', left: '#facc15', right: '#eab308' },
          { top: '#bfdbfe', left: '#60a5fa', right: '#3b82f6' }
        ];
        
        for (let z=0; z<pic; z++) {
          for (let x=0; x<pic; x++) {
            for (let y=0; y<pic; y++) {
              const cx = (y - x) * dx;
              const cy = (x + y) * dy - z * S - z * gap + (pic * gap) / 2;
              
              const pTop = `0,${-S} ${dx},${-dy} 0,0 ${-dx},${-dy}`;
              const pRight = `${dx},${-dy} ${dx},${dy} 0,${S} 0,0`;
              const pLeft = `0,0 0,${S} ${-dx},${dy} ${-dx},${-dy}`;
              
              const cols = layerColors[z];
              const animDelay = z * 0.4 + (x + y) * 0.03;
              
              cubes.push(
                <motion.g key={`${x}-${y}-${z}`} initial={{scale:0, opacity:0}} animate={{scale:1, opacity:1}} transition={{delay: animDelay}} transform={`translate(${cx}, ${cy})`}>
                  <polygon points={pTop} fill={cols.top} stroke="rgba(0,0,0,0.3)" strokeWidth="0.8" />
                  <polygon points={pLeft} fill={cols.left} stroke="rgba(0,0,0,0.3)" strokeWidth="0.8" />
                  <polygon points={pRight} fill={cols.right} stroke="rgba(0,0,0,0.3)" strokeWidth="0.8" />
                </motion.g>
              );
            }
          }
        }
        return <g>{cubes}</g>;
      }} />
  );
};"""

code = re.sub(pattern_cube, repl_cube, code)

with open(path, 'w', encoding='utf-8') as f:
    f.write(code)

print("Restored solid cubes, sizing, and added toggle.")
