const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'pages', 'public');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('SEOHead')) return;

  const pageName = file.replace('.jsx', '').replace(/([A-Z])/g, ' $1').trim();
  
  // Add import
  const importStatement = `import SEOHead from '../../components/system/SEOHead';\n`;
  content = importStatement + content;

  // Let's make the regex more robust to handle multiline or other tags
  const returnMatch = content.match(/return\s*\(\s*(<[^>]+>)/);
  if (returnMatch) {
    const insertStr = `\n      <SEOHead title="${pageName} | NIETBI" description="Explore ${pageName} at NIE TBI." />`;
    const newReturn = returnMatch[0] + insertStr;
    content = content.replace(returnMatch[0], newReturn);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  } else {
    console.log(`Still could not find return block in ${file}`);
  }
});
