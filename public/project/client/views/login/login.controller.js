/**
 * Created by Dhruv on 3/4/2016.
 */
"use strict";
(function() {
    angular
        .module("RentOutApp")
        .controller("LoginController",LoginController);

    function LoginController($uibModalInstance) {
        var vm = this;


        //Even handler declarations

        vm.ok = ok;
        vm.cancel = cancel;

        //Event handler implemntations

        function ok(user) {
            if(user){
                if(user.username && user.password) {
                    $uibModalInstance.close(user);
                }

            }
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

    }
})();