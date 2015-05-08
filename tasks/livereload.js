var livereload = require('gulp-livereload');
var watch = require('gulp-watch');
var inject = require('gulp-inject');

gulp.task('livereload', ['build:dev'], function() {
  livereload.listen(35729, function() {
      console.log('... Listening on 35729 ...');
  });
});

gulp.task('watch:livereload', ['livereload'], function() {
  watch(['./public/**/*.*', './server/**/*.*'], {verbose:true}, function() {
    console.log("reload browser");
    livereload.reload();
  });
});