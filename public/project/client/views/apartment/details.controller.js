/**
 * Created by Dhruv on 3/3/2016.
 */
"use strict";
(function() {
    angular
        .module("RentOutApp")
        .controller("ApartmentDetailsController",ApartmentDetailsController);

    function ApartmentDetailsController($location, $routeParams, ApartmentService,UserService) {
        var vm = this;

        var apartmentId = $routeParams.apartmentId;
        var currentUser = UserService.getCurrentUser();
        vm.addApartmentToFavourites = addApartmentToFavourites;
        //$scope.showReviews = showReviews;
        //vm.addReview = addReview;

        vm.favouriteButton = "Mark as favourite";
        console.log(apartmentId);
        ApartmentService.findApartmentDetailsById(apartmentId, renderDetails);


        //function showReviews() {
        //    ReviewService
        //        .findAllReviewsForApartemnt(apartmentId)
        //        .then(function(res){
        //            console.log(res.data);
        //            vm.reviews = res.data;
        //        });
        //}
        //showReviews();
        //
        //function addReview(review)
        //{
        //    var newReview = {
        //        apartmentId : apartmentId,
        //        description : review.description,
        //        rating : review.rating,
        //        reviewed_by : currentUser._id
        //    };
        //    ReviewService
        //        .addReview(newReview)
        //        .then(addReviewCallback);
        //    //$scope.apartments.push(newApartment);
        //}

        function renderDetails(apartmentDetails) {
            console.log(apartmentDetails.place.place_details);
            vm.apartment = apartmentDetails.place.place_details;
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
            vm.favouriteButton = "Marked";
        }

        function addReviewCallback(review) {
            console.log(review);
            showReviews();
        }


        vm.myInterval = 5000;
        vm.noWrapSlides = false;
        vm.active = 0;
        var slides = vm.slides = [];
        var currIndex = 0;

        vm.addSlide = function () {
            var newWidth = 600 + slides.length + 1;
            slides.push({
                image: 'http://lorempixel.com/' + newWidth + '/300',
                text: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that'][slides.length % 4],
                id: currIndex++
            });
        };

        vm.randomize = function () {
            var indexes = generateIndexesArray();
            assignNewIndexesToSlides(indexes);
        };

        for (var i = 0; i < 4; i++) {
            vm.addSlide();
        }
    }
    })();