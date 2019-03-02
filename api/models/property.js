const mongoose = require('mongoose');


const propertySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{type:String,required:[true,'property name cannot be empty']},
    rent:{type:Number, default: 0},
    photos:{type:[String],require:[true,'Add at least one photo']},
    location: {
		  type: { type: String },
		  coordinates: {type: [Number], default:[0,0]},
	  }
},{
	toObject: {virtuals: true},
	toJSON: {virtuals: true}
});

propertySchema.index({location:"2dsphere"});

module.exports = mongoose.model('Property',propertySchema);