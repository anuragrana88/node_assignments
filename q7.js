var request = require('request');
var dotenv = require('dotenv').config();

//Write nested callbacks to create our flow/import/export/connection documents
// in the required hierarchy and generate a legitimate flow.

//Step 1: Create a TBA NS connection
//Step 2: Create a NS export
//Step 3: Create a FTP connection
//Step 4: Create a FTP import
//Step 5: Create a flow

//All above steps in nested callbacks

var nsConnectionJSON = {
    "type": "netsuite",
    "name": "NetSuite - Anurag TBA",
    "netsuite": {
        "account": "TSTDRV840553",
        "environment": "production",
        "requestLevelCredentials": true,
        "dataCenterURLs": {
            "systemDomain": "https://tstdrv840553.app.netsuite.com",
            "webservicesDomain": "https://tstdrv840553.suitetalk.api.netsuite.com",
            "restDomain": "https://tstdrv840553.restlets.api.netsuite.com"
        },
        "tokenId": process.env.TOKEN_ID,
        "tokenSecret": process.env.TOKEN_SECRET,
        "wsdlVersion": "next",
        "concurrencyLevel": 1
    }
};

var exportJSON = {
    "name": "Assignment - Anurag NS Export",
    "_connectionId": "",
    "asynchronous": true,
    "sampleData": {
        "id": "80248",
        "recordType": "salesorder",
        "tranid": "2674",
        "datecreated": "3/25/2019 10:12 am",
        "total": "909.00",
        "customername": "padma jinka"
    },
    "netsuite": {
        "type": "restlet",
        "skipGrouping": false,
        "statsOnly": false,
        "restlet": {
            "recordType": "transaction",
            "searchId": "3831",
            "batchSize": 20,
            "hooks": {
                "batchSize": 20
            }
        },
        "distributed": {
            "disabled": false,
            "forceReload": false
        }
    },
    "transform": {
        "type": "expression",
        "expression": {
            "version": "1"
        },
        "version": "1"
    },
    "filter": {
        "type": "expression",
        "expression": {
            "rules": [],
            "version": "1"
        },
        "version": "1",
        "rules": []
    },
    "adaptorType": "NetSuiteExport"
};

var ftpConnectionJSON = {
    "type": "ftp",
    "name": "Anurag - Celigo FTP",
    "ftp": {
        "type": "ftp",
        "hostURI": "ftp.celigo.com",
        "username": "projects@ftp.celigo.com",
        "password": process.env.FTP_PASSWORD,
        "port": 21,
        "usePassiveMode": true
    }
};

var importJSON = {
    "name": "DF3 FTP Import",
    "responseTransform": {
        "type": "expression",
        "expression": {
            "version": "1"
        },
        "version": "1"
    },
    "parsers": [],
    "_connectionId": '',
    "distributed": false,
    "sandbox": false,
    "lookups": [],
    "mapping": {
        "fields": [
            {
                "extract": "tranid",
                "generate": "tranid"
            },
            {
                "extract": "datecreated",
                "generate": "datecreated"
            },
            {
                "extract": "total",
                "generate": "total"
            },
            {
                "extract": "customername",
                "generate": "customername"
            }
        ]
    },
    "file": {
        "skipAggregation": false,
        "type": "csv",
        "lookups": [],
        "csv": {
            "rowDelimiter": "\n",
            "columnDelimiter": ",",
            "includeHeader": false,
            "wrapWithQuotes": false,
            "replaceTabWithSpace": false,
            "replaceNewlineWithSpace": false
        }
    },
    "ftp": {
        "directoryPath": "/AnuragRana3",
        "fileName": "file-{{timestamp}}.csv"
    },
    "filter": {
        "type": "expression",
        "expression": {
            "rules": [],
            "version": "1"
        },
        "version": "1",
        "rules": []
    },
    "adaptorType": "FTPImport"
};

var flowJSON = {
    "name": "DF3 - Sales Data Export",
    "disabled": false,
    "_exportId": "",
    "_importId": "",
    "_integrationId": "5aec2848c8b96257ce589824",
    "skipRetries": false,
    "sandbox": false
};

//callback-hell example

//create NS connection
request({
        'url': 'https://api.integrator.io/v1/connections',
        'method': 'POST',
        'headers': {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + process.env.API_KEY},
        'body': nsConnectionJSON,
        'json': true
    },
    function (errNSCon, resNSCon, bodyNSCon) {
        if (errNSCon)
            console.log(errNSCon);
        //set connection id
        exportJSON['_connectionId'] = bodyNSCon['_id'];
        console.log('NS connection# ' + bodyNSCon['_id'] + ' created!');

        //create export
        request({
            'url': 'https://api.integrator.io/v1/exports',
            'method': 'POST',
            'headers': {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + process.env.API_KEY},
            'body': exportJSON,
            'json': true
        }, function (errNSExp, resNSExp, bodyNSExp) {
            if (errNSExp)
                console.log(errNSExp);
            console.log('NS Export# ' + bodyNSExp['_id'] + ' created!');

            //create FTP connection
            request({
                'url': 'https://api.integrator.io/v1/connections',
                'method': 'POST',
                'headers': {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + process.env.API_KEY},
                'body': ftpConnectionJSON,
                'json': true
            }, function (errFTPCon, resFTPCon, bodyFTPCon) {
                if (errFTPCon)
                    console.log(errFTPCon);
                //set connection id
                importJSON['_connectionId'] = bodyFTPCon['_id'];
                console.log('FTP connection# ' + bodyFTPCon['_id'] + ' created!');

                //create import
                request({
                    'url': 'https://api.integrator.io/v1/imports',
                    'method': 'POST',
                    'headers': {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + process.env.API_KEY},
                    'body': importJSON,
                    'json': true
                }, function (errFTPImp, resFTPImp, bodyFTPImp) {
                    if (errFTPImp)
                        console.log(errFTPImp);
                    console.log('FTP Import# ' + bodyFTPImp['_id'] + ' created!');
                    flowJSON['_exportId'] = bodyNSExp['_id'];
                    flowJSON['_importId'] = bodyFTPImp['_id'];

                    //create flow
                    request({
                        'url': 'https://api.integrator.io/v1/flows',
                        'method': 'POST',
                        'headers': {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + process.env.API_KEY
                        },
                        'body': flowJSON,
                        'json': true
                    }, function (errFlow, resFlow, bodyFlow) {
                        if (errFlow)
                            console.log(errFlow);
                        console.log('Flow# ' + bodyFlow['_id'] + ' created!');
                    });
                });

            });
        });
    });