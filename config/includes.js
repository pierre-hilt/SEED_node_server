var npm = []; // TOCHANGE add here lib in node_modules

var app = ['public/**/*.js', 'public/**/*.jsx', 'public/**/*.css', '!public/lib/**/*.*'];

module.exports = {
  npm: npm,
  app: app
};