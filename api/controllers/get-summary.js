const User = require('../models/user'),
    Property = require('../models/property'),
    Ad = require('../models/ad');
    Booking = require('../models/booking');




exports.get_summary = async (req, res)=>{
    try{
        unpaid = await User.find({rent: {$lte: -1}}).count();
        paid = await User.find({rent:{$gte:0}}).count();
        property = await Property.find().count();
        booking = await Booking.find().count();
        ads = await Ad.find().count();


        return res.status(200).json({
            success: true,
            summary:{
                unpaid: unpaid,
                paid: paid,
                property: property,
                booking: booking,
                ads: ads
            }
        });

    }catch(error){

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}