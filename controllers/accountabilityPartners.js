const AccountabilityPartner = require('../models/accountabilityPartner');
const Goal = require('../models/goal');

module.exports = {
  new: newAccountabilityPartner,
  create,
  addToPartner,
};

function newAccountabilityPartner(req, res) {
    AccountabilityPartner.find({}, function (err, accountabilityPartners) {
    res.render('accountabilityPartners/new', {
      accountabilityPartners
    });
  })
}

function create(req, res) {
  AccountabilityPartner.create(req.body, function (err, accountabilityPartners) {
    res.redirect('/accountabilityPartners/new');
  });
}

function addToPartner(req, res) {
  Goal.findById(req.params.id, function(err, goal) {
    goal.partner.push(req.body.accountabilityPartnerId)
    goal.save(function(err) {
      res.redirect(`/goals/${goal._id}`)
    })
  })
}