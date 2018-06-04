'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DatabaseConnection = require('../DatabaseConnection');

var _DatabaseConnection2 = _interopRequireDefault(_DatabaseConnection);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _HandleServerRequest = require('../HandleServerRequest');

var _HandleServerRequest2 = _interopRequireDefault(_HandleServerRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MaintenanceService = function () {
    function MaintenanceService() {
        _classCallCheck(this, MaintenanceService);

        this.userRequest = [];
        this.users = [];
    }

    _createClass(MaintenanceService, [{
        key: 'getUsers',
        value: function getUsers() {
            return this.users;
        }
    }, {
        key: 'disapproveRequest',
        value: function disapproveRequest(req, res) {
            var ADMIN = 1;
            if (_typeof(req.token) !== undefined) {
                if (req.token.loggedInUser.roleid === ADMIN) {
                    var requestid = parseInt(req.params.id);
                    var sql = 'UPDATE BASE_REQUEST SET STATUS = $1 WHERE id = $2';
                    _HandleServerRequest2.default.callServer(sql, ['DISAPPROVED', requestid], function (dataSet) {
                        if (dataSet.status == 200) {
                            res.statusCode = 200;
                            res.setHeader('content-type', 'application/json');
                            res.json({
                                message: 'Request Disapproved'
                            });
                        } else {
                            res.statusCode = dataSet.status;
                            res.setHeader('content-type', 'application/json');
                            res.json({
                                message: dataSet.message
                            });
                        }
                    });
                } else {
                    res.statusCode = 401;
                    res.setHeader('content-type', 'application/json');
                    res.json({
                        message: 'Unathourized access'
                    });
                }
            } else {
                res.statusCode = 406;
                res.setHeader('content-type', 'application/json');
                res.json({
                    message: 'Action Could not be completed'
                });
            }
        }
    }, {
        key: 'resolveRequest',
        value: function resolveRequest(req, res) {
            var ADMIN = 1;
            if (_typeof(req.token) !== undefined) {
                if (req.token.loggedInUser.roleid === ADMIN) {
                    var requestid = parseInt(req.params.id);
                    var sql = 'UPDATE BASE_REQUEST SET STATUS = $1 WHERE id = $2';
                    _HandleServerRequest2.default.callServer(sql, ['RESOLVED', requestid], function (dataSet) {
                        if (dataSet.status == 200) {
                            res.statusCode = 200;
                            res.setHeader('content-type', 'application/json');
                            res.json({
                                message: 'Request Resolved'
                            });
                        } else {
                            res.statusCode = dataSet.status;
                            res.setHeader('content-type', 'application/json');
                            res.json({
                                message: dataSet.message
                            });
                        }
                    });
                } else {
                    res.statusCode = 401;
                    res.setHeader('content-type', 'application/json');
                    res.json({
                        message: 'Unauthorized user'
                    });
                }
            }
        }
    }, {
        key: 'approveRequest',
        value: function approveRequest(req, res) {
            var ADMIN = 1;
            if (_typeof(req.token) !== undefined) {
                if (req.token.loggedInUser.roleid === ADMIN) {
                    var requestid = parseInt(req.params.id);
                    var sq = 'SELECT * FROM BASE_REQUEST WHERE id = $1';
                    _HandleServerRequest2.default.callServer(sq, [requestid], function (dataSet) {
                        if (dataSet.status == 200) {
                            if (dataSet.data.rows[0].status === 'PENDING') {
                                var sql = 'UPDATE BASE_REQUEST SET status = $1 WHERE id = $2';
                                _HandleServerRequest2.default.callServer(sql, ['APPROVED', requestid], function (dataSet) {
                                    console.log('>>>>>>>>>>>>', dataSet);
                                    if (dataSet.status == 200) {
                                        // res.statusCode = 200;
                                        // res.setHeader('content-type', 'application/json');
                                        res.send({
                                            message: 'Request Approved'
                                        });
                                    }
                                });
                            } else {
                                res.statusCode = 406;
                                res.setHeader('content-type', 'application/json');
                                res.json({
                                    message: 'Action Could not be completed'
                                });
                            }
                        }
                    });
                } else {
                    res.statusCode = 401;
                    res.setHeader('content-type', 'application/json');
                    res.json({
                        message: 'Unauthorized user'
                    });
                }
            }
        }
    }, {
        key: 'getAllRequestOfUser',
        value: function getAllRequestOfUser(req, res) {
            if (_typeof(req.token) !== undefined) {
                var userId = req.token.loggedInUser.id;
                var sql = 'SELECT * FROM BASE_REQUEST WHERE userid = $1';
                _HandleServerRequest2.default.callServer(sql, [userId], function (dataSet) {
                    if (_typeof(dataSet.data) !== undefined) {
                        if (dataSet.status === 200) {
                            res.statusCode = 201;
                            res.setHeader('content-type', 'application/json');
                            res.json(dataSet.data.rows);
                        } else {
                            res.statusCode = dataSet.status;
                            res.setHeader('content-type', 'application/json');
                            res.json({
                                message: dataSet.message
                            });
                        }
                    }
                });
            }
        }
    }, {
        key: 'getRequest',
        value: function getRequest(req, res) {
            if (_typeof(req.token) !== undefined) {
                var requestId = parseInt(req.params.id);
                if ((typeof requestId === 'undefined' ? 'undefined' : _typeof(requestId)) !== undefined) {
                    var sql = 'SELECT * FROM BASE_REQUEST WHERE userid = $1 AND id = $2';
                    _HandleServerRequest2.default.callServer(sql, [req.token.loggedInUser.id, requestId], function (dataSet) {
                        if (_typeof(dataSet.data) !== undefined) {

                            if (dataSet.status = 200) {
                                if ((typeof dataSet === 'undefined' ? 'undefined' : _typeof(dataSet)) !== undefined && dataSet.data.rowCount > 0) {
                                    res.statusCode = 201;
                                    res.setHeader('content-type', 'application/json');
                                    res.json(dataSet.data.rows);
                                } else {
                                    res.statusCode = 404;
                                    res.setHeader('content-type', 'application/json');
                                    res.json({
                                        message: "No record Found"
                                    });
                                }
                            } else {
                                res.statusCode = dataSet.status;
                                res.setHeader('content-type', 'application/json');
                                res.json({
                                    message: dataSet.message
                                });
                            }
                        }
                    });
                }
            }
            //return this.userRequest || null;
        }
    }, {
        key: 'addRequest',
        value: function addRequest(req, res) {
            var loggedInUser = void 0;var userid = void 0;
            var request = req.body;
            console.log('req', request);
            if (req.token !== undefined) {
                var userId = req.token.loggedInUser.id;
                if (this.validateRequest(request)) {
                    var sql = "INSERT INTO BASE_REQUEST (item,itemcategory,requestcategory, complaints, userid, status, datecreated) VAlUES ($1,$2,$3,$4,$5,$6,$7)";
                    _HandleServerRequest2.default.callServer(sql, [request.item, request.itemCategory, request.requestCategory, request.complaints, userId, "PENDING", 'NOW()'], function (dataSet) {
                        console.log('dt', dataSet.data);
                        if (dataSet.status == 200) {
                            res.statusCode = 200;
                            res.setHeader('content-type', 'application/json');
                            res.json({
                                message: "Request successfully posted",
                                request: req.body
                            });
                        } else {
                            res.statusCode = dataSet.status;
                            res.setHeader('content-type', 'application/json');
                            res.json({
                                message: dataSet.message
                            });
                        }
                    });
                } else {
                    res.statusCode = 404;
                    res.setHeader('content-type', 'application/json');
                    res.json({
                        message: "One of more field is required"
                    });
                }
            } else {
                res.statusCode = 401;
                res.setHeader('content-type', 'application/json');
                res.json({
                    message: "unauthorized user"
                });
            }
        }
    }, {
        key: 'updateRequest',
        value: function updateRequest(req, res) {
            var update = req.body;
            if (_typeof(req.token) !== undefined && (typeof update === 'undefined' ? 'undefined' : _typeof(update)) !== undefined) {
                var requestId = parseInt(req.params.id);
                if ((typeof requestId === 'undefined' ? 'undefined' : _typeof(requestId)) !== undefined) {
                    var sql = 'SELECT * FROM BASE_REQUEST WHERE userid = $1 AND id = $2';
                    _HandleServerRequest2.default.callServer(sql, [req.token.loggedInUser.id, requestId], function (dataSet) {
                        if (_typeof(dataSet.data) !== undefined) {

                            if (dataSet.status = 200) {
                                if ((typeof dataSet === 'undefined' ? 'undefined' : _typeof(dataSet)) !== undefined && dataSet.data.rowCount > 0) {
                                    if (dataSet.data.rows[0].status === 'Approved') {
                                        res.statusCode = 406;
                                        res.setHeader('content-type', 'application/json');
                                        res.json({
                                            message: "Operation Not Possible"
                                        });
                                    } else {
                                        var _sql = 'UPDATE BASE_REQUEST SET itemCategory = $1, item = $2 ,complaints = $3 WHERE id = $4 AND userid = $5';
                                        _HandleServerRequest2.default.callServer(_sql, [update.itemcategory, update.item, update.complaints, parseInt(req.params.id), req.token.loggedInUser.id], function (dataSet) {
                                            if (_typeof(dataSet.data) !== undefined && dataSet.status === 200) {
                                                res.statusCode = 200;
                                                res.setHeader('content-type', 'application/json');
                                                res.json({
                                                    message: "Update Successful"
                                                });
                                            } else {
                                                res.statusCode = dataSet.status;
                                                res.setHeader('content-type', 'application/json');
                                                res.json({
                                                    message: dataSet.message
                                                });
                                            }
                                        });
                                    }
                                } else {
                                    res.statusCode = 404;
                                    res.setHeader('content-type', 'application/json');
                                    res.json({
                                        message: "No record Found"
                                    });
                                }
                            } else {
                                res.statusCode = dataSet.status;
                                res.setHeader('content-type', 'application/json');
                                res.json({
                                    message: dataSet.message
                                });
                            }
                        }
                    });
                }
            }
        }
    }, {
        key: 'getApplicationRequest',
        value: function getApplicationRequest(req, res) {
            if (_typeof(req.token) !== undefined) {
                console.log('>>>>', req.token.loggedInUser);
                if (req.token.loggedInUser.roleid == 1) {
                    var sql = 'SELECT * FROM BASE_REQUEST';
                    _HandleServerRequest2.default.callServer(sql, [], function (dataSet) {
                        if (dataSet.status = 200) {
                            res.statusCode = 200;
                            res.setHeader('content-type', 'application/json');
                            res.json(dataSet.data.rows);
                        } else {
                            res.statusCode = dataSet.status;
                            res.setHeader('content-type', 'application/json');
                            res.json({
                                message: dataSet.message
                            });
                        }
                    });
                } else {
                    res.statusCode = 401;
                    res.setHeader('content-type', 'application/json');
                    res.json({
                        message: "Unathourized access"
                    });
                }
            }
        }
    }, {
        key: 'createuser',
        value: function createuser(req, res) {
            var user = req.body;
            var password = _bcrypt2.default.hashSync(user.password, 10);
            //perform validation
            user.fullName = user.fullName.trim();
            user.email = user.email.trim();
            user.phonenumber = user.phonenumber.trim();
            user.password = user.password.trim();
            if (user.fullName !== '' && user.email !== '' && user.phonenumber !== '') {
                if (_validator2.default.isEmail(user.email)) {
                    if (/^\d+$/.test(user.phonenumber) && !/[_!*?/><{@#$%^&()]/.test(user.fullName)) {
                        //CHECKS IF EMAIL EXISTS
                        var sql = 'SELECT * FROM BASE_USERS WHERE email = $1';
                        _HandleServerRequest2.default.callServer(sql, [user.email], function (dataSet) {
                            //IF EMAIL DOEST NOT EXIST, CREATE USER
                            if (_typeof(dataSet.data) !== undefined) {
                                if (dataSet.data.rowCount === 0) {
                                    sql = 'INSERT INTO BASE_USERS (fullname,email,phonenumber,password,roleid,datecreated) values($1, $2, $3, $4, $5,$6)';

                                    _HandleServerRequest2.default.callServer(sql, [user.fullName, user.email, user.phonenumber, password, 2, 'NOW'], function (result) {
                                        if (result.status == 200) {
                                            res.statusCode = 201;
                                            res.setHeader("content-type", "application/json");
                                            res.json({
                                                message: "User created Successfully"
                                            });
                                        } else if (result.status == 500) {
                                            res.statusCode = 500;
                                            res.setHeader("content-type", "application/json");
                                            res.json({
                                                message: result.message
                                            });
                                        }
                                    });
                                } else {
                                    res.json({
                                        message: 'email exists'
                                    });
                                }
                            } else {
                                res.statusCode = 500;
                                res.setHeader('content-type', 'application/json');
                                res.json({
                                    message: dataSet.err
                                });
                            }
                        });
                    } else {
                        res.statusCode = 404;
                        res.setHeader('content-type', 'application/json');
                        res.json({
                            message: "special characters not allowed in fullName field"
                        });
                    }
                } else {
                    res.statusCode = 404;
                    res.setHeader('content-type', 'application/json');
                    res.json({
                        message: "Wrong phone number or email"
                    });
                }
            } else {
                res.statusCode = 400;
                res.setHeader('content-type', 'application/json');
                res.json({
                    message: "Wrong Details"
                });
            }
        }
    }, {
        key: 'userLogIn',
        value: function userLogIn(req, res) {
            var userFound = false;var username = '';
            if (req !== undefined) {
                var user = req.body;
                if (_validator2.default.isEmail(user.email) && user.password !== '') {
                    var sql = 'SELECT * FROM BASE_USERS WHERE email = $1';
                    _HandleServerRequest2.default.callServer(sql, [user.email], function (dataSet) {
                        if (_typeof(dataSet.data) !== undefined) {

                            if (parseInt(dataSet.status) === 200) {
                                var dt = dataSet.data.rows.filter(function (rec) {
                                    return _bcrypt2.default.compareSync(user.password, rec.password);
                                });
                                if ((typeof dt === 'undefined' ? 'undefined' : _typeof(dt)) !== undefined && dt.length > 0) {
                                    var loggedInUser = dt[0];
                                    _jsonwebtoken2.default.sign({ loggedInUser: loggedInUser }, 'users', { expiresIn: '6h' }, function (err, token) {
                                        if (err) {
                                            res.statusCode = 401;
                                            res.setHeader('content-type', 'application/json');
                                            res.json({
                                                message: "couldnt perform log in"
                                            });
                                        } else {
                                            res.statusCode = 201;
                                            res.setHeader('content-type', 'application/json');
                                            res.json({
                                                message: 'Welcome ' + loggedInUser.fullname,
                                                token: token
                                            });
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
            }
        }
    }, {
        key: 'validateRequest',
        value: function validateRequest(request) {

            if ((typeof request === 'undefined' ? 'undefined' : _typeof(request)) !== undefined) {
                console.log('innn', request);
                this.removeExtraSpaces(request);
                if (request.item !== '' && !/d/.test(request.item) && request.itemCategory !== '' && !/d/.test(request.itemCategory) && request.complaints !== '' && !/d/.test(request.complaints)) {
                    return true;
                }
            } else {
                return false;
            }
        }
    }, {
        key: 'removeExtraSpaces',
        value: function removeExtraSpaces(request) {
            console.log('>>>>MMM', request);
            if (_typeof(request.item) !== undefined) {
                request.item = request.item.trim();
            }
            if (_typeof(request.item) !== undefined) {
                request.complaints = request.complaints.trim();
            }
            if (_typeof(request.item) !== undefined) {
                request.requestCategory = request.requestCategory.trim();
            }
            if (_typeof(request.itemCategory) !== undefined) {
                request.itemCategory = request.itemCategory.trim();
            }
        }
    }]);

    return MaintenanceService;
}();

exports.default = new MaintenanceService();