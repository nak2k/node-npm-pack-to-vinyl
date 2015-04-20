# npm-pack-to-vinyl

## Example

```js
var gulp = require('gulp');
var gutil = require('gulp-util');
var s3 = require('vinyl-s3');
var tap = require('tap-stream');
var es = require('event-stream');
var fs = require('fs');
var packToVinyl = require('npm-pack-to-vinyl');

gulp.task('packAndS3Upload', function() {
  return es.readArray([ '@my/foo', '@my/bar', '@my/baz' ])
    .pipe(es.map(packToVinyl))
    .pipe(s3.dest(config.dest))
    .pipe(tap(function(file) {
      gutil.log('uploaded', file.path);
      fs.unlinkSync(file.path);
    }));
});
```

## License

Under the MIT
