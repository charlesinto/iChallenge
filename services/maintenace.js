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
    getRequest(requestId){
        return this.userRequest.filter(req => req.id === requestId) || null;
    }
    addRequest(requests){
       // requests.id = uuid.v4()
        requests.id = this.userRequest.length + 1;
        this.userRequest.push(requests);
        return requests || null;
    }
    updateRequest(response){
        this.userRequest.forEach((req) => {
            if(req.id === response.id){
                req.requestCategory = response.requestCategory;
                req.itemCategory = response.itemCategory;
                req.item = response.item;
                req.complaints = response.complaints;
            }
        });
        return this.userRequest.filter(req => req.id === response.id) || null;
    }
    deleteRquest(id){
        let actionFlag = false;
        for(i = 0; i< this.userRequest.length; i++){
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