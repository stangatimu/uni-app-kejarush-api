const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    CheckoutRequestID: {type: String, required:true,unique: true},
    phone:{type: Number, required: true},
    tenant:{type: String,required: true},
    property:{ type: String, required: true},
    amount:{type: Number, required: true},
    status:{type: String, required:true},
    createdAt: { type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model('Payment', paymentSchema);