/**
 * Created by Dhruv on 3/25/2016.
 */
"use strict";
module.exports = function() {
    var reviews = require("./review.mock.json");

    var api = {

        addReview : addReview,
        findAllReviewsForUser  : findAllReviewsForUser,
        deleteReviewById : deleteReviewById,
        updateReviewById : updateReviewById
    };
    return api;



    function findAllReviewsForUser (reviewedBy) {
        var userReviews = [];
        for(var index=0; index<reviews.length; index++) {
            if(reviews[index].reviewed_by == reviewedBy) {
                userReviews.push(reviews[index]);
            }
        }
        return userReviews;
    }



    function addReview(review)  {
        reviews[reviews.length] = review;
        console.log(reviews);
        return review;

    }

    function deleteReviewById(review_id) {
        for(var index=0; index<reviews.length; index++) {
            if(reviews[index]._id == review_id) {
                reviews.splice(index,1);
                break;
            }
        }
        return reviews;
    }

    function updateReviewById(reviewId, newReview) {
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
        return newReview;
    }
};