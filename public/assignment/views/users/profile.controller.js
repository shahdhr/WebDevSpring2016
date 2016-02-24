/**
 * Created by Dhruv on 2/22/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController)

    function ProfileController($scope, $location, UserService, $rootScope) {
        var currentUser = $rootScope.newUser;
        $scope.user = currentUser;
        $scope.update = update;


        function update(user) {
            UserService.updateUser(user._id, user, updatedUser);
        }

        function updatedUser(user) {
            console.log(user);
        }
    }
})()
