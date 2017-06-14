const bs = require('browser-sync').create();
const config = require('./config.json');
const gulp = require('gulp');
const del = require('del');
const inline = require('inline-source');
const fs = require('fs');
const path = require('path');

const globs = {
  src: {
    css: `${config.src}/**/*.css`,
    html: `${config.src}/**/*.html`
  },
  dest: {
    html: `${config.dest}/**/*.html`
  }
};

function clean() {
  return del(['dist']);
}

function inlineSource(cb) {
  return inline(
    './content/index.html',
    {
      compress: true,
      rootpath: path.resolve('content')
    },
    (err, html) => {
      fs.writeFileSync('dist/index.html', html);
      cb();
    }
  );
}

function initBrowsersync() {
  bs.init({
    server: {
      baseDir: config.dest,
      directory: true
    },
    files: [globs.src.css],
    port: config.port,
    notify: false,
    open: false,
    plugins: [
      {
        module: 'bs-html-injector',
        options: {
          files: [globs.dest.html]
        }
      }
    ]
  });

  bs.reload('*.html');
}

function main(cb) {
  fs.mkdirSync('dist');
  initBrowsersync();
  cb();
}

function watch() {
  gulp.watch(globs.src.html, inlineSource);
  gulp.watch(globs.src.css, inlineSource);
}

const build = gulp.series(clean, main, inlineSource, watch);
gulp.task('default', build);
