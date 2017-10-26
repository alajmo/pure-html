const gulp = require('gulp');
const tasks = require('./tasks.js');

module.exports = {
  build: (config, files) => {
    gulp.series(
      tasks.clean(config.dest),
      tasks.initFolders(config.dest),
      tasks.inlineSources({
        files,
        src: config.src,
        dest: config.dest,
        htmlLint: config.htmlLint
      })
    )();
  },
  dev: (config, files) => {
    gulp.series(
      tasks.clean(config.dest),
      tasks.initFolders(config.dest),
      tasks.initBrowsersync(config),
      tasks.inlineSources({
        files,
        src: config.src,
        dest: config.dest,
        htmlLint: config.htmlLint
      }),
      tasks.watch(files, config)
    )();
  }
};
