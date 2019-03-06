let getTimeStamp = ()=>{
    let time = new Date();

    let year = time.getFullYear();
    let month = time.getMonth() +1 < 10 ? `0${time.getMonth()+1}`: `${time.getMonth()+1}`;
    let day = time.getDate()<10 ? `0${time.getDate()}` :`${time.getDate()}`;
    let hour = time.getHours()<10 ? `0${time.getHours()}`: `${time.getHours()}`;
    let minute = time.getMinutes()< 10 ? `0${time.getMinutes()}`: `${time.getMinutes()}`;
    let secs = time.getSeconds()< 10 ? `0${time.getSeconds()}`: `${time.getMinutes()}`;
    console.log(secs);


    return `${year}${month}${day}${hour}${minute}${secs}`;
}


module.exports = getTimeStamp;