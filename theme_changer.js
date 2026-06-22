const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      filelist = fs.statSync(dirFile).isDirectory() ? walkSync(dirFile, filelist) : filelist.concat(dirFile);
    } catch (err) {
      if (err.code === 'OOM' || err.code === 'EMFILE') throw err;
    }
  });
  return filelist;
};

const tsxFiles = walkSync('./app').concat(walkSync('./components')).filter(f => f.endsWith('.tsx'));

tsxFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace background Microsoft blue with gradient or vibrant solid
  content = content.replace(/bg-\[\#0067b8\]/g, 'bg-gradient-to-r from-[#e10098] via-[#5c2d91] to-[#00d4ff]');
  content = content.replace(/bg-\[\#005da6\]/g, 'bg-gradient-to-r from-[#c00082] via-[#4a2474] to-[#00b8cc]');
  
  // Replace text Microsoft blue with vibrant pink/cyan gradient or solid cyan/pink
  content = content.replace(/text-\[\#0067b8\]/g, 'text-[#00d4ff]');
  
  // Replace border Microsoft blue
  content = content.replace(/border-\[\#0067b8\]/g, 'border-[#00d4ff]');
  content = content.replace(/hover\:border-\[\#0067b8\]/g, 'hover:border-[#00d4ff]');
  
  // Replace arbitrary accent colors in inline styles
  content = content.replace(/accentColor = "\#0067b8"/g, 'accentColor = "#e10098"');
  
  // Replace specific blue-50, blue-100 to vibrant equivalents
  content = content.replace(/text-blue-100/g, 'text-pink-100');
  content = content.replace(/text-blue-50/g, 'text-pink-50');
  content = content.replace(/shadow-blue-500/g, 'shadow-fuchsia-500');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated:', file);
  }
});
console.log('Theme changed globally!');
