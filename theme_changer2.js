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

  // Replace Javascript hex strings
  content = content.replace(/"#0067b8"/g, '"#e10098"');
  content = content.replace(/'#0067b8'/g, "'#e10098'");

  content = content.replace(/"#107c10"/g, '"#00d4ff"');
  content = content.replace(/'#107c10'/g, "'#00d4ff'");

  content = content.replace(/"#d83b01"/g, '"#5c2d91"');
  content = content.replace(/'#d83b01'/g, "'#5c2d91'");

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated hex strings:', file);
  }
});
console.log('Hex colors updated globally!');
