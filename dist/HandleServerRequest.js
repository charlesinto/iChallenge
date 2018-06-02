'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DatabaseConnection = require('./DatabaseConnection');

var _DatabaseConnection2 = _interopRequireDefault(_DatabaseConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HandleServerRequest = function () {
    function HandleServerRequest() {
        _classCallCheck(this, HandleServerRequest);
    }

    _createClass(HandleServerRequest, [{
        key: 'HandleServerRequest',
        value: function HandleServerRequest() {
            this.flag = false;
            this.response = {};
            this.call = false;
        }
    }, {
        key: 'callServer',
        value: function callServer(sql, params, cb) {
            var response = {};var flag = false;
            if ((typeof sql === 'undefined' ? 'undefined' : _typeof(sql)) !== undefined && sql !== '') {
                _DatabaseConnection2.default.connect(function (err, client, done) {
                    if (err) {
                        response.message = "error connecting to database";
                        response.status = 500;
                        response.err = err;
                        if ((typeof cb === 'undefined' ? 'undefined' : _typeof(cb)) !== undefined) {
                            cb(response);
                        }
                    } else {
                        if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) !== undefined && params.length > 0) {

                            client.query(sql, params, function (err, result) {
                                if (err) {
                                    response.message = "error executing query";
                                    response.status = 404;
                                    response.err = err;
                                    console.log('err', err);
                                    if ((typeof cb === 'undefined' ? 'undefined' : _typeof(cb)) !== undefined) {
                                        cb(response);
                                    }
                                } else {
                                    response.message = "Operation Successfull";
                                    response.status = 200;
                                    response.data = result;
                                    if ((typeof cb === 'undefined' ? 'undefined' : _typeof(cb)) !== undefined) {
                                        cb(response);
                                    }
                                }
                            });
                        } else {
                            client.query(sql, function (err, result) {
                                if (err) {
                                    response.message = "error executing query";
                                    response.status = 500;
                                    response.err = err;
                                    console.log('err', err);
                                    if ((typeof cb === 'undefined' ? 'undefined' : _typeof(cb)) !== undefined) {
                                        cb(response);
                                    }
                                } else {
                                    response.message = "Operation Successfull";
                                    response.status = 200;
                                    response.data = result;
                                    if ((typeof cb === 'undefined' ? 'undefined' : _typeof(cb)) !== undefined) {
                                        cb(response);
                                    }
                                }
                            });
                        }
                    }
                });
            } else {
                response.err = "invalid request";
                response.status = 400;
                if ((typeof cb === 'undefined' ? 'undefined' : _typeof(cb)) !== undefined) {
                    cb(response);
                }
            }
        }
    }]);

    return HandleServerRequest;
}();

exports.default = new HandleServerRequest();