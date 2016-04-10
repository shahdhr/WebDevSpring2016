/**
 * Created by Dhruv on 3/4/2016.
 */
"use strict";
(function () {
        angular
            .module("RentOutApp")
            .controller("HeaderController",HeaderController);

        function HeaderController($location,UserService) {
            //Event handler declarations
            var vm = this;
            vm.logout = logout;


            //Event handler implementations
            function logout() {
                //$location.path("/home");
                //UserService.setCurrentUser(null);
                UserService
                    .logout()
                    .then(function(){
                        UserService.setCurrentUser(null);
                        $location.url("/home");
                    });

            }
        }

    }
)();