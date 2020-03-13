

const express = require('express')
const bodyparser = require('body-parser')
const customerRoutes = require('./controller/customers')
const cron = require('node-cron')
const backupdb = require('mysqldump')

require('dotenv').config()
let app = express()
app.use(bodyparser.json())

const hostname = process.env.DB_HOST;
const port = process.env.DB_PORT;

app.use('/customers', customerRoutes)

//backup mysqldump every hour using cron job
cron.schedule("* * * * *",()=>{
    backupdb({
        connection: {
            host: 'localhost',
            user: 'Akaash',
            password: 'root',
            database: 'customer',
        },
    dumpToFile: './backup.sql',
    })
    console.log('SQL dump successfull')
})

app.listen(port, hostname, () => { 
    console.log(`Server running at http://${hostname}:${port}/`);
});
