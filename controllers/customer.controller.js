const customerDB = require('../models/customers')
const bodyParser = require('body-parser')
const sequelize = require('sequelize')
bodyParser.json()

//get Customer details
exports.getCustomers = async (req, res) => {
    try {        
        const rows = await customerDB.customer.findAll({ offset : req.body.offset, limit : req.body.limit })
        res.send(rows)
    }
    catch (error) {
        res.sendStatus(403)
        console.log(error)
    }
}

//create new customer
exports.createCustomers = async (req,res) => {
    try {
        await customerDB.customer.create({
            ID:req.body.id,
            CUSTOMER_NAME:req.body.name,
            CUSTOMER_CITY: req.body.city,
            LAST_MONTH_PURCHASE:req.body.amount
        })
        res.sendStatus(200)
    }
    catch(error){
        res.sendStatus(403)
    }
}

//update an existing customer
exports.updateCustomers = async (req,res) => {
    try {
       await customerDB.customer.update({
            CUSTOMER_NAME:req.body.name,
            CUSTOMER_CITY: req.body.city,
            LAST_MONTH_PURCHASE:req.body.amount 
        },{ where : { ID : req.body.id } })
        res.sendStatus(200)
    }
    catch(error) {
        res.sendStatus(403)
    }
}

//remove an existing customer
exports.removeCustomer = async (req,res) => {
    try {
        await customerDB.customer.destroy ({ 
            where :{ 
                CUSTOMER_NAME:req.body.name 
            }  
        })
        res.sendStatus(200)
    }
    catch(error){
        res.sendStatus(403)
    }
}

//get total Income for the last month purchase
exports.getTotalIncome = async (req,res) => {
    try {
        const totalIncome = await customerDB.customer.findAll({
            attributes: [[sequelize.fn('sum', sequelize.col('LAST_MONTH_PURCHASE')), 'Total Income']],
            raw: true,
        })
        res.send(totalIncome)
    }
    catch(error){
        res.sendStatus(403)
    }
}

//lowest prchase amount last month
exports.minPurchase = async (req,res) => {
    try {
        const minPurchase = await customerDB.customer.findAll({
            attributes: [[sequelize.fn('min', sequelize.col('LAST_MONTH_PURCHASE')), 'Lowest Purchase']],
            raw: true,
          })
        res.send(minPurchase)
    }
    catch(error){
        console.log(error)
        res.sendStatus(403)
    }
}

//highest purchase amount last month
exports.maxPurchase = async (req,res) => {
    try {
        const minPurchase = await customerDB.customer.findAll({
            attributes: [[sequelize.fn('max', sequelize.col('LAST_MONTH_PURCHASE')), 'Highest Purchase']],
            raw: true,
          })
        res.send(minPurchase)
    }
    catch(error){
        console.log(error)
        res.sendStatus(403)
    }
}

