import maintenaceService from '../services/maintenace';
import { parse } from 'url';

class MaintenaceController{
    constructor(router){
        //seed db
        
        this.router = router;
        this.registerRouter();
    }
    registerRouter(){
        this.router.get('/users',this.getUsers.bind(this));
        this.router.get('/user/:id/requests',this.getUserRequests.bind(this));
        this.router.get('/user/request/:id', this.getRequestById.bind(this));
        this.router.post('/user/request', this.createNewRequest.bind(this));
        this.router.put('/user/request/:id', this.updateRequest.bind(this));
        this.router.delete('/user/request/:id', this.deleteRequest.bind(this));
    }
    getUsers(req,res){
        let user = maintenaceService.getUsers();
        res.send(user)
    }
    getUserRequests(req,res){
        let requests  = maintenaceService.getAllRequestOfUser(parseInt(req.params.id));
        console.log(requests);
        if(requests){
            res.send(requests);
        }else{
            res.sendStatus(404);
        }
    }
    getRequestById(req,res){
        let requests = maintenaceService.getRequest(parseInt(req.params.id));
        if(requests){
            res.send(requests);
        }else{
            res.sendStatus(404);
        }
    }
    createNewRequest(req,res){
        //response = JSON.parse(req.body);
        let request = maintenaceService.addRequest(req.body);
        if(request){
            res.send(request);
        }else{
            res.sendStatus(404);
        }
    }
    updateRequest(req,res){
        console.log('here')
        let request = maintenaceService.updateRequest(req);
        if(request){
            res.send(request);
        }else{
            res.sendStatus(404);
        }
    }
    deleteRequest(req,res){
        let status = maintenaceService.deleteRquest(parseInt(req.params.id));
        if(status){
            res.writeHead(200, {"content-type": "text/palin"});
            res.end('action carried out successfully')
        }else{
            res.writeHead(500, {"content-type": "text/palin"});
            res.end("server error")
        }
    }
}

export default MaintenaceController;