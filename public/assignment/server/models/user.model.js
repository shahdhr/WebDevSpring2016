/**
 * Created by Dhruv on 3/17/2016.
 */
module.exports = function() {
    var users = require("./user.mock.json");
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
        for(var index=0;index<users.length;index++) {
            if(users[index].username == credentials.username) {
                if(users[index].password==credentials.password) {
                    return users[index];
                }
            }
        }
        return null;
    }

    function findUserByUsername(username) {
        for(var index=0;index<users.length;index++) {
            if(users[index].username == username) {
                return users[index];
            }
        }
        return null;
    }

    function findUserById(userId) {
        for(var index=0;index<users.length;index++) {
            if (users[index]._id == userId) {
                return users[index];
            }
        }
        return null;
    }

    function findAllUsers(){
        return users;
    }

    function createUser(user) {
        users[users.length] = user;
        return user;
    }

    function deleteUser(userId) {
        for(var index=0;index<users.length;index++) {
            if(users[index]._id == userId) {
                users.remove(index);
            }
        }
        return users;

    }

    function updateUser(userId, user) {
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
        return user;
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