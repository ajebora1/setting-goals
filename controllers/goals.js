var Goal = require('../models/goal');
const AccountabilityPartner = require('../models/accountabilityPartner')


module.exports = {
  new: newGoals,
  create,
  index,
  show,
};

function index(req, res) { Goal
  .find({})
  .sort('beginDate')
  .exec(function(err, goals) {
    res.render('goals/index', {
       goals
    })
    })}

function newGoals(req, res) {
    const newGoal = new Goal();
    const dt = newGoal.beginDate;
    let beginDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
    beginDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
    console.log(beginDate)
    const dt1 = newGoal.endDate;
    let endDate = `${dt1.getFullYear()}-${(dt1.getMonth() + 1).toString().padStart(2, '0')}`;
    endDate += `-${dt1.getDate().toString().padStart(2, '0')}T${dt1.toTimeString().slice(0, 5)}`;
    console.log(endDate)
    res.render('goals/new' ,  { beginDate , endDate } );
  }


  function create(req, res) {
    req.body.accomplished = !!req.body.accomplished;
    req.body.stillImproving = !!req.body.stillImproving;
    // req.body.partner = req.body.partner.replace(/\s*,\s*/g, ',');
    // if (req.body.partner) req.body.partner = req.body.partner.split(',');
    for (let key in req.body) {
      if (req.body[key] === '') delete req.body[key];
    }
    console.log(req.body)
    var goal = new Goal(req.body);
    goal.save(function(err) {
      if (err) return res.redirect('/goals/new');
      console.log(goal);
       res.redirect(`/goals/${goal._id}`);
    });
  }

 
  function show(req, res) {
    Goal.findById(req.params.id)
      .populate('partner').exec(function(err, goal) {
        AccountabilityPartner.find(
          {_id: {$nin: goal.partner}},
          function(err, accountabilityPartners) {
            let daysremaining = goal.endDate - Date.now();
            res.render('goals/show', {goal, accountabilityPartners, daysremaining});
          }
        )
      });
  }