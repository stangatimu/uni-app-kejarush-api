const axios = require('axios');

let getMpesaAuthToken = ()=>{
    let auth = "Basic " + new Buffer(process.env.Mpesa_consumer_key + ":" + process.env.Mpesa_consumer_secret).toString("base64");

    const request = axios.create({
        baseURL:'https://sandbox.safaricom.co.ke',
        headers:{
            "Content-Type":"application/json",
            "Authorization": auth
        }
        
    });

    request.get('/oauth/v1/generate?grant_type=client_credentials')
    .then(res=>{
        console.log(res);
    })
    .catch(err=>{
        console.log(err)
    })

    
}

module.exports = getMpesaAuthToken;
// getMpesaAuthToken();