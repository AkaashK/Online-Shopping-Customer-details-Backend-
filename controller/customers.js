/**
 * All the routes to the customer database is handled here, customer can view, delete and update the details
 * 
 * @author Akaash
 * @version 0.1
 * @since 13/03/20202
 */

const express = require('express')
const router = express.Router()
const mysqlConnection = require('../connection')

//To display the customer details
router.get('/', (res)=> {
    mysqlConnection.query('SELECT * FROM customerDetails;',async (err, rows)=>{
        await new Promise((success)=>{
            if(success) {
                res.send(rows)
            }else{
                res.send('failed to get customer details :'+ err)
            }
        })
    })
})

//To add a new customer
router.post('/add',(req, res)=> {
    let customer = req.body
    let sql = "INSERT INTO customerDetails VALUES("+customer.id+",'"+customer.name+"','"+customer.city+"');"
    mysqlConnection.query (sql, async(err)=>{

        await new Promise((success)=>{
            if(success) {
                res.send('New customer inserted')
            }else{
                res.send('failed to insert :'+ err)
            }
        })
    })
})

//To delete an existing customer
router.delete('/delete',(req,res)=>{
    let customer = req.body
    let sql = "DELETE FROM customerDetails WHERE id="+customer.id+""
    mysqlConnection.query(sql,async (err)=>{
        await new Promise((success)=>{
            if(success) {
                res.send('Deleted Customer id is '+customer.id)
            }else{
                res.send('failed to delete :'+ err)
            }
        })
    })
})

//Update the existing customer details
router.put('/update',(req,res)=>{
    let customer = req.body
    let sql = "UPDATE customerDetails SET name='"+customer.name+"',city='"+customer.city+"' WHERE id="+customer.id+";"
    mysqlConnection.query(sql, async(err)=>{
        await new Promise((success)=>{
            if(success) {
                res.send('Updated customer name is '+customer.name+" and customer city is "+customer.city)
            }else{
                res.send('failed to Update :'+ err)
            }
        })
    })
})

//export this module to the server.js file
module.exports = router