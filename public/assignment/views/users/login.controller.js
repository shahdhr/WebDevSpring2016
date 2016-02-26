/**
 * Created by Dhruv on 2/23/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController)

    function LoginController($scope, $location, UserService, $rootScope) {

        //Even handler declarations
        $scope.login = login;


        //Event handler implemntations
        function login(user) {
            UserService.findUserByCredentials(user.username,user.password,loginCallback);
        }


        //Callback functions
        function loginCallback(user) {
            if(user!=null) {
                $rootScope.newUser = user;
                $location.path('/profile');
            }

        }
    }
})();
