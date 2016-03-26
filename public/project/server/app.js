/**
 * Created by Dhruv on 3/25/2016.
 */
module.exports = function (app,uuid) {
    var userModel = require("./models/user.model.js")();
    var userService = require("./services/user.service.server.js")(app, userModel, uuid);
    var reviewModel = require("./models/review.model.js")();
    var reviewService = require("./services/review.service.server.js")(app, reviewModel, uuid);
    var bookingModel = require("./models/booking.model.js")();
    var bookingService = require("./services/booking.service.server.js")(app, bookingModel, uuid);
    var apartmentModel = require("./models/apartment.model.js")();
    var apartmentService = require("./services/apartment.service.server.js")(app, apartmentModel, uuid);
};