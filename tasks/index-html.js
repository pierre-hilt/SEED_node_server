var includes = require("../config/includes.js");
var inject = require('gulp-inject');
var watch = require('gulp-watch');
var rename = require("gulp-rename");

var injectApp = function() {
  var appStream = gulp.src(includes.app, {read: false});
  var source = gulp.src('public/index.template.html');
  return source.pipe(inject(appStream, {relative: true}))
    .pipe(rename("index.html"))
    .pipe(gulp.dest('views'));
};

var injectLib = function() {
  var appStream = gulp.src(includes.app, {read: false});
  var vendorsStream = gulp.src(includes.npm, { base: './node_modules' })
    .pipe(gulp.dest('./public/lib'));
  return injectApp().pipe(inject(vendorsStream, {relative: true, name:"vendors"}))
    .pipe(inject(appStream, {relative: true}));
};

// Copy node_modules files to public/lib and inject them
gulp.task("inject", function() {
  return injectLib();
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
gulp.task("build:index", ["inject"]);