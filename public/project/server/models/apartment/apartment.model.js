/**
 * Created by Dhruv on 3/25/2016.
 */
"use strict";
var q = require("q");
module.exports = function(db,mongoose) {
    var cities = require("./cities/cities.mock.json");
    var ApartmentSchema = require("./apartment.schema.server.js")(mongoose);
    var ApartmentModel = mongoose.model('ProjectApartment', ApartmentSchema);

    var api = {
        findApartmentsByQuery: findApartmentsByQuery,
        findApartmentDetailsById: findApartmentDetailsById,
        addApartment : addApartment,
        findAllApartmentsForUser  : findAllApartmentsForUser ,
        deleteApartmentById : deleteApartmentById,
        updateApartmentById : updateApartmentById,
        findApartmentByDbId : findApartmentByDbId,
        getAllCities : getAllCities,
        findAllApartments:findAllApartments,
        updateApartmentPic : updateApartmentPic

    };
    return api;

    // functions accessing the 9flats api
    function findApartmentsByQuery(query,callback) {
        $http.get("/api/search/place/"+query)
            .success(callback);
    }

    function findApartmentDetailsById(id,callback) {
        $http.get("/api/search/place/details/"+id)
            .success(callback);
    }

    //functions accessing the database
    function findAllApartmentsForUser (ownerId) {
        var deferred = q.defer();
        ApartmentModel.find({owner_id : ownerId}, function (err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                console.log("find all aprtments");
                console.log(doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }



    function addApartment(apartment)  {
        var deferred = q.defer();
        ApartmentModel.create(apartment,function(err,doc){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }

        });
        return deferred.promise;
    }

    function deleteApartmentById(apartmentId) {
        var deferred = q.defer();
        ApartmentModel.remove({_id: apartmentId},function(err,doc){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateApartmentById(apartmentId, newApartment) {
        if(newApartment._id){
            delete newApartment._id;
        }
        var deferred = q.defer();
        ApartmentModel.update({_id : apartmentId},{$set:newApartment}, function (err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findApartmentByDbId(apartmentId){
        var deferred = q.defer();
        ApartmentModel.findOne({_id:apartmentId}, function (err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function getAllCities() {
        return cities;
    }

    function findAllApartments() {
        var deferred = q.defer();
        ApartmentModel.find(function(err,doc){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateApartmentPic(id,apartmentPic) {
        var deferred = q.defer();

        ApartmentModel.update({_id:id},{$set:{featured_photo:apartmentPic}}, function (err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;

    }
};