/**
 * Created by Dhruv on 3/25/2016.
 */
module.exports = function (app,db,mongoose,upload) {
    var userModel = require("./models/user/user.model.js")(db,mongoose);
    require("./services/user.service.server.js")(app, userModel,upload);
    var reviewModel = require("./models/apartment/review.model.js")(db,mongoose);
    require("./services/review.service.server.js")(app, reviewModel);
    var bookingModel = require("./models/booking/booking.model.js")(db,mongoose);
    require("./services/booking.service.server.js")(app, bookingModel);
    var apartmentModel = require("./models/apartment/apartment.model.js")(db,mongoose);
    require("./services/apartment.service.server.js")(app, apartmentModel);
    var messageModel = require("./models/user/message.model.js")(db,mongoose);
    require("./services/message.service.server.js")(app, messageModel);
};