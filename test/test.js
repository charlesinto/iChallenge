//import 'babel-polyfill'
//import assert 
//const assert = require('chai').assert;
import request from 'request';
import app from '../test';
//const app = require('../test')
import chai from 'chai';
//const chai = require('chai');
import chaiHttp from 'chaih-http'
const should;
should  = chai.should();
chai.use(chaiHttp);
const url = '/iTracker';
describe('Return codes', function() {
    this.timeout('15000');
    it('should get all users', (done) =>{
        chai.request(app).get(url +'/api/v1/users/').end((req,res) =>{
            this.timeout(15000);
           res.should.have.status(200);
            done();

        })
    });
    it('should get all request of a user', (done) =>{
        chai.request(app).get(url+'/api/v1/users/:id/requests').end((req,res) =>{
            this.timeout(15000);
           res.should.have.status(200);
          // console.log('in res',res.body);
           //res.should(res.body).be.a('array');
            done();
        })
    })
    it('should get a request of a user', (done) =>{
        chai.request(app).get(url+'/api/v1/users/requests/:id').end((req,res) =>{
            this.timeout(15000);
           res.should.have.status(200);
           //console.log('in res',res.body);
           //res.should(res.body).be.a('array');
            done();
        });
    });
    it('should create a request', (done) =>{
        chai.request(app).post(url+'/api/v1/users/requests/').end((req,res) =>{
            this.timeout(15000);
           res.should.have.status(200);
           //res.should(res.body).be.a('array');
            done();
        });
    })
    it('should modify a request', (done) =>{
        chai.request(app).put(url+'api/v1/users/requests/:id').end((req,res) =>{
            this.timeout(15000);
           res.should.have.status(200);
          // res.should(res.body).be.a('array');
            done();
        })
    })
})


/*
describe("Return Codes", function(){
    it("return code", function(done){
        request.get({url: baseUrl},(err,res,body) =>{
           // expect(res.statusCode).to.equal(200);
            console.log(JSON.parse(body));
            done();
        });
    });
});

/*
describe('App',function(){
    it('app should return hello', function(){
        assert.equal(app.sayHello(),'hello');
    })
})*/