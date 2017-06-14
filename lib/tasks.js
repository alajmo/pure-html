const Globs = require('../config/globs.js');
const bs = require('browser-sync').create();
const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const inline = require('inline-source');
const path = require('path');

const tasks = {
  clean: files => () => clean(files),
  init: dest => cb => init(dest),
  initBrowsersync: config => cb => initBrowsersync(config, cb),
  initFolders: dest => cb => initFolders(dest, cb),
  inlineSources: (files, src) => cb => inlineSources(files, src, cb),
  watch: (files, config) => cb => watch(files, config, cb)
};
module.exports = tasks;

function clean(files) {
  return del([files]);
}

function watch(files, config, cb) {
  const globs = Globs(config);
  gulp.watch(globs.src.html, tasks.inlineSource(files));
  gulp.watch(globs.src.css, tasks.inlineSource(files));
  cb();
}

function initFolders(dest, cb) {
  fs.mkdirSync(dest);
  cb();
}

function initBrowsersync(config, cb) {
  const globs = Globs(config);
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
  cb();
}

async function inlineSources(files, rootpath, cb) {
  return await Promise.all(
    files.map(async file => {
      const html = await inlineSource(file, rootpath);
      await fs.writeFileSync('dist/index.html', html);
    })
  ).catch(err => {
    throw err;
  });
}

function inlineTask(file, rootpath, resolve, reject) {
  return inline(
    file,
    {
      compress: true,
      rootpath: rootpath
    },
    (err, html) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    }
  );
}

function inlineSource(file, rootpath, resolve) {
  return new Promise((resolve, reject) => {
    inlineTask(file, rootpath, resolve, reject);
  });
}
