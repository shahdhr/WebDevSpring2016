/**
 * Created by Dhruv on 3/25/2016.
 */
"use strict";
var q = require("q");
module.exports = function(db,mongoose) {
    //var apartments = require("./apartment.mock.json");
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
        getAllCities : getAllCities
    };
    return api;

    // functions accessing the api
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
        //var userApartments = [];
        //for(var index=0;index<apartments.length;index++) {
        //    if(apartments[index].ownerId == ownerId) {
        //        userApartments.push(apartments[index]);
        //    }
        //}
        //return userApartments;
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
        //apartment._id = (new Date()).getTime();
        //apartments[apartments.length] = apartment;
        //console.log(apartments);
        //return apartment
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
        //for(var index=0;index<apartments.length;index++) {
        //    if(apartments[index]._id == apartmentId) {
        //        apartments.splice(index,1);
        //        break;
        //    }
        //}
        //return apartments
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
        //for(var index=0;index<apartments.length;index++) {
        //    if(apartments[index]._id == apartmentId) {
        //        apartments[index]._id = apartmentId;
        //        newApartment._id = apartmentId;
        //        apartments[index].title = newApartment.title;
        //        apartments[index].bedrooms = newApartment.bedrooms;
        //        apartments[index].description = newApartment.description;
        //        break;
        //    }
        //}
        //return newApartment;
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
};