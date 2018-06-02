import pg from 'pg';
let pool;
console.log('env', process.env.NODE_ENV)
if(process.env.NODE_ENV='DEVELOPMENT'){
    const config = {
        user: 'postgres',
        database: 'Swift', 
        password: 'pa$$word123', 
        port: 5432, 
        max: 10, // max number of connection can be open to database
        idleTimeoutMillis: 30000,
    };
    let cs = 'postgres://jchegnjhbpztbl:80ddd4918f6d9897bc94ffd66995759c23f1bec43dab5ab01f2ab0642d478513@ec2-54-225-107-174.compute-1.amazonaws.com:5432/d1h9n7k7aok7gd'
     pool = new pg.Pool({connectionString:cs,ssl:true});
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
    });
    console.log('prodction')
}


//const config_online = process.env.DATABASE_URL;


export default pool;
