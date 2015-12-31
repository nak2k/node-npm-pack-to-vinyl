const dirname = require('path').dirname;
const File = require('vinyl');
const pack = require('tar-pack').pack
const FN = require('fstream-npm');

module.exports = packToVinyl;

function packToVinyl(pkgName, callback) {
  var pkgJsonFile;
  try {
    pkgJsonFile = require.resolve(pkgName + '/package');
  } catch(e) {
    return callback(e);
  }

  const pkgDir = dirname(pkgJsonFile);
  const package = require(pkgJsonFile);

  var name = package.name
  if (name[0] === '@') {
    name = name.substr(1).replace(/\//g, '-');
  }

  const fname = name + '-' + package.version + '.tgz';

  const file = new File({
    path: pkgDir + '/' + fname,
    contents: pack(FN(pkgDir)),
  });

  callback(null, file);
}
