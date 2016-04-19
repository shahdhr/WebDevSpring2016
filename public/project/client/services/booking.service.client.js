/**
 * Created by Dhruv on 3/10/2016.
 */
"use strict";
(function() {
    angular
        .module("RentOutApp")
        .factory("BookingService",BookingService);

    function BookingService($http) {


        var api = {

            addBooking : addBooking,
            findAllBookingsForUser  : findAllBookingsForUser,
            deleteBookingById : deleteBookingById,
            updateBookingById : updateBookingById
        };
        return api;



        function findAllBookingsForUser (bookedby) {
            return $http.get("/api/project/user/"+bookedby+"/booking");

        }



        function addBooking(booking)  {
            console.log("iyan aayvu");
            return $http.post("/api/project/user/"+booking.booked_by+"/booking",booking);
        }

        function deleteBookingById(bookingId) {
            return $http.delete("/api/project/booking/"+bookingId);

        }

        function updateBookingById(bookingId, newBooking) {
            return $http.put("/api/project/booking/"+bookingId,newBooking);
        }







    }
})();