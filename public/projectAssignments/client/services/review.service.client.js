/**
 * Created by Dhruv on 3/11/2016.
 */
/**
 * Created by Dhruv on 3/10/2016.
 */
"use strict";
(function() {
    angular
        .module("RentOutApp")
        .factory("ReviewService",ReviewService);

    function ReviewService($http) {

        var api = {

            addReview : addReview,
            findAllReviewsForUser  : findAllReviewsForUser,
            findAllReviewsForApartemnt : findAllReviewsForApartemnt,
            deleteReviewById : deleteReviewById,
            updateReviewById : updateReviewById
        };
        return api;



        function findAllReviewsForUser (reviewedBy) {
            return $http.get("/api/projectAssignments/user/"+reviewedBy+"/review");
        }

        function findAllReviewsForApartemnt(apartmentId) {
            return $http.get("/api/projectAssignments/apartment/"+apartmentId+"/review");
        }

        function addReview(review)  {
            return $http.post("/api/projectAssignments/user/"+review.reviewed_by+"/review",review);
        }

        function deleteReviewById(reviewId) {
            return $http.delete("/api/projectAssignments/review/"+reviewId);
        }

        function updateReviewById(reviewId, newReview) {
            return $http.put("/api/projectAssignments/review/"+reviewId,newReview);
        }
    }
})();
