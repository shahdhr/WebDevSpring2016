/**
 * Created by Dhruv on 4/16/2016.
 */
"use strict";
(function () {
    angular
        .module("RentOutApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($location, UserService, $rootScope, ApartmentService,BookingService) {
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
        vm.formatDate = formatDate;
        vm.removeBooking = removeBooking;
        vm.updateProfilePic = updateProfilePic;
        vm.showFileChoosing = false;
        vm.updateProfilePicBtn = "Change";
        vm.messages = messages;


        //Event handler implementations
        function removeBooking(id) {
            BookingService.deleteBookingById(id)
                .then(function (res) {
                    findAllBookingsForUser();
                })
        }

        function updateProfilePic() {
            if(vm.showFileChoosing) {
                var user = UserService.getCurrentUser();
                UserService.updateProfilePicture(
                    user._id,
                    vm.fileModel
                ).then(function successCallback(response) {
                    $rootScope.newUser.profilePicUrl = response.data;
                    UserService.setCurrentUser($rootScope.newUser);
                    vm.user = UserService.getCurrentUser();
                    vm.showFileChoosing = false
                    vm.updateProfilePicBtn = "Change";

                });
            } else {
                vm.showFileChoosing = true;
                vm.updateProfilePicBtn = "Update";
            }

        }


        function formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [year, month, day].join('-');
        }



        function findApartmentDetailsById(apartment) {
            if(apartment.id) {
                $location.path("/details/"+apartment.id);
            } else if(apartment._id) {
                $location.path("/details/rentOut/"+apartment._id)
            }

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

        function findAllBookingsForUser() {
            var user = UserService.getCurrentUser();
            if(user) {
                BookingService.findAllBookingsForUser(user._id)
                    .then(function (resp) {
                        console.log("booking");
                        console.log(resp.data);
                        //vm.userBooking = resp.data
                        getUpcomingBookings(resp.data);
                    });
            }
        } findAllBookingsForUser();

        function getUpcomingBookings(allBookings) {
            var upcoming = [];
            for(var i = 0;i<allBookings.length;i++) {
                console.log(Date.parse(allBookings[i].startDate));
                console.log(Date.now());
                if(Date.parse(allBookings[i].startDate) > Date.now()) {
                    upcoming.push(allBookings[i]);
                }
            }
            vm.userBooking = upcoming;
        }


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

        function messages() {
            $location.path("/message");
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