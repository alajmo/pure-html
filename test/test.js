const child = require('child_process');
const config = require('./files/.purehtmlrc.json');
const del = require('del');
const fs = require('fs');
const html5Lint = require('html5-lint');
const test = require('tap').test;

test('Files should be generated', t => {
  child.execSync('node bin/pure-html -c test/files/.purehtmlrc.json', {
    stdio: [0, 1, 2]
  });
  t.equal(fs.existsSync('test/files/dest/index.html'), true, 'File exists.');
  t.equal(fs.existsSync('test/files/dest/index2.html'), true, 'Directory file level 0 test');
  t.equal(fs.existsSync('test/files/dest/example/index.html'), true, 'Directory file level 1 test');
  t.equal(fs.existsSync('test/files/dest/example/example-2/index-2.html'), true, 'Directory file level 1 test');

  // TODO: Check validitity of html files.
  // const html = fs.readFileSync('test/files/dest/index.html');
  // const html2 = fs.readFileSync('test/files/dest/index2.html');
  t.end();
  cleanUp();
});

test('Config file should exist', (t) => {
  t.equal(fs.existsSync('config/.purehtmlrc.json'), true, 'default.config.json exists.');
  t.equal(fs.existsSync('config/config.json'), true, 'config.json exists.');
  t.end();
});

function cleanUp() {
  del.sync(config.dest);
}
