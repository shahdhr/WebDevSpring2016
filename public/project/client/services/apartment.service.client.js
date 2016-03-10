/**
 * Created by Dhruv on 3/3/2016.
 */
"use strict";
(function() {
    angular
        .module("RentOutApp")
        .factory("ApartmentService",ApartmentService);

    function ApartmentService($http) {

        var apartments = [
            {	"_id":123, "title":"Kingfisher Villa", bedrooms: 5,   "description":"Wonderland",
                "address":"",  "ownerId":123   },
            {	"_id":234, "title":"12 Woodward",   bedrooms: 5,  "description":"Wonderland",
                "address":"",  "ownerId":234   },
            {	"_id":345, "title":"75 St. Alphonsus",  "description":"Wonderland",
                "address":"",  "ownerId":345   },
            {	"_id":456, "title":"CityView 1016", bedrooms: 5,  "description":"Wonderland",
                "address":"",  "ownerId":456   },
            {	"_id":567, "title":"Malden Apartments 201",   bedrooms: 5,  "description":"Wonderland",
                "address":"",  "ownerId":567   },
        ];

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

        function findAllApartmentsForUser (ownerId,callback) {
            var userApartments = [];
            for(var index=0;index<apartments.length;index++) {
                if(apartments[index].ownerId == ownerId) {
                    userApartments.push(apartments[index]);
                }
            }
            callback(userApartments);
        }

        function findApartmentDetailsById(id,callback) {
            $http.get("/api/search/place/details/"+id)
                .success(callback);
        };

        function addApartment(apartment,callback)  {
            apartment._id = (new Date()).getTime();
            apartments[apartments.length] = apartment;
            console.log(apartments);
            callback(apartment);

        }

        function deleteApartmentById(apartmentId, callback) {
            for(var index=0;index<apartments.length;index++) {
                if(apartments[index]._id == apartmentId) {
                    apartments.splice(index,1);
                    break;
                }
            }
            callback(apartments);
        }

        function updateApartmentById(apartmentId, newApartment, callback) {
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
            callback(newApartment);
        }







    }
})();
