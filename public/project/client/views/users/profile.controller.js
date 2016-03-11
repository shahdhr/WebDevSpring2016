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
        $scope.removeFavourite = removeFavourite;
        $scope.listApartment = listApartment;


        //Event handler implementations
        function update(user) {
            UserService.updateUser(user._id, user, updateCallback);

        }

        function showFavourites() {
            var user = UserService.getCurrentUser();
            $scope.favoritedApartments = [];
            if(user.favourites.length > 0) {
                for(var index = 0; index<user.favourites.length;index++) {
                    ApartmentService.findApartmentDetailsById(user.favourites[index],showFavouritesCallback)
                }
            } else {
                $scope.favoritedApartments = [];
            }
        }

        function removeFavourite(id) {
            console.log(id);
            var user = UserService.getCurrentUser();
            var index = user.favourites.indexOf(id);
            user.favourites.splice(index,1);
            UserService.updateUser(user._id,user,removeFavouriteCallback);


        }

        function listApartment() {
            $location.path("/apartment")
        }




        //callback functions
        function updateCallback(user) {
            console.log(user);
            $scope.updateMessage = "Profile updated successfully."
        }

        function showFavouritesCallback(apartment) {
            $scope.favoritedApartments.push(apartment.place.place_details);
        }

        function removeFavouriteCallback(user) {
            console.log("remove callback")
            console.log(user.favourites);
            showFavourites();
        }
    }
})();