import re

file_path = "src/science/class6/chapter2/version3/Chapter2LearningLab.jsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

target = r'''(if\s*\(heightVideoRef\.current\)\s*heightVideoRef\.current\.pause\(\);\s*)setIsPlayingHeightVideo\(false\);\s*setIsPlayingAct24Transition\(true\);\s*setIsAct24TransitionEnded\(false\);'''

replacement = r'''\g<1>setIsPlayingHeightVideo(false);
                  setCurrentStep(4);'''

content = re.sub(target, replacement, content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated successfully")
