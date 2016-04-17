/**
 * Created by Dhruv on 4/16/2016.
 */
"use strict";
(function() {
    angular
        .module("RentOutApp")
        .controller("SearchController",SearchController);

    function SearchController( $location, ApartmentService) {
        var vm = this;
        var searchQuery = ApartmentService.getSearchQuery();
        console.log(searchQuery);
        function init() {
            ApartmentService.findApartmentsByQuery(searchQuery.place,renderDetails);
        }
        if(searchQuery){
            init();
        }

        vm.searchPlaces = searchPlaces;
        vm.findDetailsById = findDetailsById;
        function searchPlaces(search) {
            vm.places = null;
            var query = search.place;
            ApartmentService.findApartmentsByQuery(query,renderDetails);

        }

        function  renderDetails(response) {
            console.log(response);
            vm.places = response.places;
        }

        function findDetailsById(id) {
            $location.path("/details/"+id);
        }

    }
})();