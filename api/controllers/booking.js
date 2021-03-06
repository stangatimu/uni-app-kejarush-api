const mongoose = require('mongoose'),
    Booking = require("../models/booking"),
    ad = require("../models/ad"),
    Joi = require('joi'),
    Axios = require('axios')


exports.intialize_booking = async function(req,res){
    const data = req.body;
    const schema = Joi.object().keys({
        phone: Joi.string().regex(/^(2547)([0-9]{8})$/).required(),
        name: Joi.string().min(5).max(30).required(),
        property: Joi.string().max(100).required()
    });

    const {error,value} = Joi.validate(data,schema);
    if(error){
        return res.status(400).json({
            success: false,
            message: 'Sorry, please check your phone number and try again.'
        });
    }
    //initialize stk push
    try {
        let response = await Axios.post(
            'http://localhost:5000/stkpush',{phone:value.phone,amount:500}
        )
        //if success creat a new booking with pending status
        const booking = new Booking({
            _id: new mongoose.Types.ObjectId(),
            property: value.property,
            client:{
                name:value.name,
                phone: value.phone
            },
            CheckoutRequestID:response.data.CheckoutRequestID,
            status:'pending',
            amount: value.amount
        });
        const newBooking = await Booking.create(booking);
        
        return res.status(201).json({
            success: true,
            message: `${response.data.CustomerMessage}. You should seed an m-pesa pop-up screen on your phone.`,
            booking: newBooking

        });

    } catch (err) {

        console.log(err)
        
       return res.status(500).json({
            success: false,
            message: err.message
        });
    }    
}

exports.booking_callback = async (req,res)=>{

    try{
        let stkCallBack = req.body.Body.status;

        const schema = Joi.object().keys({
            MerchantRequestID: Joi.string().max(30).required(),
            CheckoutRequestID: Joi.string().max(100).required(),
            ResultCode: Joi.number().max(1000000).required(),
            ResultDesc: Joi.string().max(100).required(),
            CallbackMetadata: Joi.object()

        });
        let {error, value } = Ji.validate(stkCallBack,schema);

        if(error){
            throw error;
        }
        
        let booking = await Booking.find({MerchantRequestID: value.MerchantRequestID});

        booking.status = 'complete';

        booking.save();

        // send payment sms

    }catch(error){

        console.log(error)

    }

}

exports.get_property_bookings = async (req,res)=>{
    const data = req.query.property;

    const {error, value } = Joi.validate({id: data},{id: Joi.string()});
    if(error){
        return res.status(400).json({
            success: false,
            message:"invalid parameters, please try again with correct parameters"
        });
    }

    try{
        let bookings = await Booking.find({property: value.id})
            .select('client status amount')
            .populate('property','name')

        if(bookings.length){
            return res.status(200).json({
                success:true,
                bookings: bookings
            });
        }
        return res.status(404).json({
            success: false,
            message:"Sorry, bookings not yet made to this property."
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message: "Something went wrong, please try again latter."
        });

    }
}


exports.get_all_bookings = async  (req,res)=>{

    try{
        let bookings = await Booking.find().populate('property','name')

        if(bookings.length){
            return res.status(200).json({
                success:true,
                bookings: bookings
            });
        }
        return res.status(404).json({
            success: false,
            message:"Sorry, bookings not yet made to this property."
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message: "Something went wrong, please try again latter."
        });

    }
    
}