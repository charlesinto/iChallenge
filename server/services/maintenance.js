import pool from '../DatabaseConnection';
import Validator from 'validator';
import jwt from 'jsonwebtoken';
import bcyrpt from 'bcrypt';
import Bll from '../HandleServerRequest';

class MaintenanceService{
    constructor(){
        this.userRequest = [];
        this.users = [];
    }
    getUsers(){
        return this.users;
    }
    getAllRequestOfUser(req,res){
        if(typeof req.token !== undefined){
            let userId = req.token.loggedInUser.id;
            let sql = 'SELECT * FROM BASE_REQUEST WHERE userid = $1'
            let makeRequest = new Promise((resolve,reject)=>{

                Bll.callServer(sql,[userId],(dataSet)=>{
                    resolve(dataSet)
                })
            })
            makeRequest.then((dataSet)=>{
                if(dataSet.status === 200){
                    res.statusCode = 200;
                    res.setHeader('content-type', 'application/json');
                    res.json(
                        dataSet.data.rows
                    )
                }
            })
        }
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
    addRequest(req,res){
        let loggedInUser; let userid;
        let request = req.body;
        if(req.token !== undefined){
            let userId = req.token.loggedInUser.id;
            let sql = "INSERT INTO BASE_REQUEST (item,itemCategory,requestCategory, complaints, userid, status, datecreated) VAlUES ($1,$2,$3,$4,$5,$6,$7)";
            let req2 = new Promise((resolve,reject)=>{
             Bll.callServer(sql,[request.item, request.itemCategory,request.requestCategory,request.complaints,userId,"PENDING",'NOW()'],(DT)=>{
             resolve(DT);
                })

            });
             req2.then((dataSet)=>{
                if(dataSet.status == 200){
                    res.statusCode = 200;
                    res.setHeader('content-type','application/json');
                    res.json({
                        message: "Request successfully posted"
                    })
                }else{
                    res.statusCode = dataSet.status;
                    res.setHeader('content-type','application/json');
                    res.json({
                        message: dataSet.message
                    })
                }
            })
        }
    }
    updateRequest(request){
        let obj = {};
        let response = request.body;
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
    createuser(req,res){
        let user = req.body
        const password = bcyrpt.hashSync(user.password,10);
        //perform validation
        if(user.fullName !== '' && user.email !== '' && user.phonenumber !== ''){
            if(Validator.isEmail(user.email)){
                if(/^\d+$/.test(user.phonenumber) && !/[_!*?/><{@#$%^&()]/.test(user.fullName)){
                    let sql = 'SELECT * FROM BASE_USER WHERE email = $1'
                    let request = new Promise((resolve,reject)=>{
                        Bll.callServer(sql,[user.email], (dataSet)=>{
                            resolve(dataSet);
                        })
                    });
                    
                    request.then((dataSet)=>{
                        if(dataSet.data.rowCount == 0){
                            let sql = 'INSERT INTO BASE_USER (fullname,email,phonenumber,password) values($1, $2, $3, $4)';
                            let request2 = new Promise((resolve,reject)=>{
                                Bll.callServer(sql,[user.fullName,user.email,user.phonenumber,password],(result)=>{
                                    resolve(dataSet);
                                });
                            });
                            request2.then((result)=>{
                                if(result.status == 200){
                                    res.statusCode = 200;
                                    res.setHeader("content-type","application/json");
                                     res.json({
                                        message: "User created Successfully"
                                    }); 
                                }
                                else if(result.status == 500){
                                    res.statusCode = 500;
                                    res.setHeader("content-type","application/json");
                                    res.json({
                                        message: result.message
                                    });
                                }
                            })
                        }else{
                            res.json({
                                message:'email exists'
                            })
                        }
                    

                    })
                }else{
                    res.statusCode = 404;
                    res.setHeader('content-type','application/json');
                    res.json({
                        message: "special characters not allowed in fullName field"
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
        if(req !== undefined){
            let user = req.body;
            if(Validator.isEmail(user.email) && user.password !== ''){
                let sql = 'SELECT * FROM BASE_USER WHERE email = $1';
                 let request = new Promise((resolve,reject) =>{
                    Bll.callServer(sql, [user.email], function(response){
                        resolve(response);
                    });
                 });
                 request.then((dataSet)=>{
                     let st = dataSet.status
                    if(parseInt(dataSet.status) === 200){
                        let dt = dataSet.data.rows.filter(rec => bcyrpt.compareSync(user.password, rec.password));
                        if(typeof dt !== undefined && dt.length > 0){
                            let loggedInUser = dt[0];
                            jwt.sign({loggedInUser},'user', {expiresIn:'6h'},(err,token)=>{
                                if(err){
                                    res.statusCode = 401;
                                    res.setHeader('content-type', 'application/json');
                                    res.json({
                                        message: "couldnt perform log in"
                                    });
                                }else{
                                    res.statusCode = 200;
                                         res.setHeader('content-type', 'application/json');
                                         res.json({
                                            message: `Welcome ${loggedInUser.fullname}`,
                                            token
                                        });
                                }
                            })
                        }
                    }
                })   
                
            }
        }
    }
    
}

export default new MaintenanceService();