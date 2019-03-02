const Category = require("../models/categories.js");

//main cartegory controllers
exports.category_get_all = function (req, res, next) {
	 Category.find()
	.select('name image products subcategories')
 	.exec()
 	.then(category =>{
 		if (category) {
 			res.status(200).json({
				success:true, 
				category:category});
 		} else {
 			res.status(404).json({
				success: false,
				message:'No entries found'});
 		}
 	})
 	.catch(err=>{
 		res.status(500).json({error:err});
 	});
}

exports.category_create = function (req, res, next) {
	const category = new Category({
		name: req.body.name,
		image: req.body.image,
		subcategories: req.body.subcategories.split(",")
	});
	Category.create(category,(err, newCategory)=>{
		if (err) {
			res.status(500).json({
				success: false,
				message: "Category could not be created",
				error: err,
			});
		}else{
			res.status(201).json({
				success:true,
               message:'a category has been posted',
               new:newCategory
	         });
		}
	});
}
//edit category
exports.category_edit = function (req, res, next) {
	var id = req.params.id;
	Category.findOne({_id: id}).exec()
	.then(category =>{
		if(category == null){
			return res.status(404).json({
				success:false,
				error:'no entry found'}); 
		}
		req.body.image ? category.image = req.body.image : category.image;
		req.body.name ? category.name = req.body.name : category.name;
		req.body.subcategories ? category.subcategories = req.body.subcategories.split(',') : category.subcategories;
		category.save()
		res.status(200).json({
			success: true,
			message:'edit successfull',
			result: category
        });
	})
	.catch(err=>{
		res.status(500).json({
			success:false,
			error:err.message});
	});
}


exports.category_delete = function (req, res, next) {
	var id = req.params.id;
	Category.remove({_id: id}).exec()
	.then(result=>{
		res.status(200).json({
			success: true,
            message:'a category has been deleted'
        });
	})
	.catch(err=>{
		res.status(500).json({
			success:false,
			error:err});
	});
}