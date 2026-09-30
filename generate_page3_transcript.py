import json

json_file = r'c:\futurax\Futura-Edtech\src\social\chapter1-version3\components\json\page3.json'
with open(json_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

mapping = {}

# Title: "Every Place Has an Address" (0-4)
for i in range(5):
    mapping[i] = f"title-{i+1}"

# Intro: "A compass helps us describe where a place is. Explore the four main directions and see how each direction is shown on a compass." (5-30)
for i in range(5, 31):
    mapping[i] = f"intro-{i - 5 + 1}"

# Subtitle: "The 4 Main Directions" (31-34)
mapping[31] = "subtitle-1"
mapping[32] = "subtitle-2"
mapping[33] = "subtitle-3"
mapping[34] = "subtitle-4"

# 35: are (audio-only)
# 36-40: north, east, south and west. (audio-only, or we can map them to the symbols? Let's just keep audio-only)

# North title
mapping[41] = "N-title-1"
# North text (42-63)
for i in range(42, 64):
    mapping[i] = f"N-text-{i - 42 + 1}"

# East title
mapping[64] = "E-title-1"
# 65: is (audio-only)
# East text (66-83)
for i in range(66, 84):
    mapping[i] = f"E-text-{i - 66 + 1}"

# South title
mapping[84] = "S-title-1"
# 85: is (audio-only)
# South text:
mapping[86] = "S-text-1" # opposite
mapping[87] = "S-text-2" # to
mapping[88] = "S-text-3" # north
# 89: and (audio-only)
mapping[90] = "S-text-4" # points -> pointing
mapping[91] = "S-text-5" # toward
mapping[92] = "S-text-6" # the
mapping[93] = "S-text-7" # south
mapping[94] = "S-text-8" # pole.
for i in range(95, 104):
    mapping[i] = f"S-text-{i - 95 + 9}"

# West title
mapping[104] = "W-title-1"
# 105: is (audio-only)
# West text (106-123)
for i in range(106, 124):
    mapping[i] = f"W-text-{i - 106 + 1}"

out_list = []
for i, w in enumerate(data['words']):
    item = {
        "audioWord": w['text'],
        "start": w['start'],
        "end": w['end']
    }
    if i in mapping:
        item["pageWordId"] = mapping[i]
        item["matchType"] = "matched"
    else:
        item["matchType"] = "audio-only"
    out_list.append(item)

# write the JS module
out_js = f"export const PAGE3_TRANSCRIPT = {json.dumps(out_list, indent=2)};\n"
with open(r'c:\futurax\Futura-Edtech\src\social\chapter1-version3\components\ChapterIntroduction\Page3Transcript.js', 'w', encoding='utf-8') as f:
    f.write(out_js)
