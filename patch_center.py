import re

file_path = "src/science/class6/chapter2/version2/NewActivity29.jsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Page 1 title centering
# Find: alignSelf: 'flex-start',
# Replace: alignSelf: 'center', marginTop: '30px',
content = content.replace("alignSelf: 'flex-start',", "alignSelf: 'center', marginTop: '40px',")

# Page 2 title centering
# Find: <div style={{ position: 'absolute', top: '15px', left: '20px', pointerEvents: 'auto' }}>
# Replace: <div style={{ position: 'absolute', top: '15px', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'auto', zIndex: 10 }}>
content = content.replace("<div style={{ position: 'absolute', top: '15px', left: '20px', pointerEvents: 'auto' }}>", "<div style={{ position: 'absolute', top: '15px', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'auto', zIndex: 10 }}>")

# Page 4 title centering
# Find: display: 'flex', flexDirection: 'column', gap: '0px',\n                alignItems: 'center', pointerEvents: 'auto',\n                transform: 'rotate(-4deg)'
# Replace: ... transform: 'rotate(-4deg) translateX(-50%)', position: 'absolute', left: '50%'
content = content.replace("transform: 'rotate(-4deg)'", "transform: 'rotate(-4deg) translateX(-50%)', position: 'absolute', left: '50%'")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Centered titles!")
