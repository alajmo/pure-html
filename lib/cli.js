const cli = {
  printConfigUsed
};

module.exports = cli;

// Prints the config used and where the file is located.
function printConfigUsed({ configType, file }) {
  switch (configType) {
    case 'program':
      console.log('Using user entered config:', file);
      break;
    case 'local':
      console.log('Using local config:', file);
      break;
    case 'global':
      console.log('Using global config:', file);
      break;
    default:
      console.log('Using default config:', file);
  }
}
