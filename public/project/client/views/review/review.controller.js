/**
 * Created by Dhruv on 3/11/2016.
 */
/**
 * Created by Dhruv on 3/10/2016.
 */
"use strict";
(function()
{
    angular
        .module("RentOutApp")
        .controller("ReviewController", ReviewController);

    function ReviewController( ReviewService, $location, UserService)
    {
        //currently logged in user
        var vm = this;
        var currentUser = UserService.getCurrentUser();
        vm.$location = $location;
        function init() {
            ReviewService
                .findAllReviewsForUser(currentUser._id)
                .then(findAllReviewsForUserCallback);
        }
        init();

        vm.addReview = addReview;
        vm.removeReview = removeReview;
        vm.selectReview = selectReview;
        vm.updateReview = updateReview;

        function updateReview(review)
        {
            console.log(review._id);
            ReviewService
                .updateReviewById(review._id,review)
                .then(updateReviewCallback);
            vm.review = null;
        }

        function selectReview(index)
        {
            vm.selectedReviewIndex = index;
            vm.review = {
                _id: vm.users[index]._id,
                apartmentId: vm.users[index].apartmentId,
                description: vm.users[index].description,
                rating: vm.users[index].rating
            };

            //$scope.apartment = $scope.apartments[index];
        }

        function removeReview(index)
        {
            var reviewId = vm.users[index]._id;
            ReviewService
                .deleteReviewById(reviewId)
                .then(removeReviewCallback);
            //$scope.apartments.splice(index, 1);
        }

        function addReview(review)
        {
            var newReview = {
                apartmentId : review.apartmentId,
                description : review.description,
                rating : review.rating,
                reviewed_by : currentUser._id
            };
            ReviewService
                .addReview(newReview)
                .then(addReviewCallback);
            //$scope.apartments.push(newApartment);
        }

        //callback functions

        function findAllReviewsForUserCallback(reviewsCurrentUser) {
            vm.users = reviewsCurrentUser.data;
            console.log(reviewsCurrentUser);

        }

        function addReviewCallback(review) {
            console.log(review);
            init();
        }

        function removeReviewCallback(review) {
            init();
        }

        function updateReviewCallback(review) {
            init();
        }

    }
})();