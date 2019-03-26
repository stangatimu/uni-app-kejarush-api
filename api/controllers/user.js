const User = require("../models/user"),
    mongoose = require("mongoose"),
    bcrypt = require("bcrypt"),
    crypto = require("crypto"),
    Joi = require('joi'),
    Token = require("../models/token.js"),
    sgMail = require('@sendgrid/mail'),
    sendSMS = require('../utils/sendSMS'),
    comparePassword = require('../utils/comp_password');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.users_signup = async (req, res) => {
    const data = req.body;
    const schema = Joi.object().keys({
        phone: Joi.string().regex(/^(2547)([0-9]{8})$/).required(),
        name: Joi.string().max(20,'utf8').required(),
        password: Joi.string().min(7).alphanum().required()
    });
    const {error,value} = Joi.validate(data,schema);
    if(error){
        return res.status(400).json({
            success: false,
            message:'inavalid input provided please try again.'
        });
    }

    try{

        let user = await User.find({ phone: value.phone });
        if (user.length) {
            return res.status(409).json({ 
                success: false,
                message: "That phone number is already registered"
            });
        } else {
            bcrypt.hash(value.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        error: "Registration failed, please try again later"
                    });
                } else {
                    var randomNumber = Math.floor(1000 + Math.random() * 9000);
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        name: value.name,
                        phone: value.phone,
                        randInt: randomNumber,
                        password: hash
                    });
                    user.save();
                    sendSMS(randomNumber, use.phone);
                    return res.json(201).json({
                        success: true,
                        message:"registration was successful, check your sms inbox to login"
                    })
                }
            });
        }
    }catch(err){

        return res.json(500).json({
            success: false,
            message:"registration was not successful, try again latter."
        });        
    }

}

         

//log in logic
exports.users_login = (req, res) => {
    const data = req.body;
    const schema = Joi.object().keys({
        phone: Joi.string().regex(/^(2547)([0-9]{8})$/).required(),
        password: Joi.string().min(7).max(30).alphanum().required()
    });
    const {error,value} = Joi.validate(data,schema);
    if(error){
        return res.status(400).json({
            success: false,
            message:'inavalid input provided please try again.'
        });
    }
    User.findOne({ phone: value.phone })
        .exec()
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Authentication failed"
                });
            }
            //custom function at the buttom of this document
            comparePassword(value.password, user, res);

        })
        .catch(e => {
            res.status(500).json({
                success: false,
                error: e.message
            });
        });
}
//display profile
exports.users_profile = async function (req, res) {
    try {
        let user = await User.findById(req.query.id)
            .select('property rent accBalance _id name phone idnumber')
        return res.status(200).json({
            success: true,
            user: user

        });
    } catch (e) {
        return res.status(404).json({
            success: false,
            error: "sorry! user not found"
        });

    }

}
//edit profile
exports.users_edit = function (req, res, next) {
    User.findById(req.userData.userId, (err, user) => {
        if (err) return next(err);
        if (req.body.name) user.name = req.body.name;
        if (req.body.password) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        error: "could not save changes"
                    });
                    user.password = hash;
                }
            });

        }
        user.save();
        res.status(200).json({
            success: true,
            message: "changes saved successfully"
        })

    });

}
//deleting a particular user by ID
exports.users_delete = function (req, res, next) {
    var id = req.userData.userId;
    User.remove({ _id: id }).exec()
        .then(result => {
            res.status(200).json({
                success: true,
                message: "User has been deleted"
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                error: "User could not be found!"
            });
        });
}