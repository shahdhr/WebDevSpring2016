/**
 * Created by Dhruv on 3/30/2016.
 */
module.exports = function(mongoose) {


    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: [String],
        phones: [String],
        roles: [String]
    }, {collection: 'assignment.formmaker.user'});
    return UserSchema;
};