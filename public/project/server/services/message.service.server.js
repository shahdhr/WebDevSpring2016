/**
 * Created by Dhruv on 4/20/2016.
 */
"use strict";
module.exports = function (app, model) {
    app.get("/api/project/user/:userId/message", findAllMessagesForUser);
    app.put("/api/project/message/:messageId",updateMessageById);
    app.post("/api/project/message",addMessage);
    app.delete("/api/project/message/:messageId",deleteMessageById);
    app.get("/api/project/chat/to/:to/from/:from",findAChat);

    function addMessage (req, res) {
        var message = req.body;
        model.addMessage(message)
            .then(function (doc) {
                res.json(doc);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function findAllMessagesForUser (req, res) {

        var userId = req.params.userId;
        model.findAllMessagesForUser(userId)
            .then(function (doc) {
                res.json(doc);
            }, function (err) {
                res.status(400).send(err);
            });

    }

    function findAChat(req,res) {
        var toId = req.params.to;
        var fromId = req.params.from;
        model.findAllToFromMessages(toId,fromId)
            .then(function (doc) {

                var halfChat = doc;
                console.log("Half Chat");
                console.log(halfChat);
                model.findAllToFromMessages(fromId,toId)
                    .then(function (doc) {
                        for(var i = 0; i<doc.length;i++) {
                            halfChat.push(doc[i]);
                        }
                        console.log("Full Chat");
                        console.log(halfChat);
                        res.json(halfChat);
                    }, function (err) {
                        res.status(400).send(err);
                    });
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function updateMessageById (req, res) {
        var id = req.params.messageId;
        var message = req.body;
        model.updateMessageById(id, message)
            .then(function (doc) {
                model.findMessageById(id)
                    .then(function (doc) {
                        res.json(doc);
                    }, function (err) {
                        res.status(400).send(err);
                    });
            },function (err) {
                res.status(400).send(err);
            });
    }

    function deleteMessageById (req, res) {
        var id = req.params.messageId;
        model.deleteMessageById(id)
            .then(function (doc) {
                res.json(doc);
            }, function (err) {
                res.status(400).send(err);
            });
    }
};