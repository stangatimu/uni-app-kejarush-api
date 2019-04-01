const express = require('express'),
    router = express.Router(),
    rateLimit = require('../utils/rate_limit'),
    checkAuth = require('../utils/check_auth'),
    Controllers = require('../controllers/payments');


router.post('/payrent',rateLimit.userBF.prevent,checkAuth,Controllers.init_Payment)

router.post('/callbackUrl',rateLimit.globalBF.prevent,checkAuth,Controllers.payment_callback)

router.get('/payments',rateLimit.globalBF.prevent,checkAuth,Controllers.get_user_payments)


module.exports = router