'use strict'

let db = require('../controllers/controller.js');
let Donor = db.Donor;
let Hospital = db.Hospital;
let Appointment = db.Appointment;

let makeAppointment = (req, res) => {
  Donor.findOne({where: {id: req.user.id}})
  .then(donor => {
    Appointment.create({time: req.body.time, donorId: donor.id, hospitalId: req.body.hospitalId, type: req.body.type})
    .then(appointment => res.send(appointment));
  });
};

let showAppointments = (req, res) => {
  if (req.user.type !== 'hospital') {
    return res.send(401);
  }

  Appointment.findAll({
    where: {
      hospitalId: req.user.id
    },
    include: [{
      model: Donor,
      attributes: {
        exclude: ['password', 'email', 'address', 'latitude', 'longitude']
      }
    }]})
    .then(appointments => {
      res.send(appointments);
    });

}

module.exports.makeAppointment = makeAppointment;
module.exports.showAppointments = showAppointments;
