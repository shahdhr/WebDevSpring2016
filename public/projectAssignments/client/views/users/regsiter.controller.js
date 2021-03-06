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



        //Event handler implementations
        function register (user) {
            UserService.createUser(user)
                .then(registerCallback);
        }



        //Callback functions
        function registerCallback(user) {
            UserService.setCurrentUser(user.data);
            $location.path('/profile');
            console.log(user.data);
        }
    }
})();