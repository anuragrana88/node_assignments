var request = require('request');
var fs = require('fs');

request.get('http://www.google.com').on('response', function (response) {
    console.log(response.statusCode);
}).pipe(fs.createWriteStream(__dirname + '/output/q3.html'));