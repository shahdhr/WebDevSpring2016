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
        findFormByTitle:findFormByTitle,
        findFromById: findFromById,
        createField: createField,
        findAllFieldsForFrom: findAllFieldsForFrom,
        findFieldById: findFieldById,
        updateFieldById: updateFieldById,
        deleteFieldById: deleteFieldById

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

    function findFromById (formId) {
        for(var index=0;index<forms.length;index++) {
            if (forms[index]._id == formId) {
                return forms[index];
            }
        }

        return null;
    }


    //Field methods
    function createField(formId,field) {
        var form = findFromById(formId);
        var newField = {
            _id: (new Date).getTime(),
            label: field.label,
            type: field.type,
            placeholder: field.placeholder
        };
        form.fields(newField);
        return newField;
    }

    function findAllFieldsForFrom(formId) {
        var form = findFromById(formId);
        return form.fields;
    }

    function findFieldById(formId,fieldId) {
        var form = findFromById(formId);
        var fields = form.fields;
        for(var index = 0;index<fields.length;index++) {
            if(fields[index]._id == fieldId) {
                return fields[index];
            }
        }
        return null;
    }

    function updateFieldById(formId, fieldId, newField) {
        var form = findFromById(formId);
        var fields = form.fields;
        for(var index=0;index<fields.length;index++) {
            if(fields[index]._id == fieldId) {
                fields[index]._id = fieldId;
                newField._id = fieldId;
                fields[index].label = newField.label;
                fields[index].type = newField.type;
                fields[index].placeholder = newField.placeholder;
                break;
            }
        }
        return newField;
    }

    function deleteFieldById(formId,fieldId) {
        var form = findFromById(formId);
        var fields = form.fields;
        for(var index=0;index<forms.length;index++) {
            if (fields[index]._id == fieldId) {
                fields.splice(index, 1);
                break;
            }
        }
        return fields;
    }

};