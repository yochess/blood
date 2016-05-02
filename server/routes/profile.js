'use strict'
let profileRouter = require('express').Router();
let controllers = require('../controllers/controller.js');
let Donor = controllers.Donor;

profileRouter.route('/')
.get((req, res) => {
  Donor.findOne({where: {uid: req.user.uid}})
  .then(user => {
    res.send(user);
  });
})
.put((req, res) => {
  Donor.findOne({where: {uid: req.user.uid}})
  .then(user => {
    user.update(req.body)
    .then(() => res.send(user));
  });
});

profileRouter.route('/:id')
.get((req, res) => {
  Donor.findOne({where: {uid: req.params.id}})
  .then(user => {
    res.send(user);
  });
});

module.exports = profileRouter;
