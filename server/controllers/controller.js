'use strict'

let Sequelize = require('sequelize');
let sequelize = new Sequelize('blood', process.env.sqluid, process.env.sqlpw);

let Donor = sequelize.define('donor', {
  uid: {type:Sequelize.STRING, primaryKey: true},
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  photo: Sequelize.STRING,
  lat: Sequelize.FLOAT,
  long: Sequelize.FLOAT,
  bloodtype: Sequelize.STRING,
});

sequelize.sync();

module.exports.Donor = Donor;
