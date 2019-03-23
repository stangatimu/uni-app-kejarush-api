const accountSid = 'AC81ef94db2f34a1b270c1457bf18d93ab';
const authToken = 'your_auth_token';
const client = require('twilio')(accountSid, authToken);


const sendSMS = async (msg,phone)=>{

    response = await client.messages.create({
       body: msg,
       from: '+12027504870',
       to: phone
     });

    return response
    
}
module.exports = sendSMS;