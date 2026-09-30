import codecs

v2_path = 'src/science/class6/chapter2/version2/Chapter2LearningLab.jsx'
v3_path = 'src/science/class6/chapter2/version3/Chapter2LearningLab.jsx'

with codecs.open(v2_path, 'r', encoding='utf-8') as f:
    v2_content = f.read()

with codecs.open(v3_path, 'r', encoding='utf-8') as f:
    v3_content = f.read()

# 1. Imports
imports_to_add = '''import heightSpecimensVideo from '../../../../assets/height-specimens.mp4';
import stemSpecimensVideo from '../../../../assets/stem-specimens.mp4';
import branchesSpecimensVideo from '../../../../assets/branches-specimens.mp4';
import plantGroupSpecimensVideo from '../../../../assets/plant-group-specimens.mp4';
import EducationalVideoPlayer from '../../../../components/EducationalVideoPlayer';
'''
if 'EducationalVideoPlayer' not in v3_content:
    v3_content = v3_content.replace("import TextBoard from './TextBoard';", "import TextBoard from './TextBoard';\n" + imports_to_add)

# 2. State variables
state_to_add = '''  const [isPlayingHeightVideo, setIsPlayingHeightVideo] = useState(false);
  const heightVideoRef = useRef(null);
  const [isPlayingStemVideo, setIsPlayingStemVideo] = useState(false);
  const stemVideoRef = useRef(null);
  const [isPlayingBranchesVideo, setIsPlayingBranchesVideo] = useState(false);
  const branchesVideoRef = useRef(null);
  const [isPlayingPlantGroupVideo, setIsPlayingPlantGroupVideo] = useState(false);
  const plantGroupVideoRef = useRef(null);
'''
if 'isPlayingHeightVideo' not in v3_content:
    v3_content = v3_content.replace('const [transitionSourceSubTab, setTransitionSourceSubTab] = useState(null);', 
'const [transitionSourceSubTab, setTransitionSourceSubTab] = useState(null);\n' + state_to_add)

# 3. Replace {isPlayingAct24Transition && ( ... )} and subsequent videos
start_v2 = v2_content.find('{isPlayingAct24Transition && (')
end_v2 = v2_content.find('{/* ============================================================ */', start_v2)
v2_block = v2_content[start_v2:end_v2]

start_v3 = v3_content.find('{isPlayingAct24Transition && (')
end_v3 = v3_content.find('{/* ============================================================ */', start_v3)
v3_block = v3_content[start_v3:end_v3]

if start_v2 != -1 and start_v3 != -1:
    v3_content = v3_content.replace(v3_block, v2_block)
    with codecs.open(v3_path, 'w', encoding='utf-8') as f:
        f.write(v3_content)
    print('Successfully updated Chapter2LearningLab.jsx')
else:
    print('Failed to find blocks.')
