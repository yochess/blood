'use strict'
let path = require('path');
let controllerPath = path.resolve(__dirname + '/../controllers/controller.js');
let profileRouter = require('express').Router();

let controllers = require(controllerPath);
let Donor = controllers.Donor;

profileRouter.route('/')
.get((req, res) => {
  Donor.findOne({where: {uid: req.user.uid}})
  .then(user => {
    res.send(user);
  });
});

module.exports = profileRouter;
