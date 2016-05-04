'use strict'
var nodemailer = require('nodemailer');
let controllers = require('../controllers/controller.js');
let sequelize = require('sequelize');
let geolib = require('geolib');

let Donor = controllers.Donor;
let Hospital = controllers.Hospital;

let config = require('../../serverconfig.js');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(`smtps://britishchickenblood@gmail.com:${config.emailpw}@smtp.gmail.com`);

/* min inteval (ms) before contacting donor again */
const CONTACTCOOLDOWN = 180000;
/* Max amount of donor's blood type before contacting donor */
const BLOODTHRESHOLD = 5;

Donor.findAll()
.then(donors => {
  Hospital.findAll()
  .then(hospitals => {
    for (let donor of donors) {
      /* ensure we only contact donors every so often */
      if (!donor.latitude || !donor.longitude || !donor.email || !donor.bloodtype) continue;
      let lastContacted = new Date(donor.lastcontacted).getTime();
      let now = new Date().getTime();
      if (now - lastContacted < CONTACTCOOLDOWN) continue;

      /* determine hospital need for closest hospital and send notification */
      let closestHospital = null;
      let closestDistance = 50000000;
      for (let hospital of hospitals) {
        if (!hospital.latitude || !hospital.longitude) continue;
        let distance = geolib.getDistance({latitude: donor.latitude, longitude: donor.longitude}, {latitude: hospital.latitude, longitude:hospital.longitude})
        if (distance < closestDistance) {
          closestDistance = distance;
          closestHospital = hospital;
        }
      }

      if (closestHospital) {
        if (closestHospital[donor.bloodtype] < BLOODTHRESHOLD) {
          donor.update({lastcontacted: sequelize.fn('NOW')});
          let mailOptions = {
            from: 'britishchickenblood@gmail.com',
            to: donor.email,
            subject: closestHospital.name + ' needs your blood!',
            text: 'Make an appointment today!'
          };

          transporter.sendMail(mailOptions, function(error, info){
            if(error){
              console.log(error);
            } else {
              console.log('Message sent: ' + info.response);
            }
          });
        }
      }
    }
  });
});
