/**
 * Created by Dhruv on 3/25/2016.
 */
module.exports = function (app, model,uuid) {
    app.get("/api/project/user/:userId/apartment", findAllApartmentsForUser);
    app.put("/api/project/apartment/:apartmentId",updateApartmentById);
    app.post("/api/project/user/:userId/apartment",addApartment);
    app.delete("/api/project/apartment/:apartmentId",deleteApartmentById);
    app.get("/api/project/apartment/:apartmentId",findApartmentByDbId);
    app.get("/api/project/cities",getAllCities);


    function addApartment (req, res) {
        var apartment = req.body;
        model.addApartment(apartment)
            .then(function (doc) {
                res.json(doc);
            }, function (err) {
                res.status(400).send(err);
            });
        //res.send (apartment);
    }

    function findApartmentByDbId(req,res) {
        var apartmentId = req.params.apartmentId;
        model.findApartmentByDbId(apartmentId)
            .then(function (doc) {
                res.json(doc);
            }, function (err) {
                res.status(400).send(err);
            });
    }


    function findAllApartmentsForUser (req, res) {

        var userId = req.params.userId;
        model.findAllApartmentsForUser(userId)
            .then(function (doc) {
                res.json(doc);
            }, function (err) {
                res.status(400).send(err);
            });
        //res.json(apartments);


    }

    function updateApartmentById (req, res) {
        var id = req.params.apartmentId;
        var apartment = req.body;
        apartment = model.updateApartmentById(id, apartment)
            .then(function (doc) {
                model.findApartmentByDbId(id)
                    .then(function (doc) {
                        res.json(doc);
                    }, function (err) {
                        res.status(400).send(err);
                    });
            }, function (err) {
                res.status(400).send(err);
            });
        //if(apartment) {
        //    res.json(apartment);
        //    return;
        //}
        //res.json({message: "User not found"});
    }

    function deleteApartmentById (req, res) {
        var id = req.params.apartmentId;
        model.deleteApartmentById(id)
            .then(function (doc) {
                res.json(doc);
            }, function (err) {
                res.status(400).send(err);
            });
        //console.log(apartments);
        //if(apartments) {
        //    res.send(apartments);
        //    return;
        //}
        //res.json ({message: "User not found"});
    }

    function getAllCities(req,res) {
        var cities = model.getAllCities();
        res.send(cities)
    }
};