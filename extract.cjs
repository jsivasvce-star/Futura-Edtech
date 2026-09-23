const fs = require('fs');
const content = fs.readFileSync('src/assets/historical-facts.html', 'utf8');
const matches = content.match(/src="data:image\/[^;]+;base64,([^"]+)"/g);
if (matches) {
  const b64 = matches[0].split(',')[1].slice(0, -1);
  fs.writeFileSync('page1.png', b64, 'base64');
  console.log('Saved page1.png');
}
