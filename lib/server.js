const gulp = require('gulp');
const tasks = require('./tasks.js');

module.exports = {
  build: (config, files) => {
    gulp.series(
      tasks.clean(config.dest),
      tasks.initFolders(config.dest),
      tasks.inlineSources(['./src/index.html'], config.src)
    )();
  },
  dev: (config, files) => {
    gulp.series(
      tasks.clean(config.dest),
      tasks.initFolders(config.dest),
      tasks.initBrowsersync(config),
      tasks.inlineSource(files, config.src),
      tasks.watch(files, config)
    )();
  }
};
