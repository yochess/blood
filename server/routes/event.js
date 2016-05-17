'use strict'
let eventRouter = require('express').Router();
let eventControllers = require('../controllers/event.js');

eventRouter.route('/')
.get(eventControllers.getEvents)
.post(eventControllers.postEvent);

eventRouter.route('/geo')
.get(eventControllers.getEventsByLocation);

eventRouter.route('/:id')
.get(eventControllers.getEventById)
.post(eventControllers.joinEvent);

module.exports = eventRouter;
