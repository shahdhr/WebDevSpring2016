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
            return $http.get("/api/projectAssignments/user/"+bookedby+"/booking");

        }



        function addBooking(booking)  {
            return $http.post("/api/projectAssignments/user/"+booking.booked_by+"/booking",booking);
        }

        function deleteBookingById(bookingId) {
            return $http.delete("/api/projectAssignments/booking/"+bookingId);

        }

        function updateBookingById(bookingId, newBooking) {
            return $http.put("/api/projectAssignments/booking/"+bookingId,newBooking);
        }







    }
})();