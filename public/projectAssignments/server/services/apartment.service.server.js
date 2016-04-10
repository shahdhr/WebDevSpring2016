/**
 * Created by Dhruv on 3/25/2016.
 */
module.exports = function (app, model,uuid) {
    app.get("/api/projectAssignments/user/:userId/apartment", findAllApartmentsForUser);
    app.put("/api/projectAssignments/apartment/:apartmentId",updateApartmentById);
    app.post("/api/projectAssignments/user/:userId/apartment",addApartment);
    app.delete("/api/projectAssignments/apartment/:apartmentId",deleteApartmentById);


    function addApartment (req, res) {
        var apartment = req.body;
        apartment._id=uuid.v4();
        model.addApartment(apartment);
        res.send (apartment);
    }


    function findAllApartmentsForUser (req, res) {

        var userId = req.params.userId;
        var apartments = model.findAllApartmentsForUser(userId);
        res.json(apartments);


    }

    function updateApartmentById (req, res) {
        var id = req.params.apartmentId;
        var apartment = req.body;
        apartment = model.updateApartmentById(id, apartment);
        if(apartment) {
            res.json(apartment);
            return;
        }
        res.json({message: "User not found"});
    }

    function deleteApartmentById (req, res) {
        var id = req.params.apartmentId;
        var apartments =model.deleteApartmentById(id);
        console.log(apartments);
        if(apartments) {
            res.send(apartments);
            return;
        }
        res.json ({message: "User not found"});
    }
};