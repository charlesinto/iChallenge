
import app from '../test';
import api from '../src/ap1.js'
import chai from 'chai';
import chaiHttp from 'chai-http';
const should  = chai.should();
chai.use(chaiHttp);
const homeUrl = '/iTracker';
describe('Return codes', function() {
    this.timeout('15000');
    it('should get all users', (done) =>{
        chai.request(api).get(`/users`).end((req,res) =>{
            this.timeout(15000);
           res.should.have.status(200);
            done();

        })
    });
    it('should get all request of a user', (done) =>{
        chai.request(api).get(`/users:id/requests`).end((req,res) =>{
            this.timeout(15000);
           res.should.have.status(200);
            done();
        })
    })
    it('should get a request of a user', (done) =>{
        chai.request(api).get(`/v1/users/requests/:id`).end((req,res) =>{
            this.timeout(15000);
           res.should.have.status(200);
            done();
        });
    });
    it('should create a request', (done) =>{
        chai.request(api).post(`/users/requests/`).end((req,res) =>{
            this.timeout(15000);
           res.should.have.status(200);
            done();
        });
    })
})
