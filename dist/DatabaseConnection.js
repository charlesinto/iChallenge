'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pool = void 0;
console.log('env', process.env.NODE_ENV);
if (process.env.NODE_ENV = 'DEVELOPMENT') {
    var config = {
        user: 'postgres',
        database: 'Swift',
        password: 'pa$$word123',
        port: 5432,
        max: 10, // max number of connection can be open to database
        idleTimeoutMillis: 30000
    };
    var cs = 'postgres://jchegnjhbpztbl:80ddd4918f6d9897bc94ffd66995759c23f1bec43dab5ab01f2ab0642d478513@ec2-54-225-107-174.compute-1.amazonaws.com:5432/d1h9n7k7aok7gd';
    pool = new _pg2.default.Pool(config);
} else if (process.env.NODE_ENV = 'TEST') {
    var _config = {
        user: 'postgres',
        database: 'mTracker-test',
        password: 'pa$$word123',
        port: 5432,
        max: 10, // max number of connection can be open to database
        idleTimeoutMillis: 30000
    };
    pool = new _pg2.default.Pool(_config);
} else {
    pool = new _pg2.default.Pool({
        connectionString: process.env.DATABSE_URL, ssl: true
    });
    console.log('prodction');
}

//const config_online = process.env.DATABASE_URL;


exports.default = pool;