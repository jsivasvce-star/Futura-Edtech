import re

file_path = "src/science/class6/chapter2/version3/Chapter2LearningLab.jsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

def replace_next(m):
    return """              style={{
                position: 'absolute',
                right: '32px',
                bottom: '80px',
                zIndex: 10001,
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

def replace_back(m):
    return """              style={{
                position: 'absolute',
                left: '32px',
                bottom: '80px',
                zIndex: 10001,
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

content_before = len(content)

content = re.sub(r'[ \t]*style={{\s*position:\s*\'absolute\',\s*right:\s*\'32px\',\s*bottom:\s*\'80px\',\s*zIndex:\s*10001,[^}]+rgba\(217,\s*119,\s*6,\s*0\.4\)\'\s*}}', replace_next, content)

content = re.sub(r'[ \t]*style={{\s*position:\s*\'absolute\',\s*left:\s*\'32px\',\s*bottom:\s*\'80px\',\s*zIndex:\s*10001,[^}]+rgba\(0,0,0,0\.1\)\'\s*}}', replace_back, content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print(f"Content length changed: {content_before} -> {len(content)}")
