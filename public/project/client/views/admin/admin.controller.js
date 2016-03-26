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

    function AdminController( $location, UserService)
    {
        //currently logged in user
        var vm = this;

        var currentUser = UserService.getCurrentUser();
        vm.$location = $location;
        function init() {
            UserService
                .findAllUsers()
                .then(findAllUsersCallback);

        }
        init();

        vm.addUser = addUser;
        vm.removeUser = removeUser;
        vm.selectUser = selectUser;
        vm.updateUser = updateUser;

        function updateUser(user)
        {
            console.log(user._id);
            UserService
                .updateUser(user._id,user)
                .then(updateUserCallback);
            vm.user = null;
        }

        function selectUser(index)
        {
            vm.selectedUserIndex = index;
            vm.user = {
                _id: vm.users[index]._id,
                username: vm.users[index].username,
                };

            //$scope.apartment = $scope.apartments[index];
        }

        function removeUser(index)
        {
            var userId = vm.users[index]._id;
            UserService
                .deleteUserById(userId)
                .then(removeUserCallback);
            //$scope.apartments.splice(index, 1);
        }

        function addUser(user)
        {
            var newUser = {
                username : user.username,
                roles : "general",
                password : "password"

            };
            UserService
                .createUser(newUser)
                .then(addUserCallback);
            //$scope.apartments.push(newApartment);
        }

        //callback functions

        function findAllUsersCallback(allUsers) {
            vm.users = allUsers.data;
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