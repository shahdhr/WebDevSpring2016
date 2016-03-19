/**
 * Created by Dhruv on 3/4/2016.
 */
"use strict";
(function() {
    angular
        .module("RentOutApp")
        .controller("LoginController",LoginController)

    function LoginController($scope, $location, UserService, $rootScope) {

        //Even handler declarations
        $scope.login = login;
        $scope.$location = $location;


        //Event handler implemntations
        function login(user) {
            UserService.findUserByCredentials(user.username,user.password,loginCallback);
        }


        //Callback functions
        function loginCallback(user) {
            if(user!=null) {
                UserService.setCurrentUser(user);
                $location.path('/profile');
            }
            else {
                $scope.loginFailed = "Login failed. Invalid username or password."
            }

        }
    }
})();