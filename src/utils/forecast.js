
const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b4286339476fd066c454b0b21ab141c1&query=' + latitude + ',%20' + longitude;

    request({url, json:true}, (error, response) => {
        if(error){
        callback('Unable to connect to weather services!', undefined);
        }else if(response.body.error){
            callback('Cannot give the weather forecast for the selected location!', undefined);
        }else{
            callback(undefined, 
            `${response.body.current.weather_descriptions[0]}. It is ${response.body.current.temperature} degrees. It feels like ${response.body.current.feelslike} degrees out.`   
            );  
        }
    });

}

module.exports = forecast;
  