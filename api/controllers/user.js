const User = require("../models/user"),
    Product = require("../models/property"),
    mongoose = require("mongoose"),
    bcrypt = require("bcrypt"),
    crypto = require("crypto"),
    Token = require("../models/token.js"),
    sgMail = require('@sendgrid/mail'),
    sendSMS = require('../utils/sendSMS'),
    comparePassword = require('../utils/comp_password');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.users_signup = (req, res, next) => {
    const ejs = false;
    User.find({ phone: req.body.phone })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    success: false,
                    message: "That phone number is already registered"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            error: "Registration failed, please try again later"
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            phone: req.body.phone,
                            idnumber: req.body.idnumber,
                            password: hash
                        });
                        user.save()
                            .then(result => {
                                const token = new Token({
                                    _userId: user._id,
                                    token: crypto.randomBytes(16).toString('hex'),
                                });
                                token.save();
                                //send mail custom function
                                // sendMail(req,res, user, token, ejs);
                                sendSMS(res)

                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    success: false,
                                    error: err.message
                                });
                            });
                    }
                });

            }
        })
        .catch(e => {
            res.status(500).json({
                success: false,
                error: e.message
            });
        });
}
//account or email confirmation
exports.phone_confirmation = function (req, res, next) {

    // Find a matching token
    Token.findOne({ token: req.params.token }, function (err, token) {
        if (!token) return res.render("resendConfirm", {
            message: "We were having trouble activating your account. Your link my have expired. Enter your email below to recieve another link"
        });

        // If we found a token, find a matching user
        User.findOne({ _id: token._userId }, function (err, user) {
            if (!user) return res.render("passwordCofirm", { message: "We were having trouble activating your account." });
            if (user.isVerified) return res.render("passwordCofirm", { message: "Your account is already ativated. Please log in." });

            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) { return res.render("resendConfirm", { message: "We were having trouble activating your account. Your link my have expired.Enter your email below to recieve another link" }); }
                return res.render("passwordCofirm", { message: "Account has been verified you can now log in in the app" });
            });
        });
    });
};
//resend confirmation email
exports.resend_confirmation = function (req, res, next) {
    const ejs = true;
    User.findOne({ email: req.body.email }, function (err, user) {
        if (!user) return res.render("passwordCofirm", { message: 'Check ' + req.body.email + ' for verification link.' });
        if (user.isVerified) return res.render("passwordCofirm", { message: "Account is already activated.Please log in." });

        // Create a verification token, save it, and send email
        var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

        // Save the token
        token.save(function (err) {
            if (err) { if (user.isVerified) return res.render("passwordCofirm", { message: "we are having trouble sending you a link. Please try again latter" }); }

            // Send email custom fuction
            sendMail(req, res, user, token, ejs)
        });

    });
};


//log in logic
exports.users_login = (req, res, next) => {
    User.findOne({ phone: req.body.phone })
        .exec()
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Authentication failed"
                });
            }
            //custom function at the buttom of this document
            comparePassword(req.body.password, user, res);

        })
        .catch(e => {
            res.status(500).json({
                success: false,
                error: e.message
            });
        });
}
//display profile
exports.users_profile = async function (req, res, next) {
    try {
        let user = await User.findById(req.query.id);
        const products = await Product.find({ author: user._id }).count();
        return res.status(200).json({
            success: true,
            user: {
                name: user.name,
                count: products,
                email: user.email,
                id: user._id,
                dp: user.dp,
                bio: user.bio
            }

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
    User.findOne({ _id: req.userData.userId }, (err, user) => {
        if (err) return next(err);
        if (req.body.name) user.name = req.body.name;
        if (req.body.email) user.email = req.body.email;
        if (req.body.dp) user.dp = req.body.dp;
        if (req.body.bio) user.bio = req.body.bio;
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




exports.deleteProperty = async function (req, res, next) {
    try {
        property = await Property.findById(prodId);
        orders = await Oders.find({ prodId: property._id });
        property.remove();
        orders.forEach(order => {
            order.remove();
        });

    } catch (err) {
        console.log(err)
    }


}