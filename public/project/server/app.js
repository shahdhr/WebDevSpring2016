/**
 * Created by Dhruv on 3/25/2016.
 */
module.exports = function (app,db,mongoose,upload) {
    //user model and service
    var userModel = require("./models/user/user.model.js")(db,mongoose);
    require("./services/user.service.server.js")(app, userModel,upload);

    //review model and service
    var reviewModel = require("./models/apartment/review.model.js")(db,mongoose);
    require("./services/review.service.server.js")(app, reviewModel);

    //booking model and service
    var bookingModel = require("./models/booking/booking.model.js")(db,mongoose);
    require("./services/booking.service.server.js")(app, bookingModel);

    //apartment model and service
    var apartmentModel = require("./models/apartment/apartment.model.js")(db,mongoose);
    require("./services/apartment.service.server.js")(app, apartmentModel,upload);

    //message model and service
    var messageModel = require("./models/user/message.model.js")(db,mongoose);
    require("./services/message.service.server.js")(app, messageModel);
};