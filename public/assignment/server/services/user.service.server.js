/**
 * Created by Dhruv on 3/17/2016.
 */
module.exports = function (app, model,uuid) {
    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/:id", getUserById);
    app.get("/api/assignment/user?username=username", getUserByUsername);
    app.get("/api/assignment/user?username=alice&password=wonderland",getUserByCredentials);
    app.put("/api/assignment/user/:id",updateUserById);
    app.post("/api/assignment/user",createUser);
    app.delete("/api/assignment/user/:id",deleteUserById);

    function createUser (req, res) {
        var user = req.body;
        //user._id=uuid.v4();
        //model.createUser(user);
        //res.send (user);

        model.createUser(user)
            .then(
                function (doc) {
                    req.session.newUser = doc;
                    res.json(user);
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
        //console.log(req.params);
        //var user = model.findUserById(id);
        //if(user) {
        //    res.json(user);
        //    return;
        //}
        //res.json({message: "User not found"});

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
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }

            );
        //if(user) {
        //    res.json(user);
        //    return;
        //}
        //res.json({message: "User not found"});
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
            )
        //if(user) {
        //    res.json(user);
        //    return;
        //}
        //res.json({message: "User not found"});
    }



    function updateUserById (req, res) {
        var id = req.params.id;
        var user = req.body;
        model
            .updateUser(id, user)
            .then(
                function(stats) {
                    res.status.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
        if(user) {
            res.json(user);
            return;
        }
        res.json({message: "User not found"});
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
        //if(model.deleteUser(id)) {
        //    res.send(200);
        //    return;
        //}
        //res.json ({message: "User not found"});
    }
};