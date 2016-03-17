/**
 * Created by Dhruv on 3/17/2016.
 */
module.exports = function() {
    var forms = require("./form.mock.json");
    var api = {
        createFormForUser:createFormForUser,
        findAllFormsForUser:findAllFormsForUser,
        deleteFormById:deleteFormById,
        updateFormById:updateFormById,
        findFormByTitle:findFormByTitle
    };

    return api;


    function createFormForUser(userId, form) {
        var newForm = {
            _id: (new Date).getTime(),
            userId: userId,
            title: form.title
        }

        forms.push(newForm);
        return newForm
    }

    function findAllFormsForUser(userId) {
        var userForms = [];
        for(var index=0;index<forms.length;index++) {
            if(forms[index].userId == userId) {
                userForms.push(forms[index]);
            }
        }
        return userForms;
    }

    function findFormByTitle(title) {
        for(var index=0;index<forms.length;index++) {
            if(forms[index].title === title) {
                return forms[index];
            }
        }
        return null;
    }

    function updateFormById(formId, newForm) {
        for(var index=0;index<forms.length;index++) {
            if(forms[index]._id == formId) {
                forms[index]._id = formId;
                newForm._id = formId;
                forms[index].title = newForm.title;
                forms[index].userId = newForm.userId;
                break;
            }
        }
        return newForm;
    }

    function deleteFormById(formId) {
        for(var index=0;index<forms.length;index++) {
            if(forms[index]._id == formId) {
                forms.splice(index,1);
                break;
            }
        }
        return forms
    }


};