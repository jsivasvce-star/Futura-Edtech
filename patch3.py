import codecs
v3_path = 'src/science/class6/chapter2/version3/Chapter2LearningLab.jsx'
with codecs.open(v3_path, 'r', encoding='utf-8') as f:
    v3_content = f.read()

bad_imports = '''import heightSpecimensVideo from '../../../../assets/height-specimens.mp4';
import stemSpecimensVideo from '../../../../assets/stem-specimens.mp4';
import branchesSpecimensVideo from '../../../../assets/branches-specimens.mp4';
import plantGroupSpecimensVideo from '../../../../assets/plant-group-specimens.mp4';
'''

good_imports = '''import heightSpecimensVideo from '../../../../assets/Height.mp4';
import stemSpecimensVideo from '../../../../assets/nature-of-stem-specimens.mp4';
import branchesSpecimensVideo from '../../../../assets/appearance-of-branches-specimens.mp4';
import plantGroupSpecimensVideo from '../../../../assets/name-of-plant-group-specimens.mp4';
'''

v3_content = v3_content.replace(bad_imports, good_imports)

with codecs.open(v3_path, 'w', encoding='utf-8') as f:
    f.write(v3_content)
