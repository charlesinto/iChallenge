import pool from '../DatabaseConnection';
import Validator from 'validator';
import jwt from 'jsonwebtoken';
import bcyrpt from 'bcrypt';

class MaintenanceService{
    constructor(){
        this.userRequest = [];
        this.users = [];
    }
    getUsers(){
        return this.users;
    }
    getAllRequestOfUser(userId){
       let requests = this.userRequest.filter(req => req.userId === userId);
       return requests || null;
    }
    getRequests(){
        return this.userRequest || null;
    }
    addUser(user){
        user.userId = this.users.length + 1;
        this.users.push(user);
        return this.user || null;
    }
    getRequest(requestId){
        return this.userRequest.filter(req => req.id === requestId) || null;
    }
    addRequest(requests){
        requests.id = this.userRequest.length + 1;
        this.userRequest.push(requests);
        return requests || null;
    }
    updateRequest(request){
        let obj = {};
        let response = request.body;
        console.log('res', response);
        this.userRequest.forEach((req) => {
            if(req.id === parseInt(request.params.id)){
                req.requestCategory = response[0].requestCategory;
                req.itemCategory = response[0].itemCategory;
                req.item = response[0].item;
                req.complaints = response[0].complaints;
                obj = req;
            }
        });
        return this.userRequest.filter(req => req.id === parseInt(request.params.id)) || null;
    }
    deleteRquest(id){
        let actionFlag = false;
        for( let i = 0; i< this.userRequest.length; i++){
            if(this.userRequest[i].id === id){
                this.userRequest.splice(i,1);
                actionFlag = true;
                break;
            }
        }
        return actionFlag;
    }
    createuser(user,res){
        const password = bcyrpt.hashSync(user.password,10)
        //perform validation
        if(user.fullName !== '' && user.email !== '' && user.phoneNumber !== ''){
            if(Validator.isEmail(user.email)){
                if(true){
                    pool.connect((err,client,done) =>{
                        if(err){
                            console.log('unable to connect to database');
                            res.sendStatus(500).send(err);
                        }else{
                            let sql = 'INSERT INTO BASE_USER (fullname,email,phonenumber,password) values($1, $2, $3, $4)'
                            client.query(sql,[user.fullName,user.email,user.phoneNumber,password],
                            (err,result) => {
                                if(err){
                                   res.statusCode = 500;
                                   res.setHeader('content-type', 'application/json');
                                   res.json({
                                       message: "Server error"
                                   });
                                }else{
                                    res.statusCode = 200;
                                    res.setHeader("content-type","application/json");
                                    res.json({
                                        message: "User created Successfully"
                                    });
                                    client.end();

                                }
                            });
                        }
                    });
                }
            }else{
                res.statusCode = 404;
                res.setHeader('content-type','application/json');
                res.json({
                    message: "Wrong phone number or email"
                });
            }
        }
    }
    userLogIn(req, res){
        let userFound = false;let username = '';
        let user = req.body;
        let sql = 'SELECT * FROM BASE_USER WHERE email = $1';
        pool.connect((err,client,done)=>{
            if(err){
                res.sendStatus(500).send(err);
            }else{
                client.query(sql,[user.email], (err,result)=>{
                    if(err){

                    }else{
                        //console.log(result)
                        if(result.rowCount > 0){
                            let dataSet = result.rows;
                            for(let i = 0; i < dataSet.length; i++){
                                if(bcyrpt.compareSync(user.password,dataSet[i].password)){
                                    userFound = true;
                                    username = dataSet[i].fullname;
                                    break;
                                }
                            }
                            if(userFound){
                                
                                jwt.sign({user}, 'user', (err,token)=>{
                                    if(!err){
                                        res.statusCode = 200;
                                        res.setHeader('content-type', 'application/json');
                                        res.json({
                                            message: `Welcome ${username}`,
                                            token
                                        });
                                    }
                                });
                            }else{
                                res.statusCode = 404;
                                res.setHeader('content-type','application/json');
                                res.json({
                                    message: "Login failed"
                                });
                            }
                        }else{
                            res.statusCode = 404;
                            res.setHeader('content-type','application/json');
                            res.json({
                                message: "Login failed"
                            });
                        }
                    }
                })
            }
        })
    }
    
}

export default new MaintenanceService();