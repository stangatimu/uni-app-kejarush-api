const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name:{type:String, required: true},
	phone:{type: Number, required: true, unique: true},
	idnumber:{type: Number, required: true, unique: true},
	password:{type: String, required: true},
	property:{type: String, default:''},
	rent:{type:Number,default:0},
	accBalance:{type:Number,default:0},
	isVerified: { type: Boolean, default: false },
	created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', userSchema);