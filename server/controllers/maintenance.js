import maintenanceService from '../services/maintenance';
import pool from '../DatabaseConnection';
import { parse } from 'url';
import Validator from 'validator';
import bcyrpt from 'bcrypt';
import jwt from 'jsonwebtoken';
/*
    reference - https://html5hive.org/how-to-create-rest-api-with-node-js-and-express/
*/
class MaintenanceController{
    constructor(router){
        this.router = router;
        this.registerRouter();
    }
    registerRouter(){
        this.router.get('/users',this.getUsers.bind(this));
        this.router.get('/users/requests',this.verifyToken,this.getUserRequests.bind(this));
        this.router.get('/user/request/:id',this.verifyToken, this.getRequestById.bind(this));
        this.router.post('/user/request',this.verifyToken,this.createNewRequest.bind(this));
        this.router.put('/user/request/:id',this.verifyToken, this.updateRequest.bind(this));
        this.router.delete('/user/request/:id', this.deleteRequest.bind(this));
        this.router.post('/auth/signup', this.createUser.bind(this));
        this.router.post('/auth/login',this.verifyToken,this.userSign.bind(this));
        this.router.get('/requests',this.verifyToken,this.getApplicationRequest.bind(this));
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
        maintenanceService.getAllRequestOfUser(req,res);
    }
    getRequestById(req,res){
        maintenanceService.getRequest(req,res);
    }
    createNewRequest(req,res){
        maintenanceService.addRequest(req,res);
    }
    updateRequest(req,res){
        maintenanceService.updateRequest(req,res);
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
        maintenanceService.userLogIn(req,res);
    }
    verifyToken(req,res,next){
    
        const bearerHeader = req.body.token || req.headers['authorization'];

        if (!bearerHeader){
            res.status(401).send({
                message: 'Unauthorized user'
            })
        } else if(typeof bearerHeader !== undefined){
            jwt.verify(bearerHeader, 'user' ,(err, authData) => {

                if(err) {
                    res.status(403).send({
                        message: "Forbidden access"
                    })
                }
              req.token = authData;
              //console.log(req.token);
              next();
            })
            
        }
        
    }
    getApplicationRequest(req,res){
        maintenanceService.getApplicationRequest(req,res);
    }
}

export default MaintenanceController;