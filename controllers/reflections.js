const { error } = require('console');
const Goal = require('../models/goal');

module.exports = {
  create,
  delete: deleteReflection,
  update,
};

function create(req, res) {
    Goal.findById(req.params.id, function(err, goal) {
        req.body.user = req.user._id
        req.body.userName = req.user.name
        req.body.userAvatar = req.user.avatar
        console.log(req.body)
        goal.reflections.push(req.body)
        goal.save(function(err) {
            console.log(err)
            res.redirect(`/goals/${goal._id}`)

        })
    })
}
async function deleteReflection(req, res, next) {
    try {
        const goal = await Goal.findOne({ 'reflections._id': req.params.id, 'reflections.user': req.user._id })
        if(!goal) return res.redirect('/goals')
        goal.reflections.remove(req.params.id)
        await goal.save()
        res.redirect(`/goals/${goal._id}`)
    } catch(err) {
        return next(err)
    }
}

             
             function update(req, res) {
                Goal.findOne({'reflections._id': req.params.id})
                .then(goal => {
                    const reflect = goal.reflections.id(req.params.id)
                    for (let property in req.body) {
                        reflect[property] = req.body[property];
                    }
                    goal.save()
                    .then(() => res.redirect(`/goals/${goal._id}`));
                })
            }

