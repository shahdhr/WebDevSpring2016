/**
 * Created by Dhruv on 3/3/2016.
 */
(function() {
    angular
        .module("RentOutApp")
        .controller("ApartmentDetailsController",ApartmentDetailsController);

    function ApartmentDetailsController($scope, $location, $routeParams, ApartmentService,UserService) {
        var apartmentId = $routeParams.apartmentId;
        $scope.addApartmentToFavourites = addApartmentToFavourites;
        console.log(apartmentId);
        ApartmentService.findApartmentDetailsById(apartmentId,renderDetails);


        function renderDetails(apartmentDetails) {
            console.log(apartmentDetails.place.place_details);
            $scope.apartment = apartmentDetails.place.place_details;
        }

        function addApartmentToFavourites(apartment) {
            var user = UserService.getCurrentUser();
            user.favourites.push(apartment.id);
            UserService.updateUser(user._id, user, addApartmentToFavouritesCallback);

        }
        function addApartmentToFavouritesCallback(user) {
            console.log(user.favourites);
        }
    }


})();