const fs = require('fs');
const path = require('path');

// Create dist/images/team directory if it doesn't exist
const distTeamDir = path.join(__dirname, '../dist/images/team');
const publicTeamDir = path.join(__dirname, '../public/images/team');

try {
  // Create directory if it doesn't exist
  if (!fs.existsSync(distTeamDir)) {
    fs.mkdirSync(distTeamDir, { recursive: true });
  }

  // Copy files from public/images/team to dist/images/team
  if (fs.existsSync(publicTeamDir)) {
    const files = fs.readdirSync(publicTeamDir);
    files.forEach(file => {
      const sourcePath = path.join(publicTeamDir, file);
      const destPath = path.join(distTeamDir, file);
      
      if (fs.statSync(sourcePath).isFile()) {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`✅ Copied: ${file}`);
      }
    });
  } else {
    console.log('⚠️  Source directory public/images/team does not exist');
  }
} catch (error) {
  console.log('⚠️  Error copying assets:', error.message);
  // Don't fail the build if copying fails
  process.exit(0);
}
