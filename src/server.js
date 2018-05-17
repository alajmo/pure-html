const gulp = require('gulp');
const tasks = require('./tasks.js');

module.exports = {
  build: (options, htmlFiles) => {
    gulp.series(
      tasks.clean(options.dest),
      tasks.initFolders(options.dest),
      tasks.inlineSources({
        htmlFiles,
        src: options.src,
        dest: options.dest,
        htmlLint: options.htmlLint
      })
    )();
  },
  dev: (options, htmlFiles) => {
    gulp.series(
      tasks.clean(options.dest),
      tasks.initFolders(options.dest),
      tasks.initBrowsersync(options),
      tasks.inlineSources({
        htmlFiles,
        src: options.src,
        dest: options.dest,
        htmlLint: options.htmlLint
      }),
      tasks.watch(htmlFiles, options)
    )();
  }
};
