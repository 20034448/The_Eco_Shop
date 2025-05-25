// db.js
const mysql = require('mysql2/promise');


const pool = mysql.createPool({
  host: 'localhost',      
  user: 'root',            
  password: 'Abbud20121984!',  
  database: 'ecoshopdatabase', 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
