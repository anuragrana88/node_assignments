var async = require('async');
var fs = require('fs');
var request = require('request');

var imageURLs = ['https://doodleart.redbull.com/assets/managed/entries/processed/sm/367010617181759_36211000.jpg',
    'https://www.justcolor.net/wp-content/uploads/sites/1/nggallery/doodle-art-doodling/coloring-page-adults-doodle-art-rachel.jpg', 'https://i.pinimg.com/originals/e5/55/a3/e555a39ca5457a079a9bcce59f61f8d5.jpg'
    , 'http://canhotopazelite.info/wp-content/uploads/2018/08/office-bay-decoration-themes-with-office-bay-decoration-themes-elegant-yet-fun-office-bay-decoration-14.jpg',
    'https://i.pinimg.com/originals/ef/4c/91/ef4c91fb73e61e19211a0589187ccaa6.jpg', 'https://static.vecteezy.com/system/resources/previews/000/107/464/non_2x/huge-doodle-vector-pack.jpg'
    , 'https://media.glassdoor.com/l/e9/c1/7a/84/independence-day-celebration.jpg', 'https://i.ytimg.com/vi/O5u1apUkYV0/maxresdefault.jpg'];

console.log(imageURLs.length);
var count = 0;

async.eachOf(imageURLs, function (singleURL, key, callback) {
    if (count !== 5) {
        request(singleURL).pipe(fs.createWriteStream(__dirname + '/output/images/' + key + '.jpg'));
        count = count + 1;
    } else {
        request(singleURL).pipe(fs.createWriteStream(__dirname + '/output/images2/' + key + '.jpg'));
    }
    callback();
}, function (err) {
    if (!err)
        console.log('Done!');
});