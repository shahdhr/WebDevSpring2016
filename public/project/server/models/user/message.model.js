/**
 * Created by Dhruv on 4/20/2016.
 */
"use strict";
var q = require("q");
module.exports = function(db, mongoose) {
    var MessageSchema = require("./message.schema.server.js")(mongoose);
    var MessageModel = mongoose.model('ProjectMessage', MessageSchema);
    var api = {

        addMessage : addMessage,
        findAllMessagesForUser  : findAllMessagesForUser,
        deleteMessageById : deleteMessageById,
        updateMessageById : updateMessageById,
        findMessageById : findMessageById,
        findAllToFromMessages : findAllToFromMessages
    };
    return api;


    function findMessageById(messageId) {
        var deferred = q.defer();
        MessageModel.findOne({_id:messageId}, function (err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }

        });
        return deferred.promise;
    }


    function findAllMessagesForUser (messagedTo) {
        var deferred = q.defer();
        MessageModel.find({message_to: messagedTo }, function (err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllToFromMessages(toId,fromId) {
        var deferred = q.defer();
        MessageModel.find({message_by:fromId, message_to:toId}, function (err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }



    function addMessage(message)  {
        var deferred = q.defer();
        MessageModel.create(message, function (err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;

    }

    function deleteMessageById(message_id) {
        var deferred = q.defer();
        MessageModel.remove({_id: message_id}, function (err,doc)  {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateMessageById(messageId, newMessage) {
        if(newMessage._id) {
            delete newMessage._id;
        }
        var deferred = q.defer();
        MessageModel.update({_id:messageId},{$set: newMessage}, function (err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }
};