/**
 * Created by Dhruv on 2/23/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController)

    function LoginController($scope, $location, UserService, $rootScope) {
        $scope.login = login;


        function login(user) {
            UserService.findUserByCredentials(user.username,user.password,loginResponse);
        }

        function loginResponse(user) {
            if(user!=null) {
                $rootScope.newUser = user;
                $location.path('/profile');
            }

        }
    }
})();
