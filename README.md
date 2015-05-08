# Node starter kit using gulp, nodejs, express and swig

## Introduction
This is a simple Node server using express, ready to use for development purpose.

## Install
Use npm to install all dependencies.
> npm install

## Run
Gulp is used as task runner. Several tasks are implemented. To start using the server simply do:
> gulp

Default tasks are development tasks.

## Configuration (config package)
### config.js
Configure the name of your app (window title), online libraries and environment.

```
module.exports = {
  app_title: "App Title", // TOCHANGE name of the window 
  vendors: [
    /* TOCHANGE Add here online library */
    /* Example: https://code.angularjs.org/1.3.15/angular.min.js */
  ],
  dev: {
    ENV: "DEV",
    PORT: 3001
  }
};
```

Online libraries will be automatcly injected into index.html.

### includes.js
Configure npm client libraries such as bootstrap or angular.
First install some libraries:
> npm install angular --save-dev

Then modify include.js file:

```
var vendors = [
  "node_modules/angular/angular.min.js",
  "node_modules/angular/angular.min.js.map"
];

var app = ['public/**/*.js', 'public/**/*.css', '!public/lib/**/*.*'];

module.exports = {
  npmlib: vendors,
  app: app
};
```
