const   mongoose = require('mongoose'),
        Property = require('../models/property');



exports.property_create = async (req,res)=>{
    const geoLoc = {
		type: "Point",
		coordinates: [req.body.lon,req.body.lat]
    }
    try{
        const property = new Property({
            _id: mongoose.Schema.Types.ObjectId,
            name: req.body.name,
            photos: req.body.photos.split(","),
            location: geoLoc,
            rent:req.body.rent,
            author: req.userData.name
        });

        const newProperty = await Property.create(property);
        
        return res.status(201).json({
			success: true,
			message: 'your product has been posted',
			entry: {
                name: newProperty.name,
                location: newProperty.location,
                author: newProperty.author,
                rent: newProperty.rent,
                photos: newProperty.photos
            }
		});

    }catch(err){
        return res.status(400).json({
			success: true,
			message: err.message
		});
    }
    

}