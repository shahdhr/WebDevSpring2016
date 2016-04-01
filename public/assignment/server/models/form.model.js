/**
 * Created by Dhruv on 3/17/2016.
 */

var q = require("q");
module.exports = function(db,mongoose) {
    //var forms = require("./form.mock.json");
    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FormModel = mongoose.model('Form',FormSchema);
    var FieldSchema = require("./field.schema.server.js")(mongoose);
    var FieldModel = mongoose.model('Field',FieldSchema);
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
        deleteFieldById: deleteFieldById,
        updateAllFieldsInForm: updateAllFieldsInForm

    };

    return api;


    function createFormForUser(userId, form) {
        form.userId = userId;
        var deferred = q.defer();
        FormModel.create(form,function(err,doc){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;

    }

    function findAllFormsForUser(userId) {
        console.log("form moderl all forms for user");
        var deferred = q.defer();
        FormModel.find({userId:userId},function(err,doc) {
           if(err) {
               console.log(err);
               deferred.reject(err);
           } else {
               console.log(doc);
               deferred.resolve(doc);
           }
        });
        return deferred.promise;
    }

    function findFormByTitle(title) {
        var deferred = q.defer();
        FormModel.findOne({title: title},function(err,doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateFormById(formId, newForm) {
        var deferred = q.defer();
        FormModel.update({_id:formId},{$set: newForm}, function (err,doc) {
            if(err) {
                deferred.reject(err);
            } else{
                console.log("updated form>>>>>");
                console.log(doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteFormById(formId) {
        var deferred = q.defer();
        FormModel.remove({_id:formId},function(err,doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findFromById (formId) {
        var deferred = q.defer();
        FormModel.findOne({_id: formId},function(err,doc) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }


    //Field methods
    function createField(formId,field) {
        //var form = findFromById(formId);
        //form.fields.push(field);
        //updateFormById(formId,form);
        //return form;
        return FormModel.findById(formId)
            .then(
                function (form) {
                    form.fields.push(field);
                    return form.save();
                }
            )
    }

    function findAllFieldsForFrom(formId) {
        //var form = findFromById(formId);
        //return form.fields;
        //return FormModel.findById(formId).select("fields");
        return FormModel.findById(formId).then(
            function(form) {
                return form.fields;
            }
        )
    }

    function findFieldById(formId,fieldId) {
        //var form = findFromById(formId);
        //var fields = form.fields;
        //for(var index = 0;index<fields.length;index++) {
        //    if(fields[index]._id == fieldId) {
        //        return fields[index];
        //    }
        //}
        //return null;
        return FormModel.findById(formId).then(
            function(form) {
                return form.fields.id(fieldId);
            }
        )
    }

    function updateFieldById(formId, fieldId, newField) {
        //var form = findFromById(formId);
        //var fields = form.fields;
        //for(var index=0;index<fields.length;index++) {
        //    if(fields[index]._id == fieldId) {
        //        fields[index]._id = fieldId;
        //        newField._id = fieldId;
        //        fields[index].label = newField.label;
        //        fields[index].type = newField.type;
        //        fields[index].placeholder = newField.placeholder;
        //        break;
        //    }
        //}
        //form.fields = fields;
        //updateFormById(formId,form);
        //return form;
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
        //var form = findFromById(formId);
        //var fields = form.fields;
        //for(var index=0;index<fields.length;index++) {
        //    if (fields[index]._id == fieldId) {
        //        fields.splice(index, 1);
        //        break;
        //    }
        //}
        //form.fields = fields;
        //updateFormById(formId,form);
        //return form;
        return FormModel.findById(formId).then(
            function(form) {
                form.fields.id(fieldId).remove();

                return form.save();
            }
        )
    }

    function updateAllFieldsInForm(formId, fields) {
        //var form = findFromById(formId);
        //form.fields = fields;
        //updateFormById(form._id, form);
        //return form;
        //var deferred = q.defer();
        //console.log("formId >> "+formId);
        //console.log("fields >> "+fields);
        //FormModel.update({_id:formId},{$set:fields},function(err,doc){
        //    if(err) {
        //        deferred.reject(err);
        //    } else {
        //        deferred.resolve(doc);
        //    }
        //
        //});
        //return deferred.promise;
        return FormModel.findById(formId).then(
            function(form) {
                form.fields = fields;
                return form.save();
            }
        )
    }

};