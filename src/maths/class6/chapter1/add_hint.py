import re

path = 'c:/futurax/Futura-Edtech/src/maths/class6/chapter1/VisualisingSequences.jsx'
with open(path, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Add showHint state
code = code.replace(
    'const [showConfetti, setShowConfetti] = useState(false);',
    'const [showConfetti, setShowConfetti] = useState(false);\n  const [showHint, setShowHint] = useState(false);'
)

# 2. Update handleOptionClick
code = code.replace(
    'setStep(2);\n      setTimeout(() => setStep(1), 500);',
    'setStep(2);\n      setShowHint(true);\n      setTimeout(() => setStep(1), 500);'
)

# 3. Update goToNext and goToPrev
code = code.replace(
    'setShowConfetti(false);\n    } else {',
    'setShowConfetti(false);\n      setShowHint(false);\n    } else {'
)
code = code.replace(
    'setShowConfetti(false);\n    }\n  };',
    'setShowConfetti(false);\n      setShowHint(false);\n    }\n  };'
)

# 4. Update Visualizer rendering
code = code.replace(
    '<Visualizer step={step} playStep={playStep} />',
    '<Visualizer step={step} playStep={playStep} showHint={showHint} />'
)

# 5. Update BoxVisualizer definition
code = code.replace(
    'const BoxVisualizer = ({ step, playStep, numPictures, renderShapes, bottomValues, connectorLabel, connectorColor }) => {',
    'const BoxVisualizer = ({ step, playStep, numPictures, renderShapes, bottomValues, connectorLabel, connectorColor, showHint }) => {'
)

# 6. Update text opacity in BoxVisualizer
code = code.replace(
    '<text x="-85" y="-35" fill={connectorColor} fontSize="18" textAnchor="middle" fontWeight="bold">{connectorLabel(i, pic)}</text>',
    '<text x="-85" y="-35" fill={connectorColor} fontSize="18" textAnchor="middle" fontWeight="bold" style={{opacity: showHint || step === 3 ? 1 : 0, transition: "opacity 0.4s ease"}}>{connectorLabel(i, pic)}</text>'
)

# 7. Update all Custom Visualizers
code = re.sub(
    r'const (Visualizer\w+) = \(\{ step, playStep \}\) => \(',
    r'const \1 = ({ step, playStep, showHint }) => (',
    code
)
code = re.sub(
    r'<BoxVisualizer step={step} playStep={playStep}',
    r'<BoxVisualizer step={step} playStep={playStep} showHint={showHint}',
    code
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(code)

print("Added showHint logic")
