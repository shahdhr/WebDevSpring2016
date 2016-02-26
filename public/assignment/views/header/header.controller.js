/**
 * Created by Dhruv on 2/26/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
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
