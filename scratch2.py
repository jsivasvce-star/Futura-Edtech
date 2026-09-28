import sys

file_path_leaf = 'C:/Users/GANES/Futura-Edtech/src/science/class6/chapter2/version2/LeafVenationLab/index.jsx'
with open(file_path_leaf, 'r', encoding='utf-8') as f:
    content_leaf = f.read()

target_leaf_video = """        <video
          ref={leafVideoRef}
          src={leafVenationVideoMp4}
          autoPlay
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onEnded={() => {
            setShowLeafVenationVideo(false);
          }}
        />"""

replacement_leaf_video = """        <video
          ref={leafVideoRef}
          src={leafVenationVideoMp4}
          autoPlay
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onEnded={() => {
            setShowLeafVenationVideo(false);
          }}
        />
        <button
          onClick={() => { if (onPreviousPage) onPreviousPage(); }}
          style={{
            position: 'absolute', bottom: '22px', left: '26px', display: 'flex', alignItems: 'center', gap: '8px',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
            backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
            border: '2px solid rgba(253, 230, 138, 0.85)', borderRadius: '26px', padding: '10px 22px',
            fontSize: '18px', fontWeight: 900, color: '#FFFBEB', cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75)',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 14px rgba(253, 230, 138, 0.55)',
            zIndex: 1010, transition: 'all 0.18s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <ArrowLeft size={20} /> Back
        </button>
        <button
          onClick={() => { 
            if (leafVideoRef.current) leafVideoRef.current.pause(); 
            setShowLeafVenationVideo(false); 
          }}
          style={{
            position: 'absolute', bottom: '22px', right: '26px', display: 'flex', alignItems: 'center', gap: '10px',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
            backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
            border: '2px solid rgba(253, 230, 138, 0.85)', borderRadius: '28px', padding: '11px 26px',
            fontSize: '18px', fontWeight: 900, color: '#FFFBEB', cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75)',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 14px rgba(253, 230, 138, 0.55)',
            zIndex: 1010, transition: 'all 0.18s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Next <ArrowRight size={20} />
        </button>"""

content_leaf = content_leaf.replace(target_leaf_video.replace('\n', '\r\n'), replacement_leaf_video.replace('\n', '\r\n'))
content_leaf = content_leaf.replace(target_leaf_video, replacement_leaf_video)

with open(file_path_leaf, 'w', encoding='utf-8') as f:
    f.write(content_leaf)


file_path_root = 'C:/Users/GANES/Futura-Edtech/src/science/class6/chapter2/version2/RootSystemsLab/index.jsx'
with open(file_path_root, 'r', encoding='utf-8') as f:
    content_root = f.read()

target_root_video = """        <video
          ref={activity26VideoRef}
          src={activity26VideoMp4}
          autoPlay
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onEnded={() => setShowActivity26Video(false)}
        />"""

replacement_root_video = """        <video
          ref={activity26VideoRef}
          src={activity26VideoMp4}
          autoPlay
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onEnded={() => setShowActivity26Video(false)}
        />
        <button
          onClick={() => { if (onPreviousPage) onPreviousPage(); else if (onBackToDashboard) onBackToDashboard(); }}
          style={{
            position: 'absolute', bottom: '22px', left: '26px', display: 'flex', alignItems: 'center', gap: '8px',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
            backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
            border: '2px solid rgba(253, 230, 138, 0.85)', borderRadius: '26px', padding: '10px 22px',
            fontSize: '18px', fontWeight: 900, color: '#FFFBEB', cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75)',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 14px rgba(253, 230, 138, 0.55)',
            zIndex: 1010, transition: 'all 0.18s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <ArrowLeft size={20} /> Back
        </button>
        <button
          onClick={() => { 
            if (activity26VideoRef.current) activity26VideoRef.current.pause(); 
            setShowActivity26Video(false); 
          }}
          style={{
            position: 'absolute', bottom: '22px', right: '26px', display: 'flex', alignItems: 'center', gap: '10px',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 48%, rgba(0, 0, 0, 0.28) 52%, rgba(0, 0, 0, 0.60) 100%), linear-gradient(135deg, rgba(6, 44, 28, 0.90) 0%, rgba(2, 24, 14, 0.94) 100%)',
            backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
            border: '2px solid rgba(253, 230, 138, 0.85)', borderRadius: '28px', padding: '11px 26px',
            fontSize: '18px', fontWeight: 900, color: '#FFFBEB', cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.70), 0 0 20px rgba(245, 158, 11, 0.25), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.75)',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 0 14px rgba(253, 230, 138, 0.55)',
            zIndex: 1010, transition: 'all 0.18s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Next <ArrowRight size={20} />
        </button>"""

content_root = content_root.replace(target_root_video.replace('\n', '\r\n'), replacement_root_video.replace('\n', '\r\n'))
content_root = content_root.replace(target_root_video, replacement_root_video)

with open(file_path_root, 'w', encoding='utf-8') as f:
    f.write(content_root)
print('Done!')
