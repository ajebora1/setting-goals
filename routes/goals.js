var express = require('express');
var router = express.Router();
var goalsCtrl = require('../controllers/goals');
const isLoggedIn = require('../config/auth');

router.get('/', isLoggedIn, goalsCtrl.index);
router.get('/new', isLoggedIn, goalsCtrl.new);
router.post('/', isLoggedIn, goalsCtrl.create);
router.get('/:id', isLoggedIn, goalsCtrl.show);


module.exports = router;