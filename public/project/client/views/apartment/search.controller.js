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
        vm.previousPage = previousPage;
        vm.nextPage = nextPage;
        vm.findDetailsByDBId = findDetailsByDBId;
        vm.searchPlaces = searchPlaces;
        vm.findDetailsById = findDetailsById;




        function init() {
            ApartmentService.findApartmentsByQuery(searchQuery,renderDetails);
            ApartmentService.getAllApartments()
                .then(searchDBApartments);
        }
        init();



        function searchPlaces(search) {
            vm.places = null;
            var query = search.place;
            searchQuery = query;
            $routeParams.searchPlace = query;
            ApartmentService.findApartmentsByQuery(query,renderDetails);
            ApartmentService.getAllApartments()
                .then(searchDBApartments);

        }

        function previousPage() {
            if(vm.current_page > 1) {
                var pre = vm.current_page-1;
                var query = vm.search.place +"&search[page]="+ pre;
                ApartmentService.findApartmentsByQuery(query,renderDetails);
            }
        }

        function nextPage() {
            console.log("here next");
            console.log(vm.current_page);
            if(!vm.current_page < 20) {
                var next = vm.current_page+1;
                var query = vm.search.place +"&search[page]="+ next;
                ApartmentService.findApartmentsByQuery(query,renderDetails);
            }
        }

        function  renderDetails(response) {
            if(response.places.length > 0) {
                setMapMarkers(response.places);
            }

            vm.places = response.places;
            //vm.pages = response.total_pages;
            vm.total_entries = response.total_entries;
            vm.current_page = response.current_page;
            vm.total_pages = response.total_pages;


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

                marker.bindPopup("<h4><a class='truncate_property_title' href='#/details/"+ places[i].place.place_details.id +"'>"+places[i].place.place_details.name+"</a></h4><h5>Bedroom :"+places[i].place.place_details.number_of_bedrooms+", Bath :"+ places[i].place.place_details.number_of_bathrooms+"</h5>");
                var bound = [Number(places[i].place.place_details.lat),Number(places[i].place.place_details.lng)];

                bounds.push(bound);
            }
            mymap.fitBounds(bounds);
        }

        function searchDBApartments(res) {
            if (searchQuery.length > 0) {
                vm.dbApartments = _.filter(res.data, function (apartment) {
                    return (apartment.title +" "+apartment.city+" "+apartment.country)
                            .toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0;
                });

            }
        }

        function findDetailsByDBId(id) {
            $location.path("/details/rentOut/"+id);
        }






    }
})();