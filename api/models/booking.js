const mongoose  = require('mongoose');


const bookingSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    property:{type: mongoose.Schema.Types.ObjectId, ref:'Property', required: true},
    client:{
        name:{type: String,required:[true,'tenant name required']},
        phone:{type:Number,required:[true,'field cannot be empty']}
    },
    checkoutRequestID:{type:String,require:[true,'field cannot be empty']},
    status:{type:String,default:'pending'},
    amount:{type:Number,default:0},
    time:{type: Date, default: Date.now}
});

module.exports = mongoose.model('Booking',bookingSchema);