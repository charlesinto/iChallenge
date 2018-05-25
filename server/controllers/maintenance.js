import maintenanceService from '../services/maintenance';
import pool from '../DatabaseConnection';
import { parse } from 'url';
import Validator from 'validator';
import bcyrpt from 'bcrypt';
import jwt from 'jsonwebtoken';

class MaintenanceController{
    constructor(router){
        this.router = router;
        this.registerRouter();
    }
    registerRouter(){
        this.router.get('/users',this.getUsers.bind(this));
        this.router.get('/user/:id/requests',this.getUserRequests.bind(this));
        this.router.get('/user/request/:id', this.getRequestById.bind(this));
        this.router.post('/user/request',this.verifyToken,this.createNewRequest.bind(this));
        this.router.put('/user/request/:id', this.updateRequest.bind(this));
        this.router.delete('/user/request/:id', this.deleteRequest.bind(this));
        this.router.post('/auth/signup', this.createUser.bind(this));
        this.router.post('/auth/login',this.userSign.bind(this));
    }
    getUsers(req,res){
        let user = maintenanceService.getUsers();
        if(user){
            res.send(user)
        }else{
            res.statusCode = 400;
            res.setHeader("content-type","application/json");
            res.json({
                message: "Sorry, your request could not be created"
            });
        }

        
    }
    getUserRequests(req,res){
        let requests  = maintenanceService.getAllRequestOfUser(parseInt(req.params.id));
        console.log(requests);
        if(requests){
            res.statusCode = 200;
            res.send(requests);
        }else{
            res.statusCode = 400;
            res.setHeader("content-type","application/json");
            res.json({
                message: "Sorry, your request could not be created"
            });
        }
    }
    getRequestById(req,res){
        let requests = maintenanceService.getRequest(parseInt(req.params.id));
        if(requests){
            res.send(requests);
        }else{
            res.statusCode = 400;
            res.setHeader("content-type","application/json");
            res.json({
                message: "Bad request"
            });
        }
    }
    createNewRequest(req,res){
        //response = JSON.parse(req.body);
        maintenanceService.addRequest(req,res);
    }
    updateRequest(req,res){
        let request = maintenanceService.updateRequest(req);
        if(request){
            res.send(request);
        }else{
            res.statusCode = 400;
            res.setHeader("content-type","application/json");
            res.json({
                message: "Sorry, your request could not be created"
            });
        }
    }
    deleteRequest(req,res){
        let status = maintenanceService.deleteRquest(parseInt(req.params.id));
        if(status){
            res.writeHead(200, {"content-type": "text/palin"});
            res.end('action carried out successfully')
        }else{
            res.writeHead(500, {"content-type": "text/palin"});
            res.end("server error");
        }
    }
    createUser(req,res){
        maintenanceService.createuser(req,res);
        
    }
    userSign(req,res){
        //let request = req.body;
        console.log('hehbevyuvuyvuy')
        maintenanceService.userLogIn(req,res);
    }
    verifyToken(req,res,next){
    
        const bearerHeader = req.headers['authorization'];
        if(typeof bearerHeader !== undefined){
            const token = bearerHeader.split(' ')[1];
            req.token = token;
            next();
        }
    }
}

export default MaintenanceController;