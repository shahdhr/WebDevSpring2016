var express = require('express');
var http = require('https');
var app = express();
var bodyParser    = require('body-parser');
var multer        = require('multer');
var passport = require('passport');
var session       = require('express-session');
var cookieParser  = require('cookie-parser');
var mongoose      = require('mongoose');
//While running on local host

var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://127.0.0.1:27017/cs5610FormMaker';


// connect to the database
var db = mongoose.connect(connectionString);
var uuid = require('node-uuid');

app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});
var upload = multer({storage: storage});


require("./public/assignment/server/app.js")(app,uuid, db, mongoose);
require("./public/projectAssignments/server/app.js")(app,uuid);
require("./public/project/server/app.js")(app,db, mongoose,upload);

//9Flats api
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
