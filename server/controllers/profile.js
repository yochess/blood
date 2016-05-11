'use strict'
let db = require('../controllers/controller.js');
let Donor = db.Donor;
let Event = db.Event;
let Hospital = db.Hospital;

let getCurrentDonor = (req, res) => {
  Donor.findOne({
    where: {
      id: req.user.id
    },
    include: [{
      model: Event,
      include: [Hospital, ]
    }, {
      model: Donor,
      as: 'friends',
      through: 'friends'
    }]})
  .then(user => {
    res.send(user);
  });
};

let updateCurrentDonor = (req, res) => {
  Donor.findOne({where: {id: req.user.id}})
  .then(user => {
    user.update(req.body)
    .then(() => res.send(user));
  });
};

let getDonorById = (req, res) => {
  Donor.findOne({where: {id: req.params.id}})
  .then(user => {
    res.send(user);
  });
};

// let getDonorsByLocation = (req, res) => {
//   console.log(req);
//   let queries = url.parse(req.url, true).query;
//   Donor.findAll({where: {
//     latitude: {$gt: queries.minLat, $lt: queries.maxLat},
//     longitude: {$gt: queries.minLong, $lt: queries.maxLong}
//   }})
//   .then(donors => {
//     res.send(donors);
//   });
// };


module.exports.getCurrentDonor = getCurrentDonor;
module.exports.updateCurrentDonor = updateCurrentDonor;
module.exports.getDonorById = getDonorById;
