/**
 * Created by Dhruv on 3/10/2016.
 */
"use strict";
(function()
{
    angular
        .module("RentOutApp")
        .controller("BookingController", BookingController);

    function BookingController($scope, BookingService, $location, UserService)
    {
        //currently logged in user
        var currentUser = UserService.getCurrentUser();
        $scope.$location = $location;
        function init() {
            BookingService.findAllBookingsForUser(currentUser._id, findAllBookingsForUserCallback);
        }
        init();

        $scope.addBooking = addBooking;
        $scope.removeBooking = removeBooking;
        $scope.selectBooking = selectBooking;
        $scope.updateBooking = updateBooking;

        function updateBooking(booking)
        {
            console.log(booking._id);
            BookingService.updateBookingById(booking._id,booking,updateBookingCallback);
            $scope.booking = null;
        }

        function selectBooking(index)
        {
            $scope.selectedBookingIndex = index;
            $scope.booking = {
                _id: $scope.bookings[index]._id,
                apartmentId: $scope.bookings[index].apartmentId,
                startDate: $scope.bookings[index].startDate,
                endDate: $scope.bookings[index].endDate
            };

            //$scope.apartment = $scope.apartments[index];
        }

        function removeBooking(index)
        {
            var bookingId = $scope.bookings[index]._id;
            BookingService.deleteBookingById(bookingId,removeBookingCallback);
            //$scope.apartments.splice(index, 1);
        }

        function addBooking(booking)
        {
            var newBooking = {
                apartmentId : booking.apartmentId,
                startDate : booking.startDate,
                endDate : booking.endDate,
                booked_by : currentUser._id
            };
            BookingService.addBooking(newBooking,addBookingCallback);
            //$scope.apartments.push(newApartment);
        }

        //callback functions

        function findAllBookingsForUserCallback(bookingsCurrentUser) {
            $scope.bookings = bookingsCurrentUser;
            console.log(bookingsCurrentUser);

        }

        function addBookingCallback(booking) {
            console.log(booking);
            init();
        }

        function removeBookingCallback(booking) {
            init();
        }

        function updateBookingCallback(booking) {
            init();
        }

    }
})();