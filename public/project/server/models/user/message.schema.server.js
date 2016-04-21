/**
 * Created by Dhruv on 4/20/2016.
 */
module.exports = function(mongoose) {


    var MessageSchema = mongoose.Schema({
        message: String,
        message_to: String,
        message_by: String,
        message_time : { type : Date, default : Date.now},
        message_by_name : String,
        apartment : String,
        apartment_id : String
    }, {collection: 'project.rentout.message'});
    return MessageSchema;
};