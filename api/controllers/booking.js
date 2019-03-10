const Booking = require("../models/booking"),
    ad = require("../models/ad"),
    getMpesaToken = require('../utils/getMpesaToken'),
    getTimeStamp = require('../utils/getTimeStamp');


exports.intialize_booking = async (req,res)=>{


    // get token
    let token = await getMpesaToken(auth)
    console.log(token);

    // // encode password to base64 (business short code, passkey and timestamp)
    // let password = new Buffer(`${process.env.businessShortCode}
    //                     ${process.env.onlinePassKey}
    //                     ${getTimeStamp()}`).toString('base64');

    // // create headers with access token
    // let headers = { 
    //     "Authorization": `Bearer ${token}`,
    //     "Content-Type": "application/json"
    // }

    // // create a body
    // let payData = {
    //     BusinessShortCode: process.env.businessShortCode,
    //     Password: password,
    //     Timestamp: getTimeStamp(),
    //     TransactionType: "CustomerPayBillOnline",
    //     Amount: data.amount,
    //     PartyA: data.Phone,
    //     PartyB: process.env.businessShortCode,
    //     PhoneNumber: data.Phone,
    //     CallBackURL: "http://mpesa-requestbin.herokuapp.com/xnmn75xn",
    //     AccountReference: data.Phone,
    //     TransactionDesc: "House booking payment"
    // }

    // make request to m-pesa
    
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