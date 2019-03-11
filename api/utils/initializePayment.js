const Axios = require('axios'),
    getMpesaToken = require('./getMpesaToken'),
    getTimeStamp = require('./getTimeStamp');


const initializeStkPush = async function (phone, amount, userID) {


    // encode password to base64 (business short code, passkey and timestamp)
    let password = new Buffer(`601443bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c91920190216100234`)
    .toString('base64');

    //get auth token
    let token = await getMpesaToken();

    // create headers with access token
    const axios = Axios.create({
        baseURL: "https://sandbox.safaricom.co.ke",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }

    });

    // create a body
    let body = {
        headers: headers,
        BusinessShortCode: '601443',
        Password: password,
        Timestamp: getTimeStamp(),
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone,
        PartyB: "601443",
        PhoneNumber: phone,
        CallBackURL: "http://mpesa-requestbin.herokuapp.com/xnmn75xn",
        AccountReference: userID,
        TransactionDesc: "House booking payment"
    }

    const data = await axios.post("/mpesa/stkpush/v1/processrequest",body);

    return data;

}

module.exports = initializeStkPush;
