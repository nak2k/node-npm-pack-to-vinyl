const { dirname } = require('path');
const File = require('vinyl');
const packlist = require('npm-packlist');
const tar = require('tar');
const { Transform } = require('stream');

module.exports = packToVinyl;

function packToVinyl(pkgName, callback) {
  let pkgJsonFile;
  try {
    pkgJsonFile = require.resolve(pkgName + '/package');
  } catch(e) {
    return callback(e);
  }

  const pkgDir = dirname(pkgJsonFile);

  let { name, version } = require(pkgJsonFile);

  if (name[0] === '@') {
    name = name.substr(1).replace(/\//g, '-');
  }

  packlist({ path: pkgDir })
    .then(files => {
      const contents = tar.create({
        prefix: 'package/',
        cwd: pkgDir,
        gzip: true
      }, files).pipe(new Transform({
        transform: (chunk, encoding, callback) => callback(null, chunk),
      }));

      const file = new File({
        path: `${pkgDir}/${name}-${version}.tgz`,
        contents,
      });

      callback(null, file);
    })
    .catch(err => callback(err));
}
