const Axios = require('axios');

let getMpesaAuthToken = async ()=>{
    console.log(process.env.Mpesa_consumer_key)
    let auth = "Basic " + new Buffer(process.env.Mpesa_consumer_key + ":" + process.env.Mpesa_consumer_secret).toString("base64");

    const axios = Axios.create();

    let res = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    {headers:{"Content-Type":"application/json","Authorization": auth}});

    return res.data.access_token;
   
    
}

module.exports = getMpesaAuthToken;