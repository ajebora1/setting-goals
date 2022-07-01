const express = require('express');
const router = express.Router();
const reflectionsCtrl = require('../controllers/reflections');
const isLoggedIn = require('../config/auth')

router.post('/goals/:id/reflections', isLoggedIn, reflectionsCtrl.create);
router.delete('/reflections/:id', isLoggedIn, reflectionsCtrl.delete)
router.put('/reflections/:id', isLoggedIn, reflectionsCtrl.update)

module.exports = router;