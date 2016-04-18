/**
 * Created by Dhruv on 3/25/2016.
 */
var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;

module.exports = function (app, model) {

    var auth = authorized;
    app.get("/api/project/user", auth,getAllUsers);
    app.get("/api/project/user/:id", getUserById);
    app.get("/api/project/user?username=username", getUserByUsername);
    app.post("/api/project/login",passport.authenticate('project'), loginProject);
    app.get("/api/project/loggedin",loggedin);
    app.post("/api/project/logout", logout);
    app.put("/api/project/user/:id",updateUserById);
    app.post("/api/project/user",createUser);
    app.delete("/api/project/user/:id",deleteUserById);


    passport.use('project',new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function createUser (req, res) {
        var user = req.body;
        model.createUser(user)
            .then(
                function (doc) {
                    req.session.newUser = doc;
                    console.log("service server create user");
                    console.log(doc);
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }



    function getAllUsers (req, res) {

        if(req.query.username) {
            if(req.query.password) {
                getUserByCredentials(req,res);
            }
            else {
                getUserByUsername(req,res);
            }
        }
        else {
            var users = model.findAllUsers();
            res.json(users);
        }

    }

    function getUserById (req, res) {
        var id = req.params.id;


        var user = model.findUserById(id)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function getUserByCredentials (req, res) {
        var username = req.query.username;
        var password = req.query.password;
        var credentials = {
            username: username,
            password: password
        };
        model.findUserByCredentials(credentials)
            .then(
                function(doc) {
                    req.session.newUser = doc;
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }

            );

    }

    function loginProject(req, res) {
        console.log("using new login la casa");
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function getUserByUsername (req, res) {
        var username = req.query.username;
        console.log(username);
        model.findUserByUsername(username)
            .then(
                function(user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }



    function updateUserById (req, res) {
        var id = req.params.id;
        var newUser = req.body;
        //if(!isAdmin(req.user)) {
        //    delete newUser.roles;
        //}
        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }
        model
            .updateUser(id, newUser)
            .then(
                function(stats) {
                    res.send(200);
                    //return userModel.findAllUsers();
                },
                function(err) {
                    res.status(400).send(err);
                }
            );

    }

    function deleteUserById (req, res) {
        var id = req.params.id;
        model.deleteUser(id)
            .then (
                function (stats) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    //passport related functions

    function localStrategy(username, password, done) {
        model
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            console.log("project auth");
            res.send(401);
        } else {
            console.log("project auth");
            next();
        }
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") > -1) {
            return true
        }
        return false;
    }
};