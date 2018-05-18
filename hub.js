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