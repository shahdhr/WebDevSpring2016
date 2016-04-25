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

            var currentUser = UserService.getCurrentUser();
            if(currentUser){
                var validated = true;
                $('#title-group').removeClass('has-error');
                $('#description-group').removeClass('has-error');
                $('#amenities-group').removeClass('has-error');
                $('#street-address-group').removeClass('has-error');
                $('#city-group').removeClass('has-error');
                $('#country-group').removeClass('has-error');
                $('#zip-group').removeClass('has-error');
                $('#bedrooms-group').removeClass('has-error');
                $('#bathrooms-group').removeClass('has-error');
                if(!apartment) {
                    $('#title-group').addClass('has-error');
                    $('#description-group').addClass('has-error');
                    $('#amenities-group').addClass('has-error');
                    $('#street-address-group').addClass('has-error');
                    $('#city-group').addClass('has-error');
                    $('#country-group').addClass('has-error');
                    $('#zip-group').addClass('has-error');
                    $('#bedrooms-group').addClass('has-error');
                    $('#bathrooms-group').addClass('has-error');
                    validated = false;
                } else {
                    if(!apartment.title || apartment.title == '') {
                        $('#title-group').addClass('has-error');
                        validated = false;
                    }
                    if(!apartment.description || apartment.description == '') {
                        $('#description-group').addClass('has-error');
                        validated = false;
                    }
                    if(!apartment.street || apartment.street == '') {
                        $('#street-address-group').addClass('has-error');
                        validated = false;
                    }
                    if(!apartment.city || apartment.city == '') {
                        $('#city-group').addClass('has-error');
                        validated = false;
                    }
                    if(!apartment.country || apartment.country == '') {
                        $('#country-group').addClass('has-error');
                        validated = false;
                    }
                    if(!apartment.zipcode || apartment.zipcode == '') {
                        $('#zip-group').addClass('has-error');
                        validated = false;
                    }
                    if(!apartment.number_of_bedrooms || apartment.number_of_bedrooms == '') {
                        $('#bedrooms-group').addClass('has-error');
                        validated = false;
                    }
                    if(!apartment.number_of_bathrooms || apartment.number_of_bathrooms == '') {
                        $('#bathrooms-group').addClass('has-error');
                        validated = false;
                    }
                }

                if(!validated) {
                    return;
                }

                apartment.owner_id = currentUser._id;
                apartment.amenities = checkedAmenities;
                ApartmentService
                    .addApartment(apartment)
                    .then(addApartmentCallback);

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