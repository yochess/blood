'use strict'
let appointmentRouter = require('express').Router();
let appointmentControllers = require('../controllers/appointment.js');

appointmentRouter.route('/')
.post(appointmentControllers.makeAppointment);

module.exports = appointmentRouter;
