'use strict';

var _index = require('../../index');

var _index2 = _interopRequireDefault(_index);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai2.default.should();
var expect = _chai2.default.expect;
_chai2.default.use(_chaiHttp2.default);
var request = {
    "requestCategory": "repairs",
    "itemCategory": "machine",
    "item": "iron",
    "complaints": "broken iron"
};

var user = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJblVzZXIiOnsiaWQiOjE2LCJmdWxsbmFtZSI6Ik9udW9yYWggY2hhcmxlcyIsImVtYWlsIjoiY2hhcmxlcy5vbnVvcmFAeWFob28uY29tIiwicGhvbmVudW1iZXIiOiIwODE2MzExMzQ1MCIsInBhc3N3b3JkIjoiJDJiJDEwJFJuTlA0ZDA1eGcyell4VmQ2TTc4Y3VWRnpJMVcxbTFqbXpMUGpZRlNnMTdBQmJPZGhmQnlDIiwicm9sZWlkIjoyLCJkYXRlY3JlYXRlZCI6IjIwMTgtMDUtMzFUMTc6MzA6NDYuNjYzWiJ9LCJpYXQiOjE1Mjc4MzA4MTQsImV4cCI6MTUyNzg1MjQxNH0.AilRKSFXSo-PX0DITJbY8GbIhswv7n01WwCuCrvMbuY';
var adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJblVzZXIiOnsiaWQiOjE0LCJmdWxsbmFtZSI6ImxpbmEgZWtlaCIsImVtYWlsIjoiZWtlaEBnYW1pbC5jb20iLCJwaG9uZW51bWJlciI6IjA4MTM0NTc4OTYwIiwicGFzc3dvcmQiOiIkMmIkMTAkS2xHZ3RaZ1Q3bzMyU1JhMGQyc1ljT0FtSEovQ21CVDExaDR5MVhoVE9BV2x6czdzMkxUMlciLCJyb2xlaWQiOjEsImRhdGVjcmVhdGVkIjoiMjAxOC0wNS0zMVQxMzowNzowMy4xNjVaIn0sImlhdCI6MTUyNzc3NTY4MSwiZXhwIjoxNTI3Nzk3MjgxfQ.JlizBh1PgOCifX-k_WiemI6ojAB1L4tVEQhukcJcMRY';
var userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJblVzZXIiOnsiaWQiOjEsImZ1bGxuYW1lIjoib251b3JhaCBjaGFybGVzIiwiZW1haWwiOiJjaGFybGVzLm9udW9yYWhAeWFob28uY29tIiwicGhvbmVudW1iZXIiOiIwODE2MzExMzQ1MCIsInBhc3N3b3JkIjoiJDJiJDEwJGpidW5XRnB3VWlhclAwLmxJekprLmVlNFJtMDFOMTFuTWhhaXV4VGltS0R4TzFNVjBkVm5HIiwicm9sZWlkIjoxLCJkYXRlY3JlYXRlZCI6IjIwMTgtMDUtMjlUMTE6MzA6NDcuMzI3WiJ9LCJpYXQiOjE1Mjc3NzkxODQsImV4cCI6MTUyNzgwMDc4NH0.dHSRn70-sFytSJpAtHcnHIYitzd7YPYzM3bx9p0ZkXI';
var createUser = {
    "fullName": "Onuorah charles",
    "email": "charles.onuora@yahoo.com",
    "password": "3450",
    "phonenumber": "08163113450"
};
describe('Return codes', function () {
    var _this = this;

    this.timeout('15000');
    it('it should create a user', function (done) {
        _chai2.default.request(_index2.default).post('/iMaintenace/api/v1/auth/signup').send(createUser).end(function (req, res) {
            console.log('+++++', createUser);
            _this.timeout(15000);
            res.should.have.status(200);
            done();
        });
    });
    it('it should login a user', function (done) {
        _chai2.default.request(_index2.default).post('/iMaintenace/api/v1/auth/login').type('form').send(createUser).end(function (req, res) {
            _this.timeout(15000);
            //res.should.have.status(201);
            res.body.should.have.property('token');
            user = res.body.token;
            done();
        });
    });
    it('it should create a new request', function (done) {
        _chai2.default.request(_index2.default).post('/iMaintenace/api/v1/user/request').set('authorization', user).send(request).end(function (req, res) {
            _this.timeout(15000);
            //res.should.have.status(200);
            res.should.have.status(200);
            //console.log('in res',res.body);
            //res.should(res.body).be.a('array');
            done();
        });
    });
    it('it should get a request', function (done) {
        _chai2.default.request(_index2.default).get('/iMaintenace/api/v1/user/request/1').set('authorization', user).end(function (req, res) {
            //console.log(res);
            _this.timeout(15000);
            res.should.have.status(200);

            //res.should(res.body).be.a('array');
            done();
        });
    });
    it('should modify a request', function (done) {
        _chai2.default.request(_index2.default).put('/iMaintenace/api/v1/user/request/1').send(request).set('authorization', user).end(function (req, res) {
            _this.timeout(15000);
            res.should.have.status(200);
            console.log('vvuyvyvuuy', res);
            // res.should(res.body).be.a('array');
            done();
        });
    });
    it('it should get all request', function (done) {
        _chai2.default.request(_index2.default).get('/iMaintenace/api/v1/requests').set('authorization', user).end(function (req, res) {
            console.log('get all', res);
            _this.timeout(15000);
            res.should.have.status(401);
            //expect(res).to.be.json
            // res.should(res.body).be.a('array');
            done();
        });
    });
    it('it should approve a request', function (done) {
        _chai2.default.request(_index2.default).put('/iMaintenace/api/v1/requests/1/approve').set('authorization', adminToken).end(function (req, res) {
            _this.timeout(15000);
            res.should.have.status(401);
            //expect(res).to.be.json
            // res.should(res.body).be.a('array');
            done();
        });
    });
    it('it should disapprove a request', function (done) {
        _chai2.default.request(_index2.default).put('/iMaintenace/api/v1/requests/1/disapprove').set('authorization', adminToken).end(function (req, res) {
            _this.timeout(15000);
            res.should.have.status(401);
            //expect(res).to.be.json
            // res.should(res.body).be.a('array');
            done();
        });
    });
    it('it should resolve a request', function (done) {
        _chai2.default.request(_index2.default).put('/iMaintenace/api/v1/requests/1/resolve').set('authorization', adminToken).end(function (req, res) {
            _this.timeout(15000);
            res.should.have.status(401);
            //expect(res).to.be.json
            // res.should(res.body).be.a('array');
            done();
        });
    });
});