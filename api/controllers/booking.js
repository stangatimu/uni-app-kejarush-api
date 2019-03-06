const http = require('http'),
    Booking = require("../models/booking"),
    ad = require("../models/ad"),
    getMpesaToken = require('../utils/getMpesaToken');


exports.intialize_booking = async (req,res)=>{

    let auth = "Basic " + new Buffer(process.env.Mpesa_consumer_key + ":" + Mpesa_consumer_secret).toString("base64");

    // get token
    let token = await getMpesaToken(auth)

    // encode password to base64 (business short code, passkey and timestamp)

    // create headers with access token

    // create a body
    let payData = {

    }

    // make request to m-pesa
    https.get(payData,(res)=>{

        // get checkOut request id and create a booking with pending status

        // if error return error

        // return success
        
    });
}

exports.booking_callback = (req,res)=>{

    //check error

    // if success grab amount and checkoutrequestID
    

    //find booking model by checkoutrequestID
    
    //if booking found change status from pending to complete

    //send confirmation sms

}

exports.get_property_bookings = (res,res)=>{

}


exports.get_all_bookings = (res,req)=>{
    
}