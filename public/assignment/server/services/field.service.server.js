/**
 * Created by Dhruv on 3/17/2016.
 */
module.exports = function (app, model) {
    app.get("/api/assignment/form/:formId/field", getAllFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldById);
    app.put("/api/assignment/form/:formId/field/:fieldId",updateFieldById);
    app.post("api/assignment/form/:formId/field",createFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId",deleteFieldById);

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        var newField = model.createFiled(formId,field);
        res.send (200);
    }

    function getAllFieldsByFormId(req, res) {
        var formId = req.params.formId;
        var fields = model.findAllFieldsForFrom(formId);
        res.json(fields);
    }

    function getFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = model.findFieldById(formId,fieldId);
        if(field) {
            res.json(field);
            return;
        }
        res.json({message: "Field not found"});
    }

    function updateFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var newField = req.body;
        var field = model.updateFieldById(formId, fieldId, newField);
        if(field) {
            res.json(field);
            return;
        }
        res.json({message: "Field not found"});
    }

    function deleteFieldById (req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        if(model.deleteFormById(fieldId)) {
            res.send(200);
            return;
        }
        res.json ({message: "Form not found"});
    }

};