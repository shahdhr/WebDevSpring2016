/**
 * Created by Dhruv on 2/22/2016.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService)

    function UserService($rootScope,$http) {

        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser:createUser,
            deleteUserById:deleteUserById,
            updateUser:updateUser,
            setCurrentUser:setCurrentUser,
            getCurrentUser:getCurrentUser,
            getCurrentSessionUser:getCurrentSessionUser,
            logout:logout
        };
        return api;

        function findUserByCredentials(username, password) {
            var user = {
                username : username,
                password : password
            };
            //return $http.post("/api/assignment/login",user);
            return $http.get("/api/assignment/user?username="+ username +"&password="+ password);
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username="+username);
        }

        function findAllUsers(){
            return $http.get("/api/assignment/user");
        }

        function createUser(user) {
            return $http.post("/api/assignment/user",user);
        }

        function getCurrentSessionUser() {
            return $http.get("/api/assignment/loggedin");
        }

        function logout() {
            return $http.post("/api/assignment/logout");
        }

        function deleteUserById(userId) {
           return $http.delete ("/api/assignment/user/"+userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/assignment/user/"+userId,user);
        }

        function setCurrentUser(aUser) {
            //if(aUser == null) {
            //    $rootScope.newUser = null;
            //}
            //else {
            //    $rootScope.newUser = {"_id":aUser._id, "firstName":aUser.firstName, "lastName":aUser.lastName,
            //        "username":aUser.username, "password":aUser.password, "roles": aUser.roles, "email":aUser.email}
            //}
            $rootScope.newUser = aUser;
        }

        function getCurrentUser() {
            return $rootScope.newUser;
        }
    }
})();