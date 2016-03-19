/**
 * Created by Dhruv on 3/18/2016.
 */
"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .factory("FieldService",FieldService);

    function FieldService($http) {

        var api = {
            createFieldForForm:createFieldForForm,
            getFieldsForForm:getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm:deleteFieldFromForm,
            updateField:updateField,
            updateFields: updateFields
        };

        return api;

        function createFieldForForm(formId, filed) {
            return $http.post("/api/assignment/form/"+formId+"/field",filed);
        }

        function getFieldsForForm(formId) {
            return $http.get("/api/assignment/form/"+formId+"/field");
        }

        function getFieldForForm(formId, fieldId) {
            return $http.get("/api/assignment/form/"+formId+"/field/"+fieldId);
        }

        function deleteFieldFromForm(formId,fieldId) {
            return $http.delete("/api/assignment/form/"+formId+"/field/"+fieldId)
        }

        function updateFields(formId, fields) {
            return $http.put("/api/assignment/form/" + formId + "/field/", fields);
        }

        function updateField(formId,fieldId, field) {
            return $http.put("/api/assignment/form/"+formId+"/field/"+fieldId,field);
        }

    }

})();
