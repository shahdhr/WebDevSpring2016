/**
 * Created by Dhruv on 4/22/2016.
 */
"use strict";
(function()
{
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController( $location, UserService)
    {
        //currently logged in user
        var vm = this;

        var currentUser = UserService.getCurrentUser();
        vm.$location = $location;
        function init() {
            UserService
                .findAllUsersAdmin()
                .then(findAllUsersCallback);

        }
        init();

        vm.addUser = addUser;
        vm.removeUser = removeUser;
        vm.selectUser = selectUser;
        vm.updateUser = updateUser;
        vm.sortUsername =sortUsername;
        vm.sortfirstName = sortfirstName;
        vm.sortlastName = sortlastName;

        function manageSortArrows() {
            vm.usernameAsc = false;
            vm.usernameDesc = false;
            vm.firstNameAsc = false;
            vm.firstNameDesc = false;
            vm.lastNameAsc = false;
            vm.lastNameDesc = false;
        }

        function sortlastName(){
            var allUsers = vm.users;
            allUsers = _.sortBy(allUsers, function(user) {
                return user.lastName;
            });
            if(vm.lastNameAsc) {
                _.reverse(allUsers);
                manageSortArrows();
                vm.lastNameDesc = true;
            } else {
                manageSortArrows();
                vm.lastNameAsc = true;
            }
            vm.users = allUsers
        }

        function sortfirstName() {
            var allUsers = vm.users;
            allUsers = _.sortBy(allUsers, function(user) {
                return user.firstName;
            });
            if(vm.firstNameAsc) {
                _.reverse(allUsers);
                manageSortArrows();
                vm.firstNameDesc = true;
            } else {
                manageSortArrows();
                vm.firstNameAsc = true;
            }
            vm.users = allUsers
        }

        function sortUsername() {
            var allUsers = vm.users;
            allUsers = _.sortBy(allUsers, function(user) {
                return user.username;
            });

            if(vm.usernameAsc) {
                _.reverse(allUsers);
                manageSortArrows();
                vm.usernameDesc = true;
            } else {
                manageSortArrows();
                vm.usernameAsc = true;
            }
            vm.users = allUsers
        }

        function updateUser(user)
        {
            console.log(user.roles);
            var roles = user.roles;
            if(user.roles.indexOf(",") > 0){
                roles = user.roles.split(",");
                console.log(roles);
            }

            user.roles = roles;
            UserService
                .updateUserAdmin(user._id,user)
                .then(updateUserCallback);
            vm.user = null;
        }

        function selectUser(index)
        {
            vm.selectedUserIndex = index;



            vm.user = {
                _id: vm.users[index]._id,
                username: vm.users[index].username,
                password:vm.users[index].password,
                roles:vm.users[index].roles.toString(),
                firstName:vm.users[index].firstName,
                lastName:vm.users[index].lastName
            };

            //$scope.apartment = $scope.apartments[index];
        }

        function removeUser(index)
        {
            var userId = vm.users[index]._id;
            UserService
                .deleteUserAdmin(userId)
                .then(removeUserCallback);
            //$scope.apartments.splice(index, 1);
        }

        function addUser(user)
        {

            var newUser = {
                username : user.username,
                roles : user.roles,
                password : "password"

            };
            UserService
                .createUserAdmin(newUser)
                .then(addUserCallback);
            //$scope.apartments.push(newApartment);
        }

        //callback functions

        function findAllUsersCallback(allUsers) {
            var users = allUsers.data;
            _.forEach(users, function(user) {
                user.roles = user.roles.toString();
            });
            vm.users =users;
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