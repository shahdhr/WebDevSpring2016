/**
 * Created by Dhruv on 3/25/2016.
 */
module.exports = function (app, model,uuid) {
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
        user._id=uuid.v4();
        model.createUser(user);
        req.session.newUser = user;
        res.json(user);

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
        console.log(req.params);
        var user = model.findUserById(id);
        if(user) {
            res.json(user);
            return;
        }
        res.json({message: "User not found"});
    }

    function getUserByCredentials (req, res) {
        var username = req.query.username;
        var password = req.query.password;
        var credentials = {
            username: username,
            password: password
        };
        var user = model.findUserByCredentials(credentials);
        if(user) {
            req.session.newUser = user;
            res.json(user);
            return;
        }
        res.json({message: "User not found"});
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
        var user = model.findUserByUsername(username);
        if(user) {
            res.json(user);
            return;
        }
        res.json({message: "User not found"});
    }



    function updateUserById (req, res) {
        var id = req.params.id;
        var user = req.body;
        user = model.updateUser(id, user);
        if(user) {
            res.json(user);
            return;
        }
        res.json({message: "User not found"});
    }

    function deleteUserById (req, res) {
        var id = req.params.id;
        if(model.deleteUser(id)) {
            res.send(200);
            return;
        }
        res.json ({message: "User not found"});
    }
};