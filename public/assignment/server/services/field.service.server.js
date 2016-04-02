/**
 * Created by Dhruv on 3/17/2016.
 */
module.exports = function (app, formModel,uuid) {
    app.get("/api/assignment/form/:formId/field", getAllFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldById);
    app.put("/api/assignment/form/:formId/field/:fieldId",updateFieldById);
    app.put("/api/assignment/form/:formId/field",updateAllFields);
    app.post("/api/assignment/form/:formId/field",createFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId",deleteFieldById);

    var model   = require("../models/field.model.js")(formModel);

    function createFieldForForm(req, res) {

        var formId = req.params.formId;
        console.log("create text field service server"+formId);
        var field = req.body;
        //field._id = uuid.v4();
        model.createField(formId,field)
            .then(
                function(doc){
                    console.log(doc);
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                });
        //res.send (form);
    }

    function updateAllFields(req,res) {
        model.updateAllFieldsInForm(req.params.formId, req.body)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    console.log(err);
                    res.status(400).send(err);
                }
            );
        //res.json(form);
    }

    function getAllFieldsByFormId(req, res) {
        var formId = req.params.formId;
        //var fields = model.findAllFieldsForFrom(formId);
        //res.json(fields);
        model.findAllFieldsForFrom(formId)
            .then(
                function(doc) {
                    console.log("response for getAllFieldsByFormId()");
                    console.log(doc);
                    res.json(doc)
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function getFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model.findFieldById(formId,fieldId)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
        //if(field) {
        //    res.json(field);
        //    return;
        //}
        //res.json({message: "Field not found"});
    }

    function updateFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var newField = req.body;
        model.updateFieldById(formId, fieldId, newField)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
        //if(field) {
        //    res.json(field);
        //    return;
        //}
        //res.json({message: "Field not found"});
    }

    function deleteFieldById (req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        model.deleteFieldById(formId,fieldId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
        //if(form) {
        //    res.send(form);
        //    return;
        //}
        //res.json ({message: "Field not found"});
    }

};