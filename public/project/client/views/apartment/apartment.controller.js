/**
 * Created by Dhruv on 3/10/2016.
 */
"use strict";
(function()
{
    angular
        .module("RentOutApp")
        .controller("ApartmentController", ApartmentController);

    function ApartmentController($scope, ApartmentService, $location, UserService)
    {
        //currently logged in user
        var currentUser = UserService.getCurrentUser();
        $scope.$location = $location;
        //$scope.apartments = [
        //    {title: "12 Woodward", bedrooms: 5, address: new Date(2015,1,1), amenities:"", description:""},
        //    {title: "403 Matruchhaya", bedrooms: 2, address: new Date(2015,1,1), amenities:"", description:""},
        //    {title: "1016 CityView", bedrooms: 3,  address: new Date(2015,1,1), amenities:"", description:""},
        //];
        function init() {
            ApartmentService
                .findAllApartmentsForUser(currentUser._id)
                .then(findAllApartmentsForUserCallback);
        }
        init();

        $scope.addApartment = addApartment;
        $scope.removeApartment = removeApartment;
        $scope.selectApartment = selectApartment;
        $scope.updateApartment = updateApartment;

        function updateApartment(apartment)
        {
            console.log(apartment.id);
            ApartmentService
                .updateApartmentById(apartment._id,apartment)
                .then(updateApartmentCallback);
            $scope.apartment = null;

        }

        function selectApartment(index)
        {
            $scope.selectedApartmentIndex = index;
            $scope.apartment = {
                _id: $scope.apartments[index]._id,
                title: $scope.apartments[index].title,
                bedrooms: $scope.apartments[index].bedrooms,
                description: $scope.apartments[index].description
            };

            //$scope.apartment = $scope.apartments[index];
        }

        function removeApartment(index)
        {

            var apartmentId = $scope.apartments[index]._id;
            ApartmentService
                .deleteApartmentById(apartmentId)
                .then(removeApartmentCallback);
            //$scope.apartments.splice(index, 1);
        }

        function addApartment(apartment)
        {
            var newApartment = {
                title : apartment.title,
                bedrooms : apartment.bedrooms,
                description : apartment.description,
                ownerId : currentUser._id
            };
            ApartmentService
                .addApartment(newApartment)
                .then(addApartmentCallback);
            //$scope.apartments.push(newApartment);
        }

        //callback functions

        function findAllApartmentsForUserCallback(apartmentsCurrentUser) {
            $scope.apartments = apartmentsCurrentUser.data;
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