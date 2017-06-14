#!/usr/bin/env node

const action        = require('../lib/server.js');
const defaultConfig = require('../config/default.config.json');
const fs            = require('fs');
const path          = require('path');
const program       = require('commander');

program
  .version('0.1.0')
  .option('-c, --config [path]', 'Config file location')
  .option('-d, --dev', 'Start browsersync')
  .option('-f, --file [file]', 'Only watch specific files')
  .parse(process.argv);

function getConfig() {
  const localConfig  = path.join(process.cwd(), defaultConfig.configName);
  const globalConfig = path.join(process.cwd(), defaultConfig.configName);
  if (program.config) {
    return program.config;
  } else if (fs.existsSync(localConfig)) {
    return require(localConfig);
  } else if (fs.existsSync(localConfig)) {
    return require(localConfig);
  }

  return defaultConfig;
}

function getFiles() {
  if (program.files) {
    return program.files;
  }

  return '*.html';
}

function main() {
  const config = getConfig();
  const files = getFiles();

  if (program.dev) {
    action.dev(config, files);
  } else {
    action.build(config, files);
  }

}
main();
