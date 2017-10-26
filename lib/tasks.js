const Globs = require('../config/globs.js');
const bs = require('browser-sync').create();
const htmlInjector = require('bs-html-injector');
const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const html5Lint = require('html5-lint');
const htmlAutoprefixer = require('html-autoprefixer');
const inline = require('inline-source');
const mkdirp = require('mkdirp');
const path = require('path');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);

const tasks = {
  clean: files => () => clean(files),
  init: dest => cb => init(dest),
  initBrowsersync: config => cb => initBrowsersync(config, cb),
  initFolders: dest => cb => initFolders(dest, cb),
  inlineSources: ({ files, src, dest, htmlLint }) => cb =>
    inlineSources(files, src, dest, htmlLint, cb),
  watch: (files, config) => cb => watch(files, config, cb)
};
module.exports = tasks;

function clean(files) {
  return del([files]);
}

function watch(files, config, cb) {
  const globs = Globs(config);

  gulp.watch(
    [globs.src.html, `!${config.dest}`],
    tasks.inlineSources({
      files,
      src: config.src,
      dest: config.dest,
      htmlLint: config.htmlLint
    })
  );

  gulp.watch(
    [globs.src.css, `!${config.dest}`],
    tasks.inlineSources({
      files,
      src: config.src,
      dest: config.dest,
      htmlLint: config.htmlLint
    })
  );

  cb();
}

function initFolders(dest, cb) {
  fs.mkdirSync(dest);
  cb();
}

function initBrowsersync(config, cb) {
  const globs = Globs(config);

  bs.use(htmlInjector, {
    files: [globs.dest.html]
  });

  bs.init({
    server: {
      baseDir: config.src,
      directory: true
    },
    files: [globs.src.css, globs.src.js],
    port: config.port,
    notify: false,
    open: false
  });

  bs.reload('*.html');
  cb();
}

async function inlineSources(files, src, dest, lintHtml, cb) {
  return await Promise.all(
    files.map(async file => {
      const html = await inlineSource(file, src);
      const prefixedHtml = htmlAutoprefixer.process(html);
      const destdir = path.join(dest, path.dirname(path.relative(src, file)));
      mkdirp.sync(destdir);
      if (lintHtml) {
        await htmlLint(prefixedHtml);
      }
      // path.relative is used in-case the files are nested inside the
      // src folder.
      const relativePath = path.join(dest, path.relative(src, file));
      await writeFile(
        path.isAbsolute(dest)
          ? relativePath
          : path.join(process.cwd(), relativePath),
        prefixedHtml
      );
    })
  ).catch(err => {
    console.error(err);
  });
}

function htmlLint(html) {
  return new Promise((resolve, reject) => {
    html5Lint(html, (err, res) => {
      if (err) {
        reject(err);
      }

      res.messages.forEach(msg => {
        const type = msg.type;
        const message = msg.message;
        console.log('HTML5 Lint [%s]: %s', type, message);
        if (type === 'error') {
          reject(msg);
        }
      });
      resolve();
    });
  });
}

function inlineSource(file, src) {
  return new Promise((resolve, reject) => {
    inline(
      file,
      {
        compress: true,
        rootpath: src
      },
      (err, html) => {
        if (err) {
          reject(err);
        } else {
          resolve(html);
        }
      }
    );
  });
}
