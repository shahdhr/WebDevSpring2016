/**
 * Created by Dhruv on 3/10/2016.
 */
"use strict";
(function () {
    angular
        .module("RentOutApp")
        .controller("ProfileController",ProfileController)

    function ProfileController($scope, $location, UserService, $rootScope, ApartmentService) {

        // currently logged in user
        var currentUser = UserService.getCurrentUser();
        $scope.favoritedApartments = [];
        $scope.user = currentUser;


        //Even handler declarations
        $scope.update = update;
        $scope.showFavourites = showFavourites;


        //Event handler implementations
        function update(user) {
            UserService.updateUser(user._id, user, updateCallback);

        }

        function showFavourites() {
            var user = UserService.getCurrentUser();

            for(var index = 0; index<user.favourites.length;index++) {
                var id=user.favourites[index];
                ApartmentService.findApartmentDetailsById(user.favourites[0],showFavouritesCallback);
                console.log("Hello loop");
            }


        }


        //callback functions
        function updateCallback(user) {
            console.log(user);
            $scope.updateMessage = "Profile updated successfully."
        }

        function showFavouritesCallback(apartment) {
            $scope.favoritedApartments.push(apartment.place.place_details);
        }
    }
})();