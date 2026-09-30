import urllib.request
import base64

pieces = {
    'wk': 'https://raw.githubusercontent.com/lichess-org/lila/master/public/piece/cburnett/wK.svg',
    'wq': 'https://raw.githubusercontent.com/lichess-org/lila/master/public/piece/cburnett/wQ.svg',
    'wr': 'https://raw.githubusercontent.com/lichess-org/lila/master/public/piece/cburnett/wR.svg',
    'wb': 'https://raw.githubusercontent.com/lichess-org/lila/master/public/piece/cburnett/wB.svg',
    'wn': 'https://raw.githubusercontent.com/lichess-org/lila/master/public/piece/cburnett/wN.svg',
    'wp': 'https://raw.githubusercontent.com/lichess-org/lila/master/public/piece/cburnett/wP.svg',
    'bk': 'https://raw.githubusercontent.com/lichess-org/lila/master/public/piece/cburnett/bK.svg',
    'bq': 'https://raw.githubusercontent.com/lichess-org/lila/master/public/piece/cburnett/bQ.svg',
    'br': 'https://raw.githubusercontent.com/lichess-org/lila/master/public/piece/cburnett/bR.svg',
    'bb': 'https://raw.githubusercontent.com/lichess-org/lila/master/public/piece/cburnett/bB.svg',
    'bn': 'https://raw.githubusercontent.com/lichess-org/lila/master/public/piece/cburnett/bN.svg',
    'bp': 'https://raw.githubusercontent.com/lichess-org/lila/master/public/piece/cburnett/bP.svg',
}

out = 'export const CHESS_PIECES = {\n'
for name, url in pieces.items():
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    svg = urllib.request.urlopen(req).read()
    b64 = base64.b64encode(svg).decode('utf-8')
    out += f'  "{name}": "data:image/svg+xml;base64,{b64}",\n'
out += '};\n'

with open('src/social/chapter1-version3/components/chess_pieces.js', 'w') as f:
    f.write(out)
print('Done!')
