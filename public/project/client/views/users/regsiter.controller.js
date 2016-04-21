/**
 * Created by Dhruv on 3/4/2016.
 */
"use strict";
(function() {
    angular
        .module("RentOutApp")
        .controller("RegisterController",RegisterController)

    function RegisterController($location, UserService, $rootScope) {
        var vm = this;
        //Event handler declarations;
        vm.register =register;
        vm.alertClosed = alertClosed;



        //Event handler implementations
        function register (user) {
            UserService.register(user)
                .then(registerCallback);
        }

        function alertClosed() {
            vm.showAlert = null;
        }


        //Callback functions
        function registerCallback(user) {
            if(!user.data.username){
                vm.showAlert = "Username already exists"
            } else {
                UserService.setCurrentUser(user.data);
                $location.path('/profile');
                console.log(user.data);
            }

        }
    }
})();