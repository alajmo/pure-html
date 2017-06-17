const action = require('../lib/server.js');
const defaultConfig = require('../config/.purehtmlrc.json');
const pureHtmlConfig = require('../config/config.json');
const fs = require('fs');
const glob = require('glob');
const os = require('os');
const path = require('path');
const program = require('commander');

program
  .version('0.2.0')
  .option('-c, --config [path]', 'Config file location')
  .option('-d, --dev', 'Start browsersync')
  .option('-f, --file [file]', 'Only watch specific files')
  .parse(process.argv);


function getConfig() {
  const localConfigPath = path.join(process.cwd(), pureHtmlConfig.configName);
  const globalConfigPath = path.join(os.homedir(), pureHtmlConfig.configName);

  if (program.config) {
    return require(path.join(process.cwd(), program.config));
  }

  if (fs.existsSync(localConfigPath)) {
    return require(localConfigPath);
  }

  if (fs.existsSync(globalConfigPath)) {
    return require(globalConfigPath);
  }

  return pureHtmlConfig;
}

function main() {
  const config = getConfig();
  const files = program.files
    ? program.files
    : glob.sync(`${config.src}/**/*.html`);

  if (program.dev) {
    action.dev(config, files);
  } else {
    action.build(config, files);
  }
}
main();
