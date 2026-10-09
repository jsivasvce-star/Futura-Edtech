import re

file_path = "src/science/class6/chapter2/version3/Chapter2LearningLab.jsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

def process_educational_video_player(match):
    block = match.group(0)
    
    # Replace Back button style
    # We look for style={{...}} inside a <button ...> that has <ArrowLeft size={20} /> Back
    def replace_back_button(btn_match):
        btn_content = btn_match.group(0)
        new_style = """style={{
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
        return re.sub(r'style={{[^}]+}}', new_style, btn_content, count=1)
        
    def replace_next_button(btn_match):
        btn_content = btn_match.group(0)
        new_style = """style={{
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
        return re.sub(r'style={{[^}]+}}', new_style, btn_content, count=1)

    # Find buttons inside the block
    block = re.sub(r'<button[^>]*>.*?Back.*?</button>', replace_back_button, block, flags=re.DOTALL)
    block = re.sub(r'<button[^>]*>.*?Next.*?</button>', replace_next_button, block, flags=re.DOTALL)
    
    return block

# Match EducationalVideoPlayer blocks
content = re.sub(r'<EducationalVideoPlayer.*?</EducationalVideoPlayer>', process_educational_video_player, content, flags=re.DOTALL)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated successfully")
