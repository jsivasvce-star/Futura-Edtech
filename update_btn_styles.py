import re
import os

files = [
    "src/science/class6/chapter2/version3/NewActivity29.jsx",
    "src/science/class6/chapter2/version2/NewActivity29.jsx"
]

new_style = """style={{
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
                  }}"""

def replace_button_styles(file_path):
    if not os.path.exists(file_path): return
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # We will use regex to find <button ... style={{...}} ...> ... Back ... </button>
    # and <button ... style={{...}} ...> ... Next ... </button>
    
    # regex for buttons that have Back or Next
    # It looks for <button ... > then some contents including Back/Next then </button>
    
    def replacer(match):
        button_tag = match.group(0)
        # Check if it's a Back or Next button (and not Reset, Check Answers, Continue etc)
        if (re.search(r'>\s*<ArrowLeft[^>]*>\s*Back\s*<', button_tag) or 
            re.search(r'>\s*Back\s*<ArrowLeft', button_tag) or
            re.search(r'>\s*Next\s*<ArrowRight', button_tag) or
            re.search(r'>\s*<ArrowRight[^>]*>\s*Next\s*<', button_tag)):
            
            # replace the style block inside this button tag
            # It replaces style={{...}} with new_style
            return re.sub(r'style={{[^}]+}}', new_style, button_tag, count=1)
        return button_tag

    # Match the whole <button ... </button> block
    content = re.sub(r'<button[^>]*>.*?</button>', replacer, content, flags=re.DOTALL)
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

for f in files:
    replace_button_styles(f)

print("Styles updated successfully!")
