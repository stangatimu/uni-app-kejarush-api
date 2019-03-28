const express = require('express'),
    router = express.Router(),
    rateLimit = require('../utils/rate_limit'),
    checkRole = require('../utils/agent/check_role'),
    Controllers = require('../controllers/manage-users'),
    Summary = require('../controllers/get-summary');


router.get('/',rateLimit.globalBF.prevent,checkRole,Controllers.get_users_by_property);

router.get('/summary', rateLimit.globalBF.prevent,checkRole, Summary.get_summary)

router.get('/unpaid',rateLimit.globalBF.prevent,checkRole,Controllers.get_negative_rent_users);

router.post('/allocate',rateLimit.globalBF.prevent,checkRole,Controllers.agent_asign_house);

router.patch('/rent',rateLimit.globalBF.prevent,checkRole,Controllers.agent_edit_rent);

router.patch('/revoke',rateLimit.globalBF.prevent,checkRole,Controllers.agent_revoke_house);


module.exports = router;



    