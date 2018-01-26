const child = require('child_process');
const jsdom = require('jsdom');
const { promisify } = require('util');
const { JSDOM } = jsdom;
const del = require('del');
const fs = require('fs');
const path = require('path');
const test = require('tap').test;

const readFile = promisify(fs.readFile);

main();

function main() {
  generateFiles();
  generateFilesPrefixDot();
  generateFilesAbsolutePath();
  generateAssets();
}

function generateFiles() {
  test('Html files should be generated', async t => {
    const { JSDOM } = jsdom;

    const src = 'test/files/src';
    const dest = 'test/files/dist';

    let html = await readFile('test/files/src/index.html', 'utf-8');
    let jsDOM = new JSDOM(html).window;
    let numStyleElements = jsDOM.document.querySelectorAll('link[inline]');
    t.equal(
      Object.keys(numStyleElements).length,
      2,
      'Contains 2 link elements with inline attribute'
    );

    child.execSync(`node bin/pure-html -s ${src} -d ${dest} -l`, {
      stdio: [0, 1, 2]
    });

    t.equal(fs.existsSync('test/files/dist/index.html'), true, 'File exists.');

    html = await readFile('test/files/dist/index.html', 'utf-8');
    jsDOM = new JSDOM(html).window;
    numStyleElements = jsDOM.document.querySelectorAll('style');
    t.equal(Object.keys(numStyleElements).length, 2, 'Contains 2 inline style elements')

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

    html = await readFile('test/files/src/example/example-2/index-2.html', 'utf-8');
    jsDOM = new JSDOM(html).window;
    numStyleElements = jsDOM.document.querySelectorAll('link[inline]');
    t.equal(
      Object.keys(numStyleElements).length,
      1,
      'Contains 1 link elements with inline attribute'
    );

    t.equal(
      fs.existsSync('test/files/dist/example/example-2/index-2.html'),
      true,
      'Directory file level 1 test'
    );

    html = await readFile('test/files/dist/example/example-2/index-2.html', 'utf-8');
    jsDOM = new JSDOM(html).window;
    numStyleElements = jsDOM.document.querySelectorAll('style');
    t.equal(
      Object.keys(numStyleElements).length,
      1,
       'Contains 1 inline style elements'
    );

    t.end();
    del.sync(dest);
  });
}

function generateFilesPrefixDot() {
  test('Html files should be generated when prefixing path by dot', t => {
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
  test('Html files should be generated when using absolute path', t => {
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
  test('css and js files with non-inline attribute should be copied to dest', t => {
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

function calcNumberScripts() {}
