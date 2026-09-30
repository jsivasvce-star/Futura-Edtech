import os

path = 'c:/futurax/Futura-Edtech/src/maths/class6/chapter1/VisualisingSequences.jsx'
with open(path, 'r', encoding='utf-8') as f:
    code = f.read()

reps = {
    # 1. Increase max-height of SVG
    'max-height: 310px;': 'max-height: 380px;',
    
    # 2. Reduce padding inside checkpoint-container
    'padding: 24px 32px;': 'padding: 16px 32px;',
    
    # 3. Reduce margin inside bottom card text
    "marginBottom: '16px'": "marginBottom: '8px'",
    "marginBottom: '24px'": "marginBottom: '12px'",
    
    # 4. Reduce padding in below-visualizer
    'padding: 0 40px 12px 40px;': 'padding: 0 40px 0px 40px;',
    
    # 5. Reduce padding in main-wrapper
    'padding-bottom: 80px;': 'padding-bottom: 50px;'
}

for k, v in reps.items():
    code = code.replace(k, v)

with open(path, 'w', encoding='utf-8') as f:
    f.write(code)

print("Scaled up SVG max-height and tightened bottom space.")
