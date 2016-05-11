'use strict'
let eventControllers = require('../controllers/appointment.js');
let db = require('../controllers/controller.js');
let Donor = db.Donor;
let Hospital = db.Hospital;
let Appointment = db.Appointment;

let chai = require('chai');
let expect = chai.expect;
let http_mocks = require('node-mocks-http');

function buildResponse() {
  return http_mocks.createResponse({eventEmitter: require('events').EventEmitter})
}

describe('appointments', function() {
  describe('makeAppointment', function() {
    let testDonor;
    let testHospital;
    before(function(done) {
      Promise.all([
        Donor.create(),
        Hospital.create()
        ]).then(results => {
          testDonor = results[0];
          testHospital = results[1];
          done()
        });
    });

    it('should make an appointment', function(done) {
      let response = buildResponse();
      let request  = http_mocks.createRequest({
        method: 'POST',
        url: '/',
        body: {
          time: new Date().toUTCString(),
          hospitalId: testHospital.id
        }
      });

      request.user = {id: testDonor.id};

      response.on('end', function() {
        Appointment.destroy({where: {id: response._getData().id}});
        expect(response._getData().id).to.be.above(0);
        done();
      });
      eventControllers.makeAppointment(request, response);
    });

    after(function() {
      Donor.destroy({where: {id: testDonor.id}});
      Hospital.destroy({where: {id: testHospital.id}});
    });
  });
});
