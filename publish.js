const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const packagesDir = './packages';
const patchVersionRegex = /(\d+\.\d+\.)(\d+)(.*)/;

// Get a list of all the directories in /packages
const packageDirs = fs
  .readdirSync(packagesDir)
  .filter((file) => fs.statSync(path.join(packagesDir, file)).isDirectory());

for (const packageDir of packageDirs) {
  const packageJsonPath = path.join(packagesDir, packageDir, 'package.json');

  // Read the package.json file
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // Increment the patch version
  const newVersion = packageJson.version.replace(patchVersionRegex, (match, p1, p2, p3) => {
    console.log('p1: ', p1, 'p2: ', p2, 'p3: ', p3);
    return p1 + (parseInt(p2, 10) + 1) + p3;
  });

  // Update the package.json file with the new version
  packageJson.version = newVersion;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  // Run npm publish in the package directory
  execSync('npm publish --access public', { cwd: path.join(packagesDir, packageDir) });

  console.log(`Published ${packageDir}@${newVersion}`);
}
