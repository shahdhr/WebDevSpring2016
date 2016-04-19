/**
 * Created by Dhruv on 4/9/2016.
 */
/**
 * Created by Dhruv on 3/2/2016.
 */
"use strict";
(function() {
    angular
        .module("RentOutApp")
        .controller("HomeController",HomeController);

    function HomeController( $location, ApartmentService) {

        var vm = this;
        var SEARCH_URL = "https://api.9flats.com/api/v4/places?client_id=9SDO9JGSYZiwc9S89yjW5c883Lbj0AopNdVnhS3l&search[query]=SEARCHQUERY";
        vm.searchPlaces = searchPlaces;
        vm.cityClick = cityClick;
        vm.findDetailsById = findDetailsById;
        vm.updateCities=updateCities;
        vm.findCities=findCities;
        var allCities=[];
        vm.allCities=[];
        getAllCities();



        function getAllCities() {
            ApartmentService.getAllCities()
                .then(function(res) {
                    console.log(res);

                    _.forEach(res.data,function(city){
                        allCities.push(city.city);
                    })

                })
        }

        function searchPlaces(search) {
            ApartmentService.setSearchQuery(search);
            $location.path("/search/"+search.place);
            //ApartmentService.findApartmentsByQuery(query,renderDetails);

        }

        function updateCities(searchTerm) {
            if (searchTerm.length > 0) {
                vm.allCities = _.filter(allCities, function (city) {
                    return city.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
                })
            }
        }

        function findCities(search) {
            ApartmentService.setSearchQuery(search);
            $location.path("/search/"+search);

        }

        function cityClick(city) {
            var search = {
                place:city
            };
            searchPlaces(search);
        }

        function  renderDetails(response) {
            console.log(response);

            //vm.places = response.places;
        }

        function findDetailsById(id) {
            $location.path("/details/"+id);
        }
    }
})();