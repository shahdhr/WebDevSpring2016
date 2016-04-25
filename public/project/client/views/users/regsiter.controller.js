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
            console.log(user);
            var validated = true;
            $('#firstName-group').removeClass('has-error');
            $('#lastName-group').removeClass('has-error');
            $('#email-group').removeClass('has-error');
            $('#username-group').removeClass('has-error');
            $('#password-group').removeClass('has-error');
            $('#verifyPassword-group').removeClass('has-error');

            if(!user) {
                $('#firstName-group').addClass('has-error');
                $('#lastName-group').addClass('has-error');
                $('#email-group').addClass('has-error');
                $('#username-group').addClass('has-error');
                $('#password-group').addClass('has-error');
                $('#verifyPassword-group').addClass('has-error');
                validated = false;

            } else {
                if (!user.firstName || user.firstName == '') {
                    $('#firstName-group').addClass('has-error');
                    validated = false;
                }
                if (!user.lastName || user.lastName == '') {
                    $('#lastName-group').addClass('has-error');
                    validated = false;
                }
                if (!user.email || user.email == '') {
                    $('#email-group').addClass('has-error');
                    validated = false;
                }
                if (!user.username || user.username == '') {
                    $('#username-group').addClass('has-error');
                    validated = false;
                }
                if (!user.password || user.password == '') {
                    $('#password-group').addClass('has-error');
                    validated = false;
                }
                if (!user.repassword || user.repassword == '' || user.password != user.repassword) {
                    $('#verifyPassword-group').addClass('has-error');
                    validated = false;
                }
            }
            if(!validated) {
                console.log("not validated");
                return;
            }
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