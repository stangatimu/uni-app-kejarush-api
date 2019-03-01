const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{type: String,required:[true,'Ad name is required']},
    property:{type: mongoose.Schema.Types.ObjectId, ref:'Property', required: true},
    rent:{type: Number,required:[true,'rent field cannot be empty']},
    category:{
        type: String, 
        enum:['flats & apartments','houses','commercial property','land'],
        require:[true,'ad category cannot be empty']
    },
    upFor:{type: String,enum:['sale','rent'], required:[true,'for field cannot be empty']},
    photos:{type:[String],default:['']},
    bookings:{type:[mongoose.Schema.Types.ObjectId],ref:'Booking',default:['']},
    location: {
		type: { type: String },
		coordinates: {type: [Number], default:[0,0]},
	}
},{
	toObject: {virtuals: true},
	toJSON: {virtuals: true}
});

adSchema.index({location:"2dsphere"});

module.exports = mongoose.model('Ad', adSchema);