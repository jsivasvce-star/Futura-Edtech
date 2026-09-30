// --- Custom Visualizers for 1.4 ---
const VisualizerOddSums = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={6} connectorLabel={(i,pic)=>`+${2*pic-1}`} connectorColor="#fbbf24" bottomValues={['1','4','9','16','25','36']}
    renderShapes={(pic) => {
      const bs = 22;
      const dots = [];
      const palette = ['#a855f7', '#2dd4bf', '#f472b6', '#facc15', '#60a5fa', '#a3e635'];
      for(let r=0; r<pic; r++){
        for(let c=0; c<pic; c++){
          const layer = Math.max(r, c);
          const isNew = layer === pic-1 && pic>1;
          dots.push(<motion.rect key={`${r}-${c}`} initial={{scale:0}} animate={{scale:1}} transition={{delay: layer*0.1 + (r+c)*0.02}} x={(c - pic/2)*bs} y={(r - pic/2)*bs} width={18} height={18} rx="4" fill={isNew ? "#fde047" : palette[layer]} opacity={isNew ? 1 : 0.8} />);
        }
      }
      return <g>{dots}</g>;
    }} />
);

const VisualizerTenOdds = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={3} connectorLabel={()=>``} connectorColor="#38bdf8" bottomValues={['4','16','100']}
    renderShapes={(pic) => {
      const size = pic === 1 ? 2 : pic === 2 ? 4 : 10;
      return <g>
        <motion.rect initial={{opacity:0}} animate={{opacity:1}} x="-40" y="-40" width="80" height="80" fill="transparent" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4"/>
        <text x="0" y="-50" fill="#bae6fd" fontSize="14" textAnchor="middle">{size} rows × {size} columns</text>
        <text x="0" y="5" fill="#38bdf8" fontSize="24" textAnchor="middle" fontWeight="bold">{size}²</text>
      </g>;
    }} />
);

const VisualizerHundredOdds = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={2} connectorLabel={()=>``} connectorColor="#f472b6" bottomValues={['100','10000']}
    renderShapes={(pic) => {
      const size = pic === 1 ? 10 : 100;
      return <g>
        <motion.rect initial={{opacity:0}} animate={{opacity:1}} x="-50" y="-50" width="100" height="100" fill="transparent" stroke="#f472b6" strokeWidth="2" strokeDasharray="4 4"/>
        <text x="0" y="-60" fill="#fbcfe8" fontSize="14" textAnchor="middle">{size} rows × {size} columns</text>
        <text x="0" y="10" fill="#f472b6" fontSize="30" textAnchor="middle" fontWeight="bold">{size}²</text>
      </g>;
    }} />
);

const VisualizerUpAndDown = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={5} connectorLabel={()=>``} connectorColor="#4ade80" bottomValues={['1','4','9','16','25']}
    renderShapes={(pic) => {
      const bs = 20;
      const dots = [];
      for(let r=0; r<pic; r++){
        for(let c=0; c<pic; c++){
          const diag = r + c;
          const isNew = (r===pic-1 || c===pic-1);
          const color = `hsl(${140 + diag*20}, 80%, 60%)`;
          dots.push(<motion.rect key={`${r}-${c}`} initial={{scale:0}} animate={{scale:1}} transition={{delay: diag*0.05}} x={(c - pic/2)*bs} y={(r - pic/2)*bs} width={16} height={16} rx="8" fill={isNew && pic>1 ? "#bbf7d0" : color} opacity={0.9} />);
        }
      }
      return <g>{dots}</g>;
    }} />
);

const VisualizerUpAndDown100 = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={4} connectorLabel={()=>``} connectorColor="#a78bfa" bottomValues={['4','25','100','10000']}
    renderShapes={(pic) => {
      const size = pic === 1 ? 2 : pic === 2 ? 5 : pic === 3 ? 10 : 100;
      return <g>
        <motion.rect initial={{opacity:0}} animate={{opacity:1}} x="-45" y="-45" width="90" height="90" fill="transparent" stroke="#a78bfa" strokeWidth="2" rx="8"/>
        <line x1="-45" y1="0" x2="45" y2="0" stroke="#a78bfa" strokeWidth="1" strokeDasharray="2 2" opacity="0.5"/>
        <line x1="0" y1="-45" x2="0" y2="45" stroke="#a78bfa" strokeWidth="1" strokeDasharray="2 2" opacity="0.5"/>
        <text x="0" y="-55" fill="#ddd6fe" fontSize="12" textAnchor="middle">{size} rows × {size} columns</text>
        <text x="-35" y="5" fill="#a78bfa" fontSize="12" transform="rotate(-90 -35 5)" textAnchor="middle">{size} rows</text>
        <text x="0" y="60" fill="#a78bfa" fontSize="12" textAnchor="middle">{size} columns</text>
      </g>;
    }} />
);

const VisualizerGeneric = ({ step, playStep, showHint }) => (
  <BoxVisualizer step={step} playStep={playStep} showHint={showHint} numPictures={3} connectorLabel={()=>``} connectorColor="#64748b" bottomValues={['?','?','?']}
    renderShapes={(pic) => (
      <g>
        <text x="0" y="10" fill="#94a3b8" fontSize="24" textAnchor="middle">Pattern {pic}</text>
      </g>
    )} />
);

