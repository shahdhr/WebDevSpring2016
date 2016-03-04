/**
 * Created by Dhruv on 3/4/2016.
 */
"use strict";
(function() {
    angular
        .module("RentOutApp")
        .controller("RegisterController",RegisterController)

    function RegisterController($location, UserService, $scope, $rootScope) {

        //Event handler declarations;
        $scope.register =register;



        //Event handler implementations
        function register (user) {
            UserService.createUser(user,registerCallback);
        }



        //Callback functions
        function registerCallback(user) {
            UserService.setCurrentUser(user);
            $location.path('/profile');
            console.log(user);
        }
    }
})();