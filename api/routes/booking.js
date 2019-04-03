const express   = require('express'),
      checkAuth = require("../utils/check_auth.js"),
      checkRole = require("../utils/agent/check_role")
      Controllers = require("../controllers/booking"),
      router   = express.Router(),
      rateLimit = require('../utils/rate_limit');

router.post('/' ,rateLimit.globalBF.prevent,Controllers.intialize_booking);

router.post('/stkcallbackurl', Controllers.booking_callback);

router.get('/',rateLimit.globalBF.prevent,checkRole,Controllers.get_property_bookings);

router.get('/all',rateLimit.globalBF.prevent,checkRole,Controllers.get_all_bookings);


module.exports = router;