/**
 * Created by Dhruv on 3/25/2016.
 */
module.exports = function (app, model) {
    app.get("/api/project/user", getAllUsers);
    app.get("/api/project/user/:id", getUserById);
    app.get("/api/project/user?username=username", getUserByUsername);
    app.get("/api/project/user?username=alice&password=wonderland",getUserByCredentials);
    app.get("/api/project/loggedin",loggedin);
    app.post("/api/project/logout", logout);
    app.put("/api/project/user/:id",updateUserById);
    app.post("/api/project/user",createUser);
    app.delete("/api/project/user/:id",deleteUserById);

    function createUser (req, res) {
        var user = req.body;
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

    function loggedin(req, res) {
        res.json(req.session.newUser);
    }

    function logout(req, res) {
        req.session.destroy();
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
        var user = req.body;
        model
            .updateUser(id, user)
            .then(
                function(stats) {
                    res.send(200);
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
};