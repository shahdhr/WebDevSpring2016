/**
 * Created by Dhruv on 3/17/2016.
 */
module.exports = function (app, model,uuid) {
    app.get("/api/assignment/user/:userId/form", getAllFormsByUserId);
    app.get("/api/assignment/form/:formId", getFormById);
    app.put("/api/assignment/form/:formId",updateFormById);
    app.post("/api/assignment/user/:userId/form",createFormForUser);
    app.delete("/api/assignment/form/:formId",deleteFormById);

    function createFormForUser(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        console.log(form);
        //form._id=uuid.v4();
        form.fields = [];
        model.createFormForUser(userId,form)
            .then(
                function(doc) {
                    console.log(doc);
                    res.json(doc);
                },function(err) {
                    console.log(err);
                    res.status(400).send(err);
                });
    }

    function getAllFormsByUserId(req, res) {
        var userId = req.params.userId;
        console.log("find all forms server service");
        console.log(req.params);
        model.findAllFormsForUser(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);

                }
            );
        //res.json(forms);
    }

    function getFormById(req, res) {
        var formId = req.params.formId;
        //var form = model.findFromById(formId);
        //if(form) {
        //    res.json(form);
        //    return;
        //}
        //res.json({message: "Form not found"});
        model.findFromById(formId)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                  res.status(400).send(err);
                }
            );
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var newForm = req.body;
        //var form = model.updateFormById(formId,newForm)
        //if(form) {
        //    res.json(form);
        //    return;
        //}
        //res.json({message: "Form not found"});
        console.log("inside update form in model");
        model
            .updateFormById(formId,newForm)
            .then(
                function(doc) {
                    console.log(doc);
                    res.json(doc);

                },
                function(err) {
                    console.log(err);
                    res.status(400).send(err);
                }
            );
    }

    function deleteFormById (req, res) {
        var formId = req.params.formId;
        //if(model.deleteFormById(formId)) {
        //    res.send(200);
        //    return;
        //}
        //res.json ({message: "Form not found"});
        model
            .deleteFormById(formId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function(err) {
                   res.status(400).send(err);
                }

            );
    }

};