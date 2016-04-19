/**
 * Created by Dhruv on 4/16/2016.
 */
"use strict";
(function() {
    angular
        .module("RentOutApp")
        .controller("SearchController",SearchController);

    function SearchController( $location, ApartmentService,$routeParams) {
        var vm = this;
        var bounds = [];
        var searchQuery = $routeParams.searchPlace;
        console.log(searchQuery);
        vm.search = {
            place:searchQuery
        };





        function init() {
            ApartmentService.findApartmentsByQuery(searchQuery,renderDetails);
        }
        init();


        vm.searchPlaces = searchPlaces;
        vm.findDetailsById = findDetailsById;
        function searchPlaces(search) {
            vm.places = null;
            var query = search.place;
            ApartmentService.findApartmentsByQuery(query,renderDetails);

        }



        function  renderDetails(response) {
            setMapMarkers(response.places);
            vm.places = response.places;
        }

        function findDetailsById(id) {
            $location.path("/details/"+id);
        }

        //map
        var mymap = L.map('map');
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            maxZoom: 18
        }).addTo(mymap);

        function setMapMarkers(places) {

            for (var i = 0; i<places.length;i++) {

                var marker = L.marker([Number(places[i].place.place_details.lat),Number(places[i].place.place_details.lng)]).addTo(mymap);

                marker.bindPopup("<h1><a href='#/details/"+ places[i].place.place_details.id +"'>"+places[i].place.place_details.name+"</a></h1><h2>Bedroom :"+places[i].place.place_details.number_of_bedrooms+", Bath :"+ places[i].place.place_details.number_of_bathrooms+"</h2>");
                var bound = [Number(places[i].place.place_details.lat),Number(places[i].place.place_details.lng)];

                bounds.push(bound);
            }
            mymap.fitBounds(bounds);
        }






    }
})();