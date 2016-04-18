/**
 * Created by Dhruv on 3/25/2016.
 */
"use strict";
module.exports = function (app, model) {
    app.get("/api/project/user/:userId/review", findAllReviewsForUser);
    app.put("/api/project/review/:reviewId",updateReviewById);
    app.post("/api/project/user/:userId/review",addReview);
    app.delete("/api/project/review/:reviewId",deleteReviewById);
    app.get("/api/project/apartment/:apartmentId/review", findAllReviewsForApartemnt);

    function addReview (req, res) {
        var review = req.body;
        model.addReview(review)
            .then(function (doc) {
                res.json(doc);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function findAllReviewsForApartemnt(req,res) {
        var apartmentId = req.params.apartmentId;
        model.findAllReviewsForApartemnt(apartmentId)
            .then(function (doc) {
                res.json(doc);
            }, function (err) {
                res.status(400).send(err);
            });
        //res.json(reviews);
    }

    function findAllReviewsForUser (req, res) {

        var userId = req.params.userId;
        model.findAllReviewsForUser(userId)
            .then(function (doc) {
                res.json(doc);
            }, function (err) {
                res.status(400).send(err);
            });
        res.json(reviews);
    }

    function updateReviewById (req, res) {
        var id = req.params.reviewId;
        var review = req.body;
        model.updateReviewById(id, review)
            .then(function (doc) {
                model.findReviewById(id)
                    .then(function (doc) {
                        res.json(doc);
                    }, function (err) {
                        res.status(400).send(err);
                    });
            },function (err) {
                res.status(400).send(err);
            });
        //if(review) {
        //    res.json(review);
        //    return;
        //}
        //res.json({message: "User not found"});
    }

    function deleteReviewById (req, res) {
        var id = req.params.reviewId;
        model.deleteReviewById(id)
            .then(function (doc) {
                res.json(doc);
            }, function (err) {
                res.status(400).send(err);
            });
        //if(reviews) {
        //    res.send(reviews);
        //    return;
        //}
        //res.json ({message: "User not found"});
    }
};