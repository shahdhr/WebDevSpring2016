/**
 * Created by Dhruv on 3/30/2016.
 */
module.exports = function(mongoose) {


    var FormSchema = mongoose.Schema({
        userId: String,
        title: { type: String, default: "New Form"},
        fields: String,
        created: { type: Date, default: Date.now },
        email: { type: Date, default: Date.now }
    }, {collection: 'form'});
    return UserSchema;
};