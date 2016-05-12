'use strict'
let nodemailer = require('nodemailer');
let controllers = require('../controllers/controller.js');
let config = require('../../serverconfig.js');

let Sequelize = require('sequelize');


let Donor = controllers.Donor;
let Hospital = controllers.Hospital;
let Appointment = controllers.Appointment;

let transporter = nodemailer.createTransport(`smtps://britishchickenblood@gmail.com:${config.emailpw}@smtp.gmail.com`);

const TIME_INTERVAL = 1000 * 60 * 5;

Appointment.findAll().then(appointments => {
  let currentTime = new Date().getTime();

  for (let appointment of appointments) {
// console.log(appointment.hospitalId + ' and ' + appointment.donorId);
    Hospital.findOne({where: {id: appointment.hospitalId}}).then(hospital => {
      Donor.findOne({where: {id: appointment.donorId}}).then(donor => {
        let appointmentTime = appointment.createdAt.getTime();

        if (appointmentTime + TIME_INTERVAL > currentTime) {
          email(donor, hospital);
        }
      });
    });
  }
});

function email(donor, hospital) {
  console.log('sending mail!');

  let mailOptions1 = {
    from: 'britishchickenblood@gmail.com',
    to: donor.email,
    subject: 'Appointment Scheduled',
    text: [
      `You have scheduled an appointment with ${hospital.name}.`,
      `The location of the hospital is at ${hospital.location}.`,
      `If you have any questions regarding your appointment, you can reach the hospital at ${hospital.email}.`,
      `Thank you!`
    ].join(),
    html: [
      `<p>You have scheduled an appointment with ${hospital.name}.</p>`,
      `<p>The location of the hospital is at ${hospital.location}.</p>`,
      `<p>If you have any questions regarding your appointment, you can reach the hospital at ${hospital.email}.</p>`,
      `<p>Thank you!</p>`
    ].join()
  };

  let mailOptions2 = {
    from: 'britishchickenblood@gmail.com',
    to: hospital.email,
    subject: 'Appointment Scheduled',
    text: [
      `${donor.name} has scheduled an appointment with you!`,
      `The user's blood type is ${donor.bloodtype}.`,
      `If you have any questions regarding your appointment, you can reach the donor at ${donor.email}.`,
      `Thank you!`
    ].join(' '),
    html: [
      `<p>${donor.name} has scheduled an appointment with you!</p>`,
      `<p>The user's blood type is ${donor.bloodtype}.</p>`,
      `<p>If you have any questions regarding your appointment, you can reach the donor at ${donor.email}.</p>`,
      `<p>Thank you!</p>`
    ].join(' ')
  };

  transporter.sendMail(mailOptions1, function(error, info) {
    console.log('info: ', info);
    console.log('error: ', error);
    if (error) {
      console.error(error);
    }
    console.log('Messages sent to donor: ' + info.response);
    transporter.sendMail(mailOptions2, function(error, info) {
      if (error) {
        console.error(error);
      }
      console.log('Messages sent hospital: ' + info.response);
      console.log('ALL DONE!');
    });
  });
}

