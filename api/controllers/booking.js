const Booking = require("../models/booking"),
    ad = require("../models/ad"),
    Joi = require('joi'),
    initializeStkPush = require("../utils/initializePayment");


exports.intialize_booking = async function(req,res){
    const data = req.body;
    const schema = Joi.object().keys({
        phone: Joi.string().regex(/^(2547)([0-9]{8})$/).required(),
        amount: Joi.number().max(100000).required(),
    });

    const {error,value} = Joi.validate(data,schema);
    if(error){
        return res.status(400).json({
            success: false,
            message: 'Invalid input, check your inputs and try again.'
        });
    }
    //initialize stk push
    try {
        let data = await initializeStkPush(value.phone, value.amount, req.userData.userId);
        
        //if success creat a new booking with pending status
        const booking = new Booking({
            property: value.property,
            client:{
                name:value.name,
                phone: value.phone
            },
            checkoutRequestID:data.checkoutRequestID,
            status:'pending',
            amount: value.amount
        });
        const newBooking = await Booking.create(booking);
        
        return res.status(201).json({
            success: true,
            message: data,
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

exports.booking_callback = (req,res)=>{

    //check error

    // if success grab amount and checkoutrequestID
    

    //find booking model by checkoutrequestID
    
    //if booking found change status from pending to complete

    //send confirmation sms

}

exports.get_property_bookings = async (req,res)=>{
    const data = req.query.id;

    const {error, value } = Joi.validate({id: data},{a: Joi.string()});
    if(error){
        return res.status(400).json({
            success: false,
            message:"invalid parameters, please try again with correct parameters"
        });
    }

    try{
        let bookings = await Booking.find({property: value.id});

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
        let bookings = await Booking.find();

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