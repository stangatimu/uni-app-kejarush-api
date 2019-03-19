const Joi = require('Joi'), 
    User = require('../models/user'),
    Property = require('../models/property');

exports.agent_asign_house = (req,res)=>{
    //validate input

    //check user and property

    //credit user with deposit and  1st rent

    //asign property to user and save
    
    //return success

    //catch any error
}

exports.agent_revoke_house = (req,res)=>{
    // validate input

    //look up user

    //edit property field and set rent field 0

    //catch any error
}

exports.agent_edit_rent = async (req,res)=>{

    let schema = Joi.object().keys({
        _id : Joi.string().max(100).required(),
        rent: Joi.number().min(0).required()
    });
    let {error, value } = Joi.validate(req.body,schema);

    if(error){
        return res.status(400).json({
            success: true,
            message: error.message
        });
    }

    try{
        let user = await User.findById(value._id);

        user.rent = value.rent;
        user.save();

        return res.status(201).json({
            success: false,
            user: user
        })

    }catch(error){

        return res.status(404).json({
            success: true,
            message: 'Sorry, user could not be edited.'
        })
    }
    
}

exports.get_negative_rent_users = async (req,res)=>{

    try{

        let users = await User.find({rent: {$lte: 0}}).sort({accBalance: -1})
            .select('name phone idnumber accBalance')
        
        return res.status(200).json({
            success: true,
            users: users,
            error: error.message
        });

    }catch(error){

        return res.status(404).json({
            success: true,
            message: 'Sorry, users for that property no',
            error: error.message
            
        })
    }

}

exports.get_users_by_property = async (req,res)=>{

    try{

        let users = await User.find({property: req.query.property});
        
        return res.status(200).json({
            success: true,
            users: users,
            error: error.message
        });

    }catch(error){

        return res.status(404).json({
            success: true,
            message: 'Sorry, users for that property no',
            error: error.message
            
        })
    }

}

