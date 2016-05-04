'use strict'
let _ = require('lodash');
let mysql = require('mysql');
let bcrypt = require('bcrypt');
let passport = require('passport');
let FacebookStrategy = require('passport-facebook').Strategy;
let LocalStrategy = require('passport-local').Strategy;
let authRouter = require('express').Router();

let controllers = require('../controllers/controller.js');
let Donor = controllers.Donor;
let Hospital = controllers.Hospital;


passport.serializeUser(function(user, done) {
  let type = user instanceof Donor.Instance ? 'donor' : 'hospital';
  let oldUser = Object.assign({}, user.dataValues);
  let extendedUser = _.assign(oldUser, {type: type});
  done(null, extendedUser);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
  clientID: process.env.fbapikey,
  clientSecret: process.env.fbapisecret,
  callbackURL: 'http://52.39.22.12:8080/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'picture.type(large)', 'email']
},
function(accessToken, refreshToken, profile, done) {
  process.nextTick(() => {
      //Check whether the User exists or not using profile.id
      //Further DB code.
      Donor.findOrCreate({where: {fbid: profile.id}, defaults: {name: profile.displayName, email: profile.email, photo: profile._json.picture.data.url}})
      .spread(function(user, created) {
        done(null, user);
      });
    });
}
));

passport.use('hospital-signup', new LocalStrategy(function(username, password, done) {
  process.nextTick(function() {

    Hospital.findOne({where: {username: username}})
    .then(function(hospital) {
      if (hospital) {
        return done(null, false);
      } else {
        Hospital.create({username: username, password: bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)})
        .then((hospital) => {
          return done(null, hospital);
        });
      }

    });

  });
}));

passport.use('hospital-login', new LocalStrategy(function(username, password, done) {
  Hospital.findOne({where: {username: username}})
  .then(function(hospital) {
    if (!hospital) {
      return done(null, false);
    }

    if (!bcrypt.compareSync(password, hospital.password)) {
      return done(null, false);
    }

    return done(null, hospital);
  });
}));

passport.use('donor-signup', new LocalStrategy(function(username, password, done) {
  Donor.findOne({where: {username: username}})
  .then(function(donor) {
    if (donor) {
      return done(null,false);
    } else {
      Donor.create({username: username, password: bcrypt.hashSync(password, bcrypt.genSaltSync(9), null)})
      .then((donor) => {
        return done(null, donor);
      });
    }
  });
}));

passport.use('donor-login', new LocalStrategy(function(username, password, done){
  Donor.findOne({where: {username: username}})
  .then(function(donor) {
    if (!donor) {
      return done(null,false);
    }
    if (!bcrypt.compareSync(password, donor.password)) {
      return done(null, false);
    }
    return done(null, donor);
  });
}));


authRouter.route('/facebook')
.get(passport.authenticate('facebook'));

authRouter.route('/facebook/callback')
.get(passport.authenticate('facebook', {
   successRedirect : '/',
   failureRedirect: '/login'
 }),
  (req, res) => {
    res.redirect('/');
  });

authRouter.route('/hospital/login')
.post(passport.authenticate('hospital-login'),
  (req, res) => {
    res.send(req.user);
  });

authRouter.route('/hospital/signup')
.post(passport.authenticate('hospital-signup'),
  (req, res) => {
    res.send(req.user);
  });

authRouter.route('/donor/login')
.post(passport.authenticate('donor-login'),
  (req, res) => {
    res.send(req.user);
  });

authRouter.route('/donor/signup')
.post(passport.authenticate('donor-signup'),
  (req, res) => {
    res.send(req.user);
  });

module.exports.passport = passport;
module.exports.authRouter = authRouter;
