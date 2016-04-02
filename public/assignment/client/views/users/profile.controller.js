/**
 * Created by Dhruv on 2/22/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController)

    function ProfileController(UserService) {
        var vm = this;
        // currently logged in user
        var currentUser = UserService.getCurrentUser();
        vm.user = currentUser;




        //Even handler declarations
        vm.update = update;


        //Event handler implementations
        function update(user) {
            console.log(user);
            var updatedUser = {
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phones: user.phones
            };
            console.log(updatedUser);
            UserService
                .updateUser(user._id, updatedUser)
                .then(updateCallback);

        }


        //callback functions
        function updateCallback(user) {
            console.log(user);
            vm.updateMessage = "Profile updated successfully.";
            UserService
                .findUserByCredentials(currentUser.username,currentUser.password)
                .then(function(user){
                    console.log("update response");
                    console.log(user);
                    UserService.setCurrentUser(user.data);
                });
        }
    }
})();
