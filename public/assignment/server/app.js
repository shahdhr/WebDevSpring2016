/**
 * Created by Dhruv on 3/17/2016.
 */
module.exports = function (app) {
    var formModel = require("./models/form.model.js")();
    var formService = require("./services/form.service.server.js")(app, formModel);
    var userModel = require("./models/user.model.js")();
    var userService = require("./services/user.service.server.js")(app, userModel);
};