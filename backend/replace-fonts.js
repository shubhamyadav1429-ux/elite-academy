const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '../frontend');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const oldLink = '<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet">';
const newLink = '<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Albert+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">';

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(oldLink, newLink);
    fs.writeFileSync(filePath, content);
}
console.log('Replaced fonts in HTML files.');
