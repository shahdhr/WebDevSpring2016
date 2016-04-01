/**
 * Created by Dhruv on 3/17/2016.
 */
var q = require("q");
module.exports = function(db,mongoose) {
    //var users = require("./user.mock.json");
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('User', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        findAllUsers: findAllUsers,
        createUser:createUser,
        deleteUser:deleteUser,
        updateUser:updateUser
        //setCurrentUser:setCurrentUser,
        //getCurrentUser:getCurrentUser
    };
    return api;

    function findUserByCredentials(credentials) {
        //for(var index=0;index<users.length;index++) {
        //    if(users[index].username == credentials.username) {
        //        if(users[index].password==credentials.password) {
        //            return users[index];
        //        }
        //    }
        //}
        //return null;

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
        //for(var index=0;index<users.length;index++) {
        //    if(users[index].username == username) {
        //        return users[index];
        //    }
        //}
        //return null;
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
        //for(var index=0;index<users.length;index++) {
        //    if (users[index]._id == userId) {
        //        return users[index];
        //    }
        //}
        //return null;
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
        )

        return deferred.promise;
    }

    function createUser(user) {
        //users[users.length] = user;
        //return user;
        var deferred = q.defer();
        UserModel.create(user, function(err,doc){
            if(err) {
                deferred.reject(err);
            } else {
                console.log(doc);
                deferred.resolve(doc);
            }

        });
        //returning the promise
        return deferred.promise;
    }

    function deleteUser(userId) {
        //for(var index=0;index<users.length;index++) {
        //    if(users[index]._id == userId) {
        //        users.remove(index);
        //    }
        //}
        //return users;
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
        //for(var index=0;index<users.length;index++) {
        //    if(users[index]._id == userId) {
        //        users[index].firstName = user.firstName;
        //        users[index].lastName = user.lastName;
        //        users[index].password = user.password;
        //        users[index].roles = user.roles;
        //        users[index].username = user.username;
        //        users[index].email = user.email;
        //    }
        //}
        //return user;

        var deferred = q.defer();
        UserModel.update({_id :userId},{$set:user},function(err,doc) {
            if(!err) {
                deferred.resolve(doc);
            } else {
                deferred.reject(err);
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