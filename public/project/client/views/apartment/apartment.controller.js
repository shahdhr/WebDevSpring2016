/**
 * Created by Dhruv on 3/10/2016.
 */
"use strict";
(function()
{
    angular
        .module("RentOutApp")
        .controller("ApartmentController", ApartmentController);

    function ApartmentController(ApartmentService, $location, UserService)
    {
        var vm = this;
        //currently logged in user
        var currentUser = UserService.getCurrentUser();
        vm.$location = $location;
        //$scope.apartments = [
        //    {title: "12 Woodward", bedrooms: 5, address: new Date(2015,1,1), amenities:"", description:""},
        //    {title: "403 Matruchhaya", bedrooms: 2, address: new Date(2015,1,1), amenities:"", description:""},
        //    {title: "1016 CityView", bedrooms: 3,  address: new Date(2015,1,1), amenities:"", description:""},
        //];
        function init() {
            var currentUser = UserService.getCurrentUser();
            ApartmentService
                .findAllApartmentsForUser(currentUser._id)
                .then(findAllApartmentsForUserCallback);
        }
        init();

        vm.addApartment = addApartment;
        vm.removeApartment = removeApartment;
        vm.selectApartment = selectApartment;
        vm.updateApartment = updateApartment;
        vm.checkedValues = checkedValues;
        var checkedAmenities = [];
        vm.amenities = [
            {"label": "Heating/Air Conditioner", "value": "HEATING"},
            {"label": "Kitchen", "value": "KITCHEN"},
            {"label": "WiFi", "value": "WIFI"},
            {"label": "TV", "value": "TV"},
            {"label": "Washing Machine", "value": "WASHING"}];

        function updateApartment(apartment)
        {
            console.log(apartment.id);
            ApartmentService
                .updateApartmentById(apartment._id,apartment)
                .then(updateApartmentCallback);
            vm.apartment = null;

        }

        function checkedValues(index,value) {
            checkedAmenities.push(value);
            console.log(value);
        }

        function selectApartment(index)
        {
            vm.selectedApartmentIndex = index;
            vm.apartment = {
                _id: vm.apartments[index]._id,
                title: vm.apartments[index].title,
                bedrooms: vm.apartments[index].bedrooms,
                description: vm.apartments[index].description
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
            console.log(vm.checked);
            var currentUser = UserService.getCurrentUser();
            if(currentUser){
                if(apartment) {
                    apartment.owner_id = currentUser._id;
                    apartment.amenities = checkedAmenities;
                    ApartmentService
                        .addApartment(apartment)
                        .then(addApartmentCallback);
                }
            }

            //$scope.apartments.push(newApartment);
        }

        //callback functions

        function findAllApartmentsForUserCallback(apartmentsCurrentUser) {
            vm.apartments = apartmentsCurrentUser.data;
            console.log(apartmentsCurrentUser);

        }

        function addApartmentCallback(apartment) {
            console.log(apartment.data);
            //init();
        }

        function removeApartmentCallback(apartments) {
            init();
        }

        function updateApartmentCallback(apartment) {
            init();
        }

    }
})();