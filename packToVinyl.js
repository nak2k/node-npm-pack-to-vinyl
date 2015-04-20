var dirname = require('path').dirname;
var npm = require('npm');
var fs = require('fs');
var File = require('vinyl');

module.exports = packToVinyl;

function packToVinyl(pkgName, callback) {
  var pkgJsonFile = require.resolve(pkgName + '/package');
  var pkgDir = dirname(pkgJsonFile);
  var package = require(pkgJsonFile);

  npm.load(package, function(err, conf) {
    if (err) {
      return callback(err);
    }

    npm.commands.pack([pkgDir], true, function(err, files) {
      if (err) {
        return callback(err);
      }

      var path = process.cwd() + '/' + files[0];

      var file = new File({
        path: path,
        contents: fs.createReadStream(path),
      });

      callback(null, file);
    });
  });
}
