/**
 * Created by Dhruv on 3/3/2016.
 */
"use strict";
(function() {
    angular
        .module("RentOutApp")
        .controller("ApartmentDetailsController",ApartmentDetailsController);

    function ApartmentDetailsController($scope, $location, $routeParams, ApartmentService,UserService, ReviewService) {
        var apartmentId = $routeParams.apartmentId;
        var currentUser = UserService.getCurrentUser();
        $scope.addApartmentToFavourites = addApartmentToFavourites;
        //$scope.showReviews = showReviews;
        $scope.addReview = addReview;

        $scope.favouriteButton = "Mark as favourite";
        console.log(apartmentId);
        ApartmentService.findApartmentDetailsById(apartmentId,renderDetails);


        function showReviews() {
            ReviewService
                .findAllReviewsForApartemnt(apartmentId)
                .then(function(res){
                    console.log(res.data);
                    $scope.reviews = res.data;
                });
        }
        showReviews();

        function addReview(review)
        {
            var newReview = {
                apartmentId : apartmentId,
                description : review.description,
                rating : review.rating,
                reviewed_by : currentUser._id
            };
            ReviewService
                .addReview(newReview)
                .then(addReviewCallback);
            //$scope.apartments.push(newApartment);
        }

        function renderDetails(apartmentDetails) {
            console.log(apartmentDetails.place.place_details);
            $scope.apartment = apartmentDetails.place.place_details;
        }

        function addApartmentToFavourites() {
            var user = UserService.getCurrentUser();
            user.favourites.push(apartmentId);
            UserService
                .updateUser(user._id, user)
                .then(addApartmentToFavouritesCallback);

        }
        function addApartmentToFavouritesCallback(user) {
            console.log(user.data.favourites);
            $scope.favouriteButton = "Marked";
        }

        function addReviewCallback(review) {
            console.log(review);
            showReviews();
        }
    }


})();