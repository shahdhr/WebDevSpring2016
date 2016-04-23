/**
 * Created by Dhruv on 3/17/2016.
 */

var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function (app, model,uuid) {
    //var auth = authorized;
    ////app.get("/api/assignment/user",auth, getAllUsers);
    //
    //app.get("/api/assignment/user/:id", getUserById);
    //app.post("/api/assignment/login",passport.authenticate('assignment'), login);
    //app.get("/api/assignment/loggedin",                                   loggedin);
    //app.post("/api/assignment/logout",                                    logout);
    //app.put("/api/assignment/user/:id",                             auth, updateUserById);
    ////app.get("/api/assignment/user?username=username", getUserByUsername);
    //app.post("/api/assignment/register",                                  register);
    //
    //app.get("/api/assignment/admin/user", isAdmin, getAllUsers);
    //app.get("/api/assignment/admin/user/:userId", isAdmin, getUserById);
    //app.post("/api/assignment/admin/user", isAdmin, createUser);
    //app.delete("/api/assignment/admin/user/:userId", isAdmin, deleteUserById);
    //app.put("/api/assignment/admin/user/:id", isAdmin, updateUserById);
    //
    //
    //passport.use('assignment',new LocalStrategy(
    //    function (username, password, done) {
    //        model
    //            .findUserByUsername(username)
    //            .then(
    //                function(user) {
    //                    console.log("encrypted");
    //                    console.log(bcrypt.hashSync(password));
    //                    console.log("db");
    //                    console.log(user.password);
    //                    if (user && bcrypt.compareSync(password, user.password)) {
    //                        return done(null, user);
    //                    } else {
    //                        return done(null, false);
    //                    }
    //                },
    //                function(err) {
    //                    if (err) { return done(err); }
    //                }
    //            );
    //    }
    //));
    //passport.serializeUser(serializeUser);
    //passport.deserializeUser(deserializeUser);
    //
    //function createUser (req, res) {
    //    var user = req.body;
    //    user.password = bcrypt.hashSync(user.password);
    //    model.createUser(user)
    //        .then(
    //            function (doc) {
    //                req.session.newUser = doc;
    //                res.json(user);
    //            },
    //            function (err) {
    //                res.status(400).send(err);
    //            }
    //        );
    //}
    //
    //function login(req, res) {
    //    console.log("using new login assignment");
    //    var user = req.user;
    //    res.json(user);
    //}
    //
    //function loggedin(req, res) {
    //    console.log(req.isAuthenticated());
    //    res.send(req.isAuthenticated() ? req.user : '0');
    //}
    //
    //function logout(req, res) {
    //    req.logOut();
    //    res.send(200);
    //}
    //
    //function getAllUsers (req, res) {
    //
    //    if(req.query.username) {
    //        if(req.query.password) {
    //            getUserByCredentials(req,res);
    //        }
    //        else {
    //            getUserByUsername(req,res);
    //        }
    //    }
    //    else {
    //        var users = model.findAllUsers()
    //            .then(function(doc) {
    //                    res.json(doc);
    //                },
    //                function (err) {
    //                    res.status(400).send(err);
    //                }
    //            )
    //
    //    }
    //
    //}
    //
    //function getUserById (req, res) {
    //    var id = req.params.id;
    //    //console.log(req.params);
    //    //var user = model.findUserById(id);
    //    //if(user) {
    //    //    res.json(user);
    //    //    return;
    //    //}
    //    //res.json({message: "User not found"});
    //
    //    var user = model.findUserById(id)
    //        .then(
    //            function(doc) {
    //                res.json(doc);
    //            },
    //            function (err) {
    //                res.status(400).send(err);
    //            }
    //        )
    //}
    //
    //function getUserByCredentials (req, res) {
    //    var username = req.query.username;
    //    var password = req.query.password;
    //    var credentials = {
    //        username: username,
    //        password: password
    //    };
    //    model.findUserByCredentials(credentials)
    //        .then(
    //            function(doc) {
    //                req.session.newUser = doc;
    //                res.json(doc);
    //            },
    //            function (err) {
    //                res.status(400).send(err);
    //            }
    //
    //        );
    //    //if(user) {
    //    //    res.json(user);
    //    //    return;
    //    //}
    //    //res.json({message: "User not found"});
    //}
    //
    //function getUserByUsername (req, res) {
    //    var username = req.query.username;
    //    console.log(username);
    //   model.findUserByUsername(username)
    //        .then(
    //            function(user) {
    //                res.json(user);
    //            },
    //            function (err) {
    //                res.status(400).send(err);
    //            }
    //        );
    //    //if(user) {
    //    //    res.json(user);
    //    //    return;
    //    //}
    //    //res.json({message: "User not found"});
    //}
    //
    //
    //
    //function updateUserById (req, res) {
    //    var id = req.params.id;
    //    var newUser = req.body;
    //    if(req.user.roles.indexOf("admin") > -1) {
    //        delete newUser.roles;
    //    }
    //    if(typeof newUser.roles == "string") {
    //        newUser.roles = newUser.roles.split(",");
    //    }
    //    model
    //        .findUserById(req.params.id)
    //        .then(
    //            function(user){
    //                if(user && ((newUser.password === user.password) || (newUser.password === ''))) {
    //                    delete newUser.password;
    //                    return model.updateUser(user._id, newUser);
    //                } else {
    //                    newUser.password = bcrypt.hashSync(newUser.password);
    //                    return model.updateUser(user._id, newUser);
    //                }
    //            },
    //            function(err){
    //                res.status(400).send(err);
    //            }
    //        )
    //        .then(
    //            function(stats){
    //                res.send(200);
    //            },
    //            function(err){
    //                res.status(400).send(err);
    //            }
    //        );
    //}
    //
    //
    //function deleteUserById (req, res) {
    //    var id = req.params.userId;
    //    model.deleteUser(id)
    //        .then (
    //            function (stats) {
    //                res.send(200);
    //            },
    //            function (err) {
    //                res.status(400).send(err);
    //            }
    //        );
    //    //if(model.deleteUser(id)) {
    //    //    res.send(200);
    //    //    return;
    //    //}
    //    //res.json ({message: "User not found"});
    //}
    //
    //
    //function authorized (req, res, next) {
    //    if (!req.isAuthenticated()) {
    //        res.send(401);
    //    } else {
    //        next();
    //    }
    //}
    //
    //function serializeUser(user, done) {
    //    done(null, user);
    //}
    //
    //function deserializeUser(user, done) {
    //    model
    //        .findUserById(user._id)
    //        .then(
    //            function(user){
    //                done(null, user);
    //            },
    //            function(err){
    //                done(err, null);
    //            }
    //        );
    //}
    //
    //function isAdmin(req, res, next) {
    //    if (!req.isAuthenticated() || req.user.roles.indexOf("admin") === -1) {
    //        res.send(403);
    //    } else {
    //        next();
    //    }
    //}
    //
    //function register(req, res) {
    //    var newUser = req.body;
    //    newUser.roles = ['student'];
    //
    //    model
    //        .findUserByUsername(newUser.username)
    //        .then(
    //            function(user){
    //                if(user) {
    //                    res.json(null);
    //                } else {
    //                    newUser.password = bcrypt.hashSync(newUser.password);
    //                    return model.createUser(newUser);
    //                }
    //            },
    //            function(err){
    //                res.status(400).send(err);
    //            }
    //        )
    //        .then(
    //            function(user){
    //                if(user){
    //                    req.login(user, function(err) {
    //                        if(err) {
    //                            res.status(400).send(err);
    //                        } else {
    //                            res.json(user);
    //                        }
    //                    });
    //                }
    //            },
    //            function(err){
    //                res.status(400).send(err);
    //            }
    //        );
    //}
};

