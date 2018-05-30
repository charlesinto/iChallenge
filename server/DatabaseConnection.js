import pg from 'pg';

const config = {
    user: 'postgres',
    database: 'Swift', 
    password: 'pa$$word123', 
    port: 5432, 
    max: 10, // max number of connection can be open to database
    idleTimeoutMillis: 30000,
};
const config_online = process.env.DATABASE_URL;
const pool = new pg.Pool({
    connectionString: config_online, ssl:true});

export default pool;
