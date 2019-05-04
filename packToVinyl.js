const { dirname } = require('path');
const File = require('vinyl');
const { pack } = require('tar-pack');
const FN = require('fstream-npm');

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

  const file = new File({
    path: `${pkgDir}/${name}-${version}.tgz`,
    contents: pack(FN(pkgDir)),
  });

  callback(null, file);
}
