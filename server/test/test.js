import app from '../../index'
import chai from 'chai';
import chaiHttp from 'chai-http'
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);
let request = 
	{
        "requestCatgeory": "repairs",
        "itemCategory":"machine",
        "item":"iron",
        "complaints":"broken iron"
	}	

let user = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJblVzZXIiOnsiaWQiOjEsImZ1bGxuYW1lIjoib251b3JhaCBjaGFybGVzIiwiZW1haWwiOiJjaGFybGVzLm9udW9yYWhAeWFob28uY29tIiwicGhvbmVudW1iZXIiOiIwODE2MzExMzQ1MCIsInBhc3N3b3JkIjoiJDJiJDEwJGpidW5XRnB3VWlhclAwLmxJekprLmVlNFJtMDFOMTFuTWhhaXV4VGltS0R4TzFNVjBkVm5HIiwicm9sZWlkIjoxLCJkYXRlY3JlYXRlZCI6IjIwMTgtMDUtMjlUMTE6MzA6NDcuMzI3WiJ9LCJpYXQiOjE1Mjc4MDIyMDYsImV4cCI6MTUyNzgyMzgwNn0.CV7Bh9hs37_LzbApV888S0-M3Ehmf4kjqekxW7McOUQ'
let adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJblVzZXIiOnsiaWQiOjE0LCJmdWxsbmFtZSI6ImxpbmEgZWtlaCIsImVtYWlsIjoiZWtlaEBnYW1pbC5jb20iLCJwaG9uZW51bWJlciI6IjA4MTM0NTc4OTYwIiwicGFzc3dvcmQiOiIkMmIkMTAkS2xHZ3RaZ1Q3bzMyU1JhMGQyc1ljT0FtSEovQ21CVDExaDR5MVhoVE9BV2x6czdzMkxUMlciLCJyb2xlaWQiOjEsImRhdGVjcmVhdGVkIjoiMjAxOC0wNS0zMVQxMzowNzowMy4xNjVaIn0sImlhdCI6MTUyNzc3NTY4MSwiZXhwIjoxNTI3Nzk3MjgxfQ.JlizBh1PgOCifX-k_WiemI6ojAB1L4tVEQhukcJcMRY'
let userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJblVzZXIiOnsiaWQiOjEsImZ1bGxuYW1lIjoib251b3JhaCBjaGFybGVzIiwiZW1haWwiOiJjaGFybGVzLm9udW9yYWhAeWFob28uY29tIiwicGhvbmVudW1iZXIiOiIwODE2MzExMzQ1MCIsInBhc3N3b3JkIjoiJDJiJDEwJGpidW5XRnB3VWlhclAwLmxJekprLmVlNFJtMDFOMTFuTWhhaXV4VGltS0R4TzFNVjBkVm5HIiwicm9sZWlkIjoxLCJkYXRlY3JlYXRlZCI6IjIwMTgtMDUtMjlUMTE6MzA6NDcuMzI3WiJ9LCJpYXQiOjE1Mjc3NzkxODQsImV4cCI6MTUyNzgwMDc4NH0.dHSRn70-sFytSJpAtHcnHIYitzd7YPYzM3bx9p0ZkXI'
let createUser = {
    "fullName":"Onuorah charles",
    "email":"charles.onuora@yahoo.com",
    "password":"3450",
    "phonenumber":"08163113450"
}
describe('Return codes', function() {
    this.timeout('15000');
    it('it should create a user', (done) =>{
        chai.request(app).post('/iMaintenace/api/v1/auth/signup').send(createUser).end((req,res) =>{
            console.log('+++++',createUser)
            this.timeout(15000);
           res.should.have.status(200);
            done();

        });
    });
    it('it should login a user', (done) =>{
        chai.request(app).post('/iMaintenace/api/v1/auth/login').type('form').send(createUser).end((req,res) =>{
            this.timeout(15000);
           //res.should.have.status(201);
           res.body.should.have.property('token');
           user =  res.body.token;
            done();
        })
    })
    it('it should create a new request', (done) =>{
        chai.request(app).post('/iMaintenace/api/v1/user/request').set('authorization', user)
        .send(request).end((req,res) =>{
            this.timeout(15000);
           //res.should.have.status(200);
           res.should.have.status(200);
           //console.log('in res',res.body);
           //res.should(res.body).be.a('array');
            done();
        });
    });
    it('it should create a request', (done) =>{
        chai.request(app).post('/iMaintenace/api/v1/user/request').type('form').send(request)
        .set('authorization', user).end((req,res) =>{
            console.log(res);
            this.timeout(15000);
           res.should.have.status(200);
           
           //res.should(res.body).be.a('array');
            done();
        });
    })
    it('should modify a request', (done) =>{
        chai.request(app).put('/iMaintenace/api/v1/user/request/4').send(request).end((req,res) =>{
            this.timeout(15000);
           res.should.have.status(200);
          // res.should(res.body).be.a('array');
            done();
        })
    })
})