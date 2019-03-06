const http = require('http');


let getMpesaAuthToken = (auth)=>{
    return http.get({
        hostname:"sandbox.safaricom.co.ke",
        method:'GET',
        path:'',
        headers:{
            "Content-Type":"application/json",
            "Authorization": auth
        }
    },(response)=>{
        let body = '';
        
        response.on('data',(data)=>{
            body += data;
        });
        response.on('error',(error)=>{
            throw error.message;
        })
        response.on('end', ()=>{
            var jsonBody = JSON.parse(body);
            return {access_token} = jsonBody;
            
        })
    })
}

module.exports = getMpesaAuthToken;