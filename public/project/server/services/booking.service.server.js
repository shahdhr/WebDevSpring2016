/**
 * Created by Dhruv on 3/25/2016.
 */
"use strict";
module.exports = function (app, model,uuid) {
    app.get("/api/project/user/:userId/booking", findAllBookingsForUser);
    app.put("/api/project/booking/:bookingId",updateBookingById);
    app.post("/api/project/user/:userId/booking",addBooking);
    app.delete("/api/project/booking/:bookingId",deleteBookingById);


    function addBooking (req, res) {
        var booking = req.body;
        console.log("iyan aayvu");
        model.addBooking(booking)
            .then(function (doc) {
                res.json(doc);
            }, function (err) {
                res.status(400).send(err);
            });
    }


    function findAllBookingsForUser (req, res) {

        var userId = req.params.userId;
        model.findAllBookingsForUser(userId)
            .then(function (doc) {
                res.json(doc);
            }, function (err) {
                res.status(400).send(err);
            });
        //res.json(bookings);


    }

    function updateBookingById (req, res) {
        var id = req.params.bookingId;
        var booking = req.body;
        booking = model.updateBookingById(id, booking)
            .then(function (doc) {
               model.findBookingById(id)
                   .then(function (doc) {
                       res.json(doc);
                   }, function (err) {
                       res.status(400).send(err);
                   });
            }, function (err) {
                res.status(400).send(err);
            });
        //if(booking) {
        //    res.json(booking);
        //    return;
        //}
        //res.json({message: "User not found"});
    }

    function deleteBookingById (req, res) {
        console.log("iyan aayvu");
        var id = req.params.bookingId;
        var bookings =model.deleteBookingById(id);
        console.log(bookings);
        if(bookings) {
            res.send(bookings);
            return;
        }
        res.json ({message: "User not found"});
    }
};