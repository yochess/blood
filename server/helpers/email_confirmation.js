'use strict'
let nodemailer = require('nodemailer');
let controllers = require('../controllers/controller.js');
let config = require('../../serverconfig.js');
let moment = require('moment');
let timezone = require('node-google-timezone');
let transporter = nodemailer.createTransport(`smtps://britishchickenblood@gmail.com:${config.emailpw}@smtp.gmail.com`);

let Donor = controllers.Donor;
let Hospital = controllers.Hospital;
let Appointment = controllers.Appointment;

const TIME_INTERVAL = 1000 * 60 * 5;




Appointment.findAll().then(appointments => {
  let currentTime = new Date().getTime();

  for (let appointment of appointments) {
// console.log(appointment.hospitalId + ' and ' + appointment.donorId);
    Hospital.findOne({where: {id: appointment.hospitalId}}).then(hospital => {
      Donor.findOne({where: {id: appointment.donorId}}).then(donor => {
        let appointmentTime = appointment.createdAt.getTime();

        if (appointmentTime + TIME_INTERVAL > currentTime) {
          email(donor, hospital, appointment);
        }
      });
    });
  }
});

function email(donor, hospital, appointment) {
  let timestamp = appointment.time.getTime() / 1000;

  timezone.data(donor.latitude, donor.longitude, timestamp, (err, tz) => {
    let timestamp = tz.local_timestamp;
    let localTime = new Date(tz.local_timestamp * 1000);
    let date = moment.utc(localTime).format('MMMM Do YYYY');
    let day = moment.utc(localTime).format('dddd');
    let time = moment.utc(localTime).format('h:ss a');

    let mailOptions1 = {
      from: 'britishchickenblood@gmail.com',
      to: donor.email,
      subject: 'Appointment Scheduled',
      // text: [
      //   `You have scheduled an appointment with ${hospital.name}.`,
      //   `The location of the hospital is at ${hospital.location}.`,
      //   `If you have any questions regarding your appointment, you can reach the hospital at ${hospital.email}.`,
      //   `Thank you!`
      // ].join(),
      html: [
        `<h1>Hello ${donor.name}!</h1><br/>`,
        `<p>You have scheduled an appointment to donate blood to ${hospital.name} `,
        `on ${day}, ${date} at ${time}.</p>`,
        `<p>The hospital is located at ${hospital.address}. If you have any further questions `,
        `regarding your appointment, you can visit the hospital's website at ${hospital.hospitalurl} `,
        `or send them an email directly at ${hospital.email}.</p>`,
        `<p>To view information about this hospital on our system, visit `,
        `their home page at ${hospital.hospitalurl} or their `,
        `<a href="https://bloodshare.io/#/hospital/profile/${hospital.id}">`,
        `profile page.</a></p><br/>`,
        `<p>Thank you!</p>`,
        `<p>  -- britishchickenblood`
      ].join('')
    };

    let mailOptions2 = {
      from: 'britishchickenblood@gmail.com',
      to: hospital.email,
      subject: 'Appointment Scheduled',
      // text: [
      //   `${donor.name} has scheduled an appointment with you!`,
      //   `The user's blood type is ${donor.bloodtype}.`,
      //   `If you have any questions regarding your appointment, you can reach the donor at ${donor.email}.`,
      //   `Thank you!`
      // ].join(' '),
      html: [
        `<h1>Hello ${hospital.name}!</h1><br/>`,
        `<p>${donor.name} has scheduled an appointment to donate `,
        `blood type of ${donor.bloodtype} on ${day}, ${date} at ${time}.</p>`,
        `<p>If you have any questions, you may contact the donor directly at ${donor.email}</p>`,
        `<p>Thank you!</p>`,
        `<p>  -- britishchickenblood`
      ].join('')
    };

    console.log('utc time: ', appointment.time);
    console.log('sending mail!');
    console.log('local time: ', localTime);

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
  });

}

