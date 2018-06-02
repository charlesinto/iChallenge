'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _maintenance = require('./controllers/maintenance');

var _maintenance2 = _interopRequireDefault(_maintenance);

var _maintenance3 = require('./services/maintenance');

var _maintenance4 = _interopRequireDefault(_maintenance3);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiVersion = _express2.default.Router();

var app = (0, _express2.default)();
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());
app.use('/iMaintenace/api/v1', apiVersion);

var MC = new _maintenance2.default(apiVersion);

var port = process.env.PORT || 4000;

app.listen(port, function () {
  console.log('Listening on ' + port);
});

exports.default = app;