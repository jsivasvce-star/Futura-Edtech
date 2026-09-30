import codecs
v3_path = 'src/science/class6/chapter2/version3/Chapter2LearningLab.jsx'
with codecs.open(v3_path, 'r', encoding='utf-8') as f:
    v3_content = f.read()

imports_to_add = '''import heightSpecimensVideo from '../../../../assets/height-specimens.mp4';
import stemSpecimensVideo from '../../../../assets/stem-specimens.mp4';
import branchesSpecimensVideo from '../../../../assets/branches-specimens.mp4';
import plantGroupSpecimensVideo from '../../../../assets/plant-group-specimens.mp4';
import EducationalVideoPlayer from '../../../../components/EducationalVideoPlayer';
'''
v3_content = v3_content.replace("import Chapter2CoverPage from './Chapter2CoverPage';", "import Chapter2CoverPage from './Chapter2CoverPage';\n" + imports_to_add)

with codecs.open(v3_path, 'w', encoding='utf-8') as f:
    f.write(v3_content)
