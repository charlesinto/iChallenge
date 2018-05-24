import express from 'express';
import maintenanceController from './server/controllers/maintenance';
import maintenanceService from './server/services/maintenance';
import bodyParser from 'body-parser';

const apiVersion = express.Router();

maintenanceService.addUser({name:"charles"});
maintenanceService.addUser({name:"uyyuv"});
maintenanceService.addUser({name:"hvuyvyu"});
maintenanceService.addUser({name:"chaeyeyerles"});
maintenanceService.addUser({name:"b uvuy"});

maintenanceService.addRequest({userId:1,requestCategory:"repairs",itemCategory:"electronics", item:"phone",complaints:"shattered"})
maintenanceService.addRequest({userId:2,requestCategory:"repairs",itemCategory:"electronics", item:"phone",complaints:"shattered"})
maintenanceService.addRequest({userId:3,requestCategory:"repairs",itemCategory:"machine", item:"washing machine",complaints:"shattered"})
maintenanceService.addRequest({userId:4,requestCategory:"repairs",itemCategory:"electronics", item:"phone",complaints:"shattered"})
maintenanceService.addRequest({userId:1,requestCategory:"repairs",itemCategory:"furniture", item:"chair",complaints:"shattered"})
maintenanceService.addRequest({userId:2,requestCategory:"repairs",itemCategory:"electronics", item:"phone",complaints:"shattered"})
maintenanceService.addRequest({userId:3,requestCategory:"repairs",itemCategory:"electrical", item:"bulb",complaints:"shattered"})
maintenanceService.addRequest({userId:4,requestCategory:"repairs",itemCategory:"electronics", item:"phone",complaints:"shattered"})

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/iMaintenace/api/v1', apiVersion);

let MC = new maintenanceController(apiVersion);


let port = process.env.PORT || 5000;

app.listen(port, () =>{console.log(`Listening on ${port}`)});

export default app;
