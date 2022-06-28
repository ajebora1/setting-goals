var express = require('express');
var router = express.Router();
var goalsCtrl = require('../controllers/goals');


router.get('/new', goalsCtrl.new);
router.post('/', goalsCtrl.create);
router.get('/', goalsCtrl.index);


module.exports = router;