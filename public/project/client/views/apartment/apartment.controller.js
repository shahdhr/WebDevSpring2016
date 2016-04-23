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
        //Declarations
        var vm = this;
        var currentUser = UserService.getCurrentUser();
        vm.$location = $location;
        vm.addApartment = addApartment;
        vm.checkedValues = checkedValues;
        vm.updateApartmentPic = updateApartmentPic;
        var checkedAmenities = [];
        vm.amenities = [
            {"label": "Heating/Air Conditioner", "value": "HEATING"},
            {"label": "Kitchen", "value": "KITCHEN"},
            {"label": "WiFi", "value": "WIFI"},
            {"label": "TV", "value": "TV"},
            {"label": "Washing Machine", "value": "WASHING"}];



        //Implementations
        function checkedValues(index,value) {
            checkedAmenities.push(value);
            console.log(value);
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
        }

        function updateApartmentPic() {
            ApartmentService.updateApartmentPicture(
                vm.apartmentId,
                vm.fileModel
            ).then(function successCallback(response) {
                vm.apartment.picUrl = response.data;
                $location.path("/details/rentOut/"+vm.apartmentId)
            });
        }

        //callbacks
        function addApartmentCallback(apartment) {
            console.log(apartment.data);
            vm.apartmentId = apartment.data._id;
            vm.hideForm=true;
        }
    }
})();