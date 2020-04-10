const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Set up handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

//Setup static directory to be served
app.use(express.static(publicDirectoryPath));

hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Arhant Jain'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Arhant Jain'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Get Help',
        message: 'Get help from us!',
        name: 'Arhant Jain'
    });
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send({
            error: "Address must be provided!"
        })
        return;
    }

    geocode(req.query.address, (geocodeError, geocodeResponse) => {
        if(geocodeError){
            res.send({error: geocodeError});
            return;
        }
        forecast(geocodeResponse.latitude, geocodeResponse.longitude, (forecastError, forecastResponse) => {
            if(forecastError){
                res.send({error: forecastError});
                return;
            }
            res.send({
                forecast: forecastResponse,
                location: geocodeResponse.location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search){
        res.send({
            error: 'You must provide a search term!'
        });
        return;
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Arhant Jain',
        errorMessage: 'Help article not found!'
    });
});


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Arhant Jain',
        errorMessage: 'Page not found!'
    });
});


app.listen(3000, () => {
    console.log('Starting up server on port 3000.');
})
