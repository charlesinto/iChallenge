import maintenaceService from '../services/maintenace';

class MaintenaceController{
    constructor(router){
        //seed db
        
        this.router = router;
        this.registerRouter()
    }
    registerRouter(){
        this.router.get('/users',this.getUsers.bind(this));
    }
    getUsers(req,res){
        let user = maintenaceService.getUsers();
    }
}

export default MaintenaceController;