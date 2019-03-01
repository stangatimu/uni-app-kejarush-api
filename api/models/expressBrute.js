const mongoose = require('mongoose');

var storeSchema = new mongoose.Schema({
    "_id": String,
    "data": {
      "count": Number,
      "lastRequest": Date,
      "firstRequest": Date
    },
    "expires": Date
  });

module.exports = mongoose.model('Store',storeSchema);