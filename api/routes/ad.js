const express = require('express'),
    router = express.Router(),
    Controllers = require('../controllers/ad'),
    rateLimit = require('../utils/rate_limit'),
    checkRole = require('../utils/agent/check_role');



router.post('/', rateLimit.globalBF.prevent,checkRole,Controllers.ad_create);


module.exports = router;