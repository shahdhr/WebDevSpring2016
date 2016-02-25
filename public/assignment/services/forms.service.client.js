/**
 * Created by Dhruv on 2/23/2016.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService",FormService)

    function FormService() {
        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ];

        var api = {
            createFormForUser:createFormForUser,
            findAllFormsForUser:findAllFormsForUser,
            deleteFormById:deleteFormById,
            updateFormById:updateFormById
        }

        return api;

        function createFormForUser(userId, form, callback) {
            form._id = (new Date).getTime();
            form.userId  = userId;
            forms.push(form);
            callback(form);
        }

        function findAllFormsForUser(userId, callback) {
            var userForms = [];
            for(index=0;index<forms.length;index++) {
                if(forms[index].userId == userId) {
                    userForms.push(forms[index]);
                }
            }
            callback(userForms);
        }

        function deleteFormById(formId, callback) {
            for(index=0;index<forms.length;index++) {
                if(forms[index]._id == formId) {
                    forms.remove(index);
                    break;
                }
            }
            callback(forms);
        }

        function updateFormById(formId, newForm, callback) {
            for(index=0;index<forms.length;index++) {
                if(forms[index]._id == formId) {
                    forms[index]._id = formId;
                    newform._id = formId;
                    forms[index].title = newForm.title;
                    forms[index].userId = newForm.userId;
                    break;
                }
            }
            callback(newForm);
        }

    }

})();
