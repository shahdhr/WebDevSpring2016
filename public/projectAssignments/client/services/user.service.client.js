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
            getCurrentUser:getCurrentUser,
            logout: logout,
            getCurrentSessionUser: getCurrentSessionUser
        };
        return api;

        function findUserByCredentials(username, password) {
            return $http.get("/api/projectAssignments/user?username="+username+"&password="+password);
        }

        function findUserByUsername(username) {
            return $http.get("/api/projectAssignments/user?username="+username);
        }

        function findAllUsers(){
            return $http.get("/api/projectAssignments/user");
        }

        function createUser(user) {
            return $http.post("/api/projectAssignments/user",user);
        }

        function deleteUserById(userId) {
            return $http.delete ("/api/projectAssignments/user/"+userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/projectAssignments/user/"+userId,user);
        }

        function setCurrentUser(aUser) {
            //if(aUser == null) {
            //    $rootScope.newUser = null;
            //}
            //else {
            //    $rootScope.newUser = {"_id":aUser._id, "firstName":aUser.firstName, "lastName":aUser.lastName,
            //        "username":aUser.username, "password":aUser.password, "roles": aUser.roles, "email":aUser.email, "favourites":aUser.favourites}
            //}
            $rootScope.newUser = aUser;
            console.log($rootScope.newUser);

        }

        function getCurrentUser() {
            return $rootScope.newUser;
            //    return $http.get("/api/projectAssignments/loggedin");
        }

        function getCurrentSessionUser() {
            return $http.get("/api/projectAssignments/loggedin");
        }



        function logout() {
            return $http.post("/api/projectAssignments/logout");
        }
    }
})();