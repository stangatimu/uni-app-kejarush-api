const mongoose = require('mongoose')

const cartegorySchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    image: {type: String, required: true},
    created:{type: Date, default: Date.now},
    properties:{type:Number, default: 0},
    subcategories:{type:[String],default:[]
    }
});

module.exports = mongoose.model('Category',cartegorySchema);