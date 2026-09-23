const fs = require('fs');
const content = fs.readFileSync('src/assets/historical-facts.html', 'utf8');
const matches = content.match(/src="data:image\/[^;]+;base64,([^"]+)"/g);
if (matches) {
  matches.forEach((m, i) => {
    const b64 = m.split(',')[1].slice(0, -1);
    const buf = Buffer.from(b64, 'base64');
    if (buf[0] === 0x89 && buf[1] === 0x50) {
      const width = buf.readUInt32BE(16);
      const height = buf.readUInt32BE(20);
      console.log('Image ' + (i+1) + ' (PNG): ' + width + 'x' + height + ' aspect=' + (width/height));
    } else {
      console.log('Image ' + (i+1) + ' is not a standard PNG?');
    }
  });
}
