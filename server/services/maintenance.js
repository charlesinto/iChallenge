import pool from '../DatabaseConnection';
import Validator from 'validator';
import jwt from 'jsonwebtoken';
import bcyrpt from 'bcrypt';
import handleServerRequest from '../HandleServerRequest';

class MaintenanceService{
    constructor(){
        this.userRequest = [];
        this.users = [];
    }
    getUsers(){
        return this.users;
    }
    disapproveRequest(req,res){
        const ADMIN = 1;
        if(typeof req.token !== undefined){
            if(req.token.loggedInUser.roleid === ADMIN){
                let requestid = parseInt(req.params.id);
                let sql = 'UPDATE BASE_REQUEST SET STATUS = $1 WHERE id = $2'
                handleServerRequest.callServer(sql,['DISAPPROVED', requestid], (dataSet)=>{
                    if(dataSet.status == 200){
                        res.statusCode = 200;
                        res.setHeader('content-type', 'application/json');
                        res.json({
                            message: 'Request Disapproved'
                            }  
                        )     
                    }else{
                        res.statusCode = dataSet.status;
                        res.setHeader('content-type','application/json');
                        res.json({
                        message: dataSet.message
                        })
                    }
                })
                 
            }else{
                res.statusCode = 401
                res.setHeader('content-type','application/json');
                res.json({
                    message:'Unathourized access'
                })
            }
        }else{
            res.statusCode = 406
            res.setHeader('content-type','application/json');
            res.json({
                message:'Action Could not be completed'
            })
        }
    }
    resolveRequest(req,res){
        const ADMIN = 1;
        if(typeof req.token !== undefined){
            if(req.token.loggedInUser.roleid === ADMIN){
                let requestid = parseInt(req.params.id);
                let sql = 'UPDATE BASE_REQUEST SET STATUS = $1 WHERE id = $2'
                handleServerRequest.callServer(sql,['RESOLVED', requestid], (dataSet)=>{
                    if(dataSet.status == 200){
                        res.statusCode = 200;
                        res.setHeader('content-type', 'application/json');
                        res.json({
                            message: 'Request Resolved'
                            }  
                        )     
                    }else{
                        res.statusCode = dataSet.status;
                        res.setHeader('content-type','application/json');
                        res.json({
                        message: dataSet.message
                        })
                    }
                })
                 
            }else{
                res.statusCode = 401
                res.setHeader('content-type','application/json');
                res.json({
                    message:'Unauthorized user'
                })
            }
        }
    }
    approveRequest(req,res){
        const ADMIN = 1;
        if(typeof req.token !== undefined){
            if(req.token.loggedInUser.roleid === ADMIN){
                let requestid = parseInt(req.params.id);
                let sq = 'SELECT * FROM BASE_REQUEST WHERE id = $1'
                handleServerRequest.callServer(sq,[requestid],(dataSet)=>{
                    if(dataSet.status == 200){
                        if(dataSet.data.rows[0].status === 'PENDING'){
                            let sql = 'UPDATE BASE_REQUEST SET status = $1 WHERE id = $2'
                            handleServerRequest.callServer(sql,['APPROVED', requestid], (dataSet)=>{
                                    console.log('>>>>>>>>>>>>',dataSet);
                                if(dataSet.status == 200){
                                   // res.statusCode = 200;
                                   // res.setHeader('content-type', 'application/json');
                                    res.send({
                                        message: 'Request Approved'
                                        }  
                                    )     
                                }
                            })
                            
                        }else{
                            res.statusCode = 406
                            res.setHeader('content-type','application/json');
                            res.json({
                                message:'Action Could not be completed'
                            })
                        }
                    }
            })  
            }else{
                res.statusCode = 401
                res.setHeader('content-type','application/json');
                res.json({
                    message:'Unauthorized user'
                })
            }
        }
    }
    getAllRequestOfUser(req,res){
        if(typeof req.token !== undefined){
            let userId = req.token.loggedInUser.id;
            let sql = 'SELECT * FROM BASE_REQUEST WHERE userid = $1'
            handleServerRequest.callServer(sql,[userId],(dataSet)=>{
                if(typeof dataSet.data !== undefined){
                if(dataSet.status === 200){
                    res.statusCode = 201;
                    res.setHeader('content-type', 'application/json');
                    res.json(
                        dataSet.data.rows
                    )
                }else{
                    res.statusCode = dataSet.status;
                    res.setHeader('content-type','application/json');
                    res.json({
                        message: dataSet.message
                    })
                }
            }
            })
        }
    }
    getRequest(req,res){
        if(typeof req.token !== undefined){
            let requestId = parseInt(req.params.id);
            if(typeof requestId !== undefined){
                let sql = 'SELECT * FROM BASE_REQUEST WHERE userid = $1 AND id = $2';
                handleServerRequest.callServer(sql,[req.token.loggedInUser.id, requestId],(dataSet)=>{
                    if(typeof dataSet.data !== undefined){

                        if(dataSet.status = 200){
                            if(typeof dataSet !== undefined && dataSet.data.rowCount > 0){
                                res.statusCode = 201;
                                res.setHeader('content-type','application/json');
                                res.json(dataSet.data.rows);
                            }else{
                                res.statusCode = 404;
                                res.setHeader('content-type','application/json');
                                res.json({
                                    message:"No record Found"
                                })
                            }
                        }else{
                            res.statusCode = dataSet.status;
                            res.setHeader('content-type','application/json');
                            res.json({
                                message: dataSet.message
                            })
                        }
                }
                })
            }
        }
        //return this.userRequest || null;
    }
    addRequest(req,res){
        let loggedInUser; let userid;
        let request = req.body;
        if(req.token !== undefined){
            let userId = req.token.loggedInUser.id;
            if(this.validateRequest(request)){
                    let sql = "INSERT INTO BASE_REQUEST (item,itemCategory,requestCategory, complaints, userid, status, datecreated) VAlUES ($1,$2,$3,$4,$5,$6,$7)";
                    handleServerRequest.callServer(sql,[request.item, request.itemCategory,request.requestCategory,request.complaints,userId,"PENDING",'NOW()'],(dataSet)=>{
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
            }else{
                res.statusCode = 404;
                res.setHeader('content-type','application/json');
                res.json({
                    message: "One of more field is required"
                })
            }
            
        }else{
            res.statusCode = 401;
                res.setHeader('content-type','application/json');
                res.json({
                    message: "unauthorized user"
                   })
        }
    }
    updateRequest(req, res){
        let update = req.body;
        if(typeof req.token !== undefined && typeof update !== undefined){
            let requestId = parseInt(req.params.id);
            if(typeof requestId !== undefined){
                let sql = 'SELECT * FROM BASE_REQUEST WHERE userid = $1 AND id = $2';
                handleServerRequest.callServer(sql,[req.token.loggedInUser.id, requestId],(dataSet)=>{
                     if(typeof dataSet.data !== undefined){

                     
                        if(dataSet.status = 200){
                            if(typeof dataSet !== undefined && dataSet.data.rowCount > 0){
                                if(dataSet.data.rows[0].status === 'Approved'){
                                    res.statusCode = 406;
                                    res.setHeader('content-type','application/json');
                                    res.json({
                                        message:"Operation Not Possible"
                                    })
                                }else{
                                    let sql = 'UPDATE BASE_REQUEST SET itemCategory = $1, item = $2 ,complaints = $3 WHERE id = $4 AND userid = $5'
                                    handleServerRequest.callServer(sql,[update.itemcategory,update.item,update.complaints,parseInt(req.params.id), req.token.loggedInUser.id],(dataSet)=>{
                                            if(typeof dataSet.data !== undefined && dataSet.status === 200){
                                                res.statusCode = 200;
                                                res.setHeader('content-type','application/json');
                                                res.json({
                                                    message:"Update Successful"
                                                });
                                            }else{
                                                res.statusCode = dataSet.status;
                                                res.setHeader('content-type','application/json');
                                                res.json({
                                                    message: dataSet.message
                                                })
                                            }
                                    })
                                }
                            }else{
                                res.statusCode = 404;
                                res.setHeader('content-type','application/json');
                                res.json({
                                    message:"No record Found"
                                })
                            }
                        }else{
                            res.statusCode = dataSet.status;
                            res.setHeader('content-type','application/json');
                            res.json({
                                message: dataSet.message
                            })
                        }
                    }
                })
            }
        }
    }
    getApplicationRequest(req,res){
        if(typeof req.token !== undefined){
            console.log('>>>>', req.token.loggedInUser);
            if(req.token.loggedInUser.roleid == 1){
                let sql = 'SELECT * FROM BASE_REQUEST'
                handleServerRequest.callServer(sql,[],(dataSet)=>{
                    if(dataSet.status = 200){
                        res.statusCode = 200;
                        res.setHeader('content-type','application/json');
                        res.json(
                            dataSet.data.rows
                        );
                    }else{
                        res.statusCode = dataSet.status;
                        res.setHeader('content-type','application/json');
                        res.json({
                            message: dataSet.message
                        })
                    }
                })
            }else{
                res.statusCode = 401;
                res.setHeader('content-type','application/json');
                res.json({
                    message: "Unathourized access"
                })
            }
        }
    }
    createuser(req,res){
        let user = req.body
        const password = bcyrpt.hashSync(user.password,10);
        //perform validation
        if(user.fullName !== '' && user.email !== '' && user.phonenumber !== ''){
            if(Validator.isEmail(user.email)){
                if(/^\d+$/.test(user.phonenumber) && !/[_!*?/><{@#$%^&()]/.test(user.fullName)){
                    //CHECKS IF EMAIL EXISTS
                    let sql = 'SELECT * FROM BASE_USERS WHERE email = $1'
                    handleServerRequest.callServer(sql,[user.email], (dataSet)=>{
                        //IF EMAIL DOEST NOT EXIST, CREATE USER
                        if(typeof dataSet.data !== undefined){
                        if(dataSet.data.rowCount === 0){
                                 sql = 'INSERT INTO BASE_USERS (fullname,email,phonenumber,password,roleid,datecreated) values($1, $2, $3, $4, $5,$6)';
                            
                                 handleServerRequest.callServer(sql,[user.fullName,user.email,user.phonenumber,password,2,'NOW'],(result)=>{
                                    if(result.status == 200){
                                        res.statusCode = 201;
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
                    }else{
                        res.statusCode = 500;
                        res.setHeader('content-type', 'application/json');
                        res.json({
                                message:dataSet.err
                            }
                            
                        )
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
                let sql = 'SELECT * FROM BASE_USERS WHERE email = $1';
                handleServerRequest.callServer(sql, [user.email], function(dataSet){
                    if(typeof dataSet.data !==undefined){
                      
                        if(parseInt(dataSet.status) === 200){
                            let dt = dataSet.data.rows.filter(rec => bcyrpt.compareSync(user.password, rec.password));
                            if(typeof dt !== undefined && dt.length > 0){
                                let loggedInUser = dt[0];
                                jwt.sign({loggedInUser},'users', {expiresIn:'6h'},(err,token)=>{
                                    if(err){
                                        res.statusCode = 401;
                                        res.setHeader('content-type', 'application/json');
                                        res.json({
                                            message: "couldnt perform log in"
                                        });
                                    }else{
                                        res.statusCode = 201;
                                            res.setHeader('content-type', 'application/json');
                                            res.json({
                                                message: `Welcome ${loggedInUser.fullname}`,
                                                token
                                            });
                                    }
                                })
                            }
                        }
                    }
                })   
                
            }
        }
    }
    validateRequest(request){
        
        if(typeof request !== undefined){
            
            if((request.item !== '' && !/d/.test(request.item)) && (request.itemCategory !== '' && !/d/.test(request.itemCategory)) && (request.complaints !== '' && !/d/.test(request.complaints)) ){
                return true;
            }
        }else{
            return false;
        }


    }
}

export default new MaintenanceService();