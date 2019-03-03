const   express = require('express'),
        router = express.Router(),
        rateLimit = require('../utils/rate_limit'),
        checkRole = require('../utils/agent/check_role'),
        Controller = require('../controllers/property');

router.post('/',rateLimit.globalBF.prevent,checkRole,Controller.property_create);

router.patch('/',rateLimit.globalBF.prevent,checkRole,Controller.property_edit);

router.delete('/',rateLimit.globalBF.prevent,checkRole,Controller.property_delete);

module.exports = router;