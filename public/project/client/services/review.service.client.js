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

    function ReviewService() {

        var reviews = [
            {	"_id":123,  description: "Very clean",   "rating":"3", "apartmentId":"123",  "reviewed_by":123   },
            {	"_id":234,  description: "Very clean",   "rating":"3", "apartmentId":"123",  "reviewed_by":234   },
            {	"_id":345,  description: "Very clean",   "rating":"3", "apartmentId":"123",  "reviewed_by":345   },
            {	"_id":456,  description: "Very clean",   "rating":"3", "apartmentId":"123",  "reviewed_by":456   },
            {	"_id":567,  description: "Very clean",   "rating":"3", "apartmentId":"123",  "reviewed_by":567   },

        ];

        var api = {

            addReview : addReview,
            findAllReviewsForUser  : findAllReviewsForUser,
            deleteReviewById : deleteReviewById,
            updateReviewById : updateReviewById
        };
        return api;



        function findAllReviewsForUser (reviewedBy,callback) {
            var userReviews = [];
            for(var index=0; index<reviews.length; index++) {
                if(reviews[index].reviewed_by == reviewedBy) {
                    userReviews.push(reviews[index]);
                }
            }
            callback(userReviews);
        }



        function addReview(review,callback)  {
            review._id = (new Date()).getTime();
            reviews[reviews.length] = review;
            console.log(reviews);
            callback(review);

        }

        function deleteReviewById(review_id, callback) {
            for(var index=0; index<reviews.length; index++) {
                if(reviews[index]._id == review_id) {
                    reviews.splice(index,1);
                    break;
                }
            }
            callback(reviews);
        }

        function updateReviewById(reviewId, newReview, callback) {
            for(var index=0; index<reviews.length; index++) {
                if(reviews[index]._id == reviewId) {
                    reviews[index]._id = reviewId;
                    newReview._id = reviewId;
                    reviews[index].apartmentId = newReview.apartmentId;
                    reviews[index].description = newReview.description;
                    reviews[index].rating = newReview.rating;
                    break;
                }
            }
            callback(newReview);
        }







    }
})();
