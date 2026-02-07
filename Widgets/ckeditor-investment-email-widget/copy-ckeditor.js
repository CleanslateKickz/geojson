// This script is for copying CKEditor files during development
// In production, these files should be manually copied or included in the repository

const fs = require('fs');
const path = require('path');

const sourceDir = '../Grist-CKEditor-Emails/ckeditor5';
const targetDir = './ckeditor5';

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (fs.existsSync(sourceDir)) {
  copyDirectory(sourceDir, targetDir);
  console.log('CKEditor files copied successfully');
} else {
  console.log('Source CKEditor directory not found');
}