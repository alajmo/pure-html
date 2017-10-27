const gulp = require('gulp');
const tasks = require('./tasks.js');

module.exports = {
  build: (config, htmlFiles) => {
    gulp.series(
      tasks.clean(config.dest),
      tasks.initFolders(config.dest),
      tasks.inlineSources({
        htmlFiles,
        src: config.src,
        dest: config.dest,
        htmlLint: config.htmlLint
      })
    )();
  },
  dev: (config, htmlFiles) => {
    gulp.series(
      tasks.clean(config.dest),
      tasks.initFolders(config.dest),
      tasks.initBrowsersync(config),
      tasks.inlineSources({
        htmlFiles,
        src: config.src,
        dest: config.dest,
        htmlLint: config.htmlLint
      }),
      tasks.watch(htmlFiles, config)
    )();
  }
};
