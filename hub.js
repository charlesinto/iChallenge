import fs from 'fs';
import express from 'express';
import users from './res/users.json';
const user_path = './res/users.json';
const request_path = './res/requests.json';
const app = express();

export function getUsers(req,res){
    fs.readFile(user_path, null, function(err,data){
        if(!err){
            res.writeHead(200,{'content-type':'text/plain'});
            res.end(data);
            // for sending objects user res.send()

        }
    });

}
export function getUserRequest(req,res){
    fs.readFile(request_path,function(err,data){
        if(!err){
            id = parseInt(req.params.id);
            //console.log(user_id);
            requests = JSON.parse(data);
            usr_request = [];
            request.forEach(element => {
                if(element.user_id){
                    if(element.user_id === id){
                        usr_request.push(element);
                    }
                }
            });
           // console.log(usr_request);
           res.writeHead(200,{'content-type':'text/plain'});
          // console.log(JSON.stringify(usr_request));
           res.end(JSON.stringify(usr_request));
        }
    })
    
}
export function getUserByRequestId(req,res){
    fs.readFile(request_path,function(err,data){
        if(!err){
            id = parseInt(req.params.id);
            requests = JSON.parse(data);
            user_request = '';
            requests.forEach(element => {
                if(element.request_id === id){
                    user_request = JSON.stringify(element);
                    
                }
            });
            if(user_request){
                res.writeHead(200,{'content-type':'text/plain'});
                res.end(user_request);
            }else{
                res.status(404).send('request not found')
            }
            
           // console.log(user_request);
        }
    });
}