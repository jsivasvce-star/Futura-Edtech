const fs = require('fs');
const content = fs.readFileSync('src/assets/historical-facts.html', 'utf8');
const noBase64 = content.replace(/src="data:image\/[^;]+;base64,[^"]+"/g, 'src="BASE64"');
console.log(noBase64);
