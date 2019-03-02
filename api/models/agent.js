const mongoose = require('mongoose');


const agentSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{type: String,required:[true,'agent username required'],unique:true},
    status:{type:String, enum:['active','domant'],default:'active'},
    role:{type: String,enum:['admin','agent'], default:'admin'},
    password:{type: String,required:[true,'password field is required']}

});

module.exports = mongoose.model('Agent', agentSchema);