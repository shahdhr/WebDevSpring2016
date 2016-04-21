/**
 * Created by Dhruv on 4/21/2016.
 */
"use strict";
(function()
{
    angular
        .module("RentOutApp")
        .controller("ApartmentAdminController", ApartmentController);

    function ApartmentController(ApartmentService, $location, UserService)
    {
        var vm = this;
        //currently logged in user
        var currentUser = UserService.getCurrentUser();
        vm.$location = $location;
        function init() {
            ApartmentService
                .findAllApartments()
                .then(findAllApartmentsCallback);
        }
        init();

        vm.addApartment = addApartment;
        vm.removeApartment = removeApartment;
        vm.selectApartment = selectApartment;
        vm.updateApartment = updateApartment;

        function updateApartment(apartment)
        {
            console.log(apartment.id);
            ApartmentService
                .updateApartmentById(apartment._id,apartment)
                .then(updateApartmentCallback);
            vm.apartment = null;

        }

        function selectApartment(index)
        {
            vm.selectedApartmentIndex = index;
            vm.apartment = {
                _id: vm.apartments[index]._id,
                title: vm.apartments[index].title,
                description: vm.apartments[index].description,
                city: vm.apartments[index].city,
                country: vm.apartments[index].country,
                zipcode: vm.apartments[index].zipcode,
                price: vm.apartments[index].price,
                number_of_bedrooms: vm.apartments[index].number_of_bedrooms,
                number_of_bathrooms: vm.apartments[index].number_of_bathrooms
            };

            //$scope.apartment = $scope.apartments[index];
        }

        function removeApartment(index)
        {

            var apartmentId = vm.apartments[index]._id;
            ApartmentService
                .deleteApartmentById(apartmentId)
                .then(removeApartmentCallback);
            //$scope.apartments.splice(index, 1);
        }

        function addApartment(apartment)
        {
            var currentUser = UserService.getCurrentUser();
            var newApartment = {
                title: apartment.title,
                description: apartment.description,
                city: apartment.city,
                country: apartment.country,
                zipcode: apartment.zipcode,
                price: apartment.price,
                number_of_bedrooms: apartment.number_of_bedrooms,
                number_of_bathrooms: apartment.number_of_bathrooms,
                owner_id : currentUser._id
            };
            ApartmentService
                .addApartment(newApartment)
                .then(addApartmentCallback);
            //$scope.apartments.push(newApartment);
        }

        //callback functions

        function findAllApartmentsCallback(apartmentsCurrentUser) {
            vm.apartments = apartmentsCurrentUser.data;
            console.log(apartmentsCurrentUser);

        }

        function addApartmentCallback(apartment) {
            console.log(apartment.data);
            init();
        }

        function removeApartmentCallback(apartments) {
            init();
        }

        function updateApartmentCallback(apartment) {
            init();
        }

    }
})();