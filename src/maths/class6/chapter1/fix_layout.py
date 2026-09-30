import os

path = 'c:/futurax/Futura-Edtech/src/maths/class6/chapter1/VisualisingSequences.jsx'
with open(path, 'r', encoding='utf-8') as f:
    code = f.read()

reps = {
    'padding: 24px 40px; padding-bottom: 100px;': 'padding: 16px 40px; padding-bottom: 80px;',
    'margin-bottom: 24px; padding: 0 12px;': 'margin-bottom: 12px; padding: 0 12px;',
    'padding: 32px 0;': 'padding: 12px 0;',
    'max-height: 400px;': 'max-height: 310px;',
    'padding: 0 40px 32px 40px;': 'padding: 0 40px 12px 40px;',
    'margin-bottom: 24px;': 'margin-bottom: 12px;'
}

for k, v in reps.items():
    code = code.replace(k, v)

with open(path, 'w', encoding='utf-8') as f:
    f.write(code)

print("Layout tightened to fit screen.")
