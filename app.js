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
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('dotenv').config

const app = express()

const admin = {
  name: 'Arun',
  password: '123456'
}

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

//initializing google auth strategy
passport.use(new GoogleStrategy({
  clientID: '236069476570-lvmk3ejvh281g7unlffpn114ta2n6nr7.apps.googleusercontent.com',
  clientSecret: 'L5Din7GetgBeQzIqWIHX7S_g',
  callbackURL: 'http://localhost:5000'
},
  async function (accessToken, refreshToken, profile, done) {
    await User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
))

//go to google login page
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }))

//after login, redirecting to the main page
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  async function (req, res) {
    await new Promise(() => {
      res.redirect('/')
    })
  })

//login credentials for the admin
app.post('/login', async (req, res) => {
  let username = req.body.username
  let password = req.body.password

  if (username == admin.name && password == admin.password) {
    await new Promise(() => {
      res.render('Welcome.ejs')
    })
  } else {
    await new Promise(() => {
      res.status(403).send('Not a admin')
    })
  }
})

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
