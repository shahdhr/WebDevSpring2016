/**
 * Created by Dhruv on 3/3/2016.
 */
"use strict";
(function() {
    angular
        .module("RentOutApp")
        .controller("ApartmentDetailsController",ApartmentDetailsController);

    function ApartmentDetailsController( $routeParams, ApartmentService,UserService,ReviewService) {
        var vm = this;

        var apartmentId = $routeParams.apartmentId;
        var currentUser = UserService.getCurrentUser();
        vm.addApartmentToFavourites = addApartmentToFavourites;
        vm.showReviews = showReviews;
        vm.addReview = addReview;

        vm.favouriteButton = "Mark as favourite";
        console.log(apartmentId);
        ApartmentService.findApartmentDetailsById(apartmentId, renderDetails);


        function showReviews() {
            ReviewService
                .findAllReviewsForApartemnt(apartmentId)
                .then(function(res){
                    console.log(res.data);
                    vm.reviews = res.data;
                });
        }
        showReviews();

        function addReview(review)
        {
            var user = UserService.getCurrentUser();
            var newReview = {
                apartmentId : apartmentId,
                description : review.description,
                rating : review.rating,
                reviewed_by : user._id
            };
            ReviewService
                .addReview(newReview)
                .then(addReviewCallback);

            vm.review = null;
            //$scope.apartments.push(newApartment);
        }

        function renderDetails(apartmentDetails) {
            console.log(apartmentDetails.place.place_details);
            vm.apartment = apartmentDetails.place.place_details;
            makeSlides();
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
        var slides = [];
        var currIndex = 0;


        function makeSlides() {
          var slidesNew = vm.apartment.additional_photos;
            var loop = slidesNew.length;
            if(loop > 10) {
                loop = 10;
            }
          for(var  i = 0;i<loop;i++) {
              //console.log(slidesNew[i].place_photo.url);

              slidesNew[i].place_photo.url = slidesNew[i].place_photo.url.replace("/medium.","/large.");
              slides.push(slidesNew[i]);
          }

            vm.newSlides = slides;

        }



    }
    })();