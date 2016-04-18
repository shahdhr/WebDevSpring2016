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


        var mymap = L.map('map');

        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            maxZoom: 18
        }).addTo(mymap);

        var marker = L.marker([51.5, -0.09]).addTo(mymap);
        marker.bindPopup("<b>Hello world!</b><br>I am a popup.");

        var marker1 = L.marker([51.6, -0.09]).addTo(mymap);
        marker1.bindPopup("<b>Hello world!</b><br>I am a popup.");

        var bounds = [
            [51.5, -0.09],
            [51.6, -0.09],
        ];

        mymap.fitBounds(bounds);

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