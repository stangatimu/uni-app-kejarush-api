const Payment = require('../models/payment'),
    User = require('../models/user'),
    axios = require('axios'),
    mongoose = require('mongoose'),
    Joi = require('joi')


exports.init_Payment = async (req, res)=>{
        const data = req.body;
        console.log(req.userData)
        const schema = Joi.object().keys({
            phone: Joi.string().regex(/^(2547)([0-9]{8})$/).required(),
            amount: Joi.number().max(70000).required(),
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
            let user = await User.findById(req.userData.userId)
            
            if(user.property == ''){
                throw new Error('You currently dont have any house allocated to you.')
            }
            let response = await axios.post(
                'http://localhost:5000/stkpush',{phone:value.phone,amount:value.amount}
            )

            
            //if success creat a new booking with pending status
            const payment = new Payment({
                _id: new mongoose.Types.ObjectId(),
                property: user.property,
                phone: value.phone,
                CheckoutRequestID:response.data.CheckoutRequestID,
                status:'pending',
                tenant:req.userData.userId,
                amount: value.amount
            });
            
            const newPayment = await Payment.create(payment);
            
            return res.status(201).json({
                success: true,
                message: response.data.CustomerMessage,
                payment: newPayment
    
            });
    
        } catch (err) {
    
            console.log(err)
            
           return res.status(500).json({
                success: false,
                message: err.data
            });
        }    
}

exports.payment_callback = async (req,res)=>{

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
        
        let payment = await Payment.find({MerchantRequestID: value.MerchantRequestID});

        payment.status = 'complete';

        payment.save();

        // send payment sms

    }catch(error){

        console.log(error)

    }

}

exports.get_user_payments = async (req,res)=>{

    let page  = req.query.page

    try{
        let payments = await Payment.find({tenant:req.userData.userID})
            .select('phone amount status createdAt')
            .skip(10 * page)
            .limit(page)

        return res.status(200).json({
            success: true,
            payments: payments
        })

    }catch(error){
         return res.status(500).json({
             success: false,
             message:'Sorry, something went wrong. Please try again later'
         })
    }
}