'use strict'
const CLIENT_ID = process.env.calendarid;
const CLIENT_SECRET = process.env.calendarsecret;
const REDIRECT_URL = process.env.calendarurl

let googleAuthRouter = require('express').Router();
let google = require('googleapis');
let OAuth2 = google.auth.OAuth2;
let oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

const URL = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: 'https://www.googleapis.com/auth/calendar'
});

googleAuthRouter.route('/url')
  .get((req, res) => {
    res.send(URL)
  });

googleAuthRouter.route('/googleToken')
  .get((req, res) => {
    let code = req.query.code;
    oauth2Client.getToken(code, (err, tokens) => {
      if (err) {
        return console.error('an error has occured in setting the token: ' + err);
      }
      oauth2Client.setCredentials(tokens);
      google.options({ auth: oauth2Client }); // set auth as a global default
      res.send('authenticated!');
    });
});

module.exports = googleAuthRouter;
