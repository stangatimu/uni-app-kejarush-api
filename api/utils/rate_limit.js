const ExpressBrute = require('express-brute'),
      mongooseStore  = require('express-brute-mongoose'),
      StoreModel = require('../models/expressBrute.js'),
      Store = new mongooseStore(StoreModel);
var failCB = function (req, res, next, nextValidRequestDate) {
    res.status(429).json({
        succcess: false,
        message: "sorry! too many requests"

    });
};
var handleSE = function (error) {
    log.error(error);
    throw {
        message: error.message,
        parent: error.parent
    };
}
exports.userBF = new ExpressBrute(Store, {
    freeRetries: 200,
    minWait: 5*60*1000, // 5 minutes
    maxWait: 60*60*60, // 1 hour,
    failCallback: failCB,
    handleStoreError: handleSE
});
exports.globalBF= new ExpressBrute(Store, {
    freeRetries: 500,
    attachResetToRequest: false,
    refreshTimeoutOnRequest: false,
    minWait: 25*60*60*60, // 1 day 1 hour 
    maxWait: 25*60*60*60, // 1 day 1 hour 
    lifetime: 24*60*60, // 1 day
    failCallback: failCB,
    handleStoreError: handleSE
});