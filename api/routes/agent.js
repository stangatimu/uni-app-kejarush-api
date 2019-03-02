const   express = require('express'),
        router = express.Router(),
        rateLimit = require('../utils/rate_limit'),
        checkRole = require('../utils/agent/check_role'),
        AgentContollers = require('../controllers/agent');



router.post("/add",rateLimit.userBF.prevent,checkRole,AgentContollers.agent_signup);

router.post("/login",rateLimit.userBF.prevent,AgentContollers.agent_login);

router.put("/edit",rateLimit.userBF.prevent,checkRole,AgentContollers.agent_edit);

router.put("/manage",rateLimit.userBF.prevent,checkRole,AgentContollers.admin_agent_manage);

module.exports = router;