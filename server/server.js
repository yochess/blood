'use strict'

let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let passport = require('passport');
let FacebookStrategy = require('passport-facebook').Strategy;
let mysql = require('mysql');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let Sequelize = require('sequelize');
let app = express();

var sequelize = new Sequelize('blood', 'process.env.sqluid', 'sqlpw');

var Donor = sequelize.define('donor', {
  uid: {type:Sequelize.STRING, primaryKey: true},
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  photo: Sequelize.STRING,
  lat: Sequelize.FLOAT,
  long: Sequelize.FLOAT,
  bloodtype: Sequelize.STRING,
});

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
  clientID: process.env.fbapikey,
  clientSecret: process.env.fbapisecret,
  callbackURL: 'http://ec2-52-24-119-211.us-west-2.compute.amazonaws.com:8080/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'email']
},
function(accessToken, refreshToken, profile, done) {
  process.nextTick(function () {
      //Check whether the User exists or not using profile.id
      //Further DB code.
      Donor.findOrCreate({where: {uid: profile.id}, defaults: {name: profile.name, email: profile.email, photo: profile.photos[0].val}}), function(err, user) {
        if (err) { return done(err); }
        done(null, user);
      });
    });
}
));

let clientPath = path.resolve(__dirname + '/../client');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(clientPath));
app.use(session({secret: 'lolwut', key: 'sid'}));
app.use(passport.initialize());
app.use(passport.session());

var isAuth = (req, res, next) => {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
};

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/profile', (req, res) => {
  console.log(req.data);
  res.send('Profile Page');
});

app.post('/api/profile', (req, res) => {
  console.log('Post Profile',req.data);
  response.status(201).end();
});

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
   successRedirect : '/',
   failureRedirect: '/login'
 }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.session.destroy(function (err) {
    res.redirect('/'); //Inside a callback… bulletproof!
  });
});

app.listen(8080, () => {
  console.log('Example app listening on port 8080!');
});
