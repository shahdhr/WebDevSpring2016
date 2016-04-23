/**
 * Created by Dhruv on 4/18/2016.
 */
module.exports = function(mongoose) {
    var BookingSchema = mongoose.Schema({
        startDate : { type: Date, default: Date.now },
        endDate : { type: Date, default: Date.now},
        apartmentId  : String,
        apartmentName : String,
        booked_by : String,
        amount : Number
    }, {collection: 'project.rentout.booking'});
    return BookingSchema;
};