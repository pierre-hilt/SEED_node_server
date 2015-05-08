var includes = require("../config/includes.js");
var inject = require('gulp-inject');
var watch = require('gulp-watch');

var injectApp = function() {
  var appStream = gulp.src(includes.app, {read: false});
  var target = gulp.src('public/index.html');
  return target.pipe(inject(appStream, {relative: true}))
    .pipe(gulp.dest('public'));
};

var injectLib = function() {
  var target = gulp.src('./public/index.html');
  var vendorsStream = gulp.src(includes.npm, { base: './node_modules' })
    .pipe(gulp.dest('./public/lib'));
  return target.pipe(inject(vendorsStream, {relative: true, name:"vendors"}))
    .pipe(gulp.dest('./public'));
};

// Copy node_modules files to public/lib and inject them
gulp.task("inject:lib", ["inject:app"], function() {
  return injectLib();
});

// Inject static files
gulp.task("inject:app", function() {
  return injectApp();
});

// Watch modification on static files, dev environement, wait build to finish
gulp.task("watch:app", ["build:index"], function() {
  watch(includes.app, {verbose:true}, function(stream) {
    console.log(stream.event);
    if (stream.event == "add" || stream.event == "unlink") {
      injectApp();
    }
  });
});

// build index.html
gulp.task("build:index", ["inject:app", "inject:lib"]);