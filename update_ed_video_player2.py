import re

file_path = "src/science/class6/chapter2/version3/Chapter2LearningLab.jsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read().replace('\r\n', '\n')

back_target = """                style={{
                  position: 'absolute',
                  left: '32px',
                  bottom: '80px',
                  zIndex: 10001,
                  background: 'rgba(243, 239, 224, 0.9)',
                  color: '#1E293B',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 28px',
                  fontSize: '18px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}"""

back_replacement = """                style={{
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

next_target = """                style={{
                  position: 'absolute',
                  right: '32px',
                  bottom: '80px',
                  zIndex: 10001,
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 32px',
                  fontSize: '18px',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(217, 119, 6, 0.4)'
                }}"""

next_replacement = """                style={{
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

back_target2 = """                style={{
                  position: 'absolute', left: '32px', bottom: '80px', zIndex: 10001,
                  background: 'rgba(243, 239, 224, 0.9)', color: '#1E293B',
                  border: 'none', borderRadius: '12px', padding: '12px 28px',
                  fontSize: '18px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px',
                  cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}"""
                
next_target2 = """                style={{
                  position: 'absolute', right: '32px', bottom: '80px', zIndex: 10001,
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', color: '#FFFFFF',
                  border: 'none', borderRadius: '12px', padding: '12px 32px',
                  fontSize: '18px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px',
                  cursor: 'pointer', boxShadow: '0 6px 20px rgba(217, 119, 6, 0.4)'
                }}"""

content = content.replace(back_target, back_replacement)
content = content.replace(next_target, next_replacement)
content = content.replace(back_target2, back_replacement)
content = content.replace(next_target2, next_replacement)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated successfully")
