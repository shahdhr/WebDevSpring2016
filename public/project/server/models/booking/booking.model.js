/**
 * Created by Dhruv on 3/25/2016.
 */
"use strict";
var q = require("q");
module.exports = function() {
    var BookingSchema = require("./booking.schema.server.js")(mongoose);
    var BookingModel = mongoose.model('ProjectBooking', BookingSchema);
    //var bookings = require("./booking.mock.json");

    var api = {

        addBooking : addBooking,
        findAllBookingsForUser  : findAllBookingsForUser,
        deleteBookingById : deleteBookingById,
        updateBookingById : updateBookingById,
        findBookingById : findBookingById
    };
    return api;

    function findBookingById(id) {
        var deferred = q.defer();
        BookingModel.findOne({_id: id}, function (err, doc) {
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }


    function findAllBookingsForUser (bookedby) {
        //var userBookings = [];
        //for(var index=0;index<bookings.length;index++) {
        //    if(bookings[index].booked_by == bookedby) {
        //        userBookings.push(bookings[index]);
        //    }
        //}
        //return userBookings;
        var deferred = q.defer();
        BookingModel.find({booked_by: bookedby}, function (err, doc) {
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }



    function addBooking(booking)  {
        //bookings[bookings.length] = booking;
        //console.log(bookings);
        //return booking;
        var deferred = q.defer();
        BookingModel.create(booking, function (err, doc) {
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteBookingById(bookingId) {
        //for(var index=0;index<bookings.length;index++) {
        //    if(bookings[index]._id == bookingId) {
        //        bookings.splice(index,1);
        //        break;
        //    }
        //}
        //return bookings;
        var deferred = q.defer();
        BookingModel.remove({_id: bookingId}, function (err, doc) {
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateBookingById(bookingId, newBooking) {
        //for(var index=0;index<bookings.length;index++) {
        //    if(bookings[index]._id == bookingId) {
        //        bookings[index]._id = bookingId;
        //        newBooking._id = bookingId;
        //        bookings[index].apartmentId = newBooking.apartmentId;
        //        bookings[index].startDate = newBooking.startDate;
        //        bookings[index].endDate = newBooking.endDate;
        //        break;
        //    }
        //}
        //return newBooking;
        var deferred = q.defer();
        BookingModel.update({_id: bookingId}, {$set:newBooking}, function (err, doc) {
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }
};