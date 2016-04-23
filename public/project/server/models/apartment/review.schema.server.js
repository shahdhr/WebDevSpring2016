/**
 * Created by Dhruv on 4/17/2016.
 */
module.exports = function(mongoose) {
    var ReviewSchema = mongoose.Schema({
        description: String,
        rating:String,
        apartmentId: String,
        reviewed_by: String
    }, {collection: 'project.rentout.review'});
    return ReviewSchema;
};