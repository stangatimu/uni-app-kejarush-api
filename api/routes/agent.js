const   express = require('express'),
        router = express.Router(),
        rateLimit = require('../utils/rate_limit'),
        AgentContollers = require('../controllers/agent');



router.post("/add",rateLimit.userBF.prevent,AgentContollers.agent_signup);

router.post("/login",rateLimit.userBF.prevent,AgentContollers.agent_login);

router.put("/edit",rateLimit.userBF.prevent,AgentContollers.agent_edit);


module.exports = router;