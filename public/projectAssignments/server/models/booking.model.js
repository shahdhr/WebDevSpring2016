/**
 * Created by Dhruv on 3/25/2016.
 */
"use strict";
module.exports = function() {
    var bookings = require("./booking.mock.json");

    var api = {

        addBooking : addBooking,
        findAllBookingsForUser  : findAllBookingsForUser,
        deleteBookingById : deleteBookingById,
        updateBookingById : updateBookingById
    };
    return api;



    function findAllBookingsForUser (bookedby) {
        var userBookings = [];
        for(var index=0;index<bookings.length;index++) {
            if(bookings[index].booked_by == bookedby) {
                userBookings.push(bookings[index]);
            }
        }
        return userBookings;
    }



    function addBooking(booking)  {
        bookings[bookings.length] = booking;
        console.log(bookings);
        return booking;

    }

    function deleteBookingById(bookingId) {
        for(var index=0;index<bookings.length;index++) {
            if(bookings[index]._id == bookingId) {
                bookings.splice(index,1);
                break;
            }
        }
        return bookings;
    }

    function updateBookingById(bookingId, newBooking) {
        for(var index=0;index<bookings.length;index++) {
            if(bookings[index]._id == bookingId) {
                bookings[index]._id = bookingId;
                newBooking._id = bookingId;
                bookings[index].apartmentId = newBooking.apartmentId;
                bookings[index].startDate = newBooking.startDate;
                bookings[index].endDate = newBooking.endDate;
                break;
            }
        }
        return newBooking;
    }
};