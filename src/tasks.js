const Globs = require('../config/globs.js');
const bs = require('browser-sync').create();
const htmlInjector = require('bs-html-injector');
const del = require('del');
const fs = require('fs-extra');
const gulp = require('gulp');
const html5Lint = require('html5-lint');
const htmlAutoprefixer = require('html-autoprefixer');
const inline = require('inline-source');
const path = require('path');
const util = require('util');
const jsdom = require('jsdom');

const writeFile = util.promisify(fs.writeFile);

const tasks = Object.freeze({
  clean: files => () => clean(files),
  init: dest => cb => init(dest),
  initBrowsersync: config => cb => initBrowsersync(config, cb),
  initFolders: dest => cb => initFolders(dest, cb),
  inlineSources: ({ htmlFiles, src, dest, htmlLint }) => cb =>
    inlineSources(htmlFiles, src, dest, htmlLint, cb),
  watch: (htmlFiles, config) => cb => watch(htmlFiles, config, cb)
});

module.exports = tasks;

function watch(htmlFiles, config, cb) {
  const globs = Globs({ src: config.src, dest: config.dest });

  gulp.watch(
    [globs.src.html, `!${config.dest}`],
    tasks.inlineSources({
      htmlFiles,
      src: config.src,
      dest: config.dest,
      htmlLint: config.htmlLint
    })
  );

  gulp.watch(
    [globs.src.css, `!${config.dest}`],
    tasks.inlineSources({
      htmlFiles,
      src: config.src,
      dest: config.dest,
      htmlLint: config.htmlLint
    })
  );

  cb();
}

function clean(files) {
  return del([files], { force: true }).catch(err => console.error(err));
}

function initFolders(dest, cb) {
  fs.mkdirpSync(dest);
  cb();
}

function initBrowsersync(config, cb) {
  const globs = Globs({ src: config.src, dest: config.dest });

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

function getFileReferencesInHTML(nodeList, attr) {
  const files = [];

  nodeList.forEach(node => {
    // Prevent bug when inline elements get passed here with
    // value of src equal to empty string.
    if (node[attr] !== '') {
      files.push(node[attr]);
    }
  });

  return files;
}

/** Copy local and non-local (urls) assets */
function copyNonInlineAssets({ JSDOM, html, src, dest }) {
  const { document } = new JSDOM(html).window;

  // Retrieve non-inline assets.
  const scriptPaths = getFileReferencesInHTML(
    document.querySelectorAll('script:not([inline])'),
    'src'
  );
  const stylePaths = getFileReferencesInHTML(
    document.querySelectorAll('link:not([inline])'),
    'href'
  );

  scriptPaths.forEach(scriptPath => {
    const srcFile = path.join(src, scriptPath);
    const destFile = path.join(dest, scriptPath);
    fs.copySync(srcFile, destFile);
  });

  stylePaths.forEach(stylePath => {
    const srcFile = path.join(src, stylePath);
    const destFile = path.join(dest, stylePath);
    fs.copySync(srcFile, destFile);
  });
}

async function inlineSources(htmlFiles, src, dest, lintHtml, cb) {
  const { JSDOM } = jsdom;

  return await Promise.all(
    htmlFiles.map(async file => {
      const html = await inlineSource(file, src);

      copyNonInlineAssets({ JSDOM, html, src, dest });

      const prefixedHtml = htmlAutoprefixer.process(html);
      const destdir = path.join(dest, path.dirname(path.relative(src, file)));
      fs.mkdirpSync(destdir);

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
  return inline.inlineSource(file, {
    compress: true,
    rootpath: src
  });
}
