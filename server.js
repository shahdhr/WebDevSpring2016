var express = require('express');
var http = require('https');
var app = express();
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var SEARCH_QUERY_URL = "https://api.9flats.com/api/v4/places?client_id=9SDO9JGSYZiwc9S89yjW5c883Lbj0AopNdVnhS3l&search[query]=SEARCHQUERY";
var SEARCH_BY_ID_URL = "https://api.9flats.com/api/v4/places/PLACEID?&client_id=9SDO9JGSYZiwc9S89yjW5c883Lbj0AopNdVnhS3l";

//List of Apartments for a given query
app.get('/api/search/place/:query', function(req, res){
    var url = SEARCH_QUERY_URL.replace("SEARCHQUERY",req.params.query);
    console.log(url);
    callback = function(response) {

        var str = '';
        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            res.send(str);
        });

    };

    http.get(url, callback).end();
});

//Apartment details for a give Apartment id
app.get('/api/search/place/details/:placeId', function(req, res){
    var url = SEARCH_BY_ID_URL.replace("PLACEID",req.params.placeId);
    console.log(url);
    callback = function(response) {

        var str = '';
        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {

            res.send(str);
        });

    };

    http.get(url, callback).end();
});

app.listen(port, ipaddress);
