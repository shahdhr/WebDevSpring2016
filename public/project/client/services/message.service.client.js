/**
 * Created by Dhruv on 4/20/2016.
 */
"use strict";
(function() {
    angular
        .module("RentOutApp")
        .factory("MessageService",MessageService);

    function MessageService($http) {
        var api = {

            addMessage : addMessage,
            findAllMessagesForUser  : findAllMessagesForUser,
            deleteMessageById : deleteMessageById,
            updateMessageById : updateMessageById,
            findAChat : findAChat
        };
        return api;

        function findAllMessagesForUser (userId) {
            return $http.get("/api/project/user/"+userId+"/message");
        }

        function addMessage(message)  {
            return $http.post("/api/project/message",message);
        }

        function deleteMessageById(messageId) {
            return $http.delete("/api/project/message/"+messageId);
        }

        function updateMessageById(messageId, newMessage) {
            return $http.put("/api/project/message/"+messageId,newMessage);
        }

        function findAChat(to,from) {
            return $http.get("/api/project/chat/to/"+to+"/from/"+from);

        }

    }
})();