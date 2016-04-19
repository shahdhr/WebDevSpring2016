/**
 * Created by Dhruv on 3/25/2016.
 */
module.exports = function (app,db,mongoose) {
    var userModel = require("./models/user/user.model.js")(db,mongoose);
    var userService = require("./services/user.service.server.js")(app, userModel);
    var reviewModel = require("./models/apartment/review.model.js")(db,mongoose);
    var reviewService = require("./services/review.service.server.js")(app, reviewModel);
    var bookingModel = require("./models/booking/booking.model.js")(db,mongoose);
    var bookingService = require("./services/booking.service.server.js")(app, bookingModel);
    var apartmentModel = require("./models/apartment/apartment.model.js")(db,mongoose);
    var apartmentService = require("./services/apartment.service.server.js")(app, apartmentModel);
};