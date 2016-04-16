/**
 * Created by Dhruv on 3/3/2016.
 */
"use strict";
(function() {
    angular
        .module("RentOutApp")
        .factory("ApartmentService",ApartmentService);

    function ApartmentService($http) {


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

        function findApartmentDetailsById(id,callback) {
            $http.get("/api/search/place/details/"+id)
                .success(callback);
        }

        function findAllApartmentsForUser (ownerId) {
            console.log("")
           return $http.get("/api/projectAssignments/user/"+ownerId+"/apartment");
        }



        function addApartment(apartment)  {
           return $http.post("/api/projectAssignments/user/"+apartment.ownerId+"/apartment",apartment);

        }

        function deleteApartmentById(apartmentId) {
            return $http.delete("/api/projectAssignments/apartment/"+apartmentId);
        }

        function updateApartmentById(apartmentId, newApartment) {
            return $http.put("/api/projectAssignments/apartment/"+apartmentId,newApartment);
        }







    }
})();
