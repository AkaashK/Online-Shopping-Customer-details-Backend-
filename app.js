/**
 * Acts as the server for the main application
 * 
 * @author Akaash
 * @since 22.03.2020
 * @version 0.1
 */
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport');
require('dotenv').config()
const googlePlusTokenStrategy = require('passport-google-plus-token')
const dbmodel = require('./models/customers')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

//Connect to the database
const database = require('./config/db.config')
const customerRoutes = require('./routes/customer.routes')

database
  .authenticate()
  .then(() => {
    console.log('DB Connection successfull');
  })
  .catch(err => {
    console.error('Unable to connect to the DB:', err);
  });

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  optionsSuccessStatus: 200
}))

passport.use('googleToken', new googlePlusTokenStrategy({
  clientID: '236069476570-lvmk3ejvh281g7unlffpn114ta2n6nr7.apps.googleusercontent.com',
  clientSecret: 'L5Din7GetgBeQzIqWIHX7S_g'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('AcessToken ', accessToken)
    console.log('refreshToken ', refreshToken)
    console.log('profile ', profile)

    const existingUser = await dbmodel.admin.findOne({ where: { id: profile.id } })
    if(existingUser){
      console.log('User already exits')
      return done(null, existingUser)
    }
    const newUser = await dbmodel.admin.create({
      id: profile.id,
      email: profile.emails[0].value
    })
    console.log('New user added ', newUser)
    done(null, newUser)
  } catch (error) {
    done(error, false, error.message)
  }
}))

//main page after the admin login
app.get('/', async (req, res, next) => {
  await new Promise(() => {
    res.render('Welcome.ejs')
    next()
  })
})

app.use('/customers', customerRoutes)

let PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running on port ${PORT}`))
