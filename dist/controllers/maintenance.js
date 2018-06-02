'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _maintenance = require('../services/maintenance');

var _maintenance2 = _interopRequireDefault(_maintenance);

var _DatabaseConnection = require('../DatabaseConnection');

var _DatabaseConnection2 = _interopRequireDefault(_DatabaseConnection);

var _url = require('url');

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
    reference - https://html5hive.org/how-to-create-rest-api-with-node-js-and-express/
*/
var MaintenanceController = function () {
    function MaintenanceController(router) {
        _classCallCheck(this, MaintenanceController);

        this.router = router;
        // this.registerRouter();
        this.adminRoutes();
        this.userRoutes();
        this.loginRoutes();
    }

    _createClass(MaintenanceController, [{
        key: 'adminRoutes',
        value: function adminRoutes() {

            this.router.put('/requests/:id/approve', this.verifyToken, this.approveRequest.bind(this));
            this.router.put('/requests/:id/resolve', this.verifyToken, this.resolveRequest.bind(this));
            this.router.put('/requests/:id/disapprove', this.verifyToken, this.disapproveRequest.bind(this));
            this.router.get('/requests', this.verifyToken, this.getApplicationRequest.bind(this));
        }
    }, {
        key: 'userRoutes',
        value: function userRoutes() {
            this.router.get('/users/requests', this.verifyToken, this.getUserRequests.bind(this));
            this.router.get('/user/request/:id', this.verifyToken, this.getRequestById.bind(this));
            this.router.post('/user/request', this.verifyToken, this.createNewRequest.bind(this));
            this.router.put('/user/request/:id', this.verifyToken, this.updateRequest.bind(this));
        }
    }, {
        key: 'loginRoutes',
        value: function loginRoutes() {
            this.router.post('/auth/signup', this.createUser.bind(this));
            this.router.post('/auth/login', this.userSign.bind(this));
        }
    }, {
        key: 'registerRouter',
        value: function registerRouter() {
            this.router.get('/users/requests', this.verifyToken, this.getUserRequests.bind(this));
            this.router.get('/user/request/:id', this.verifyToken, this.getRequestById.bind(this));
            this.router.post('/user/request', this.verifyToken, this.createNewRequest.bind(this));
            this.router.put('/requests/:id/approve', this.verifyToken, this.approveRequest.bind(this));
            this.router.put('/requests/:id/resolve', this.verifyToken, this.resolveRequest.bind(this));
            this.router.put('/requests/:id/disapprove', this.verifyToken, this.disapproveRequest.bind(this));
            this.router.put('/user/request/:id', this.verifyToken, this.updateRequest.bind(this));
            this.router.post('/auth/signup', this.createUser.bind(this));
            this.router.post('/auth/login', this.userSign.bind(this));
            this.router.get('/requests', this.verifyToken, this.getApplicationRequest.bind(this));
        }
    }, {
        key: 'disapproveRequest',
        value: function disapproveRequest(req, res) {
            _maintenance2.default.disapproveRequest(req, res);
        }
    }, {
        key: 'resolveRequest',
        value: function resolveRequest(req, res) {
            _maintenance2.default.resolveRequest(req, res);
        }
    }, {
        key: 'approveRequest',
        value: function approveRequest(req, res) {
            _maintenance2.default.approveRequest(req, res);
        }
    }, {
        key: 'getUserRequests',
        value: function getUserRequests(req, res) {
            _maintenance2.default.getAllRequestOfUser(req, res);
        }
    }, {
        key: 'getRequestById',
        value: function getRequestById(req, res) {
            _maintenance2.default.getRequest(req, res);
        }
    }, {
        key: 'createNewRequest',
        value: function createNewRequest(req, res) {
            _maintenance2.default.addRequest(req, res);
        }
    }, {
        key: 'updateRequest',
        value: function updateRequest(req, res) {
            _maintenance2.default.updateRequest(req, res);
        }
    }, {
        key: 'createUser',
        value: function createUser(req, res) {
            _maintenance2.default.createuser(req, res);
        }
    }, {
        key: 'userSign',
        value: function userSign(req, res) {
            _maintenance2.default.userLogIn(req, res);
        }
    }, {
        key: 'verifyToken',
        value: function verifyToken(req, res, next) {

            var bearerHeader = req.body.token || req.headers['authorization'];

            if (!bearerHeader) {
                res.status(401).send({
                    message: 'Unauthorized user'
                });
            } else if ((typeof bearerHeader === 'undefined' ? 'undefined' : _typeof(bearerHeader)) !== undefined) {
                _jsonwebtoken2.default.verify(bearerHeader, 'users', function (err, authData) {

                    if (err) {
                        res.status(403).send({
                            message: "Forbidden access"
                        });
                    }
                    req.token = authData;
                    //console.log(req.token);
                    next();
                });
            }
        }
    }, {
        key: 'getApplicationRequest',
        value: function getApplicationRequest(req, res) {
            _maintenance2.default.getApplicationRequest(req, res);
        }
    }]);

    return MaintenanceController;
}();

exports.default = MaintenanceController;