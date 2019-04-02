const mongoose = require('mongoose')
const mongooseAgolia = require('mongoose-algolia')

const adSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{type: String,required:[true,'Ad name is required']},
    property:{type: mongoose.Schema.Types.ObjectId, ref:'Property', required: true},
    author:{type: mongoose.Schema.Types.ObjectId, ref:'Agent', 
            required:[true,'field cannot be empty']},
    rent:{type: Number,required:[true,'rent field cannot be empty']},
    category:{
       name: {type: String, require:[true,'field cannot be empty']},
       _id:{type: String, require:[true,'field cannot be empty']}
    },
    subcategory:{type:String,default:''},
    upFor:{type: String,enum:['sale','rent'], required:[true,'for field cannot be empty']},
    photos:{type:[String],default:['']},
    description:{type: String, require:[true,'field cannot be empty']},
    bookings:{type:[mongoose.Schema.Types.ObjectId],ref:'Booking'},
    location: {
		type: { type: String },
		coordinates: {type: [Number], default:[0,0]},
        }
},{
	toObject: {virtuals: true},
	toJSON: {virtuals: true}
})

adSchema.index({location:"2dsphere"});

adSchema.plugin(mongooseAgolia,{
        appId: process.env.appId,
        apiKey: process.env.algoliaAPIkey,
        indexName: "kejarush_ads",
        popuplate:{
                path:"category",
                select:'name'
        }
})

let Model = mongoose.model('Ad', adSchema);
Model.SyncToAlgolia();
Model.SetAlgoliaSettings({
        searchableAttributes:['name','description','category','subcategory']
})

module.exports = Model