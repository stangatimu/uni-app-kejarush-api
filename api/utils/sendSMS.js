const sendSMS = (res)=>{
    res.status(200).json({
        success: true,
        message: 'You have successfuly signup you can now login'

    });
}
module.exports = sendSMS;