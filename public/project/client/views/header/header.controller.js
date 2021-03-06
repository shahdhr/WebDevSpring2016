/**
 * Created by Dhruv on 3/4/2016.
 */
"use strict";
(function () {
    angular
        .module("RentOutApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($uibModal,UserService,$location,$rootScope) {
        var vm = this;
        //Event handler declarations
        $rootScope.open = openModal;
        vm.logout = logout;

        //Event handler implementations
        function openModal (size) {

            var modalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                templateUrl: "views/login/login.view.html",
                controller: 'LoginController',
                controllerAs:"model",
                size: size
            });

            modalInstance.result
                .then(
                    function (user) {
                        UserService
                            .findUserByCredentials(user.username,user.password)
                            .then(loginCallback);
                    },
                    function () {
                        console.log("Modal Cancelled");
                    });
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function(response){
                    UserService.setCurrentUser(null);
                    $location.url("/home");
                },
                function(err) {
                    //TODO : Show error on UI.
                });
        }

        //Callback functions
        function loginCallback(user) {
            if(user!=null) {
                UserService.setCurrentUser(user.data);
                console.log(user);
            }
            else {
                UserService.loginFirst();
            }
        }

    }
})();