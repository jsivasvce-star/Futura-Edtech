import re

file_path = r'c:\futurax\Futura-Edtech\src\social\chapter1-version3\components\CoordinatesPage.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace <strong> with **
content = re.sub(r'<strong>', '**', content)
content = re.sub(r'</strong>', '**', content)

# 2. Replace <span ...> text </span>, with "text", inside paragraphs: [...]
# This is tricky because JSX has newlines.
# Let's just find the `paragraphs: [` block and replace the spans.
# Actually, the quickest way is to just do a smart regex for spans inside paragraphs.
content = re.sub(r'<span key="[^"]+">([^<]+(?:<[^>]+>[^<]+)*?)</span>', r'"\1"', content)
# wait, there might be nested tags? We already removed <strong>. Are there others?
# there might be some &nbsp; but that's fine.

# 3. Add imports at the top
imports = """import WordRenderer from './WordRenderer';
"""
for i in range(46, 61):
    imports += f"import page{i}Audio from './audio/page{i}.mp3?url';\n"
    imports += f"import {{ PAGE{i}_TRANSCRIPT }} from './Page{i}Transcript';\n"

content = content.replace("import './CoordinatesPageBook.css';", imports + "import './CoordinatesPageBook.css';")

# 4. Add states and audio ref
states = """  const [isPlaying, setIsPlaying] = useState(false);
  const [activeWordId, setActiveWordId] = useState(null);
  const audioRef = React.useRef(null);

  React.useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  React.useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [currentStepIdx]);

  React.useEffect(() => {
    const handleEnded = () => {
      setIsPlaying(false);
      setActiveWordId(null);
    };

    const currentAudio = audioRef.current;
    if (currentAudio) {
      currentAudio.addEventListener('ended', handleEnded);
      return () => {
        currentAudio.removeEventListener('ended', handleEnded);
      };
    }
  }, [currentStepIdx]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const currentTime = audioRef.current.currentTime;
    
    let transcript = null;
"""
for i, p in enumerate(range(46, 61)):
    states += f"    if (currentStepIdx === {i + 4}) transcript = PAGE{p}_TRANSCRIPT;\n"
    
states += """
    if (transcript) {
      const activeWord = transcript.find(word => currentTime >= word.start && currentTime <= word.end);
      if (activeWord && activeWord.matchType === 'matched') {
        setActiveWordId(activeWord.pageWordId);
      } else {
        setActiveWordId(null);
      }
    }
  };

  const getAudioSrc = () => {
"""
for i, p in enumerate(range(46, 61)):
    states += f"    if (activeGlobeIdx === {i + 1}) return page{p}Audio;\n"
states += "    return null;\n  };\n"

# insert after const [currentStepIdx, setCurrentStepIdx] = useState(0);
content = content.replace("const [currentStepIdx, setCurrentStepIdx] = useState(0);", "const [currentStepIdx, setCurrentStepIdx] = useState(0);\n" + states)

# 5. Add Audio tag before <div className="dark-coords-main-content">
content = content.replace('<div className="dark-coords-main-content">', '<audio ref={audioRef} src={getAudioSrc()} onTimeUpdate={handleTimeUpdate} />\n      <div className="dark-coords-main-content">')

# 6. Add Play button and WordRenderer
# Find STEP {activeGlobeIdx + 1} OF {totalGlobeSteps}
play_btn = """<div className="dark-step-eyebrow" style={{ margin: 0 }}>STEP {activeGlobeIdx + 1} OF {totalGlobeSteps}</div>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15].includes(activeGlobeIdx) && (
              <button
                onClick={toggleAudio}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '6px 14px', background: 'transparent',
                  border: '1.5px solid #fbbf24', borderRadius: '999px',
                  fontSize: '13px', fontWeight: 800, color: '#fbbf24',
                  cursor: 'pointer',
                  marginTop: '-10px'
                }}
              >
                {isPlaying ? "Pause" : "Play"}
              </button>
            )}"""

content = content.replace('<div className="dark-step-eyebrow">STEP {activeGlobeIdx + 1} OF {totalGlobeSteps}</div>', play_btn)

# replace title
title_rep = """{[0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15].includes(activeGlobeIdx) ? (
              <WordRenderer text={step.title} idPrefix="h" defaultColor="inherit" highlightColor="#fbbf24" activeWordId={activeWordId} />
            ) : (
              step.title
            )}"""
content = content.replace('{step.title}', title_rep)

# replace paragraphs
para_rep = """{typeof p === 'string' && [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15].includes(activeGlobeIdx) ? (
                <WordRenderer text={p} idPrefix={`p${idx + 1}`} defaultColor="inherit" highlightColor="#fbbf24" activeWordId={activeWordId} />
              ) : p}"""
content = content.replace('{p}', para_rep)


with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("CoordinatesPage.jsx updated via python script.")
