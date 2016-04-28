'use strict'

let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let passport = require('passport');
let FacebookStrategy = require('passport-facebook').Strategy;
let mysql = require('mysql');
let fbconfig = require(__dirname + '/configuration/fbConfig.js');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let app = express();

// var connection = mysql.createConnection({
//   host     : config.host,
//   user     : config.username,
//   password : config.password,
//   database : config.database
// });

// if(config.use_database==='true')
// {
//   connection.connect();
// }

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
  clientID: fbconfig.facebook_api_key,
  clientSecret: fbconfig.facebook_api_secret ,
  callbackURL: fbconfig.callback_url
},
function(accessToken, refreshToken, profile, done) {
  process.nextTick(function () {
      //Check whether the User exists or not using profile.id
      //Further DB code.
      return done(null, profile);
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
  req.logout();
  res.redirect('/');
});

app.listen(8080, () => {
  console.log('Example app listening on port 8080!');
});
