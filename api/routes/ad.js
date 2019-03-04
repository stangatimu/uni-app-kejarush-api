const express = require('express'),
    router = express.Router(),
    Controllers = require('../controllers/ad'),
    rateLimit = require('../utils/rate_limit'),
    checkRole = require('../utils/agent/check_role');



router.post('/', rateLimit.globalBF.prevent,checkRole,Controllers.ad_create);

router.delete('/', rateLimit.globalBF.prevent,checkRole,Controllers.ad_delete);

router.get('/', rateLimit.globalBF.prevent,checkRole,Controllers.ad_get_all);

router.get('/category/:id', rateLimit.globalBF.prevent,checkRole,Controllers.get_by_category);


module.exports = router;