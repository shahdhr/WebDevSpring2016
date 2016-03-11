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

    function ReviewController($scope, ReviewService, $location, UserService)
    {
        //currently logged in user
        var currentUser = UserService.getCurrentUser();
        $scope.$location = $location;
        function init() {
            ReviewService.findAllReviewsForUser(currentUser._id, findAllReviewsForUserCallback);
        }
        init();

        $scope.addReview = addReview;
        $scope.removeReview = removeReview;
        $scope.selectReview = selectReview;
        $scope.updateReview = updateReview;

        function updateReview(review)
        {
            console.log(review._id);
            ReviewService.updateReviewById(review._id,review,updateReviewCallback);
            $scope.review = null;
        }

        function selectReview(index)
        {
            $scope.selectedReviewIndex = index;
            $scope.review = {
                _id: $scope.reviews[index]._id,
                apartmentId: $scope.reviews[index].apartmentId,
                description: $scope.reviews[index].description,
                rating: $scope.reviews[index].rating
            };

            //$scope.apartment = $scope.apartments[index];
        }

        function removeReview(index)
        {
            var reviewId = $scope.reviews[index]._id;
            ReviewService.deleteReviewById(reviewId,removeReviewCallback);
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
            ReviewService.addReview(newReview,addReviewCallback);
            //$scope.apartments.push(newApartment);
        }

        //callback functions

        function findAllReviewsForUserCallback(reviewsCurrentUser) {
            $scope.reviews = reviewsCurrentUser;
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