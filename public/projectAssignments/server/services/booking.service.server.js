/**
 * Created by Dhruv on 3/25/2016.
 */
"use strict";
module.exports = function (app, model,uuid) {
    app.get("/api/projectAssignments/user/:userId/booking", findAllBookingsForUser);
    app.put("/api/projectAssignments/booking/:bookingId",updateBookingById);
    app.post("/api/projectAssignments/user/:userId/booking",addBooking);
    app.delete("/api/projectAssignments/booking/:bookingId",deleteBookingById);


    function addBooking (req, res) {
        var booking = req.body;
        booking._id=uuid.v4();
        model.addBooking(booking);
        res.send (booking);
    }


    function findAllBookingsForUser (req, res) {

        var userId = req.params.userId;
        var bookings = model.findAllBookingsForUser(userId);
        res.json(bookings);


    }

    function updateBookingById (req, res) {
        var id = req.params.bookingId;
        var booking = req.body;
        booking = model.updateBookingById(id, booking);
        if(booking) {
            res.json(booking);
            return;
        }
        res.json({message: "User not found"});
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