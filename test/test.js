const child = require('child_process');
const config = require('./files/config.json');
const del = require('del');
const fs = require('fs');
const html5Lint = require('html5-lint');
const test = require('tap');

test('Check that index.html is generated', t => {
  child.execSync('node bin/pure-html -c test/files/config.json', {
    stdio: [0, 1, 2]
  });
  t.equal(fs.existsSync('test/files/dest/index.html'), true, 'File exists.');
  t.equal(fs.existsSync('test/files/dest/index2.html'), true, 'File exists.');

  const html = fs.readFileSync('test/files/dest/index.html');
  const html2 = fs.readFileSync('test/files/dest/index2.html');
  t.end();
  cleanUp();
});

test('Config file exists', (t) => {
  t.equal(fs.existsSync('config/.purehtmlrc.json'), true, 'default.config.json exists.');
  t.equal(fs.existsSync('config.json'), true, 'config.json exists.');
  t.end();
});

function cleanUp() {
  del.sync(config.dest);
}
