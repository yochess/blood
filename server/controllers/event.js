'use strict'

let url = require('url');
let db = require('../controllers/controller.js');
let Donor = db.Donor;
let Hospital = db.Hospital;
let Event = db.Event;
let Sequelize = require('sequelize');

const FIFTYSIXDAYS = 5E9; // basically

let getEvents = (req, res) => {
  Event.findAll({
    where: {
      hospitalId: req.session.passport.user.id
    }
  })
  .then(events => {
    res.send(events);
  })
};

let postEvent = (req, res) => {
  Promise.all([
    Event.create({
      time: req.body.time,
      hospitalId: req.body.hospitalId || req.session.passport.user.id
    }),
    Donor.findOne({
      where: {
        id: req.user.id
      },
      attributes: {
        exclude: ['password', 'email', 'address', 'latitude', 'longitude']
      }
    })
    ]).then(results => {
      let event = results[0];
      let donor = results[1];
      event.addDonor(donor)
      .then(() => res.send(event));
    })
    .catch(err => console.log(err));
  };

let getEventsByLocation = (req, res) => {
  let queries = url.parse(req.url, true).query;
  let minLat = queries.minLat || -1000;
  let minLong = queries.minLong || -1000;
  let maxLat = queries.maxLat || 1000;
  let maxLong = queries.maxLong || 1000;
  Event.findAll({
    where: {
      time: {
        $gt: Sequelize.fn('NOW')
      }
    },
    include: [{
      model: Hospital,
      where: {
        latitude: {
          $gt: minLat,
          $lt: maxLat
        },
        longitude: {
          $gt: minLong,
          $lt: maxLong
        }
      },
      attributes: {
        exclude: ['password', 'email']
      }
    }, {
      model: Donor,
      attributes: {
        exclude: ['password', 'email', 'address', 'latitude', 'longitude']
      }
    }]
  })
  .then(events => res.send(events));
};

let getEventById = (req, res) => {
  Event.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Donor,
      attributes: {
        exclude: ['email', 'password', 'address', 'latitude', 'longitude']
      }
    }, {
      model: Hospital,
      attributes: {
        exclude: ['email', 'password']
      }
    }]
  })
  .then(event => {
    res.send(event);
  });
};

let joinEvent = (req, res) => {

  Promise.all([
    Event.findOne({
      where: {
        id: req.params.id
      }
    }),
    Donor.findOne({
      where: {
        id: req.user.id
      },
      attributes: {
        exclude: ['email', 'password', 'address', 'latitude', 'longitude']
      }
    })]).then((results) => {
    let event = results[0];
    let donor = results[1];
    let eventTime = new Date(event.time);
    let lastAppointmentTime = new Date(donor.latestappointment);
    let offset = eventTime.getTime() - lastAppointmentTime.getTime();
    if (offset > FIFTYSIXDAYS) {
      donor.update({latestappointment: event.time});
      event.addDonor(donor)
      .then(() => res.end());
    } else {
      res.writeHead(409);
      res.end();
    }
  });
};

module.exports.getEvents = getEvents;
module.exports.postEvent = postEvent;
module.exports.getEventsByLocation = getEventsByLocation;
module.exports.getEventById = getEventById;
module.exports.joinEvent = joinEvent;
