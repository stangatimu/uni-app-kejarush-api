const express = require('express'),
 router = express.Router(),
 rateLimit = require('../utils/rate_limit'),
 Controller = require("../controllers/search.js");



 router.get('/',rateLimit.globalBF.prevent,Controller.products_search);

 module.exports = router;