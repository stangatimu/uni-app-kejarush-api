const mongoose  = require('mongoose');


const bookingSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    property:{type: String,required: [true,'property required']},
    client:{
        name:{type: String,required:[true,'tenant name required']},
        idnumber:{type: String, required:[true,'id number required']},
        phone:{type:Number,required:[true,'field cannot be empty']}
    },
    checkoutRequestID:{type:String,require:[true,'field cannot be empty']},
    status:{type:String,required: true},
    amount:{type:Number,default:0},
    time:{type: date, default: Date.now}
});

module.exports = mongoose.model('Booking',bookingSchema);