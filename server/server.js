'use strict'

/* Dependencies */
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let passport = require('passport');
let FacebookStrategy = require('passport-facebook').Strategy;
let LocalStrategy = require('passport-local').Strategy;
let mysql = require('mysql');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let app = express();

/* Controllers */
let controllers = require('./controllers/controller.js');
let Donor = controllers.Donor;
let Hospital = controllers.Hospital;

/* Routes */
let profileRouter = require('./routes/profile.js');

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
  process.nextTick(() => {
      //Check whether the User exists or not using profile.id
      //Further DB code.
      Donor.findOrCreate({where: {uid: profile.id}, defaults: {name: profile.displayName, email: profile.email, photo: profile.photos[0].value}})
      .spread(function(user, created) {
        done(null, user);
      });
    });
}
));

passport.use('local-signup', new LocalStrategy(function(req, username, password, done) {
  process.nextTick(function() {

    Hospital.findOne({username: username}, function(err, user) {
      if (err)
        return done(err);

      if (user) {
        return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
      } else {
        var newHospital = new Hospital();

        Hospital.local.username = username;
        Hospital.local.password = Hospital.generateHash(password);

        Hospital.save(function(err) {
          if (err)
            throw err;
          return done(null, Hospital);
        });
      }

    });

  });
}));

passport.use('local-login', new LocalStrategy(function(req, username, password, done) {
  Hospital.findOne({username: username}, function(err, hospital) {
    if (err)
      return done(err);

    if (!Hospital) {
      return done(null, false, req.flash('loginMessage', 'No Hospital found.'));
    }

    if (!Hospital.validPassword(password)) {
      return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
    }

    return done(null, hospital);
  });
}));

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
   successRedirect : '/',
   failureRedirect: '/login'
 }),
  (req, res) => {
    res.redirect('/');
  });

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    res.redirect('/');
  });
});

app.post('/hospital/login', passport.authenticate('local-login', {
  successRedirect: '/hospital/profile',
  failureRedirect: '/hospital/login'
}));

app.post('/hospital/signup', passport.authenticate('local-signup', {
  successRedirect: '/hospital/profile',
  failureRedirect: '/hospital/login'
}));

app.use('/api/profile', profileRouter);

app.listen(8080, () => {
  console.log('Blood app listening on port 8080!');
});
