gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var inject = require('gulp-inject');
var watch = require('gulp-watch');
var child_process = require('child_process');
var config = require("./config/config");

var requireDir = require("require-dir");
requireDir("./tasks");

gulp.task('build:dev', ['build:index']);

gulp.task('watch:dev',['watch:app', 'watch:livereload', 'watch:jshint'], function(cb) {
  cb();
});

gulp.task('startServer:dev', ['build:dev', 'livereload'], function() {
  // Start nodemon and ignore client files and gulpfile 
  nodemon({
    script: 'server.js', 
    ignore: ['public', 'gulpfile.js'], 
    ext: 'js css', 
    env: { 'NODE_ENV': 'development' }
  });
});

gulp.task('dev', ['build:dev', 'watch:dev', 'startServer:dev'], function() {
  process.env.ENV = config.dev.ENV;
  process.env.PORT = config.dev.PORT;
});

gulp.task('default', ['dev']);