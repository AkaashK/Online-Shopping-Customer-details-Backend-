const express = require('express')
const router = express.Router()

const bodyParser = require('body-parser')
router.use(bodyParser.json())

const customerControls = require('../controllers/customer.controller')

//Any router other than the give routes
// router.get('*', (req,res) => {
//     res.sendStatus(404)
// })

router.get('/', customerControls.getCustomers)

router.post('/createCustomer',customerControls.createCustomers)

router.put('/updateCustomer', customerControls.updateCustomers)

router.delete('/removeCustomer', customerControls.removeCustomer)

router.get('/getTotalIncome', customerControls.getTotalIncome)

router.get('/minPurchase', customerControls.minPurchase)

router.get('/maxPurchase', customerControls.maxPurchase)

module.exports = router