/**
 * Created by Dhruv on 3/25/2016.
 */
module.exports = function (app,uuid) {
    var userModel = require("./models/user.model.js")();
    var userService = require("./services/user.service.server.js")(app, userModel, uuid);
};