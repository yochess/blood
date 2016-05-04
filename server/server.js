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
app.use('/api/post', postRouter);
app.use('/auth', authRouter);

app.listen(8080, () => {
  console.log('Blood app listening on port 8080!');
});
