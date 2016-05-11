'use strict'
let profileRouter = require('express').Router();
let profileControllers = require('../controllers/profile.js');

profileRouter.route('/')
.get(profileControllers.getCurrentDonor)
.put(profileControllers.updateCurrentDonor);

// profileRouter.route('/geo')
// .get(profileControllers.getDonorsByLocation);

profileRouter.route('/:id')
.get(profileControllers.getDonorById);


module.exports = profileRouter;
