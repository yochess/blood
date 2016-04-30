'use strict'
let hosptialRouter = require('express').Router();
let controllers = require('../controllers/controller.js');
let Hospital = controllers.Hospital;

hosptialRouter.route('/profile')
.get((req, res) => {
  res.send(req.user);
})
.put((req, res) => {
  Hospital.findOne({where: {id: req.user.id}})
  .then(hospital => {
    hospital.update(req.body)
    .then(() => res.end());
  });
});

hosptialRouter.route('/profile/:id')
.get((req, res) => {
  Hospital.findOne({where: {id: req.params.id}})
  .then(hospital => {
    res.send(hospital);
  });
});

module.exports = hosptialRouter;
