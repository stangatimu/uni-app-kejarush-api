const express   = require('express'),
      checkAuth = require("../utils/check_auth.js"),
      Controllers = require("../controllers/booking"),
      router   = express.Router(),
      rateLimit = require('../utils/rate_limit');

router.post('/' ,rateLimit.globalBF.prevent,checkAuth,Controllers.intialize_booking);


module.exports = router;