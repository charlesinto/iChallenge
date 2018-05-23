'use strict';
import uuid from 'node-uuid';

class MaintenaceService{
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
       // requests.id = uuid.v4()
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
}

export default new MaintenaceService();