const   express = require('express'),
        router = express.Router(),
        rateLimit = require('../utils/rate_limit'),
        checkRole = require('../utils/agent/check_role'),
        Controller = require('../controllers/property');

router.post('/',rateLimit.userBF.prevent,checkRole,Controller.property_create);

module.exports = router;