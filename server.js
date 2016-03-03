var express = require('express');
var http = require('https');
var app = express();
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.get('/hello', function(req, res){

    callback = function(response) {
        console.log(response);
        var str = '';
        response.on('data', function (chunk) {
            str += chunk;
            console.log(chunk);
        });

        response.on('end', function () {
            console.log(str);
            res.send(str);
        });
    };

    http.get('https://api.9flats.com/api/v4/places?client_id=9SDO9JGSYZiwc9S89yjW5c883Lbj0AopNdVnhS3l&search[query]=Mumbai', callback).end();


});

var options = {
    host: 'https://api.9flats.com',
    path: '/api/v4/places?client_id=9SDO9JGSYZiwc9S89yjW5c883Lbj0AopNdVnhS3l&search[query]=Mumbai'
};
app.listen(port, ipaddress);
