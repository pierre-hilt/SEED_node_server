var includes = require("../config/includes.js");
var inject = require('gulp-inject');
var watch = require('gulp-watch');
var rename = require("gulp-rename");

var injects = function() {
  var appStream = gulp.src(includes.app, {read: false});
  var source = gulp.src('public/index.template.html');
  var vendorsStream = gulp.src(includes.npm, { base: './node_modules' })
    .pipe(gulp.dest('./public/lib'));
  return source.pipe(rename("index.html"))
    .pipe(inject(vendorsStream, {relative: true, name:"vendors"}))
    .pipe(inject(appStream, { relative: true,
      transform: function (filepath) {
        if (filepath.slice(-4) === '.jsx') {
          return '<script type="text/jsx" src="' + filepath + '"></script>';
        }
        // Use the default transform as fallback: 
        return inject.transform.apply(inject.transform, arguments);
      }}))
    .pipe(gulp.dest('views'));
};

// Copy node_modules files to public/lib and inject them
gulp.task("inject", function() {
  return injects();
});

// Watch modification on static files, dev environement, wait build to finish
gulp.task("watch:app", ["build:index"], function() {
  watch(includes.app, {verbose:true}, function(stream) {
    console.log(stream.event);
    if (stream.event == "add" || stream.event == "unlink") {
      injects();
    }
  });
  watch('public/index.template.html', {verbose:true}, function(stream) {
    console.log(stream.event);
    injects();
  });

});

// build index.html
gulp.task("build:index", ["inject"]);