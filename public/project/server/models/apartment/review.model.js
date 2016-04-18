/**
 * Created by Dhruv on 3/25/2016.
 */
"use strict";
var q = require("q");
module.exports = function(db, mongoose) {
    //var reviews = require("./review.mock.json");
    var ReviewSchema = require("./review.schema.server.js")(mongoose);
    var ReviewModel = mongoose.model('ProjectReview', ReviewSchema);
    var api = {

        addReview : addReview,
        findAllReviewsForUser  : findAllReviewsForUser,
        deleteReviewById : deleteReviewById,
        updateReviewById : updateReviewById,
        findAllReviewsForApartemnt : findAllReviewsForApartemnt,
        findReviewById : findReviewById
    };
    return api;


    function findReviewById(reviewId) {
        var deferred = q.defer();
        ReviewModel.findOne({_id:reviewId}, function (err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }

        });
        return deferred.promise;
    }

    function findAllReviewsForApartemnt(apartmentId) {
        //var apartmentReviews = [];
        //for(var index=0; index<reviews.length; index++) {
        //    if(reviews[index].apartmentId == apartmentId) {
        //        apartmentReviews.push(reviews[index]);
        //    }
        //}
        //return apartmentReviews;
        var deferred = q.defer();
        ReviewModel.find({apartmentId:apartmentId}, function (err,doc) {
            if(err) {
                deferred.reject(err)
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllReviewsForUser (reviewedBy) {
        //var userReviews = [];
        //for(var index=0; index<reviews.length; index++) {
        //    if(reviews[index].reviewed_by == reviewedBy) {
        //        userReviews.push(reviews[index]);
        //    }
        //}
        //return userReviews;
        var deferred = q.defer();
        ReviewModel.find({reviewed_by: reviewedBy }, function (err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }



    function addReview(review)  {
        //reviews[reviews.length] = review;
        //console.log(reviews);
        //return review;
        var deferred = q.defer();
        ReviewModel.create(review, function (err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;

    }

    function deleteReviewById(review_id) {
        //for(var index=0; index<reviews.length; index++) {
        //    if(reviews[index]._id == review_id) {
        //        reviews.splice(index,1);
        //        break;
        //    }
        //}
        //return reviews;
        var deferred = q.defer();
        ReviewModel.remove({_id: review_id}, function (err,doc)  {
           if(err) {
               deferred.reject(err);
           } else {
               deferred.resolve(doc);
           }
        });
        return deferred.promise;
    }

    function updateReviewById(reviewId, newReview) {
        //for(var index=0; index<reviews.length; index++) {
        //    if(reviews[index]._id == reviewId) {
        //        reviews[index]._id = reviewId;
        //        newReview._id = reviewId;
        //        reviews[index].apartmentId = newReview.apartmentId;
        //        reviews[index].description = newReview.description;
        //        reviews[index].rating = newReview.rating;
        //        break;
        //    }
        //}
        //return newReview;
        var deferred = q.defer();
        ReviewModel.update({_id:reviewId},{$set: newReview}, function (err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }
};