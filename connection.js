/**
 * Mysql connection established in this code to connect to the database
 * 
 * @author Akaash
 * @version 0.1
 * @since 13/03/2020
 */

const mysql = require('mysql')

let dbConnection = mysql.createConnection({
    host : 'localhost',
    user : 'Akaash',
    password : 'root',
    database : 'customer',
    multipleStatements : true,
    socketPath: '/var/run/mysqld/mysqld.sock',
    port : 3306
})
dbConnection.connect( err => {
    if(err){
        console.log('Connection failed'+ err)
    }else{
        console.log('Connected to DB')
    }
})

module.exports = dbConnection 