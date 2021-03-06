/**
 * Created by Dhruv on 3/10/2016.
 */
"use strict";
(function () {
    angular
        .module("RentOutApp")
        .controller("ProfileController",ProfileController)

    function ProfileController($location, UserService, $rootScope, ApartmentService) {
        var vm = this;
        // currently logged in user
        var currentUser = UserService.getCurrentUser();
        console.log(currentUser);
        vm.favoritedApartments = [];
        vm.user = currentUser;


        //Even handler declarations
        vm.update = update;
        vm.showFavourites = showFavourites;
        vm.removeFavourite = removeFavourite;
        vm.listApartment = listApartment;


        //Event handler implementations
        function update(user) {
            UserService.updateUser(user._id, user, updateCallback);

        }

        function showFavourites() {
            var user = UserService.getCurrentUser();
            vm.favoritedApartments = [];
            if(user.favourites.length > 0) {
                for(var index = 0; index<user.favourites.length;index++) {
                    ApartmentService.findApartmentDetailsById(user.favourites[index],showFavouritesCallback)
                }
            } else {
                vm.favoritedApartments = [];
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
            vm.updateMessage = "Profile updated successfully."
        }

        function showFavouritesCallback(apartment) {
            vm.favoritedApartments.push(apartment.place.place_details);
        }

        function removeFavouriteCallback(user) {
            console.log("remove callback")
            console.log(user.favourites);
            showFavourites();
        }
    }
})();