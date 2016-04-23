/**
 * Created by Dhruv on 3/25/2016.
 */
"use strict";
var q = require("q");
module.exports = function(db, mongoose) {
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
        if(newReview._id) {
            delete newReview._id;
        }
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