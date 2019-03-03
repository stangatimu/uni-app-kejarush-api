const   mongoose = require('mongoose'),
        Property = require('../models/property'),
        User = require('../models/user');



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
                photos: newProperty.photos,
                _id: newProperty._id
            }
		});

    }catch(err){
        return res.status(400).json({
			success: true,
			message: err.message
		});
    }
    

}

exports.property_edit = async (req, res)=>{

    try{
        const property = await Property.findById(req.params.id);
        if(!property){
            return res.status(404).json({
                success: true,
                message: "Sorry, property not found!"
            });
        }
        req.body.name ? property.name = req.body.name : property.name;
        req.body.rent ? property.rent = req.body.rent : property.rent;
        req.body.photos ? property.photos = req.body.photos.split(',') : property.photos;

        if(req.body.location){
            const geoLoc = {
                type: "Point",
                coordinates: [req.body.location.lon,req.body.location.lat]
            }
            property.location = geoLoc;            
        }
        property.save();

        return res.status(202),json({
            success: true,
            message:"Property has been updated successfuly.",
            property:{
                name:property.name,
                rent: property.rent,
                photos: property.photos,
                location: property.location,
                _id: property._id,
                author:property.author
            }
        })

    }catch(error){
        return res.status(500).json({
			success: true,
			message: err.message
		});
    }
}

exports.property_delete = async (req, res)=>{
    try{
        const user = await User.findOne({property: req.params.property});

        if(user){
            return res.status(409).json({
                success: true,
                message: "Sorry, property has tenants and cannot be deleted!"
            });
        }else{

            const result = Property.remove({_id: req.params.property});
            return res.status(201).json({
                success: true,
                message: "property was successfuly deleted."
            });
        }
    }catch(error){

        return res.status(500).json({
            success: true,
            message: "Sorry, property was not deleted, please try again."
        });
    }
}