const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('../keys/keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if(err) throw err;
    else if (connection) connection.release();
    console.log('db is conected');
    return;
})
 
pool.query = promisify(pool.query);

module.exports = pool;