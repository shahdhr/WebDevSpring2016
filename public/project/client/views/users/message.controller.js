/**
 * Created by Dhruv on 4/20/2016.
 */
'use strict';
(function () {
    angular
        .module("RentOutApp")
        .controller("ChatController", ChatController);

    function ChatController(UserService, MessageService) {
        var vm = this;

        //Even handler declarations
        vm.findMessageDetailsById = findMessageDetailsById;
        vm.addMessage = addMessage;
        vm.removeMessage = removeMessage;
        vm.sendMessage = sendMessage;


        function init() {
            var currentUser = UserService.getCurrentUser();
            MessageService.findAllMessagesForUser(currentUser._id)
                .then(function(res) {
                    vm.userMessages = res.data;
                });
        } init();

        //Event Handler declarations
        function findMessageDetailsById(message) {
            MessageService.findAChat(message.message_to,message.message_by)
                .then(function(res) {
                    vm.chat = res.data;
                    console.log(vm.chat);
                });
        }

        function addMessage(newmessage) {
            var currentUser = UserService.getCurrentUser();
            var to = newMessage.message_to;
            newMessage.message_to = newMessage.message_by;
            newMessage.message_by = to;
            newMessage.message_by_name = currentUser.firstName +" "+ currentUser.lastName;
            MessageService.addMessage(newmessage)
        }

        function removeMessage(message) {
            MessageService.deleteMessageById(message._id)
                .then(function(res) {
                    findMessageDetailsById(message);
                })
        }

        function sendMessage(typedMessage) {
            var currentUser = UserService.getCurrentUser();
            if(vm.chat && vm.chat.length > 0) {
                var message = vm.chat[0];
                for(var i = 0;i<vm.chat.length;i++) {
                    if(vm.chat[i].message_to == currentUser._id) {
                        message = vm.chat[i];
                        break;
                    }
                }
                var newMessage = {
                    message: typedMessage,
                    message_to: message.message_by,
                    message_by: currentUser._id,
                    message_time : Date.now,
                    message_by_name : currentUser.firstName + currentUser.lastName,
                    apartment : message.apartment,
                    apartment_id : message.apartment_id
                };
                MessageService.addMessage(newMessage)
                    .then(function(res) {
                        findMessageDetailsById(newMessage);
                    })
            }

        }

    }

})();