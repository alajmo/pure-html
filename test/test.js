const child = require('child_process');
const del = require('del');
const fs = require('fs');
const html5Lint = require('html5-lint');
const path = require('path');
const test = require('tap').test;

main();

function main() {
  generateFiles();
  generateFilesPrefixDot();
  generateFilesAbsolutePath();
  generateAssets();
}

function generateFiles() {
  test('Files should be generated', t => {
    const src = 'test/files/src';
    const dest = 'test/files/dist';

    child.execSync(`node bin/pure-html -s ${src} -d ${dest} -l`, {
      stdio: [0, 1, 2]
    });

    t.equal(fs.existsSync('test/files/dist/index.html'), true, 'File exists.');

    t.equal(
      fs.existsSync('test/files/dist/index2.html'),
      true,
      'Directory file level 0 test'
    );

    t.equal(
      fs.existsSync('test/files/dist/example/index.html'),
      true,
      'Directory file level 1 test'
    );

    t.equal(
      fs.existsSync('test/files/dist/example/example-2/index-2.html'),
      true,
      'Directory file level 1 test'
    );

    t.end();
    del.sync(dest);
  });
}

function generateFilesPrefixDot() {
  test('Files should be generated when prefixing path by dot', t => {
    const src = './test/files/src';
    const dest = './test/files/dist';

    child.execSync(`node bin/pure-html -s ${src} -d ${dest} -l`, {
      stdio: [0, 1, 2]
    });

    t.equal(fs.existsSync('test/files/dist/index.html'), true, 'File exists.');

    t.equal(
      fs.existsSync('test/files/dist/index2.html'),
      true,
      'Directory file level 0 test'
    );

    t.equal(
      fs.existsSync('test/files/dist/example/index.html'),
      true,
      'Directory file level 1 test'
    );

    t.equal(
      fs.existsSync('test/files/dist/example/example-2/index-2.html'),
      true,
      'Directory file level 1 test'
    );

    t.end();
    del.sync(dest);
  });
}

function generateFilesAbsolutePath() {
  test('Files should be generated when using absolute path', t => {
    const src = path.resolve(path.join(__dirname, './files/src'));
    const dest = path.resolve(path.join(__dirname, './files/dist'));

    child.execSync(`node bin/pure-html -s ${src} -d ${dest} -l`, {
      stdio: [0, 1, 2]
    });

    t.equal(fs.existsSync('test/files/dist/index.html'), true, 'File exists.');

    t.equal(
      fs.existsSync('test/files/dist/index2.html'),
      true,
      'Directory file level 0 test'
    );

    t.equal(
      fs.existsSync('test/files/dist/example/index.html'),
      true,
      'Directory file level 1 test'
    );

    t.equal(
      fs.existsSync('test/files/dist/example/example-2/index-2.html'),
      true,
      'Directory file level 1 test'
    );

    t.end();
    del.sync(dest);
  });
}

function generateAssets() {
  test('Assets with inline attribute should be inlined', t => {
    const src = 'test/files/src2';
    const dest = 'test/files/dist2';

    child.execSync(`node bin/pure-html -s ${src} -d ${dest}`, {
      stdio: [0, 1, 2]
    });

    t.equal(
      fs.existsSync('test/files/dist2/index.html'),
      true,
      'Directory file level 0 test'
    );

    t.equal(fs.existsSync('test/files/dist2/no-inline-script.js'), true);

    t.equal(fs.existsSync('test/files/dist2/no-inline-style.css'), true);

    t.equal(fs.existsSync('test/files/dist2/nested/no-inline-script.js'), true);

    t.equal(fs.existsSync('test/files/dist2/nested/no-inline-style.css'), true);

    t.end();
    del.sync(dest);
  });
}
