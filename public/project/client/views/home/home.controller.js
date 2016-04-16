/**
 * Created by Dhruv on 4/9/2016.
 */
/**
 * Created by Dhruv on 3/2/2016.
 */
(function() {
    angular
        .module("RentOutApp")
        .controller("HomeController",HomeController);

    function HomeController( $location, ApartmentService) {
        var vm = this;
        var SEARCH_URL = "https://api.9flats.com/api/v4/places?client_id=9SDO9JGSYZiwc9S89yjW5c883Lbj0AopNdVnhS3l&search[query]=SEARCHQUERY";
        vm.searchPlaces = searchPlaces;
        vm.findDetailsById = findDetailsById;
        function searchPlaces(search) {
            var query = search.place;
            ApartmentService.findApartmentsByQuery(query,renderDetails);

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