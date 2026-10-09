import re

file_path = "src/science/class6/chapter2/version2/NewActivity29.jsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Insert Global Header variables and JSX
global_header_vars = """  const handleGlobalBack = () => {
    if (page === 1) {
      if (onBackToDashboard) onBackToDashboard();
    } else if (page === 4) {
      setPage(2);
    } else if (page === 5) {
      setPage(4);
    } else {
      setPage(page - 1);
    }
  };

  const handleGlobalNext = () => {
    if (page === 1) {
      setPage(2);
    } else if (page === 2) {
      setPage(4);
    } else if (page === 8) {
      if (onNextActivity) onNextActivity();
    } else {
      setPage(page + 1);
    }
  };

  const showGlobalNext = page !== 4; // Hide Next on drag-and-drop page until completed

  const glossyBtn = {
    background: 'linear-gradient(165deg, rgba(8, 44, 28, 0.95) 0%, rgba(4, 24, 15, 0.98) 100%)',
    border: '2px solid rgba(212, 175, 55, 0.75)',
    color: '#FFFFFF',
    borderRadius: '30px',
    padding: '10px 24px',
    fontSize: '18px',
    fontWeight: 900,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.25), inset 0 2px 4px rgba(255,255,255,0.1)',
    backdropFilter: 'blur(8px)',
    fontFamily: '"Outfit", sans-serif',
    pointerEvents: 'auto'
  };
"""

global_header_jsx = """      {/* GLOBAL HEADER (Added to top) */}
      <div style={{
        position: 'absolute', top: '15px', left: 0, width: '100%',
        display: 'flex', justifyContent: 'space-between', padding: '0 20px',
        boxSizing: 'border-box', zIndex: 100, pointerEvents: 'none'
      }}>
        <button onClick={handleGlobalBack} style={glossyBtn}>
          <ArrowLeft size={20} /> Back
        </button>
        {showGlobalNext && (
          <button onClick={handleGlobalNext} style={glossyBtn}>
            {page === 8 ? 'Continue' : 'Next'} <ArrowRight size={20} />
          </button>
        )}
      </div>
"""

# Insert vars before return
content = content.replace("  return (", global_header_vars + "\n  return (")

# Insert jsx right after <div style={{ ... overflow: 'hidden' ... }}>
content = content.replace("      {/* PAGE 1 */}", global_header_jsx + "\n      {/* PAGE 1 */}")

# 2. Delete existing buttons using precise regexes
# Page 1 Next
p1_next = re.compile(r"<div style={{ position: 'absolute', bottom: '30px', right: '40px' }}>\s*<button\s*onClick={\(\) => setPage\(2\)}\s*style={{[^}]+}}\s*>\s*Next <ArrowRight size={22} />\s*</button>\s*</div>", re.DOTALL)
content = p1_next.sub("", content)

# Page 1 Back
p1_back = re.compile(r"<div style={{ position: 'absolute', bottom: '30px', left: '40px', zIndex: 10 }}>\s*<button \s*onClick={onBackToDashboard}\s*style={{[^}]+}}\s*>\s*<ArrowLeft size={22} /> Back\s*</button>\s*</div>", re.DOTALL)
content = p1_back.sub("", content)

# Page 2 Back
p2_back = re.compile(r"\{\/\* 4\. BOTTOM-LEFT \(Back Button\) \*\/\}\s*<div style={{ \s*position: 'absolute', left: '24px', bottom: '24px',\s*pointerEvents: 'auto', zIndex: 30 \s*}}>\s*<button \s*onClick={\(\) => setPage\(2\)}\s*style={{[^}]+}}\s*>\s*<ArrowLeft size={18} /> Back\s*</button>\s*</div>", re.DOTALL)
content = p2_back.sub("", content)

# Page 2 Next
p2_next = re.compile(r"\{\/\* Next Button \*\/\}\s*<button \s*onClick={\(\) => setPage\(4\)}\s*style={{[^}]+}}\s*>\s*Next <ArrowRight size={18} />\s*</button>", re.DOTALL)
content = p2_next.sub("", content)

# Page 4 Back
p4_back = re.compile(r"\{\/\* Back Button \(Bottom Left\) \*\/\}\s*<div style={{ position: 'absolute', bottom: '20px', left: '20px', pointerEvents: 'auto' }}>\s*<button \s*onClick={\(\) => setPage\(2\)}\s*style={{[^}]+}}\s*>\s*<ArrowLeft size={18} /> Back\s*</button>\s*</div>", re.DOTALL)
content = p4_back.sub("", content)

# Pages 5-8 Back and Next
p5_back_next = re.compile(r"\{\/\* Back Button \*\/\}\s*<div style={{ position: 'absolute', bottom: '24px', left: '24px' }}>.*?\{\/\* Next \/ Continue Button \*\/\}\s*<div style={{ position: 'absolute', bottom: '24px', right: '24px' }}>.*?</div>\s*</div>", re.DOTALL)
content = p5_back_next.sub("", content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Patched NewActivity29.jsx successfully!")
