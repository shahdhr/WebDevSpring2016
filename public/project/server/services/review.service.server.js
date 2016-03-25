/**
 * Created by Dhruv on 3/25/2016.
 */
"use strict";
module.exports = function (app, model,uuid) {
    app.get("/api/project/user/:userId/review", findAllReviewsForUser);
    app.put("/api/project/review/:reviewId",updateReviewById);
    app.post("/api/project/user/:userId/review",addReview);
    app.delete("/api/project/review/:reviewId",deleteReviewById);
    app.get("/api/project/apartment/:apartmentId/review", findAllReviewsForApartemnt);

    function addReview (req, res) {
        var review = req.body;
        review._id=uuid.v4();
        model.addReview(review);
        res.send (review);
    }

    function findAllReviewsForApartemnt(req,res) {
        var apartmentId = req.params.apartmentId;
        var reviews = model.findAllReviewsForApartemnt(apartmentId);
        res.json(reviews);
    }

    function findAllReviewsForUser (req, res) {

        var userId = req.params.userId;
        var reviews = model.findAllReviewsForUser(userId);
        res.json(reviews);


    }

    function updateReviewById (req, res) {
        var id = req.params.reviewId;
        var review = req.body;
        review = model.updateReviewById(id, review);
        if(review) {
            res.json(review);
            return;
        }
        res.json({message: "User not found"});
    }

    function deleteReviewById (req, res) {
        var id = req.params.reviewId;
        var reviews =model.deleteReviewById(id);
        if(reviews) {
            res.send(reviews);
            return;
        }
        res.json ({message: "User not found"});
    }
};