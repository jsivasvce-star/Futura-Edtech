import sys
import re

def process_content(content):
    # BoxVisualizer
    content = content.replace('viewBox="0 0 1100 300"', 'viewBox="0 0 1350 350"')
    content = content.replace('const x = i * 170 + 120;', 'const x = i * 220 + 130;')
    content = content.replace('y="-100" fill={titleColor}', 'y="-120" fill={titleColor}')
    content = content.replace('rect x="-70" y="-70" width="140" height="140" rx="16"', 'rect x="-90" y="-90" width="180" height="180" rx="20"')
    content = content.replace('fontSize="64"', 'fontSize="80"')
    content = content.replace('y="110" fill={isUnknown', 'y="140" fill={isUnknown')
    content = content.replace('fontSize="40"', 'fontSize="50"')
    content = content.replace('d="M -100 -20 Q -85 -40 -70 -20"', 'd="M -130 -20 Q -110 -45 -90 -20"')
    content = content.replace('x="-85" y="-35" fill={connectorColor} fontSize="18"', 'x="-110" y="-45" fill={connectorColor} fontSize="22"')
    
    # VisualizerAll1s
    content = content.replace('x="-17" y="-17" width="34" height="34" rx="8"', 'x="-24" y="-24" width="48" height="48" rx="12"')
    
    # VisualizerCounting
    content = content.replace('bs = 18, g = 6', 'bs = 24, g = 8')
    content = content.replace('y="-6" width={bs}', 'y="-12" width={bs}')
    
    # VisualizerOdd & VisualizerEven
    content = content.replace('bs = 16, g = 5', 'bs = 22, g = 7')
    content = content.replace('y="3" width={bs}', 'y="4" width={bs}')
    content = content.replace('y="-18" width={bs}', 'y="-24" width={bs}')
    
    # VisualizerTriangular
    content = content.replace('r/2)*18}', 'r/2)*24}')
    content = content.replace('pic/2)*18 + 8}', 'pic/2)*24 + 10}')
    content = content.replace('r="6.5" fill=', 'r="9" fill=')
    
    # VisualizerSquare
    content = content.replace('pic/2)*16}', 'pic/2)*22}')
    content = content.replace('width="13" height="13" rx="4"', 'width="18" height="18" rx="6"')
    
    # VisualizerCube
    content = content.replace('[0, 26, 18, 14, 11.5, 10, 8.5]', '[0, 36, 25, 20, 16, 14, 12]')
    
    # VisualizerHexagonal
    content = content.replace('S = 14.5;', 'S = 20;')
    content = content.replace('r="5" fill="#eab308"', 'r="7" fill="#eab308"')
    content = content.replace('r="4" fill={isNew', 'r="5.5" fill={isNew')
    
    # VisualizerPow2
    content = content.replace('r="8.5" fill="#1d4ed8"', 'r="12" fill="#1d4ed8"')
    content = content.replace('S = 17;', 'S = 24;')
    content = content.replace('gap = 22;', 'gap = 30;')
    content = content.replace('r="7" fill=', 'r="9.5" fill=')
    
    # VisualizerPow3
    content = content.replace('r="8" fill="#15803d"', 'r="11" fill="#15803d"')
    content = content.replace('S = 14;', 'S = 19;')
    content = content.replace('gap = 20;', 'gap = 28;')
    content = content.replace('r="6" fill=', 'r="8.5" fill=')
    
    return content

files = [
    'c:/futurax/Futura-Edtech/src/maths/class6/chapter1/VisualisingSequences.jsx',
    'c:/futurax/Futura-Edtech/src/maths/class6/chapter1/gen.py'
]

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        v_content = f.read()

    v_content = process_content(v_content)

    # Note: gen.py has smaller values for some elements like the BoxVisualizer originally.
    # It might be safer to handle gen.py by regenerating it if the strings don't exactly match.
    # We will do replacement for VisualisingSequences first.

    with open(file, 'w', encoding='utf-8') as f:
        f.write(v_content)

print('Updated files successfully.')
