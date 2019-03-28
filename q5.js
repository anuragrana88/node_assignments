var tinyurl = require('tinyurl');
var handlebars = require('handlebars');
var fs = require('fs');
var request = require('request');

var imageURLs = ['https://doodleart.redbull.com/assets/managed/entries/processed/sm/367010617181759_36211000.jpg',
    'https://www.justcolor.net/wp-content/uploads/sites/1/nggallery/doodle-art-doodling/coloring-page-adults-doodle-art-rachel.jpg', 'https://i.pinimg.com/originals/e5/55/a3/e555a39ca5457a079a9bcce59f61f8d5.jpg'
    , 'http://canhotopazelite.info/wp-content/uploads/2018/08/office-bay-decoration-themes-with-office-bay-decoration-themes-elegant-yet-fun-office-bay-decoration-14.jpg',
    'https://i.pinimg.com/originals/ef/4c/91/ef4c91fb73e61e19211a0589187ccaa6.jpg', 'https://static.vecteezy.com/system/resources/previews/000/107/464/non_2x/huge-doodle-vector-pack.jpg'
    , 'https://media.glassdoor.com/l/e9/c1/7a/84/independence-day-celebration.jpg', 'https://i.ytimg.com/vi/O5u1apUkYV0/maxresdefault.jpg'];


var context = [];
var promises = [];

var getData = function (imageURL) {
    return new Promise(function (resolve, reject) {
        tinyurl.shorten(imageURL, function (res) {
            resolve({
                'BigURL': imageURL,
                'TinyURL': res
            });
        });
    });
};

for (var i = 0; i < imageURLs.length; i++) {
    promises.push(getData(imageURLs[i]));
}

Promise.all(promises).then(function (results) {
    var source = '"BigURL","TinyURL"\r\n' +
        '{{#each this}}"{{BigURL}}","{{TinyURL}}"{{#if @last}}{{else}}\r\n{{/if}}{{/each}}';
    var template = handlebars.compile(source);
    var csvData = template(results);
    fs.writeFile(__dirname + '/output/q5.csv', csvData, 'utf8', (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    })
});