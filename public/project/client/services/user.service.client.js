/**
 * Created by Dhruv on 2/22/2016.
 */
"use strict";
(function(){
    angular
        .module("RentOutApp")
        .factory("UserService",UserService);

    function UserService($rootScope,$http) {

        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser:createUser,
            deleteUserById:deleteUserById,
            updateUser:updateUser,
            setCurrentUser:setCurrentUser,
            getCurrentUser:getCurrentUser,
            logout: logout,
            getCurrentSessionUser: getCurrentSessionUser,
            loginFirst: loginFirst
        };
        return api;

        function findUserByCredentials(username, password) {
            var user = {
                username: username,
                password:password
            };
            return $http.post("/api/project/login",user)    ;
        }

        function findUserByUsername(username) {
            return $http.get("/api/project/user?username="+username);
        }

        function findAllUsers(){
            return $http.get("/api/project/user");
        }

        function createUser(user) {
            return $http.post("/api/project/user",user);
        }

        function deleteUserById(userId) {
            return $http.delete ("/api/project/user/"+userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/project/user/"+userId,user);
        }

        function setCurrentUser(aUser) {
            $rootScope.newUser = aUser;
            console.log($rootScope.newUser);
        }

        function getCurrentUser() {
            return $rootScope.newUser;
        }

        function getCurrentSessionUser() {
            return $http.get("/api/project/loggedin");
        }

        function loginFirst() {
            $rootScope.open();
        }



        function logout() {
            return $http.post("/api/project/logout");
        }
    }
})();