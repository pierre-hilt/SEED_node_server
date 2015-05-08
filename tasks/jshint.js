var jshint = require('gulp-jshint');
var watch = require('gulp-watch');

gulp.task('watch:jshint', ['jshint'], function() {
  watch(['**/*.js', '!node_modules/**/*.js', '!public/lib/**/*.js'], function() {
    run();
  });
});

gulp.task("jshint", ['build:dev'], function() {
  run();
});

function run() {
  return gulp.src(['**/*.js', '!node_modules/**/*.js', '!public/lib/**/*.js'])
      .pipe(watch(['**/*.js', '!node_modules/**/*.js', '!public/lib/**/*.js']))
      .pipe(jshint())
      // You can look into pretty reporters as well, but that's another story
      .pipe(jshint.reporter('default'));
}