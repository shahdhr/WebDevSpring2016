/**
 * Created by Dhruv on 4/1/2016.
 */
module.exports = function(formModel) {

    var FormModel = formModel.getMongooseModel();

    var api = {
        createField: createField,
        findAllFieldsForFrom: findAllFieldsForFrom,
        findFieldById: findFieldById,
        updateFieldById: updateFieldById,
        deleteFieldById: deleteFieldById,
        updateAllFieldsInForm: updateAllFieldsInForm
    };
    return api;
    function createField(formId,field) {
        return FormModel.findById(formId)
            .then(
                function (form) {
                    form.fields.push(field);
                    return form.save();
                }
            )
    }

    function findAllFieldsForFrom(formId) {
        return FormModel.findById(formId).then(
            function(form) {
                return form.fields;
            }
        )
    }

    function findFieldById(formId,fieldId) {
        return FormModel.findById(formId).then(
            function(form) {
                return form.fields.id(fieldId);
            }
        )
    }

    function updateFieldById(formId, fieldId, newField) {
        return FormModel.findById(formId).then(
            function(form) {
                var field = form.fields.id(newField._id);
                field.label = newForm.label;
                field.placeholder = newField.placeholder;
                field.options = newField.options;
                return form.save();
            }
        )
    }

    function deleteFieldById(formId,fieldId) {
        return FormModel.findById(formId).then(
            function(form) {
                form.fields.id(fieldId).remove();

                return form.save();
            }
        )
    }

    function updateAllFieldsInForm(formId, fields) {
        return FormModel.findById(formId).then(
            function(form) {
                form.fields = fields;
                return form.save();
            }
        )
    }
};