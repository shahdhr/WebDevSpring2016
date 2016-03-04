/**
 * Created by Dhruv on 3/4/2016.
 */
"use strict";
(function () {
        angular
            .module("RentOutApp")
            .controller("HeaderController",HeaderController);

        function HeaderController($scope,$location,UserService) {
            //Event handler declarations
            $scope.logout = logout;


            //Event handler implementations
            function logout() {
                $location.path("/home");
                UserService.setCurrentUser(null);

            }
        }

    }
)();