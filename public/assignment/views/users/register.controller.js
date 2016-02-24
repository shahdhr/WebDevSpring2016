/**
 * Created by Dhruv on 2/22/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController)

    function RegisterController($location, UserService, $scope, $rootScope) {
        $scope.register =register;

        function register (user) {
            UserService.createUser(user,createdUser);
        }

        function createdUser(user) {
            $rootScope.newUser = user;
            $location.path('/profile');
           console.log(user);
        }
    }
})()
