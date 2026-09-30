import re

file_path = r'c:\futurax\Futura-Edtech\src\maths\class6\chapter1\VisualisingSequences.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# CSS to inject
css_to_add = """
        .quiz-btn {
          padding: 16px 40px;
          font-size: 32px;
          font-weight: 900;
          color: white;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 8px 16px rgba(0,0,0,0.4);
          position: relative;
          overflow: hidden;
        }
        .quiz-btn::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,0));
          pointer-events: none;
        }
        .quiz-btn:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 12px 24px rgba(0,0,0,0.5);
        }
        .quiz-btn.selected {
          transform: scale(0.95);
          box-shadow: 0 0 20px rgba(255,255,255,0.4), inset 0 4px 8px rgba(0,0,0,0.4);
        }
"""

# 1. Update OddNumbersTutorial Question Text
old_odd_question = """                <p style={{ color: '#f8fafc', margin: '0 0 32px 0', fontSize: '24px', fontWeight: '600' }}>
                  What comes after 5?
                </p>"""

new_odd_question = """                <p style={{ color: '#f8fafc', margin: '0 0 32px 0', fontSize: '24px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  What comes next in this pattern? <strong style={{ color: '#f59e0b', fontSize: '28px', letterSpacing: '2px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', padding: '6px 16px', borderRadius: '12px', marginLeft: '12px' }}>1, 3, 5, __</strong>
                </p>"""

content = content.replace(old_odd_question, new_odd_question)

# 2. Add CSS to OddNumbersTutorial style block
old_odd_style = """.celebration-ring-yellow {
          animation: ringExpandYellow 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          animation-delay: 0.2s;
        }"""
        
content = content.replace(old_odd_style, old_odd_style + css_to_add)


# 3. Update EvenNumbersTutorial Question Text
old_even_question = """                <p style={{ color: '#f8fafc', margin: '0 0 32px 0', fontSize: '24px', fontWeight: '600' }}>
                  What comes after 6?
                </p>"""

new_even_question = """                <p style={{ color: '#f8fafc', margin: '0 0 32px 0', fontSize: '24px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  What comes next in this pattern? <strong style={{ color: '#8b5cf6', fontSize: '28px', letterSpacing: '2px', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', padding: '6px 16px', borderRadius: '12px', marginLeft: '12px' }}>2, 4, 6, __</strong>
                </p>"""

content = content.replace(old_even_question, new_even_question)

# 4. Add CSS to EvenNumbersTutorial style block
old_even_style = """.celebration-ring-blue {
          animation: ringExpandBlue 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          animation-delay: 0.2s;
        }"""
        
content = content.replace(old_even_style, old_even_style + css_to_add.replace('ringExpandYellow', 'ringExpandBlue'))

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated successfully")
