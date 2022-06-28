var Goal = require('../models/goal');


module.exports = {
  new: newGoals,
  create,
  index,
};



function newGoals(req, res) {
  res.render('goals/new');
}

// function create(req, res) {
//   Goal.create(req.body)
//   res.redirect('/goals');
// }

// function index(req, res) {
//   res.render('goals/index', {
//       goals: Goal.getAll()
//   });
// };


function index(req, res) { Goal
  .find({})
  .sort('beginDate')
  .exec(function(err, goals) {
    res.render('goals/index', {
       goals
    })

    })
  }

function newGoals(req, res) {
    const newGoal = new Goal();
    const dt = newGoal.beginDate;
    let beginDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
    beginDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
    console.log(beginDate)
    // const dt1 = newGoal.endDate;
    // let endDate = `${dt1.getFullYear()}-${(dt1.getMonth() + 1).toString().padStart(2, '0')}`;
    // endDate += `-${dt1.getDate().toString().padStart(2, '0')}T${dt1.toTimeString().slice(0, 5)}`;
    // console.log(endDate)
    res.render('goals/new' ,  { beginDate } );
  }

  function create(req, res) {
    req.body.accomplished = !!req.body.accomplished;
    req.body.stillImproving = !!req.body.stillImproving;
    const goal = new Goal(req.body);
    console.log(req.body)
    goal.save(function(err) {
      if (err) {
         console.log(err)
      return res.redirect('/goals/new');
      }
      res.redirect('/goals');
    });
  }