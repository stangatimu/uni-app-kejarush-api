const mongoose  = require('mongoose');


const bookingSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    property:{type: String,required: [true,'property required']},
    client:{
        name:{type: String,required:[true,'tenant name required']},
        idnumber:{type: String, required:[true,'id number required']}
    },
    status:{type:String,required: true},
    amount:{type:Number,default:0},
    time:{type: date, default: Date.now}
});

module.exports = mongoose.model('Booking',bookingSchema);