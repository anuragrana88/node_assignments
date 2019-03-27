var parse = require('xml-parser');
var fs = require('fs');

var XmlParserHelper = function () {
    this.parseXML = function (options) {
        if (options.xmlData) {
            return parse(options.xmlData);
        } else {
            return new Error('Please provide an XML string');
        }
    };

    this.parseXMLFile = function (options) {
        if (options.filePath) {
            try {
                //deliberately using synchronous call
                var contents = fs.readFileSync(options.filePath, 'utf8');
                return parse(contents);
            } catch (e) {
                console.log('Error : ' + e);
            }
        } else {
            throw new Error('Please provide a XML file path');
        }
    };
};

var helper = new XmlParserHelper();
var options1 = {
    "xmlData": "\n" +
        "<?xml version=\"1.0\" encoding=\"UTF-8\"?><breakfast_menu><food><name>Belgian Waffles</name><price>$5.95</price><description>Two of our famous Belgian Waffles with plenty of real maple syrup</description><calories>650</calories></food><food><name>Strawberry Belgian Waffles</name><price>$7.95</price><description>Light Belgian waffles covered with strawberries and whipped cream</description><calories>900</calories></food><food><name>Berry-Berry Belgian Waffles</name><price>$8.95</price><description>Light Belgian waffles covered with an assortment of fresh berries and whipped cream</description><calories>900</calories></food><food><name>French Toast</name><price>$4.50</price><description>Thick slices made from our homemade sourdough bread</description><calories>600</calories></food><food><name>Homestyle Breakfast</name><price>$6.95</price><description>Two eggs, bacon or sausage, toast, and our ever-popular hash browns</description><calories>950</calories></food></breakfast_menu>\n"
};
console.log(JSON.stringify(helper.parseXML(options1)));

var options2 = {
    'filePath': (__dirname + '/sample/catalog.xml')
};

console.log(JSON.stringify(helper.parseXMLFile(options2)));