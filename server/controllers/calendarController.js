'use strict'
const CLIENT_ID = process.env.calendarid;
const CLIENT_SECRET = process.env.calendarsecret;
const REDIRECT_URL = process.env.calendarurl

let google = require('googleapis');
let googleAuth = require('google-auth-library');
let calendar = google.calendar('v3');
let OAuth2 = google.auth.OAuth2;
let oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
let auth = new googleAuth();

module.exports = {
  showEvents: (req, res) => {
    let now = new Date();

    calendar.events.list({
      // idk the get method, couldn't find it in the example or documentations
      auth: google._options.auth,
      calendarId: 'primary',
      timeMin: now.toISOString(),
      timeMax: new Date(now.setYear(2017)).toISOString(),
      singleEvents: true,
      orderBy: 'startTime'
    }, (err, response) => {
      // console.log('<><>', google._options.auth);
      if (err) {
        return console.error('The API returned an error: ' + err);
      }
      let events = response.items;
      if (events.length == 0) {
        return res.send('No upcoming events found.');
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
        // console.log(retArray);
        // console.log(Math.random());
        res.send(retArray);
      }
    });

  },

  addEvent: (req, res) => {
    // fs.readFile(__dirname + '/client_secret.json', (err, content) => {
      // if (err) {
        // console.log('Error loading client secret file: ' + err);
        // return res.send(404);
      // }
      // authorize(JSON.parse(content), (auth) => {
        calendar.events.insert({
          auth: google._options.auth,
          calendarId: 'primary',
          resource: req.body
        }, (err, event) => {
          if (err) {
            console.log('There was an error contacting the Calendar service: ' + err);
            return res.send(404);
          }
          return res.status(201).send('event created!');
        });
      // });
    // });
  }
}
