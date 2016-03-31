/**
 * Created by Dhruv on 2/22/2016.
 */
"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController)

    function RegisterController($location, UserService, $scope, $rootScope) {

        //Event handler declarations;
        $scope.register =register;



        //Event handler implementations
        function register (user) {
            UserService
                .createUser(user)
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
