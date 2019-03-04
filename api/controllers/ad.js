const Property = require('../models/property'),
    mongoose = require('mongoose'),
    Ad = require('../models/ad'),
    Category = require('../models/categories');


exports.ad_create = async function (req, res) {
    const geoLoc = {
        type: "Point",
        coordinates: [req.body.lon, req.body.lat]
    }
    try {
        const category = await Category.findById(req.body.category);
        const property = await Property.findById(req.body.property);
        const ad = new Ad({
            _id: new mongoose.Types.ObjectId,
            name: req.body.name,
            property: property._id,
            author: req.userData.agentID,
            rent: req.body.rent,
            description: req.body.desc,
            category: {
                name: category.name,
                _id: category._id
            },
            subcategory:req.body.subcategory,
            location: geoLoc,
            upFor: req.body.type,
            photos: req.body.photos.split(',')
        });
        const newAd = await Ad.create(ad);
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
            message: err.message
        });
    }
}

exports.ad_delete = async function (req, res) {
	try{
		const ad = await Ad.findById(req.query.ad);
		const category = await Category.findById(ad.category);
        
        
		category.property--;
		category.save();
		const result = await Ad.deleteOne({ _id: ad._id });

		return	res.status(200).json({
				success: true,
                message: "Property has been deleted",
                result: result
		});
	
		
	}catch(err){
		res.status(500).json({
			success: false,
			message: "Property has not been deleted. Try again later."
		});
	}	
}


exports.ad_get_all = function (req, res) {
	var perPage = parseInt(req.query.per) || 10;
	var page = req.query.page;
	var high = 100000000;
	var low = 0;
	if(req.query.high) high = req.query.high;
	if(req.query.low) low = req.query.low;

	 Ad.find({rent: {$lte: high, $gte: low}})
	 .sort({created: -1, rating: -1})
	 .skip(perPage * page)
	 .limit(perPage)
 	.exec()
 	.then(ads =>{
 		if (ads.length>0) {
 			res.status(200).json({
				 success: true,
                 entries: ads
                });
 		} else {
 			res.status(404).json({
				success: false, 
				message:'No entries found'});
 		}
 	})
 	.catch(err=>{
 		res.status(500).json({
			success: false, 
			message:"sorry! found errors on request"});
 	});
}

exports.get_by_category = function (req,res){
    const perPage = parseInt(req.query.per) || 10;
	var page = req.query.page;
	var high = 100000000;
	var low = 0;
	if(req.query.high) high = req.query.high;
	if(req.query.low) low = req.query.low;

	Ad.find({"category._id":req.params.id,rent: {$lte: high, $gte: low}})
	.sort({created: -1})
	.skip(perPage * page)
	.limit(perPage)
	.exec()
	.then(ad =>{
		if (ad.length) {
			res.status(200).json({
				success: true,
				entries: ad});
		} else {
			res.status(404).json({
				success: false,
				message:'No entries yet'});
		}
	})
	.catch(err=>{
		res.status(500).json({
			success: false,
            message:err.message
        });
	});
}

exports.get_by_subcategory = function (req, res){
    const perPage = parseInt(req.query.per) || 10;
	var page = req.query.page;
	var high = 100000000;
	var low = 0;
	if(req.query.high) high = req.query.high;
	if(req.query.low) low = req.query.low;

	Ad.find({subcategory:req.params.name,rent: {$lte: high, $gte: low}})
	.sort({created: -1})
	.skip(perPage * page)
	.limit(perPage)
	.exec()
	.then(ad =>{
		if (ad.length) {
			res.status(200).json({
				success: true,
				entries: ad});
		} else {
			res.status(404).json({
				success: false,
				message:'No entries yet'});
		}
	})
	.catch(err=>{
		res.status(500).json({
			success: false,
            message:err.message
        });
	});
    
}

exports.get_by_location = (req, res)=>{
    
    const perPage = parseInt(req.query.per) || 10;
	var page = req.query.page;
	var high = 100000000;
	var low = 0;
	if(req.query.high) high = req.query.high;
	if(req.query.low) low = req.query.low;
	Ad.find({
		location: {
		 $near: {
		  $maxDistance: req.query.range ,
		  $geometry: {
		   type: "Point",
		   coordinates: [req.query.lon, req.query.lat]
		  }
		 }
		}
		,offerPrice: {$lte: high, $gte: low}
	   })
	   .sort({created: -1})
	.skip(perPage * page)
	.limit(perPage)
	.exec()
	.then(ads =>{
		if (ads.length) {
			res.status(200).json({
				success: true,
				entries: ads});
		} else {
			res.status(404).json({
				success: false,
                message:'No entries yet'
            });
		}
	})
	.catch(err=>{
		res.status(500).json({
			success: false,
			message:err});
    });
    
}