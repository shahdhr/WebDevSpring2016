/**
 * Created by Dhruv on 4/16/2016.
 */
"use strict";
(function () {
    angular
        .module("RentOutApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($location, UserService, $rootScope, ApartmentService) {
        var vm = this;

        // currently logged in user
        var currentUser = UserService.getCurrentUser();
        vm.user = currentUser;


        //Even handler declarations
        vm.update = update;
        vm.showFavourites = showFavourites;
        vm.removeFavourite = removeFavourite;
        vm.listApartment = listApartment;
        vm.alertClosed = alertClosed;
        vm.findAllUserApartments = findAllUserApartments;
        vm.findApartmentDetailsById = findApartmentDetailsById;



        //Event handler implementations
        function findApartmentDetailsById(id) {
            $location.path("/details/"+id);
        }

        function findAllUserApartments() {
            var user = UserService.getCurrentUser();
            if(user) {
                ApartmentService.findAllApartmentsForUser(user._id)
                    .then(function (res) {
                        vm.userApartments = res.data;
                    });
            }
        }
        findAllUserApartments();



        function update(user) {
            UserService.updateUser(user._id, user)
                .then(updateCallback);

        }

        function showFavourites() {
            var user = UserService.getCurrentUser();
            if(user){
                vm.favoritedApartments = [];
                if(user.favourites.length > 0) {
                    for(var index = 0; index<user.favourites.length;index++) {
                        ApartmentService.findApartmentDetailsById(user.favourites[index],showFavouritesCallback);
                    }
                } else {
                    vm.favoritedApartments = [];
                }
            }
        }
        showFavourites();


        function removeFavourite(id) {
            console.log(id);
            var user = UserService.getCurrentUser();
            var index = user.favourites.indexOf(id);
            user.favourites.splice(index,1);
            UserService.updateUser(user._id,user)
                .then(function (res) {
                    showFavourites();
                });


        }

        function listApartment() {
            $location.path("/apartment")
        }


        function alertClosed() {
            vm.updateMessage = null;
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
            console.log("remove callback");
            console.log(user.favourites);
            showFavourites();
        }
    }
})();