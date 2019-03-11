const express   = require('express'),
      checkAuth = require("../utils/check_auth.js"),
      usersController = require("../controllers/user.js"),
      router   = express.Router(),
      rateLimit = require('../utils/rate_limit');


router.post("/signup",rateLimit.userBF.prevent, usersController.users_signup); 

router.post("/login",rateLimit.userBF.prevent,usersController.users_login);

router.delete('/delete',rateLimit.userBF.prevent,checkAuth, usersController.users_delete);

router.get('/profile',rateLimit.userBF.prevent,usersController.users_profile);

router.patch('/edit',rateLimit.userBF.prevent,checkAuth, usersController.users_edit);

module.exports = router; 