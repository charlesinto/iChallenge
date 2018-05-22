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
}

export default MaintenaceController;