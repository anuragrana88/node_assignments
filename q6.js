var request = require('request');
var dotenv = require('dotenv').config();

var options = {
    url: 'https://api.integrator.io/v1/connections',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.API_KEY
    }
};

//look for all connections via IO API
request(options, function (error, response, body) {
    console.log('Status: ' + response.statusCode);
    console.log(body);
});