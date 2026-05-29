const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'public', 'apple-touch-icon.png');
const dest32 = path.join(__dirname, 'public', 'favicon-32x32.png');
const dest16 = path.join(__dirname, 'public', 'favicon-16x16.png');

try {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest32);
    fs.copyFileSync(src, dest16);
    console.log('Successfully duplicated theme favicons in public directory.');
  } else {
    console.warn('Source apple-touch-icon.png not found.');
  }
} catch (err) {
  console.error('Error duplicating favicon png files:', err);
}
