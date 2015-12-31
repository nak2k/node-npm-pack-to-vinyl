const test = require('tape');
const packToVinyl = require('..');
const write = require('fs').createWriteStream;

test('test', function (t) {
  t.plan(1);

  packToVinyl('npm-pack-to-vinyl', (err, file) => {
    if (err) {
      return t.end(err);
    }

    file
      .pipe(write(__dirname + '/' + file.relative))
      .on('close', () => t.ok(true));
  });
});

test('error', function (t) {
  t.plan(1);

  packToVinyl('xxx', (err, file) => {
    t.ok(err);
  });
});
