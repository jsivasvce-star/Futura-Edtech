import re

file_path = "src/science/class6/chapter2/version3/Chapter2LearningLab.jsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(r"\'backward\'", "'backward'")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated successfully")
