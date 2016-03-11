/**
 * Created by Dhruv on 3/11/2016.
 */
/**
 * Created by Dhruv on 3/11/2016.
 */
/**
 * Created by Dhruv on 3/10/2016.
 */
"use strict";
(function()
{
    angular
        .module("RentOutApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $location, UserService)
    {
        //currently logged in user
        var currentUser = UserService.getCurrentUser();
        $scope.$location = $location;
        function init() {
            UserService.findAllUsers(findAllUsersCallback);
        }
        init();

        $scope.addUser = addUser;
        $scope.removeUser = removeUser;
        $scope.selectUser = selectUser;
        $scope.updateUser = updateUser;

        function updateUser(user)
        {
            console.log(user._id);
            UserService.updateUser(user._id,user,updateUserCallback);
            $scope.user = null;
        }

        function selectUser(index)
        {
            $scope.selectedUserIndex = index;
            $scope.user = {
                _id: $scope.users[index]._id,
                username: $scope.users[index].username,
                };

            //$scope.apartment = $scope.apartments[index];
        }

        function removeUser(index)
        {
            var userId = $scope.users[index]._id;
            UserService.deleteUserById(userId,removeUserCallback);
            //$scope.apartments.splice(index, 1);
        }

        function addUser(user)
        {
            var newUser = {
                username : user.username,
                roles : "general",
                password : "password"

            };
            UserService.createUser(newUser,addUserCallback);
            //$scope.apartments.push(newApartment);
        }

        //callback functions

        function findAllUsersCallback(allUsers) {
            $scope.users = allUsers;
            console.log(allUsers);

        }

        function addUserCallback(user) {
            console.log(user);
            init();
        }

        function removeUserCallback(user) {
            init();
        }

        function updateUserCallback(user) {
            init();
        }



    }
})();