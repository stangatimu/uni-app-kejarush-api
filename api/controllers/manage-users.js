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

exports.agent_revoke_house = async (req,res)=>{
    // validate input
    const data = req.query.user;

    const {error, value } = Joi.validate({id: data},{id: Joi.string()});
    if(error){
        return res.status(400).json({
            success: false,
            message:"invalid parameters, please try again with correct parameters"
        });
    }

    try{

        let user = User.findById(value.id);

        if(user == undefined){
            throw new Error('Sorry, the tenant could not be found');
        }

        user.property = '';
        user.rent = 0;
        user.save();

        return res.status(202).json({
            success: true,
            message:"User has successfully been edited",
            user:{
                name: user.name,
                rent: user.rent,
                property: user.property
            },
        })

    }catch(error){

        return res.status(400).json({
            success: false,
            message:"Sorry, tenant could not be edited. Try again later."
        })

    }
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

    const data = req.query.property;

    const {error, value } = Joi.validate({id: data},{id: Joi.string()});

    if(error){
        return res.status(400).json({
            success: false,
            message:"invalid parameters, please try again with correct parameters"
        });
    }

    try{

        let users = await User.find({property: value.property});
        
        return res.status(200).json({
            success: true,
            users: users,
            error: error.message
        });

    }catch(error){

        return res.status(404).json({
            success: true,
            message: 'Sorry, users for that property no',
            
        })
    }

}

