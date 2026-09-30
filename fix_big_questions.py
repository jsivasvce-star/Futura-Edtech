import re
import sys

file_path = r'c:\futurax\Futura-Edtech\src\social\chapter1-version3\components\ChapterIntroduction\BigQuestionsPage.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Imports
if "WordRenderer" not in content:
    imports_to_add = """import { Play, Pause } from 'lucide-react';
import page3Audio from '../audio/page3.mp3?url';
import { PAGE3_TRANSCRIPT } from './Page3Transcript';

const WordRenderer = ({ text, idPrefix, defaultColor, highlightColor, activeWordId }) => {
  const words = text.trim().split(/\\s+/);
  return (
    <>
      {words.map((word, index) => {
        const wordId = `${idPrefix}-${index + 1}`;
        const isHighlighted = activeWordId === wordId;
        const cleanWord = word.replace('\\n', '');
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
              {cleanWord}
            </span>
            {index < words.length - 1 ? ' ' : ''}
          </React.Fragment>
        );
      })}
    </>
  );
};
"""
    content = content.replace("import RotatingCompass from './RotatingCompass';", "import RotatingCompass from './RotatingCompass';\n" + imports_to_add)

# 2. Add useRef to react import
if "useRef" not in content:
    content = content.replace("import React, { useState, useEffect } from 'react';", "import React, { useState, useEffect, useRef } from 'react';")

# 3. Add State and functions
if "const audioRef = useRef(null);" not in content:
    state_to_add = """  const [isPlaying, setIsPlaying] = useState(false);
  const [activeWordId, setActiveWordId] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setActiveWordId(null);
  }, [slide]);

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
    if (audioRef.current && slide === 0) {
      const time = audioRef.current.currentTime;
      const activeWord = PAGE3_TRANSCRIPT.find(w => time >= w.start && time < w.end);
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
"""
    content = content.replace("const isLast = slide === 1;", "const isLast = slide === 1;\n\n" + state_to_add)

# 4. Wrap text in WordRenderer
# Title
content = content.replace(
    "<h2 style={{ ...HEADER_TITLE_STYLE, color: '#0A2540' }}>Every Place Has an Address</h2>",
    "<h2 style={{ ...HEADER_TITLE_STYLE, color: '#0A2540' }}><WordRenderer text=\"Every Place Has an Address\" idPrefix=\"title\" activeWordId={activeWordId} defaultColor=\"#0A2540\" highlightColor=\"#B45309\" /></h2>"
)

# Intro
content = content.replace(
    "A compass helps us describe where a place is. Explore the four main directions and see how each direction is shown on a compass.",
    "<WordRenderer text=\"A compass helps us describe where a place is. Explore the four main directions and see how each direction is shown on a compass.\" idPrefix=\"intro\" activeWordId={activeWordId} defaultColor=\"#3D2E24\" highlightColor=\"#B45309\" />"
)

# Subtitle
content = content.replace(
    "The 4 Main Directions",
    "<WordRenderer text=\"The 4 Main Directions\" idPrefix=\"subtitle\" activeWordId={activeWordId} defaultColor=\"#0A2540\" highlightColor=\"#B45309\" />"
)

# The items are rendered in a map, but we need to inject WordRenderer for them
# Let's replace the items list to include the idPrefixes
old_items = """                  {[
                    {
                      symbol: 'N',
                      name: 'North',
                      text: 'Points toward the North Pole. A magnetic compass needle always points North, and North is shown at the top of most maps.'
                    },
                    {
                      symbol: 'E',
                      name: 'East',
                      text: 'The direction where the Sun rises each morning. When you face North, East is directly to your right.'
                    },
                    {
                      symbol: 'S',
                      name: 'South',
                      text: 'Opposite to North, pointing toward the South Pole. On most maps, South is shown at the bottom.'
                    },
                    {
                      symbol: 'W',
                      name: 'West',
                      text: 'The direction where the Sun sets each evening. When you face North, West is directly to your left.'
                    }
                  ].map((item) => ("""

new_items = """                  {[
                    {
                      symbol: 'N',
                      name: 'North',
                      idPrefixName: 'N-title',
                      text: 'Points toward the North Pole. A magnetic compass needle always points North, and North is shown at the top of most maps.',
                      idPrefixText: 'N-text'
                    },
                    {
                      symbol: 'E',
                      name: 'East',
                      idPrefixName: 'E-title',
                      text: 'The direction where the Sun rises each morning. When you face North, East is directly to your right.',
                      idPrefixText: 'E-text'
                    },
                    {
                      symbol: 'S',
                      name: 'South',
                      idPrefixName: 'S-title',
                      text: 'Opposite to North, pointing toward the South Pole. On most maps, South is shown at the bottom.',
                      idPrefixText: 'S-text'
                    },
                    {
                      symbol: 'W',
                      name: 'West',
                      idPrefixName: 'W-title',
                      text: 'The direction where the Sun sets each evening. When you face North, West is directly to your left.',
                      idPrefixText: 'W-text'
                    }
                  ].map((item) => ("""

content = content.replace(old_items, new_items)

# Now replace the rendering of name and text in the loop
old_name_render = """                          {item.name}
                        </span>
                        <p style={{"""
new_name_render = """                          <WordRenderer text={item.name} idPrefix={item.idPrefixName} activeWordId={activeWordId} defaultColor="#0A2540" highlightColor="#B45309" />
                        </span>
                        <p style={{"""
content = content.replace(old_name_render, new_name_render)

old_text_render = """                          {item.text}
                        </p>
                      </div>"""
new_text_render = """                          <WordRenderer text={item.text} idPrefix={item.idPrefixText} activeWordId={activeWordId} defaultColor="#3D2E24" highlightColor="#B45309" />
                        </p>
                      </div>"""
content = content.replace(old_text_render, new_text_render)


# 5. Add Audio Button
# Search for nav buttons parallel
audio_button = """
          {/* Audio Speaker Button */}
          <button
            type="button"
            onClick={toggleAudio}
            style={{
              width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #d6e0ec',
              background: '#fff', color: isPlaying ? '#B45309' : '#0E3556',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(14,42,69,.08)',
              transition: 'all 0.2s ease',
              marginRight: 'auto',
              opacity: slide === 0 ? 1 : 0,
              pointerEvents: slide === 0 ? 'auto' : 'none'
            }}
            aria-label="Toggle Audio"
          >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
          </button>
"""
if "Toggle Audio" not in content:
    content = content.replace("        {/* Nav Buttons parallel */}\n        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>", "        {/* Nav Buttons parallel */}\n        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>" + audio_button)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Finished fixing BigQuestionsPage.jsx!")
