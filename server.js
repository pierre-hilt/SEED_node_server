var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var swig = require('swig');
var config = require("./config/config");

var ENV = process.env.ENV || "PROD";

app.set('port', (process.env.PORT || 3000));

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/public');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
  res.render('index', { app_title:config.app_title, env:ENV, vendors: config.vendors});
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});