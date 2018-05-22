import app from '../index'
import chai from 'chai';
import chaiHttp from 'chai-http'
const should = chai.should();

chai.use(chaiHttp);
let validateData = [
	{
        "requestCatgeory": "repairs",
        "itemCategory":"machine",
        "item":"iron",
        "complaints":"broken iron"
	}	
]
describe('Return codes', function() {
    this.timeout('15000');
    it('should get all users', (done) =>{
        chai.request(app).get('/iMaintenace/api/v1/users').end((req,res) =>{
            this.timeout(15000);
           res.should.have.status(200);
            done();

        });
    });
    it('should get all request of a user', (done) =>{
        chai.request(app).get('/iMaintenace/api/v1/user/1/requests').end((req,res) =>{
            this.timeout(15000);
           res.should.have.status(200);
          // console.log('in res',res.body);
           //res.should(res.body).be.a('array');
            done();
        })
    })
    it('should get a request of a user', (done) =>{
        chai.request(app).get('/iMaintenace/api/v1/user/request/3').end((req,res) =>{
            this.timeout(15000);
           res.should.have.status(200);
           //console.log('in res',res.body);
           //res.should(res.body).be.a('array');
            done();
        });
    });
    it('should create a request', (done) =>{
        chai.request(app).post('/iMaintenace/api/v1/user/request').type('form').send(validateData).end((req,res) =>{
            this.timeout(15000);
           res.should.have.status(200);
           //res.should(res.body).be.a('array');
            done();
        });
    })
    it('should modify a request', (done) =>{
        chai.request(app).put('/iMaintenace/api/v1/user/request/4').send(validateData).end((req,res) =>{
            this.timeout(15000);
           res.should.have.status(200);
          // res.should(res.body).be.a('array');
            done();
        })
    })
})