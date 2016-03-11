/**
 * Created by Dhruv on 3/10/2016.
 */
"use strict";
(function() {
    angular
        .module("RentOutApp")
        .factory("BookingService",BookingService);

    function BookingService() {

        var bookings = [
            {	"_id":123,  startDate: "123",   "endDate":"123", "apartmentId":"123",  "booked_by":123   },
            {	"_id":234,  startDate: "",   "endDate":"", "apartmentId":"",  "booked_by":234   },
            {	"_id":345,  startDate: "",   "endDate":"", "apartmentId":"",  "booked_by":345   },
            {	"_id":456,  startDate: "",   "endDate":"", "apartmentId":"",  "booked_by":456   },
            {	"_id":567,  startDate: "",   "endDate":"", "apartmentId":"",  "booked_by":567   }

        ];

        var api = {

            addBooking : addBooking,
            findAllBookingsForUser  : findAllBookingsForUser,
            deleteBookingById : deleteBookingById,
            updateBookingById : updateBookingById
        };
        return api;



        function findAllBookingsForUser (bookedby,callback) {
            var userBookings = [];
            for(var index=0;index<bookings.length;index++) {
                if(bookings[index].booked_by == bookedby) {
                    userBookings.push(bookings[index]);
                }
            }
            callback(userBookings);
        }



        function addBooking(apartment,callback)  {
            apartment._id = (new Date()).getTime();
            bookings[bookings.length] = apartment;
            console.log(bookings);
            callback(apartment);

        }

        function deleteBookingById(bookingId, callback) {
            for(var index=0;index<bookings.length;index++) {
                if(bookings[index]._id == bookingId) {
                    bookings.splice(index,1);
                    break;
                }
            }
            callback(bookings);
        }

        function updateBookingById(bookingId, newBooking, callback) {
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
            callback(newBooking);
        }







    }
})();