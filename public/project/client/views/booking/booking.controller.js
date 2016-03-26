/**
 * Created by Dhruv on 3/10/2016.
 */
"use strict";
(function()
{
    angular
        .module("RentOutApp")
        .controller("BookingController", BookingController);

    function BookingController(BookingService, $location, UserService)
    {
        //currently logged in user
        var vm =this;
        var currentUser = UserService.getCurrentUser();
        vm.$location = $location;
        function init() {
            BookingService
                .findAllBookingsForUser(currentUser._id)
                .then(findAllBookingsForUserCallback);
        }
        init();

        vm.addBooking = addBooking;
        vm.removeBooking = removeBooking;
        vm.selectBooking = selectBooking;
        vm.updateBooking = updateBooking;

        function updateBooking(booking)
        {
            console.log(booking._id);
            BookingService
                .updateBookingById(booking._id,booking)
                .then(updateBookingCallback);
            vm.booking = null;
        }

        function selectBooking(index)
        {
            vm.selectedBookingIndex = index;
            vm.booking = {
                _id: vm.bookings[index]._id,
                apartmentId: vm.bookings[index].apartmentId,
                startDate: vm.bookings[index].startDate,
                endDate: vm.bookings[index].endDate
            };

            //$scope.apartment = $scope.apartments[index];
        }

        function removeBooking(index)
        {
            var bookingId = vm.bookings[index]._id;
            console.log(bookingId);
            BookingService
                .deleteBookingById(bookingId)
                .then(removeBookingCallback);
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
            BookingService
                .addBooking(newBooking)
                .then(addBookingCallback);
            //$scope.apartments.push(newApartment);
        }

        //callback functions

        function findAllBookingsForUserCallback(bookingsCurrentUser) {
            vm.bookings = bookingsCurrentUser.data;
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