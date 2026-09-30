import json
import re

json_file = r'c:\futurax\Futura-Edtech\src\social\chapter1-version3\components\json\page4.json'
with open(json_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

mapping = {}

# 0: What
# 1: will
# 2: we
# 3: discover?
mapping[0] = "title-1"
mapping[1] = "title-2"
mapping[2] = "title-3"
mapping[3] = "title-4"

# 4: Maps
mapping[4] = "c-maps-t-1"

# 5: What
# 6: is
# 7: a
# 8: map
# 9: and
# 10: how
# 11: do
# 12: we
# 13: use
# 14: it?
for i in range(5, 15):
    mapping[i] = f"c-maps-q-{i - 5 + 1}"

# Visual for Maps Q: "What is a map and how do we use it? What are its main components?"
# 1-10 is "What is a map and how do we use it?"
# 11: What, 12: are, 13: its, 14: main, 15: components.
# Audio: 15: Let 16: us 17: find 18: out 19: what 20: a 21: map 22: is 23: and 24: learn 25: about 26: its 27: main 28: components.
mapping[19] = "c-maps-q-11"
# skip 'are' (12)
mapping[26] = "c-maps-q-13"
mapping[27] = "c-maps-q-14"
mapping[28] = "c-maps-q-15"

# 29: Coordinates
mapping[29] = "c-coordinates-t-1"

# 30: What
# 31: are
# 32: coordinates?
mapping[30] = "c-coordinates-q-1"
mapping[31] = "c-coordinates-q-2"
mapping[32] = "c-coordinates-q-3"

# Visual Coordinates Q: "What are coordinates? How can latitude and longitude be used to mark any location on the Earth?" (17 words)
# Audio: 33: Let 34: us 35: see 36: how 37: latitude 38: and 39: longitude 40: can 41: be 42: used 43: to 44: mark 45: any 46: location 47: on 48: the 49: earth.
mapping[36] = "c-coordinates-q-4"
mapping[40] = "c-coordinates-q-5" # can
mapping[37] = "c-coordinates-q-6"
mapping[38] = "c-coordinates-q-7"
mapping[39] = "c-coordinates-q-8"
mapping[41] = "c-coordinates-q-9" # be
mapping[42] = "c-coordinates-q-10"
mapping[43] = "c-coordinates-q-11"
mapping[44] = "c-coordinates-q-12"
mapping[45] = "c-coordinates-q-13"
mapping[46] = "c-coordinates-q-14"
mapping[47] = "c-coordinates-q-15"
mapping[48] = "c-coordinates-q-16"
mapping[49] = "c-coordinates-q-17"

# 50: Time
mapping[50] = "c-time-t-1"
# 51-60
for i in range(51, 61):
    mapping[i] = f"c-time-q-{i - 51 + 1}"

# 61-72 audio only

# 73-101 Mission
for i in range(73, 102):
    mapping[i] = f"mission-{i - 73 + 1}"

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
out_js = f"export const PAGE4_TRANSCRIPT = {json.dumps(out_list, indent=2)};\n"
with open(r'c:\futurax\Futura-Edtech\src\social\chapter1-version3\components\ChapterIntroduction\Page4Transcript.js', 'w', encoding='utf-8') as f:
    f.write(out_js)

# Patch BigQuestionsPage.jsx
file_path = r'c:\futurax\Futura-Edtech\src\social\chapter1-version3\components\ChapterIntroduction\BigQuestionsPage.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Imports
if "import page4Audio" not in content:
    content = content.replace("import page3Audio from '../audio/page3.mp3?url';", "import page3Audio from '../audio/page3.mp3?url';\nimport page4Audio from '../audio/page4.mp3?url';")

if "import { PAGE4_TRANSCRIPT }" not in content:
    content = content.replace("import { PAGE3_TRANSCRIPT } from './Page3Transcript';", "import { PAGE3_TRANSCRIPT } from './Page3Transcript';\nimport { PAGE4_TRANSCRIPT } from './Page4Transcript';")

# 2. Audio src logic
content = content.replace("src={slide === 0 ? page3Audio : undefined}", "src={slide === 0 ? page3Audio : slide === 1 ? page4Audio : undefined}")

# 3. handleTimeUpdate logic
old_handleTimeUpdate = """  const handleTimeUpdate = () => {
    if (audioRef.current && slide === 0) {
      const time = audioRef.current.currentTime;
      const activeWord = PAGE3_TRANSCRIPT.find(w => time >= w.start && time < w.end);"""
new_handleTimeUpdate = """  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const time = audioRef.current.currentTime;
      const transcript = slide === 0 ? PAGE3_TRANSCRIPT : slide === 1 ? PAGE4_TRANSCRIPT : [];
      const activeWord = transcript.find(w => time >= w.start && time < w.end);"""
content = content.replace(old_handleTimeUpdate, new_handleTimeUpdate)

# 4. Audio Button logic
old_button_opacity = """              opacity: slide === 0 ? 1 : 0,
              pointerEvents: slide === 0 ? 'auto' : 'none'"""
new_button_opacity = """              opacity: (slide === 0 || slide === 1) ? 1 : 0,
              pointerEvents: (slide === 0 || slide === 1) ? 'auto' : 'none'"""
content = content.replace(old_button_opacity, new_button_opacity)


# 5. Wrap text in slide 1
# Title
content = content.replace(
    "<h2 style={HEADER_TITLE_STYLE}>What Will We Discover?</h2>",
    "<h2 style={HEADER_TITLE_STYLE}><WordRenderer text=\"What Will We Discover?\" idPrefix=\"title\" activeWordId={activeWordId} defaultColor=\"#78350F\" highlightColor=\"#B45309\" /></h2>"
)

# Cards
old_card_title = """                          <span style={{
                            fontFamily: '"Space Grotesk", sans-serif',
                            fontWeight: 800,
                            fontSize: '22px',
                            color: '#0A2540',
                            lineHeight: 1.2,
                            marginBottom: '4px'
                          }}>
                            {card.title}
                          </span>
                          <p style={{
                            margin: 0,
                            fontSize: '19px',
                            lineHeight: 1.38,
                            color: '#3D2E24',
                            fontWeight: 500
                          }}>
                            {card.question}
                          </p>"""
new_card_title = """                          <span style={{
                            fontFamily: '"Space Grotesk", sans-serif',
                            fontWeight: 800,
                            fontSize: '22px',
                            color: '#0A2540',
                            lineHeight: 1.2,
                            marginBottom: '4px'
                          }}>
                            <WordRenderer text={card.title} idPrefix={`c-${card.id}-t`} activeWordId={activeWordId} defaultColor="#0A2540" highlightColor="#B45309" />
                          </span>
                          <p style={{
                            margin: 0,
                            fontSize: '19px',
                            lineHeight: 1.38,
                            color: '#3D2E24',
                            fontWeight: 500
                          }}>
                            <WordRenderer text={card.question} idPrefix={`c-${card.id}-q`} activeWordId={activeWordId} defaultColor="#3D2E24" highlightColor="#B45309" />
                          </p>"""
content = content.replace(old_card_title, new_card_title)

# Mission
old_mission = """                    <p style={{ color: '#78350F', fontSize: '20px', lineHeight: 1.45, margin: 0, fontWeight: 600, textAlign: 'justify', textJustify: 'inter-word' }}>
                      By the end of this chapter, you will be able to locate places on Earth, read maps confidently, and understand how coordinates and time help us navigate our world.
                    </p>"""
new_mission = """                    <p style={{ color: '#78350F', fontSize: '20px', lineHeight: 1.45, margin: 0, fontWeight: 600, textAlign: 'justify', textJustify: 'inter-word' }}>
                      <WordRenderer text="By the end of this chapter, you will be able to locate places on Earth, read maps confidently, and understand how coordinates and time help us navigate our world." idPrefix="mission" activeWordId={activeWordId} defaultColor="#78350F" highlightColor="#B45309" />
                    </p>"""
content = content.replace(old_mission, new_mission)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Finished generation and patching for slide 1!")
