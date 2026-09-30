import os
import re

directory = 'src/social/chapter1-version3/components'

for root, _, files in os.walk(directory):
    for filename in files:
        if filename.endswith('.jsx') or filename.endswith('.js'):
            filepath = os.path.join(root, filename)
            
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                
            new_content = re.sub(
                r'(onClick=\{toggleAudio\}[\s\S]*?style=\{\{)([\s\S]*?)(\}\})',
                lambda m: m.group(1) + 
                          m.group(2).replace("background: 'transparent'", "background: '#fbbf24'")
                                    .replace("background: '#d97706'", "background: '#fbbf24'")
                                    .replace("color: '#fbbf24'", "color: '#0f172a'")
                                    .replace("color: '#d97706'", "color: '#0f172a'")
                                    .replace("color: '#fff'", "color: '#0f172a'")
                                    .replace("fontWeight: 800", "fontWeight: 900")
                                    .replace("fontSize: '13px'", "fontSize: '15px'")
                                    .replace("fontSize: '14px'", "fontSize: '15px'") + 
                          m.group(3),
                content
            )
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {filepath}")
