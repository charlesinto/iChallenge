'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('./route/index');

var _index2 = _interopRequireDefault(_index);

var _hub = require('./hub');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var homeUrl = '/iTracker/'; /*
                            const http = require('http');
                            let home_url  = '/iTracker/';
                            const path = require('path');
                            const fs = require('fs');
                            const express = require('express');
                            const routes = require('./routes/index');
                            const hub = require('./hub');
                            const app = express();
                            app.use(express.json());
                            app.use(express.static('public'));*/
//load modules

var app = (0, _express2.default)();
app.use(_express2.default.json());
app.use(_express2.default.static('public'));

app.get(homeUrl + 'api/v1/users', function (req, res) {
  return (0, _hub.getusers)(req, res);
});
app.get(homeUrl + 'api/v1/users:id/requests', function (req, res) {
  return (0, _hub.getUserRequest)(req, res);
});
app.get(homeUrl + 'api/v1/users/requests/:id', function (req, res) {
  return (0, _hub.getUserByRequestId)(req, res);
});

exports.default = app;