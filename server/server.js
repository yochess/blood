'use strict'

/* Dependencies */
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let app = express();
let auth = require('./routes/auth');
let passport = auth.passport;

/* Routes */
let profileRouter = require('./routes/profile.js');
let hospitalRouter = require('./routes/hospital.js');
let postRouter = require('./routes/post.js');
let authRouter = auth.authRouter;
let calendarRouter = require('./routes/calendar.js');

let clientPath = path.resolve(__dirname + '/../client');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(clientPath));
app.use(session({secret: 'lolwut', key: 'sid'}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/profile', profileRouter);
app.use('/api/hospital', hospitalRouter);
app.use('/api/calendar', calendarRouter);
app.use('/api/post', postRouter);
app.use('/auth', authRouter);




// google auth
let google = require('googleapis');
let googleAuth = require('google-auth-library');
let OAuth2 = google.auth.OAuth2;
let oauth2Client = new OAuth2(process.env.calendarid, process.env.calendarsecret, process.env.calendarurl);

let scopes = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/calendar'
];

let url = oauth2Client.generateAuthUrl({
  access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
  scope: scopes // If you only need one scope you can pass it as string
});

app.use('/oauthcallback', express.static(__dirname + '/../oauthcallback.html'));

app.get('/url', (req, res) => {
  res.send(url)
});

app.get('/googleToken', (req, res) => {
  let code = req.query.code;
  oauth2Client.getToken(code, (err, tokens) => {
    if(!err) {
      // console.log('>>', 'hi from server');
      // console.log(google._options);
      oauth2Client.setCredentials(tokens);
      google.options({ auth: oauth2Client }); // set auth as a global default
      res.send('authenticated!');
    }
  });
});

//end of google auth




app.listen(8080, () => {
  console.log('Blood app listening on port 8080!');
});
