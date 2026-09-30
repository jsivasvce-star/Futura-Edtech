import sys

file_path = 'C:/Users/GANES/Futura-Edtech/src/science/class6/chapter2/version2/RootSystemsLab/index.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace 1: Video import
target_import = "import specimen06OverviewBlended from './specimen_06_overview_blended.png';"
replacement_import = "import specimen06OverviewBlended from './specimen_06_overview_blended.png';\nimport activity26VideoMp4 from '../../../../../assets/activity26/activity26-specimens.mp4';"
content = content.replace(target_import, replacement_import)

# Replace 2: State variables
target_state = "  const [specimenIndex, setSpecimenIndex] = useState(initialSpecimenIndex);"
replacement_state = "  const [specimenIndex, setSpecimenIndex] = useState(initialSpecimenIndex);\n  const [showActivity26Video, setShowActivity26Video] = useState(false);\n  const activity26VideoRef = useRef(null);"
content = content.replace(target_state, replacement_state)

# Replace 3: Keyboard handler
target_keyboard = """      if (e.key === 'ArrowLeft') {
        if (specimenIndex > 0) {
          setSpecimenIndex(prev => prev - 1);
        } else if (onPreviousPage) {
          onPreviousPage();
        }
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        if (specimenIndex < ROOT_SPECIMEN_SLIDES.length - 1) {
          setSpecimenIndex(prev => prev + 1);
        } else if (onNext) {
          onNext();
        } else {
          setPhase('lab');
        }
      }"""

replacement_keyboard = """      if (e.key === 'ArrowLeft') {
        if (specimenIndex === 1) {
          if (activity26VideoRef.current) activity26VideoRef.current.currentTime = 0;
          setShowActivity26Video(true);
        } else if (specimenIndex > 0) {
          setSpecimenIndex(prev => prev - 1);
        } else if (onPreviousPage) {
          onPreviousPage();
        }
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        if (specimenIndex === 0) {
          setSpecimenIndex(1);
          setShowActivity26Video(true);
        } else if (specimenIndex < ROOT_SPECIMEN_SLIDES.length - 1) {
          setSpecimenIndex(prev => prev + 1);
        } else if (onNext) {
          onNext();
        } else {
          setPhase('lab');
        }
      }"""

content = content.replace(target_keyboard.replace('\n', '\r\n'), replacement_keyboard.replace('\n', '\r\n'))
content = content.replace(target_keyboard, replacement_keyboard)

# Replace 4: Video component rendering
target_render = """  if (phase === 'specimens') {
    const activeSlide = ROOT_SPECIMEN_SLIDES[specimenIndex];
    return (
      <div"""

replacement_render = """  if (showActivity26Video) {
    return (
      <div style={{
        position: 'fixed', inset: 0, width: '100vw', height: '100vh',
        backgroundColor: '#000', zIndex: 1000, display: 'flex',
        alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
      }}>
        <style>{`html, body, #root { overflow: hidden !important; height: 100vh !important; }`}</style>
        <video
          ref={activity26VideoRef}
          src={activity26VideoMp4}
          autoPlay
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onEnded={() => setShowActivity26Video(false)}
        />
      </div>
    );
  }

  if (phase === 'specimens') {
    const activeSlide = ROOT_SPECIMEN_SLIDES[specimenIndex];
    return (
      <div"""

content = content.replace(target_render.replace('\n', '\r\n'), replacement_render.replace('\n', '\r\n'))
content = content.replace(target_render, replacement_render)

# Replace 5: Floating Back Button
target_back = """        <button
          onClick={() => {
            if (specimenIndex > 0) {
              setSpecimenIndex(prev => prev - 1);
            } else if (onPreviousPage) {
              onPreviousPage();
            } else if (onBackToDashboard) {
              onBackToDashboard();
            }
          }}
          style={{"""

replacement_back = """        <button
          onClick={() => {
            if (specimenIndex === 1) {
              if (activity26VideoRef.current) activity26VideoRef.current.currentTime = 0;
              setShowActivity26Video(true);
            } else if (specimenIndex > 0) {
              setSpecimenIndex(prev => prev - 1);
            } else if (onPreviousPage) {
              onPreviousPage();
            } else if (onBackToDashboard) {
              onBackToDashboard();
            }
          }}
          style={{"""

content = content.replace(target_back.replace('\n', '\r\n'), replacement_back.replace('\n', '\r\n'))
content = content.replace(target_back, replacement_back)

# Replace 6: Floating Next Button
target_next = """        <button
          onClick={() => {
            if (specimenIndex < ROOT_SPECIMEN_SLIDES.length - 1) {
              setSpecimenIndex(prev => prev + 1);
            } else if (onNext) {
              onNext();
            } else {
              setPhase('lab');
            }
          }}
          style={{"""

replacement_next = """        <button
          onClick={() => {
            if (specimenIndex === 0) {
              setSpecimenIndex(1);
              setShowActivity26Video(true);
            } else if (specimenIndex < ROOT_SPECIMEN_SLIDES.length - 1) {
              setSpecimenIndex(prev => prev + 1);
            } else if (onNext) {
              onNext();
            } else {
              setPhase('lab');
            }
          }}
          style={{"""

content = content.replace(target_next.replace('\n', '\r\n'), replacement_next.replace('\n', '\r\n'))
content = content.replace(target_next, replacement_next)


with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Done!')
