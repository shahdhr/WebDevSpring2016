/**
 * Created by Dhruv on 2/22/2016.
 */
"use strict";
(function(){
    angular
        .module("RentOutApp")
        .factory("UserService",UserService)

    function UserService($rootScope,$http) {

        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser:createUser,
            deleteUserById:deleteUserById,
            updateUser:updateUser,
            setCurrentUser:setCurrentUser,
            getCurrentUser:getCurrentUser
        };
        return api;

        function findUserByCredentials(username, password) {
            return $http.get("/api/project/user?username="+username+"&password="+password);
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
            if(aUser == null) {
                $rootScope.newUser = null;
            }
            else {
                $rootScope.newUser = {"_id":aUser._id, "firstName":aUser.firstName, "lastName":aUser.lastName,
                    "username":aUser.username, "password":aUser.password, "roles": aUser.roles, "email":aUser.email, "favourites":aUser.favourites}
            }

        }

        function getCurrentUser() {
            return $rootScope.newUser;
        }
    }
})();