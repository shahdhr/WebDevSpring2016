/**
 * Created by Dhruv on 2/22/2016.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService",UserService)

    function UserService($rootScope) {

        var users = [
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"], "email":""		},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"], "email":""		},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"], "email":""		},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"], "email":""},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"], "email":""		}
        ];


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

        function findUserByCredentials(username, password, callback) {
            for(var index=0;index<users.length;index++) {
                if(users[index].username == username) {
                    if(users[index].password==password) {
                        callback(users[index]);
                    }
                }
            }
            callback(null);
        }

        function findAllUsers(callback){
            return callback(users);
        }

        function createUser(user,callback) {
            user._id = (new Date()).getTime();
            users[users.length] = user;
            callback(user);
        }

        function deleteUserById(userId,callback) {
            for(var index=0;index<users.length;index++) {
                if(users[index]._id == userId) {
                    users.remove(index);
                }
            }
            callback(users);

        }

        function updateUser(userId, user, callback) {
            for(var index=0;index<users.length;index++) {
                if(users[index]._id == userId) {
                    users[index].firstName = user.firstName;
                    users[index].lastName = user.lastName;
                    users[index].password = user.password;
                    users[index].roles = user.roles;
                    users[index].username = user.username;
                    users[index].email = user.email;
                }
            }
            callback(user);
        }

        function setCurrentUser(aUser) {
            if(aUser == null) {
                $rootScope.newUser = null;
            }
            else {
                $rootScope.newUser = {"_id":aUser._id, "firstName":aUser.firstName, "lastName":aUser.lastName,
                    "username":aUser.username, "password":aUser.password, "roles": aUser.roles, "email":aUser.email}
            }

        }

        function getCurrentUser() {
            return $rootScope.newUser;
        }
    }
})();