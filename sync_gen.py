with open('c:/futurax/Futura-Edtech/src/maths/class6/chapter1/VisualisingSequences.jsx', 'r', encoding='utf-8') as f:
    v_content = f.read()

gen_py_content = f'''import os

jsx_content = """{v_content}"""

with open('c:/futurax/Futura-Edtech/src/maths/class6/chapter1/VisualisingSequences.jsx', 'w', encoding='utf-8') as f:
    f.write(jsx_content)

print("Updated VisualisingSequences.jsx with screenshot match")
'''

with open('c:/futurax/Futura-Edtech/src/maths/class6/chapter1/gen.py', 'w', encoding='utf-8') as f:
    f.write(gen_py_content)

print('Updated gen.py to match VisualisingSequences.jsx')