// ==========================================
// DATA
// ==========================================
const CONCEPTS = [
  { id: 1, title: 'Odd sums make squares', subtitle: 'Each odd number adds an L-shaped border.', watchDesc: 'Watch borders of 1, 3, 5 and 7 dots build larger squares.', watchAnswer: 'Each colour is one odd-number group. Separate the borders to inspect them.', question: 'What is 1 + 3 + 5 + 7 + 9 + 11?', seqList: '1, 4, 9, 16, 25, ?', options: [30, 35, 36], correctOption: 36, discoveredTitle: 'The six odd-number groups fill all 36 places.', discoveredDesc: 'The groups contain 1, 3, 5, 7, 9 and 11 dots. Together they fill a 6 x 6 square.', nextTitle: 'The first 10 odd numbers', Visualizer: VisualizerOddSums },
  { id: 2, title: 'The first 10 odd numbers', subtitle: 'Imagine a larger version of the square.', watchDesc: 'Squares of side 2, 4 and 10 use the same odd-border rule.', watchAnswer: 'The first 10 odd numbers end at 19. Their 10 borders fill a 10 x 10 square.', question: 'What is 1 + 3 + 5 + ... + 19?', seqList: '4, 16, ?', options: [90, 100, 110], correctOption: 100, discoveredTitle: 'Ten odd-number borders. A hundred dots.', discoveredDesc: 'The first 10 odd numbers make 10 L-shaped borders. They fill a square of side 10, so the sum is 10 x 10 = 100.', nextTitle: 'The first 100 odd numbers', Visualizer: VisualizerTenOdds },
  { id: 3, title: 'The first 100 odd numbers', subtitle: 'Think of the square without drawing every dot.', watchDesc: 'The first 100 odd numbers end at 199. The 100 x 100 grid is shown schematically.', watchAnswer: '100 rows of 100 columns.', question: 'Why does the same rule work for 100 odd numbers?', seqList: '100, ?', options: [1000, 10000, 20000], correctOption: 10000, discoveredTitle: '100 x 100 = 10,000, without adding a hundred terms one by one.', discoveredDesc: 'The first 100 odd numbers are 1, 3, 5, ..., 199. Their 100 L-shaped borders fill a 100 x 100 square: 10,000 dots.', nextTitle: 'Adding up and down', Visualizer: VisualizerHundredOdds },
  { id: 4, title: 'Adding up and down', subtitle: 'The same square, counted along its diagonals.', watchDesc: 'Follow diagonals of lengths 1, 2, 3, ..., n, ..., 3, 2, 1.', watchAnswer: 'Switch to Diagonal rows: 1+2+3+4+5+4+3+2+1 = 25.', question: 'What is 1 + 2 + 3 + 4 + 5 + 6 + 5 + 4 + 3 + 2 + 1?', seqList: '1, 4, 9, 16, ?', options: [30, 36, 42], correctOption: 36, discoveredTitle: 'Up to 6 and down to 1 makes 36.', discoveredDesc: 'The diagonal groups fill a 6 x 6 square. Count the peak 6 once.', nextTitle: 'Up to 100 and back', Visualizer: VisualizerUpAndDown },
  { id: 5, title: 'Up to 100 and back', subtitle: 'The peak is counted once.', watchDesc: 'A peak of 2, 5 or 10 produces the square of that number.', watchAnswer: 'The peak 100 occurs once.', question: 'What is 1 + 2 + ... + 100 + 99 + ... + 2 + 1?', seqList: '4, 25, 100, ?', options: [1000, 10000, 20000], correctOption: 10000, discoveredTitle: 'The total is 10,000. The peak is included only once.', discoveredDesc: 'The diagonals of a 100 x 100 square have lengths 1, 2, ..., 100, ..., 2, 1. They fill 10,000 places. Counting 100 twice would give the wrong sum.', nextTitle: 'Adding 1s to counting', Visualizer: VisualizerUpAndDown100 },
  { id: 6, title: 'Adding 1s → counting', subtitle: 'One more 1. One more in the total.', watchDesc: 'Add one unit at a time and read the running totals.', watchAnswer: '1; 1+1; 1+1+1... give 1, 2, 3...', question: 'What is the sum of five 1s?', seqList: '1, 2, 3, 4, ?', options: [4, 5, 6], correctOption: 5, discoveredTitle: 'Five 1s give 5. The totals are counting numbers.', discoveredDesc: 'Adding n copies of 1 gives n.', nextTitle: '1s up and down', Visualizer: VisualizerGeneric },
  { id: 7, title: '1s up and down → odds', subtitle: 'One central 1, with equal wings.', watchDesc: 'At step n, use n ones going up and n - 1 coming down.', watchAnswer: 'Count the peak once: n + (n - 1) = 2n - 1.', question: 'Use five 1s on the way up and four on the way down. Total?', seqList: '1, 3, 5, 7, ?', options: [9, 10, 11], correctOption: 9, discoveredTitle: '5 + 4 = 9. Four pairs and one central unit.', discoveredDesc: 'The peak is included only once. So the totals are 1, 3, 5, 7, 9... each equal to 2n - 1.', nextTitle: 'Counting sums', Visualizer: VisualizerGeneric },
  { id: 8, title: 'Counting sums → triangles', subtitle: 'Stack the next counting number as a row.', watchDesc: 'A row of 1, then 2, then 3: watch the triangle grow.', watchAnswer: 'The totals 1, 3, 6, 10, 15... are triangular numbers.', question: 'What is 1 + 2 + 3 + 4 + 5 + 6?', seqList: '1, 3, 6, 10, 15, ?', options: [20, 21, 25], correctOption: 21, discoveredTitle: 'The six rows contain 21 dots altogether.', discoveredDesc: 'Rows of 1, 2, 3... n dots form a filled triangle.', nextTitle: 'Two triangles', Visualizer: VisualizerGeneric },
  { id: 9, title: 'Two triangles → a square', subtitle: 'Fit consecutive triangles together.', watchDesc: 'Separate the two colours. One triangle has one more row.', watchAnswer: '1+3=4; 3+6=9; 6+10=16...', question: 'What is 15 + 21, the next pair of triangular numbers?', seqList: '4, 9, 16, 25, ?', options: [30, 35, 36], correctOption: 36, discoveredTitle: '15 + 21 = 36. The two triangles fill one square.', discoveredDesc: 'Tn + Tn-1 = n^2. One triangle includes the diagonal of the square; the other fills the remaining spaces.', nextTitle: 'Adding powers of 2', Visualizer: VisualizerGeneric },
  { id: 10, title: 'One short of doubling', subtitle: 'Add powers of 2, then fill the missing place.', watchDesc: 'Coloured groups grow 1, 2, 4, 8... One empty place completes the next power of 2.', watchAnswer: 'The sums are 1, 3, 7, 15, 31... Add 1 to get 2, 4, 8, 16, 32...', question: 'What is 1 + 2 + 4 + 8 + 16, before adding the extra 1?', seqList: '1, 3, 7, 15, ?', options: [31, 32, 30], correctOption: 31, discoveredTitle: 'The sum is 31. One extra unit completes 32.', discoveredDesc: '1+2+...+2^(n-1) = 2^n - 1.', nextTitle: 'Six triangles', Visualizer: VisualizerGeneric },
  { id: 11, title: 'Six triangles + a centre', subtitle: 'Arrange six triangular groups around one dot.', watchDesc: 'The six colours are equal triangular groups. Keep the centre separate.', watchAnswer: '6x1+1=7; 6x3+1=19; 6x6+1=37...', question: 'If each triangle has 15 dots, what is 6 x 15 + 1?', seqList: '7, 19, 37, 61, ?', options: [90, 91, 96], correctOption: 91, discoveredTitle: 'Six triangles of 15, plus the centre, make 91.', discoveredDesc: 'Six copies of a triangular number plus a centre dot make hexagonal numbers.', nextTitle: 'Hexagonal sums', Visualizer: VisualizerGeneric },
  { id: 12, title: 'Hexagonal sums → cubes', subtitle: 'A new shell grows the cube by one.', watchDesc: 'Each golden shell joins the smaller blue cube.', watchAnswer: 'The added shells contain 1, 7, 19, 37, 61... unit cubes.', question: 'What is 1 + 7 + 19 + 37 + 61?', seqList: '1, 8, 27, 64, ?', options: [100, 121, 125], correctOption: 125, discoveredTitle: 'Five shells build 5 x 5 x 5 = 125 unit cubes.', discoveredDesc: 'The difference between consecutive cubes is 1, 7, 19, 37, 61...', nextTitle: 'Discover a new relation', Visualizer: VisualizerGeneric },
  { id: 13, title: 'Discover a new relation', subtitle: 'What hides between two neighbouring squares?', watchDesc: 'Count only the golden border. The blue square is already there.', watchAnswer: '4-1=3; 9-4=5; 16-9=7; 25-16=9...', question: 'How many new dots grow the square from 25 to 36?', seqList: '3, 5, 7, 9, ?', options: [10, 11, 12], correctOption: 11, discoveredTitle: '36 - 25 = 11. The next odd border completes the square.', discoveredDesc: 'n^2 - (n-1)^2 = 2n - 1. The border has n dots on one side and n-1 on the other.', nextTitle: 'Finish', Visualizer: VisualizerGeneric },
  { id: 14, title: 'Finish', subtitle: 'You have mastered pattern connections!', watchDesc: 'Review all the connections you discovered.', watchAnswer: 'Mathematics is full of surprising links.', question: 'Are you ready to continue your journey?', seqList: 'Done', options: ['Yes', 'No', 'Maybe'], correctOption: 'Yes', discoveredTitle: 'Great job!', discoveredDesc: 'You have completed the relations module.', nextTitle: 'Finish', Visualizer: VisualizerGeneric }
];
