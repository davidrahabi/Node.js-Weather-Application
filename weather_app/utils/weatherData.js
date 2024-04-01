const request = require("request");






const weatherData = (address, callback) => {
    const SECRET_KEY = "bc50119485ffe3eeb552c4d5202dfd5e";
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${address}&units=imperial&appid=${SECRET_KEY}`;
    console.log(url);

    request({url,json:true},(error,data)=>{
        if(error){
            callback(true, "Unable to get data, please try again" + error);
        }
        else{
        callback(false, data?.body);
        }
    });
};

module.exports= weatherData;