/**
 * Created by Dhruv on 3/3/2016.
 */
(function() {
    angular
        .module("RentOutApp")
        .controller("ApartmentDetailsController",ApartmentDetailsController);

    function ApartmentDetailsController($scope, $location, $routeParams, ApartmentService) {
        var apartmentId = $routeParams.apartmentId;
        console.log(apartmentId);
        ApartmentService.findApartmentDetails(apartmentId,renderDetails);


        function renderDetails(apartmentDetails) {
            console.log(apartmentDetails.place.place_details);
            $scope.apartment = apartmentDetails.place.place_details;
        }
    }


})();