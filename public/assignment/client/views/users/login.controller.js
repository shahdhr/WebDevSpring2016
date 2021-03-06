/**
 * Created by Dhruv on 2/23/2016.
 */
"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController)

    function LoginController( $location, UserService, $rootScope) {

        var vm = this;
        //Even handler declarations
        vm.login = login;
        vm.$location = $location;


        //Event handler implemntations
        function login(user) {
            UserService
                .findUserByCredentials(user.username,user.password)
                .then(loginCallback);
        }


        //Callback functions
        function loginCallback(user) {
            if(user!=null) {
                UserService.setCurrentUser(user.data);
                console.log(user);
                $location.path('/profile');
            }
            else {
                vm.loginFailed = "Login failed. Invalid username or password."
            }

        }
    }
})();
