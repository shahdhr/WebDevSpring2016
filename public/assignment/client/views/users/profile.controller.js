/**
 * Created by Dhruv on 2/22/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController)

    function ProfileController($scope, $location, UserService, $rootScope) {

        // currently logged in user
        var currentUser = UserService.getCurrentUser();
        $scope.user = currentUser;


        //Even handler declarations
        $scope.update = update;


        //Event handler implementations
        function update(user) {
            UserService
                .updateUser(user._id, user)
                .then(updateCallback);

        }


        //callback functions
        function updateCallback(user) {
            console.log(user);
            $scope.updateMessage = "Profile updated successfully."
        }
    }
})();
