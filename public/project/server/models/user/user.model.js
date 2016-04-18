/**
 * Created by Dhruv on 3/25/2016.
 */
"use strict";
var q = require("q");
module.exports = function(db,mongoose) {
    //var users = require("./user.mock.json");
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('ProjectUser', UserSchema);
    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        findAllUsers: findAllUsers,
        createUser:createUser,
        deleteUser:deleteUser,
        updateUser:updateUser
    };
    return api;

    function findUserByCredentials(credentials) {
        var deferred = q.defer();

        UserModel.findOne(
            {username: credentials.username,
                password: credentials.password},
            function(err,doc) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();

        UserModel.findOne(
            {username: username},
            function(err,doc) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();

        UserModel.findById(userId,function(err,doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAllUsers(){
        //return users;
        var deferred = q.defer();

        UserModel.find(
            function(err,doc) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }

    function createUser(user) {
        var deferred = q.defer();
        UserModel.create(user, function(err,doc){
            if(err) {
                deferred.reject(err);
            } else {
                console.log("create users");
                console.log(doc);
                deferred.resolve(doc);
            }

        });
        //returning the promise
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();

        UserModel.remove({_id: userId},
            function(err,doc) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;

    }

    function updateUser(userId, user) {
        var deferred = q.defer();
        UserModel.update({_id :userId},{$set:user},function(err,doc) {
            if(err) {
                deferred.reject(err);
            } else {
                console.log("Update user model server");
                console.log(doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    //function setCurrentUser(aUser) {
    //    if(aUser == null) {
    //        $rootScope.newUser = null;
    //    }
    //    else {
    //        $rootScope.newUser = {"_id":aUser._id, "firstName":aUser.firstName, "lastName":aUser.lastName,
    //            "username":aUser.username, "password":aUser.password, "roles": aUser.roles, "email":aUser.email}
    //    }
    //
    //}
    //
    //function getCurrentUser() {
    //    return $rootScope.newUser;
    //}
};