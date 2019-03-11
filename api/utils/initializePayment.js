const axios = require('axios'),
    getMpesaToken = require('./getMpesaToken'),
    getTimeStamp = require('./getTimeStamp');


const initializeStkPush = async function (phone, amount, userID) {


    // encode password to base64 (business short code, passkey and timestamp)
    let password = new Buffer(`"174379"
                        ${process.env.onlinePassKey}
                        ${getTimeStamp()}`).toString('base64');

    //get auth token
    let token = await getMpesaToken();

    // create headers with access token
    let headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    }

    // create a body
    let body = {
        headers: headers,
        BusinessShortCode: "174379",
        Password: password,
        Timestamp: getTimeStamp(),
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone,
        PartyB: "174379",
        PhoneNumber: phone,
        CallBackURL: "http://mpesa-requestbin.herokuapp.com/xnmn75xn",
        AccountReference: userID,
        TransactionDesc: "House booking payment"
    }
    const data = await axios.post(
        "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
        headers,
        body);

    return data;

}

module.exports = initializeStkPush;
