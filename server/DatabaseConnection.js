import pg from 'pg';
let pool;
if(process.env.NODE_ENV='DEVELOPMENT'){
    const config = {
        user: 'postgres',
        database: 'Swift', 
        password: 'pa$$word123', 
        port: 5432, 
        max: 10, // max number of connection can be open to database
        idleTimeoutMillis: 30000,
    };
     pool = new pg.Pool(config);
}
else if(process.env.NODE_ENV = 'TEST'){
    const config = {
        user: 'postgres',
        database: 'mTracker-test', 
        password: 'pa$$word123', 
        port: 5432, 
        max: 10, // max number of connection can be open to database
        idleTimeoutMillis: 30000,
    };
     pool = new pg.Pool(config);
}else{
    pool = new pg.Pool({
        connectionString:process.env.DATABSE_URL, ssl:true
    })
}


//const config_online = process.env.DATABASE_URL;


export default pool;
