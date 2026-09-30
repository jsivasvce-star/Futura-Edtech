import json
import re
import sys

json_file = r'c:\futurax\Futura-Edtech\src\social\chapter1-version3\components\json\page5.json'
with open(json_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Word mapping for page 5
# 0: Welcome 1: to 2: the 3: city. 
# 4: Help 5: Spider 6: -Man 7: navigate 8: through 9: the 10: town 11: and 12: reach 13: the 14: bank 15: from 16: the 17: railway 18: station. 
# 19: Use 20: the 21: direction 22: controls 23: to 24: guide 25: him 26: safely. 
# 27: Let's 28: go.

mapping = {}
for i in range(4):
    mapping[i] = f"welcome-{i+1}"
    
for i in range(4, 19):
    mapping[i] = f"help-{i-4+1}"

for i in range(19, 27):
    mapping[i] = f"use-{i-19+1}"
    
mapping[27] = "lets-1"
mapping[28] = "lets-2"

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

out_js = f"export const PAGE5_TRANSCRIPT = {json.dumps(out_list, indent=2)};\n"
with open(r'c:\futurax\Futura-Edtech\src\social\chapter1-version3\components\LostInTheCity\Page5Transcript.js', 'w', encoding='utf-8') as f:
    f.write(out_js)

# Modify FindingRoutePage.jsx
file_path = r'c:\futurax\Futura-Edtech\src\social\chapter1-version3\components\LostInTheCity\FindingRoutePage.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Imports
if "WordRenderer" not in content:
    word_renderer = """
const WordRenderer = ({ text, idPrefix, defaultColor, highlightColor, activeWordId }) => {
  const words = text.trim().split(/\\s+/);
  return (
    <>
      {words.map((word, index) => {
        const wordId = `${idPrefix}-${index + 1}`;
        const isHighlighted = activeWordId === wordId;
        return (
          <React.Fragment key={index}>
            <span
              data-word-id={wordId}
              style={{
                color: isHighlighted ? highlightColor : defaultColor,
                background: isHighlighted ? 'rgba(180, 83, 9, 0.1)' : 'transparent',
                borderRadius: '4px',
                padding: '0 2px',
                transition: 'all 0.15s ease-out'
              }}>
              {word}
            </span>
            {index < words.length - 1 ? ' ' : ''}
          </React.Fragment>
        );
      })}
    </>
  );
};
"""
    content = content.replace("import TownMap3DExplorer from './TownMap3DExplorer';", "import TownMap3DExplorer from './TownMap3DExplorer';\nimport { Play, Pause } from 'lucide-react';\nimport page5Audio from '../audio/page5.mp3?url';\nimport { PAGE5_TRANSCRIPT } from './Page5Transcript';\n" + word_renderer)

# Audio State
if "const audioRef = useRef(null);" not in content:
    state = """
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeWordId, setActiveWordId] = useState(null);
  const audioRef = useRef(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const time = audioRef.current.currentTime;
      const activeWord = PAGE5_TRANSCRIPT.find(w => time >= w.start && time < w.end);
      let newActiveId = null;
      if (activeWord && activeWord.matchType === 'matched') {
        newActiveId = activeWord.pageWordId;
      }
      if (newActiveId !== activeWordId) {
        setActiveWordId(newActiveId);
      }
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setActiveWordId(null);
  };

  const audioButton = mapMode === 'town' ? (
    <button
      type="button"
      onClick={toggleAudio}
      style={{
        width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #d6e0ec',
        background: '#fff', color: isPlaying ? '#B45309' : '#0E3556',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(14,42,69,.08)',
        transition: 'all 0.2s ease',
      }}
      aria-label="Toggle Audio"
    >
      {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
    </button>
  ) : null;
"""
    content = content.replace("const [activeRoadNameClassic, setActiveRoadNameClassic] = useState('');", "const [activeRoadNameClassic, setActiveRoadNameClassic] = useState('');\n" + state)

# Inject audio tag just inside return
content = content.replace(
    "return (\n    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>",
    "return (\n    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>\n      <audio ref={audioRef} src={page5Audio} onTimeUpdate={handleTimeUpdate} onEnded={handleAudioEnded} />"
)

# Inject activeWordId into TownMap3DExplorer props
content = content.replace(
    "                <TownMap3DExplorer\n                  onComplete={(steps, visited) => {",
    "                <TownMap3DExplorer\n                  activeWordId={activeWordId}\n                  onComplete={(steps, visited) => {"
)

# Inject audioButton to ChapterBackFooter
content = content.replace(
    "        nextVariant=\"green\"\n      />",
    "        nextVariant=\"green\"\n        beforeNextContent={audioButton}\n      />"
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

# Modify TownMap3DExplorer.jsx to accept activeWordId and wrap words
file_path_town = r'c:\futurax\Futura-Edtech\src\social\chapter1-version3\components\LostInTheCity\TownMap3DExplorer.jsx'
with open(file_path_town, 'r', encoding='utf-8') as f:
    content_town = f.read()

# Add WordRenderer import if not there
if "WordRenderer" not in content_town:
    word_renderer = """
const WordRenderer = ({ text, idPrefix, defaultColor, highlightColor, activeWordId }) => {
  const words = text.trim().split(/\\s+/);
  return (
    <>
      {words.map((word, index) => {
        const wordId = `${idPrefix}-${index + 1}`;
        const isHighlighted = activeWordId === wordId;
        return (
          <React.Fragment key={index}>
            <span
              data-word-id={wordId}
              style={{
                color: isHighlighted ? highlightColor : defaultColor,
                background: isHighlighted ? 'rgba(180, 83, 9, 0.1)' : 'transparent',
                borderRadius: '4px',
                padding: '0 2px',
                transition: 'all 0.15s ease-out'
              }}>
              {word}
            </span>
            {index < words.length - 1 ? ' ' : ''}
          </React.Fragment>
        );
      })}
    </>
  );
};
"""
    content_town = content_town.replace("import React, { useState, useEffect } from 'react';", "import React, { useState, useEffect } from 'react';\n" + word_renderer)

# Add activeWordId to props
content_town = content_town.replace("const TownMap3DExplorer = ({ onComplete, onNext, hideSidebar = false, showQuiz = false }) => {", "const TownMap3DExplorer = ({ onComplete, onNext, hideSidebar = false, showQuiz = false, activeWordId }) => {")

# Wrap texts
old_h2 = "            <h2 style={{ color: '#92400E', fontSize: '28px', fontWeight: 900, marginBottom: '16px', fontFamily: 'Space Grotesk, sans-serif' }}>\n              Welcome to the City!\n            </h2>"
new_h2 = "            <h2 style={{ color: '#92400E', fontSize: '28px', fontWeight: 900, marginBottom: '16px', fontFamily: 'Space Grotesk, sans-serif' }}>\n              <WordRenderer text=\"Welcome to the City!\" idPrefix=\"welcome\" activeWordId={activeWordId} defaultColor=\"#92400E\" highlightColor=\"#B45309\" />\n            </h2>"
content_town = content_town.replace(old_h2, new_h2)

old_p = "            <p style={{ color: '#475569', fontSize: '18px', fontWeight: 600, lineHeight: 1.5, marginBottom: '32px' }}>\n              Help Spider-Man navigate through the town to reach the Bank from the Railway Station. Use the Direction Controls to guide him safely!\n            </p>"
new_p = "            <p style={{ color: '#475569', fontSize: '18px', fontWeight: 600, lineHeight: 1.5, marginBottom: '32px' }}>\n              <WordRenderer text=\"Help Spider-Man navigate through the town to reach the Bank from the Railway Station.\" idPrefix=\"help\" activeWordId={activeWordId} defaultColor=\"#475569\" highlightColor=\"#B45309\" /> <WordRenderer text=\"Use the Direction Controls to guide him safely!\" idPrefix=\"use\" activeWordId={activeWordId} defaultColor=\"#475569\" highlightColor=\"#B45309\" />\n            </p>"
content_town = content_town.replace(old_p, new_p)

old_btn = "              Let's Go!\n            </button>"
new_btn = "              <WordRenderer text=\"Let's Go!\" idPrefix=\"lets\" activeWordId={activeWordId} defaultColor=\"#FFFFFF\" highlightColor=\"#000000\" />\n            </button>"
content_town = content_town.replace(old_btn, new_btn)

with open(file_path_town, 'w', encoding='utf-8') as f:
    f.write(content_town)

print("Done")
