const fs = require('fs');
const path = require('path');

function createPackage(packageName) {
  const packagePath = path.join(__dirname, '..', 'src', 'packages', packageName);

  // Create the package directory
  // fs.mkdirSync(packagePath, { recursive: true });
  // Add any additional logic for creating the package
  console.log(`Package "${packageName}" created at ${packagePath}`);
}

module.exports = createPackage;
