// Import dotenv library to be able to use environment variables (for API_KEY)
require('dotenv').config();

// importing express
const express = require('express');

// create a web application as an instance of express()
const app = express();

// importing nedb
const Datastore = require('nedb');

// importing node-fetch (the fetch api is only present by default on the client)
const fetch = require('node-fetch');

// listen! the listen() function takes two arguments
// 1. a port on which to listen
// 2. a callback function i.e. what to do when a request arrives through this port
app.listen(3000, () => console.log('listening on 3000'));

// use the static function of the express library.
// the function takes a file or a directory as a parameter
app.use(express.static('public'));

// give the server the ability to received and parse json
// options are passed as argusments e.g. no json file bigger than 1mb
app.use(express.json({limit: '1mb'}));

// create an database to write to
const database = new Datastore('./data/database.db');
// load the database into memory. if it does not exist create the db.
database.loadDatabase();

app.get('/api', (request,response) => {
    // find (NeDB syntax) takes two arguments
    // the critieria to find, as an object (left empty here)
    // a callback function (itself with two arguments)
    database.find({},(err, data)=> {
        // some error handling.
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
});

// create a route to 'api" via the the POST method
// request has all the http request from the client
// response is the variable the server will send back to the client
app.post('/api', (request,response) => {
    // Console.log the request from the client to the server console to check
    console.log('I got a request!');

    const data = request.body
    // create a timestamp
    const timestamp = Date.now();
    // assign timestamp to data object
    data.timestamp = timestamp;
    
    // pushing data to the array
    database.insert(data);

    // complete the response
    response.json(data);
}); 

// SInce CORS are deactivated on Dark Sky, ths is where a proxy request can be made
// on behalf of the client
// lat and lon are passed by the client (see /:latlon, Express syntax)
// the call to Dark Sky is made on behalf of the client
// the json result from Dark Sky is returned to the client

app.get('/weather/:latlon', async (request,response) => {
    // request parameters are past through the params property of the request object
    // They are split into an array on the comma
    const latlon = request.params.latlon.split(',');
    const lat = latlon[0];
    const lon = latlon[1];
    const api_key = process.env.API_KEY;
    const weather_url = `https://api.darksky.net/forecast/${api_key}/${lat},${lon}?units=si`;
    const weather_response = await fetch(weather_url);
    const weather_data = await weather_response.json();

    // get air quality from openap (no api key needed)
    const aq_url = `https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`;
    const aq_response = await fetch(aq_url);
    const aq_data = await aq_response.json();

    // compile weather and air quality data into one single object
    const data = {
        weather: weather_data,
        air_quality: aq_data
    };
    // send data object comprising weather and air quality data back to the client
    response.json(data);
});