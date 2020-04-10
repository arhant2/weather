
const request = require('request');

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYXJoYW50IiwiYSI6ImNrOHNwc2pqdzBmaDkzbXF6eW5kczlub2UifQ.LXsOGCee7CqCxcjYjV5D3Q&limit=1';

    request({url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to location services!', undefined);
        }else if(response.body.features.length === 0){
            callback('Cannot find the location, please refactor search term!', undefined);
        }else{
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })

}

module.exports = geocode;