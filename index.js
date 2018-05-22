import express from 'express';
import maintenaceController from './controllers/maintenance';
import maintenaceService from './services/maintenace';
import bodyParser from 'body-parser';

const apiVersion = express.Router();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/iMaintenace/api/v1', apiVersion);

let MC = new maintenaceController(apiVersion);


let port = process.env.PORT || 3000;

app.listen(port,()=>{console.log(`Listening on ${port}`)});