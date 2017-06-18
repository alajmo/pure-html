const gulp = require('gulp');
const tasks = require('./tasks.js');

module.exports = {
  build: (config, files) => {
    gulp.series(
      tasks.clean(config.dest),
      tasks.initFolders(config.dest),
      tasks.inlineSources(files, config.src, config.dest)
    )();
  },
  dev: (config, files) => {
    gulp.series(
      tasks.clean(config.dest),
      tasks.initFolders(config.dest),
      tasks.initBrowsersync(config),
      tasks.inlineSources(files, config.src, config.dest),
      tasks.watch(files, config)
    )();
  }
};
