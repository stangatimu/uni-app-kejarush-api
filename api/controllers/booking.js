const Booking = require("../models/booking"),
    ad = require("../models/ad"),
    initializeStkPush = require("../utils/initializePayment");


exports.intialize_booking = async function(req,res){
    //initialize stk push
    try {
        let data = await initializeStkPush(req.body.phone, req.body.amount, req.userData.userId);
        return res.status(201).json({
            success: true,
            message: data

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

exports.get_property_bookings = (req,res)=>{

}


exports.get_all_bookings = (res,req)=>{
    
}