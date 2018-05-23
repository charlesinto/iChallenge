import pg from 'pg';

const config = {
    user: 'postgres',
    database: 'postgres', 
    password: 'pa$$word123', 
    port: 5432, 
    max: 10, // max number of connection can be open to database
    idleTimeoutMillis: 30000,
};

const pool = new pg.pool(config);

export default pool;
