/**
 * Created by Dhruv on 3/2/2016.
 */
(function() {
    angular
        .module("RentOutApp")
        .controller("HomeController",HomeController);

    function HomeController($scope, $location, $http) {
        var SEARCH_URL = "https://api.9flats.com/api/v4/places?client_id=9SDO9JGSYZiwc9S89yjW5c883Lbj0AopNdVnhS3l&search[query]=SEARCHQUERY";
        $scope.searchPlaces = searchPlaces;

        function searchPlaces(search) {
            var url = SEARCH_URL.replace("SEARCHQUERY",search.query);
            $http.get("/api/search/place")
                .success(renderDetails);
        }

        function  renderDetails(response) {
            console.log(response);
            $scope.places = response.places;
        }
    }
})();