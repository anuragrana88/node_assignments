var request = require('request');
var fs = require('fs');

request('http://www.google.com').pipe(fs.createWriteStream(__dirname + '/output/q3.html'));