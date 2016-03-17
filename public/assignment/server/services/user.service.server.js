/**
 * Created by Dhruv on 3/17/2016.
 */
module.exports = function (app, model) {
    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/:id", getUserById);
    app.get("/api/assignment/user?username=username", getUserByUsername);
    app.get("/api/assignment/user?username=alice&password=wonderland",getUserByCredentials);
    app.put("/api/assignment/user/:id",updateUserById);
    app.post("/api/assignment/user",createUser);
    app.delete("/api/assignment/user/:id",deleteUserById);

    function createUser (req, res) {
        var user = req.body;
        model.createUser(user);
        res.send (200);
    }

    function getAllUsers (req, res) {
        var users = model.findAllUsers();
        res.json(users);
    }

    function getUserById (req, res) {
        var id = req.params.id;
        var user = model.findUserById(id);
        if(user) {
            res.json(user);
            return;
        }
        res.json({message: "User not found"});
    }

    function getUserByCredentials (req, res) {
        var username = req.params.username;
        var password = req.params.password;
        var credentials = {
            username: username,
            password: password
        };
        var user = model.findUserByCredentials(credentials);
        if(user) {
            res.json(user);
            return;
        }
        res.json({message: "User not found"});
    }

    function getUserByUsername (req, res) {
        var username = req.params.username;
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