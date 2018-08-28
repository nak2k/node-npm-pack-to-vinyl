const test = require('tape');
const packToVinyl = require('..');
const write = require('fs').createWriteStream;

test('test', function (t) {
  t.plan(1);

  packToVinyl(__dirname + '/..', (err, file) => {
    if (err) {
      return t.end(err);
    }

    file.contents
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
