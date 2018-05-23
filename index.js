import express from 'express';
import maintenaceController from './controllers/maintenance';
import maintenaceService from './services/maintenace';
import bodyParser from 'body-parser';

const apiVersion = express.Router();
//seeed db
maintenaceService.addUser({name:"charles"});
maintenaceService.addUser({name:"uyyuv"});
maintenaceService.addUser({name:"hvuyvyu"});
maintenaceService.addUser({name:"chaeyeyerles"});
maintenaceService.addUser({name:"b uvuy"});

maintenaceService.addRequest({userId:1,requestCategory:"repairs",itemCategory:"electronics", item:"phone",complaints:"shattered"})
maintenaceService.addRequest({userId:2,requestCategory:"repairs",itemCategory:"electronics", item:"phone",complaints:"shattered"})
maintenaceService.addRequest({userId:3,requestCategory:"repairs",itemCategory:"machine", item:"washing machine",complaints:"shattered"})
maintenaceService.addRequest({userId:4,requestCategory:"repairs",itemCategory:"electronics", item:"phone",complaints:"shattered"})
maintenaceService.addRequest({userId:1,requestCategory:"repairs",itemCategory:"furniture", item:"chair",complaints:"shattered"})
maintenaceService.addRequest({userId:2,requestCategory:"repairs",itemCategory:"electronics", item:"phone",complaints:"shattered"})
maintenaceService.addRequest({userId:3,requestCategory:"repairs",itemCategory:"electrical", item:"bulb",complaints:"shattered"})
maintenaceService.addRequest({userId:4,requestCategory:"repairs",itemCategory:"electronics", item:"phone",complaints:"shattered"})

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/iMaintenace/api/v1', apiVersion);

let MC = new maintenaceController(apiVersion);


let port = process.env.PORT || 4000;

app.listen(port, () =>{console.log(`Listening on ${port}`)});

export default app;
