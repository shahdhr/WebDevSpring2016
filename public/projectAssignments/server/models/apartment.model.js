/**
 * Created by Dhruv on 3/25/2016.
 */
"use strict";
module.exports = function() {
    var apartments = require("./apartment.mock.json");

    var api = {
        findApartmentsByQuery: findApartmentsByQuery,
        findApartmentDetailsById: findApartmentDetailsById,
        addApartment : addApartment,
        findAllApartmentsForUser  : findAllApartmentsForUser ,
        deleteApartmentById : deleteApartmentById,
        updateApartmentById : updateApartmentById
    };
    return api;

    function findApartmentsByQuery(query,callback) {
        $http.get("/api/search/place/"+query)
            .success(callback);
    }

    function findAllApartmentsForUser (ownerId) {
        var userApartments = [];
        for(var index=0;index<apartments.length;index++) {
            if(apartments[index].ownerId == ownerId) {
                userApartments.push(apartments[index]);
            }
        }
        return userApartments;
    }

    function findApartmentDetailsById(id,callback) {
        $http.get("/api/search/place/details/"+id)
            .success(callback);
    };

    function addApartment(apartment)  {
        apartment._id = (new Date()).getTime();
        apartments[apartments.length] = apartment;
        console.log(apartments);
        return apartment

    }

    function deleteApartmentById(apartmentId) {
        for(var index=0;index<apartments.length;index++) {
            if(apartments[index]._id == apartmentId) {
                apartments.splice(index,1);
                break;
            }
        }
        return apartments
    }

    function updateApartmentById(apartmentId, newApartment) {
        for(var index=0;index<apartments.length;index++) {
            if(apartments[index]._id == apartmentId) {
                apartments[index]._id = apartmentId;
                newApartment._id = apartmentId;
                apartments[index].title = newApartment.title;
                apartments[index].bedrooms = newApartment.bedrooms;
                apartments[index].description = newApartment.description;
                break;
            }
        }
        return newApartment;
    }
};