const express = require('express');
const router = express.Router();
const accountabilityPartnersCtrl = require('../controllers/accountabilityPartners');
const isLoggedIn = require('../config/auth')

router.get('/accountabilityPartners/new', isLoggedIn, accountabilityPartnersCtrl.new);
router.post('/accountabilityPartners', isLoggedIn, accountabilityPartnersCtrl.create);
router.post('/goals/:id/accountabilityPartners', accountabilityPartnersCtrl.addToPartner)

module.exports = router;