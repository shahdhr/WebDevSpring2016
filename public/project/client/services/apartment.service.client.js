/**
 * Created by Dhruv on 3/3/2016.
 */
"use strict";
(function() {
    angular
        .module("RentOutApp")
        .factory("ApartmentService",ApartmentService);

    function ApartmentService($http, $rootScope) {
        var api = {
            findApartmentsByQuery: findApartmentsByQuery,
            findApartmentDetailsById: findApartmentDetailsById,
            addApartment : addApartment,
            findAllApartmentsForUser  : findAllApartmentsForUser ,
            findApartmentDetailsByDbId:findApartmentDetailsByDbId,
            deleteApartmentById : deleteApartmentById,
            updateApartmentById : updateApartmentById,
            setSearchQuery : setSearchQuery,
            getSearchQuery : getSearchQuery,
            getAllCities : getAllCities,
            findAllApartments: findAllApartments,
            updateApartmentPicture:updateApartmentPicture,
            getAllApartments : getAllApartments
        };
        return api;

        function findApartmentsByQuery(query,callback) {
            $http.get("/api/search/place/"+query)
                .success(callback);
        }

        function updateApartmentPicture(apartmentId, file) {
            var fd = new FormData();
            fd.append('file', file);
            return $http.post('/api/project/apartment/pic/'+apartmentId, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            });
        }

        function findApartmentDetailsById(id,callback) {
            $http.get("/api/search/place/details/"+id)
                .success(callback);
        }

        function findAllApartmentsForUser (ownerId) {
           return $http.get("/api/project/user/"+ownerId+"/apartment");
        }

        function findAllApartments() {
            return $http.get("/api/admin/apartment");
        }

        function getAllApartments() {
            return $http.get("/api/project/apartment");
        }

        function addApartment(apartment)  {
           return $http.post("/api/project/user/"+apartment.ownerId+"/apartment",apartment);

        }

        function deleteApartmentById(apartmentId) {
            return $http.delete("/api/project/apartment/"+apartmentId);
        }

        function findApartmentDetailsByDbId(apartmentId) {
            return $http.get("/api/project/apartment/"+apartmentId);
        }

        function updateApartmentById(apartmentId, newApartment) {
            return $http.put("/api/project/apartment/"+apartmentId,newApartment);
        }


        function setSearchQuery(search) {
            $rootScope.searchQuery = search;
        }

        function getSearchQuery() {
            return $rootScope.searchQuery;
        }

        function getAllCities() {
            return $http.get("/api/project/cities");
        }
    }
})();
