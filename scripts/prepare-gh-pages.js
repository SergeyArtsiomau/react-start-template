const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const storybookDir = path.join(__dirname, '..', 'storybook-static');
const storybookTargetDir = path.join(distDir, 'storybook');

function copyDirectory(source, target) {
  fs.mkdirSync(target, { recursive: true });

  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

if (!fs.existsSync(distDir)) {
  console.error('dist directory not found. Run npm run build first.');
  process.exit(1);
}

if (!fs.existsSync(storybookDir)) {
  console.error('storybook-static directory not found. Run npm run build-storybook first.');
  process.exit(1);
}

copyDirectory(storybookDir, storybookTargetDir);
fs.writeFileSync(path.join(distDir, '.nojekyll'), '');
fs.writeFileSync(path.join(storybookTargetDir, '.nojekyll'), '');

console.log('GitHub Pages artifact prepared: app at /, Storybook at /storybook/');
