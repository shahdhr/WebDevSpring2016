/**
 * Created by Dhruv on 3/25/2016.
 */
"use strict";
var q = require("q");
module.exports = function(db,mongoose) {
    var BookingSchema = require("./booking.schema.server.js")(mongoose);
    var BookingModel = mongoose.model('ProjectBooking', BookingSchema);
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
        if(newBooking._id){
            delete newBooking._id;
        }

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