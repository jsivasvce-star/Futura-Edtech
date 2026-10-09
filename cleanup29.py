import re
import os

files = [
    "src/science/class6/chapter2/version3/NewActivity29.jsx",
    "src/science/class6/chapter2/version2/NewActivity29.jsx"
]

def clean_file(file_path):
    if not os.path.exists(file_path): return
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Update glossyBtn style
    new_glossyBtn = """const glossyBtn = {
    background: 'linear-gradient(145deg, #112A1F 0%, #081510 100%)',
    color: 'white',
    border: '1.5px solid #FCD34D',
    borderRadius: '40px',
    padding: '10px 24px',
    fontSize: '18px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 2px 5px rgba(255,255,255,0.1)'
  };"""
    content = re.sub(r"const glossyBtn = {[^}]+};", new_glossyBtn, content, count=1, flags=re.DOTALL)

    # PAGE 1 Next Button
    content = re.sub(r"<div style={{ position: 'absolute', bottom: '30px', right: '40px' }}>\s*<button[^>]+onClick={\(\) => setPage\(2\)}[^>]+>\s*Next <ArrowRight size=\{22\} />\s*</button>\s*</div>", "", content, flags=re.DOTALL)
    # PAGE 1 Back to Dashboard
    content = re.sub(r"<div style={{ position: 'absolute', bottom: '30px', left: '40px', zIndex: 10 }}>\s*<button[^>]+onClick=\{onBackToDashboard\}[^>]+>\s*<ArrowLeft size=\{22\} /> Back\s*</button>\s*</div>", "", content, flags=re.DOTALL)

    # PAGE 2 Back Button
    content = re.sub(r"<div style={{ position: 'absolute', bottom: '30px', left: '40px', zIndex: 10 }}>\s*<button[^>]+onClick=\{\(\) => setPage\(1\)\}[^>]+>\s*<ArrowLeft size=\{22\} /> Back\s*</button>\s*</div>", "", content, flags=re.DOTALL)
    
    # PAGE 2 Next Button
    content = re.sub(r"<div style={{ position: 'absolute', bottom: '30px', right: '40px' }}>\s*<button[^>]+onClick=\{\(\) => setPage\(3\)\}[^>]+>\s*Next <ArrowRight size=\{24\} />\s*</button>\s*</div>", "", content, flags=re.DOTALL)
    
    # PAGE 3 Back Button
    content = re.sub(r"<div style=\{\{ \n\s*position: 'absolute', left: '24px', bottom: '24px', top: 'unset', right: 'unset',\n\s*margin: 0, transform: 'none', pointerEvents: 'auto', zIndex: 30 \n\s*\}\}>\n\s*<button \n\s*onClick=\{\(\) => setPage\(2\)\}\n\s*style=\{\{[^\}]+\}\}\n\s*>\n\s*<ArrowLeft size=\{18\} /> Back\n\s*</button>\n\s*</div>", "", content, flags=re.DOTALL)
    
    # PAGE 3 Next Button
    content = re.sub(r"<div style=\{\{\n\s*position: 'absolute', right: '24px', bottom: '24px', top: 'unset', left: 'unset',\n\s*margin: 0, transform: 'none', pointerEvents: 'auto', zIndex: 30\n\s*\}\}>\n\s*<button \n\s*onClick=\{\(\) => setPage\(4\)\}\n\s*style=\{\{[^\}]+\}\}\n\s*>\n\s*Next <ArrowRight size=\{18\} />\n\s*</button>\n\s*</div>", "", content, flags=re.DOTALL)

    # PAGE 4 Back Button
    content = re.sub(r"<div style=\{\{ \n\s*position: 'absolute', left: '24px', bottom: '24px', top: 'unset', right: 'unset',\n\s*margin: 0, transform: 'none', pointerEvents: 'auto', zIndex: 30 \n\s*\}\}>\n\s*<button \n\s*onClick=\{\(\) => setPage\(3\)\}\n\s*style=\{\{[^\}]+\}\}\n\s*>\n\s*<ArrowLeft size=\{18\} /> Back\n\s*</button>\n\s*</div>", "", content, flags=re.DOTALL)

    # PAGE 4 Next Button
    # wait, there's no Next button on Page 4? Check if there's any other.

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

for f in files:
    clean_file(f)

print("Done")
