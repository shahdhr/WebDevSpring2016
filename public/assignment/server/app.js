/**
 * Created by Dhruv on 3/17/2016.
 */
module.exports = function (app,uuid,db,mongoose) {
    var formModel = require("./models/form.model.js")(db,mongoose);
    var formService = require("./services/form.service.server.js")(app, formModel,uuid);
    var userModel = require("./models/user.model.js")(db,mongoose);
    var userService = require("./services/user.service.server.js")(app, userModel, uuid);

    var fieldService = require("./services/field.service.server.js")(app, formModel, uuid);
};