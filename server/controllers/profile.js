'use strict'
let db = require('../controllers/controller.js');
let Donor = db.Donor;
let Event = db.Event;
let Hospital = db.Hospital;
let Appointment = db.Appointment;
let sequelize =db.sequelize;

let getCurrentDonor = (req, res) => {
  Donor.findOne({
    where: {
      id: req.user.id
    },
    include: [{
      model: Event,
      include: [Hospital, ]
    }, {
      model: Donor,
      as: 'friends',
      through: 'friends'
    }]})
  .then(user => {
    res.send(user);
  });
};

let updateCurrentDonor = (req, res) => {
  Donor.findOne({where: {id: req.user.id}})
  .then(user => {
    user.update(req.body)
    .then(() => res.send(user));
  });
};

let getDonorById = (req, res) => {
  Donor.findOne({where: {id: req.params.id}})
  .then(user => {
    res.send(user);
  });
};

let getDonorsByLocation = (req, res) => {
  console.log('donor url',req.url);
  console.log(req.query);
  let queries = req.query;
  Donor.findAll({where: {
    latitude: {$gt: queries.minLat, $lt: queries.maxLat},
    longitude: {$gt: queries.minLong, $lt: queries.maxLong}
  },
  include:[Appointment],
  // attributes: [
  //       'Donor.*',
  //       [sequelize.literal('(SELECT COUNT(*) FROM Appointments WHERE Appointments.donorId = Donor.id)'), 'AppointmentCount']
  //    ],

  // sequelize.literal('COUNT((Appointments))), 'AppointmentCount'
  //order: [[sequelize.literal('AppointmentCount'), 'DESC']],
  //attributes: ['Donor.*', 'Appointment.*', [db.sequelize.fn('COUNT', db.sequelize.col('Appointment.id')), 'AppointmentCount']],
  //order: 'AppointmentCount',
  //limit: 5
  })
  .then(donors => {
    donors.sort(function(a,b){
      if (a.appointments.length > b.appointments.length) {
        return -1;
      }
      if (a.appointments.length < b.appointments.length) {
        return 1;
      }
      return 0;
    }),
    res.send(donors.slice(0,5));
  });
};


module.exports.getCurrentDonor = getCurrentDonor;
module.exports.updateCurrentDonor = updateCurrentDonor;
module.exports.getDonorById = getDonorById;
module.exports.getDonorsByLocation = getDonorsByLocation;
