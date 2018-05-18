import express from 'express';
import hub from './hub';
const api = express.Router();
const home_url = './iTracker';
api.get('/users', (req,res)=>hub.getusers(req,res));
api.get('/users/:id/requests', (req,res) => hub.getUserRequest(req,res));
api.get('/users/requests/:id', (req,res) => hub.getUserByRequestId(req,res));
api.post('/users/requests',(req,res)=>hub.postUserRequest(req,res));
api.put('/users/requests/:id', (req,res) => hub.updateRequest(req,res));
api.delete('users/requests/:id',(req,res)=>hub.deleteRequest(req,res));


export default api;