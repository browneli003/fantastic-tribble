const mysql = require('mysql2');
require('dotenv').config()

// create the connection to database
const connection = mysql.createConnection({
host: process.env.DB_HOST,
username: process.env.DB_USER,
password: process.env.DB_PASS,
port: 3306,
database: 'employees',
  
});




module.exports = connection