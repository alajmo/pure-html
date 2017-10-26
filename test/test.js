const child = require('child_process');
const del = require('del');
const fs = require('fs');
const html5Lint = require('html5-lint');
const test = require('tap').test;

const src = 'test/files/src';
const dest = 'test/files/dist';

test('Files should be generated', t => {
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
  cleanUp();
});

function cleanUp() {
  del.sync(dest);
}
