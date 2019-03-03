const Property = require('../models/property'),
    mongoose = require('mongoose'),
    Ad = require('../models/ad'),
    Category = require('../models/categories');


exports.ad_create = async function (req, res, next) {
    const geoLoc = {
        type: "Point",
        coordinates: [req.body.lon, req.body.lat]
    }
    try {
        const category = await Category.findById(req.body.category);
        const ad = new Ad({
            _id: new mongoose.Types.ObjectId,
            name: req.body.name,
            property: req.body.Property,
            author: req.userData.userId,
            rent: req.body.rent,
            description: req.body.description,
            category: {
                name: category.name,
                _id: category._id
            },
            subcategory:req.body.subcategory,
            location: geoLoc,
            upFor: req.body.type,
            photos: req.body.photos.split(',')
        });
        const newAd = await Product.create(ad);
        category.property++;
        category.save();
        return res.status(201).json({
            success: true,
            message: 'your product has been posted',
            ad: newAd 
        });
    } catch (err) {
        return res.status(400).json({
            success: true,
            message: `Sorry, product could not be posted`
        });
    }
}
