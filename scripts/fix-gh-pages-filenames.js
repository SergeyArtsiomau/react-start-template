const fs = require('fs');
const path = require('path');

const targetDir = process.argv[2] || 'storybook-static';

function walk(dir, result = []) {
  if (!fs.existsSync(dir)) {
    console.error(`Directory not found: ${dir}`);
    process.exit(1);
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, result);
    } else {
      result.push(fullPath);
    }
  }

  return result;
}

const allFiles = walk(targetDir);
const tildeFiles = allFiles.filter((file) => path.basename(file).includes('~'));

if (tildeFiles.length === 0) {
  console.log('No tilde filenames found — OK');
  process.exit(0);
}

const textExtensions = ['.js', '.html', '.json', '.css', '.map'];

for (const file of tildeFiles) {
  const oldBase = path.basename(file);
  const newBase = oldBase.replace(/~/g, '-');
  const newFile = path.join(path.dirname(file), newBase);

  fs.renameSync(file, newFile);
  console.log(`Renamed: ${oldBase} -> ${newBase}`);

  for (const ref of allFiles) {
    if (!textExtensions.some((ext) => ref.endsWith(ext))) {
      continue;
    }

    const content = fs.readFileSync(ref, 'utf8');
    if (content.includes(oldBase)) {
      fs.writeFileSync(ref, content.split(oldBase).join(newBase));
    }
  }
}

console.log('GitHub Pages filename fix complete');
