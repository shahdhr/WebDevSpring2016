/**
 * Created by Dhruv on 3/17/2016.
 */
module.exports = function (app, model,uuid) {
    app.get("/api/assignment/form/:formId/field", getAllFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldById);
    app.put("/api/assignment/form/:formId/field/:fieldId",updateFieldById);
    app.put("/api/assignment/form/:formId/field/",updateAllFields);
    app.post("/api/assignment/form/:formId/field",createFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId",deleteFieldById);

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        field._id = uuid.v4();
        var form = model.createField(formId,field);
        res.send (form);
    }

    function updateAllFields(req,res) {
        var form = model.updateAllFieldsInForm(req.params.formId, req.body);
        res.json(form);
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
        var form =model.deleteFieldById(formId,fieldId);
        if(form) {
            res.send(form);
            return;
        }
        res.json ({message: "Field not found"});
    }

};