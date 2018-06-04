import express from 'express';
import maintenanceController from './controllers/maintenance';
import maintenanceService from './services/maintenance';
import bodyParser from 'body-parser';

const apiVersion = express.Router();


const app = express();

app.use(express.static('ui'));
app.get('/', (req,res)=>{
    res.sendFile('index.html', {root:'.'})
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/iMaintenace/api/v1', apiVersion);

let MC = new maintenanceController(apiVersion);


let port = process.env.PORT || 4000;

app.listen(port, () =>{console.log(`Listening on ${port}`)});

export default app;
