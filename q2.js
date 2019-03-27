var handlebars = require('handlebars');
var fs = require('fs');

var context = [{
    "baseId": "1",
    "feature": {"1": "parent", "2": "first entry"},
    "contentType": {"1": {"value": "pure"}, "2": {"value": "mix"}},
    "isActive": true,
    "childProducts": [{"baseId": "1-1", "isActive": true}, {"baseId": "1-2", "isActive": false}, {
        "baseId": "1-3",
        "isActive": true
    }, {
        "baseId": "1-4",
        "isActive": true,
        "feature": {"1": "parent", "2": "first entry"},
        "searchTerms": {"0": "glue", "1": "adhesive", "2": "stick"}
    }]
}, {
    "baseId": "10",
    "isActive": true,
    "searchTerms": {"0": "glue", "1": "adhesive", "2": "stick"},
    "childProducts": [{"baseId": "10-1", "isActive": true, "searchTerms": {"0": "glue"}}, {
        "baseId": "10-2",
        "isActive": false
    }, {"baseId": "10-3", "isActive": true}, {"baseId": "10-4", "isActive": true}]
}];
var source = '<products>\n {{#each this}}' +
    '\t<product>\n' +
    '\t\t<baseId>{{baseId}}</baseId>\n' +
    '\t\t<isActive>{{isActive}}</isActive>\n' +
    '\t\t<contentType>\n' +
    '{{#each contentType}}\t\t\t<contentTypeValue>{{this.value}}</contentTypeValue>\n{{/each}}' +
    '\t\t</contentType>\n' +
    '\t\t<features>\n' +
    '{{#each feature}}\t\t\t<feature>{{this}}</feature>\n{{/each}}' +
    '\t\t</features>\n' +
    '\t\t<searchTerms>\n' +
    '{{#each searchTerms}}\t\t\t<searchTermValue>{{this}}</searchTermValue>\n{{/each}}' +
    '\t\t</searchTerms>\n' +
    '\t\t<childProducts>\n{{#each childProducts}}' +
    '\t\t\t<childProduct>\n' +
    '\t\t\t\t<baseId>{{baseId}}</baseId>\n' +
    '\t\t\t\t<isActive>{{isActive}}</isActive>\n' +
    '\t\t\t\t<features>\n' +
    '{{#each feature}}\t\t\t\t\t<feature>{{this}}</feature>\n{{/each}}' +
    '\t\t\t\t</features>\n' +
    '\t\t\t\t<searchTerms>\n' +
    '{{#each searchTerms}}\t\t\t\t\t<searchTermValue>{{this}}</searchTermValue>\n{{/each}}' +
    '\t\t\t\t</searchTerms>\n' +
    '\t\t\t</childProduct>\n{{/each}}' +
    '\t\t</childProducts>\n' +
    '\t</product>\n {{/each}}' +
    '</products>\n';

var template = handlebars.compile(source);
var output = template(context);
console.log(output);

fs.writeFile(__dirname + '/output/q2.xml', output, function (err) {
    if (err)
        console.log('Error: ' + err);
});