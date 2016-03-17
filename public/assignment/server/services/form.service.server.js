/**
 * Created by Dhruv on 3/17/2016.
 */
module.exports = function (app, model) {
    app.get("/api/assignment/user/:userId/form", getAllFormsByUserId);
    app.get("/api/assignment/form/:formId", getFormById);
    app.put("/api/assignment/form/:formId",updateFormById);
    app.post("/api/assignment/user/:userId/form",createFormForUser);
    app.delete("/api/assignment/form/:formId",deleteFormById);

    function createFormForUser(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        var newForm = model.createFormForUser(userId,form);
        res.send (200);
    }

    function getAllFormsByUserId(req, res) {
        var userId = req.params.username;
        var forms = model.findAllFormsForUser(userId);
        res.json(forms);
    }

    function getFormById(req, res) {
        var formId = req.params.formId;
        var form = model.findFromById(formId);
        if(form) {
            res.json(form);
            return;
        }
        res.json({message: "Form not found"});
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var newForm = req.body;
        var form = model.updateFormById(formId,newForm)
        if(form) {
            res.json(form);
            return;
        }
        res.json({message: "Form not found"});
    }

    function deleteFormById (req, res) {
        var formId = req.params.formId;
        if(model.deleteFormById(formId)) {
            res.send(200);
            return;
        }
        res.json ({message: "Form not found"});
    }

};