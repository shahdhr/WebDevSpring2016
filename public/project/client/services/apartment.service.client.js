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
            {	"_id":123, "apartmentTitle":"Kingfisher Villa",            "description":"Wonderland",
                "address":"alice",  "ownerId":"123"   },
            {	"_id":234, "apartmentTitle":"12 Woodward",            "description":"Wonderland",
                "address":"alice",  "ownerId":"234"   },
            {	"_id":345, "apartmentTitle":"75 St. Alphonsus",            "description":"Wonderland",
                "address":"alice",  "ownerId":"345"   },
            {	"_id":456, "apartmentTitle":"CityView 1016",            "description":"Wonderland",
                "address":"alice",  "ownerId":"456"   },
            {	"_id":567, "apartmentTitle":"Malden Apartments 201",            "description":"Wonderland",
                "address":"alice",  "ownerId":"567"   },
        ];

        var api = {
            findApartmentsByQuery: findApartmentsByQuery,
            findApartmentDetailsById: findApartmentDetailsById,
            createApartment : createApartment
        };
        return api;

        function findApartmentsByQuery(query,callback) {
            $http.get("/api/search/place/"+query)
                .success(callback);
        }

        function findApartmentDetailsById(id,callback) {
            $http.get("/api/search/place/details/"+id)
                .success(callback);
        };

        function createApartment(apartment,callback)  {
                apartment._id = (new Date()).getTime();
                apartments[apartments.length] = apartment;
                callback(apartment);

        }







    }
})();
