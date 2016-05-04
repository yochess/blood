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
let bcrypt = require('bcrypt');
let _ = require('lodash');
let app = express();

/* Controllers */
let controllers = require('./controllers/controller.js');
let Donor = controllers.Donor;
let Hospital = controllers.Hospital;

/* Routes */
let profileRouter = require('./routes/profile.js');
let hospitalRouter = require('./routes/hospital.js');
let postRouter = require('./routes/post.js');

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
  req.logout();
  res.redirect('/');
});

app.post('/auth/hospital/login', passport.authenticate('hospital-login'),
  (req, res) => {
    res.send(req.user);
  });

app.post('/auth/hospital/signup', passport.authenticate('hospital-signup'),
  (req, res) => {
    res.send(req.user);
  });

app.post('/auth/donor/login', passport.authenticate('donor-login'),
  (req, res) => {
    res.send(req.user);
  });

app.post('/auth/donor/signup', passport.authenticate('donor-signup'),
  (req, res) => {
    res.send(req.user);
  });

app.use('/api/profile', profileRouter);
app.use('/api/hospital', hospitalRouter);
app.use('/api/post', postRouter);

app.listen(8080, () => {
  console.log('Blood app listening on port 8080!');
});
