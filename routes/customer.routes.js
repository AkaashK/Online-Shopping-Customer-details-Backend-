const express = require('express')
const router = express.Router()

require('dotenv').config()

const bodyParser = require('body-parser')
router.use(bodyParser.json())

const passport = require('passport')

const customerControls = require('../controllers/customer.controller')

router.get('/', customerControls.getCustomers)

router.post('/createCustomer', customerControls.createCustomers)

router.put('/updateCustomer', customerControls.updateCustomers)

router.delete('/removeCustomer', customerControls.removeCustomer)

router.get('/getTotalIncome', customerControls.getTotalIncome)

router.get('/minPurchase', customerControls.minPurchase)

router.get('/maxPurchase', customerControls.maxPurchase)

router.post('/oauth/google', passport.authenticate('googleToken', { session: false }), customerControls.googleOAuth)

router.post('/oauth/facebook', passport.authenticate('facebookToken', {session: false}), customerControls.facebookOAuth)

module.exports = router