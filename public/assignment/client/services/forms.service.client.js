/**
 * Created by Dhruv on 2/23/2016.
 */
"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService",FormService)

    function FormService($http) {

        var api = {
            createFormForUser:createFormForUser,
            findAllFormsForUser:findAllFormsForUser,
            deleteFormById:deleteFormById,
            updateFormById:updateFormById
        };

        return api;

        function createFormForUser(userId, form) {
           return $http.post("/api/assignment/user/"+userId+"/form",form);
        }

        function findAllFormsForUser(userId) {
            return $htpp.get("/api/assignment/user/"+userId+"/form");
        }

        function deleteFormById(formId) {
           return $htpp.delete("/api/assignment/form/"+formId)
        }

        function updateFormById(formId, newForm) {
            return $http.put("/api/assignment/form/"+formId,newForm);
        }

    }

})();
