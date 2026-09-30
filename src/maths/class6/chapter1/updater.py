import re
import os

path = 'c:/futurax/Futura-Edtech/src/maths/class6/chapter1/VisualisingSequences.jsx'

with open(path, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Remove PlayControls
code = re.sub(r'const PlayControls = .*?\n\);\n', '', code, flags=re.DOTALL)
code = re.sub(r'<PlayControls.*?/>', '', code)

# 2. SVG Font Sizes
code = code.replace('fontSize="12"', 'fontSize="16"')
code = code.replace('fontSize="48"', 'fontSize="64"')
code = code.replace('fontSize="32"', 'fontSize="40"')
code = code.replace('fontSize="14"', 'fontSize="18"') # mostly the connector label

# 3. Inline style font sizes
code = code.replace("fontSize: '11px'", "fontSize: '14px'")
code = code.replace("fontSize: '18px'", "fontSize: '22px'")
code = code.replace("fontSize: '28px'", "fontSize: '32px'")

# 4. CSS font sizes
reps = {
    'font-size: 13px;': 'font-size: 15px;',
    'font-size: 11px;': 'font-size: 14px;',
    'font-size: 42px;': 'font-size: 48px;',
    'font-size: 18px;': 'font-size: 22px;',
    'font-size: 32px;': 'font-size: 40px;',
    'font-size: 14px;': 'font-size: 18px;',
    'font-size: 10px;': 'font-size: 14px;',
    'font-size: 20px;': 'font-size: 26px;',
    'width: 60px; height: 60px;': 'width: 70px; height: 70px;',
    'font-size: 12px;': 'font-size: 15px;',
    'width: 8px; height: 8px; border-radius: 2px;': 'width: 12px; height: 12px; border-radius: 2px;'
}
for k, v in reps.items():
    code = code.replace(k, v)

with open(path, 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated font sizes and removed controls.")
