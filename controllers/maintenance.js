import maintenaceService from '../services/maintenace';
import { parse } from 'url';

class MaintenaceController{
    constructor(router){
        //seed db
        
        this.router = router;
        this.registerRouter()
    }
    registerRouter(){
        this.router.get('/users',this.getUsers.bind(this));
        this.router.get('/user/:id/requests',this.getUserRequests.bind(this));
        this.router.get('/user/request/:id', this.getRequestById.bind(this));
        this.router.post('/user/request', this.createNewRequest.bind(this));
        this.router.put('/user/request/:id', this.updateRequest.bind(this));
        this.router.delete('/user/request/', this.deleteRequest.bind(this));
    }
    getUsers(req,res){
        let user = maintenaceService.getUsers();
        res.send(user)
    }
    getUserRequests(req,res){
        let requests  = maintenaceService.getAllRequestOfUser(parseInt(req.params.id));
        console.log(requests);
        if(requests){
            res.sendStatus(200).send(requests);
        }else{
            res.sendStatus(404);
        }
    }
    getRequestById(req,res){
        let requests = maintenaceService.getRequestById(parseInt(req.params.id));
        if(requests){
            res.sendStatus(200).send(requests);
        }else{
            res.sendStatus(404);
        }
    }
    createNewRequest(req,res){
        response = JSON.parse(req.body);
        let request = maintenaceService.addRequest(request);
        if(requests){
            res.sendStatus(200).send(requests);
        }else{
            res.sendStatus(404);
        }
    }
    updateRequest(req,res){
        let request = maintenaceService.updateRequest(parseInt(req.params.id));
        if(requests){
            res.sendStatus(200).send(requests);
        }else{
            res.sendStatus(404);
        }
    }
    deleteRequest(req,res){
        let status = maintenaceService.deleteRquest(parseInt(req.params.id));
        if(status){
            res.sendStatus(200).send('action carried out successfully');
        }else{
            res.sendStatus(500).send('error occurred');
        }
    }
}

export default MaintenaceController;