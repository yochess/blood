'use strict'
const CLIENT_ID = process.env.calendarid;
const CLIENT_SECRET = process.env.calendarsecret;
const REDIRECT_URL = process.env.calendarurl

let google = require('googleapis');
let calendar = google.calendar('v3');
let OAuth2 = google.auth.OAuth2;
let oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
let googleAuth = require('google-auth-library');
let auth = new googleAuth();

module.exports = {
  showEvents: (req, res) => {
    let now = new Date();

    calendar.events.list({
      auth: google._options.auth,
      calendarId: 'primary',
      timeMin: now.toISOString(),
      timeMax: new Date(now.setYear(2017)).toISOString(),
      singleEvents: true,
      orderBy: 'startTime'
    }, (err, response) => {
      if (err) {
        return console.error('The API returned an error: ' + err);
      }
      let events = response.items;
      if (events.length == 0) {
        res.send('No upcoming events found.');
      } else {
        let retArray = [];
        response.items.forEach((item) => {
          let obj = {};
          obj.title = item.summary;
          obj.kind = item.kind;
          obj.etag = item.etag;
          obj.id = item.id;
          obj.status = item.status;
          obj.url = item.htmlLink;
          obj.start = item.start.dateTime;
          obj.end = item.end.dateTime;
          retArray.push(obj);
        });
        res.send(retArray);
      }
    });

  },

  addEvent: (req, res) => {
    calendar.events.insert({
      auth: google._options.auth,
      calendarId: 'primary',
      resource: req.body
    }, (err, event) => {
      if (err) {
        console.log('There was an error contacting the Calendar service: ' + err);
        return res.send(404);
      }
      res.status(201).send('event created!');
    });
  }
}
