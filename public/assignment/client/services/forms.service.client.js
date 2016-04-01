/**
 * Created by Dhruv on 2/23/2016.
 */
"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService",FormService);

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
            console.log("/api/assignment/user/"+userId+"/form>>>client service");
            return $http.get("/api/assignment/user/"+userId+"/form");
        }

        function deleteFormById(formId) {
           return $http.delete("/api/assignment/form/"+formId)
        }

        function updateFormById(formId, newForm) {
            console.log("update client service");
            return $http.put("/api/assignment/form/"+formId,newForm);
        }

    }

})();
