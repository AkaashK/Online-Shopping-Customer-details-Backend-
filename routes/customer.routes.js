const express = require('express')
const router = express.Router()

require('dotenv').config()

const bodyParser = require('body-parser')
router.use(bodyParser.json())

const passport = require('passport')

const jwt = require('jsonwebtoken')

const customerControls = require('../controllers/customer.controller')

//Any router other than the give routes
// router.get('*', (req,res) => {
//     res.sendStatus(404)
// })

router.get('/', customerControls.getCustomers)

router.post('/createCustomer', customerControls.createCustomers)

router.put('/updateCustomer', customerControls.updateCustomers)

router.delete('/removeCustomer', customerControls.removeCustomer)

router.get('/getTotalIncome', customerControls.getTotalIncome)

router.get('/minPurchase', customerControls.minPurchase)

router.get('/maxPurchase', customerControls.maxPurchase)

router.post('/oauth/google', passport.authenticate('googleToken', { session: false }), async (req, res) => {
    await new Promise((success) => {
        if(success){
            return res.render('Welcome.ejs')
        } else {
            return res.status(403).send('Unauthorized user')
        }
    })
})

module.exports = router